import React from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';

const Network: React.FC = () => {
  const colorScheme = getColorScheme('it');

  const networkStats = [
    { title: 'Network Uptime', value: '99.8%', subtitle: 'This month', color: 'green', icon: '🌐', trend: { value: '+0.2%', isPositive: true }, delay: 0 },
    { title: 'Active Connections', value: '156', subtitle: 'Devices', color: 'blue', icon: '🔗', trend: { value: '+12', isPositive: true }, delay: 100 },
    { title: 'Bandwidth Usage', value: '78%', subtitle: 'Average', color: 'orange', icon: '📊', trend: { value: '+5%', isPositive: false }, delay: 200 },
    { title: 'Security Alerts', value: '3', subtitle: 'Low risk', color: 'red', icon: '🔒', trend: { value: '-2', isPositive: true }, delay: 300 }
  ];

  const networkDevices = [
    {
      id: 1,
      name: 'Kigali-Core-SW-01',
      type: 'Core Switch',
      status: 'Online',
      location: 'Kigali Data Center',
      uptime: '99.9%',
      bandwidth: 85,
      lastMaintenance: '2 weeks ago',
      ipAddress: '192.168.1.1'
    },
    {
      id: 2,
      name: 'Huye-Access-SW-01',
      type: 'Access Switch',
      status: 'Online',
      location: 'Huye Branch',
      uptime: '99.7%',
      bandwidth: 72,
      lastMaintenance: '1 week ago',
      ipAddress: '192.168.2.1'
    },
    {
      id: 3,
      name: 'Musanze-Router-01',
      type: 'Router',
      status: 'Online',
      location: 'Musanze Branch',
      uptime: '99.5%',
      bandwidth: 68,
      lastMaintenance: '3 weeks ago',
      ipAddress: '192.168.3.1'
    },
    {
      id: 4,
      name: 'Kigali-Firewall-01',
      type: 'Firewall',
      status: 'Warning',
      location: 'Kigali Data Center',
      uptime: '98.2%',
      bandwidth: 92,
      lastMaintenance: 'Today',
      ipAddress: '192.168.1.254'
    }
  ];

  const networkConnections = [
    {
      id: 1,
      source: 'Kigali Main Office',
      destination: 'Huye Branch',
      type: 'VPN',
      status: 'Active',
      bandwidth: '100 Mbps',
      latency: '15ms',
      lastCheck: '2 minutes ago'
    },
    {
      id: 2,
      source: 'Kigali Main Office',
      destination: 'Musanze Branch',
      type: 'VPN',
      status: 'Active',
      bandwidth: '50 Mbps',
      latency: '25ms',
      lastCheck: '1 minute ago'
    },
    {
      id: 3,
      source: 'Kigali Data Center',
      destination: 'Cloud Services',
      type: 'Internet',
      status: 'Active',
      bandwidth: '500 Mbps',
      latency: '45ms',
      lastCheck: '30 seconds ago'
    },
    {
      id: 4,
      source: 'Huye Branch',
      destination: 'Backup Site',
      type: 'Backup Link',
      status: 'Standby',
      bandwidth: '25 Mbps',
      latency: 'N/A',
      lastCheck: '5 minutes ago'
    }
  ];

  const bandwidthUsage = [
    {
      location: 'Kigali Main Office',
      current: 78,
      peak: 92,
      average: 65,
      users: 45,
      applications: ['Email', 'ERP', 'Video Calls']
    },
    {
      location: 'Huye Branch',
      current: 62,
      peak: 78,
      average: 55,
      users: 23,
      applications: ['Email', 'ERP', 'File Sharing']
    },
    {
      location: 'Musanze Branch',
      current: 58,
      peak: 72,
      average: 48,
      users: 18,
      applications: ['Email', 'ERP']
    }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'Failed Login Attempt',
      severity: 'Low',
      source: '192.168.1.100',
      target: 'Email Server',
      time: '2 hours ago',
      status: 'Resolved'
    },
    {
      id: 2,
      type: 'Suspicious Traffic',
      severity: 'Medium',
      source: 'External IP',
      target: 'Web Server',
      time: '4 hours ago',
      status: 'Under Investigation'
    },
    {
      id: 3,
      type: 'Port Scan Detected',
      severity: 'Low',
      source: 'External IP',
      target: 'Firewall',
      time: '6 hours ago',
      status: 'Blocked'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Standby': return 'bg-gray-100 text-gray-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
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
      {/* Network Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {networkStats.map((stat, index) => (
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

      {/* Network Devices */}
      <AnimatedCard
        title="Network Devices"
        subtitle="Active network infrastructure devices"
        color="blue"
        icon="🖥️"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bandwidth</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {networkDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{device.name}</div>
                      <div className="text-xs text-gray-500">{device.ipAddress}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.type}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(device.bandwidth)}`}
                          style={{ width: `${device.bandwidth}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm ${getUsageColor(device.bandwidth)}`}>{device.bandwidth}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.uptime}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">Monitor</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Configure</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Network Connections and Bandwidth Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Network Connections"
          subtitle="Active network links and VPN connections"
          color="green"
          icon="🔗"
          delay={600}
        >
          <div className="space-y-3">
            {networkConnections.map((connection) => (
              <div key={connection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{connection.source} → {connection.destination}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(connection.status)}`}>
                      {connection.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {connection.type} • {connection.bandwidth} • Latency: {connection.latency}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last check: {connection.lastCheck}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Monitor</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Test</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Bandwidth Usage"
          subtitle="Current bandwidth utilization by location"
          color="purple"
          icon="📊"
          delay={800}
        >
          <div className="space-y-3">
            {bandwidthUsage.map((location) => (
              <div key={location.location} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{location.location}</span>
                  <span className="text-xs text-gray-500">{location.users} users</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Current:</span>
                    <span className={`text-xs font-medium ${getUsageColor(location.current)}`}>{location.current}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUsageColor(location.current)}`}
                      style={{ width: `${location.current}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Peak: {location.peak}% • Avg: {location.average}% • Apps: {location.applications.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Security Events */}
      <AnimatedCard
        title="Security Events"
        subtitle="Recent network security alerts and incidents"
        color="red"
        icon="🔒"
        delay={1000}
      >
        <div className="space-y-3">
          {securityEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{event.type}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Source: {event.source} • Target: {event.target}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {event.time}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Investigate</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Resolve</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common network management tasks"
        color="orange"
        icon="⚡"
        delay={1200}
      >
        <div className="grid grid-cols-1 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Network scan')}
          >
            🔍 Run Network Scan
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Bandwidth test')}
          >
            📊 Bandwidth Test
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Security audit')}
          >
            🔒 Security Audit
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Network backup')}
          >
            💾 Backup Configurations
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Network Performance Metrics */}
      <AnimatedCard
        title="Network Performance"
        subtitle="Overall network health and performance metrics"
        color="indigo"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-sm text-green-600">Network Uptime</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">78%</div>
            <div className="text-sm text-blue-600">Avg Bandwidth Usage</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15ms</div>
            <div className="text-sm text-purple-600">Avg Latency</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Network;
