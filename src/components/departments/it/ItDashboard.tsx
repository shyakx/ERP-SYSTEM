import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// IT Department Pages
import ITOverview from './pages/ITOverview';
import SystemManagement from './pages/SystemManagement';
import UserSupport from './pages/UserSupport';
import Network from './pages/Network';
import Security from './pages/Security';
import Maintenance from './pages/Maintenance';

const ItDashboard: React.FC = () => {
  const colorScheme = getColorScheme('it');
  const location = useLocation();

  const itStats = [
    { title: 'Active Systems', value: '24', subtitle: 'Running', color: 'blue', icon: '🖥️', trend: { value: '+2', isPositive: true }, delay: 0 },
    { title: 'Network Status', value: '100%', subtitle: 'Uptime', color: 'green', icon: '🌐', trend: { value: 'Stable', isPositive: true }, delay: 100 },
    { title: 'Support Tickets', value: '8', subtitle: 'Open', color: 'orange', icon: '🎫', trend: { value: '-3', isPositive: true }, delay: 200 },
    { title: 'Security Alerts', value: '2', subtitle: 'Low Risk', color: 'red', icon: '🔒', trend: { value: 'Resolved', isPositive: true }, delay: 300 }
  ];

  const recentTickets = [
    {
      id: 1,
      title: 'Network Connectivity Issue',
      user: 'Jean Pierre',
      department: 'Finance',
      priority: 'High',
      status: 'In Progress',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Software Installation Request',
      user: 'Marie Claire',
      department: 'HR',
      priority: 'Medium',
      status: 'Pending',
      date: '2024-02-14'
    },
    {
      id: 3,
      title: 'Email Configuration',
      user: 'Emmanuel',
      department: 'Operations',
      priority: 'Low',
      status: 'Resolved',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/it', icon: '🏠' },
    { name: 'Overview', path: '/it/overview', icon: '📊' },
    { name: 'Systems', path: '/it/systems', icon: '💻' },
    { name: 'Support', path: '/it/support', icon: '🛠️' },
    { name: 'Network', path: '/it/network', icon: '🌐' },
    { name: 'Security', path: '/it/security', icon: '🔒' },
    { name: 'Maintenance', path: '/it/maintenance', icon: '🔧' },
    { name: 'Backup', path: '/it/backup', icon: '💾' },
    { name: 'Software', path: '/it/software', icon: '📱' },
    { name: 'Reports', path: '/it/reports', icon: '📈' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'Pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* IT Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {itStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Support Tickets */}
      <AnimatedCard
        title="Recent Support Tickets"
        subtitle="Latest IT support requests"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🎫</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{ticket.title}</p>
                  <p className="text-sm text-gray-500">{ticket.user} • {ticket.department}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <p className={`text-xs mt-1 ${getStatusColor(ticket.status)}`}>{ticket.status}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common IT tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">🖥️</span>
            <span className="text-sm font-medium text-gray-700">System Check</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">🔧</span>
            <span className="text-sm font-medium text-gray-700">Maintenance</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">🔒</span>
            <span className="text-sm font-medium text-gray-700">Security Scan</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* System Overview */}
      <AnimatedCard
        title="System Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">System Performance</h4>
            <AnimatedProgressBar
              progress={85}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Network Status</h4>
            <AnimatedProgressBar
              progress={100}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={78}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/it':
        return <DashboardContent />;
      case '/it/overview':
        return <ITOverview />;
      case '/it/systems':
        return <SystemManagement />;
      case '/it/support':
        return <UserSupport />;
      case '/it/network':
        return <Network />;
      case '/it/security':
        return <Security />;
      case '/it/maintenance':
        return <Maintenance />;
      case '/it/backup':
      case '/it/software':
      case '/it/reports':
        return <ITOverview />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="IT Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default ItDashboard;
