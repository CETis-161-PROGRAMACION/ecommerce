import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/login/LoginPage'
import { RecoveryPage } from '@/pages/recovery/RecoveryPage'
import { ConfirmCodePage } from '@/pages/register/ConfirmCodePage'
import { PrivacyPage } from '@/pages/privacy/PrivacyPage'
import { SplashPage } from '@/pages/splash/SplashPage'
import { ROUTES } from '@/router/routes'
import { HomePage } from '@/pages/home/HomePage'
import { ProductDetailPage } from '@/pages/product/ProductDetailPage'
import { RegisterPage } from '@/pages/register/RegisterPage'

export const router = createBrowserRouter([
  { path: ROUTES.splash, element: <SplashPage /> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.recovery, element: <RecoveryPage /> },
  { path: ROUTES.confirmCode, element: <ConfirmCodePage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.productDetail, element: <ProductDetailPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
])
