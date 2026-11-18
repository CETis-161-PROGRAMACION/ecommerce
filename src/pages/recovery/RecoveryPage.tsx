import { AuthLayout } from '@/components/layout/AuthLayout'
import { ROUTES } from "@/router/routes"


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
      <p className="w-1/2 mr-3 mb-3 font-bold text-xl"> Número de teléfono: </p>

        <div className="flex w-full max-w-md">
          <select className="mb-6 mr-3 w-12 col-start-1 rounded border row-start-1  border-line bg-surface p-2 text-sm leading-relaxed text-ink appearance-none ">
            <option value="+52"> +52 </option>
            <option value="+1"> +1 </option>
            <option value="+57"> +57 </option>
          </select>

            <input type="tel" placeholder="" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
        </div>
            <div className="flex flex-col text-center mr-3 ml-3 font-bold">
            <a>Te enviaremos un SMS para que</a>
            <a className="mb-4"> puedas recuperar tu contraseña</a>
            </div>

            <div className="flex justify-center">
            <a   href={ROUTES.recovery} type="button" className="mb-4 w-50 rounded-full bg-blue-200 p-2 text-sm font-semibold text-black focus:outline-none focus:outline-2 focus:ring-offset-1 hover:bg-blue-300 text-center"> Siguiente </a>  
            
        </div>
    </AuthLayout>
  )
}
