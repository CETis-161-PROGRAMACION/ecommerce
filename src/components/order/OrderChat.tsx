import { useEffect, useState, type FormEvent } from 'react'
import {
  fetchMessages,
  sendMessage,
  type OrderMessage,
} from '@/services/order/messages'
import { useSession } from '@/services/session/session'

interface OrderChatProps {
  orderId: string
  /** Si es false, el chat se muestra bloqueado (p. ej. aún no hay repartidor). */
  enabled: boolean
  disabledHint?: string
}

const POLL_MS = 8000

export function OrderChat({ orderId, enabled, disabledHint }: OrderChatProps) {
  const { session } = useSession()
  const userId = session?.user.id
  const [messages, setMessages] = useState<OrderMessage[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let isActive = true

    async function load() {
      try {
        const list = await fetchMessages(orderId)
        if (isActive) setMessages(list)
      } catch {
        // El siguiente intento volverá a cargar los mensajes.
      }
    }

    const firstLoad = window.setTimeout(load, 0)
    const timer = window.setInterval(load, POLL_MS)
    return () => {
      isActive = false
      window.clearTimeout(firstLoad)
      window.clearInterval(timer)
    }
  }, [orderId, enabled])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = text.trim()
    if (!body) return

    setIsSending(true)
    setError('')
    try {
      await sendMessage(orderId, body)
      setText('')
      setMessages(await fetchMessages(orderId))
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'No pudimos enviar el mensaje.',
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {enabled && messages.length > 0 && (
        <ul
          aria-label="Mensajes del pedido"
          className="flex max-h-48 flex-col gap-1.5 overflow-y-auto rounded-2xl border border-line bg-background p-3"
        >
          {messages.map((message) => (
            <li
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-sm ${
                message.senderId === userId
                  ? 'self-end bg-brand-100 text-navy-900'
                  : 'self-start bg-surface text-ink ring-1 ring-line'
              }`}
            >
              {message.body}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label htmlFor={`message-${orderId}`} className="sr-only">
          Mensaje
        </label>
        <input
          id={`message-${orderId}`}
          type="text"
          value={text}
          maxLength={500}
          disabled={!enabled || isSending}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enviar mensaje"
          aria-describedby={!enabled ? `message-help-${orderId}` : undefined}
          className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={!enabled || isSending || !text.trim()}
          className="rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-navy-900 hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Enviar
        </button>
      </form>

      {!enabled && disabledHint && (
        <p id={`message-help-${orderId}`} className="text-xs text-ink-muted">
          {disabledHint}
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
