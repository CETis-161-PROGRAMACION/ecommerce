import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { Bike, Package, UserRound } from 'lucide-react'

import { ROUTES, deliveryOrderPath } from '@/router/routes'
import { signOut } from '@/services/auth'
import {
  fetchMyDeliveries,
  type ApplicationStatus,
} from '@/services/driver/driver'
import { useApplication } from '@/services/driver/useApplication'
import { usePolled } from '@/services/driver/usePolled'
import { useSession } from '@/services/session/session'
import { formatPrice } from '@/utils/currency'

const APPLICATION_TEXT: Record<
  ApplicationStatus,
  { title: string; body: string }
> = {
  pending: {
    title: 'Solicitud en revisión',
    body: 'Estamos revisando tu licencia. Cuando te aprueben podrás aceptar pedidos.',
  },
  approved: {
    title: 'Cuenta aprobada',
    body: 'Ya puedes aceptar pedidos disponibles.',
  },
  rejected: {
    title: 'Solicitud rechazada',
    body: 'Revisa tus datos y vuelve a enviar tu licencia.',
  },
}

export function DeliveryHomePage() {
  const navigate = useNavigate()
  const { profile } = useSession()
  const application = useApplication()
  const loadDeliveries = useCallback(() => fetchMyDeliveries(), [])
  const deliveries = usePolled(loadDeliveries)
  const [signOutError, setSignOutError] = useState('')

  const status = application.data?.status
  const active = (deliveries.data ?? []).filter(
    (item) => item.deliveryStatus !== 'delivered',
  )
  const finished = (deliveries.data ?? []).filter(
    (item) => item.deliveryStatus === 'delivered',
  )

  async function handleSignOut() {
    try {
      await signOut()
      navigate(ROUTES.deliveryAccess, { replace: true })
    } catch (caught) {
      setSignOutError(
        caught instanceof Error ? caught.message : 'No pudimos cerrar sesión.',
      )
    }
  }

  return (
    <main className="min-h-screen bg-background motion-safe:animate-page-enter">
      <header className="flex w-full items-center justify-between gap-3 border-b border-line px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3 text-ink">
          <Bike size={27} />
          <span className="font-bold">Panel del repartidor</span>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-ink transition hover:bg-brand-100"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-navy-900">
            <UserRound size={30} />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-ink">
              {profile?.fullName ?? 'Repartidor'}
            </h1>
            <p className="text-sm text-ink-muted">
              {application.data?.vehicle ?? 'Sin vehículo registrado'}
            </p>
          </div>
        </div>

        {signOutError && (
          <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">
            {signOutError}
          </p>
        )}

        {application.loading ? (
          <p role="status" className="text-sm text-ink-muted">
            Cargando…
          </p>
        ) : !application.data ? (
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-bold text-ink">Falta tu solicitud</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Registra tu vehículo y la foto de tu licencia para empezar.
            </p>
            <Link
              to={ROUTES.deliveryVehicle}
              className="mt-4 inline-block rounded-xl bg-brand-400 px-5 py-3 text-sm font-bold text-white hover:bg-brand-500"
            >
              Completar solicitud
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-bold text-ink">
              {APPLICATION_TEXT[application.data.status].title}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {APPLICATION_TEXT[application.data.status].body}
            </p>
            {application.data.status === 'rejected' && (
              <Link
                to={ROUTES.deliveryVehicle}
                className="mt-4 inline-block rounded-xl bg-brand-400 px-5 py-3 text-sm font-bold text-white hover:bg-brand-500"
              >
                Volver a enviar
              </Link>
            )}
          </div>
        )}

        {status === 'approved' && (
          <Link
            to={ROUTES.deliveryOrders}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 py-4 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            <Package size={20} />
            Ver pedidos disponibles
          </Link>
        )}

        <section aria-labelledby="active-title">
          <h2 id="active-title" className="mb-3 text-lg font-bold text-ink">
            Mis entregas en curso
          </h2>
          {deliveries.error && (
            <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">
              {deliveries.error}
            </p>
          )}
          {active.length === 0 ? (
            <p className="rounded-xl border border-line p-6 text-center text-sm text-ink-muted">
              No tienes entregas en curso.
            </p>
          ) : (
            <ul className="space-y-3">
              {active.map(({ order, deliveryStatus }) => (
                <li key={order.id}>
                  <Link
                    to={deliveryOrderPath(order.id)}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 shadow-sm transition hover:border-brand-200"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold text-ink">
                        {order.businessName}
                      </p>
                      <p className="truncate text-sm text-ink-muted">
                        {order.deliveryAddress ?? 'Sin dirección'}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold text-ink">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-xs font-semibold text-brand-500">
                        {deliveryStatus === 'assigned'
                          ? 'Por recoger'
                          : 'En camino'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {finished.length > 0 && (
          <section aria-labelledby="done-title">
            <h2 id="done-title" className="mb-3 text-lg font-bold text-ink">
              Entregadas
            </h2>
            <ul className="space-y-2">
              {finished.map(({ order }) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm text-ink-muted"
                >
                  <span className="truncate">{order.businessName}</span>
                  <span className="font-semibold text-ink">
                    {formatPrice(order.total)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  )
}
