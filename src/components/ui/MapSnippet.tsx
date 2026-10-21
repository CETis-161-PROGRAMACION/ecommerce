import mapLocationImage from '@/assets/images/map-location.jpg'

interface MapSnippetProps {
  label?: string
  className?: string
  heightClass?: string
}

export function MapSnippet({
  label = 'Adoquinada #19',
  className = '',
  heightClass = 'h-48 sm:h-56',
}: MapSnippetProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-xs ${className}`}
    >
      <img
        src={mapLocationImage}
        alt={`Mapa de ubicación: ${label}`}
        className={`w-full ${heightClass} object-cover`}
      />

      {/* Pin badge overlay */}
      {label && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-line/80 bg-surface/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-xs backdrop-blur-xs">
          <span className="size-2 rounded-full bg-red-500 animate-pulse" />
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
