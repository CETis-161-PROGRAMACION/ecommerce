import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { groupByBusiness, useCart } from '@/services/cart/cart'
import { RECIPIENT_NAME, SERVICE_FEE } from '@/services/order/orderDetails'
import { formatPrice } from '@/utils/currency'

interface OrderSummaryProps {
  address: string
}

export function OrderSummary({ address }: OrderSummaryProps) {
  const { items } = useCart()
  const orders = groupByBusiness(items)
  const subtotal = orders.reduce((sum, order) => sum + order.subtotal, 0)
  const serviceTotal = SERVICE_FEE * orders.length
  const total = subtotal + serviceTotal

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="summary-items-title">
        <h2
          id="summary-items-title"
          className="mb-4 text-xl font-bold text-ink"
        >
          Pedidos
        </h2>

        {items.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-4">
                <img
                  src={item.image}
                  alt={`${item.name} de ${item.business}`}
                  className="h-28 w-24 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-32"
                />
                <div className="flex min-w-0 flex-1 justify-between gap-4 rounded-2xl border-2 border-success bg-surface p-4 sm:max-w-sm">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">{item.business}</p>
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
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line bg-surface p-6">
            <p className="text-ink">No hay productos en este pedido.</p>
            <Link
              to={ROUTES.sucursales}
              className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Ver sucursales
            </Link>
          </div>
        )}
      </section>

      <section aria-labelledby="summary-address-title">
        <h2
          id="summary-address-title"
          className="mb-3 text-xl font-bold text-ink"
        >
          Ubicación
        </h2>
        <p className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-ink">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-4 text-ink-muted"
          >
            <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9Z" />
          </svg>
          {address}
        </p>
      </section>

      <section aria-labelledby="summary-total-title" className="sm:max-w-md">
        <h2 id="summary-total-title" className="sr-only">
          Resumen del pedido
        </h2>
        <p className="mb-2 text-sm font-semibold text-ink">{RECIPIENT_NAME}</p>
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
            <dt>Servicio</dt>
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
  )
}
