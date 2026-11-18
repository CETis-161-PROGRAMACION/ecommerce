import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { businessPath } from '@/router/routes'
import { useCatalog } from '@/services/catalog/useCatalog'
import { branchDirectionsUrl, branchMapUrl } from '@/utils/maps'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

// Las sucursales sin calle (solo "Tala, Jalisco") no se muestran hasta tener su dirección.
const MISSING_STREET = /^tala, jalisco\.?$/i

export function SucursalesPage() {
  const catalogState = useCatalog()

  const branches =
    catalogState.status === 'ready'
      ? catalogState.catalog.branches.filter(
          (branch) => !MISSING_STREET.test(branch.address.trim()),
        )
      : []

  function businessOf(businessId: string) {
    return catalogState.status === 'ready'
      ? catalogState.catalog.businesses.find((item) => item.id === businessId)
      : undefined
  }

  return (
    <NavBar>
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-ink">Sucursales</h1>
          <p className="text-sm text-ink-muted">
            Encuentra nuestros establecimientos en Tala, Jalisco.
          </p>
        </header>

        {catalogState.status === 'loading' && (
          <p role="status" className="text-sm text-ink-muted">
            Cargando sucursales…
          </p>
        )}
        {catalogState.status === 'error' && (
          <p role="alert" className="text-sm text-red-700 dark:text-red-400">
            {catalogState.message}
          </p>
        )}

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {branches.map((branch) => {
            const business = businessOf(branch.businessId)
            return (
              <article
                key={branch.id}
                className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
              >
                <div className="space-y-2 p-4">
                  <h2 className="text-xl font-bold text-ink">
                    {business?.name ?? branch.name}
                  </h2>
                  <p className="text-sm text-ink-muted">{branch.address}</p>
                </div>

                <div className="px-4">
                  <p className="mb-2 text-sm font-semibold text-ink">
                    Ubicación
                  </p>
                  <iframe
                    title={`Mapa de ${branch.name}`}
                    src={branchMapUrl(branch)}
                    width="100%"
                    height="190"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block rounded-xl border-0"
                  />
                </div>

                <div className="flex flex-wrap justify-end gap-3 p-4">
                  {business && (
                    <Link
                      to={businessPath(business.slug)}
                      className={`rounded-lg border border-line px-5 py-2 text-sm font-semibold text-ink transition hover:bg-brand-100 ${focusRing}`}
                    >
                      Ver negocio
                    </Link>
                  )}
                  <a
                    href={branchDirectionsUrl(branch)}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-lg bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:opacity-80 ${focusRing}`}
                  >
                    ¿Cómo llegar?
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </NavBar>
  )
}
