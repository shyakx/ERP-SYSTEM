import React from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';

const SystemManagement: React.FC = () => {
  const colorScheme = getColorScheme('it');

  const serverStats = [
    { title: 'Total Servers', value: '12', subtitle: 'Active', color: 'green', icon: '🖥️', trend: { value: '+1', isPositive: true }, delay: 0 },
    { title: 'CPU Usage', value: '68%', subtitle: 'Average', color: 'blue', icon: '⚡', trend: { value: '-5%', isPositive: true }, delay: 100 },
    { title: 'Memory Usage', value: '72%', subtitle: 'Average', color: 'orange', icon: '💾', trend: { value: '+2%', isPositive: false }, delay: 200 },
    { title: 'Storage Usage', value: '45%', subtitle: 'Available', color: 'purple', icon: '💿', trend: { value: '+8%', isPositive: false }, delay: 300 }
  ];

  const servers = [
    {
      id: 1,
      name: 'Kigali-DB-01',
      type: 'Database Server',
      status: 'Online',
      cpu: 65,
      memory: 78,
      storage: 45,
      uptime: '99.9%',
      lastMaintenance: '2 weeks ago',
      location: 'Kigali Data Center'
    },
    {
      id: 2,
      name: 'Kigali-WEB-01',
      type: 'Web Server',
      status: 'Online',
      cpu: 72,
      memory: 68,
      storage: 52,
      uptime: '99.7%',
      lastMaintenance: '1 week ago',
      location: 'Kigali Data Center'
    },
    {
      id: 3,
      name: 'Huye-FILE-01',
      type: 'File Server',
      status: 'Online',
      cpu: 45,
      memory: 55,
      storage: 78,
      uptime: '99.5%',
      lastMaintenance: '3 weeks ago',
      location: 'Huye Branch'
    },
    {
      id: 4,
      name: 'Musanze-APP-01',
      type: 'Application Server',
      status: 'Maintenance',
      cpu: 0,
      memory: 0,
      storage: 62,
      uptime: '98.2%',
      lastMaintenance: 'Today',
      location: 'Musanze Branch'
    }
  ];

  const softwareInventory = [
    {
      name: 'Windows Server 2019',
      version: '10.0.17763',
      installations: 8,
      lastUpdate: '2 weeks ago',
      status: 'Up to Date',
      license: 'Enterprise'
    },
    {
      name: 'Ubuntu Server 20.04',
      version: '20.04.3 LTS',
      installations: 4,
      lastUpdate: '1 week ago',
      status: 'Up to Date',
      license: 'Open Source'
    },
    {
      name: 'Microsoft SQL Server',
      version: '2019.15.0.4153',
      installations: 3,
      lastUpdate: '3 days ago',
      status: 'Update Available',
      license: 'Enterprise'
    },
    {
      name: 'Apache Web Server',
      version: '2.4.48',
      installations: 6,
      lastUpdate: '1 month ago',
      status: 'Update Available',
      license: 'Open Source'
    }
  ];

  const systemConfigs = [
    {
      name: 'Network Configuration',
      type: 'Network',
      lastModified: '2 days ago',
      modifiedBy: 'Jean Pierre Uwimana',
      status: 'Active',
      description: 'Main network settings and routing'
    },
    {
      name: 'Security Policy',
      type: 'Security',
      lastModified: '1 week ago',
      modifiedBy: 'Emmanuel Ndayisaba',
      status: 'Active',
      description: 'Firewall and access control policies'
    },
    {
      name: 'Backup Schedule',
      type: 'Backup',
      lastModified: '3 days ago',
      modifiedBy: 'Patrick Nshimiyimana',
      status: 'Active',
      description: 'Automated backup configuration'
    },
    {
      name: 'Monitoring Setup',
      type: 'Monitoring',
      lastModified: '5 days ago',
      modifiedBy: 'Alexis Nkurunziza',
      status: 'Active',
      description: 'System monitoring and alerting'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Up to Date': return 'bg-green-100 text-green-800';
      case 'Update Available': return 'bg-orange-100 text-orange-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'text-red-600';
    if (usage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-4">
      {/* System Management Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serverStats.map((stat, index) => (
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

      {/* Server Management */}
      <AnimatedCard
        title="Server Management"
        subtitle="Active servers and their performance metrics"
        color="blue"
        icon="🖥️"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servers.map((server) => (
                <tr key={server.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{server.name}</div>
                      <div className="text-xs text-gray-500">{server.location}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{server.type}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(server.status)}`}>
                      {server.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                          style={{ width: `${server.cpu}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getUsageColor(server.cpu)}`}>{server.cpu}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                          style={{ width: `${server.memory}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getUsageColor(server.memory)}`}>{server.memory}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.storage)}`}
                          style={{ width: `${server.storage}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getUsageColor(server.storage)}`}>{server.storage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{server.uptime}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">Monitor</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Manage</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Software Inventory and System Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Software Inventory"
          subtitle="Installed software and versions"
          color="green"
          icon="📦"
          delay={600}
        >
          <div className="space-y-3">
            {softwareInventory.map((software) => (
              <div key={software.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{software.name}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(software.status)}`}>
                      {software.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Version {software.version} • {software.installations} installations • {software.license}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last update: {software.lastUpdate}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Update</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Details</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="System Configurations"
          subtitle="Active system configurations and policies"
          color="purple"
          icon="⚙️"
          delay={800}
        >
          <div className="space-y-3">
            {systemConfigs.map((config) => (
              <div key={config.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{config.name}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(config.status)}`}>
                      {config.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {config.type} • Modified by {config.modifiedBy}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {config.description} • {config.lastModified}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Edit</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">View</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common system management tasks"
        color="orange"
        icon="⚡"
        delay={1000}
      >
        <div className="grid grid-cols-1 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add server')}
          >
            🖥️ Add New Server
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('System backup')}
          >
            💾 System Backup
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Software update')}
          >
            🔄 Software Updates
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Performance check')}
          >
            📊 Performance Check
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* System Health Overview */}
      <AnimatedCard
        title="System Health Overview"
        subtitle="Overall system performance and health metrics"
        color="indigo"
        icon="📊"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.7%</div>
            <div className="text-sm text-green-600">Overall Uptime</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">68%</div>
            <div className="text-sm text-blue-600">Avg CPU Usage</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">72%</div>
            <div className="text-sm text-purple-600">Avg Memory Usage</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SystemManagement;
