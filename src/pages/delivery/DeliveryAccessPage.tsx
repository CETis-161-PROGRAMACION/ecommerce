import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

export function DeliveryAccessPage() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-8 motion-safe:animate-page-enter">
      <section className="flex w-full max-w-md flex-col items-center">
        <Logo className="mb-8 h-36 w-auto sm:h-44" />

        <h1 className="text-2xl font-bold uppercase tracking-wide text-brand-400 sm:text-3xl">
          Web E-commerce
        </h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Elige cómo quieres entrar a la demostración.
        </p>

        <div className="mt-8 flex w-full flex-col gap-4">
          <Button
            type="button"
            onClick={() => navigate(ROUTES.deliveryLogin)}
            className="w-full"
          >
            Continuar como repartidor
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.login)}
            className="w-full bg-white"
          >
            Continuar como cliente
          </Button>
        </div>
      </section>
    </main>
  )
}
