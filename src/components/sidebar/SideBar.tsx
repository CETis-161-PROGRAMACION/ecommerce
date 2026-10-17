import { ROUTES } from "@/router/routes"

interface SideBarProps {
    isOpen: boolean
    onClose: () => void
}

export function SideBar({ isOpen, onClose }: SideBarProps) {
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
            isOpen ? "translate-x-0" : "-translate-x-full"
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
                <span className="text-xl leading-none">✕</span>
            </button>
            </div>

            <nav className="flex-1">
            <ul className="flex flex-col gap-2">
                <li>
                <a
                    href={ROUTES.home}
                    onClick={onClose}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400"
                >
                    Inicio
                </a>
                </li>
                <li>
                <a
                    href={ROUTES.sucursales}
                    onClick={onClose}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400"
                >
                    Sucursales
                </a>
                </li>
                <li>
                <a
                    href={ROUTES.menu}
                    onClick={onClose}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400"
                >
                    Ayuda
                </a>
                </li>
                <li>
                <a
                    href={ROUTES.menu}
                    onClick={onClose}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400"
                >
                    Acerca de
                </a>
                </li>
                <li>
                <a
                    href={ROUTES.menu}
                    onClick={onClose}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-100 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-brand-400"
                >
                    Repartidor
                </a>
                </li>
                <li>
                <a
                    href={ROUTES.login}
                    onClick={onClose}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-red-500 hover:text-white focus-visible:outline-2 focus-visible:outline-brand-400"
                >
                    Cerrar sesión
                </a>
                </li>
            </ul>
            </nav>
        </aside>
        </>
    )
}