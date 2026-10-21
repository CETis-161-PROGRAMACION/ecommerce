import type { ReactNode } from 'react'

interface PillFilterProps {
  children: ReactNode
  active: boolean
  onClick: () => void
  className?: string
}

/**
 * Píldora de filtro. Replica el formato de los selectores de tienda y de
 * categoría que usan `HomePage` y sus sub-vistas.
 */
export function PillFilter({
  children,
  active,
  onClick,
  className,
}: PillFilterProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-6 py-3 text-base font-black uppercase tracking-wide transition-all duration-200 shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 sm:px-8 sm:text-lg ${
        active
          ? 'border-2 border-brand-400 bg-brand-100/50 text-navy-900 shadow-sm'
          : 'border border-line bg-surface text-ink hover:border-brand-400 hover:text-navy-900'
      } ${className ?? ''}`}
    >
      {children}
    </button>
  )
}
