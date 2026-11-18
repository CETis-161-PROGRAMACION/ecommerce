import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { ROUTES } from '@/router/routes'
import { updatePassword } from '@/services/auth'
import { useSession } from '@/services/session/session'
import { useTheme, type ThemePreference } from '@/services/theme/theme'

const THEME_OPTIONS: readonly {
  value: ThemePreference
  label: string
  hint: string
}[] = [
  { value: 'light', label: 'Claro', hint: 'Fondo blanco' },
  { value: 'dark', label: 'Oscuro', hint: 'Fondo oscuro' },
  { value: 'system', label: 'Automático', hint: 'Igual que tu dispositivo' },
]

const MIN_PASSWORD_LENGTH = 8

export function SettingsPage() {
  const { preference, setPreference } = useTheme()
  const { status } = useSession()

  return (
    <NavBar mainClassName="max-w-md">
      <h1 className="mb-6 text-2xl font-bold text-ink">Ajustes</h1>

      <section aria-labelledby="appearance-title" className="mb-10">
        <h2 id="appearance-title" className="mb-3 text-lg font-bold text-ink">
          Apariencia
        </h2>
        <fieldset>
          <legend className="sr-only">Tema de la aplicación</legend>
          <div className="flex flex-col gap-3">
            {THEME_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors motion-reduce:transition-none ${
                  preference === option.value
                    ? 'border-brand-400 bg-brand-100'
                    : 'border-line bg-surface hover:border-brand-200'
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={preference === option.value}
                  onChange={() => setPreference(option.value)}
                  className="size-4 accent-brand-400"
                />
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {option.label}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {option.hint}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      {status === 'signed-in' ? (
        <PasswordSection />
      ) : (
        <section aria-labelledby="security-title">
          <h2 id="security-title" className="mb-3 text-lg font-bold text-ink">
            Seguridad
          </h2>
          <p className="text-sm text-ink-muted">
            <Link
              to={ROUTES.login}
              className="font-semibold text-brand-400 underline underline-offset-2"
            >
              Inicia sesión
            </Link>{' '}
            para cambiar tu contraseña.
          </p>
        </section>
      )}
    </NavBar>
  )
}

function PasswordSection() {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`)
      return
    }
    if (password !== confirmation) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setIsSaving(true)
    setError('')
    try {
      await updatePassword(password)
      setPassword('')
      setConfirmation('')
      setMessage('Contraseña actualizada.')
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'No pudimos cambiar tu contraseña.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section aria-labelledby="security-title">
      <h2 id="security-title" className="mb-3 text-lg font-bold text-ink">
        Cambiar contraseña
      </h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          label="Nueva contraseña"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError('')
            setMessage('')
          }}
        />
        <TextField
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => {
            setConfirmation(event.target.value)
            setError('')
            setMessage('')
          }}
        />

        {error && (
          <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="text-sm font-semibold text-success">
            {message}
          </p>
        )}

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando…' : 'Cambiar contraseña'}
        </Button>
      </form>
    </section>
  )
}
