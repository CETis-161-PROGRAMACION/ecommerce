
import { useState, type ReactNode } from 'react'
import { SideBar } from '@/components/sidebar/SideBar'
import menuIcon from '@/components/ui/icons/menu.svg'
import searchIcon from '@/components/ui/icons/search.svg'
import personIcon from '@/components/ui/icons/person.svg'

interface NavBarProps {
    children: ReactNode
    mainClassName?: string
}

export default function NavBar({ children, mainClassName }: NavBarProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen flex-col items-center px-4 py-6 sm:px-6 sm:py-10 motion-safe:animate-page-enter">
            <SideBar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <header className="mb-8 flex w-full max-w-7xl items-center gap-3 sm:mb-10 sm:gap-5">
                <button
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={isSidebarOpen}
                    onClick={() => setIsSidebarOpen(true)}
                    className="shrink-0 cursor-pointer"
                >
                    <img
                        src={menuIcon}
                        alt=""
                        width={32}
                        height={32}
                    />
                </button>

                <img
                src={searchIcon}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="shrink-0 sm:h-10 sm:w-10"
                />

                <div className="relative min-w-0 flex-1">
                <input
                type="search"
                name="search"
                placeholder="Buscar..."
                aria-label="Buscar"
                className="h-10 w-full rounded border border-line p-2 pr-10 text-sm leading-relaxed text-ink"
                />
                <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-ink-muted"
                >
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
                </div>

                <button
                type="button"
                aria-label="Perfil"
                className="mr-12 shrink-0 sm:mr-8"
                >
                <img
                    src={personIcon}
                    alt=""
                    width={32}
                    height={32}
                />
                </button>


            </header>
            <main className={`w-full ${mainClassName ?? 'max-w-7xl'}`}>
                {children}
            </main>
        </div>
    )
}
