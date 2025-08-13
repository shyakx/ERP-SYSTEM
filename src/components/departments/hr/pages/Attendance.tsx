import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  Filter,
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  TrendingUp,
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
  Coffee
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { attendanceAPI } from '../../../../services/api';
import Modal from '../../../shared/Modal';
import AttendanceForm from '../../../forms/AttendanceForm';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  totalHours: number;
  overtime: number;
  notes: string;
  location: string;
  workMode: string;
  breaks: string[];
  department: string;
}

const Attendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
  const [showEditAttendanceModal, setShowEditAttendanceModal] = useState(false);
  const [showViewAttendanceModal, setShowViewAttendanceModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceRecord | null>(null);

  // Fetch attendance data
  const { 
    items: attendanceData, 
    loading: attendanceLoading, 
    error: attendanceError, 
    refetch: refetchAttendance, 
    updateFilters: updateAttendanceFilters,
    total: attendanceTotal,
    currentPage: attendanceCurrentPage,
    totalPages: attendanceTotalPages
  } = useApiList(attendanceAPI.getAll, {
    page: 1,
    limit: 10,
    status: "all",
    department: "all"
  });

  // Delete mutations
  const deleteAttendanceMutation = useApiMutation(attendanceAPI.delete);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateAttendanceFilters({ search: value, page: 1 });
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    updateAttendanceFilters({ department, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    updateAttendanceFilters({ status, page: 1 });
  };

  const handleDateFilter = (date: string) => {
    setFilterDate(date);
    updateAttendanceFilters({ date, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateAttendanceFilters({ page });
  };

  const handleAddAttendance = () => {
    setSelectedAttendance(null);
    setShowAddAttendanceModal(true);
  };

  const handleEditAttendance = (attendance: AttendanceRecord) => {
    setSelectedAttendance(attendance);
    setShowEditAttendanceModal(true);
  };

  const handleViewAttendance = (attendance: AttendanceRecord) => {
    setSelectedAttendance(attendance);
    setShowViewAttendanceModal(true);
  };

  const handleDeleteAttendance = async (attendanceId: string) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await deleteAttendanceMutation.mutate(attendanceId);
        refetchAttendance();
      } catch (error) {
        console.error('Error deleting attendance record:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowAddAttendanceModal(false);
    setShowEditAttendanceModal(false);
    refetchAttendance();
  };

  const handleFormCancel = () => {
    setShowAddAttendanceModal(false);
    setShowEditAttendanceModal(false);
  };

  // Calculate stats safely
  const calculateStats = () => {
    if (attendanceLoading || !attendanceData || !Array.isArray(attendanceData)) {
      return {
        presentCount: 0,
        totalHours: 0,
        overtimeHours: 0,
        attendanceRate: 0
      };
    }

    const presentCount = attendanceData.filter((record: AttendanceRecord) => record.status === 'Present').length;
    const totalHours = attendanceData.reduce((sum: number, record: AttendanceRecord) => {
      return sum + (typeof record.totalHours === 'number' ? record.totalHours : 0);
    }, 0);
    const overtimeHours = attendanceData.reduce((sum: number, record: AttendanceRecord) => {
      return sum + (typeof record.overtime === 'number' ? record.overtime : 0);
    }, 0);
    const attendanceRate = attendanceData.length > 0 ? Math.round((presentCount / attendanceData.length) * 100) : 0;

    return { presentCount, totalHours, overtimeHours, attendanceRate };
  };

  const stats = calculateStats();

  const attendanceStats = [
    { 
      title: 'Present Today', 
      value: (stats?.presentCount || 0).toString(), 
      change: '+3', 
      icon: UserCheck, 
      color: 'text-green-600',
      subtitle: 'Currently working'
    },
    { 
      title: 'Total Hours Today', 
      value: (stats?.totalHours || 0).toFixed(1), 
      change: '+12.5', 
      icon: Timer, 
      color: 'text-blue-600',
      subtitle: 'Hours worked'
    },
    { 
      title: 'Overtime Hours', 
      value: (stats?.overtimeHours || 0).toFixed(1), 
      change: '+4.2', 
      icon: Zap, 
      color: 'text-orange-600',
      subtitle: 'Extra hours'
    },
    { 
      title: 'Attendance Rate', 
      value: (stats?.attendanceRate || 0).toString(), 
      change: '+5%', 
      icon: Activity, 
      color: 'text-purple-600',
      subtitle: 'This month'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Half Day': return 'bg-orange-100 text-orange-800';
      case 'Leave': return 'bg-blue-100 text-blue-800';
      case 'Holiday': return 'bg-purple-100 text-purple-800';
      case 'Weekend': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkModeColor = (workMode: string) => {
    switch (workMode) {
      case 'Office': return 'bg-blue-100 text-blue-800';
      case 'Remote': return 'bg-green-100 text-green-800';
      case 'Hybrid': return 'bg-purple-100 text-purple-800';
      case 'Field': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  if (attendanceLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (attendanceError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading attendance data</h3>
            <div className="mt-2 text-sm text-red-700">{attendanceError}</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track employee attendance and working hours</p>
        </div>
        <button
          onClick={handleAddAttendance}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Attendance
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {attendanceStats.map((stat, index) => {
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
                placeholder="Search attendance records..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
                      </div>
        </div>
          <div className="flex gap-4">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => handleDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Half Day">Half Day</option>
              <option value="Leave">Leave</option>
              <option value="Holiday">Holiday</option>
              <option value="Weekend">Weekend</option>
            </select>
          </div>
          </div>
        </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((record: AttendanceRecord) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {record.employeeName?.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">{record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{record.checkInTime}</div>
                      {record.checkOutTime && (
                        <div className="text-gray-500">{record.checkOutTime}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWorkModeColor(record.workMode)}`}>
                      {record.workMode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{(typeof record.totalHours === 'number' ? record.totalHours : 0).toFixed(1)}h</div>
                      {record.overtime > 0 && (
                        <div className="text-orange-600 text-xs">+{(typeof record.overtime === 'number' ? record.overtime : 0).toFixed(1)}h OT</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {record.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewAttendance(record)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditAttendance(record)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAttendance(record.id)}
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
      {attendanceTotalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(attendanceCurrentPage - 1) * 10 + 1} to {Math.min(attendanceCurrentPage * 10, attendanceTotal)} of {attendanceTotal} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(attendanceCurrentPage - 1)}
              disabled={attendanceCurrentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(attendanceCurrentPage + 1)}
              disabled={attendanceCurrentPage === attendanceTotalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit/View Modals */}
      <Modal
        isOpen={showAddAttendanceModal || showEditAttendanceModal || showViewAttendanceModal}
        onClose={() => {
          setShowAddAttendanceModal(false);
          setShowEditAttendanceModal(false);
          setShowViewAttendanceModal(false);
        }}
        title={selectedAttendance ? (selectedAttendance.id ? 'Edit Attendance Record' : 'Add Attendance Record') : 'Attendance Record Details'}
        size="xl"
      >
        {selectedAttendance ? (
          <AttendanceForm
            attendance={selectedAttendance}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <AttendanceForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Attendance; 