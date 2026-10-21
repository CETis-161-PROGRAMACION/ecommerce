import type { Store } from '@/types'

const HORARIO =
  'Lunes a viernes de 8:00 a.m. a 3:00 p.m. y de 5:00 p.m. a 9:00 p.m. · Sábados y domingos de 8:00 a.m. a 3:00 p.m.'

/** Sucursales de Web E-commerce en Tala, Jalisco. */
export const stores: Store[] = [
  {
    id: 'kundera',
    nombre: 'Kundera',
    direccion: 'Donato Guerra 63A, 45300 Tala, Jalisco.',
    horario: HORARIO,
    mapa: 'https://maps.google.com/maps?q=20.6518783,-103.7016811&z=17&output=embed',
    indicaciones:
      'https://www.google.com/maps/dir/?api=1&destination=20.6518783,-103.7016811',
  },
  {
    id: 'cuatro-cafe',
    nombre: 'Cuatro Café',
    direccion: 'Av. Hidalgo 120, Centro, 45300 Tala, Jalisco.',
    horario: HORARIO,
    mapa: 'https://maps.google.com/maps?q=20.6535,-103.7035&z=17&output=embed',
    indicaciones:
      'https://www.google.com/maps/dir/?api=1&destination=20.6535,-103.7035',
  },
  {
    id: 'tu-mesa',
    nombre: 'Tu Mesa',
    direccion: 'Francisco I. Madero 45, 45300 Tala, Jalisco.',
    horario: HORARIO,
    mapa: 'https://maps.google.com/maps?q=20.6548,-103.7024&z=17&output=embed',
    indicaciones:
      'https://www.google.com/maps/dir/?api=1&destination=20.6548,-103.7024',
  },
  {
    id: 'dona-mary',
    nombre: 'Doña Mary',
    direccion: 'Donato Guerra 220, San Javier, 45300 Tala, Jalisco.',
    horario: HORARIO,
    mapa: 'https://maps.google.com/maps?q=20.6566723,-103.7017308&z=17&output=embed',
    indicaciones:
      'https://www.google.com/maps/dir/?api=1&destination=20.6566723,-103.7017308',
  },
  {
    id: 'santori',
    nombre: 'Santori',
    direccion: 'Manuel Acuña 1A, Barrio Alto, 45300 Tala, Jalisco.',
    horario: HORARIO,
    mapa: 'https://maps.google.com/maps?q=20.655763,-103.702891&z=17&output=embed',
    indicaciones:
      'https://www.google.com/maps/dir/?api=1&destination=20.655763,-103.702891',
  },
  {
    id: 'cafe-tostado',
    nombre: 'Café Tostado',
    direccion: 'Donato Guerra 244-A, 45300 Tala, Jalisco.',
    horario: HORARIO,
    mapa: 'https://maps.google.com/maps?q=Caf%C3%A9+Tostado%2C+Donato+Guerra+244-A%2C+Tala%2C+Jalisco&z=17&output=embed',
    indicaciones:
      'https://www.google.com/maps/dir/?api=1&destination=Caf%C3%A9+Tostado%2C+Donato+Guerra+244-A%2C+Tala%2C+Jalisco',
  },
]

export function findStore(storeId: string): Store | undefined {
  return stores.find((store) => store.id === storeId)
}

export function storeName(storeId: string): string {
  return findStore(storeId)?.nombre ?? storeId
}
