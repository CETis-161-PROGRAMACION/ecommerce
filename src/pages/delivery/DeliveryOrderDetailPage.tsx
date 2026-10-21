import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { PhoneIcon } from '@/components/ui/PhoneIcon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useApp } from '@/context/useApp'
import { products } from '@/data/products'
import { ROUTES } from '@/router/routes'
import { formatMoney } from '@/utils/money'

export function DeliveryOrderDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { orders, deliverOrder } = useApp()

  const orderId = (location.state as { orderId?: string } | null)?.orderId
  const pedido =
    orders.find((item) => item.id === orderId) ?? orders[0] ?? undefined

  const [isReportingError, setIsReportingError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [incidenciaGuardada, setIncidenciaGuardada] = useState(false)
  const [errorEntrega, setErrorEntrega] = useState('')

  if (!pedido) {
    return (
      <NavBar>
        <div className="mx-auto w-full max-w-5xl pb-16">
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Pedido en curso
          </h1>
          <p className="notice notice-info">
            No hay ningún pedido asignado. Vuelve a la lista de pedidos para
            tomar uno.
          </p>
        </div>
      </NavBar>
    )
  }

  const producto = products.find((item) => item.nombre === pedido.producto)
  const entregado = pedido.estado === 'entregado'

  function handleReportError(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!errorMessage.trim()) return

    setIsReportingError(false)
    setIncidenciaGuardada(true)
    setErrorMessage('')
  }

  function marcarEntregado() {
    const resultado = deliverOrder(pedido.id)

    if (!resultado.ok) {
      setErrorEntrega(resultado.error ?? 'No pudimos marcar el pedido.')
    }
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-5xl pb-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          <div className="flex h-80 w-full items-center justify-center rounded-3xl border border-warm-border bg-warm-card p-6 shadow-xs sm:h-96">
            {producto ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-full w-auto object-contain drop-shadow-sm"
              />
            ) : (
              <p className="text-base text-ink-muted">{pedido.producto}</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-ink sm:text-4xl">
                {pedido.producto}
              </h1>
              <div className="flex items-center gap-3">
                <StatusBadge tone="neutral">{pedido.sucursal}</StatusBadge>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-black text-navy-900">
                  {formatMoney(pedido.precio)}
                </span>
              </div>
            </div>

            <Card padding="sm">
              <span className="text-base font-bold text-ink">
                Contactar al cliente
              </span>
              <a
                href={`tel:${pedido.telefono}`}
                className="mt-3 flex items-center justify-between gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-extrabold text-navy-900 shadow-xs transition-colors hover:bg-brand-200"
              >
                <span>{pedido.telefono}</span>
                <PhoneIcon size={18} />
              </a>
            </Card>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-ink">
                Ubicación del cliente
              </h2>
              <MapSnippet label={pedido.direccion} heightClass="h-52 sm:h-60" />
            </div>
          </div>
        </div>

        {isReportingError ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          >
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <h3
                id="report-modal-title"
                className="mb-3 text-lg font-bold text-ink"
              >
                Reportar una incidencia
              </h3>
              <form onSubmit={handleReportError} className="space-y-4">
                <label
                  htmlFor="mensaje-incidencia"
                  className="text-sm font-semibold text-ink"
                >
                  Describe el problema (cliente no responde, dirección
                  incorrecta, etc.)
                </label>
                <textarea
                  id="mensaje-incidencia"
                  rows={3}
                  value={errorMessage}
                  onChange={(evento) => setErrorMessage(evento.target.value)}
                  className="w-full rounded-2xl border border-line bg-surface p-3 text-sm text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
                  required
                />
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsReportingError(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Guardar reporte</Button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 flex w-full max-w-xl flex-col items-center gap-4">
          {errorEntrega ? (
            <p role="alert" className="notice notice-danger w-full">
              {errorEntrega}
            </p>
          ) : null}

          {entregado ? (
            <div className="notice notice-success w-full space-y-3 text-center">
              <p className="font-bold">¡Pedido marcado como entregado!</p>
              <Button
                type="button"
                onClick={() => navigate(ROUTES.deliveryOrders)}
                className="mx-auto"
              >
                Volver a la lista de pedidos
              </Button>
            </div>
          ) : (
            <>
              {incidenciaGuardada ? (
                <p role="status" className="notice notice-info w-full">
                  Incidencia guardada en la demostración. No se envía a ningún
                  servicio externo.
                </p>
              ) : null}

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsReportingError(true)}
                fullWidth
              >
                Reportar un error
              </Button>

              <Button type="button" onClick={marcarEntregado} fullWidth>
                Marcar como entregado
              </Button>
            </>
          )}
        </div>
      </div>
    </NavBar>
  )
}
