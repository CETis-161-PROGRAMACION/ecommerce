import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES } from '@/router/routes'
import { useCheckout } from '@/services/order/checkout'
import {
  PAYMENT_METHODS,
  type PaymentMethod,
} from '@/services/payment/paymentMethods'
import { useSession } from '@/services/session/session'

export function PaymentTypePage() {
  const navigate = useNavigate()
  const { draft, update } = useCheckout()
  const { profile } = useSession()

  function handleSelect(method: PaymentMethod) {
    update({ paymentMethod: method })
    navigate(ROUTES.infoPedido)
  }

  return (
    <NavBar backTo={ROUTES.infoPedido}>
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

        <h1 className="mt-3 text-base font-bold text-ink">
          {profile?.fullName ?? 'Tu perfil'}
        </h1>
        {profile?.phone && (
          <p className="text-sm font-semibold text-ink">+52 {profile.phone}</p>
        )}

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
                key={method.value}
                type="button"
                aria-pressed={draft.paymentMethod === method.value}
                onClick={() => handleSelect(method.value)}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-md border border-line bg-background px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 motion-reduce:transition-none aria-pressed:border-success aria-pressed:bg-success/10"
              >
                {method.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            El pago se realiza al recibir tu pedido.
          </p>
        </fieldset>
      </div>
    </NavBar>
  )
}
