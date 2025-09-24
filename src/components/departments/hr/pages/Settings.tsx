import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Calendar, 
  Clock,
  DollarSign,
  Edit,
  Save,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  GraduationCap,
  Gift,
  Search,
  Folder
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { settingsAPI } from '../../../../services/api';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

interface Setting {
  id: string;
  category: string;
  name: string;
  value: string;
  type: string;
  description: string;
  isEnabled: boolean;
  lastUpdated: string;
  updatedBy: string;
  options?: string[];
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState<Setting[]>([]);

  // Fetch settings data with API
  const { 
    items: settingsData, 
    loading, 
    error, 
    refetch, 
    filters, 
    updateFilters,
    total,
    currentPage,
    totalPages
  } = useApiList(settingsAPI.getAll, {
    page: 1,
    limit: 50,
    search: "",
    category: "all",
    type: "all"
  });

  // Fetch settings stats
  const [statsData, setStatsData] = useState({
    total: 0,
    enabled: 0,
    disabled: 0,
    categories: 0,
    types: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await settingsAPI.getStats();
      setStatsData(response.data);
    } catch (error) {
      console.error('Error fetching settings stats:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value, page: 1 });
  };

  const handleCategoryFilter = (category: string) => {
    setActiveTab(category.toLowerCase());
    updateFilters({ category, page: 1 });
  };

  const handleSettingToggle = (settingId: string) => {
    // Implementation for toggling settings
    console.log('Toggle setting:', settingId);
  };

  const settingsStats = [
    { 
      title: 'Total Settings', 
      value: (statsData?.total || 0).toString(), 
      change: '+2', 
      icon: SettingsIcon, 
      color: 'text-blue-600',
      subtitle: 'System configurations'
    },
    { 
      title: 'Enabled', 
      value: (statsData?.enabled || 0).toString(), 
      change: '+5', 
      icon: CheckCircle, 
      color: 'text-green-600',
      subtitle: 'Active settings'
    },
    { 
      title: 'Categories', 
      value: (statsData?.categories || 0).toString(), 
      change: '+1', 
      icon: Folder, 
      color: 'text-purple-600',
      subtitle: 'Setting groups'
    },
    { 
      title: 'Last Updated', 
      value: '2 hours ago', 
      change: 'Recent', 
      icon: Clock, 
      color: 'text-orange-600',
      subtitle: 'System changes'
    }
  ];

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'payroll', name: 'Payroll', icon: DollarSign },
    { id: 'leave', name: 'Leave', icon: Calendar },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'training', name: 'Training', icon: GraduationCap },
    { id: 'benefits', name: 'Benefits', icon: Gift }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'General': return 'bg-blue-100 text-blue-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Notifications': return 'bg-green-100 text-green-800';
      case 'Payroll': return 'bg-purple-100 text-purple-800';
      case 'Leave': return 'bg-orange-100 text-orange-800';
      case 'Attendance': return 'bg-teal-100 text-teal-800';
      case 'Training': return 'bg-indigo-100 text-indigo-800';
      case 'Benefits': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isEnabled: boolean) => {
    return isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredSettings = settingsData?.filter((setting: Setting) => {
    const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || setting.category.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  }) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <SettingsIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">HR Settings</h1>
                    <p className="text-slate-600 text-lg">Configure HR system settings and preferences</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AnimatedButton
                  onClick={() => {}}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg font-medium"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Reset to Default</span>
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => {}}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg font-medium"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>

      {/* Settings Overview */}
      <AnimatedCard
        title="Settings Overview"
        subtitle="System configuration summary"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <SettingsIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Total Settings</p>
                <p className="text-2xl font-bold text-blue-900">{statsData.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Enabled</p>
                <p className="text-2xl font-bold text-green-900">{statsData.enabled}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-orange-900">Disabled</p>
                <p className="text-2xl font-bold text-orange-900">{statsData.disabled}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Info className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-900">Categories</p>
                <p className="text-2xl font-bold text-purple-900">{statsData.categories}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Settings Tabs */}
      <AnimatedCard
        title="Configuration Settings"
        subtitle="Manage system settings by category"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryFilter(tab.name)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex-1"
            />
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-4">
          {filteredSettings.map((setting: Setting, index: number) => (
            <div
              key={setting.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(setting.category)}`}>
                      {setting.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(setting.isEnabled)}`}>
                      {setting.isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{setting.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{setting.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Value: {setting.value}</span>
                    <span>Type: {setting.type}</span>
                    <span>Updated: {setting.lastUpdated}</span>
                    <span>By: {setting.updatedBy}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <AnimatedButton
                    onClick={() => handleSettingToggle(setting.id)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                      setting.isEnabled
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {setting.isEnabled ? 'Disable' : 'Enable'}
                  </AnimatedButton>
                  
                  <AnimatedButton
                    onClick={() => {}}
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </AnimatedButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common settings management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 transform hover:scale-105"
          >
            <Download className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Export Settings</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200 transform hover:scale-105"
          >
            <Upload className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Import Settings</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-200 transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Reset All</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-200 transform hover:scale-105"
          >
            <Save className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Backup Settings</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
      </div>
    </div>
  );
};

export default Settings; 