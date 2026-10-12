import { useState } from 'react'

const banners = [
  {
    title: 'EL DESAYUNO QUE SIEMPRE CUMPLE',
    subtitle: 'Empieza tu día con algo delicioso',
    icon: '',
  },
  {
    title: 'TU CAFÉ FAVORITO TE ESPERA',
    subtitle: 'Disfruta algo especial hoy',
    icon: '',
  },
  {
    title: 'UN ANTOJO PARA CADA MOMENTO',
    subtitle: 'Descubre nuestras opciones',
    icon: '',
  },
]

const categories = [
  { name: 'Café', icon: '' },
  { name: 'Postres', icon: '' },
  { name: 'Comidas', icon: '' },
]

const products = [
  {
    name: 'Principito',
    category: 'CAFETERÍA',
    icon: '',
    color: 'bg-amber-100',
  },
  {
    name: 'Ensalada G',
    category: 'ENSALADAS',
    icon: '',
    color: 'bg-green-100',
  },
]

export function HomePage() {
  const [activeBanner, setActiveBanner] = useState(0)
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  function changeBanner(direction: number) {
    setActiveBanner(
      (current) =>
        (current + direction + banners.length) % banners.length,
    )
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-white px-5 py-5 text-ink">
      <header className="mb-5 flex items-center justify-between">
        <button
          type="button"
          aria-label="Abrir menú"
          className="text-2xl"
        >
          ☰
        </button>
        <span className="text-xl" aria-label="Perfil">
          👤
        </span>
      </header>

      <label className="mb-5 flex items-center gap-2 rounded-full border border-line px-4 py-2">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar"
          aria-label="Buscar productos"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <span aria-hidden="true">🎙</span>
      </label>

      <section
        aria-label="Promociones"
        className="relative mb-5 flex min-h-40 flex-col items-center justify-center rounded-3xl bg-[#35483b] px-10 py-5 text-center text-white"
      >
        <button
          type="button"
          aria-label="Promoción anterior"
          onClick={() => changeBanner(-1)}
          className="absolute left-2 text-3xl"
        >
          ‹
        </button>

        <span className="mb-2 text-5xl" aria-hidden="true">
          {banners[activeBanner].icon}
        </span>
        <h1 className="text-sm font-extrabold">
          {banners[activeBanner].title}
        </h1>
        <p className="mt-1 text-xs">
          {banners[activeBanner].subtitle}
        </p>

        <div className="mt-3 flex gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.title}
              type="button"
              aria-label={`Ver promoción ${index + 1}`}
              aria-pressed={activeBanner === index}
              onClick={() => setActiveBanner(index)}
              className={`size-2 rounded-full ${
                activeBanner === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Promoción siguiente"
          onClick={() => changeBanner(1)}
          className="absolute right-2 text-3xl"
        >
          ›
        </button>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-center text-[10px] font-bold uppercase">
          Categorías
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => setSearch(category.name)}
              className="flex flex-col items-center gap-1"
            >
              <span className="flex h-14 w-full items-center justify-center rounded-full border border-line bg-[#f4e6d8] text-3xl">
                {category.icon}
              </span>
              <span className="text-xs font-semibold">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-center text-[10px] font-bold uppercase">
          Recomendaciones
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-2xl border-2 border-line p-3"
            >
              <div
                className={`mb-3 flex h-24 items-center justify-center rounded-xl text-6xl ${product.color}`}
                aria-hidden="true"
              >
                {product.icon}
              </div>
              <h3 className="text-xs font-bold uppercase">
                {product.name}
              </h3>
              <p className="mt-1 text-[9px] text-ink-muted">
                {product.category}
              </p>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-5 text-center text-sm text-ink-muted">
            No se encontraron productos.
          </p>
        )}
      </section>

      <nav aria-label="Accesos rápidos" className="flex flex-col gap-3">
        {['KUNDERA', 'CUATRO CAFÉ', 'TU MESA'].map((name) => (
          <button
            key={name}
            type="button"
            className="rounded-full border-2 border-line py-2 text-sm font-extrabold text-ink-muted"
          >
            {name}
          </button>
        ))}
      </nav>
    </main>
  )
}
