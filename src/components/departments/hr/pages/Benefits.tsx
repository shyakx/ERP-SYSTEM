import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  Heart, 
  Shield, 
  DollarSign, 
  Users, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Building,
  UserCheck,
  UserX,
  BarChart3,
  Target,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { benefitsAPI } from '../../../../services/api';

interface Benefit {
  id: string;
  name: string;
  type: string;
  description: string;
  coverage: string;
  cost: string;
  status: string;
  enrollmentDate: string;
  provider: string;
  category: string;
  employeeCount: number;
  totalCost: string;
  coveragePercentage: number;
  monthlyCost?: number;
  enrollmentRate?: number;
}

const Benefits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  // Fetch benefits with API
  const { 
    items: benefitsData, 
    loading, 
    error, 
    refetch, 
    updateFilters,
    total,
    currentPage,
    totalPages
  } = useApiList(benefitsAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    type: "all",
    status: "all"
  });

  // Fetch benefits stats
  const [benefitsStats, setBenefitsStats] = useState({
    total: 0,
    active: 0,
    totalCost: 0,
    avgEnrollment: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await benefitsAPI.getStats();
        setBenefitsStats(response.data || {
          total: 0,
          active: 0,
          totalCost: 0,
          avgEnrollment: 0
        });
      } catch (error) {
        console.error('Error fetching benefits stats:', error);
        // Set fallback data when API fails
        setBenefitsStats({
          total: 0,
          active: 0,
          totalCost: 0,
          avgEnrollment: 0
        });
      }
    };
    fetchStats();
  }, []);

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

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const statsCards = [
    { 
      title: 'Total Benefits', 
      value: (benefitsStats?.total || 0).toString(), 
      change: '+2', 
      icon: Gift, 
      color: 'text-blue-600',
      subtitle: 'Active benefit plans'
    },
    { 
      title: 'Active Plans', 
      value: (benefitsStats?.active || 0).toString(), 
      change: '+1', 
      icon: CheckCircle, 
      color: 'text-green-600',
      subtitle: 'Currently active'
    },
    { 
      title: 'Total Cost', 
      value: `RWF ${((benefitsStats?.totalCost || 0) / 1000000).toFixed(1)}M`, 
      change: '+8%', 
      icon: DollarSign, 
      color: 'text-purple-600',
      subtitle: 'Monthly expenditure'
    },
    { 
      title: 'Enrollment Rate', 
      value: `${Math.round(benefitsStats?.avgEnrollment || 0)}%`, 
      change: '+3%', 
      icon: Users, 
      color: 'text-orange-600',
      subtitle: 'Employee participation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Medical': return 'bg-blue-100 text-blue-800';
      case 'Insurance': return 'bg-purple-100 text-purple-800';
      case 'Pension': return 'bg-green-100 text-green-800';
      case 'Allowance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Medical': return Heart;
      case 'Insurance': return Shield;
      case 'Pension': return Building;
      case 'Allowance': return Gift;
      default: return Gift;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading benefits data</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Benefits Management</h1>
          <p className="text-gray-600 mt-1">Manage employee benefits and insurance plans</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Benefit</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
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

      {/* Benefits Overview */}
      <AnimatedCard
        title="Benefits Overview"
        subtitle="Employee benefits and coverage summary"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData?.slice(0, 3).map((benefit: Benefit, index: number) => {
            const IconComponent = getTypeIcon(benefit.type);
            return (
              <div 
                key={benefit.id} 
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.name}</h3>
                      <p className="text-sm text-gray-500">{benefit.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(benefit.status)}`}>
                    {benefit.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{benefit.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Enrolled: {benefit.employeeCount || 0}</span>
                    <span className="text-gray-600">{benefit.coveragePercentage || 0}%</span>
                  </div>
                  <AnimatedProgressBar
                    progress={benefit.coveragePercentage || 0}
                    color={(benefit.coveragePercentage || 0) > 90 ? 'green' : (benefit.coveragePercentage || 0) > 70 ? 'blue' : 'orange'}
                    height={8}
                    showLabel={false}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Cost: {benefit.cost}</span>
                    <span>Provider: {benefit.provider}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Benefits List */}
      <AnimatedCard
        title="Benefits List"
        subtitle="Manage and view all employee benefits"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search benefits..."
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
              <option value="Medical">Medical</option>
              <option value="Insurance">Insurance</option>
              <option value="Pension">Pension</option>
              <option value="Allowance">Allowance</option>
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
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Benefits Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {benefitsData?.map((benefit: Benefit, index: number) => {
                const IconComponent = getTypeIcon(benefit.type);
                return (
                  <tr 
                    key={benefit.id} 
                    className="hover:bg-gray-50 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{benefit.name}</div>
                          <div className="text-sm text-gray-500">{benefit.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(benefit.type)}`}>
                        {benefit.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{benefit.coverage}</div>
                      <div className="text-xs text-gray-500">{benefit.provider}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{benefit.cost}</div>
                      <div className="text-xs text-gray-500">Total: {benefit.totalCost}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(benefit.status)}`}>
                        {benefit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <AnimatedButton
                          onClick={() => setSelectedBenefit(benefit)}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common benefits management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Add Benefit</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200 transform hover:scale-105"
          >
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Enroll Employee</span>
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

export default Benefits; 