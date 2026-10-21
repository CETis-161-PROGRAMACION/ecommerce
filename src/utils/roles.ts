import { ROUTES } from '@/router/routes'
import type { UserRole } from '@/types'

/**
 * Utilidades de permisos por rol.
 *
 * La aplicación tiene dos roles: `cliente` (compra y sigue sus pedidos) y
 * `repartidor` (toma y entrega los pedidos disponibles). Estas constantes
 * concentran las rutas y los mensajes de cada rol para que el guard, el menú
 * y las pantallas de acceso no inventen rutas a mano.
 */

/** Nombre legible de cada rol. */
export const NOMBRE_ROL: Record<UserRole, string> = {
  cliente: 'Cliente',
  repartidor: 'Repartidor',
}

/** Pantalla de inicio de cada rol. */
export const HOME_POR_ROL: Record<UserRole, string> = {
  cliente: ROUTES.home,
  repartidor: ROUTES.deliveryOrders,
}

/** Puerta de acceso (pantalla de inicio de sesión) de cada rol. */
export const LOGIN_POR_ROL: Record<UserRole, string> = {
  cliente: ROUTES.login,
  repartidor: ROUTES.deliveryLogin,
}

/** Texto del panel de acceso restringido para cada rol. */
export const ACCESO_POR_ROL: Record<
  UserRole,
  { titulo: string; descripcion: string }
> = {
  cliente: {
    titulo: 'Esta sección es solo para clientes',
    descripcion:
      'Inicia sesión con tu cuenta de cliente para hacer pedidos y consultar el estado de tus compras.',
  },
  repartidor: {
    titulo: 'Esta sección es solo para repartidores',
    descripcion:
      'Inicia sesión con tu cuenta de repartidor para ver y tomar los pedidos disponibles.',
  },
}

/** Mensaje de error cuando la cuenta no pertenece al rol de la puerta usada. */
export const ERROR_ROL: Record<UserRole, string> = {
  cliente: 'Esa cuenta es de repartidor. Entra por el acceso de repartidor.',
  repartidor: 'Esa cuenta no es de repartidor. Entra por el acceso de cliente.',
}

/** Texto del error cuando la acción exige un rol y la sesión no lo tiene. */
export const ERROR_ACCION: Record<UserRole, string> = {
  cliente: 'Solo una cuenta de cliente puede hacer esta acción.',
  repartidor: 'Solo una cuenta de repartidor puede hacer esta acción.',
}
