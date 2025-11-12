import {
  ChemicalElement,
  searchElements,
  filterByCategory,
  filterByState,
  filterByPeriod,
  filterByGroup,
  getCategories,
  getStates,
  getCategoryColor,
  getStateEmoji,
  getCategoryName,
  getStateName,
  sortByAtomicNumber,
  sortByName,
} from './elementUtils';

// Mock de datos para tests
const mockElements: ChemicalElement[] = [
  {
    symbol: 'H',
    name: 'Hidrógeno',
    atomicNumber: 1,
    atomicMass: 1.008,
    group: 1,
    period: 1,
    state: 'gas',
    category: 'no-metal',
    uses: 'Combustible',
    emoji: '💧',
    electronConfig: '1s1',
  },
  {
    symbol: 'He',
    name: 'Helio',
    atomicNumber: 2,
    atomicMass: 4.003,
    group: 18,
    period: 1,
    state: 'gas',
    category: 'gas-noble',
    uses: 'Globos',
    emoji: '🎈',
    electronConfig: '1s2',
  },
  {
    symbol: 'Li',
    name: 'Litio',
    atomicNumber: 3,
    atomicMass: 6.94,
    group: 1,
    period: 2,
    state: 'solid',
    category: 'metal-alcalino',
    uses: 'Baterías',
    emoji: '🔋',
    electronConfig: '[He] 2s1',
  },
  {
    symbol: 'O',
    name: 'Oxígeno',
    atomicNumber: 8,
    atomicMass: 16.0,
    group: 16,
    period: 2,
    state: 'gas',
    category: 'no-metal',
    uses: 'Respiración',
    emoji: '💨',
    electronConfig: '[He] 2s2 2p4',
  },
  {
    symbol: 'Na',
    name: 'Sodio',
    atomicNumber: 11,
    atomicMass: 22.99,
    group: 1,
    period: 3,
    state: 'solid',
    category: 'metal-alcalino',
    uses: 'Sal de mesa',
    emoji: '🧂',
    electronConfig: '[Ne] 3s1',
  },
  {
    symbol: 'Hg',
    name: 'Mercurio',
    atomicNumber: 80,
    atomicMass: 200.59,
    group: 12,
    period: 6,
    state: 'liquid',
    category: 'metal-transicion',
    uses: 'Termómetros',
    emoji: '🌡️',
    electronConfig: '[Xe] 4f14 5d10 6s2',
  },
];

describe('Búsqueda de Elementos', () => {
  describe('searchElements', () => {
    it('debe retornar todos los elementos cuando la búsqueda está vacía', () => {
      const result = searchElements(mockElements, '');
      expect(result).toEqual(mockElements);
    });

    it('debe retornar todos los elementos cuando la búsqueda es solo espacios', () => {
      const result = searchElements(mockElements, '   ');
      expect(result).toEqual(mockElements);
    });

    it('debe buscar elementos por nombre completo', () => {
      const result = searchElements(mockElements, 'Hidrógeno');
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('H');
    });

    it('debe buscar elementos por nombre parcial (case insensitive)', () => {
      const result = searchElements(mockElements, 'eli');
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('He');
    });

    it('debe buscar elementos por símbolo o nombre que contenga la búsqueda', () => {
      const result = searchElements(mockElements, 'H');
      expect(result).toHaveLength(3); // H, He (Helio), Hg
      expect(result.map(e => e.symbol)).toContain('H');
      expect(result.map(e => e.symbol)).toContain('He');
      expect(result.map(e => e.symbol)).toContain('Hg');
    });

    it('debe buscar elementos por símbolo en minúsculas', () => {
      const result = searchElements(mockElements, 'na');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Sodio');
    });

    it('debe retornar múltiples coincidencias', () => {
      const result = searchElements(mockElements, 'io');
      expect(result.length).toBeGreaterThan(1);
      expect(result.map(e => e.symbol)).toContain('Li');
      expect(result.map(e => e.symbol)).toContain('Na');
    });

    it('debe retornar array vacío cuando no hay coincidencias', () => {
      const result = searchElements(mockElements, 'Kriptonita');
      expect(result).toEqual([]);
    });
  });
});

describe('Filtros de Elementos', () => {
  describe('filterByCategory', () => {
    it('debe retornar todos los elementos cuando category es "all"', () => {
      const result = filterByCategory(mockElements, 'all');
      expect(result).toEqual(mockElements);
    });

    it('debe retornar todos los elementos cuando category es vacío', () => {
      const result = filterByCategory(mockElements, '');
      expect(result).toEqual(mockElements);
    });

    it('debe filtrar por categoría "no-metal"', () => {
      const result = filterByCategory(mockElements, 'no-metal');
      expect(result).toHaveLength(2);
      expect(result[0].symbol).toBe('H');
      expect(result[1].symbol).toBe('O');
    });

    it('debe filtrar por categoría "gas-noble"', () => {
      const result = filterByCategory(mockElements, 'gas-noble');
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('He');
    });

    it('debe filtrar por categoría "metal-alcalino"', () => {
      const result = filterByCategory(mockElements, 'metal-alcalino');
      expect(result).toHaveLength(2);
      expect(result.map(e => e.symbol)).toContain('Li');
      expect(result.map(e => e.symbol)).toContain('Na');
    });

    it('debe retornar array vacío para categoría inexistente', () => {
      const result = filterByCategory(mockElements, 'metal-precioso');
      expect(result).toEqual([]);
    });
  });

  describe('filterByState', () => {
    it('debe retornar todos los elementos cuando state es "all"', () => {
      const result = filterByState(mockElements, 'all');
      expect(result).toEqual(mockElements);
    });

    it('debe retornar todos los elementos cuando state es vacío', () => {
      const result = filterByState(mockElements, '');
      expect(result).toEqual(mockElements);
    });

    it('debe filtrar por estado "gas"', () => {
      const result = filterByState(mockElements, 'gas');
      expect(result).toHaveLength(3);
      expect(result.map(e => e.symbol)).toContain('H');
      expect(result.map(e => e.symbol)).toContain('He');
      expect(result.map(e => e.symbol)).toContain('O');
    });

    it('debe filtrar por estado "solid"', () => {
      const result = filterByState(mockElements, 'solid');
      expect(result).toHaveLength(2);
      expect(result.map(e => e.symbol)).toContain('Li');
      expect(result.map(e => e.symbol)).toContain('Na');
    });

    it('debe filtrar por estado "liquid"', () => {
      const result = filterByState(mockElements, 'liquid');
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('Hg');
    });

    it('debe retornar array vacío para estado inexistente', () => {
      const result = filterByState(mockElements, 'plasma');
      expect(result).toEqual([]);
    });
  });

  describe('filterByPeriod', () => {
    it('debe retornar todos los elementos cuando period es 0', () => {
      const result = filterByPeriod(mockElements, 0);
      expect(result).toEqual(mockElements);
    });

    it('debe filtrar por período 1', () => {
      const result = filterByPeriod(mockElements, 1);
      expect(result).toHaveLength(2);
      expect(result.map(e => e.symbol)).toContain('H');
      expect(result.map(e => e.symbol)).toContain('He');
    });

    it('debe filtrar por período 2', () => {
      const result = filterByPeriod(mockElements, 2);
      expect(result).toHaveLength(2);
      expect(result.map(e => e.symbol)).toContain('Li');
      expect(result.map(e => e.symbol)).toContain('O');
    });

    it('debe filtrar por período 3', () => {
      const result = filterByPeriod(mockElements, 3);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('Na');
    });

    it('debe retornar array vacío para período sin elementos', () => {
      const result = filterByPeriod(mockElements, 7);
      expect(result).toEqual([]);
    });
  });

  describe('filterByGroup', () => {
    it('debe retornar todos los elementos cuando group es 0', () => {
      const result = filterByGroup(mockElements, 0);
      expect(result).toEqual(mockElements);
    });

    it('debe filtrar por grupo 1 (metales alcalinos + hidrógeno)', () => {
      const result = filterByGroup(mockElements, 1);
      expect(result).toHaveLength(3);
      expect(result.map(e => e.symbol)).toContain('H');
      expect(result.map(e => e.symbol)).toContain('Li');
      expect(result.map(e => e.symbol)).toContain('Na');
    });

    it('debe filtrar por grupo 18 (gases nobles)', () => {
      const result = filterByGroup(mockElements, 18);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('He');
    });

    it('debe filtrar por grupo 16', () => {
      const result = filterByGroup(mockElements, 16);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('O');
    });

    it('debe retornar array vacío para grupo sin elementos', () => {
      const result = filterByGroup(mockElements, 2);
      expect(result).toEqual([]);
    });
  });
});

describe('Extracción de Datos Únicos', () => {
  describe('getCategories', () => {
    it('debe retornar todas las categorías únicas ordenadas', () => {
      const result = getCategories(mockElements);
      expect(result).toContain('no-metal');
      expect(result).toContain('gas-noble');
      expect(result).toContain('metal-alcalino');
      expect(result).toContain('metal-transicion');
    });

    it('debe retornar array de 4 categorías únicas', () => {
      const result = getCategories(mockElements);
      expect(result).toHaveLength(4);
    });

    it('debe retornar categorías ordenadas alfabéticamente', () => {
      const result = getCategories(mockElements);
      const sorted = [...result].sort();
      expect(result).toEqual(sorted);
    });

    it('debe retornar array vacío para array vacío', () => {
      const result = getCategories([]);
      expect(result).toEqual([]);
    });
  });

  describe('getStates', () => {
    it('debe retornar todos los estados únicos', () => {
      const result = getStates(mockElements);
      expect(result).toContain('gas');
      expect(result).toContain('solid');
      expect(result).toContain('liquid');
    });

    it('debe retornar array de 3 estados', () => {
      const result = getStates(mockElements);
      expect(result).toHaveLength(3);
    });

    it('debe retornar estados ordenados alfabéticamente', () => {
      const result = getStates(mockElements);
      expect(result).toEqual(['gas', 'liquid', 'solid']);
    });

    it('debe retornar array vacío para array vacío', () => {
      const result = getStates([]);
      expect(result).toEqual([]);
    });
  });
});

describe('Funciones de UI - Colores y Emojis', () => {
  describe('getCategoryColor', () => {
    it('debe retornar color para "no-metal"', () => {
      const result = getCategoryColor('no-metal');
      expect(result).toContain('bg-green');
      expect(result).toContain('text-green');
    });

    it('debe retornar color para "gas-noble"', () => {
      const result = getCategoryColor('gas-noble');
      expect(result).toContain('bg-purple');
    });

    it('debe retornar color para "metal-alcalino"', () => {
      const result = getCategoryColor('metal-alcalino');
      expect(result).toContain('bg-red');
    });

    it('debe retornar color para "metal-transicion"', () => {
      const result = getCategoryColor('metal-transicion');
      expect(result).toContain('bg-blue');
    });

    it('debe retornar color por defecto para categoría desconocida', () => {
      const result = getCategoryColor('categoria-inexistente');
      expect(result).toBe('bg-gray-100 text-gray-800 border-gray-300');
    });
  });

  describe('getStateEmoji', () => {
    it('debe retornar emoji para "gas"', () => {
      const result = getStateEmoji('gas');
      expect(result).toBe('💨');
    });

    it('debe retornar emoji para "liquid"', () => {
      const result = getStateEmoji('liquid');
      expect(result).toBe('💧');
    });

    it('debe retornar emoji para "solid"', () => {
      const result = getStateEmoji('solid');
      expect(result).toBe('🧊');
    });

    it('debe retornar emoji por defecto para estado desconocido', () => {
      const result = getStateEmoji('plasma');
      expect(result).toBe('❓');
    });
  });
});

describe('Funciones de Traducción', () => {
  describe('getCategoryName', () => {
    it('debe traducir "no-metal" a español', () => {
      const result = getCategoryName('no-metal');
      expect(result).toBe('No Metal');
    });

    it('debe traducir "gas-noble" a español', () => {
      const result = getCategoryName('gas-noble');
      expect(result).toBe('Gas Noble');
    });

    it('debe traducir "metal-alcalino" a español', () => {
      const result = getCategoryName('metal-alcalino');
      expect(result).toBe('Metal Alcalino');
    });

    it('debe traducir "metal-alcalinoterreo" a español', () => {
      const result = getCategoryName('metal-alcalinoterreo');
      expect(result).toBe('Metal Alcalinotérreo');
    });

    it('debe retornar el nombre original para categoría desconocida', () => {
      const result = getCategoryName('categoria-desconocida');
      expect(result).toBe('categoria-desconocida');
    });
  });

  describe('getStateName', () => {
    it('debe traducir "gas" a español', () => {
      const result = getStateName('gas');
      expect(result).toBe('Gas');
    });

    it('debe traducir "liquid" a español', () => {
      const result = getStateName('liquid');
      expect(result).toBe('Líquido');
    });

    it('debe traducir "solid" a español', () => {
      const result = getStateName('solid');
      expect(result).toBe('Sólido');
    });

    it('debe retornar el nombre original para estado desconocido', () => {
      const result = getStateName('plasma');
      expect(result).toBe('plasma');
    });
  });
});

describe('Funciones de Ordenamiento', () => {
  describe('sortByAtomicNumber', () => {
    it('debe ordenar elementos por número atómico ascendente', () => {
      const unsorted = [mockElements[5], mockElements[0], mockElements[3]];
      const result = sortByAtomicNumber(unsorted);
      
      expect(result[0].atomicNumber).toBe(1);
      expect(result[1].atomicNumber).toBe(8);
      expect(result[2].atomicNumber).toBe(80);
    });

    it('debe retornar nuevo array sin modificar el original', () => {
      const original = [...mockElements];
      const result = sortByAtomicNumber(mockElements);
      
      expect(result).not.toBe(mockElements);
      expect(mockElements).toEqual(original);
    });

    it('debe manejar array vacío', () => {
      const result = sortByAtomicNumber([]);
      expect(result).toEqual([]);
    });

    it('debe manejar array con un solo elemento', () => {
      const result = sortByAtomicNumber([mockElements[0]]);
      expect(result).toHaveLength(1);
      expect(result[0].symbol).toBe('H');
    });
  });

  describe('sortByName', () => {
    it('debe ordenar elementos alfabéticamente por nombre', () => {
      const result = sortByName(mockElements);
      
      expect(result[0].name).toBe('Helio');
      expect(result[1].name).toBe('Hidrógeno');
      expect(result[2].name).toBe('Litio');
      expect(result[3].name).toBe('Mercurio');
    });

    it('debe retornar nuevo array sin modificar el original', () => {
      const original = [...mockElements];
      const result = sortByName(mockElements);
      
      expect(result).not.toBe(mockElements);
      expect(mockElements).toEqual(original);
    });

    it('debe manejar array vacío', () => {
      const result = sortByName([]);
      expect(result).toEqual([]);
    });

    it('debe usar localización correcta para español', () => {
      const result = sortByName(mockElements);
      const names = result.map(e => e.name);
      
      expect(names.indexOf('Oxígeno')).toBeGreaterThan(names.indexOf('Litio'));
    });
  });
});
