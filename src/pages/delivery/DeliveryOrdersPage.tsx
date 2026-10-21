import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { MotorcycleIcon } from '@/components/ui/MotorcycleIcon'
import { PillFilter } from '@/components/ui/PillFilter'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { UserIcon } from '@/components/ui/UserIcon'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'
import { formatMoney } from '@/utils/money'

export function DeliveryOrdersPage() {
  const navigate = useNavigate()
  const { orders, session, acceptOrder } = useApp()
  const [selectedStore, setSelectedStore] = useState('all')
  const [error, setError] = useState('')

  const stores = useMemo(
    () => Array.from(new Set(orders.map((order) => order.sucursal))),
    [orders],
  )

  const filteredOrders =
    selectedStore === 'all'
      ? orders
      : orders.filter((order) => order.sucursal === selectedStore)

  const nombreRepartidor = session?.nombre ?? 'Repartidor'

  function aceptar(orderId: string) {
    const resultado = acceptOrder(orderId)

    if (!resultado.ok) {
      setError(resultado.error ?? 'No pudimos tomar el pedido.')
      return
    }

    navigate(ROUTES.deliveryOrderDetail, { state: { orderId } })
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-7xl pb-16">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Pedidos disponibles
        </h1>

        {error ? (
          <p role="alert" className="notice notice-danger mb-6">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside
            aria-label="Perfil del repartidor"
            className="flex w-full flex-col items-center justify-between rounded-3xl border border-line bg-surface p-8 shadow-xs lg:w-80 lg:min-h-[580px]"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-neutral-soft shadow-inner sm:h-36 sm:w-36">
                <UserIcon className="h-20 w-20 text-neutral-strong sm:h-24 sm:w-24" />
              </div>

              <h2 className="text-xl font-black uppercase tracking-wider text-ink">
                {nombreRepartidor}
              </h2>
              <p className="mt-3 text-sm font-semibold text-ink-muted">
                Repartidor · Web E-commerce
              </p>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                Tala, Jalisco
              </p>
            </div>

            <div className="mt-8 text-ink-muted">
              <MotorcycleIcon size={44} className="text-ink-muted/80" />
            </div>
          </aside>

          <section
            className="flex-1 space-y-6"
            aria-label="Pedidos disponibles para entrega"
          >
            <div className="flex flex-wrap items-center gap-3">
              <PillFilter
                active={selectedStore === 'all'}
                onClick={() => setSelectedStore('all')}
                className="!px-6 !py-2.5 !text-sm"
              >
                Todos
              </PillFilter>

              {stores.map((store) => (
                <PillFilter
                  key={store}
                  active={selectedStore === store}
                  onClick={() => setSelectedStore(store)}
                  className="!px-6 !py-2.5 !text-sm"
                >
                  {store}
                </PillFilter>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <article
                  key={order.id}
                  className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-6 shadow-xs transition-shadow hover:shadow-md sm:flex-row"
                >
                  <div className="flex-1 space-y-1.5">
                    <h3 className="text-lg font-black uppercase text-ink">
                      {order.sucursal}
                    </h3>
                    <p className="text-base font-semibold text-ink">
                      {order.cliente}
                    </p>
                    <p className="text-sm font-bold text-ink">
                      {order.producto}{' '}
                      <span className="font-normal text-ink-muted">
                        {formatMoney(order.precio)}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <StatusBadge
                        tone={
                          order.estado === 'entregado'
                            ? 'success'
                            : order.estado === 'disponible'
                              ? 'info'
                              : 'warning'
                        }
                      >
                        {order.estado}
                      </StatusBadge>
                      <span className="text-xs font-semibold text-ink-muted">
                        {order.hora}
                      </span>
                    </div>
                  </div>

                  <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl border border-line shadow-xs sm:w-48">
                    <MapSnippet label={order.direccion} heightClass="h-full" />
                  </div>

                  <Button
                    type="button"
                    onClick={() => aceptar(order.id)}
                    className="w-full shrink-0 sm:w-32"
                  >
                    <span className="flex flex-col items-center gap-1">
                      <MotorcycleIcon size={24} className="text-navy-900" />
                      <span className="text-xs font-black leading-tight">
                        Aceptar pedido
                      </span>
                    </span>
                  </Button>
                </article>
              ))}

              {filteredOrders.length === 0 ? (
                <EmptyState
                  title="No hay pedidos pendientes"
                  description="No hay pedidos disponibles para esta sucursal en este momento."
                />
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </NavBar>
  )
}
