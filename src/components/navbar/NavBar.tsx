import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SideBar } from '@/components/sidebar/SideBar'
import { MotorcycleIcon } from '@/components/ui/MotorcycleIcon'
import { ROUTES } from '@/router/routes'

interface NavBarProps {
  children: ReactNode
  mainClassName?: string
}

export default function NavBar({ children, mainClassName }: NavBarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const isDeliveryMode = location.pathname.startsWith('/repartidor')

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
          className="shrink-0 cursor-pointer p-1 text-ink transition hover:text-navy-900"
        >
          <img
            src="/src/components/ui/icons/menu.svg"
            alt=""
            width={32}
            height={32}
          />
        </button>

        {/* Icono Repartidor en Moto (con indicador de modo activo) */}
        <Link
          to={isDeliveryMode ? ROUTES.home : ROUTES.deliveryOrders}
          aria-label={isDeliveryMode ? 'Ir al modo cliente' : 'Ir al modo repartidor'}
          title={isDeliveryMode ? 'Modo cliente' : 'Modo repartidor'}
          className={`relative shrink-0 p-1.5 transition rounded-lg hover:bg-brand-100 ${
            isDeliveryMode ? 'text-brand-400' : 'text-ink'
          }`}
        >
          <MotorcycleIcon size={28} />
          {isDeliveryMode && (
            <span className="absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-brand-400" />
          )}
        </Link>

        {/* Barra de búsqueda */}
        <div className="relative flex flex-1 items-center">
          <img
            src="/src/components/ui/icons/search.svg"
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="pointer-events-none absolute left-3 text-ink-muted"
          />
          <input
            type="search"
            name="search"
            placeholder="Buscar..."
            aria-label="Buscar"
            className="h-10 w-full min-w-0 rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
          />
        </div>

        {/* Micrófono */}
        <button
          type="button"
          aria-label="Búsqueda por voz"
          className="shrink-0 rounded-full p-2 text-ink-muted transition hover:bg-gray-100 hover:text-ink cursor-pointer"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>

        {/* Perfil */}
        <Link
          to={ROUTES.profile}
          aria-label="Perfil"
          className="shrink-0 p-1 text-ink transition hover:text-navy-900"
        >
          <img
            src="/src/components/ui/icons/person.svg"
            alt=""
            width={32}
            height={32}
          />
        </Link>
      </header>

      <main className={`w-full ${mainClassName ?? 'max-w-7xl'}`}>
        {children}
      </main>
    </div>
  )
}
