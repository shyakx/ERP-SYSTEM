import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, PieChart, TrendingUp, Download, Filter, Calendar, Users, DollarSign, Shield, FileText, AlertTriangle, CheckCircle, Clock, TrendingDown } from 'lucide-react';

interface ReportData {
  id: string;
  name: string;
  type: 'financial' | 'operational' | 'security' | 'hr' | 'client' | 'asset';
  category: string;
  description: string;
  lastGenerated: string;
  generatedBy: string;
  status: 'scheduled' | 'completed' | 'failed' | 'running';
  format: 'pdf' | 'excel' | 'csv' | 'json';
  size: number;
  schedule?: string;
}

interface AnalyticsData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  employees: number;
  clients: number;
  incidents: number;
  assets: number;
}

const mockReports: ReportData[] = [
  {
    id: '1',
    name: 'Monthly Financial Report',
    type: 'financial',
    category: 'Revenue & Expenses',
    description: 'Comprehensive monthly financial overview including revenue, expenses, and profit analysis',
    lastGenerated: '2024-01-31',
    generatedBy: 'John Smith',
    status: 'completed',
    format: 'pdf',
    size: 2048576
  },
  {
    id: '2',
    name: 'Employee Performance Report',
    type: 'hr',
    category: 'Performance Metrics',
    description: 'Employee attendance, productivity, and performance metrics for the month',
    lastGenerated: '2024-01-30',
    generatedBy: 'Sarah Johnson',
    status: 'completed',
    format: 'excel',
    size: 512000
  },
  {
    id: '3',
    name: 'Security Incident Summary',
    type: 'security',
    category: 'Incident Analysis',
    description: 'Monthly security incident report with trends and recommendations',
    lastGenerated: '2024-01-29',
    generatedBy: 'Michael Brown',
    status: 'completed',
    format: 'pdf',
    size: 1024000
  },
  {
    id: '4',
    name: 'Client Satisfaction Survey',
    type: 'client',
    category: 'Client Relations',
    description: 'Quarterly client satisfaction survey results and feedback analysis',
    lastGenerated: '2024-01-15',
    generatedBy: 'Lisa Davis',
    status: 'completed',
    format: 'excel',
    size: 768000
  },
  {
    id: '5',
    name: 'Asset Utilization Report',
    type: 'asset',
    category: 'Asset Management',
    description: 'Asset utilization, maintenance schedules, and depreciation analysis',
    lastGenerated: '2024-01-28',
    generatedBy: 'David Wilson',
    status: 'completed',
    format: 'pdf',
    size: 1536000
  },
  {
    id: '6',
    name: 'Weekly Operations Dashboard',
    type: 'operational',
    category: 'Operations Overview',
    description: 'Weekly operational metrics and key performance indicators',
    lastGenerated: '2024-01-26',
    generatedBy: 'System Auto',
    status: 'scheduled',
    format: 'pdf',
    size: 896000,
    schedule: 'Every Monday 9:00 AM'
  }
];

const mockAnalyticsData: AnalyticsData[] = [
  { period: 'Jan 2024', revenue: 125000, expenses: 85000, profit: 40000, employees: 45, clients: 12, incidents: 8, assets: 156 },
  { period: 'Feb 2024', revenue: 132000, expenses: 88000, profit: 44000, employees: 47, clients: 13, incidents: 6, assets: 162 },
  { period: 'Mar 2024', revenue: 128000, expenses: 87000, profit: 41000, employees: 46, clients: 12, incidents: 9, assets: 158 },
  { period: 'Apr 2024', revenue: 135000, expenses: 90000, profit: 45000, employees: 48, clients: 14, incidents: 7, assets: 165 },
  { period: 'May 2024', revenue: 142000, expenses: 92000, profit: 50000, employees: 49, clients: 15, incidents: 5, assets: 168 },
  { period: 'Jun 2024', revenue: 138000, expenses: 89000, profit: 49000, employees: 48, clients: 14, incidents: 8, assets: 166 }
];

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportData[]>(mockReports);
  const [analyticsData] = useState<AnalyticsData[]>(mockAnalyticsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'reports' | 'analytics' | 'scheduled'>('reports');

  const canGenerateReports = user?.role === 'system_admin' || user?.role === 'operations_supervisor' || user?.role === 'finance_manager';

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign className="w-5 h-5" />;
      case 'operational': return <TrendingUp className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'hr': return <Users className="w-5 h-5" />;
      case 'client': return <Users className="w-5 h-5" />;
      case 'asset': return <FileText className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalReports = () => reports.length;
  const getCompletedReports = () => reports.filter(report => report.status === 'completed').length;
  const getScheduledReports = () => reports.filter(report => report.status === 'scheduled').length;
  const getTotalFileSize = () => reports.reduce((total, report) => total + report.size, 0);

  const getLatestRevenue = () => analyticsData[analyticsData.length - 1]?.revenue || 0;
  const getLatestProfit = () => analyticsData[analyticsData.length - 1]?.profit || 0;
  const getLatestEmployees = () => analyticsData[analyticsData.length - 1]?.employees || 0;
  const getLatestClients = () => analyticsData[analyticsData.length - 1]?.clients || 0;

  const getRevenueGrowth = () => {
    if (analyticsData.length < 2) return 0;
    const current = analyticsData[analyticsData.length - 1].revenue;
    const previous = analyticsData[analyticsData.length - 2].revenue;
    return ((current - previous) / previous) * 100;
  };

  const getProfitGrowth = () => {
    if (analyticsData.length < 2) return 0;
    const current = analyticsData[analyticsData.length - 1].profit;
    const previous = analyticsData[analyticsData.length - 2].profit;
    return ((current - previous) / previous) * 100;
  };

  const handleDeleteReport = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== reportId));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Generate reports, view analytics, and track business performance</p>
          </div>
          {canGenerateReports && (
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalReports()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{getCompletedReports()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{getScheduledReports()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900">{formatFileSize(getTotalFileSize())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(getLatestRevenue())}</p>
            </div>
            <div className={`flex items-center ${getRevenueGrowth() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getRevenueGrowth() >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="ml-1 text-sm font-medium">{Math.abs(getRevenueGrowth()).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Profit</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(getLatestProfit())}</p>
            </div>
            <div className={`flex items-center ${getProfitGrowth() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getProfitGrowth() >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="ml-1 text-sm font-medium">{Math.abs(getProfitGrowth()).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <p className="text-2xl font-bold text-gray-900">{getLatestEmployees()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{getLatestClients()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scheduled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scheduled
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="financial">Financial</option>
            <option value="operational">Operational</option>
            <option value="security">Security</option>
            <option value="hr">HR</option>
            <option value="client">Client</option>
            <option value="asset">Asset</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="running">Running</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
          </select>

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getTypeIcon(report.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{report.type}</div>
                      <div className="text-sm text-gray-500">{report.format.toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(report.lastGenerated)}</div>
                      <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatFileSize(report.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1" title="View">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        {canGenerateReports && (
                          <>
                            <button className="text-yellow-600 hover:text-yellow-900 p-1" title="Edit">
                              <Filter className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredReports.length} of {reports.length} reports
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
            <div className="space-y-4">
              {analyticsData.slice(-6).map((data, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{data.period}</span>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">{formatCurrency(data.revenue)}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{ width: `${(data.revenue / 150000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Analysis</h3>
            <div className="space-y-4">
              {analyticsData.slice(-6).map((data, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{data.period}</span>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">{formatCurrency(data.profit)}</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-600 rounded-full" 
                        style={{ width: `${(data.profit / 60000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{getLatestEmployees()}</div>
                <div className="text-sm text-gray-600">Employees</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{getLatestClients()}</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-sm text-gray-600">Incidents</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">168</div>
                <div className="text-sm text-gray-600">Assets</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Indicators</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue Growth</span>
                <div className={`flex items-center ${getRevenueGrowth() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {getRevenueGrowth() >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="ml-1 font-semibold">{Math.abs(getRevenueGrowth()).toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profit Growth</span>
                <div className={`flex items-center ${getProfitGrowth() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {getProfitGrowth() >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="ml-1 font-semibold">{Math.abs(getProfitGrowth()).toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Client Growth</span>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="ml-1 font-semibold">+20.0%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Employee Growth</span>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="ml-1 font-semibold">+8.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.filter(report => report.status === 'scheduled').map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getTypeIcon(report.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Next Monday 9:00 AM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Management Team
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900 p-1">
                          <Filter className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Generate New Report</h3>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Type</option>
                      <option value="financial">Financial</option>
                      <option value="operational">Operational</option>
                      <option value="security">Security</option>
                      <option value="hr">HR</option>
                      <option value="client">Client</option>
                      <option value="asset">Asset</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="last_7_days">Last 7 Days</option>
                      <option value="last_30_days">Last 30 Days</option>
                      <option value="last_90_days">Last 90 Days</option>
                      <option value="this_month">This Month</option>
                      <option value="this_quarter">This Quarter</option>
                      <option value="this_year">This Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Schedule Report</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Email Recipients</span>
                  </label>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports; 