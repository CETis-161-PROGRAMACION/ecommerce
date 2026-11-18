import { AuthLayout } from '@/components/layout/AuthLayout'
import kunderaLogo from "../../assets/images/kundera_logo.png";
import { Link } from 'react-router-dom'

export function BusinessInfoPage() {
  return (
    <AuthLayout title="" mainClassName="max-w-none">

      <div className="flex items-center px-1">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" height="40px" width="40px" fill="#000000">
          <path d="M5,30V27.22H35V30H5Zm0-8.61V18.61H35v2.78H5Zm0-8.61V10H35v2.78H5Z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" height="40px" width="40px" fill="#585858">
          <path d="M33,34.97L22.19,24.17q-1.25,1.06-2.9,1.65t-3.51,0.6q-4.51,0-7.65-3.13T5,15.69T8.13,8.1t7.62-3.13q4.46,0 7.58,3.13t3.12,7.59q0,1.81-0.58,3.46t-1.69,3.04L35,32.97l-2,2ZM15.75,23.64q3.29,0 5.6-2.33t2.31-5.62t-2.31-5.62t-5.6-2.33q-3.32,0-5.65,2.33T7.78,15.69t2.33,5.62t5.65,2.33Z"/>
        </svg>
    
        <input
      type="search"
      placeholder="Buscar"
      className="w-250 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
    />
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" height="40px" width="40px" fill="#585858"><path d="M15.43,18.15q-1.82-1.82-1.82-4.57t1.82-4.57T20,7.19t4.57,1.82t1.82,4.57t-1.82,4.57T20,19.97t-4.57-1.82ZM6.67,33.33V29.17q0-1.53 0.77-2.67t2.01-1.74q2.72-1.26 5.32-1.9T20,22.22t5.22,0.65t5.31,1.88q1.26,0.6 2.03,1.74t0.77,2.67v4.17H6.67Zm2.78-2.78H30.56V29.17q0-0.6-0.34-1.13t-0.85-0.79q-2.53-1.24-4.76-1.74T20,25t-4.63,0.51t-4.76,1.74q-0.51,0.26-0.84,0.79T9.44,29.17v1.39Zm13.13-14.4q1.03-1.03 1.03-2.58t-1.03-2.58T20,9.97t-2.58,1.03t-1.03,2.58t1.03,2.58T20,17.19t2.58-1.03ZM20,13.58Zm0,16.97Z"/></svg>
  </div>

      

  <section className="grid grid-cols-2 items-start gap-8 w-full px-4 mt-8">

        <div className="w-1/2">

          <div className="flex items-center gap-4">

            <img
              src={kunderaLogo}
              alt="Logo de Kundera"
              className="h-40 w-40 shrink-0 rounded-full object-cover"
            />

            <div>

              <h3 className="font-semibold text-base rounded-full border border-gray-300 px-16 py-2">
                KUNDERA
              </h3>

              <div className="ml-3 mt-2">

                <h1 className="font-bold text-lg px-10 py-1">
                  Ubicación
                </h1>

                <p className="text-sm font-semibold text-ink-muted">
                  Donato Guerra #63 Tala Jal.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="w-1/2 flex justify-around items-start">

          <div>

         <h1 className="font-bold text-green-500 text-lg ml-60">
            Abierto
          </h1>

             <div className="ml-19 mt-6 ">

            <h2 className="font-bold text-sm text-center">
              Horario
            </h2>

            <p className="text-sm text-center font-semibold text-ink-blac whitespace-nowrap">
              Lunes a Viernes de 8:00 am a 3:00 pm y 5:00 pm a 9:00 pm
            </p>

            <p className="text-sm text-center font-semibold text-ink-black">
              Sábado y Domingo de 8:00 am a 3:00 pm
            </p>
          </div>
         </div>
        </div>
      </section>

<div className="px-4">

  <p className="text-center text-sm font-semibold text-ink">
    Ubicación
  </p>

  <div className="flex justify-center">
    <iframe
      title="Mapa de Kundera"
      src="https://maps.google.com/maps?q=20.6518783,-103.7016811&z=17&output=embed"
      width="35%"
      height="190"
      loading="lazy"
      className="max-w-xl rounded-xl border-0"
    />
  </div>
</div>

<div className="flex justify-center p-4">
  <a
    href="https://www.google.com/maps/dir/?api=1&destination=20.6518783,-103.7016811"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:opacity-80"
  >
    ¿Cómo llegar?
  </a>
</div>

<div className="flex justify-center p-4">
  <Link
    to="/sucursal/menu"
    className="rounded-full bg-brand-100 px-80 py-4"
  >
    Ver menú
  </Link>
</div>

    </AuthLayout>
  )
}