/**
 * Estilos compartidos de los campos de formulario.
 *
 * Todas las pantallas con formularios deben usar estas clases para que los
 * inputs, labels y mensajes de error se vean iguales en toda la app.
 */

export const inputClass =
  'h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink ' +
  'placeholder:text-ink-muted/70 outline-none transition-colors ' +
  'focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

export const inputErrorClass = 'border-danger focus:border-danger focus:ring-danger-soft'

export const labelClass = 'mb-2 block text-base font-bold text-ink'

export const fieldErrorClass = 'text-sm font-semibold text-danger-strong'
