import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Wifi, 
  Router, 
  Server, 
  Globe, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  Eye,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'access_point';
  ipAddress: string;
  status: 'online' | 'offline' | 'warning';
  uptime: string;
  bandwidth: number;
  connections: number;
  lastSeen: string;
}

interface NetworkTraffic {
  id: string;
  source: string;
  destination: string;
  protocol: string;
  bytes: number;
  timestamp: string;
  status: 'allowed' | 'blocked' | 'monitored';
}

const NetworkInfrastructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'devices' | 'traffic' | 'security'>('devices');
  
  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([
    {
      id: '1',
      name: 'Main Router',
      type: 'router',
      ipAddress: '192.168.1.1',
      status: 'online',
      uptime: '45 days, 12 hours',
      bandwidth: 1000,
      connections: 127,
      lastSeen: '2024-01-15 10:30:00'
    },
    {
      id: '2',
      name: 'Core Switch',
      type: 'switch',
      ipAddress: '192.168.1.2',
      status: 'online',
      uptime: '30 days, 8 hours',
      bandwidth: 10000,
      connections: 45,
      lastSeen: '2024-01-15 10:30:00'
    },
    {
      id: '3',
      name: 'Firewall Gateway',
      type: 'firewall',
      ipAddress: '192.168.1.3',
      status: 'warning',
      uptime: '15 days, 3 hours',
      bandwidth: 1000,
      connections: 89,
      lastSeen: '2024-01-15 10:25:00'
    },
    {
      id: '4',
      name: 'WiFi Access Point 1',
      type: 'access_point',
      ipAddress: '192.168.1.4',
      status: 'online',
      uptime: '20 days, 6 hours',
      bandwidth: 300,
      connections: 23,
      lastSeen: '2024-01-15 10:30:00'
    }
  ]);

  const [networkTraffic, setNetworkTraffic] = useState<NetworkTraffic[]>([
    {
      id: '1',
      source: '192.168.1.100',
      destination: '8.8.8.8',
      protocol: 'HTTPS',
      bytes: 1024000,
      timestamp: '2024-01-15 10:30:15',
      status: 'allowed'
    },
    {
      id: '2',
      source: '192.168.1.101',
      destination: '192.168.1.1',
      protocol: 'SSH',
      bytes: 512000,
      timestamp: '2024-01-15 10:29:45',
      status: 'allowed'
    },
    {
      id: '3',
      source: '10.0.0.50',
      destination: '192.168.1.50',
      protocol: 'FTP',
      bytes: 2048000,
      timestamp: '2024-01-15 10:28:30',
      status: 'blocked'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'offline': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router': return <Router className="w-5 h-5" />;
      case 'switch': return <Server className="w-5 h-5" />;
      case 'firewall': return <Shield className="w-5 h-5" />;
      case 'access_point': return <Wifi className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getTrafficStatusColor = (status: string) => {
    switch (status) {
      case 'allowed': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'monitored': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatBandwidth = (mbps: number) => {
    if (mbps >= 1000) return `${(mbps / 1000).toFixed(1)} Gbps`;
    return `${mbps} Mbps`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Network Infrastructure</h1>
          <p className="text-gray-600">Monitor and manage network devices, traffic, and security</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Network</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Network Report</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Network Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Network Devices"
          subtitle="Active equipment"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-500">3 online, 1 warning</p>
            </div>
            <Router className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Bandwidth"
          subtitle="Network capacity"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">12.3 Gbps</p>
              <p className="text-sm text-gray-500">Available capacity</p>
            </div>
            <Wifi className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Connections"
          subtitle="Current sessions"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">284</p>
              <p className="text-sm text-gray-500">Connected devices</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Security Status"
          subtitle="Firewall protection"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">Active</p>
              <p className="text-sm text-gray-500">Firewall enabled</p>
            </div>
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('devices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'devices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Router className="w-4 h-4" />
                <span>Network Devices</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('traffic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'traffic'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Network Traffic</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'devices' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Network Devices</h3>
              <div className="space-y-4">
                {networkDevices.map((device) => (
                  <div key={device.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getDeviceIcon(device.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{device.name}</h4>
                          <p className="text-sm text-gray-500">IP: {device.ipAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                          {getStatusIcon(device.status)}
                          <span className="ml-1 capitalize">{device.status}</span>
                        </span>
                        <div className="flex space-x-2">
                          <AnimatedButton
                            onClick={() => {}}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => {}}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Settings className="w-4 h-4" />
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Uptime:</span>
                        <span className="ml-2 font-medium">{device.uptime}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bandwidth:</span>
                        <span className="ml-2 font-medium">{formatBandwidth(device.bandwidth)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Connections:</span>
                        <span className="ml-2 font-medium">{device.connections}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Seen:</span>
                        <span className="ml-2 font-medium">{device.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'traffic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Network Traffic</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Source</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Destination</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Protocol</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {networkTraffic.map((traffic) => (
                      <tr key={traffic.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{traffic.source}</td>
                        <td className="py-3 px-4 text-gray-900">{traffic.destination}</td>
                        <td className="py-3 px-4 text-gray-900">{traffic.protocol}</td>
                        <td className="py-3 px-4 text-gray-900">{formatBytes(traffic.bytes)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrafficStatusColor(traffic.status)}`}>
                            {traffic.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{traffic.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Network Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard
                  title="Firewall Status"
                  subtitle="Active protection"
                  className="bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Firewall Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Blocked Attempts</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Allowed Connections</span>
                      <span className="font-medium">15,892</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Last Update</span>
                      <span className="font-medium">2 minutes ago</span>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard
                  title="Security Alerts"
                  subtitle="Recent threats"
                  className="bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Suspicious Activity</p>
                        <p className="text-xs text-red-700">Multiple failed login attempts from 10.0.0.50</p>
                        <p className="text-xs text-red-600">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Port Scan Detected</p>
                        <p className="text-xs text-yellow-700">Port scanning activity from external IP</p>
                        <p className="text-xs text-yellow-600">15 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkInfrastructure;
