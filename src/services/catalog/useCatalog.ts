import { useEffect, useState } from 'react'
import { getCatalog, type Catalog } from '@/services/catalog/products'

export type CatalogState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; catalog: Catalog }

export function useCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({ status: 'loading' })

  useEffect(() => {
    let isActive = true
    getCatalog()
      .then((catalog) => {
        if (isActive) setState({ status: 'ready', catalog })
      })
      .catch((error: unknown) => {
        if (!isActive) return
        setState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'No pudimos cargar el catálogo.',
        })
      })
    return () => {
      isActive = false
    }
  }, [])

  return state
}
