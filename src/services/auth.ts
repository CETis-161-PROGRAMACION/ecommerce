// TODO: reemplazar cada función por una llamada real al backend
// cuando exista. Las pantallas no deberían cambiar.

const RETARDO_MS = 700
const CODIGO_DEMO = "123456"

function esperar(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export interface DatosNuevoUsuario {
  nombre: string
  fechaNacimiento: string // formato AAAA-MM-DD
  telefono: string
  contrasena: string
}

export async function registerUser(datos: DatosNuevoUsuario): Promise<void> {
  await esperar(RETARDO_MS)
  // TODO: POST /auth/register
  console.info('[demo] registro simulado para', datos.telefono)
}

export async function verifyCode(
  telefono: string,
  codigo: string,
): Promise<{ ok: boolean }> {
  await esperar(RETARDO_MS)
  // TODO: POST /auth/verify
  console.info('[demo] verificando código de', telefono)
  return { ok: codigo === CODIGO_DEMO }
}

export async function resendCode(telefono: string): Promise<void> {
  await esperar(RETARDO_MS)
  // TODO: POST /auth/resend-code
  console.info('[demo] código reenviado a', telefono)
}
