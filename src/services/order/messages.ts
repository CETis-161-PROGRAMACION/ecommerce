import { supabase } from '@/lib/supabase'

export interface OrderMessage {
  id: string
  senderId: string
  body: string
  createdAt: string
}

interface MessageRow {
  id: string
  senderId: string
  body: string
  created_at: string
}

export async function fetchMessages(orderId: string): Promise<OrderMessage[]> {
  const { data, error } = await supabase
    .from('order_messages')
    .select('id, senderId, body, created_at')
    .eq('orderId', orderId)
    .order('created_at', { ascending: true })
    .limit(100)
  if (error) throw new Error('No pudimos cargar los mensajes.')
  return ((data ?? []) as MessageRow[]).map((row) => ({
    id: row.id,
    senderId: row.senderId,
    body: row.body,
    createdAt: row.created_at,
  }))
}

export async function sendMessage(orderId: string, body: string) {
  const { error } = await supabase
    .from('order_messages')
    .insert({ orderId, body: body.trim() })
  if (error) throw new Error('No pudimos enviar el mensaje.')
}
