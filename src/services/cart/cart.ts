import { createContext, useContext } from 'react'

export interface CartItem {
  id: string
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
  return [item.business, item.name, ...item.options].join('|')
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
