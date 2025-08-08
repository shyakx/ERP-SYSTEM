import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Upload, 
  Filter, 
  Search, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Shield,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Target,
  Globe,
  Building,
  MapPin
} from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 1,
      title: 'Monthly Revenue Report',
      description: 'Comprehensive revenue analysis for the current month',
      type: 'financial',
      status: 'completed',
      lastGenerated: '2 hours ago',
      size: '2.3 MB',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      title: 'Employee Performance Report',
      description: 'Individual and team performance metrics',
      type: 'hr',
      status: 'completed',
      lastGenerated: '4 hours ago',
      size: '1.8 MB',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Security Guard Deployment',
      description: 'Current security guard assignments and coverage',
      type: 'security',
      status: 'in-progress',
      lastGenerated: '6 hours ago',
      size: '3.1 MB',
      icon: Shield,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 4,
      title: 'System Health Report',
      description: 'System performance and uptime statistics',
      type: 'technical',
      status: 'completed',
      lastGenerated: '1 day ago',
      size: '0.9 MB',
      icon: Activity,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      title: 'Client Satisfaction Survey',
      description: 'Customer feedback and satisfaction metrics',
      type: 'customer',
      status: 'scheduled',
      lastGenerated: '3 days ago',
      size: '1.5 MB',
      icon: Star,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 6,
      title: 'Inventory Management Report',
      description: 'Stock levels and procurement analysis',
      type: 'operations',
      status: 'completed',
      lastGenerated: '1 week ago',
      size: '2.7 MB',
      icon: Building,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const reportTypes = [
    { id: 'all', name: 'All Reports', count: 24 },
    { id: 'financial', name: 'Financial', count: 8 },
    { id: 'hr', name: 'HR & Personnel', count: 6 },
    { id: 'security', name: 'Security', count: 4 },
    { id: 'technical', name: 'Technical', count: 3 },
    { id: 'customer', name: 'Customer', count: 2 },
    { id: 'operations', name: 'Operations', count: 1 }
  ];

  const quickActions = [
    {
      title: 'Generate New Report',
      description: 'Create a custom report',
      icon: Plus,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Schedule Reports',
      description: 'Set up automated reporting',
      icon: Calendar,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Export All',
      description: 'Download all reports',
      icon: Download,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Report Templates',
      description: 'Manage report templates',
      icon: FileText,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };
    return badges[status] || badges.completed;
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      financial: 'bg-green-100 text-green-800',
      hr: 'bg-blue-100 text-blue-800',
      security: 'bg-yellow-100 text-yellow-800',
      technical: 'bg-purple-100 text-purple-800',
      customer: 'bg-pink-100 text-pink-800',
      operations: 'bg-orange-100 text-orange-800'
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <FileText className="w-8 h-8 mr-3" />
              Reports Center
            </h1>
            <p className="text-purple-100 text-lg">Generate, manage, and export comprehensive reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl flex items-center space-x-2 border border-white/30">
              <Plus className="w-5 h-5" />
              <span>New Report</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl flex items-center space-x-2 border border-white/30">
              <Download className="w-5 h-5" />
              <span>Export All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="group p-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-white border border-gray-200 hover:border-purple-300 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <div 
              key={report.id} 
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${report.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(report.type)}`}>
                    {report.type}
                  </span>
                  <span className="text-xs text-gray-500">{report.size}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Last generated: {report.lastGenerated}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 