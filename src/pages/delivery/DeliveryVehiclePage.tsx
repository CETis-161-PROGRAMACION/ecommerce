import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import { submitApplication } from '@/services/driver/driver'
import { useSession } from '@/services/session/session'

const REQUIRED_DOCUMENTS = ['Licencia de conducir'] as const
const ACCEPTED_IMAGES = 'image/png,image/jpeg,image/webp'

export function DeliveryVehiclePage() {
  const inputId = useId()
  const vehicleId = useId()
  const navigate = useNavigate()
  const { session } = useSession()
  const [vehicle, setVehicle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)

  const previewUrlRef = useRef('')

  useEffect(() => () => URL.revokeObjectURL(previewUrlRef.current), [])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null
    URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = nextFile ? URL.createObjectURL(nextFile) : ''
    setFile(nextFile)
    setPreviewUrl(previewUrlRef.current)
    setMessage('')
    setHasError(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const userId = session?.user.id
    if (!userId) {
      setHasError(true)
      setMessage('Tu sesión expiró. Inicia sesión de nuevo.')
      return
    }

    if (vehicle.trim().length < 2) {
      setHasError(true)
      setMessage('Describe tu vehículo (por ejemplo: Moto Yamaha 125).')
      return
    }

    if (!file) {
      setHasError(true)
      setMessage('Agrega una foto de tu licencia de conducir.')
      return
    }

    setIsSubmitting(true)
    setHasError(false)
    setMessage('')
    try {
      await submitApplication({ userId, vehicle, license: file })
      navigate(ROUTES.deliveryHome, { replace: true })
    } catch (caught) {
      setHasError(true)
      setMessage(
        caught instanceof Error
          ? caught.message
          : 'No pudimos enviar tu solicitud.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Registro de repartidor" mainClassName="w-full">
      <form onSubmit={handleSubmit} noValidate className="w-full">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
          <section aria-labelledby="vehicle-docs-title">
            <h2
              id="vehicle-docs-title"
              className="mb-4 text-lg font-bold text-ink"
            >
              Ingresar datos y permisos del vehículo
            </h2>
            <label
              htmlFor={vehicleId}
              className="mb-2 block text-sm font-bold text-ink"
            >
              Vehículo
            </label>
            <input
              id={vehicleId}
              type="text"
              maxLength={60}
              placeholder="Moto Yamaha 125"
              value={vehicle}
              onChange={(event) => {
                setVehicle(event.target.value)
                setMessage('')
                setHasError(false)
              }}
              className="mb-5 h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <ul className="flex flex-col gap-1 text-sm text-ink">
              {REQUIRED_DOCUMENTS.map((document) => (
                <li key={document}>
                  <span aria-hidden="true">*</span>
                  {document}
                </li>
              ))}
            </ul>
          </section>

          <div>
            <label
              htmlFor={inputId}
              className="flex aspect-[4/3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-line bg-surface text-ink-muted transition-colors hover:border-brand-400 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-400 motion-reduce:transition-none"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa de la licencia de conducir"
                  className="h-full w-full object-contain"
                />
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-16"
                >
                  <path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3Zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              )}
              <span className="sr-only">Foto de la licencia de conducir</span>
              <input
                id={inputId}
                type="file"
                accept={ACCEPTED_IMAGES}
                onChange={handleFileChange}
                aria-invalid={hasError}
                aria-describedby={message ? `${inputId}-message` : undefined}
                className="sr-only"
              />
            </label>
            {file && (
              <p className="mt-2 truncate text-xs text-ink-muted">
                {file.name}
              </p>
            )}
          </div>
        </div>

        {message && (
          <p
            id={`${inputId}-message`}
            role={hasError ? 'alert' : 'status'}
            className="mt-6 text-center text-sm font-semibold text-ink"
          >
            {message}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-md bg-brand-100 text-navy-900 hover:bg-brand-200"
          >
            {isSubmitting ? 'Enviando…' : 'Solicitar permiso'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
