export interface Departamento {
  code: string;
  depto: string;
  capital: string;
  region: 'Caribe' | 'Andina' | 'Pacífica' | 'Orinoquía' | 'Amazonía';
  population: number;
  area: number; // km²
  facts: string[];
}

export const departamentos: Departamento[] = [
  {
    code: 'AMA',
    depto: 'Amazonas',
    capital: 'Leticia',
    region: 'Amazonía',
    population: 79174,
    area: 109665,
    facts: ['Es el departamento más al sur del país', 'Comparte frontera con Perú y Brasil', 'Tiene la mayor biodiversidad de Colombia']
  },
  {
    code: 'ANT',
    depto: 'Antioquia',
    capital: 'Medellín',
    region: 'Andina',
    population: 6677930,
    area: 63612,
    facts: ['La capital es conocida como la ciudad de la eterna primavera', 'Es uno de los principales centros económicos del país', 'Tiene costas tanto en el Pacífico como en el Caribe']
  },
  {
    code: 'ARA',
    depto: 'Arauca',
    capital: 'Arauca',
    region: 'Orinoquía',
    population: 280973,
    area: 23818,
    facts: ['Comparte frontera con Venezuela', 'Es una importante zona ganadera', 'Tiene grandes riquezas petroleras']
  },
  {
    code: 'ATL',
    depto: 'Atlántico',
    capital: 'Barranquilla',
    region: 'Caribe',
    population: 2535517,
    area: 3388,
    facts: ['Barranquilla es la ciudad del Carnaval', 'Es uno de los departamentos más pequeños', 'Su capital es un importante puerto marítimo']
  },
  {
    code: 'BOL',
    depto: 'Bolívar',
    capital: 'Cartagena',
    region: 'Caribe',
    population: 2207922,
    area: 25978,
    facts: ['Cartagena es Patrimonio Histórico de la Humanidad', 'Tiene importantes zonas arqueológicas', 'Es un destino turístico internacional']
  },
  {
    code: 'BOY',
    depto: 'Boyacá',
    capital: 'Tunja',
    region: 'Andina',
    population: 1276407,
    area: 23189,
    facts: ['Fue escenario de la Batalla del Puente de Boyacá', 'Produce gran parte de las esmeraldas del país', 'Tiene importantes páramos y lagunas']
  },
  {
    code: 'CAL',
    depto: 'Caldas',
    capital: 'Manizales',
    region: 'Andina',
    population: 1018453,
    area: 7888,
    facts: ['Hace parte del Eje Cafetero', 'Manizales es conocida como la ciudad de las puertas abiertas', 'Tiene el Parque Nacional Natural Los Nevados']
  },
  {
    code: 'CAQ',
    depto: 'Caquetá',
    capital: 'Florencia',
    region: 'Amazonía',
    population: 420337,
    area: 88965,
    facts: ['Es la puerta de entrada a la Amazonía colombiana', 'Tiene importantes recursos hídricos', 'Es una zona de gran biodiversidad']
  },
  {
    code: 'CAS',
    depto: 'Casanare',
    capital: 'Yopal',
    region: 'Orinoquía',
    population: 442907,
    area: 44640,
    facts: ['Es una importante zona de producción petrolera', 'Tiene extensas sabanas y humedales', 'Es conocida por sus paisajes llaneros']
  },
  {
    code: 'CAU',
    depto: 'Cauca',
    capital: 'Popayán',
    region: 'Pacífica',
    population: 1464488,
    area: 29308,
    facts: ['Popayán es la Ciudad Blanca', 'Tiene importantes comunidades indígenas', 'Su Semana Santa es Patrimonio de la Humanidad']
  },
  {
    code: 'CES',
    depto: 'Cesar',
    capital: 'Valledupar',
    region: 'Caribe',
    population: 1295387,
    area: 22905,
    facts: ['Valledupar es la capital mundial del vallenato', 'Tiene la Sierra Nevada de Santa Marta', 'Es una importante zona minera y agrícola']
  },
  {
    code: 'CHO',
    depto: 'Chocó',
    capital: 'Quibdó',
    region: 'Pacífica',
    population: 534826,
    area: 46530,
    facts: ['Es uno de los lugares con mayor pluviosidad del mundo', 'Tiene una rica cultura afrodescendiente', 'Posee importantes recursos forestales y mineros']
  },
  {
    code: 'COR',
    depto: 'Córdoba',
    capital: 'Montería',
    region: 'Caribe',
    population: 1828947,
    area: 23980,
    facts: ['Es una importante zona ganadera', 'Tiene el Parque Nacional Natural Paramillo', 'Su economía se basa en la agricultura y ganadería']
  },
  {
    code: 'CUN',
    depto: 'Cundinamarca',
    capital: 'Bogotá',
    region: 'Andina',
    population: 8380801,
    area: 24210,
    facts: ['Rodea a Bogotá, la capital del país', 'Tiene importantes municipios turísticos', 'Es un centro económico y administrativo']
  },
  {
    code: 'GUA',
    depto: 'Guainía',
    capital: 'Inírida',
    region: 'Amazonía',
    population: 48114,
    area: 72238,
    facts: ['Es uno de los departamentos menos poblados', 'Tiene el Cerro Mavecure, formaciones rocosas únicas', 'Comparte frontera con Venezuela']
  },
  {
    code: 'GUV',
    depto: 'Guaviare',
    capital: 'San José del Guaviare',
    region: 'Amazonía',
    population: 111060,
    area: 53460,
    facts: ['Tiene arte rupestre milenario', 'Es una zona de transición entre los Andes y la Amazonía', 'Posee el río Guaviare']
  },
  {
    code: 'HUI',
    depto: 'Huila',
    capital: 'Neiva',
    region: 'Andina',
    population: 1009548,
    area: 19890,
    facts: ['Tiene el Parque Arqueológico de San Agustín', 'Es una importante zona cafetera', 'Produce gran parte del arroz del país']
  },
  {
    code: 'LAG',
    depto: 'La Guajira',
    capital: 'Riohacha',
    region: 'Caribe',
    population: 1007138,
    area: 20848,
    facts: ['Es el punto más al norte de Sudamérica', 'Tiene el Cabo de la Vela y Punta Gallinas', 'Es hogar del pueblo Wayúu']
  },
  {
    code: 'MAG',
    depto: 'Magdalena',
    capital: 'Santa Marta',
    region: 'Caribe',
    population: 1402923,
    area: 23188,
    facts: ['Santa Marta es la ciudad más antigua de Colombia', 'Tiene la Sierra Nevada de Santa Marta', 'Es un importante destino turístico']
  },
  {
    code: 'MET',
    depto: 'Meta',
    capital: 'Villavicencio',
    region: 'Orinoquía',
    population: 1099592,
    area: 85635,
    facts: ['Villavicencio es la puerta del llano', 'Es una importante zona ganadera y agrícola', 'Tiene el Parque Nacional Natural Sierra de la Macarena']
  },
  {
    code: 'NAR',
    depto: 'Nariño',
    capital: 'Pasto',
    region: 'Andina',
    population: 1744275,
    area: 33268,
    facts: ['Tiene el Carnaval de Negros y Blancos', 'Limita con Ecuador', 'Es una importante zona agrícola y artesanal']
  },
  {
    code: 'NSA',
    depto: 'Norte de Santander',
    capital: 'Cúcuta',
    region: 'Andina',
    population: 1508681,
    area: 21658,
    facts: ['Cúcuta es una ciudad fronteriza con Venezuela', 'Fue importante en la independencia de Colombia', 'Es una zona comercial y agrícola']
  },
  {
    code: 'PUT',
    depto: 'Putumayo',
    capital: 'Mocoa',
    region: 'Amazonía',
    population: 359764,
    area: 24885,
    facts: ['Limita con Ecuador y Perú', 'Tiene importantes reservas naturales', 'Es una zona con gran diversidad étnica']
  },
  {
    code: 'QUI',
    depto: 'Quindío',
    capital: 'Armenia',
    region: 'Andina',
    population: 573892,
    area: 1845,
    facts: ['Hace parte del Eje Cafetero', 'Es el departamento más pequeño de Colombia', 'Tiene el Parque Nacional del Café']
  },
  {
    code: 'RIS',
    depto: 'Risaralda',
    capital: 'Pereira',
    region: 'Andina',
    population: 972336,
    area: 4140,
    facts: ['Pereira es la ciudad sin puertas', 'Hace parte del Eje Cafetero', 'Tiene el Parque Nacional Natural Los Nevados']
  },
  {
    code: 'SAP',
    depto: 'San Andrés y Providencia',
    capital: 'San Andrés',
    region: 'Caribe',
    population: 77701,
    area: 52,
    facts: ['Es el único departamento insular de Colombia', 'Tiene el mar de los siete colores', 'Es Reserva de Biosfera']
  },
  {
    code: 'SAN',
    depto: 'Santander',
    capital: 'Bucaramanga',
    region: 'Andina',
    population: 2280037,
    area: 30537,
    facts: ['Bucaramanga es la ciudad de los parques', 'Tiene el Parque Nacional del Chicamocha', 'Es una zona de aventura y ecoturismo']
  },
  {
    code: 'SUC',
    depto: 'Sucre',
    capital: 'Sincelejo',
    region: 'Caribe',
    population: 950952,
    area: 10670,
    facts: ['Es una importante zona ganadera', 'Tiene el Golfo de Morrosquillo', 'Su economía se basa en la agricultura y ganadería']
  },
  {
    code: 'TOL',
    depto: 'Tolima',
    capital: 'Ibagué',
    region: 'Andina',
    population: 1330187,
    area: 23562,
    facts: ['Ibagué es la capital musical de Colombia', 'Tiene el Nevado del Tolima', 'Es una importante zona agrícola y minera']
  },
  {
    code: 'VAL',
    depto: 'Valle del Cauca',
    capital: 'Cali',
    region: 'Pacífica',
    population: 4660742,
    area: 22140,
    facts: ['Cali es la capital de la salsa', 'Es uno de los principales centros económicos', 'Tiene acceso al océano Pacífico']
  },
  {
    code: 'VAU',
    depto: 'Vaupés',
    capital: 'Mitú',
    region: 'Amazonía',
    population: 47717,
    area: 54135,
    facts: ['Es uno de los departamentos menos poblados', 'Tiene importantes comunidades indígenas', 'Comparte frontera con Brasil']
  },
  {
    code: 'VID',
    depto: 'Vichada',
    capital: 'Puerto Carreño',
    region: 'Orinoquía',
    population: 107808,
    area: 100242,
    facts: ['Es el segundo departamento más grande', 'Comparte frontera con Venezuela', 'Tiene extensas sabanas y ríos']
  }
];

export function getDepartamentoByCode(code: string): Departamento | undefined {
  return departamentos.find(d => d.code === code);
}

export function getDepartamentosByRegion(region: string): Departamento[] {
  return departamentos.filter(d => d.region === region);
}

export function getRegions(): string[] {
  return Array.from(new Set(departamentos.map(d => d.region)));
}

export function getRegionColor(region: string): string {
  const colors: Record<string, string> = {
    'Caribe': 'bg-blue-100 text-blue-800 border-blue-300',
    'Andina': 'bg-green-100 text-green-800 border-green-300',
    'Pacífica': 'bg-teal-100 text-teal-800 border-teal-300',
    'Orinoquía': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Amazonía': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  };
  return colors[region] || 'bg-gray-100 text-gray-800 border-gray-300';
}
