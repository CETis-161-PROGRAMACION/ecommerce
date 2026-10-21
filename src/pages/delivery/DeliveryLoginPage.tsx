import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'

export function DeliveryLoginPage() {
  const navigate = useNavigate()
  const { login } = useApp()

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

    const resultado = login(telefono, contrasena)

    if (!resultado.ok) {
      setMensaje(resultado.error ?? 'No pudimos iniciar sesión.')
      return
    }

    if (resultado.usuario?.rol !== 'repartidor') {
      setMensaje('Esa cuenta no es de repartidor. Usa el acceso de cliente.')
      return
    }

    navigate(ROUTES.deliveryOrders)
  }

  return (
    <AuthLayout title="Acceso del repartidor">
      <form
        onSubmit={manejarInicioSesion}
        noValidate
        className="w-full space-y-6"
      >
        <div>
          <label htmlFor="telefono-repartidor" className={labelClass}>
            Número de teléfono:
          </label>

          <div className="flex gap-3">
            <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-base font-medium text-ink-muted sm:w-24">
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
              className={`${inputClass} min-w-0 flex-1`}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="contrasena-repartidor" className={labelClass}>
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
            className={inputClass}
            required
          />
        </div>

        {mensaje ? (
          <p role="alert" className="notice notice-danger">
            {mensaje}
          </p>
        ) : null}

        <div className="flex justify-center pt-2">
          <Button type="submit" className="w-full max-w-[280px]">
            Iniciar sesión
          </Button>
        </div>

        <p className="text-center text-sm text-ink">
          ¿Aún no tienes cuenta?{' '}
          <Link
            to={ROUTES.deliveryRegister}
            className="font-semibold text-brand-400 underline underline-offset-4 transition-colors hover:text-navy-900"
          >
            Regístrate
          </Link>
        </p>
      </form>

      <div className="notice notice-info mt-8">
        <p className="font-bold">Modo demostración</p>
        <p className="mt-1">
          Cuenta de repartidor: <strong>3331122334</strong> · Contraseña{' '}
          <strong>demo1234</strong>
        </p>
      </div>
    </AuthLayout>
  )
}
