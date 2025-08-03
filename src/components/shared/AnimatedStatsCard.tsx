import React, { useState, useEffect } from 'react';

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
  trend,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && typeof value === 'number') {
      const target = value;
      const increment = target / 50;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 20);

      return () => clearInterval(timer);
    } else if (isVisible) {
      setCount(value as number);
    }
  }, [isVisible, value]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-4 text-white shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        animationDelay: `${delay}ms`,
        zIndex: 1
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mt-12 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full -ml-10 -mb-10 animate-pulse animation-delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold opacity-90">{title}</h3>
          {icon && (
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">{icon}</span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <p className="text-2xl sm:text-3xl font-bold">
            {typeof value === 'number' ? count.toLocaleString() : value}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs opacity-90">{subtitle}</p>
          {trend && (
            <div className={`flex items-center space-x-1 text-xs ${
              trend.isPositive ? 'text-green-200' : 'text-red-200'
            }`}>
              <span className={trend.isPositive ? 'text-green-200' : 'text-red-200'}>
                {trend.isPositive ? '↗' : '↘'}
              </span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-white/20 animate-pulse"></div>
    </div>
  );
};

export default AnimatedStatsCard; 