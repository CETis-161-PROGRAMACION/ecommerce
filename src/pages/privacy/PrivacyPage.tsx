import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'

export function PrivacyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const telefono = (location.state as { telefono?: string } | null)?.telefono

  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)

  return (
    <AuthLayout title="">
      <header className="mb-8 flex items-center gap-6 sm:gap-8">
        <div className="min-w-0">
          <h1 className="text-xl font-bold uppercase tracking-wide text-brand-400 sm:text-3xl">
            Política de privacidad
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-muted sm:text-sm">
            Web E-commerce
          </p>
        </div>
      </header>

      <section className="flex flex-col items-center">
        <div className="w-full rounded-3xl border border-line bg-surface p-5 shadow-xs sm:p-7">
          <div className="max-h-72 space-y-3 overflow-y-auto text-justify text-xs leading-relaxed text-ink-muted">
            <h2 className="text-sm font-semibold text-ink">
              Política de privacidad
            </h2>
            <p>
              Aquí se mostrará el contenido oficial de la política de privacidad
              de Web E-commerce.
            </p>
            <p>
              El documento definitivo debe ser proporcionado por el equipo
              responsable del proyecto antes de publicar esta página.
            </p>
          </div>
        </div>

        <div className="my-5 flex w-full max-w-sm flex-col gap-3 px-2 text-xs text-ink">
          <label htmlFor="acepto-terminos" className="flex items-start gap-3">
            <input
              id="acepto-terminos"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-0.5 size-4 accent-brand-400"
            />
            <span>Aceptar términos y condiciones de uso.</span>
          </label>

          <label htmlFor="acepto-privacidad" className="flex items-start gap-3">
            <input
              id="acepto-privacidad"
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(event) => setAcceptedPrivacy(event.target.checked)}
              className="mt-0.5 size-4 accent-brand-400"
            />
            <span>Aceptar política de privacidad.</span>
          </label>
        </div>

        <Button
          type="button"
          disabled={!acceptedTerms || !acceptedPrivacy}
          className="w-full max-w-[272px]"
          onClick={() => navigate(ROUTES.confirmCode, { state: { telefono } })}
        >
          Siguiente
        </Button>
      </section>
    </AuthLayout>
  )
}
