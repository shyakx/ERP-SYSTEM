import React from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';

const ITOverview: React.FC = () => {
  const colorScheme = getColorScheme('it');

  const systemStats = [
    { title: 'Active Systems', value: '24', subtitle: 'Online', color: 'green', icon: '🖥️', trend: { value: '+2', isPositive: true }, delay: 0 },
    { title: 'Network Uptime', value: '99.8%', subtitle: 'This month', color: 'blue', icon: '🌐', trend: { value: '+0.2%', isPositive: true }, delay: 100 },
    { title: 'Open Tickets', value: '12', subtitle: 'Pending', color: 'orange', icon: '🎫', trend: { value: '-3', isPositive: true }, delay: 200 },
    { title: 'Security Alerts', value: '2', subtitle: 'Low risk', color: 'red', icon: '🔒', trend: { value: '-1', isPositive: true }, delay: 300 }
  ];

  const recentIssues = [
    {
      id: 1,
      title: 'Email Server Maintenance',
      description: 'Scheduled maintenance for email server',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Jean Pierre Uwimana',
      createdAt: '2 hours ago',
      system: 'Email Server'
    },
    {
      id: 2,
      title: 'Network Connectivity Issue',
      description: 'Intermittent connection drops in Building A',
      priority: 'High',
      status: 'Resolved',
      assignedTo: 'Emmanuel Ndayisaba',
      createdAt: '4 hours ago',
      system: 'Network Infrastructure'
    },
    {
      id: 3,
      title: 'Software Update Required',
      description: 'Security patches needed for Windows servers',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: 'Patrick Nshimiyimana',
      createdAt: '6 hours ago',
      system: 'Windows Servers'
    }
  ];

  const systemHealth = [
    {
      name: 'Email Server',
      status: 'Healthy',
      uptime: 99.9,
      lastCheck: '2 minutes ago',
      icon: '📧'
    },
    {
      name: 'Database Server',
      status: 'Healthy',
      uptime: 99.8,
      lastCheck: '1 minute ago',
      icon: '🗄️'
    },
    {
      name: 'Web Server',
      status: 'Warning',
      uptime: 95.2,
      lastCheck: '5 minutes ago',
      icon: '🌐'
    },
    {
      name: 'File Server',
      status: 'Healthy',
      uptime: 99.7,
      lastCheck: '3 minutes ago',
      icon: '📁'
    }
  ];

  const networkStatus = [
    {
      location: 'Kigali Main Office',
      status: 'Online',
      bandwidth: '85%',
      users: 45,
      lastIncident: '2 days ago'
    },
    {
      location: 'Huye Branch',
      status: 'Online',
      bandwidth: '72%',
      users: 23,
      lastIncident: '1 week ago'
    },
    {
      location: 'Musanze Branch',
      status: 'Online',
      bandwidth: '68%',
      users: 18,
      lastIncident: '3 days ago'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* IT System Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
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

      {/* Recent Issues */}
      <AnimatedCard
        title="Recent Issues"
        subtitle="Latest IT tickets and system issues"
        color="red"
        icon="🎫"
        delay={400}
      >
        <div className="space-y-3">
          {recentIssues.map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{issue.title}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {issue.description} • {issue.system} • {issue.assignedTo}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {issue.createdAt}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Update</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* System Health and Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="System Health"
          subtitle="Current status of IT infrastructure"
          color="green"
          icon="🖥️"
          delay={600}
        >
          <div className="space-y-3">
            {systemHealth.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">{system.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{system.name}</div>
                    <div className="text-xs text-gray-500">{system.lastCheck}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(system.status)}`}>
                    {system.status}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{system.uptime}% uptime</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Network Status"
          subtitle="Branch connectivity overview"
          color="blue"
          icon="🌐"
          delay={800}
        >
          <div className="space-y-3">
            {networkStatus.map((location) => (
              <div key={location.location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{location.location}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(location.status)}`}>
                      {location.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {location.users} users • {location.bandwidth} bandwidth • Last incident: {location.lastIncident}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Monitor</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Details</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common IT management tasks"
        color="purple"
        icon="⚡"
        delay={1000}
      >
        <div className="grid grid-cols-1 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create ticket')}
          >
            🎫 Create Support Ticket
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('System check')}
          >
            🔍 Run System Check
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Backup')}
          >
            💾 Initiate Backup
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Update')}
          >
            🔄 System Updates
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Performance Metrics */}
      <AnimatedCard
        title="Performance Metrics"
        subtitle="IT department performance overview"
        color="indigo"
        icon="📊"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-sm text-green-600">System Uptime</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3hrs</div>
            <div className="text-sm text-blue-600">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <div className="text-sm text-purple-600">Ticket Resolution</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ITOverview;
