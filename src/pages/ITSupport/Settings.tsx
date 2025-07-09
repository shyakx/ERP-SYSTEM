import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings as SettingsIcon, Users, Shield, Database, Bell, Globe, Palette, Key, Lock, Eye, EyeOff, Save, RefreshCw, Trash2, Edit, Plus, Download, Upload } from 'lucide-react';

interface SystemSetting {
  id: string;
  category: 'general' | 'security' | 'notifications' | 'appearance' | 'backup' | 'integration';
  name: string;
  description: string;
  value: string | boolean | number;
  type: 'text' | 'number' | 'boolean' | 'select' | 'textarea';
  options?: string[];
  required: boolean;
  lastModified: string;
  modifiedBy: string;
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isActive: boolean;
  createdAt: string;
}

const mockSystemSettings: SystemSetting[] = [
  {
    id: '1',
    category: 'general',
    name: 'Company Name',
    description: 'The name of your organization',
    value: 'DICEL Security Company Ltd',
    type: 'text',
    required: true,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '2',
    category: 'general',
    name: 'System Timezone',
    description: 'Default timezone for the system',
    value: 'UTC+00:00',
    type: 'select',
    options: ['UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC-05:00', 'UTC-08:00'],
    required: true,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '3',
    category: 'security',
    name: 'Password Policy',
    description: 'Minimum password requirements',
    value: 'Strong',
    type: 'select',
    options: ['Basic', 'Strong', 'Very Strong'],
    required: true,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '4',
    category: 'security',
    name: 'Session Timeout',
    description: 'Automatic logout after inactivity (minutes)',
    value: '30',
    type: 'number',
    required: true,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '5',
    category: 'security',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for all users',
    value: true,
    type: 'boolean',
    required: false,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '6',
    category: 'notifications',
    name: 'Email Notifications',
    description: 'Send email notifications for system events',
    value: true,
    type: 'boolean',
    required: false,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '7',
    category: 'appearance',
    name: 'Theme',
    description: 'System theme preference',
    value: 'Light',
    type: 'select',
    options: ['Light', 'Dark', 'Auto'],
    required: true,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  },
  {
    id: '8',
    category: 'backup',
    name: 'Auto Backup',
    description: 'Enable automatic system backups',
    value: true,
    type: 'boolean',
    required: false,
    lastModified: '2024-01-31T10:00:00',
    modifiedBy: 'John Smith'
  }
];

const mockUserRoles: UserRole[] = [
  {
    id: '1',
    name: 'system_admin',
    description: 'Full system access and configuration',
    permissions: ['all'],
    userCount: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: '2',
    name: 'operations_supervisor',
    description: 'Manage employees, shifts, and operations',
    permissions: ['manage_employees', 'manage_shifts', 'view_reports', 'manage_incidents'],
    userCount: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: '3',
    name: 'finance_manager',
    description: 'Manage financial operations and reports',
    permissions: ['manage_payroll', 'manage_invoicing', 'view_reports', 'export_data'],
    userCount: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: '4',
    name: 'security_guard',
    description: 'Basic security operations and incident reporting',
    permissions: ['view_incidents', 'report_incidents', 'view_schedule'],
    userCount: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: '5',
    name: 'it_support_officer',
    description: 'Technical support and system maintenance',
    permissions: ['view_audit_logs', 'manage_system_settings', 'view_reports'],
    userCount: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00'
  }
];

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SystemSetting[]>(mockSystemSettings);
  const [userRoles, setUserRoles] = useState<UserRole[]>(mockUserRoles);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'users' | 'backup' | 'integrations'>('general');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<SystemSetting | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const canManageSettings = user?.role === 'system_admin' || user?.role === 'it_support_officer';

  const filteredSettings = settings.filter(setting => {
    const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || setting.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return <SettingsIcon className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'notifications': return <Bell className="w-5 h-5" />;
      case 'appearance': return <Palette className="w-5 h-5" />;
      case 'backup': return <Database className="w-5 h-5" />;
      case 'integration': return <Globe className="w-5 h-5" />;
      default: return <SettingsIcon className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'notifications': return 'bg-yellow-100 text-yellow-800';
      case 'appearance': return 'bg-purple-100 text-purple-800';
      case 'backup': return 'bg-green-100 text-green-800';
      case 'integration': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditSetting = (setting: SystemSetting) => {
    setSelectedSetting(setting);
    setShowEditModal(true);
  };

  const handleSaveSetting = (updatedSetting: SystemSetting) => {
    setSettings(settings.map(s => s.id === updatedSetting.id ? updatedSetting : s));
    setShowEditModal(false);
    setSelectedSetting(null);
  };

  const getTotalSettings = () => settings.length;
  const getSecuritySettings = () => settings.filter(s => s.category === 'security').length;
  const getActiveRoles = () => userRoles.filter(role => role.isActive).length;
  const getTotalUsers = () => userRoles.reduce((total, role) => total + role.userCount, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings & Configuration</h1>
            <p className="text-gray-600 mt-1">Manage system settings, user roles, and configurations</p>
          </div>
          {canManageSettings && (
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Config</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import Config</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Settings</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalSettings()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Security Settings</p>
              <p className="text-2xl font-bold text-gray-900">{getSecuritySettings()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Roles</p>
              <p className="text-2xl font-bold text-gray-900">{getActiveRoles()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalUsers()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
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
              General Settings
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'backup'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Backup & Restore
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Integrations
            </button>
          </nav>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'general' && (
        <div>
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search settings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="security">Security</option>
                <option value="notifications">Notifications</option>
                <option value="appearance">Appearance</option>
                <option value="backup">Backup</option>
                <option value="integration">Integration</option>
              </select>

              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset to Default</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSettings.map((setting) => (
                    <tr key={setting.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{setting.name}</div>
                          <div className="text-sm text-gray-500">{setting.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(setting.category)}`}>
                          {getCategoryIcon(setting.category)}
                          <span className="ml-1 capitalize">{setting.category}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {setting.type === 'boolean' ? (
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              setting.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {setting.value ? 'Enabled' : 'Disabled'}
                            </span>
                          ) : (
                            setting.value.toString()
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(setting.lastModified)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {canManageSettings && (
                          <button
                            onClick={() => handleEditSetting(setting)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit Setting"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-green-800">Two-Factor Authentication</div>
                  <div className="text-sm text-green-600">Enabled for all users</div>
                </div>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-semibold text-yellow-800">Password Policy</div>
                  <div className="text-sm text-yellow-600">Strong password requirements</div>
                </div>
                <Key className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-blue-800">Session Management</div>
                  <div className="text-sm text-blue-600">30-minute timeout</div>
                </div>
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Failed Login Attempts (24h)</span>
                <span className="font-semibold text-red-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Sessions</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Locked Accounts</span>
                <span className="font-semibold text-yellow-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Alerts</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">User Roles & Permissions</h3>
              {canManageSettings && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userRoles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 capitalize">{role.name.replace('_', ' ')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{role.userCount} users</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {role.permissions.length} permissions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          role.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {role.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {canManageSettings && (
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1" title="Edit Role">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1" title="Delete Role">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Configuration</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-green-800">Auto Backup</div>
                  <div className="text-sm text-green-600">Enabled - Daily backups</div>
                </div>
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-blue-800">Last Backup</div>
                  <div className="text-sm text-blue-600">Today at 2:00 AM</div>
                </div>
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-semibold text-yellow-800">Backup Size</div>
                  <div className="text-sm text-yellow-600">2.4 GB</div>
                </div>
                <Database className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Actions</h3>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Create Backup Now</span>
              </button>
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Latest Backup</span>
              </button>
              <button className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Restore from Backup</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <div className="font-semibold text-red-800">API Access</div>
                  <div className="text-sm text-red-600">Disabled</div>
                </div>
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <div className="flex">
                    <input
                      type="password"
                      value="sk-1234567890abcdef"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                    <button className="px-3 py-2 border border-gray-300 border-l-0 rounded-r-lg hover:bg-gray-50">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Integrations</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">Email Service</div>
                  <div className="text-sm text-gray-600">Not configured</div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Configure</button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">SMS Gateway</div>
                  <div className="text-sm text-gray-600">Not configured</div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Configure</button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">Payment Gateway</div>
                  <div className="text-sm text-gray-600">Not configured</div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Configure</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Setting Modal */}
      {showEditModal && selectedSetting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Setting</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Setting Name</label>
                  <p className="text-sm text-gray-900">{selectedSetting.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-sm text-gray-500">{selectedSetting.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  {selectedSetting.type === 'boolean' ? (
                    <select
                      value={selectedSetting.value.toString()}
                      onChange={(e) => handleSaveSetting({
                        ...selectedSetting,
                        value: e.target.value === 'true'
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  ) : selectedSetting.type === 'select' && selectedSetting.options ? (
                    <select
                      value={selectedSetting.value.toString()}
                      onChange={(e) => handleSaveSetting({
                        ...selectedSetting,
                        value: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {selectedSetting.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={selectedSetting.value.toString()}
                      onChange={(e) => handleSaveSetting({
                        ...selectedSetting,
                        value: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage; 