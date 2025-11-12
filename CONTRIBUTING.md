# 🤝 Guía de Contribución

Gracias por tu interés en contribuir al proyecto **Colegio Mentes Creativas**. Esta guía te ayudará a configurar el entorno de desarrollo y seguir las mejores prácticas del proyecto.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: v18.x, v20.x o v22.x (recomendado v20.x LTS)
- **npm**: v9.x o superior
- **Git**: v2.x o superior
- **Editor**: Visual Studio Code (recomendado) con extensiones:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

---

## 🚀 Configuración del Entorno

### 1. Clonar el Repositorio

```bash
git clone https://github.com/SebastianRosero16/integracion_continuaF.git
cd integracion_continua
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno (Opcional)

```bash
cp .env.example .env
```

Edita `.env` según tus necesidades locales.

### 4. Verificar Instalación

```bash
# Ejecutar servidor de desarrollo
npm run dev

# En otra terminal, ejecutar pruebas
npm test
```

Si el servidor inicia en `http://localhost:5173` y las pruebas pasan, ¡estás listo! ✅

---

## 🔄 Flujo de Trabajo

### 1. Crear una Rama

Para cada nueva característica o corrección, crea una rama desde `main`:

```bash
git checkout main
git pull origin main
git checkout -b tipo/descripcion-breve
```

**Tipos de ramas**:
- `feat/` - Nueva funcionalidad
- `fix/` - Corrección de bug
- `test/` - Agregar o mejorar pruebas
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `style/` - Cambios de formato (espacios, comas, etc.)
- `perf/` - Mejoras de rendimiento

**Ejemplos**:
```bash
git checkout -b feat/agregar-calculadora-fisica
git checkout -b fix/corregir-validacion-password
git checkout -b test/agregar-pruebas-geografia
```

### 2. Hacer Cambios

Desarrolla tu funcionalidad siguiendo las [Convenciones de Código](#-convenciones-de-código).

### 3. Ejecutar Validaciones Locales

Antes de hacer commit, asegúrate de que todo esté correcto:

```bash
# Validación completa (lint + type-check + tests + build)
npm run validate

# O ejecutar individualmente:
npm run lint          # Validar ESLint
npm run type-check    # Verificar tipos TypeScript
npm test              # Ejecutar pruebas
npm run build         # Compilar proyecto
```

Si alguna validación falla, corrígela antes de continuar.

### 4. Hacer Commit

Usa mensajes de commit descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/es/):

```bash
git add .
git commit -m "tipo: descripción breve

- Detalle 1 del cambio
- Detalle 2 del cambio
- Detalle 3 del cambio"
```

**Formato de Mensajes**:

```
<tipo>: <descripción breve en minúsculas>

[Opcional] Cuerpo del mensaje con detalles:
- Cambio específico 1
- Cambio específico 2
- Cambio específico 3

[Opcional] Referencias: Closes #123, Fixes #456
```

**Tipos de commit**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `test`: Agregar/actualizar pruebas
- `docs`: Cambios en documentación
- `style`: Formato, espacios, puntos y comas
- `refactor`: Refactorización sin cambiar funcionalidad
- `perf`: Mejora de rendimiento
- `chore`: Tareas de mantenimiento (actualizar dependencias, etc.)
- `ci`: Cambios en configuración CI/CD
- `build`: Cambios en sistema de build

**Ejemplos de buenos commits**:

```bash
# Nueva funcionalidad
git commit -m "feat: agregar módulo de Historia de Colombia

- Crear componente HistoriaView con línea de tiempo interactiva
- Agregar datos de eventos históricos importantes (1810-2024)
- Implementar filtros por periodo (Colonial, Independencia, Moderna)
- Agregar 42 pruebas unitarias para funciones de filtrado"

# Corrección de bug
git commit -m "fix: corregir cálculo de área de triángulo con fórmula de Herón

- Resolver error en validación de lados (no permitía triángulos válidos)
- Agregar verificación de desigualdad triangular
- Actualizar pruebas con casos edge (triángulos equiláteros, rectángulos)
- Closes #89"

# Agregar pruebas
git commit -m "test: agregar 28 pruebas unitarias para elementUtils

- Tests para searchElements() con nombres parciales y símbolos
- Tests para filterByCategory() con categorías válidas e inválidas
- Tests para sortByAtomicNumber() verificando inmutabilidad
- Cobertura aumentada de 78% a 95%"

# Documentación
git commit -m "docs: actualizar guía de instalación en README

- Agregar requisitos de Node.js (v18, v20, v22)
- Incluir pasos para configurar .env
- Documentar scripts de validación (test:ci, validate)
- Agregar sección de troubleshooting"
```

### 5. Push a GitHub

```bash
git push origin tipo/descripcion-breve
```

### 6. Crear Pull Request

1. Ve a [GitHub](https://github.com/SebastianRosero16/integracion_continuaF)
2. Haz clic en "Compare & pull request"
3. Completa la plantilla de PR:
   - **Título**: Igual al commit principal
   - **Descripción**: Explica qué cambios hiciste y por qué
   - **Referencias**: Menciona issues relacionados (#123)
4. Espera a que pasen los checks de CI/CD (GitHub Actions)
5. Solicita revisión de código

---

## 📝 Convenciones de Código

### TypeScript

- **Usar tipos explícitos**: Evita `any`, usa `unknown` si es necesario
- **Interfaces sobre types**: Preferir `interface` para objetos
- **Nombres descriptivos**: Variables y funciones en `camelCase`, componentes en `PascalCase`

```typescript
// ✅ Bueno
interface Department {
  codigo: string;
  nombre: string;
  poblacion: number;
  region: Region;
}

function getDepartamentoByCode(code: string): Department | undefined {
  return departamentos.find(d => d.codigo === code);
}

// ❌ Malo
function get(c: any) {
  return data.find((x: any) => x.c === c);
}
```

### React

- **Componentes funcionales**: Usar `function` en lugar de `const`
- **Props con tipos**: Siempre definir interfaces para props
- **Hooks en orden**: useState → useEffect → custom hooks
- **Key en listas**: Usar IDs estables, no índices

```tsx
// ✅ Bueno
interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? 'line-through' : ''}>{text}</span>
      <button onClick={() => onDelete(id)}>Eliminar</button>
    </li>
  );
}

// ❌ Malo
const Item = (props: any) => {
  return <li onClick={props.fn}>{props.txt}</li>;
};
```

### CSS (TailwindCSS)

- **Clases semánticas**: Usar clases de Tailwind en orden lógico
- **Responsive design**: Mobile-first (base → sm → md → lg → xl)
- **Evitar inline styles**: Preferir clases de Tailwind

```tsx
// ✅ Bueno
<div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md md:flex-row md:gap-6">
  <h2 className="text-2xl font-bold text-gray-800">Título</h2>
  <p className="text-sm text-gray-600 md:text-base">Descripción</p>
</div>

// ❌ Malo
<div style={{ display: 'flex', padding: '24px' }}>
  <h2 style={{ fontSize: '24px' }}>Título</h2>
</div>
```

---

## 🧪 Escribir Pruebas

### Principios

1. **Prueba comportamiento, no implementación**: Valida qué hace, no cómo lo hace
2. **Arrange-Act-Assert**: Organiza pruebas en 3 secciones claras
3. **Nombres descriptivos**: `it('should render error message when input is invalid')`
4. **Tests independientes**: Cada test debe poder ejecutarse solo

### Ejemplo: Prueba de Componente

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ClickCounter } from './ClickCounter';

describe('ClickCounter', () => {
  it('should increment count when button is clicked', () => {
    // Arrange: Renderizar componente
    render(<ClickCounter />);
    
    // Act: Hacer clic en el botón
    const button = screen.getByRole('button', { name: /incrementar/i });
    fireEvent.click(button);
    
    // Assert: Verificar que el contador aumentó
    expect(screen.getByText('Contador: 1')).toBeInTheDocument();
  });

  it('should persist count in localStorage', () => {
    // Arrange
    render(<ClickCounter />);
    const button = screen.getByRole('button', { name: /incrementar/i });
    
    // Act: Incrementar 3 veces
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    // Assert: Verificar localStorage
    expect(localStorage.getItem('clickCount')).toBe('3');
  });
});
```

### Ejemplo: Prueba de Función

```typescript
import { calculateCircleArea, validatePositive } from './mathFormulas';

describe('calculateCircleArea', () => {
  it('should calculate area correctly for radius 5', () => {
    // Arrange
    const radius = 5;
    const expectedArea = Math.PI * 5 * 5; // π * r²
    
    // Act
    const result = calculateCircleArea(radius);
    
    // Assert
    expect(result).toBeCloseTo(expectedArea, 2); // 78.54
  });

  it('should throw error for negative radius', () => {
    // Act & Assert
    expect(() => calculateCircleArea(-5)).toThrow('El radio debe ser positivo');
  });
});
```

### Ejecutar Pruebas

```bash
# Todas las pruebas
npm test

# Solo pruebas de un archivo
npm test -- mathFormulas.test.ts

# Modo watch (re-ejecuta al guardar)
npm run test:watch

# Con cobertura
npm run test:coverage
```

---

## ✅ Checklist Antes de Hacer PR

Antes de crear un Pull Request, verifica:

- [ ] ✅ Código cumple con convenciones (nombres descriptivos, tipado correcto)
- [ ] ✅ Todas las pruebas pasan (`npm test`)
- [ ] ✅ Linter pasa sin errores (`npm run lint`)
- [ ] ✅ Type-check pasa sin errores (`npm run type-check`)
- [ ] ✅ Build compila correctamente (`npm run build`)
- [ ] ✅ Nuevas funcionalidades tienen pruebas unitarias
- [ ] ✅ Commits siguen convención (feat:, fix:, test:, etc.)
- [ ] ✅ README actualizado si agregaste nueva funcionalidad
- [ ] ✅ Documentación actualizada (comentarios en código si es complejo)
- [ ] ✅ No hay console.log() olvidados en el código
- [ ] ✅ No hay archivos innecesarios (node_modules, .env, etc.)

---

## 🐛 Reportar Bugs

Si encuentras un bug, crea un [issue](https://github.com/SebastianRosero16/integracion_continuaF/issues/new) con:

1. **Título descriptivo**: "Bug: [Módulo] - Descripción breve"
2. **Pasos para reproducir**:
   - Paso 1
   - Paso 2
   - Paso 3
3. **Comportamiento esperado**: Qué debería pasar
4. **Comportamiento actual**: Qué pasa realmente
5. **Capturas de pantalla**: Si es visual
6. **Entorno**:
   - SO: Windows 11 / macOS 14 / Ubuntu 22.04
   - Navegador: Chrome 120 / Firefox 121
   - Node.js: v20.10.0

---

## 💡 Sugerir Funcionalidades

Para sugerir una nueva funcionalidad, crea un [issue](https://github.com/SebastianRosero16/integracion_continuaF/issues/new) con:

1. **Título**: "Feature: [Área] - Descripción breve"
2. **Descripción**: ¿Qué problema resuelve?
3. **Propuesta**: ¿Cómo funcionaría?
4. **Ejemplos**: Mockups, wireframes, ejemplos de código
5. **Alternativas**: Otras formas de resolverlo

---

## 📚 Recursos Útiles

- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Conventional Commits](https://www.conventionalcommits.org/es/)

---

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir, puedes:

- Abrir un [issue de discusión](https://github.com/SebastianRosero16/integracion_continuaF/issues)
- Contactar a los mantenedores:
  - Sebastian Rosero: [GitHub](https://github.com/SebastianRosero16)
  - Hector Riascos: [GitHub](https://github.com/HectorARiascosI)

---

¡Gracias por contribuir al proyecto! 🎉
