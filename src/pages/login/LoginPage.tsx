import { AuthLayout } from '@/components/layout/AuthLayout'
import { ROUTES } from "@/router/routes"

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
      <div className="flex flex-col gap-4">
  
      <div className="flex flex-col ">
        <div className="flex ">
        <p className="w-1/2 mr-3 mb-3 font-bold text-xl"> Número de teléfono: </p>
        <p className="w-1/2 ml-3 mb-3 font-bold text-xl"> Contraseña: </p>
        </div>
        <section className='flex flex-row justify-between gap-12'>
          
        <div className="flex w-full max-w-md">
          <select className="mb-6 mr-3 w-12 col-start-1 rounded border row-start-1  border-line bg-surface p-2 text-sm leading-relaxed text-ink appearance-none ">
            <option value="+52"> +52 </option>
            <option value="+1"> +1 </option>
            <option value="+57"> +57 </option>
          </select>

            <input type="tel" placeholder="" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" />
        </div>

            <input type="password" placeholder="•••••••••" className="mb-6 w-full rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink focus:border-indigo-600 focus:outline-hidden" /> 
          </section>
      </div>
        
            <div className="flex justify-center">
            <a   href={ROUTES.home} type="button" className="mb-4 w-50 rounded-full bg-blue-200 p-2 text-sm font-semibold text-black focus:outline-none focus:outline-2 focus:ring-offset-1 hover:bg-blue-300 text-center"> Iniciar sesion </a>
            </div>
            
            <a className="m-2 text-center text-lg font-semibold"> O continuar con </a>

        <div className="flex justify-center">
            <button className="mb-4 mr-3 w-22 rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink">Google</button>  
            <button className="mb-4 ml-3 w-22 rounded border border-line bg-surface p-2 text-sm leading-relaxed text-ink ">Facebook</button>
        </div>
        
            <a href={ROUTES.recovery} className="mb-4 text-center text-blue-600 text-xs">
              ¿Olvidaste tu contraseña?
            </a>

        <div className="text-center text-xs">
          <a> ¿No tienes cuenta? 
          <a href={ROUTES.confirmCode} className="m-3 underline">
              Regístrate
            </a></a>
        </div>
      </div>
    </AuthLayout>
  )
}