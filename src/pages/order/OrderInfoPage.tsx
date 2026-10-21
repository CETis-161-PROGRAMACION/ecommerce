import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { MastercardIcon } from '@/components/ui/MastercardIcon'
import { ROUTES } from '@/router/routes'
import principitoImg from '@/assets/images/principito.png'

type PaymentMethod = 'debito' | 'credito' | 'presencial'

export function OrderInfoPage() {
  const navigate = useNavigate()

  const [selectedAddress, setSelectedAddress] = useState<'adoquinada' | 'centro'>('adoquinada')
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credito')
  const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false)

  const paymentLabels: Record<PaymentMethod, string> = {
    debito: 'Tarjeta de débito',
    credito: 'Tarjeta de crédito',
    presencial: 'Pago presencial',
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-6xl pb-16">
        <h1 className="mb-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
          Información de pedido
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Columna Izquierda: Pedidos, Ubicación y Totales */}
          <section className="space-y-8" aria-label="Detalles del pedido">
            {/* Pedidos */}
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

                {/* Especificaciones del producto */}
                <div className="flex flex-1 justify-between rounded-3xl border border-line bg-surface p-5 shadow-xs">
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

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-xs space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedAddress('adoquinada')}
                  className="flex w-full items-center gap-2 text-left text-base font-semibold text-ink cursor-pointer hover:text-navy-900"
                >
                  <span className={selectedAddress === 'adoquinada' ? 'text-amber-500' : 'text-ink-muted'}>
                    {selectedAddress === 'adoquinada' ? '★' : '☆'}
                  </span>
                  <span>Adoquinada #19</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAddress('centro')}
                  className="flex w-full items-center gap-2 text-left text-base font-semibold text-ink cursor-pointer hover:text-navy-900"
                >
                  <span className={selectedAddress === 'centro' ? 'text-amber-500' : 'text-ink-muted'}>
                    {selectedAddress === 'centro' ? '★' : '☆'}
                  </span>
                  <span>Centro #17A</span>
                </button>

                <div className="pt-2">
                  <Link
                    to={ROUTES.clienteDireccion}
                    className="text-sm font-medium text-ink-muted hover:text-navy-900 hover:underline"
                  >
                    Seleccionar otra
                  </Link>
                </div>
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

          {/* Columna Derecha: Mapa, Método de pago y Acciones */}
          <section className="space-y-8" aria-label="Método de pago y confirmación">
            {/* Ubicación guardada */}
            <div>
              <h2 className="mb-4 text-xl sm:text-2xl font-black text-ink">
                Ubicación guardada
              </h2>
              <MapSnippet label={selectedAddress === 'adoquinada' ? 'Adoquinada #19' : 'Centro #17A'} />
            </div>

            {/* Método de pago */}
            <div className="relative">
              <h2 className="mb-4 text-xl sm:text-2xl font-black text-ink">
                Método de pago
              </h2>

              {/* Botón selector principal */}
              <button
                type="button"
                onClick={() => setIsPaymentMenuOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-full border border-line bg-surface px-6 py-3.5 shadow-xs transition hover:border-brand-400 cursor-pointer"
                aria-expanded={isPaymentMenuOpen}
              >
                <div className="flex items-center gap-3">
                  <MastercardIcon size={32} />
                  <span className="text-base font-semibold text-ink">
                    {paymentLabels[selectedPayment]} (••••••••)
                  </span>
                </div>
                <span className="text-ink-muted text-sm">{isPaymentMenuOpen ? '▲' : '▼'}</span>
              </button>

              {/* Menú desplegable / Composable emergente de métodos de pago */}
              {isPaymentMenuOpen && (
                <div className="mt-3 rounded-2xl border border-line bg-surface p-4 shadow-lg motion-safe:animate-fade-in space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-muted px-2">
                    Selecciona un método de pago:
                  </p>
                  {(['debito', 'credito', 'presencial'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => {
                        setSelectedPayment(method)
                        setIsPaymentMenuOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
                        selectedPayment === method
                          ? 'bg-brand-100 text-navy-900'
                          : 'text-ink hover:bg-gray-100'
                      }`}
                    >
                      <span>{paymentLabels[method]}</span>
                      {selectedPayment === method && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col items-center gap-3 pt-4">
              <Link
                to={ROUTES.clienteDireccion}
                className="w-full max-w-sm rounded-full bg-brand-100 py-3 text-center text-sm font-semibold text-navy-900 transition hover:bg-brand-200"
              >
                Utilizar una nueva ubicación
              </Link>

              <button
                type="button"
                onClick={() => setIsPaymentMenuOpen(true)}
                className="w-full max-w-sm cursor-pointer rounded-full bg-brand-100 py-3 text-center text-sm font-semibold text-navy-900 transition hover:bg-brand-200"
              >
                Utilizar otro método de pago
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.orderTracking)}
                className="w-full cursor-pointer rounded-full bg-brand-100 py-4 text-center text-lg font-black text-navy-900 shadow-md transition hover:bg-brand-200 active:scale-98 mt-2"
              >
                Realizar pedido
              </button>
            </div>
          </section>
        </div>
      </div>
    </NavBar>
  )
}
