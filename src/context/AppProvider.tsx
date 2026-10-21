import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { demoOrders } from '@/data/orders'
import { findProduct } from '@/data/products'
import { storeName } from '@/data/stores'
import { AppContext, type AppContextValue } from '@/context/appContext'
import {
  loginDemo,
  registerDemo,
  type DatosRegistro,
} from '@/services/demoAuth'
import type {
  Address,
  Order,
  PaymentMethod,
  ProductSelection,
  Recipient,
  SessionUser,
} from '@/types'

const STORAGE_KEY = 'web-ecommerce-demo:v1'

interface DemoState {
  session: SessionUser | null
  address: Address | null
  recipient: Recipient | null
  selection: ProductSelection | null
  orders: Order[]
  ultimoPedidoId: string | null
  metodoPago: PaymentMethod
}

const initialState: DemoState = {
  session: null,
  address: null,
  recipient: null,
  selection: null,
  orders: demoOrders,
  ultimoPedidoId: null,
  metodoPago: 'credito',
}

function readStoredState(): DemoState {
  if (typeof window === 'undefined') return initialState

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as Partial<DemoState>
    return {
      session: parsed.session ?? null,
      address: parsed.address ?? null,
      recipient: parsed.recipient ?? null,
      selection: parsed.selection ?? null,
      ultimoPedidoId: parsed.ultimoPedidoId ?? null,
      metodoPago: parsed.metodoPago ?? 'credito',
      orders:
        Array.isArray(parsed.orders) && parsed.orders.length > 0
          ? parsed.orders
          : initialState.orders,
    }
  } catch {
    return initialState
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(readStoredState)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Si el navegador bloquea el almacenamiento seguimos solo en memoria.
    }
  }, [state])

  const login = useCallback((telefono: string, contrasena: string) => {
    const resultado = loginDemo(telefono, contrasena)
    if (resultado.ok && resultado.usuario) {
      setState((prev) => ({ ...prev, session: resultado.usuario ?? null }))
    }
    return {
      ok: resultado.ok,
      error: resultado.error,
      usuario: resultado.usuario,
    }
  }, [])

  const register = useCallback((datos: DatosRegistro) => {
    const resultado = registerDemo(datos)
    if (resultado.ok && resultado.usuario) {
      setState((prev) => ({ ...prev, session: resultado.usuario ?? null }))
    }
    return { ok: resultado.ok, error: resultado.error }
  }, [])

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, session: null }))
  }, [])

  const saveAddress = useCallback((address: Address) => {
    setState((prev) => ({ ...prev, address }))
  }, [])

  const saveRecipient = useCallback((recipient: Recipient) => {
    setState((prev) => ({ ...prev, recipient }))
  }, [])

  const saveSelection = useCallback((selection: ProductSelection) => {
    setState((prev) => ({ ...prev, selection }))
  }, [])

  const saveMetodoPago = useCallback((metodo: PaymentMethod) => {
    setState((prev) => ({ ...prev, metodoPago: metodo }))
  }, [])

  const createOrder = useCallback(
    (metodoEntrega: string): Order | null => {
      const product = state.selection
        ? findProduct(state.selection.productId)
        : undefined

      if (!product || !state.address || !state.recipient) return null

      const order: Order = {
        id: `ord-${Date.now()}`,
        storeId: product.storeId,
        sucursal: storeName(product.storeId).toUpperCase(),
        cliente: state.recipient.nombre,
        telefono: state.recipient.telefono,
        producto: product.nombre,
        precio: product.precio,
        metodoEntrega,
        direccion: `${state.address.calle} ${state.address.numero}, ${state.address.colonia}`,
        estado: 'disponible',
        hora: new Date().toLocaleTimeString('es-MX', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      }

      setState((prev) => ({
        ...prev,
        orders: [order, ...prev.orders],
        ultimoPedidoId: order.id,
      }))
      return order
    },
    [state.address, state.recipient, state.selection],
  )

  const acceptOrder = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId ? { ...order, estado: 'asignado' } : order,
      ),
    }))
  }, [])

  const deliverOrder = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId ? { ...order, estado: 'entregado' } : order,
      ),
    }))
  }, [])

  const resetDemo = useCallback(() => {
    setState(initialState)
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      esCliente: state.session?.rol === 'cliente',
      esRepartidor: state.session?.rol === 'repartidor',
      login,
      register,
      logout,
      saveAddress,
      saveRecipient,
      saveSelection,
      saveMetodoPago,
      createOrder,
      acceptOrder,
      deliverOrder,
      resetDemo,
    }),
    [
      state,
      login,
      register,
      logout,
      saveAddress,
      saveRecipient,
      saveSelection,
      saveMetodoPago,
      createOrder,
      acceptOrder,
      deliverOrder,
      resetDemo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
