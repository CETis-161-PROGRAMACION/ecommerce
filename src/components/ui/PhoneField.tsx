import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { sanitizePhone } from '@/utils/phone'

type PhoneFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'inputMode'
> & {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export function PhoneField({
  label,
  value,
  onChange,
  error,
  id,
  className,
  ...inputProps
}: PhoneFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div
        className={`flex items-stretch overflow-hidden rounded-xl border bg-white focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-400 ${
          error ? 'border-red-500' : 'border-line'
        } ${className ?? ''}`}
      >
        <span className="select-none border-r border-line px-4 py-3 text-base text-ink-muted">
          +52
        </span>
        <input
          id={inputId}
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(sanitizePhone(event.target.value))}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full min-w-0 px-4 py-3 text-base text-ink outline-none placeholder:text-ink-muted"
          {...inputProps}
        />
      </div>
      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
