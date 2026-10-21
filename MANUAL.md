# Manual de uso — Web E-commerce

Guía paso a paso para instalar, explorar y presentar la demostración de **Web E-commerce** (CETis 161).

Este manual explica **cómo se usa la aplicación**. Para la información técnica del proyecto (stack, estructura de carpetas, comandos, convenciones de código), consulta el [README.md](README.md).

---

## Índice

1. [Antes de empezar](#1-antes-de-empezar)
2. [Arrancar la aplicación](#2-arrancar-la-aplicación)
3. [Credenciales de la demostración](#3-credenciales-de-la-demostración)
4. [Pantalla de portada y modo oscuro](#4-pantalla-de-portada-y-modo-oscuro)
5. [Barra superior: búsqueda, perfil y menú](#5-barra-superior-búsqueda-perfil-y-menú)
6. [Flujo 1 — Registro de cliente](#6-flujo-1--registro-de-cliente)
7. [Flujo 2 — Compra de un producto](#7-flujo-2--compra-de-un-producto)
8. [Flujo 3 — Modo repartidor](#8-flujo-3--modo-repartidor)
9. [Catálogo, sucursales y menús](#9-catálogo-sucursales-y-menús)
10. [Perfil y método de pago](#10-perfil-y-método-de-pago)
11. [Permisos por rol](#11-permisos-por-rol)
12. [Mapa de pantallas](#12-mapa-de-pantallas)
13. [Reiniciar la demostración](#13-reiniciar-la-demostración)
14. [Qué es real y qué es simulado](#14-qué-es-real-y-qué-es-simulado)
15. [Preguntas frecuentes](#15-preguntas-frecuentes)
16. [Checklist para la presentación](#16-checklist-para-la-presentación)

---

## 1. Antes de empezar

### Requisitos

| Requisito | Versión mínima | Nota                                        |
| --------- | -------------- | ------------------------------------------- |
| Node.js   | 24             | Versión con la que se verificó el proyecto. |
| pnpm      | 11             | Gestor de paquetes del proyecto.            |

No necesitas base de datos, servidor de correo ni cuenta de servicios externos: la aplicación corre completa en el navegador.

### Instalar dependencias

Desde la raíz del repositorio:

```bash
pnpm install
```

Usa siempre `pnpm` (el proyecto tiene `pnpm-lock.yaml`). No mezcles `npm` ni `yarn`, porque se duplican las dependencias y las versiones dejan de coincidir.

---

## 2. Arrancar la aplicación

```bash
pnpm dev
```

Vite imprime la URL local (por defecto `http://localhost:5173`). Ábrela en el navegador.

Otros comandos útiles:

| Comando          | Para qué sirve                                             |
| ---------------- | ---------------------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo con recarga en caliente.            |
| `pnpm build`     | Compila para producción en `dist/`.                        |
| `pnpm preview`   | Sirve la compilación de producción (para probar el build). |
| `pnpm test`      | Ejecuta las pruebas automáticas de rutas y flujos.         |
| `pnpm lint`      | Revisa el estilo y las reglas del proyecto.                |
| `pnpm typecheck` | Revisa los tipos de TypeScript.                            |

Para una demostración en otro equipo, la ruta más segura es:

```bash
pnpm install && pnpm build && pnpm preview
```

---

## 3. Credenciales de la demostración

La aplicación funciona en **modo demostración**: la validación ocurre en el navegador, sin servidor. Las credenciales aparecen impresas en las propias pantallas de acceso, y en el inicio de sesión del cliente hay un botón que las rellena por ti.

| Rol           | Teléfono     | Contraseña | Dónde se usa                 |
| ------------- | ------------ | ---------- | ---------------------------- |
| Cliente       | `3332260919` | `demo1234` | `/iniciar-sesion`            |
| Repartidor    | `3331122334` | `demo1234` | `/repartidor/iniciar-sesion` |
| Cuenta extra  | `3335566778` | `demo1234` | `/iniciar-sesion`            |
| Código de SMS | `123456`     | —          | `/registro/confirmar-codigo` |

> **No se envía ningún SMS.** El código se muestra en pantalla y también en la nota de "Modo demostración". El botón **Mostrar el código otra vez** lo vuelve a mostrar.

En la pantalla de inicio de sesión, el botón **Llenar los datos de demostración** escribe el teléfono y la contraseña por ti. Lo mismo aplica al acceso del repartidor.

---

## 4. Pantalla de portada y modo oscuro

Al abrir la aplicación aparece la **portada** (`/`) con el logotipo. Es una pantalla de bienvenida que, después de un par de segundos, te lleva al **modo repartidor** (`/repartidor`), que es la pantalla de elección de rol.

### Botón de tema

En la **esquina superior derecha** hay un botón circular que alterna entre modo claro y modo oscuro:

- El ícono de sol aparece en modo oscuro (pulsa para volver a claro).
- El ícono de luna aparece en modo claro (pulsa para ir a oscuro).

La primera visita respeta la preferencia de color del sistema operativo. A partir de la segunda, la aplicación recuerda tu elección en el navegador.

---

## 5. Barra superior: búsqueda, perfil y menú

Todas las pantallas de contenido (catálogo, producto, pedido, perfil, sucursales, repartidor) comparten la misma barra superior, de izquierda a derecha:

| Elemento          | Qué hace                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| **☰ Menú**       | Abre el **menú lateral** con los destinos principales de la aplicación.                               |
| **🏍 Motocicleta** | Atajo al **modo repartidor**. Si ya estás en ese modo, el ícono lleva de vuelta al inicio de cliente. |
| **🔍 Buscar**     | Campo de búsqueda. Al enviar, filtra el catálogo completo y muestra los resultados en el inicio.      |
| **👤 Persona**    | Abre tu **perfil** (`/perfil`).                                                                       |

### La búsqueda

Escribe en el campo y pulsa **Enter** (o el ícono de la lupa del teclado). La aplicación navega a `/inicio?q=lo-que-busques` y el inicio muestra la sección **"Resultados para '…'"** con el catálogo completo filtrado por nombre y categoría. Si no hay coincidencias, aparece un estado vacío con la opción de limpiar la búsqueda.

### El menú lateral

Se abre con el botón **☰** y se cierra con la X, con el fondo oscurecido o al elegir una opción. Contiene:

| Opción             | Destino                           |
| ------------------ | --------------------------------- |
| Inicio             | `/inicio`                         |
| Mi Perfil          | `/perfil`                         |
| Estado de Pedido   | `/pedido/seguimiento`             |
| Sucursales         | `/sucursales`                     |
| Sucursal Kundera   | `/sucursal/menu?sucursal=kundera` |
| Pedidos Repartidor | `/repartidor/pedidos`             |
| Cerrar sesión      | Cierra sesión y vuelve al acceso  |

Arriba del menú se muestra tu nombre y tu rol (Cliente, Repartidor o "Sesión no iniciada"). La opción de la sección en la que estás aparece resaltada.

---

## 6. Flujo 1 — Registro de cliente

```text
/registro → /registro/privacidad → /registro/confirmar-codigo → /iniciar-sesion → /inicio
```

### 6.1 Crear la cuenta — `/registro`

Desde la pantalla de inicio de sesión, elige **Registrarse**.

Llena el formulario:

| Campo               | Regla                                       |
| ------------------- | ------------------------------------------- |
| Nombre completo     | Obligatorio.                                |
| Fecha de nacimiento | Día, mes y año. Se exige **13 años o más**. |
| Teléfono            | 10 dígitos.                                 |
| Contraseña          | Mínimo 8 caracteres, con confirmación.      |

Los errores se muestran debajo del campo correspondiente, en rojo y con `role="alert"`, para que un lector de pantalla los anuncie.

Pulsa **Crear cuenta**.

### 6.2 Términos y privacidad — `/registro/privacidad`

Aparece el texto de los términos y condiciones y de la política de privacidad (marcado como pendiente del documento oficial). Para continuar debes marcar **las dos casillas**:

- Aceptar términos y condiciones de uso.
- Aceptar política de privacidad.

El botón **Siguiente** permanece deshabilitado hasta que marques ambas. Es la primera pantalla donde se nota el modo demostración: el contenido legal es un borrador pendiente de aprobación.

### 6.3 Confirmar el código — `/registro/confirmar-codigo`

Se muestran seis casillas, una por dígito. Escribe el código **`123456`** (una cifra en cada casilla; el cursor avanza solo). La pantalla también muestra el código en la nota de modo demostración, por si prefieres copiarlo.

Pulsa **Confirmar código**. Verás el mensaje de **número confirmado** y enseguida el formulario de inicio de sesión.

> Si entras directo a esta URL sin haber pasado por el registro, la aplicación te devuelve a `/registro` (no hay estado al que volver).

### 6.4 Entrar — `/iniciar-sesion`

Escribe el teléfono y la contraseña. **Llenar los datos de demostración** los pone por ti. También puedes pulsar el botón **Iniciar sesión** y la app entra directo al inicio.

Los botones **Google** y **Facebook** están deshabilitados a propósito, con una nota visible: el acceso con redes sociales no está disponible.

### 6.5 ¿Olvidaste tu contraseña? — `/recuperar-datos`

Desde el inicio de sesión, el enlace **¿Olvidaste tu contraseña?** lleva a esta pantalla. Escribe el teléfono de la cuenta y pulsa **Siguiente**: la aplicación responde con un aviso de "Modo demostración" y te muestra la contraseña de la cuenta de prueba (`demo1234`). No se envía ningún SMS.

---

## 7. Flujo 2 — Compra de un producto

```text
/inicio → /producto/:id → /pedido/direccion-cliente → /pedido/direccion-destinatario
       → /pedido/informacion → /pedido/seguimiento
```

El catálogo es público: cualquiera puede ver los productos y sus precios. Para **comprar** hace falta una sesión de cliente iniciada; si no la hay, las pantallas del pedido muestran el panel de acceso restringido (ver [sección 11](#11-permisos-por-rol)).

### 7.1 Elegir producto — `/inicio`

El inicio muestra un banner de promociones y tres píldoras de sucursal: **KUNDERA**, **CUATRO CAFÉ** y **TU MESA**. Al cambiar de píldora cambia el catálogo.

Cada producto es una tarjeta con imagen, nombre, categoría y precio. Pulsa una tarjeta para abrir su detalle.

### 7.2 Detalle y personalización — `/producto/:id`

La pantalla divide el contenido en dos columnas:

- **Izquierda:** fotografía del producto, nombre, sucursal, categoría, descripción y precio.
- **Derecha:** tarjeta **"Personaliza tu pedido"** con los grupos de opciones del producto (por ejemplo: _Tamaño_, _Tipo de Leche_, _Extras_, _Endulzante_). Los grupos con varias opciones admiten selección múltiple. Debajo hay un campo de **Comentarios** libre.

Pulsa **Siguiente**. La selección queda guardada y avanza a la dirección.

### 7.3 Dirección de entrega — `/pedido/direccion-cliente`

Llena los datos de la calle:

| Campo         | Regla                                                |
| ------------- | ---------------------------------------------------- |
| Código postal | 5 dígitos.                                           |
| Calle         | Obligatoria.                                         |
| Número        | Obligatorio.                                         |
| Colonia       | Obligatoria.                                         |
| Referencia    | Opcional (por ejemplo: "Casa blanca, portón negro"). |

El botón **Ir al mapa** abre Google Maps con la dirección capturada en una pestaña nueva. Es una ayuda real: no necesitas escribirla a mano.

Pulsa **Continuar**.

### 7.4 Destinatario — `/pedido/direccion-destinatario`

Indica **nombre completo** y **teléfono** de quien recibe el pedido (puede ser la misma persona que compra). Pulsa **Continuar**.

### 7.5 Información del pedido — `/pedido/informacion`

La pantalla tiene dos columnas con el mismo formato que el resto de la aplicación:

- **Izquierda — Detalles del pedido:** tarjeta con el producto, las opciones elegidas, el destinatario, el precio del producto y el cargo por servicio de **$25 MXN**. Debajo, el bloque de dirección guardada.
- **Derecha — Método de pago y confirmación:** mapa de la dirección, y tres opciones de pago: **Tarjeta de crédito**, **Tarjeta de débito** y **Pago presencial**. Al elegir _Pago presencial_ se indica que pagarás el cargo de servicio al recibir el pedido.

El enlace **Utilizar una nueva ubicación** regresa al formulario de dirección si quieres corregirla.

Pulsa **Realizar pedido**. La aplicación crea el pedido y abre el seguimiento.

> Si entras a esta pantalla sin haber elegido producto, aparece un estado vacío con el botón para volver al inicio. No hay callejones sin salida.

### 7.6 Seguimiento — `/pedido/seguimiento`

La pantalla de estado del pedido muestra:

- **Resumen de la orden** (producto, opciones, destinatario, total).
- **Dirección** de entrega.
- **Mapa** con la ubicación.
- **Línea de tiempo** con tres hitos: sucursal → repartidor → destino, y una barra de avance según el estado del pedido.
- **Comunicarse con el repartidor**: escribe un mensaje y pulsa **Enviar**. Los mensajes se acumulan en la misma pantalla, guardados solo en ese navegador.
- **Llamar al repartidor**: enlace que abre el marcador telefónico del sistema.

Cuando el repartidor marca el pedido como entregado, el botón **Marcar como recibido** aparece en su lugar y el estado se confirma en pantalla.

---

## 8. Flujo 3 — Modo repartidor

```text
/repartidor → /repartidor/iniciar-sesion → /repartidor/pedidos → /repartidor/pedido/activo
```

### 8.1 Entrar al modo repartidor — `/repartidor`

La portada lleva a esta pantalla, donde eliges:

- **Continuar como repartidor** → acceso del repartidor.
- **Continuar como cliente** → inicio de sesión normal.

También puedes llegar desde el ícono de la motocicleta en la barra superior.

### 8.2 Acceso del repartidor — `/repartidor/iniciar-sesion`

Escribe el teléfono y la contraseña del repartidor (`3331122334` / `demo1234`). Las credenciales están impresas en la nota de "Modo demostración" al pie de la pantalla.

> Si introduces el teléfono de un cliente, la aplicación lo rechaza con el aviso: _"Esa cuenta no es de repartidor. Entra por el acceso de cliente."_ Es una comprobación real dentro de la acción: la sesión **no** se inicia y no queda ninguna cuenta conectada.

Si aún no tienes cuenta de repartidor, usa **Registrarse como repartidor** (`/repartidor/registro`), con el mismo formulario que el registro de cliente.

### 8.3 Lista de pedidos — `/repartidor/pedidos`

A la izquierda hay una tarjeta con los datos del repartidor y su zona (**Tala, Jalisco**). A la derecha, la lista de pedidos disponibles.

- **Filtros por sucursal**: _Todos_, KUNDERA, SANTORI, CUATRO CAFÉ, TU MESA. Cada pedido muestra sucursal, cliente, producto, precio, estado y hora.
- **Aceptar pedido**: el botón con la motocicleta abre el pedido activo.
- Si un filtro no tiene resultados, aparece el estado vacío **"No hay pedidos pendientes"**.

### 8.4 Pedido activo — `/repartidor/pedido/activo`

La pantalla del pedido muestra la foto del producto, el nombre, la sucursal, el precio, un botón para **llamar al cliente** (enlace `tel:`) y el mapa con la dirección.

En la parte inferior hay dos acciones:

- **Reportar un error**: abre una ventana emergente con un área de texto para describir el problema (cliente no responde, dirección incorrecta…). Al guardar, se muestra el aviso de que la incidencia quedó en la demostración y no se envía a ningún servicio externo.
- **Marcar como entregado**: cambia el estado del pedido y muestra la confirmación con el botón **Volver a la lista de pedidos**.

---

## 9. Catálogo, sucursales y menús

### 9.1 Inicio — `/inicio`

- Banner de promociones del día.
- Píldoras para cambiar entre **KUNDERA**, **CUATRO CAFÉ** y **TU MESA**.
- Catálogo de la sucursal activa con filtro por categoría.
- Cuando hay una búsqueda activa, el inicio muestra los resultados de la búsqueda en todas las sucursales.

También puedes abrir el inicio de una sucursal concreta con `/inicio?sucursal=tu-mesa`.

### 9.2 Sucursales — `/sucursales`

Las **6 sucursales** de Tala, Jalisco, con su mapa y su dirección:

| Sucursal     | Dirección                     |
| ------------ | ----------------------------- |
| Kundera      | Donato Guerra 63A             |
| Cuatro Café  | Av. Hidalgo 120, Centro       |
| Tu Mesa      | Francisco I. Madero 45        |
| Doña Mary    | Donato Guerra 220, San Javier |
| Santori      | Manuel Acuña 1A, Barrio Alto  |
| Café Tostado | Donato Guerra 244-A           |

### 9.3 Ficha de sucursal — `/sucursal/menu?sucursal=<id>`

Muestra el logo de la sucursal, su nombre, la dirección, el horario y el estado **Abierto**. Incluye el mapa y el botón **¿Cómo llegar?** (abre la ruta en Google Maps), además de **Ver menú** (lleva al catálogo de esa sucursal) y **Ver todas las sucursales**.

---

## 10. Perfil y método de pago

`/perfil` muestra:

- Tu avatar, tu nombre y tu teléfono.
- La tarjeta **Método de pago**, con tres opciones seleccionables: **Tarjeta de crédito**, **Tarjeta de débito** y **Pago presencial**. La opción activa se marca con un ícono de palomita. La elección se guarda y se respeta al hacer el pedido.
- El aviso: _"Modo demostración: no se guardan datos de tarjetas reales."_
- El botón **Cerrar sesión**, que borra la sesión y vuelve al inicio de sesión del rol con el que estabas conectado.

---

## 11. Permisos por rol

La aplicación distingue dos roles, **cliente** y **repartidor**. Cada uno entra por su propia puerta y solo puede usar las secciones que le corresponden:

| Acción                                      | Cliente | Repartidor |
| ------------------------------------------- | :-----: | :--------: |
| Ver el catálogo, las sucursales y los menús |   Sí    |     Sí     |
| Personalizar y comprar un producto          |   Sí    |     No     |
| Ver el estado de sus propios pedidos        |   Sí    |     No     |
| Tomar ("aceptar") un pedido disponible      |   No    |     Sí     |
| Marcar un pedido como entregado             |   No    |     Sí     |
| Confirmar la recepción de su propio pedido  |   Sí    |     No     |

Estas restricciones **no son un aviso cosmético**: están comprobadas dentro de las acciones del estado. Aunque se intente ejecutar la acción desde la consola del navegador, el pedido no se acepta, no se entrega y no se crea.

### 11.1 Entrar por la puerta equivocada

Cada pantalla de acceso solo acepta cuentas de su propio rol:

- En `/iniciar-sesion` se rechazan las cuentas de repartidor con el aviso _"Esa cuenta es de repartidor. Entra por el acceso de repartidor"_ y un enlace directo a la puerta correcta.
- En `/repartidor/iniciar-sesion` se rechazan las cuentas de cliente con el aviso _"Esa cuenta no es de repartidor. Entra por el acceso de cliente"_.

En ambos casos **no se inicia ninguna sesión**: la puerta equivocada no deja al usuario conectado.

### 11.2 El panel de acceso restringido

Si abres una sección que no te corresponde (por ejemplo, la lista de pedidos del repartidor con una sesión de cliente), la pantalla no desaparece ni se queda en blanco: se muestra el panel **"Acceso restringido"**, que explica el motivo, recuerda con qué cuenta estás conectado y ofrece dos salidas:

- **Cerrar sesión y entrar como repartidor**: borra la sesión y abre la puerta del rol que corresponde a esa sección.
- **Volver a mi inicio**: regresa al catálogo (cliente) o a la lista de pedidos (repartidor).

Las secciones restringidas son:

| Sección                          | Rol que la puede ver |
| -------------------------------- | -------------------- |
| `/pedido/direccion-cliente`      | Cliente              |
| `/pedido/direccion-destinatario` | Cliente              |
| `/pedido/informacion`            | Cliente              |
| `/pedido/seguimiento`            | Cliente              |
| `/repartidor/pedidos`            | Repartidor           |
| `/repartidor/pedido/activo`      | Repartidor           |
| `/perfil`                        | Cualquier rol        |

### 11.3 El menú lateral se adapta al rol

El menú lateral solo muestra las secciones que te tocan: el **cliente** ve _Estado de Pedido_ y el **repartidor** ve _Pedidos Repartidor_. El ícono de la motocicleta lleva al repartidor directamente a su lista de pedidos; si no eres repartidor, te lleva a la pantalla `/repartidor`, donde eliges con qué cuenta continuar.

---

## 12. Mapa de pantallas

| Ruta                             | Pantalla               | Cómo llegar                                    |
| -------------------------------- | ---------------------- | ---------------------------------------------- |
| `/`                              | Portada                | Se abre al entrar; avanza sola a `/repartidor` |
| `/iniciar-sesion`                | Inicio de sesión       | Desde la portada o el menú lateral             |
| `/recuperar-datos`               | Recuperar datos        | Enlace "Olvidé mi contraseña"                  |
| `/registro`                      | Registro               | Enlace "Registrarse"                           |
| `/registro/privacidad`           | Términos y privacidad  | Automática tras completar el registro          |
| `/registro/confirmar-codigo`     | Confirmar código       | Automática tras aceptar los términos           |
| `/inicio`                        | Inicio / catálogo      | Después de iniciar sesión                      |
| `/producto/:id`                  | Detalle de producto    | Al pulsar una tarjeta del catálogo             |
| `/pedido/direccion-cliente`      | Dirección de entrega   | "Siguiente" en el detalle del producto         |
| `/pedido/direccion-destinatario` | Destinatario           | "Continuar" en la dirección                    |
| `/pedido/informacion`            | Información del pedido | "Continuar" en el destinatario                 |
| `/pedido/seguimiento`            | Estado del pedido      | "Realizar pedido"                              |
| `/perfil`                        | Perfil                 | Botón de persona en la barra superior          |
| `/sucursales`                    | Sucursales             | Menú lateral                                   |
| `/sucursal/menu`                 | Ficha de sucursal      | Menú lateral o "Ver todas las sucursales"      |
| `/repartidor`                    | Acceso (elegir rol)    | Portada o ícono de motocicleta                 |
| `/repartidor/iniciar-sesion`     | Acceso del repartidor  | "Continuar como repartidor"                    |
| `/repartidor/registro`           | Registro de repartidor | Enlace desde el acceso del repartidor          |
| `/repartidor/pedidos`            | Pedidos disponibles    | "Aceptar pedido" o menú lateral                |
| `/repartidor/pedido/activo`      | Pedido activo          | "Aceptar pedido" en la lista                   |
| `*`                              | Página no encontrada   | Cualquier ruta inexistente                     |

La pantalla de ruta inexistente ofrece sugerencias de destinos cercanos para que nunca se quede stranded.

---

## 13. Reiniciar la demostración

La demo guarda el estado en el navegador, en la clave `web-ecommerce-demo:v1` de `localStorage` (sesión, dirección, destinatario, selección de producto, pedidos y método de pago).

Para volver al estado inicial:

1. Abre las herramientas del navegador.
2. Ve a **Almacenamiento / Application → Local Storage**.
3. Borra la clave `web-ecommerce-demo:v1`.
4. Recarga la página.

Alternativa: borra los datos del sitio desde los ajustes del navegador.

La preferencia de tema se guarda aparte, en la clave `theme`.

---

## 14. Qué es real y qué es simulado

Esta tabla es la que conviene tener clara antes de presentar:

| Función                                 | Estado en la demo                                                |
| --------------------------------------- | ---------------------------------------------------------------- |
| Interfaz, navegación y rutas            | **Real.** Las 21 pantallas funcionan y están conectadas.         |
| Validación de formularios               | **Real.** Se valida en el navegador y los errores se muestran.   |
| Catálogo, sucursales y precios          | **Datos de prueba** editables en `src/data/`.                    |
| Sesión de cliente y repartidor          | **Simulada** en el navegador. Sin servidor de autenticación.     |
| Permisos por rol                        | **Real.** Se validan en las acciones y al abrir cada sección.    |
| Código de confirmación por SMS          | **Simulado.** El código se muestra en pantalla; no se envía SMS. |
| Pagos                                   | **Simulados.** No se procesa ninguna transacción real.           |
| Mapas y "cómo llegar"                   | **Real**: se usa Google Maps.                                    |
| Llamadas al cliente o repartidor        | **Real**: enlace `tel:` que abre el marcador del teléfono.       |
| Mensajes al repartidor                  | **Locales**: se guardan en el navegador y no se envían.          |
| Reporte de incidencia del repartidor    | **Local**: queda registrado en la demo, sin servicio externo.    |
| Ubicación del repartidor en tiempo real | **Simulada.** La línea de tiempo es ilustrativa.                 |
| Datos persistentes entre dispositivos   | **No.** Cada navegador tiene su propia copia.                    |

La aplicación lo dice en pantalla: hay avisos de "Modo demostración" en el inicio de sesión, en el acceso del repartidor, en la confirmación del código, en el perfil y en el reporte de incidencias.

---

## 15. Preguntas frecuentes

**¿Necesito internet?**
Solo para cargar la fuente Open Sans y los mapas de Google. El resto de la aplicación funciona sin conexión una vez cargada.

**¿Por qué el código de confirmación aparece en pantalla?**
Porque no hay pasarela de SMS en esta fase. En pantalla se indica que el código válido es `123456`. Cuando exista el backend, se sustituye la implementación de `src/services/auth.ts` y la pantalla no cambia.

**¿Se guardan mis datos en algún servidor?**
No. Todo vive en `localStorage` de tu navegador y desaparece al borrarlo.

**Entré como repartidor con el teléfono de un cliente y no me deja.**
Es correcto: el acceso de repartidor valida el rol de la cuenta. Usa `3331122334` / `demo1234`.

**Entré como repartidor y quiero hacer un pedido.**
No se puede, y es lo correcto: el repartidor no compra. Puede abrir el catálogo público (`/inicio`), pero las pantallas del pedido le muestran el panel de acceso restringido. Ver [sección 11](#11-permisos-por-rol).

**Estoy conectado como cliente y no me deja abrir la lista de pedidos del repartidor.**
También es correcto: esa sección es solo del repartidor. El panel te ofrece **Cerrar sesión y entrar como repartidor** para cambiar de cuenta.

**Me equivoqué de puerta al iniciar sesión. ¿Quedé conectado?**
No. Si introduces una cuenta del otro rol, la aplicación muestra el aviso correspondiente y **no inicia ninguna sesión**: tienes que entrar por la puerta correcta.

**No aparece ningún pedido en la lista del repartidor.**
Cada pedido se acepta una sola vez. Al marcarlo como entregado desaparece de la lista; recargar con una base limpia (ver sección 13) recupera los cuatro pedidos de prueba.

**La búsqueda no encuentra nada.**
La búsqueda filtra por nombre y categoría del producto, en todas las sucursales. Prueba con "café", "croissant" o "burger".

**¿Cómo vuelvo al inicio desde cualquier pantalla?**
Con el botón **☰** de la barra superior y la opción _Inicio_, o pulsando el logotipo en las pantallas de acceso.

**Las imágenes de los productos no cargan.**
Verifica que la carpeta `src/assets/images/` esté completa y que ejecutaste `pnpm install`. En el build de producción las imágenes se copian a `dist/assets/`.

---

## 16. Checklist para la presentación

Antes de mostrar el proyecto, comprueba:

- [ ] `pnpm install` ejecutado sin errores.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm build` en verde.
- [ ] `pnpm dev` levantado y la URL abierta.
- [ ] Datos del sitio borrados (estado limpio) para empezar desde cero.
- [ ] Acceso de cliente probado (`3332260919` / `demo1234`).
- [ ] Acceso de repartidor probado (`3331122334` / `demo1234`).
- [ ] Compra completa probada: producto → dirección → destinatario → información → seguimiento.
- [ ] Permisos probados: con sesión de cliente la lista del repartidor está restringida; con sesión de repartidor el flujo de pedido está restringido.
- [ ] Búsqueda y menú lateral probados.
- [ ] Tema claro y oscuro probados.
- [ ] Vista en móvil (390 px de ancho) revisada: no hay desbordes horizontales.

### Guion rápido de 5 minutos

1. **Portada** → modo repartidor → volver a modo cliente.
2. **Inicio**: recorrido por las tres sucursales y el filtro por categoría.
3. **Búsqueda**: "café" desde la barra superior.
4. **Compra**: producto → personalización → dirección → destinatario → método de pago → realizar pedido.
5. **Seguimiento**: línea de tiempo, mensaje al repartidor, botón de llamada.
6. **Repartidor**: lista de pedidos, filtro por sucursal, aceptar, ver mapa, reportar incidencia, marcar entregado.
7. **Permisos**: con la sesión de cliente abierta, entrar a _Pedidos Repartidor_ y mostrar el panel de acceso restringido.
8. **Perfil**: método de pago y cierre de sesión.
9. **Tema oscuro** y **vista en móvil**.
