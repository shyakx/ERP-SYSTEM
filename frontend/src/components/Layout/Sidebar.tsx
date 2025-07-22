import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuItems, roleDisplayNames } from '../../config/menu';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import * as Icons from 'lucide-react';

const financeMenuIds = [
  'dashboard',
  'payroll',
  'invoicing',
  'expenses',
  'finance-payroll',
  'payslips',
  'finance-reports',
  'general-reports',
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.Circle className="w-5 h-5" />;
  };

  // Only show finance-related menu items
  const filteredMenuItems = menuItems.filter(item =>
    financeMenuIds.includes(item.id) && user && authService.hasRole(user, item.roles)
  );

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col justify-between shadow-lg" style={{backgroundColor: '#111827'}}>
      {/* Company Logo */}
      <div className="p-6 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Company Logo" className="w-10 h-10 rounded-lg bg-white object-contain border-2 border-blue-600 shadow" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">DICEL SECURITY</h1>
            <p className="text-xs text-gray-400">ERP System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-gray-400">
              {user?.role ? roleDisplayNames[user.role] : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 bg-gray-900">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive || location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
          >
            {getIcon(item.icon)}
            <span className="text-sm font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* System Info pinned to bottom */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="text-xs text-gray-400">
          <p>Version 1.0.0</p>
          <p>© 2024 DICEL Security</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;