import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { ROUTES, orderTrackingPath } from '@/router/routes'
import { fetchAddresses, formatAddress, type Address } from '@/services/address'
import {
  groupByBusiness,
  useCart,
  type BusinessOrder,
  type CartItem,
} from '@/services/cart/cart'
import { useCheckout } from '@/services/order/checkout'
import { PICKUP_METHODS, SERVICE_FEE } from '@/services/order/orderDetails'
import { placeOrder } from '@/services/order/orders'
import {
  PAYMENT_METHODS,
  paymentLabel,
  type PaymentMethod,
} from '@/services/payment/paymentMethods'
import { useSession } from '@/services/session/session'
import { formatPrice } from '@/utils/currency'
import { buildMapUrl } from '@/utils/maps'

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
  const { items, clear } = useCart()
  const { draft, update, reset } = useCheckout()
  const { status, profile } = useSession()
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isPaymentListOpen, setIsPaymentListOpen] = useState(false)
  const [isPlacing, setIsPlacing] = useState(false)
  const [error, setError] = useState('')

  const isSignedIn = status === 'signed-in'

  useEffect(() => {
    if (!isSignedIn) return
    let isActive = true
    fetchAddresses()
      .then((list) => {
        if (isActive) setAddresses(list)
      })
      .catch(() => {
        if (isActive) setError('No pudimos cargar tus direcciones.')
      })
    return () => {
      isActive = false
    }
  }, [isSignedIn])

  const orders = groupByBusiness(items)
  const hasItems = orders.length > 0
  const subtotal = orders.reduce((sum, order) => sum + order.subtotal, 0)
  const serviceTotal = SERVICE_FEE * orders.length
  const total = subtotal + serviceTotal

  const isDelivery = draft.pickupMethod === 'delivery'
  const selectedAddress =
    addresses.find((address) => address.id === draft.addressId) ??
    addresses[0] ??
    null
  const recipientName = draft.recipientName ?? profile?.fullName ?? ''
  const recipientPhone = draft.recipientPhone ?? profile?.phone ?? ''

  function handlePaymentSelect(method: PaymentMethod) {
    update({ paymentMethod: method })
    setIsPaymentListOpen(false)
  }

  async function handlePlaceOrder() {
    if (!isSignedIn) {
      navigate(ROUTES.login, { state: { from: ROUTES.infoPedido } })
      return
    }
    if (isDelivery && !selectedAddress) {
      setError('Agrega una dirección de entrega para continuar.')
      return
    }
    if (!recipientName.trim()) {
      setError('Indica el nombre de quien recibe el pedido.')
      return
    }
    if (!/^\d{10}$/.test(recipientPhone)) {
      setError('Indica un teléfono de 10 dígitos de quien recibe el pedido.')
      return
    }

    setIsPlacing(true)
    setError('')
    try {
      const orderId = await placeOrder({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          options: item.options,
        })),
        pickupMethod: draft.pickupMethod,
        addressId: isDelivery ? (selectedAddress?.id ?? null) : null,
        recipientName: recipientName.trim(),
        recipientPhone,
        paymentMethod: draft.paymentMethod,
      })
      clear()
      reset()
      navigate(orderTrackingPath(orderId), { replace: true })
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'No pudimos hacer el pedido. Inténtalo de nuevo.',
      )
    } finally {
      setIsPlacing(false)
    }
  }

  return (
    <NavBar backTo={ROUTES.home}>
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
            <div className="flex flex-col gap-6">
              <fieldset className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
                <legend className="sr-only">Método de entrega</legend>
                <p aria-hidden="true" className="mb-3 text-lg font-bold text-ink">
                  Entrega
                </p>
                <div className="flex flex-col gap-2">
                  {PICKUP_METHODS.map((method) => (
                    <label
                      key={method.value}
                      className="flex cursor-pointer items-center gap-3 text-sm text-ink-muted has-checked:font-semibold has-checked:text-ink"
                    >
                      <input
                        type="radio"
                        name="pickup-method"
                        value={method.value}
                        checked={draft.pickupMethod === method.value}
                        onChange={() => update({ pickupMethod: method.value })}
                        className={`size-4 accent-brand-400 ${focusRing}`}
                      />
                      {method.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {isDelivery && (
                <fieldset className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
                  <legend className="sr-only">Ubicación de entrega</legend>
                  <p
                    aria-hidden="true"
                    className="mb-3 text-lg font-bold text-ink"
                  >
                    Ubicación
                  </p>

                  <div className="flex flex-col gap-2">
                    {!isSignedIn ? (
                      <p className="text-sm text-ink-muted">
                        Inicia sesión para elegir o agregar una dirección.
                      </p>
                    ) : addresses.length === 0 ? (
                      <p className="text-sm text-ink-muted">
                        Todavía no tienes direcciones guardadas.
                      </p>
                    ) : (
                      addresses.map((address) => (
                        <label
                          key={address.id}
                          className="flex cursor-pointer items-center gap-3 text-sm text-ink-muted has-checked:font-semibold has-checked:text-ink"
                        >
                          <input
                            type="radio"
                            name="order-address"
                            value={address.id}
                            checked={selectedAddress?.id === address.id}
                            onChange={() => update({ addressId: address.id })}
                            className={`size-4 accent-brand-400 ${focusRing}`}
                          />
                          {formatAddress(address)}
                        </label>
                      ))
                    )}

                    {isSignedIn && (
                      <Link
                        to={ROUTES.clienteDireccion}
                        className={`mt-1 pl-7 text-sm text-ink-muted underline-offset-2 hover:text-ink hover:underline ${focusRing}`}
                      >
                        Agregar una dirección
                      </Link>
                    )}
                  </div>
                </fieldset>
              )}
            </div>

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
                  {recipientName || 'Sin destinatario'}
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
              <p className="mt-2 text-xs text-ink-muted">
                El total final lo calcula el servidor al confirmar el pedido.
              </p>
            </section>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-4 sm:p-6 lg:sticky lg:top-6">
          {isDelivery && selectedAddress && (
            <section aria-labelledby="saved-location-title">
              <h2
                id="saved-location-title"
                className="mb-3 text-center text-base font-bold text-ink"
              >
                Ubicación seleccionada
              </h2>
              <iframe
                title={`Mapa de ${formatAddress(selectedAddress)}`}
                src={buildMapUrl(formatAddress(selectedAddress))}
                loading="lazy"
                className="h-48 w-full rounded-2xl border border-line"
              />
              <p className="mt-2 text-center text-sm text-ink-muted">
                {formatAddress(selectedAddress)}
              </p>
            </section>
          )}

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
              <span>{paymentLabel(draft.paymentMethod)}</span>
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
                    key={method.value}
                    className="cursor-pointer rounded-full border border-line px-4 py-1.5 text-center text-sm text-ink has-checked:border-success has-checked:bg-success/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-400"
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.value}
                      checked={draft.paymentMethod === method.value}
                      onChange={() => handlePaymentSelect(method.value)}
                      className="sr-only"
                    />
                    {method.label}
                  </label>
                ))}
              </fieldset>
            )}

            <Link
              to={ROUTES.tipoPago}
              className={`mt-2 block text-center text-xs font-semibold text-brand-500 underline underline-offset-2 ${focusRing}`}
            >
              Ver pantalla de métodos de pago
            </Link>
          </section>

          {isDelivery && isSignedIn && (
            <Link to={ROUTES.clienteDireccion} className={secondaryAction}>
              Utilizar una nueva ubicación
            </Link>
          )}

          {!isSignedIn && (
            <p className="rounded-2xl border border-line bg-background p-3 text-center text-sm text-ink">
              Necesitas una cuenta para hacer tu pedido.{' '}
              <Link
                to={ROUTES.login}
                state={{ from: ROUTES.infoPedido }}
                className={`font-semibold underline underline-offset-2 ${focusRing}`}
              >
                Inicia sesión
              </Link>
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="text-center text-sm font-semibold text-red-600 dark:text-red-400"
            >
              {error}
            </p>
          )}

          <Button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!hasItems || isPlacing}
            className="w-full bg-brand-100! py-3 text-navy-900! hover:bg-brand-200!"
          >
            {isPlacing ? 'Enviando pedido…' : 'Realizar pedido'}
          </Button>
        </aside>
      </div>
    </NavBar>
  )
}
