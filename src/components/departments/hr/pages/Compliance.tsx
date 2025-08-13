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
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  Target,
  Shield,
  TrendingUp,
  Users,
  Building,
  UserCheck,
  UserX,
  GraduationCap,
  Briefcase,
  Home,
  Gift,
  Mail,
  Phone,
  Star,
  MapPin
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { complianceAPI } from '../../../../services/api';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
  assignedTo: string;
  department: string;
  completionRate: number;
  lastUpdated: string;
  riskLevel: string;
  cost: string;
  impact: string;
}

const Compliance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Fetch compliance data with API
  const { 
    items: complianceData, 
    loading, 
    error, 
    refetch, 
    filters, 
    updateFilters,
    total,
    currentPage,
    totalPages
  } = useApiList(complianceAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    category: "all",
    status: "all",
    priority: "all"
  });

  // Fetch compliance stats
  const [statsData, setStatsData] = useState({
    total: 0,
    active: 0,
    pending: 0,
    completed: 0,
    overdue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await complianceAPI.getStats();
      setStatsData(response.data || {
        total: 0,
        active: 0,
        pending: 0,
        completed: 0,
        overdue: 0
      });
    } catch (error) {
      console.error('Error fetching compliance stats:', error);
      // Set fallback data when API fails
      setStatsData({
        total: 0,
        active: 0,
        pending: 0,
        completed: 0,
        overdue: 0
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value, page: 1 });
  };

  const handleCategoryFilter = (category: string) => {
    setFilterCategory(category);
    updateFilters({ category, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    updateFilters({ status, page: 1 });
  };

  const handlePriorityFilter = (priority: string) => {
    setFilterPriority(priority);
    updateFilters({ priority, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const complianceStats = [
    { 
      title: 'Total Requirements', 
      value: (statsData?.total || 0).toString(), 
      change: '+2', 
      icon: FileText, 
      color: 'text-blue-600',
      subtitle: 'Compliance items'
    },
    { 
      title: 'Active Items', 
      value: (statsData?.active || 0).toString(), 
      change: '+1', 
      icon: CheckCircle, 
      color: 'text-green-600',
      subtitle: 'Currently active'
    },
    { 
      title: 'Pending Review', 
      value: (statsData?.pending || 0).toString(), 
      change: '+3', 
      icon: Clock, 
      color: 'text-yellow-600',
      subtitle: 'Awaiting review'
    },
    { 
      title: 'Completed', 
      value: (statsData?.completed || 0).toString(), 
      change: '+5', 
      icon: CheckCircle, 
      color: 'text-purple-600',
      subtitle: 'Successfully completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Legal': return 'bg-purple-100 text-purple-800';
      case 'Safety': return 'bg-red-100 text-red-800';
      case 'Privacy': return 'bg-blue-100 text-blue-800';
      case 'Financial': return 'bg-green-100 text-green-800';
      case 'Environmental': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredCompliance = complianceData?.filter((item: ComplianceItem) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage regulatory compliance requirements</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Requirement</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceStats.map((stat, index) => {
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

      {/* Compliance Overview */}
      <AnimatedCard
        title="Compliance Overview"
        subtitle="Key compliance areas and status"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complianceData?.slice(0, 3).map((item: ComplianceItem, index: number) => (
            <div 
              key={item.id} 
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion: {item.completionRate}%</span>
                  <span className={`font-medium ${getRiskColor(item.riskLevel)}`}>{item.riskLevel} Risk</span>
                </div>
                <AnimatedProgressBar
                  progress={item.completionRate}
                  color={item.completionRate > 80 ? 'green' : item.completionRate > 60 ? 'blue' : 'orange'}
                  height={8}
                  showLabel={false}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Due: {item.dueDate}</span>
                  <span>Cost: {item.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Compliance List */}
      <AnimatedCard
        title="Compliance Requirements"
        subtitle="Manage and track all compliance requirements"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Categories</option>
              <option value="Legal">Legal</option>
              <option value="Safety">Safety</option>
              <option value="Privacy">Privacy</option>
              <option value="Financial">Financial</option>
              <option value="Environmental">Environmental</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-gray-400" />
            <select
              value={filterPriority}
              onChange={(e) => handlePriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Requirements Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompliance.map((item: ComplianceItem, index: number) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.dueDate}</div>
                    <div className="text-xs text-gray-500">Assigned: {item.assignedTo}</div>
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
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common compliance management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Add Requirement</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200 transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Mark Complete</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-200 transform hover:scale-105"
          >
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-200 transform hover:scale-105"
          >
            <Download className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Export Data</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Compliance; 