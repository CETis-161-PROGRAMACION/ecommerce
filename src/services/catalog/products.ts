import principito from '@/assets/images/principito.png'
import kunderaLatte from '@/assets/images/productos/kundera-02.webp'
import kunderaPan from '@/assets/images/productos/kundera-01.webp'
import cuatroChilaquilesRojos from '@/assets/images/productos/cuatro-cafe-03.webp'
import cuatroWaffle from '@/assets/images/productos/cuatro-cafe-04.webp'
import cuatroCrepa from '@/assets/images/productos/cuatro-cafe-05.webp'
import cuatroChilaquilesVerdes from '@/assets/images/productos/cuatro-cafe-11.webp'
import cuatroCapuchino from '@/assets/images/productos/cuatro-cafe-08.webp'
import santoriCinnamon from '@/assets/images/productos/santori-01.webp'
import santoriMacchiato from '@/assets/images/productos/santori-02.webp'
import santoriFrappe from '@/assets/images/productos/santori-03.webp'
import santoriPanChocolate from '@/assets/images/productos/santori-05.webp'
import donaMaryPepperoni from '@/assets/images/productos/dona-mary-01.webp'
import donaMaryHamburguesa from '@/assets/images/productos/dona-mary-03.webp'
import donaMaryPapas from '@/assets/images/productos/dona-mary-05.webp'
import donaMaryPizzaBoneless from '@/assets/images/productos/dona-mary-07.webp'
import donaMaryBoneless from '@/assets/images/productos/dona-mary-08.webp'

export const BUSINESSES = [
  'KUNDERA',
  'CUATRO CAFÉ',
  'SANTORI',
  'DOÑA MARY',
  'TU MESA',
] as const

export const CATEGORIES = ['Café', 'Postres', 'Comidas'] as const

export type Business = (typeof BUSINESSES)[number]
export type Category = (typeof CATEGORIES)[number]

export interface CatalogProduct {
  id: string
  name: string
  business: Business
  category: Category
  price: number
  description: string
  image: string
  imageAlt: string
}

/**
 * Datos de ejemplo: nombres, precios y descripciones inventados para mostrar
 * el catálogo mientras los negocios entregan su información real.
 * Las fotos sí son de cada negocio.
 */
export const CATALOG_IS_SAMPLE = true

export const PRODUCTS: readonly CatalogProduct[] = [
  {
    id: 'principito',
    name: 'Principito',
    business: 'KUNDERA',
    category: 'Café',
    price: 80,
    description: 'Bebida fría de la casa con café de especialidad.',
    image: principito,
    imageAlt: 'Vaso del Principito de Kundera',
  },
  {
    id: 'kundera-latte',
    name: 'Latte',
    business: 'KUNDERA',
    category: 'Café',
    price: 55,
    description: 'Espresso con leche vaporizada y arte latte.',
    image: kunderaLatte,
    imageAlt: 'Latte con arte en taza azul junto a un libro',
  },
  {
    id: 'kundera-pan-dulce',
    name: 'Pan dulce surtido',
    business: 'KUNDERA',
    category: 'Postres',
    price: 45,
    description:
      'Pieza de pan dulce del día: concha, rol de chocolate o mantecada.',
    image: kunderaPan,
    imageAlt: 'Charola de madera con pan dulce surtido',
  },
  {
    id: 'cuatro-chilaquiles-rojos',
    name: 'Chilaquiles rojos con tocino',
    business: 'CUATRO CAFÉ',
    category: 'Comidas',
    price: 145,
    description:
      'Chilaquiles rojos con crema, cebolla, tocino, huevo y frijoles.',
    image: cuatroChilaquilesRojos,
    imageAlt: 'Plato de chilaquiles rojos con tocino y frijoles',
  },
  {
    id: 'cuatro-chilaquiles-verdes',
    name: 'Chilaquiles verdes',
    business: 'CUATRO CAFÉ',
    category: 'Comidas',
    price: 130,
    description:
      'Chilaquiles verdes con crema, queso fresco y frijoles refritos.',
    image: cuatroChilaquilesVerdes,
    imageAlt: 'Chilaquiles verdes con queso y frijoles',
  },
  {
    id: 'cuatro-waffle',
    name: 'Waffle con tocino y huevo',
    business: 'CUATRO CAFÉ',
    category: 'Comidas',
    price: 135,
    description: 'Waffle con mantequilla, tocino crujiente y huevo estrellado.',
    image: cuatroWaffle,
    imageAlt: 'Waffle con mantequilla, tocino y huevo',
  },
  {
    id: 'cuatro-crepa',
    name: 'Crepa de fresa y plátano',
    business: 'CUATRO CAFÉ',
    category: 'Postres',
    price: 110,
    description: 'Crepa con fresas, plátano, crema batida y azúcar glass.',
    image: cuatroCrepa,
    imageAlt: 'Crepa con fresas, plátano y crema batida',
  },
  {
    id: 'cuatro-capuchino',
    name: 'Capuchino de temporada',
    business: 'CUATRO CAFÉ',
    category: 'Café',
    price: 60,
    description: 'Capuchino con espuma decorada con canela.',
    image: cuatroCapuchino,
    imageAlt: 'Capuchino con luna y estrella de canela',
  },
  {
    id: 'santori-cinnamon-roll',
    name: 'Cinnamon roll',
    business: 'SANTORI',
    category: 'Postres',
    price: 55,
    description: 'Rol de canela horneado en casa con glaseado.',
    image: santoriCinnamon,
    imageAlt: 'Rol de canela recién horneado',
  },
  {
    id: 'santori-caramel-macchiato',
    name: 'Caramel Macchiato',
    business: 'SANTORI',
    category: 'Café',
    price: 70,
    description: 'Espresso con leche y caramelo, frío o caliente.',
    image: santoriMacchiato,
    imageAlt: 'Promoción de Caramel Macchiato de Santori',
  },
  {
    id: 'santori-frappe-chocolate',
    name: 'Frappé de chocolate',
    business: 'SANTORI',
    category: 'Café',
    price: 75,
    description: 'Frappé de chocolate con crema batida y galleta.',
    image: santoriFrappe,
    imageAlt: 'Frappé de chocolate con crema batida',
  },
  {
    id: 'santori-pan-chocolate',
    name: 'Pan de chocolate con capuchino',
    business: 'SANTORI',
    category: 'Postres',
    price: 85,
    description: 'Paquete de pan de chocolate y capuchino chico.',
    image: santoriPanChocolate,
    imageAlt: 'Pan de chocolate en plato junto a un capuchino',
  },
  {
    id: 'dona-mary-pizza-pepperoni',
    name: 'Pizza pepperoni con jalapeño',
    business: 'DOÑA MARY',
    category: 'Comidas',
    price: 180,
    description: 'Pizza mediana de pepperoni, cebolla y jalapeño.',
    image: donaMaryPepperoni,
    imageAlt: 'Pizza de pepperoni con jalapeño',
  },
  {
    id: 'dona-mary-pizza-boneless',
    name: 'Pizza boneless',
    business: 'DOÑA MARY',
    category: 'Comidas',
    price: 220,
    description: 'Pizza mediana cubierta de boneless con aderezo ranch.',
    image: donaMaryPizzaBoneless,
    imageAlt: 'Pizza con boneless y aderezo',
  },
  {
    id: 'dona-mary-hamburguesa',
    name: 'Hamburguesa con aros de cebolla',
    business: 'DOÑA MARY',
    category: 'Comidas',
    price: 125,
    description: 'Hamburguesa sencilla con papas y aros de cebolla.',
    image: donaMaryHamburguesa,
    imageAlt: 'Hamburguesa con aros de cebolla y papas',
  },
  {
    id: 'dona-mary-papas',
    name: 'Papas con queso y tocino',
    business: 'DOÑA MARY',
    category: 'Comidas',
    price: 95,
    description: 'Papas a la francesa con queso amarillo, tocino y jalapeño.',
    image: donaMaryPapas,
    imageAlt: 'Papas con queso derretido, tocino y jalapeño',
  },
  {
    id: 'dona-mary-boneless',
    name: 'Boneless búfalo',
    business: 'DOÑA MARY',
    category: 'Comidas',
    price: 140,
    description: 'Orden de boneless con salsa búfalo.',
    image: donaMaryBoneless,
    imageAlt: 'Boneless con salsa búfalo',
  },
]

export function findProduct(id: string | undefined) {
  return PRODUCTS.find((product) => product.id === id)
}

const BUSINESS_LABELS: Record<Business, string> = {
  KUNDERA: 'Kundera',
  'CUATRO CAFÉ': 'Cuatro Café',
  SANTORI: 'Santori',
  'DOÑA MARY': 'Doña Mary',
  'TU MESA': 'Tu Mesa',
}

export function businessLabel(business: Business) {
  return BUSINESS_LABELS[business]
}
