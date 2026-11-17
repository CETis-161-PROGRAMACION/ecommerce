
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  Bike,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Store,
  UserRound,
  X,
} from 'lucide-react'

import { ROUTES } from '@/router/routes'
import { deliveryOrdersDemo } from './deliveryOrders.data'

export function DeliveryOrderDetailPage() {
  const navigate = useNavigate()
  const { pedidoId } = useParams()

  const [mostrarReporte, setMostrarReporte] = useState(false)
  const [motivoReporte, setMotivoReporte] = useState('')
  const [detalleReporte, setDetalleReporte] = useState('')
  const [reporteEnviado, setReporteEnviado] = useState(false)

  const [confirmarEntrega, setConfirmarEntrega] = useState(false)
  const [pedidoEntregado, setPedidoEntregado] = useState(false)

  const pedido = deliveryOrdersDemo.find(
    (item) => item.id === Number(pedidoId),
  )

  // Si el pedido no existe
  if (!pedido) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="max-w-md rounded-2xl border border-line bg-surface p-8 text-center shadow-sm">
          <Package size={42} className="mx-auto mb-4 text-ink-muted" />

          <h1 className="text-xl font-bold text-ink">
            Pedido no encontrado
          </h1>

          <p className="mt-2 text-sm text-ink-muted">
            El pedido solicitado no existe o ya no está disponible.
          </p>

          <button
            type="button"
            onClick={() => navigate(ROUTES.deliveryOrders)}
            className="mt-5 rounded-xl bg-brand-400 px-5 py-3 text-sm font-bold text-white hover:bg-brand-500"
          >
            Volver a los pedidos
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* Encabezado */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.deliveryOrders)}
            className="flex items-center gap-2 rounded-xl p-2 text-ink transition hover:bg-surface-secondary"
          >
            <ArrowLeft size={22} />
            <span className="text-sm font-semibold">
              Volver a los pedidos
            </span>
          </button>

          <div className="flex items-center gap-2 text-ink">
            <Bike size={25} />
            <span className="font-bold">
              Panel del repartidor
            </span>
          </div>
        </header>

        {/* Título */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-ink sm:text-3xl">
              Detalle del pedido
            </h1>

            <p className="mt-1 text-sm text-ink-muted">
              Consulta la información antes de realizar la entrega.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              pedidoEntregado
                ? 'bg-green-100 text-green-800'
                : 'bg-brand-100 text-navy-900'
            }`}
          >
            {pedidoEntregado ? 'Entregado' : `Pedido #${pedido.id}`}
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* Información principal */}
          <section className="space-y-5">

            {/* Establecimiento */}
            <article className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-navy-900">
                  <Store size={26} />
                </div>

                <div>
                  <p className="text-xs text-ink-muted">
                    Establecimiento
                  </p>

                  <h2 className="text-lg font-bold text-ink">
                    {pedido.establishment}
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-line pt-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Clock3 size={19} className="text-ink-muted" />

                  <div>
                    <p className="text-xs text-ink-muted">
                      Tiempo del pedido
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      {pedido.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Package size={19} className="text-ink-muted" />

                  <div>
                    <p className="text-xs text-ink-muted">
                      Número de pedido
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      #{pedido.id}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Productos */}
            <article className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Package size={21} className="text-ink-muted" />

                <h2 className="text-lg font-bold text-ink">
                  Productos del pedido
                </h2>
              </div>

              <div className="space-y-3">
                {pedido.products.map((producto, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-surface-secondary p-3"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-navy-900">
                      <Package size={25} />
                    </div>

                    <p className="text-sm font-semibold text-ink">
                      {producto}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="font-semibold text-ink">
                  Total del pedido
                </span>

                <span className="text-xl font-bold text-ink">
                  {pedido.total.toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  })}
                </span>
              </div>
            </article>

            {/* Reportar problema */}
            <article className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={23}
                  className="shrink-0 text-orange-500"
                />

                <div>
                  <h2 className="font-bold text-ink">
                    ¿Hay algún problema?
                  </h2>

                  <p className="mt-1 text-sm text-ink-muted">
                    Informa si existe algún inconveniente con este pedido.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMostrarReporte(!mostrarReporte)}
                className="mt-4 w-full rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink transition hover:bg-surface-secondary"
              >
                {mostrarReporte ? 'Cancelar reporte' : 'Reportar un error'}
              </button>

              {mostrarReporte && (
                <div className="mt-4 space-y-3 border-t border-line pt-4">
                  <label className="block text-sm font-semibold text-ink">
                    Motivo del reporte
                  </label>

                  <select
                    value={motivoReporte}
                    onChange={(event) => setMotivoReporte(event.target.value)}
                    className="w-full rounded-xl border border-line bg-surface px-3 py-3 text-sm text-ink outline-none focus:border-brand-400"
                  >
                    <option value="">Selecciona un motivo</option>
                    <option value="Producto incorrecto">
                      Producto incorrecto
                    </option>
                    <option value="Establecimiento cerrado">
                      Establecimiento cerrado
                    </option>
                    <option value="Problema con el cliente">
                      Problema con el cliente
                    </option>
                    <option value="Problema con la ubicación">
                      Problema con la ubicación
                    </option>
                    <option value="Otro">Otro</option>
                  </select>

                  <textarea
                    value={detalleReporte}
                    onChange={(event) => setDetalleReporte(event.target.value)}
                    placeholder="Describe brevemente el problema..."
                    rows={3}
                    className="w-full resize-y rounded-xl border border-line bg-surface p-3 text-sm text-ink outline-none focus:border-brand-400"
                  />

                  <button
                    type="button"
                    disabled={!motivoReporte}
                    onClick={() => {
                      setReporteEnviado(true)
                      setMostrarReporte(false)
                    }}
                    className="w-full rounded-xl bg-brand-400 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Enviar reporte
                  </button>
                </div>
              )}

              {reporteEnviado && (
                <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-800">
                  Reporte registrado localmente. Se necesitará conectar el servicio para enviarlo al sistema.
                </p>
              )}
            </article>
          </section>

          {/* Información del cliente */}
          <aside className="space-y-5">
            <article className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <UserRound size={21} className="text-ink-muted" />

                <h2 className="text-lg font-bold text-ink">
                  Información del cliente
                </h2>
              </div>

              <h3 className="text-base font-bold text-ink">
                {pedido.customer}
              </h3>

              <a
                href={`tel:${pedido.phone.replace(/\s/g, '')}`}
                className="mt-3 flex items-center gap-2 text-sm text-ink-muted transition hover:text-brand-500"
              >
                <Phone size={18} />
                {pedido.phone}
              </a>

              <div className="my-5 border-t border-line" />

              <div className="flex items-start gap-3">
                <MapPin
                  size={21}
                  className="mt-0.5 shrink-0 text-brand-400"
                />

                <div>
                  <p className="text-xs font-semibold text-ink-muted">
                    Dirección de entrega
                  </p>

                  <p className="mt-1 text-sm font-semibold text-ink">
                    {pedido.address}
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pedido.address)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block rounded-xl border border-line px-4 py-3 text-center text-sm font-bold text-ink transition hover:bg-surface-secondary"
              >
                Ver ubicación
              </a>
            </article>

            {/* Estado de entrega */}
            <article className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              {pedidoEntregado ? (
                <div className="text-center">
                  <CheckCircle2
                    size={44}
                    className="mx-auto mb-3 text-green-600"
                  />

                  <h2 className="font-bold text-green-800">
                    Pedido entregado
                  </h2>

                  <p className="mt-2 text-sm text-ink-muted">
                    La entrega se ha marcado como completada en esta demostración.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-2 text-lg font-bold text-ink">
                    Finalizar entrega
                  </h2>

                  <p className="mb-4 text-sm text-ink-muted">
                    Confirma cuando hayas entregado todos los productos al cliente.
                  </p>

                  <button
                    type="button"
                    onClick={() => setConfirmarEntrega(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    <CheckCircle2 size={19} />
                    Marcar como entregado
                  </button>
                </>
              )}
            </article>
          </aside>
        </div>
      </div>

      {/* Confirmación de entrega */}
      {confirmarEntrega && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">
                Confirmar entrega
              </h2>

              <button
                type="button"
                onClick={() => setConfirmarEntrega(false)}
                aria-label="Cerrar"
                className="rounded-lg p-2 text-ink-muted hover:bg-surface-secondary"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-3 text-sm text-ink-muted">
              ¿Confirmas que el pedido #{pedido.id} fue entregado correctamente?
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmarEntrega(false)}
                className="flex-1 rounded-xl border border-line px-4 py-3 text-sm font-bold text-ink hover:bg-surface-secondary"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => {
                  setPedidoEntregado(true)
                  setConfirmarEntrega(false)
                }}
                className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
