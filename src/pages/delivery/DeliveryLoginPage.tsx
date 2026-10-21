import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'

export function DeliveryLoginPage() {
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')

  function manejarInicioSesion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!/^[0-9]{10}$/.test(telefono)) {
      setMensaje('Ingresa un teléfono de 10 dígitos.')
      return
    }

    if (!contrasena.trim()) {
      setMensaje('Ingresa tu contraseña.')
      return
    }

    setMensaje(
      'El inicio de sesión del repartidor estará disponible cuando se conecte el servicio de autenticación.',
    )
  }

  return (
    <AuthLayout title="Acceso del repartidor">
      <form
        onSubmit={manejarInicioSesion}
        noValidate
        className="w-full space-y-6"
      >
        <div>
          <label
            htmlFor="telefono-repartidor"
            className="mb-2 block text-base font-bold text-ink"
          >
            Número de teléfono:
          </label>

          <div className="flex gap-3">
            <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-base font-medium text-ink-muted sm:w-24">
              +52
            </div>

            <input
              id="telefono-repartidor"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="0000000000"
              value={telefono}
              onChange={(evento) => {
                setTelefono(evento.target.value.replace(/\D/g, '').slice(0, 10))
                setMensaje('')
              }}
              className="h-14 min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contrasena-repartidor"
            className="mb-2 block text-base font-bold text-ink"
          >
            Contraseña:
          </label>

          <input
            id="contrasena-repartidor"
            type="password"
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(evento) => {
              setContrasena(evento.target.value)
              setMensaje('')
            }}
            className="h-14 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            required
          />
        </div>

        {mensaje && (
          <p
            role="status"
            className="text-center text-sm font-semibold text-ink"
          >
            {mensaje}
          </p>
        )}

        <div className="flex justify-center pt-2">
          <Button type="submit" className="w-full max-w-[280px]">
            Iniciar sesión
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
