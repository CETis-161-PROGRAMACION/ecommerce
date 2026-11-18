export const PAYMENT_METHODS = [
  'Tarjeta de crédito',
  'Tarjeta de débito',
  'Paypal',
] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export interface PaymentMethodState {
  paymentMethod?: PaymentMethod
}

export function isPaymentMethod(value: unknown): value is PaymentMethod {
  return PAYMENT_METHODS.some((method) => method === value)
}
