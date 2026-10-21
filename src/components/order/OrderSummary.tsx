import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { StarIcon } from '@/components/ui/StarIcon'
import { ROUTES } from '@/router/routes'
import type { Product } from '@/types'
import { formatMoney } from '@/utils/money'

interface OrderSummaryProps {
  producto: Product
  opciones: Record<string, string[]>
  nombreDestinatario: string
  precioProducto: number
  servicio?: number
  destacado?: boolean
}

/**
 * Resumen del pedido: producto, opciones elegidas, destinatario y desglose
 * de importes. Lo comparten las pantallas de información y de seguimiento
 * para que el formato sea idéntico en ambas.
 */
export function OrderSummary({
  producto,
  opciones,
  nombreDestinatario,
  precioProducto,
  servicio = 25,
  destacado = false,
}: OrderSummaryProps) {
  const total = precioProducto + servicio
  const selections = Object.entries(opciones).filter(
    ([, valores]) => valores.length > 0,
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-black text-ink sm:text-2xl">Pedido</h2>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row">
          <div className="flex h-52 w-full shrink-0 items-center justify-center rounded-3xl border border-warm-border bg-warm-card p-4 shadow-xs sm:w-44">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="h-full w-auto object-contain drop-shadow-xs"
            />
          </div>

          <div
            className={`flex flex-1 justify-between rounded-3xl bg-surface p-5 shadow-xs ${
              destacado ? 'border-2 border-success' : 'border border-line'
            }`}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-ink">{producto.nombre}</h3>
              {selections.length > 0 ? (
                selections.map(([titulo, valores]) => (
                  <p key={titulo} className="text-base text-ink-muted">
                    {titulo}: {valores.join(', ')}
                  </p>
                ))
              ) : (
                <p className="text-base text-ink-muted">Sin opciones extra</p>
              )}
            </div>

            <div className="flex flex-col justify-between text-right">
              <div>
                <p className="text-sm font-semibold text-ink-muted">Costo</p>
                <p className="text-lg font-bold text-ink">
                  {formatMoney(precioProducto)}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-ink-muted">Cantidad</p>
                <p className="text-lg font-bold text-ink">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-bold text-ink">
            {nombreDestinatario}
          </span>
          <Link
            to={ROUTES.userDestiny}
            className="rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold text-navy-900 transition-colors hover:bg-brand-200"
          >
            Cambiar destinatario
          </Link>
        </div>

        <div className="mt-4 space-y-2 text-base text-ink">
          <div className="flex items-center justify-between">
            <span className="flex-1">{producto.nombre}</span>
            <span className="mx-2 flex-1 border-b border-dotted border-line" />
            <span className="font-bold">{formatMoney(precioProducto)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex-1">Servicio</span>
            <span className="mx-2 flex-1 border-b border-dotted border-line" />
            <span className="font-bold">{formatMoney(servicio)}</span>
          </div>

          <div className="flex items-center justify-between border-t border-line/80 pt-2 text-lg">
            <span className="font-black text-ink">Total</span>
            <span className="mx-2 flex-1 border-b border-dotted border-line" />
            <span className="font-black text-ink">{formatMoney(total)}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

/** Dirección guardada del cliente, con acceso para modificarla. */
export function AddressBlock({ direccion }: { direccion: string }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-black text-ink sm:text-2xl">
        Ubicación
      </h2>

      <div className="rounded-3xl border border-line bg-surface p-5 shadow-xs">
        <p className="flex items-center gap-2 text-base font-semibold text-ink">
          <StarIcon className="text-warning" size={18} />
          <span>{direccion}</span>
        </p>

        <div className="pt-2">
          <Link
            to={ROUTES.clienteDireccion}
            className="text-sm font-medium text-ink-muted underline underline-offset-4 transition-colors hover:text-navy-900"
          >
            Seleccionar otra
          </Link>
        </div>
      </div>
    </div>
  )
}
