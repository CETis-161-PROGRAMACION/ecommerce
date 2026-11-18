import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES } from '@/router/routes'
import kunderaLogo from '@/assets/images/kundera_logo.png'
import { hoursToMinutes, isOpenAt, type WeeklySchedule } from '@/utils/schedule'

const BUSINESS_NAME = 'KUNDERA'
const BUSINESS_ADDRESS = 'Donato Guerra #63 Tala Jal.'
const MAP_URL =
  'https://maps.google.com/maps?q=20.6518783,-103.7016811&z=17&output=embed'
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=20.6518783,-103.7016811'

const WEEKDAY_HOURS = [
  { open: hoursToMinutes(8), close: hoursToMinutes(15) },
  { open: hoursToMinutes(17), close: hoursToMinutes(21) },
]
const WEEKEND_HOURS = [{ open: hoursToMinutes(8), close: hoursToMinutes(15) }]

const SCHEDULE: WeeklySchedule = {
  0: WEEKEND_HOURS,
  1: WEEKDAY_HOURS,
  2: WEEKDAY_HOURS,
  3: WEEKDAY_HOURS,
  4: WEEKDAY_HOURS,
  5: WEEKDAY_HOURS,
  6: WEEKEND_HOURS,
}

const SCHEDULE_LINES = [
  'Lunes a Viernes de 8:00 am a 3:00 pm y 5:00 pm a 9:00 pm',
  'Sábado y Domingo de 8:00 am a 3:00 pm',
]

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function BusinessInfoPage() {
  const isOpen = isOpenAt(SCHEDULE, new Date())

  return (
    <NavBar>
      <h1 className="sr-only">Información de {BUSINESS_NAME}</h1>

      <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <img
            src={kunderaLogo}
            alt={`Logo de ${BUSINESS_NAME}`}
            className="size-32 shrink-0 rounded-full object-cover sm:size-40"
          />
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <p className="rounded-full border border-line px-12 py-2 text-base font-semibold text-ink">
              {BUSINESS_NAME}
            </p>
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-ink">Ubicación</h2>
              <p className="text-sm font-semibold text-ink-muted">
                {BUSINESS_ADDRESS}
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
            {SCHEDULE_LINES.map((line) => (
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
          title={`Mapa de ${BUSINESS_NAME}`}
          src={MAP_URL}
          loading="lazy"
          className="h-52 w-full rounded-xl border border-line"
        />
        <a
          href={DIRECTIONS_URL}
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
