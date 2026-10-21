import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { Card, CardTitle } from '@/components/ui/Card'
import { CheckIcon } from '@/components/ui/CheckIcon'
import { MastercardIcon } from '@/components/ui/MastercardIcon'
import { UserIcon } from '@/components/ui/UserIcon'
import { useApp } from '@/context/useApp'
import { LOGIN_POR_ROL } from '@/utils/roles'
import type { PaymentMethod } from '@/types'

const metodos: { id: PaymentMethod; etiqueta: string; conIcono: boolean }[] = [
  { id: 'credito', etiqueta: 'Tarjeta de crédito', conIcono: true },
  { id: 'debito', etiqueta: 'Tarjeta de débito', conIcono: true },
  { id: 'presencial', etiqueta: 'Pago presencial', conIcono: false },
]

export function ProfilePage() {
  const navigate = useNavigate()
  const { session, metodoPago, saveMetodoPago, logout } = useApp()

  const nombre = session?.nombre ?? 'Invitado'
  const telefono = session?.telefono ?? ''

  function cerrarSesion() {
    logout()
    navigate(LOGIN_POR_ROL[session?.rol ?? 'cliente'])
  }

  return (
    <NavBar>
      <div className="mx-auto flex w-full max-w-lg flex-col items-center pb-20">
        <h1 className="mb-8 text-sm font-extrabold uppercase tracking-widest text-ink-muted sm:text-base">
          Perfil
        </h1>

        <div className="mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-neutral-soft shadow-inner sm:h-44 sm:w-44">
          <UserIcon className="h-24 w-24 text-neutral-strong sm:h-28 sm:w-28" />
        </div>

        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          {nombre}
        </h2>
        <p className="mt-1 text-base font-semibold text-ink-muted sm:text-lg">
          +52 {telefono}
        </p>

        <Card className="mt-10 w-full text-left">
          <CardTitle>Método de pago</CardTitle>

          <div className="mt-4 space-y-3">
            {metodos.map((metodo) => {
              const seleccionado = metodoPago === metodo.id
              return (
                <button
                  key={metodo.id}
                  type="button"
                  onClick={() => saveMetodoPago(metodo.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border bg-surface p-4 text-base font-semibold shadow-xs transition-colors ${
                    seleccionado
                      ? 'border-brand-400 bg-brand-100/40 text-navy-900'
                      : 'border-line text-ink hover:border-brand-400'
                  }`}
                >
                  <span>{metodo.etiqueta}</span>
                  <span className="flex items-center gap-3">
                    {metodo.conIcono ? <MastercardIcon size={32} /> : null}
                    {seleccionado ? (
                      <span className="text-brand-400">
                        <CheckIcon size={18} />
                      </span>
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-xs text-ink-muted">
            Modo demostración: no se guardan datos de tarjetas reales.
          </p>
        </Card>

        <Button
          type="button"
          variant="outline"
          onClick={cerrarSesion}
          className="mt-8 w-full"
        >
          Cerrar sesión
        </Button>
      </div>
    </NavBar>
  )
}
