import { StoreCatalog } from '@/components/catalog/StoreCatalog'

export function KunderaSubView({ busqueda = '' }: { busqueda?: string }) {
  return <StoreCatalog storeId="kundera" busqueda={busqueda} />
}
