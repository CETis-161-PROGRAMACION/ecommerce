interface DeliveryProgressProps {
  progress: number
  label: string
}

export function DeliveryProgress({ progress, label }: DeliveryProgressProps) {
  const value = Math.min(100, Math.max(0, progress))
  const isComplete = value >= 100

  return (
    <div className="flex w-full items-center gap-3">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="size-6 shrink-0 text-ink"
      >
        <path d="M4 10h16v10H4zM3 6h18l-1 4H4ZM9 20v-5h6v5" />
      </svg>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="relative h-6 flex-1"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink"
        />
        <span
          aria-hidden="true"
          style={{ width: `${value}%` }}
          className={`absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full ${
            isComplete ? 'bg-success' : 'bg-brand-400'
          }`}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          style={{ left: `${value}%` }}
          className="absolute top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 bg-background text-ink"
        >
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M9 17h6l2-6h-4l-2-3H8M14 5h3l1 3" />
        </svg>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={`size-6 shrink-0 ${isComplete ? 'text-success' : 'text-ink'}`}
      >
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    </div>
  )
}
