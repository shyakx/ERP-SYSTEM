import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../shared/DepartmentLayout';
import { getColorScheme } from '../../utils/colorSchemes';

// Admin Dashboard Pages
import AdminOverview from './pages/AdminOverview';
import DepartmentManagement from './pages/DepartmentManagement';
import SystemSettings from './pages/SystemSettings';
import UserManagement from './pages/UserManagement';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';

const AdminDashboard: React.FC = () => {
  const colorScheme = getColorScheme('admin');
  const location = useLocation();

  const sidebarItems = [
    { name: 'Admin Dashboard', path: '/admin', icon: '🏠' },
    { name: 'Department Management', path: '/admin/departments', icon: '🏢' },
    { name: 'User Management', path: '/admin/users', icon: '👥' },
    { name: 'System Reports', path: '/admin/reports', icon: '📊' },
    { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'System Settings', path: '/admin/settings', icon: '⚙️' }
  ];

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/admin':
      case '/admin/overview':
        return <AdminOverview />;
      case '/admin/departments':
        return <DepartmentManagement />;
      case '/admin/users':
        return <UserManagement />;
      case '/admin/reports':
        return <Reports />;
      case '/admin/analytics':
        return <Analytics />;
      case '/admin/settings':
        return <SystemSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <DepartmentLayout
      title="Admin Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default AdminDashboard; 