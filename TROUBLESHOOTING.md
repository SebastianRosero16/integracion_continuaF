# 🔧 Troubleshooting - Solución de Problemas Comunes

Esta guía documenta problemas comunes que pueden surgir durante el desarrollo y sus soluciones.

---

## 📦 Problemas de Instalación

### Error: `npm install` falla con EACCES

**Problema**: Permisos insuficientes para instalar paquetes globalmente.

**Síntomas**:
```
npm ERR! Error: EACCES: permission denied
```

**Solución**:
```bash
# Opción 1: Cambiar directorio de npm global (recomendado)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Opción 2: Usar nvm (Node Version Manager)
# Instalar nvm y reinstalar Node.js
```

### Error: `ERESOLVE unable to resolve dependency tree`

**Problema**: Conflictos de versiones en dependencias.

**Síntomas**:
```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@19.1.1
```

**Solución**:
```bash
# Opción 1: Limpiar caché e instalar con --legacy-peer-deps
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Opción 2: Usar la versión correcta de Node.js
nvm install 20
nvm use 20
npm install
```

---

## 🚀 Problemas con el Servidor de Desarrollo

### Error: `EADDRINUSE: address already in use :::5173`

**Problema**: El puerto 5173 ya está en uso por otro proceso.

**Síntomas**:
```
Error: listen EADDRINUSE: address already in use :::5173
```

**Solución**:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS / Linux
lsof -ti:5173 | xargs kill -9

# O usar un puerto diferente
npm run dev -- --port 3000
```

### Error: `Failed to resolve import` en el navegador

**Problema**: Vite no puede resolver una importación.

**Síntomas**:
```
Failed to resolve import "./utils/mathFormulas" from "src/views/GeometryExplorer.tsx"
```

**Solución**:
```bash
# 1. Verificar que el archivo existe
ls src/utils/mathFormulas.ts

# 2. Reiniciar el servidor de desarrollo
# Ctrl+C para detener
npm run dev

# 3. Si persiste, limpiar caché de Vite
rm -rf node_modules/.vite
npm run dev
```

---

## 🧪 Problemas con Pruebas

### Error: `Cannot find module` en tests

**Problema**: Jest no puede resolver importaciones TypeScript.

**Síntomas**:
```
Cannot find module './mathFormulas' from 'mathFormulas.test.ts'
```

**Solución**:

1. Verificar `jest.config.js`:
```javascript
moduleNameMapper: {
  '^(\\.{1,2}/.*)\\.js$': '$1',
},
```

2. Verificar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

3. Reinstalar dependencias:
```bash
npm install --save-dev ts-jest @types/jest
```

### Error: `ReferenceError: TextEncoder is not defined`

**Problema**: jsdom no incluye APIs de Web disponibles en navegadores modernos.

**Síntomas**:
```
ReferenceError: TextEncoder is not defined
```

**Solución**:

Agregar polyfill en `setupTests.ts`:
```typescript
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
```

### Pruebas pasan localmente pero fallan en CI

**Problema**: Diferencias en el entorno (timezone, locale, Node version).

**Síntomas**:
```
Expected: "2024-11-28"
Received: "2024-11-27"
```

**Solución**:

1. **Timezone**: Usar fechas UTC en tests
```typescript
// ❌ Malo
const date = new Date('2024-11-28');

// ✅ Bueno
const date = new Date('2024-11-28T00:00:00Z');
```

2. **Locale**: Mockear funciones de internacionalización
```typescript
jest.mock('intl', () => ({
  DateTimeFormat: jest.fn(() => ({
    format: () => '28/11/2024'
  }))
}));
```

3. **Node Version**: Verificar matrix en `.github/workflows/ci-tests.yml`
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

---

## 🎨 Problemas con TailwindCSS

### Estilos no se aplican

**Problema**: Tailwind no procesa las clases CSS.

**Síntomas**:
```
Clases de Tailwind aparecen en HTML pero no hay estilos aplicados
```

**Solución**:

1. Verificar `tailwind.config.ts`:
```typescript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

2. Verificar `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Reiniciar servidor:
```bash
npm run dev
```

### Error: `PostCSS plugin tailwindcss requires PostCSS 8`

**Problema**: Versión incompatible de PostCSS.

**Solución**:
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

---

## 🔨 Problemas con TypeScript

### Error: `Type 'X' is not assignable to type 'Y'`

**Problema**: Tipos incompatibles o incorrectos.

**Síntomas**:
```typescript
Type 'string | undefined' is not assignable to type 'string'
```

**Solución**:

1. **Usar type guards**:
```typescript
// ❌ Malo
const dept = getDepartamentoByCode('ANT');
console.log(dept.nombre); // Error: dept puede ser undefined

// ✅ Bueno
const dept = getDepartamentoByCode('ANT');
if (dept) {
  console.log(dept.nombre);
}
```

2. **Usar optional chaining**:
```typescript
console.log(dept?.nombre);
```

3. **Usar nullish coalescing**:
```typescript
const name = dept?.nombre ?? 'Desconocido';
```

### Error: `Cannot find name` para tipos globales

**Problema**: Falta definición de tipos para variables globales.

**Síntomas**:
```
Cannot find name 'process'
Cannot find name 'NodeJS'
```

**Solución**:

Instalar tipos de Node.js:
```bash
npm install --save-dev @types/node
```

Agregar a `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["node", "jest", "@testing-library/jest-dom"]
  }
}
```

---

## 🔄 Problemas con Git

### Error: `LF will be replaced by CRLF`

**Problema**: Diferencias de line endings entre Windows y Unix.

**Síntomas**:
```
warning: LF will be replaced by CRLF in .env.example
The file will have its original line endings in your working directory
```

**Solución**:

Configurar Git para manejar line endings automáticamente:
```bash
# Windows (usar CRLF localmente, LF en repo)
git config --global core.autocrlf true

# macOS / Linux (usar LF siempre)
git config --global core.autocrlf input
```

Agregar `.gitattributes` al proyecto:
```
* text=auto
*.ts text eol=lf
*.tsx text eol=lf
*.js text eol=lf
*.json text eol=lf
*.md text eol=lf
```

### Commit falla por pre-commit hook

**Problema**: Husky o lint-staged detecta errores antes del commit.

**Síntomas**:
```
✖ npm run lint:
  error: Unexpected console statement (no-console)
```

**Solución**:

1. **Corregir errores**:
```bash
npm run lint -- --fix
npm run format
```

2. **Si es necesario, skip temporalmente** (NO recomendado):
```bash
git commit -m "mensaje" --no-verify
```

---

## 📦 Problemas con Vercel

### Build falla en Vercel pero pasa localmente

**Problema**: Diferencias en variables de entorno o dependencias.

**Síntomas**:
```
Error: Cannot find module 'dependency-name'
```

**Solución**:

1. **Verificar `package.json`**: Asegurar que dependencias estén en `dependencies`, no `devDependencies`:
```bash
npm install dependency-name --save
```

2. **Limpiar caché de Vercel**:
   - Ir a Settings → General
   - Hacer clic en "Clear Build Cache"
   - Redeploy

3. **Verificar Node version**: Agregar a `package.json`:
```json
{
  "engines": {
    "node": "20.x"
  }
}
```

### Error 404 en rutas de React Router

**Problema**: SPA routing no configurado en Vercel.

**Síntomas**:
```
Visiting https://tu-app.vercel.app/matematicas → 404 Not Found
```

**Solución**:

Crear `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🧰 Problemas con ESLint

### Error: `Parsing error: Unexpected token`

**Problema**: ESLint no reconoce sintaxis TypeScript/JSX.

**Síntomas**:
```
Parsing error: Unexpected token <
```

**Solución**:

Verificar `eslint.config.js`:
```javascript
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

export default [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: reactPlugin
    }
  }
];
```

### Muchos errores `no-case-declarations`

**Problema**: Variables declaradas en `case` sin bloque.

**Síntomas**:
```
error: Unexpected lexical declaration in case block (no-case-declarations)
```

**Solución**:

Envolver case en llaves:
```typescript
// ❌ Malo
switch (shape) {
  case 'circle':
    const area = Math.PI * r * r;
    return area;
}

// ✅ Bueno
switch (shape) {
  case 'circle': {
    const area = Math.PI * r * r;
    return area;
  }
}
```

---

## 🔍 Problemas de Rendimiento

### Build de Vite es lento

**Problema**: Proyecto grande con muchas dependencias.

**Solución**:

1. **Habilitar SWC en lugar de Babel**:
```bash
npm install -D @vitejs/plugin-react-swc
```

`vite.config.ts`:
```typescript
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
});
```

2. **Excluir dependencias pesadas del pre-bundling**:
```typescript
export default defineConfig({
  optimizeDeps: {
    exclude: ['three']
  }
});
```

### Hot Module Replacement (HMR) no funciona

**Problema**: Cambios en código no se reflejan sin refrescar manualmente.

**Solución**:

1. **Verificar que el archivo esté dentro de `src/`**
2. **Reiniciar servidor de desarrollo**
3. **Verificar que no haya errores de sintaxis en consola**
4. **Si persiste, deshabilitar extensiones de navegador** (AdBlock, etc.)

---

## 📞 Obtener Ayuda

Si ninguna de estas soluciones funciona:

1. **Buscar en Issues**: [GitHub Issues](https://github.com/SebastianRosero16/integracion_continuaF/issues)
2. **Crear un nuevo Issue**: Incluir:
   - Descripción del problema
   - Pasos para reproducir
   - Versión de Node.js (`node -v`)
   - Sistema operativo
   - Mensaje de error completo
   - Capturas de pantalla si aplica

3. **Recursos externos**:
   - [Stack Overflow](https://stackoverflow.com/)
   - [Vite Discord](https://chat.vitejs.dev/)
   - [React Discord](https://discord.gg/react)

---

## 📚 Comandos Útiles de Debugging

```bash
# Verificar versiones
node -v
npm -v
git --version

# Limpiar todo y reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Ver logs detallados de npm
npm run dev --verbose

# Ver configuración de npm
npm config list

# Ver árbol de dependencias
npm list

# Verificar paquetes desactualizados
npm outdated

# Actualizar paquetes
npm update

# Auditar vulnerabilidades
npm audit
npm audit fix
```

---

¡Esperamos que esta guía te ayude a resolver problemas rápidamente! 🚀
