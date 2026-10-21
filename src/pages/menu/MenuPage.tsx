import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { ROUTES } from '@/router/routes'
import kunderaLogo from '@/assets/images/kundera_logo.png'

export function MenuPage() {
  const navigate = useNavigate()

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center pb-20">
        {/* Cabecera de la sucursal: Logo, Nombre, Ubicación y Horarios */}
        <section
          aria-label="Información de sucursal Kundera"
          className="flex w-full flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-line/60"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Logo de Kundera */}
            <div className="h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-full shadow-md">
              <img
                src={kunderaLogo}
                alt="Logo de Kundera Libros y Café"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Nombre y dirección */}
            <div className="space-y-2">
              <div className="inline-block rounded-full border border-line bg-surface px-8 py-1.5 shadow-xs">
                <span className="text-base font-extrabold uppercase tracking-wide text-ink">
                  KUNDERA
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-ink">Ubicación</h2>
                <p className="text-sm font-medium text-ink-muted">
                  Donato Guerra #63 Tala Jal.
                </p>
              </div>
            </div>
          </div>

          {/* Estado de apertura y horarios */}
          <div className="text-center sm:text-right space-y-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-success block">
              Abierto
            </span>
            <p className="text-sm text-ink-muted leading-snug max-w-xs">
              Horario Lunes a Viernes de 8:00am a 3:00pm y 5:00pm a 9:00pm
            </p>
            <p className="text-sm text-ink-muted leading-snug">
              Sábado y Domingo de 8:00am a 3:00pm
            </p>
          </div>
        </section>

        {/* Sección Central: Ubicación con Mapa y ¿Cómo llegar? */}
        <section
          aria-label="Mapa de la sucursal"
          className="mt-8 flex w-full max-w-lg flex-col items-center gap-4 text-center"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
            Ubicación
          </h3>

          <div className="w-full">
            <MapSnippet label="Centro #62" heightClass="h-56 sm:h-64" />
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=20.6518783,-103.7016811"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-brand-100 px-8 py-2.5 text-sm font-bold text-navy-900 shadow-xs transition hover:bg-brand-200"
          >
            ¿Cómo llegar?
          </a>
        </section>

        {/* Botón inferior: Ver menú */}
        <div className="mt-12 w-full max-w-xl">
          <button
            type="button"
            onClick={() => navigate(ROUTES.home)}
            className="w-full cursor-pointer rounded-full bg-brand-100 py-4 text-center text-lg font-black text-navy-900 shadow-md transition hover:bg-brand-200 active:scale-98"
          >
            Ver menú
          </button>
        </div>
      </div>
    </NavBar>
  )
}
