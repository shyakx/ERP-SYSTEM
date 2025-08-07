import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Recovery Department Pages
import RecoveryOverview from './pages/RecoveryOverview';
import Investigation from './pages/Investigation';
import CaseManagement from './pages/CaseManagement';
import Documentation from './pages/Documentation';
import Legal from './pages/Legal';
import Reports from './pages/Reports';
import AssetRecovery from './pages/AssetRecovery';
import Forensics from './pages/Forensics';

const RecoveryDashboard: React.FC = () => {
  const colorScheme = getColorScheme('recovery');
  const location = useLocation();

  const recoveryStats = [
    { title: 'Active Cases', value: '8', subtitle: 'In Progress', color: 'blue', icon: '📋', trend: { value: '+2', isPositive: true }, delay: 0 },
    { title: 'Recovered Assets', value: '156', subtitle: 'This Year', color: 'green', icon: '💰', trend: { value: '+23', isPositive: true }, delay: 100 },
    { title: 'Success Rate', value: '87.5%', subtitle: 'Overall', color: 'purple', icon: '📈', trend: { value: '+2.3%', isPositive: true }, delay: 200 },
    { title: 'Legal Cases', value: '12', subtitle: 'Active', color: 'orange', icon: '⚖️', trend: { value: '+1', isPositive: true }, delay: 300 }
  ];

  const recentCases = [
    {
      id: 1,
      title: 'Asset Recovery Case #RC-2024-001',
      client: 'Kigali Business Center',
      status: 'In Progress',
      value: '45M RWF',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Forensic Investigation #FI-2024-002',
      client: 'ABC Corporation',
      status: 'Under Review',
      value: '12M RWF',
      date: '2024-02-14'
    },
    {
      id: 3,
      title: 'Legal Recovery #LR-2024-003',
      client: 'Tech Solutions Ltd',
      status: 'Completed',
      value: '28M RWF',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/recovery', icon: '🏠' },
    { name: 'Overview', path: '/recovery/overview', icon: '📊' },
    { name: 'Investigation', path: '/recovery/investigation', icon: '🔍' },
    { name: 'Case Management', path: '/recovery/cases', icon: '📁' },
    { name: 'Documentation', path: '/recovery/documentation', icon: '📄' },
    { name: 'Legal', path: '/recovery/legal', icon: '⚖️' },
    { name: 'Reports', path: '/recovery/reports', icon: '📈' },
    { name: 'Asset Recovery', path: '/recovery/assets', icon: '💰' },
    { name: 'Forensics', path: '/recovery/forensics', icon: '🔬' },
    { name: 'Settings', path: '/recovery/settings', icon: '⚙️' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Under Review': return 'text-orange-600 bg-orange-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Recovery Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recoveryStats.map((stat, index) => (
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

      {/* Recent Cases */}
      <AnimatedCard
        title="Recent Cases"
        subtitle="Latest recovery activities"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📋</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{caseItem.title}</p>
                  <p className="text-sm text-gray-500">{caseItem.client} • {caseItem.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{caseItem.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common recovery tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📋</span>
            <span className="text-sm font-medium text-gray-700">New Case</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">🔍</span>
            <span className="text-sm font-medium text-gray-700">Start Investigation</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">💰</span>
            <span className="text-sm font-medium text-gray-700">Asset Recovery</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">⚖️</span>
            <span className="text-sm font-medium text-gray-700">Legal Action</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Recovery Overview */}
      <AnimatedCard
        title="Recovery Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Case Success Rate</h4>
            <AnimatedProgressBar
              progress={87}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
              color="blue"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Asset Recovery</h4>
            <AnimatedProgressBar
              progress={78}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={85}
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
      case '/recovery':
        return <DashboardContent />;
      case '/recovery/overview':
        return <RecoveryOverview />;
      case '/recovery/investigation':
        return <Investigation />;
      case '/recovery/cases':
        return <CaseManagement />;
      case '/recovery/documentation':
        return <Documentation />;
      case '/recovery/legal':
        return <Legal />;
      case '/recovery/reports':
        return <Reports />;
      case '/recovery/assets':
        return <AssetRecovery />;
      case '/recovery/forensics':
        return <Forensics />;
      case '/recovery/settings':
        return <RecoveryOverview />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Recovery Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default RecoveryDashboard;
