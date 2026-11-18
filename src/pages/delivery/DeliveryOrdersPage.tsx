
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bike,
  Clock3,
  MapPin,
  Package,
  Phone,
  Store,
  UserRound,
} from 'lucide-react'

import { ROUTES, deliveryOrderPath } from '@/router/routes'
import {
  acceptOrder,
  fetchAvailableOrders,
  type DriverOrder,
} from '@/services/driver/driver'
import { useApplication } from '@/services/driver/useApplication'
import { usePolled } from '@/services/driver/usePolled'
import { useSession } from '@/services/session/session'
import { formatPrice } from '@/utils/currency'

function timeAgo(isoDate: string) {
  const minutes = Math.max(
    0,
    Math.round((Date.now() - new Date(isoDate).getTime()) / 60000),
  )
  if (minutes < 1) return 'Hace un momento'
  if (minutes < 60) return `Hace ${minutes} min`
  return `Hace ${Math.floor(minutes / 60)} h`
}

export function DeliveryOrdersPage() {
  const navigate = useNavigate()

  const { profile } = useSession()
  const application = useApplication()
  const isApproved = application.data?.status === 'approved'
  const loadOrders = useCallback(
    () => (isApproved ? fetchAvailableOrders() : Promise.resolve<DriverOrder[]>([])),
    [isApproved],
  )
  const orders = usePolled(loadOrders)

  const [establecimientoActual, setEstablecimientoActual] =
    useState('Todos')
  const [acceptingId, setAcceptingId] = useState('')
  const [acceptError, setAcceptError] = useState('')

  const todos = orders.data ?? []
  const establecimientos = ['Todos', ...new Set(todos.map((p) => p.businessName))]
  const pedidosFiltrados = todos.filter(
    (pedido) =>
      establecimientoActual === 'Todos' ||
      pedido.businessName === establecimientoActual,
  )

  async function handleAccept(orderId: string) {
    setAcceptingId(orderId)
    setAcceptError('')
    try {
      await acceptOrder(orderId)
      navigate(deliveryOrderPath(orderId))
    } catch (caught) {
      setAcceptError(
        caught instanceof Error ? caught.message : 'No pudimos aceptar el pedido.',
      )
      orders.reload()
    } finally {
      setAcceptingId('')
    }
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Encabezado */}
        <header className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(ROUTES.deliveryHome)}
            className="flex items-center gap-2 rounded-xl p-2 text-ink transition hover:bg-surface-secondary"
          >
            <ArrowLeft size={22} />
            <span className="text-sm font-semibold">
              Volver al inicio
            </span>
          </button>

          <div className="flex items-center gap-2 text-ink">
            <Bike size={26} />
            <span className="hidden font-bold sm:inline">
              Panel del repartidor
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* Perfil del repartidor */}
          <aside className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-navy-900">
                <UserRound size={42} />
              </div>

              <h2 className="mt-3 text-lg font-bold text-ink">
                {profile?.fullName ?? 'Repartidor'}
              </h2>

              <p className="text-sm text-ink-muted">
                Repartidor
              </p>
            </div>

            <div className="my-5 border-t border-line" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Bike className="shrink-0 text-brand-400" size={22} />

                <div>
                  <p className="text-xs text-ink-muted">
                    Vehículo
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    {application.data?.vehicle ?? 'Sin registrar'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package className="shrink-0 text-brand-400" size={22} />

                <div>
                  <p className="text-xs text-ink-muted">
                    Pedidos disponibles
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    {pedidosFiltrados.length} pedidos
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(ROUTES.deliveryHome)}
              className="mt-6 w-full rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:bg-surface-secondary"
            >
              Ir al inicio
            </button>
          </aside>

          {/* Contenido principal */}
          <section className="min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-ink sm:text-3xl">
                Pedidos disponibles
              </h1>

              <p className="mt-1 text-sm text-ink-muted">
                Revisa los pedidos pendientes y selecciona uno para entregar.
              </p>
            </div>

            {application.data && !isApproved && (
              <p
                role="status"
                className="mb-6 rounded-xl border border-line bg-surface p-4 text-sm font-semibold text-ink"
              >
                Tu solicitud de repartidor aún no está aprobada, así que todavía
                no puedes ver ni aceptar pedidos.
              </p>
            )}

            {orders.error && (
              <p role="alert" className="mb-4 text-sm font-semibold text-red-600 dark:text-red-400">
                {orders.error}
              </p>
            )}

            {acceptError && (
              <p role="alert" className="mb-4 text-sm font-semibold text-red-600 dark:text-red-400">
                {acceptError}
              </p>
            )}

            {/* Filtros */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <Store size={19} className="text-ink-muted" />

                <h2 className="text-sm font-bold text-ink">
                  Filtrar por establecimiento
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {establecimientos.map((establecimiento) => (
                  <button
                    key={establecimiento}
                    type="button"
                    onClick={() =>
                      setEstablecimientoActual(establecimiento)
                    }
                    className={`rounded-full border px-4 py-2 text-xs font-bold transition sm:text-sm ${
                      establecimientoActual === establecimiento
                        ? 'border-brand-400 bg-brand-100 text-navy-900'
                        : 'border-line bg-surface text-ink-muted hover:border-brand-200'
                    }`}
                  >
                    {establecimiento}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de pedidos */}
            <div className="space-y-4">
              {pedidosFiltrados.length > 0 ? (
                pedidosFiltrados.map((pedido) => (
                  <article
                    key={pedido.id}
                    className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5"
                  >
                    {/* Nombre y hora */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-ink-muted">
                          PEDIDO #{pedido.id.slice(0, 8).toUpperCase()}
                        </span>

                        <h3 className="mt-1 text-lg font-bold text-ink">
                          {pedido.businessName}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-brand-100 px-3 py-2 text-xs font-semibold text-navy-900">
                        <Clock3 size={15} />
                        {timeAgo(pedido.createdAt)}
                      </div>
                    </div>

                    <div className="my-4 border-t border-line" />

                    {/* Información del cliente */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-ink-muted">
                            Cliente
                          </p>

                          <p className="text-sm font-semibold text-ink">
                            {pedido.recipientName ?? 'Cliente'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-ink-muted" />

                          <span className="text-sm text-ink">
                            {pedido.recipientPhone ?? 'Sin teléfono'}
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin
                            size={17}
                            className="mt-0.5 shrink-0 text-ink-muted"
                          />

                          <span className="text-sm text-ink">
                            {pedido.deliveryAddress ?? 'Sin dirección'}
                          </span>
                        </div>
                      </div>

                      {/* Productos */}
                      <div className="rounded-xl bg-surface-secondary p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <Package size={17} className="text-ink-muted" />

                          <p className="text-xs font-bold text-ink">
                            Productos solicitados
                          </p>
                        </div>

                        <ul className="space-y-1">
                          {pedido.items.map((item) => (
                            <li
                              key={item.id}
                              className="text-sm text-ink-muted"
                            >
                              {item.quantity} × {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Precio y botón */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                      <div>
                        <p className="text-xs text-ink-muted">
                          Total del pedido
                        </p>

                        <p className="text-xl font-bold text-ink">
                          {formatPrice(pedido.total)}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={acceptingId !== ''}
                        onClick={() => handleAccept(pedido.id)}
                        className="rounded-xl bg-brand-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {acceptingId === pedido.id ? 'Aceptando…' : 'Aceptar pedido'}
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-line bg-surface p-10 text-center">
                  <Package
                    size={36}
                    className="mx-auto mb-3 text-ink-muted"
                  />

                  <p className="font-semibold text-ink">
                    No hay pedidos disponibles
                  </p>

                  <p className="mt-1 text-sm text-ink-muted">
                    {orders.loading
                      ? 'Cargando…'
                      : 'Cuando un cliente pida a domicilio, aparecerá aquí.'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
