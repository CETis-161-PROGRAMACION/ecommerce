import NavBar from '@/components/navbar/NavBar'
import { useCatalog } from '@/services/catalog/useCatalog'

export function AboutPage() {
  const catalogState = useCatalog()
  const businesses =
    catalogState.status === 'ready' ? catalogState.catalog.businesses : []

  return (
    <NavBar mainClassName="max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-ink">Acerca de</h1>
      <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-ink-muted">
        Web E-commerce
      </p>

      <div className="space-y-4 text-sm leading-relaxed text-ink">
        <p>
          Web E-commerce es un proyecto del CETis 161, desarrollado por
          estudiantes de programación. Conecta a los comercios locales de Tala,
          Jalisco con sus clientes: puedes pedir a domicilio o recoger tu pedido
          en la sucursal.
        </p>
        <p>
          Los repartidores se registran desde la misma aplicación, aceptan los
          pedidos disponibles y los entregan; tú puedes seguir cada paso y
          escribirles por el chat del pedido.
        </p>
      </div>

      <section aria-labelledby="businesses-title" className="mt-8">
        <h2 id="businesses-title" className="mb-3 text-lg font-bold text-ink">
          Negocios participantes
        </h2>
        {catalogState.status === 'loading' ? (
          <p role="status" className="text-sm text-ink-muted">
            Cargando…
          </p>
        ) : catalogState.status === 'error' ? (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {catalogState.message}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {businesses.map((business) => (
              <li
                key={business.id}
                className="rounded-xl border border-line bg-surface px-4 py-3"
              >
                <p className="text-sm font-bold text-ink">{business.name}</p>
                {business.category && (
                  <p className="text-xs text-ink-muted">{business.category}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </NavBar>
  )
}
