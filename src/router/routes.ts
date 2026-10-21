export const ROUTES = {
  splash: '/',
  login: '/iniciar-sesion',
  recovery: '/recuperar-datos',
  register: '/registro',
  confirmCode: '/registro/confirmar-codigo',
  privacy: '/registro/privacidad',
  home: '/inicio',
  deliveryAccess: '/repartidor',
  deliveryLogin: '/repartidor/iniciar-sesion',
  deliveryRegister: '/repartidor/registro',
  deliveryOrders: '/repartidor/pedidos',
  deliveryOrderDetail: '/repartidor/pedido/activo',
  productDetail: '/producto/principito',
  menu: '/sucursal/menu',
  sucursales: '/sucursales',
  clienteDireccion: '/pedido/direccion-cliente',
  userDestiny: '/pedido/direccion-destinatario',
  orderInfo: '/pedido/informacion',
  orderTracking: '/pedido/seguimiento',
  profile: '/perfil',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
