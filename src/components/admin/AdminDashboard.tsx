import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../shared/DepartmentLayout';
import { getColorScheme } from '../../utils/colorSchemes';

// Admin Dashboard Pages
import AdminHome from './pages/AdminHome';
import UserManagement from './pages/UserManagement';
import DepartmentMiniDashboards from './pages/DepartmentMiniDashboards';
import AuditLogs from './pages/AuditLogs';
import ReportsAnalytics from './pages/ReportsAnalytics';
import SystemSettings from './pages/SystemSettings';

const AdminDashboard: React.FC = () => {
  const colorScheme = getColorScheme('admin');
  const location = useLocation();

  const sidebarItems = [
    { name: 'Control Center', path: '/admin', icon: '🏠' },
    { name: 'User & Role Management', path: '/admin/users', icon: '👥' },
    { name: 'Department Mini-Dashboards', path: '/admin/departments', icon: '🏢' },
    { name: 'Audit & Logs', path: '/admin/audit', icon: '📋' },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: '📊' },
    { name: 'System Settings', path: '/admin/settings', icon: '⚙️' }
  ];

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/admin':
      case '/admin/home':
        return <AdminHome />;
      case '/admin/users':
        return <UserManagement />;
      case '/admin/departments':
        return <DepartmentMiniDashboards />;
      case '/admin/audit':
        return <AuditLogs />;
      case '/admin/reports':
        return <ReportsAnalytics />;
      case '/admin/settings':
        return <SystemSettings />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <DepartmentLayout
      title="Admin Control Center"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default AdminDashboard; 