import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

interface AuthLayoutProps {
  title: string
  children: ReactNode
  mainClassName?: string
}

/**
 * Marco de las pantallas de acceso (registro, inicio de sesión, recuperación
 * y sus equivalentes de repartidor). El logotipo es un enlace interno del
 * router: nunca un `<a href>` suelto, para no recargar la página.
 */
export function AuthLayout({
  title,
  children,
  mainClassName,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-8 sm:px-8 sm:py-12 motion-safe:animate-page-enter">
      <div className="w-full max-w-5xl">
        {title ? (
          <header className="mb-8 flex items-center gap-5 sm:mb-10 sm:gap-6">
            <Link
              to={ROUTES.home}
              aria-label="Ir al inicio"
              className="shrink-0 transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              <Logo className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-3xl font-bold uppercase tracking-wide text-brand-400 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted sm:text-sm">
                Web E-commerce
              </p>
            </div>
          </header>
        ) : null}
        <main className={`w-full ${mainClassName ?? 'mx-auto max-w-md'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
