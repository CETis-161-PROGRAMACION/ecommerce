import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { useSession } from '@/services/session/session'

interface GuardProps {
  children: ReactNode
}

interface RequireAuthProps extends GuardProps {
  /** A dónde mandar a quien no ha iniciado sesión. */
  redirectTo?: string
}

function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-screen items-center justify-center text-sm text-ink-muted"
    >
      Cargando…
    </div>
  )
}

/** Solo deja pasar a quien tiene sesión iniciada. */
export function RequireAuth({
  children,
  redirectTo = ROUTES.login,
}: RequireAuthProps) {
  const { status } = useSession()
  const location = useLocation()

  if (status === 'loading') return <Loading />
  if (status === 'signed-out') {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname }}
      />
    )
  }
  return <>{children}</>
}

/** Solo deja pasar a cuentas de repartidor. */
export function RequireDriver({ children }: GuardProps) {
  const { status, profile, profileLoaded } = useSession()
  const location = useLocation()

  if (status === 'loading' || (status === 'signed-in' && !profileLoaded)) {
    return <Loading />
  }
  if (status === 'signed-out') {
    return (
      <Navigate
        to={ROUTES.deliveryLogin}
        replace
        state={{ from: location.pathname }}
      />
    )
  }
  if (profile?.role !== 'driver') {
    return <Navigate to={ROUTES.deliveryAccess} replace />
  }
  return <>{children}</>
}
