
import type { ReactNode } from 'react'

interface NavBarProps {
  children: ReactNode
}

export default function NavBar({ children }: NavBarProps) {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-6 sm:px-6 sm:py-10 motion-safe:animate-page-enter">
      <header className="mb-8 flex w-full max-w-7xl items-center gap-3 sm:mb-10 sm:gap-5">
        <button
          type="button"
          aria-label="Abrir menú"
          className="shrink-0"
        >
          <img
            src="/src/components/ui/icons/menu.svg"
            alt=""
            width={32}
            height={32}
          />
        </button>

        <img
          src="/src/components/ui/icons/search.svg"
          alt=""
          width={28}
          height={28}
          className="shrink-0 sm:h-[38px] sm:w-[38px]"
        />

        <input
          type="search"
          name="search"
          placeholder="Buscar..."
          aria-label="Buscar"
          className="min-w-0 flex-1 rounded border border-line p-2 text-sm leading-relaxed text-ink"
        />

        <button
          type="button"
          aria-label="Perfil"
          className="shrink-0"
        >
          <img
            src="/src/components/ui/icons/person.svg"
            alt=""
            width={32}
            height={32}
          />
        </button>
      </header>

      <main className="w-full max-w-6xl">{children}</main>
    </div>
  )
}
