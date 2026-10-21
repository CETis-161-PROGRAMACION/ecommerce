import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import { CODIGO_DEMO, verifyDemoCode } from '@/services/demoAuth'

const LONGITUD = 6
const COOLDOWN_SEGUNDOS = 30

export function ConfirmCodePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const telefono = (location.state as { telefono?: string } | null)?.telefono

  const [digitos, setDigitos] = useState<string[]>(Array(LONGITUD).fill(''))
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)
  const [verificando, setVerificando] = useState(false)
  const [reenviando, setReenviando] = useState(false)
  const [cooldown, setCooldown] = useState(COOLDOWN_SEGUNDOS)
  const casillas = useRef<Array<HTMLInputElement | null>>([])

  // Cuenta regresiva para poder volver a mostrar el código
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  // Al terminar con éxito, pasa al inicio de sesión
  useEffect(() => {
    if (!exito) return
    const id = setTimeout(
      () => navigate(ROUTES.login, { state: { telefono } }),
      1200,
    )
    return () => clearTimeout(id)
  }, [exito, navigate, telefono])

  // Sin pasar por el registro no hay nada que confirmar
  if (!telefono) {
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

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const codigo = digitos.join('')

    if (codigo.length < LONGITUD) {
      setError(`Escribe los ${LONGITUD} dígitos del código.`)
      return
    }

    setVerificando(true)
    try {
      if (verifyDemoCode(telefono ?? '', codigo)) {
        setExito(true)
      } else {
        setError('El código es incorrecto. Revísalo e inténtalo de nuevo.')
        setDigitos(Array(LONGITUD).fill(''))
        casillas.current[0]?.focus()
      }
    } finally {
      setVerificando(false)
    }
  }

  function manejarReenvio() {
    setReenviando(true)
    setError('')
    setDigitos(Array(LONGITUD).fill(''))
    casillas.current[0]?.focus()
    setCooldown(COOLDOWN_SEGUNDOS)
    setReenviando(false)
  }

  const ultimos = telefono.slice(-4)

  return (
    <AuthLayout title="Confirmar Código">
      <h2 className="text-2xl font-extrabold text-navy-900">
        Confirma tu número
      </h2>
      <p className="mt-3 text-sm text-ink">
        Escribe el código de {LONGITUD} dígitos del número terminado en{' '}
        <strong className="text-ink">{ultimos}</strong>.
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
                className="h-14 w-12 rounded-xl border border-line bg-surface text-center text-xl font-bold text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100 aria-[invalid=true]:border-danger"
              />
            ))}
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="notice notice-danger mt-5">
            {error}
          </p>
        ) : null}

        {exito ? (
          <p role="status" className="notice notice-success mt-5">
            Número confirmado. Te llevamos al inicio de sesión…
          </p>
        ) : null}

        <Button
          type="submit"
          fullWidth
          className="mt-8"
          disabled={verificando || exito}
        >
          {verificando ? 'Verificando…' : 'Confirmar código'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-ink-muted">
        {cooldown > 0 ? (
          <p>Podrás volver a mostrar el código en {cooldown} s</p>
        ) : (
          <button
            type="button"
            onClick={manejarReenvio}
            disabled={reenviando || exito}
            className="font-semibold text-navy-900 underline underline-offset-4 disabled:opacity-60"
          >
            {reenviando ? 'Mostrando…' : 'Mostrar el código otra vez'}
          </button>
        )}
      </div>

      <p className="notice notice-info mt-6 text-center">
        Modo demostración: el código válido es <strong>{CODIGO_DEMO}</strong>.
      </p>
    </AuthLayout>
  )
}
