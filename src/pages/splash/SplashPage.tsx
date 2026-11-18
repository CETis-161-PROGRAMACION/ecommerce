import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'
import { useSession } from '@/services/session/session'

export function SplashPage() {
  const navigate = useNavigate()
  const { status, profile, profileLoaded } = useSession()
  const [isExiting, setIsExiting] = useState(false)
  const [hasShownLogo, setHasShownLogo] = useState(false)

  // El logotipo se muestra un mínimo de tiempo antes de decidir a dónde ir.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const timer = window.setTimeout(
      () => setHasShownLogo(true),
      prefersReducedMotion ? 2500 : 2100,
    )
    return () => window.clearTimeout(timer)
  }, [])

  const isReady =
    hasShownLogo &&
    status !== 'loading' &&
    (status !== 'signed-in' || profileLoaded)

  const destination =
    status === 'signed-in'
      ? profile?.role === 'driver'
        ? ROUTES.deliveryHome
        : ROUTES.home
      : ROUTES.login

  useEffect(() => {
    if (!isReady) return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      navigate(destination, { replace: true })
      return
    }

    const exitTimer = window.setTimeout(() => setIsExiting(true), 0)
    const navigationTimer = window.setTimeout(
      () => navigate(destination, { replace: true }),
      400,
    )
    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(navigationTimer)
    }
  }, [isReady, destination, navigate])

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-background ${
        isExiting ? 'animate-splash-exit' : 'animate-fade-in'
      } motion-reduce:animate-none`}
    >
      <Logo className="h-60 w-auto" />
    </div>
  )
}
