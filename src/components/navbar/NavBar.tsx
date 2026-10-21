import { useState, type FormEvent, type ReactNode } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { SideBar } from '@/components/sidebar/SideBar'
import { MotorcycleIcon } from '@/components/ui/MotorcycleIcon'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'
import menuIcon from '@/components/ui/icons/menu.svg'
import personIcon from '@/components/ui/icons/person.svg'
import searchIcon from '@/components/ui/icons/search.svg'

interface NavBarProps {
  children: ReactNode
  mainClassName?: string
}

export default function NavBar({ children, mainClassName }: NavBarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const [term, setTerm] = useState(searchParams.get('q') ?? '')
  const [lastQuery, setLastQuery] = useState(searchParams.get('q') ?? '')
  const location = useLocation()
  const navigate = useNavigate()
  const { esRepartidor } = useApp()
  const isDeliveryMode = location.pathname.startsWith(ROUTES.deliveryAccess)

  // Un repartidor entra directo a sus pedidos; el resto llega a la pantalla
  // que permite elegir con qué tipo de cuenta continuar.
  const destinoModoRepartidor = esRepartidor
    ? ROUTES.deliveryOrders
    : ROUTES.deliveryAccess

  // Si la URL cambia (búsqueda desde otra pantalla), el campo se sincroniza.
  const currentQuery = searchParams.get('q') ?? ''
  if (currentQuery !== lastQuery) {
    setLastQuery(currentQuery)
    setTerm(currentQuery)
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = term.trim()
    navigate(
      query ? `${ROUTES.home}?q=${encodeURIComponent(query)}` : ROUTES.home,
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-6 sm:px-6 sm:py-10 motion-safe:animate-page-enter">
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="mb-8 flex w-full max-w-7xl items-center gap-3 sm:mb-10 sm:gap-4">
        {/* Menú Hamburguesa */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
          className="shrink-0 cursor-pointer p-1 text-ink transition hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          <img src={menuIcon} alt="" width={32} height={32} />
        </button>

        {/* Icono Repartidor en Moto (con indicador de modo activo) */}
        <Link
          to={isDeliveryMode ? ROUTES.home : destinoModoRepartidor}
          aria-label={
            isDeliveryMode ? 'Ir al modo cliente' : 'Ir al modo repartidor'
          }
          title={isDeliveryMode ? 'Modo cliente' : 'Modo repartidor'}
          className={`relative shrink-0 rounded-lg p-1.5 transition hover:bg-brand-100 ${
            isDeliveryMode ? 'text-brand-400' : 'text-ink'
          }`}
        >
          <MotorcycleIcon size={28} />
          {isDeliveryMode && (
            <span className="absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-brand-400" />
          )}
        </Link>

        {/* Barra de búsqueda: filtra el catálogo del inicio */}
        <form
          role="search"
          onSubmit={handleSearch}
          className="relative flex flex-1 items-center"
        >
          <img
            src={searchIcon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="pointer-events-none absolute left-3 text-ink-muted"
          />
          <input
            type="search"
            name="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="h-10 w-full min-w-0 rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
          />
        </form>

        {/* Perfil */}
        <Link
          to={ROUTES.profile}
          aria-label="Perfil"
          className="shrink-0 p-1 text-ink transition hover:text-navy-900"
        >
          <img src={personIcon} alt="" width={32} height={32} />
        </Link>
      </header>

      <main className={`w-full ${mainClassName ?? 'max-w-7xl'}`}>
        {children}
      </main>
    </div>
  )
}
