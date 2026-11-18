import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { ROUTES } from '@/router/routes'
import {
  requestPasswordReset,
  updatePassword,
  verifyRecoveryCode,
} from '@/services/auth'

const CODE_LENGTH = 6
const MIN_PASSWORD_LENGTH = 8

export function CodeConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email

  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sin pasar por "Recuperar datos" no hay un correo al cual confirmar.
  if (!email) {
    return <Navigate to={ROUTES.recovery} replace />
  }
  const targetEmail = email

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('')

    if (code.length !== CODE_LENGTH) {
      setError(`Escribe los ${CODE_LENGTH} dígitos del código.`)
      return
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`)
      return
    }
    if (password !== confirmation) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setIsSubmitting(true)
    setError('')
    try {
      await verifyRecoveryCode(targetEmail, code)
      await updatePassword(password)
      navigate(ROUTES.home, { replace: true })
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'No pudimos cambiar la contraseña.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResend() {
    setError('')
    setNotice('')
    try {
      await requestPasswordReset(targetEmail)
      setNotice('Te enviamos un código nuevo.')
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'No pudimos reenviar el código.',
      )
    }
  }

  return (
    <AuthLayout title="Recuperar datos">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <p className="text-sm text-ink">
          Enviamos un código de {CODE_LENGTH} dígitos a{' '}
          <strong>{targetEmail}</strong>.
        </p>
        <TextField
          label="Código de confirmación"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH}
          value={code}
          onChange={(event) => {
            setCode(event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))
            setError('')
          }}
        />
        <TextField
          label="Nueva contraseña"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError('')
          }}
        />
        <TextField
          label="Confirmar nueva contraseña"
          type="password"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => {
            setConfirmation(event.target.value)
            setError('')
          }}
        />

        {error && (
          <p role="alert" className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="text-center text-sm font-semibold text-success">
            {notice}
          </p>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-[280px]"
          >
            {isSubmitting ? 'Guardando…' : 'Cambiar contraseña'}
          </Button>
        </div>

        <button
          type="button"
          onClick={handleResend}
          className="text-center text-sm font-semibold text-brand-400 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          Reenviar código
        </button>
      </form>
    </AuthLayout>
  )
}
