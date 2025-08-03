import React from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';

const Maintenance: React.FC = () => {
  const colorScheme = getColorScheme('it');

  const maintenanceStats = [
    { title: 'Scheduled Tasks', value: '8', subtitle: 'This week', color: 'blue', icon: '📅', trend: { value: '+2', isPositive: true }, delay: 0 },
    { title: 'Completed Tasks', value: '12', subtitle: 'This month', color: 'green', icon: '✅', trend: { value: '+3', isPositive: true }, delay: 100 },
    { title: 'System Updates', value: '5', subtitle: 'Pending', color: 'orange', icon: '🔄', trend: { value: '-1', isPositive: true }, delay: 200 },
    { title: 'Backup Status', value: '100%', subtitle: 'Successful', color: 'purple', icon: '💾', trend: { value: '+0%', isPositive: true }, delay: 300 }
  ];

  const scheduledMaintenance = [
    {
      id: 1,
      title: 'Email Server Maintenance',
      description: 'Routine maintenance and security updates for email server',
      system: 'Email Server',
      scheduledDate: '2024-01-15',
      scheduledTime: '02:00 - 04:00',
      duration: '2 hours',
      priority: 'Medium',
      assignedTo: 'Jean Pierre Uwimana',
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Database Server Backup',
      description: 'Full database backup and integrity check',
      system: 'Database Server',
      scheduledDate: '2024-01-16',
      scheduledTime: '01:00 - 03:00',
      duration: '2 hours',
      priority: 'High',
      assignedTo: 'Emmanuel Ndayisaba',
      status: 'Scheduled'
    },
    {
      id: 3,
      title: 'Network Switch Updates',
      description: 'Firmware updates for core network switches',
      system: 'Network Infrastructure',
      scheduledDate: '2024-01-17',
      scheduledTime: '03:00 - 05:00',
      duration: '2 hours',
      priority: 'Medium',
      assignedTo: 'Patrick Nshimiyimana',
      status: 'Scheduled'
    },
    {
      id: 4,
      title: 'Security Patch Installation',
      description: 'Critical security patches for Windows servers',
      system: 'Windows Servers',
      scheduledDate: '2024-01-18',
      scheduledTime: '02:00 - 04:00',
      duration: '2 hours',
      priority: 'High',
      assignedTo: 'Alexis Nkurunziza',
      status: 'Pending'
    }
  ];

  const systemUpdates = [
    {
      name: 'Windows Server 2019',
      currentVersion: '10.0.17763.2565',
      availableVersion: '10.0.17763.2566',
      updateType: 'Security',
      size: '156 MB',
      status: 'Ready to Install',
      lastCheck: '2 hours ago'
    },
    {
      name: 'Ubuntu Server 20.04',
      currentVersion: '20.04.3 LTS',
      availableVersion: '20.04.4 LTS',
      updateType: 'Feature',
      size: '245 MB',
      status: 'Downloading',
      lastCheck: '1 hour ago'
    },
    {
      name: 'Apache Web Server',
      currentVersion: '2.4.48',
      availableVersion: '2.4.49',
      updateType: 'Security',
      size: '89 MB',
      status: 'Ready to Install',
      lastCheck: '3 hours ago'
    },
    {
      name: 'MySQL Database',
      currentVersion: '8.0.27',
      availableVersion: '8.0.28',
      updateType: 'Bug Fix',
      size: '67 MB',
      status: 'Pending',
      lastCheck: '4 hours ago'
    }
  ];

  const backupStatus = [
    {
      system: 'Email Server',
      lastBackup: '2 hours ago',
      nextBackup: 'In 22 hours',
      status: 'Successful',
      size: '2.3 GB',
      retention: '30 days',
      location: 'Kigali Data Center'
    },
    {
      system: 'Database Server',
      lastBackup: '1 hour ago',
      nextBackup: 'In 23 hours',
      status: 'Successful',
      size: '15.7 GB',
      retention: '30 days',
      location: 'Kigali Data Center'
    },
    {
      system: 'File Server',
      lastBackup: '3 hours ago',
      nextBackup: 'In 21 hours',
      status: 'Successful',
      size: '8.9 GB',
      retention: '30 days',
      location: 'Huye Branch'
    },
    {
      system: 'Web Server',
      lastBackup: '4 hours ago',
      nextBackup: 'In 20 hours',
      status: 'Warning',
      size: '1.2 GB',
      retention: '30 days',
      location: 'Musanze Branch'
    }
  ];

  const maintenanceLogs = [
    {
      id: 1,
      action: 'Email Server Maintenance Completed',
      description: 'Routine maintenance and security updates applied successfully',
      technician: 'Jean Pierre Uwimana',
      duration: '1 hour 45 minutes',
      status: 'Completed',
      timestamp: '2024-01-14 03:45',
      notes: 'All systems operational, no issues encountered'
    },
    {
      id: 2,
      action: 'Database Backup Completed',
      description: 'Full database backup completed successfully',
      technician: 'Emmanuel Ndayisaba',
      duration: '2 hours 15 minutes',
      status: 'Completed',
      timestamp: '2024-01-13 02:30',
      notes: 'Backup size: 15.7 GB, integrity check passed'
    },
    {
      id: 3,
      action: 'Network Switch Firmware Update',
      description: 'Firmware update for core network switches',
      technician: 'Patrick Nshimiyimana',
      duration: '1 hour 30 minutes',
      status: 'Completed',
      timestamp: '2024-01-12 04:15',
      notes: 'All switches updated successfully, network stability confirmed'
    },
    {
      id: 4,
      action: 'Security Patch Installation',
      description: 'Critical security patches installed on Windows servers',
      technician: 'Alexis Nkurunziza',
      duration: '2 hours',
      status: 'Completed',
      timestamp: '2024-01-11 02:00',
      notes: 'All servers patched, no compatibility issues'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Successful': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Ready to Install': return 'bg-green-100 text-green-800';
      case 'Downloading': return 'bg-blue-100 text-blue-800';
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
      {/* Maintenance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {maintenanceStats.map((stat, index) => (
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

      {/* Scheduled Maintenance */}
      <AnimatedCard
        title="Scheduled Maintenance"
        subtitle="Upcoming maintenance tasks and schedules"
        color="blue"
        icon="📅"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledMaintenance.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-500">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.system}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{task.scheduledDate}</div>
                      <div className="text-xs text-gray-500">{task.scheduledTime}</div>
                      <div className="text-xs text-gray-400">{task.duration}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">Edit</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Start</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* System Updates and Backup Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="System Updates"
          subtitle="Available and pending system updates"
          color="orange"
          icon="🔄"
          delay={600}
        >
          <div className="space-y-3">
            {systemUpdates.map((update) => (
              <div key={update.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{update.name}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(update.status)}`}>
                      {update.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Current: {update.currentVersion} → Available: {update.availableVersion}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {update.updateType} • {update.size} • Last check: {update.lastCheck}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Install</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Details</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Backup Status"
          subtitle="System backup status and schedules"
          color="purple"
          icon="💾"
          delay={800}
        >
          <div className="space-y-3">
            {backupStatus.map((backup) => (
              <div key={backup.system} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{backup.system}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(backup.status)}`}>
                      {backup.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last: {backup.lastBackup} • Next: {backup.nextBackup}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Size: {backup.size} • Retention: {backup.retention} • Location: {backup.location}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Backup</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Restore</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Maintenance Logs */}
      <AnimatedCard
        title="Maintenance Logs"
        subtitle="Recent maintenance activities and history"
        color="green"
        icon="📋"
        delay={1000}
      >
        <div className="space-y-3">
          {maintenanceLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{log.action}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(log.status)}`}>
                    {log.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {log.description} • Technician: {log.technician}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Duration: {log.duration} • {log.timestamp} • {log.notes}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Report</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common maintenance tasks"
        color="orange"
        icon="⚡"
        delay={1200}
      >
        <div className="grid grid-cols-1 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Schedule maintenance')}
          >
            📅 Schedule Maintenance
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
            onClick={() => console.log('Update systems')}
          >
            🔄 Update Systems
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Maintenance report')}
          >
            📊 Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Maintenance Performance Metrics */}
      <AnimatedCard
        title="Maintenance Performance"
        subtitle="Overall maintenance metrics and trends"
        color="indigo"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-green-600">Backup Success Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-blue-600">Scheduled Tasks</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-600">Pending Updates</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Maintenance;
