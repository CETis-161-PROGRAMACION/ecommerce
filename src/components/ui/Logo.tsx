import logoUrl from '@/assets/images/logo.png'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Logotipo de Web E-commerce"
      draggable={false}
      className={`select-none object-contain ${className ?? ''}`}
    />
  )
}
