import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/login/LoginPage'
import { RecoveryPage } from '@/pages/recovery/RecoveryPage'
import { ConfirmCodePage } from '@/pages/register/ConfirmCodePage'
import { PrivacyPage } from '@/pages/privacy/PrivacyPage'
import { SplashPage } from '@/pages/splash/SplashPage'
import { ROUTES } from '@/router/routes'
import { HomePage } from '@/pages/home/HomePage'
import { SucursalesPage } from '@/pages/sucursales/SucursalesPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { MenuPage } from '@/pages/menu/MenuPage'
import { ProductDetailPage } from '@/pages/product/ProductDetailPage'
import { RegisterPage } from '@/pages/register/RegisterPage'

const routes = [
  { path: ROUTES.splash, element: <SplashPage /> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.recovery, element: <RecoveryPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
  { path: ROUTES.confirmCode, element: <ConfirmCodePage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.productDetail, element: <ProductDetailPage /> },
  { path: ROUTES.sucursales, element: <SucursalesPage /> },
  { path: ROUTES.menu, element: <MenuPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    errorElement: <NotFoundPage />,
  })),
)
