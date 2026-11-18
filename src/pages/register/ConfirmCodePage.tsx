import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { resendSignupCode, verifySignupCode } from '@/services/auth'
import { AuthLayout } from '@/components/layout/AuthLayout'

const LONGITUD = 6
const COOLDOWN_SEGUNDOS = 30

export function ConfirmCodePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const estado = location.state as { correo?: string; next?: string } | null
  const correo = estado?.correo
  const destino = estado?.next ?? ROUTES.home

  const [digitos, setDigitos] = useState<string[]>(Array(LONGITUD).fill(''))
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)
  const [verificando, setVerificando] = useState(false)
  const [reenviando, setReenviando] = useState(false)
  const [cooldown, setCooldown] = useState(COOLDOWN_SEGUNDOS)
  const casillas = useRef<Array<HTMLInputElement | null>>([])

  // Cuenta regresiva para poder reenviar el código
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  // Al terminar con éxito, pasa al inicio de sesión
  useEffect(() => {
    if (!exito) return
    const id = setTimeout(() => navigate(destino, { replace: true }), 1500)
    return () => clearTimeout(id)
  }, [exito, navigate, destino])

  // Sin pasar por el registro no hay nada que confirmar
  if (!correo) {
    return <Navigate to={ROUTES.register} replace />
  }

  function cambiarDigito(indice: number, valor: string) {
    const limpio = valor.replace(/\D/g, '').slice(-1)
    setDigitos((previo) => {
      const siguiente = [...previo]
      siguiente[indice] = limpio
      return siguiente
    })
    setError('')
    if (limpio && indice < LONGITUD - 1) {
      casillas.current[indice + 1]?.focus()
    }
  }

  function manejarTecla(indice: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digitos[indice] && indice > 0) {
      casillas.current[indice - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && indice > 0) {
      casillas.current[indice - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && indice < LONGITUD - 1) {
      casillas.current[indice + 1]?.focus()
    }
  }

  function manejarPegado(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pegado = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, LONGITUD)
    if (!pegado) return
    const siguiente = Array(LONGITUD).fill('')
    pegado.split('').forEach((d, i) => (siguiente[i] = d))
    setDigitos(siguiente)
    setError('')
    casillas.current[Math.min(pegado.length, LONGITUD - 1)]?.focus()
  }

  async function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const codigo = digitos.join('')

    if (codigo.length < LONGITUD) {
      setError(`Escribe los ${LONGITUD} dígitos del código.`)
      return
    }

    setVerificando(true)
    try {
      await verifySignupCode(correo!, codigo)
      setExito(true)
    } catch (causa) {
      setError(
        causa instanceof Error
          ? causa.message
          : 'No pudimos verificar el código. Inténtalo de nuevo.',
      )
      setDigitos(Array(LONGITUD).fill(''))
      casillas.current[0]?.focus()
    } finally {
      setVerificando(false)
    }
  }

  async function manejarReenvio() {
    setReenviando(true)
    setError('')
    try {
      await resendSignupCode(correo!)
      setDigitos(Array(LONGITUD).fill(''))
      casillas.current[0]?.focus()
      setCooldown(COOLDOWN_SEGUNDOS)
    } catch (causa) {
      setError(
        causa instanceof Error
          ? causa.message
          : 'No pudimos reenviar el código. Inténtalo más tarde.',
      )
    } finally {
      setReenviando(false)
    }
  }

  return (
    <AuthLayout title='Confirmar Código'>
        <h1 className="text-2xl font-extrabold text-navy-900">
          Confirma tu correo
        </h1>
        <p className="mt-3 text-sm">
          Enviamos un código de {LONGITUD} dígitos a <strong>{correo}</strong>.
        </p>

        <form onSubmit={manejarEnvio} className="mt-8">
          <fieldset disabled={verificando || exito}>
            <legend className="sr-only">Código de confirmación</legend>
            <div className="flex justify-between gap-2">
              {digitos.map((digito, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    casillas.current[i] = el
                  }}
                  value={digito}
                  onChange={(e) => cambiarDigito(i, e.target.value)}
                  onKeyDown={(e) => manejarTecla(i, e)}
                  onPaste={manejarPegado}
                  onFocus={(e) => e.target.select()}
                  type="text"
                  inputMode="numeric"
                  autoComplete={i === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  autoFocus={i === 0}
                  aria-label={`Dígito ${i + 1} de ${LONGITUD}`}
                  aria-invalid={error ? true : undefined}
                  className="h-14 w-12 rounded-lg border border-line bg-surface text-ink text-center text-xl font-bold outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 aria-[invalid=true]:border-red-500"
                />
              ))}
            </div>
          </fieldset>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800"
            >
              {error}
            </p>
          )}

          {exito && (
            <p
              role="status"
              className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-800"
            >
              Correo confirmado. Te llevamos al inicio…
            </p>
          )}

          <button
            type="submit"
            disabled={verificando || exito}
            className="mt-8 w-full rounded-full bg-blue-900 px-8 py-3 font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verificando ? 'Verificando…' : 'Confirmar código'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          {cooldown > 0 ? (
            <p>Podrás reenviar el código en {cooldown} s</p>
          ) : (
            <button
              type="button"
              onClick={manejarReenvio}
              disabled={reenviando || exito}
              className="font-semibold text-navy-900 underline disabled:opacity-60"
            >
              {reenviando ? 'Reenviando…' : 'Reenviar código'}
            </button>
          )}
        </div>

      </AuthLayout>
  )
}
