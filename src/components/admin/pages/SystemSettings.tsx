import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Server, 
  Globe, 
  Bell,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Key,
  Users,
  FileText,
  Calendar,
  Zap,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  value: string | boolean | number;
  type: 'text' | 'number' | 'boolean' | 'select';
  description: string;
  options?: string[];
}

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);

  // Mock system settings data
  const systemSettings: SystemSetting[] = [
    // General Settings
    {
      id: '1',
      category: 'general',
      name: 'System Name',
      value: 'DICEL ERP System',
      type: 'text',
      description: 'The name of your ERP system'
    },
    {
      id: '2',
      category: 'general',
      name: 'Company Name',
      value: 'DICEL Rwanda',
      type: 'text',
      description: 'Your company name'
    },
    {
      id: '3',
      category: 'general',
      name: 'Timezone',
      value: 'Africa/Kigali',
      type: 'select',
      description: 'System timezone',
      options: ['Africa/Kigali', 'UTC', 'America/New_York', 'Europe/London']
    },
    {
      id: '4',
      category: 'general',
      name: 'Language',
      value: 'English',
      type: 'select',
      description: 'System language',
      options: ['English', 'French', 'Kinyarwanda']
    },
    {
      id: '5',
      category: 'general',
      name: 'Maintenance Mode',
      value: false,
      type: 'boolean',
      description: 'Enable maintenance mode'
    },

    // Security Settings
    {
      id: '6',
      category: 'security',
      name: 'Session Timeout',
      value: 30,
      type: 'number',
      description: 'Session timeout in minutes'
    },
    {
      id: '7',
      category: 'security',
      name: 'Password Policy',
      value: 'Strong',
      type: 'select',
      description: 'Password strength requirement',
      options: ['Weak', 'Medium', 'Strong', 'Very Strong']
    },
    {
      id: '8',
      category: 'security',
      name: 'Two-Factor Authentication',
      value: true,
      type: 'boolean',
      description: 'Enable 2FA for all users'
    },
    {
      id: '9',
      category: 'security',
      name: 'Failed Login Attempts',
      value: 5,
      type: 'number',
      description: 'Maximum failed login attempts before lockout'
    },
    {
      id: '10',
      category: 'security',
      name: 'Account Lockout Duration',
      value: 15,
      type: 'number',
      description: 'Account lockout duration in minutes'
    },

    // Database Settings
    {
      id: '11',
      category: 'database',
      name: 'Database Host',
      value: 'localhost',
      type: 'text',
      description: 'Database server hostname'
    },
    {
      id: '12',
      category: 'database',
      name: 'Database Port',
      value: 5432,
      type: 'number',
      description: 'Database server port'
    },
    {
      id: '13',
      category: 'database',
      name: 'Database Name',
      value: 'dicel_erp',
      type: 'text',
      description: 'Database name'
    },
    {
      id: '14',
      category: 'database',
      name: 'Auto Backup',
      value: true,
      type: 'boolean',
      description: 'Enable automatic database backups'
    },
    {
      id: '15',
      category: 'database',
      name: 'Backup Frequency',
      value: 'Daily',
      type: 'select',
      description: 'How often to create backups',
      options: ['Hourly', 'Daily', 'Weekly', 'Monthly']
    },

    // Email Settings
    {
      id: '16',
      category: 'email',
      name: 'SMTP Host',
      value: 'smtp.gmail.com',
      type: 'text',
      description: 'SMTP server hostname'
    },
    {
      id: '17',
      category: 'email',
      name: 'SMTP Port',
      value: 587,
      type: 'number',
      description: 'SMTP server port'
    },
    {
      id: '18',
      category: 'email',
      name: 'Email Encryption',
      value: 'TLS',
      type: 'select',
      description: 'Email encryption method',
      options: ['None', 'SSL', 'TLS']
    },
    {
      id: '19',
      category: 'email',
      name: 'System Email',
      value: 'system@dicel.co.rw',
      type: 'text',
      description: 'System email address'
    }
  ];

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'email', name: 'Email', icon: Bell },
    { id: 'backup', name: 'Backup', icon: Download },
    { id: 'monitoring', name: 'Monitoring', icon: Activity }
  ];

  const systemHealth = {
    cpu: 45,
    memory: 67,
    disk: 78,
    network: 92,
    database: 98,
    uptime: 99.9
  };

  const recentBackups = [
    {
      id: '1',
      name: 'Full System Backup',
      date: '2024-02-15 02:00',
      size: '2.4 GB',
      status: 'completed',
      type: 'automatic'
    },
    {
      id: '2',
      name: 'Database Backup',
      date: '2024-02-14 02:00',
      size: '1.8 GB',
      status: 'completed',
      type: 'automatic'
    },
    {
      id: '3',
      name: 'Manual Backup',
      date: '2024-02-13 15:30',
      size: '2.1 GB',
      status: 'completed',
      type: 'manual'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100';
      case 'in_progress': return 'text-amber-600 bg-amber-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredSettings = systemSettings.filter(setting => setting.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences, security, and maintenance settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </AnimatedButton>
          <AnimatedButton className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </AnimatedButton>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">CPU Usage</h3>
            <p className="text-2xl font-bold text-blue-600">{systemHealth.cpu}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <HardDrive className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Memory</h3>
            <p className="text-2xl font-bold text-green-600">{systemHealth.memory}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900">Disk Usage</h3>
            <p className="text-2xl font-bold text-orange-600">{systemHealth.disk}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Wifi className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Network</h3>
            <p className="text-2xl font-bold text-purple-600">{systemHealth.network}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Server className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-medium text-gray-900">Database</h3>
            <p className="text-2xl font-bold text-indigo-600">{systemHealth.database}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Uptime</h3>
            <p className="text-2xl font-bold text-green-600">{systemHealth.uptime}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Tabs */}
        <div className="lg:col-span-1">
          <AnimatedCard title="Settings Categories">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 border border-blue-200 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </AnimatedCard>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <AnimatedCard title={tabs.find(t => t.id === activeTab)?.name + ' Settings'}>
            {activeTab === 'backup' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Backup Management</h3>
                  <AnimatedButton className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Create Backup</span>
                  </AnimatedButton>
                </div>

                <div className="space-y-4">
                  {recentBackups.map((backup) => {
                    const StatusIcon = getStatusIcon(backup.status);
                    return (
                      <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{backup.name}</h4>
                            <p className="text-sm text-gray-600">
                              {backup.date} • {backup.size} • {backup.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {backup.status}
                          </span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Download className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : activeTab === 'monitoring' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">System Logs</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Error Logs</span>
                        <span className="font-medium text-red-600">2 new</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Warning Logs</span>
                        <span className="font-medium text-yellow-600">5 new</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Info Logs</span>
                        <span className="font-medium text-blue-600">12 new</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-medium text-green-600">245ms</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Throughput</span>
                        <span className="font-medium text-green-600">1,234 req/s</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Error Rate</span>
                        <span className="font-medium text-green-600">0.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSettings.map((setting) => (
                  <div key={setting.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-medium text-gray-900">{setting.name}</label>
                      {setting.type === 'boolean' && (
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.value ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{setting.description}</p>
                    
                    {setting.type === 'text' && (
                      <input
                        type="text"
                        defaultValue={setting.value as string}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                    
                    {setting.type === 'number' && (
                      <input
                        type="number"
                        defaultValue={setting.value as number}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                    
                    {setting.type === 'select' && setting.options && (
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        {setting.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </AnimatedCard>
        </div>
      </div>

      {/* Quick Actions */}
      <AnimatedCard title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Create Backup</h3>
            <p className="text-sm text-gray-600">Manual system backup</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Restart Services</h3>
            <p className="text-sm text-gray-600">Restart system services</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Security Scan</h3>
            <p className="text-sm text-gray-600">Run security audit</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">System Health</h3>
            <p className="text-sm text-gray-600">Check system status</p>
          </button>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SystemSettings; 