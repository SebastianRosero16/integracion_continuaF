import React from 'react';

interface ShapeViewerProps {
  type: 'triangle' | 'rectangle' | 'square' | 'circle' | 'polygon';
  dimensions: Record<string, number>;
  className?: string;
}

export const ShapeViewer: React.FC<ShapeViewerProps> = ({ type, dimensions, className }) => {
  const renderShape = () => {
    switch (type) {
      case 'square':
        return (
          <svg viewBox="0 0 200 200" className={className}>
            <rect
              x="50"
              y="50"
              width="100"
              height="100"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            <text x="100" y="105" textAnchor="middle" className="text-sm font-bold" fill="#1e40af">
              {dimensions.side || '?'}
            </text>
          </svg>
        );

      case 'rectangle':
        return (
          <svg viewBox="0 0 200 200" className={className}>
            <rect
              x="40"
              y="60"
              width="120"
              height="80"
              fill="#10b981"
              fillOpacity="0.3"
              stroke="#10b981"
              strokeWidth="3"
            />
            <text x="100" y="105" textAnchor="middle" className="text-sm font-bold" fill="#047857">
              {dimensions.length || '?'} × {dimensions.width || '?'}
            </text>
          </svg>
        );

      case 'circle':
        return (
          <svg viewBox="0 0 200 200" className={className}>
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="#f59e0b"
              fillOpacity="0.3"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            <line x1="100" y1="100" x2="160" y2="100" stroke="#d97706" strokeWidth="2" />
            <text x="130" y="95" textAnchor="middle" className="text-sm font-bold" fill="#92400e">
              r={dimensions.radius || '?'}
            </text>
          </svg>
        );

      case 'triangle':
        return (
          <svg viewBox="0 0 200 200" className={className}>
            <polygon
              points="100,40 40,160 160,160"
              fill="#8b5cf6"
              fillOpacity="0.3"
              stroke="#8b5cf6"
              strokeWidth="3"
            />
            {dimensions.base && dimensions.height && (
              <>
                <line x1="100" y1="40" x2="100" y2="160" stroke="#6d28d9" strokeWidth="2" strokeDasharray="4" />
                <text x="110" y="100" className="text-sm font-bold" fill="#5b21b6">
                  h={dimensions.height}
                </text>
                <text x="100" y="175" textAnchor="middle" className="text-sm font-bold" fill="#5b21b6">
                  b={dimensions.base}
                </text>
              </>
            )}
          </svg>
        );

      case 'polygon': {
        const { sides = 6 } = dimensions;
        const numSides = Math.max(3, Math.min(12, sides)); // Limitar entre 3 y 12 lados
        const angle = (2 * Math.PI) / numSides;
        // Usar un radio fijo que siempre quepa en el viewBox
        const fixedRadius = 70; // Radio fijo para que siempre se vea bien
        const points = Array.from({ length: numSides }, (_, i) => {
          const x = 100 + fixedRadius * Math.cos(i * angle - Math.PI / 2);
          const y = 100 + fixedRadius * Math.sin(i * angle - Math.PI / 2);
          return `${x},${y}`;
        }).join(' ');

        return (
          <svg viewBox="0 0 200 200" className={className}>
            <polygon
              points={points}
              fill="#ec4899"
              fillOpacity="0.3"
              stroke="#ec4899"
              strokeWidth="3"
            />
            <text x="100" y="110" textAnchor="middle" className="text-sm font-bold" fill="#be185d">
              {numSides} lados
            </text>
          </svg>
        );
      }

      default:
        return null;
    }
  };

  return <div className="w-full max-w-md mx-auto">{renderShape()}</div>;
};
