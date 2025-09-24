import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';

// IT Department Pages
import ITOverview from './pages/ITOverview';
import SystemManagement from './pages/SystemManagement';
import NetworkInfrastructure from './pages/NetworkInfrastructure';
import SecurityManagement from './pages/SecurityManagement';
import UserSupport from './pages/UserSupport';
import ITReports from './pages/ITReports';
import ITSettings from './pages/ITSettings';

const ITDashboard: React.FC = () => {
  const location = useLocation();

  const sidebarItems = [
    { name: 'Dashboard', path: '/it', icon: '🏠' },
    { name: 'Overview', path: '/it/overview', icon: '📊' },
    { name: 'System Management', path: '/it/systems', icon: '💻' },
    { name: 'Network Infrastructure', path: '/it/network', icon: '🌐' },
    { name: 'Security Management', path: '/it/security', icon: '🔒' },
    { name: 'User Support', path: '/it/support', icon: '🎧' },
    { name: 'IT Reports', path: '/it/reports', icon: '📈' },
    { name: 'Settings', path: '/it/settings', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (location.pathname) {
      case '/it':
        return <ITOverview />;
      case '/it/overview':
        return <ITOverview />;
      case '/it/systems':
        return <SystemManagement />;
      case '/it/network':
        return <NetworkInfrastructure />;
      case '/it/security':
        return <SecurityManagement />;
      case '/it/support':
        return <UserSupport />;
      case '/it/reports':
        return <ITReports />;
      case '/it/settings':
        return <ITSettings />;
      default:
        return <ITOverview />;
    }
  };

  return (
    <DepartmentLayout
      title="IT Department"
      subtitle="Information Technology Management"
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default ITDashboard;
