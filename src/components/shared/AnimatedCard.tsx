import React, { useState } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  color?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  title,
  subtitle,
  color = 'blue',
  icon,
  className = '',
  onClick,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600',
      indigo: 'from-indigo-500 to-indigo-600',
      pink: 'from-pink-500 to-pink-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        zIndex: 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
      
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r ${getColorClasses(color)} opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-20' : ''
      }`}></div>

      {/* Content */}
      <div className="relative z-10 p-4">
        {(title || icon) && (
          <div className="flex items-center justify-between mb-3">
            {title && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                {subtitle && (
                  <p className="text-xs text-gray-500">{subtitle}</p>
                )}
              </div>
            )}
            {icon && (
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getColorClasses(color)} flex items-center justify-center shadow-lg transform transition-transform duration-200 ${
                isHovered ? 'scale-110 rotate-12' : ''
              }`}>
                <span className="text-white text-lg">{icon}</span>
              </div>
            )}
          </div>
        )}

        <div className="transform transition-transform duration-300">
          {children}
        </div>
      </div>

      {/* Animated Shine Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-500 ${
        isHovered ? 'opacity-20' : ''
      }`} style={{
        transform: 'translateX(-100%)',
        animation: isHovered ? 'shine 1s ease-in-out' : 'none'
      }}></div>
    </div>
  );
};

// Animated Button Component
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  color = 'blue',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
      red: 'bg-red-500 hover:bg-red-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      indigo: 'bg-indigo-500 hover:bg-indigo-600',
      pink: 'bg-pink-500 hover:bg-pink-600',
      orange: 'bg-orange-500 hover:bg-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSizeClasses = (size: string) => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2 text-sm'
    };
    return sizes[size as keyof typeof sizes] || sizes.md;
  };

  return (
    <button
      className={`${getColorClasses(color)} ${getSizeClasses(size)} text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ zIndex: 1 }}
    >
      {children}
    </button>
  );
};

// Animated Progress Bar Component
interface AnimatedProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  color = 'blue',
  height = 6,
  showLabel = false
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      indigo: 'bg-indigo-500',
      pink: 'bg-pink-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${getColorClasses(color)} h-${height} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedCard; 