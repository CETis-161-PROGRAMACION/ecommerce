import { useState } from 'react'
import type { FormEvent } from 'react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { PhoneField } from '@/components/ui/PhoneField'
import { TextField } from '@/components/ui/TextField'
import { isValidPhone } from '@/utils/phone'

// ---------------------------------------------------------------------------
// PLANTILLA COPIABLE — NO se registra en el router ni se importa desde páginas
// de producción. Copia este archivo a src/pages/<nombre>/<Nombre>Page.tsx y
// adáptalo. Consulta src/plantillas/README.md para el procedimiento completo.
// ---------------------------------------------------------------------------

interface FormErrors {
  phone?: string
  password?: string
}

export function FormPageTemplate() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Evita el envío tradicional del formulario (recarga de página).
    event.preventDefault()

    // 1. Validación local de los campos.
    const nextErrors: FormErrors = {}
    if (!isValidPhone(phone)) {
      nextErrors.phone = 'Ingresa un número válido de diez dígitos.'
    }
    if (password.length < 6) {
      nextErrors.password = 'La contraseña debe tener al menos seis caracteres.'
    }
    setErrors(nextErrors)

    // 2. Si hay errores, no se continúa con la operación.
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    // TODO(servicio): conecta aquí el servicio real cuando exista (inicio de
    // sesión, envío de SMS, registro, etc.).
    // - No simules la operación: no navegues a otra pantalla, no muestres un
    //   mensaje de éxito ni un estado de carga artificial.
    // - Cuando el servicio esté disponible, colócalo en src/services/ e
    //   invócalo desde aquí con su estado real (loading, error, resultado).
  }

  return (
    <AuthLayout title="Título de ejemplo">
      {/* TODO: cambia el título de AuthLayout y adapta los campos a tu pantalla. */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <PhoneField
          label="Número de teléfono"
          value={phone}
          onChange={setPhone}
          placeholder="10 dígitos"
          error={errors.phone}
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Tu contraseña"
          error={errors.password}
        />
        {/* TODO: mensaje informativo específico de la pantalla. */}
        <p className="text-sm leading-relaxed text-ink-muted">
          Información o mensaje de ejemplo para la pantalla.
        </p>
        <Button type="submit">Continuar</Button>
        {/* TODO: enlaces secundarios (recuperar contraseña, registrarse...). */}
      </form>
    </AuthLayout>
  )
}
