import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import accountIcon from '@/components/ui/icons/account.svg'
import { ROUTES } from '@/router/routes'
import { createAddress } from '@/services/address'
import { useCheckout } from '@/services/order/checkout'

interface AddressForm {
  postalCode: string
  street: string
  extNumber: string
  intNumber: string
  referenceNotes: string
}

type AddressErrors = Partial<Record<keyof AddressForm, string>>

const INITIAL_FORM: AddressForm = {
  postalCode: '',
  street: '',
  extNumber: '',
  intNumber: '',
  referenceNotes: '',
}

function validate(form: AddressForm): AddressErrors {
  const errors: AddressErrors = {}
  if (!/^\d{5}$/.test(form.postalCode)) {
    errors.postalCode = 'El código postal debe tener 5 dígitos.'
  }
  const street = form.street.trim()
  if (street.length < 1 || street.length > 120) {
    errors.street = 'Escribe la calle (máximo 120 caracteres).'
  }
  const ext = form.extNumber.trim()
  if (ext.length < 1 || ext.length > 10) {
    errors.extNumber = 'Escribe el número exterior (máximo 10 caracteres).'
  }
  if (form.intNumber.trim().length > 10) {
    errors.intNumber = 'El número interior admite máximo 10 caracteres.'
  }
  if (form.referenceNotes.length > 200) {
    errors.referenceNotes = 'Las referencias admiten máximo 200 caracteres.'
  }
  return errors
}

export function AddressPage() {
  const navigate = useNavigate()
  const { update } = useCheckout()
  const [form, setForm] = useState<AddressForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<AddressErrors>({})
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  function change(field: keyof AddressForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSaving(true)
    setMessage('')
    try {
      const address = await createAddress(form)
      update({ addressId: address.id, pickupMethod: 'delivery' })
      navigate(ROUTES.infoPedido)
    } catch (caught) {
      setMessage(
        caught instanceof Error
          ? caught.message
          : 'No pudimos guardar la dirección.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <NavBar backTo={ROUTES.infoPedido}>
      <div className="mb-8 flex flex-col items-center text-center">
        <p className="text-sm font-bold tracking-wide text-ink-muted uppercase">
          Web E-commerce
        </p>
        <img src={accountIcon} alt="" className="my-4 size-32 sm:size-40 dark:brightness-200" />
        <h1 className="text-2xl font-bold text-ink">Ingresar dirección</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
          <TextField
            label="Código postal"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={form.postalCode}
            onChange={(event) =>
              change('postalCode', event.target.value.replace(/\D/g, '').slice(0, 5))
            }
            error={errors.postalCode}
          />
          <TextField
            label="Calle"
            autoComplete="address-line1"
            maxLength={120}
            value={form.street}
            onChange={(event) => change('street', event.target.value)}
            error={errors.street}
          />
          <TextField
            label="Número exterior"
            maxLength={10}
            value={form.extNumber}
            onChange={(event) => change('extNumber', event.target.value)}
            error={errors.extNumber}
          />
          <TextField
            label="Número interior (opcional)"
            maxLength={10}
            value={form.intNumber}
            onChange={(event) => change('intNumber', event.target.value)}
            error={errors.intNumber}
          />
          <div className="md:col-span-2">
            <TextField
              label="Referencias (opcional)"
              maxLength={200}
              value={form.referenceNotes}
              onChange={(event) => change('referenceNotes', event.target.value)}
              error={errors.referenceNotes}
            />
          </div>
        </div>

        {message && (
          <p role="alert" className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full max-w-xs bg-brand-100! text-navy-900! hover:bg-brand-200!"
          >
            {isSaving ? 'Guardando…' : 'Continuar'}
          </Button>
        </div>
      </form>
    </NavBar>
  )
}
