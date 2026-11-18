import { createContext, useContext } from 'react'
import type { PaymentMethod } from '@/services/payment/paymentMethods'
import type { PickupMethod } from '@/services/order/orderDetails'

export interface CheckoutDraft {
  pickupMethod: PickupMethod
  addressId: string | null
  paymentMethod: PaymentMethod
  /** null = usar los datos del perfil del cliente. */
  recipientName: string | null
  recipientPhone: string | null
}

export const INITIAL_CHECKOUT: CheckoutDraft = {
  pickupMethod: 'delivery',
  addressId: null,
  paymentMethod: 'cash',
  recipientName: null,
  recipientPhone: null,
}

export interface CheckoutContextValue {
  draft: CheckoutDraft
  update: (changes: Partial<CheckoutDraft>) => void
  reset: () => void
}

export const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout debe usarse dentro de CheckoutProvider')
  }
  return context
}
