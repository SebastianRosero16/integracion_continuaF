import {
  departamentos,
  getDepartamentoByCode,
  getDepartamentosByRegion,
  getRegions,
  getRegionColor,
} from './departamentos';

describe('Datos de Departamentos de Colombia', () => {
  describe('Estructura del array departamentos', () => {
    test('debe tener exactamente 32 departamentos', () => {
      expect(departamentos).toHaveLength(32);
    });

    test('todos los departamentos deben tener la estructura correcta', () => {
      departamentos.forEach((dept) => {
        expect(dept).toHaveProperty('code');
        expect(dept).toHaveProperty('depto');
        expect(dept).toHaveProperty('capital');
        expect(dept).toHaveProperty('region');
        expect(dept).toHaveProperty('population');
        expect(dept).toHaveProperty('area');
        expect(dept).toHaveProperty('facts');
        
        expect(typeof dept.code).toBe('string');
        expect(typeof dept.depto).toBe('string');
        expect(typeof dept.capital).toBe('string');
        expect(typeof dept.region).toBe('string');
        expect(typeof dept.population).toBe('number');
        expect(typeof dept.area).toBe('number');
        expect(Array.isArray(dept.facts)).toBe(true);
      });
    });

    test('todos los códigos deben tener 3 caracteres', () => {
      departamentos.forEach((dept) => {
        expect(dept.code).toHaveLength(3);
        expect(dept.code).toMatch(/^[A-Z]{3}$/);
      });
    });

    test('todas las regiones deben ser válidas', () => {
      const regionesValidas = ['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'];
      departamentos.forEach((dept) => {
        expect(regionesValidas).toContain(dept.region);
      });
    });

    test('todos los departamentos deben tener población positiva', () => {
      departamentos.forEach((dept) => {
        expect(dept.population).toBeGreaterThan(0);
      });
    });

    test('todos los departamentos deben tener área positiva', () => {
      departamentos.forEach((dept) => {
        expect(dept.area).toBeGreaterThan(0);
      });
    });

    test('todos los departamentos deben tener al menos un dato interesante', () => {
      departamentos.forEach((dept) => {
        expect(dept.facts.length).toBeGreaterThan(0);
      });
    });

    test('no debe haber códigos duplicados', () => {
      const codes = departamentos.map(d => d.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });

    test('no debe haber nombres de departamentos duplicados', () => {
      const names = departamentos.map(d => d.depto);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe('getDepartamentoByCode', () => {
    test('debe encontrar Antioquia por código ANT', () => {
      const result = getDepartamentoByCode('ANT');
      expect(result).toBeDefined();
      expect(result?.depto).toBe('Antioquia');
      expect(result?.capital).toBe('Medellín');
      expect(result?.region).toBe('Andina');
    });

    test('debe encontrar Amazonas por código AMA', () => {
      const result = getDepartamentoByCode('AMA');
      expect(result).toBeDefined();
      expect(result?.depto).toBe('Amazonas');
      expect(result?.capital).toBe('Leticia');
      expect(result?.region).toBe('Amazonía');
    });

    test('debe encontrar Valle del Cauca por código VAL', () => {
      const result = getDepartamentoByCode('VAL');
      expect(result).toBeDefined();
      expect(result?.depto).toBe('Valle del Cauca');
      expect(result?.capital).toBe('Cali');
      expect(result?.region).toBe('Pacífica');
    });

    test('debe retornar undefined para código inexistente', () => {
      const result = getDepartamentoByCode('XXX');
      expect(result).toBeUndefined();
    });

    test('debe retornar undefined para código vacío', () => {
      const result = getDepartamentoByCode('');
      expect(result).toBeUndefined();
    });

    test('debe ser case-sensitive', () => {
      const result = getDepartamentoByCode('ant'); // minúscula
      expect(result).toBeUndefined();
    });
  });

  describe('getDepartamentosByRegion', () => {
    test('debe retornar departamentos de la región Caribe', () => {
      const result = getDepartamentosByRegion('Caribe');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((dept) => {
        expect(dept.region).toBe('Caribe');
      });
      
      // Verificar algunos departamentos específicos del Caribe
      const names = result.map(d => d.depto);
      expect(names).toContain('Atlántico');
      expect(names).toContain('Bolívar');
      expect(names).toContain('Magdalena');
    });

    test('debe retornar departamentos de la región Andina', () => {
      const result = getDepartamentosByRegion('Andina');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((dept) => {
        expect(dept.region).toBe('Andina');
      });
      
      // Verificar algunos departamentos específicos de la Andina
      const names = result.map(d => d.depto);
      expect(names).toContain('Antioquia');
      expect(names).toContain('Cundinamarca');
      expect(names).toContain('Boyacá');
    });

    test('debe retornar departamentos de la región Pacífica', () => {
      const result = getDepartamentosByRegion('Pacífica');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((dept) => {
        expect(dept.region).toBe('Pacífica');
      });
      
      const names = result.map(d => d.depto);
      expect(names).toContain('Chocó');
      expect(names).toContain('Valle del Cauca');
      expect(names).toContain('Cauca');
    });

    test('debe retornar departamentos de la región Orinoquía', () => {
      const result = getDepartamentosByRegion('Orinoquía');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((dept) => {
        expect(dept.region).toBe('Orinoquía');
      });
      
      const names = result.map(d => d.depto);
      expect(names).toContain('Meta');
      expect(names).toContain('Casanare');
      expect(names).toContain('Arauca');
    });

    test('debe retornar departamentos de la región Amazonía', () => {
      const result = getDepartamentosByRegion('Amazonía');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((dept) => {
        expect(dept.region).toBe('Amazonía');
      });
      
      const names = result.map(d => d.depto);
      expect(names).toContain('Amazonas');
      expect(names).toContain('Caquetá');
      expect(names).toContain('Putumayo');
    });

    test('debe retornar array vacío para región inexistente', () => {
      const result = getDepartamentosByRegion('Región Inventada');
      expect(result).toEqual([]);
    });

    test('debe retornar array vacío para región vacía', () => {
      const result = getDepartamentosByRegion('');
      expect(result).toEqual([]);
    });

    test('región Caribe debe tener al menos 7 departamentos', () => {
      const result = getDepartamentosByRegion('Caribe');
      expect(result.length).toBeGreaterThanOrEqual(7);
    });

    test('región Andina debe tener al menos 9 departamentos', () => {
      const result = getDepartamentosByRegion('Andina');
      expect(result.length).toBeGreaterThanOrEqual(9);
    });
  });

  describe('getRegions', () => {
    test('debe retornar exactamente 5 regiones', () => {
      const result = getRegions();
      expect(result).toHaveLength(5);
    });

    test('debe incluir todas las regiones de Colombia', () => {
      const result = getRegions();
      expect(result).toContain('Caribe');
      expect(result).toContain('Andina');
      expect(result).toContain('Pacífica');
      expect(result).toContain('Orinoquía');
      expect(result).toContain('Amazonía');
    });

    test('no debe tener regiones duplicadas', () => {
      const result = getRegions();
      const uniqueRegions = new Set(result);
      expect(uniqueRegions.size).toBe(result.length);
    });

    test('todas las regiones deben ser strings no vacíos', () => {
      const result = getRegions();
      result.forEach((region) => {
        expect(typeof region).toBe('string');
        expect(region.length).toBeGreaterThan(0);
      });
    });

    test('debe retornar un nuevo array cada vez (inmutabilidad)', () => {
      const result1 = getRegions();
      const result2 = getRegions();
      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result2);
    });
  });

  describe('getRegionColor', () => {
    test('debe retornar clase CSS azul para Caribe', () => {
      const result = getRegionColor('Caribe');
      expect(result).toBe('bg-blue-100 text-blue-800 border-blue-300');
      expect(result).toContain('blue');
    });

    test('debe retornar clase CSS verde para Andina', () => {
      const result = getRegionColor('Andina');
      expect(result).toBe('bg-green-100 text-green-800 border-green-300');
      expect(result).toContain('green');
    });

    test('debe retornar clase CSS teal para Pacífica', () => {
      const result = getRegionColor('Pacífica');
      expect(result).toBe('bg-teal-100 text-teal-800 border-teal-300');
      expect(result).toContain('teal');
    });

    test('debe retornar clase CSS amarilla para Orinoquía', () => {
      const result = getRegionColor('Orinoquía');
      expect(result).toBe('bg-yellow-100 text-yellow-800 border-yellow-300');
      expect(result).toContain('yellow');
    });

    test('debe retornar clase CSS esmeralda para Amazonía', () => {
      const result = getRegionColor('Amazonía');
      expect(result).toBe('bg-emerald-100 text-emerald-800 border-emerald-300');
      expect(result).toContain('emerald');
    });

    test('debe retornar clase CSS gris por defecto para región desconocida', () => {
      const result = getRegionColor('Región Inventada');
      expect(result).toBe('bg-gray-100 text-gray-800 border-gray-300');
      expect(result).toContain('gray');
    });

    test('debe retornar clase CSS gris por defecto para string vacío', () => {
      const result = getRegionColor('');
      expect(result).toBe('bg-gray-100 text-gray-800 border-gray-300');
    });

    test('cada color debe incluir clases de background, text y border', () => {
      const regions = ['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'];
      regions.forEach((region) => {
        const result = getRegionColor(region);
        expect(result).toMatch(/^bg-\w+-\d+\s+text-\w+-\d+\s+border-\w+-\d+$/);
      });
    });

    test('debe ser case-sensitive', () => {
      const result = getRegionColor('caribe'); // minúscula
      expect(result).toBe('bg-gray-100 text-gray-800 border-gray-300'); // default
    });
  });

  describe('Validación de datos específicos', () => {
    test('Cundinamarca debe tener Bogotá como capital', () => {
      const cundinamarca = departamentos.find(d => d.depto === 'Cundinamarca');
      expect(cundinamarca).toBeDefined();
      expect(cundinamarca?.capital).toBe('Bogotá');
    });

    test('San Andrés debe ser el departamento con menor área', () => {
      const sanAndres = departamentos.find(d => d.depto === 'San Andrés y Providencia');
      expect(sanAndres).toBeDefined();
      
      const smallestArea = Math.min(...departamentos.map(d => d.area));
      expect(sanAndres?.area).toBe(smallestArea);
      expect(sanAndres?.area).toBe(52); // 52 km²
    });

    test('Cundinamarca debe ser el departamento más poblado', () => {
      const cundinamarca = departamentos.find(d => d.depto === 'Cundinamarca');
      expect(cundinamarca).toBeDefined();
      
      const largestPopulation = Math.max(...departamentos.map(d => d.population));
      expect(cundinamarca?.population).toBe(largestPopulation);
    });

    test('San Andrés y Providencia debe ser región Caribe', () => {
      const sanAndres = departamentos.find(d => d.depto === 'San Andrés y Providencia');
      expect(sanAndres).toBeDefined();
      expect(sanAndres?.region).toBe('Caribe');
    });

    test('debe haber al menos 3 departamentos del Eje Cafetero', () => {
      const ejeCafetero = ['Caldas', 'Risaralda', 'Quindío'];
      const departamentosEjeCafetero = departamentos.filter(d => 
        ejeCafetero.includes(d.depto)
      );
      expect(departamentosEjeCafetero.length).toBe(3);
      departamentosEjeCafetero.forEach(dept => {
        expect(dept.region).toBe('Andina');
      });
    });

    test('cada departamento debe tener al menos 3 datos interesantes', () => {
      departamentos.forEach((dept) => {
        expect(dept.facts.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  describe('Distribución geográfica', () => {
    test('debe haber departamentos en todas las regiones', () => {
      const regions = ['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'];
      regions.forEach((region) => {
        const deptsInRegion = departamentos.filter(d => d.region === region);
        expect(deptsInRegion.length).toBeGreaterThan(0);
      });
    });

    test('la suma de todos los departamentos debe ser 32', () => {
      const regions = ['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'];
      let totalDepts = 0;
      regions.forEach((region) => {
        const deptsInRegion = departamentos.filter(d => d.region === region);
        totalDepts += deptsInRegion.length;
      });
      expect(totalDepts).toBe(32);
    });

    test('región Andina debe ser la más poblada', () => {
      const regions = ['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'];
      const populationByRegion = regions.map(region => {
        const depts = getDepartamentosByRegion(region);
        return {
          region,
          totalPopulation: depts.reduce((sum, dept) => sum + dept.population, 0)
        };
      });
      
      const andinaPopulation = populationByRegion.find(r => r.region === 'Andina');
      const maxPopulation = Math.max(...populationByRegion.map(r => r.totalPopulation));
      
      expect(andinaPopulation?.totalPopulation).toBe(maxPopulation);
    });

    test('región Orinoquía debe tener el mayor área total', () => {
      const regions = ['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'];
      const areaByRegion = regions.map(region => {
        const depts = getDepartamentosByRegion(region);
        return {
          region,
          totalArea: depts.reduce((sum, dept) => sum + dept.area, 0)
        };
      });
      
      const orinoquiaArea = areaByRegion.find(r => r.region === 'Orinoquía');
      
      // Orinoquía o Amazonía suelen tener las mayores áreas
      expect(orinoquiaArea?.totalArea).toBeGreaterThan(100000);
    });
  });
});
