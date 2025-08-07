import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedStatsCard from '../../shared/AnimatedStatsCard';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// HR Department Pages
import EmployeeManagement from './pages/EmployeeManagement';
import Recruitment from './pages/Recruitment';
import Training from './pages/Training';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import LeaveManagement from './pages/LeaveManagement';
import Attendance from './pages/Attendance';
import HROverview from './pages/HROverview';

const HRDashboard: React.FC = () => {
  const colorScheme = getColorScheme('hr');
  const location = useLocation();

  const statsData = [
    {
      title: 'Total Employees',
      value: 127,
      subtitle: '+12% from last month',
      color: '#3b82f6',
      icon: '👥',
      trend: { value: '+12%', isPositive: true },
      delay: 0
    },
    {
      title: 'Active Guards',
      value: 89,
      subtitle: '+8% from last month',
      color: '#10b981',
      icon: '🛡️',
      trend: { value: '+8%', isPositive: true },
      delay: 100
    },
    {
      title: 'New Hires',
      value: 15,
      subtitle: 'This month',
      color: '#8b5cf6',
      icon: '🎯',
      trend: { value: '+15%', isPositive: true },
      delay: 200
    },
    {
      title: 'Training Sessions',
      value: 8,
      subtitle: 'This week',
      color: '#f59e0b',
      icon: '📚',
      trend: { value: '+25%', isPositive: true },
      delay: 300
    }
  ];

  const recentEmployees = [
    {
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      location: 'Kigali, Rwanda',
      status: 'Active',
      avatar: 'JU'
    },
    {
      name: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      location: 'Kigali, Rwanda',
      status: 'Active',
      avatar: 'MN'
    },
    {
      name: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      location: 'Huye, Rwanda',
      status: 'Active',
      avatar: 'EN'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Employee',
      description: 'Register a new team member',
      icon: '➕',
      color: 'blue'
    },
    {
      title: 'Schedule Training',
      description: 'Organize training sessions',
      icon: '📅',
      color: 'green'
    },
    {
      title: 'Generate Reports',
      description: 'Create HR analytics',
      icon: '📊',
      color: 'purple'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/hr', icon: '🏠' },
    { name: 'Employee Management', path: '/hr/employees', icon: '👥' },
    { name: 'Recruitment', path: '/hr/recruitment', icon: '🎯' },
    { name: 'Training', path: '/hr/training', icon: '📚' },
    { name: 'Payroll', path: '/hr/payroll', icon: '💰' },
    { name: 'Performance', path: '/hr/performance', icon: '📊' },
    { name: 'Leave Management', path: '/hr/leave', icon: '📅' },
    { name: 'Attendance', path: '/hr/attendance', icon: '⏰' },
    { name: 'Benefits', path: '/hr/benefits', icon: '🎁' },
    { name: 'Compliance', path: '/hr/compliance', icon: '✅' },
    { name: 'Reports', path: '/hr/reports', icon: '📈' },
    { name: 'Settings', path: '/hr/settings', icon: '⚙️' }
  ];

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Animated Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
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

      {/* Recent Employees */}
      <AnimatedCard
        title="Recent Employees"
        subtitle="Latest team members"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentEmployees.map((employee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{employee.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.position} • {employee.location}</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">{employee.status}</span>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <AnimatedCard
            key={index}
            title={action.title}
            subtitle={action.description}
            icon={action.icon}
            color={action.color}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <AnimatedButton
              onClick={() => {}}
              color={action.color}
              className="w-full"
            >
              {action.title}
            </AnimatedButton>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/hr':
        return <DashboardContent />;
      case '/hr/employees':
        return <EmployeeManagement />;
      case '/hr/recruitment':
        return <Recruitment />;
      case '/hr/training':
        return <Training />;
      case '/hr/payroll':
        return <Payroll />;
      case '/hr/performance':
        return <Performance />;
      case '/hr/leave':
        return <LeaveManagement />;
      case '/hr/attendance':
        return <Attendance />;
      case '/hr/benefits':
      case '/hr/compliance':
      case '/hr/reports':
      case '/hr/settings':
        return <HROverview />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="HR Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default HRDashboard; 