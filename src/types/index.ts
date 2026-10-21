/** Tipos compartidos por la aplicación. */

export type UserRole = 'cliente' | 'repartidor'

export interface DemoUser {
  id: string
  nombre: string
  telefono: string
  contrasena: string
  rol: UserRole
}

export interface SessionUser {
  id: string
  nombre: string
  telefono: string
  rol: UserRole
}

export interface Store {
  id: string
  nombre: string
  direccion: string
  horario: string
  mapa: string
  indicaciones: string
}

export interface ProductOptionGroup {
  titulo: string
  opciones: string[]
  multiple: boolean
}

export interface Product {
  id: string
  nombre: string
  storeId: string
  categoria: string
  precio: number
  descripcion: string
  imagen: string
  destacado: boolean
  grupos: ProductOptionGroup[]
}

export interface ProductSelection {
  productId: string
  opciones: Record<string, string[]>
  comentarios: string
}

export interface Address {
  codigoPostal: string
  calle: string
  numero: string
  colonia: string
  referencia: string
}

export interface Recipient {
  nombre: string
  telefono: string
}

export type OrderStatus = 'disponible' | 'asignado' | 'en-camino' | 'entregado'

export type PaymentMethod = 'debito' | 'credito' | 'presencial'

export interface Order {
  id: string
  storeId: string
  sucursal: string
  cliente: string
  telefono: string
  producto: string
  precio: number
  metodoEntrega: string
  direccion: string
  estado: OrderStatus
  hora: string
}
