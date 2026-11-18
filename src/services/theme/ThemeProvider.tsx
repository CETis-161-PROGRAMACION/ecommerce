import { useEffect, useState, type ReactNode } from 'react'
import {
  THEME_STORAGE_KEY,
  ThemeContext,
  readStoredPreference,
  type ThemePreference,
} from '@/services/theme/theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readStoredPreference)
  const [systemIsDark, setSystemIsDark] = useState(
    () => window.matchMedia(DARK_QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY)
    function handleChange(event: MediaQueryListEvent) {
      setSystemIsDark(event.matches)
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  const isDark = preference === 'system' ? systemIsDark : preference === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  function setPreference(next: ThemePreference) {
    setPreferenceState(next)
    try {
      if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento disponible, el tema solo dura mientras la página está abierta.
    }
  }

  return (
    <ThemeContext.Provider value={{ preference, isDark, setPreference }}>
      {children}
    </ThemeContext.Provider>
  )
}
