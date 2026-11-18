# Web E-commerce


Proyecto del **CETis 161**. Base frontend de la aplicación web de comercio electrónico, desarrollada para que los estudiantes de programación construyan las pantallas de manera colaborativa.

## Información del proyecto

- **Nombre:** Web E-commerce.
- **Contexto:** proyecto escolar del CETis 161.
- **Descripción:** aplicación web que conecta comercios locales con sus clientes (pedidos a domicilio, en sucursal y reservaciones), según la documentación de propuesta del repositorio (`Vic/`).
- **Objetivo general:** ofrecer una base frontend limpia, consistente, accesible y verificable sobre la cual cada estudiante pueda desarrollar una pantalla de forma independiente.
- **Alcance de la fase actual:** aplicación conectada a Supabase (autenticación con correo y contraseña, catálogo, carrito, pedidos, seguimiento con chat, calificaciones, cuenta, ajustes, ayuda y panel de repartidor).
- **Funcionalidades todavía no implementadas:** pasarela de pagos en línea (solo efectivo o tarjeta contra entrega), geolocalización con mapa, notificaciones push, panel de administración (las solicitudes de repartidor se aprueban a mano en la tabla `driver_applications`) y un aviso de privacidad legal definitivo.
=======
Esta plantilla ofrece una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/)


## Tecnologías


Versiones reales instaladas en el proyecto (verificado en `node_modules`):

| Tecnología                | Versión |
| ------------------------- | ------- |
| Vite                      | 8.3.2   |
| React                     | 19.3.0  |
| TypeScript                | 6.0.3   |
| Tailwind CSS              | 4.3.3   |
| `@tailwindcss/vite`       | 4.3.3   |
| React Router DOM          | 7.18.4  |
| ESLint                    | 10.11.0 |
| Prettier                  | 3.9.9   |
| pnpm (gestor de paquetes) | 12.10.1 |

## Requisitos previos

- **Node.js 24.21.0** (versión usada para instalar y verificar el proyecto).
- **pnpm 12.10.1** como gestor de paquetes. El proyecto usa `pnpm-lock.yaml`; no usar `npm` ni `yarn` para no duplicar dependencias.

## Instalación

Desde la raíz del repositorio:
=======
El React Compiler no está habilitado en esta plantilla por su impacto en el rendimiento del desarrollo y de la compilación. Para agregarlo, consulta [esta documentación](https://react.dev/learn/react-compiler/installation).

## Ampliar la configuración de ESLint

Si desarrollas una aplicación para producción, se recomienda actualizar la configuración para habilitar las reglas de lint con información de tipos:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Otras configuraciones...

      // Quita tseslint.configs.recommended y reemplázalo con este
      tseslint.configs.recommendedTypeChecked,
      // Como alternativa, usa este para reglas más estrictas
      tseslint.configs.strictTypeChecked,
      // Opcionalmente, agrega este para reglas de estilo
      tseslint.configs.stylisticTypeChecked,

      // Otras configuraciones...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // otras opciones...
    },
  },
])


```bash
pnpm install
```


Usa siempre `pnpm`, nunca mezcles gestores de paquetes.
=======
También puedes instalar [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) para obtener reglas de lint específicas de React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Otras configuraciones...
      // Habilita las reglas de lint para React
      reactX.configs['recommended-typescript'],
      // Habilita las reglas de lint para React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // otras opciones...
    },
  },
])

## Ejecución y verificaciones

Todos los scripts están definidos en `package.json`:

| Comando             | Qué hace                                                                |
| ------------------- | ----------------------------------------------------------------------- |
| `pnpm dev`          | Servidor de desarrollo con recarga en caliente.                         |
| `pnpm build`        | Comprueba tipos y compila para producción en `dist/`.                   |
| `pnpm preview`      | Sirve la compilación de producción localmente.                          |
| `pnpm lint`         | Ejecuta ESLint sobre el proyecto.                                       |
| `pnpm typecheck`    | Comprueba tipos con `tsc -b` sin generar archivos de salida.            |
| `pnpm format`       | Aplica Prettier a `src/` y a los archivos de configuración gestionados. |
| `pnpm format:check` | Comprueba el formato sin modificar archivos.                            |

## Tema oscuro

El botón **Modo oscuro/Modo claro**, en la esquina superior derecha, cambia el tema de toda la aplicación. La primera visita respeta la preferencia de color del sistema; después, la selección se guarda en el navegador.

## Estructura del proyecto

```text
.
├── public/
│   └── favicon.svg                 # Icono de la pestaña
├── src/
│   ├── assets/
│   │   └── images/                 # Imágenes de la aplicación
│   │       └── (logo.png)          # Logotipo original (pendiente de colocar)
│   ├── components/
│   │   ├── layout/
│   │   │   └── AuthLayout.tsx      # Estructura de pantallas de autenticación
│   │   └── ui/
│   │       ├── Button.tsx          # Botón reutilizable
│   │       ├── Logo.tsx            # Logotipo de la aplicación
│   │       ├── PhoneField.tsx      # Campo de teléfono mexicano (+52)
│   │       └── TextField.tsx       # Campo de texto con etiqueta y error
│   ├── pages/
│   │   ├── splash/SplashPage.tsx
│   │   ├── login/LoginPage.tsx
│   │   ├── recovery/RecoveryPage.tsx
│   │   └── register/ConfirmCodePage.tsx
│   ├── plantillas/
│   │   ├── FormPageTemplate.tsx    # Plantilla copiable de formulario
│   │   └── README.md               # Documentación de la plantilla
│   ├── router/
│   │   ├── index.tsx               # Configuración del enrutador
│   │   └── routes.ts               # Constantes de rutas
│   ├── utils/
│   │   └── phone.ts                # Validaciones de teléfono
│   ├── App.tsx                     # Raíz: monta el RouterProvider
│   ├── index.css                   # Tailwind CSS v4 + tokens de diseño
│   └── main.tsx                    # Punto de entrada de React
├── AGENTS.md                       # Convenciones para sesiones de OpenCode
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── .prettierrc
```

Distinción de responsabilidades:

- **Páginas** (`src/pages/`): pantallas reales, una por directorio.
- **Componentes reutilizables** (`src/components/ui/`): elementos visuales compartidos.
- **Layouts** (`src/components/layout/`): estructuras de presentación compartidas.
- **Plantillas copiables** (`src/plantillas/`): esqueletos de referencia para nuevas pantallas.
- **Servicios** (`src/services/`): se creará para las futuras integraciones con APIs cuando existan.
- **Catálogo** (`src/services/catalog/products.ts`): negocios, categorías y productos. Las fotos son de cada negocio, pero **los nombres, precios y descripciones son datos de ejemplo** (`CATALOG_IS_SAMPLE = true`) hasta tener la información real.
- **Carrito** (`src/services/cart/`): `CartProvider` envuelve la app y `useCart()` permite agregar, cambiar cantidad y eliminar productos. El estado vive en memoria: se pierde al recargar la página hasta que exista un backend.
- **Tipos** (`src/types/`): se creará para los tipos compartidos cuando existan.
- **Utilidades** (`src/utils/`): funciones auxiliares independientes de las páginas.
- **Enrutador** (`src/router/`): constante de rutas y configuración del enrutador.

## Componentes compartidos

### `Logo`

Muestra el logotipo original. Acepta `className` para dimensiones.

```tsx
import { Logo } from '@/components/ui/Logo'

;<Logo className="h-14 w-14" />
```

### `Button`

Botón en forma de píldora, con foco visible y estado deshabilitado.

```tsx
import { Button } from '@/components/ui/Button'

;<Button type="submit" disabled={isLoading}>
  Continuar
</Button>
```

### `TextField`

Campo de texto con etiqueta asociada, error opcional y atributos estándar de input.

```tsx
<TextField
  label="Contraseña"
  type="password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  error={errors.password}
/>
```

### `PhoneField`

Campo de teléfono mexicano (10 dígitos) con prefijo visual `+52`. Valor controlado desde el padre; limpia caracteres no numéricos.

```tsx
<PhoneField
  label="Número de teléfono"
  value={phone}
  onChange={setPhone}
  error={errors.phone}
/>
```

### `AuthLayout`

Estructura común: logotipo a la izquierda, título en mayúsculas, subtítulo `WEB E-COMMERCE` y área de contenido.

```tsx
<AuthLayout title="Iniciar sesión">{/* contenido */}</AuthLayout>
```

## Sistema de diseño

- Los tokens se definen en `src/index.css` con Tailwind CSS v4 (`@import "tailwindcss"` y el bloque `@theme`).
- Colores de marca: `brand-400`, `brand-100`, `brand-200`, `navy-900`; texto `ink` e `ink-muted`; bordes `line`; éxito `success`. Uso como clases: `text-ink`, `bg-brand-400`, `border-line`, `text-success`.
- Open Sans (pesos 400, 600 y 700) se carga desde Google Fonts en `index.html`, con `system-ui` como fallback del sistema.
- Tailwind CSS v4 se integra mediante el plugin `@tailwindcss/vite` registrado en `vite.config.ts`. No existe `tailwind.config.js`.
- El alias `@` apunta a `src/` tanto en Vite (`vite.config.ts`) como en TypeScript (`tsconfig.app.json`).

## Configuración de Supabase

1. Copia `.env.example` a `.env.local` y rellena `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` (Project Settings > API). Usa solo la clave publicable; nunca la `service_role`. `.env.local` no se sube a git.
2. En Authentication > Sign In / Providers, el proyecto usa correo y contraseña. Con "Confirm email" activo el registro pide un código que llega al correo (la plantilla debe incluir `{{ .Token }}`); con "Confirm email" apagado entra directo.
3. Para aprobar a un repartidor: `update driver_applications set status = 'approved' where "userId" = '<id>';`

## Sistema de rutas

Las rutas se definen en `src/router/routes.ts` (`ROUTES`) y el enrutador en `src/router/index.tsx`. Las pantallas que requieren sesión usan `RequireAuth` y las del repartidor `RequireDriver` (`src/router/guards.tsx`).

| Ruta | Pantalla | Acceso |
| ---- | -------- | ------ |
| `/` | `SplashPage` | Público; redirige a `/iniciar-sesion` |
| `/iniciar-sesion`, `/registro/privacidad`, `/registro`, `/registro/confirmar-codigo`, `/recuperar-datos/confirm-recovery`, `/confirmar-codigo` | Inicio de sesión, aviso de privacidad, registro y recuperación de contraseña | Público |
| `/inicio` | `HomePage` (catálogo y buscador `?q=`) | Público |
| `/producto/:productId`, `/negocio/:slug`, `/negocio/:slug/menu`, `/sucursales` | Producto, negocio, menú y sucursales | Público |
| `/ajustes`, `/ayuda`, `/acerca-de` | Tema y contraseña, preguntas frecuentes e información del proyecto | Público (la contraseña requiere sesión) |
| `/info/pedido`, `/pedido/tipo-de-pago`, `/pedido/direccion-cliente`, `/pedido/direccion-destinatario` | Información del pedido, pago, dirección y destinatario | Sesión |
| `/pedido/en-camino/:orderId`, `/pedido/entregado/:orderId` | Seguimiento (con chat) y pedido entregado | Sesión |
| `/pedidos`, `/cuenta` | Historial y datos de la cuenta | Sesión |
| `/repartidor`, `/repartidor/iniciar-sesion`, `/repartidor/registro` | Acceso, inicio de sesión y registro de repartidor | Público |
| `/repartidor/registro/vehiculo` | Vehículo y foto de la licencia | Sesión |
| `/repartidor/inicio`, `/repartidor/pedidos`, `/repartidor/pedidos/:pedidoId` | Panel, pedidos disponibles y detalle de entrega | Repartidor |

- No dupliques cadenas de rutas: usa `ROUTES.xxx`.
- El splash usa `useNavigate` con `replace` y limpia su temporizador al desmontar. Respeta `prefers-reduced-motion`.
- El tema (claro, oscuro o automático) se guarda en `localStorage` y se cambia desde el botón flotante o en Ajustes.

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
11. Ejecuta `pnpm lint`.
12. Ejecuta `pnpm typecheck`.
13. Compila con `pnpm build`.
14. Revisa el resultado y crea un Pull Request hacia la rama acordada.

Las páginas copiadas **no deben importar** el archivo original de plantilla, ni registrarse desde `src/plantillas/`. Consulta `src/plantillas/README.md`.

## Logotipo

- El logotipo original debe colocarse en `src/assets/images/logo.png`.
- Mientras el archivo no exista, `Logo` no renderiza nada y **la pantalla splash no puede verificarse visualmente**. No se genera ni se inventa un logotipo sustituto.
- No reemplaces el recurso original por una imagen parecida ni recortes de maqueta.

## Convenciones de código

- Código y nombres en inglés (componentes, variables, funciones, tipos y carpetas). Interfaz visible para el usuario en español.
- TypeScript estricto en los `tsconfig`.
- Alias `@` para imports desde `src/`.
- Componentes pequeños y reutilizables; cada página en su directorio.
- Accesibilidad: etiquetas asociadas, errores accesibles (`aria-invalid`, `aria-describedby`), foco visible, contraste suficiente.
- Diseño adaptable (referencia mínima de 360 px) sin desbordamientos horizontales.
- `TODO` para trabajo pendiente; elimínalos al completar la tarea.
- Prohibido simular operaciones: no autenticación, SMS, persistencia ni respuestas de API falsas.
- Conserva los tokens visuales de `src/index.css`; no repitas valores hexadecimales.

## Git y Pull Requests

El flujo del repositorio está definido en `CONTRIBUCIONES.md`. Resumen recomendado:

1. Mantén actualizada la rama de integración (`dev`).
2. Crea una rama de funcionalidad desde `dev`: `git checkout -b tipo/descripcion-corta --no-track origin/dev` (`feat/`, `fix/`, `docs/`, `i18n/`, `chore/`).
3. Trabaja una tarea concreta (vinculada a un issue del repositorio).
4. Ejecuta las verificaciones: `pnpm lint`, `pnpm typecheck`, `pnpm build`.
5. Crea un Pull Request hacia `dev`, enlazando el issue.
6. Espera la revisión de los docentes/compañeros y corrige los cambios solicitados.
7. Integra el trabajo cuando esté aprobado.

## Problemas frecuentes

- **Dependencias sin instalar:** ejecuta `pnpm install`. Nunca mezcles `npm`/`yarn` con `pnpm`.
- **Errores de alias `@`:** el alias está en `vite.config.ts` (Vite) y en `tsconfig.app.json` (`baseUrl` + `paths`). Verifica ambos.
- **Problemas con Tailwind CSS v4:** el plugin `@tailwindcss/vite` debe estar en `vite.config.ts`. No uses configuración de Tailwind v3 (`tailwind.config.js`).
- **Errores de TypeScript:** ejecuta `pnpm typecheck`. Usa `import type` para importar solo tipos (`verbatimModuleSyntax`).
- **Errores de ESLint:** ejecuta `pnpm lint`. Separa componentes de módulos de utilidades (regla `react-refresh`).
- **Falta del logotipo:** coloca el archivo original en `src/assets/images/logo.png`.
- **Conflictos de Git:** ponte al día con la rama de integración antes de abrir el PR y revisa `git diff origin/dev...HEAD`.
- **Problemas al ejecutar scripts:** confirma que el `package.json` define `dev`, `build`, `preview`, `lint`, `typecheck`, `format` y `format:check`, y usa `pnpm <script>`.
