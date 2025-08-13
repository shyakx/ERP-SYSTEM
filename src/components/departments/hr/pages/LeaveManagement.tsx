import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Filter,
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  TrendingUp,
  Clock,
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
  CheckSquare
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { leaveAPI } from '../../../../services/api';
import Modal from '../../../shared/Modal';
import LeaveRequestForm from '../../../forms/LeaveRequestForm';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  daysRequested: number;
  reason: string;
  status: string;
  emergencyContact: string;
  emergencyPhone: string;
  attachments: string[];
  notes: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

interface LeaveType {
  id: string;
  name: string;
  color: string;
  daysAllocated: number;
  description: string;
}

const LeaveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showEditRequestModal, setShowEditRequestModal] = useState(false);
  const [showViewRequestModal, setShowViewRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  // Fetch leave requests data
  const { 
    items: requestsData, 
    loading: requestsLoading, 
    error: requestsError, 
    refetch: refetchRequests, 
    updateFilters: updateRequestsFilters,
    total: requestsTotal,
    currentPage: requestsCurrentPage,
    totalPages: requestsTotalPages
  } = useApiList(leaveAPI.getAllRequests, {
    page: 1,
    limit: 10,
    status: "all",
    department: "all"
  });

  // Ensure requestsData is always an array and has proper structure
  const safeRequestsData = Array.isArray(requestsData) ? requestsData.map(request => ({
    id: request?.id || '',
    employeeId: typeof request?.employeeId === 'string' ? request.employeeId : '',
    employeeName: typeof request?.employeeName === 'string' ? request.employeeName : 'Unknown Employee',
    leaveType: typeof request?.leaveType === 'string' ? request.leaveType : 'Unknown',
    startDate: typeof request?.startDate === 'string' ? request.startDate : new Date().toISOString(),
    endDate: typeof request?.endDate === 'string' ? request.endDate : new Date().toISOString(),
    daysRequested: typeof request?.daysRequested === 'number' ? request.daysRequested : 0,
    reason: typeof request?.reason === 'string' ? request.reason : '',
    status: typeof request?.status === 'string' ? request.status : 'Pending',
    emergencyContact: typeof request?.emergencyContact === 'string' ? request.emergencyContact : '',
    emergencyPhone: typeof request?.emergencyPhone === 'string' ? request.emergencyPhone : '',
    attachments: Array.isArray(request?.attachments) ? request.attachments : [],
    notes: typeof request?.notes === 'string' ? request.notes : '',
    submittedDate: typeof request?.submittedDate === 'string' ? request.submittedDate : new Date().toISOString(),
    approvedBy: typeof request?.approvedBy === 'string' ? request.approvedBy : undefined,
    approvedDate: typeof request?.approvedDate === 'string' ? request.approvedDate : undefined,
    rejectionReason: typeof request?.rejectionReason === 'string' ? request.rejectionReason : undefined
  })) : [];

  // Fetch leave types data
  const { 
    items: leaveTypesData, 
    loading: leaveTypesLoading, 
    error: leaveTypesError, 
    refetch: refetchLeaveTypes
  } = useApiList(leaveAPI.getAllTypes, {
    page: 1,
    limit: 50
  });

  // Ensure leaveTypesData is always an array and has proper structure
  const safeLeaveTypesData = Array.isArray(leaveTypesData) ? leaveTypesData.map(leaveType => ({
    id: leaveType?.id || '',
    name: typeof leaveType?.name === 'string' ? leaveType.name : 'Unknown',
    color: typeof leaveType?.color === 'string' ? leaveType.color : '#6B7280',
    daysAllocated: typeof leaveType?.daysAllocated === 'number' ? leaveType.daysAllocated : 0,
    description: typeof leaveType?.description === 'string' ? leaveType.description : ''
  })) : [];

  // Delete mutations
  const deleteRequestMutation = useApiMutation(leaveAPI.deleteRequest);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (activeTab === 'requests') {
      updateRequestsFilters({ search: value, page: 1 });
    }
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    if (activeTab === 'requests') {
      updateRequestsFilters({ department, page: 1 });
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    if (activeTab === 'requests') {
      updateRequestsFilters({ status, page: 1 });
    }
  };

  const handlePageChange = (page: number) => {
    if (activeTab === 'requests') {
      updateRequestsFilters({ page });
    }
  };

  const handleAddRequest = () => {
    setSelectedRequest(null);
    setShowAddRequestModal(true);
  };

  const handleEditRequest = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowEditRequestModal(true);
  };

  const handleViewRequest = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowViewRequestModal(true);
  };

  const handleDeleteRequest = async (requestId: string) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await deleteRequestMutation.mutate(requestId);
        refetchRequests();
      } catch (error) {
        console.error('Error deleting leave request:', error);
      }
    }
  };

  // Separate handlers for leave types
  const handleViewLeaveType = (leaveType: LeaveType) => {
    setSelectedRequest({
      id: leaveType.id,
      employeeId: '',
      employeeName: leaveType.name,
      leaveType: leaveType.name,
      startDate: '',
      endDate: '',
      daysRequested: leaveType.daysAllocated,
      reason: leaveType.description,
      status: 'Active',
      emergencyContact: '',
      emergencyPhone: '',
      attachments: [],
      notes: '',
      submittedDate: new Date().toISOString()
    });
    setShowViewRequestModal(true);
  };

  const handleEditLeaveType = (leaveType: LeaveType) => {
    setSelectedRequest({
      id: leaveType.id,
      employeeId: '',
      employeeName: leaveType.name,
      leaveType: leaveType.name,
      startDate: '',
      endDate: '',
      daysRequested: leaveType.daysAllocated,
      reason: leaveType.description,
      status: 'Active',
      emergencyContact: '',
      emergencyPhone: '',
      attachments: [],
      notes: '',
      submittedDate: new Date().toISOString()
    });
    setShowEditRequestModal(true);
  };

  const handleFormSuccess = () => {
    setShowAddRequestModal(false);
    setShowEditRequestModal(false);
    refetchRequests();
  };

  const handleFormCancel = () => {
    setShowAddRequestModal(false);
    setShowEditRequestModal(false);
  };

  const leaveStats = [
    { 
      title: 'Pending Requests', 
      value: (safeRequestsData?.filter((request: LeaveRequest) => request.status === 'Pending').length || 0).toString(), 
      change: '+5', 
      icon: Clock, 
      color: 'text-yellow-600',
      subtitle: 'Awaiting approval'
    },
    { 
      title: 'Approved This Month', 
      value: (safeRequestsData?.filter((request: LeaveRequest) => request.status === 'Approved').length || 0).toString(), 
      change: '+12', 
      icon: CheckCircle, 
      color: 'text-green-600',
      subtitle: 'Successfully approved'
    },
    { 
      title: 'Total Days Taken', 
      value: (safeRequestsData?.reduce((total: number, request: LeaveRequest) => total + (request.daysRequested || 0), 0) || 0).toString(), 
      change: '+45', 
      icon: CalendarDays, 
      color: 'text-blue-600',
      subtitle: 'This month'
    },
    { 
      title: 'Leave Types', 
      value: (safeLeaveTypesData?.length || 0).toString(), 
      change: '+2', 
      icon: Award, 
      color: 'text-purple-600',
      subtitle: 'Available types'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Maternity Leave': return 'bg-pink-100 text-pink-800';
      case 'Paternity Leave': return 'bg-purple-100 text-purple-800';
      case 'Bereavement Leave': return 'bg-gray-100 text-gray-800';
      case 'Study Leave': return 'bg-indigo-100 text-indigo-800';
      case 'Unpaid Leave': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (requestsLoading || leaveTypesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requestsError || leaveTypesError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading leave data</h3>
            <div className="mt-2 text-sm text-red-700">{requestsError || leaveTypesError}</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">Manage employee leave requests and approvals</p>
        </div>
        {activeTab === 'requests' && (
          <button
            onClick={handleAddRequest}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Leave Request
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {leaveStats.map((stat, index) => {
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

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Leave Requests
            </button>
            <button
              onClick={() => setActiveTab('types')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'types'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Leave Types
            </button>
          </nav>
        </div>

        <div className="p-6">
        {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
                  placeholder={`Search ${activeTab === 'requests' ? 'leave requests' : 'leave types'}...`}
              value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
            </div>
            <div className="flex gap-4">
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
                <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

          {/* Content based on active tab */}
          {activeTab === 'requests' ? (
            /* Leave Requests Table */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                  {safeRequestsData.map((request: LeaveRequest) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {request.employeeName?.charAt(0)}
                        </span>
                      </div>
                          <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                        <div className="text-sm text-gray-500">{request.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType}
                    </span>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</div>
                          <div className="text-gray-500">{request.daysRequested} days</div>
                        </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(request.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewRequest(request)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditRequest(request)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(request.id)}
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
          ) : (
            /* Leave Types Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Allocated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {safeLeaveTypesData.map((leaveType: LeaveType) => (
                    <tr key={leaveType.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: leaveType.color + '20' }}>
                            <span className="text-sm font-medium" style={{ color: leaveType.color }}>
                              {leaveType.name?.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{leaveType.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {leaveType.daysAllocated} days
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs truncate">{leaveType.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewLeaveType(leaveType)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditLeaveType(leaveType)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(leaveType.id)}
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
          )}

          {/* Pagination */}
          {activeTab === 'requests' && requestsTotalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing {(requestsCurrentPage - 1) * 10 + 1} to {Math.min(requestsCurrentPage * 10, requestsTotal)} of {requestsTotal} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(requestsCurrentPage - 1)}
                  disabled={requestsCurrentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(requestsCurrentPage + 1)}
                  disabled={requestsCurrentPage === requestsTotalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit/View Modals */}
      <Modal
        isOpen={showAddRequestModal || showEditRequestModal || showViewRequestModal}
        onClose={() => {
          setShowAddRequestModal(false);
          setShowEditRequestModal(false);
          setShowViewRequestModal(false);
        }}
        title={selectedRequest ? (selectedRequest.id ? 'Edit Leave Request' : 'New Leave Request') : 'Leave Request Details'}
        size="xl"
      >
        {selectedRequest ? (
          <LeaveRequestForm
            leaveRequest={selectedRequest}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <LeaveRequestForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default LeaveManagement; 