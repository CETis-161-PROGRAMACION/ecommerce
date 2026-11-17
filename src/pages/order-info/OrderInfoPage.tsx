import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import productImage from '@/assets/images/principito.png'

// TODO(servicio): los datos de esta pantalla son los del diseño de referencia
// (Miro, "Información de pedido"). Cuando exista el servicio de pedidos en
// src/services/, reemplázalos por el carrito, las direcciones y los métodos de
// pago reales del usuario.

interface OrderItem {
  id: string
  business: string
  name: string
  options: readonly string[]
  price: number
  quantity: number
  image: string
}

const ORDER_ITEMS: readonly OrderItem[] = [
  {
    id: 'principito',
    business: 'Kundera',
    name: 'Principito',
    options: ['Tamaño M', 'Leche Deslactosada'],
    price: 80,
    quantity: 1,
    image: productImage,
  },
]

const SERVICE_FEE = 25
const RECIPIENT_NAME = 'Michell Hernandez'
const SAVED_ADDRESSES = ['Adoquinada #19', 'Centro #17A'] as const
const PAYMENT_METHODS = [
  'Tarjeta de débito',
  'Tarjeta de crédito',
  'Pago presencial',
] as const

type SavedAddress = (typeof SAVED_ADDRESSES)[number]
type PaymentMethod = (typeof PAYMENT_METHODS)[number]

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function formatPrice(amount: number) {
  return currency.format(amount)
}

function buildMapUrl(address: string) {
  const query = encodeURIComponent(`${address}, Tala, Jalisco`)
  return `https://maps.google.com/maps?q=${query}&z=16&output=embed`
}

export function OrderInfoPage() {
  const [address, setAddress] = useState<SavedAddress>(SAVED_ADDRESSES[0])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PAYMENT_METHODS[0],
  )
  const [isPaymentListOpen, setIsPaymentListOpen] = useState(false)

  const subtotal = ORDER_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const total = subtotal + SERVICE_FEE

  function handlePaymentSelect(method: PaymentMethod) {
    setPaymentMethod(method)
    setIsPaymentListOpen(false)
  }

  function handlePlaceOrder() {
    // TODO(servicio): enviar el pedido (productos, dirección y método de pago)
    // al servicio real cuando exista.
    // - No simules la operación: no navegues a otra pantalla ni muestres un
    //   mensaje de éxito sin una respuesta real.
  }

  return (
    <NavBar>
      <h1 className="sr-only">Información de pedido</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        {/* Columna izquierda: productos, dirección y resumen */}
        <div className="flex flex-col gap-8">
          <section aria-labelledby="order-items-title">
            <h2
              id="order-items-title"
              className="mb-4 text-xl font-bold text-ink"
            >
              Pedidos
            </h2>

            <ul className="flex flex-col gap-4">
              {ORDER_ITEMS.map((item) => (
                <li key={item.id} className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={`${item.name} de ${item.business}`}
                    className="h-28 w-24 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-32"
                  />

                  <div className="flex min-w-0 flex-1 justify-between gap-4 rounded-2xl border border-line bg-surface p-4 sm:max-w-sm">
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{item.name}</p>
                      <ul className="text-sm text-ink-muted">
                        {item.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                    </div>

                    <dl className="shrink-0 text-center text-sm">
                      <dt className="font-semibold text-ink">Costo</dt>
                      <dd className="mb-2 text-ink-muted">
                        {formatPrice(item.price)}
                      </dd>
                      <dt className="font-semibold text-ink">Cantidad</dt>
                      <dd className="text-ink-muted">{item.quantity}</dd>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <fieldset>
            <legend className="mb-3 text-xl font-bold text-ink">
              Ubicación
            </legend>

            <div className="flex flex-col gap-1 rounded-2xl border border-line bg-surface px-4 py-3 sm:max-w-sm">
              {SAVED_ADDRESSES.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 text-sm text-ink-muted has-checked:font-semibold has-checked:text-ink"
                >
                  <input
                    type="radio"
                    name="order-address"
                    value={option}
                    checked={address === option}
                    onChange={() => setAddress(option)}
                    className="size-4 accent-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                  />
                  {option}
                </label>
              ))}

              <Link
                to={ROUTES.clienteDireccion}
                className="mt-1 pl-7 text-sm text-ink-muted underline-offset-2 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
              >
                Seleccionar otra
              </Link>
            </div>
          </fieldset>

          <section
            aria-labelledby="order-summary-title"
            className="sm:max-w-md"
          >
            <h2 id="order-summary-title" className="sr-only">
              Resumen del pedido
            </h2>

            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-ink">{RECIPIENT_NAME}</p>
              <Link
                to={ROUTES.userDestiny}
                className="rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold text-navy-900 transition-colors hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
              >
                Cambiar destinatario
              </Link>
            </div>

            <dl className="flex flex-col gap-1 text-sm text-ink">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-baseline gap-2">
                  <dt>
                    {item.business}/{item.name}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="flex-1 border-b border-dotted border-line"
                  />
                  <dd>{formatPrice(item.price * item.quantity)}</dd>
                </div>
              ))}
              <div className="flex items-baseline gap-2">
                <dt>Servicio</dt>
                <span
                  aria-hidden="true"
                  className="flex-1 border-b border-dotted border-line"
                />
                <dd>{formatPrice(SERVICE_FEE)}</dd>
              </div>
              <div className="flex items-baseline gap-2 font-bold">
                <dt>Total</dt>
                <span
                  aria-hidden="true"
                  className="flex-1 border-b border-dotted border-line"
                />
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Columna derecha: mapa, método de pago y acciones */}
        <div className="flex flex-col gap-6">
          <section aria-labelledby="saved-location-title">
            <h2
              id="saved-location-title"
              className="mb-3 text-center text-base font-bold text-ink"
            >
              Ubicación guardada
            </h2>
            <iframe
              title={`Mapa de ${address}`}
              src={buildMapUrl(address)}
              loading="lazy"
              className="h-44 w-full rounded-2xl border border-line"
            />
          </section>

          <section aria-labelledby="payment-method-title">
            <h2
              id="payment-method-title"
              className="mb-3 text-center text-base font-bold text-ink"
            >
              Método de pago
            </h2>

            <button
              type="button"
              aria-expanded={isPaymentListOpen}
              aria-controls="payment-method-options"
              onClick={() => setIsPaymentListOpen((isOpen) => !isOpen)}
              className="flex w-full items-center justify-between gap-3 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="flex">
                  <span className="size-5 rounded-full bg-red-500" />
                  <span className="-ml-2 size-5 rounded-full bg-amber-500/90" />
                </span>
                {paymentMethod}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`size-4 text-ink-muted transition-transform motion-reduce:transition-none ${
                  isPaymentListOpen ? 'rotate-180' : ''
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isPaymentListOpen && (
              <fieldset
                id="payment-method-options"
                className="mt-3 flex flex-col gap-2 rounded-2xl border border-line bg-surface p-3"
              >
                <legend className="sr-only">Elige un método de pago</legend>
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method}
                    className="cursor-pointer rounded-full border border-line px-4 py-1.5 text-center text-sm text-ink has-checked:border-success has-checked:bg-success/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-400"
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => handlePaymentSelect(method)}
                      className="sr-only"
                    />
                    {method}
                  </label>
                ))}
              </fieldset>
            )}
          </section>

          <div className="flex flex-col gap-3">
            <Link
              to={ROUTES.clienteDireccion}
              className="rounded-full bg-brand-100 px-4 py-2 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Utilizar una nueva ubicación
            </Link>
            <button
              type="button"
              aria-expanded={isPaymentListOpen}
              aria-controls="payment-method-options"
              onClick={() => setIsPaymentListOpen(true)}
              className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Utilizar otro método de pago
            </button>
          </div>

          <Button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-brand-100! py-3 text-navy-900! hover:bg-brand-200!"
          >
            Realizar pedido
          </Button>
        </div>
      </div>
    </NavBar>
  )
}
