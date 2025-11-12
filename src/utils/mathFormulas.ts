export interface GeometricShape {
  type: 'triangle' | 'rectangle' | 'square' | 'circle' | 'polygon';
  dimensions: Record<string, number>;
}

export interface CalculationResult {
  area: number;
  perimeter: number;
  formula: {
    area: string;
    perimeter: string;
  };
  steps: {
    area: string[];
    perimeter: string[];
  };
}

// Cuadrado
export const calculateSquare = (side: number): CalculationResult => {
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
      area: [
        `A = ${side}²`,
        `A = ${area} unidades²`,
      ],
      perimeter: [
        `P = 4 × ${side}`,
        `P = ${perimeter} unidades`,
      ],
    },
  };
};

// Rectángulo
export const calculateRectangle = (length: number, width: number): CalculationResult => {
  const area = length * width;
  const perimeter = 2 * (length + width);

  return {
    area,
    perimeter,
    formula: {
      area: 'A = largo × ancho',
      perimeter: 'P = 2 × (largo + ancho)',
    },
    steps: {
      area: [
        `A = ${length} × ${width}`,
        `A = ${area} unidades²`,
      ],
      perimeter: [
        `P = 2 × (${length} + ${width})`,
        `P = 2 × ${length + width}`,
        `P = ${perimeter} unidades`,
      ],
    },
  };
};

// Círculo
export const calculateCircle = (radius: number): CalculationResult => {
  const area = Math.PI * radius * radius;
  const perimeter = 2 * Math.PI * radius;

  return {
    area,
    perimeter,
    formula: {
      area: 'A = π × r²',
      perimeter: 'P = 2 × π × r',
    },
    steps: {
      area: [
        `A = π × ${radius}²`,
        `A = ${Math.PI.toFixed(2)} × ${radius * radius}`,
        `A = ${area.toFixed(2)} unidades²`,
      ],
      perimeter: [
        `P = 2 × π × ${radius}`,
        `P = 2 × ${Math.PI.toFixed(2)} × ${radius}`,
        `P = ${perimeter.toFixed(2)} unidades`,
      ],
    },
  };
};

// Triángulo (base y altura)
export const calculateTriangleByBaseHeight = (base: number, height: number): CalculationResult => {
  const area = (base * height) / 2;

  return {
    area,
    perimeter: NaN,
    formula: {
      area: 'A = (b × h) / 2',
      perimeter: 'P = a + b + c (necesitas los tres lados)',
    },
    steps: {
      area: [
        `A = (${base} × ${height}) / 2`,
        `A = ${base * height} / 2`,
        `A = ${area} unidades²`,
      ],
      perimeter: ['Se necesitan los tres lados para calcular el perímetro'],
    },
  };
};

// Triángulo (tres lados - Herón)
export const calculateTriangleBySides = (a: number, b: number, c: number): CalculationResult => {
  const perimeter = a + b + c;
  const s = perimeter / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  return {
    area,
    perimeter,
    formula: {
      area: 'A = √[s(s-a)(s-b)(s-c)], donde s = (a+b+c)/2',
      perimeter: 'P = a + b + c',
    },
    steps: {
      area: [
        `s = (${a} + ${b} + ${c}) / 2 = ${s}`,
        `A = √[${s} × (${s}-${a}) × (${s}-${b}) × (${s}-${c})]`,
        `A = ${area.toFixed(2)} unidades²`,
      ],
      perimeter: [
        `P = ${a} + ${b} + ${c}`,
        `P = ${perimeter} unidades`,
      ],
    },
  };
};

// Polígono regular
export const calculateRegularPolygon = (sides: number, sideLength: number): CalculationResult => {
  const perimeter = sides * sideLength;
  const apothem = sideLength / (2 * Math.tan(Math.PI / sides));
  const area = (perimeter * apothem) / 2;

  return {
    area,
    perimeter,
    formula: {
      area: 'A = (P × a) / 2, donde a = apotema',
      perimeter: 'P = n × lado',
    },
    steps: {
      area: [
        `P = ${sides} × ${sideLength} = ${perimeter}`,
        `a = ${apothem.toFixed(2)}`,
        `A = (${perimeter} × ${apothem.toFixed(2)}) / 2`,
        `A = ${area.toFixed(2)} unidades²`,
      ],
      perimeter: [
        `P = ${sides} × ${sideLength}`,
        `P = ${perimeter} unidades`,
      ],
    },
  };
};

// Validaciones
export const validatePositive = (value: number): boolean => value > 0;

export const validateTriangle = (a: number, b: number, c: number): boolean => {
  return a + b > c && a + c > b && b + c > a;
};

export const validatePolygon = (sides: number): boolean => sides >= 3;
