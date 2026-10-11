export const ROUTES = {
  splash: '/',
  login: '/iniciar-sesion',
  recovery: '/recuperar-datos',
  confirmCode: '/registro/confirmar-codigo',

  privacy: '/registro/privacidad',
  home: '/home',
  productDetail: '/producto/principito',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
