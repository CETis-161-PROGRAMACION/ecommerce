# Web E-commerce

Proyecto del **CETis 161**. Aplicación web de comercio electrónico que conecta los comercios locales de **Tala, Jalisco** con sus clientes: catálogo por sucursal, pedido a domicilio o para recoger, seguimiento de la entrega y acceso del repartidor.

> **Estado actual: versión de demostración.** Todas las pantallas están implementadas, conectadas entre sí y funcionan con datos de prueba locales. No hay backend: la información vive en el navegador (`localStorage`) y se reinicia al borrar los datos del sitio.

---

## Información del proyecto

- **Nombre:** Web E-commerce.
- **Contexto:** proyecto escolar del CETis 161.
- **Descripción:** aplicación web que conecta comercios locales con sus clientes (pedidos a domicilio, en sucursal y seguimiento de entrega), según la documentación de propuesta del repositorio (`Vic/`).
- **Objetivo general:** una base frontend limpia, consistente, accesible y verificable, con el mismo formato visual en todas las pantallas y sin callejones sin salida: todos los botones y enlaces llevan a una pantalla real.
- **Alcance de la fase actual:** las **21 pantallas** están implementadas y verificadas, con sistema de diseño, componentes reutilizables, enrutado completo, datos de demostración y tres flujos cerrados (registro, compra y repartidor).
- **Funcionalidades que siguen fuera del alcance:** backend propio, autenticación real, envío de SMS, pasarela de pagos, integración con proveedores externos, reseñas y geolocalización por GPS.

## Modo demostración

La aplicación funciona sin servidor. Los datos de prueba viven en el navegador, así que cualquier persona que abra la app ve la misma experiencia sin configurar nada.

| Dato                      | Valor         |
| ------------------------- | ------------- |
| Teléfono del cliente      | `3332260919`  |
| Contraseña del cliente    | `demo1234`    |
| Teléfono del repartidor   | `3331122334`  |
| Contraseña del repartidor | `demo1234`    |
| Código de confirmación    | `123456`      |
| Dominio de las sucursales | Tala, Jalisco |

- Las credenciales aparecen en pantalla (inicio de sesión y acceso de repartidor) con un botón que rellena los campos automáticamente.
- El código de confirmación se muestra en la pantalla de confirmación: **no se envía ningún SMS**.
- El estado se guarda en `localStorage` bajo la clave `web-ecommerce-demo:v1`. Para reiniciar la demo, borra los datos del sitio en el navegador.
- Cuando exista un backend real, se reemplazan los cuerpos de `src/services/demoAuth.ts` y los datos de `src/data/`; las pantallas no cambian.

## Tecnologías

Versiones reales instaladas en el proyecto:

| Tecnología                | Versión |
| ------------------------- | ------- |
| Vite                      | 8.3.2   |
| React                     | 19.2.8  |
| TypeScript                | 6.0.2   |
| Tailwind CSS              | 4.3.3   |
| `@tailwindcss/vite`       | 4.3.3   |
| React Router DOM          | 7.18.4  |
| Vitest                    | 5.0.5   |
| Testing Library           | 16.3.3  |
| ESLint                    | 10.10.0 |
| Prettier                  | 3.9.9   |
| pnpm (gestor de paquetes) | 11.8.0  |

## Requisitos previos

- **Node.js 24** (versión usada para instalar y verificar el proyecto).
- **pnpm 11** como gestor de paquetes. El proyecto usa `pnpm-lock.yaml`; no usar `npm` ni `yarn` para no duplicar dependencias.

## Instalación

Desde la raíz del repositorio:

```bash
pnpm install
```

Usa siempre `pnpm`, nunca mezcles gestores de paquetes.

## Ejecución y verificaciones

Todos los scripts están definidos en `package.json`:

| Comando             | Qué hace                                                                |
| ------------------- | ----------------------------------------------------------------------- |
| `pnpm dev`          | Servidor de desarrollo con recarga en caliente.                         |
| `pnpm build`        | Comprueba tipos y compila para producción en `dist/`.                   |
| `pnpm preview`      | Sirve la compilación de producción localmente.                          |
| `pnpm test`         | Ejecuta la suite de pruebas (rutas y flujos).                           |
| `pnpm test:watch`   | Ejecuta las pruebas en modo interactivo.                                |
| `pnpm lint`         | Ejecuta ESLint sobre el proyecto.                                       |
| `pnpm typecheck`    | Comprueba tipos con `tsc -b` sin generar archivos de salida.            |
| `pnpm format`       | Aplica Prettier a `src/` y a los archivos de configuración gestionados. |
| `pnpm format:check` | Comprueba el formato sin modificar archivos.                            |

Antes de dar por terminada una tarea deben pasar las cuatro verificaciones:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Tema oscuro

El botón **Modo oscuro/Modo claro**, en la esquina superior derecha, cambia el tema de toda la aplicación. La primera visita respeta la preferencia de color del sistema; después, la selección se guarda en el navegador.

## Estructura del proyecto

```text
.
├── public/
│   └── favicon.svg                  # Icono de la pestaña
├── src/
│   ├── assets/
│   │   └── images/                  # Logotipo y fotografías de productos
│   ├── components/
│   │   ├── catalog/StoreCatalog.tsx # Catálogo por sucursal (filtros + tarjetas)
│   │   ├── layout/AuthLayout.tsx    # Marco de las pantallas de acceso
│   │   ├── layout/RoleGate.tsx      # Guarda de acceso por rol
│   │   ├── navbar/NavBar.tsx        # Barra superior: búsqueda, perfil, menú
│   │   ├── order/OrderSummary.tsx   # Resumen de pedido y dirección
│   │   ├── sidebar/SideBar.tsx      # Menú lateral de navegación
│   │   └── ui/                      # Componentes visuales reutilizables
│   ├── context/                     # Estado global de la demostración
│   │   ├── AppProvider.tsx          # Proveedor: sesión, dirección, pedidos
│   │   ├── appContext.ts            # Definición del contexto y su tipo
│   │   └── useApp.ts                # Hook de acceso al estado
│   ├── data/                        # Datos de demostración
│   │   ├── orders.ts                # Pedidos iniciales del repartidor
│   │   ├── products.ts              # Catálogo de 7 productos
│   │   ├── stores.ts                # 6 sucursales de Tala, Jalisco
│   │   └── users.ts                 # Usuarios y credenciales de prueba
│   ├── pages/                       # Una carpeta por pantalla
│   ├── plantillas/                  # Plantilla copiable de formulario
│   ├── router/
│   │   ├── index.tsx                # Configuración del enrutador
│   │   └── routes.ts                # Constantes de rutas
│   ├── services/
│   │   ├── demoAuth.ts              # Autenticación de demostración
│   │   └── supabase.ts              # Cliente opcional para el backend futuro
│   ├── test/                        # Pruebas de rutas y flujos
│   ├── types/index.ts               # Tipos compartidos
│   ├── utils/                       # Utilidades (teléfono, dinero, rutas, roles)
│   ├── App.tsx                      # Raíz: tema + RouterProvider
│   ├── index.css                    # Tailwind CSS v4 + tokens de diseño
│   └── main.tsx                     # Punto de entrada de React
├── AGENTS.md                        # Convenciones para sesiones de OpenCode
├── CONTRIBUCIONES.md                # Flujo de Pull Requests
├── MANUAL.md                        # Manual de uso de la aplicación
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

Distinción de responsabilidades:

- **Páginas** (`src/pages/`): pantallas reales, una por directorio.
- **Componentes reutilizables** (`src/components/ui/`): elementos visuales compartidos (`Button`, `Card`, `PillFilter`, `StatusBadge`, `EmptyState`, iconos).
- **Layouts** (`src/components/layout/`): estructuras de presentación compartidas, incluida la guarda de permisos `RoleGate`.
- **Catálogo y pedidos** (`src/components/catalog/`, `src/components/order/`): piezas compartidas por varias pantallas para que el formato sea idéntico.
- **Contexto** (`src/context/`): estado global de la demostración (sesión, dirección, destinatario, selección de producto, pedidos y método de pago).
- **Datos** (`src/data/`): catálogos y usuarios de demostración, editables sin tocar las pantallas.
- **Plantillas copiables** (`src/plantillas/`): esqueletos de referencia para nuevas pantallas.
- **Servicios** (`src/services/`): autenticación de demostración y cliente opcional de Supabase.
- **Tipos** (`src/types/`): tipos compartidos de dominio.
- **Utilidades** (`src/utils/`): funciones auxiliares independientes de las páginas.
- **Enrutador** (`src/router/`): constante de rutas y configuración del enrutador.

## Sistema de rutas

| Ruta                             | Componente                | Acceso          | Qué hace                                                   |
| -------------------------------- | ------------------------- | --------------- | ---------------------------------------------------------- |
| `/`                              | `SplashPage`              | Público         | Portada; redirige a `/repartidor` a los ~2.1 s             |
| `/iniciar-sesion`                | `LoginPage`               | Público         | Acceso del cliente con credenciales de demostración        |
| `/recuperar-datos`               | `RecoveryPage`            | Público         | Recordatorio de la cuenta de prueba                        |
| `/registro`                      | `RegisterPage`            | Público         | Alta de cuenta nueva                                       |
| `/registro/privacidad`           | `PrivacyPage`             | Público         | Términos y política de privacidad                          |
| `/registro/confirmar-codigo`     | `ConfirmCodePage`         | Público         | Captura del código de 6 dígitos                            |
| `/inicio`                        | `HomePage`                | Público         | Catálogo por sucursal, con filtro por categoría y búsqueda |
| `/producto/:id`                  | `ProductDetailPage`       | Público         | Detalle del producto y sus opciones                        |
| `/pedido/direccion-cliente`      | `AddressPage`             | Solo cliente    | Dirección de entrega                                       |
| `/pedido/direccion-destinatario` | `UserDestiny`             | Solo cliente    | Quién recibe el pedido                                     |
| `/pedido/informacion`            | `OrderInfoPage`           | Solo cliente    | Resumen, método de pago y confirmación del pedido          |
| `/pedido/seguimiento`            | `OrderTrackingPage`       | Solo cliente    | Avance del pedido y contacto con el repartidor             |
| `/perfil`                        | `ProfilePage`             | Con sesión      | Datos de la sesión, método de pago y cierre de sesión      |
| `/sucursales`                    | `SucursalesPage`          | Público         | Las 6 sucursales con mapa y indicaciones                   |
| `/sucursal/menu`                 | `MenuPage`                | Público         | Ficha de la sucursal (`?sucursal=<id>`)                    |
| `/repartidor`                    | `DeliveryAccessPage`      | Público         | Entrada: elegir modo cliente o repartidor                  |
| `/repartidor/iniciar-sesion`     | `DeliveryLoginPage`       | Público         | Acceso del repartidor (valida el rol)                      |
| `/repartidor/registro`           | `DeliveryRegisterPage`    | Público         | Alta de repartidor                                         |
| `/repartidor/pedidos`            | `DeliveryOrdersPage`      | Solo repartidor | Pedidos disponibles, con filtro por sucursal               |
| `/repartidor/pedido/activo`      | `DeliveryOrderDetailPage` | Solo repartidor | Detalle del pedido, reporte de incidencia y entrega        |
| `*`                              | `NotFoundPage`            | Público         | Ruta inexistente, con sugerencias de destinos cercanos     |

- Las constantes de rutas viven en `src/router/routes.ts` (`ROUTES`); el enrutador (React Router DOM, `createBrowserRouter`) en `src/router/index.tsx`.
- No dupliques cadenas de rutas: usa `ROUTES.xxx`.
- El splash usa `useNavigate` con `replace` y limpia su temporizador al desmontar. Respeta `prefers-reduced-motion`.
- Las secciones restringidas se envuelven con `<RoleGate rol="…">` (`src/components/layout/RoleGate.tsx`). Si la sesión no cumple, se muestra un panel de acceso restringido con el motivo y la puerta correcta, nunca una pantalla en blanco.

## Permisos por rol

La aplicación separa **cliente** y **repartidor**, y la comprobación vive en dos capas:

1. **En la acción** (`src/context/AppProvider.tsx`): `login` acepta un rol esperado y **no crea sesión** si la cuenta es de otro rol; `acceptOrder` y `deliverOrder` solo funcionan con sesión de repartidor; `createOrder` solo funciona con sesión de cliente; `confirmReceipt` solo confirma el pedido que el propio cliente acaba de crear.
2. **En la pantalla** (`RoleGate`): cada sección restringida muestra un panel de acceso restringido con el motivo y un botón a la puerta correcta. El menú lateral oculta las secciones del otro rol.

| Acción                                     | Cliente | Repartidor |
| ------------------------------------------ | :-----: | :--------: |
| Ver el catálogo y las sucursales           |   Sí    |     Sí     |
| Personalizar y comprar un producto         |   Sí    |     No     |
| Ver el estado de sus propios pedidos       |   Sí    |     No     |
| Tomar ("aceptar") un pedido disponible     |   No    |     Sí     |
| Marcar un pedido como entregado            |   No    |     Sí     |
| Confirmar la recepción de su propio pedido |   Sí    |     No     |

Las rutas y los mensajes de cada rol están centralizados en `src/utils/roles.ts`. El detalle para el usuario está en el [MANUAL.md](MANUAL.md#11-permisos-por-rol).

## Flujos de la aplicación

Los tres flujos están cerrados y verificados con pruebas automáticas (`src/test/router.test.tsx`).

### 1. Registro de cliente

```text
/registro → /registro/privacidad → /registro/confirmar-codigo → /iniciar-sesion → /inicio
```

El formulario valida nombre, fecha de nacimiento (mínimo 13 años), teléfono de 10 dígitos y contraseña de 8 caracteres. La política exige aceptar términos y privacidad antes de continuar. El código de demostración es `123456`.

### 2. Compra

```text
/inicio → /producto/:id → /pedido/direccion-cliente → /pedido/direccion-destinatario
       → /pedido/informacion → /pedido/seguimiento
```

El resumen muestra el producto, las opciones elegidas, el destinatario y el total (producto + servicio). El botón **Realizar pedido** crea el pedido y abre el seguimiento. Desde el seguimiento se puede marcar el pedido como recibido. El flujo exige una sesión de cliente: con una sesión de repartidor las pantallas muestran el panel de acceso restringido.

### 3. Repartidor

```text
/repartidor → /repartidor/iniciar-sesion → /repartidor/pedidos → /repartidor/pedido/activo
```

El repartidor ve la lista de pedidos, filtra por sucursal, acepta uno, contacta al cliente por teléfono, reporta una incidencia y marca el pedido como entregado.

## Componentes compartidos

### `Button`

Botón en forma de píldora con foco visible y estado deshabilitado. Variantes: `primary` (por defecto), `solid`, `outline`, `ghost` y `danger`. Tamaños: `sm`, `md` y `lg`.

```tsx
import { Button } from '@/components/ui/Button'

;<Button type="submit" disabled={isLoading}>
  Continuar
</Button>
```

### `Card`

Contenedor con superficie, borde y sombra opcional; acepta `padding` y `className`. `CardTitle` rotula la tarjeta.

### `PillFilter`

Píldora de filtro con estado activo, usada por el catálogo y la lista de pedidos.

### `StatusBadge`

Etiqueta de estado (`neutral`, `success`, `warning`, `danger`, `info`).

### `EmptyState`

Estado vacío con título, descripción y acción opcional. Evita pantallas en blanco cuando no hay datos.

### `fieldStyles`

Clases compartidas de formulario (`inputClass`, `labelClass`, `fieldErrorClass`, `inputErrorClass`). Úsalas en todo campo nuevo para que los formularios se vean iguales.

### `AuthLayout`

Estructura común de las pantallas de acceso: logotipo enlazado al inicio, título en mayúsculas, subtítulo `WEB E-COMMERCE` y área de contenido.

```tsx
<AuthLayout title="Iniciar sesión">{/* contenido */}</AuthLayout>
```

### `StoreCatalog` y `OrderSummary`

- `StoreCatalog` es el catálogo por sucursal: filtros por categoría, tarjetas de producto y estado vacío. Es el mismo componente para las tres sucursales del inicio.
- `OrderSummary` es el resumen de pedido (producto, opciones, destinatario, total) y el bloque de dirección. Lo comparten las pantallas de información y de seguimiento para que el formato sea idéntico.

### `RoleGate`

Guarda de acceso por rol (`src/components/layout/RoleGate.tsx`). Envuelve una sección y decide qué se muestra:

```tsx
<RoleGate rol="cliente">
  <OrderInfoPage />
</RoleGate>
```

- `rol="cliente"` o `rol="repartidor"`: solo ese rol entra.
- Sin `rol`: basta con tener una sesión iniciada.

Si la sesión no cumple, renderiza el panel de acceso restringido (motivo, rol actual y botón a la puerta correcta) en lugar de la pantalla.

## Sistema de diseño

- Los tokens se definen en `src/index.css` con Tailwind CSS v4 (`@import "tailwindcss"` y el bloque `@theme`).
- Colores de marca: `brand-400`, `brand-100`, `brand-200`, `navy-900`; texto `ink` e `ink-muted`; bordes `line`; superficies `warm-card`, `warm-pill` y `warm-border`; banner `banner-dark`.
- Estados semánticos con variante `-soft` y `-strong`: `success`, `warning`, `danger`, `info` y `neutral`. Se usan con las utilidades `notice-success`, `notice-warning`, `notice-danger`, `notice-info` y `notice-neutral`.
- Open Sans (pesos 400, 600 y 700) se carga desde Google Fonts en `index.html`, con `system-ui` como fallback del sistema.
- Tailwind CSS v4 se integra mediante el plugin `@tailwindcss/vite` registrado en `vite.config.ts`. No existe `tailwind.config.js`.
- El alias `@` apunta a `src/` tanto en Vite (`vite.config.ts`) como en TypeScript (`tsconfig.app.json`).
- **No repitas valores hexadecimales en las páginas**: usa siempre los tokens.

## Estado de las pantallas

- Las **21 pantallas** están implementadas, conectadas entre sí y verificadas: no queda ningún control sin destino.
- Los botones de Google y Facebook del inicio de sesión están deshabilitados de forma explícita, con una nota visible de que el acceso con redes sociales no está disponible.
- La pantalla de política de privacidad marca el contenido como pendiente del documento oficial.
- Los permisos por rol están implementados en dos capas (acción y pantalla): el cliente no puede tomar pedidos y el repartidor no puede comprar.
- **No existe backend, autenticación real ni envío de SMS**: la demostración es local al navegador y está señalada como tal en pantalla.

## Pruebas

`src/test/router.test.tsx` cubre:

1. Que toda ruta declarada en `ROUTES` tenga componente en el enrutador, sin duplicados y con comodín `*`.
2. Que las 21 rutas rendericen la pantalla correcta (títulos y elementos clave).
3. Los tres flujos completos: registro, compra y repartidor.
4. Los permisos por rol: un cliente no entra al panel del repartidor, un repartidor no entra al flujo de pedido, la puerta equivocada no deja sesión y la capa de estado rechaza la acción aunque se salte la pantalla.
5. La búsqueda del catálogo, el menú lateral con sección activa y la pantalla de ruta inexistente.

```bash
pnpm test
```

## Procedimiento para crear una pantalla nueva

Ejemplo con una pantalla de formulario usando `src/plantillas/FormPageTemplate.tsx`:

1. Crea el directorio de la nueva página: `mkdir -p src/pages/mi-pantalla`.
2. Copia la plantilla: `cp src/plantillas/FormPageTemplate.tsx src/pages/mi-pantalla/MiPantallaPage.tsx`.
3. Renombra el archivo y el componente `FormPageTemplate` → `MiPantallaPage`.
4. Cambia el título en `<AuthLayout title="..." />`.
5. Adapta los campos: conserva solo los necesarios y agrega los propios.
6. Define el estado controlado con `useState`.
7. Implementa la validación local en `handleSubmit` (usa `event.preventDefault()`).
8. Muestra errores accesibles mediante la prop `error` de cada campo.
9. Conecta un servicio únicamente cuando exista una implementación real (en `src/services/`): reemplaza el `TODO(servicio)`.
10. Agrega la ruta en `src/router/routes.ts` y el componente en `src/router/index.tsx`.
11. Ejecuta `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm build`.
12. Revisa el resultado y crea un Pull Request hacia la rama acordada.

Las páginas copiadas **no deben importar** el archivo original de plantilla, ni registrarse desde `src/plantillas/`. Consulta `src/plantillas/README.md`.

## Logotipo

- El logotipo original está en `src/assets/images/logo.png`.
- No reemplaces el recurso original por una imagen parecida ni recortes de maqueta.

## Convenciones de código

- Código y nombres en inglés (componentes, variables, funciones, tipos y carpetas). Interfaz visible para el usuario en español.
- TypeScript estricto en los `tsconfig`.
- Alias `@` para imports desde `src/`.
- Componentes pequeños y reutilizables; cada página en su directorio.
- Accesibilidad: una sola etiqueta `<h1>` por pantalla, etiquetas asociadas a todos los campos, errores accesibles (`role="alert"`), foco visible y contraste suficiente.
- Diseño adaptable (referencia mínima de 360 px) sin desbordamientos horizontales.
- `TODO` para trabajo pendiente; elimínalos al completar la tarea.
- Prohibido simular operaciones: no autenticación, SMS, persistencia ni respuestas de API falsas.
- Conserva los tokens visuales de `src/index.css`; no repitas valores hexadecimales.

## Git y Pull Requests

El flujo del repositorio está definido en `CONTRIBUCIONES.md`. Resumen recomendado:

1. Mantén actualizada la rama de integración (`develop`).
2. Crea una rama de funcionalidad desde `develop`: `git checkout -b tipo/descripcion-corta --no-track origin/develop` (`feat/`, `fix/`, `docs/`, `i18n/`, `chore/`).
3. Trabaja una tarea concreta (vinculada a un issue del repositorio).
4. Ejecuta las verificaciones: `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm build`.
5. Crea un Pull Request hacia `develop`, enlazando el issue.
6. Espera la revisión de los docentes/compañeros y corrige los cambios solicitados.
7. Integra el trabajo cuando esté aprobado.

## Problemas frecuentes

- **Dependencias sin instalar:** ejecuta `pnpm install`. Nunca mezcles `npm`/`yarn` con `pnpm`.
- **Errores de alias `@`:** el alias está en `vite.config.ts` (Vite) y en `tsconfig.app.json` (`baseUrl` + `paths`). Verifica ambos.
- **Problemas con Tailwind CSS v4:** el plugin `@tailwindcss/vite` debe estar en `vite.config.ts`. No uses configuración de Tailwind v3 (`tailwind.config.js`).
- **Errores de TypeScript:** ejecuta `pnpm typecheck`. Usa `import type` para importar solo tipos (`verbatimModuleSyntax`).
- **Errores de ESLint:** ejecuta `pnpm lint`. Separa componentes de módulos de utilidades (regla `react-refresh`): el contexto vive en `src/context/appContext.ts`, no en el proveedor.
- **La demo conserva datos viejos:** borra los datos del sitio en el navegador (o `localStorage` → clave `web-ecommerce-demo:v1`).
- **Conflictos de Git:** ponte al día con la rama de integración antes de abrir el PR y revisa `git diff origin/develop...HEAD`.
- **Problemas al ejecutar scripts:** confirma que el `package.json` define `dev`, `build`, `preview`, `test`, `lint`, `typecheck`, `format` y `format:check`, y usa `pnpm <script>`.
