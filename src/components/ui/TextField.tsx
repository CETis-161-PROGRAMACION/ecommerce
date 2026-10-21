import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { inputClass, inputErrorClass, labelClass, fieldErrorClass } from '@/components/ui/fieldStyles'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function TextField({
  label,
  error,
  id,
  className,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputClass} ${error ? inputErrorClass : ''} ${className ?? ''}`}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} className={fieldErrorClass}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
