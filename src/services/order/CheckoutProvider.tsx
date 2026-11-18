import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  CheckoutContext,
  INITIAL_CHECKOUT,
  type CheckoutDraft,
} from '@/services/order/checkout'

interface CheckoutProviderProps {
  children: ReactNode
}

/** Guarda en memoria las decisiones del pedido mientras el cliente cambia de pantalla. */
export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [draft, setDraft] = useState<CheckoutDraft>(INITIAL_CHECKOUT)

  const update = useCallback((changes: Partial<CheckoutDraft>) => {
    setDraft((current) => ({ ...current, ...changes }))
  }, [])

  const reset = useCallback(() => setDraft(INITIAL_CHECKOUT), [])

  const value = useMemo(() => ({ draft, update, reset }), [draft, update, reset])

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  )
}
