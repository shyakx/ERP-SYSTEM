import React from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';

const Security: React.FC = () => {
  const colorScheme = getColorScheme('it');

  const securityStats = [
    { title: 'Security Score', value: '92%', subtitle: 'Overall', color: 'green', icon: '🛡️', trend: { value: '+3%', isPositive: true }, delay: 0 },
    { title: 'Active Threats', value: '2', subtitle: 'Blocked', color: 'red', icon: '🚨', trend: { value: '-1', isPositive: true }, delay: 100 },
    { title: 'Firewall Rules', value: '156', subtitle: 'Active', color: 'blue', icon: '🔥', trend: { value: '+5', isPositive: true }, delay: 200 },
    { title: 'Vulnerabilities', value: '3', subtitle: 'Medium risk', color: 'orange', icon: '⚠️', trend: { value: '-2', isPositive: true }, delay: 300 }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'Failed Login Attempt',
      severity: 'Medium',
      source: '192.168.1.100',
      target: 'Email Server',
      description: 'Multiple failed login attempts detected',
      time: '2 hours ago',
      status: 'Resolved',
      action: 'IP Blocked'
    },
    {
      id: 2,
      type: 'Suspicious Network Traffic',
      severity: 'High',
      source: 'External IP',
      target: 'Web Server',
      description: 'Unusual traffic pattern detected from external source',
      time: '4 hours ago',
      status: 'Under Investigation',
      action: 'Traffic Monitored'
    },
    {
      id: 3,
      type: 'Port Scan Detected',
      severity: 'Low',
      source: 'External IP',
      target: 'Firewall',
      description: 'Port scanning activity detected',
      time: '6 hours ago',
      status: 'Blocked',
      action: 'IP Blacklisted'
    },
    {
      id: 4,
      type: 'Malware Detection',
      severity: 'High',
      source: 'Internal Network',
      target: 'Workstation',
      description: 'Potential malware detected on user workstation',
      time: '1 day ago',
      status: 'Resolved',
      action: 'File Quarantined'
    }
  ];

  const firewallStatus = [
    {
      name: 'Main Firewall',
      status: 'Active',
      rules: 45,
      blocked: 12,
      allowed: 156,
      lastUpdate: '2 hours ago',
      location: 'Kigali Data Center'
    },
    {
      name: 'Branch Firewall',
      status: 'Active',
      rules: 32,
      blocked: 8,
      allowed: 89,
      lastUpdate: '1 hour ago',
      location: 'Huye Branch'
    },
    {
      name: 'DMZ Firewall',
      status: 'Active',
      rules: 28,
      blocked: 15,
      allowed: 67,
      lastUpdate: '3 hours ago',
      location: 'Kigali Data Center'
    }
  ];

  const accessControl = [
    {
      user: 'Jean Pierre Uwimana',
      role: 'IT Manager',
      department: 'IT',
      lastLogin: '2 hours ago',
      status: 'Active',
      permissions: ['Admin', 'System', 'Network'],
      location: 'Kigali Office'
    },
    {
      user: 'Emmanuel Ndayisaba',
      role: 'Network Admin',
      department: 'IT',
      lastLogin: '1 hour ago',
      status: 'Active',
      permissions: ['Network', 'Security'],
      location: 'Kigali Office'
    },
    {
      user: 'Patrick Nshimiyimana',
      role: 'Security Analyst',
      department: 'IT',
      lastLogin: '30 minutes ago',
      status: 'Active',
      permissions: ['Security', 'Monitoring'],
      location: 'Huye Branch'
    },
    {
      user: 'Alexis Nkurunziza',
      role: 'System Admin',
      department: 'IT',
      lastLogin: '4 hours ago',
      status: 'Inactive',
      permissions: ['System', 'Backup'],
      location: 'Musanze Branch'
    }
  ];

  const vulnerabilityAssessment = [
    {
      name: 'Windows Server 2019',
      severity: 'Medium',
      vulnerabilities: 3,
      lastScan: '2 days ago',
      status: 'Patch Available',
      description: 'Security updates available for Windows Server'
    },
    {
      name: 'Apache Web Server',
      severity: 'Low',
      vulnerabilities: 1,
      lastScan: '1 week ago',
      status: 'Up to Date',
      description: 'Minor configuration issue detected'
    },
    {
      name: 'Database Server',
      severity: 'High',
      vulnerabilities: 2,
      lastScan: '1 day ago',
      status: 'Critical',
      description: 'Critical security patches required'
    },
    {
      name: 'Network Devices',
      severity: 'Medium',
      vulnerabilities: 4,
      lastScan: '3 days ago',
      status: 'Patch Available',
      description: 'Firmware updates available for network devices'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Patch Available': return 'bg-yellow-100 text-yellow-800';
      case 'Up to Date': return 'bg-green-100 text-green-800';
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

  return (
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

      {/* Security Alerts */}
      <AnimatedCard
        title="Security Alerts"
        subtitle="Recent security incidents and threats"
        color="red"
        icon="🚨"
        delay={400}
      >
        <div className="space-y-3">
          {securityAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {alert.description} • Source: {alert.source} • Target: {alert.target}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {alert.time} • Action: {alert.action}
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

      {/* Firewall Status and Access Control */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Firewall Status"
          subtitle="Active firewall configurations and rules"
          color="blue"
          icon="🔥"
          delay={600}
        >
          <div className="space-y-3">
            {firewallStatus.map((firewall) => (
              <div key={firewall.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{firewall.name}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(firewall.status)}`}>
                      {firewall.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {firewall.rules} rules • {firewall.blocked} blocked • {firewall.allowed} allowed • {firewall.location}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last update: {firewall.lastUpdate}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Configure</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Monitor</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Access Control"
          subtitle="User access and permissions management"
          color="purple"
          icon="👤"
          delay={800}
        >
          <div className="space-y-3">
            {accessControl.map((user) => (
              <div key={user.user} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{user.user}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {user.role} • {user.department} • {user.location}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Permissions: {user.permissions.join(', ')} • Last login: {user.lastLogin}
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

      {/* Vulnerability Assessment */}
      <AnimatedCard
        title="Vulnerability Assessment"
        subtitle="Security vulnerabilities and patch status"
        color="orange"
        icon="⚠️"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerabilities</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Scan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vulnerabilityAssessment.map((system) => (
                <tr key={system.name} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{system.name}</div>
                      <div className="text-xs text-gray-500">{system.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(system.severity)}`}>
                      {system.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{system.vulnerabilities}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(system.status)}`}>
                      {system.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{system.lastScan}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">Scan</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Patch</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common security management tasks"
        color="red"
        icon="⚡"
        delay={1200}
      >
        <div className="grid grid-cols-1 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Security scan')}
          >
            🔍 Run Security Scan
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Update policies')}
          >
            📋 Update Security Policies
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Access review')}
          >
            👥 Review Access Control
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Incident report')}
          >
            📝 Generate Incident Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Security Performance Metrics */}
      <AnimatedCard
        title="Security Performance"
        subtitle="Overall security health and metrics"
        color="indigo"
        icon="📊"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-green-600">Security Score</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-blue-600">Active Firewall Rules</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-purple-600">Open Vulnerabilities</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Security;
