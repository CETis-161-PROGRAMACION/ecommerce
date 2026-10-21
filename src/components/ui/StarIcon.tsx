interface StarIconProps {
  className?: string
  size?: number
  filled?: boolean
}

export function StarIcon({
  className = '',
  size = 18,
  filled = true,
}: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35l-5.81 3.05L7.3 13.93 2.6 9.35l6.5-.95L12 2.5z" />
    </svg>
  )
}
