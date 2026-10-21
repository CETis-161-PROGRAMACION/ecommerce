interface MastercardIconProps {
  className?: string
  size?: number
}

export function MastercardIcon({
  className = '',
  size = 28,
}: MastercardIconProps) {
  const height = Math.round(size * 0.62)
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 36 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Mastercard"
      role="img"
    >
      <circle cx="11" cy="11" r="11" fill="#EB001B" />
      <circle cx="25" cy="11" r="11" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  )
}
