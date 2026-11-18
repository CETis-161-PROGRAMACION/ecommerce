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
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-bold text-gray-400">WEB E-COMMERCE</p>
        <div className="h-3 w-3 mask-origin-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)]"></div>
        <p className="text-xl font-bold">Información de la tarjeta</p>
      </div>
      <div className="flex">

        <input type="tel" placeholder="" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />

        <div className= "gap-4 rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden flex">
  <div className="flex-1">DD</div>
  <div className="flex-1">MM</div>
  <div className="flex-1">AA</div>

        </div>
      </div>
    
    </AuthLayout>
  )
}
