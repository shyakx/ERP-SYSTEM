import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuItems, roleDisplayNames } from '../../config/menu';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import * as Icons from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.Circle className="w-5 h-5" />;
  };

  const filteredMenuItems = menuItems.filter(item => 
    user && authService.hasRole(user, item.roles)
  );

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Company Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icons.Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">DICEL SECURITY</h1>
            <p className="text-xs text-gray-400">ERP System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
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
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
              ${isActive || location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }
            `}
          >
            {getIcon(item.icon)}
            <span className="text-sm font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* System Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <p>Version 1.0.0</p>
          <p>© 2024 DICEL Security</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;