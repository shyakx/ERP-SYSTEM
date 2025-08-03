import React from 'react';

interface AnimatedTableProps {
  headers: string[];
  children: React.ReactNode;
  title?: string;
  colorScheme?: string;
}

const AnimatedTable: React.FC<AnimatedTableProps> = ({
  headers,
  children,
  title,
  colorScheme = 'blue'
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      red: 'bg-red-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      indigo: 'bg-indigo-500 text-white',
      pink: 'bg-pink-500 text-white',
      orange: 'bg-orange-500 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider transition-all duration-200"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {React.Children.map(children, (child, index) => (
              <tr
                key={index}
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {child}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Animated Table Row Component
interface AnimatedTableRowProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedTableRow: React.FC<AnimatedTableRowProps> = ({
  children,
  delay = 0
}) => {
  return (
    <tr
      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </tr>
  );
};

// Animated Table Cell Component
interface AnimatedTableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTableCell: React.FC<AnimatedTableCellProps> = ({
  children,
  className = "px-6 py-4 whitespace-nowrap text-sm text-gray-900"
}) => {
  return (
    <td className={`${className} transition-all duration-200 hover:text-gray-700`}>
      {children}
    </td>
  );
};

export default AnimatedTable; 