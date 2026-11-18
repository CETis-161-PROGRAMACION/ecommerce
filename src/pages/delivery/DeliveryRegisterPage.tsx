
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import { signUp } from '@/services/auth'

interface DatosRepartidor {
  nombre: string
  correo: string
  dia: string
  mes: string
  anio: string
  telefono: string
  contrasena: string
  confirmarContrasena: string
}

const datosIniciales: DatosRepartidor = {
  nombre: '',
  correo: '',
  dia: '',
  mes: '',
  anio: '',
  telefono: '',
  contrasena: '',
  confirmarContrasena: '',
}

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EDAD_MINIMA = 18

const inputClass =
  'h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink ' +
  'placeholder:text-ink-muted outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

export function DeliveryRegisterPage() {
  const [datos, setDatos] = useState<DatosRepartidor>(datosIniciales)
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  function actualizar(campo: keyof DatosRepartidor, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }))
    setMensaje('')
  }

  async function manejarRegistro(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!datos.nombre.trim()) {
      setMensaje('Ingresa tu nombre completo.')
      return
    }

    if (!PATRON_CORREO.test(datos.correo.trim())) {
      setMensaje('Ingresa un correo electrónico válido.')
      return
    }

    const dia = Number(datos.dia)
    const mes = Number(datos.mes)
    const anio = Number(datos.anio)
    const fecha = new Date(anio, mes - 1, dia)

    const fechaValida =
      dia > 0 &&
      mes > 0 &&
      anio > 0 &&
      fecha.getFullYear() === anio &&
      fecha.getMonth() === mes - 1 &&
      fecha.getDate() === dia &&
      fecha <= new Date()

    if (!fechaValida) {
      setMensaje('Ingresa una fecha de nacimiento válida.')
      return
    }

    const hoy = new Date()
    let edad = hoy.getFullYear() - anio
    if (
      hoy.getMonth() < mes - 1 ||
      (hoy.getMonth() === mes - 1 && hoy.getDate() < dia)
    ) {
      edad -= 1
    }
    if (edad < EDAD_MINIMA) {
      setMensaje(`Debes tener al menos ${EDAD_MINIMA} años para ser repartidor.`)
      return
    }

    if (!/^[0-9]{10}$/.test(datos.telefono)) {
      setMensaje('El teléfono debe contener 10 dígitos.')
      return
    }

    if (datos.contrasena.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (datos.contrasena !== datos.confirmarContrasena) {
      setMensaje('Las contraseñas no coinciden.')
      return
    }

    setEnviando(true)
    try {
      const correo = datos.correo.trim().toLowerCase()
      const { needsConfirmation } = await signUp({
        email: correo,
        password: datos.contrasena,
        fullName: datos.nombre.trim(),
        birthDate: `${datos.anio}-${datos.mes.padStart(2, '0')}-${datos.dia.padStart(2, '0')}`,
        phone: datos.telefono,
        role: 'driver',
      })
      if (needsConfirmation) {
        navigate(ROUTES.confirmCode, {
          state: { correo, next: ROUTES.deliveryVehicle },
        })
      } else {
        navigate(ROUTES.deliveryVehicle, { replace: true })
      }
    } catch (causa) {
      setMensaje(
        causa instanceof Error
          ? causa.message
          : 'No pudimos crear tu cuenta. Inténtalo de nuevo.',
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <AuthLayout title="Registro de repartidor" mainClassName="w-full" backTo={ROUTES.deliveryAccess}>
      <form onSubmit={manejarRegistro} noValidate className="w-full">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          <div>
            <label htmlFor="nombre-repartidor" className="mb-2 block text-sm font-bold text-ink">
              Nombre completo
            </label>
            <input
              id="nombre-repartidor"
              type="text"
              autoComplete="name"
              className={inputClass}
              value={datos.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="correo-repartidor" className="mb-2 block text-sm font-bold text-ink">
              Correo electrónico
            </label>
            <input
              id="correo-repartidor"
              type="email"
              autoComplete="email"
              inputMode="email"
              className={inputClass}
              value={datos.correo}
              onChange={(e) => actualizar('correo', e.target.value)}
              required
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-bold text-ink">
              Fecha de nacimiento
            </legend>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="día"
                aria-label="Día de nacimiento"
                className={inputClass}
                value={datos.dia}
                onChange={(e) =>
                  actualizar('dia', e.target.value.replace(/\D/g, '').slice(0, 2))
                }
                required
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="mes"
                aria-label="Mes de nacimiento"
                className={inputClass}
                value={datos.mes}
                onChange={(e) =>
                  actualizar('mes', e.target.value.replace(/\D/g, '').slice(0, 2))
                }
                required
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="año"
                aria-label="Año de nacimiento"
                className={inputClass}
                value={datos.anio}
                onChange={(e) =>
                  actualizar('anio', e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                required
              />
            </div>
          </fieldset>

          <div>
            <label htmlFor="telefono-repartidor-registro" className="mb-2 block text-sm font-bold text-ink">
              Número de teléfono
            </label>
            <div className="flex gap-2">
              <div className="flex h-12 shrink-0 items-center rounded-lg border border-line px-3 text-sm text-ink-muted">
                +52
              </div>
              <input
                id="telefono-repartidor-registro"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="0000000000"
                className={`${inputClass} min-w-0 flex-1`}
                value={datos.telefono}
                onChange={(e) =>
                  actualizar('telefono', e.target.value.replace(/\D/g, '').slice(0, 10))
                }
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="contrasena-repartidor-registro" className="mb-2 block text-sm font-bold text-ink">
              Contraseña
            </label>
            <input
              id="contrasena-repartidor-registro"
              type="password"
              autoComplete="new-password"
              className={inputClass}
              value={datos.contrasena}
              onChange={(e) => actualizar('contrasena', e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2 md:mx-auto md:w-1/2">
            <label htmlFor="confirmar-contrasena-repartidor" className="mb-2 block text-sm font-bold text-ink">
              Confirmar contraseña
            </label>
            <input
              id="confirmar-contrasena-repartidor"
              type="password"
              autoComplete="new-password"
              className={inputClass}
              value={datos.confirmarContrasena}
              onChange={(e) => actualizar('confirmarContrasena', e.target.value)}
              required
            />
          </div>
        </div>

        {mensaje && (
          <p role="alert" className="mt-5 text-center text-sm font-semibold text-ink">
            {mensaje}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            disabled={enviando}
            className="w-full max-w-md bg-brand-100 text-navy-900 hover:bg-brand-200"
          >
            {enviando ? 'Creando cuenta…' : 'Siguiente'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
