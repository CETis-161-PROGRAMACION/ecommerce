import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import {
  ROUTES,
  orderDeliveredPath,
  orderTrackingPath,
} from '@/router/routes'
import {
  STATUS_LABELS,
  fetchMyOrders,
  type OrderSummaryRow,
} from '@/services/order/orders'
import { formatPrice } from '@/utils/currency'

type OrdersState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; orders: OrderSummaryRow[] }

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

const dateFormat = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function OrdersPage() {
  const [state, setState] = useState<OrdersState>({ status: 'loading' })

  useEffect(() => {
    let isActive = true
    fetchMyOrders()
      .then((orders) => {
        if (isActive) setState({ status: 'ready', orders })
      })
      .catch((caught: unknown) => {
        if (!isActive) return
        setState({
          status: 'error',
          message:
            caught instanceof Error
              ? caught.message
              : 'No pudimos cargar tus pedidos.',
        })
      })
    return () => {
      isActive = false
    }
  }, [])

  return (
    <NavBar backTo={ROUTES.home}>
      <section className="mx-auto w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-ink">Pedidos recientes</h1>

        {state.status === 'loading' && (
          <p role="status" className="text-sm text-ink-muted">
            Cargando pedidos…
          </p>
        )}
        {state.status === 'error' && (
          <p role="alert" className="text-sm text-red-700 dark:text-red-400">
            {state.message}
          </p>
        )}

        {state.status === 'ready' && state.orders.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
            <p className="text-ink">Todavía no has hecho pedidos.</p>
            <Link
              to={ROUTES.home}
              className={`rounded-full bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
            >
              Ver productos
            </Link>
          </div>
        )}

        {state.status === 'ready' && state.orders.length > 0 && (
          <ul className="flex flex-col gap-3">
            {state.orders.map((order) => {
              const isFinished =
                order.status === 'delivered' || order.status === 'cancelled'
              return (
                <li key={order.id}>
                  <Link
                    to={
                      order.status === 'delivered'
                        ? orderDeliveredPath(order.id)
                        : orderTrackingPath(order.id)
                    }
                    className={`flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:bg-brand-100 ${focusRing}`}
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        {STATUS_LABELS[order.status]}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {dateFormat.format(new Date(order.createdAt))}
                        {' · '}
                        {order.pickupMethod === 'delivery'
                          ? 'A domicilio'
                          : 'Recoger en tienda'}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold text-ink">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {isFinished ? 'Ver detalle' : 'Dar seguimiento'}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </NavBar>
  )
}
