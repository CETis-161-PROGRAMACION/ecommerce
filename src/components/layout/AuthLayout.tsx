import type { ReactNode } from 'react'
import { Logo } from '@/components/ui/Logo'

interface AuthLayoutProps {
  title: string
  children: ReactNode
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-10">
      <header className="mb-10 flex w-full max-w-md items-center gap-4">
        <Logo className="h-14 w-14 shrink-0" />
        <div className="min-w-0">
          <h1 className="text-lg font-bold uppercase tracking-wide text-brand-400">
            {title}
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Web E-commerce
          </p>
        </div>
      </header>
      <main className="w-full max-w-md">{children}</main>
    </div>
  )
}
