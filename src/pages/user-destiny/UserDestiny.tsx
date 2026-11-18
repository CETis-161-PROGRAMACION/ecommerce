import { useId, useState, type FormEvent } from 'react'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import accountIcon from '@/components/ui/icons/account.svg'

interface RecipientForm {
  name: string
  phone: string
}

type RecipientErrors = Partial<Record<keyof RecipientForm, string>>

const inputClass =
  'h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 aria-invalid:border-red-500'

function validate(form: RecipientForm): RecipientErrors {
  const errors: RecipientErrors = {}
  if (!form.name.trim()) errors.name = 'Ingresa el nombre del destinatario.'
  if (!/^\d{10}$/.test(form.phone)) {
    errors.phone = 'El teléfono debe contener 10 dígitos.'
  }
  return errors
}

export function UserDestiny() {
  const id = useId()
  const [form, setForm] = useState<RecipientForm>({ name: '', phone: '' })
  const [errors, setErrors] = useState<RecipientErrors>({})
  const [message, setMessage] = useState('')

  function update(field: keyof RecipientForm, value: string) {
    const nextValue =
      field === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    setForm((current) => ({ ...current, [field]: nextValue }))
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
      'Los datos son válidos. El destinatario se guardará cuando conectemos el servicio de pedidos.',
    )
  }

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-xl flex-col items-center">
        <p className="text-sm font-bold tracking-wide text-ink-muted uppercase">
          Web E-commerce
        </p>
        <img src={accountIcon} alt="" className="my-4 size-32 sm:size-40" />
        <h1 className="text-2xl font-bold text-ink">Ingresar Dirección</h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 flex w-full flex-col gap-5"
        >
          <div>
            <label
              htmlFor={`${id}-name`}
              className="mb-2 block text-sm font-bold text-ink"
            >
              Nombre del destinatario
            </label>
            <input
              id={`${id}-name`}
              autoComplete="name"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              className={inputClass}
            />
            {errors.name && (
              <p id={`${id}-name-error`} className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${id}-phone`}
              className="mb-2 block text-sm font-bold text-ink"
            >
              Teléfono
            </label>
            <input
              id={`${id}-phone`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="0000000000"
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
              className={inputClass}
            />
            {errors.phone && (
              <p id={`${id}-phone-error`} className="mt-1 text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {message && (
            <p
              role="status"
              className="text-center text-sm font-semibold text-ink"
            >
              {message}
            </p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-xs bg-brand-100! text-navy-900! hover:bg-brand-200!"
            >
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </NavBar>
  )
}
