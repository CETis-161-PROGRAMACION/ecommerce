import { useState } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'

export function PrivacyPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)

  return (
    <AuthLayout title="">
      <header className="mb-8 flex items-center gap-6 sm:gap-8">
        <img
          src="/src/assets/images/logo_e-commerce.png"
          alt="Logo Web E-commerce"
          className="h-28 w-28 shrink-0 object-contain sm:h-32 sm:w-32"
        />

        <div>
          <h1 className="text-xl font-bold uppercase text-brand-400 sm:text-3xl">
            Política de privacidad
          </h1>
          <p className="mt-2 text-xs uppercase text-ink-muted sm:text-sm">
            Web E-commerce
          </p>
        </div>
      </header>

      <section className="flex flex-col items-center">
        <div className="w-full rounded-[30px] border-[10px] border-line p-5 sm:p-7">
          <div className="h-56 overflow-y-auto text-justify text-xs leading-relaxed text-ink-muted">
            <h2 className="mb-3 font-semibold text-ink">
              Política de privacidad
            </h2>
            <p>
              Aquí se mostrará el contenido oficial de la política de
              privacidad de Web E-commerce.
            </p>
            <p className="mt-3">
              El documento definitivo debe ser proporcionado por el equipo
              responsable del proyecto antes de publicar esta página.
            </p>
          </div>
        </div>

        <div className="my-5 flex w-full max-w-sm flex-col gap-3 px-2 text-xs text-ink-muted">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-0.5 accent-brand-400"
            />
            <span>Aceptar términos y condiciones de uso.</span>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(event) => setAcceptedPrivacy(event.target.checked)}
              className="mt-0.5 accent-brand-400"
            />
            <span>Aceptar política de privacidad.</span>
          </label>
        </div>

        <Button
          type="button"
          disabled={!acceptedTerms || !acceptedPrivacy}
          className="w-full max-w-[272px] bg-brand-100 text-ink hover:bg-brand-200"
          onClick={() => {
            // TODO: Definir la navegación del registro.
          }}
        >
          Siguiente
        </Button>
      </section>
    </AuthLayout>
  )
}
