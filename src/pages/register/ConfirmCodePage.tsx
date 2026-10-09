import { AuthLayout } from '@/components/layout/AuthLayout'

// TODO: Implementar la pantalla de confirmación de código con dos estados
// visuales:
// - Pendiente: cuatro casillas con borde gris.
// - Código correcto: las cuatro casillas con borde verde (token success).
// Ambos estados deben representarse con un único componente y un estado
// visual, sin duplicar la página completa. No implementar validación real de
// códigos ni simular que un código fue confirmado.

export function ConfirmCodePage() {
  return (
    <AuthLayout title="Confirmar código">
      <p className="rounded-xl border border-line bg-brand-100 p-4 text-sm leading-relaxed text-navy-900">
        Pantalla en construcción. Aquí se introducirá el código enviado al
        teléfono del usuario.
      </p>
    </AuthLayout>
  )
}
