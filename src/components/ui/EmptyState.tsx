import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
}

/** Estado vacío: cuando no hay nada que mostrar en una lista o tarjeta. */
export function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      {icon ? <div className="text-ink-muted">{icon}</div> : null}
      <p className="text-base font-black text-ink">{title}</p>
      {description ? (
        <p className="max-w-sm text-sm text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  )
}
