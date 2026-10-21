import { useState, type FormEvent } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'

interface DatosRepartidor {
  nombre: string
  dia: string
  mes: string
  anio: string
  telefono: string
  contrasena: string
  confirmarContrasena: string
}

const datosIniciales: DatosRepartidor = {
  nombre: '',
  dia: '',
  mes: '',
  anio: '',
  telefono: '',
  contrasena: '',
  confirmarContrasena: '',
}

const inputClass =
  'h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink ' +
  'placeholder:text-ink-muted outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

export function DeliveryRegisterPage() {
  const [datos, setDatos] = useState<DatosRepartidor>(datosIniciales)
  const [mensaje, setMensaje] = useState('')

  function actualizar(campo: keyof DatosRepartidor, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }))
    setMensaje('')
  }

  function manejarRegistro(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!datos.nombre.trim()) {
      setMensaje('Ingresa tu nombre completo.')
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

    setMensaje(
      'Los datos son válidos. El registro se habilitará cuando conectemos el servicio de autenticación.',
    )
  }

  return (
    <AuthLayout title="Registro de repartidor" mainClassName="w-full">
      <form onSubmit={manejarRegistro} noValidate className="w-full">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="nombre-repartidor"
              className="mb-2 block text-sm font-bold text-ink"
            >
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
                  actualizar(
                    'dia',
                    e.target.value.replace(/\D/g, '').slice(0, 2),
                  )
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
                  actualizar(
                    'mes',
                    e.target.value.replace(/\D/g, '').slice(0, 2),
                  )
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
                  actualizar(
                    'anio',
                    e.target.value.replace(/\D/g, '').slice(0, 4),
                  )
                }
                required
              />
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="telefono-repartidor-registro"
              className="mb-2 block text-sm font-bold text-ink"
            >
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
                  actualizar(
                    'telefono',
                    e.target.value.replace(/\D/g, '').slice(0, 10),
                  )
                }
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contrasena-repartidor-registro"
              className="mb-2 block text-sm font-bold text-ink"
            >
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
            <label
              htmlFor="confirmar-contrasena-repartidor"
              className="mb-2 block text-sm font-bold text-ink"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmar-contrasena-repartidor"
              type="password"
              autoComplete="new-password"
              className={inputClass}
              value={datos.confirmarContrasena}
              onChange={(e) =>
                actualizar('confirmarContrasena', e.target.value)
              }
              required
            />
          </div>
        </div>

        {mensaje && (
          <p
            role="status"
            className="mt-5 text-center text-sm font-semibold text-ink"
          >
            {mensaje}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="w-full max-w-md bg-brand-100 text-navy-900 hover:bg-brand-200"
          >
            Siguiente
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
