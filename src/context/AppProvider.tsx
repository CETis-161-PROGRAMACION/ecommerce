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
  UserRole,
} from '@/types'
import { ERROR_ACCION, ERROR_ROL } from '@/utils/roles'

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

  /**
   * Inicia sesión en la demostración.
   *
   * Si se indica `rolEsperado`, la cuenta debe pertenecer a ese rol: cuando
   * no coincide se devuelve el error **y no se crea la sesión**, para que
   * entrar por la puerta equivocada no deje al usuario conectado.
   */
  const login = useCallback(
    (telefono: string, contrasena: string, rolEsperado?: UserRole) => {
      const resultado = loginDemo(telefono, contrasena)
      const usuario = resultado.usuario

      if (!resultado.ok || !usuario) {
        return { ok: false, error: resultado.error, usuario }
      }

      if (rolEsperado && usuario.rol !== rolEsperado) {
        return { ok: false, error: ERROR_ROL[rolEsperado], usuario }
      }

      setState((prev) => ({ ...prev, session: usuario }))
      return { ok: true, usuario }
    },
    [],
  )

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

  /**
   * Crea un pedido. Solo una cuenta de cliente puede comprar: cualquier otro
   * rol (o la ausencia de sesión) devuelve `null` y no registra el pedido.
   */
  const createOrder = useCallback(
    (metodoEntrega: string): Order | null => {
      if (state.session?.rol !== 'cliente') return null

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
    [state.address, state.recipient, state.selection, state.session],
  )

  /**
   * Acepta (toma) un pedido. Solo un repartidor puede hacerlo: si la sesión
   * no es de repartidor el pedido conserva su estado y se devuelve el error.
   */
  const acceptOrder = useCallback(
    (orderId: string): { ok: boolean; error?: string } => {
      if (state.session?.rol !== 'repartidor') {
        return { ok: false, error: ERROR_ACCION.repartidor }
      }

      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === orderId ? { ...order, estado: 'asignado' } : order,
        ),
      }))

      return { ok: true }
    },
    [state.session],
  )

  /** Marca un pedido como entregado. Solo un repartidor puede hacerlo. */
  const deliverOrder = useCallback(
    (orderId: string): { ok: boolean; error?: string } => {
      if (state.session?.rol !== 'repartidor') {
        return { ok: false, error: ERROR_ACCION.repartidor }
      }

      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === orderId ? { ...order, estado: 'entregado' } : order,
        ),
      }))

      return { ok: true }
    },
    [state.session],
  )

  /**
   * El cliente confirma que recibió su pedido. Solo aplica al pedido que él
   * mismo acaba de crear en esta sesión, nunca al de otra cuenta.
   */
  const confirmReceipt = useCallback(
    (orderId: string): { ok: boolean; error?: string } => {
      if (state.session?.rol !== 'cliente') {
        return { ok: false, error: ERROR_ACCION.cliente }
      }

      if (state.ultimoPedidoId !== orderId) {
        return {
          ok: false,
          error: 'Solo puedes confirmar la recepción de tu propio pedido.',
        }
      }

      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === orderId ? { ...order, estado: 'entregado' } : order,
        ),
      }))

      return { ok: true }
    },
    [state.session, state.ultimoPedidoId],
  )

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
      confirmReceipt,
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
      confirmReceipt,
      resetDemo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
