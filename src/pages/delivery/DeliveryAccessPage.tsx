import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

export function DeliveryAccessPage() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-8 motion-safe:animate-page-enter">
      <section className="flex w-full max-w-md flex-col items-center">
        <Logo className="mb-10 h-36 w-auto sm:mb-12 sm:h-44" />

        <div className="flex w-full flex-col gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.deliveryLogin)}
            className="w-full rounded-full bg-brand-100 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Continuar como repartidor
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.login)}
            className="w-full rounded-full bg-brand-100 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Continuar como cliente
          </button>
        </div>
      </section>
    </main>
  )
}
