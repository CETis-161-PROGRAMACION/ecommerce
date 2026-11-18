import { Link, useParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES, businessPath, productPath } from '@/router/routes'
import { useCatalog } from '@/services/catalog/useCatalog'
import { formatPrice } from '@/utils/currency'
import { isOpenAt } from '@/utils/schedule'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function MenuPage() {
  const { slug } = useParams()
  const catalogState = useCatalog()

  if (catalogState.status === 'loading') {
    return (
      <NavBar backTo={ROUTES.sucursales}>
        <p role="status" className="py-12 text-center text-sm text-ink-muted">
          Cargando menú…
        </p>
      </NavBar>
    )
  }

  const business =
    catalogState.status === 'ready'
      ? catalogState.catalog.businesses.find((item) => item.slug === slug)
      : undefined

  if (!business || catalogState.status !== 'ready') {
    return (
      <NavBar backTo={ROUTES.sucursales}>
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-ink">Menú no encontrado</h1>
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

  const products = catalogState.catalog.products.filter(
    (product) => product.business.id === business.id,
  )
  const branch = catalogState.catalog.branches.find(
    (item) => item.businessId === business.id,
  )
  const isOpen = branch?.schedule
    ? isOpenAt(branch.schedule.hours, new Date())
    : null

  return (
    <NavBar backTo={businessPath(business.slug)}>
      <h1 className="sr-only">Menú de {business.name}</h1>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
        <div className="flex items-center gap-6 md:sticky md:top-10">
          {business.logo && (
            <img
              src={business.logo}
              alt={`Logo de ${business.name}`}
              className="size-28 rounded-full object-cover sm:size-36"
            />
          )}
          <div className="flex flex-col items-center gap-2">
            <p className="rounded-full border border-line px-6 py-1.5 text-base font-bold text-ink">
              {business.name}
            </p>
            {isOpen !== null && (
              <p
                className={`text-sm font-semibold ${isOpen ? 'text-success' : 'text-red-600 dark:text-red-400'}`}
              >
                {isOpen ? 'Abierto' : 'Cerrado'}
              </p>
            )}
          </div>
        </div>

        <section
          aria-labelledby="menu-title"
          className="mx-auto flex w-full max-w-xl flex-col gap-3"
        >
          <h2 id="menu-title" className="text-sm font-semibold text-ink">
            Menú
          </h2>

          {products.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-3"
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="size-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{product.name}</p>
                    <p className="line-clamp-2 text-xs text-ink-muted">
                      {product.description}
                    </p>
                    <p className="mt-1 text-sm font-bold text-success">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <Link
                    to={
                      product.slug === 'principito'
                        ? ROUTES.productDetail
                        : productPath(product.slug)
                    }
                    aria-label={`Pedir ${product.name}`}
                    className={`shrink-0 rounded-lg bg-brand-100 px-3 py-1.5 text-xs font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
                  >
                    Pedir
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-line bg-surface p-6 text-center text-sm text-ink-muted">
              {business.name} todavía no tiene productos disponibles.
            </p>
          )}
        </section>
      </div>
    </NavBar>
  )
}
