import { createContext, useContext } from 'react'

export interface CartItem {
  id: string
  /** UUID del producto en la base. */
  productId: string
  business: string
  name: string
  options: readonly string[]
  price: number
  quantity: number
  image: string
}

export type NewCartItem = Omit<CartItem, 'id' | 'quantity'> & {
  quantity?: number
}

export interface BusinessOrder {
  business: string
  items: CartItem[]
  subtotal: number
}

export interface CartContextValue {
  items: CartItem[]
  addItem: (item: NewCartItem) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearBusiness: (business: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}

export function buildCartItemId(item: NewCartItem) {
  return [item.productId, ...item.options].join('|')
}

export function groupByBusiness(items: readonly CartItem[]): BusinessOrder[] {
  const orders = new Map<string, BusinessOrder>()
  for (const item of items) {
    const order = orders.get(item.business) ?? {
      business: item.business,
      items: [],
      subtotal: 0,
    }
    order.items.push(item)
    order.subtotal += item.price * item.quantity
    orders.set(item.business, order)
  }
  return [...orders.values()]
}

const STORAGE_KEY = 'ecommerce:cart:v1'

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.business === 'string' &&
    typeof item.name === 'string' &&
    Array.isArray(item.options) &&
    item.options.every((option) => typeof option === 'string') &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    typeof item.image === 'string'
  )
}

/** Lee el carrito guardado en este navegador; ignora datos dañados. */
export function loadStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : []
  } catch {
    return []
  }
}

export function storeCart(items: readonly CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // El navegador puede bloquear el almacenamiento; el carrito sigue en memoria.
  }
}
