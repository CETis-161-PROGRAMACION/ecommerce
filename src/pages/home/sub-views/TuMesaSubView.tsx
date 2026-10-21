import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import burgerImg from '@/assets/images/burger.jpg'
import ensaladaImg from '@/assets/images/ensalada-kahlo.jpg'

export function TuMesaSubView() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'comidas', name: 'Hamburguesas & Grill', image: burgerImg },
    { id: 'ensaladas', name: 'Ensaladas Frescas', image: ensaladaImg },
  ]

  return (
    <div className="w-full space-y-8 motion-safe:animate-fade-in">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                setSelectedCategory((prev) => (prev === cat.id ? 'all' : cat.id))
              }
              className={`group flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 ${
                isSelected ? 'ring-2 ring-brand-400 ring-offset-2 rounded-2xl' : ''
              }`}
            >
              <div className="flex h-16 w-36 items-center justify-center overflow-hidden rounded-2xl bg-warm-pill border border-warm-border/60 p-2 shadow-xs transition-colors group-hover:bg-warm-border/50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-auto object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-base font-bold text-ink">{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Burger */}
        <div className="flex flex-col justify-between rounded-3xl border border-warm-border bg-warm-card p-5 shadow-xs transition hover:shadow-md">
          <div className="flex h-56 w-full items-center justify-center p-2">
            <img
              src={burgerImg}
              alt="Hamburguesa Tu Mesa"
              className="h-full w-auto max-w-[210px] rounded-2xl object-cover drop-shadow-xs transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="mt-4 flex items-end justify-between gap-2 border-t border-warm-border/50 pt-3">
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-tight text-ink">
                BURGER CLÁSICA
              </h3>
              <p className="text-xs font-bold uppercase text-ink-muted">
                TU MESA
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(ROUTES.orderInfo)}
              className="cursor-pointer rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold text-navy-900 shadow-xs transition-all hover:bg-brand-200 active:scale-95"
            >
              Pedir Ahora
            </button>
          </div>
        </div>

        {/* Card 2: Ensalada */}
        <div className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-5 shadow-xs transition hover:shadow-md">
          <div className="flex h-56 w-full items-center justify-center p-2">
            <img
              src={ensaladaImg}
              alt="Ensalada Gourmet"
              className="h-full w-auto max-w-[200px] rounded-full object-cover shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="mt-4 flex items-end justify-between gap-2 border-t border-line/60 pt-3">
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-tight text-ink">
                ENSALADA CHEF
              </h3>
              <p className="text-xs font-bold uppercase text-ink-muted">
                TU MESA
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(ROUTES.orderInfo)}
              className="cursor-pointer rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold text-navy-900 shadow-xs transition-all hover:bg-brand-200 active:scale-95"
            >
              Pedir Ahora
            </button>
          </div>
        </div>

        {/* Card 3: Placeholder */}
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-line bg-surface/60 p-6 text-center">
          <span className="text-sm font-medium text-ink-muted">
            Producto Recomendado
          </span>
        </div>

        {/* Card 4: Placeholder */}
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-line bg-surface/60 p-6 text-center">
          <span className="text-sm font-medium text-ink-muted">
            Producto Recomendado
          </span>
        </div>
      </div>
    </div>
  )
}
