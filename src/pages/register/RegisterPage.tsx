import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
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

const EDAD_MINIMA = 13 // ajústala según lo que defina el equipo

/** Devuelve un mensaje de error, o "" si la fecha es válida. */
function validarFecha(dia: string, mes: string, anio: string): string {
  const d = Number(dia)
  const m = Number(mes)
  const a = Number(anio)

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
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [enviando, setEnviando] = useState(false)

  function actualizar(campo: keyof DatosRegistro, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }))
    setError('')
  }

  async function manejarRegistro(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

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

  const campoBase =
    'w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 ' +
    'text-gray-800 outline-none transition focus:border-blue-600 ' +
    'focus:ring-2 focus:ring-blue-100'

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8 text-gray-800">
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <header className="mb-10 flex flex-wrap items-center gap-5">
          {/* Sustituye esta imagen por el logo real del proyecto */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-700 text-center text-sm font-bold">
            WEB
            <br />
            161
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-blue-900">
              REGISTRO
            </h1>
            <p className="mt-2 text-sm font-semibold">WEB E-COMMERCE</p>
          </div>
        </header>

        <form onSubmit={manejarRegistro} noValidate>
          <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="mb-2 block font-bold">
                Nombre completo:
              </label>
              <input
                id="nombre"
                className={campoBase}
                type="text"
                autoComplete="name"
                placeholder="Escribe tu nombre completo"
                value={datos.nombre}
                onChange={(e) => actualizar('nombre', e.target.value)}
                required
              />
            </div>

            <fieldset>
              <legend className="mb-2 font-bold">Fecha de nacimiento:</legend>
              <div className="grid grid-cols-3 gap-3">
                <input
                  className={campoBase}
                  aria-label="Día de nacimiento"
                  placeholder="día"
                  type="number"
                  min="1"
                  max="31"
                  value={datos.dia}
                  onChange={(e) => actualizar('dia', e.target.value)}
                  required
                />
                <input
                  className={campoBase}
                  aria-label="Mes de nacimiento"
                  placeholder="mes"
                  type="number"
                  min="1"
                  max="12"
                  value={datos.mes}
                  onChange={(e) => actualizar('mes', e.target.value)}
                  required
                />
                <input
                  className={campoBase}
                  aria-label="Año de nacimiento"
                  placeholder="año"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={datos.anio}
                  onChange={(e) => actualizar('anio', e.target.value)}
                  required
                />
              </div>
            </fieldset>

            <div>
              <label htmlFor="telefono" className="mb-2 block font-bold">
                Número de teléfono:
              </label>
              <div className="flex gap-3">
                <span className="flex items-center rounded-lg border border-gray-300 px-3">
                  +52
                </span>
                <input
                  id="telefono"
                  className={campoBase}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="0000000000"
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
              <label htmlFor="contrasena" className="mb-2 block font-bold">
                Contraseña:
              </label>
              <input
                id="contrasena"
                className={campoBase}
                type={mostrarContrasena ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={datos.contrasena}
                onChange={(e) => actualizar('contrasena', e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2 md:mx-auto md:w-3/4">
              <label
                htmlFor="confirmarContrasena"
                className="mb-2 block font-bold"
              >
                Confirmar contraseña:
              </label>
              <input
                id="confirmarContrasena"
                className={campoBase}
                type={mostrarContrasena ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
                value={datos.confirmarContrasena}
                onChange={(e) =>
                  actualizar('confirmarContrasena', e.target.value)
                }
                required
              />

              <label className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={mostrarContrasena}
                  onChange={(e) => setMostrarContrasena(e.target.checked)}
                />
                Mostrar contraseñas
              </label>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800"
            >
              {error}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-full bg-blue-900 px-8 py-3 font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-2/3"
            >
              {enviando ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

