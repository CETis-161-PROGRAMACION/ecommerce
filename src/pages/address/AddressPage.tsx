import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'

export function AddressPage() {
  const navigate = useNavigate()
  const { address, saveAddress } = useApp()

  const [datos, setDatos] = useState({
    codigoPostal: address?.codigoPostal ?? '',
    calle: address?.calle ?? '',
    numero: address?.numero ?? '',
    colonia: address?.colonia ?? '',
    referencia: address?.referencia ?? '',
  })
  const [error, setError] = useState('')

  function actualizar(campo: keyof typeof datos, valor: string) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }))
    setError('')
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!/^[0-9]{5}$/.test(datos.codigoPostal)) {
      setError('El código postal debe tener 5 dígitos.')
      return
    }

    if (!datos.calle.trim() || !datos.numero.trim()) {
      setError('Escribe la calle y el número exterior.')
      return
    }

    if (!datos.colonia.trim()) {
      setError('Escribe la colonia.')
      return
    }

    saveAddress(datos)
    navigate(ROUTES.userDestiny)
  }

  function abrirMapa() {
    const consulta = [
      datos.calle,
      datos.numero,
      datos.colonia,
      datos.codigoPostal,
    ]
      .filter(Boolean)
      .join(', ')

    if (!consulta) {
      setError('Escribe al menos la calle para buscar la ubicación.')
      return
    }

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <NavBar>
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Web E-commerce
        </p>
        <h1 className="mt-1 text-2xl font-black capitalize text-ink sm:text-3xl">
          Ingresar dirección
        </h1>
      </div>

      <form
        onSubmit={manejarEnvio}
        noValidate
        className="grid grid-cols-1 gap-x-12 gap-y-6 p-2 md:grid-cols-2 lg:gap-x-20"
      >
        <div className="flex w-full flex-col">
          <div className="mb-4">
            <label htmlFor="codigoPostal" className={labelClass}>
              Código Postal:
            </label>
            <input
              id="codigoPostal"
              type="text"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              placeholder="45300"
              className={inputClass}
              value={datos.codigoPostal}
              onChange={(e) =>
                actualizar('codigoPostal', e.target.value.replace(/\D/g, ''))
              }
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="calle" className={labelClass}>
              Calle:
            </label>
            <input
              id="calle"
              type="text"
              autoComplete="address-line1"
              placeholder="Nombre de la calle"
              className={inputClass}
              value={datos.calle}
              onChange={(e) => actualizar('calle', e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="numero" className={labelClass}>
              Número exterior:
            </label>
            <input
              id="numero"
              type="text"
              inputMode="numeric"
              autoComplete="address-line2"
              placeholder="123"
              className={inputClass}
              value={datos.numero}
              onChange={(e) => actualizar('numero', e.target.value)}
              required
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={abrirMapa}
            className="mt-2 w-full max-w-[240px] self-end"
          >
            Ir al mapa
          </Button>
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-4">
            <label htmlFor="colonia" className={labelClass}>
              Colonia:
            </label>
            <input
              id="colonia"
              type="text"
              autoComplete="address-level3"
              placeholder="San Javier"
              className={inputClass}
              value={datos.colonia}
              onChange={(e) => actualizar('colonia', e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="referencia" className={labelClass}>
              Referencias:
            </label>
            <input
              id="referencia"
              type="text"
              placeholder="Casa blanca, portón negro…"
              className={inputClass}
              value={datos.referencia}
              onChange={(e) => actualizar('referencia', e.target.value)}
            />
          </div>

          {error ? (
            <p role="alert" className="notice notice-danger mb-4">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            className="mt-2 w-full max-w-[240px] self-start"
          >
            Continuar
          </Button>
        </div>
      </form>
    </NavBar>
  )
}
