import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { AddressBlock, OrderSummary } from '@/components/order/OrderSummary'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ChatIcon } from '@/components/ui/ChatIcon'
import { EmptyState } from '@/components/ui/EmptyState'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { MotorcycleIcon } from '@/components/ui/MotorcycleIcon'
import { PhoneIcon } from '@/components/ui/PhoneIcon'
import { PinIcon } from '@/components/ui/PinIcon'
import { StatusBadge, type StatusTone } from '@/components/ui/StatusBadge'
import { StoreIcon } from '@/components/ui/StoreIcon'
import { useApp } from '@/context/useApp'
import { findProduct, products } from '@/data/products'
import { ROUTES } from '@/router/routes'
import type { OrderStatus } from '@/types'

const SERVICIO = 25

const estadoInfo: Record<
  OrderStatus,
  { titulo: string; descripcion: string; avance: string; tono: StatusTone }
> = {
  disponible: {
    titulo: 'Pedido recibido',
    descripcion: 'La sucursal ya recibió tu pedido.',
    avance: 'w-1/4',
    tono: 'info',
  },
  asignado: {
    titulo: 'Repartidor asignado',
    descripcion: 'Un repartidor tomó tu pedido.',
    avance: 'w-2/4',
    tono: 'warning',
  },
  'en-camino': {
    titulo: 'Repartidor en camino',
    descripcion: 'Tu pedido va en camino a la dirección capturada.',
    avance: 'w-3/4',
    tono: 'success',
  },
  entregado: {
    titulo: 'Pedido entregado',
    descripcion: 'El pedido fue entregado con éxito.',
    avance: 'w-full',
    tono: 'success',
  },
}

export function OrderTrackingPage() {
  const navigate = useNavigate()
  const {
    orders,
    ultimoPedidoId,
    selection,
    address,
    recipient,
    confirmReceipt,
  } = useApp()

  const [mensaje, setMensaje] = useState('')
  const [enviados, setEnviados] = useState<string[]>([])
  const [errorEntrega, setErrorEntrega] = useState('')

  const pedido = orders.find((item) => item.id === ultimoPedidoId)
  const producto = selection
    ? findProduct(selection.productId)
    : pedido
      ? products.find((item) => item.nombre === pedido.producto)
      : undefined

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!mensaje.trim()) return

    setEnviados((previos) => [...previos, mensaje.trim()])
    setMensaje('')
  }

  if (!pedido || !producto) {
    return (
      <NavBar>
        <div className="mx-auto w-full max-w-6xl pb-16">
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Estado del pedido
          </h1>
          <EmptyState
            title="Todavía no hay un pedido en curso"
            description="Cuando hagas un pedido podrás seguir aquí su avance."
            action={
              <Link
                to={ROUTES.home}
                className="font-semibold text-navy-900 underline underline-offset-4"
              >
                Ir al catálogo
              </Link>
            }
          />
        </div>
      </NavBar>
    )
  }

  const info = estadoInfo[pedido.estado]
  const direccion = address
    ? `${address.calle} ${address.numero}, ${address.colonia}`
    : pedido.direccion

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-6xl pb-16">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Estado del pedido
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <section className="space-y-8" aria-label="Resumen de la orden">
            <OrderSummary
              producto={producto}
              opciones={selection?.opciones ?? {}}
              nombreDestinatario={recipient?.nombre ?? pedido.cliente}
              precioProducto={pedido.precio}
              servicio={SERVICIO}
              destacado={pedido.estado === 'entregado'}
            />

            <AddressBlock direccion={direccion} />
          </section>

          <section className="space-y-6" aria-label="Rastreo y repartidor">
            <MapSnippet label={direccion} />

            <Card className="text-center">
              <StatusBadge tone={info.tono}>{info.titulo}</StatusBadge>
              <h2 className="mt-3 text-2xl font-black text-ink">
                {info.titulo}
              </h2>
              <p className="mt-1 text-sm font-semibold text-ink-muted">
                {info.descripcion}
              </p>

              <div className="px-4 pt-6 pb-2">
                <div className="mb-1 flex items-center justify-between text-ink-muted">
                  <span title="Sucursal" aria-label="Sucursal">
                    <StoreIcon size={22} />
                  </span>
                  <span
                    title="Repartidor"
                    aria-label="Repartidor"
                    className="-translate-y-1 text-brand-400 motion-safe:animate-bounce"
                  >
                    <MotorcycleIcon size={26} />
                  </span>
                  <span title="Destino" aria-label="Destino">
                    <PinIcon size={22} />
                  </span>
                </div>

                <div className="relative h-2 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full bg-brand-400 transition-all ${info.avance}`}
                  />
                </div>
              </div>

              <p className="text-xs text-ink-muted">
                Pedido {pedido.id} · {pedido.sucursal} · {pedido.hora}
              </p>
            </Card>

            <Card>
              <h3 className="text-base font-bold text-ink">
                Comunicarse con el repartidor
              </h3>

              <form
                onSubmit={manejarEnvio}
                className="mt-3 flex items-center gap-2"
              >
                <span className="text-ink-muted">
                  <ChatIcon size={20} />
                </span>
                <input
                  type="text"
                  value={mensaje}
                  onChange={(evento) => setMensaje(evento.target.value)}
                  placeholder="Enviar mensaje..."
                  aria-label="Mensaje para el repartidor"
                  className="h-10 min-w-0 flex-1 rounded-full border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
                />
                <Button type="submit" size="sm">
                  Enviar
                </Button>
              </form>

              {enviados.length > 0 ? (
                <ul className="mt-3 space-y-1">
                  {enviados.map((texto, indice) => (
                    <li
                      key={`${texto}-${indice}`}
                      className="rounded-xl bg-brand-100/60 px-3 py-2 text-sm text-navy-900"
                    >
                      {texto}
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-2 text-xs text-ink-muted">
                Los mensajes se guardan solo en este navegador (modo demo).
              </p>

              <a
                href={`tel:${pedido.telefono}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-100/40"
              >
                <PhoneIcon size={18} />
                <span>Llamar al repartidor</span>
              </a>
            </Card>

            <div className="pt-2">
              {pedido.estado === 'entregado' ? (
                <div className="notice notice-success space-y-3 text-center">
                  <p className="font-bold">¡Pedido entregado con éxito!</p>
                  <Button
                    type="button"
                    onClick={() => navigate(ROUTES.home)}
                    className="mx-auto"
                  >
                    Volver al inicio
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {errorEntrega ? (
                    <p role="alert" className="notice notice-danger">
                      {errorEntrega}
                    </p>
                  ) : null}

                  <Button
                    type="button"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      const resultado = confirmReceipt(pedido.id)

                      if (!resultado.ok) {
                        setErrorEntrega(
                          resultado.error ?? 'No pudimos confirmar el pedido.',
                        )
                      }
                    }}
                  >
                    Marcar como recibido
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </NavBar>
  )
}
