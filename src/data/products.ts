import type { Product } from '@/types'
import principitoImg from '@/assets/images/principito.png'
import ensaladaImg from '@/assets/images/ensalada-kahlo.jpg'
import croissantImg from '@/assets/images/croissant.jpg'
import burgerImg from '@/assets/images/burger.jpg'
import flatWhiteImg from '@/assets/images/flat-white.png'
import cafeGranoImg from '@/assets/images/cft.png'

const ENTREGAS = {
  titulo: 'Método de Entrega',
  opciones: ['A domicilio', 'Recoger en tienda'],
  multiple: false,
}

/** Catálogo de demostración de Web E-commerce. */
export const products: Product[] = [
  {
    id: 'principito',
    nombre: 'Principito',
    storeId: 'kundera',
    categoria: 'Café',
    precio: 80,
    descripcion:
      'Café de especialidad de Kundera Libros y Café, preparado con grano de altura y leche texturizada.',
    imagen: principitoImg,
    destacado: true,
    grupos: [
      {
        titulo: 'Tamaño',
        opciones: ['Chico', 'Mediano', 'Grande'],
        multiple: false,
      },
      {
        titulo: 'Tipo de Leche',
        opciones: ['Entera', 'Deslactosada', 'Evaporada', 'Condensada'],
        multiple: false,
      },
      {
        titulo: 'Extras',
        opciones: ['Canela', 'Crema batida', 'Jarabes'],
        multiple: true,
      },
      ENTREGAS,
      {
        titulo: 'Endulzante',
        opciones: ['Azúcar estándar', 'Jarabe', 'Stevia', 'Sin endulzante'],
        multiple: false,
      },
    ],
  },
  {
    id: 'ensalada-c-kahlo',
    nombre: 'Ensalada C. Kahlo',
    storeId: 'kundera',
    categoria: 'Comidas',
    precio: 145,
    descripcion:
      'Ensalada fresca de temporada con hojas verdes, arándano, nuez y vinagreta de limón.',
    imagen: ensaladaImg,
    destacado: true,
    grupos: [
      {
        titulo: 'Porción',
        opciones: ['Individual', 'Para compartir'],
        multiple: false,
      },
      {
        titulo: 'Extras',
        opciones: ['Queso goat', 'Pollo grilled', 'Camote asado'],
        multiple: true,
      },
      ENTREGAS,
    ],
  },
  {
    id: 'flat-white',
    nombre: 'Flat White',
    storeId: 'cuatro-cafe',
    categoria: 'Café de Especialidad',
    precio: 72,
    descripcion:
      'Espresso doble con leche vaporizada y arte en la taza de Cuatro Café.',
    imagen: flatWhiteImg,
    destacado: true,
    grupos: [
      {
        titulo: 'Tamaño',
        opciones: ['Chico', 'Mediano', 'Grande'],
        multiple: false,
      },
      {
        titulo: 'Tipo de Leche',
        opciones: ['Entera', 'Deslactosada', 'Avena'],
        multiple: false,
      },
      {
        titulo: 'Extras',
        opciones: ['Canela', 'Crema batida', 'Chocolate'],
        multiple: true,
      },
      ENTREGAS,
    ],
  },
  {
    id: 'croissant-frances',
    nombre: 'Croissant Francés',
    storeId: 'cuatro-cafe',
    categoria: 'Panadería Artesanal',
    precio: 58,
    descripcion:
      'Masa laminada horneada cada mañana, con mantequilla de Rancho Lavado.',
    imagen: croissantImg,
    destacado: false,
    grupos: [
      {
        titulo: 'Tamaño',
        opciones: ['Individual', 'Grande'],
        multiple: false,
      },
      {
        titulo: 'Extras',
        opciones: ['Almendra', 'Chocolate amargo', 'Cajeta'],
        multiple: true,
      },
      ENTREGAS,
    ],
  },
  {
    id: 'cafe-de-grano-500g',
    nombre: 'Café de Grano 500g',
    storeId: 'cuatro-cafe',
    categoria: 'Café de Especialidad',
    precio: 320,
    descripcion:
      'Grano de café 100% arábica de altura, tostado medio y molido al momento.',
    imagen: cafeGranoImg,
    destacado: false,
    grupos: [
      {
        titulo: 'Molido',
        opciones: ['En grano', 'Molido fino', 'Molido medio', 'Para filtros'],
        multiple: false,
      },
      ENTREGAS,
    ],
  },
  {
    id: 'burger-clasica',
    nombre: 'Burger Clásica',
    storeId: 'tu-mesa',
    categoria: 'Hamburguesas & Grill',
    precio: 165,
    descripcion:
      'Res madurada, queso cheddar, cebolla caramelizada y pan de brioche de Tu Mesa.',
    imagen: burgerImg,
    destacado: true,
    grupos: [
      {
        titulo: 'Tamaño',
        opciones: ['Sencilla', 'Doble', 'Triple'],
        multiple: false,
      },
      {
        titulo: 'Extras',
        opciones: ['Jalapeños', 'Bacon', 'Huevo', 'Extra queso'],
        multiple: true,
      },
      ENTREGAS,
    ],
  },
  {
    id: 'ensalada-chef',
    nombre: 'Ensalada Chef',
    storeId: 'tu-mesa',
    categoria: 'Ensaladas Frescas',
    precio: 138,
    descripcion:
      'Mezcla verde, pollo a la plancha, jitomate, aceitunas y vinagreta de maracuyá.',
    imagen: ensaladaImg,
    destacado: false,
    grupos: [
      {
        titulo: 'Porción',
        opciones: ['Individual', 'Para compartir'],
        multiple: false,
      },
      {
        titulo: 'Extras',
        opciones: ['Queso panela', 'Camarón', 'Aguacate'],
        multiple: true,
      },
      ENTREGAS,
    ],
  },
]

export function findProduct(productId: string): Product | undefined {
  return products.find((product) => product.id === productId)
}

export function productsByStore(storeId: string): Product[] {
  return products.filter((product) => product.storeId === storeId)
}
