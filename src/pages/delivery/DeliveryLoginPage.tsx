import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { ROUTES } from '@/router/routes'
import { signIn } from '@/services/auth'

export function DeliveryLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !password) {
      setError('Ingresa tu correo y tu contraseña.')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      await signIn(email.trim().toLowerCase(), password)
      // Si la cuenta no es de repartidor, RequireDriver la regresa al acceso.
      navigate(from ?? ROUTES.deliveryHome, { replace: true })
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'No pudimos iniciar sesión.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Acceso del repartidor" backTo={ROUTES.deliveryAccess}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError('')
          }}
        />

        {error && (
          <p role="alert" className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-[280px]"
          >
            {isSubmitting ? 'Entrando…' : 'Iniciar sesión'}
          </Button>
        </div>

        <p className="text-center text-sm text-ink">
          ¿Aún no tienes cuenta?{' '}
          <Link
            to={ROUTES.deliveryRegister}
            className="font-semibold text-navy-900 underline underline-offset-2 hover:opacity-80"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
