export const ROUTES = {
  splash: '/',
  login: '/iniciar-sesion',
  recovery: '/recuperar-datos',
  confirmCode: '/registro/confirmar-codigo',
<<<<<<< HEAD
  privacy: '/registro/privacidad',
=======
  home: '/home',
>>>>>>> faacf95 (fix: explicacion a Esteban)
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
