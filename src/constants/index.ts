/**
 * Constantes globales del proyecto
 * Centraliza valores reutilizables en toda la aplicación
 */

// Información de la aplicación
export const APP_INFO = {
  NAME: 'Colegio Mentes Creativas',
  VERSION: '1.0.0',
  DESCRIPTION: 'Aplicación educativa multimedia para estudiantes de 4° y 5° grado',
  AUTHOR: 'Equipo UCC',
} as const;

// URLs y endpoints
export const URLS = {
  VERCEL_PRODUCTION: 'https://integracion-continua-f.vercel.app',
  GITHUB_REPO: 'https://github.com/SebastianRosero16/integracion_continuaF',
} as const;

// Límites y validaciones
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 100,
  MIN_TODO_LENGTH: 1,
  MAX_TODO_LENGTH: 200,
  MIN_SEARCH_QUERY: 1,
  MAX_SEARCH_QUERY: 100,
} as const;

// Claves de localStorage
export const STORAGE_KEYS = {
  CLICK_COUNT: 'clickCount',
  TODO_LIST: 'todoList',
  THEME_PREFERENCE: 'themePreference',
  LAST_VISITED_MODULE: 'lastVisitedModule',
} as const;

// Configuración de módulos educativos
export const EDUCATION_MODULES = {
  MATHEMATICS: {
    id: 'matematicas',
    name: 'Matemáticas',
    icon: '📐',
    description: 'Calculadora de geometría y tablas de multiplicar',
  },
  SCIENCE: {
    id: 'ciencias',
    name: 'Ciencias Naturales',
    icon: '🔬',
    description: 'Tabla periódica interactiva con 118 elementos',
  },
  SOCIAL: {
    id: 'sociales',
    name: 'Ciencias Sociales',
    icon: '🗺️',
    description: 'Geografía de Colombia con 32 departamentos',
  },
} as const;

// Colores de regiones colombianas
export const REGION_COLORS = {
  Andina: 'bg-green-100 text-green-800 border-green-300',
  Caribe: 'bg-blue-100 text-blue-800 border-blue-300',
  Pacífica: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  Orinoquía: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Amazonía: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Insular: 'bg-cyan-100 text-cyan-800 border-cyan-300',
} as const;

// Categorías de elementos químicos
export const ELEMENT_CATEGORIES = {
  'metal-alcalino': 'Metal Alcalino',
  'metal-alcalinoterreo': 'Metal Alcalinotérreo',
  'metal-transicion': 'Metal de Transición',
  lantanido: 'Lantánido',
  actinido: 'Actínido',
  'metal-post-transicion': 'Metal Post-Transición',
  metaloide: 'Metaloide',
  'no-metal': 'No Metal',
  halogeno: 'Halógeno',
  'gas-noble': 'Gas Noble',
} as const;

// Estados de la materia
export const MATTER_STATES = {
  solido: 'Sólido',
  liquido: 'Líquido',
  gas: 'Gas',
  desconocido: 'Desconocido',
} as const;

// Figuras geométricas soportadas
export const GEOMETRIC_SHAPES = {
  SQUARE: 'square',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  TRIANGLE: 'triangle',
  POLYGON: 'polygon',
} as const;

// Timeouts y delays (en milisegundos)
export const TIMING = {
  DEBOUNCE_SEARCH: 300,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
  AUTO_SAVE_DELAY: 1000,
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  VALIDATION_ERROR: 'Por favor verifica los datos ingresados.',
  NOT_FOUND: 'No se encontraron resultados.',
  GENERIC_ERROR: 'Ha ocurrido un error. Intenta nuevamente.',
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  SAVED: 'Guardado exitosamente',
  DELETED: 'Eliminado exitosamente',
  UPDATED: 'Actualizado exitosamente',
  COPIED: 'Copiado al portapapeles',
} as const;
