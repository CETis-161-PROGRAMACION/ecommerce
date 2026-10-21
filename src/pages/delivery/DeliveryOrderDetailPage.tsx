import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { ROUTES } from '@/router/routes'
import principitoImg from '@/assets/images/principito.png'

export function DeliveryOrderDetailPage() {
  const navigate = useNavigate()
  const [isDelivered, setIsDelivered] = useState(false)
  const [isReportingError, setIsReportingError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleMarkAsDelivered = () => {
    setIsDelivered(true)
  }

  const handleReportError = (e: React.FormEvent) => {
    e.preventDefault()
    if (errorMessage.trim()) {
      setIsReportingError(false)
      alert('Incidencia reportada a soporte.')
      setErrorMessage('')
    }
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-5xl pb-16">
        {/* Encabezado e información de entrega */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-start">
          {/* Tarjeta de imagen del producto (Izquierda) */}
          <div className="flex h-80 sm:h-96 w-full items-center justify-center rounded-3xl border border-warm-border bg-warm-card p-6 shadow-xs">
            <img
              src={principitoImg}
              alt="Principito Kundera"
              className="h-full w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Información del pedido, cliente y mapa (Derecha) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-ink">
                Principito
              </h1>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-ink-muted">
                  KUNDERA
                </span>
                <span className="rounded-md bg-emerald-100 px-3 py-0.5 text-lg font-black text-emerald-800">
                  $80.00
                </span>
              </div>
            </div>

            {/* Contacto con el cliente */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 shadow-xs">
              <span className="text-base font-bold text-ink">
                Marcar al cliente
              </span>
              <a
                href="tel:3332260919"
                className="flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-extrabold text-navy-900 shadow-xs transition hover:bg-brand-200"
              >
                <span>3332260919</span>
                <span>📞</span>
              </a>
            </div>

            {/* Ubicación del cliente con mapa */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-ink">
                Ubicación del cliente
              </h2>
              <MapSnippet label="Adoquinada #19" heightClass="h-52 sm:h-60" />
            </div>
          </div>
        </div>

        {/* Modal de Reporte de Error */}
        {isReportingError && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          >
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <h3 id="report-modal-title" className="text-lg font-bold text-ink mb-3">
                Reportar una incidencia
              </h3>
              <form onSubmit={handleReportError} className="space-y-4">
                <textarea
                  rows={3}
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                  placeholder="Describe el problema (cliente no responde, dirección incorrecta, etc.)..."
                  className="w-full rounded-2xl border border-line p-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReportingError(false)}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-ink-muted hover:text-ink cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-brand-100 px-6 py-2 text-sm font-bold text-navy-900 hover:bg-brand-200 cursor-pointer"
                  >
                    Enviar reporte
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Botones inferiores de acción */}
        <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
          {isDelivered ? (
            <div className="w-full rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center space-y-3">
              <p className="text-lg font-black text-emerald-800">
                ¡Pedido marcado como entregado! 🎉
              </p>
              <button
                type="button"
                onClick={() => navigate(ROUTES.deliveryOrders)}
                className="rounded-full bg-brand-100 px-8 py-2.5 text-sm font-bold text-navy-900 hover:bg-brand-200 transition cursor-pointer"
              >
                Volver a la lista de pedidos
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsReportingError(true)}
                className="w-full cursor-pointer rounded-full bg-brand-100 py-3.5 text-center text-base font-bold text-navy-900 shadow-xs transition hover:bg-brand-200 active:scale-98"
              >
                Reportar un error
              </button>

              <button
                type="button"
                onClick={handleMarkAsDelivered}
                className="w-full cursor-pointer rounded-full bg-brand-100 py-3.5 text-center text-base font-bold text-navy-900 shadow-xs transition hover:bg-brand-200 active:scale-98"
              >
                Marcar como entregado
              </button>
            </>
          )}
        </div>
      </div>
    </NavBar>
  )
}
