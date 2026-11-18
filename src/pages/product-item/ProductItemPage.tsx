import { useId, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'
import { useCart } from '@/services/cart/cart'
import { useCatalog } from '@/services/catalog/useCatalog'
import { formatPrice } from '@/utils/currency'

const MAX_QUANTITY = 20

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

export function ProductItemPage() {
  const { productId } = useParams()
  const catalogState = useCatalog()
  const product =
    catalogState.status === 'ready'
      ? catalogState.catalog.products.find((item) => item.slug === productId)
      : undefined
  const id = useId()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [comments, setComments] = useState('')

  if (catalogState.status === 'loading') {
    return (
      <NavBar>
        <p role="status" className="py-12 text-center text-sm text-ink-muted">
          Cargando producto…
        </p>
      </NavBar>
    )
  }

  if (!product) {
    return (
      <NavBar>
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-ink">
            Producto no encontrado
          </h1>
          <p className="text-sm text-ink-muted">
            Este producto no existe o ya no está disponible.
          </p>
          <Link
            to={ROUTES.home}
            className={`rounded-full bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-brand-200 ${focusRing}`}
          >
            Volver al inicio
          </Link>
        </div>
      </NavBar>
    )
  }

  function handleAdd() {
    if (!product) return
    const note = comments.trim()
    addItem({
      productId: product.id,
      business: product.business.name,
      name: product.name,
      options: note ? [`Nota: ${note}`] : [],
      price: product.price,
      quantity,
      image: product.image,
    })
    navigate(ROUTES.infoPedido)
  }

  return (
    <NavBar>
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="mx-auto aspect-square w-full max-w-md rounded-3xl border border-line bg-amber-50 object-cover"
        />

        <div className="flex flex-col gap-5">
          <div>
            <p className="inline-block rounded-full border border-line px-4 py-1 text-xs font-bold text-ink">
              {product.business.name}
            </p>
            <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-sm text-ink-muted">{product.category}</p>
            <p className="mt-2 text-2xl font-bold text-success">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-ink">{product.description}</p>

          <div>
            <p
              id={`${id}-quantity`}
              className="mb-2 text-sm font-bold text-ink"
            >
              Cantidad
            </p>
            <div
              role="group"
              aria-labelledby={`${id}-quantity`}
              className="inline-flex items-center rounded-full border border-line"
            >
              <button
                type="button"
                aria-label="Quitar uno"
                disabled={quantity <= 1}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className={`flex size-10 items-center justify-center rounded-full text-xl text-ink hover:bg-brand-100 disabled:opacity-40 ${focusRing}`}
              >
                −
              </button>
              <span
                aria-live="polite"
                className="min-w-10 text-center font-semibold text-ink"
              >
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Agregar uno"
                disabled={quantity >= MAX_QUANTITY}
                onClick={() =>
                  setQuantity((value) => Math.min(MAX_QUANTITY, value + 1))
                }
                className={`flex size-10 items-center justify-center rounded-full text-xl text-ink hover:bg-brand-100 disabled:opacity-40 ${focusRing}`}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor={`${id}-comments`}
              className="mb-2 block text-sm font-bold text-ink"
            >
              Comentarios
            </label>
            <textarea
              id={`${id}-comments`}
              rows={3}
              maxLength={200}
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder="Ej. sin cebolla, poco hielo…"
              className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <Button
            type="button"
            onClick={handleAdd}
            className="w-full bg-brand-100! py-3 text-navy-900! hover:bg-brand-200!"
          >
            Agregar al pedido · {formatPrice(product.price * quantity)}
          </Button>
        </div>
      </div>
    </NavBar>
  )
}
