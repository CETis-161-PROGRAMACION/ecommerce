import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'solid' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-brand-100 text-navy-900 hover:bg-brand-200',
  solid: 'bg-brand-400 text-white hover:bg-brand-400/90',
  outline: 'border border-brand-400 bg-surface text-navy-900 hover:bg-brand-100',
  ghost: 'text-navy-900 hover:bg-brand-100/60',
  danger: 'bg-danger text-white hover:bg-danger/90',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Botón base de la aplicación.
 *
 * `primary` es el estilo de referencia de la app (fondo `brand-100` con texto
 * `navy-900`); usa `solid` solo cuando el diseño exige el azul de marca lleno.
 */
export function Button({
  type,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className ?? ''}`}
      {...buttonProps}
    />
  )
}
