'use client';

import { AlertTriangle, Info, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  variant?: 'warning' | 'info';
  title: string;
  message: string;
  dismissible?: boolean;
}

export function AlertBanner({ 
  variant = 'info', 
  title, 
  message, 
  dismissible = true 
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-500 bg-opacity-10 border-yellow-500 text-yellow-400';
      default:
        return 'bg-blue-500 bg-opacity-10 border-blue-500 text-blue-400';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className={`glass-card p-4 border ${getVariantStyles()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-gray-700 rounded transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
