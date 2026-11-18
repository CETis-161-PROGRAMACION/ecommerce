import { useId, useState, type FormEvent } from 'react'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'

interface CardForm {
  number: string
  month: string
  year: string
  cvv: string
}

type CardErrors = Partial<Record<keyof CardForm, string>>

const EMPTY_FORM: CardForm = { number: '', month: '', year: '', cvv: '' }

const inputClass =
  'h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 aria-invalid:border-red-500'

function onlyDigits(value: string, maxLength: number) {
  return value.replace(/\D/g, '').slice(0, maxLength)
}

function formatCardNumber(value: string) {
  return value.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function validate(form: CardForm): CardErrors {
  const errors: CardErrors = {}
  if (!/^\d{16}$/.test(form.number)) {
    errors.number = 'El número de tarjeta debe tener 16 dígitos.'
  }
  const month = Number(form.month)
  if (!/^\d{2}$/.test(form.month) || month < 1 || month > 12) {
    errors.month = 'Ingresa un mes válido (01 a 12).'
  }
  if (!/^\d{2}$/.test(form.year)) {
    errors.year = 'Ingresa el año con dos dígitos.'
  } else if (!errors.month) {
    const now = new Date()
    const expiry = new Date(2000 + Number(form.year), month, 0, 23, 59, 59)
    if (expiry < now) errors.year = 'La tarjeta está vencida.'
  }
  if (!/^\d{3}$/.test(form.cvv)) {
    errors.cvv = 'El NIP debe tener 3 dígitos.'
  }
  return errors
}

export function InfoTarjetaPage() {
  const id = useId()
  const [form, setForm] = useState<CardForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<CardErrors>({})
  const [message, setMessage] = useState('')

  function update(field: keyof CardForm, value: string, maxLength: number) {
    setForm((current) => ({
      ...current,
      [field]: onlyDigits(value, maxLength),
    }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setMessage('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setMessage('')
      return
    }
    setMessage(
      'Los datos de la tarjeta son válidos. El pago se realizará cuando conectemos el servicio de pagos.',
    )
  }

  const errorList = Object.entries(errors).filter(([, value]) => value)

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <p className="text-sm font-bold tracking-wide text-ink-muted uppercase">
          Web E-commerce
        </p>
        <div
          aria-hidden="true"
          className="mt-3 flex size-20 items-end justify-center overflow-hidden rounded-full border border-line bg-surface"
        >
          <svg viewBox="0 0 24 24" className="size-16 text-ink-muted">
            <circle cx="12" cy="8" r="4.5" fill="currentColor" />
            <path d="M3 24c0-5 4-8.5 9-8.5s9 3.5 9 8.5Z" fill="currentColor" />
          </svg>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
          Información de la tarjeta
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor={`${id}-number`}
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Número de tarjeta
              </label>
              <input
                id={`${id}-number`}
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                value={formatCardNumber(form.number)}
                onChange={(event) => update('number', event.target.value, 16)}
                aria-invalid={Boolean(errors.number)}
                aria-describedby={
                  errors.number ? `${id}-number-error` : undefined
                }
                className={inputClass}
              />
              {errors.number && (
                <p
                  id={`${id}-number-error`}
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.number}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-ink">
                  Fecha de vencimiento
                </legend>
                <div className="flex items-center gap-2">
                  <label htmlFor={`${id}-month`} className="sr-only">
                    Mes de vencimiento
                  </label>
                  <input
                    id={`${id}-month`}
                    inputMode="numeric"
                    autoComplete="cc-exp-month"
                    placeholder="MM"
                    value={form.month}
                    onChange={(event) => update('month', event.target.value, 2)}
                    aria-invalid={Boolean(errors.month)}
                    aria-describedby={
                      errors.month ? `${id}-month-error` : undefined
                    }
                    className={`${inputClass} text-center`}
                  />
                  <span aria-hidden="true" className="text-ink-muted">
                    /
                  </span>
                  <label htmlFor={`${id}-year`} className="sr-only">
                    Año de vencimiento
                  </label>
                  <input
                    id={`${id}-year`}
                    inputMode="numeric"
                    autoComplete="cc-exp-year"
                    placeholder="AA"
                    value={form.year}
                    onChange={(event) => update('year', event.target.value, 2)}
                    aria-invalid={Boolean(errors.year)}
                    aria-describedby={
                      errors.year ? `${id}-year-error` : undefined
                    }
                    className={`${inputClass} text-center`}
                  />
                </div>
                {errors.month && (
                  <p
                    id={`${id}-month-error`}
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.month}
                  </p>
                )}
                {errors.year && (
                  <p
                    id={`${id}-year-error`}
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.year}
                  </p>
                )}
              </fieldset>

              <div>
                <label
                  htmlFor={`${id}-cvv`}
                  className="mb-2 block text-sm font-semibold text-ink"
                >
                  NIP
                </label>
                <input
                  id={`${id}-cvv`}
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="•••"
                  value={form.cvv}
                  onChange={(event) => update('cvv', event.target.value, 3)}
                  aria-invalid={Boolean(errors.cvv)}
                  aria-describedby={errors.cvv ? `${id}-cvv-error` : undefined}
                  className={`${inputClass} text-center tracking-widest`}
                />
                {errors.cvv && (
                  <p
                    id={`${id}-cvv-error`}
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto flex aspect-[1.6/1] w-full max-w-xs flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-400 to-navy-900 p-5 text-white shadow-lg"
          >
            <span className="h-7 w-10 rounded-md bg-amber-300/80" />
            <p className="font-mono text-lg tracking-widest">
              {formatCardNumber(form.number.padEnd(16, '•'))}
            </p>
            <p className="font-mono text-sm">
              {(form.month || 'MM') + '/' + (form.year || 'AA')}
            </p>
          </div>

          <div className="md:col-span-2">
            {errorList.length > 0 && (
              <p
                role="alert"
                className="mb-4 text-center text-sm font-semibold text-red-600"
              >
                Revisa los datos marcados.
              </p>
            )}
            {message && (
              <p
                role="status"
                className="mb-4 text-center text-sm font-semibold text-ink"
              >
                {message}
              </p>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full max-w-xl bg-brand-100! text-navy-900! hover:bg-brand-200!"
              >
                Realizar pago
              </Button>
            </div>
          </div>
        </form>
      </div>
    </NavBar>
  )
}
