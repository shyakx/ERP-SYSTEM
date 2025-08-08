import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Server, 
  Lock, 
  Globe, 
  Bell, 
  Eye, 
  Download, 
  Upload,
  RefreshCw,
  Save,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Cpu,
  HardDrive,
  Network,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Palette,
  Languages,
  Calendar,
  Clock as ClockIcon,
  Activity
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoBackup: true,
    securityLevel: 'high',
    maintenanceMode: false
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'backup', name: 'Backup', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'performance', name: 'Performance', icon: Zap }
  ];

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: '68%',
      status: 'normal',
      icon: Cpu,
      color: 'text-blue-600'
    },
    {
      name: 'Memory Usage',
      value: '72%',
      status: 'warning',
      icon: Activity,
      color: 'text-yellow-600'
    },
    {
      name: 'Disk Space',
      value: '45%',
      status: 'normal',
      icon: HardDrive,
      color: 'text-green-600'
    },
    {
      name: 'Network',
      value: '95%',
      status: 'excellent',
      icon: Network,
      color: 'text-purple-600'
    }
  ];

  const securitySettings = [
    {
      title: 'Two-Factor Authentication',
      description: 'Require 2FA for all users',
      enabled: true,
      icon: Shield
    },
    {
      title: 'Session Timeout',
      description: 'Auto-logout after 30 minutes',
      enabled: true,
      icon: Clock
    },
    {
      title: 'IP Whitelist',
      description: 'Restrict access to specific IPs',
      enabled: false,
      icon: Globe
    },
    {
      title: 'Audit Logging',
      description: 'Log all system activities',
      enabled: true,
      icon: Eye
    }
  ];

  const backupSettings = [
    {
      title: 'Auto Backup',
      description: 'Daily automatic backups',
      enabled: true,
      icon: Database
    },
    {
      title: 'Cloud Storage',
      description: 'Backup to cloud storage',
      enabled: true,
      icon: Upload
    },
    {
      title: 'Encryption',
      description: 'Encrypt backup files',
      enabled: true,
      icon: Lock
    },
    {
      title: 'Retention Policy',
      description: 'Keep backups for 30 days',
      enabled: true,
      icon: Calendar
    }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Palette className="w-6 h-6 mr-3 text-purple-600" />
            Theme Settings
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-300">
              <span className="text-sm font-semibold text-gray-700">Theme Mode</span>
              <select 
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-300">
              <span className="text-sm font-semibold text-gray-700">Language</span>
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Bell className="w-6 h-6 mr-3 text-purple-600" />
            Notification Settings
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-300">
              <span className="text-sm font-semibold text-gray-700">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-300">
              <span className="text-sm font-semibold text-gray-700">Maintenance Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
          <Shield className="w-6 h-6 mr-3 text-purple-600" />
          Security Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securitySettings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div key={index} className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{setting.title}</h4>
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={setting.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
          <Database className="w-6 h-6 mr-3 text-purple-600" />
          Backup Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {backupSettings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div key={index} className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{setting.title}</h4>
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={setting.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-purple-600" />
          System Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="group p-6 rounded-2xl bg-gradient-to-r from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color.replace('text-', 'bg-')} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{metric.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <div className={`w-4 h-4 rounded-full shadow-lg ${
                    metric.status === 'excellent' ? 'bg-green-500' :
                    metric.status === 'normal' ? 'bg-blue-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative bg-gradient-to-r from-purple-600/90 to-purple-800/90 backdrop-blur-xl rounded-3xl p-8 text-white shadow-2xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3 flex items-center bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                <Settings className="w-10 h-10 mr-4 drop-shadow-lg" />
                System Settings
              </h1>
              <p className="text-purple-100 text-xl font-medium">Configure system preferences and security settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg">
                <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Save Changes</span>
              </button>
              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50">
        <div className="border-b border-gray-200/50">
          <nav className="flex space-x-8 px-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-6 px-2 border-b-2 font-bold text-sm transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'backup' && renderBackupSettings()}
          {activeTab === 'notifications' && renderGeneralSettings()}
          {activeTab === 'performance' && renderPerformanceSettings()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings; 