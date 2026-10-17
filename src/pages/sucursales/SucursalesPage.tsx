import NavBar from '@/components/navbar/NavBar'

const sucursales = [
  {
    nombre: 'Doña Mary',
    direccion: 'Donato Guerra 220, San Javier, 45300 Tala, Jalisco.',
    mapa: 'https://maps.google.com/maps?q=20.6566723,-103.7017308&z=17&output=embed',
    indicaciones: 'https://www.google.com/maps/dir/?api=1&destination=20.6566723,-103.7017308',
  },
  {
    nombre: 'Kundera',
    direccion: 'Donato Guerra 63A, 45300 Tala, Jalisco.',
    mapa: 'https://maps.google.com/maps?q=20.6518783,-103.7016811&z=17&output=embed',
    indicaciones: 'https://www.google.com/maps/dir/?api=1&destination=20.6518783,-103.7016811',
  },
  {
    nombre: 'Santori',
    direccion: 'Manuel Acuña 1A, Barrio Alto, 45300 Tala, Jalisco.',
    mapa: 'https://maps.google.com/maps?q=20.655763,-103.702891&z=17&output=embed',
    indicaciones: 'https://www.google.com/maps/dir/?api=1&destination=20.655763-103.702891',
  },
  {
    nombre: 'Café Tostado',
    direccion: 'Donato Guerra 244-A, 45300 Tala, Jalisco.',
    mapa: 'https://maps.google.com/maps?q=Caf%C3%A9+Tostado%2C+Donato+Guerra+244-A%2C+Tala%2C+Jalisco&z=17&output=embed',
    indicaciones: 'https://www.google.com/maps/dir/?api=1&destination=Caf%C3%A9+Tostado%2C+Donato+Guerra+244-A%2C+Tala%2C+Jalisco',
  },
]

export function SucursalesPage() {
  return (
    <NavBar>
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-ink">
            Sucursales
          </h1>
          <p className="text-sm text-ink/70">
            Encuentra nuestros establecimientos en Tala, Jalisco.
          </p>
        </header>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {sucursales.map((sucursal) => (
            <article
              key={sucursal.nombre}
              className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
            >
              <div className="space-y-2 p-4">
                <h2 className="text-xl font-bold text-ink">
                  {sucursal.nombre}
                </h2>
                <p className="text-sm text-ink/70">
                  {sucursal.direccion}
                </p>
              </div>

              <div className="px-4">
                <p className="mb-2 text-sm font-semibold text-ink">
                  Ubicación
                </p>
                <iframe
                  title={`Mapa de ${sucursal.nombre}`}
                  src={sucursal.mapa}
                  width="100%"
                  height="190"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block rounded-xl border-0"
                />
              </div>

              <div className="flex justify-end p-4">
                <a
                  href={sucursal.indicaciones}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-brand-100 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  ¿Cómo llegar?
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </NavBar>
  )
}
