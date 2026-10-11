import type { ReactNode } from 'react'
import { Logo } from '@/components/ui/Logo'

interface AuthLayoutProps {
  title: string
  children: ReactNode
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-10">
      <header className="mb-10 flex w-full px-24 max-w items-start gap-4">
        <Logo className="h-14 w-14 shrink-0" />
        <img src="/src/assets/images/logo_e-commerce.png" alt="Logo" className="mb-1 h-52 w-auto" />
        <div className="min-w-0">
          <h1 className="text-4xl mt-10 font-bold uppercase tracking-wide text-blue-400 ">
            {title}
          </h1>
          <p className="text-md mt-3 ml-14 font-semibold uppercase tracking-widest text-ink-muted">
            Web E-commerce
          </p>
        </div>
      </header>
      <main className="w-full max-w-md">{children}</main>
    </div>
  )
}
