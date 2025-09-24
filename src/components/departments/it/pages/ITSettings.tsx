import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Database, 
  Server, 
  Wifi, 
  Users, 
  Bell, 
  Clock, 
  Key, 
  Globe, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface SystemConfig {
  id: string;
  category: string;
  name: string;
  value: string | boolean;
  type: 'text' | 'number' | 'boolean' | 'select';
  description: string;
  options?: string[];
}

const ITSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'system' | 'notifications'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  const [systemConfigs, setSystemConfigs] = useState<SystemConfig[]>([
    {
      id: '1',
      category: 'general',
      name: 'System Name',
      value: 'DICEL ERP System',
      type: 'text',
      description: 'The name of the IT system'
    },
    {
      id: '2',
      category: 'general',
      name: 'Maintenance Mode',
      value: false,
      type: 'boolean',
      description: 'Enable maintenance mode for system updates'
    },
    {
      id: '3',
      category: 'general',
      name: 'Auto Backup',
      value: true,
      type: 'boolean',
      description: 'Automatically backup system data'
    },
    {
      id: '4',
      category: 'general',
      name: 'Backup Frequency',
      value: 'daily',
      type: 'select',
      description: 'How often to perform automatic backups',
      options: ['hourly', 'daily', 'weekly', 'monthly']
    },
    {
      id: '5',
      category: 'security',
      name: 'Password Policy',
      value: 'strict',
      type: 'select',
      description: 'Password complexity requirements',
      options: ['basic', 'standard', 'strict', 'maximum']
    },
    {
      id: '6',
      category: 'security',
      name: 'Session Timeout',
      value: '30',
      type: 'number',
      description: 'Session timeout in minutes'
    },
    {
      id: '7',
      category: 'security',
      name: 'Two-Factor Authentication',
      value: true,
      type: 'boolean',
      description: 'Require 2FA for admin access'
    },
    {
      id: '8',
      category: 'security',
      name: 'IP Whitelist',
      value: '192.168.1.0/24',
      type: 'text',
      description: 'Allowed IP addresses for admin access'
    },
    {
      id: '9',
      category: 'system',
      name: 'Max File Upload Size',
      value: '100',
      type: 'number',
      description: 'Maximum file upload size in MB'
    },
    {
      id: '10',
      category: 'system',
      name: 'Database Connection Pool',
      value: '20',
      type: 'number',
      description: 'Number of database connections in pool'
    },
    {
      id: '11',
      category: 'system',
      name: 'Log Level',
      value: 'info',
      type: 'select',
      description: 'System logging level',
      options: ['debug', 'info', 'warn', 'error']
    },
    {
      id: '12',
      category: 'notifications',
      name: 'Email Notifications',
      value: true,
      type: 'boolean',
      description: 'Send email notifications for system events'
    },
    {
      id: '13',
      category: 'notifications',
      name: 'Alert Threshold',
      value: '80',
      type: 'number',
      description: 'System resource usage threshold for alerts (%)'
    },
    {
      id: '14',
      category: 'notifications',
      name: 'Notification Frequency',
      value: 'immediate',
      type: 'select',
      description: 'How often to send notifications',
      options: ['immediate', 'hourly', 'daily', 'weekly']
    }
  ]);

  const handleConfigChange = (id: string, newValue: string | boolean) => {
    setSystemConfigs(prev => 
      prev.map(config => 
        config.id === id ? { ...config, value: newValue } : config
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save configuration logic here
    setHasChanges(false);
    console.log('Configuration saved');
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false);
    console.log('Configuration reset');
  };

  const getConfigsByCategory = (category: string) => {
    return systemConfigs.filter(config => config.category === category);
  };

  const renderConfigInput = (config: SystemConfig) => {
    switch (config.type) {
      case 'text':
        return (
          <input
            type="text"
            value={config.value as string}
            onChange={(e) => handleConfigChange(config.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={config.value as string}
            onChange={(e) => handleConfigChange(config.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.value as boolean}
              onChange={(e) => handleConfigChange(config.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              {config.value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );
      case 'select':
        return (
          <select
            value={config.value as string}
            onChange={(e) => handleConfigChange(config.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {config.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IT Settings</h1>
          <p className="text-gray-600">Configure system settings, security policies, and preferences</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={handleReset}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              hasChanges 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>General</span>
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
            <button
              onClick={() => setActiveTab('system')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'system'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4" />
                <span>System</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getConfigsByCategory('general').map((config) => (
                  <div key={config.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {config.name}
                    </label>
                    {renderConfigInput(config)}
                    <p className="text-xs text-gray-500">{config.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getConfigsByCategory('security').map((config) => (
                  <div key={config.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {config.name}
                    </label>
                    {renderConfigInput(config)}
                    <p className="text-xs text-gray-500">{config.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getConfigsByCategory('system').map((config) => (
                  <div key={config.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {config.name}
                    </label>
                    {renderConfigInput(config)}
                    <p className="text-xs text-gray-500">{config.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getConfigsByCategory('notifications').map((config) => (
                  <div key={config.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {config.name}
                    </label>
                    {renderConfigInput(config)}
                    <p className="text-xs text-gray-500">{config.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard
          title="System Health"
          subtitle="Current status"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Overall Status</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">99.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Restart</span>
              <span className="font-medium">15 days ago</span>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Resource Usage"
          subtitle="Current utilization"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">CPU Usage</span>
              <span className="font-medium text-green-600">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Memory Usage</span>
              <span className="font-medium text-yellow-600">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Disk Usage</span>
              <span className="font-medium text-orange-600">78%</span>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Configuration Status"
          subtitle="Settings validation"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Valid Config</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Valid
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Changes</span>
              <span className={`font-medium ${hasChanges ? 'text-orange-600' : 'text-green-600'}`}>
                {hasChanges ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Saved</span>
              <span className="font-medium">2 hours ago</span>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default ITSettings;
