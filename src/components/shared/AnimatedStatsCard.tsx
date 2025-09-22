import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnimatedStatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  icon?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
}

const AnimatedStatsCard: React.FC<AnimatedStatsCardProps> = ({
  title,
  value,
  subtitle,
  color,
  icon,
  trend
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
    <div className={`${getColorClasses(color)} rounded-lg p-4 text-white shadow-md`}>
      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold opacity-90">{title}</h3>
          {icon && (
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-lg">{icon}</span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <p className="text-2xl sm:text-3xl font-bold">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs opacity-90">{subtitle}</p>
          {trend && (
            <div className={`flex items-center space-x-1 text-xs ${
              trend.isPositive ? 'text-green-200' : 'text-red-200'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedStatsCard; 