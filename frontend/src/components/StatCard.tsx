import React from 'react';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, colorClass = '' }) => (
  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-gray-600 mb-0.5">{label}</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
      </div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-opacity-10 ${colorClass}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard; 