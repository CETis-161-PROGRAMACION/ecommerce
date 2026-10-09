const logoModules = import.meta.glob('/src/assets/images/logo.png', {
  eager: true,
})
const logoUrl = (
  logoModules['/src/assets/images/logo.png'] as { default?: string } | undefined
)?.default

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  if (!logoUrl) {
    return null
  }

  return (
    <img
      src={logoUrl}
      alt="Logotipo de Web E-commerce"
      draggable={false}
      className={`select-none object-contain ${className ?? ''}`}
    />
  )
}
