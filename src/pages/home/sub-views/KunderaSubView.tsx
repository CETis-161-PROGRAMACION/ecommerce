import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import principitoImg from '@/assets/images/principito.png'
import ensaladaImg from '@/assets/images/ensalada-kahlo.jpg'
import croissantImg from '@/assets/images/croissant.jpg'
import burgerImg from '@/assets/images/burger.jpg'

export function KunderaSubView() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'cafe', name: 'Café', image: principitoImg },
    { id: 'postres', name: 'Postres', image: croissantImg },
    { id: 'comidas', name: 'Comidas', image: burgerImg },
  ]

  return (
    <div className="w-full space-y-8 motion-safe:animate-fade-in">
      {/* Category Pills matching mockup */}
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
              <div className="flex h-16 w-32 sm:h-18 sm:w-36 items-center justify-center overflow-hidden rounded-2xl bg-warm-pill border border-warm-border/60 p-2 shadow-xs transition-colors group-hover:bg-warm-border/50">
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
        {/* Card 1: Principito (Warm beige background card) */}
        <div className="flex flex-col justify-between rounded-3xl border border-warm-border bg-warm-card p-5 shadow-xs transition hover:shadow-md">
          <div className="flex h-56 w-full items-center justify-center p-2">
            <img
              src={principitoImg}
              alt="Principito Kundera"
              className="h-full w-auto object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="mt-4 flex items-end justify-between gap-2 border-t border-warm-border/50 pt-3">
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-tight text-ink">
                PRINCIPITO
              </h3>
              <p className="text-xs font-bold uppercase text-ink-muted">
                KUNDERA
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(ROUTES.productDetail)}
              className="cursor-pointer rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold text-navy-900 shadow-xs transition-all hover:bg-brand-200 active:scale-95"
            >
              Pedir Ahora
            </button>
          </div>
        </div>

        {/* Card 2: Ensalada C. Kahlo */}
        <div className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-5 shadow-xs transition hover:shadow-md">
          <div className="flex h-56 w-full items-center justify-center p-2">
            <img
              src={ensaladaImg}
              alt="Ensalada C. Kahlo"
              className="h-full w-auto max-w-[200px] rounded-full object-cover shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="mt-4 flex items-end justify-between gap-2 border-t border-line/60 pt-3">
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-tight text-ink">
                ENSALADA C.
              </h3>
              <p className="text-xs font-bold uppercase text-ink-muted">
                KAHLO
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

        {/* Card 3: Producto Recomendado */}
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-line bg-surface/60 p-6 text-center transition hover:border-brand-400">
          <span className="text-sm font-medium text-ink-muted">
            Producto Recomendado
          </span>
        </div>

        {/* Card 4: Producto Recomendado */}
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-line bg-surface/60 p-6 text-center transition hover:border-brand-400">
          <span className="text-sm font-medium text-ink-muted">
            Producto Recomendado
          </span>
        </div>

        {/* Row 2: Secondary placeholder cards matching mockup */}
        <div className="h-44 rounded-3xl border border-line/70 bg-surface/40 transition hover:border-brand-200" />
        <div className="h-44 rounded-3xl border border-line/70 bg-surface/40 transition hover:border-brand-200" />
        <div className="h-44 rounded-3xl border border-line/70 bg-surface/40 transition hover:border-brand-200" />
        <div className="h-44 rounded-3xl border border-line/70 bg-surface/40 transition hover:border-brand-200" />
      </div>
    </div>
  )
}
