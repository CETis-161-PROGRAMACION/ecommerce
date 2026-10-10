import { AuthLayout } from '@/components/layout/AuthLayout'

// TODO: Implementar la pantalla de recuperación de datos. Elementos previstos
// por la referencia:
// - Campo de número de teléfono (PhoneField).
// - Texto que informe sobre el futuro envío de un SMS para recuperar la
//   contraseña.
// - Botón Siguiente.
// No enviar mensajes ni afirmar que se enviará un SMS: conectar un servicio
// real cuando exista.

export function RecoveryPage() {
  return (
    <AuthLayout title="Recuperar datos">
      <p className="rounded-xl border border-line bg-brand-100 p-4 text-sm leading-relaxed text-navy-900">
        Pantalla en construcción. Aquí se solicitará el número de teléfono para
        recuperar la contraseña.
      </p>
    </AuthLayout>
  )
}
