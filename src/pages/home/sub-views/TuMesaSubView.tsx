import { StoreCatalog } from '@/components/catalog/StoreCatalog'

export function TuMesaSubView({ busqueda = '' }: { busqueda?: string }) {
  return <StoreCatalog storeId="tu-mesa" busqueda={busqueda} />
}
