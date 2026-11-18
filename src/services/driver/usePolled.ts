import { useEffect, useState } from 'react'

export interface Polled<T> {
  data: T | null
  error: string
  loading: boolean
  /** Vuelve a consultar de inmediato (por ejemplo tras aceptar un pedido). */
  reload: () => void
}

/**
 * Carga datos al montar y los refresca cada `intervalMs`.
 * `load` debe estar memorizada (useCallback) para no reiniciar el ciclo.
 */
export function usePolled<T>(load: () => Promise<T>, intervalMs = 8000): Polled<T> {
  const [state, setState] = useState<{
    data: T | null
    error: string
    loading: boolean
  }>({ data: null, error: '', loading: true })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let isActive = true

    async function run() {
      try {
        const data = await load()
        if (isActive) setState({ data, error: '', loading: false })
      } catch (caught) {
        if (!isActive) return
        setState((previous) => ({
          ...previous,
          loading: false,
          error:
            caught instanceof Error ? caught.message : 'No pudimos cargar los datos.',
        }))
      }
    }

    const firstLoad = window.setTimeout(run, 0)
    const timer = window.setInterval(run, intervalMs)
    return () => {
      isActive = false
      window.clearTimeout(firstLoad)
      window.clearInterval(timer)
    }
  }, [load, intervalMs, tick])

  return { ...state, reload: () => setTick((value) => value + 1) }
}
