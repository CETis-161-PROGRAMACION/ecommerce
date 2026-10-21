import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { StoreCatalog } from '@/components/catalog/StoreCatalog'
import { PillFilter } from '@/components/ui/PillFilter'
import { KunderaSubView } from './sub-views/KunderaSubView'
import { CuatroCafeSubView } from './sub-views/CuatroCafeSubView'
import { TuMesaSubView } from './sub-views/TuMesaSubView'

type StoreId = 'kundera' | 'cuatro-cafe' | 'tu-mesa'

const stores: { id: StoreId; name: string }[] = [
  { id: 'kundera', name: 'KUNDERA' },
  { id: 'cuatro-cafe', name: 'CUATRO CAFÉ' },
  { id: 'tu-mesa', name: 'TU MESA' },
]

export function HomePage() {
  const [searchParams] = useSearchParams()
  const busqueda = searchParams.get('q') ?? ''
  const sucursalParam = searchParams.get('sucursal')
  const [activeStore, setActiveStore] = useState<StoreId>('kundera')

  const storeActiva =
    stores.find((store) => store.id === sucursalParam)?.id ?? activeStore
  const nombreSucursal = stores.find((store) => store.id === storeActiva)?.name

  return (
    <NavBar>
      <div className="w-full space-y-6 pb-12">
        <div
          role="region"
          aria-label="Banner promocional"
          className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-3xl bg-banner-dark p-6 text-center shadow-md sm:h-56"
        >
          <div className="space-y-2">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-100 backdrop-blur-xs">
              Promociones del día
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Descubre los mejores sabores locales
            </h1>
            <p className="text-sm text-neutral-soft">
              Café de especialidad, postres artesanales y comidas recién
              preparadas.
            </p>
          </div>
        </div>

        {busqueda ? (
          <section aria-label="Resultados de la búsqueda">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black tracking-tight text-ink sm:text-2xl">
                Resultados para “{busqueda}”
              </h2>
            </div>

            <StoreCatalog storeId="all" busqueda={busqueda} />
          </section>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:gap-6">
              {stores.map((store) => (
                <PillFilter
                  key={store.id}
                  active={storeActiva === store.id}
                  onClick={() => setActiveStore(store.id)}
                >
                  {store.name}
                </PillFilter>
              ))}
            </div>

            <section aria-label={`Catálogo de productos de ${nombreSucursal}`}>
              {storeActiva === 'kundera' && <KunderaSubView />}
              {storeActiva === 'cuatro-cafe' && <CuatroCafeSubView />}
              {storeActiva === 'tu-mesa' && <TuMesaSubView />}
            </section>
          </>
        )}
      </div>
    </NavBar>
  )
}
