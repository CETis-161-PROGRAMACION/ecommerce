import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import { registerUser } from '@/services/auth'

interface DatosRegistro {
  nombre: string
  dia: string
  mes: string
  anio: string
  telefono: string
  contrasena: string
  confirmarContrasena: string
}

const datosIniciales: DatosRegistro = {
  nombre: '',
  dia: '',
  mes: '',
  anio: '',
  telefono: '',
  contrasena: '',
  confirmarContrasena: '',
}

const EDAD_MINIMA = 13

/** Devuelve un mensaje de error, o "" si la fecha es válida. */
function validarFecha(dia: string, mes: string, anio: string): string {
  const d = Number(dia)
  const m = Number(mes)
  const a = Number(anio)

  if (!d || !m || !a) return 'Completa tu fecha de nacimiento.'

  const fecha = new Date(a, m - 1, d)
  const existe =
    fecha.getFullYear() === a &&
    fecha.getMonth() === m - 1 &&
    fecha.getDate() === d

  if (!existe) return 'La fecha de nacimiento no existe.'

  const hoy = new Date()
  if (fecha > hoy) return 'La fecha de nacimiento no puede ser futura.'

  let edad = hoy.getFullYear() - a
  const yaCumplio =
    hoy.getMonth() > m - 1 ||
    (hoy.getMonth() === m - 1 && hoy.getDate() >= d)
  if (!yaCumplio) edad -= 1

  if (edad < EDAD_MINIMA) {
    return `Debes tener al menos ${EDAD_MINIMA} años para registrarte.`
  }
  return ''
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [datos, setDatos] = useState<DatosRegistro>(datosIniciales)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  function actualizar(campo: keyof DatosRegistro, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }))
    setError('')
  }

  async function manejarRegistro(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!datos.nombre.trim()) {
      setError('Por favor, ingresa tu nombre completo.')
      return
    }

    const errorFecha = validarFecha(datos.dia, datos.mes, datos.anio)
    if (errorFecha) {
      setError(errorFecha)
      return
    }

    if (!/^[0-9]{10}$/.test(datos.telefono)) {
      setError('Ingresa un teléfono de 10 dígitos.')
      return
    }

    if (datos.contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (datos.contrasena !== datos.confirmarContrasena) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setEnviando(true)
    try {
      await registerUser({
        nombre: datos.nombre.trim(),
        fechaNacimiento: `${datos.anio}-${datos.mes.padStart(2, '0')}-${datos.dia.padStart(2, '0')}`,
        telefono: datos.telefono,
        contrasena: datos.contrasena,
      })
      navigate(ROUTES.confirmCode, { state: { telefono: datos.telefono } })
    } catch {
      setError('No pudimos crear tu cuenta. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const inputClass =
    'h-14 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink ' +
    'placeholder:text-ink-muted/70 outline-none transition-colors ' +
    'focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

  return (
    <AuthLayout title="Registro" mainClassName="w-full">
      <form onSubmit={manejarRegistro} noValidate className="w-full">
        <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2 lg:gap-x-20">
          {/* Nombre completo */}
          <div>
            <label
              htmlFor="nombre"
              className="mb-2 block text-base font-bold text-ink"
            >
              Nombre completo:
            </label>
            <input
              id="nombre"
              type="text"
              autoComplete="name"
              className={inputClass}
              value={datos.nombre}
              onChange={(e) => actualizar('nombre', e.target.value)}
              required
            />
          </div>

          {/* Fecha de nacimiento */}
          <fieldset>
            <legend className="mb-2 block text-base font-bold text-ink">
              Fecha de nacimiento:
            </legend>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <input
                id="dia"
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="día"
                aria-label="Día de nacimiento"
                className={`${inputClass} text-center`}
                value={datos.dia}
                onChange={(e) =>
                  actualizar('dia', e.target.value.replace(/\D/g, '').slice(0, 2))
                }
                required
              />
              <input
                id="mes"
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="mes"
                aria-label="Mes de nacimiento"
                className={`${inputClass} text-center`}
                value={datos.mes}
                onChange={(e) =>
                  actualizar('mes', e.target.value.replace(/\D/g, '').slice(0, 2))
                }
                required
              />
              <input
                id="anio"
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

          {/* Número de Teléfono */}
          <div>
            <label
              htmlFor="telefono"
              className="mb-2 block text-base font-bold text-ink"
            >
              Número de Teléfono:
            </label>
            <div className="flex gap-3">
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-base font-medium text-ink-muted sm:w-24">
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

          {/* Contraseña */}
          <div>
            <label
              htmlFor="contrasena"
              className="mb-2 block text-base font-bold text-ink"
            >
              Contraseña:
            </label>
            <input
              id="contrasena"
              type="password"
              autoComplete="new-password"
              placeholder="*****"
              className={inputClass}
              value={datos.contrasena}
              onChange={(e) => actualizar('contrasena', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Confirmar Contraseña (centrado abajo de las 2 columnas) */}
        <div className="mt-7 flex flex-col items-center">
          <label
            htmlFor="confirmarContrasena"
            className="mb-2 block text-center text-base font-bold text-ink"
          >
            Confirmar Contraseña:
          </label>
          <input
            id="confirmarContrasena"
            type="password"
            autoComplete="new-password"
            placeholder="*****"
            className={`${inputClass} max-w-[420px]`}
            value={datos.confirmarContrasena}
            onChange={(e) => actualizar('confirmarContrasena', e.target.value)}
            required
          />
        </div>

        {/* Mensaje de error si falla la validación */}
        {error && (
          <p
            role="alert"
            className="mt-5 text-center text-sm font-semibold text-red-600"
          >
            {error}
          </p>
        )}

        {/* Botón de acción centrado */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            type="submit"
            disabled={enviando}
            className="w-full max-w-[280px] bg-brand-100 py-3.5 text-base font-medium text-ink hover:bg-brand-200"
          >
            {enviando ? 'Creando cuenta…' : 'Iniciar sesión'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
