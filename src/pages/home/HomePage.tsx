import { useState } from 'react'
import NavBar from '@/components/navbar/NavBar'
import { KunderaSubView } from './sub-views/KunderaSubView'
import { CuatroCafeSubView } from './sub-views/CuatroCafeSubView'
import { TuMesaSubView } from './sub-views/TuMesaSubView'

type StoreId = 'kundera' | 'cuatro-cafe' | 'tu-mesa'

export function HomePage() {
  const [activeStore, setActiveStore] = useState<StoreId>('kundera')

  const stores: { id: StoreId; name: string }[] = [
    { id: 'kundera', name: 'KUNDERA' },
    { id: 'cuatro-cafe', name: 'CUATRO CAFÉ' },
    { id: 'tu-mesa', name: 'TU MESA' },
  ]

  return (
    <NavBar>
      <div className="w-full space-y-6 pb-12">
        {/* Banner principal (matching mockup dark rounded banner) */}
        <div
          role="region"
          aria-label="Banner promocional"
          className="relative h-44 w-full overflow-hidden rounded-3xl bg-banner-dark shadow-md sm:h-56 flex items-center justify-center p-6 text-center"
        >
          <div className="space-y-2">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wider text-brand-100 uppercase backdrop-blur-xs">
              Promociones del día
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Descubre los mejores sabores locales
            </h2>
            <p className="text-sm text-gray-300">
              Café de especialidad, postres artesanales y comidas recién preparadas.
            </p>
          </div>
        </div>

        {/* Store Selector Pills (KUNDERA, CUATRO CAFÉ, TU MESA) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
          {stores.map((store) => {
            const isActive = activeStore === store.id
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setActiveStore(store.id)}
                className={`cursor-pointer rounded-full px-8 py-3 text-base sm:text-lg font-black tracking-wide uppercase transition-all duration-200 shadow-xs focus-visible:outline-2 focus-visible:outline-brand-400 ${
                  isActive
                    ? 'border-2 border-brand-400 bg-brand-100/50 text-navy-900 shadow-sm scale-105'
                    : 'border border-line bg-surface text-ink hover:border-brand-400 hover:text-navy-900'
                }`}
              >
                {store.name}
              </button>
            )
          })}
        </div>

        {/* Dynamic Composable Sub-view */}
        <section aria-label={`Catálogo de productos de ${stores.find((s) => s.id === activeStore)?.name}`}>
          {activeStore === 'kundera' && <KunderaSubView />}
          {activeStore === 'cuatro-cafe' && <CuatroCafeSubView />}
          {activeStore === 'tu-mesa' && <TuMesaSubView />}
        </section>
      </div>
    </NavBar>
  )
}
