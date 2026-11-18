import { useLocation, useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES } from '@/router/routes'
import {
  PAYMENT_METHODS,
  isPaymentMethod,
  type PaymentMethod,
  type PaymentMethodState,
} from '@/services/payment/paymentMethods'

const PROFILE_NAME = 'Michell Hernández'
const PROFILE_PHONE = '+52 3332260919'

export function PaymentTypePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as PaymentMethodState | null
  const requestedMethod = state?.paymentMethod
  const currentMethod = isPaymentMethod(requestedMethod)
    ? requestedMethod
    : undefined

  function handleSelect(method: PaymentMethod) {
    const nextState: PaymentMethodState = { paymentMethod: method }
    navigate(ROUTES.infoPedido, { state: nextState })
  }

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center">
        <p className="text-sm font-bold tracking-wide text-ink-muted uppercase">
          Perfil
        </p>

        <div
          aria-hidden="true"
          className="mt-3 flex size-24 items-end justify-center overflow-hidden rounded-full border border-line bg-surface"
        >
          <svg viewBox="0 0 24 24" className="size-20 text-ink-muted">
            <circle cx="12" cy="8" r="4.5" fill="currentColor" />
            <path d="M3 24c0-5 4-8.5 9-8.5s9 3.5 9 8.5Z" fill="currentColor" />
          </svg>
        </div>

        <h1 className="mt-3 text-base font-bold text-ink">{PROFILE_NAME}</h1>
        <p className="text-sm font-semibold text-ink">{PROFILE_PHONE}</p>

        <fieldset className="mt-4 w-full">
          <legend className="mx-auto mb-3 flex items-center gap-2 text-sm font-bold text-ink">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
            >
              <rect x="6" y="3" width="15" height="11" rx="1.5" />
              <rect x="4.5" y="5" width="15" height="11" rx="1.5" />
              <rect x="3" y="7" width="15" height="11" rx="1.5" />
            </svg>
            Método de pago:
          </legend>

          <div className="flex flex-col gap-4">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method}
                type="button"
                aria-pressed={currentMethod === method}
                onClick={() => handleSelect(method)}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-md border border-line bg-background px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 motion-reduce:transition-none"
              >
                {method}
                {method === 'Tarjeta de crédito' && (
                  <span aria-hidden="true" className="flex">
                    <span className="size-5 rounded-full bg-red-500" />
                    <span className="-ml-2 size-5 rounded-full bg-amber-500/90" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </NavBar>
  )
}
