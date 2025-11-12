export interface ChemicalElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  group: number;
  period: number;
  state: 'gas' | 'liquid' | 'solid';
  category: string;
  uses: string;
  emoji: string;
  electronConfig: string;
}

/**
 * Busca elementos por nombre o símbolo
 */
export function searchElements(elements: ChemicalElement[], query: string): ChemicalElement[] {
  if (!query.trim()) return elements;

  const lowerQuery = query.toLowerCase();
  
  return elements.filter(
    (element) =>
      element.name.toLowerCase().includes(lowerQuery) ||
      element.symbol.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filtra elementos por categoría
 */
export function filterByCategory(
  elements: ChemicalElement[],
  category: string
): ChemicalElement[] {
  if (!category || category === 'all') return elements;
  
  return elements.filter((element) => element.category === category);
}

/**
 * Filtra elementos por estado físico
 */
export function filterByState(
  elements: ChemicalElement[],
  state: string
): ChemicalElement[] {
  if (!state || state === 'all') return elements;
  
  return elements.filter((element) => element.state === state);
}

/**
 * Filtra elementos por período
 */
export function filterByPeriod(
  elements: ChemicalElement[],
  period: number
): ChemicalElement[] {
  if (!period) return elements;
  
  return elements.filter((element) => element.period === period);
}

/**
 * Filtra elementos por grupo
 */
export function filterByGroup(
  elements: ChemicalElement[],
  group: number
): ChemicalElement[] {
  if (!group) return elements;
  
  return elements.filter((element) => element.group === group);
}

/**
 * Obtiene todas las categorías únicas
 */
export function getCategories(elements: ChemicalElement[]): string[] {
  const categories = new Set(elements.map((e) => e.category));
  return Array.from(categories).sort();
}

/**
 * Obtiene todos los estados únicos
 */
export function getStates(elements: ChemicalElement[]): string[] {
  const states = new Set(elements.map((e) => e.state));
  return Array.from(states).sort();
}

/**
 * Retorna color según categoría (para UI)
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'no-metal': 'bg-green-100 text-green-800 border-green-300',
    'gas-noble': 'bg-purple-100 text-purple-800 border-purple-300',
    'metal-alcalino': 'bg-red-100 text-red-800 border-red-300',
    'metal-alcalinoterreo': 'bg-orange-100 text-orange-800 border-orange-300',
    'metaloide': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'halogeno': 'bg-cyan-100 text-cyan-800 border-cyan-300',
    'metal-transicion': 'bg-blue-100 text-blue-800 border-blue-300',
    'metal-posTrans': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  };

  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-300';
}

/**
 * Retorna emoji según estado físico
 */
export function getStateEmoji(state: string): string {
  const emojis: Record<string, string> = {
    gas: '💨',
    liquid: '💧',
    solid: '🧊',
  };

  return emojis[state] || '❓';
}

/**
 * Retorna nombre en español de la categoría
 */
export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    'no-metal': 'No Metal',
    'gas-noble': 'Gas Noble',
    'metal-alcalino': 'Metal Alcalino',
    'metal-alcalinoterreo': 'Metal Alcalinotérreo',
    'metaloide': 'Metaloide',
    'halogeno': 'Halógeno',
    'metal-transicion': 'Metal de Transición',
    'metal-posTrans': 'Metal Post-Transición',
  };

  return names[category] || category;
}

/**
 * Retorna nombre en español del estado
 */
export function getStateName(state: string): string {
  const names: Record<string, string> = {
    gas: 'Gas',
    liquid: 'Líquido',
    solid: 'Sólido',
  };

  return names[state] || state;
}

/**
 * Ordena elementos por número atómico (orden natural)
 */
export function sortByAtomicNumber(elements: ChemicalElement[]): ChemicalElement[] {
  return [...elements].sort((a, b) => a.atomicNumber - b.atomicNumber);
}

/**
 * Ordena elementos alfabéticamente por nombre
 */
export function sortByName(elements: ChemicalElement[]): ChemicalElement[] {
  return [...elements].sort((a, b) => a.name.localeCompare(b.name));
}
