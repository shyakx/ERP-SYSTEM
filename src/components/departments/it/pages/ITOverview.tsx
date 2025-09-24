import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Server, 
  Monitor, 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  Activity,
  Zap,
  Globe,
  Lock,
  Eye,
  Settings,
  BarChart3
} from 'lucide-react';

interface SystemStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  uptime: string;
  responseTime: number;
  lastChecked: string;
}

interface ITMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const ITOverview: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([
    {
      id: '1',
      name: 'Main Server',
      status: 'online',
      uptime: '99.9%',
      responseTime: 45,
      lastChecked: '2024-01-15 10:30:00'
    },
    {
      id: '2',
      name: 'Database Server',
      status: 'online',
      uptime: '99.8%',
      responseTime: 23,
      lastChecked: '2024-01-15 10:30:00'
    },
    {
      id: '3',
      name: 'Web Server',
      status: 'warning',
      uptime: '98.5%',
      responseTime: 120,
      lastChecked: '2024-01-15 10:30:00'
    },
    {
      id: '4',
      name: 'Email Server',
      status: 'online',
      uptime: '99.7%',
      responseTime: 67,
      lastChecked: '2024-01-15 10:30:00'
    }
  ]);

  const [recentAlerts, setRecentAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: 'Web server response time is high',
      timestamp: '2024-01-15 10:25:00',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'info',
      message: 'Scheduled maintenance completed',
      timestamp: '2024-01-15 09:00:00',
      severity: 'low'
    },
    {
      id: '3',
      type: 'success',
      message: 'Database backup completed successfully',
      timestamp: '2024-01-15 08:30:00',
      severity: 'low'
    }
  ]);

  const metrics: ITMetric[] = [
    {
      title: 'System Uptime',
      value: '99.7%',
      change: '+0.2%',
      icon: Server,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '127',
      change: '+12',
      icon: Users,
      color: 'text-blue-600',
      trend: 'up'
    },
    {
      title: 'Storage Used',
      value: '68%',
      change: '+3%',
      icon: HardDrive,
      color: 'text-orange-600',
      trend: 'up'
    },
    {
      title: 'Network Speed',
      value: '1.2 Gbps',
      change: '+0.1 Gbps',
      icon: Wifi,
      color: 'text-purple-600',
      trend: 'up'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'offline': return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IT Overview</h1>
          <p className="text-gray-600">System status, metrics, and IT operations dashboard</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Settings className="w-4 h-4" />
            <span>System Settings</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>View Reports</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <AnimatedCard
              key={index}
              title={metric.title}
              subtitle={metric.change}
              className="bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-500">Last 24 hours</p>
                </div>
                <IconComponent className={`w-8 h-8 ${metric.color}`} />
              </div>
              <div className="flex items-center mt-3 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{metric.change}</span>
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <AnimatedCard
          title="System Status"
          subtitle="Real-time system monitoring"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            {systemStatus.map((system) => (
              <div key={system.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Server className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{system.name}</p>
                    <p className="text-sm text-gray-500">Uptime: {system.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{system.responseTime}ms</p>
                    <p className="text-xs text-gray-500">Response time</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                    {getStatusIcon(system.status)}
                    <span className="ml-1 capitalize">{system.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Recent Alerts */}
        <AnimatedCard
          title="Recent Alerts"
          subtitle="System notifications and alerts"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${getAlertColor(alert.type)}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.timestamp}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common IT management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700"
          >
            <Database className="w-5 h-5" />
            <span>Database Backup</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700"
          >
            <Shield className="w-5 h-5" />
            <span>Security Scan</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700"
          >
            <Activity className="w-5 h-5" />
            <span>Performance Check</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ITOverview;
