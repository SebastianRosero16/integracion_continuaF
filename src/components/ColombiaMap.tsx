import { useState } from 'react';
import { departamentos, type Departamento } from '../data/departamentos';

interface ColombiaMapProps {
  onDepartmentSelect: (departamento: Departamento) => void;
  selectedDepartamento?: Departamento | null;
}

export function ColombiaMap({ onDepartmentSelect, selectedDepartamento }: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Paths SVG de las formas reales de los departamentos de Colombia
  const departmentPaths: Record<string, string> = {
    'La Guajira': 'M 650,50 L 760,50 L 760,90 L 750,110 L 730,130 L 700,140 L 670,140 L 655,125 L 650,100 Z',
    'Magdalena': 'M 540,90 L 650,90 L 650,120 L 640,140 L 620,155 L 590,165 L 560,165 L 545,150 L 540,125 Z',
    'Atlántico': 'M 460,105 L 540,105 L 540,135 L 525,150 L 505,155 L 485,155 L 470,145 L 460,130 Z',
    'Cesar': 'M 540,170 L 640,170 L 640,220 L 625,245 L 600,255 L 570,255 L 550,240 L 540,215 Z',
    'Bolívar': 'M 390,150 L 540,150 L 540,210 L 520,235 L 490,250 L 455,250 L 425,240 L 400,220 L 390,190 Z',
    'Sucre': 'M 380,195 L 470,195 L 470,240 L 455,255 L 435,260 L 410,260 L 390,250 L 380,230 Z',
    'Córdoba': 'M 310,180 L 405,180 L 405,230 L 390,250 L 365,260 L 340,260 L 320,245 L 310,220 Z',
    'Norte de Santander': 'M 590,200 L 685,200 L 685,250 L 670,270 L 645,280 L 620,280 L 600,265 L 590,240 Z',
    'Santander': 'M 500,220 L 610,220 L 610,285 L 590,310 L 560,320 L 530,320 L 510,300 L 500,270 Z',
    'Boyacá': 'M 540,285 L 645,285 L 645,350 L 625,375 L 595,380 L 565,380 L 545,360 L 540,330 Z',
    'Antioquia': 'M 310,240 L 450,240 L 450,340 L 425,365 L 390,370 L 350,370 L 320,355 L 310,310 Z',
    'Caldas': 'M 310,355 L 380,355 L 380,395 L 365,410 L 345,410 L 330,400 L 315,385 Z',
    'Risaralda': 'M 270,360 L 335,360 L 335,395 L 320,410 L 300,410 L 285,395 L 270,380 Z',
    'Quindío': 'M 290,395 L 345,395 L 345,430 L 330,440 L 315,440 L 300,430 L 290,415 Z',
    'Cundinamarca': 'M 420,340 L 520,340 L 520,410 L 500,430 L 470,435 L 440,435 L 425,420 L 420,390 Z',
    'Tolima': 'M 340,415 L 440,415 L 440,485 L 420,505 L 390,510 L 360,510 L 345,490 L 340,460 Z',
    'Huila': 'M 360,495 L 450,495 L 450,560 L 430,575 L 405,580 L 380,580 L 365,565 L 360,535 Z',
    'Chocó': 'M 180,250 L 290,250 L 290,380 L 270,395 L 240,400 L 210,400 L 190,380 L 180,330 Z',
    'Valle del Cauca': 'M 230,395 L 320,395 L 320,490 L 300,505 L 270,510 L 245,510 L 230,490 L 230,440 Z',
    'Cauca': 'M 265,495 L 365,495 L 365,575 L 345,590 L 315,595 L 285,595 L 270,575 L 265,540 Z',
    'Nariño': 'M 250,580 L 345,580 L 345,660 L 325,680 L 295,685 L 270,685 L 255,665 L 250,625 Z',
    'Arauca': 'M 645,255 L 760,255 L 760,310 L 745,325 L 720,330 L 690,330 L 665,315 L 645,295 Z',
    'Casanare': 'M 605,320 L 735,320 L 735,385 L 715,405 L 685,410 L 650,410 L 625,390 L 605,365 Z',
    'Vichada': 'M 690,380 L 820,380 L 820,460 L 800,480 L 765,490 L 730,490 L 705,470 L 690,440 Z',
    'Meta': 'M 515,405 L 645,405 L 645,495 L 620,515 L 585,525 L 550,525 L 525,505 L 515,465 Z',
    'Guainía': 'M 745,475 L 840,475 L 840,545 L 820,560 L 790,565 L 765,565 L 750,545 L 745,515 Z',
    'Guaviare': 'M 605,505 L 715,505 L 715,570 L 695,585 L 665,590 L 635,590 L 615,570 L 605,540 Z',
    'Vaupés': 'M 655,580 L 760,580 L 760,650 L 740,670 L 710,675 L 680,675 L 665,655 L 655,625 Z',
    'Caquetá': 'M 440,565 L 585,565 L 585,645 L 560,665 L 525,670 L 485,670 L 455,650 L 440,615 Z',
    'Putumayo': 'M 310,640 L 425,640 L 425,705 L 405,720 L 375,720 L 350,710 L 325,695 L 310,675 Z',
    'Amazonas': 'M 415,660 L 580,660 L 580,775 L 550,795 L 510,800 L 465,800 L 435,780 L 415,745 Z',
    'San Andrés y Providencia': 'M 50,160 L 105,160 L 105,190 L 95,200 L 75,200 L 60,190 L 50,180 Z',
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
