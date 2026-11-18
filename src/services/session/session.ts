import { createContext, useContext } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { UserProfile } from '@/services/auth'

export interface SessionContextValue {
  /** `loading` mientras se recupera la sesión guardada en el navegador. */
  status: 'loading' | 'signed-out' | 'signed-in'
  session: Session | null
  profile: UserProfile | null
  /** false mientras se descarga el perfil de un usuario con sesión. */
  profileLoaded: boolean
  refreshProfile: () => Promise<void>
}

export const SessionContext = createContext<SessionContextValue | null>(null)

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession debe usarse dentro de SessionProvider')
  }
  return context
}
