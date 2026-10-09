# Plantillas copiables

## ¿Para qué sirve esta carpeta?

`src/plantillas/` contiene esqueletos de referencia que los estudiantes pueden copiar para desarrollar pantallas nuevas sin partir de cero.

Reglas importantes:

- Las plantillas **no se importan desde las páginas de producción**.
- Las plantillas **no se registran en el router**.
- Una página copiada **no depende** del archivo de plantilla original: al copiarla, se convierte en un archivo independiente.

Si un cambio visual debe aplicarse a todas las páginas, modifica el componente reutilizable correspondiente en `src/components/`, no la plantilla.

## ¿Qué es `FormPageTemplate.tsx`?

Un esqueleto completo de pantalla con formulario: layout de autenticación (`AuthLayout`), campos controlados (`PhoneField`, `TextField`), validación local, errores accesibles y un `TODO` donde se conectará el servicio real cuando exista.

La plantilla **no simula operaciones exitosas**: al enviar un formulario válido valida, muestra errores si los hay y, si todo es correcto, solo deja un `TODO` para el servicio. No navega, no muestra mensajes de éxito ni hace peticiones de red.

## Cómo copiarla a `src/pages/`

1. Crea tu directorio (si no existe):

   ```bash
   mkdir -p src/pages/mi-pantalla
   ```

2. Copia la plantilla:

   ```bash
   cp src/plantillas/FormPageTemplate.tsx src/pages/mi-pantalla/MiPantallaPage.tsx
   ```

3. Renombra el componente `FormPageTemplate` → `MiPantallaPage` (nombre del archivo y del componente deben coincidir).
4. Cambia el título en `<AuthLayout title="..." />`.
5. Elimina los campos que no necesites (`PhoneField`, `TextField`) y agrega los específicos de tu pantalla.
6. Elimina los comentarios de plantilla que ya no sean necesarios.

## Cómo usar los componentes compartidos

### `AuthLayout`

Estructura común de las pantallas relacionadas con autenticación: logotipo a la izquierda, título en mayúsculas y área de contenido.

```tsx
import { AuthLayout } from '@/components/layout/AuthLayout'

export function MiPantallaPage() {
  return <AuthLayout title="Mi título">{/* contenido */}</AuthLayout>
}
```

### `Button`

Botón en forma de píldora. Recibe los atributos estándar de un botón HTML.

```tsx
import { Button } from '@/components/ui/Button'

;<Button type="submit" disabled={esValido}>
  Continuar
</Button>
```

### `TextField`

Campo de texto con etiqueta asociada, error opcional y atributos estándar de input.

```tsx
import { TextField } from '@/components/ui/TextField'

;<TextField
  label="Contraseña"
  type="password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  error={errores.password}
/>
```

### `PhoneField`

Campo de teléfono mexicano con prefijo visual `+52`. Controla su valor desde el componente padre.

```tsx
import { PhoneField } from '@/components/ui/PhoneField'

;<PhoneField
  label="Número de teléfono"
  value={phone}
  onChange={setPhone}
  error={errores.phone}
/>
```

El prefijo `+52` es un elemento visual separado: no se incluye en el valor del estado.

### `Logo`

Muestra el logotipo original. Acepta `className` para controlar dimensiones.

```tsx
import { Logo } from '@/components/ui/Logo'

;<Logo className="h-28 w-28" />
```

Si el archivo `src/assets/images/logo.png` no existe, `Logo` no renderiza nada (no inventa un sustituto) y la pantalla splash no puede verificarse visualmente.

## Cómo controlar el estado de los campos

Usa `useState` y propaga el valor controlado a los componentes de campo:

```tsx
const [phone, setPhone] = useState('')
const [password, setPassword] = useState('')
```

## Cómo validar formularios

1. Trata el evento de envío con `event.preventDefault()` para evitar recargar la página.
2. Construye un objeto de errores; asigna un mensaje a cada campo inválido.
3. Guarda el objeto con `setErrors`.
4. Si existe algún error, detén el flujo antes de llamar a un servicio.

Utiliza las validaciones de `src/utils/phone.ts` (`isValidPhone`, `sanitizePhone`).

## Cómo mostrar errores accesibles

Los componentes `TextField`, `PhoneField` y `Button` ya asocian etiquetas, errores y atributos ARIA (`aria-invalid`, `aria-describedby`). Pasa el mensaje vía la prop `error`:

```tsx
<TextField label="Contraseña" error={errores.password} {...} />
```

## Dónde colocar la lógica de negocio

En `src/services/`. Los componentes de página solo coordinan estado local, validación y llamadas a servicios. En esta fase no existe ningún servicio real.

## Cómo conectar un servicio cuando exista

Cuando haya una implementación real (API, backend, SMS):

1. Crea el módulo en `src/services/` (por ejemplo `src/services/auth.ts`).
2. Reemplaza el `TODO(servicio)` de la plantilla por la llamada al servicio.
3. Maneja sus estados reales (`loading`, `error`, resultado).

No simules respuestas de API ni estados de carga artificiales.

## Cómo agregar una ruta

Las rutas se declaran en `src/router/routes.ts` y el enrutador en `src/router/index.tsx`:

```tsx
// src/router/routes.ts
export const ROUTES = {
  // ...rutas existentes,
  miPantalla: '/mi-pantalla',
} as const

// src/router/index.tsx
import { MiPantallaPage } from '@/pages/mi-pantalla/MiPantallaPage'

{ path: ROUTES.miPantalla, element: <MiPantallaPage /> },
```

## Cómo ejecutar las verificaciones

Desde la raíz del repositorio:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

## Cómo comprobar los cambios antes de crear un Pull Request

1. Ejecuta las verificaciones anteriores y confirma que terminan sin errores.
2. Revisa el diff completo con `git diff origin/dev...HEAD`.
3. Verifica que el diff solo contenga lo necesario y que los textos visibles estén en español.
4. Abre el Pull Request hacia la rama acordada por el equipo y espera la revisión.

Los comentarios `TODO` deben eliminarse cuando la tarea correspondiente se haya completado.
