import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Settings, 
  Shield, 
  Users, 
  Clock, 
  MapPin, 
  Radio, 
  Camera, 
  Bell,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface SecuritySettings {
  patrolInterval: number;
  responseTimeThreshold: number;
  maxGuardsPerShift: number;
  emergencyContact: string;
  backupContact: string;
  autoReportGeneration: boolean;
  incidentNotification: boolean;
  patrolReminders: boolean;
  systemAlerts: boolean;
}

interface SystemSettings {
  cameraRetention: number;
  radioChannelCount: number;
  backupFrequency: string;
  systemMaintenance: string;
  dataEncryption: boolean;
  accessLogging: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
}

const OperationsSettings: React.FC = () => {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    patrolInterval: 120,
    responseTimeThreshold: 5,
    maxGuardsPerShift: 8,
    emergencyContact: '+250 788 123 456',
    backupContact: '+250 788 234 567',
    autoReportGeneration: true,
    incidentNotification: true,
    patrolReminders: true,
    systemAlerts: true
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    cameraRetention: 30,
    radioChannelCount: 6,
    backupFrequency: 'daily',
    systemMaintenance: 'sunday',
    dataEncryption: true,
    accessLogging: true,
    twoFactorAuth: true,
    sessionTimeout: 30
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', { securitySettings, systemSettings });
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSecuritySettings({
      patrolInterval: 120,
      responseTimeThreshold: 5,
      maxGuardsPerShift: 8,
      emergencyContact: '+250 788 123 456',
      backupContact: '+250 788 234 567',
      autoReportGeneration: true,
      incidentNotification: true,
      patrolReminders: true,
      systemAlerts: true
    });

    setSystemSettings({
      cameraRetention: 30,
      radioChannelCount: 6,
      backupFrequency: 'daily',
      systemMaintenance: 'sunday',
      dataEncryption: true,
      accessLogging: true,
      twoFactorAuth: true,
      sessionTimeout: 30
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Operations Settings</h2>
          <p className="text-gray-600">Configure security operations and system settings</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={handleResetSettings}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Security Operations Settings */}
      <AnimatedCard
        title="Security Operations Settings"
        subtitle="Configure security operations parameters"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patrol Interval (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.patrolInterval}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  patrolInterval: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="30"
                max="480"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Time Threshold (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.responseTimeThreshold}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  responseTimeThreshold: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Guards Per Shift
              </label>
              <input
                type="number"
                value={securitySettings.maxGuardsPerShift}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  maxGuardsPerShift: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="tel"
                value={securitySettings.emergencyContact}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  emergencyContact: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+250 788 123 456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Contact
              </label>
              <input
                type="tel"
                value={securitySettings.backupContact}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  backupContact: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+250 788 234 567"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Notification Settings</h4>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.autoReportGeneration}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    autoReportGeneration: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Auto Report Generation</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.incidentNotification}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    incidentNotification: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Incident Notifications</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.patrolReminders}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    patrolReminders: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Patrol Reminders</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.systemAlerts}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    systemAlerts: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">System Alerts</span>
              </label>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* System Settings */}
      <AnimatedCard
        title="System Settings"
        subtitle="Configure system parameters and security"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Camera Data Retention (days)
              </label>
              <input
                type="number"
                value={systemSettings.cameraRetention}
                onChange={(e) => setSystemSettings(prev => ({
                  ...prev,
                  cameraRetention: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="7"
                max="365"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Radio Channel Count
              </label>
              <input
                type="number"
                value={systemSettings.radioChannelCount}
                onChange={(e) => setSystemSettings(prev => ({
                  ...prev,
                  radioChannelCount: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={systemSettings.backupFrequency}
                onChange={(e) => setSystemSettings(prev => ({
                  ...prev,
                  backupFrequency: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Maintenance Day
              </label>
              <select
                value={systemSettings.systemMaintenance}
                onChange={(e) => setSystemSettings(prev => ({
                  ...prev,
                  systemMaintenance: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => setSystemSettings(prev => ({
                  ...prev,
                  sessionTimeout: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="5"
                max="480"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Security Settings</h4>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={systemSettings.dataEncryption}
                  onChange={(e) => setSystemSettings(prev => ({
                    ...prev,
                    dataEncryption: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Data Encryption</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={systemSettings.accessLogging}
                  onChange={(e) => setSystemSettings(prev => ({
                    ...prev,
                    accessLogging: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Access Logging</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={systemSettings.twoFactorAuth}
                  onChange={(e) => setSystemSettings(prev => ({
                    ...prev,
                    twoFactorAuth: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Two-Factor Authentication</span>
              </label>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">System Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-900">2024-01-15 02:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Usage</span>
                  <span className="text-sm text-gray-900">78% (2.3 TB / 3 TB)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Cameras</span>
                  <span className="text-sm text-gray-900">8 / 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="System maintenance and management"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Restart System</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <Save className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Backup Now</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Security Scan</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Test Alerts</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default OperationsSettings;
