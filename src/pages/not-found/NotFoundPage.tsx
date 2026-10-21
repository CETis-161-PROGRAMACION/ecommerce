import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES, type AppRoute } from '@/router/routes'
import { suggestRoutes } from '@/utils/routeSuggestions'

const ROUTE_LABELS: Record<AppRoute, string> = {
  [ROUTES.splash]: 'Inicio',
  [ROUTES.login]: 'Iniciar sesión',
  [ROUTES.recovery]: 'Recuperar datos',
  [ROUTES.register]: 'Registro',
  [ROUTES.confirmCode]: 'Confirmar código',
  [ROUTES.privacy]: 'Aviso de privacidad',
  [ROUTES.home]: 'Home',
  [ROUTES.productDetail]: 'Detalle del producto',
  [ROUTES.menu]: 'Menú',
  [ROUTES.sucursales]: 'Sucursales',
  [ROUTES.clienteDireccion]: 'Ingresar dirección',
  [ROUTES.userDestiny]: 'Dirección del destinatario',
  [ROUTES.deliveryAccess]: 'Acceso repartidor',
  [ROUTES.deliveryLogin]: 'Iniciar sesión repartidor',
  [ROUTES.deliveryRegister]: 'Registro repartidor',
  [ROUTES.deliveryOrders]: 'Pedidos disponibles repartidor',
  [ROUTES.deliveryOrderDetail]: 'Pedido en curso repartidor',
  [ROUTES.orderInfo]: 'Información de pedido',
  [ROUTES.orderTracking]: 'Estado del pedido',
  [ROUTES.profile]: 'Perfil de usuario',
}

// Las rutas con parámetros (`:id`) no se sugieren: no son navegables tal cual.
const SUGGESTABLE_ROUTES = Object.values(ROUTES).filter(
  (route) => route !== ROUTES.splash && !route.includes(':'),
)

export function NotFoundPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const suggestions = suggestRoutes(pathname, SUGGESTABLE_ROUTES)

  return (
    <AuthLayout title="Página no encontrada">
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed text-ink">
          No encontramos la dirección{' '}
          <span className="break-all font-semibold">{pathname}</span>.
        </p>

        {suggestions.length > 0 && (
          <nav
            aria-labelledby="not-found-suggestions"
            className="flex flex-col gap-3"
          >
            <h2
              id="not-found-suggestions"
              className="text-lg font-bold text-ink"
            >
              ¿Querías ir a alguna de estas?
            </h2>
            <ul className="flex flex-col gap-2">
              {suggestions.map((route) => (
                <li key={route}>
                  <Link
                    to={route}
                    className="flex flex-col rounded-xl border border-line bg-surface px-4 py-3 text-ink transition-colors hover:border-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                  >
                    <span className="font-semibold">{ROUTE_LABELS[route]}</span>
                    <span className="text-sm text-ink-muted">{route}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Button type="button" onClick={() => navigate(ROUTES.splash)}>
          Ir al inicio
        </Button>
      </div>
    </AuthLayout>
  )
}
