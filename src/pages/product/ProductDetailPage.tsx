import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import productImage from '@/assets/images/principito.png'

interface SelectionGroupProps<T extends string> {
  title: string
  options: readonly T[]
  selected: readonly T[]
  onToggle: (option: T) => void
  chevron?: 'down' | 'right'
  className?: string
  boxClassName?: string
  titleClassName?: string
}

function SelectionGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
  chevron = 'down',
  className = '',
  boxClassName = '',
  titleClassName = '',
}: SelectionGroupProps<T>) {
  return (
    <fieldset className={`flex flex-col ${className}`}>
      <legend
        className={`mb-3 flex items-center gap-3 text-[28px] font-bold leading-[44px] text-ink ${titleClassName}`}
      >
        <span>{title}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="size-[30px] text-ink-muted/40"
        >
          <path d={chevron === 'down' ? 'M3 6h18l-9 13z' : 'M6 3v18l13-9z'} />
        </svg>
      </legend>
      <div
        className={`flex flex-col justify-evenly rounded-sm border-[3px] border-line/60 bg-surface px-2 py-1 ${boxClassName}`}
      >
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer select-none items-center justify-between gap-3 text-[26px] leading-[32px] text-ink-muted/80 transition-colors hover:text-ink"
          >
            <span className="whitespace-nowrap">{option}</span>
            <input
              type="checkbox"
              name={title}
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="size-7 shrink-0 appearance-none rounded-[2px] border-2 border-line bg-surface checked:border-brand-400 checked:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const SIZES = ['Chico', 'Mediano', 'Grande'] as const
const MILK_TYPES = [
  'Entera',
  'Deslactosada',
  'Evaporada',
  'Condensada',
] as const
const EXTRAS = ['Canela', 'Crema batida', 'Jarabes'] as const
const DELIVERY_METHODS = ['A domicilio', 'Recoger en tienda'] as const
const SWEETENERS = [
  'Azúcar estándar',
  'Jarabe',
  'Stevia',
  'Sin endulzante',
] as const

type Size = (typeof SIZES)[number]
type MilkType = (typeof MILK_TYPES)[number]
type Extra = (typeof EXTRAS)[number]
type DeliveryMethod = (typeof DELIVERY_METHODS)[number]
type Sweetener = (typeof SWEETENERS)[number]

export function ProductDetailPage() {
  const [size, setSize] = useState<Size | null>(null)
  const [milkType, setMilkType] = useState<MilkType | null>(null)
  const [extras, setExtras] = useState<Extra[]>([])
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(
    null,
  )
  const [sweetener, setSweetener] = useState<Sweetener | null>(null)
  const [comments, setComments] = useState('')

  function toggleSingle<T extends string>(
    setter: (updater: (current: T | null) => T | null) => void,
    option: T,
  ) {
    setter((current) => (current === option ? null : option))
  }

  function handleExtraToggle(option: Extra) {
    setExtras((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    )
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 py-8 xl:px-0 xl:py-0">
      <div className="flex flex-col gap-8 xl:relative xl:block xl:h-[980px]">
        <h1 className="text-[30px] font-bold uppercase leading-[44px] text-ink xl:absolute xl:left-[81px] xl:top-[20px]">
          PRINCIPITO
        </h1>

        <div className="w-full max-w-[274px] overflow-hidden rounded-[26px] border-[3px] border-line/60 xl:absolute xl:left-[61px] xl:top-[83px] xl:h-[546px] xl:w-[274px] xl:max-w-none">
          <img
            src={productImage}
            alt="Café Principito Kunder Libros y Café"
            className="h-full w-full object-cover"
          />
        </div>

        <SelectionGroup<Size>
          title="Tamaño"
          options={SIZES}
          selected={size ? [size] : []}
          onToggle={(option) => toggleSingle(setSize, option)}
          className="xl:absolute xl:left-[380px] xl:top-[20px] xl:w-[202px]"
          titleClassName="xl:ml-[10px] xl:mb-[23px]"
          boxClassName="xl:h-[191px]"
        />
        <SelectionGroup<MilkType>
          title="Tipo de Leche"
          options={MILK_TYPES}
          selected={milkType ? [milkType] : []}
          onToggle={(option) => toggleSingle(setMilkType, option)}
          className="xl:absolute xl:left-[632px] xl:top-[20px] xl:w-[253px]"
          titleClassName="xl:ml-[5px] xl:mb-[35px]"
          boxClassName="xl:h-[180px]"
        />
        <SelectionGroup<Extra>
          title="Extras"
          options={EXTRAS}
          selected={extras}
          onToggle={handleExtraToggle}
          className="xl:absolute xl:left-[950px] xl:top-[28px] xl:w-[233px]"
          titleClassName="xl:ml-[17px] xl:mb-[27px]"
          boxClassName="xl:h-[165px]"
        />
        <SelectionGroup<DeliveryMethod>
          title="Método de Entrega"
          options={DELIVERY_METHODS}
          selected={deliveryMethod ? [deliveryMethod] : []}
          onToggle={(option) => toggleSingle(setDeliveryMethod, option)}
          chevron="right"
          className="xl:absolute xl:left-[435px] xl:top-[390px] xl:w-[302px]"
          titleClassName="xl:-ml-[8px] xl:mb-[18px] xl:whitespace-nowrap"
          boxClassName="xl:h-[92px]"
        />
        <SelectionGroup<Sweetener>
          title="Endulzante"
          options={SWEETENERS}
          selected={sweetener ? [sweetener] : []}
          onToggle={(option) => toggleSingle(setSweetener, option)}
          className="xl:absolute xl:left-[854px] xl:top-[324px] xl:w-[259px]"
          titleClassName="xl:ml-[1px] xl:mb-[27px]"
          boxClassName="xl:h-[155px]"
        />

        <div className="flex flex-col xl:absolute xl:left-[96px] xl:top-[678px] xl:w-[1089px]">
          <label
            htmlFor="product-comments"
            className="mb-3 text-[28px] font-bold leading-[44px] text-ink xl:mb-[23px]"
          >
            Comentarios
          </label>
          <textarea
            id="product-comments"
            value={comments}
            onChange={(event) => setComments(event.target.value)}
            rows={2}
            className="w-full resize-none rounded-[28px] border-[3px] border-line/60 bg-surface px-5 py-4 text-xl text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 xl:h-[77px]"
          />
        </div>

        <Button
          type="button"
          className="w-full bg-brand-100! py-4 text-xl font-normal text-navy-900! hover:bg-brand-200! xl:absolute xl:left-[82px] xl:top-[865px] xl:h-[64px] xl:w-[1115px] xl:py-0"
        >
          Siguiente
        </Button>
      </div>
    </main>
  )
}
