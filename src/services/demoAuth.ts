import { demoUsers } from '@/data/users'
import type { SessionUser, UserRole } from '@/types'

/**
 * Servicio de autenticación en modo demostración.
 *
 * Los datos viven en el navegador (ver `src/data/users.ts`): no hay backend,
 * ni SMS, ni persistencia en servidor. Cuando exista un servicio real, solo
 * se reemplaza el cuerpo de estas funciones y las pantallas no cambian.
 */

export const CODIGO_DEMO = '123456'

export interface ResultadoAuth {
  ok: boolean
  error?: string
  usuario?: SessionUser
}

export interface DatosRegistro {
  nombre: string
  fechaNacimiento: string
  telefono: string
  contrasena: string
  rol?: UserRole
}

function aSesion(usuario: (typeof demoUsers)[number]): SessionUser {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    telefono: usuario.telefono,
    rol: usuario.rol,
  }
}

/** Valida las credenciales contra los usuarios de demostración. */
export function loginDemo(telefono: string, contrasena: string): ResultadoAuth {
  const usuario = demoUsers.find((item) => item.telefono === telefono)

  if (!usuario) {
    return {
      ok: false,
      error: 'Ese número no está registrado en la demostración.',
    }
  }

  if (usuario.contrasena !== contrasena) {
    return { ok: false, error: 'La contraseña no coincide.' }
  }

  return { ok: true, usuario: aSesion(usuario) }
}

/** Registra un usuario nuevo en la sesión de demostración. */
export function registerDemo(datos: DatosRegistro): ResultadoAuth {
  if (demoUsers.some((item) => item.telefono === datos.telefono)) {
    return {
      ok: false,
      error: 'Ese número ya está registrado. Intenta iniciar sesión.',
    }
  }

  return {
    ok: true,
    usuario: {
      id: `usr-${datos.telefono}`,
      nombre: datos.nombre,
      telefono: datos.telefono,
      rol: datos.rol ?? 'cliente',
    },
  }
}

/** Confirma el código que la demostración muestra en pantalla. */
export function verifyDemoCode(telefono: string, codigo: string): boolean {
  if (!telefono) return false
  return codigo === CODIGO_DEMO
}
