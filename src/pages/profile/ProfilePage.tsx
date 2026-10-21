import { useState } from 'react'
import NavBar from '@/components/navbar/NavBar'
import { MastercardIcon } from '@/components/ui/MastercardIcon'

type PaymentType = 'credito' | 'debito' | 'paypal'

export function ProfilePage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentType>('credito')

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-lg flex-col items-center pb-20 text-center">
        {/* Encabezado */}
        <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-ink-muted mb-8">
          PERFIL
        </h1>

        {/* Avatar de usuario */}
        <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-slate-200 shadow-inner sm:h-44 sm:w-44">
          <svg
            className="h-24 w-24 text-slate-500 sm:h-28 sm:w-28"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* Datos personales */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
          Michell Hernández
        </h2>
        <p className="mt-1 text-base sm:text-lg font-semibold text-ink-muted">
          +52 3332260919
        </p>

        {/* Sección Método de Pago */}
        <div className="mt-10 w-full space-y-4 text-left">
          <div className="flex items-center gap-2 text-ink font-bold text-base sm:text-lg">
            <svg
              className="h-6 w-6 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
              <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
            </svg>
            <span>Método de pago:</span>
          </div>

          <div className="space-y-3">
            {/* Tarjeta de crédito con Mastercard */}
            <button
              type="button"
              onClick={() => setSelectedMethod('credito')}
              className={`flex w-full items-center justify-between rounded-2xl border bg-surface p-4 text-base font-semibold transition cursor-pointer shadow-xs hover:border-brand-400 ${
                selectedMethod === 'credito'
                  ? 'border-brand-400 ring-2 ring-brand-100'
                  : 'border-line text-ink'
              }`}
            >
              <span>Tarjeta de crédito</span>
              <div className="flex items-center gap-3">
                <MastercardIcon size={32} />
                {selectedMethod === 'credito' && (
                  <span className="text-brand-400 text-sm font-bold">●</span>
                )}
              </div>
            </button>

            {/* Tarjeta de débito */}
            <button
              type="button"
              onClick={() => setSelectedMethod('debito')}
              className={`flex w-full items-center justify-between rounded-2xl border bg-surface p-4 text-base font-semibold transition cursor-pointer shadow-xs hover:border-brand-400 ${
                selectedMethod === 'debito'
                  ? 'border-brand-400 ring-2 ring-brand-100'
                  : 'border-line text-ink'
              }`}
            >
              <span>Tarjeta de debito</span>
              {selectedMethod === 'debito' && (
                <span className="text-brand-400 text-sm font-bold">●</span>
              )}
            </button>

            {/* Paypal */}
            <button
              type="button"
              onClick={() => setSelectedMethod('paypal')}
              className={`flex w-full items-center justify-between rounded-2xl border bg-surface p-4 text-base font-semibold transition cursor-pointer shadow-xs hover:border-brand-400 ${
                selectedMethod === 'paypal'
                  ? 'border-brand-400 ring-2 ring-brand-100'
                  : 'border-line text-ink'
              }`}
            >
              <span>Paypal</span>
              {selectedMethod === 'paypal' && (
                <span className="text-brand-400 text-sm font-bold">●</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </NavBar>
  )
}
