
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
} from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
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
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const isHome = location.pathname === ROUTES.home
    const [query, setQuery] = useState(() =>
        isHome ? (searchParams.get('q') ?? '') : '',
    )
    const searchTimer = useRef<number | undefined>(undefined)

    useEffect(() => {
        const timer = searchTimer
        return () => window.clearTimeout(timer.current)
    }, [])

    // En el inicio filtra al momento; en otras pantallas lleva al inicio con la búsqueda.
    function applySearch(value: string) {
        const trimmed = value.trim()
        if (isHome) {
            setSearchParams(trimmed ? { q: trimmed } : {}, { replace: true })
        } else if (trimmed) {
            navigate({
                pathname: ROUTES.home,
                search: `?q=${encodeURIComponent(trimmed)}`,
            })
        }
    }

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setQuery(value)
        if (!isHome) return
        window.clearTimeout(searchTimer.current)
        searchTimer.current = window.setTimeout(() => applySearch(value), 250)
    }

    function handleSearchClear() {
        window.clearTimeout(searchTimer.current)
        setQuery('')
        applySearch('')
    }

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        window.clearTimeout(searchTimer.current)
        applySearch(query)
    }

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
                        className="dark:brightness-200"
                    />
                </button>

                <img
                src={searchIcon}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="shrink-0 sm:h-10 sm:w-10 dark:brightness-200"
                />

                <form
                role="search"
                onSubmit={handleSearchSubmit}
                className="relative min-w-0 flex-1"
                >
                <input
                type="search"
                name="q"
                value={query}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
                autoComplete="off"
                className="h-10 w-full rounded border border-line bg-surface p-2 pr-9 text-sm leading-relaxed text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-100"
                />
                {query && (
                    <button
                    type="button"
                    onClick={handleSearchClear}
                    aria-label="Borrar búsqueda"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
                    >
                    <span aria-hidden="true" className="text-sm leading-none">
                        ✕
                    </span>
                    </button>
                )}
                </form>

                <Link
                to={ROUTES.account}
                aria-label="Perfil"
                className="mr-12 shrink-0 sm:mr-8"
                >
                <img
                    src={personIcon}
                    alt=""
                    width={32}
                    height={32}
                    className="dark:brightness-200"
                />
                </Link>


            </header>
            <main className={`w-full ${mainClassName ?? 'max-w-7xl'}`}>
                {children}
            </main>
        </div>
    )
}
