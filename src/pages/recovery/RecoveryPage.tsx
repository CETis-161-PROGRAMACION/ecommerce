import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { ROUTES } from '@/router/routes'
import { requestPasswordReset } from '@/services/auth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RecoveryPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = email.trim().toLowerCase()
    if (!EMAIL_PATTERN.test(normalized)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      await requestPasswordReset(normalized)
      navigate(ROUTES.codeConfirm, { state: { email: normalized } })
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'No pudimos enviar el correo. Inténtalo de nuevo.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Recuperar datos" backTo={ROUTES.login}>
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
          error={error || undefined}
        />
        <p className="text-center text-sm font-semibold text-ink">
          Te enviaremos un correo con un código para que puedas recuperar tu
          contraseña.
        </p>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-[280px]"
          >
            {isSubmitting ? 'Enviando…' : 'Siguiente'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
