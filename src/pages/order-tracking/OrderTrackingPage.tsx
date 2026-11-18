import { useState, type FormEvent } from 'react'
import NavBar from '@/components/navbar/NavBar'
import { DeliveryProgress } from '@/components/order/DeliveryProgress'
import { OrderSummary } from '@/components/order/OrderSummary'
import { Button } from '@/components/ui/Button'
import { SAVED_ADDRESSES } from '@/services/order/orderDetails'
import { buildMapUrl } from '@/utils/maps'

const DELIVERY_ADDRESS = SAVED_ADDRESSES[0]
const IN_TRANSIT_PROGRESS = 40

export function OrderTrackingPage() {
  const [message, setMessage] = useState('')

  function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleReceived() {}

  return (
    <NavBar>
      <h1 className="sr-only">Pedido en camino</h1>

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
            aria-labelledby="tracking-status-title"
            className="text-center"
          >
            <h2
              id="tracking-status-title"
              className="text-base font-bold text-ink"
            >
              Repartidor en camino
            </h2>
            <p className="text-xs text-ink-muted">
              La llegada estimada aparecerá cuando el servicio de pedidos esté
              disponible.
            </p>
            <div className="mt-4">
              <DeliveryProgress
                progress={IN_TRANSIT_PROGRESS}
                label="Avance de la entrega"
              />
            </div>
          </section>

          <section
            aria-labelledby="contact-title"
            className="flex flex-col gap-2"
          >
            <h2 id="contact-title" className="text-sm font-bold text-ink">
              Comunicarse con el repartidor
            </h2>

            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-5 shrink-0 text-ink"
              >
                <path d="M4 5h16v11H8l-4 4Z" />
              </svg>
              <label htmlFor="courier-message" className="sr-only">
                Mensaje para el repartidor
              </label>
              <input
                id="courier-message"
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Enviar mensaje"
                disabled
                aria-describedby="contact-help"
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-70"
              />
            </form>

            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-5 shrink-0 text-ink"
              >
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
              <button
                type="button"
                disabled
                aria-describedby="contact-help"
                className="flex-1 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-muted disabled:cursor-not-allowed disabled:opacity-70"
              >
                Llamar
              </button>
            </div>

            <p id="contact-help" className="text-xs text-ink-muted">
              El contacto con el repartidor estará disponible cuando exista el
              servicio de pedidos.
            </p>
          </section>

          <Button
            type="button"
            onClick={handleReceived}
            className="w-full bg-brand-100! py-3 text-navy-900! hover:bg-brand-200!"
          >
            Recibido
          </Button>
        </div>
      </div>
    </NavBar>
  )
}
