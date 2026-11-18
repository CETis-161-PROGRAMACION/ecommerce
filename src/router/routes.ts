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
  menu: '/sucursal/menu',
  infoPedido: '/info/pedido',
  tipoPago: '/pedido/tipo-de-pago',
  pedidoEnCamino: '/pedido/en-camino',
  pedidoEntregado: '/pedido/entregado',
  sucursales: '/sucursales',
  clienteDireccion: '/pedido/direccion-cliente',
  userDestiny: '/pedido/direccion-destinatario',
  businessInfo: '/informacion-negocio',
  infoTarjeta: '/informacion-tarjeta',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export function productPath(productId: string) {
  return ROUTES.productItem.replace(':productId', encodeURIComponent(productId))
}
