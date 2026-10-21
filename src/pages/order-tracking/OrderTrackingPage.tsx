import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { ROUTES } from '@/router/routes'
import principitoImg from '@/assets/images/principito.png'

export function OrderTrackingPage() {
  const navigate = useNavigate()
  const [isReceived, setIsReceived] = useState(false)
  const [message, setMessage] = useState('')
  const [chatSent, setChatSent] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setChatSent(true)
      setTimeout(() => setChatSent(false), 3000)
      setMessage('')
    }
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-6xl pb-16">
        <h1 className="mb-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
          Estado del pedido
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Columna Izquierda: Pedidos, Ubicación y Totales */}
          <section className="space-y-8" aria-label="Resumen de la orden">
            {/* Pedidos con borde verde de confirmación */}
            <div>
              <h2 className="mb-4 text-xl sm:text-2xl font-black text-ink">
                Pedidos
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                {/* Imagen del producto */}
                <div className="flex h-52 w-full sm:w-44 shrink-0 items-center justify-center rounded-3xl border border-warm-border bg-warm-card p-4 shadow-xs">
                  <img
                    src={principitoImg}
                    alt="Principito Kundera"
                    className="h-full w-auto object-contain drop-shadow-xs"
                  />
                </div>

                {/* Especificaciones con borde verde como en la maqueta */}
                <div className="flex flex-1 justify-between rounded-3xl border-2 border-green-500 bg-surface p-5 shadow-xs">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-ink">Principito</h3>
                    <p className="text-base text-ink-muted">Tamaño M</p>
                    <p className="text-base text-ink-muted">Leche</p>
                    <p className="text-base text-ink-muted">Deslactosada</p>
                  </div>

                  <div className="flex flex-col justify-between text-right">
                    <div>
                      <p className="text-sm font-semibold text-ink-muted">Costo</p>
                      <p className="text-lg font-bold text-ink">$80.00</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink-muted">Cantidad</p>
                      <p className="text-lg font-bold text-ink">1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <h2 className="mb-4 text-xl sm:text-2xl font-black text-ink">
                Ubicación
              </h2>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-xs">
                <p className="flex items-center gap-2 text-base font-semibold text-ink">
                  <span className="text-amber-500">★</span>
                  <span>Adoquinada #19</span>
                </p>
              </div>
            </div>

            {/* Desglose y Destinatario */}
            <div className="rounded-2xl border border-line/60 bg-surface/50 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-bold text-ink">Michell Hernandez</span>
                <Link
                  to={ROUTES.userDestiny}
                  className="rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold text-navy-900 hover:bg-brand-200 transition"
                >
                  Cambiar destinatario
                </Link>
              </div>

              <div className="space-y-2 text-base text-ink">
                <div className="flex items-center justify-between">
                  <span className="flex-1">Kundera/Principito</span>
                  <span className="mx-2 flex-1 border-b border-dotted border-line" />
                  <span className="font-bold">$80.00</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex-1">Servicio</span>
                  <span className="mx-2 flex-1 border-b border-dotted border-line" />
                  <span className="font-bold">$25.00</span>
                </div>

                <div className="flex items-center justify-between border-t border-line/80 pt-2 text-lg">
                  <span className="font-black text-ink">Total</span>
                  <span className="mx-2 flex-1 border-b border-dotted border-line" />
                  <span className="font-black text-ink">$105.00</span>
                </div>
              </div>
            </div>
          </section>

          {/* Columna Derecha: Mapa, Repartidor en camino y Comunicación */}
          <section className="space-y-6" aria-label="Rastreo y repartidor">
            {/* Mapa de ubicación */}
            <MapSnippet label="Adoquinada #19" />

            {/* Estado de entrega y progreso */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-xs text-center space-y-4">
              <div>
                <h2 className="text-2xl font-black text-ink">
                  Repartidor en camino
                </h2>
                <p className="text-sm font-semibold text-ink-muted mt-1">
                  Llegada estimada 7 minutos...
                </p>
              </div>

              {/* Barra de progreso de entrega */}
              <div className="pt-4 pb-2 px-4">
                <div className="flex items-center justify-between text-2xl mb-1">
                  <span title="Sucursal" aria-label="Sucursal">🏬</span>
                  <span
                    title="Repartidor en camino"
                    aria-label="Repartidor"
                    className="transform -translate-y-1 animate-bounce"
                  >
                    🛵
                  </span>
                  <span title="Destino" aria-label="Destino">📍</span>
                </div>

                <div className="relative w-full h-2 rounded-full bg-line overflow-hidden">
                  <div className="h-full bg-brand-400 w-1/2 rounded-full" />
                </div>
              </div>
            </div>

            {/* Comunicación con el repartidor */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-ink">
                Comunicarse con el repartidor
              </h3>

              <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <span className="text-xl">💬</span>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enviar mensaje..."
                  className="flex-1 rounded-full border border-line px-4 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
                />
                <button
                  type="submit"
                  className="rounded-full bg-brand-100 px-4 py-2 text-xs font-bold text-navy-900 hover:bg-brand-200 transition"
                >
                  Enviar
                </button>
              </form>

              {chatSent && (
                <p className="text-xs text-success font-semibold text-center">
                  Mensaje enviado al repartidor
                </p>
              )}

              <a
                href="tel:3332260919"
                className="flex items-center justify-center gap-2 w-full rounded-full border border-line py-2.5 text-sm font-semibold text-ink hover:bg-gray-50 transition"
              >
                <span>📞</span>
                <span>Llamar</span>
              </a>
            </div>

            {/* Botón Recibido */}
            <div className="pt-2">
              {isReceived ? (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-center space-y-2">
                  <p className="text-base font-bold text-green-800">
                    ¡Pedido entregado con éxito! 🎉
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.home)}
                    className="rounded-full bg-brand-100 px-6 py-2 text-sm font-bold text-navy-900 hover:bg-brand-200 transition"
                  >
                    Volver al inicio
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsReceived(true)}
                  className="w-full cursor-pointer rounded-full bg-brand-100 py-4 text-center text-lg font-black text-navy-900 shadow-md transition hover:bg-brand-200 active:scale-98"
                >
                  Recibido
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </NavBar>
  )
}
