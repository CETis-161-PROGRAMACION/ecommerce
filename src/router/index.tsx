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
import { AddressPage } from '@/pages/address/AddressPage'
import { DeliveryAccessPage } from '@/pages/delivery/DeliveryAccessPage'
import { DeliveryLoginPage } from '@/pages/delivery/DeliveryLoginPage'
import { DeliveryRegisterPage } from '@/pages/delivery/DeliveryRegisterPage'
import { UserDestiny } from '@/pages/user-destiny/UserDestiny'
import { OrderInfoPage } from '@/pages/order/OrderInfoPage'
import { OrderTrackingPage } from '@/pages/order-tracking/OrderTrackingPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { DeliveryOrdersPage } from '@/pages/delivery/DeliveryOrdersPage'
import { DeliveryOrderDetailPage } from '@/pages/delivery/DeliveryOrderDetailPage'

export const routes = [
  { path: ROUTES.splash, element: <SplashPage /> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.recovery, element: <RecoveryPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
  { path: ROUTES.confirmCode, element: <ConfirmCodePage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.productDetail, element: <ProductDetailPage /> },
  { path: ROUTES.userDestiny, element: <UserDestiny /> },
  { path: ROUTES.sucursales, element: <SucursalesPage /> },
  { path: ROUTES.menu, element: <MenuPage /> },
  { path: ROUTES.clienteDireccion, element: <AddressPage /> },
  { path: ROUTES.deliveryAccess, element: <DeliveryAccessPage /> },
  { path: ROUTES.deliveryLogin, element: <DeliveryLoginPage /> },
  { path: ROUTES.deliveryRegister, element: <DeliveryRegisterPage /> },
  { path: ROUTES.deliveryOrders, element: <DeliveryOrdersPage /> },
  { path: ROUTES.deliveryOrderDetail, element: <DeliveryOrderDetailPage /> },
  { path: ROUTES.orderInfo, element: <OrderInfoPage /> },
  { path: ROUTES.orderTracking, element: <OrderTrackingPage /> },
  { path: ROUTES.profile, element: <ProfilePage /> },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    errorElement: <NotFoundPage />,
  })),
)
