import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Server, 
  Database, 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Zap,
  Shield,
  Download,
  Upload
} from 'lucide-react';

interface SystemResource {
  id: string;
  name: string;
  type: 'server' | 'database' | 'application';
  status: 'running' | 'stopped' | 'maintenance' | 'error';
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: string;
  lastRestart: string;
}

interface Application {
  id: string;
  name: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  port: number;
  memoryUsage: number;
  lastDeployed: string;
}

const SystemManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'servers' | 'databases' | 'applications'>('servers');
  
  const [systemResources, setSystemResources] = useState<SystemResource[]>([
    {
      id: '1',
      name: 'Web Server 01',
      type: 'server',
      status: 'running',
      cpuUsage: 45,
      memoryUsage: 68,
      diskUsage: 32,
      uptime: '15 days, 8 hours',
      lastRestart: '2024-01-01 10:00:00'
    },
    {
      id: '2',
      name: 'Database Server 01',
      type: 'database',
      status: 'running',
      cpuUsage: 23,
      memoryUsage: 45,
      diskUsage: 78,
      uptime: '30 days, 12 hours',
      lastRestart: '2023-12-15 14:30:00'
    },
    {
      id: '3',
      name: 'Application Server 01',
      type: 'server',
      status: 'maintenance',
      cpuUsage: 0,
      memoryUsage: 12,
      diskUsage: 45,
      uptime: '0 days, 0 hours',
      lastRestart: '2024-01-15 09:00:00'
    }
  ]);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      name: 'ERP System',
      version: 'v2.1.4',
      status: 'running',
      port: 3000,
      memoryUsage: 512,
      lastDeployed: '2024-01-10 16:45:00'
    },
    {
      id: '2',
      name: 'Database Service',
      version: 'v1.8.2',
      status: 'running',
      port: 5432,
      memoryUsage: 1024,
      lastDeployed: '2024-01-05 10:20:00'
    },
    {
      id: '3',
      name: 'API Gateway',
      version: 'v3.0.1',
      status: 'error',
      port: 8080,
      memoryUsage: 256,
      lastDeployed: '2024-01-12 14:30:00'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4" />;
      case 'stopped': return <Pause className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'text-red-600';
    if (usage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleStartService = (id: string) => {
    console.log('Starting service:', id);
  };

  const handleStopService = (id: string) => {
    console.log('Stopping service:', id);
  };

  const handleRestartService = (id: string) => {
    console.log('Restarting service:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Management</h1>
          <p className="text-gray-600">Monitor and manage servers, databases, and applications</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            <span>Deploy Update</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>System Report</span>
          </AnimatedButton>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Servers"
          subtitle="Active systems"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">2 running, 1 maintenance</p>
            </div>
            <Server className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Database Status"
          subtitle="Storage and performance"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-500">Storage used</p>
            </div>
            <Database className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Applications"
          subtitle="Deployed services"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">2 running, 1 error</p>
            </div>
            <Monitor className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="System Health"
          subtitle="Overall status"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-500">Health score</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('servers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'servers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4" />
                <span>Servers</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('databases')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'databases'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Databases</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>Applications</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'servers' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Server Resources</h3>
              <div className="space-y-4">
                {systemResources.filter(resource => resource.type === 'server').map((server) => (
                  <div key={server.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Server className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{server.name}</h4>
                          <p className="text-sm text-gray-500">Uptime: {server.uptime}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                          {getStatusIcon(server.status)}
                          <span className="ml-1 capitalize">{server.status}</span>
                        </span>
                        <div className="flex space-x-2">
                          <AnimatedButton
                            onClick={() => handleStartService(server.id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Play className="w-4 h-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handleStopService(server.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Pause className="w-4 h-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handleRestartService(server.id)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <Cpu className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">CPU</span>
                        </div>
                        <p className={`text-lg font-bold ${getUsageColor(server.cpuUsage)}`}>
                          {server.cpuUsage}%
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <MemoryStick className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Memory</span>
                        </div>
                        <p className={`text-lg font-bold ${getUsageColor(server.memoryUsage)}`}>
                          {server.memoryUsage}%
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <HardDrive className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Disk</span>
                        </div>
                        <p className={`text-lg font-bold ${getUsageColor(server.diskUsage)}`}>
                          {server.diskUsage}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'databases' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Database Systems</h3>
              <div className="space-y-4">
                {systemResources.filter(resource => resource.type === 'database').map((database) => (
                  <div key={database.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{database.name}</h4>
                          <p className="text-sm text-gray-500">Uptime: {database.uptime}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(database.status)}`}>
                        {getStatusIcon(database.status)}
                        <span className="ml-1 capitalize">{database.status}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <Cpu className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">CPU</span>
                        </div>
                        <p className={`text-lg font-bold ${getUsageColor(database.cpuUsage)}`}>
                          {database.cpuUsage}%
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <MemoryStick className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Memory</span>
                        </div>
                        <p className={`text-lg font-bold ${getUsageColor(database.memoryUsage)}`}>
                          {database.memoryUsage}%
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <HardDrive className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Storage</span>
                        </div>
                        <p className={`text-lg font-bold ${getUsageColor(database.diskUsage)}`}>
                          {database.diskUsage}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Deployed Applications</h3>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{app.name}</h4>
                          <p className="text-sm text-gray-500">Version: {app.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </span>
                        <div className="flex space-x-2">
                          <AnimatedButton
                            onClick={() => handleStartService(app.id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Play className="w-4 h-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handleStopService(app.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Pause className="w-4 h-4" />
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Port:</span>
                        <span className="ml-2 font-medium">{app.port}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Memory:</span>
                        <span className="ml-2 font-medium">{app.memoryUsage} MB</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Deployed:</span>
                        <span className="ml-2 font-medium">{app.lastDeployed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemManagement;
