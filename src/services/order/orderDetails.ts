/** Cargo por servicio por cada negocio del pedido; coincide con `place_order` en la base. */
export const SERVICE_FEE = 25

export type PickupMethod = 'delivery' | 'pickup'

export const PICKUP_METHODS: readonly { value: PickupMethod; label: string }[] = [
  { value: 'delivery', label: 'A domicilio' },
  { value: 'pickup', label: 'Recoger en tienda' },
]
