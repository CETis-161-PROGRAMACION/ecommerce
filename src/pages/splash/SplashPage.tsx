import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

export function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate(ROUTES.login, { replace: true })
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white animate-fade-in motion-reduce:animate-none motion-reduce:transform-none">
      <Logo className="h-28 w-28" />
    </div>
  )
}
