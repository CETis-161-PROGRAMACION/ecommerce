import { paymentLabel } from '@/services/payment/paymentMethods'
import type { Order } from '@/services/order/orders'
import { formatPrice } from '@/utils/currency'

interface OrderSummaryProps {
  order: Order
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const isDelivery = order.pickupMethod === 'delivery'

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="summary-items-title">
        <h2
          id="summary-items-title"
          className="mb-4 text-xl font-bold text-ink"
        >
          Pedidos
        </h2>

        <ul className="flex flex-col gap-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-24 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-32"
                />
              )}
              <div className="flex min-w-0 flex-1 justify-between gap-4 rounded-2xl border-2 border-success bg-surface p-4 sm:max-w-sm">
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
                    {formatPrice(item.unitPrice)}
                  </dd>
                  <dt className="font-semibold text-ink">Cantidad</dt>
                  <dd className="text-ink-muted">{item.quantity}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="summary-address-title">
        <h2
          id="summary-address-title"
          className="mb-3 text-xl font-bold text-ink"
        >
          {isDelivery ? 'Ubicación' : 'Entrega'}
        </h2>
        <p className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-ink">
          {isDelivery
            ? (order.deliveryAddress ?? 'Sin dirección')
            : 'Recoger en tienda'}
        </p>
      </section>

      <section aria-labelledby="summary-total-title" className="sm:max-w-md">
        <h2 id="summary-total-title" className="sr-only">
          Resumen del pedido
        </h2>
        <p className="mb-2 text-sm font-semibold text-ink">
          {order.recipientName}
        </p>
        <dl className="flex flex-col gap-1 text-sm text-ink">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-baseline gap-2">
              <dt className="min-w-0 truncate">
                {item.name}
                {item.quantity > 1 && ` ×${item.quantity}`}
              </dt>
              <span
                aria-hidden="true"
                className="min-w-4 flex-1 border-b border-dotted border-line"
              />
              <dd>{formatPrice(item.unitPrice * item.quantity)}</dd>
            </div>
          ))}
          <div className="flex items-baseline gap-2">
            <dt>Servicio</dt>
            <span
              aria-hidden="true"
              className="min-w-4 flex-1 border-b border-dotted border-line"
            />
            <dd>{formatPrice(order.serviceFee)}</dd>
          </div>
          <div className="flex items-baseline gap-2 font-bold">
            <dt>Total</dt>
            <span
              aria-hidden="true"
              className="min-w-4 flex-1 border-b border-dotted border-line"
            />
            <dd>{formatPrice(order.total)}</dd>
          </div>
          <div className="flex items-baseline gap-2 text-ink-muted">
            <dt>Pago</dt>
            <span
              aria-hidden="true"
              className="min-w-4 flex-1 border-b border-dotted border-line"
            />
            <dd>{paymentLabel(order.paymentMethod)}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
