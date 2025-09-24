import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Settings, 
  Save,
  Edit,
  Eye,
  EyeOff,
  User,
  Building,
  Shield,
  Bell,
  FileText,
  Calendar,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Unlock,
  Download,
  Upload,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';

interface LegalSettings {
  general: {
    companyName: string;
    legalEntity: string;
    registrationNumber: string;
    taxId: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    timezone: string;
    currency: string;
    language: string;
  };
  compliance: {
    autoRenewal: boolean;
    complianceMonitoring: boolean;
    auditFrequency: string;
    riskAssessmentFrequency: string;
    policyReviewFrequency: string;
    trainingFrequency: string;
    notificationDays: number;
    escalationThreshold: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    contractExpiry: boolean;
    complianceDeadlines: boolean;
    riskAlerts: boolean;
    auditReminders: boolean;
    policyUpdates: boolean;
    trainingReminders: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordPolicy: string;
    accessLogging: boolean;
    ipRestrictions: boolean;
    dataEncryption: boolean;
    backupFrequency: string;
    retentionPeriod: number;
  };
  integrations: {
    documentManagement: boolean;
    eSignature: boolean;
    complianceSoftware: boolean;
    riskManagement: boolean;
    auditTools: boolean;
    reportingTools: boolean;
    apiAccess: boolean;
    webhookNotifications: boolean;
  };
  reporting: {
    defaultFormat: string;
    autoGeneration: boolean;
    scheduleReports: boolean;
    reportRetention: number;
    dataExport: boolean;
    analyticsEnabled: boolean;
    dashboardRefresh: number;
    customMetrics: boolean;
  };
}

const LegalSettings: React.FC = () => {
  const [settings, setSettings] = useState<LegalSettings>({
    general: {
      companyName: 'DICEL Security Services Ltd',
      legalEntity: 'DICEL Security Services Ltd',
      registrationNumber: 'RDB-2023-001234',
      taxId: 'TIN-123456789',
      address: 'KG 123 St, Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'legal@dicel.rw',
      website: 'www.dicel.rw',
      timezone: 'Africa/Kigali',
      currency: 'RWF',
      language: 'English'
    },
    compliance: {
      autoRenewal: true,
      complianceMonitoring: true,
      auditFrequency: 'quarterly',
      riskAssessmentFrequency: 'monthly',
      policyReviewFrequency: 'annually',
      trainingFrequency: 'quarterly',
      notificationDays: 30,
      escalationThreshold: 'high'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      contractExpiry: true,
      complianceDeadlines: true,
      riskAlerts: true,
      auditReminders: true,
      policyUpdates: true,
      trainingReminders: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      accessLogging: true,
      ipRestrictions: false,
      dataEncryption: true,
      backupFrequency: 'daily',
      retentionPeriod: 7
    },
    integrations: {
      documentManagement: true,
      eSignature: true,
      complianceSoftware: false,
      riskManagement: true,
      auditTools: false,
      reportingTools: true,
      apiAccess: true,
      webhookNotifications: false
    },
    reporting: {
      defaultFormat: 'PDF',
      autoGeneration: true,
      scheduleReports: true,
      reportRetention: 365,
      dataExport: true,
      analyticsEnabled: true,
      dashboardRefresh: 15,
      customMetrics: true
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'integrations', name: 'Integrations', icon: Settings },
    { id: 'reporting', name: 'Reporting', icon: FileText }
  ];

  const handleSettingChange = (section: keyof LegalSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    // Implement save functionality
    console.log('Saving settings:', settings);
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleResetSettings = () => {
    // Implement reset functionality
    console.log('Resetting settings');
    setHasChanges(false);
  };

  const handleExportSettings = () => {
    // Implement export functionality
    console.log('Exporting settings');
  };

  const handleImportSettings = () => {
    // Implement import functionality
    console.log('Importing settings');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={settings.general.companyName}
            onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Legal Entity</label>
          <input
            type="text"
            value={settings.general.legalEntity}
            onChange={(e) => handleSettingChange('general', 'legalEntity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
          <input
            type="text"
            value={settings.general.registrationNumber}
            onChange={(e) => handleSettingChange('general', 'registrationNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
          <input
            type="text"
            value={settings.general.taxId}
            onChange={(e) => handleSettingChange('general', 'taxId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={settings.general.address}
            onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            value={settings.general.phone}
            onChange={(e) => handleSettingChange('general', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.general.email}
            onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="text"
            value={settings.general.website}
            onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="Africa/Kigali">Africa/Kigali</option>
            <option value="UTC">UTC</option>
            <option value="Africa/Nairobi">Africa/Nairobi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.general.currency}
            onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="RWF">RWF (Rwandan Franc)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="EUR">EUR (Euro)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Kinyarwanda">Kinyarwanda</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderComplianceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Auto Renewal</h4>
            <p className="text-sm text-gray-500">Automatically renew contracts and licenses</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.compliance.autoRenewal}
              onChange={(e) => handleSettingChange('compliance', 'autoRenewal', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Compliance Monitoring</h4>
            <p className="text-sm text-gray-500">Enable real-time compliance monitoring</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.compliance.complianceMonitoring}
              onChange={(e) => handleSettingChange('compliance', 'complianceMonitoring', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audit Frequency</label>
          <select
            value={settings.compliance.auditFrequency}
            onChange={(e) => handleSettingChange('compliance', 'auditFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Assessment Frequency</label>
          <select
            value={settings.compliance.riskAssessmentFrequency}
            onChange={(e) => handleSettingChange('compliance', 'riskAssessmentFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Policy Review Frequency</label>
          <select
            value={settings.compliance.policyReviewFrequency}
            onChange={(e) => handleSettingChange('compliance', 'policyReviewFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Training Frequency</label>
          <select
            value={settings.compliance.trainingFrequency}
            onChange={(e) => handleSettingChange('compliance', 'trainingFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notification Days</label>
          <input
            type="number"
            value={settings.compliance.notificationDays}
            onChange={(e) => handleSettingChange('compliance', 'notificationDays', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Escalation Threshold</label>
          <select
            value={settings.compliance.escalationThreshold}
            onChange={(e) => handleSettingChange('compliance', 'escalationThreshold', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-gray-500">
                {key === 'emailNotifications' && 'Send email notifications'}
                {key === 'smsNotifications' && 'Send SMS notifications'}
                {key === 'contractExpiry' && 'Notify about contract expirations'}
                {key === 'complianceDeadlines' && 'Notify about compliance deadlines'}
                {key === 'riskAlerts' && 'Send risk alerts'}
                {key === 'auditReminders' && 'Send audit reminders'}
                {key === 'policyUpdates' && 'Notify about policy updates'}
                {key === 'trainingReminders' && 'Send training reminders'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                className="sr-only peer"
                disabled={!isEditing}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Require 2FA for all users</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Access Logging</h4>
            <p className="text-sm text-gray-500">Log all system access</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.accessLogging}
              onChange={(e) => handleSettingChange('security', 'accessLogging', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">IP Restrictions</h4>
            <p className="text-sm text-gray-500">Restrict access by IP address</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.ipRestrictions}
              onChange={(e) => handleSettingChange('security', 'ipRestrictions', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Data Encryption</h4>
            <p className="text-sm text-gray-500">Encrypt sensitive data</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.dataEncryption}
              onChange={(e) => handleSettingChange('security', 'dataEncryption', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="basic">Basic</option>
            <option value="strong">Strong</option>
            <option value="very-strong">Very Strong</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={settings.security.backupFrequency}
            onChange={(e) => handleSettingChange('security', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={settings.security.retentionPeriod}
            onChange={(e) => handleSettingChange('security', 'retentionPeriod', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.integrations).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-gray-500">
                {key === 'documentManagement' && 'Enable document management system'}
                {key === 'eSignature' && 'Enable electronic signature'}
                {key === 'complianceSoftware' && 'Enable compliance software'}
                {key === 'riskManagement' && 'Enable risk management system'}
                {key === 'auditTools' && 'Enable audit tools'}
                {key === 'reportingTools' && 'Enable reporting tools'}
                {key === 'apiAccess' && 'Enable API access'}
                {key === 'webhookNotifications' && 'Enable webhook notifications'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange('integrations', key, e.target.checked)}
                className="sr-only peer"
                disabled={!isEditing}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReportingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Format</label>
          <select
            value={settings.reporting.defaultFormat}
            onChange={(e) => handleSettingChange('reporting', 'defaultFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          >
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
            <option value="Word">Word</option>
            <option value="CSV">CSV</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Retention (days)</label>
          <input
            type="number"
            value={settings.reporting.reportRetention}
            onChange={(e) => handleSettingChange('reporting', 'reportRetention', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Refresh (seconds)</label>
          <input
            type="number"
            value={settings.reporting.dashboardRefresh}
            onChange={(e) => handleSettingChange('reporting', 'dashboardRefresh', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!isEditing}
          />
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Auto Generation</h4>
            <p className="text-sm text-gray-500">Automatically generate reports</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reporting.autoGeneration}
              onChange={(e) => handleSettingChange('reporting', 'autoGeneration', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Schedule Reports</h4>
            <p className="text-sm text-gray-500">Enable scheduled report generation</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reporting.scheduleReports}
              onChange={(e) => handleSettingChange('reporting', 'scheduleReports', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Data Export</h4>
            <p className="text-sm text-gray-500">Enable data export functionality</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reporting.dataExport}
              onChange={(e) => handleSettingChange('reporting', 'dataExport', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Analytics Enabled</h4>
            <p className="text-sm text-gray-500">Enable analytics and insights</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reporting.analyticsEnabled}
              onChange={(e) => handleSettingChange('reporting', 'analyticsEnabled', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Custom Metrics</h4>
            <p className="text-sm text-gray-500">Enable custom metrics and KPIs</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reporting.customMetrics}
              onChange={(e) => handleSettingChange('reporting', 'customMetrics', e.target.checked)}
              className="sr-only peer"
              disabled={!isEditing}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'compliance':
        return renderComplianceSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationSettings();
      case 'reporting':
        return renderReportingSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Legal Settings</h2>
          <p className="text-gray-600">Configure legal department settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <div className="flex items-center space-x-2 text-orange-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Unsaved changes</span>
            </div>
          )}
          <AnimatedButton
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            {isEditing ? <EyeOff className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            <span>{isEditing ? 'View Mode' : 'Edit Mode'}</span>
          </AnimatedButton>
          {isEditing && (
            <>
              <AnimatedButton
                onClick={handleSaveSettings}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </AnimatedButton>
              <AnimatedButton
                onClick={handleResetSettings}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                <Minus className="w-4 h-4" />
                <span>Reset</span>
              </AnimatedButton>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <AnimatedButton
            onClick={handleExportSettings}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            <span>Export Settings</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={handleImportSettings}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            <Upload className="w-4 h-4" />
            <span>Import Settings</span>
          </AnimatedButton>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default LegalSettings;
