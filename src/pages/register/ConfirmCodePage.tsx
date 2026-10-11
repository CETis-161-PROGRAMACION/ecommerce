import { useState } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'

export function ConfirmCodePage() {
  const [code, setCode] = useState(['', '', '', ''])

  function handleCodeChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)

    setCode((current) =>
      current.map((item, i) => (i === index ? digit : item)),
    )
  }

  return (
  <AuthLayout title="">
    <header className="mb-10 flex items-center gap-6">
      <img
        src="/src/assets/images/logo_e-commerce.png"
        alt="Logo Web E-commerce"
        className="h-28 w-28 shrink-0 object-contain sm:h-32 sm:w-32"
      />

      <div>
        <h1 className="text-2xl font-bold uppercase text-brand-400 sm:text-3xl">
          REGISTRO
        </h1>
        <p className="mt-2 text-xs uppercase text-ink-muted sm:text-sm">
          WEB E-COMMERCE
        </p>
      </div>
    </header>
      <section className="flex flex-col items-center pt-8 sm:pt-10">
        <h2 className="mb-10 text-center text-2xl font-bold text-ink sm:text-3xl">
          Código de confirmación
        </h2>

        <div className="mb-12 flex justify-center gap-4 sm:gap-6">
          {code.map((digit, index) => (
            <input
              key={index}
              aria-label={`Dígito ${index + 1} del código`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(event) =>
                handleCodeChange(index, event.target.value)
              }
              className="h-14 w-14 rounded-md border border-success bg-white text-center text-xl outline-none focus:ring-2 focus:ring-brand-400 sm:h-[68px] sm:w-[68px]"
            />
          ))}
        </div>

        <Button
          type="button"
          className="w-full max-w-[342px] bg-brand-100 text-ink hover:bg-brand-200"
          onClick={() => {
            // TODO: Conectar con el servicio real de confirmación.
          }}
        >
          Confirmar código
        </Button>
      </section>
    </AuthLayout>
  )
}
