import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  CartContext,
  buildCartItemId,
  loadStoredCart,
  storeCart,
  type CartItem,
  type NewCartItem,
} from '@/services/cart/cart'

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(loadStoredCart)

  useEffect(() => {
    storeCart(items)
  }, [items])

  const addItem = useCallback((newItem: NewCartItem) => {
    const id = buildCartItemId(newItem)
    const quantity = newItem.quantity ?? 1
    setItems((current) => {
      const existing = current.find((item) => item.id === id)
      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...current, { ...newItem, id, quantity }]
    })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const clearBusiness = useCallback((business: string) => {
    setItems((current) => current.filter((item) => item.business !== business))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clearBusiness, clear }),
    [items, addItem, updateQuantity, removeItem, clearBusiness, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
