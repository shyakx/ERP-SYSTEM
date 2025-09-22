import React from 'react';

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
  onClick
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-600',
      indigo: 'bg-indigo-600',
      pink: 'bg-pink-600',
      orange: 'bg-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {/* Content */}
      <div className="p-4">
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
              <div className={`w-10 h-10 rounded-lg ${getColorClasses(color)} flex items-center justify-center`}>
                <span className="text-white text-lg">{icon}</span>
              </div>
            )}
          </div>
        )}

        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

// Professional Button Component
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
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      red: 'bg-red-600 hover:bg-red-700',
      yellow: 'bg-yellow-600 hover:bg-yellow-700',
      indigo: 'bg-indigo-600 hover:bg-indigo-700',
      pink: 'bg-pink-600 hover:bg-pink-700',
      orange: 'bg-orange-600 hover:bg-orange-700'
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
      className={`${getColorClasses(color)} ${getSizeClasses(size)} text-white font-medium rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Professional Progress Bar Component
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
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-600',
      indigo: 'bg-indigo-600',
      pink: 'bg-pink-600',
      orange: 'bg-orange-600'
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
          className={`${getColorClasses(color)} h-${height} rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedCard; 