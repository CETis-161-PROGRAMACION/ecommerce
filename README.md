# React + TypeScript + Vite

Esta plantilla ofrece una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/)

## React Compiler

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

```

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

```
