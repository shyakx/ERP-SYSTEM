import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Security Department Pages
import GuardOverview from './pages/GuardOverview';
import GuardAssignment from './pages/GuardAssignment';
import PatrolSchedules from './pages/PatrolSchedules';
import IncidentReports from './pages/IncidentReports';
import Training from './pages/Training';
import Performance from './pages/Performance';

const SecurityGuardManagementDashboard: React.FC = () => {
  const colorScheme = getColorScheme('security');
  const location = useLocation();

  const securityStats = [
    { title: 'Active Guards', value: '89', subtitle: 'On Duty', color: 'blue', icon: '🛡️', trend: { value: '+5', isPositive: true }, delay: 0 },
    { title: 'Patrol Routes', value: '12', subtitle: 'Active', color: 'green', icon: '🚶', trend: { value: '+2', isPositive: true }, delay: 100 },
    { title: 'Incidents', value: '3', subtitle: 'This Week', color: 'orange', icon: '⚠️', trend: { value: '-1', isPositive: true }, delay: 200 },
    { title: 'Training Hours', value: '156', subtitle: 'This Month', color: 'purple', icon: '📚', trend: { value: '+12', isPositive: true }, delay: 300 }
  ];

  const recentIncidents = [
    {
      id: 1,
      title: 'Suspicious Activity',
      location: 'Main Gate',
      guard: 'Jean Pierre',
      severity: 'Low',
      status: 'Resolved',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Unauthorized Access Attempt',
      location: 'Building A',
      guard: 'Emmanuel',
      severity: 'Medium',
      status: 'Under Investigation',
      date: '2024-02-14'
    },
    {
      id: 3,
      title: 'Equipment Malfunction',
      location: 'Security Room',
      guard: 'Marie Claire',
      severity: 'Low',
      status: 'Resolved',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/security', icon: '🏠' },
    { name: 'Overview', path: '/security/overview', icon: '📊' },
    { name: 'Guard Assignment', path: '/security/assignment', icon: '👥' },
    { name: 'Patrols', path: '/security/patrols', icon: '🚶' },
    { name: 'Incidents', path: '/security/incidents', icon: '🚨' },
    { name: 'Training', path: '/security/training', icon: '📚' },
    { name: 'Performance', path: '/security/performance', icon: '📈' },
    { name: 'Equipment', path: '/security/equipment', icon: '🛡️' },
    { name: 'Reports', path: '/security/reports', icon: '📋' },
    { name: 'Settings', path: '/security/settings', icon: '⚙️' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600';
      case 'Under Investigation': return 'text-blue-600';
      case 'Pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Security Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat, index) => (
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

      {/* Recent Incidents */}
      <AnimatedCard
        title="Recent Incidents"
        subtitle="Latest security incidents"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 text-sm">⚠️</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{incident.title}</p>
                  <p className="text-sm text-gray-500">{incident.location} • {incident.guard}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
                <p className={`text-xs mt-1 ${getStatusColor(incident.status)}`}>{incident.status}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common security tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">👥</span>
            <span className="text-sm font-medium text-gray-700">Assign Guard</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">🚶</span>
            <span className="text-sm font-medium text-gray-700">Schedule Patrol</span>
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
            <span className="text-orange-600">📚</span>
            <span className="text-sm font-medium text-gray-700">Training</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Security Overview */}
      <AnimatedCard
        title="Security Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Guard Performance</h4>
            <AnimatedProgressBar
              progress={92}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Incident Response</h4>
            <AnimatedProgressBar
              progress={95}
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
      case '/security':
        return <DashboardContent />;
      case '/security/overview':
        return <GuardOverview />;
      case '/security/assignment':
        return <GuardAssignment />;
      case '/security/patrols':
        return <PatrolSchedules />;
      case '/security/incidents':
        return <IncidentReports />;
      case '/security/training':
        return <Training />;
      case '/security/performance':
        return <Performance />;
      case '/security/equipment':
      case '/security/reports':
      case '/security/settings':
        return <GuardOverview />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Security Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default SecurityGuardManagementDashboard; 