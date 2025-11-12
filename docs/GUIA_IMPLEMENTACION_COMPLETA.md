# 🎓 GUÍA COMPLETA DE IMPLEMENTACIÓN
## Proyecto: Colegio Mentes Creativas - Aplicación Educativa ISO/IEC 25010

---

## 📊 RESUMEN EJECUTIVO

Ya has completado la **configuración base** del proyecto. Ahora tienes:

✅ **Estructura de carpetas creada**
- `/src/components/ui` - Componentes reutilizables (Card, Button, Badge, Progress, ShapeViewer)
- `/src/components/layout` - Layout principal con navegación
- `/src/pages/Home`, `/Math`, `/Science`, `/Social` - Páginas de módulos
- `/src/utils` - Utilidades (mathFormulas.ts, cn.ts)
- `/src/types` - Tipos TypeScript
- `/src/data` - Datos JSON (elementos, departamentos)
- `/src/tests` - Pruebas unitarias, integración, a11y
- `/qa` - Checklists y JMeter
- `/docs` - Documentación

✅ **Dependencias instaladas**
- React 19, TypeScript, Vite, Tailwind CSS
- Testing: Jest, React Testing Library, jest-axe
- Tools: clsx, tailwind-merge, husky, commitlint

✅ **Componentes UI base creados**
- Card, Button, Badge, Progress, ShapeViewer
- Layout con navegación accesible
- Página Home con progreso

✅ **Utilidades implementadas**
- mathFormulas.ts (cálculos geométricos completos)
- cn.ts (className merging)

---

## 🚀 PRÓXIMOS PASOS - ORDEN DE EJECUCIÓN

### SEMANA 1: Módulos Funcionales

#### DÍA 1: Completar Módulo de Matemáticas

**1. Crear `/src/pages/Math/MathModule.tsx`** (YA INICIADO)

Implementar:
- Selector de figuras geométricas (6 opciones)
- Inputs dinámicos según figura seleccionada
- Validación en tiempo real
- Mostrar resultados con fórmulas y pasos
- Integración con ShapeViewer
- Actualizar progreso en localStorage

**2. Agregar Modo Reto de Matemáticas**

Dentro del mismo archivo MathModule.tsx, agregar:
- Componente `MathChallenge` con 10 preguntas aleatorias
- Timer de 5 minutos
- Evaluación instantánea
- Pantalla de resultados con score

**Comando para probar:**
```bash
npm run dev
# Navegar a http://localhost:5173/matematicas
```

---

#### DÍA 2: Módulo de Ciencias Naturales

**1. Crear `/src/data/elements.json`**

JSON con 25 elementos químicos. Estructura:
```json
[
  {
    "symbol": "H",
    "name": "Hidrógeno",
    "atomicNumber": 1,
    "atomicMass": 1.008,
    "group": 1,
    "period": 1,
    "state": "gas",
    "category": "no-metal",
    "uses": "Combustible para cohetes",
    "emoji": "💧"
  }
]
```

**2. Crear `/src/utils/elementUtils.ts`**

Funciones de búsqueda y filtrado:
- `searchElements(elements, query)`
- `filterByCategory(elements, category)`
- `filterByState(elements, state)`
- `getCategoryColor(category)` - colores para UI
- `getStateEmoji(state)`

**3. Crear `/src/pages/Science/ScienceModule.tsx`**

Implementar:
- Grid de elementos (cards clickeables)
- Barra de búsqueda en tiempo real
- Filtros por categoría y estado
- Panel lateral con detalles del elemento seleccionado
- Quiz de 5 preguntas (componente `ScienceQuiz`)

---

#### DÍA 3: Módulo de Ciencias Sociales

**1. Crear `/src/data/departamentos.ts`**

TypeScript con 32 departamentos de Colombia:
```typescript
export interface Departamento {
  code: string;
  depto: string;
  capital: string;
  region: string;
  population: number;
  facts: string[];
}

export const departamentos: Departamento[] = [
  {
    code: 'ANT',
    depto: 'Antioquia',
    capital: 'Medellín',
    region: 'Andina',
    population: 6600000,
    facts: ['Capital de la montaña', 'Feria de las Flores']
  },
  // ... 31 más
];
```

**2. Crear `/src/data/colombia.geo.json`** (simplificado)

GeoJSON con estructura básica (sin coordenadas complejas por ahora):
```json
{
  "type": "FeatureCollection",
  "features": [...]
}
```

**3. Crear `/src/pages/Social/SocialModule.tsx`**

Implementar:
- Grid de departamentos con color por región
- Selector de modo (Estudio vs Quiz)
- Panel de detalles con info completa
- Leyenda de regiones
- Quiz de 10 preguntas sobre capitales y regiones

---

### SEMANA 2: Testing y Calidad

#### DÍA 4: Pruebas Unitarias

**1. Crear `/src/tests/unit/mathFormulas.test.ts`**

Pruebas para todas las fórmulas:
```typescript
describe('Math Formulas - Square', () => {
  test('should calculate square area correctly', () => {
    const result = calculateSquare(5);
    expect(result.area).toBe(25);
  });
  // ... más tests
});
```

**2. Crear `/src/tests/unit/elementUtils.test.ts`**

Pruebas de búsqueda y filtrado.

**Ejecutar:**
```bash
npm run test:unit
```

**Objetivo: Cobertura > 90% en utils/**

---

#### DÍA 5: Pruebas de Integración

**1. Crear `/src/tests/integration/Home.test.tsx`**

Pruebas de renderizado y navegación.

**2. Crear `/src/tests/integration/MathModule.test.tsx`**

Pruebas de flujo completo (seleccionar figura → ingresar datos → calcular → ver resultados).

**Ejecutar:**
```bash
npm run test:integration
```

---

#### DÍA 6: Pruebas de Accesibilidad

**1. Crear `/src/tests/accessibility/a11y.test.tsx`**

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Home page should have no accessibility violations', async () => {
  const { container } = render(<Home />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Ejecutar:**
```bash
npm run test:a11y
```

**Objetivo: 0 violaciones WCAG 2.1 AA**

---

### SEMANA 3: CI/CD y Documentación

#### DÍA 7: Configurar CI/CD

**1. Crear `.github/workflows/ci.yml`**

Pipeline completo:
- Lint y type-check
- Tests con cobertura
- Build de producción
- Deploy a Vercel (solo en main)

**2. Configurar Husky**

```bash
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

**3. Crear `commitlint.config.js`**

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']
    ],
  },
};
```

---

#### DÍA 8: Documentación

**1. Actualizar `README.md`**

Incluir:
- Descripción del proyecto
- Badges de CI/CD y cobertura
- Instrucciones de instalación
- Scripts disponibles
- Estructura del proyecto
- Características de calidad

**2. Crear `/docs/Informe_Final_Calidad.md`**

Estructura completa:
1. Introducción
2. Escenario de Aplicación
3. Normas y Modelo de Calidad ISO/IEC 25010
4. Métricas de Calidad (TPIE, Lighthouse, Cobertura)
5. Proceso de Despliegue
6. Pruebas de Software (5 niveles)
7. CI/CD
8. Análisis de Resultados
9. Conclusiones
10. Referencias

**3. Crear `/docs/PLAN_COMMITS.md`**

Documentar los 21 commits divididos en 3 personas:
- Persona A (UX/UI): 7 commits
- Persona B (Funcional): 7 commits
- Persona C (QA/Docs): 7 commits

---

#### DÍA 9: Checklists de QA

**1. Crear `/qa/checklists/aceptacion.md`**

10 criterios de aceptación con checkboxes.

**2. Crear `/qa/checklists/implantacion.md`**

Verificaciones post-despliegue.

**3. Crear `/qa/jmeter/load-test.jmx`**

Plan de pruebas de carga (50 usuarios, 5 min).

---

#### DÍA 10: Despliegue a Vercel

**1. Crear `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**2. Conectar a Vercel**

```bash
npm install -g vercel
vercel login
vercel --prod
```

O desde la web: vercel.com → Import Git Repository

---

## 🎯 COMMITS PARA 3 PERSONAS

### Persona A - UX/UI (7 commits)

1. `feat(setup): initialize project with vite, react, typescript and tailwind`
2. `feat(ui): add design tokens and tailwind theme configuration`
3. `feat(ui): create base ui component library`
4. `feat(layout): implement main layout with accessible navigation`
5. `feat(home): create home page with module cards and progress tracking`
6. `feat(math): add interactive svg shape viewer component`
7. `style(ui): add micro-animations and polish overall user experience`

### Persona B - Funcionalidad (7 commits)

8. `feat(math): implement geometry formulas calculation engine`
9. `feat(math): build interactive math module with shape calculator`
10. `feat(math): add challenge mode with 10 randomized questions`
11. `feat(science): add periodic table dataset and search utilities`
12. `feat(science): create interactive periodic table module`
13. `feat(science): implement science quiz with random questions`
14. `feat(social): add colombia dataset and geography module`

### Persona C - QA/Docs (7 commits)

15. `chore(ci): setup github actions workflow for ci/cd pipeline`
16. `chore(devexp): configure husky git hooks and commit conventions`
17. `test(unit): add comprehensive unit tests for utilities`
18. `test(integration): implement integration tests for user flows`
19. `test(a11y): add automated accessibility tests with jest-axe`
20. `chore(qa): add jmeter load tests and qa checklists`
21. `docs: create comprehensive README and quality assurance report`

---

## 📝 CÓMO HACER COMMITS DESDE DIFERENTES CUENTAS

### Método 1: Cambiar configuración global temporalmente

```bash
# Persona A
git config user.name "Nombre Persona A"
git config user.email "personaA@email.com"
git add .
git commit -m "feat(ui): create base ui component library"
git push origin main

# Persona B
git config user.name "Nombre Persona B"
git config user.email "personaB@email.com"
git add .
git commit -m "feat(math): implement geometry formulas"
git push origin main

# Persona C
git config user.name "Nombre Persona C"
git config user.email "personaC@email.com"
git add .
git commit -m "test(unit): add comprehensive unit tests"
git push origin main
```

### Método 2: Usar --author en cada commit

```bash
git add .
git commit -m "feat(ui): create base ui component library" --author="Persona A <personaA@email.com>"
git push origin main
```

### Método 3: Branches por persona (recomendado)

```bash
# Persona A crea su branch
git checkout -b feature/ui-components
# ... hace sus cambios
git add .
git commit -m "feat(ui): create base ui component library"
git push origin feature/ui-components
# Luego hace Pull Request

# Persona B desde main
git checkout main
git pull
git checkout -b feature/math-module
# ... sus cambios
git commit -m "feat(math): implement geometry formulas"
git push origin feature/math-module

# Persona C desde main
git checkout main
git pull
git checkout -b feature/testing
# ... sus cambios
git commit -m "test(unit): add comprehensive unit tests"
git push origin feature/testing
```

---

## 🧪 PRUEBAS - COMANDOS IMPORTANTES

```bash
# Todas las pruebas
npm test

# Solo unitarias
npm run test:unit

# Solo integración
npm run test:integration

# Solo accesibilidad
npm run test:a11y

# Con cobertura
npm run test:coverage

# Watch mode (para desarrollo)
npm run test:watch

# Verificar tipos TypeScript
npm run type-check

# Lint
npm run lint

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## 📊 MÉTRICAS DE CALIDAD - OBJETIVOS

| Métrica | Objetivo | Cómo Medir |
|---------|----------|------------|
| TPIE Matemáticas | ≤ 2 min | Cronómetro manual (usuario nuevo → primera interacción exitosa) |
| TPIE Ciencias | ≤ 2 min | Cronómetro manual |
| TPIE Sociales | ≤ 2 min | Cronómetro manual |
| Lighthouse Accessibility | ≥ 90/100 | `lighthouse URL --only-categories=accessibility` |
| Lighthouse Performance | ≥ 80/100 | `lighthouse URL --only-categories=performance` |
| Cobertura de Pruebas | ≥ 80% | `npm run test:coverage` (ver coverage/lcov-report/index.html) |
| Violaciones WCAG | 0 | `npm run test:a11y` |
| Tamaño min botones | 44x44px | Inspección manual DevTools |

---

## 🛠️ SOLUCIÓN DE PROBLEMAS COMUNES

### Problema: Tests fallan por localStorage

**Solución:** Agregar mock en `src/tests/setup.ts`:
```typescript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
```

### Problema: Errores de tipos en tests

**Solución:** Actualizar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom", "node"]
  }
}
```

### Problema: Lighthouse no encuentra la app

**Solución:**
```bash
# Primero hacer build
npm run build

# Luego preview en un puerto específico
npm run preview -- --port 4173

# En otra terminal, ejecutar lighthouse
lighthouse http://localhost:4173 --output html --output-path report.html
```

### Problema: JMeter no ejecuta

**Solución:**
1. Descargar JMeter: https://jmeter.apache.org/download_jmeter.cgi
2. Extraer y ejecutar:
```bash
cd apache-jmeter-5.x
bin/jmeter -n -t ../path/to/load-test.jmx -l results.jtl
```

---

## 📚 RECURSOS ADICIONALES

### Documentación de Referencia

- **React 19**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Jest**: https://jestjs.io/
- **React Testing Library**: https://testing-library.com/react
- **jest-axe**: https://github.com/nickcolley/jest-axe
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **ISO/IEC 25010**: https://iso25000.com/index.php/en/iso-25000-standards/iso-25010

### Herramientas Online

- **Lighthouse**: https://web.dev/measure/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **WAVE Accessibility Tool**: https://wave.webaim.org/
- **Markdown to PDF**: https://www.markdowntopdf.com/

---

## ✅ CHECKLIST FINAL DE ENTREGA

- [ ] **Código**
  - [ ] 3 módulos educativos funcionan completamente
  - [ ] Todos los tests pasan (npm test)
  - [ ] Build de producción exitoso (npm run build)
  - [ ] Sin errores de TypeScript (npm run type-check)
  - [ ] Sin errores de linting (npm run lint)

- [ ] **Pruebas**
  - [ ] Cobertura > 80% verificada
  - [ ] Pruebas unitarias: 100% pass
  - [ ] Pruebas de integración: 100% pass
  - [ ] Pruebas de accesibilidad: 0 violaciones
  - [ ] Plan JMeter creado

- [ ] **Calidad**
  - [ ] TPIE ≤ 2 min en cada módulo (medido y documentado)
  - [ ] Lighthouse Accessibility ≥ 90
  - [ ] Lighthouse Performance ≥ 80
  - [ ] Tamaños mínimos de botones verificados

- [ ] **CI/CD**
  - [ ] GitHub Actions configurado y funcionando
  - [ ] Husky hooks funcionan
  - [ ] Commits siguen Conventional Commits
  - [ ] Pipeline ejecuta sin errores

- [ ] **Despliegue**
  - [ ] App desplegada en Vercel
  - [ ] URL de producción accesible
  - [ ] Todas las rutas funcionan en producción
  - [ ] Assets se cargan correctamente

- [ ] **Documentación**
  - [ ] README completo con instrucciones
  - [ ] Informe de Calidad ISO/IEC 25010 en PDF
  - [ ] Plan de 21 commits documentado
  - [ ] Checklists de QA completados
  - [ ] Evidencias de pruebas (screenshots, reportes)

- [ ] **Commits**
  - [ ] 21 commits realizados (7 por persona)
  - [ ] Nombres de autores correctos
  - [ ] Mensajes descriptivos siguiendo convenciones
  - [ ] Historial limpio y navegable

---

## 🎓 TIPS PARA LA PRESENTACIÓN

1. **Demo en Vivo**: Muestra la app funcionando en Vercel, no local
2. **Métricas Visuales**: Screenshots de Lighthouse, cobertura, etc.
3. **Historial de Commits**: `git log --oneline --graph --all` muestra contribuciones
4. **Cobertura de Código**: Abre coverage/lcov-report/index.html en navegador
5. **Arquitectura**: Diagrama de componentes y flujo de datos
6. **Accesibilidad**: Demo de navegación por teclado

---

## 📞 SOPORTE

Si encuentras problemas:
1. Revisa esta guía completa
2. Consulta la documentación de las herramientas
3. Busca el error específico en Google/StackOverflow
4. Verifica que todas las dependencias están instaladas (`npm install`)

---

**¡Éxito con el proyecto! 🚀**

Este es un proyecto complejo pero bien estructurado. Síguelo paso a paso y tendrás una aplicación educativa de calidad profesional.
