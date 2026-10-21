import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { demoUsers } from '@/data/users'
import { ROUTES } from '@/router/routes'

export function RecoveryPage() {
  const [telefono, setTelefono] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!/^[0-9]{10}$/.test(telefono)) {
      setError('Ingresa un teléfono de 10 dígitos.')
      setExito(false)
      return
    }

    const existe = demoUsers.some((usuario) => usuario.telefono === telefono)

    if (!existe) {
      setError('Ese número no está registrado en la demostración.')
      setExito(false)
      return
    }

    setError('')
    setExito(true)
  }

  return (
    <AuthLayout title="Recuperar datos">
      <p className="notice notice-info">
        Modo demostración: no se envían SMS. Al confirmar te mostramos la
        contraseña de la cuenta de prueba.
      </p>

      <form onSubmit={manejarEnvio} noValidate className="mt-6">
        <label htmlFor="telefono" className={labelClass}>
          Número de teléfono:
        </label>
        <div className="flex gap-3">
          <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-base font-medium text-ink-muted sm:w-24">
            +52
          </div>
          <input
            id="telefono"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            placeholder="0000000000"
            className={`${inputClass} min-w-0 flex-1`}
            value={telefono}
            onChange={(event) => {
              setTelefono(event.target.value.replace(/\D/g, '').slice(0, 10))
              setError('')
              setExito(false)
            }}
            required
          />
        </div>

        {error ? (
          <p role="alert" className="notice notice-danger mt-5">
            {error}
          </p>
        ) : null}

        {exito ? (
          <p role="status" className="notice notice-success mt-5">
            Encontramos tu cuenta. La contraseña de la demostración es{' '}
            <strong>demo1234</strong>.
          </p>
        ) : null}

        <Button type="submit" fullWidth className="mt-8">
          Siguiente
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink">
        ¿Recordaste la contraseña?{' '}
        <Link
          to={ROUTES.login}
          className="font-medium text-brand-400 underline underline-offset-4 transition-colors hover:text-navy-900"
        >
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  )
}
