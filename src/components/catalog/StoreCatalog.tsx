import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { products as catalogo } from '@/data/products'
import { storeName } from '@/data/stores'
import { formatMoney } from '@/utils/money'

interface StoreCatalogProps {
  storeId: string
  busqueda?: string
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Catálogo de una sucursal: filtros por categoría y tarjetas de producto.
 * Es el mismo componente para las tres sucursales del inicio, así todas se
 * ven igual y el filtrado por nombre funciona en todas.
 */
export function StoreCatalog({ storeId, busqueda = '' }: StoreCatalogProps) {
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState('all')

  const productos = useMemo(
    () =>
      storeId === 'all'
        ? catalogo
        : catalogo.filter((producto) => producto.storeId === storeId),
    [storeId],
  )

  const categorias = useMemo(() => {
    const ids = Array.from(new Set(productos.map((p) => p.categoria)))
    return ids.map((id) => ({
      id,
      nombre: id,
      imagen: productos.find((p) => p.categoria === id)?.imagen ?? '',
    }))
  }, [productos])

  const visibles = useMemo(() => {
    const termino = normalizar(busqueda.trim())

    return productos.filter((producto) => {
      const coincideCategoria =
        categoria === 'all' || producto.categoria === categoria
      const coincideBusqueda =
        termino.length === 0 ||
        normalizar(producto.nombre).includes(termino) ||
        normalizar(producto.categoria).includes(termino) ||
        normalizar(producto.descripcion).includes(termino)

      return coincideCategoria && coincideBusqueda
    })
  }, [productos, categoria, busqueda])

  return (
    <div className="w-full space-y-8 motion-safe:animate-fade-in">
      {categorias.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 sm:gap-10">
          {categorias.map((cat) => {
            const isSelected = categoria === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setCategoria((previo) => (previo === cat.id ? 'all' : cat.id))
                }
                className={`group flex cursor-pointer flex-col items-center gap-2 rounded-2xl transition-transform duration-200 hover:scale-105 ${
                  isSelected ? 'ring-2 ring-brand-400 ring-offset-2' : ''
                }`}
              >
                <div className="flex h-16 w-32 items-center justify-center overflow-hidden rounded-2xl border border-warm-border/60 bg-warm-pill p-2 shadow-xs transition-colors group-hover:bg-warm-border/50 sm:h-18 sm:w-36">
                  <img
                    src={cat.imagen}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-auto object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-base font-bold text-ink">
                  {cat.nombre}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      {visibles.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          description={
            busqueda
              ? `No encontramos productos para “${busqueda}”${
                  storeId === 'all'
                    ? ' en el catálogo'
                    : ` en ${storeName(storeId)}`
                }.`
              : storeId === 'all'
                ? 'Todavía no hay productos en el catálogo.'
                : `Todavía no hay productos en ${storeName(storeId)}.`
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibles.map((producto) => (
            <article
              key={producto.id}
              className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-5 shadow-xs transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => navigate(`/producto/${producto.id}`)}
                className="flex h-56 w-full cursor-pointer items-center justify-center p-2"
                aria-label={`Ver ${producto.nombre}`}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-full w-auto max-w-[210px] object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105"
                />
              </button>

              <div className="mt-4 flex items-end justify-between gap-2 border-t border-line/60 pt-3">
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-ink">
                    {producto.nombre}
                  </h3>
                  <p className="text-xs font-bold uppercase text-ink-muted">
                    {storeName(producto.storeId)}
                  </p>
                  <p className="mt-1 text-sm font-black text-navy-900">
                    {formatMoney(producto.precio)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/producto/${producto.id}`)}
                  className="cursor-pointer rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold text-navy-900 shadow-xs transition-all hover:bg-brand-200 active:scale-95"
                >
                  Pedir ahora
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
