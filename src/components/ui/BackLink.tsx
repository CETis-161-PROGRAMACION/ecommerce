import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BackLinkProps {
  to: string
  label?: string
}

export function BackLink({ to, label = 'Regresar' }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-ink hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
    >
      <ArrowLeft aria-hidden="true" size={18} />
      {label}
    </Link>
  )
}
