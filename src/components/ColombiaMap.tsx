import { useState } from 'react';
import { departamentos, type Departamento } from '../data/departamentos';

interface ColombiaMapProps {
  onDepartmentSelect: (departamento: Departamento) => void;
  selectedDepartamento?: Departamento | null;
}

export function ColombiaMap({ onDepartmentSelect, selectedDepartamento }: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Coordenadas aproximadas de los departamentos en el SVG (x, y)
  const departmentCoordinates: Record<string, { x: number; y: number; width: number; height: number }> = {
    // Región Caribe
    'La Guajira': { x: 680, y: 80, width: 100, height: 80 },
    'Magdalena': { x: 580, y: 100, width: 100, height: 80 },
    'Cesar': { x: 580, y: 180, width: 100, height: 70 },
    'Atlántico': { x: 520, y: 110, width: 60, height: 50 },
    'Bolívar': { x: 480, y: 160, width: 100, height: 100 },
    'Sucre': { x: 500, y: 180, width: 80, height: 60 },
    'Córdoba': { x: 420, y: 200, width: 80, height: 80 },
    'San Andrés y Providencia': { x: 150, y: 150, width: 50, height: 50 },

    // Región Andina
    'Norte de Santander': { x: 580, y: 260, width: 90, height: 70 },
    'Santander': { x: 520, y: 280, width: 100, height: 80 },
    'Boyacá': { x: 520, y: 360, width: 100, height: 90 },
    'Cundinamarca': { x: 470, y: 420, width: 90, height: 80 },
    'Antioquia': { x: 380, y: 280, width: 140, height: 140 },
    'Caldas': { x: 390, y: 420, width: 70, height: 60 },
    'Risaralda': { x: 360, y: 450, width: 60, height: 50 },
    'Quindío': { x: 360, y: 480, width: 50, height: 40 },
    'Tolima': { x: 420, y: 480, width: 90, height: 90 },
    'Huila': { x: 450, y: 570, width: 80, height: 80 },

    // Región Pacífica
    'Chocó': { x: 280, y: 320, width: 100, height: 150 },
    'Valle del Cauca': { x: 320, y: 500, width: 90, height: 110 },
    'Cauca': { x: 360, y: 580, width: 90, height: 90 },
    'Nariño': { x: 340, y: 670, width: 90, height: 100 },

    // Región Orinoquía
    'Arauca': { x: 670, y: 280, width: 110, height: 70 },
    'Casanare': { x: 620, y: 350, width: 120, height: 90 },
    'Vichada': { x: 740, y: 300, width: 140, height: 150 },
    'Meta': { x: 560, y: 450, width: 120, height: 120 },

    // Región Amazonía
    'Guainía': { x: 780, y: 450, width: 100, height: 100 },
    'Guaviare': { x: 620, y: 540, width: 100, height: 80 },
    'Vaupés': { x: 680, y: 600, width: 120, height: 100 },
    'Caquetá': { x: 480, y: 620, width: 140, height: 100 },
    'Putumayo': { x: 400, y: 710, width: 120, height: 80 },
    'Amazonas': { x: 520, y: 720, width: 180, height: 120 },
  };

  const getRegionColor = (region: string): string => {
    const colors: Record<string, string> = {
      Caribe: '#60a5fa',
      Andina: '#34d399',
      Pacífica: '#a78bfa',
      Orinoquía: '#fbbf24',
      Amazonía: '#fb923c',
    };
    return colors[region] || '#94a3b8';
  };

  const getDepartamento = (deptName: string): Departamento | undefined => {
    return departamentos.find((d) => d.depto === deptName);
  };

  const handleDepartmentClick = (deptName: string) => {
    const dept = getDepartamento(deptName);
    if (dept) {
      onDepartmentSelect(dept);
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">🗺️ Mapa Interactivo de Colombia</h3>
        <p className="text-gray-600 text-sm">Haz clic en cualquier departamento para ver su información</p>
      </div>

      <svg
        viewBox="0 0 900 850"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mapa interactivo de Colombia con sus 32 departamentos"
      >
        {/* Fondo del océano Pacífico */}
        <rect x="0" y="0" width="300" height="850" fill="#e0f2fe" opacity="0.3" />

        {/* Fondo del océano Atlántico */}
        <rect x="0" y="0" width="900" height="150" fill="#e0f2fe" opacity="0.3" />

        {/* Departamentos */}
        {Object.entries(departmentCoordinates).map(([deptName, coords]) => {
          const dept = getDepartamento(deptName);
          if (!dept) return null;

          const isSelected = selectedDepartamento?.depto === deptName;
          const isHovered = hoveredDept === deptName;
          const baseColor = getRegionColor(dept.region);

          return (
            <g key={deptName}>
              {/* Rectángulo del departamento */}
              <rect
                x={coords.x}
                y={coords.y}
                width={coords.width}
                height={coords.height}
                fill={baseColor}
                opacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
                stroke={isSelected ? '#1e40af' : isHovered ? '#3b82f6' : '#ffffff'}
                strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleDepartmentClick(deptName)}
                onMouseEnter={() => setHoveredDept(deptName)}
                onMouseLeave={() => setHoveredDept(null)}
                role="button"
                aria-label={`Departamento de ${deptName}, capital ${dept.capital}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDepartmentClick(deptName);
                  }
                }}
              />

              {/* Texto del nombre del departamento */}
              <text
                x={coords.x + coords.width / 2}
                y={coords.y + coords.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1f2937"
                fontSize={coords.width > 80 ? '12' : '10'}
                fontWeight="600"
                className="pointer-events-none select-none"
                style={{ textShadow: '0 0 3px white' }}
              >
                {deptName.length > 12 ? deptName.slice(0, 10) + '...' : deptName}
              </text>

              {/* Código del departamento (solo si hay espacio) */}
              {coords.width > 70 && (
                <text
                  x={coords.x + coords.width / 2}
                  y={coords.y + coords.height / 2 + 14}
                  textAnchor="middle"
                  fill="#4b5563"
                  fontSize="9"
                  fontWeight="500"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 0 2px white' }}
                >
                  ({dept.code})
                </text>
              )}

              {/* Tooltip al hacer hover */}
              {isHovered && (
                <g>
                  <rect
                    x={coords.x + coords.width / 2 - 70}
                    y={coords.y - 40}
                    width="140"
                    height="35"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    rx="6"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y - 28}
                    textAnchor="middle"
                    fill="#1f2937"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {dept.capital}
                  </text>
                  <text
                    x={coords.x + coords.width / 2}
                    y={coords.y - 15}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="9"
                  >
                    {dept.population.toLocaleString()} hab.
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Leyenda de regiones */}
        <g transform="translate(20, 750)">
          <rect x="0" y="0" width="280" height="90" fill="white" opacity="0.95" rx="8" stroke="#cbd5e1" strokeWidth="2" />
          <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#1f2937">
            Regiones de Colombia:
          </text>

          {['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'].map((region, idx) => (
            <g key={region} transform={`translate(${idx < 3 ? 10 : 150}, ${idx < 3 ? 30 + idx * 18 : 30 + (idx - 3) * 18})`}>
              <rect width="12" height="12" fill={getRegionColor(region)} rx="2" />
              <text x="18" y="10" fontSize="10" fill="#4b5563">
                {region}
              </text>
            </g>
          ))}
        </g>

        {/* Título decorativo */}
        <text x="450" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e40af" opacity="0.8">
          República de Colombia
        </text>
      </svg>

      {/* Instrucciones */}
      <div className="mt-4 text-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        💡 <strong>Tip:</strong> Pasa el cursor sobre un departamento para ver su capital y población. Haz clic para ver todos los detalles.
      </div>
    </div>
  );
}
