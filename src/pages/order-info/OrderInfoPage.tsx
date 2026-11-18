import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import {
  groupByBusiness,
  useCart,
  type BusinessOrder,
  type CartItem,
} from '@/services/cart/cart'
import {
  PAYMENT_METHODS,
  isPaymentMethod,
  type PaymentMethod,
  type PaymentMethodState,
} from '@/services/payment/paymentMethods'

const SERVICE_FEE = 25
const RECIPIENT_NAME = 'Michell Hernandez'
const SAVED_ADDRESSES = ['Adoquinada #19', 'Centro #17A'] as const

type SavedAddress = (typeof SAVED_ADDRESSES)[number]

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

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'
const secondaryAction = `rounded-full bg-brand-100 px-4 py-2 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-200 ${focusRing}`

interface CartItemCardProps {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-background p-3 sm:p-4">
      <img
        src={item.image}
        alt={`${item.name} de ${item.business}`}
        className="h-24 w-20 shrink-0 rounded-xl object-cover sm:h-32 sm:w-28"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-ink">{item.name}</p>
          {item.options.length > 0 && (
            <ul className="text-sm text-ink-muted">
              {item.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          )}
          <p className="mt-1 text-sm text-ink-muted">
            {formatPrice(item.price)} c/u
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:flex-col sm:flex-nowrap sm:items-end">
          <div
            role="group"
            aria-label={`Cantidad de ${item.name}`}
            className="flex items-center rounded-full border border-line"
          >
            <button
              type="button"
              aria-label={`Quitar uno de ${item.name}`}
              onClick={() => onQuantityChange(item.quantity - 1)}
              className={`flex size-8 items-center justify-center rounded-full text-lg text-ink hover:bg-brand-100 ${focusRing}`}
            >
              −
            </button>
            <span
              aria-live="polite"
              className="min-w-8 text-center text-sm font-semibold text-ink"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={`Agregar uno de ${item.name}`}
              onClick={() => onQuantityChange(item.quantity + 1)}
              className={`flex size-8 items-center justify-center rounded-full text-lg text-ink hover:bg-brand-100 ${focusRing}`}
            >
              +
            </button>
          </div>

          <p className="font-semibold text-ink">
            {formatPrice(item.price * item.quantity)}
          </p>

          <button
            type="button"
            onClick={onRemove}
            className={`text-xs text-ink-muted underline-offset-2 hover:text-ink hover:underline ${focusRing}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  )
}

interface BusinessOrderSectionProps {
  order: BusinessOrder
}

function BusinessOrderSection({ order }: BusinessOrderSectionProps) {
  const { updateQuantity, removeItem } = useCart()
  const titleId = `order-${order.business}`

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-3xl border border-line bg-surface p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={titleId} className="text-lg font-bold text-ink">
          {order.business}
        </h3>
        <p className="text-sm text-ink-muted">
          Subtotal:{' '}
          <span className="font-semibold text-ink">
            {formatPrice(order.subtotal)}
          </span>
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {order.items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </ul>
    </section>
  )
}

export function OrderInfoPage() {
  const { items } = useCart()
  const location = useLocation()
  const requestedMethod = (location.state as PaymentMethodState | null)
    ?.paymentMethod
  const [address, setAddress] = useState<SavedAddress>(SAVED_ADDRESSES[0])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    isPaymentMethod(requestedMethod) ? requestedMethod : PAYMENT_METHODS[0],
  )
  const [isPaymentListOpen, setIsPaymentListOpen] = useState(false)

  const orders = groupByBusiness(items)
  const hasItems = orders.length > 0
  const subtotal = orders.reduce((sum, order) => sum + order.subtotal, 0)
  const serviceTotal = SERVICE_FEE * orders.length
  const total = subtotal + serviceTotal

  function handlePaymentSelect(method: PaymentMethod) {
    setPaymentMethod(method)
    setIsPaymentListOpen(false)
  }

  function handlePlaceOrder() {}

  return (
    <NavBar>
      <h1 className="mb-6 text-2xl font-bold text-ink sm:text-3xl">
        Información de pedido
      </h1>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-10">
        <div className="flex flex-col gap-6">
          <section aria-labelledby="order-items-title">
            <h2
              id="order-items-title"
              className="mb-4 text-xl font-bold text-ink"
            >
              Pedidos
            </h2>

            {hasItems ? (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <BusinessOrderSection key={order.business} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-surface px-6 py-12 text-center">
                <p className="text-ink">
                  Aún no tienes productos en tu pedido.
                </p>
                <Link to={ROUTES.sucursales} className={secondaryAction}>
                  Ver sucursales
                </Link>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <fieldset className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
              <legend className="sr-only">Ubicación de entrega</legend>
              <p aria-hidden="true" className="mb-3 text-lg font-bold text-ink">
                Ubicación
              </p>

              <div className="flex flex-col gap-2">
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
                      className={`size-4 accent-brand-400 ${focusRing}`}
                    />
                    {option}
                  </label>
                ))}

                <Link
                  to={ROUTES.clienteDireccion}
                  className={`mt-1 pl-7 text-sm text-ink-muted underline-offset-2 hover:text-ink hover:underline ${focusRing}`}
                >
                  Seleccionar otra
                </Link>
              </div>
            </fieldset>

            <section
              aria-labelledby="order-summary-title"
              className="rounded-3xl border border-line bg-surface p-4 sm:p-6"
            >
              <h2
                id="order-summary-title"
                className="mb-3 text-lg font-bold text-ink"
              >
                Resumen
              </h2>

              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink">
                  {RECIPIENT_NAME}
                </p>
                <Link
                  to={ROUTES.userDestiny}
                  className={`rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold text-navy-900 transition-colors hover:bg-brand-200 ${focusRing}`}
                >
                  Cambiar destinatario
                </Link>
              </div>

              <dl className="flex flex-col gap-1 text-sm text-ink">
                {items.map((item) => (
                  <div key={item.id} className="flex items-baseline gap-2">
                    <dt className="min-w-0 truncate">
                      {item.business}/{item.name}
                      {item.quantity > 1 && ` ×${item.quantity}`}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="min-w-4 flex-1 border-b border-dotted border-line"
                    />
                    <dd>{formatPrice(item.price * item.quantity)}</dd>
                  </div>
                ))}
                <div className="flex items-baseline gap-2">
                  <dt>
                    Servicio
                    {orders.length > 1 && ` (${orders.length} negocios)`}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="min-w-4 flex-1 border-b border-dotted border-line"
                  />
                  <dd>{formatPrice(serviceTotal)}</dd>
                </div>
                <div className="flex items-baseline gap-2 font-bold">
                  <dt>Total</dt>
                  <span
                    aria-hidden="true"
                    className="min-w-4 flex-1 border-b border-dotted border-line"
                  />
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-4 sm:p-6 lg:sticky lg:top-6">
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
              className="h-48 w-full rounded-2xl border border-line"
            />
            <p className="mt-2 text-center text-sm text-ink-muted">{address}</p>
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
              className={`flex w-full items-center justify-between gap-3 rounded-full border border-line bg-background px-4 py-2 text-sm text-ink ${focusRing}`}
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
                className="mt-3 flex flex-col gap-2 rounded-2xl border border-line bg-background p-3"
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
            <Link to={ROUTES.clienteDireccion} className={secondaryAction}>
              Utilizar una nueva ubicación
            </Link>
            <Link
              to={ROUTES.tipoPago}
              state={{ paymentMethod } satisfies PaymentMethodState}
              className={secondaryAction}
            >
              Utilizar otro método de pago
            </Link>
          </div>

          <Button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!hasItems}
            className="w-full bg-brand-100! py-3 text-navy-900! hover:bg-brand-200!"
          >
            Realizar pedido
          </Button>
        </aside>
      </div>
    </NavBar>
  )
}
