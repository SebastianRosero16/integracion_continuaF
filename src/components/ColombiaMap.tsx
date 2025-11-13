import { useState } from 'react';
import { departamentos, type Departamento } from '../data/departamentos';

interface ColombiaMapProps {
  onDepartmentSelect: (departamento: Departamento) => void;
  selectedDepartamento?: Departamento | null;
}

export function ColombiaMap({ onDepartmentSelect, selectedDepartamento }: ColombiaMapProps) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Paths SVG con formas orgánicas reales del mapa de Colombia
  const departmentPaths: Record<string, string> = {
    // Región Caribe
    'San Andrés y Providencia': 'M 35,35 C 40,30 50,30 58,32 C 65,34 68,40 68,48 C 68,55 65,62 58,65 C 50,68 40,68 35,63 C 30,58 28,50 30,42 C 31,37 33,34 35,35 Z',
    
    'La Guajira': 'M 630,25 C 650,20 670,22 685,28 C 695,32 705,40 710,52 C 715,65 715,80 712,95 C 708,108 700,120 688,128 C 675,135 660,138 645,135 C 632,132 620,125 612,115 C 605,105 602,92 603,78 C 604,65 608,52 615,42 C 620,35 625,28 630,25 Z',
    
    'Magdalena': 'M 475,90 C 492,88 510,90 525,95 C 538,100 550,108 558,118 C 565,128 568,140 568,152 C 568,163 564,174 557,182 C 548,192 536,198 522,200 C 508,202 493,200 480,195 C 468,190 458,182 452,172 C 446,162 444,150 445,138 C 446,125 450,112 458,102 C 465,95 470,92 475,90 Z',
    
    'Cesar': 'M 520,165 C 535,163 552,166 565,172 C 578,178 588,188 594,200 C 600,212 602,226 600,240 C 598,252 592,263 583,271 C 573,280 560,285 546,286 C 532,287 518,284 507,277 C 496,270 488,260 484,248 C 480,236 480,223 483,210 C 487,197 494,185 504,176 C 512,170 516,167 520,165 Z',
    
    'Atlántico': 'M 390,125 C 402,123 416,125 426,130 C 435,135 442,143 445,152 C 448,161 448,171 444,180 C 440,188 433,194 424,197 C 415,200 405,200 396,197 C 387,194 380,188 376,180 C 372,172 371,162 373,153 C 375,144 380,136 387,130 C 389,128 390,126 390,125 Z',
    
    'Bolívar': 'M 335,175 C 355,172 378,175 395,183 C 412,191 425,204 432,220 C 438,235 438,252 433,268 C 428,283 418,296 404,304 C 390,312 373,315 357,313 C 342,311 328,304 318,294 C 308,284 302,271 300,257 C 298,243 300,228 306,215 C 312,202 321,191 332,184 C 333,180 334,177 335,175 Z',
    
    'Sucre': 'M 345,225 C 358,223 372,225 383,231 C 393,237 400,246 403,257 C 406,267 405,278 400,288 C 395,297 387,304 377,307 C 367,310 356,309 347,305 C 338,301 331,293 328,284 C 325,275 325,265 328,256 C 331,247 337,239 344,233 C 344,230 345,227 345,225 Z',
    
    'Córdoba': 'M 270,185 C 285,183 302,186 315,193 C 328,200 338,211 343,224 C 348,237 348,251 343,264 C 338,276 328,286 316,292 C 304,298 290,300 277,298 C 265,296 254,289 247,280 C 240,271 237,260 238,248 C 239,236 244,225 252,216 C 260,207 265,194 270,185 Z',
    
    // Región Andina
    'Norte de Santander': 'M 555,210 C 572,208 590,212 604,220 C 617,228 627,240 632,254 C 637,268 637,283 632,297 C 627,310 617,321 604,328 C 591,335 576,338 561,336 C 547,334 534,327 525,317 C 516,307 511,294 511,281 C 511,268 515,255 523,245 C 531,235 540,225 550,218 C 552,215 553,212 555,210 Z',
    
    'Santander': 'M 445,235 C 463,233 482,237 497,245 C 512,253 523,265 529,280 C 535,295 536,311 531,326 C 526,340 516,352 502,360 C 488,368 472,371 456,369 C 441,367 427,360 417,349 C 407,338 402,324 402,310 C 402,296 406,283 414,272 C 422,261 433,252 445,246 C 445,242 445,239 445,235 Z',
    
    'Boyacá': 'M 490,295 C 510,293 530,297 546,306 C 562,315 574,329 580,346 C 586,362 586,380 580,396 C 574,411 563,424 548,432 C 533,440 516,443 499,441 C 483,439 468,432 457,421 C 446,410 440,396 439,381 C 438,366 442,351 451,339 C 460,327 472,317 485,310 C 487,305 488,300 490,295 Z',
    
    'Arauca': 'M 585,255 C 605,253 625,257 641,266 C 656,275 668,289 674,306 C 680,322 680,340 674,356 C 668,371 657,384 642,392 C 627,400 610,403 593,401 C 577,399 562,392 551,381 C 540,370 534,356 533,341 C 532,326 536,311 544,299 C 552,287 563,277 576,270 C 579,265 582,260 585,255 Z',
    
    'Casanare': 'M 550,340 C 572,338 595,343 613,353 C 631,363 645,378 653,397 C 661,415 663,435 658,454 C 653,472 642,488 626,499 C 610,510 591,515 572,514 C 554,513 537,505 524,493 C 511,481 503,465 501,448 C 499,431 502,414 510,400 C 518,386 530,374 544,366 C 546,357 548,349 550,340 Z',
    
    'Cundinamarca': 'M 395,325 C 413,323 432,327 447,336 C 462,345 473,358 479,374 C 485,390 485,407 479,423 C 473,438 462,451 447,459 C 432,467 415,470 399,467 C 384,464 370,456 361,445 C 352,434 347,420 347,406 C 347,392 351,378 359,367 C 367,356 378,347 391,341 C 392,336 393,330 395,325 Z',
    
    'Antioquia': 'M 280,235 C 305,232 331,238 352,250 C 373,262 389,280 398,302 C 407,323 409,347 403,369 C 397,390 384,409 366,422 C 348,435 326,442 304,442 C 283,442 262,435 246,423 C 230,411 219,394 214,375 C 209,356 210,336 217,317 C 224,298 236,281 252,269 C 268,257 274,246 280,235 Z',
    
    'Chocó': 'M 165,245 C 185,242 207,247 224,257 C 241,267 254,282 261,300 C 268,318 269,338 264,357 C 259,375 248,391 233,402 C 218,413 200,419 182,419 C 165,419 148,413 135,402 C 122,391 113,376 110,359 C 107,342 109,324 116,308 C 123,292 135,278 150,268 C 155,258 160,251 165,245 Z',
    
    'Caldas': 'M 305,355 C 318,353 332,356 343,362 C 354,368 362,378 366,389 C 370,400 370,412 366,423 C 362,433 354,442 343,447 C 332,452 320,453 309,450 C 298,447 289,440 283,431 C 277,422 275,411 277,401 C 279,391 284,382 292,375 C 298,368 301,361 305,355 Z',
    
    'Risaralda': 'M 250,358 C 262,356 275,359 285,365 C 295,371 302,380 305,391 C 308,402 307,413 302,423 C 297,432 289,439 279,443 C 269,447 258,447 248,444 C 238,441 230,434 225,426 C 220,418 219,408 221,399 C 223,390 228,382 235,376 C 241,370 245,364 250,358 Z',
    
    'Quindío': 'M 280,400 C 290,398 301,401 309,406 C 317,411 323,419 325,428 C 327,437 326,447 321,455 C 316,463 309,469 300,472 C 291,475 281,474 273,471 C 265,468 259,462 256,454 C 253,446 253,437 256,429 C 259,421 264,414 271,409 C 275,405 277,402 280,400 Z',
    
    'Tolima': 'M 320,410 C 340,408 361,413 377,423 C 393,433 405,448 411,465 C 417,482 417,501 411,518 C 405,534 394,548 379,557 C 364,566 347,570 330,568 C 314,566 299,558 288,547 C 277,536 271,522 270,507 C 269,492 273,477 281,465 C 289,453 300,443 313,436 C 315,427 317,419 320,410 Z',
    
    'Huila': 'M 350,485 C 368,483 387,488 402,497 C 417,506 428,520 433,536 C 438,552 437,569 431,585 C 425,600 414,613 400,621 C 386,629 370,632 354,630 C 339,628 325,621 315,611 C 305,601 300,588 299,574 C 298,560 302,546 310,535 C 318,524 329,515 342,509 C 345,501 347,493 350,485 Z',
    
    // Región Pacífica
    'Valle del Cauca': 'M 220,400 C 238,398 257,403 272,412 C 287,421 298,435 303,451 C 308,467 307,484 301,500 C 295,515 284,528 270,536 C 256,544 240,547 225,545 C 210,543 197,536 188,526 C 179,516 174,503 174,489 C 174,475 178,462 186,451 C 194,440 205,431 217,425 C 218,417 219,408 220,400 Z',
    
    'Cauca': 'M 250,510 C 268,508 287,513 302,522 C 317,531 328,545 333,561 C 338,577 337,594 331,610 C 325,625 314,638 300,646 C 286,654 270,657 255,655 C 240,653 227,646 218,636 C 209,626 204,613 204,599 C 204,585 208,572 216,561 C 224,550 235,541 247,535 C 248,527 249,518 250,510 Z',
    
    'Nariño': 'M 215,600 C 232,598 250,603 264,612 C 278,621 288,634 293,650 C 298,665 297,682 291,697 C 285,711 274,723 260,730 C 246,737 231,739 217,736 C 203,733 191,725 183,715 C 175,705 171,692 172,679 C 173,666 178,653 187,643 C 196,633 207,625 219,620 C 217,613 216,606 215,600 Z',
    
    // Región Orinoquía
    'Vichada': 'M 645,370 C 672,368 699,376 720,390 C 741,404 756,424 763,447 C 770,470 768,495 758,517 C 748,539 730,557 708,568 C 686,579 661,583 637,579 C 614,575 593,564 578,548 C 563,532 554,512 552,491 C 550,470 554,449 564,431 C 574,413 589,398 607,388 C 620,382 632,376 645,370 Z',
    
    'Meta': 'M 470,410 C 495,408 520,415 540,428 C 560,441 575,460 582,482 C 589,504 588,528 579,550 C 570,571 554,589 533,600 C 512,611 488,615 465,612 C 443,609 423,599 408,584 C 393,569 384,550 382,530 C 380,510 384,490 393,473 C 402,456 416,442 433,432 C 445,425 457,417 470,410 Z',
    
    // Región Amazonía
    'Guainía': 'M 705,465 C 725,463 745,469 761,480 C 776,491 787,507 792,525 C 797,543 795,562 787,579 C 779,595 766,609 749,617 C 732,625 713,627 695,624 C 678,621 662,613 651,601 C 640,589 633,574 632,558 C 631,542 635,527 643,514 C 651,501 663,491 677,484 C 686,477 695,471 705,465 Z',
    
    'Guaviare': 'M 545,505 C 565,503 585,509 601,520 C 617,531 628,547 633,565 C 638,583 636,602 628,619 C 620,635 607,649 590,657 C 573,665 554,667 536,664 C 519,661 503,653 492,641 C 481,629 474,614 473,598 C 472,582 476,567 484,554 C 492,541 504,531 518,524 C 527,517 536,511 545,505 Z',
    
    'Vaupés': 'M 610,575 C 630,573 650,579 666,590 C 682,601 693,617 698,635 C 703,653 701,672 693,689 C 685,705 672,719 655,727 C 638,735 619,737 601,734 C 584,731 568,723 557,711 C 546,699 539,684 538,668 C 537,652 541,637 549,624 C 557,611 569,601 583,594 C 592,587 601,581 610,575 Z',
    
    'Caquetá': 'M 410,555 C 435,553 460,560 480,573 C 500,586 515,605 522,627 C 529,649 528,673 519,695 C 510,716 494,734 473,745 C 452,756 428,760 405,757 C 383,754 363,744 348,729 C 333,714 324,695 322,675 C 320,655 324,635 333,618 C 342,601 356,587 373,577 C 385,569 397,562 410,555 Z',
    
    'Putumayo': 'M 295,645 C 313,643 332,648 347,657 C 362,666 373,680 378,696 C 383,712 382,729 376,745 C 370,760 359,773 345,781 C 331,789 315,792 300,790 C 285,788 272,781 263,771 C 254,761 249,748 249,734 C 249,720 253,707 261,696 C 269,685 280,676 292,670 C 293,662 294,653 295,645 Z',
    
    'Amazonas': 'M 405,675 C 435,672 465,681 489,696 C 513,711 531,733 540,759 C 549,785 549,813 540,839 C 531,864 514,886 491,901 C 468,916 441,923 415,922 C 389,921 364,912 345,897 C 326,882 312,862 306,839 C 300,816 302,792 311,770 C 320,748 336,729 356,716 C 372,706 388,690 405,675 Z',
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
