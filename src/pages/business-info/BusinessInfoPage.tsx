import { Link, useParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES, menuPath } from '@/router/routes'
import { useCatalog } from '@/services/catalog/useCatalog'
import { branchDirectionsUrl, branchMapUrl } from '@/utils/maps'
import { isOpenAt } from '@/utils/schedule'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function BusinessInfoPage() {
  const { slug } = useParams()
  const catalogState = useCatalog()

  if (catalogState.status === 'loading') {
    return (
      <NavBar>
        <p role="status" className="py-12 text-center text-sm text-ink-muted">
          Cargando negocio…
        </p>
      </NavBar>
    )
  }

  const business =
    catalogState.status === 'ready'
      ? catalogState.catalog.businesses.find((item) => item.slug === slug)
      : undefined
  const branch =
    catalogState.status === 'ready' && business
      ? catalogState.catalog.branches.find(
          (item) => item.businessId === business.id,
        )
      : undefined

  if (!business || !branch) {
    return (
      <NavBar>
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-ink">Negocio no encontrado</h1>
          <Link
            to={ROUTES.sucursales}
            className={`rounded-full bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
          >
            Ver sucursales
          </Link>
        </div>
      </NavBar>
    )
  }

  const isOpen = branch.schedule
    ? isOpenAt(branch.schedule.hours, new Date())
    : null

  return (
    <NavBar>
      <h1 className="sr-only">Información de {business.name}</h1>

      <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {business.logo && (
            <img
              src={business.logo}
              alt={`Logo de ${business.name}`}
              className="size-32 shrink-0 rounded-full object-cover sm:size-40"
            />
          )}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <p className="rounded-full border border-line px-12 py-2 text-base font-semibold text-ink">
              {business.name}
            </p>
            {business.description && (
              <p className="text-center text-sm text-ink-muted sm:text-left">
                {business.description}
              </p>
            )}
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-ink">Ubicación</h2>
              <p className="text-sm font-semibold text-ink-muted">
                {branch.address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          {isOpen !== null && (
            <p
              className={`text-lg font-bold ${isOpen ? 'text-success' : 'text-red-600 dark:text-red-400'}`}
            >
              {isOpen ? 'Abierto' : 'Cerrado'}
            </p>
          )}
          <div>
            <h2 className="text-sm font-bold text-ink">Horario</h2>
            {branch.schedule && branch.schedule.lines.length > 0 ? (
              branch.schedule.lines.map((line) => (
                <p key={line} className="text-sm font-semibold text-ink">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-sm text-ink-muted">Horario por confirmar.</p>
            )}
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
          title={`Mapa de ${business.name}`}
          src={branchMapUrl(branch)}
          loading="lazy"
          className="h-52 w-full rounded-xl border border-line"
        />
        <a
          href={branchDirectionsUrl(branch)}
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
          to={menuPath(business.slug)}
          className={`w-full max-w-2xl rounded-full bg-brand-100 py-4 text-center font-semibold text-navy-900 transition-colors hover:bg-brand-200 motion-reduce:transition-none ${focusRing}`}
        >
          Ver menú
        </Link>
      </div>
    </NavBar>
  )
}
