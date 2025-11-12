import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  ariaLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  onClick,
  ariaLabel,
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-200';
  
  const variants = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
    outlined: 'bg-white border-2 border-gray-200 hover:border-primary-500',
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
