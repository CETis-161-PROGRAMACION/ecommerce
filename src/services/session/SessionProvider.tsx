import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { fetchProfile, type UserProfile } from '@/services/auth'
import {
  SessionContext,
  type SessionContextValue,
} from '@/services/session/session'

interface SessionProviderProps {
  children: ReactNode
}

interface LoadedProfile {
  userId: string
  profile: UserProfile | null
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [isRestored, setIsRestored] = useState(false)
  const [loaded, setLoaded] = useState<LoadedProfile | null>(null)

  const userId = session?.user.id ?? null

  useEffect(() => {
    let isActive = true

    supabase.auth.getSession().then(({ data }) => {
      if (!isActive) return
      setSession(data.session)
      setIsRestored(true)
    })

    // Dentro de este callback solo se actualiza estado: no se llaman otras
    // funciones de supabase-js para evitar bloqueos.
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession)
        setIsRestored(true)
      },
    )

    return () => {
      isActive = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!userId) return
    let isActive = true
    fetchProfile(userId).then((profile) => {
      if (isActive) setLoaded({ userId, profile })
    })
    return () => {
      isActive = false
    }
  }, [userId])

  const refreshProfile = useCallback(async () => {
    if (!userId) return
    const profile = await fetchProfile(userId)
    setLoaded({ userId, profile })
  }, [userId])

  const value = useMemo<SessionContextValue>(() => {
    const matches = loaded !== null && loaded.userId === userId
    return {
      status: !isRestored ? 'loading' : session ? 'signed-in' : 'signed-out',
      session,
      profile: matches ? loaded.profile : null,
      profileLoaded: userId === null || matches,
      refreshProfile,
    }
  }, [isRestored, session, loaded, userId, refreshProfile])

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
