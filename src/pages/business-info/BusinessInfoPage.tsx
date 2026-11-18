import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES } from '@/router/routes'
import kunderaLogo from '@/assets/images/kundera_logo.png'
import { KUNDERA } from '@/services/business/kundera'
import { isOpenAt } from '@/utils/schedule'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function BusinessInfoPage() {
  const isOpen = isOpenAt(KUNDERA.schedule, new Date())

  return (
    <NavBar>
      <h1 className="sr-only">Información de {KUNDERA.name}</h1>

      <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <img
            src={kunderaLogo}
            alt={`Logo de ${KUNDERA.name}`}
            className="size-32 shrink-0 rounded-full object-cover sm:size-40"
          />
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <p className="rounded-full border border-line px-12 py-2 text-base font-semibold text-ink">
              {KUNDERA.name}
            </p>
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-ink">Ubicación</h2>
              <p className="text-sm font-semibold text-ink-muted">
                {KUNDERA.address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p
            className={`text-lg font-bold ${isOpen ? 'text-success' : 'text-red-600'}`}
          >
            {isOpen ? 'Abierto' : 'Cerrado'}
          </p>
          <div>
            <h2 className="text-sm font-bold text-ink">Horario</h2>
            {KUNDERA.scheduleLines.map((line) => (
              <p key={line} className="text-sm font-semibold text-ink">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="business-map-title"
        className="mx-auto mt-10 flex w-full max-w-xl flex-col items-center gap-4"
      >
        <h2 id="business-map-title" className="text-sm font-semibold text-ink">
          Ubicación
        </h2>
        <iframe
          title={`Mapa de ${KUNDERA.name}`}
          src={KUNDERA.mapUrl}
          loading="lazy"
          className="h-52 w-full rounded-xl border border-line"
        />
        <a
          href={KUNDERA.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-lg bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-200 motion-reduce:transition-none ${focusRing}`}
        >
          ¿Cómo llegar?
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </section>

      <div className="mt-8 flex justify-center">
        <Link
          to={ROUTES.menu}
          className={`w-full max-w-2xl rounded-full bg-brand-100 py-4 text-center font-semibold text-navy-900 transition-colors hover:bg-brand-200 motion-reduce:transition-none ${focusRing}`}
        >
          Ver menú
        </Link>
      </div>
    </NavBar>
  )
}
