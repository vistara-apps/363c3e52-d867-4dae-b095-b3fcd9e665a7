'use client';

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant?: 'guide' | 'script' | 'record' | 'premium';
  onClick?: () => void;
  disabled?: boolean;
  premium?: boolean;
}

export function ActionCard({ 
  title, 
  description, 
  icon, 
  variant = 'guide',
  onClick,
  disabled = false,
  premium = false
}: ActionCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'record':
        return 'border-red-500 bg-red-500 bg-opacity-10 hover:bg-opacity-20';
      case 'script':
        return 'border-accent bg-accent bg-opacity-10 hover:bg-opacity-20';
      case 'premium':
        return 'border-purple-500 bg-purple-500 bg-opacity-10 hover:bg-opacity-20';
      default:
        return 'border-primary bg-primary bg-opacity-10 hover:bg-opacity-20';
    }
  };

  return (
    <div 
      className={`
        glass-card p-4 cursor-pointer transition-all duration-200 hover:scale-105
        ${getVariantStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary mb-1 flex items-center">
              {title}
              {premium && (
                <span className="ml-2 px-2 py-1 text-xs bg-purple-600 text-white rounded-full">
                  Premium
                </span>
              )}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-text-secondary flex-shrink-0 ml-2" />
      </div>
    </div>
  );
}
