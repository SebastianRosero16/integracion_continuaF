# 🚀 CÓMO EJECUTAR Y PROBAR LA APLICACIÓN

## Estado Actual del Proyecto

✅ **Módulo de Matemáticas COMPLETADO** (100%)
- Calculadora interactiva de 6 figuras geométricas
- Modo Reto con 10 preguntas aleatorias
- Visualización SVG de las figuras
- Sistema de progreso con localStorage
- Validaciones completas

⏳ **Módulo de Ciencias** (Pendiente - Día 2)
⏳ **Módulo de Sociales** (Pendiente - Día 3)
⏳ **Testing Completo** (Pendiente - Días 4-6)
⏳ **CI/CD** (Pendiente - Día 7)
⏳ **Documentación** (Pendiente - Días 8-9)

---

## 📋 PREREQUISITOS

Verificar instalaciones:

```powershell
node --version  # Debe ser >= 18
npm --version   # Debe ser >= 9
git --version   # Para control de versiones
```

Si falta Node.js: https://nodejs.org/

---

## 🔧 INSTALACIÓN Y CONFIGURACIÓN

### 1. Clonar el repositorio (si aún no lo has hecho)

```powershell
cd c:\
git clone https://github.com/guswill24/integracion_continua.git
cd integracion_continua
```

### 2. Instalar dependencias

```powershell
npm install
```

Esto instalará 837 paquetes incluyendo:
- React 19, TypeScript, Vite
- TailwindCSS
- Jest, Testing Library
- Husky, commitlint
- Todas las dependencias de desarrollo

**Tiempo estimado:** 2-3 minutos

### 3. Verificar que no hay errores de TypeScript

```powershell
npx tsc --noEmit
```

Si hay errores, revisar los archivos indicados.

---

## ▶️ EJECUTAR LA APLICACIÓN

### Modo Desarrollo (con Hot Reload)

```powershell
npm run dev
```

Esto iniciará el servidor en: **http://localhost:5173**

Abre tu navegador y navega a esa URL.

### Modo Producción (Build)

```powershell
# Generar el build
npm run build

# Previsualizar el build localmente
npm run preview
```

El preview estará en: **http://localhost:4173**

---

## 🎮 CÓMO USAR LA APLICACIÓN

### Página de Inicio

1. Verás 3 tarjetas de módulos (Matemáticas, Ciencias, Sociales)
2. Solo Matemáticas está activo por ahora
3. Hay una barra de progreso general

### Módulo de Matemáticas

**Modo Calculadora:**

1. Haz clic en una de las 6 figuras geométricas:
   - ⬜ Cuadrado
   - ▭ Rectángulo
   - ⭕ Círculo
   - 🔺 Triángulo (Base-Altura)
   - △ Triángulo (3 Lados)
   - ⬡ Polígono Regular

2. Ingresa los valores solicitados (cambian según la figura)

3. Haz clic en "Calcular"

4. Verás:
   - Visualización SVG de la figura
   - Área y perímetro
   - Fórmulas utilizadas
   - Pasos del cálculo

**Modo Reto:**

1. Haz clic en el botón "Modo Reto"
2. Tendrás 5 minutos para responder 10 preguntas
3. Cada pregunta muestra una figura y pide calcular área o perímetro
4. Ingresa tu respuesta y presiona Enter o "Enviar"
5. Recibirás feedback inmediato (Correcto/Incorrecto)
6. Al terminar, verás tu puntuación final
7. Si obtienes ≥70%, el módulo se marca como completado al 100%

---

## 🧪 PRUEBAS (Cuando estén implementadas)

### Ejecutar todas las pruebas

```powershell
npm test
```

### Pruebas unitarias solamente

```powershell
npm run test:unit
```

### Pruebas de integración

```powershell
npm run test:integration
```

### Pruebas de accesibilidad

```powershell
npm run test:a11y
```

### Generar reporte de cobertura

```powershell
npm run test:coverage
```

Luego abre: `coverage/lcov-report/index.html` en tu navegador

---

## 🔍 VERIFICAR CALIDAD

### Lint (verificar estilo de código)

```powershell
npm run lint
```

Para auto-corregir errores menores:

```powershell
npm run lint -- --fix
```

### Verificar tipos TypeScript

```powershell
npm run type-check
```

### Auditoría Lighthouse

```powershell
# Primero hacer build y ejecutar preview
npm run build
npm run preview

# En otra terminal PowerShell
npm install -g lighthouse
lighthouse http://localhost:4173 --output html --output-path lighthouse-report.html --only-categories=accessibility,performance
```

Luego abre `lighthouse-report.html`

**Objetivos:**
- Accessibility: ≥ 90/100
- Performance: ≥ 80/100

---

## 📊 VERIFICAR PROGRESO

### Inspeccionar localStorage

En el navegador:
1. Abre DevTools (F12)
2. Ve a la pestaña "Application" (Chrome) o "Storage" (Firefox)
3. En "Local Storage" → `http://localhost:5173`
4. Busca la clave `moduleProgress`

Verás un array JSON como:
```json
[
  {"id": "math", "progress": 100}
]
```

### Resetear progreso

En la consola del navegador (F12):
```javascript
localStorage.clear();
location.reload();
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "Cannot find module"

```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Error: "Port 5173 already in use"

```powershell
# Matar el proceso
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

O simplemente usa otro puerto:

```powershell
npm run dev -- --port 3000
```

### Error: "Failed to load config"

Verificar que existan:
- `tailwind.config.ts`
- `tsconfig.json`
- `vite.config.ts`

### Build falla

```powershell
# Limpiar caché de Vite
Remove-Item -Recurse -Force .vite
npm run build
```

### Tests fallan

Verificar que existe `jest.config.js` y `src/setupTests.ts`

---

## 📂 ESTRUCTURA DE ARCHIVOS IMPORTANTE

```
c:\integracion_continua\
├── src/
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.tsx ← Página de inicio
│   │   ├── Math/
│   │   │   └── MathModule.tsx ← Módulo de matemáticas COMPLETO
│   │   ├── Science/ (pendiente)
│   │   └── Social/ (pendiente)
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── ShapeViewer.tsx ← Visualizador SVG
│   │   └── layout/
│   │       └── Layout.tsx ← Layout principal
│   │
│   ├── utils/
│   │   ├── mathFormulas.ts ← Motor de cálculos
│   │   └── cn.ts ← Utilidad de clases CSS
│   │
│   ├── types/
│   │   └── index.ts ← Tipos TypeScript
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx ← Configuración de rutas
│   │
│   ├── main.tsx ← Punto de entrada
│   └── index.css ← Estilos globales
│
├── docs/
│   └── GUIA_IMPLEMENTACION_COMPLETA.md ← Guía detallada
│
├── package.json ← Dependencias y scripts
├── tailwind.config.ts ← Configuración de Tailwind
├── tsconfig.json ← Configuración de TypeScript
└── vite.config.ts ← Configuración de Vite
```

---

## 📝 PRÓXIMOS PASOS

### Esta Semana (Día 1 COMPLETADO ✅)

- [x] Estructura base del proyecto
- [x] Componentes UI reutilizables
- [x] Motor de cálculos matemáticos
- [x] Módulo de Matemáticas completo
- [x] Sistema de navegación y rutas
- [x] Sistema de progreso con localStorage

### Próxima Sesión (Día 2)

- [ ] Crear `src/data/elements.json` (25 elementos químicos)
- [ ] Crear `src/utils/elementUtils.ts` (búsqueda y filtros)
- [ ] Crear `src/pages/Science/ScienceModule.tsx`
- [ ] Implementar tabla periódica interactiva
- [ ] Implementar quiz de ciencias (5 preguntas)

### Día 3

- [ ] Crear `src/data/departamentos.ts` (32 departamentos)
- [ ] Crear `src/pages/Social/SocialModule.tsx`
- [ ] Implementar mapa interactivo de Colombia
- [ ] Implementar quiz de sociales (10 preguntas)

### Días 4-6: Testing

- [ ] Pruebas unitarias (mathFormulas, elementUtils)
- [ ] Pruebas de integración (flujos completos)
- [ ] Pruebas de accesibilidad (jest-axe)
- [ ] Plan de pruebas JMeter

### Días 7-9: CI/CD y Documentación

- [ ] GitHub Actions workflow
- [ ] Husky hooks
- [ ] README completo
- [ ] Informe de Calidad ISO/IEC 25010

### Día 10: Deployment

- [ ] Deploy a Vercel
- [ ] Lighthouse audit
- [ ] Checklist de aceptación

---

## 🎯 CÓMO HACER LOS 21 COMMITS

Ver archivo: `docs/GUIA_IMPLEMENTACION_COMPLETA.md` sección "Commits para 3 Personas"

**Resumen:**
- Persona A: 7 commits sobre UI/UX
- Persona B: 7 commits sobre funcionalidad
- Persona C: 7 commits sobre QA/Docs

**Ejemplo de commit:**

```powershell
git add .
git commit -m "feat(math): implement geometry formulas calculation engine"
git push origin main
```

---

## 📞 AYUDA ADICIONAL

### Recursos

- **Guía Completa:** `docs/GUIA_IMPLEMENTACION_COMPLETA.md`
- **Documentación React:** https://react.dev/
- **Documentación Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs

### Comandos Útiles

```powershell
# Ver estado de Git
git status

# Ver commits recientes
git log --oneline -10

# Crear nueva rama
git checkout -b feature/nombre-feature

# Volver a main
git checkout main

# Actualizar desde remoto
git pull origin main

# Ver qué archivos cambiaron
git diff

# Deshacer cambios locales (¡CUIDADO!)
git reset --hard HEAD
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de considerar completado el Día 1:

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` inicia el servidor
- [ ] Página de inicio carga correctamente
- [ ] Navegación entre páginas funciona
- [ ] Módulo de Matemáticas abre sin errores
- [ ] Calculadora de figuras funciona (probado con al menos 3 figuras)
- [ ] Modo Reto se puede iniciar
- [ ] Preguntas se muestran con visualización
- [ ] Feedback correcto/incorrecto aparece
- [ ] Puntuación final se muestra
- [ ] Progreso se guarda en localStorage
- [ ] `npm run lint` no muestra errores críticos
- [ ] `npx tsc --noEmit` no muestra errores de tipos

---

## 🎉 ¡SIGUIENTE PASO!

Una vez que todo lo anterior funcione correctamente, continúa con **Día 2: Módulo de Ciencias Naturales**.

Consulta la guía detallada en:
`docs/GUIA_IMPLEMENTACION_COMPLETA.md`

---

**Última actualización:** Día 1 completado
**Progreso total:** ~30% del proyecto
