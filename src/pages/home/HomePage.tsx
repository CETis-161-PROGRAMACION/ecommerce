import { AuthLayout } from '@/components/layout/AuthLayout'

// TODO: Implementar la pantalla de confirmación de código con dos estados
// visuales:
// - Pendiente: cuatro casillas con borde gris.
// - Código correcto: las cuatro casillas con borde verde (token success).
// Ambos estados deben representarse con un único componente y un estado
// visual, sin duplicar la página completa. No implementar validación real de
// códigos ni simular que un código fue confirmado.

export function HomePage() {
    return (
        <AuthLayout title="Confirmar código">
        <p className="rounded-xl border border-line bg-brand-100 p-4 text-sm leading-relaxed text-navy-900">
            Estamos desde Home y Esteba, tu te encargas de lo demás.
        </p>
        </AuthLayout>
    )
}
