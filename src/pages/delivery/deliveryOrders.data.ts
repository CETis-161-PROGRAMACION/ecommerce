export interface DeliveryOrder {
  id: number
  establishment: string
  customer: string
  phone: string
  products: string[]
  total: number
  time: string
  address: string
}

export const deliveryOrdersDemo: DeliveryOrder[] = [
  {
    id: 1,
    establishment: 'KUNDERA',
    customer: 'Ana López',
    phone: '33 0000 0001',
    products: ['1 × Café americano', '2 × Croissant'],
    total: 115,
    time: 'Hace 5 minutos',
    address: 'Centro, Tala, Jalisco',
  },
  {
    id: 2,
    establishment: 'SANTORI',
    customer: 'Luis Hernández',
    phone: '33 0000 0002',
    products: ['1 × Latte frío', '1 × Pastel de chocolate'],
    total: 135,
    time: 'Hace 8 minutos',
    address: 'Colonia San Pedro, Tala, Jalisco',
  },
  {
    id: 3,
    establishment: 'CUATRO CAFÉ',
    customer: 'Sofía Ramírez',
    phone: '33 0000 0003',
    products: ['2 × Capuchino'],
    total: 120,
    time: 'Hace 12 minutos',
    address: 'Centro, Tala, Jalisco',
  },
  {
    id: 4,
    establishment: 'TU MESA',
    customer: 'Diego Martínez',
    phone: '33 0000 0004',
    products: ['1 × Sándwich', '1 × Café frío'],
    total: 89,
    time: 'Hace 15 minutos',
    address: 'Colonia Obrera, Tala, Jalisco',
  },
]
