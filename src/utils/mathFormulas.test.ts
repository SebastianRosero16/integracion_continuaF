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

describe('Validadores', () => {
  describe('validatePositive', () => {
    it('debe retornar true para números positivos', () => {
      expect(validatePositive(5)).toBe(true);
      expect(validatePositive(0.5)).toBe(true);
      expect(validatePositive(100)).toBe(true);
    });

    it('debe retornar false para números negativos', () => {
      expect(validatePositive(-5)).toBe(false);
      expect(validatePositive(-0.1)).toBe(false);
    });

    it('debe retornar false para cero', () => {
      expect(validatePositive(0)).toBe(false);
    });
  });

  describe('validateTriangle', () => {
    it('debe retornar true para triángulos válidos', () => {
      expect(validateTriangle(3, 4, 5)).toBe(true);
      expect(validateTriangle(5, 5, 5)).toBe(true);
      expect(validateTriangle(6, 8, 10)).toBe(true);
    });

    it('debe retornar false cuando la suma de dos lados es menor o igual al tercero', () => {
      expect(validateTriangle(1, 2, 5)).toBe(false);
      expect(validateTriangle(1, 1, 2)).toBe(false);
      expect(validateTriangle(2, 3, 10)).toBe(false);
    });
  });

  describe('validatePolygon', () => {
    it('debe retornar true para polígonos válidos (3 o más lados)', () => {
      expect(validatePolygon(3)).toBe(true);
      expect(validatePolygon(4)).toBe(true);
      expect(validatePolygon(6)).toBe(true);
      expect(validatePolygon(12)).toBe(true);
    });

    it('debe retornar false para menos de 3 lados', () => {
      expect(validatePolygon(2)).toBe(false);
      expect(validatePolygon(1)).toBe(false);
      expect(validatePolygon(0)).toBe(false);
    });
  });
});

describe('Cálculo de Cuadrado', () => {
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

    it('debe incluir los pasos de cálculo', () => {
      const result = calculateSquare(5);
      expect(result.steps.area).toContain('A = 5²');
      expect(result.steps.area).toContain('A = 25 unidades²');
      expect(result.steps.perimeter).toContain('P = 4 × 5');
      expect(result.steps.perimeter).toContain('P = 20 unidades');
    });

    it('debe calcular correctamente con decimales', () => {
      const result = calculateSquare(2.5);
      expect(result.area).toBe(6.25);
      expect(result.perimeter).toBe(10);
    });
  });
});

describe('Cálculo de Rectángulo', () => {
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

    it('debe incluir los pasos de cálculo', () => {
      const result = calculateRectangle(8, 5);
      expect(result.steps.area).toContain('A = 8 × 5');
      expect(result.steps.area).toContain('A = 40 unidades²');
      expect(result.steps.perimeter).toContain('P = 2 × (8 + 5)');
      expect(result.steps.perimeter).toContain('P = 26 unidades');
    });

    it('debe calcular correctamente con decimales', () => {
      const result = calculateRectangle(3.5, 2.5);
      expect(result.area).toBe(8.75);
      expect(result.perimeter).toBe(12);
    });

    it('debe funcionar cuando largo y ancho son iguales (cuadrado)', () => {
      const result = calculateRectangle(5, 5);
      expect(result.area).toBe(25);
      expect(result.perimeter).toBe(20);
    });
  });
});

describe('Cálculo de Círculo', () => {
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

    it('debe incluir los pasos de cálculo', () => {
      const result = calculateCircle(7);
      expect(result.steps.area).toContain('A = π × 7²');
      expect(result.steps.perimeter).toContain('P = 2 × π × 7');
    });

    it('debe calcular correctamente con radio = 1', () => {
      const result = calculateCircle(1);
      expect(result.area).toBeCloseTo(3.14, 2);
      expect(result.perimeter).toBeCloseTo(6.28, 2);
    });

    it('debe calcular correctamente con decimales', () => {
      const result = calculateCircle(2.5);
      expect(result.area).toBeCloseTo(19.63, 2);
      expect(result.perimeter).toBeCloseTo(15.71, 2);
    });
  });
});

describe('Cálculo de Triángulo por Base y Altura', () => {
  describe('calculateTriangleByBaseHeight', () => {
    it('debe calcular correctamente el área de un triángulo', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      expect(result.area).toBe(12);
    });

    it('debe incluir la fórmula correcta', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      expect(result.formula.area).toBe('A = (b × h) / 2');
    });

    it('debe incluir los pasos de cálculo', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      expect(result.steps.area).toContain('A = (6 × 4) / 2');
      expect(result.steps.area).toContain('A = 12 unidades²');
    });

    it('debe calcular correctamente con decimales', () => {
      const result = calculateTriangleByBaseHeight(5.5, 3.2);
      expect(result.area).toBeCloseTo(8.8, 2);
    });

    it('debe retornar NaN para perímetro', () => {
      const result = calculateTriangleByBaseHeight(6, 4);
      expect(result.perimeter).toBeNaN();
      expect(result.formula.perimeter).toBe('P = a + b + c (necesitas los tres lados)');
    });
  });
});

describe('Cálculo de Triángulo por Tres Lados', () => {
  describe('calculateTriangleBySides', () => {
    it('debe calcular correctamente área y perímetro con triángulo 3-4-5', () => {
      const result = calculateTriangleBySides(3, 4, 5);
      expect(result.area).toBeCloseTo(6, 2);
      expect(result.perimeter).toBe(12);
    });

    it('debe calcular correctamente con triángulo equilátero', () => {
      const result = calculateTriangleBySides(5, 5, 5);
      expect(result.area).toBeCloseTo(10.83, 2);
      expect(result.perimeter).toBe(15);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateTriangleBySides(3, 4, 5);
      expect(result.formula.area).toContain('s = (a+b+c)/2');
      expect(result.formula.perimeter).toBe('P = a + b + c');
    });

    it('debe incluir los pasos de cálculo', () => {
      const result = calculateTriangleBySides(3, 4, 5);
      expect(result.steps.area[0]).toContain('s = ');
      expect(result.steps.perimeter).toContain('P = 3 + 4 + 5');
      expect(result.steps.perimeter).toContain('P = 12 unidades');
    });
  });
});

describe('Cálculo de Polígono Regular', () => {
  describe('calculateRegularPolygon', () => {
    it('debe calcular correctamente hexágono regular', () => {
      const result = calculateRegularPolygon(6, 4);
      expect(result.area).toBeCloseTo(41.57, 2);
      expect(result.perimeter).toBe(24);
    });

    it('debe calcular correctamente pentágono regular', () => {
      const result = calculateRegularPolygon(5, 3);
      expect(result.area).toBeCloseTo(15.48, 2);
      expect(result.perimeter).toBe(15);
    });

    it('debe calcular correctamente triángulo equilátero (3 lados)', () => {
      const result = calculateRegularPolygon(3, 6);
      expect(result.area).toBeCloseTo(15.59, 2);
      expect(result.perimeter).toBe(18);
    });

    it('debe incluir las fórmulas correctas', () => {
      const result = calculateRegularPolygon(6, 4);
      expect(result.formula.area).toContain('A = (P × a) / 2');
      expect(result.formula.perimeter).toBe('P = n × lado');
    });

    it('debe incluir los pasos de cálculo', () => {
      const result = calculateRegularPolygon(6, 4);
      expect(result.steps.perimeter).toContain('P = 6 × 4');
      expect(result.steps.perimeter).toContain('P = 24 unidades');
      expect(result.steps.area[0]).toContain('P = ');
    });

    it('debe calcular correctamente con decimales', () => {
      const result = calculateRegularPolygon(8, 2.5);
      expect(result.perimeter).toBe(20);
      expect(result.area).toBeGreaterThan(0);
    });
  });
});
