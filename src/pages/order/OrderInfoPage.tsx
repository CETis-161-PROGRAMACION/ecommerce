import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { AddressBlock, OrderSummary } from '@/components/order/OrderSummary'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckIcon } from '@/components/ui/CheckIcon'
import { EmptyState } from '@/components/ui/EmptyState'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { MastercardIcon } from '@/components/ui/MastercardIcon'
import { useApp } from '@/context/useApp'
import { findProduct } from '@/data/products'
import { ROUTES } from '@/router/routes'
import { formatMoney } from '@/utils/money'

type PaymentMethod = 'debito' | 'credito' | 'presencial'

const SERVICIO = 25

const paymentLabels: Record<PaymentMethod, string> = {
  debito: 'Tarjeta de débito',
  credito: 'Tarjeta de crédito',
  presencial: 'Pago presencial',
}

export function OrderInfoPage() {
  const navigate = useNavigate()
  const { selection, address, recipient, createOrder } = useApp()

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>('credito')

  const producto = selection ? findProduct(selection.productId) : undefined

  if (!producto || !selection) {
    return (
      <NavBar>
        <div className="mx-auto w-full max-w-6xl pb-16">
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Información de pedido
          </h1>
          <EmptyState
            title="Todavía no has elegido un producto"
            description="Elige un producto del catálogo para ver el resumen de tu pedido."
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

  const metodoEntrega =
    selection.opciones['Método de Entrega']?.[0] ?? 'A domicilio'
  const direccion = address
    ? `${address.calle} ${address.numero}, ${address.colonia}`
    : 'Sin dirección capturada'

  function realizarPedido() {
    const pedido = createOrder(metodoEntrega)

    if (!pedido) {
      return
    }

    navigate(ROUTES.orderTracking)
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-6xl pb-16">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Información de pedido
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <section className="space-y-8" aria-label="Detalles del pedido">
            <OrderSummary
              producto={producto}
              opciones={selection.opciones}
              nombreDestinatario={recipient?.nombre ?? 'Sin destinatario'}
              precioProducto={producto.precio}
              servicio={SERVICIO}
            />

            <AddressBlock direccion={direccion} />
          </section>

          <section
            className="space-y-8"
            aria-label="Método de pago y confirmación"
          >
            <div>
              <h2 className="mb-4 text-xl font-black text-ink sm:text-2xl">
                Ubicación guardada
              </h2>
              <MapSnippet label={direccion} />
            </div>

            <div>
              <h2 className="mb-4 text-xl font-black text-ink sm:text-2xl">
                Método de pago
              </h2>

              <Card padding="sm">
                <fieldset>
                  <legend className="sr-only">Método de pago del pedido</legend>
                  <div className="flex flex-col gap-2">
                    {(
                      ['debito', 'credito', 'presencial'] as PaymentMethod[]
                    ).map((method) => {
                      const checked = selectedPayment === method
                      return (
                        <label
                          key={method}
                          className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                            checked
                              ? 'bg-brand-100 text-navy-900'
                              : 'text-ink hover:bg-brand-100/40'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            {method === 'presencial' ? null : (
                              <MastercardIcon size={28} />
                            )}
                            <span>{paymentLabels[method]}</span>
                          </span>
                          <input
                            type="radio"
                            name="metodo-pago"
                            className="sr-only"
                            checked={checked}
                            onChange={() => setSelectedPayment(method)}
                          />
                          {checked ? <CheckIcon size={18} /> : null}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <p className="mt-3 text-xs text-ink-muted">
                  {selectedPayment === 'presencial'
                    ? `Pagas ${formatMoney(SERVICIO)} al recibir el pedido.`
                    : 'Pago de demostración: no se procesa ninguna transacción.'}
                </p>
              </Card>
            </div>

            <div className="flex flex-col items-center gap-3 pt-4">
              <Link
                to={ROUTES.clienteDireccion}
                className="w-full max-w-sm rounded-full bg-brand-100 py-3 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-200"
              >
                Utilizar una nueva ubicación
              </Link>

              <Button
                type="button"
                size="lg"
                fullWidth
                className="max-w-sm"
                onClick={realizarPedido}
              >
                Realizar pedido
              </Button>
            </div>
          </section>
        </div>
      </div>
    </NavBar>
  )
}
