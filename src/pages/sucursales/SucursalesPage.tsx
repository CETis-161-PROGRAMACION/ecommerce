import { Link } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { stores } from '@/data/stores'
import { ROUTES } from '@/router/routes'

export function SucursalesPage() {
  return (
    <NavBar>
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-ink">Sucursales</h1>
          <p className="text-sm text-ink-muted">
            Encuentra nuestros establecimientos en Tala, Jalisco.
          </p>
        </header>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {stores.map((sucursal) => (
            <article
              key={sucursal.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-xs"
            >
              <div className="space-y-2 p-4">
                <h2 className="text-xl font-bold text-ink">
                  {sucursal.nombre}
                </h2>
                <p className="text-sm text-ink-muted">{sucursal.direccion}</p>
                <p className="text-xs text-ink-muted">{sucursal.horario}</p>
              </div>

              <div className="px-4">
                <p className="mb-2 text-sm font-semibold text-ink">Ubicación</p>
                <iframe
                  title={`Mapa de ${sucursal.nombre}`}
                  src={sucursal.mapa}
                  width="100%"
                  height="190"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block rounded-xl border-0"
                />
              </div>

              <div className="mt-auto flex flex-wrap justify-end gap-3 p-4">
                <Link
                  to={`${ROUTES.menu}?sucursal=${sucursal.id}`}
                  className="rounded-lg bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Ver menú
                </Link>

                <a
                  href={sucursal.indicaciones}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-line bg-surface px-5 py-2 text-sm font-semibold text-ink transition hover:bg-brand-100/40 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  ¿Cómo llegar?
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </NavBar>
  )
}
