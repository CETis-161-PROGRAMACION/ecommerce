import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { MotorcycleIcon } from '@/components/ui/MotorcycleIcon'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { ROUTES } from '@/router/routes'

interface DeliveryOrder {
  id: string
  store: string
  client: string
  product: string
  price: string
  time: string
  address: string
}

export function DeliveryOrdersPage() {
  const navigate = useNavigate()
  const [selectedStore, setSelectedStore] = useState<string>('all')

  const stores = ['KUNDERA', 'SANTORI', 'CUATRO CAFÉ', 'TU MESA']

  const orders: DeliveryOrder[] = [
    {
      id: 'ord-1',
      store: 'KUNDERA',
      client: 'Michell Hernandez',
      product: 'Principito',
      price: '$80.00',
      time: '6:00pm',
      address: 'Adoquinada #19',
    },
    {
      id: 'ord-2',
      store: 'SANTORI',
      client: 'Michell Hernandez',
      product: 'Principito',
      price: '$80.00',
      time: '6:00pm',
      address: 'Centro #17A',
    },
  ]

  const filteredOrders =
    selectedStore === 'all'
      ? orders
      : orders.filter((o) => o.store === selectedStore)

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-7xl pb-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Tarjeta Perfil Repartidor (Columna Izquierda) */}
          <aside
            aria-label="Perfil del repartidor"
            className="flex w-full flex-col items-center justify-between rounded-3xl border border-line bg-surface p-8 shadow-xs lg:w-80 lg:min-h-[580px]"
          >
            <div className="flex flex-col items-center text-center">
              {/* Avatar circular */}
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-slate-200 shadow-inner sm:h-36 sm:w-36">
                <svg
                  className="h-20 w-20 text-slate-500 sm:h-24 sm:w-24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              {/* Datos del repartidor */}
              <h2 className="text-xl font-black uppercase tracking-wider text-ink">
                NOMBRE
              </h2>
              <p className="mt-3 text-sm font-semibold text-ink-muted">
                Tipo de moto
              </p>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                Descripción
              </p>
            </div>

            {/* Icono de moto al fondo de la tarjeta */}
            <div className="mt-8 text-ink-muted">
              <MotorcycleIcon size={44} className="text-ink-muted/80" />
            </div>
          </aside>

          {/* Columna Derecha: Filtros de sucursales y Pedidos disponibles */}
          <section className="flex-1 space-y-6" aria-label="Pedidos disponibles para entrega">
            {/* Filtros de sucursal tipo píldora */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedStore('all')}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-extrabold tracking-wide uppercase transition shadow-xs ${
                  selectedStore === 'all'
                    ? 'border-2 border-brand-400 bg-brand-100/50 text-navy-900'
                    : 'border border-line bg-surface text-ink hover:border-brand-400'
                }`}
              >
                TODOS
              </button>

              {stores.map((store) => {
                const isSelected = selectedStore === store
                return (
                  <button
                    key={store}
                    type="button"
                    onClick={() => setSelectedStore(store)}
                    className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-extrabold tracking-wide uppercase transition shadow-xs ${
                      isSelected
                        ? 'border-2 border-brand-400 bg-brand-100/50 text-navy-900'
                        : 'border border-line bg-surface text-ink hover:border-brand-400'
                    }`}
                  >
                    {store}
                  </button>
                )
              })}
            </div>

            {/* Lista de Pedidos */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <article
                  key={order.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-6 shadow-xs transition hover:shadow-md"
                >
                  {/* Detalles del pedido */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-lg font-black uppercase text-ink">
                      {order.store}
                    </h3>
                    <p className="text-base font-semibold text-red-500 underline">
                      {order.client}
                    </p>
                    <p className="text-sm font-bold text-ink">
                      {order.product}{' '}
                      <span className="font-normal text-ink-muted">{order.price}</span>
                    </p>
                    <p className="text-xs font-semibold text-ink-muted">
                      {order.time}
                    </p>
                  </div>

                  {/* Vista previa del mapa */}
                  <div className="w-full sm:w-48 h-28 shrink-0 overflow-hidden rounded-2xl border border-line shadow-xs">
                    <MapSnippet
                      label={order.address}
                      heightClass="h-full"
                    />
                  </div>

                  {/* Botón Aceptar Pedido */}
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.deliveryOrderDetail)}
                    className="flex flex-col items-center justify-center gap-1 w-full sm:w-32 h-24 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 shadow-xs transition hover:bg-emerald-200 active:scale-95 cursor-pointer p-2 shrink-0"
                  >
                    <MotorcycleIcon size={26} className="text-emerald-900" />
                    <span className="text-xs font-black text-center leading-tight">
                      Aceptar Pedido
                    </span>
                  </button>
                </article>
              ))}

              {filteredOrders.length === 0 && (
                <div className="rounded-3xl border border-dashed border-line p-12 text-center text-ink-muted">
                  No hay pedidos pendientes para esta sucursal en este momento.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </NavBar>
  )
}
