import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Filter,
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  DollarSign,
  Building,
  UserCheck,
  UserX,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  Send,
  BookOpen,
  Award,
  Play,
  Pause,
  StopCircle,
  CalendarDays,
  Clock3,
  UserMinus,
  CheckSquare,
  Timer,
  Activity,
  Zap,
  Coffee,
  Target,
  BarChart3,
  TrendingDown,
  Trophy,
  Medal
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { performanceAPI } from '../../../../services/api';
import Modal from '../../../shared/Modal';
import PerformanceForm from '../../../forms/PerformanceForm';

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewPeriod: string;
  reviewDate: string;
  reviewerId: string;
  reviewerName: string;
  overallRating: number;
  jobKnowledge: number;
  workQuality: number;
  communication: number;
  teamwork: number;
  initiative: number;
  attendance: number;
  strengths: string[];
  areasForImprovement: string[];
  goals: string[];
  comments: string;
  recommendations: string;
  nextReviewDate: string;
  status: string;
  department: string;
}

const Performance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [showAddPerformanceModal, setShowAddPerformanceModal] = useState(false);
  const [showEditPerformanceModal, setShowEditPerformanceModal] = useState(false);
  const [showViewPerformanceModal, setShowViewPerformanceModal] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceReview | null>(null);

  // Fetch performance data
  const { 
    items: performanceData, 
    loading: performanceLoading, 
    error: performanceError, 
    refetch: refetchPerformance, 
    updateFilters: updatePerformanceFilters,
    total: performanceTotal,
    currentPage: performanceCurrentPage,
    totalPages: performanceTotalPages
  } = useApiList(performanceAPI.getAll, {
    page: 1,
    limit: 10,
    status: "all",
    department: "all"
  });

  // Delete mutations
  const deletePerformanceMutation = useApiMutation(performanceAPI.delete);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updatePerformanceFilters({ search: value, page: 1 });
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    updatePerformanceFilters({ department, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    updatePerformanceFilters({ status, page: 1 });
  };

  const handlePeriodFilter = (period: string) => {
    setFilterPeriod(period);
    updatePerformanceFilters({ period, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updatePerformanceFilters({ page });
  };

  const handleAddPerformance = () => {
    setSelectedPerformance(null);
    setShowAddPerformanceModal(true);
  };

  const handleEditPerformance = (performance: PerformanceReview) => {
    setSelectedPerformance(performance);
    setShowEditPerformanceModal(true);
  };

  const handleViewPerformance = (performance: PerformanceReview) => {
    setSelectedPerformance(performance);
    setShowViewPerformanceModal(true);
  };

  const handleDeletePerformance = async (performanceId: string) => {
    if (window.confirm('Are you sure you want to delete this performance review?')) {
      try {
        await deletePerformanceMutation.mutate(performanceId);
        refetchPerformance();
      } catch (error) {
        console.error('Error deleting performance review:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowAddPerformanceModal(false);
    setShowEditPerformanceModal(false);
    refetchPerformance();
  };

  const handleFormCancel = () => {
    setShowAddPerformanceModal(false);
    setShowEditPerformanceModal(false);
  };

  const performanceStats = [
    { 
      title: 'Average Rating', 
      value: performanceData?.length > 0 ? (performanceData.reduce((total: number, review: PerformanceReview) => total + (review.overallRating || 0), 0) / performanceData.length).toFixed(1) : '0.0', 
      change: '+0.3', 
      icon: Star, 
      color: 'text-yellow-600',
      subtitle: 'Overall performance'
    },
    { 
      title: 'Reviews This Month', 
      value: (performanceData?.length || 0).toString(), 
      change: '+5', 
      icon: CalendarDays, 
      color: 'text-blue-600',
      subtitle: 'Completed reviews'
    },
    { 
      title: 'High Performers', 
      value: (performanceData?.filter((review: PerformanceReview) => (review.overallRating || 0) >= 4).length || 0).toString(), 
      change: '+2', 
      icon: Trophy, 
      color: 'text-green-600',
      subtitle: 'Rating 4+ stars'
    },
    { 
      title: 'Needs Improvement', 
      value: (performanceData?.filter((review: PerformanceReview) => (review.overallRating || 0) <= 2).length || 0).toString(), 
      change: '-1', 
      icon: TrendingDown, 
      color: 'text-red-600',
      subtitle: 'Rating 2 or below'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-blue-600';
    if (rating >= 3) return 'text-yellow-600';
    if (rating >= 2) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-current text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'IT': return 'bg-blue-100 text-blue-800';
      case 'HR': return 'bg-purple-100 text-purple-800';
      case 'Finance': return 'bg-green-100 text-green-800';
      case 'Marketing': return 'bg-pink-100 text-pink-800';
      case 'Sales': return 'bg-orange-100 text-orange-800';
      case 'Operations': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (performanceLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (performanceError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading performance data</h3>
            <div className="mt-2 text-sm text-red-700">{performanceError}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600">Track employee performance reviews and assessments</p>
        </div>
        <button
          onClick={handleAddPerformance}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Performance Review
          </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {performanceStats.map((stat, index) => {
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

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search performance reviews..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterPeriod}
              onChange={(e) => handlePeriodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Periods</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
              <option value="Annual 2024">Annual 2024</option>
              <option value="Probation">Probation</option>
              <option value="Mid-Year">Mid-Year</option>
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => handleDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Performance Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.map((review: PerformanceReview) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {review.employeeName?.charAt(0)}
                            </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{review.employeeName}</div>
                        <div className="text-sm text-gray-500">{review.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {review.reviewPeriod}
                        </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {getRatingStars(review.overallRating || 0)}
                      </div>
                      <span className={`text-sm font-medium ${getRatingColor(review.overallRating || 0)}`}>
                        {review.overallRating?.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                      {review.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 text-gray-400 mr-1" />
                      {review.reviewerName || review.reviewerId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewPerformance(review)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditPerformance(review)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePerformance(review.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {performanceTotalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(performanceCurrentPage - 1) * 10 + 1} to {Math.min(performanceCurrentPage * 10, performanceTotal)} of {performanceTotal} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(performanceCurrentPage - 1)}
              disabled={performanceCurrentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
          </button>
            <button
              onClick={() => handlePageChange(performanceCurrentPage + 1)}
              disabled={performanceCurrentPage === performanceTotalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
          </button>
        </div>
      </div>
      )}

      {/* Add/Edit/View Modals */}
      <Modal
        isOpen={showAddPerformanceModal || showEditPerformanceModal || showViewPerformanceModal}
        onClose={() => {
          setShowAddPerformanceModal(false);
          setShowEditPerformanceModal(false);
          setShowViewPerformanceModal(false);
        }}
        title={selectedPerformance ? (selectedPerformance.id ? 'Edit Performance Review' : 'New Performance Review') : 'Performance Review Details'}
        size="xl"
      >
        {selectedPerformance ? (
          <PerformanceForm
            performance={selectedPerformance}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <PerformanceForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Performance;