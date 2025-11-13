import { useState } from 'react';
import { departamentos, type Departamento } from '../data/departamentos';

interface ColombiaMapProps {
  onDepartmentSelect: (departamento: Departamento) => void;
  selectedDepartamento?: Departamento | null;
}

export function ColombiaMap({ onDepartmentSelect, selectedDepartamento }: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Coordenadas simplificadas de departamentos basadas en ubicación geográfica real
  const departmentCoordinates: Record<string, { x: number; y: number; width: number; height: number }> = {
    // Región Caribe (norte)
    'La Guajira': { x: 650, y: 50, width: 110, height: 90 },
    'Magdalena': { x: 540, y: 90, width: 110, height: 80 },
    'Atlántico': { x: 460, y: 105, width: 80, height: 50 },
    'Cesar': { x: 540, y: 170, width: 100, height: 85 },
    'Bolívar': { x: 390, y: 150, width: 150, height: 100 },
    'Sucre': { x: 380, y: 195, width: 90, height: 65 },
    'Córdoba': { x: 310, y: 180, width: 95, height: 80 },
    
    // Región Andina (centro)
    'Norte de Santander': { x: 590, y: 200, width: 95, height: 80 },
    'Santander': { x: 500, y: 220, width: 110, height: 100 },
    'Boyacá': { x: 540, y: 285, width: 105, height: 95 },
    'Antioquia': { x: 310, y: 240, width: 140, height: 130 },
    'Caldas': { x: 310, y: 355, width: 70, height: 55 },
    'Risaralda': { x: 270, y: 360, width: 65, height: 50 },
    'Quindío': { x: 290, y: 395, width: 55, height: 45 },
    'Cundinamarca': { x: 420, y: 340, width: 100, height: 95 },
    'Tolima': { x: 340, y: 415, width: 100, height: 95 },
    'Huila': { x: 360, y: 495, width: 90, height: 85 },
    
    // Región Pacífica (oeste)
    'Chocó': { x: 180, y: 250, width: 110, height: 150 },
    'Valle del Cauca': { x: 230, y: 395, width: 90, height: 115 },
    'Cauca': { x: 265, y: 495, width: 100, height: 100 },
    'Nariño': { x: 250, y: 580, width: 95, height: 105 },
    
    // Región Orinoquía (este)
    'Arauca': { x: 645, y: 255, width: 115, height: 75 },
    'Casanare': { x: 605, y: 320, width: 130, height: 90 },
    'Vichada': { x: 690, y: 380, width: 130, height: 110 },
    'Meta': { x: 515, y: 405, width: 130, height: 120 },
    
    // Región Amazonía (sur-este)
    'Guainía': { x: 745, y: 475, width: 95, height: 90 },
    'Guaviare': { x: 605, y: 505, width: 110, height: 85 },
    'Vaupés': { x: 655, y: 580, width: 105, height: 95 },
    'Caquetá': { x: 440, y: 565, width: 145, height: 105 },
    'Putumayo': { x: 310, y: 640, width: 115, height: 80 },
    'Amazonas': { x: 415, y: 660, width: 165, height: 140 },
    
    // Isla (Caribe)
    'San Andrés y Providencia': { x: 50, y: 160, width: 55, height: 40 },
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
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">🗺️ Mapa Interactivo de Colombia</h3>
        <p className="text-gray-600">Haz clic en cualquier departamento para ver su información completa</p>
      </div>

      <svg
        viewBox="0 0 900 900"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mapa interactivo de Colombia con sus 32 departamentos"
      >
        {/* Fondo del mapa */}
        <rect x="0" y="0" width="900" height="900" fill="#e0f2fe" opacity="0.15" />

        {/* Departamentos con rectángulos posicionados geográficamente */}
        {Object.entries(departmentCoordinates).map(([deptName, coords]) => {
          const dept = getDepartamento(deptName);
          if (!dept) return null;

          const isSelected = selectedDepartamento?.depto === deptName;
          const isHovered = hoveredDept === deptName;
          const baseColor = getRegionColor(dept.region);

          return (
            <g key={deptName}>
              <rect
                x={coords.x}
                y={coords.y}
                width={coords.width}
                height={coords.height}
                rx="8"
                ry="8"
                fill={baseColor}
                opacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.75}
                stroke={isSelected ? '#1e40af' : isHovered ? '#3b82f6' : '#ffffff'}
                strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 2}
                className="cursor-pointer transition-all duration-200 hover:brightness-105"
                onClick={() => handleDepartmentClick(deptName)}
                onMouseEnter={() => setHoveredDept(deptName)}
                onMouseLeave={() => setHoveredDept(null)}
                role="button"
                aria-label={`Departamento de ${deptName}, capital ${dept.capital}, región ${dept.region}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDepartmentClick(deptName);
                  }
                }}
              />
              
              {/* Nombre del departamento */}
              <text
                x={coords.x + coords.width / 2}
                y={coords.y + coords.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1f2937"
                fontSize={coords.width > 90 ? '13' : '11'}
                fontWeight="600"
                className="pointer-events-none select-none"
                style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
              >
                {deptName}
              </text>
            </g>
          );
        })}

        {/* Título */}
        <text x="450" y="40" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1e40af" opacity="0.9">
          República de Colombia
        </text>

        {/* Leyenda de regiones */}
        <g transform="translate(30, 780)">
          <rect x="0" y="0" width="340" height="100" fill="white" opacity="0.95" rx="10" stroke="#cbd5e1" strokeWidth="2" />
          <text x="15" y="25" fontSize="14" fontWeight="bold" fill="#1f2937">
            Regiones de Colombia:
          </text>

          {['Caribe', 'Andina', 'Pacífica', 'Orinoquía', 'Amazonía'].map((region, idx) => (
            <g key={region} transform={`translate(${idx < 3 ? 15 : 180}, ${idx < 3 ? 40 + idx * 22 : 40 + (idx - 3) * 22})`}>
              <rect width="16" height="16" fill={getRegionColor(region)} rx="3" stroke="#374151" strokeWidth="1" />
              <text x="24" y="13" fontSize="12" fill="#1f2937" fontWeight="500">
                {region}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Instrucciones */}
      <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-sm border-2 border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-blue-600">💡 Instrucción:</span> Haz clic en cualquier departamento del mapa para ver toda su información detallada en el panel de la derecha
        </p>
      </div>
    </div>
  );
}
