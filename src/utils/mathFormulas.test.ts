/**
 * Tests Unitarios para mathFormulas.ts
 * 
 * Validación de funciones de cálculo geométrico
 * Cobertura objetivo: 100% en funciones críticas
 * 
 * @author Equipo de Desarrollo
 * @version 1.0.0
 */

import {
  calculateSquare,
  calculateRectangle,
  calculateCircle,
  calculateTriangleByBaseHeight,
  calculateTriangleBySides,
  calculateRegularPolygon,
  validatePositive,
  validateTriangle,
  validatePolygon,
} from './mathFormulas';

describe('mathFormulas - Cálculos Geométricos', () => {
  describe('calculateSquare', () => {
    it('debe calcular correctamente el área y perímetro de un cuadrado', () => {
      const result = calculateSquare(5);
      
      expect(result.area).toBe(25);
      expect(result.perimeter).toBe(20);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateSquare(5);
      
      expect(result.formula.area).toBe('A = lado²');
      expect(result.formula.perimeter).toBe('P = 4 × lado');
    });

    it('debe incluir el procedimiento paso a paso para área', () => {
      const result = calculateSquare(5);
      
      expect(result.steps.area).toContain('A = 5²');
      expect(result.steps.area).toContain('A = 25 unidades²');
    });

    it('debe incluir el procedimiento paso a paso para perímetro', () => {
      const result = calculateSquare(5);
      
      expect(result.steps.perimeter).toContain('P = 4 × 5');
      expect(result.steps.perimeter).toContain('P = 20 unidades');
    });

    it('debe manejar números decimales', () => {
      const result = calculateSquare(5.5);
      
      expect(result.area).toBeCloseTo(30.25, 2);
      expect(result.perimeter).toBeCloseTo(22, 2);
    });

    it('debe manejar números grandes', () => {
      const result = calculateSquare(100);
      
      expect(result.area).toBe(10000);
      expect(result.perimeter).toBe(400);
    });

    it('debe manejar el caso mínimo (lado = 1)', () => {
      const result = calculateSquare(1);
      
      expect(result.area).toBe(1);
      expect(result.perimeter).toBe(4);
    });
  });

  describe('calculateRectangle', () => {
    it('debe calcular correctamente el área y perímetro de un rectángulo', () => {
      const result = calculateRectangle(8, 5);
      
      expect(result.area).toBe(40);
      expect(result.perimeter).toBe(26);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateRectangle(8, 5);
      
      expect(result.formula.area).toBe('A = largo × ancho');
      expect(result.formula.perimeter).toBe('P = 2 × (largo + ancho)');
    });

    it('debe incluir el procedimiento paso a paso para área', () => {
      const result = calculateRectangle(8, 5);
      
      expect(result.steps.area).toContain('A = 8 × 5');
      expect(result.steps.area).toContain('A = 40 unidades²');
    });

    it('debe incluir el procedimiento paso a paso para perímetro', () => {
      const result = calculateRectangle(8, 5);
      
      expect(result.steps.perimeter[0]).toBe('P = 2 × (8 + 5)');
      expect(result.steps.perimeter[1]).toBe('P = 2 × 13');
      expect(result.steps.perimeter[2]).toBe('P = 26 unidades');
    });

    it('debe manejar números decimales', () => {
      const result = calculateRectangle(7.5, 4.2);
      
      expect(result.area).toBeCloseTo(31.5, 2);
      expect(result.perimeter).toBeCloseTo(23.4, 2);
    });

    it('debe manejar un rectángulo cuadrado (largo igual al ancho)', () => {
      const result = calculateRectangle(6, 6);
      
      expect(result.area).toBe(36);
      expect(result.perimeter).toBe(24);
    });

    it('debe manejar rectángulos con un lado mucho mayor que el otro', () => {
      const result = calculateRectangle(20, 2);
      
      expect(result.area).toBe(40);
      expect(result.perimeter).toBe(44);
    });
  });

  describe('calculateCircle', () => {
    it('debe calcular correctamente el área y perímetro de un círculo', () => {
      const result = calculateCircle(7);
      
      expect(result.area).toBeCloseTo(153.94, 2);
      expect(result.perimeter).toBeCloseTo(43.98, 2);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateCircle(7);
      
      expect(result.formula.area).toBe('A = π × r²');
      expect(result.formula.perimeter).toBe('P = 2 × π × r');
    });

    it('debe incluir el procedimiento paso a paso para área', () => {
      const result = calculateCircle(7);
      
      expect(result.steps.area.length).toBe(3);
      expect(result.steps.area[0]).toContain('A = π × 7²');
      expect(result.steps.area[2]).toContain('unidades²');
    });

    it('debe incluir el procedimiento paso a paso para perímetro', () => {
      const result = calculateCircle(7);
      
      expect(result.steps.perimeter.length).toBe(3);
      expect(result.steps.perimeter[0]).toContain('P = 2 × π × 7');
      expect(result.steps.perimeter[2]).toContain('unidades');
    });

    it('debe usar π con precisión correcta', () => {
      const result = calculateCircle(1);
      
      // Área = π × 1² = π
      expect(result.area).toBeCloseTo(Math.PI, 2);
      // Perímetro = 2 × π × 1 = 2π
      expect(result.perimeter).toBeCloseTo(2 * Math.PI, 2);
    });

    it('debe manejar números decimales', () => {
      const result = calculateCircle(5.5);
      
      expect(result.area).toBeCloseTo(95.03, 2);
      expect(result.perimeter).toBeCloseTo(34.56, 2);
    });

    it('debe manejar círculos grandes', () => {
      const result = calculateCircle(100);
      
      expect(result.area).toBeCloseTo(31415.93, 1);
      expect(result.perimeter).toBeCloseTo(628.32, 1);
    });

    it('debe manejar círculos pequeños', () => {
      const result = calculateCircle(0.5);
      
      expect(result.area).toBeCloseTo(0.79, 2);
      expect(result.perimeter).toBeCloseTo(3.14, 2);
    });
  });

  describe('calculateTriangleByBaseHeight', () => {
    it('debe calcular correctamente el área por base y altura', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      
      expect(result.area).toBe(12);
    });

    it('el perímetro debe ser NaN (no calculable sin los tres lados)', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      
      expect(Number.isNaN(result.perimeter)).toBe(true);
    });

    it('debe incluir la fórmula correcta', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      
      expect(result.formula.area).toBe('A = (b × h) / 2');
      expect(result.formula.perimeter).toContain('necesitas los tres lados');
    });

    it('debe incluir el procedimiento paso a paso para área', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      
      expect(result.steps.area).toContain('A = (6 × 4) / 2');
      expect(result.steps.area).toContain('A = 24 / 2');
      expect(result.steps.area).toContain('A = 12 unidades²');
    });

    it('debe incluir mensaje sobre perímetro no calculable', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      
      expect(result.steps.perimeter).toContain('Se necesitan los tres lados para calcular el perímetro');
    });

    it('debe manejar números decimales', () => {
      const result = calculateTriangleByBaseHeight(7.5, 4.2);
      
      expect(result.area).toBeCloseTo(15.75, 2);
    });

    it('debe calcular correctamente triángulos con base y altura grandes', () => {
      const result = calculateTriangleByBaseHeight(100, 50);
      
      expect(result.area).toBe(2500);
    });

    it('debe calcular correctamente triángulos con base y altura pequeñas', () => {
      const result = calculateTriangleByBaseHeight(0.5, 0.4);
      
      expect(result.area).toBeCloseTo(0.1, 2);
    });
  });

  describe('calculateTriangleBySides', () => {
    it('debe calcular correctamente área y perímetro usando fórmula de Herón', () => {
      const result = calculateTriangleBySides(5, 6, 7);
      
      expect(result.area).toBeCloseTo(14.7, 1);
      expect(result.perimeter).toBe(18);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateTriangleBySides(5, 6, 7);
      
      expect(result.formula.area).toContain('s(s-a)(s-b)(s-c)');
      expect(result.formula.perimeter).toBe('P = a + b + c');
    });

    it('debe calcular triángulo equilátero correctamente', () => {
      const result = calculateTriangleBySides(6, 6, 6);
      
      expect(result.area).toBeCloseTo(15.59, 1);
      expect(result.perimeter).toBe(18);
    });

    it('debe calcular triángulo isósceles correctamente', () => {
      const result = calculateTriangleBySides(5, 5, 6);
      
      expect(result.area).toBeCloseTo(12, 1);
      expect(result.perimeter).toBe(16);
    });

    it('debe calcular triángulo escaleno correctamente', () => {
      const result = calculateTriangleBySides(3, 4, 5);
      
      // Este es un triángulo rectángulo, área = 6
      expect(result.area).toBeCloseTo(6, 1);
      expect(result.perimeter).toBe(12);
    });

    it('debe incluir el procedimiento paso a paso', () => {
      const result = calculateTriangleBySides(5, 6, 7);
      
      expect(result.steps.area.length).toBeGreaterThan(0);
      expect(result.steps.area.join(' ')).toContain('s =');
      expect(result.steps.perimeter).toContain('P = 5 + 6 + 7');
      expect(result.steps.perimeter).toContain('P = 18 unidades');
    });

    it('debe manejar números decimales', () => {
      const result = calculateTriangleBySides(5.5, 6.5, 7.5);
      
      expect(result.area).toBeGreaterThan(0);
      expect(result.perimeter).toBeCloseTo(19.5, 2);
    });

    it('debe calcular el semiperímetro correctamente', () => {
      const result = calculateTriangleBySides(10, 12, 14);
      
      // Semiperímetro = (10 + 12 + 14) / 2 = 18
      // Verificamos que el perímetro sea correcto
      expect(result.perimeter).toBe(36);
    });

    it('debe manejar triángulos muy pequeños', () => {
      const result = calculateTriangleBySides(0.3, 0.4, 0.5);
      
      expect(result.area).toBeGreaterThan(0);
      expect(result.perimeter).toBeCloseTo(1.2, 2);
    });
  });

  describe('calculateRegularPolygon', () => {
    it('debe calcular correctamente un hexágono regular', () => {
      const result = calculateRegularPolygon(6, 5);
      
      expect(result.area).toBeGreaterThan(0);
      expect(result.perimeter).toBe(30);
    });

    it('debe calcular correctamente un triángulo equilátero (3 lados)', () => {
      const result = calculateRegularPolygon(3, 6);
      
      expect(result.area).toBeCloseTo(15.59, 1);
      expect(result.perimeter).toBe(18);
    });

    it('debe calcular correctamente un cuadrado (4 lados)', () => {
      const result = calculateRegularPolygon(4, 5);
      
      expect(result.area).toBeCloseTo(25, 1);
      expect(result.perimeter).toBe(20);
    });

    it('debe calcular correctamente un pentágono regular', () => {
      const result = calculateRegularPolygon(5, 4);
      
      expect(result.area).toBeGreaterThan(0);
      expect(result.perimeter).toBe(20);
    });

    it('debe calcular correctamente un octágono regular', () => {
      const result = calculateRegularPolygon(8, 3);
      
      expect(result.area).toBeGreaterThan(0);
      expect(result.perimeter).toBe(24);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateRegularPolygon(6, 5);
      
      expect(result.formula.perimeter).toBe('P = n × lado');
      expect(result.formula.area).toContain('apotema');
    });

    it('debe manejar polígonos con muchos lados (aproximación a círculo)', () => {
      const result = calculateRegularPolygon(100, 1);
      
      expect(result.perimeter).toBe(100);
      expect(result.area).toBeGreaterThan(0);
    });

    it('debe manejar números decimales en la longitud del lado', () => {
      const result = calculateRegularPolygon(6, 4.5);
      
      expect(result.area).toBeGreaterThan(0);
      expect(result.perimeter).toBeCloseTo(27, 2);
    });

    it('debe incluir el procedimiento paso a paso', () => {
      const result = calculateRegularPolygon(6, 5);
      
      expect(result.steps.area.length).toBeGreaterThan(0);
      expect(result.steps.area.join(' ')).toContain('a ='); // El apotema se indica con "a ="
      expect(result.steps.perimeter).toContain('P = 6 × 5');
      expect(result.steps.perimeter).toContain('P = 30 unidades');
    });

    it('el área debe aumentar con más lados para la misma longitud de lado', () => {
      const triangle = calculateRegularPolygon(3, 5);
      const square = calculateRegularPolygon(4, 5);
      const hexagon = calculateRegularPolygon(6, 5);
      
      expect(square.area).toBeGreaterThan(triangle.area);
      expect(hexagon.area).toBeGreaterThan(square.area);
    });

    it('debe calcular correctamente el apotema para un hexágono', () => {
      // Para un hexágono regular con lado 10, el apotema es aproximadamente 8.66
      const result = calculateRegularPolygon(6, 10);
      
      expect(result.perimeter).toBe(60);
      // Área = (perímetro × apotema) / 2
      // Si apotema ≈ 8.66, entonces área ≈ (60 × 8.66) / 2 ≈ 259.8
      expect(result.area).toBeCloseTo(259.8, 0);
    });

    it('debe manejar polígonos grandes', () => {
      const result = calculateRegularPolygon(12, 5);
      
      expect(result.perimeter).toBe(60);
      expect(result.area).toBeGreaterThan(0);
    });
  });

  describe('Funciones de Validación', () => {
    describe('validatePositive', () => {
      it('debe retornar true para números positivos', () => {
        expect(validatePositive(5)).toBe(true);
        expect(validatePositive(0.1)).toBe(true);
        expect(validatePositive(1000)).toBe(true);
      });

      it('debe retornar false para cero', () => {
        expect(validatePositive(0)).toBe(false);
      });

      it('debe retornar false para números negativos', () => {
        expect(validatePositive(-5)).toBe(false);
        expect(validatePositive(-0.1)).toBe(false);
        expect(validatePositive(-1000)).toBe(false);
      });
    });

    describe('validateTriangle', () => {
      it('debe retornar true para triángulos válidos', () => {
        expect(validateTriangle(3, 4, 5)).toBe(true);
        expect(validateTriangle(5, 6, 7)).toBe(true);
        expect(validateTriangle(6, 6, 6)).toBe(true);
      });

      it('debe retornar false cuando la suma de dos lados es igual al tercero', () => {
        expect(validateTriangle(1, 2, 3)).toBe(false);
      });

      it('debe retornar false cuando un lado es mayor que la suma de los otros dos', () => {
        expect(validateTriangle(1, 2, 10)).toBe(false);
        expect(validateTriangle(10, 1, 2)).toBe(false);
        expect(validateTriangle(2, 10, 1)).toBe(false);
      });

      it('debe validar triángulos isósceles', () => {
        expect(validateTriangle(5, 5, 6)).toBe(true);
        expect(validateTriangle(5, 5, 12)).toBe(false);
      });

      it('debe manejar números decimales', () => {
        expect(validateTriangle(3.5, 4.5, 5.5)).toBe(true);
        expect(validateTriangle(1.1, 2.2, 5.5)).toBe(false);
      });
    });

    describe('validatePolygon', () => {
      it('debe retornar true para polígonos con 3 o más lados', () => {
        expect(validatePolygon(3)).toBe(true);
        expect(validatePolygon(4)).toBe(true);
        expect(validatePolygon(6)).toBe(true);
        expect(validatePolygon(100)).toBe(true);
      });

      it('debe retornar false para menos de 3 lados', () => {
        expect(validatePolygon(2)).toBe(false);
        expect(validatePolygon(1)).toBe(false);
        expect(validatePolygon(0)).toBe(false);
      });

      it('debe retornar false para números negativos', () => {
        expect(validatePolygon(-1)).toBe(false);
        expect(validatePolygon(-5)).toBe(false);
      });
    });
  });

  describe('Casos de borde y validaciones generales', () => {
    it('todas las funciones deben retornar números válidos (no NaN) para áreas', () => {
      const square = calculateSquare(5);
      const rectangle = calculateRectangle(8, 5);
      const circle = calculateCircle(7);
      const triangleBase = calculateTriangleByBaseHeight(6, 4);
      const triangleSides = calculateTriangleBySides(5, 6, 7);
      const polygon = calculateRegularPolygon(6, 5);

      expect(Number.isNaN(square.area)).toBe(false);
      expect(Number.isNaN(rectangle.area)).toBe(false);
      expect(Number.isNaN(circle.area)).toBe(false);
      expect(Number.isNaN(triangleBase.area)).toBe(false);
      expect(Number.isNaN(triangleSides.area)).toBe(false);
      expect(Number.isNaN(polygon.area)).toBe(false);
    });

    it('todas las áreas deben ser positivas', () => {
      expect(calculateSquare(5).area).toBeGreaterThan(0);
      expect(calculateRectangle(8, 5).area).toBeGreaterThan(0);
      expect(calculateCircle(7).area).toBeGreaterThan(0);
      expect(calculateTriangleByBaseHeight(6, 4).area).toBeGreaterThan(0);
      expect(calculateTriangleBySides(5, 6, 7).area).toBeGreaterThan(0);
      expect(calculateRegularPolygon(6, 5).area).toBeGreaterThan(0);
    });

    it('todos los perímetros calculables deben ser positivos', () => {
      expect(calculateSquare(5).perimeter).toBeGreaterThan(0);
      expect(calculateRectangle(8, 5).perimeter).toBeGreaterThan(0);
      expect(calculateCircle(7).perimeter).toBeGreaterThan(0);
      expect(calculateTriangleBySides(5, 6, 7).perimeter).toBeGreaterThan(0);
      expect(calculateRegularPolygon(6, 5).perimeter).toBeGreaterThan(0);
    });

    it('todas las funciones deben retornar objetos con la estructura correcta', () => {
      const results = [
        calculateSquare(5),
        calculateRectangle(8, 5),
        calculateCircle(7),
        calculateTriangleByBaseHeight(6, 4),
        calculateTriangleBySides(5, 6, 7),
        calculateRegularPolygon(6, 5),
      ];

      results.forEach((result) => {
        expect(result).toHaveProperty('area');
        expect(result).toHaveProperty('perimeter');
        expect(result).toHaveProperty('formula');
        expect(result).toHaveProperty('steps');
        expect(result.formula).toHaveProperty('area');
        expect(result.formula).toHaveProperty('perimeter');
        expect(result.steps).toHaveProperty('area');
        expect(result.steps).toHaveProperty('perimeter');
      });
    });

    it('los steps deben ser arrays con al menos un elemento', () => {
      expect(calculateSquare(5).steps.area.length).toBeGreaterThan(0);
      expect(calculateSquare(5).steps.perimeter.length).toBeGreaterThan(0);
      
      expect(calculateRectangle(8, 5).steps.area.length).toBeGreaterThan(0);
      expect(calculateRectangle(8, 5).steps.perimeter.length).toBeGreaterThan(0);
      
      expect(calculateCircle(7).steps.area.length).toBeGreaterThan(0);
      expect(calculateCircle(7).steps.perimeter.length).toBeGreaterThan(0);
    });

    it('las fórmulas deben ser strings no vacíos', () => {
      expect(typeof calculateSquare(5).formula.area).toBe('string');
      expect(calculateSquare(5).formula.area.length).toBeGreaterThan(0);
      
      expect(typeof calculateRectangle(8, 5).formula.perimeter).toBe('string');
      expect(calculateRectangle(8, 5).formula.perimeter.length).toBeGreaterThan(0);
    });

    it('los perímetros deben ser mayores o iguales que 4 veces el lado menor para cuadriláteros', () => {
      const square = calculateSquare(5);
      expect(square.perimeter).toBeGreaterThanOrEqual(20);
      
      const rectangle = calculateRectangle(8, 5);
      expect(rectangle.perimeter).toBeGreaterThanOrEqual(26);
    });

    it('las áreas de polígonos regulares deben aumentar con el número de lados', () => {
      const sides = [3, 4, 5, 6, 8, 10];
      const areas = sides.map(n => calculateRegularPolygon(n, 5).area);
      
      for (let i = 1; i < areas.length; i++) {
        expect(areas[i]).toBeGreaterThan(areas[i - 1]);
      }
    });
  });
});
