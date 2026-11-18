import NavBar from '@/components/navbar/NavBar'
import kunderaLogo from '@/assets/images/kundera_logo.png'
import { KUNDERA } from '@/services/business/kundera'
import { isOpenAt } from '@/utils/schedule'

export function MenuPage() {
  const isOpen = isOpenAt(KUNDERA.schedule, new Date())

  return (
    <NavBar>
      <h1 className="sr-only">Menú de {KUNDERA.name}</h1>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
        <div className="flex items-center gap-6 md:sticky md:top-10">
          <img
            src={kunderaLogo}
            alt={`Logo de ${KUNDERA.name}`}
            className="size-28 rounded-full object-cover sm:size-36"
          />
          <div className="flex flex-col items-center gap-2">
            <p className="rounded-full border border-line px-6 py-1.5 text-base font-bold text-ink">
              {KUNDERA.name}
            </p>
            <p
              className={`text-sm font-semibold ${isOpen ? 'text-success' : 'text-red-600'}`}
            >
              {isOpen ? 'Abierto' : 'Cerrado'}
            </p>
          </div>
        </div>

        <section
          aria-labelledby="menu-title"
          className="mx-auto flex w-full max-w-md flex-col items-center gap-3"
        >
          <h2 id="menu-title" className="text-sm font-semibold text-ink">
            Menú
          </h2>
          <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl border border-dashed border-line bg-surface p-6 text-center text-sm text-ink-muted">
            El menú de {KUNDERA.name} estará disponible cuando se agregue su
            imagen o sus productos.
          </div>
        </section>
      </div>
    </NavBar>
  )
}
