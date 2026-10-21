import { StoreCatalog } from '@/components/catalog/StoreCatalog'

export function CuatroCafeSubView({ busqueda = '' }: { busqueda?: string }) {
  return <StoreCatalog storeId="cuatro-cafe" busqueda={busqueda} />
}
