# Guía de contribuciones

Este documento describe el orden de trabajo del repositorio. Aplica a cualquier cambio, por pequeño que sea: primero un issue, después una rama, después un pull request (PR) hacia `dev`, y solo desde `dev` se llega a `main`.

## Ramas permanentes

- `main`: código estable. Nunca se trabaja ni se hace push directo sobre esta rama. Solo recibe PR provenientes de `dev`.
- `dev`: rama de integración. Aquí se juntan y se prueban todos los cambios antes de pasar a `main`. Todas las ramas de trabajo nacen de `dev` y vuelven a `dev`.

## Flujo completo

1. Crear un issue. Antes de escribir código debe existir un issue que explique qué se quiere cambiar y por qué. Si el cambio corrige un error, el issue indica qué pasó, qué se esperaba y cómo reproducirlo.
2. Actualizar la referencia remota de `dev`:

   ```bash
   git fetch origin
   ```

3. Crear la rama de trabajo desde `dev`, usando `--no-track` para que la rama no quede enlazada a `origin/dev`:

   ```bash
   git checkout -b tipo/descripcion-corta --no-track origin/dev
   ```

4. Hacer los cambios y probarlos (ver la sección de verificación).
5. Hacer commit y subir la rama:

   ```bash
   git push -u origin tipo/descripcion-corta
   ```

6. Abrir un PR con destino `dev` (nunca `main`). El PR enlaza el issue con `Closes #numero`.
7. Esperar la revisión. Los comentarios se resuelven con nuevos commits en la misma rama, sin cerrar el PR.
8. Con el PR aprobado, se hace merge a `dev`.
9. Cuando `dev` acumula cambios listos para entregar y pasa la verificación completa, se abre un PR de `dev` hacia `main` y se hace merge. Después del merge, la rama de trabajo se elimina.

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

Desde la raíz del repositorio:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

Los dos últimos comandos deben terminar sin errores. El PR indica el resultado real de cada uno. Si un comando falla por un problema que ya existía en `dev`, se menciona en el PR y no se corrige dentro del mismo cambio.

## Reglas para el contenido del PR

- El diff solo contiene lo que pide el issue. Nada de renombrar archivos, reordenar imports ni pasar un formateador sobre líneas que no se tocaron a propósito.
- Antes de pedir revisión, revisar el diff completo con `git diff origin/dev...HEAD` y confirmar que cada cambio corresponde al issue.
- El título del PR sigue el mismo formato que un commit. La descripción explica el problema, la solución y cómo se verificó.
- Los textos visibles para el usuario se escriben en español.
- Nunca se suben credenciales, tokens ni archivos `.env`.

## Revisión

- Todo PR necesita al menos una aprobación de una persona distinta a quien lo abrió.
- Quien revisa comprueba que el PR apunta a `dev`, que enlaza un issue y que el diff es acotado.
- Quien abrió el PR hace el merge solo después de la aprobación.
