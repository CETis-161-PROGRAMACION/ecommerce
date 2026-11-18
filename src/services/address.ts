import { supabase } from '@/lib/supabase'

export interface Address {
  id: string
  postalCode: string
  street: string
  extNumber: string
  intNumber: string | null
  referenceNotes: string | null
}

export interface NewAddress {
  postalCode: string
  street: string
  extNumber: string
  intNumber?: string
  referenceNotes?: string
}

interface AddressRow {
  id: string
  postal_code: string
  street: string
  ext_number: string
  int_number: string | null
  reference_notes: string | null
}

const COLUMNS = 'id, postal_code, street, ext_number, int_number, reference_notes'

function toAddress(row: AddressRow): Address {
  return {
    id: row.id,
    postalCode: row.postal_code,
    street: row.street,
    extNumber: row.ext_number,
    intNumber: row.int_number,
    referenceNotes: row.reference_notes,
  }
}

/** Texto de una línea para mostrar una dirección. */
export function formatAddress(address: Address) {
  const interior = address.intNumber ? ` int. ${address.intNumber}` : ''
  return `${address.street} #${address.extNumber}${interior}, C.P. ${address.postalCode}`
}

export async function fetchAddresses(): Promise<Address[]> {
  const { data, error } = await supabase
    .from('addresses')
    .select(COLUMNS)
    .order('created_at', { ascending: false })
  if (error) throw new Error('No pudimos cargar tus direcciones.')
  return ((data ?? []) as AddressRow[]).map(toAddress)
}

export async function createAddress(input: NewAddress): Promise<Address> {
  const { data, error } = await supabase
    .from('addresses')
    .insert({
      postal_code: input.postalCode,
      street: input.street.trim(),
      ext_number: input.extNumber.trim(),
      int_number: input.intNumber?.trim() || null,
      reference_notes: input.referenceNotes?.trim() || null,
    })
    .select(COLUMNS)
    .single()
  if (error || !data) {
    throw new Error('No pudimos guardar la dirección. Revisa los datos.')
  }
  return toAddress(data as AddressRow)
}

export async function deleteAddress(id: string) {
  const { error } = await supabase.from('addresses').delete().eq('id', id)
  if (error) throw new Error('No pudimos eliminar la dirección.')
}
