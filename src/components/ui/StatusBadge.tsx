import type { ReactNode } from 'react'

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

interface StatusBadgeProps {
  children: ReactNode
  tone?: StatusTone
  className?: string
}

const toneClass: Record<StatusTone, string> = {
  neutral: 'bg-neutral-soft text-neutral-strong',
  success: 'bg-success-soft text-success-strong',
  warning: 'bg-warning-soft text-warning-strong',
  danger: 'bg-danger-soft text-danger-strong',
  info: 'bg-info-soft text-info-strong',
}

/** Etiqueta de estado (por ejemplo "En camino" o "Pagado"). */
export function StatusBadge({
  children,
  tone = 'neutral',
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${toneClass[tone]} ${
        className ?? ''
      }`}
    >
      {children}
    </span>
  )
}
