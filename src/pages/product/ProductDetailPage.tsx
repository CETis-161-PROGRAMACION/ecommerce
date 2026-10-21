import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { Card, CardTitle } from '@/components/ui/Card'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { useApp } from '@/context/useApp'
import { findProduct } from '@/data/products'
import { storeName } from '@/data/stores'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { ROUTES } from '@/router/routes'

interface SelectionGroupProps {
  titulo: string
  opciones: string[]
  multiple: boolean
  selected: string[]
  onToggle: (opcion: string) => void
}

function SelectionGroup({
  titulo,
  opciones,
  multiple,
  selected,
  onToggle,
}: SelectionGroupProps) {
  const name = `grupo-${titulo.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <fieldset className="flex flex-col">
      <legend className={`${labelClass} mb-3`}>{titulo}:</legend>
      <div className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-2">
        {opciones.map((opcion) => {
          const checked = selected.includes(opcion)
          return (
            <label
              key={opcion}
              className="flex cursor-pointer select-none items-center justify-between gap-3 rounded-xl px-3 py-2 text-base text-ink transition-colors hover:bg-brand-100/40"
            >
              <span>{opcion}</span>
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                checked={checked}
                onChange={() => onToggle(opcion)}
                className="size-5 shrink-0 accent-brand-400"
              />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { saveSelection } = useApp()

  const producto = useMemo(() => findProduct(id), [id])

  const [opciones, setOpciones] = useState<Record<string, string[]>>({})
  const [comentarios, setComentarios] = useState('')

  if (!producto) {
    return <NotFoundPage />
  }

  const item = producto

  function alternar(grupo: string, opcion: string, multiple: boolean) {
    setOpciones((anterior) => {
      const actuales = anterior[grupo] ?? []

      if (multiple) {
        return {
          ...anterior,
          [grupo]: actuales.includes(opcion)
            ? actuales.filter((item) => item !== opcion)
            : [...actuales, opcion],
        }
      }

      return {
        ...anterior,
        [grupo]: actuales.includes(opcion) ? [] : [opcion],
      }
    })
  }

  function manejarContinuar() {
    saveSelection({ productId: item.id, opciones, comentarios })
    navigate(ROUTES.clienteDireccion)
  }

  return (
    <NavBar>
      <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <Card padding="none" className="overflow-hidden">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="h-72 w-full object-cover"
            />
          </Card>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {storeName(producto.storeId)} · {producto.categoria}
            </p>
            <h1 className="mt-1 text-3xl font-black uppercase tracking-tight text-ink">
              {producto.nombre}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {producto.descripcion}
            </p>
            <p className="mt-3 text-2xl font-black text-navy-900">
              ${producto.precio} MXN
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardTitle>Personaliza tu pedido</CardTitle>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {producto.grupos.map((grupo) => (
                <SelectionGroup
                  key={grupo.titulo}
                  titulo={grupo.titulo}
                  opciones={grupo.opciones}
                  multiple={grupo.multiple}
                  selected={opciones[grupo.titulo] ?? []}
                  onToggle={(opcion) =>
                    alternar(grupo.titulo, opcion, grupo.multiple)
                  }
                />
              ))}
            </div>

            <div className="mt-6">
              <label htmlFor="product-comments" className={labelClass}>
                Comentarios:
              </label>
              <textarea
                id="product-comments"
                value={comentarios}
                onChange={(event) => setComentarios(event.target.value)}
                rows={3}
                placeholder="Sin azúcar extra, por favor…"
                className={`${inputClass} h-auto resize-none py-3`}
              />
            </div>
          </Card>

          <Button type="button" size="lg" fullWidth onClick={manejarContinuar}>
            Siguiente
          </Button>
        </div>
      </div>
    </NavBar>
  )
}
