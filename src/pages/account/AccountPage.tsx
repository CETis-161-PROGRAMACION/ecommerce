import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { ROUTES } from '@/router/routes'
import { signOut, updateProfile } from '@/services/auth'
import { useSession } from '@/services/session/session'

export function AccountPage() {
  const navigate = useNavigate()
  const { profile, profileLoaded, session, refreshProfile } = useSession()

  if (!profileLoaded) {
    return (
      <NavBar backTo={ROUTES.home}>
        <p role="status" className="py-12 text-center text-sm text-ink-muted">
          Cargando tu cuenta…
        </p>
      </NavBar>
    )
  }

  if (!profile || !session) {
    return (
      <NavBar backTo={ROUTES.home}>
        <p role="alert" className="py-12 text-center text-sm text-ink">
          No pudimos cargar los datos de tu cuenta.
        </p>
      </NavBar>
    )
  }

  // El formulario se monta solo con el perfil cargado, así parte de sus valores reales.
  return (
    <NavBar backTo={ROUTES.home}>
      <AccountForm
        key={profile.id}
        userId={profile.id}
        email={profile.email}
        initialName={profile.fullName}
        initialPhone={profile.phone ?? ''}
        onSaved={refreshProfile}
        onSignOut={async () => {
          await signOut()
          navigate(ROUTES.login, { replace: true })
        }}
      />
    </NavBar>
  )
}

interface AccountFormProps {
  userId: string
  email: string
  initialName: string
  initialPhone: string
  onSaved: () => Promise<void>
  onSignOut: () => Promise<void>
}

function AccountForm({
  userId,
  email,
  initialName,
  initialPhone,
  onSaved,
  onSignOut,
}: AccountFormProps) {
  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    if (!name.trim()) {
      setError('El nombre no puede estar vacío.')
      return
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      setError('El teléfono debe tener 10 dígitos.')
      return
    }

    setIsSaving(true)
    setError('')
    try {
      await updateProfile(userId, { fullName: name.trim(), phone })
      await onSaved()
      setMessage('Datos guardados.')
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'No pudimos guardar tus datos.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-ink">Cuenta</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          readOnly
          aria-readonly="true"
        />
        <TextField
          label="Nombre completo"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setMessage('')
          }}
        />
        <TextField
          label="Teléfono (10 dígitos)"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))
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
          {isSaving ? 'Guardando…' : 'Guardar cambios'}
        </Button>
      </form>

      <Link
        to={ROUTES.home}
        className="block w-full rounded-full border border-line py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        Ir al inicio
      </Link>

      <button
        type="button"
        onClick={onSignOut}
        className="w-full rounded-full border border-line py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        Cerrar sesión
      </button>
    </section>
  )
}
