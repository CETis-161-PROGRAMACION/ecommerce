import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { DeliveryProgress } from '@/components/order/DeliveryProgress'
import { OrderChat } from '@/components/order/OrderChat'
import { OrderSummary } from '@/components/order/OrderSummary'
import { Button } from '@/components/ui/Button'
import { ROUTES, orderDeliveredPath } from '@/router/routes'
import {
  STATUS_LABELS,
  cancelOrder,
  confirmOrderReceived,
  fetchDriverContact,
  fetchOrder,
  statusProgress,
  type DriverContact,
  type Order,
} from '@/services/order/orders'
import { buildMapUrl } from '@/utils/maps'

type TrackingState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; order: Order }

const POLL_MS = 8000
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function OrderTrackingPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState<TrackingState>({ status: 'loading' })
  const [driver, setDriver] = useState<DriverContact | null>(null)
  const [error, setError] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false)

  useEffect(() => {
    if (!orderId) return
    let isActive = true

    async function load() {
      try {
        const order = await fetchOrder(orderId as string)
        if (!isActive) return
        setState(
          order
            ? { status: 'ready', order }
            : { status: 'error', message: 'No encontramos este pedido.' },
        )
      } catch (caught) {
        if (!isActive) return
        setState({
          status: 'error',
          message:
            caught instanceof Error
              ? caught.message
              : 'No pudimos cargar el pedido.',
        })
      }
    }

    const firstLoad = window.setTimeout(load, 0)
    const timer = window.setInterval(load, POLL_MS)
    return () => {
      isActive = false
      window.clearTimeout(firstLoad)
      window.clearInterval(timer)
    }
  }, [orderId])

  const orderStatus = state.status === 'ready' ? state.order.status : null
  const hasDriver = orderStatus === 'accepted' || orderStatus === 'on_the_way'

  useEffect(() => {
    if (!orderId || !hasDriver) return
    let isActive = true
    fetchDriverContact(orderId).then((contact) => {
      if (isActive) setDriver(contact)
    })
    return () => {
      isActive = false
    }
  }, [orderId, hasDriver])

  if (!orderId) return <Navigate to={ROUTES.home} replace />

  if (state.status === 'loading') {
    return (
      <NavBar>
        <p role="status" className="py-12 text-center text-sm text-ink-muted">
          Cargando pedido…
        </p>
      </NavBar>
    )
  }

  if (state.status === 'error') {
    return (
      <NavBar>
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
          <p role="alert" className="text-ink">
            {state.message}
          </p>
          <Link
            to={ROUTES.home}
            className={`rounded-full bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
          >
            Volver al inicio
          </Link>
        </div>
      </NavBar>
    )
  }

  const { order } = state
  if (order.status === 'delivered') {
    return <Navigate to={orderDeliveredPath(order.id)} replace />
  }

  const isDelivery = order.pickupMethod === 'delivery'
  const isCancelled = order.status === 'cancelled'
  const canConfirm = isDelivery ? order.status === 'on_the_way' : !isCancelled
  const canCancel = order.status === 'pending'

  async function handleReceived() {
    setIsBusy(true)
    setError('')
    try {
      await confirmOrderReceived(order.id)
      navigate(orderDeliveredPath(order.id), { replace: true })
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'No pudimos confirmar la entrega.',
      )
    } finally {
      setIsBusy(false)
    }
  }

  async function handleCancel() {
    setIsBusy(true)
    setError('')
    try {
      await cancelOrder(order.id)
      setState({ status: 'ready', order: { ...order, status: 'cancelled' } })
      setIsConfirmingCancel(false)
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'No pudimos cancelar el pedido.',
      )
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <NavBar>
      <h1 className="sr-only">Seguimiento del pedido</h1>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <OrderSummary order={order} />

        <div className="flex flex-col gap-6">
          {isDelivery && order.deliveryAddress && (
            <iframe
              title={`Mapa de ${order.deliveryAddress}`}
              src={buildMapUrl(order.deliveryAddress)}
              loading="lazy"
              className="h-44 w-full rounded-2xl border border-line"
            />
          )}

          <section
            aria-labelledby="tracking-status-title"
            className="text-center"
          >
            <h2
              id="tracking-status-title"
              aria-live="polite"
              className="text-base font-bold text-ink"
            >
              {isDelivery
                ? STATUS_LABELS[order.status]
                : isCancelled
                  ? STATUS_LABELS.cancelled
                  : 'Pedido recibido por el negocio'}
            </h2>
            {isDelivery && order.status === 'pending' && (
              <p className="text-xs text-ink-muted">
                Estamos buscando un repartidor para tu pedido.
              </p>
            )}
            <div className="mt-4">
              <DeliveryProgress
                progress={statusProgress(order.status, order.pickupMethod)}
                label="Avance de la entrega"
              />
            </div>
          </section>

          {isDelivery && !isCancelled && (
            <section
              aria-labelledby="contact-title"
              className="flex flex-col gap-2"
            >
              <h2 id="contact-title" className="text-sm font-bold text-ink">
                Comunicarse con el repartidor
              </h2>
              {driver && (
                <p className="text-sm text-ink">
                  {driver.fullName}
                  {driver.phone && (
                    <>
                      {' · '}
                      <a
                        href={`tel:+52${driver.phone}`}
                        className={`font-semibold underline underline-offset-2 ${focusRing}`}
                      >
                        Llamar
                      </a>
                    </>
                  )}
                </p>
              )}
              <OrderChat
                orderId={order.id}
                enabled={hasDriver}
                disabledHint="Podrás escribirle al repartidor cuando acepte tu pedido."
              />
            </section>
          )}

          {error && (
            <p role="alert" className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {isCancelled ? (
            <Link
              to={ROUTES.home}
              className={`w-full rounded-full bg-brand-100 py-3 text-center font-semibold text-navy-900 transition-colors hover:bg-brand-200 ${focusRing}`}
            >
              Regresar al inicio
            </Link>
          ) : (
            <>
              <Button
                type="button"
                onClick={handleReceived}
                disabled={!canConfirm || isBusy}
                className="w-full bg-brand-100! py-3 text-navy-900! hover:bg-brand-200!"
              >
                Recibido
              </Button>

              {canCancel &&
                (isConfirmingCancel ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-ink">
                      ¿Seguro que quieres cancelar tu pedido?
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={handleCancel}
                        disabled={isBusy}
                        className="bg-red-600! px-5 py-2 text-sm hover:bg-red-700!"
                      >
                        Sí, cancelar
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setIsConfirmingCancel(false)}
                        disabled={isBusy}
                        className="bg-brand-100! px-5 py-2 text-sm text-navy-900! hover:bg-brand-200!"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConfirmingCancel(true)}
                    className={`text-sm text-ink-muted underline underline-offset-2 hover:text-ink ${focusRing}`}
                  >
                    Cancelar pedido
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </NavBar>
  )
}
