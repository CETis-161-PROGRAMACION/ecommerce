/** Valores que acepta la base de datos en `orders.payment_method` / `payments.method`. */
export type PaymentMethod = 'cash' | 'card_on_delivery'

export const PAYMENT_METHODS: readonly { value: PaymentMethod; label: string }[] =
  [
    { value: 'cash', label: 'Efectivo' },
    { value: 'card_on_delivery', label: 'Tarjeta contra entrega' },
  ]

export function paymentLabel(method: string | null | undefined) {
  return PAYMENT_METHODS.find((item) => item.value === method)?.label ?? '—'
}

export function isPaymentMethod(value: unknown): value is PaymentMethod {
  return PAYMENT_METHODS.some((method) => method.value === value)
}
