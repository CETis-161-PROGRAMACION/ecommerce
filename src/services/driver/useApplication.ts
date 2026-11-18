import { useCallback } from 'react'
import { fetchMyApplication } from '@/services/driver/driver'
import { usePolled } from '@/services/driver/usePolled'

/** Estado de la solicitud de repartidor; se refresca por si la aprueban mientras está abierta la app. */
export function useApplication() {
  const load = useCallback(() => fetchMyApplication(), [])
  return usePolled(load, 30000)
}
