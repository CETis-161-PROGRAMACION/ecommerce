/**
 * Tests de rutas y flujos — verifican que:
 * 1. Cada ruta declarada en ROUTES renderiza el componente correcto.
 * 2. No existe ninguna ruta en ROUTES sin componente asignado en el router.
 * 3. Las rutas inexistentes caen en NotFoundPage (wildcard *).
 * 4. Los flujos principales (registro, compra y repartidor) llegan hasta el
 *    final sin callejones sin salida.
 */

import { isValidElement, useState } from 'react'
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AppProvider } from '@/context/AppProvider'
import { useApp } from '@/context/useApp'
import { demoUsers } from '@/data/users'
import { routes } from '@/router'
import { ROUTES } from '@/router/routes'

beforeEach(() => {
  window.localStorage.clear()
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

  render(
    <AppProvider>
      <RouterProvider router={memRouter} />
    </AppProvider>,
  )
  return memRouter
}

// ─── Helpers de sesión ────────────────────────────────────────────────────────
const STORAGE_KEY = 'web-ecommerce-demo:v1'

/**
 * Deja una sesión iniciada en el almacenamiento de la demostración, igual que
 * lo haría el inicio de sesión real de la aplicación.
 */
function sembrarSesion(
  rol: 'cliente' | 'repartidor',
  extra: Record<string, unknown> = {},
) {
  const usuario = demoUsers.find((item) => item.rol === rol)

  if (!usuario) {
    throw new Error(`No hay usuario de demostración con el rol ${rol}`)
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      session: {
        id: usuario.id,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        rol: usuario.rol,
      },
      address: null,
      recipient: null,
      selection: null,
      ultimoPedidoId: null,
      metodoPago: 'credito',
      orders: [],
      ...extra,
    }),
  )
}

/** Datos de un pedido ya capturado, listos para crear la orden. */
const DATOS_PEDIDO = {
  address: {
    codigoPostal: '45300',
    calle: 'Donato Guerra',
    numero: '63A',
    colonia: 'Centro',
    referencia: '',
  },
  recipient: { nombre: 'Daniela Ríos', telefono: '3334455667' },
  selection: { productId: 'principito', opciones: {}, comentarios: '' },
}

/** Sesión guardada en el almacenamiento de la demostración. */
function sesionGuardada(): { rol?: string; nombre?: string } | null {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  return (
    (JSON.parse(raw) as { session?: { rol?: string; nombre?: string } })
      .session ?? null
  )
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
    expect(
      screen.getByRole('heading', { level: 1, name: /web e-commerce/i }),
    ).toBeInTheDocument()
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
      screen.getByRole('heading', { name: /descubre los mejores sabores/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.productDetail → ProductDetailPage (ruta dinámica)`, () => {
    renderAtPath('/producto/principito')
    expect(
      screen.getByRole('heading', { name: /principito/i }),
    ).toBeInTheDocument()
  })

  it('una ruta de producto inexistente muestra la pantalla de error', () => {
    renderAtPath('/producto/no-existe')
    expect(
      screen.getByRole('heading', { name: /página no encontrada/i }),
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
    expect(
      screen.getByRole('heading', { level: 1, name: /kundera/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.clienteDireccion → AddressPage`, () => {
    sembrarSesion('cliente')
    renderAtPath(ROUTES.clienteDireccion)
    expect(
      screen.getByRole('heading', { name: /ingresar dirección/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/código postal/i)).toBeInTheDocument()
  })

  it(`ROUTES.userDestiny → UserDestiny`, () => {
    sembrarSesion('cliente')
    renderAtPath(ROUTES.userDestiny)
    expect(
      screen.getByRole('heading', { name: /datos del destinatario/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/nombre del destinatario/i),
    ).toBeInTheDocument()
  })

  it(`ROUTES.deliveryAccess → DeliveryAccessPage`, () => {
    renderAtPath(ROUTES.deliveryAccess)
    expect(
      screen.getByRole('heading', { level: 1, name: /web e-commerce/i }),
    ).toBeInTheDocument()
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

  it(`ROUTES.deliveryOrders → DeliveryOrdersPage`, () => {
    sembrarSesion('repartidor')
    renderAtPath(ROUTES.deliveryOrders)
    expect(
      screen.getByRole('heading', { name: /pedidos disponibles/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.deliveryOrderDetail → DeliveryOrderDetailPage`, () => {
    sembrarSesion('repartidor')
    renderAtPath(ROUTES.deliveryOrderDetail)
    expect(
      screen.getByRole('heading', { name: /principito/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.orderInfo → OrderInfoPage`, () => {
    sembrarSesion('cliente')
    renderAtPath(ROUTES.orderInfo)
    expect(
      screen.getByRole('heading', { name: /información de pedido/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.orderTracking → OrderTrackingPage`, () => {
    sembrarSesion('cliente')
    renderAtPath(ROUTES.orderTracking)
    expect(
      screen.getByRole('heading', { name: /estado del pedido/i }),
    ).toBeInTheDocument()
  })

  it(`ROUTES.profile → ProfilePage`, () => {
    sembrarSesion('cliente')
    renderAtPath(ROUTES.profile)
    expect(
      screen.getByRole('heading', { name: /^perfil$/i }),
    ).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  3. Flujos completos (sin callejones sin salida)
// ─────────────────────────────────────────────────────────────────────────────
describe('Flujo de registro', () => {
  it('el registro lleva a la política de privacidad con el teléfono en el estado', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.register)

    await user.type(
      screen.getByLabelText(/nombre completo/i),
      'Michell Hernandez',
    )
    await user.type(screen.getByLabelText(/día de nacimiento/i), '10')
    await user.type(screen.getByLabelText(/mes de nacimiento/i), '05')
    await user.type(screen.getByLabelText(/año de nacimiento/i), '1998')
    await user.type(screen.getByLabelText(/número de teléfono/i), '3339998877')
    await user.type(screen.getByLabelText(/^contraseña:/i), 'demo1234')
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'demo1234')

    await user.click(screen.getByRole('button', { name: /crear cuenta/i }))

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.privacy)
    })
  })

  it('aceptar los términos lleva a la confirmación del código', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath({
      pathname: ROUTES.privacy,
      state: { telefono: '3312345678' },
    })

    const boton = screen.getByRole('button', { name: /siguiente/i })
    expect(boton).toBeDisabled()

    await user.click(screen.getByLabelText(/términos y condiciones/i))
    await user.click(screen.getByLabelText(/política de privacidad/i))
    await user.click(boton)

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.confirmCode)
    })
  })

  it('el código de demostración válido habilita el acceso', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.confirmCode)

    const digitos = screen.getAllByLabelText(/dígito/i)
    expect(digitos).toHaveLength(6)

    // El código se escribe de una casilla a otra: 1 2 3 4 5 6
    for (const [indice, digito] of [...'123456'].entries()) {
      await user.type(digitos[indice], digito)
    }

    await user.click(screen.getByRole('button', { name: /confirmar código/i }))

    await waitFor(() => {
      expect(screen.getByText(/número confirmado/i)).toBeInTheDocument()
    })

    // Tras confirmar, la app envía al inicio de sesión.
    await waitFor(
      () => {
        expect(memRouter.state.location.pathname).toBe(ROUTES.login)
      },
      { timeout: 4000 },
    )
  })
})

describe('Flujo de inicio de sesión', () => {
  it('con las credenciales de demostración entra al inicio', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.login)

    await user.type(screen.getByLabelText(/número de teléfono/i), '3332260919')
    await user.type(screen.getByLabelText(/^contraseña$/i), 'demo1234')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.home)
    })
  })

  it('el botón de la demostración rellena las credenciales', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderAtPath(ROUTES.login)

    await user.click(
      screen.getByRole('button', { name: /llenar los datos de demostración/i }),
    )

    expect(screen.getByLabelText(/número de teléfono/i)).toHaveValue(
      '3332260919',
    )
    expect(screen.getByLabelText(/^contraseña$/i)).toHaveValue('demo1234')
  })

  it('credenciales incorrectas muestran un error', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.login)

    await user.type(screen.getByLabelText(/número de teléfono/i), '3332260919')
    await user.type(screen.getByLabelText(/^contraseña$/i), 'incorrecta')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(memRouter.state.location.pathname).toBe(ROUTES.login)
  })
})

describe('Flujo de compra', () => {
  it('producto → dirección → destinatario → información → seguimiento', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('cliente')
    const memRouter = renderAtPath('/producto/principito')

    // 1. Producto
    await user.click(screen.getByRole('button', { name: /^siguiente$/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.clienteDireccion)
    })

    // 2. Dirección
    await user.type(screen.getByLabelText(/código postal/i), '45300')
    await user.type(screen.getByLabelText(/^calle:/i), 'Donato Guerra')
    await user.type(screen.getByLabelText(/número exterior/i), '63A')
    await user.type(screen.getByLabelText(/colonia/i), 'Centro')
    await user.click(screen.getByRole('button', { name: /continuar/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.userDestiny)
    })

    // 3. Destinatario
    await user.type(
      screen.getByLabelText(/nombre del destinatario/i),
      'Daniela Ríos',
    )
    await user.type(screen.getByLabelText(/teléfono:/i), '3334455667')
    await user.click(screen.getByRole('button', { name: /continuar/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.orderInfo)
    })

    // 4. Información del pedido
    await user.click(screen.getByRole('button', { name: /realizar pedido/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.orderTracking)
    })

    // 5. Seguimiento
    expect(
      (await screen.findAllByText(/pedido recibido/i)).length,
    ).toBeGreaterThan(0)
  })

  it('el resumen del pedido muestra el producto y el total', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('cliente')
    const memRouter = renderAtPath('/producto/principito')

    await user.click(screen.getByRole('button', { name: /^siguiente$/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.clienteDireccion)
    })

    await user.type(screen.getByLabelText(/código postal/i), '45300')
    await user.type(screen.getByLabelText(/^calle:/i), 'Donato Guerra')
    await user.type(screen.getByLabelText(/número exterior/i), '63A')
    await user.type(screen.getByLabelText(/colonia/i), 'Centro')
    await user.click(screen.getByRole('button', { name: /continuar/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.userDestiny)
    })

    await user.type(
      screen.getByLabelText(/nombre del destinatario/i),
      'Daniela Ríos',
    )
    await user.type(screen.getByLabelText(/teléfono:/i), '3334455667')
    await user.click(screen.getByRole('button', { name: /continuar/i }))
    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.orderInfo)
    })

    expect(screen.getAllByText('Principito').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Daniela Ríos').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$105.00').length).toBeGreaterThan(0)
  })
})

describe('Flujo del repartidor', () => {
  it('el acceso de repartidor valida el rol y lleva a los pedidos', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.deliveryLogin)

    await user.type(screen.getByLabelText(/número de teléfono/i), '3331122334')
    await user.type(screen.getByLabelText(/^contraseña:/i), 'demo1234')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.deliveryOrders)
    })
  })

  it('una cuenta de cliente no puede entrar como repartidor', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.deliveryLogin)

    await user.type(screen.getByLabelText(/número de teléfono/i), '3332260919')
    await user.type(screen.getByLabelText(/^contraseña:/i), 'demo1234')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /no es de repartidor/i,
    )
    expect(memRouter.state.location.pathname).toBe(ROUTES.deliveryLogin)
  })

  it('aceptar un pedido abre el detalle del pedido', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('repartidor')
    const memRouter = renderAtPath(ROUTES.deliveryOrders)

    const botones = await screen.findAllByRole('button', {
      name: /aceptar pedido/i,
    })
    expect(botones.length).toBeGreaterThan(0)

    await user.click(botones[0])

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.deliveryOrderDetail)
    })
  })

  it('el filtro por sucursal reduce la lista de pedidos', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('repartidor')
    renderAtPath(ROUTES.deliveryOrders)

    const antes = await screen.findAllByRole('button', {
      name: /aceptar pedido/i,
    })

    await user.click(screen.getByRole('button', { name: /^kundera$/i }))

    const despues = await screen.findAllByRole('button', {
      name: /aceptar pedido/i,
    })

    expect(despues.length).toBeLessThan(antes.length)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  4. Permisos por rol
// ─────────────────────────────────────────────────────────────────────────────
describe('Permisos por rol', () => {
  it('un cliente no puede entrar al panel del repartidor', () => {
    sembrarSesion('cliente')
    renderAtPath(ROUTES.deliveryOrders)

    expect(screen.getByText(/acceso restringido/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /solo para repartidores/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /aceptar pedido/i }),
    ).not.toBeInTheDocument()
  })

  it('sin sesión tampoco se puede entrar al panel del repartidor', () => {
    renderAtPath(ROUTES.deliveryOrders)

    expect(screen.getByText(/acceso restringido/i)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /aceptar pedido/i }),
    ).not.toBeInTheDocument()
  })

  it('un repartidor no puede entrar al flujo de pedido del cliente', () => {
    sembrarSesion('repartidor')
    renderAtPath(ROUTES.orderInfo)

    expect(screen.getByText(/acceso restringido/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /solo para clientes/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /realizar pedido/i }),
    ).not.toBeInTheDocument()
  })

  it('el perfil exige una sesión iniciada', () => {
    renderAtPath(ROUTES.profile)

    expect(screen.getByText(/acceso restringido/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /inicia sesión para ver tu perfil/i,
      }),
    ).toBeInTheDocument()
  })

  it('la puerta de cliente rechaza una cuenta de repartidor y no deja sesión', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.login)

    await user.type(screen.getByLabelText(/número de teléfono/i), '3331122334')
    await user.type(screen.getByLabelText(/^contraseña$/i), 'demo1234')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /es de repartidor/i,
    )
    expect(memRouter.state.location.pathname).toBe(ROUTES.login)
    expect(sesionGuardada()).toBeNull()
  })

  it('la puerta de repartidor rechaza una cuenta de cliente y no deja sesión', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.deliveryLogin)

    await user.type(screen.getByLabelText(/número de teléfono/i), '3332260919')
    await user.type(screen.getByLabelText(/^contraseña:/i), 'demo1234')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /no es de repartidor/i,
    )
    expect(memRouter.state.location.pathname).toBe(ROUTES.deliveryLogin)
    expect(sesionGuardada()).toBeNull()
  })

  it('el menú lateral esconde las secciones del otro rol', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('cliente')
    renderAtPath(ROUTES.home)

    await user.click(screen.getByRole('button', { name: /abrir menú/i }))

    const menu = await screen.findByRole('complementary', {
      name: /menú principal de navegación/i,
    })

    expect(
      within(menu).queryByRole('link', { name: /pedidos repartidor/i }),
    ).not.toBeInTheDocument()
    expect(
      within(menu).getByRole('link', { name: /estado de pedido/i }),
    ).toBeInTheDocument()
  })

  it('el repartidor no ve la sección de estado de pedido del cliente', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('repartidor')
    renderAtPath(ROUTES.deliveryOrders)

    await user.click(screen.getByRole('button', { name: /abrir menú/i }))

    const menu = await screen.findByRole('complementary', {
      name: /menú principal de navegación/i,
    })

    expect(
      within(menu).queryByRole('link', { name: /estado de pedido/i }),
    ).not.toBeInTheDocument()
    expect(
      within(menu).getByRole('link', { name: /pedidos repartidor/i }),
    ).toBeInTheDocument()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  5. Capa de estado: las acciones respetan el rol aunque se salten la pantalla
// ─────────────────────────────────────────────────────────────────────────────
function HarnessPermisos() {
  const { orders, createOrder, acceptOrder } = useApp()
  const [resultado, setResultado] = useState('sin ejecutar')

  function intentarCrear() {
    const pedido = createOrder('A domicilio')
    setResultado(pedido ? 'pedido creado' : 'pedido rechazado')
  }

  function intentarAceptar() {
    const aceptacion = acceptOrder(orders[0]?.id ?? '')
    setResultado(
      aceptacion.ok
        ? 'pedido aceptado'
        : `pedido rechazado: ${aceptacion.error}`,
    )
  }

  return (
    <div>
      <button type="button" onClick={intentarCrear}>
        Crear pedido
      </button>
      <button type="button" onClick={intentarAceptar}>
        Aceptar pedido
      </button>
      <p data-testid="resultado">{resultado}</p>
      <p data-testid="total">{orders.length}</p>
      <p data-testid="estado">{orders[0]?.estado}</p>
    </div>
  )
}

describe('Capa de estado (permisos)', () => {
  it('un repartidor no puede crear un pedido aunque salte la pantalla', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('repartidor', DATOS_PEDIDO)

    render(
      <AppProvider>
        <HarnessPermisos />
      </AppProvider>,
    )

    await user.click(screen.getByRole('button', { name: /crear pedido/i }))

    expect(screen.getByTestId('resultado')).toHaveTextContent(
      'pedido rechazado',
    )
    expect(screen.getByTestId('total')).toHaveTextContent('4')
  })

  it('un cliente no puede aceptar un pedido aunque salte la pantalla', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('cliente')

    render(
      <AppProvider>
        <HarnessPermisos />
      </AppProvider>,
    )

    await user.click(screen.getByRole('button', { name: /aceptar pedido/i }))

    expect(screen.getByTestId('resultado')).toHaveTextContent(
      'pedido rechazado',
    )
    expect(screen.getByTestId('estado')).toHaveTextContent('disponible')
  })

  it('un repartidor sí puede aceptar un pedido', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('repartidor')

    render(
      <AppProvider>
        <HarnessPermisos />
      </AppProvider>,
    )

    await user.click(screen.getByRole('button', { name: /aceptar pedido/i }))

    expect(screen.getByTestId('resultado')).toHaveTextContent('pedido aceptado')
    expect(screen.getByTestId('estado')).toHaveTextContent('asignado')
  })

  it('un cliente sí puede crear un pedido', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    sembrarSesion('cliente', DATOS_PEDIDO)

    render(
      <AppProvider>
        <HarnessPermisos />
      </AppProvider>,
    )

    await user.click(screen.getByRole('button', { name: /crear pedido/i }))

    expect(screen.getByTestId('resultado')).toHaveTextContent('pedido creado')
    expect(screen.getByTestId('total')).toHaveTextContent('5')
  })
})

describe('Búsqueda del catálogo', () => {
  it('la búsqueda filtra los productos del inicio', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.home)

    await user.type(screen.getByLabelText(/buscar productos/i), 'burger{Enter}')

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.home)
      expect(memRouter.state.location.search).toContain('q=burger')
    })

    expect(
      (await screen.findAllByText(/burger clásica/i)).length,
    ).toBeGreaterThan(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  4. Redirecciones y navegación
// ─────────────────────────────────────────────────────────────────────────────
describe('Redirecciones y navegación', () => {
  it('redirige de /registro/confirmar-codigo a /registro si se entra sin teléfono en el estado', () => {
    const memRouter = createMemoryRouter(routes, {
      initialEntries: [ROUTES.confirmCode],
    })
    render(
      <AppProvider>
        <RouterProvider router={memRouter} />
      </AppProvider>,
    )
    expect(memRouter.state.location.pathname).toBe(ROUTES.register)
  })

  it('navega de DeliveryAccessPage a DeliveryLoginPage al presionar "Continuar como repartidor"', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const memRouter = renderAtPath(ROUTES.deliveryAccess)

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
    const memRouter = renderAtPath(ROUTES.deliveryAccess)

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
    const memRouter = renderAtPath('/ruta-inexistente-para-probar-boton')

    const homeButton = await screen.findByRole('button', {
      name: /ir al inicio/i,
    })
    await user.click(homeButton)

    await waitFor(() => {
      expect(memRouter.state.location.pathname).toBe(ROUTES.splash)
    })
  })

  it('el menú lateral marca la sección activa', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    renderAtPath(ROUTES.sucursales)

    await user.click(screen.getByRole('button', { name: /abrir menú/i }))

    const menu = await screen.findByRole('complementary', {
      name: /menú principal de navegación/i,
    })

    const enlaces = within(menu).getAllByRole('link')
    const activo = enlaces.find(
      (enlace) => enlace.getAttribute('aria-current') === 'page',
    )

    expect(activo?.textContent).toMatch(/sucursales/i)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
//  5. Wildcard * → NotFoundPage
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

  it('no sugiere rutas con parámetros', () => {
    renderAtPath('/ruta-inventada')
    expect(screen.queryByText('/producto/:id')).not.toBeInTheDocument()
  })
})
