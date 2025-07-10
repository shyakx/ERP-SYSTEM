import React from 'react';
import * as Icons from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' | 'orange';
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, trend }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Icons.Circle className="w-6 h-6" />;
  };

  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50',
    green: 'bg-green-500 text-green-600 bg-green-50',
    yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50',
    red: 'bg-red-500 text-red-600 bg-red-50',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50',
    indigo: 'bg-indigo-500 text-indigo-600 bg-indigo-50',
    orange: 'bg-orange-500 text-orange-600 bg-orange-50'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <Icons.TrendingUp className={`w-4 h-4 ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'} ml-1`}>
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color].split(' ')[2]} flex items-center justify-center`}>
          <div className={`${colorClasses[color].split(' ')[1]}`}>
            {getIcon(icon)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;