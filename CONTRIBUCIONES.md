# Guía de contribuciones

Este documento describe el orden de trabajo del repositorio. Aplica a cualquier cambio, por pequeño que sea. El camino que sigue un cambio depende de si puede romper la web o no.

## Ramas permanentes

- `main`: código estable, el que se entrega. Es la rama que debe funcionar siempre.
- `develop`: rama de integración. Aquí se juntan y se prueban los cambios que pueden romper la web antes de pasar a `main`.

## Qué camino sigue cada cambio

### Cambios que pueden romper la web: pasan por `develop` y luego `main`

Un cambio puede romper la web si toca el código o la forma en que se construye y se instala la aplicación. Ejemplos:

- Cualquier archivo dentro de `src/` y `public/`.
- `index.html`.
- Dependencias y scripts: `package.json` y `pnpm-lock.yaml`.
- Configuración: `vite.config.ts`, `eslint.config.js` y los `tsconfig*.json`.

Para estos cambios el orden es: rama desde `develop`, PR hacia `develop`, merge a `develop` y después PR de `develop` hacia `main`.

### Cambios que no pueden romper la web: directo a `main`

Un cambio no puede romper la web si solo toca contenido que la aplicación no carga ni compila. Ejemplos:

- Documentación en archivos `.md`, como este documento o un README.
- Plantillas de issues y de PR dentro de `.github/`.
- La carpeta personal `Vic/` y archivos de diseño o bocetos.

Para estos cambios se puede hacer commit directo a `main`, o abrir un PR hacia `main` si se quiere revisión. Después de un commit directo a `main`, `develop` debe actualizarse con esos cambios para que las dos ramas no se separen:

```bash
git checkout develop
git pull origin develop
git merge origin/main
git push origin develop
```

### Si hay duda

Si no se sabe con certeza que un cambio no puede romper la web, se trata como si pudiera y pasa por `develop`.

## Flujo completo para un cambio que pasa por `develop`

1. Crear un issue con la plantilla que corresponda (ver la sección de issues). Antes de escribir código debe existir un issue que explique qué se quiere cambiar y por qué.
2. Actualizar la referencia remota:

   ```bash
   git fetch origin
   ```

3. Crear la rama de trabajo desde `develop`, usando `--no-track` para que la rama no quede enlazada a `origin/develop`:

   ```bash
   git checkout -b tipo/descripcion-corta --no-track origin/develop
   ```

4. Hacer los cambios y probarlos (ver la sección de verificación).
5. Hacer commit y subir la rama:

   ```bash
   git push -u origin tipo/descripcion-corta
   ```

6. Abrir un PR con destino `develop`. El PR enlaza el issue con `Closes #numero`.
7. Esperar la revisión. Los comentarios se resuelven con nuevos commits en la misma rama, sin cerrar el PR.
8. Con el PR aprobado, se hace merge a `develop`.
9. Cuando `develop` acumula cambios listos para entregar y pasa la verificación completa, se abre un PR de `develop` hacia `main` y se hace merge. Después del merge, la rama de trabajo se elimina.

## Issues

Todo issue se crea con una de las plantillas disponibles al pulsar "New issue":

- Error de UI/UX: algo se ve mal, se usa mal o no es accesible en la interfaz. Pide los pasos para reproducirlo, lo esperado y lo que ocurre.
- Documentación: corregir, completar o mejorar cualquier documento del proyecto.
- Instrucciones: asignar una tarea al equipo con su objetivo, requisitos, referencias, entregables, responsables y fecha límite. El issue #1 es un ejemplo de este tipo.

Un issue que no sigue la plantilla se devuelve para que se complete antes de atenderlo.

## Markdown

Los issues, los PR y los documentos del repositorio se escriben en Markdown. Es obligatorio dominar su sintaxis básica para que el texto sea legible:

- Títulos con `#`, `##` y `###`, sin saltarse niveles.
- Listas con `-` para viñetas y `1.` para pasos ordenados.
- Código en línea entre acentos graves, como `pnpm build`.
- Bloques de código con tres acentos graves y el nombre del lenguaje: `bash`, `ts` o `json`.
- Enlaces con `[texto](url)` e imágenes con `![descripción](ruta)`.
- Negritas con `**texto**` y citas con `>`.
- Una línea en blanco entre párrafos, listas y bloques de código.

Un PR o un issue con párrafos pegados, comandos sin bloque de código o capturas sin descripción se devuelve para que se corrija antes de revisarlo.

## Nombres de rama

El formato es `tipo/descripcion-corta`, en minúsculas, sin espacios ni acentos, separando las palabras con guiones.

- `feat/`: funcionalidad nueva. Ejemplo: `feat/registro-usuario`.
- `fix/`: corrección de un error. Ejemplo: `fix/titulo-pagina`.
- `docs/`: documentación. Ejemplo: `docs/guia-instalacion`.
- `i18n/`: textos y traducciones. Ejemplo: `i18n/textos-inicio`.
- `chore/`: mantenimiento, dependencias y configuración. Ejemplo: `chore/actualizar-vite`.

## Commits

- Un commit por cambio lógico. Si un commit reúne cambios sin relación entre sí, se divide.
- El mensaje es un título corto, de 72 caracteres o menos, en español y en modo imperativo: "Agrega", "Corrige", "Traduce".
- El mensaje describe el cambio, no el proceso que lo produjo.
- No se mezclan cambios de formato con cambios funcionales.

## Verificación antes de abrir un PR

Aplica a todo cambio que pase por `develop`. Desde la raíz del repositorio:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

Los dos últimos comandos deben terminar sin errores. El PR indica el resultado real de cada uno. Si un comando falla por un problema que ya existía en `develop`, se menciona en el PR y no se corrige dentro del mismo cambio.

## Reglas para el contenido del PR

- El diff solo contiene lo que pide el issue. Nada de renombrar archivos, reordenar imports ni pasar un formateador sobre líneas que no se tocaron a propósito.
- Antes de pedir revisión, revisar el diff completo con `git diff origin/develop...HEAD` y confirmar que cada cambio corresponde al issue.
- El título del PR sigue el mismo formato que un commit. La descripción explica el problema, la solución y cómo se verificó, escrita en Markdown legible.
- Los textos visibles para el usuario se escriben en español.
- Nunca se suben credenciales, tokens ni archivos `.env`.

## Revisión

- Todo PR hacia `develop` necesita al menos una aprobación de una persona distinta a quien lo abrió.
- Quien revisa comprueba que el PR apunta a la rama correcta, que enlaza un issue y que el diff es acotado.
- Quien abrió el PR hace el merge solo después de la aprobación.

## Qué pasó y cómo se evita

Qué pasó: se aceptaron los PR #3 y #4 contra la rama `dev`, pero `dev` nunca se llevó a `main`. Después se creó `develop` desde `main` y se borró `dev` con los cambios adentro. Los PR quedaron marcados como mergeados, y en `main` no había nada de lo que traían. Nadie se dio cuenta hasta que alguien revisó.

Cómo se evita: ninguna rama se borra hasta que su contenido esté en `main`. La rama de integración (`develop`) se protege para que nadie la borre ni le suba cambios directos. Y todo PR lo tiene que revisar y aprobar otra persona del equipo antes del merge.
