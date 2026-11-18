import { supabase } from '@/lib/supabase'

export interface NewUserData {
  email: string
  password: string
  fullName: string
  /** Formato AAAA-MM-DD */
  birthDate: string
  /** 10 dígitos, sin lada */
  phone: string
  role?: 'customer' | 'driver'
}

export type UserRole = 'customer' | 'business_owner' | 'driver' | 'admin'

export interface UserProfile {
  id: string
  role: UserRole
  isActive: boolean
  email: string
  phone: string | null
  fullName: string
  avatarUrl: string | null
  birthDate: string | null
}

interface SupabaseErrorLike {
  message?: string
  code?: string
  status?: number
}

const GENERIC_ERROR = 'Ocurrió un problema. Inténtalo de nuevo.'

/** Traduce los errores de Supabase Auth a mensajes en español para el usuario. */
export function translateAuthError(error: SupabaseErrorLike): string {
  const code = error.code ?? ''
  const message = (error.message ?? '').toLowerCase()

  if (code === 'user_already_exists' || message.includes('already registered')) {
    return 'Ya existe una cuenta con ese correo.'
  }
  if (code === 'invalid_credentials' || message.includes('invalid login')) {
    return 'Correo o contraseña incorrectos.'
  }
  if (code === 'email_not_confirmed') {
    return 'Confirma tu correo antes de iniciar sesión.'
  }
  if (code === 'weak_password') {
    return 'La contraseña es demasiado débil. Usa al menos 8 caracteres.'
  }
  if (code === 'same_password') {
    return 'La nueva contraseña debe ser distinta a la anterior.'
  }
  if (
    code === 'otp_expired' ||
    message.includes('expired') ||
    (message.includes('invalid') && message.includes('token'))
  ) {
    return 'El código es incorrecto o ya expiró. Revísalo o solicita uno nuevo.'
  }
  if (
    code === 'over_email_send_rate_limit' ||
    code === 'over_request_rate_limit' ||
    error.status === 429
  ) {
    return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.'
  }
  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'No hay conexión con el servidor. Revisa tu internet.'
  }
  return GENERIC_ERROR
}

/**
 * Crea la cuenta. Si el proyecto exige confirmar el correo, `needsConfirmation`
 * es true y hay que pedir el código que llega al correo.
 */
export async function signUp(
  data: NewUserData,
): Promise<{ needsConfirmation: boolean }> {
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        birth_date: data.birthDate,
        phone: data.phone,
        role: data.role ?? 'customer',
      },
    },
  })
  if (error) throw new Error(translateAuthError(error))

  // Con la confirmación activa, un correo ya registrado no devuelve error:
  // regresa un usuario sin identidades.
  if (result.user && result.user.identities?.length === 0) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }
  return { needsConfirmation: result.session === null }
}

export async function verifySignupCode(email: string, code: string) {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'email',
  })
  if (error) throw new Error(translateAuthError(error))
}

export async function resendSignupCode(email: string) {
  const { error } = await supabase.auth.resend({ type: 'signup', email })
  if (error) throw new Error(translateAuthError(error))
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(translateAuthError(error))
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(translateAuthError(error))
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw new Error(translateAuthError(error))
}

/** Valida el código de recuperación; si es correcto, inicia una sesión temporal. */
export async function verifyRecoveryCode(email: string, code: string) {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'recovery',
  })
  if (error) throw new Error(translateAuthError(error))
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(translateAuthError(error))
}

interface ProfileRow {
  id: string
  role: UserRole
  is_active: boolean
  email: string
  phone: string | null
  full_name: string
  avatar_url: string | null
  birth_date: string | null
}

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, role, is_active, email, phone, full_name, avatar_url, birth_date')
    .eq('id', userId)
    .maybeSingle()
  if (error || !data) return null
  const row = data as ProfileRow
  return {
    id: row.id,
    role: row.role,
    isActive: row.is_active,
    email: row.email,
    phone: row.phone,
    fullName: row.full_name,
    avatarUrl: row.avatar_url,
    birthDate: row.birth_date,
  }
}

/** Actualiza solo las columnas que la base permite editar al propio usuario. */
export async function updateProfile(
  userId: string,
  changes: { fullName?: string; phone?: string; birthDate?: string },
) {
  const values: Record<string, string> = {}
  if (changes.fullName !== undefined) values.full_name = changes.fullName
  if (changes.phone !== undefined) values.phone = changes.phone
  if (changes.birthDate !== undefined) values.birth_date = changes.birthDate
  const { error } = await supabase.from('users').update(values).eq('id', userId)
  if (error) throw new Error('No pudimos guardar tus datos. Inténtalo de nuevo.')
}
