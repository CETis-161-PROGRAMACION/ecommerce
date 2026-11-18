import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { ROUTES } from '@/router/routes'

export function PrivacyPage() {
  const navigate = useNavigate()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)

  return (
    <AuthLayout title="" backTo={ROUTES.login}>
      <header className="mb-8 flex items-center gap-6 sm:gap-8">
        <Logo className="h-28 w-28 shrink-0 sm:h-32 sm:w-32" />

        <div>
          <h1 className="text-xl font-bold uppercase text-brand-400 sm:text-3xl">
            Política de privacidad
          </h1>
          <p className="mt-2 text-xs uppercase text-ink-muted sm:text-sm">
            Web E-commerce
          </p>
        </div>
      </header>

      <section className="flex flex-col items-center">
        <div className="w-full rounded-[30px] border-[10px] border-line p-5 sm:p-7">
          <div className="h-72 overflow-y-auto text-justify text-xs leading-relaxed text-ink-muted">
            <h2 className="mb-3 font-semibold text-ink">
              Política de privacidad
            </h2>
            <p>
              Esta política describe qué datos usa Web E-commerce y para qué. Es
              un proyecto escolar del CETis 161.
            </p>

            <h3 className="mt-4 font-semibold text-ink">Datos que recibimos</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Cuenta: nombre, correo electrónico, fecha de nacimiento y
                teléfono.
              </li>
              <li>
                Pedidos: productos, forma de pago elegida, direcciones de
                entrega, nombre y teléfono de quien recibe, notas y mensajes del
                chat con el repartidor.
              </li>
              <li>
                Repartidores: tipo de vehículo y foto de la licencia de conducir.
                La foto se guarda en un espacio privado al que solo accede su
                dueño.
              </li>
            </ul>

            <h3 className="mt-4 font-semibold text-ink">Para qué los usamos</h3>
            <p className="mt-1">
              Para crear tu cuenta, procesar y entregar tus pedidos y permitir la
              comunicación entre cliente y repartidor. Los repartidores
              aprobados ven el nombre, el teléfono y la dirección de quien
              recibe en los pedidos disponibles y en los que aceptan.
            </p>

            <h3 className="mt-4 font-semibold text-ink">Pagos</h3>
            <p className="mt-1">
              El pago es en efectivo o con tarjeta contra entrega. La aplicación
              no solicita ni guarda datos de tarjetas.
            </p>

            <h3 className="mt-4 font-semibold text-ink">Dónde se guardan</h3>
            <p className="mt-1">
              Los datos se almacenan en Supabase, un servicio de base de datos en
              la nube, protegido con reglas de acceso por usuario.
            </p>

            <p className="mt-4">
              Este texto resume el funcionamiento actual de la aplicación; el
              documento legal definitivo debe ser aprobado por el equipo
              responsable del proyecto.
            </p>
          </div>
        </div>

        <div className="my-5 flex w-full max-w-sm flex-col gap-3 px-2 text-xs text-ink-muted">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-0.5 accent-brand-400"
            />
            <span>Aceptar términos y condiciones de uso.</span>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(event) => setAcceptedPrivacy(event.target.checked)}
              className="mt-0.5 accent-brand-400"
            />
            <span>Aceptar política de privacidad.</span>
          </label>
        </div>

        <Button
          type="button"
          disabled={!acceptedTerms || !acceptedPrivacy}
          className="w-full max-w-[272px] bg-brand-100 text-ink hover:bg-brand-200"
          onClick={() => navigate(ROUTES.register)}
        >
          Siguiente
        </Button>
      </section>
    </AuthLayout>
  )
}
