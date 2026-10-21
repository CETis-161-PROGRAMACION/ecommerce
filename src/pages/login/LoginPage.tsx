import { AuthLayout } from '@/components/layout/AuthLayout'
import { ROUTES } from '@/router/routes'

// TODO: Implementar la pantalla de inicio de sesión. Elementos previstos por
// la referencia:
// - Campo de número de teléfono (PhoneField).
// - Campo de contraseña (TextField con type="password").
// - Botón de inicio de sesión.
// - Opciones visuales de continuación con Google y Facebook.
// - Enlace para recuperar la contraseña (ROUTES.recovery).
// - Enlace de registro.
// No simular autenticación: conectar un servicio real cuando exista.

export function LoginPage() {
  return (
    <AuthLayout title="Iniciar sesión" mainClassName="w-full">
      <form onSubmit={(e) => e.preventDefault()} noValidate className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* Número de teléfono */}
          <div>
            <label
              htmlFor="telefono"
              className="mb-3 block text-xl font-bold text-ink sm:text-2xl"
            >
              Número de telefono:
            </label>
            <div className="flex gap-3">
              <select
                id="codigoPais"
                aria-label="Código de país"
                className="h-12 w-16 shrink-0 appearance-none rounded-lg border border-line bg-surface px-2 text-center text-base font-normal text-ink-muted outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100 sm:w-20"
              >
                <option value="+52">+52</option>
                <option value="+1">+1</option>
                <option value="+57">+57</option>
              </select>
              <input
                id="telefono"
                type="tel"
                autoComplete="tel-national"
                placeholder="0000000000"
                className="h-12 w-full rounded-lg border border-line bg-surface px-4 text-base text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="contrasena"
              className="mb-3 block text-xl font-bold text-ink sm:text-2xl"
            >
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              autoComplete="current-password"
              placeholder="........"
              className="h-12 w-full rounded-lg border border-line bg-surface px-4 text-base text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>

        {/* Botón Iniciar sesión */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href={ROUTES.home}
            role="button"
            className="w-full max-w-[280px] rounded-full bg-brand-100 py-3 text-center text-base font-medium text-black transition-colors hover:bg-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            Iniciar sesión
          </a>
        </div>`

        {/* o continuar con */}
        <p className="mt-6 text-center text-sm font-normal text-ink-muted">
          o continuar con
        </p>

        {/* Botones sociales */}
        <div className="mt-5 flex justify-center gap-6">
          <button
            type="button"
            className="h-11 w-28 rounded-lg border border-line bg-surface text-center text-base font-normal text-ink transition-colors hover:bg-brand-100/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 sm:w-32"
          >
            Google
          </button>
          <button
            type="button"
            className="h-11 w-28 rounded-lg border border-line bg-surface text-center text-base font-normal text-ink transition-colors hover:bg-brand-100/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 sm:w-32"
          >
            Facebook
          </button>
        </div>

        {/* Enlace recuperar contraseña */}
        <div className="mt-6 text-center">
          <a
            href={ROUTES.recovery}
            className="text-sm font-medium text-brand-400 transition-colors hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Enlace registro */}
        <p className="mt-4 text-center text-sm text-ink">
          ¿No tienes una cuenta?{' '}
          <a
            href={ROUTES.register}
            className="underline underline-offset-2 hover:opacity-80"
          >
            Regístrate
          </a>
        </p>
      </form>
    </AuthLayout>
  )
}
