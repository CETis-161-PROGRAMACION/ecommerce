import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { signOut } from '@/services/auth'
import { useSession } from '@/services/session/session'

interface SideBarProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuEntry {
  label: string
  to: string
}

const MENU_ENTRIES: readonly MenuEntry[] = [
  { label: 'Inicio', to: ROUTES.home },
  { label: 'Pedidos Recientes', to: ROUTES.orders },
  { label: 'Cuenta', to: ROUTES.account },
  { label: 'Ajustes', to: ROUTES.settings },
  { label: 'Ayuda', to: ROUTES.help },
  { label: 'Acerca de', to: ROUTES.about },
  { label: 'Iniciar como repartidor', to: ROUTES.deliveryAccess },
]

const itemClass =
  'flex w-full items-center justify-between border-b border-line px-1 py-3 text-left text-base text-ink'

export function SideBar({ isOpen, onClose }: SideBarProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const { status } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      await signOut()
      onClose()
      navigate(ROUTES.login, { replace: true })
    } finally {
      setIsSigningOut(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity motion-reduce:transition-none"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Menú principal de navegación"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col rounded-r-3xl border-r border-line bg-surface p-6 shadow-2xl transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="sr-only">Menú</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="ml-auto rounded p-1 text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
            aria-label="Cerrar menú"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ✕
            </span>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col">
            {MENU_ENTRIES.map((entry) => (
              <li key={entry.label}>
                <Link
                  to={entry.to}
                  onClick={onClose}
                  className={`${itemClass} transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400`}
                >
                  {entry.label}
                </Link>
              </li>
            ))}
            <li>
              {status === 'signed-in' ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className={`${itemClass} transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400 disabled:opacity-60`}
                >
                  {isSigningOut ? 'Cerrando sesión…' : 'Cerrar Sesión'}
                </button>
              ) : (
                <Link
                  to={ROUTES.login}
                  onClick={onClose}
                  className={`${itemClass} transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400`}
                >
                  Iniciar sesión
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
