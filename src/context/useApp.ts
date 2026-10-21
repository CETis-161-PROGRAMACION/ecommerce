import { useContext } from 'react'
import { AppContext, type AppContextValue } from '@/context/appContext'

/**
 * Acceso al estado de la demostración (sesión, dirección, destinatario,
 * selección de producto y pedidos).
 */
export function useApp(): AppContextValue {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp debe usarse dentro de <AppProvider>')
  }

  return context
}
