import { supabase } from '@/lib/supabase'
import { invalidateCatalog } from '@/services/catalog/products'
import type { PaymentMethod } from '@/services/payment/paymentMethods'
import type { PickupMethod } from '@/services/order/orderDetails'
import { assetUrl } from '@/utils/assets'

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled'

export interface PlaceOrderInput {
  items: readonly {
    productId: string
    quantity: number
    options: readonly string[]
  }[]
  pickupMethod: PickupMethod
  addressId: string | null
  recipientName: string
  recipientPhone: string
  paymentMethod: PaymentMethod
  notes?: string
}

export interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  options: string[]
  name: string
  image: string | null
}

export interface Order {
  id: string
  branchId: string | null
  status: OrderStatus
  pickupMethod: PickupMethod
  subtotal: number
  serviceFee: number
  total: number
  deliveryAddress: string | null
  recipientName: string | null
  recipientPhone: string | null
  paymentMethod: PaymentMethod | null
  notes: string | null
  createdAt: string
  items: OrderItem[]
}

export interface OrderSummaryRow {
  id: string
  status: OrderStatus
  pickupMethod: PickupMethod
  total: number
  createdAt: string
}

export interface DriverContact {
  fullName: string
  phone: string | null
}

const GENERIC_ERROR = 'No pudimos completar la operación. Inténtalo de nuevo.'

/** Códigos con los que las funciones de la base envían mensajes pensados para el usuario. */
const USER_FACING_CODES = new Set(['22023', 'P0002', '28000', '42501'])

function rpcError(error: { code?: string; message?: string }): Error {
  if (error.code && USER_FACING_CODES.has(error.code) && error.message) {
    return new Error(error.message)
  }
  return new Error(GENERIC_ERROR)
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Esperando repartidor',
  accepted: 'Repartidor asignado',
  on_the_way: 'En camino',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

/** Avance (0–100) para la barra de seguimiento. */
export function statusProgress(status: OrderStatus, pickup: PickupMethod) {
  if (status === 'delivered') return 100
  if (status === 'cancelled') return 0
  if (status === 'on_the_way') return 65
  if (status === 'accepted') return 30
  return pickup === 'pickup' ? 50 : 10
}

export async function placeOrder(input: PlaceOrderInput): Promise<string> {
  const { data, error } = await supabase.rpc('place_order', {
    p_items: input.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      options: item.options,
    })),
    p_pickup_method: input.pickupMethod,
    p_address_id: input.addressId,
    p_recipient_name: input.recipientName,
    p_recipient_phone: input.recipientPhone,
    p_payment_method: input.paymentMethod,
    p_notes: input.notes ?? null,
  })
  if (error) throw rpcError(error)
  invalidateCatalog()
  return data as string
}

export async function cancelOrder(orderId: string) {
  const { error } = await supabase.rpc('cancel_order', { p_order: orderId })
  if (error) throw rpcError(error)
  invalidateCatalog()
}

export async function confirmOrderReceived(orderId: string) {
  const { error } = await supabase.rpc('confirm_order_received', {
    p_order: orderId,
  })
  if (error) throw rpcError(error)
}

export async function fetchDriverContact(
  orderId: string,
): Promise<DriverContact | null> {
  const { data, error } = await supabase.rpc('order_driver_contact', {
    p_order: orderId,
  })
  if (error || !Array.isArray(data) || data.length === 0) return null
  const row = data[0] as { full_name: string; phone: string | null }
  return { fullName: row.full_name, phone: row.phone }
}

interface OrderItemRow {
  id: string
  quantity: number
  unit_price: number | string
  options: string[] | null
  products: { name: string; image_url: string } | null
}

interface OrderRow {
  id: string
  branchId: string | null
  status: OrderStatus
  pickup_method: PickupMethod
  subtotal: number | string
  service_fee: number | string
  total: number | string
  delivery_address: string | null
  recipient_name: string | null
  recipient_phone: string | null
  payment_method: PaymentMethod | null
  notes: string | null
  created_at: string
  order_items: OrderItemRow[] | null
}

const ORDER_COLUMNS = `id, branchId, status, pickup_method, subtotal, service_fee, total,
  delivery_address, recipient_name, recipient_phone, payment_method, notes, created_at,
  order_items ( id, quantity, unit_price, options, products ( name, image_url ) )`

function toOrder(row: OrderRow): Order {
  return {
    id: row.id,
    branchId: row.branchId,
    status: row.status,
    pickupMethod: row.pickup_method,
    subtotal: Number(row.subtotal),
    serviceFee: Number(row.service_fee),
    total: Number(row.total),
    deliveryAddress: row.delivery_address,
    recipientName: row.recipient_name,
    recipientPhone: row.recipient_phone,
    paymentMethod: row.payment_method,
    notes: row.notes,
    createdAt: row.created_at,
    items: (row.order_items ?? []).map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      options: item.options ?? [],
      // El producto puede no verse si ya se agotó o caducó.
      name: item.products?.name ?? 'Producto no disponible',
      image: item.products?.image_url ? assetUrl(item.products.image_url) : null,
    })),
  }
}

export async function fetchOrder(orderId: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(ORDER_COLUMNS)
    .eq('id', orderId)
    .maybeSingle()
  if (error) throw new Error('No pudimos cargar el pedido.')
  return data ? toOrder(data as unknown as OrderRow) : null
}

interface OrderSummaryDbRow {
  id: string
  status: OrderStatus
  pickup_method: PickupMethod
  total: number | string
  created_at: string
}

/** Pedidos del cliente con sesión iniciada, del más reciente al más antiguo. */
export async function fetchMyOrders(limit = 20): Promise<OrderSummaryRow[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('id, status, pickup_method, total, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw new Error('No pudimos cargar tus pedidos.')
  return ((data ?? []) as OrderSummaryDbRow[]).map((row) => ({
    id: row.id,
    status: row.status,
    pickupMethod: row.pickup_method,
    total: Number(row.total),
    createdAt: row.created_at,
  }))
}

/** Calificación que el cliente ya dio a este pedido, o null si aún no califica. */
export async function fetchReviewRating(orderId: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('orderId', orderId)
    .maybeSingle()
  if (error || !data) return null
  return (data as { rating: number }).rating
}

export async function submitReview(input: {
  orderId: string
  userId: string
  branchId: string | null
  rating: number
}) {
  const { error } = await supabase.from('reviews').insert({
    userId: input.userId,
    branchId: input.branchId,
    orderId: input.orderId,
    rating: input.rating,
  })
  if (error) throw new Error('No pudimos guardar tu calificación.')
}
