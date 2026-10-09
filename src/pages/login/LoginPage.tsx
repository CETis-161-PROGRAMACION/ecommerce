import { AuthLayout } from '@/components/layout/AuthLayout'

// TODO: Implementar la pantalla de inicio de sesión. Elementos previstos por
// la referencia:
// - Campo de número de teléfono (PhoneField).
// - Campo de contraseña (TextField con type="password").
// - Botón de inicio de sesión.
// - Opciones visuales de continuación con Google y Facebook.
// - Enlace para recuperar la contraseña (ROUTES.recovery).
// - Enlace de registro.
// No simular autenticación: conectar un servicio real cuando exista.

export function LoginPage() {
  return (
    <AuthLayout title="Iniciar sesión">
      <p className="rounded-xl border border-line bg-brand-100 p-4 text-sm leading-relaxed text-navy-900">
        Pantalla en construcción. Aquí se mostrará el formulario de inicio de
        sesión.
      </p>
    </AuthLayout>
  )
}
