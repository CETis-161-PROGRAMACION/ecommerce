import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

export function SplashPage() {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let navigationTimer: number | undefined

    const exitTimer = window.setTimeout(
      () => {
        if (prefersReducedMotion) {
          navigate(ROUTES.login, { replace: true })
          return
        }

        setIsExiting(true)
        navigationTimer = window.setTimeout(
          () => navigate(ROUTES.login, { replace: true }),
          400,
        )
      },
      prefersReducedMotion ? 2500 : 2100,
    )

    return () => {
      window.clearTimeout(exitTimer)
      if (navigationTimer !== undefined) {
        window.clearTimeout(navigationTimer)
      }
    }
  }, [navigate])

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
