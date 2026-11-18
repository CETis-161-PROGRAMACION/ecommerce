import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Coffee, Croissant, Utensils, type LucideIcon } from 'lucide-react'
import NavBar from '@/components/navbar/NavBar'
import { ROUTES, productPath } from '@/router/routes'
import {
  type CatalogProduct,
  type Category as CategoryName,
} from '@/services/catalog/products'
import { useCatalog } from '@/services/catalog/useCatalog'
import { formatPrice } from '@/utils/currency'
import { matchesSearch } from '@/utils/search'
import cuatroCafePromo from '@/assets/images/negocios/cuatro-cafe-08.webp'
import cuatroCafeChilaquiles from '@/assets/images/negocios/cuatro-cafe-03.webp'
import kunderaLocal from '@/assets/images/negocios/kundera-06.webp'
import kunderaLatte from '@/assets/images/negocios/kundera-02.webp'
import santoriPromo from '@/assets/images/negocios/santori-02.webp'
import donaMaryPizza from '@/assets/images/negocios/dona-mary-07.webp'

interface Slide {
  name: string
  image: string
  alt: string
}

interface Category {
  name: CategoryName
  Icon: LucideIcon
}

const SLIDES: readonly Slide[] = [
  {
    name: 'Cuatro Café',
    image: cuatroCafePromo,
    alt: 'Promoción de Cuatro Café: "Ni las sombras se resisten", capuchino con arte de luna y estrella',
  },
  {
    name: 'Cuatro Café: desayunos',
    image: cuatroCafeChilaquiles,
    alt: 'Desayuno de Cuatro Café con chilaquiles, tocino y frijoles',
  },
  {
    name: 'Kundera',
    image: kunderaLocal,
    alt: 'Interior de Kundera con el letrero "Libros + Café" y una mesa',
  },
  {
    name: 'Kundera: café',
    image: kunderaLatte,
    alt: 'Café con arte latte junto a un libro abierto en Kundera',
  },
  {
    name: 'Santori',
    image: santoriPromo,
    alt: 'Promoción de Santori: Caramel Macchiato',
  },
  {
    name: 'Doña Mary',
    image: donaMaryPizza,
    alt: 'Pizza de Doña Mary con boneless y aderezo',
  },
]

const CATEGORIES: readonly Category[] = [
  { name: 'Café', Icon: Coffee },
  { name: 'Postres', Icon: Croissant },
  { name: 'Comidas', Icon: Utensils },
]

function productLink(product: CatalogProduct) {
  return product.slug === 'principito'
    ? ROUTES.productDetail
    : productPath(product.slug)
}

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [business, setBusiness] = useState('')
  const [category, setCategory] = useState('')

  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('q') ?? '').trim()

  const catalogState = useCatalog()
  const businesses =
    catalogState.status === 'ready' ? catalogState.catalog.businesses : []
  const products =
    catalogState.status === 'ready' ? catalogState.catalog.products : []

  const slide = SLIDES[slideIndex]
  const selectedBusiness = businesses.find((item) => item.slug === business)
  const visibleProducts = products.filter(
    (product) =>
      (!business || product.business.slug === business) &&
      (!category || product.category === category) &&
      matchesSearch(searchQuery, [
        product.name,
        product.description,
        product.category,
        product.business.name,
      ]),
  )

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
          className="relative flex h-56 items-center justify-center overflow-hidden sm:h-80"
        >
          <img
            src={slide.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
          />
          <img
            src={slide.image}
            alt={slide.alt}
            className="relative h-full w-auto max-w-full object-contain py-3 shadow-lg"
          />
        </div>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Anterior"
          className={`absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-surface/80 p-2 text-ink shadow hover:bg-brand-100 sm:left-4 ${focusRing}`}
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
          className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-surface/80 p-2 text-ink shadow hover:bg-brand-100 sm:right-4 ${focusRing}`}
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

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-surface/80 px-3 py-1.5">
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
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {businesses.map((item) => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={business === item.slug}
            onClick={() => setBusiness(business === item.slug ? '' : item.slug)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold uppercase transition-colors motion-reduce:transition-none ${
              business === item.slug
                ? 'border-brand-400 bg-brand-100 text-navy-900'
                : 'border-line bg-surface text-ink hover:border-brand-200'
            } ${focusRing}`}
          >
            {item.name}
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
            <span className="flex h-12 w-full items-center justify-center rounded-xl bg-amber-50 dark:bg-surface-secondary">
              <Icon aria-hidden="true" size={28} />
            </span>
            <span className="text-sm font-semibold">{name}</span>
          </button>
        ))}
      </div>

      <section aria-labelledby="products-title" className="mt-8">
        <h2 id="products-title" className="mb-4 text-xl font-bold text-ink">
          {searchQuery ? `Resultados para «${searchQuery}»` : 'Productos'}
        </h2>

        {catalogState.status === 'loading' ? (
          <p
            role="status"
            className="rounded-xl border border-line p-8 text-center text-sm text-ink-muted"
          >
            Cargando productos…
          </p>
        ) : catalogState.status === 'error' ? (
          <p
            role="alert"
            className="rounded-xl border border-red-300 p-8 text-center text-sm text-red-700 dark:text-red-400"
          >
            {catalogState.message}
          </p>
        ) : visibleProducts.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <li
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border-2 border-line bg-amber-50 dark:bg-surface"
              >
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-bold text-ink">
                      {product.name}
                    </p>
                    <p className="text-xs text-ink-muted">{product.business.name}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-success">
                      {formatPrice(product.price)}
                    </p>
                    <Link
                      to={productLink(product)}
                      aria-label={`Pedir ${product.name}`}
                      className={`shrink-0 rounded-lg bg-brand-100 px-2 py-1.5 text-xs font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
                    >
                      Pedir ahora
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-line p-8 text-center text-sm text-ink-muted">
            {searchQuery
              ? `No encontramos productos para «${searchQuery}». Revisa la ortografía o quita algún filtro.`
              : selectedBusiness && !category
                ? `${selectedBusiness.name} todavía no tiene productos.`
                : 'No hay productos con estos filtros.'}
          </p>
        )}
      </section>
    </NavBar>
  )
}
