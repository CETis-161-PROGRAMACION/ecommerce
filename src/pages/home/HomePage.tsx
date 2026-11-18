import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Croissant, Utensils, type LucideIcon } from 'lucide-react'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES } from '@/router/routes'
import cafeTostadoLogo from '@/assets/images/cft.png'
import santoriLogo from '@/assets/images/san.png'
import donaMaryLogo from '@/assets/images/dnm.png'
import kunderaLogo from '@/assets/images/kundera_logo.png'
import principitoImage from '@/assets/images/principito.png'

interface Slide {
  name: string
  image: string
}

interface Category {
  name: string
  Icon: LucideIcon
}

interface Product {
  id: string
  name: string
  business: string
  category: string
  image: string
  to: string
}

const SLIDES: readonly Slide[] = [
  { name: 'Café Tostado', image: cafeTostadoLogo },
  { name: 'Kundera', image: kunderaLogo },
  { name: 'Santori', image: santoriLogo },
  { name: 'Doña Mary', image: donaMaryLogo },
]

const BUSINESSES = ['KUNDERA', 'CUATRO CAFÉ', 'TU MESA'] as const

const CATEGORIES: readonly Category[] = [
  { name: 'Café', Icon: Coffee },
  { name: 'Postres', Icon: Croissant },
  { name: 'Comidas', Icon: Utensils },
]

const PRODUCTS: readonly Product[] = [
  {
    id: 'principito',
    name: 'Principito',
    business: 'KUNDERA',
    category: 'Café',
    image: principitoImage,
    to: ROUTES.productDetail,
  },
]

const RECOMMENDED_PLACEHOLDERS = 3

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [business, setBusiness] = useState('')
  const [category, setCategory] = useState('')

  const slide = SLIDES[slideIndex]
  const visibleProducts = PRODUCTS.filter(
    (product) =>
      (!business || product.business === business) &&
      (!category || product.category === category),
  )
  const hasFilters = Boolean(business || category)

  function showPrevious() {
    setSlideIndex((index) => (index === 0 ? SLIDES.length - 1 : index - 1))
  }

  function showNext() {
    setSlideIndex((index) => (index === SLIDES.length - 1 ? 0 : index + 1))
  }

  return (
    <NavBar>
      <h1 className="sr-only">Inicio</h1>

      <section
        aria-roledescription="carrusel"
        aria-label="Establecimientos destacados"
        className="relative overflow-hidden rounded-2xl border border-line bg-surface"
      >
        <div
          aria-live="polite"
          className="flex h-48 items-center justify-center px-12 pt-6 pb-10 sm:h-72"
        >
          <img
            src={slide.image}
            alt={slide.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Anterior"
          className={`absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 text-ink hover:bg-brand-100 sm:left-4 ${focusRing}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-12 w-6"
          >
            <path d="M20 4 4 24l16 20" />
          </svg>
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Siguiente"
          className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-ink hover:bg-brand-100 sm:right-4 ${focusRing}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-12 w-6"
          >
            <path d="m4 4 16 20L4 44" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Ver ${item.name}`}
              aria-current={index === slideIndex}
              onClick={() => setSlideIndex(index)}
              className={`size-2.5 rounded-full ${
                index === slideIndex ? 'bg-navy-900' : 'bg-line'
              } ${focusRing}`}
            />
          ))}
        </div>
      </section>

      <div
        role="group"
        aria-label="Filtrar por establecimiento"
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {BUSINESSES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={business === item}
            onClick={() => setBusiness(business === item ? '' : item)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors motion-reduce:transition-none ${
              business === item
                ? 'border-brand-400 bg-brand-100 text-navy-900'
                : 'border-line bg-surface text-ink hover:border-brand-200'
            } ${focusRing}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="mt-6 grid grid-cols-3 gap-4"
      >
        {CATEGORIES.map(({ name, Icon }) => (
          <button
            key={name}
            type="button"
            aria-pressed={category === name}
            onClick={() => setCategory(category === name ? '' : name)}
            className={`flex flex-col items-center gap-2 rounded-xl p-2 transition-colors motion-reduce:transition-none ${
              category === name ? 'bg-brand-100 text-navy-900' : 'text-ink'
            } ${focusRing}`}
          >
            <span className="flex h-12 w-full items-center justify-center rounded-xl bg-amber-50">
              <Icon aria-hidden="true" size={28} />
            </span>
            <span className="text-sm font-semibold">{name}</span>
          </button>
        ))}
      </div>

      <section aria-labelledby="products-title" className="mt-8">
        <h2 id="products-title" className="mb-4 text-xl font-bold text-ink">
          Productos
        </h2>

        {visibleProducts.length > 0 || !hasFilters ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <li
                key={product.id}
                className="flex flex-col rounded-2xl border-2 border-line bg-amber-50 p-3"
              >
                <img
                  src={product.image}
                  alt={`${product.name} de ${product.business}`}
                  className="h-32 w-full rounded-xl object-contain sm:h-40"
                />
                <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink uppercase">
                      {product.name}
                    </p>
                    <p className="text-xs text-ink-muted">{product.business}</p>
                  </div>
                  <Link
                    to={product.to}
                    className={`shrink-0 rounded-lg bg-brand-100 px-2 py-1.5 text-xs font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
                  >
                    Pedir ahora
                  </Link>
                </div>
              </li>
            ))}

            {!hasFilters &&
              Array.from({ length: RECOMMENDED_PLACEHOLDERS }, (_, index) => (
                <li
                  key={`recommended-${index}`}
                  className="flex min-h-52 items-center justify-center rounded-2xl border-2 border-line bg-surface p-4 text-center text-xs text-ink-muted"
                >
                  Producto recomendado
                </li>
              ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-line p-8 text-center text-sm text-ink-muted">
            No hay productos con estos filtros.
          </p>
        )}
      </section>
    </NavBar>
  )
}
