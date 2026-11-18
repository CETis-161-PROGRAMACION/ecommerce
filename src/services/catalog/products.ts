import { supabase } from '@/lib/supabase'
import { assetUrl } from '@/utils/assets'
import type { TimeRange, WeeklySchedule } from '@/utils/schedule'

export const CATEGORIES = ['Café', 'Postres', 'Comidas'] as const
export type Category = (typeof CATEGORIES)[number]

export interface BranchSchedule {
  hours: WeeklySchedule
  /** Texto listo para mostrar, una línea por rango de días. */
  lines: string[]
}

export interface Business {
  id: string
  slug: string
  name: string
  category: string | null
  logo: string | null
  description: string | null
}

export interface Branch {
  id: string
  businessId: string
  name: string
  address: string
  latitude: number
  longitude: number
  schedule: BranchSchedule | null
}

export interface CatalogProduct {
  /** UUID del producto en la base; es el que recibe `place_order`. */
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  image: string
  imageAlt: string
  business: Business
  branch: Branch
}

export interface Catalog {
  businesses: Business[]
  branches: Branch[]
  products: CatalogProduct[]
}

interface BusinessRow {
  id: string
  slug: string
  name: string
  category: string | null
  logo_url: string | null
  description: string | null
}

interface BranchRow {
  id: string
  businessId: string
  name: string
  address: string
  latitude: number
  longitude: number
  schedule: unknown
}

interface ProductRow {
  id: string
  branchId: string
  slug: string | null
  name: string
  description: string | null
  category: string | null
  image_url: string
  image_alt: string | null
  offer_price: number | string
}

function rows<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : []
}

function parseRange(value: unknown): TimeRange | null {
  if (!Array.isArray(value) || value.length !== 2) return null
  const [open, close] = value
  if (typeof open !== 'number' || typeof close !== 'number') return null
  return { open, close }
}

function parseSchedule(value: unknown): BranchSchedule | null {
  if (typeof value !== 'object' || value === null) return null
  const { hours, lines } = value as { hours?: unknown; lines?: unknown }
  if (typeof hours !== 'object' || hours === null) return null

  const parsed: Record<number, TimeRange[]> = {}
  for (const [day, ranges] of Object.entries(hours)) {
    const dayNumber = Number(day)
    if (!Number.isInteger(dayNumber) || !Array.isArray(ranges)) continue
    parsed[dayNumber] = ranges
      .map(parseRange)
      .filter((range): range is TimeRange => range !== null)
  }

  return {
    hours: parsed,
    lines: Array.isArray(lines)
      ? lines.filter((line): line is string => typeof line === 'string')
      : [],
  }
}

/** Descarga negocios, sucursales y productos disponibles y los une. */
async function loadCatalog(): Promise<Catalog> {
  const [businessResult, branchResult, productResult] = await Promise.all([
    supabase
      .from('businesses')
      .select('id, slug, name, category, logo_url, description')
      .order('sort_order'),
    supabase
      .from('branches')
      .select('id, businessId, name, address, latitude, longitude, schedule'),
    supabase
      .from('products')
      .select(
        'id, branchId, slug, name, description, category, image_url, image_alt, offer_price',
      )
      .order('sort_order'),
  ])

  if (businessResult.error || branchResult.error || productResult.error) {
    throw new Error('No pudimos cargar el catálogo. Inténtalo de nuevo.')
  }

  const businesses: Business[] = rows<BusinessRow>(businessResult.data).map(
    (row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      category: row.category,
      logo: row.logo_url ? assetUrl(row.logo_url) : null,
      description: row.description,
    }),
  )

  const branches: Branch[] = rows<BranchRow>(branchResult.data).map((row) => ({
    id: row.id,
    businessId: row.businessId,
    name: row.name,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    schedule: parseSchedule(row.schedule),
  }))

  const products: CatalogProduct[] = []
  for (const row of rows<ProductRow>(productResult.data)) {
    const branch = branches.find((item) => item.id === row.branchId)
    const business = branch
      ? businesses.find((item) => item.id === branch.businessId)
      : undefined
    if (!branch || !business || !row.slug) continue
    products.push({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description ?? '',
      category: row.category ?? '',
      price: Number(row.offer_price),
      image: assetUrl(row.image_url),
      imageAlt: row.image_alt ?? `${row.name} de ${business.name}`,
      business,
      branch,
    })
  }

  return { businesses, branches, products }
}

const CACHE_MS = 30_000
let cache: { loadedAt: number; promise: Promise<Catalog> } | null = null

/** Devuelve el catálogo; reutiliza la última descarga durante 30 segundos. */
export function getCatalog(): Promise<Catalog> {
  if (cache && Date.now() - cache.loadedAt < CACHE_MS) return cache.promise
  const promise = loadCatalog()
  cache = { loadedAt: Date.now(), promise }
  promise.catch(() => {
    if (cache?.promise === promise) cache = null
  })
  return promise
}

/** Descarta el catálogo guardado (p. ej. tras hacer un pedido que baja existencias). */
export function invalidateCatalog() {
  cache = null
}
