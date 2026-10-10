# AGENTS.md

Orientación para futuras sesiones de OpenCode en este repositorio. Mantiene las convenciones del proyecto Web E-commerce (CETis 161).

## Stack

- Usar Vite, React, TypeScript y Tailwind CSS v4.
- Conservar las dependencias y configuraciones compatibles existentes.
- No cambiar el stack sin una justificación técnica.

## Idioma

- Interfaz y documentación para usuarios en español.
- Nombres de componentes, variables, funciones, tipos y carpetas en inglés.
- Excepción: conservar exactamente la carpeta `src/plantillas/`.

## Arquitectura

- Usar el alias `@` para imports desde `src/`.
- Mantener cada página en su directorio dentro de `src/pages/`.
- Reutilizar componentes de `src/components/` (UI en `components/ui/`, layouts en `components/layout/`).
- Mantener funciones auxiliares en `src/utils/`.
- Mantener futuras integraciones en `src/services/`.
- No duplicar responsabilidades entre layouts, componentes y plantillas.

## Plantillas

- Usar `src/plantillas/FormPageTemplate.tsx` como referencia para nuevas pantallas con formularios.
- Copiar la plantilla a la ubicación definitiva de la página.
- No importar plantillas desde páginas de producción.
- No registrar plantillas en el router.
- No hacer que una página creada dependa de su plantilla original.

## Diseño

- Usar los tokens de `src/index.css` (bloque `@theme`).
- Conservar los colores establecidos; no reemplazar tokens ni repetir valores hexadecimales en las páginas.
- Mantener el diseño adaptable (referencia mínima 360 px).
- Preservar la accesibilidad (etiquetas asociadas, errores accesibles, foco visible).
- Respetar `prefers-reduced-motion`.
- No incluir un marco falso de navegador ni elementos de maqueta externos.

## Recursos

- No inventar el logotipo.
- No sustituir el recurso original por una imagen parecida.
- Comprobar la existencia de los recursos antes de utilizarlos.
- El logotipo debe colocarse en `src/assets/images/logo.png`.

## Funcionalidad

- No simular autenticación.
- No simular envío de SMS.
- No simular persistencia.
- No simular operaciones de red.
- No mostrar resultados exitosos sin una operación real.
- No inventar requisitos de negocio ni pantallas no especificadas.

## Calidad

Antes de considerar terminada una tarea, ejecutar:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Corregir los errores introducidos por los cambios.
No desactivar reglas ni verificaciones para ocultar problemas.

## Documentación

Actualizar el README correspondiente cuando cambien la estructura, los comandos, las rutas o el funcionamiento.
No afirmar que una funcionalidad está terminada si solo tiene un placeholder.
Informar sobre los recursos faltantes y las verificaciones que no pudieron realizarse.
