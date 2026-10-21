import type { ElementType, HTMLAttributes, ReactNode } from 'react'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  padding?: CardPadding
  children: ReactNode
}

const paddingClass: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * Superficie base de la aplicación: fondo de marca, borde `line` y radio
 * grande. Todas las tarjetas de la app usan este componente para que el
 * formato sea el mismo en las 21 pantallas.
 */
export function Card({
  as: Component = 'div',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={`rounded-3xl border border-line bg-surface shadow-xs ${paddingClass[padding]} ${
        className ?? ''
      }`}
      {...rest}
    >
      {children}
    </Component>
  )
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4'
  children: ReactNode
}

/** Título de una tarjeta. */
export function CardTitle({
  as: Component = 'h3',
  className,
  children,
  ...rest
}: CardTitleProps) {
  return (
    <Component
      className={`text-base font-black tracking-tight text-ink sm:text-lg ${className ?? ''}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
