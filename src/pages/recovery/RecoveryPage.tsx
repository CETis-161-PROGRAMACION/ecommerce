import { useState } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { PhoneField } from '@/components/ui/PhoneField'
import { Button } from '@/components/ui/Button'

export function RecoveryPage() {
const [phone, setPhone] = useState('')

const isPhoneValid = /^\d{10}$/.test(phone)

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault()


if (!isPhoneValid) {
  return
}

}

return ( <AuthLayout title="Recuperación de datos"> <form onSubmit={handleSubmit} className="space-y-6"> <div className="space-y-2"> <p className="text-sm leading-relaxed text-navy-900">
</p>


      <PhoneField
        label="Número de teléfono:"
        value={phone}
        onChange={setPhone}
        placeholder="Ingresa tu número"
        error={
          phone.length > 0 && !isPhoneValid
            ? 'Ingresa un número de 10 dígitos.'
            : undefined
        }
      />
    </div>

    <p className="text-lg font-bold leading-relaxed text-navy-900">
      Te enviaremos un SMS para que puedas recuperar tu contraseña 
    </p>

    <Button
      type="submit"
      className="w-full"
      disabled={!isPhoneValid}
    >
      Siguiente
    </Button>
  </form>
</AuthLayout>

)
}
