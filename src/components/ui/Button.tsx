import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ type, className, ...buttonProps }: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`inline-flex items-center justify-center rounded-full bg-brand-400 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-400/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:cursor-not-allowed disabled:opacity-60 ${
        className ?? ''
      }`}
      {...buttonProps}
    />
  )
}
