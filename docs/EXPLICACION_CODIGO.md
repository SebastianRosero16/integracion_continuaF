# 🔍 EXPLICACIÓN PASO A PASO - CÓMO FUNCIONA EL CÓDIGO

Esta guía explica en detalle cómo funciona cada parte del código creado.

---

## 📐 1. MOTOR DE CÁLCULOS MATEMÁTICOS

### Archivo: `src/utils/mathFormulas.ts`

#### Interfaz CalculationResult

```typescript
export interface CalculationResult {
  area: number;
  perimeter: number | null;
  formula: {
    area: string;
    perimeter: string;
  };
  steps?: {
    area: string[];
    perimeter?: string[];
  };
}
```

**¿Qué hace?**
- Define la estructura de datos que devuelven todas las funciones de cálculo
- Asegura que siempre se retorne área, perímetro, fórmulas y pasos

**¿Por qué `perimeter` puede ser `null`?**
- El triángulo calculado solo por base-altura no tiene suficiente info para el perímetro

---

#### Función: `calculateSquare(side: number)`

```typescript
export function calculateSquare(side: number): CalculationResult {
  validatePositive(side, 'lado');

  const area = side * side;
  const perimeter = 4 * side;

  return {
    area,
    perimeter,
    formula: {
      area: 'A = lado²',
      perimeter: 'P = 4 × lado',
    },
    steps: {
      area: [`A = ${side}²`, `A = ${area} unidades²`],
      perimeter: [`P = 4 × ${side}`, `P = ${perimeter} unidades`],
    },
  };
}
```

**Paso a paso:**

1. **Validación:**
   ```typescript
   validatePositive(side, 'lado');
   ```
   - Verifica que el lado sea mayor a 0
   - Si es 0 o negativo, lanza un error descriptivo

2. **Cálculos:**
   ```typescript
   const area = side * side;        // Área = lado²
   const perimeter = 4 * side;      // Perímetro = 4 × lado
   ```

3. **Retorno estructurado:**
   - Valores numéricos (`area`, `perimeter`)
   - Fórmulas en texto legible para mostrar en UI
   - Pasos detallados para educar al estudiante

**Ejemplo de uso:**

```typescript
const resultado = calculateSquare(5);

console.log(resultado);
// {
//   area: 25,
//   perimeter: 20,
//   formula: { area: 'A = lado²', perimeter: 'P = 4 × lado' },
//   steps: {
//     area: ['A = 5²', 'A = 25 unidades²'],
//     perimeter: ['P = 4 × 5', 'P = 20 unidades']
//   }
// }
```

---

#### Función: `calculateCircle(radius: number)`

```typescript
export function calculateCircle(radius: number): CalculationResult {
  validatePositive(radius, 'radio');

  const area = Math.PI * radius * radius;
  const perimeter = 2 * Math.PI * radius;

  return {
    area: Math.round(area * 100) / 100,
    perimeter: Math.round(perimeter * 100) / 100,
    formula: {
      area: 'A = π × r²',
      perimeter: 'P = 2 × π × r',
    },
    steps: {
      area: [
        `A = π × ${radius}²`,
        `A = ${Math.PI.toFixed(2)} × ${radius * radius}`,
        `A = ${Math.round(area * 100) / 100} unidades²`,
      ],
      perimeter: [
        `P = 2 × π × ${radius}`,
        `P = 2 × ${Math.PI.toFixed(2)} × ${radius}`,
        `P = ${Math.round(perimeter * 100) / 100} unidades`,
      ],
    },
  };
}
```

**Detalles importantes:**

1. **Uso de Math.PI:**
   ```typescript
   const area = Math.PI * radius * radius;
   ```
   - `Math.PI` es 3.141592653589793 (precisión de JavaScript)
   - Multiplica π por r²

2. **Redondeo a 2 decimales:**
   ```typescript
   Math.round(area * 100) / 100
   ```
   - Multiplica por 100: `314.159 * 100 = 31415.9`
   - Redondea: `Math.round(31415.9) = 31416`
   - Divide por 100: `31416 / 100 = 314.16`
   - **Resultado:** 314.16 unidades² (2 decimales)

3. **Pasos educativos:**
   - Muestra π como 3.14 para simplificar
   - Desglosa el cálculo en múltiples pasos
   - Ayuda al estudiante a entender el proceso

---

#### Función: `calculateTriangleBySides(a, b, c)` - Fórmula de Herón

```typescript
export function calculateTriangleBySides(
  a: number,
  b: number,
  c: number
): CalculationResult {
  validateTriangle(a, b, c);

  const semiperimeter = (a + b + c) / 2;
  const area = Math.sqrt(
    semiperimeter *
      (semiperimeter - a) *
      (semiperimeter - b) *
      (semiperimeter - c)
  );
  const perimeter = a + b + c;

  return {
    area: Math.round(area * 100) / 100,
    perimeter,
    formula: {
      area: 'A = √[s(s-a)(s-b)(s-c)], donde s = (a+b+c)/2',
      perimeter: 'P = a + b + c',
    },
    steps: {
      area: [
        `Semiperímetro s = (${a} + ${b} + ${c}) / 2 = ${semiperimeter}`,
        `A = √[${semiperimeter} × (${semiperimeter}-${a}) × (${semiperimeter}-${b}) × (${semiperimeter}-${c})]`,
        `A = ${Math.round(area * 100) / 100} unidades²`,
      ],
      perimeter: [`P = ${a} + ${b} + ${c}`, `P = ${perimeter} unidades`],
    },
  };
}
```

**Paso a paso de la Fórmula de Herón:**

1. **Validar desigualdad triangular:**
   ```typescript
   validateTriangle(a, b, c);
   ```
   - Verifica: `a + b > c`, `a + c > b`, `b + c > a`
   - Si falla, no es un triángulo válido

2. **Calcular semiperímetro:**
   ```typescript
   const semiperimeter = (a + b + c) / 2;
   ```
   - Ejemplo: lados 5, 6, 7
   - `s = (5 + 6 + 7) / 2 = 9`

3. **Aplicar fórmula de Herón:**
   ```typescript
   const area = Math.sqrt(
     semiperimeter *
     (semiperimeter - a) *
     (semiperimeter - b) *
     (semiperimeter - c)
   );
   ```
   - `s = 9`, `a = 5`, `b = 6`, `c = 7`
   - `área = √[9 × (9-5) × (9-6) × (9-7)]`
   - `área = √[9 × 4 × 3 × 2]`
   - `área = √216`
   - `área = 14.70 unidades²`

**¿Por qué es importante?**
- No necesitas conocer la altura del triángulo
- Solo necesitas los 3 lados
- Útil para triángulos irregulares

---

## 🎨 2. COMPONENTES DE UI

### Archivo: `src/components/ui/Card.tsx`

```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  role?: string;
  'aria-label'?: string;
  tabIndex?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...a11yProps
}) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-300',
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all',
        variants[variant],
        className
      )}
      {...a11yProps}
    >
      {children}
    </div>
  );
};
```

**Cómo funciona:**

1. **Props interface:**
   - `children`: Contenido del card (puede ser cualquier elemento React)
   - `variant`: Estilo visual (3 opciones)
   - `className`: Clases CSS adicionales (opcional)
   - `role`, `aria-label`, `tabIndex`: Props de accesibilidad

2. **Spread de a11yProps:**
   ```typescript
   {...a11yProps}
   ```
   - Extrae automáticamente `role`, `aria-label`, `tabIndex`
   - Los aplica al div sin escribirlos uno por uno

3. **Utilidad `cn()`:**
   ```typescript
   cn(
     'rounded-lg p-6 transition-all',  // Clases base
     variants[variant],                 // Clase según variante
     className                          // Clases personalizadas
   )
   ```
   - Combina múltiples clases CSS
   - Resuelve conflictos de Tailwind (ej: si hay 2 `bg-` solo usa el último)

4. **Variantes:**
   - `default`: Fondo blanco con borde sutil
   - `elevated`: Fondo blanco con sombra grande
   - `outlined`: Transparente con borde grueso

**Ejemplo de uso:**

```tsx
<Card variant="elevated" aria-label="Información del cuadrado">
  <h2>Cuadrado</h2>
  <p>Área: 25 u²</p>
</Card>
```

---

### Archivo: `src/components/ui/Button.tsx`

```typescript
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  ...rest
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'rounded-lg font-medium transition-all min-w-[44px] min-h-[44px]',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className="inline-block animate-spin">⏳</span>
      ) : (
        children
      )}
    </button>
  );
};
```

**Características clave:**

1. **Tamaño mínimo táctil (WCAG):**
   ```typescript
   min-w-[44px] min-h-[44px]
   ```
   - Garantiza que el botón sea fácil de tocar en dispositivos móviles
   - Estándar de accesibilidad WCAG 2.1 AA

2. **Focus ring:**
   ```typescript
   focus:ring-2 focus:ring-offset-2
   ```
   - Cuando el botón recibe foco (tabulador), muestra un anillo visible
   - Importante para usuarios que navegan con teclado

3. **Estado de carga:**
   ```typescript
   {loading ? (
     <span className="inline-block animate-spin">⏳</span>
   ) : (
     children
   )}
   ```
   - Si `loading=true`, muestra un spinner animado
   - Oculta el contenido original hasta que termine

4. **Deshabilitado:**
   ```typescript
   (disabled || loading) && 'opacity-50 cursor-not-allowed'
   ```
   - Reduce opacidad al 50%
   - Cambia cursor a "prohibido"
   - Previene clicks

---

### Archivo: `src/components/ui/ShapeViewer.tsx`

```typescript
export const ShapeViewer: React.FC<ShapeViewerProps> = ({ type, dimensions, className }) => {
  const renderShape = () => {
    switch (type) {
      case 'square':
        return (
          <svg viewBox="0 0 200 200" className={className}>
            <rect
              x="50"
              y="50"
              width="100"
              height="100"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            <text x="100" y="105" textAnchor="middle" className="text-sm font-bold" fill="#1e40af">
              {dimensions.side || '?'}
            </text>
          </svg>
        );
      
      case 'circle':
        return (
          <svg viewBox="0 0 200 200" className={className}>
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="#f59e0b"
              fillOpacity="0.3"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            {/* Línea del radio */}
            <line x1="100" y1="100" x2="160" y2="100" stroke="#d97706" strokeWidth="2" />
            <text x="130" y="95" textAnchor="middle" className="text-sm font-bold" fill="#92400e">
              r={dimensions.radius || '?'}
            </text>
          </svg>
        );
      
      case 'polygon':
        const { sides = 6, sideLength = 4 } = dimensions;
        const angle = (2 * Math.PI) / sides;
        const radius = (sideLength / (2 * Math.sin(Math.PI / sides)));
        
        const points = Array.from({ length: sides }, (_, i) => {
          const x = 100 + radius * Math.cos(i * angle - Math.PI / 2);
          const y = 100 + radius * Math.sin(i * angle - Math.PI / 2);
          return `${x},${y}`;
        }).join(' ');

        return (
          <svg viewBox="0 0 200 200" className={className}>
            <polygon
              points={points}
              fill="#ec4899"
              fillOpacity="0.3"
              stroke="#ec4899"
              strokeWidth="3"
            />
          </svg>
        );
    }
  };

  return <div className="w-full max-w-md mx-auto">{renderShape()}</div>;
};
```

**Cómo funciona el polígono regular:**

1. **Calcular ángulo entre vértices:**
   ```typescript
   const angle = (2 * Math.PI) / sides;
   ```
   - Para un hexágono (6 lados): `360° / 6 = 60°` (en radianes: `2π / 6`)

2. **Calcular radio del círculo circunscrito:**
   ```typescript
   const radius = (sideLength / (2 * Math.sin(Math.PI / sides)));
   ```
   - Fórmula geométrica para encontrar el radio del círculo que contiene el polígono

3. **Generar puntos (x, y):**
   ```typescript
   Array.from({ length: sides }, (_, i) => {
     const x = 100 + radius * Math.cos(i * angle - Math.PI / 2);
     const y = 100 + radius * Math.sin(i * angle - Math.PI / 2);
     return `${x},${y}`;
   })
   ```
   - `(100, 100)` es el centro del canvas (200x200)
   - `- Math.PI / 2` rota para que el primer punto esté arriba
   - `Math.cos` calcula la coordenada X
   - `Math.sin` calcula la coordenada Y

4. **Resultado:**
   - Hexágono (6 lados): 6 puntos distribuidos uniformemente en círculo
   - Ejemplo: `"100,40 130,55 130,85 100,100 70,85 70,55"`

**¿Por qué usar SVG?**
- Escalable sin pérdida de calidad
- Fácil de animar y modificar
- Accesible (puede tener atributos ARIA)

---

## 🧮 3. MÓDULO DE MATEMÁTICAS

### Archivo: `src/pages/Math/MathModule.tsx`

Este es el componente más complejo. Vamos por partes:

#### 3.1 Estados del Componente

```typescript
const [mode, setMode] = useState<Mode>('calculator');
const [selectedShape, setSelectedShape] = useState<ShapeType>('square');
const [inputs, setInputs] = useState<Record<string, string>>({});
const [result, setResult] = useState<CalculationResult | null>(null);
const [error, setError] = useState<string>('');
const [moduleProgress, setModuleProgress] = useState(0);

// Challenge mode
const [questions, setQuestions] = useState<QuizQuestion[]>([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [userAnswer, setUserAnswer] = useState('');
const [score, setScore] = useState(0);
const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
const [challengeComplete, setChallengeComplete] = useState(false);
```

**¿Qué es cada estado?**

- `mode`: Modo actual ('calculator' o 'challenge')
- `selectedShape`: Figura geométrica seleccionada
- `inputs`: Objeto con los valores ingresados (ej: `{ side: "5" }`)
- `result`: Resultado del cálculo o null si no hay
- `error`: Mensaje de error si hay validación fallida
- `moduleProgress`: 0-100, progreso del módulo guardado en localStorage
- `questions`: Array de 10 preguntas generadas aleatoriamente
- `currentQuestionIndex`: Índice de la pregunta actual (0-9)
- `userAnswer`: Respuesta del usuario como string
- `score`: Cantidad de respuestas correctas
- `timeLeft`: Segundos restantes (comienza en 300 = 5 minutos)
- `challengeComplete`: true cuando termina el challenge

---

#### 3.2 Inputs Dinámicos

```typescript
const getInputFields = (shape: ShapeType) => {
  switch (shape) {
    case 'square':
      return [{ key: 'side', label: 'Lado', placeholder: 'Ejemplo: 5' }];
    
    case 'rectangle':
      return [
        { key: 'length', label: 'Largo', placeholder: 'Ejemplo: 8' },
        { key: 'width', label: 'Ancho', placeholder: 'Ejemplo: 5' },
      ];
    
    case 'triangle-sides':
      return [
        { key: 'sideA', label: 'Lado A', placeholder: 'Ejemplo: 5' },
        { key: 'sideB', label: 'Lado B', placeholder: 'Ejemplo: 6' },
        { key: 'sideC', label: 'Lado C', placeholder: 'Ejemplo: 7' },
      ];
    
    // ... otros casos
  }
};
```

**¿Cómo funciona?**

1. Usuario selecciona "Rectángulo"
2. `selectedShape` cambia a `'rectangle'`
3. React re-renderiza el componente
4. `getInputFields('rectangle')` devuelve array con 2 campos
5. Se mapea el array para crear los inputs:

```tsx
{getInputFields(selectedShape).map((field) => (
  <div key={field.key}>
    <label>{field.label}</label>
    <input
      type="number"
      value={inputs[field.key] || ''}
      onChange={(e) => setInputs({ ...inputs, [field.key]: e.target.value })}
    />
  </div>
))}
```

**Resultado visual:**
- Input 1: "Largo" con placeholder "Ejemplo: 8"
- Input 2: "Ancho" con placeholder "Ejemplo: 5"

---

#### 3.3 Función de Cálculo

```typescript
const handleCalculate = () => {
  setError('');
  setResult(null);

  const inputFields = getInputFields(selectedShape);
  const values: Record<string, number> = {};

  // Validar que todos los campos estén llenos
  for (const field of inputFields) {
    const value = parseFloat(inputs[field.key]);
    if (isNaN(value) || value <= 0) {
      setError(`Por favor ingresa un valor válido para ${field.label.toLowerCase()}`);
      return;
    }
    values[field.key] = value;
  }

  try {
    let calculationResult: CalculationResult;

    switch (selectedShape) {
      case 'square':
        calculationResult = calculateSquare(values.side);
        break;
      case 'rectangle':
        calculationResult = calculateRectangle(values.length, values.width);
        break;
      // ... otros casos
    }

    setResult(calculationResult);

    // Actualizar progreso
    if (moduleProgress < 50) {
      updateModuleProgress(50);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error en el cálculo');
  }
};
```

**Flujo paso a paso:**

1. **Limpiar estado previo:**
   ```typescript
   setError('');
   setResult(null);
   ```

2. **Convertir strings a números:**
   ```typescript
   const value = parseFloat(inputs[field.key]);
   ```
   - `inputs.side` es `"5"` (string)
   - `parseFloat("5")` devuelve `5` (number)

3. **Validar:**
   - Si `isNaN(value)` → usuario no ingresó número válido
   - Si `value <= 0` → número negativo o cero (inválido)

4. **Llamar función de cálculo:**
   - Selecciona la función correcta según `selectedShape`
   - Pasa los valores numéricos extraídos

5. **Guardar resultado:**
   ```typescript
   setResult(calculationResult);
   ```
   - React re-renderiza y muestra el resultado

6. **Actualizar progreso:**
   - Primera vez que calcula → 50%
   - Al completar challenge → 100%

---

#### 3.4 Timer del Challenge

```typescript
useEffect(() => {
  if (mode === 'challenge' && timeLeft > 0 && !challengeComplete) {
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }
  if (timeLeft === 0 && !challengeComplete) {
    finishChallenge();
  }
}, [mode, timeLeft, challengeComplete]);
```

**¿Cómo funciona?**

1. **Condición para activar timer:**
   ```typescript
   if (mode === 'challenge' && timeLeft > 0 && !challengeComplete)
   ```
   - Solo en modo challenge
   - Solo si quedan segundos
   - Solo si no ha terminado

2. **Crear timeout:**
   ```typescript
   const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
   ```
   - Espera 1 segundo (1000 ms)
   - Reduce `timeLeft` en 1

3. **Limpieza:**
   ```typescript
   return () => clearTimeout(timer);
   ```
   - Cancela el timer anterior antes de crear uno nuevo
   - Previene múltiples timers simultáneos

4. **Fin del tiempo:**
   ```typescript
   if (timeLeft === 0 && !challengeComplete) {
     finishChallenge();
   }
   ```
   - Cuando llega a 0, termina el challenge automáticamente

**Resultado:**
- `timeLeft = 300` → `299` → `298` → ... → `0`
- Se muestra en pantalla: `5:00` → `4:59` → `4:58` → ... → `0:00`

---

#### 3.5 Generación de Preguntas Aleatorias

```typescript
const generateQuestions = (): QuizQuestion[] => {
  const questionPool: QuizQuestion[] = [];
  const shapes: ShapeType[] = ['square', 'rectangle', 'circle', /* ... */];

  for (let i = 0; i < 10; i++) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const answerType = Math.random() > 0.5 ? 'area' : 'perimeter';

    let question = '';
    let inputs: Record<string, number> = {};
    let correctAnswer = 0;

    switch (shape) {
      case 'square': {
        const side = Math.floor(Math.random() * 10) + 3; // 3-12
        inputs = { side };
        const calc = calculateSquare(side);
        correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
        question = `Calcula el ${answerType === 'area' ? 'área' : 'perímetro'} de un cuadrado con lado de ${side} unidades`;
        break;
      }
      // ... otros casos
    }

    questionPool.push({
      id: i + 1,
      shape,
      question,
      inputs,
      correctAnswer,
      answerType,
    });
  }

  return questionPool;
};
```

**Paso a paso:**

1. **Seleccionar figura aleatoria:**
   ```typescript
   const shape = shapes[Math.floor(Math.random() * shapes.length)];
   ```
   - `Math.random()` devuelve 0.0 - 0.999...
   - `Math.random() * 6` devuelve 0.0 - 5.999...
   - `Math.floor(5.8)` devuelve `5`
   - `shapes[5]` selecciona el sexto elemento

2. **Decidir tipo de pregunta:**
   ```typescript
   const answerType = Math.random() > 0.5 ? 'area' : 'perimeter';
   ```
   - 50% probabilidad de área
   - 50% probabilidad de perímetro

3. **Generar valores aleatorios:**
   ```typescript
   const side = Math.floor(Math.random() * 10) + 3;
   ```
   - `Math.random() * 10` → 0.0 - 9.999
   - `Math.floor()` → 0 - 9
   - `+ 3` → 3 - 12
   - **Resultado:** lado entre 3 y 12 unidades

4. **Calcular respuesta correcta:**
   ```typescript
   const calc = calculateSquare(side);
   correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
   ```
   - Usa las mismas funciones que la calculadora
   - Garantiza consistencia

5. **Construir pregunta:**
   ```typescript
   question = `Calcula el área de un cuadrado con lado de 8 unidades`;
   ```

**Resultado:**
- 10 preguntas únicas
- Mezcla de figuras
- Mezcla de área/perímetro
- Valores aleatorios pero razonables

---

#### 3.6 localStorage y Progreso

```typescript
const updateModuleProgress = (progress: number) => {
  const stored = localStorage.getItem('moduleProgress');
  const modules = stored ? JSON.parse(stored) : [];
  const mathIndex = modules.findIndex((m: any) => m.id === 'math');

  if (mathIndex >= 0) {
    modules[mathIndex].progress = progress;
  } else {
    modules.push({ id: 'math', progress });
  }

  localStorage.setItem('moduleProgress', JSON.stringify(modules));
  setModuleProgress(progress);
};
```

**¿Cómo funciona?**

1. **Leer del localStorage:**
   ```typescript
   const stored = localStorage.getItem('moduleProgress');
   ```
   - Devuelve string JSON o null

2. **Parsear JSON:**
   ```typescript
   const modules = stored ? JSON.parse(stored) : [];
   ```
   - Si existe: convierte string a array de objetos
   - Si no existe: array vacío

3. **Buscar módulo de matemáticas:**
   ```typescript
   const mathIndex = modules.findIndex((m: any) => m.id === 'math');
   ```
   - Devuelve índice si existe
   - Devuelve -1 si no existe

4. **Actualizar o agregar:**
   - Si existe (`mathIndex >= 0`): actualiza el progreso
   - Si no existe: agrega nuevo objeto

5. **Guardar en localStorage:**
   ```typescript
   localStorage.setItem('moduleProgress', JSON.stringify(modules));
   ```
   - Convierte array a string JSON
   - Lo guarda en el navegador

**Formato en localStorage:**

```json
[
  { "id": "math", "progress": 100 },
  { "id": "science", "progress": 50 },
  { "id": "social", "progress": 0 }
]
```

**Ventajas:**
- Persiste entre sesiones
- El usuario puede cerrar el navegador y su progreso se mantiene
- Fácil de resetear (`localStorage.clear()`)

---

## 🗂️ 4. SISTEMA DE RUTAS

### Archivo: `src/routes/AppRoutes.tsx`

```typescript
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NewLayout />}>
        <Route index element={<Home />} />
        <Route path="matematicas" element={<MathModule />} />
        <Route path="ciencias" element={<ScienceModule />} />
        <Route path="sociales" element={<SocialModule />} />
      </Route>
    </Routes>
  );
}
```

**¿Cómo funciona?**

1. **Ruta padre (`/`):**
   ```typescript
   <Route path="/" element={<NewLayout />}>
   ```
   - Renderiza el Layout (header + footer)
   - Todas las rutas hijas heredan este layout

2. **Ruta índice:**
   ```typescript
   <Route index element={<Home />} />
   ```
   - `index` = ruta raíz (`/`)
   - Sin el atributo `path`

3. **Rutas hijas:**
   ```typescript
   <Route path="matematicas" element={<MathModule />} />
   ```
   - URL completa: `/matematicas`
   - Renderiza `<MathModule />` dentro del `<Outlet />` del Layout

**Flujo de navegación:**

```
Usuario hace clic en "Matemáticas"
    ↓
React Router cambia URL a /matematicas
    ↓
Layout permanece (header + footer)
    ↓
<Outlet /> renderiza <MathModule />
    ↓
Usuario ve: Header → MathModule → Footer
```

---

### Archivo: `src/components/layout/Layout.tsx`

```typescript
export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <nav>
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                to={path}
                className={isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>...</footer>
    </div>
  );
};
```

**Características:**

1. **useLocation hook:**
   ```typescript
   const location = useLocation();
   ```
   - Devuelve objeto con info de la ruta actual
   - `location.pathname` = `"/matematicas"`

2. **Indicador de ruta activa:**
   ```typescript
   const isActive = location.pathname === path;
   ```
   - Compara ruta actual con ruta del link
   - Si coincide, aplica estilos especiales

3. **aria-current:**
   ```typescript
   aria-current={isActive ? 'page' : undefined}
   ```
   - Atributo de accesibilidad
   - Indica a lectores de pantalla cuál es la página actual

4. **Responsive labels:**
   ```typescript
   <span className="hidden md:inline">{label}</span>
   ```
   - `hidden` = oculto por defecto (móvil)
   - `md:inline` = visible en pantallas medianas y grandes

5. **<Outlet />:**
   ```typescript
   <Outlet />
   ```
   - Placeholder donde React Router renderiza las rutas hijas
   - Cambia dinámicamente según la URL

---

## 🎯 5. FLUJO COMPLETO DE USUARIO

### Escenario: Usuario calcula el área de un círculo

**1. Navegación inicial:**

```
Usuario abre http://localhost:5173
    ↓
main.tsx ejecuta ReactDOM.createRoot()
    ↓
App.tsx renderiza <BrowserRouter> y <AppRoutes />
    ↓
Ruta "/" coincide → Layout + Home
    ↓
Home.tsx carga progreso desde localStorage
    ↓
Usuario ve 3 tarjetas de módulos
```

**2. Usuario hace clic en "Matemáticas":**

```
onClick en Link to="/matematicas"
    ↓
React Router actualiza URL a /matematicas
    ↓
Ruta "matematicas" coincide → Layout + MathModule
    ↓
MathModule se renderiza con estado inicial:
  - mode: 'calculator'
  - selectedShape: 'square'
  - inputs: {}
  - result: null
```

**3. Usuario selecciona "Círculo":**

```
onClick en botón de círculo
    ↓
setSelectedShape('circle')
    ↓
React re-renderiza
    ↓
getInputFields('circle') devuelve [{ key: 'radius', ... }]
    ↓
Se muestra 1 input: "Radio"
```

**4. Usuario ingresa "7":**

```
onChange del input
    ↓
setInputs({ radius: "7" })
    ↓
Estado actualizado: inputs = { radius: "7" }
```

**5. Usuario hace clic en "Calcular":**

```
onClick → handleCalculate()
    ↓
parseFloat(inputs.radius) → 7 (number)
    ↓
Validación: 7 > 0 ✅
    ↓
calculateCircle(7)
    ↓
area = π × 7² = 153.94
perimeter = 2 × π × 7 = 43.98
    ↓
setResult({ area: 153.94, perimeter: 43.98, ... })
    ↓
React re-renderiza
    ↓
Usuario ve:
  - Visualización SVG del círculo
  - Área: 153.94 u²
  - Perímetro: 43.98 u
  - Fórmulas
  - Pasos del cálculo
    ↓
updateModuleProgress(50)
    ↓
localStorage.setItem('moduleProgress', '[{"id":"math","progress":50}]')
```

**6. Usuario va a Modo Reto:**

```
onClick en "Modo Reto"
    ↓
startChallenge()
    ↓
generateQuestions() crea 10 preguntas
    ↓
setMode('challenge')
    ↓
Timer comienza: 300 segundos
    ↓
React re-renderiza mostrando primera pregunta
```

**7. Usuario responde pregunta:**

```
onChange en input de respuesta
    ↓
setUserAnswer("25")
    ↓
onClick en "Enviar"
    ↓
submitAnswer()
    ↓
Compara userAnswer con correctAnswer
    ↓
Math.abs(25 - 25) < 0.5 → Correcto ✅
    ↓
setScore(score + 1)
    ↓
setShowFeedback(true)
    ↓
Muestra "¡Correcto!" por 2 segundos
    ↓
setTimeout → avanza a siguiente pregunta
```

**8. Completa las 10 preguntas:**

```
currentQuestionIndex === 9 (última pregunta)
    ↓
submitAnswer() en última pregunta
    ↓
finishChallenge()
    ↓
setChallengeComplete(true)
    ↓
Calcula: finalScore = (score / 10) * 100
    ↓
Si finalScore >= 70:
  updateModuleProgress(100)
    ↓
Muestra pantalla de resultados con trofeo
```

**9. Vuelve a Home:**

```
onClick en "Volver"
    ↓
navigate('/')
    ↓
Home.tsx carga progreso desde localStorage
    ↓
encuentra { id: 'math', progress: 100 }
    ↓
Muestra badge "¡Completado!" y trofeo dorado
```

---

## 🔧 6. UTILIDADES

### Archivo: `src/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**¿Por qué esta utilidad?**

**Problema:**
```tsx
<div className={`px-4 ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'} ${className}`}>
```
- Difícil de leer
- Propenso a errores de sintaxis
- Conflictos de Tailwind no resueltos

**Solución:**
```tsx
<div className={cn('px-4', variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500', className)}>
```

**¿Cómo funciona?**

1. **clsx:**
   - Combina múltiples clases
   - Ignora valores falsy (undefined, null, false)
   - Acepta objetos: `{ 'bg-blue': isPrimary }`

2. **twMerge:**
   - Resuelve conflictos de Tailwind
   - Si hay `bg-blue-500` y `bg-red-500`, solo usa el último

**Ejemplo:**

```typescript
cn(
  'px-4 py-2',           // Siempre aplicado
  isPrimary && 'bg-blue', // Solo si isPrimary es true
  { 'font-bold': isActive }, // Solo si isActive es true
  className              // Clases adicionales del usuario
)

// Si isPrimary=true, isActive=false, className="text-lg"
// Resultado: "px-4 py-2 bg-blue text-lg"
```

---

## 📚 7. RESUMEN DE FLUJOS CLAVE

### Flujo de Datos: Input → Cálculo → Resultado

```
Usuario escribe "5" en input
    ↓
onChange actualiza estado: inputs = { side: "5" }
    ↓
Usuario hace clic en "Calcular"
    ↓
handleCalculate() extrae valores
    ↓
parseFloat("5") → 5
    ↓
Validación: 5 > 0 ✅
    ↓
calculateSquare(5)
    ↓
Retorna: { area: 25, perimeter: 20, formulas, steps }
    ↓
setResult({ area: 25, ... })
    ↓
React re-renderiza con nuevo estado
    ↓
JSX renderiza resultado en pantalla
```

### Flujo de Persistencia: Progreso → localStorage

```
Usuario completa challenge
    ↓
finishChallenge()
    ↓
updateModuleProgress(100)
    ↓
Lee localStorage: moduleProgress
    ↓
Parsea JSON a array
    ↓
Encuentra índice del módulo math
    ↓
Actualiza: modules[0].progress = 100
    ↓
Stringify a JSON
    ↓
Guarda en localStorage
    ↓
Usuario cierra navegador
    ↓
Usuario abre app de nuevo
    ↓
Home.tsx lee localStorage
    ↓
Muestra progreso 100%
```

### Flujo de Timer: Countdown

```
useEffect se ejecuta cada 1 segundo
    ↓
Si mode === 'challenge' && timeLeft > 0
    ↓
setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    ↓
timeLeft: 300 → 299 → 298 → ...
    ↓
formatTime(299) → "4:59"
    ↓
Se muestra en badge
    ↓
Cuando timeLeft === 0
    ↓
finishChallenge()
```

---

## ✅ CONCLUSIÓN

Este proyecto demuestra:

1. **Arquitectura modular:** Componentes reutilizables, utilidades separadas
2. **Tipado fuerte:** TypeScript previene errores en tiempo de desarrollo
3. **Accesibilidad:** ARIA labels, tamaños mínimos, focus management
4. **Educación:** Pasos detallados, visualizaciones, feedback inmediato
5. **Persistencia:** localStorage para guardar progreso
6. **Interactividad:** Modo calculadora + modo challenge
7. **Responsive design:** Funciona en móvil y desktop

**Próximos módulos** (Ciencias y Sociales) seguirán patrones similares.

---

**Preparado por:** GitHub Copilot  
**Última actualización:** Día 1 completado
