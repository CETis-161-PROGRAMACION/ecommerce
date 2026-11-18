
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Bike,
  Coffee,
  Croissant,
  Menu,
  Mic,
  Search,
  Utensils,
  UserRound,
  X,
} from 'lucide-react'

import { ROUTES } from '@/router/routes'
import principitoImage from '@/assets/images/principito.png'

const establecimientos = ['KUNDERA', 'SANTORI', 'CUATRO CAFÉ', 'TU MESA']

const categorias = [
  { nombre: 'Café', Icono: Coffee },
  { nombre: 'Postres', Icono: Croissant },
  { nombre: 'Comidas', Icono: Utensils },
]

const productos = [
  {
    id: 1,
    nombre: 'Principito',
    establecimiento: 'KUNDERA',
    categoria: 'Café',
    imagen: principitoImage,
  },
]

export function DeliveryHomePage() {
  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState('')
  const [establecimientoActual, setEstablecimientoActual] =
    useState('')
  const [categoriaActual, setCategoriaActual] = useState('')
  const [menuAbierto, setMenuAbierto] = useState(false)

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    const coincideEstablecimiento =
      !establecimientoActual ||
      producto.establecimiento === establecimientoActual

    const coincideCategoria =
      !categoriaActual || producto.categoria === categoriaActual

    return (
      coincideBusqueda &&
      coincideEstablecimiento &&
      coincideCategoria
    )
  })

  return (
    <main className="min-h-screen bg-background motion-safe:animate-page-enter">
      {/* Barra superior */}
      <header className="relative flex w-full items-center gap-3 border-b border-line px-4 py-5 sm:px-6 lg:gap-5">

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="shrink-0 text-ink"
        >
          {menuAbierto ? <X size={27} /> : <Menu size={27} />}
        </button>

        <button
          type="button"
          title="Ver pedidos disponibles"
          aria-label="Pedidos disponibles"
          onClick={() => navigate(ROUTES.deliveryOrders)}
          className="shrink-0 rounded-lg p-1 text-ink transition hover:bg-brand-100"
        >
          <Bike size={27} />
        </button>

        <Search size={27} className="shrink-0 text-ink-muted" />

        <input
          type="search"
          placeholder="Buscar..."
          aria-label="Buscar productos"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />

        <span
          title="Búsqueda por voz próximamente"
          className="shrink-0 text-ink-muted"
        >
          <Mic size={25} />
        </span>

        <button
          type="button"
          aria-label="Ver perfil"
          className="shrink-0 text-ink"
        >
          <UserRound size={27} />
        </button>

        {/* Menú desplegable */}
        {menuAbierto && (
          <nav className="absolute left-4 top-full z-30 flex w-60 flex-col rounded-xl border border-line bg-surface p-3 shadow-lg">
            <Link
              to={ROUTES.deliveryHome}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-ink hover:bg-brand-100"
            >
              Inicio del repartidor
            </Link>

            <Link
              to={ROUTES.deliveryOrders}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-ink hover:bg-brand-100"
            >
              Pedidos disponibles
            </Link>
          </nav>
        )}
      </header>

      <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-5 sm:px-6">

        {/* Banner principal */}
        <div
          aria-label="Espacio promocional"
          className="h-20 rounded-2xl bg-[#b5bbb7] sm:h-24"
        />

        {/* Establecimientos */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {establecimientos.map((establecimiento) => (
            <button
              key={establecimiento}
              type="button"
              onClick={() =>
                setEstablecimientoActual(
                  establecimientoActual === establecimiento
                    ? ''
                    : establecimiento,
                )
              }
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                establecimientoActual === establecimiento
                  ? 'border-brand-400 bg-brand-100 text-navy-900'
                  : 'border-line bg-surface text-ink-muted hover:border-brand-200'
              }`}
            >
              {establecimiento}
            </button>
          ))}
        </div>

        {/* Categorías */}
        <div className="grid grid-cols-3 gap-4">
          {categorias.map(({ nombre, Icono }) => (
            <button
              key={nombre}
              type="button"
              onClick={() =>
                setCategoriaActual(
                  categoriaActual === nombre ? '' : nombre,
                )
              }
              className={`flex flex-col items-center gap-2 rounded-xl p-3 transition ${
                categoriaActual === nombre
                  ? 'bg-brand-100 text-navy-900'
                  : 'text-ink-muted hover:bg-surface-secondary'
              }`}
            >
              <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#f3eee8]">
                <Icono size={28} />
              </div>

              <span className="text-sm font-semibold">{nombre}</span>
            </button>
          ))}
        </div>

        {/* Productos */}
        <section>
          <h1 className="mb-4 text-xl font-bold text-ink">
            Productos disponibles
          </h1>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

              {productosFiltrados.map((producto) => (
                <article
                  key={producto.id}
                  className="overflow-hidden rounded-2xl border-2 border-line bg-surface p-3 shadow-sm"
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="h-32 w-full rounded-xl bg-[#f7f3ed] object-contain"
                  />

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-bold text-ink">
                        {producto.nombre}
                      </h2>

                      <p className="text-xs text-ink-muted">
                        {producto.establecimiento}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(ROUTES.productDetail)}
                      className="shrink-0 rounded-lg bg-brand-100 px-2 py-1.5 text-xs font-semibold text-navy-900 hover:bg-brand-200"
                    >
                      Pedir ahora
                    </button>
                  </div>
                </article>
              ))}

              {/* Espacios para productos futuros */}
              {!busqueda &&
                !establecimientoActual &&
                !categoriaActual &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="flex min-h-52 items-center justify-center rounded-2xl border-2 border-line/60 bg-surface p-4 text-center text-xs text-ink-muted"
                  >
                    Producto recomendado
                  </div>
                ))}
            </div>
          ) : (
            <p className="rounded-xl border border-line p-8 text-center text-sm text-ink-muted">
              No hay productos disponibles con estos filtros.
            </p>
          )}
        </section>
      </section>
    </main>
  )
}
