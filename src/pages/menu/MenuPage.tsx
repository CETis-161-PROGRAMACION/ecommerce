import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { MapSnippet } from '@/components/ui/MapSnippet'
import { StoreIcon } from '@/components/ui/StoreIcon'
import { findStore } from '@/data/stores'
import { ROUTES } from '@/router/routes'
import kunderaLogo from '@/assets/images/kundera_logo.png'

export function MenuPage() {
  const [searchParams] = useSearchParams()
  const sucursalId = searchParams.get('sucursal') ?? 'kundera'

  const sucursal = useMemo(() => findStore(sucursalId), [sucursalId])
  const esKundera = sucursalId === 'kundera'

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center pb-20">
        {/* Cabecera de la sucursal: logo, nombre, ubicación y horarios */}
        <section
          aria-label={`Información de la sucursal ${sucursal?.nombre ?? ''}`}
          className="flex w-full flex-col items-center justify-between gap-6 border-b border-line/60 pb-8 sm:flex-row"
        >
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-warm-pill shadow-md sm:h-36 sm:w-36">
              {esKundera ? (
                <img
                  src={kunderaLogo}
                  alt="Logo de Kundera Libros y Café"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-brand-400">
                  <StoreIcon size={56} />
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="inline-block rounded-full border border-line bg-surface px-8 py-1.5 text-base font-extrabold uppercase tracking-wide text-ink shadow-xs">
                {sucursal?.nombre ?? 'Sucursal'}
              </h1>

              <div>
                <h2 className="text-base font-bold text-ink">Ubicación</h2>
                <p className="text-sm font-medium text-ink-muted">
                  {sucursal?.direccion ?? 'Dirección no disponible'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-right">
            <span className="block text-2xl font-extrabold text-success sm:text-3xl">
              Abierto
            </span>
            <p className="max-w-xs text-sm leading-snug text-ink-muted">
              {sucursal?.horario ?? 'Horario no disponible'}
            </p>
          </div>
        </section>

        {/* Sección central: ubicación con mapa y cómo llegar */}
        <section
          aria-label="Mapa de la sucursal"
          className="mt-8 flex w-full max-w-lg flex-col items-center gap-4 text-center"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
            Ubicación
          </h3>

          <div className="w-full">
            <MapSnippet
              label={sucursal?.direccion ?? ''}
              heightClass="h-56 sm:h-64"
            />
          </div>

          {sucursal ? (
            <a
              href={sucursal.indicaciones}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-100 px-8 py-2.5 text-sm font-bold text-navy-900 shadow-xs transition hover:bg-brand-200"
            >
              ¿Cómo llegar?
            </a>
          ) : null}
        </section>

        {/* Botón inferior: ver el catálogo de la sucursal */}
        <div className="mt-12 w-full max-w-xl">
          <Link
            to={`${ROUTES.home}?sucursal=${sucursalId}`}
            className="block w-full cursor-pointer rounded-full bg-brand-100 py-4 text-center text-lg font-black text-navy-900 shadow-md transition hover:bg-brand-200 active:scale-98"
          >
            Ver menú
          </Link>
        </div>

        <div className="mt-6 w-full max-w-xl">
          <Link
            to={ROUTES.sucursales}
            className="block w-full rounded-full border border-line bg-surface py-3 text-center text-sm font-bold text-ink transition hover:bg-brand-100/40"
          >
            Ver todas las sucursales
          </Link>
        </div>
      </div>
    </NavBar>
  )
}
