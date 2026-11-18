export const ROUTES = {
  splash: '/',
  login: '/iniciar-sesion',
  recovery: '/recuperar-datos/confirm-recovery',
  register: '/registro',
  confirmCode: '/registro/confirmar-codigo',
  codeConfirm: '/confirmar-codigo',
  privacy: '/registro/privacidad',
  home: '/inicio',
  deliveryAccess: '/repartidor',
  deliveryLogin: '/repartidor/iniciar-sesion',
  deliveryRegister: '/repartidor/registro',
  deliveryVehicle: '/repartidor/registro/vehiculo',
  deliveryHome: '/repartidor/inicio',
  deliveryOrders: '/repartidor/pedidos',
  deliveryOrderDetail: '/repartidor/pedidos/:pedidoId',
  productDetail: '/producto/principito',
  productItem: '/producto/:productId',
  menu: '/negocio/:slug/menu',
  infoPedido: '/info/pedido',
  tipoPago: '/pedido/tipo-de-pago',
  pedidoEnCamino: '/pedido/en-camino/:orderId',
  pedidoEntregado: '/pedido/entregado/:orderId',
  sucursales: '/sucursales',
  clienteDireccion: '/pedido/direccion-cliente',
  userDestiny: '/pedido/direccion-destinatario',
  businessInfo: '/negocio/:slug',
  settings: '/ajustes',
  help: '/ayuda',
  about: '/acerca-de',
  orders: '/pedidos',
  account: '/cuenta',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export function productPath(productId: string) {
  return ROUTES.productItem.replace(':productId', encodeURIComponent(productId))
}

export function businessPath(slug: string) {
  return ROUTES.businessInfo.replace(':slug', encodeURIComponent(slug))
}

export function menuPath(slug: string) {
  return ROUTES.menu.replace(':slug', encodeURIComponent(slug))
}

export function orderTrackingPath(orderId: string) {
  return ROUTES.pedidoEnCamino.replace(':orderId', encodeURIComponent(orderId))
}

export function orderDeliveredPath(orderId: string) {
  return ROUTES.pedidoEntregado.replace(':orderId', encodeURIComponent(orderId))
}

export function deliveryOrderPath(orderId: string) {
  return ROUTES.deliveryOrderDetail.replace(
    ':pedidoId',
    encodeURIComponent(orderId),
  )
}
