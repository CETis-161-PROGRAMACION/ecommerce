/**
 * Tests de rutas — verifican que:
 * 1. Cada ruta declarada en ROUTES renderiza el componente correcto.
 * 2. No existe ninguna ruta en ROUTES sin componente asignado en el router.
 * 3. Las rutas inexistentes caen en NotFoundPage (wildcard *).
 * 4. Las redirecciones automáticas y de navegación interactiva funcionen correctamente.
 */

import { isValidElement } from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { routes } from '@/router'
import { ROUTES } from '@/router/routes'

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
})

afterEach(() => {
  vi.useRealTimers()
  cleanup()
})

// ─── Helper de renderizado ─────────────────────────────────────────────────────
function renderAtPath(
  entry: string | { pathname: string; state?: Record<string, unknown> },
) {
  const initialEntry =
    typeof entry === 'string'
      ? entry === ROUTES.confirmCode
        ? {
            pathname: ROUTES.confirmCode,
            state: { telefono: '3312345678' },
          }
        : entry
      : entry

  const memRouter = createMemoryRouter(routes, {
    initialEntries: [initialEntry],
  })

  render(<RouterProvider router={memRouter} />)
  return memRouter
}

// ─────────────────────────────────────────────────────────────────────────────
//  1. Completitud de rutas y declaraciones
// ─────────────────────────────────────────────────────────────────────────────
describe('Completitud y declaración de rutas', () => {
  it('todas las claves de ROUTES tienen una ruta registrada en el router', () => {
    const registeredPaths = routes.map((r) => r.path).filter((p) => p !== '*') // el wildcard no corresponde a ninguna clave de ROUTES

    const declaredPaths = Object.values(ROUTES) as string[]
    const missing = declaredPaths.filter((p) => !registeredPaths.includes(p))

    expect(
      missing,
      `Las siguientes rutas están declaradas en ROUTES pero no tienen componente en el router: ${missing.join(', ')}`,
    ).toEqual([])
  })

  it('no existen rutas duplicadas en la configuración', () => {
    const paths = routes.map((r) => r.path)
    const duplicates = paths.filter(
      (path, index) => paths.indexOf(path) !== index,
    )
    expect(duplicates).toEqual([])
  })

  it('declara una ruta comodín de captura (*) para rutas no encontradas', () => {
    const wildcardRoute = routes.find((r) => r.path === '*')
    expect(wildcardRoute).toBeDefined()
    expect(isValidElement(wildcardRoute?.element)).toBe(true)
  })

  it('cada ruta registrada tiene un elemento React válido asignado', () => {
    routes.forEach((route) => {
      expect(
        isValidElement(route.element),
        `La ruta "${route.path}" no tiene un elemento React válido`,
      ).toBe(true)
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  2. Tests individuales por ruta (renderizado correcto de componentes)
// ─────────────────────────────────────────────────────────────────────────────
describe('Rutas → componente correcto', () => {
  it(`ROUTES.splash (/) → SplashPage, no muestra 404`, () => {
    renderAtPath(ROUTES.splash)
    expect(screen.queryByText(/página no encontrada/i)).not.toBeInTheDocument()
  })

  it(`ROUTES.login → LoginPage`, () => {
    renderAtPath(ROUTES.login)
    expect(
      screen.getByRole('heading', { name: /iniciar sesión/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.recovery → RecoveryPage`, () => {
    renderAtPath(ROUTES.recovery)
    expect(
      screen.getByRole('heading', { name: /recuperar datos/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.register → RegisterPage`, () => {
    renderAtPath(ROUTES.register)
    expect(
      screen.getByRole('heading', { name: /^registro$/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.confirmCode → ConfirmCodePage (con estado)`, () => {
    renderAtPath(ROUTES.confirmCode)
    expect(
      screen.getByRole('heading', { name: /confirmar código/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.privacy → PrivacyPage`, () => {
    renderAtPath(ROUTES.privacy)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /política de privacidad/i,
      }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.home → HomePage`, () => {
    renderAtPath(ROUTES.home)
    expect(
      screen.getByRole('heading', {
        name: /descubre los mejores sabores locales/i,
      }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.productDetail → ProductDetailPage`, () => {
    renderAtPath(ROUTES.productDetail)
    expect(
      screen.getByRole('heading', { name: /principito/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.sucursales → SucursalesPage`, () => {
    renderAtPath(ROUTES.sucursales)
    expect(
      screen.getByRole('heading', { name: /^sucursales$/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.menu → MenuPage`, () => {
    renderAtPath(ROUTES.menu)
    expect(screen.getByText(/¿cómo llegar\?/i)).toBeInTheDocument()
  })

  it(`ROUTES.clienteDireccion → AddressPage`, () => {
    renderAtPath(ROUTES.clienteDireccion)
    expect(screen.getByText(/calle/i)).toBeInTheDocument()
  })

  it(`ROUTES.userDestiny → UserDestiny`, () => {
    renderAtPath(ROUTES.userDestiny)
    expect(screen.getByText(/nombre del destinatario/i)).toBeInTheDocument()
  })

  it(`ROUTES.deliveryAccess → DeliveryAccessPage`, () => {
    renderAtPath(ROUTES.deliveryAccess)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(screen.queryByText(/página no encontrada/i)).not.toBeInTheDocument()
  })

  it(`ROUTES.deliveryLogin → DeliveryLoginPage`, () => {
    renderAtPath(ROUTES.deliveryLogin)
    expect(
      screen.getByRole('heading', { name: /acceso del repartidor/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.deliveryRegister → DeliveryRegisterPage`, () => {
    renderAtPath(ROUTES.deliveryRegister)
    expect(
      screen.getByRole('heading', { name: /registro de repartidor/i }),
    ).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  3. Redirecciones y navegación interactiva
// ─────────────────────────────────────────────────────────────────────────────
describe('Redirecciones y navegación', () => {
  it('redirige de /registro/confirmar-codigo a /registro si se entra sin teléfono en el estado', () => {
    const memRouter = createMemoryRouter(routes, {
      initialEntries: [ROUTES.confirmCode],
    })
    render(<RouterProvider router={memRouter} />)
    expect(memRouter.state.location.pathname).toBe(ROUTES.register)
  })

  it('navega de DeliveryAccessPage a DeliveryLoginPage al presionar "Continuar como repartidor"', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = createMemoryRouter(routes, {
      initialEntries: [ROUTES.deliveryAccess],
    })
    render(<RouterProvider router={memRouter} />)

    const deliveryButton = await screen.findByRole('button', {
      name: /continuar como repartidor/i,
    })
    await user.click(deliveryButton)

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.deliveryLogin)
    })
  })

  it('navega de DeliveryAccessPage a LoginPage al presionar "Continuar como cliente"', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = createMemoryRouter(routes, {
      initialEntries: [ROUTES.deliveryAccess],
    })
    render(<RouterProvider router={memRouter} />)

    const skipButton = await screen.findByRole('button', {
      name: /continuar como cliente/i,
    })
    await user.click(skipButton)

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.login)
    })
  })

  it('navega al inicio (/) desde NotFoundPage al pulsar "Ir al inicio"', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = createMemoryRouter(routes, {
      initialEntries: ['/ruta-inexistente-para-probar-boton'],
    })
    render(<RouterProvider router={memRouter} />)

    const homeButton = await screen.findByRole('button', {
      name: /ir al inicio/i,
    })
    await user.click(homeButton)

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.splash)
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  4. Wildcard * → NotFoundPage
// ─────────────────────────────────────────────────────────────────────────────
describe('Wildcard * → NotFoundPage', () => {
  it('ruta completamente desconocida renderiza NotFoundPage', () => {
    renderAtPath('/esta-ruta-no-existe-xyz')
    expect(
      screen.getByRole('heading', { name: /página no encontrada/i }),
    ).toBeInTheDocument()
  })

  it('ruta profunda desconocida renderiza NotFoundPage', () => {
    renderAtPath('/a/b/c/d')
    expect(
      screen.getByRole('heading', { name: /página no encontrada/i }),
    ).toBeInTheDocument()
  })

  it('muestra el pathname incorrecto en el mensaje', () => {
    renderAtPath('/ruta-inventada')
    expect(screen.getByText(/\/ruta-inventada/)).toBeInTheDocument()
  })
})
