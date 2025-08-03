import React from 'react';
import AnimatedStatsCard from '../../shared/AnimatedStatsCard';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const HRDashboard: React.FC = () => {
  const colorScheme = getColorScheme('hr');

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

  return (
    <div className="space-y-4">
      {/* Animated Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <AnimatedStatsCard
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              color={stat.color}
              icon={stat.icon}
              trend={stat.trend}
              delay={stat.delay}
            />
          </div>
        ))}
      </div>

      {/* Recent Employees */}
      <AnimatedCard
        title="Recent Employees"
        subtitle="Latest team members"
        color="blue"
        icon="👥"
        delay={400}
      >
        <div className="space-y-3">
          {recentEmployees.map((employee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">{employee.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{employee.name}</h3>
                  <p className="text-xs text-gray-600">{employee.position} - {employee.location}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {employee.status}
              </span>
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
            color={action.color as any}
            icon={action.icon}
            delay={600 + index * 100}
            onClick={() => console.log(`Clicked: ${action.title}`)}
          >
            <div className="text-center">
              <AnimatedButton
                color={action.color as any}
                size="md"
                onClick={() => console.log(`Action: ${action.title}`)}
              >
                {action.title}
              </AnimatedButton>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Department Overview */}
      <AnimatedCard
        title="Department Overview"
        subtitle="HR Department Statistics"
        color="indigo"
        icon="📈"
        delay={900}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Employee Satisfaction</span>
              <span className="text-xs font-semibold text-gray-900">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Training Completion</span>
              <span className="text-xs font-semibold text-gray-900">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default HRDashboard; 