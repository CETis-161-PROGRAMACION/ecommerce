import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { DeliveryProgress } from '@/components/order/DeliveryProgress'
import { OrderSummary } from '@/components/order/OrderSummary'
import { ROUTES } from '@/router/routes'
import { SAVED_ADDRESSES } from '@/services/order/orderDetails'
import { buildMapUrl } from '@/utils/maps'

const DELIVERY_ADDRESS = SAVED_ADDRESSES[0]
const RATING_VALUES = [1, 2, 3, 4, 5] as const

export function OrderDeliveredPage() {
  const [rating, setRating] = useState(0)

  return (
    <NavBar>
      <h1 className="sr-only">Pedido entregado</h1>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <OrderSummary address={DELIVERY_ADDRESS} />

        <div className="flex flex-col gap-6">
          <iframe
            title={`Mapa de ${DELIVERY_ADDRESS}`}
            src={buildMapUrl(DELIVERY_ADDRESS)}
            loading="lazy"
            className="h-44 w-full rounded-2xl border border-line"
          />

          <section
            aria-labelledby="delivered-status-title"
            className="text-center"
          >
            <h2
              id="delivered-status-title"
              className="mb-4 text-base font-bold text-ink"
            >
              Pedido entregado
            </h2>
            <DeliveryProgress progress={100} label="Avance de la entrega" />
          </section>

          <fieldset className="text-center">
            <legend className="mx-auto mb-3 text-sm font-bold text-ink">
              Calificación
            </legend>
            <div className="flex justify-center gap-2">
              {RATING_VALUES.map((value) => (
                <label
                  key={value}
                  className="cursor-pointer rounded-full p-1 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-400"
                >
                  <input
                    type="radio"
                    name="order-rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                    className="sr-only"
                  />
                  <span className="sr-only">
                    {value} {value === 1 ? 'estrella' : 'estrellas'}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={`size-7 transition-colors motion-reduce:transition-none ${
                      value <= rating ? 'text-amber-500' : 'text-amber-500/30'
                    }`}
                    fill="currentColor"
                  >
                    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8-4.3-4.1 5.9-.9Z" />
                  </svg>
                </label>
              ))}
            </div>
          </fieldset>

          <Link
            to={ROUTES.home}
            className="w-full rounded-full bg-brand-100 py-3 text-center font-semibold text-navy-900 transition-colors hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            Regresar al inicio
          </Link>
        </div>
      </div>
    </NavBar>
  )
}
