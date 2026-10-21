import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  description?: string
  className?: string
  as?: 'h1' | 'h2'
}

/**
 * Encabezado de sección dentro de una pantalla. Usa la misma escala y peso
 * que el título de `HomePage` y `RegisterPage`.
 */
export function SectionTitle({
  children,
  description,
  className,
  as: Component = 'h2',
}: SectionTitleProps) {
  return (
    <div className={className}>
      <Component className="text-xl font-black tracking-tight text-ink sm:text-2xl">
        {children}
      </Component>
      {description ? (
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      ) : null}
    </div>
  )
}
