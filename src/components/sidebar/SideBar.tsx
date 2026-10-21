import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CloseIcon } from '@/components/ui/CloseIcon'
import { UserIcon } from '@/components/ui/UserIcon'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'

interface SideBarProps {
  isOpen: boolean
  onClose: () => void
}

interface SideBarLink {
  to: string
  label: string
}

const enlaces: SideBarLink[] = [
  { to: ROUTES.home, label: 'Inicio' },
  { to: ROUTES.profile, label: 'Mi Perfil' },
  { to: ROUTES.orderTracking, label: 'Estado de Pedido' },
  { to: ROUTES.sucursales, label: 'Sucursales' },
  { to: ROUTES.menu, label: 'Sucursal Kundera' },
  { to: ROUTES.deliveryOrders, label: 'Pedidos Repartidor' },
]

export function SideBar({ isOpen, onClose }: SideBarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { session, logout } = useApp()

  const nombreUsuario = session?.nombre ?? 'Invitado'

  function cerrarSesion() {
    logout()
    onClose()
    navigate(ROUTES.login)
  }

  return (
    <>
      {/* Fondo oscuro al abrir el sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel lateral deslizante */}
      <aside
        aria-label="Menú principal de navegación"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-surface p-6 shadow-2xl transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
          <h2 className="text-lg font-bold text-ink">Menú</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-400"
            aria-label="Cerrar menú"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-line bg-background p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-soft text-neutral-strong">
            <UserIcon size={24} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">
              {nombreUsuario}
            </p>
            <p className="text-xs text-ink-muted">
              {session
                ? session.rol === 'repartidor'
                  ? 'Repartidor'
                  : 'Cliente'
                : 'Sesión no iniciada'}
            </p>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {enlaces.map((enlace) => {
              const activo =
                enlace.to === ROUTES.home
                  ? location.pathname === ROUTES.home
                  : location.pathname.startsWith(enlace.to.split('?')[0])

              return (
                <li key={enlace.to}>
                  <Link
                    to={enlace.to}
                    onClick={onClose}
                    aria-current={activo ? 'page' : undefined}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-400 ${
                      activo
                        ? 'bg-brand-100 text-navy-900'
                        : 'text-ink hover:bg-brand-100/60 hover:text-navy-900'
                    }`}
                  >
                    {enlace.label}
                  </Link>
                </li>
              )
            })}

            <li className="mt-4 border-t border-line/60 pt-4">
              <button
                type="button"
                onClick={cerrarSesion}
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-semibold text-ink transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-brand-400"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
