import { useState } from 'react';
import { departamentos, type Departamento } from '../data/departamentos';

interface ColombiaMapProps {
  onDepartmentSelect: (departamento: Departamento) => void;
  selectedDepartamento?: Departamento | null;
}

export function ColombiaMap({ onDepartmentSelect, selectedDepartamento }: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Paths SVG reales de los departamentos de Colombia (formas geográficas aproximadas)
  const departmentPaths: Record<string, string> = {
    'Antioquia': 'M 280,220 L 320,210 L 360,215 L 385,230 L 400,250 L 410,275 L 415,300 L 410,325 L 395,345 L 375,355 L 350,360 L 325,365 L 305,368 L 285,365 L 270,355 L 255,340 L 245,320 L 240,295 L 245,270 L 260,245 Z',
    'Atlántico': 'M 395,95 L 420,92 L 438,98 L 445,108 L 442,122 L 430,130 L 410,132 L 392,128 L 385,115 L 388,102 Z',
    'Bolívar': 'M 380,135 L 425,132 L 460,138 L 485,150 L 500,170 L 508,195 L 505,220 L 492,242 L 470,258 L 445,265 L 420,268 L 395,265 L 375,255 L 360,238 L 355,215 L 362,190 L 372,165 Z',
    'Boyacá': 'M 435,250 L 480,245 L 515,252 L 540,268 L 555,290 L 560,315 L 555,340 L 540,360 L 515,372 L 485,378 L 455,375 L 430,365 L 418,345 L 415,320 L 420,295 L 428,270 Z',
    'Caldas': 'M 300,365 L 330,362 L 352,368 L 365,380 L 368,395 L 360,408 L 345,415 L 325,418 L 305,415 L 292,405 L 288,390 L 292,375 Z',
    'Caquetá': 'M 360,540 L 420,535 L 475,542 L 520,555 L 555,575 L 575,600 L 580,625 L 570,650 L 545,668 L 510,680 L 470,685 L 430,680 L 395,665 L 370,645 L 355,620 L 352,595 L 358,570 Z',
    'Casanare': 'M 515,305 L 565,300 L 610,308 L 645,325 L 665,348 L 672,375 L 668,400 L 650,420 L 620,432 L 585,435 L 550,430 L 525,415 L 512,395 L 510,370 L 515,345 Z',
    'Cauca': 'M 265,450 L 305,445 L 340,452 L 365,468 L 380,490 L 385,515 L 378,538 L 360,555 L 335,565 L 305,568 L 275,562 L 255,545 L 245,525 L 245,500 L 252,475 Z',
    'Cesar': 'M 455,140 L 495,135 L 530,142 L 555,158 L 568,180 L 572,205 L 565,228 L 548,245 L 525,255 L 495,258 L 465,252 L 445,238 L 438,218 L 440,195 L 448,170 Z',
    'Chocó': 'M 165,240 L 210,235 L 248,245 L 275,265 L 290,290 L 295,320 L 290,350 L 275,378 L 252,400 L 225,415 L 195,422 L 168,418 L 148,405 L 135,385 L 130,360 L 132,332 L 142,305 L 155,280 Z',
    'Córdoba': 'M 315,165 L 355,160 L 385,168 L 405,185 L 415,208 L 412,230 L 398,248 L 375,258 L 348,262 L 320,258 L 298,245 L 288,225 L 290,203 L 300,185 Z',
    'Cundinamarca': 'M 370,340 L 415,335 L 452,342 L 478,358 L 492,380 L 495,405 L 488,428 L 470,445 L 445,455 L 415,458 L 385,452 L 360,438 L 350,418 L 348,395 L 355,370 Z',
    'Guainía': 'M 685,430 L 730,425 L 765,435 L 788,455 L 798,480 L 795,508 L 780,530 L 755,545 L 725,550 L 695,545 L 672,530 L 662,510 L 662,485 L 670,460 Z',
    'Guaviare': 'M 545,470 L 590,465 L 628,472 L 655,490 L 668,515 L 668,540 L 655,562 L 632,575 L 602,580 L 570,575 L 545,560 L 535,540 L 535,515 L 540,490 Z',
    'Huila': 'M 355,420 L 395,415 L 428,422 L 450,438 L 462,460 L 465,485 L 458,508 L 440,525 L 415,535 L 385,538 L 358,532 L 340,518 L 332,498 L 332,473 L 340,448 Z',
    'La Guajira': 'M 570,45 L 615,40 L 652,48 L 678,65 L 692,88 L 695,115 L 688,140 L 670,160 L 645,172 L 615,178 L 585,172 L 562,158 L 550,138 L 548,115 L 555,90 L 565,70 Z',
    'Magdalena': 'M 475,85 L 520,80 L 558,88 L 585,105 L 600,128 L 602,152 L 592,175 L 572,192 L 545,202 L 515,205 L 485,200 L 462,185 L 452,165 L 452,142 L 460,118 Z',
    'Meta': 'M 455,380 L 505,375 L 548,383 L 580,400 L 602,423 L 612,450 L 612,478 L 600,502 L 578,520 L 548,530 L 515,532 L 482,525 L 458,508 L 448,485 L 448,458 L 455,430 Z',
    'Nariño': 'M 245,580 L 285,575 L 320,582 L 345,598 L 358,620 L 360,645 L 350,668 L 330,685 L 305,695 L 275,698 L 248,692 L 228,678 L 218,658 L 215,635 L 220,610 Z',
    'Norte de Santander': 'M 505,185 L 545,180 L 578,188 L 602,205 L 615,228 L 618,252 L 610,275 L 592,292 L 568,302 L 540,305 L 512,300 L 492,285 L 485,265 L 488,242 L 495,218 Z',
    'Putumayo': 'M 285,615 L 330,610 L 368,618 L 395,635 L 410,658 L 412,682 L 402,705 L 382,722 L 355,732 L 325,735 L 295,728 L 272,713 L 262,693 L 260,670 L 268,645 Z',
    'Quindío': 'M 285,385 L 315,382 L 338,388 L 352,400 L 355,415 L 348,428 L 332,435 L 312,438 L 292,435 L 278,425 L 275,410 L 278,395 Z',
    'Risaralda': 'M 268,368 L 298,365 L 322,372 L 338,385 L 342,402 L 335,418 L 318,428 L 295,432 L 272,428 L 258,415 L 252,398 L 255,382 Z',
    'San Andrés y Providencia': 'M 50,120 L 75,118 L 88,125 L 92,138 L 88,152 L 75,160 L 55,162 L 42,155 L 38,142 L 42,128 Z',
    'Santander': 'M 425,215 L 470,210 L 508,218 L 535,235 L 552,258 L 558,283 L 552,308 L 535,328 L 510,340 L 480,345 L 448,340 L 425,325 L 415,305 L 413,280 L 418,255 Z',
    'Sucre': 'M 385,175 L 425,170 L 455,178 L 475,195 L 485,215 L 482,235 L 468,250 L 445,258 L 418,260 L 392,255 L 372,240 L 365,220 L 368,200 Z',
    'Tolima': 'M 322,395 L 365,390 L 405,398 L 435,415 L 452,438 L 458,463 L 452,488 L 435,508 L 410,520 L 380,525 L 348,520 L 322,505 L 310,485 L 308,460 L 313,435 Z',
    'Valle del Cauca': 'M 235,420 L 278,415 L 315,423 L 342,440 L 358,463 L 362,488 L 355,512 L 338,532 L 312,545 L 282,550 L 252,545 L 228,530 L 218,510 L 215,485 L 220,460 Z',
    'Arauca': 'M 570,245 L 615,240 L 652,248 L 678,265 L 692,288 L 695,312 L 688,335 L 670,352 L 645,362 L 615,365 L 585,358 L 562,343 L 552,323 L 550,300 L 558,275 Z',
    'Amazonas': 'M 385,665 L 445,660 L 500,668 L 548,685 L 582,708 L 600,735 L 605,765 L 595,795 L 572,818 L 535,835 L 490,845 L 440,845 L 395,835 L 360,815 L 340,790 L 330,760 L 330,728 L 340,698 Z',
    'Vaupés': 'M 590,555 L 640,550 L 678,558 L 705,575 L 720,598 L 722,625 L 712,650 L 690,668 L 660,678 L 625,680 L 595,672 L 572,655 L 562,633 L 562,608 L 572,583 Z',
    'Vichada': 'M 650,270 L 705,265 L 750,273 L 785,290 L 808,313 L 820,340 L 822,370 L 812,398 L 788,420 L 755,435 L 715,442 L 675,438 L 645,423 L 630,403 L 625,378 L 630,350 L 640,325 Z',
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
        <rect x="0" y="0" width="900" height="900" fill="#e0f2fe" opacity="0.2" />

        {/* Departamentos con formas reales */}
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
                opacity={isSelected ? 1 : isHovered ? 0.9 : 0.75}
                stroke={isSelected ? '#1e40af' : isHovered ? '#3b82f6' : '#ffffff'}
                strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
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
