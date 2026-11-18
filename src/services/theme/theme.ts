import { createContext, useContext } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  /** Lo que eligió la persona; "system" sigue la configuración del dispositivo. */
  preference: ThemePreference
  /** Tema que se está mostrando ahora. */
  isDark: boolean
  setPreference: (preference: ThemePreference) => void
}

export const THEME_STORAGE_KEY = 'theme'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return context
}

export function readStoredPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  } catch {
    return 'system'
  }
}
