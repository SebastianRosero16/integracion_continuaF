import { useState } from 'react';
import { departamentos, type Departamento } from '../data/departamentos';

interface ColombiaMapProps {
  onDepartmentSelect: (departamento: Departamento) => void;
  selectedDepartamento?: Departamento | null;
}

export function ColombiaMap({ onDepartmentSelect, selectedDepartamento }: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Paths SVG con formas más grandes y visibles basadas en el mapa real de Colombia
  const departmentPaths: Record<string, string> = {
    // Región Caribe - Norte
    'San Andrés y Providencia': 'M 50,180 L 95,180 L 95,210 L 50,210 Z',
    'La Guajira': 'M 570,100 L 650,95 L 680,120 L 685,160 L 665,185 L 630,190 L 590,175 L 570,145 Z',
    'Magdalena': 'M 480,135 L 570,130 L 590,150 L 590,180 L 565,195 L 520,195 L 485,175 L 480,155 Z',
    'Atlántico': 'M 390,150 L 445,150 L 455,165 L 450,185 L 420,190 L 395,180 L 390,165 Z',
    'Cesar': 'M 510,195 L 585,195 L 595,220 L 590,250 L 560,265 L 525,265 L 510,240 Z',
    'Bolívar': 'M 330,210 L 460,200 L 485,215 L 495,245 L 480,270 L 440,280 L 380,280 L 345,260 L 330,235 Z',
    'Sucre': 'M 330,235 L 395,235 L 405,255 L 400,275 L 370,285 L 340,280 L 330,260 Z',
    'Córdoba': 'M 265,205 L 345,205 L 360,225 L 360,250 L 335,265 L 290,265 L 270,240 L 265,220 Z',
    
    // Región Andina - Centro
    'Norte de Santander': 'M 510,240 L 585,240 L 600,265 L 595,295 L 570,310 L 535,310 L 515,285 L 510,260 Z',
    'Santander': 'M 420,260 L 515,255 L 535,275 L 540,310 L 515,335 L 470,345 L 430,340 L 420,300 Z',
    'Boyacá': 'M 455,305 L 550,300 L 570,325 L 570,370 L 545,395 L 495,400 L 460,385 L 455,345 Z',
    'Arauca': 'M 560,280 L 630,275 L 650,295 L 650,325 L 630,345 L 595,350 L 570,335 L 560,305 Z',
    'Casanare': 'M 520,345 L 605,340 L 625,360 L 625,400 L 600,425 L 555,430 L 525,410 L 520,375 Z',
    'Cundinamarca': 'M 370,340 L 460,335 L 485,355 L 490,395 L 465,420 L 415,430 L 380,420 L 370,385 Z',
    'Antioquia': 'M 265,255 L 390,250 L 420,270 L 430,315 L 425,360 L 395,385 L 340,395 L 290,385 L 265,345 L 260,295 Z',
    'Chocó': 'M 160,260 L 260,255 L 275,285 L 280,340 L 270,390 L 240,410 L 200,415 L 170,395 L 160,340 Z',
    'Caldas': 'M 300,360 L 355,355 L 370,370 L 370,395 L 350,410 L 315,410 L 300,390 Z',
    'Risaralda': 'M 245,360 L 295,360 L 305,375 L 305,400 L 285,415 L 255,415 L 245,390 Z',
    'Quindío': 'M 275,405 L 320,405 L 330,420 L 330,440 L 310,450 L 285,450 L 275,430 Z',
    'Tolima': 'M 310,410 L 410,405 L 430,425 L 435,470 L 415,500 L 370,510 L 325,505 L 310,470 Z',
    'Valle del Cauca': 'M 210,410 L 285,405 L 305,425 L 310,475 L 295,510 L 250,520 L 215,510 L 210,460 Z',
    
    // Región Pacífica - Oeste
    'Cauca': 'M 230,515 L 310,510 L 330,530 L 335,575 L 315,600 L 270,610 L 240,600 L 230,560 Z',
    'Nariño': 'M 210,600 L 285,595 L 300,615 L 305,660 L 280,685 L 235,690 L 210,670 L 205,630 Z',
    'Huila': 'M 330,495 L 410,490 L 430,510 L 435,555 L 415,580 L 370,590 L 340,580 L 330,540 Z',
    
    // Región Orinoquía - Este
    'Vichada': 'M 615,385 L 710,380 L 735,405 L 740,460 L 715,490 L 660,500 L 625,485 L 615,440 Z',
    'Meta': 'M 445,425 L 560,420 L 585,440 L 590,495 L 565,525 L 505,535 L 460,525 L 445,480 Z',
    
    // Región Amazonía - Sur
    'Guainía': 'M 660,465 L 730,460 L 750,485 L 750,530 L 730,555 L 685,560 L 665,540 L 660,500 Z',
    'Guaviare': 'M 515,510 L 600,505 L 620,525 L 620,570 L 595,595 L 545,600 L 520,580 L 515,545 Z',
    'Vaupés': 'M 585,575 L 670,570 L 690,590 L 690,635 L 670,660 L 620,665 L 595,645 L 585,610 Z',
    'Caquetá': 'M 390,565 L 520,560 L 545,580 L 550,630 L 525,660 L 465,670 L 410,665 L 390,635 L 385,595 Z',
    'Putumayo': 'M 285,655 L 385,650 L 405,670 L 410,710 L 385,730 L 330,735 L 295,720 L 285,685 Z',
    'Amazonas': 'M 380,680 L 530,675 L 555,700 L 560,760 L 535,795 L 465,805 L 405,800 L 380,770 L 375,720 Z',
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

  // Posiciones para los nombres de los departamentos (centros aproximados)
  const departmentLabelPositions: Record<string, { x: number; y: number }> = {
    'San Andrés y Providencia': { x: 72, y: 195 },
    'La Guajira': { x: 625, y: 145 },
    'Magdalena': { x: 530, y: 165 },
    'Atlántico': { x: 420, y: 168 },
    'Cesar': { x: 545, y: 230 },
    'Bolívar': { x: 395, y: 245 },
    'Sucre': { x: 365, y: 260 },
    'Córdoba': { x: 305, y: 235 },
    'Norte de Santander': { x: 550, y: 273 },
    'Santander': { x: 470, y: 300 },
    'Boyacá': { x: 505, y: 350 },
    'Arauca': { x: 600, y: 310 },
    'Casanare': { x: 565, y: 385 },
    'Cundinamarca': { x: 425, y: 385 },
    'Antioquia': { x: 335, y: 315 },
    'Chocó': { x: 210, y: 330 },
    'Caldas': { x: 330, y: 383 },
    'Risaralda': { x: 270, y: 388 },
    'Quindío': { x: 300, y: 428 },
    'Tolima': { x: 365, y: 458 },
    'Valle del Cauca': { x: 250, y: 463 },
    'Cauca': { x: 270, y: 560 },
    'Nariño': { x: 250, y: 645 },
    'Huila': { x: 375, y: 540 },
    'Vichada': { x: 670, y: 440 },
    'Meta': { x: 500, y: 478 },
    'Guainía': { x: 695, y: 510 },
    'Guaviare': { x: 560, y: 553 },
    'Vaupés': { x: 630, y: 618 },
    'Caquetá': { x: 460, y: 615 },
    'Putumayo': { x: 340, y: 693 },
    'Amazonas': { x: 460, y: 740 },
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

        {/* Departamentos con formas geográficas reales */}
        {Object.entries(departmentPaths).map(([deptName, path]) => {
          const dept = getDepartamento(deptName);
          if (!dept) return null;

          const isSelected = selectedDepartamento?.depto === deptName;
          const isHovered = hoveredDept === deptName;
          const baseColor = getRegionColor(dept.region);

          return (
            <g key={deptName}>
              <path
                d={path}
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
              {departmentLabelPositions[deptName] && (
                <text
                  x={departmentLabelPositions[deptName].x}
                  y={departmentLabelPositions[deptName].y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#1f2937"
                  fontSize={deptName.length > 15 ? '10' : '12'}
                  fontWeight="600"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.9)' }}
                >
                  {deptName}
                </text>
              )}
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
