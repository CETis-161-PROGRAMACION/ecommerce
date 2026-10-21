import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'

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

export function DeliveryRegisterPage() {
  const navigate = useNavigate()
  const { register } = useApp()

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

    const resultado = register({
      nombre: datos.nombre.trim(),
      fechaNacimiento: `${datos.anio}-${datos.mes.padStart(2, '0')}-${datos.dia.padStart(2, '0')}`,
      telefono: datos.telefono,
      contrasena: datos.contrasena,
      rol: 'repartidor',
    })

    if (!resultado.ok) {
      setMensaje(resultado.error ?? 'No pudimos crear la cuenta.')
      return
    }

    navigate(ROUTES.deliveryOrders)
  }

  return (
    <AuthLayout title="Registro de repartidor" mainClassName="w-full">
      <form onSubmit={manejarRegistro} noValidate className="w-full">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          <div>
            <label htmlFor="nombre-repartidor" className={labelClass}>
              Nombre completo:
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
            <legend className={labelClass}>Fecha de nacimiento:</legend>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <input
                id="dia-repartidor"
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="día"
                aria-label="Día de nacimiento"
                className={`${inputClass} text-center`}
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
                id="mes-repartidor"
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="mes"
                aria-label="Mes de nacimiento"
                className={`${inputClass} text-center`}
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
                id="anio-repartidor"
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="año"
                aria-label="Año de nacimiento"
                className={`${inputClass} text-center`}
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
              className={labelClass}
            >
              Número de teléfono:
            </label>
            <div className="flex gap-3">
              <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-base font-medium text-ink-muted sm:w-24">
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
              className={labelClass}
            >
              Contraseña:
            </label>
            <input
              id="contrasena-repartidor-registro"
              type="password"
              autoComplete="new-password"
              placeholder="*****"
              className={inputClass}
              value={datos.contrasena}
              onChange={(e) => actualizar('contrasena', e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2 md:mx-auto md:w-1/2">
            <label
              htmlFor="confirmar-contrasena-repartidor"
              className={labelClass}
            >
              Confirmar contraseña:
            </label>
            <input
              id="confirmar-contrasena-repartidor"
              type="password"
              autoComplete="new-password"
              placeholder="*****"
              className={inputClass}
              value={datos.confirmarContrasena}
              onChange={(e) =>
                actualizar('confirmarContrasena', e.target.value)
              }
              required
            />
          </div>
        </div>

        {mensaje ? (
          <p role="alert" className="notice notice-danger mt-5 text-center">
            {mensaje}
          </p>
        ) : null}

        <div className="mt-8 flex justify-center">
          <Button type="submit" className="w-full max-w-[280px]">
            Crear cuenta
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
