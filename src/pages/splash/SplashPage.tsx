import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

export function SplashPage() {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)

  function entrar() {
    setIsExiting(true)
    navigate(ROUTES.deliveryAccess, { replace: true })
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let navigationTimer: number | undefined

    const exitTimer = window.setTimeout(
      () => {
        if (prefersReducedMotion) {
          navigate(ROUTES.deliveryAccess, { replace: true })
          return
        }

        setIsExiting(true)
        navigationTimer = window.setTimeout(
          () => navigate(ROUTES.deliveryAccess, { replace: true }),
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
      className={`flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 ${
        isExiting ? 'animate-splash-exit' : 'animate-fade-in'
      } motion-reduce:animate-none`}
    >
      <h1 className="sr-only">Web E-commerce</h1>

      <Logo className="h-60 w-auto" />

      <Button type="button" onClick={entrar} className="min-w-48">
        Continuar
      </Button>
    </div>
  )
}
