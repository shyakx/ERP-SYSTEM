import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  TrendingUp,
  Calendar,
  Users,
  BarChart3,
  Target,
  MapPin,
  Phone,
  Mail,
  Star,
  DollarSign,
  Building,
  UserCheck,
  UserX,
  GraduationCap,
  Briefcase,
  Gift,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { reportsAPI } from '../../../../services/api';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

interface Report {
  id: string;
  title: string;
  type: string;
  status: string;
  generatedDate: string;
  period: string;
  department: string;
  generatedBy: string;
  fileSize: string;
  downloadCount: number;
  description: string;
  priority: string;
  format: string;
}

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Fetch reports data with API
  const { 
    items: reportsData, 
    loading, 
    error, 
    refetch, 
    filters, 
    updateFilters,
    total,
    currentPage,
    totalPages
  } = useApiList(reportsAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    type: "all",
    status: "all",
    period: "all"
  });

  // Fetch reports stats
  const [statsData, setStatsData] = useState({
    total: 0,
    generated: 0,
    pending: 0,
    inProgress: 0,
    failed: 0,
    mostDownloaded: null as { title: string; downloads: number } | null
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await reportsAPI.getStats();
      setStatsData(response.data);
    } catch (error) {
      console.error('Error fetching reports stats:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value, page: 1 });
  };

  const handleTypeFilter = (type: string) => {
    setFilterType(type);
    updateFilters({ type, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    updateFilters({ status, page: 1 });
  };

  const handlePeriodFilter = (period: string) => {
    setSelectedPeriod(period);
    updateFilters({ period, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const reportStats = [
    { 
      title: 'Total Reports', 
      value: (statsData?.total || 0).toString(), 
      change: '+3', 
      icon: FileText, 
      color: 'text-blue-600',
      subtitle: 'Generated this month'
    },
    { 
      title: 'Most Downloaded', 
      value: statsData?.mostDownloaded?.title || 'N/A', 
      change: `${statsData?.mostDownloaded?.downloads || 0} downloads`, 
      icon: TrendingUp, 
      color: 'text-green-600',
      subtitle: 'Top report'
    },
    { 
      title: 'Success Rate', 
      value: `${Math.round(((statsData?.generated || 0) / (statsData?.total || 1)) * 100)}%`, 
      change: '+5%', 
      icon: CheckCircle, 
      color: 'text-green-600',
      subtitle: 'Generation success'
    },
    { 
      title: 'Pending Reports', 
      value: (statsData?.pending || 0).toString(), 
      change: '-2', 
      icon: Clock, 
      color: 'text-yellow-600',
      subtitle: 'Awaiting generation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Performance': return 'bg-purple-100 text-purple-800';
      case 'Payroll': return 'bg-green-100 text-green-800';
      case 'Attendance': return 'bg-blue-100 text-blue-800';
      case 'Training': return 'bg-orange-100 text-orange-800';
      case 'Benefits': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Performance': return Star;
      case 'Payroll': return DollarSign;
      case 'Attendance': return Clock;
      case 'Training': return GraduationCap;
      case 'Benefits': return Gift;
      default: return FileText;
    }
  };

  const filteredReports = reportsData?.filter((report: Report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
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
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">HR Reports</h1>
                    <p className="text-slate-600 text-lg">Generate and manage HR reports and analytics</p>
                  </div>
                </div>
              </div>
              <AnimatedButton
                onClick={() => {}}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>Generate Report</span>
              </AnimatedButton>
            </div>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="text-2xl">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Report Generation */}
      <AnimatedCard
        title="Quick Report Generation"
        subtitle="Generate common HR reports instantly"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 transform hover:scale-105"
          >
            <Users className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Employee Directory</h3>
              <p className="text-sm text-gray-600">Complete employee list with details</p>
            </div>
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200 transform hover:scale-105"
          >
            <DollarSign className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Payroll Summary</h3>
              <p className="text-sm text-gray-600">Monthly payroll and compensation</p>
            </div>
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-200 transform hover:scale-105"
          >
            <Clock className="w-8 h-8 text-purple-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Attendance Report</h3>
              <p className="text-sm text-gray-600">Daily attendance and time tracking</p>
            </div>
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-200 transform hover:scale-105"
          >
            <GraduationCap className="w-8 h-8 text-orange-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Training Report</h3>
              <p className="text-sm text-gray-600">Training completion and progress</p>
            </div>
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-all duration-200 transform hover:scale-105"
          >
            <Gift className="w-8 h-8 text-pink-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Benefits Report</h3>
              <p className="text-sm text-gray-600">Benefits enrollment and coverage</p>
            </div>
          </AnimatedButton>
          
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-6 rounded-lg bg-teal-50 hover:bg-teal-100 transition-all duration-200 transform hover:scale-105"
          >
            <Shield className="w-8 h-8 text-teal-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Compliance Report</h3>
              <p className="text-sm text-gray-600">Regulatory compliance status</p>
            </div>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Reports List */}
      <AnimatedCard
        title="Generated Reports"
        subtitle="View and manage all generated reports"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="Performance">Performance</option>
              <option value="Payroll">Payroll</option>
              <option value="Attendance">Attendance</option>
              <option value="Training">Training</option>
              <option value="Benefits">Benefits</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="Generated">Generated</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Processing">Processing</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report: Report, index: number) => {
                const IconComponent = getTypeIcon(report.type);
                return (
                  <tr 
                    key={report.id} 
                    className="hover:bg-gray-50 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.generatedDate}</div>
                      <div className="text-xs text-gray-500">by {report.generatedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.downloadCount}</div>
                      <div className="text-xs text-gray-500">{report.fileSize}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <AnimatedButton
                          onClick={() => {}}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </AnimatedButton>
                        <AnimatedButton
                          onClick={() => {}}
                          className="text-green-600 hover:text-green-900 transition-colors duration-200"
                        >
                          <Download className="w-4 h-4" />
                        </AnimatedButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common report management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200 transform hover:scale-105"
          >
            <Download className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Export All</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-200 transform hover:scale-105"
          >
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Analytics</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-200 transform hover:scale-105"
          >
            <Calendar className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Schedule</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
      </div>
    </div>
  );
};

export default Reports; 