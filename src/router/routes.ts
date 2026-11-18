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
  productDetail: '/producto/principito',
  menu: '/sucursal/menu',
  infoPedido: '/info/pedido',
  sucursales: '/sucursales',
  clienteDireccion: '/pedido/direccion-cliente',
  infoTarjeta:'/informacion-tarjeta',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
