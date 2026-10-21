import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { useApp } from '@/context/useApp'
import { DEMO_CREDENTIALS } from '@/data/users'
import { ROUTES } from '@/router/routes'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useApp()

  const telefonoInicial =
    (location.state as { telefono?: string } | null)?.telefono ?? ''

  const [telefono, setTelefono] = useState(telefonoInicial)
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!/^[0-9]{10}$/.test(telefono)) {
      setError('Ingresa un teléfono de 10 dígitos.')
      return
    }

    if (!contrasena) {
      setError('Escribe tu contraseña.')
      return
    }

    const resultado = login(telefono, contrasena)

    if (!resultado.ok) {
      setError(
        resultado.error ?? 'No pudimos iniciar sesión. Inténtalo de nuevo.',
      )
      return
    }

    navigate(ROUTES.home)
  }

  function llenarDatosDemo() {
    setTelefono(DEMO_CREDENTIALS.telefono)
    setContrasena(DEMO_CREDENTIALS.contrasena)
    setError('')
  }

  return (
    <AuthLayout title="Iniciar sesión" mainClassName="w-full">
      <form onSubmit={manejarEnvio} noValidate className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* Número de teléfono */}
          <div>
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
                  setTelefono(
                    event.target.value.replace(/\D/g, '').slice(0, 10),
                  )
                  setError('')
                }}
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="contrasena" className={labelClass}>
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              autoComplete="current-password"
              placeholder="........"
              className={inputClass}
              value={contrasena}
              onChange={(event) => {
                setContrasena(event.target.value)
                setError('')
              }}
              required
            />
          </div>
        </div>

        {error ? (
          <p role="alert" className="notice notice-danger mt-6">
            {error}
          </p>
        ) : null}

        {/* Botón Iniciar sesión */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <Button type="submit" className="w-full max-w-[280px]">
            Iniciar sesión
          </Button>
        </div>

        {/* o continuar con */}
        <p className="mt-6 text-center text-sm font-normal text-ink-muted">
          o continuar con
        </p>

        {/* Botones sociales (no disponibles en la demostración) */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <div className="flex justify-center gap-6">
            <button
              type="button"
              disabled
              className="h-11 w-28 rounded-xl border border-line bg-surface text-center text-base font-normal text-ink-muted opacity-60 transition-colors sm:w-32"
            >
              Google
            </button>
            <button
              type="button"
              disabled
              className="h-11 w-28 rounded-xl border border-line bg-surface text-center text-base font-normal text-ink-muted opacity-60 transition-colors sm:w-32"
            >
              Facebook
            </button>
          </div>
          <p className="text-xs text-ink-muted">
            El acceso con redes sociales todavía no está disponible.
          </p>
        </div>

        {/* Enlace recuperar contraseña */}
        <div className="mt-6 text-center">
          <Link
            to={ROUTES.recovery}
            className="text-sm font-medium text-brand-400 underline underline-offset-4 transition-colors hover:text-navy-900"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Enlace registro */}
        <p className="mt-4 text-center text-sm text-ink">
          ¿No tienes una cuenta?{' '}
          <Link
            to={ROUTES.register}
            className="font-medium text-brand-400 underline underline-offset-4 transition-colors hover:text-navy-900"
          >
            Regístrate
          </Link>
        </p>
      </form>

      {/* Credenciales de la demostración */}
      <div className="notice notice-info mt-8">
        <p className="font-bold">Modo demostración</p>
        <p className="mt-1">
          Teléfono <strong>{DEMO_CREDENTIALS.telefono}</strong> · Contraseña{' '}
          <strong>{DEMO_CREDENTIALS.contrasena}</strong>
        </p>
        <button
          type="button"
          onClick={llenarDatosDemo}
          className="mt-3 font-semibold text-navy-900 underline underline-offset-4"
        >
          Llenar los datos de demostración
        </button>
      </div>
    </AuthLayout>
  )
}
