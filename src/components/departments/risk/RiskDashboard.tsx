import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Risk Department Pages
import RiskOverview from './pages/RiskOverview';
import RiskAssessment from './pages/RiskAssessment';
import ThreatAnalysis from './pages/ThreatAnalysis';
import RiskReports from './pages/RiskReports';
import MitigationPlans from './pages/MitigationPlans';
import Alerts from './pages/Alerts';
import Reporting from './pages/Reporting';
import Mitigation from './pages/Mitigation';
import Monitoring from './pages/Monitoring';
import IncidentManagement from './pages/IncidentManagement';
import Compliance from './pages/Compliance';

const RiskDashboard: React.FC = () => {
  const colorScheme = getColorScheme('risk');
  const location = useLocation();

  const riskStats = [
    { title: 'Active Risks', value: '12', subtitle: 'Identified', color: 'red', icon: '⚠️', trend: { value: '-3', isPositive: true }, delay: 0 },
    { title: 'Mitigation Plans', value: '8', subtitle: 'In Progress', color: 'green', icon: '🛡️', trend: { value: '+2', isPositive: true }, delay: 100 },
    { title: 'Compliance Score', value: '96.5%', subtitle: 'Overall', color: 'blue', icon: '📋', trend: { value: '+1.2%', isPositive: true }, delay: 200 },
    { title: 'Incidents', value: '3', subtitle: 'This Month', color: 'orange', icon: '🚨', trend: { value: '-1', isPositive: true }, delay: 300 }
  ];

  const recentAlerts = [
    {
      id: 1,
      title: 'Security Vulnerability Detected',
      severity: 'High',
      status: 'Under Investigation',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Compliance Deadline Approaching',
      severity: 'Medium',
      status: 'In Progress',
      date: '2024-02-14'
    },
    {
      id: 3,
      title: 'Risk Assessment Required',
      severity: 'Low',
      status: 'Pending',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/risk', icon: '🏠' },
    { name: 'Overview', path: '/risk/overview', icon: '📊' },
    { name: 'Assessment', path: '/risk/assessment', icon: '🔍' },
    { name: 'Threats', path: '/risk/threats', icon: '⚠️' },
    { name: 'Reports', path: '/risk/reports', icon: '📈' },
    { name: 'Mitigation', path: '/risk/mitigation', icon: '🛡️' },
    { name: 'Alerts', path: '/risk/alerts', icon: '🚨' },
    { name: 'Reporting', path: '/risk/reporting', icon: '📋' },
    { name: 'Monitoring', path: '/risk/monitoring', icon: '👁️' },
    { name: 'Incidents', path: '/risk/incidents', icon: '🚨' },
    { name: 'Compliance', path: '/risk/compliance', icon: '✅' }
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
      case 'In Progress': return 'text-orange-600';
      case 'Pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Risk Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskStats.map((stat, index) => (
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

      {/* Recent Alerts */}
      <AnimatedCard
        title="Recent Alerts"
        subtitle="Latest risk notifications"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-sm">🚨</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-500">Risk Alert</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
                <p className={`text-xs mt-1 ${getStatusColor(alert.status)}`}>{alert.status}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common risk management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <span className="text-red-600">⚠️</span>
            <span className="text-sm font-medium text-gray-700">New Risk Assessment</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">🛡️</span>
            <span className="text-sm font-medium text-gray-700">Create Mitigation Plan</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">📋</span>
            <span className="text-sm font-medium text-gray-700">Compliance Check</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Risk Overview */}
      <AnimatedCard
        title="Risk Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Risk Levels</h4>
            <AnimatedProgressBar
              progress={75}
              color="red"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={60}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Compliance Status</h4>
            <AnimatedProgressBar
              progress={96}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
              color="blue"
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
      case '/risk':
        return <DashboardContent />;
      case '/risk/overview':
        return <RiskOverview />;
      case '/risk/assessment':
        return <RiskAssessment />;
      case '/risk/threats':
        return <ThreatAnalysis />;
      case '/risk/reports':
        return <RiskReports />;
      case '/risk/mitigation':
        return <MitigationPlans />;
      case '/risk/alerts':
        return <Alerts />;
      case '/risk/reporting':
        return <Reporting />;
      case '/risk/monitoring':
        return <Monitoring />;
      case '/risk/incidents':
        return <IncidentManagement />;
      case '/risk/compliance':
        return <Compliance />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Risk Management Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default RiskDashboard;
