import { supabase } from '@/lib/supabase'
import { getCatalog } from '@/services/catalog/products'
import { fetchOrder, type Order } from '@/services/order/orders'

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface DriverApplication {
  vehicle: string
  status: ApplicationStatus
}

export type DeliveryStatus = 'assigned' | 'picked_up' | 'delivered'

/** Pedido tal como lo ve el repartidor, con el nombre del negocio ya resuelto. */
export interface DriverOrder extends Order {
  businessName: string
  branchName: string
  branchAddress: string
}

export interface MyDelivery {
  order: DriverOrder
  deliveryStatus: DeliveryStatus
}

const GENERIC_ERROR = 'No pudimos completar la operación. Inténtalo de nuevo.'
const USER_FACING_CODES = new Set(['22023', 'P0002', '28000', '42501'])

const LICENSE_BUCKET = 'driver-licenses'
const MAX_LICENSE_BYTES = 5 * 1024 * 1024
const LICENSE_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
}

function rpcError(error: { code?: string; message?: string }): Error {
  if (error.code && USER_FACING_CODES.has(error.code) && error.message) {
    return new Error(error.message)
  }
  return new Error(GENERIC_ERROR)
}

export async function fetchMyApplication(): Promise<DriverApplication | null> {
  const { data, error } = await supabase
    .from('driver_applications')
    .select('vehicle, status')
    .maybeSingle()
  if (error) throw new Error('No pudimos consultar tu solicitud.')
  return (data as DriverApplication | null) ?? null
}

/**
 * Sube la foto de la licencia y registra la solicitud. Si ya había una que
 * no está aprobada, la actualiza y vuelve a dejarla en revisión.
 */
export async function submitApplication(input: {
  userId: string
  vehicle: string
  license: File
}) {
  const extension = LICENSE_EXTENSIONS[input.license.type]
  if (!extension) throw new Error('La foto debe ser PNG, JPG o WEBP.')
  if (input.license.size > MAX_LICENSE_BYTES) {
    throw new Error('La foto pesa más de 5 MB. Elige una más ligera.')
  }
  const vehicle = input.vehicle.trim()
  if (vehicle.length < 2 || vehicle.length > 60) {
    throw new Error('Describe tu vehículo en 2 a 60 caracteres.')
  }

  const existing = await fetchMyApplication()
  if (existing?.status === 'approved') {
    throw new Error('Tu cuenta de repartidor ya está aprobada.')
  }

  const licensePath = `${input.userId}/licencia-${Date.now()}.${extension}`
  const { error: uploadError } = await supabase.storage
    .from(LICENSE_BUCKET)
    .upload(licensePath, input.license, { contentType: input.license.type })
  if (uploadError) throw new Error('No pudimos subir la foto. Inténtalo de nuevo.')

  const request = existing
    ? supabase
        .from('driver_applications')
        .update({ vehicle, license_path: licensePath, status: 'pending' })
        .eq('userId', input.userId)
    : supabase.from('driver_applications').insert({
        vehicle,
        license_path: licensePath,
        status: 'pending',
      })
  const { error } = await request
  if (error) throw new Error('No pudimos enviar tu solicitud. Inténtalo de nuevo.')
}

interface BranchInfo {
  businessName: string
  branchName: string
  branchAddress: string
}

async function branchLookup(): Promise<Map<string, BranchInfo>> {
  const catalog = await getCatalog()
  const businessNames = new Map(catalog.businesses.map((b) => [b.id, b.name]))
  return new Map(
    catalog.branches.map((branch) => [
      branch.id,
      {
        businessName: businessNames.get(branch.businessId) ?? 'Negocio',
        branchName: branch.name,
        branchAddress: branch.address,
      },
    ]),
  )
}

function withBranch(order: Order, branches: Map<string, BranchInfo>): DriverOrder {
  const info = (order.branchId && branches.get(order.branchId)) || {
    businessName: 'Negocio',
    branchName: '',
    branchAddress: '',
  }
  return { ...order, ...info }
}

/** Pedidos con entrega a domicilio que esperan repartidor (solo si la cuenta está aprobada). */
export async function fetchAvailableOrders(): Promise<DriverOrder[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('id')
    .eq('status', 'pending')
    .eq('pickup_method', 'delivery')
    .order('created_at', { ascending: true })
    .limit(30)
  if (error) throw new Error('No pudimos cargar los pedidos disponibles.')

  const ids = ((data ?? []) as { id: string }[]).map((row) => row.id)
  if (ids.length === 0) return []

  const [branches, orders] = await Promise.all([
    branchLookup(),
    Promise.all(ids.map((id) => fetchOrder(id))),
  ])
  return orders
    .filter((order): order is Order => order !== null)
    .map((order) => withBranch(order, branches))
}

/** Pedidos que este repartidor ya aceptó, los activos primero. */
export async function fetchMyDeliveries(): Promise<MyDelivery[]> {
  const { data, error } = await supabase
    .from('deliveries')
    .select('orderId, status')
    .order('assigned_at', { ascending: false })
    .limit(30)
  if (error) throw new Error('No pudimos cargar tus entregas.')

  const rows = (data ?? []) as { orderId: string; status: DeliveryStatus }[]
  if (rows.length === 0) return []

  const [branches, orders] = await Promise.all([
    branchLookup(),
    Promise.all(rows.map((row) => fetchOrder(row.orderId))),
  ])
  const deliveries: MyDelivery[] = []
  rows.forEach((row, index) => {
    const order = orders[index]
    if (order) {
      deliveries.push({
        order: withBranch(order, branches),
        deliveryStatus: row.status,
      })
    }
  })
  return deliveries.sort(
    (a, b) =>
      Number(a.deliveryStatus === 'delivered') -
      Number(b.deliveryStatus === 'delivered'),
  )
}

/** Un pedido (disponible o ya aceptado por este repartidor) con su estado de entrega. */
export async function fetchDriverOrder(
  orderId: string,
): Promise<{ order: DriverOrder; deliveryStatus: DeliveryStatus | null } | null> {
  const [order, branches, delivery] = await Promise.all([
    fetchOrder(orderId),
    branchLookup(),
    supabase
      .from('deliveries')
      .select('status')
      .eq('orderId', orderId)
      .maybeSingle(),
  ])
  if (!order) return null
  return {
    order: withBranch(order, branches),
    deliveryStatus:
      ((delivery.data as { status: DeliveryStatus } | null)?.status) ?? null,
  }
}

export async function acceptOrder(orderId: string) {
  const { error } = await supabase.rpc('accept_order', { p_order: orderId })
  if (error) throw rpcError(error)
}

export async function updateDeliveryStatus(
  orderId: string,
  status: 'picked_up' | 'delivered',
) {
  const { error } = await supabase.rpc('update_delivery_status', {
    p_order: orderId,
    p_status: status,
  })
  if (error) throw rpcError(error)
}

export async function reportOrder(input: {
  orderId: string
  reason: string
  details: string
}) {
  const { error } = await supabase.from('order_reports').insert({
    orderId: input.orderId,
    reason: input.reason,
    details: input.details.trim() || null,
  })
  if (error) throw new Error('No pudimos enviar el reporte. Inténtalo de nuevo.')
}
