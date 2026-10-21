import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { useApp } from '@/context/useApp'
import {
  ACCESO_POR_ROL,
  HOME_POR_ROL,
  LOGIN_POR_ROL,
  NOMBRE_ROL,
} from '@/utils/roles'
import type { UserRole } from '@/types'

interface RoleGateProps {
  /**
   * Rol exigido para ver el contenido. Si se omite, basta con tener una
   * sesión iniciada (cualquier rol).
   */
  rol?: UserRole
  children: ReactNode
}

/**
 * Guarda de acceso por rol.
 *
 * Si la sesión cumple el requisito se renderiza el contenido tal cual; si
 * no, se muestra un panel de acceso restringido que explica el motivo y
 * ofrece la puerta correcta. Nunca redirige en silencio: el usuario siempre
 * ve por qué no puede entrar.
 */
export function RoleGate({ rol, children }: RoleGateProps) {
  const { session, logout } = useApp()
  const navigate = useNavigate()

  if (session && (!rol || session.rol === rol)) {
    return <>{children}</>
  }

  const rolObjetivo: UserRole = rol ?? 'cliente'
  const rolContrario: UserRole =
    rolObjetivo === 'cliente' ? 'repartidor' : 'cliente'

  const titulo = rol
    ? ACCESO_POR_ROL[rolObjetivo].titulo
    : 'Inicia sesión para ver tu perfil'

  const descripcion = rol
    ? ACCESO_POR_ROL[rolObjetivo].descripcion
    : 'Necesitas una sesión activa para ver esta información.'

  function irAlInicio() {
    navigate(HOME_POR_ROL[session?.rol ?? 'cliente'])
  }

  function cambiarDePuerta() {
    logout()
    navigate(LOGIN_POR_ROL[rolObjetivo])
  }

  return (
    <NavBar>
      <div className="mx-auto w-full max-w-2xl pb-16">
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-xs sm:p-10">
          <p className="notice notice-warning">Acceso restringido</p>

          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {titulo}
          </h1>

          <p className="mt-3 text-base text-ink-muted">{descripcion}</p>

          {session ? (
            <p className="mt-4 text-sm font-semibold text-ink">
              Ahora estás conectado como {session.nombre} (
              {NOMBRE_ROL[session.rol].toLowerCase()}).
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {session ? (
              <>
                <Button type="button" onClick={cambiarDePuerta}>
                  Cerrar sesión y entrar como{' '}
                  {NOMBRE_ROL[rolObjetivo].toLowerCase()}
                </Button>
                <Button type="button" variant="ghost" onClick={irAlInicio}>
                  Volver a mi inicio
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => navigate(LOGIN_POR_ROL[rolObjetivo])}
                >
                  Iniciar sesión como {NOMBRE_ROL[rolObjetivo].toLowerCase()}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(LOGIN_POR_ROL[rolContrario])}
                >
                  Entrar como {NOMBRE_ROL[rolContrario].toLowerCase()}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </NavBar>
  )
}
