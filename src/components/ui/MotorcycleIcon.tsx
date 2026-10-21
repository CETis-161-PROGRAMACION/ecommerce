interface MotorcycleIconProps {
  className?: string
  size?: number
}

export function MotorcycleIcon({ className = '', size = 26 }: MotorcycleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Repartidor en moto"
      role="img"
    >
      {/* Rueda trasera */}
      <circle cx="5.5" cy="17.5" r="3.5" />
      {/* Rueda delantera */}
      <circle cx="18.5" cy="17.5" r="3.5" />
      {/* Chasis y manubrio */}
      <path d="M15 6h2l2 4-5 7.5H9l3-7.5-3-3H5" />
      {/* Asiento y cuerpo */}
      <path d="M9 17.5V13l3-3" />
    </svg>
  )
}
