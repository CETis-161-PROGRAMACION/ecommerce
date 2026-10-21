import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/Button'
import { inputClass, labelClass } from '@/components/ui/fieldStyles'
import { useApp } from '@/context/useApp'
import { ROUTES } from '@/router/routes'

export function UserDestiny() {
  const navigate = useNavigate()
  const { recipient, saveRecipient } = useApp()

  const [datos, setDatos] = useState({
    nombre: recipient?.nombre ?? '',
    telefono: recipient?.telefono ?? '',
  })
  const [error, setError] = useState('')

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!datos.nombre.trim()) {
      setError('Escribe el nombre de quien recibe el pedido.')
      return
    }

    if (!/^[0-9]{10}$/.test(datos.telefono)) {
      setError('El teléfono debe tener 10 dígitos.')
      return
    }

    saveRecipient({ nombre: datos.nombre.trim(), telefono: datos.telefono })
    navigate(ROUTES.orderInfo)
  }

  return (
    <NavBar>
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Web E-commerce
        </p>
        <h1 className="mt-1 text-2xl font-black capitalize text-ink sm:text-3xl">
          Ingresar datos del destinatario
        </h1>
      </div>

      <form
        onSubmit={manejarEnvio}
        noValidate
        className="mx-auto flex w-full max-w-xl flex-col"
      >
        <div className="mb-4">
          <label htmlFor="nombreDestinatario" className={labelClass}>
            Nombre del destinatario:
          </label>
          <input
            id="nombreDestinatario"
            type="text"
            autoComplete="name"
            placeholder="Nombre completo"
            className={inputClass}
            value={datos.nombre}
            onChange={(e) => {
              setDatos((anterior) => ({ ...anterior, nombre: e.target.value }))
              setError('')
            }}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefonoDestinatario" className={labelClass}>
            Teléfono:
          </label>
          <div className="flex gap-3">
            <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-base font-medium text-ink-muted sm:w-24">
              +52
            </div>
            <input
              id="telefonoDestinatario"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="0000000000"
              className={`${inputClass} min-w-0 flex-1`}
              value={datos.telefono}
              onChange={(e) => {
                setDatos((anterior) => ({
                  ...anterior,
                  telefono: e.target.value.replace(/\D/g, '').slice(0, 10),
                }))
                setError('')
              }}
              required
            />
          </div>
        </div>

        {error ? (
          <p role="alert" className="notice notice-danger mb-4">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="mt-2 w-full max-w-[240px] self-center">
          Continuar
        </Button>
      </form>
    </NavBar>
  )
}
