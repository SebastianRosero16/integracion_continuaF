# 🎓 Colegio Mentes Creativas - Aplicación Educativa Multimedia

[![CI - Pruebas Unitarias](https://github.com/SebastianRosero16/integracion_continuaF/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/SebastianRosero16/integracion_continuaF/actions/workflows/ci-tests.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success)](https://integracion-continua-f.vercel.app/)
[![Tests](https://img.shields.io/badge/Tests-163%20passing-brightgreen)]()
[![Coverage](https://img.shields.io/badge/Coverage-Tracked-blue)]()

## 📖 Descripción

Aplicación educativa multimedia desarrollada con **React 19 + Vite 7** para apoyar el aprendizaje de estudiantes de 4° y 5° grado en áreas clave del currículo: **Matemáticas**, **Ciencias Naturales** y **Ciencias Sociales**.

El proyecto incluye **pruebas unitarias exhaustivas**, **integración continua** con GitHub Actions y está **desplegado en Vercel** cumpliendo con estándares de calidad ISO/IEC 25010.

## ✨ Características

### 📚 Módulos Educativos
- **Matemáticas**: Calculadora de geometría con figuras 2D y 3D, tablas de multiplicar interactivas
- **Ciencias Naturales**: Tabla periódica interactiva con 118 elementos químicos
- **Ciencias Sociales**: Explorador de departamentos de Colombia con datos demográficos y regiones

### 🧪 Cobertura de Pruebas (163 tests, 100% passing)
- **Matemáticas**: 36 pruebas para funciones geométricas (cuadrados, rectángulos, círculos, triángulos, polígonos)
- **Ciencias**: 64 pruebas para utilidades de elementos químicos (búsqueda, filtrado, traducción, ordenamiento)
- **Sociales**: 48 pruebas para datos de departamentos colombianos (estructura, búsqueda, filtros por región)
- **Componentes**: 15 pruebas para componentes React (Navbar, ClickCounter, TodoList, etc.)

### 🔄 Integración Continua
- **GitHub Actions**: Pipelines automatizados con lint → type-check → test → build
- **Matrix Testing**: Node.js 18.x, 20.x, 22.x
- **Cobertura de Código**: Codecov con reportes lcov

### 🌐 Despliegue en Producción
- **URL en vivo**: [https://integracion-continua-f.vercel.app/](https://integracion-continua-f.vercel.app/)
- **Plataforma**: Vercel con detección automática de Vite
- **Rendimiento**: 126ms promedio (JMeter, 50 usuarios concurrentes, 1200 peticiones)
- **Estado**: ✅ Todas las rutas funcionales con configuración SPA

### 🎯 Componentes Educativos
- Tablas de Multiplicar interactivas (`TablasMul.tsx`)
- Conversor de Unidades multi-categoría (`UnitConverter.tsx`)
- Validador de Contraseñas con requisitos personalizables (`PasswordValidator.tsx`)
- Contador de Clics con persistencia (`ClickCounter.tsx`)
- Lista de Tareas con filtros (`TodoList.tsx`)
- Geometría 2D y 3D con Three.js (`GeometryExplorer.tsx`)

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/SebastianRosero16/integracion_continuaF.git
cd integracion_continua

# Instalar dependencias
npm install

# Copiar variables de entorno (opcional)
cp .env.example .env
```

---

## 📜 Scripts Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Previsualizar build de producción
npm run preview
```

### Compilación
```bash
# Compilar para producción
npm run build
```

### Pruebas
```bash
# Ejecutar todas las pruebas unitarias
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar pruebas optimizadas para CI
npm run test:ci
```

### Calidad de Código
```bash
# Ejecutar linter (ESLint)
npm run lint

# Formatear código (Prettier)
npm run format

# Revisar tipos TypeScript
npm run type-check

# Validación completa (lint + type-check + test:ci)
npm run validate
```

---

## 📁 Estructura del Proyecto

```
src/
├─ components/          # Componentes React reutilizables
│  ├─ ClickCounter.tsx  # Contador con persistencia localStorage
│  ├─ TodoList.tsx      # Lista de tareas con CRUD
│  ├─ MultiplicationTable.tsx  # Tablas de multiplicar interactivas
│  ├─ UnitConverter.tsx # Conversor multi-unidad (longitud, temperatura, etc.)
│  ├─ PasswordValidator.tsx    # Validador de contraseñas seguras
│  ├─ Navbar.tsx        # Barra de navegación principal
│  └─ Layout.tsx        # Layout con Sidebar acordeón
├─ views/               # Vistas principales
│  ├─ HomePage.tsx      # Página de inicio
│  ├─ GeometryExplorer.tsx  # Calculadora de geometría 2D/3D
│  ├─ ThreeDemoView.tsx     # Visualización de elementos químicos 3D
│  └─ SpeechDemoView.tsx    # Síntesis de voz para departamentos
├─ data/                # Datos estáticos
│  ├─ elements.ts       # 118 elementos de la tabla periódica
│  └─ departamentos.ts  # 32 departamentos de Colombia
├─ utils/               # Funciones utilitarias
│  ├─ mathFormulas.ts   # Cálculos geométricos (área, perímetro)
│  └─ elementUtils.ts   # Utilidades para elementos químicos
├─ routes/
│  └─ AppRoutes.tsx     # Configuración de rutas (React Router)
└─ main.tsx             # Entrada de la aplicación
```

---

## 🧪 Pruebas Unitarias

### Estadísticas
- **Total**: 163 pruebas
- **Estado**: 100% passing ✅
- **Framework**: Jest 30.1.2 + React Testing Library 16.3.0
- **Cobertura**: Generada con `--coverage` en cada CI run

### Archivos de Pruebas
```bash
src/utils/
├─ mathFormulas.test.ts      # 36 tests - Funciones geométricas
└─ elementUtils.test.ts      # 64 tests - Utilidades de elementos químicos

src/data/
└─ departamentos.test.ts     # 48 tests - Datos de departamentos

src/components/
├─ ClickCounter.test.tsx     # Tests para contador persistente
├─ TodoList.test.tsx         # Tests para CRUD de tareas
├─ MultiplicationTable.test.tsx  # Tests para tablas de multiplicar
├─ UnitConverter.test.tsx    # Tests para conversión de unidades
├─ PasswordValidator.test.tsx    # Tests para validación de contraseñas
└─ Navbar.test.tsx           # Tests para navegación
```

### Ejecutar Pruebas
```bash
# Todas las pruebas con reporte detallado
npm test

# Modo watch para desarrollo
npm run test:watch

# Generar reporte de cobertura HTML
npm run test:coverage

# Ejecutar con configuración CI (optimizado)
npm run test:ci
```

---

## 🔄 Integración Continua (CI/CD)

### GitHub Actions Workflows

#### 1. **ci-tests.yml** (Workflow Principal)
- **Trigger**: Push y Pull Request a `main`
- **Matrix**: Node.js 18.x, 20.x, 22.x
- **Pasos**:
  1. Checkout del código
  2. Instalación de dependencias
  3. `npm run lint` - Validación ESLint
  4. `npm run type-check` - Verificación TypeScript
  5. `npm test` - Ejecución de 163 pruebas
  6. `npm run build` - Compilación para producción
  7. Upload de artefactos (build + coverage)
  8. Codecov (reporte de cobertura)

#### 2. **unitaria.yml** (Workflow de Pruebas)
- **Trigger**: Push a `main` y Pull Requests
- **Enfoque**: Validación rápida de pruebas unitarias
- **Pasos**: Instalación → `npm test`

### Estado Actual
[![CI Status](https://github.com/SebastianRosero16/integracion_continuaF/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/SebastianRosero16/integracion_continuaF/actions/workflows/ci-tests.yml)

---

## 🌐 Despliegue en Vercel

### Información del Despliegue
- **URL Producción**: [https://integracion-continua-f.vercel.app/](https://integracion-continua-f.vercel.app/)
- **Framework**: Vite (detección automática)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 20.x

### Configuración SPA
El proyecto usa React Router, configurado en `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Performance (JMeter - 50 usuarios concurrentes)
- **Promedio General**: 126ms
- **Home**: 186ms
- **Matemáticas**: 106ms
- **Ciencias**: 104ms
- **Sociales**: 106ms
- **Total Peticiones**: 1200 (100% exitosas)

---

## 🛠️ Tecnologías

### Core
- **React**: 19.1.1 con react-dom 19.1.1
- **Vite**: 7.x (bundler y dev server ultrarrápido)
- **TypeScript**: 5.8.3 (strict mode habilitado)
- **React Router**: 7.1.6 (enrutamiento SPA)

### UI/UX
- **TailwindCSS**: 4.x (utility-first CSS)
- **Framer Motion**: Animaciones fluidas
- **Three.js**: Visualización 3D de elementos químicos

### Testing
- **Jest**: 30.1.2 (framework de pruebas)
- **ts-jest**: 29.4.1 (soporte TypeScript)
- **React Testing Library**: 16.3.0 (pruebas centradas en usuario)
- **@testing-library/jest-dom**: 6.8.0 (matchers personalizados)

### Quality Tools
- **ESLint**: 9.13.0 con TypeScript plugin
- **Prettier**: Formateo consistente de código
- **TypeScript ESLint**: Reglas específicas de TS

---

## 📚 Documentación Adicional

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de despliegue en Vercel
- [PRUEBAS_ACEPTACION.md](./PRUEBAS_ACEPTACION.md) - Checklist de pruebas de aceptación (10 criterios)
- [PRUEBAS_SISTEMA_JMETER.md](./PRUEBAS_SISTEMA_JMETER.md) - Análisis de pruebas de carga con JMeter

---

## 👥 Equipo de Desarrollo

**Desarrolladores**:
- Sebastian Rosero ([SebastianRosero16](https://github.com/SebastianRosero16))
- Hector Riascos ([HectorARiascosI](https://github.com/HectorARiascosI))

**Institución**: Universidad Cooperativa de Colombia
**Asignatura**: Calidad de Software
**Fecha**: Noviembre 2024

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la asignatura de Calidad de Software.

