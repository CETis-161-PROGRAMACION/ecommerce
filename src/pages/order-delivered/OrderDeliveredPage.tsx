import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { DeliveryProgress } from '@/components/order/DeliveryProgress'
import { OrderSummary } from '@/components/order/OrderSummary'
import { ROUTES } from '@/router/routes'
import {
  fetchOrder,
  fetchReviewRating,
  submitReview,
  type Order,
} from '@/services/order/orders'
import { useSession } from '@/services/session/session'
import { buildMapUrl } from '@/utils/maps'

const RATING_VALUES = [1, 2, 3, 4, 5] as const
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

type DeliveredState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; order: Order }

export function OrderDeliveredPage() {
  const { orderId } = useParams()
  const { session } = useSession()
  const userId = session?.user.id
  const [state, setState] = useState<DeliveredState>({ status: 'loading' })
  const [savedRating, setSavedRating] = useState<number | null>(null)
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!orderId) return
    let isActive = true
    Promise.all([fetchOrder(orderId), fetchReviewRating(orderId)])
      .then(([order, existing]) => {
        if (!isActive) return
        setState(
          order
            ? { status: 'ready', order }
            : { status: 'error', message: 'No encontramos este pedido.' },
        )
        setSavedRating(existing)
      })
      .catch((caught: unknown) => {
        if (!isActive) return
        setState({
          status: 'error',
          message:
            caught instanceof Error
              ? caught.message
              : 'No pudimos cargar el pedido.',
        })
      })
    return () => {
      isActive = false
    }
  }, [orderId])

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
        <p role="alert" className="py-12 text-center text-ink">
          {state.message}
        </p>
      </NavBar>
    )
  }

  const { order } = state
  const shownRating = savedRating ?? rating

  async function handleRate(value: number) {
    if (savedRating !== null || !userId) return
    setRating(value)
    setIsSaving(true)
    setMessage('')
    try {
      await submitReview({
        orderId: order.id,
        userId,
        branchId: order.branchId,
        rating: value,
      })
      setSavedRating(value)
      setMessage('¡Gracias por tu calificación!')
    } catch (caught) {
      setRating(0)
      setMessage(
        caught instanceof Error ? caught.message : 'No pudimos guardar tu calificación.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <NavBar>
      <h1 className="sr-only">Pedido entregado</h1>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <OrderSummary order={order} />

        <div className="flex flex-col gap-6">
          {order.pickupMethod === 'delivery' && order.deliveryAddress && (
            <iframe
              title={`Mapa de ${order.deliveryAddress}`}
              src={buildMapUrl(order.deliveryAddress)}
              loading="lazy"
              className="h-44 w-full rounded-2xl border border-line"
            />
          )}

          <section
            aria-labelledby="delivered-status-title"
            className="text-center"
          >
            <h2
              id="delivered-status-title"
              className="mb-4 text-base font-bold text-ink"
            >
              Pedido entregado
            </h2>
            <DeliveryProgress progress={100} label="Avance de la entrega" />
          </section>

          <fieldset
            disabled={isSaving || savedRating !== null}
            className="text-center"
          >
            <legend className="mx-auto mb-3 text-sm font-bold text-ink">
              Calificación
            </legend>
            <div className="flex justify-center gap-2">
              {RATING_VALUES.map((value) => (
                <label
                  key={value}
                  className="cursor-pointer rounded-full p-1 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-400"
                >
                  <input
                    type="radio"
                    name="order-rating"
                    value={value}
                    checked={shownRating === value}
                    onChange={() => handleRate(value)}
                    className="sr-only"
                  />
                  <span className="sr-only">
                    {value} {value === 1 ? 'estrella' : 'estrellas'}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={`size-7 transition-colors motion-reduce:transition-none ${
                      value <= shownRating ? 'text-amber-500' : 'text-amber-500/30'
                    }`}
                    fill="currentColor"
                  >
                    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9Z" />
                  </svg>
                </label>
              ))}
            </div>
            {message && (
              <p role="status" className="mt-2 text-sm font-semibold text-ink">
                {message}
              </p>
            )}
          </fieldset>

          <Link
            to={ROUTES.home}
            className={`w-full rounded-full bg-brand-100 py-3 text-center font-semibold text-navy-900 transition-colors hover:bg-brand-200 ${focusRing}`}
          >
            Regresar al inicio
          </Link>
        </div>
      </div>
    </NavBar>
  )
}
