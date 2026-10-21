import { createContext } from 'react'
import type {
  Address,
  Order,
  PaymentMethod,
  ProductSelection,
  Recipient,
  SessionUser,
  UserRole,
} from '@/types'
import type { DatosRegistro } from '@/services/demoAuth'

export interface AppContextValue {
  session: SessionUser | null
  address: Address | null
  recipient: Recipient | null
  selection: ProductSelection | null
  orders: Order[]
  ultimoPedidoId: string | null
  metodoPago: PaymentMethod
  esCliente: boolean
  esRepartidor: boolean
  login: (
    telefono: string,
    contrasena: string,
    rolEsperado?: UserRole,
  ) => { ok: boolean; error?: string; usuario?: SessionUser }
  register: (datos: DatosRegistro) => { ok: boolean; error?: string }
  logout: () => void
  saveAddress: (address: Address) => void
  saveRecipient: (recipient: Recipient) => void
  saveSelection: (selection: ProductSelection) => void
  saveMetodoPago: (metodo: PaymentMethod) => void
  createOrder: (metodoEntrega: string) => Order | null
  acceptOrder: (orderId: string) => { ok: boolean; error?: string }
  deliverOrder: (orderId: string) => { ok: boolean; error?: string }
  confirmReceipt: (orderId: string) => { ok: boolean; error?: string }
  resetDemo: () => void
}

/**
 * Contexto de la demostración. Vive en su propio archivo para que el módulo
 * del proveedor exporte solo componentes (regla de fast refresh).
 */
export const AppContext = createContext<AppContextValue | null>(null)
