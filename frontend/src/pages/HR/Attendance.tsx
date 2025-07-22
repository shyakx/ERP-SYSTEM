import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Filter, 
  Search, 
  Plus, 
  Download, 
  Calendar,
  MapPin,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';
import StatCard from '../../components/StatCard';
import FilterBar, { FilterField } from '../../components/FilterBar';
import CompactTable, { TableColumn } from '../../components/CompactTable';
import Modal from '../../components/Common/Modal';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  totalHours?: number;
  status: 'present' | 'absent' | 'late' | 'early_departure' | 'on_leave';
  location: string;
  notes?: string;
  shiftId?: string;
  approvalStatus?: string;
}

interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  totalHours: number;
}

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [selectedEmployeeForClockIn, setSelectedEmployeeForClockIn] = useState('');
  const [selectedRecordForClockOut, setSelectedRecordForClockOut] = useState<AttendanceRecord | null>(null);
  const [stats, setStats] = useState<AttendanceStats>({ present: 0, absent: 0, late: 0, totalHours: 0 });

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
    fetchStats();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/api/attendance');
      
      console.log('Raw attendance data:', data);
      
      // Transform the data to match our frontend interface
      const transformedData = data.map((record: any) => {
        // Handle date formatting - convert UTC date to local date
        let formattedDate = record.date;
        if (record.date) {
          // If it's a date string, convert UTC to local date
          if (typeof record.date === 'string') {
            const dateObj = new Date(record.date);
            // Convert to local date string (YYYY-MM-DD)
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            formattedDate = `${year}-${month}-${day}`;
          }
        }
        
        return {
          id: record.id.toString(),
          employeeId: record.employee_id,
          employeeName: record.employee_name || 'Unknown Employee',
          date: formattedDate,
          clockIn: record.clock_in,
          clockOut: record.clock_out,
          totalHours: record.total_hours,
          status: record.status,
          location: record.location,
          notes: record.notes,
          shiftId: record.shift_id,
          approvalStatus: record.approval_status
        };
      });
      
      console.log('Transformed attendance data:', transformedData);
      setAttendance(transformedData);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await apiService.get('/api/employees');
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees');
    }
  };

  const fetchStats = async () => {
    try {
      const data = await apiService.get('/api/attendance/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const canManageAttendance = user?.role === 'system_admin' || user?.role === 'hr_manager' || user?.role === 'operations_supervisor' || user?.role === 'field_officer';

  const filteredAttendance = attendance
    .filter(record => 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(record => statusFilter === 'all' || record.status === statusFilter)
    .filter(record => {
      // Handle date filtering more robustly
      if (!dateFilter) return true;
      
      // Convert both dates to local YYYY-MM-DD format for comparison
      const recordDate = record.date || '';
      const filterDate = dateFilter;
      
      console.log('Date comparison:', { recordDate, filterDate, matches: recordDate === filterDate });
      return recordDate === filterDate;
    })
    .filter(record => {
      if (departmentFilter === 'all') return true;
      const employee = employees.find(emp => emp.id === record.employeeId);
      return employee?.department === departmentFilter;
    });

  console.log('Filtered attendance:', filteredAttendance.length, 'records');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'early_departure': return 'bg-orange-100 text-orange-800';
      case 'on_leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleClockIn = async () => {
    if (!selectedEmployeeForClockIn || typeof selectedEmployeeForClockIn !== 'string') {
      toast.error('Please select a valid employee.');
      return;
    }
    setActionLoading(true);
    try {
      const response = await apiService.post('/api/attendance/clock-in', {
        employeeId: selectedEmployeeForClockIn,
        location: 'Main Office',
        notes: 'Clock in via system'
      });

      if (response.ok) {
        await fetchAttendance();
        await fetchStats();
        setShowClockInModal(false);
        setSelectedEmployeeForClockIn('');
        toast.success('Clock in successful!');
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error + (errorData.details ? ': ' + errorData.details.map((d: any) => d.msg).join(', ') : '')
        );
      }
    } catch (error) {
      toast.error('Error clocking in. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClockOut = async () => {
    if (!selectedRecordForClockOut) return;
    setActionLoading(true);
    try {
      const response = await apiService.post('/api/attendance/clock-out', {
        employeeId: selectedRecordForClockOut.employeeId
      });

      if (response.ok) {
        await fetchAttendance();
        await fetchStats();
        setShowClockOutModal(false);
        setSelectedRecordForClockOut(null);
        toast.success('Clock out successful!');
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error + (errorData.details ? ': ' + errorData.details.map((d: any) => d.msg).join(', ') : '')
        );
      }
    } catch (error) {
      toast.error('Error clocking out. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const getActiveEmployees = () => {
    // Get today's date in local format (YYYY-MM-DD)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    // Get employees who are already clocked in today
    const clockedInToday = attendance
      .filter(record => 
        record.date === todayStr && 
        record.clockIn && 
        !record.clockOut
      )
      .map(record => record.employeeId);
    
    // Return employees who are not already clocked in today
    return employees.filter(emp => 
      emp.id !== '' && 
      !clockedInToday.includes(emp.id)
    );
  };

  const getEmployeesForClockOut = () => {
    // Get today's date in local format (YYYY-MM-DD)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    return attendance.filter(record => 
      record.date === todayStr && 
      record.clockIn && 
      !record.clockOut
    );
  };

  const departments = [...new Set(employees.map(emp => emp.department))];

  // Filter fields for FilterBar
  const filterFields: FilterField[] = [
    {
      key: 'search',
      label: 'Search',
      type: 'text',
      value: searchTerm,
      placeholder: 'Search employees...'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      value: statusFilter,
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'present', label: 'Present' },
        { value: 'absent', label: 'Absent' },
        { value: 'late', label: 'Late' },
        { value: 'early_departure', label: 'Early Departure' },
        { value: 'on_leave', label: 'On Leave' }
      ]
    },
    {
      key: 'date',
      label: 'Date',
      type: 'text',
      value: dateFilter
    },
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      value: departmentFilter,
      options: [
        { value: 'all', label: 'All Departments' },
        ...departments.map(dept => ({ value: dept, label: dept }))
      ]
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'search':
        setSearchTerm(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'date':
        setDateFilter(value);
        break;
      case 'department':
        setDepartmentFilter(value);
        break;
    }
  };

  // Table columns for CompactTable
  const columns: TableColumn<AttendanceRecord>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (record: AttendanceRecord) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {record.employeeName.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
            <div className="text-sm text-gray-500">{record.employeeId}</div>
          </div>
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (record: AttendanceRecord) => formatDate(record.date)
    },
    {
      key: 'clockIn',
      label: 'Clock In',
      render: (record: AttendanceRecord) => record.clockIn ? formatTime(record.clockIn) : '-'
    },
    {
      key: 'clockOut',
      label: 'Clock Out',
      render: (record: AttendanceRecord) => record.clockOut ? formatTime(record.clockOut) : '-'
    },
    {
      key: 'hours',
      label: 'Hours',
      render: (record: AttendanceRecord) => record.totalHours ? `${record.totalHours}h` : '-'
    },
    {
      key: 'status',
      label: 'Status',
      render: (record: AttendanceRecord) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
          {record.status.replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (record: AttendanceRecord) => record.location
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (record: AttendanceRecord) => (
        <div className="flex justify-end space-x-2">
          {!record.clockOut && record.clockIn && (
            <button
              onClick={() => {
                setSelectedRecordForClockOut(record);
                setShowClockOutModal(true);
              }}
              className="group relative bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-md"
              title="Clock Out Employee"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Track employee attendance and time records</p>
          </div>
          <div className="flex space-x-3">
            {/* Enhanced Clock In Button */}
            <button
              onClick={() => setShowClockInModal(true)}
              disabled={getActiveEmployees().length === 0}
              className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative">
                <CheckCircle className="w-5 h-5 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping"></div>
              </div>
              <span>{getActiveEmployees().length === 0 ? 'No Employees Available' : 'Clock In'}</span>
              <div className="bg-green-400 bg-opacity-30 px-2 py-1 rounded-full text-xs">
                {getActiveEmployees().length} employees
              </div>
            </button>

            {/* Enhanced Clock Out Button */}
            <button
              onClick={() => setShowClockOutModal(true)}
              className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 hover:shadow-lg font-medium text-sm"
            >
              <div className="relative">
                <XCircle className="w-5 h-5 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-300 rounded-full animate-ping"></div>
              </div>
              <span>Clock Out</span>
              <div className="bg-red-400 bg-opacity-30 px-2 py-1 rounded-full text-xs">
                {getEmployeesForClockOut().length} on duty
              </div>
            </button>

            {/* Enhanced Refresh Button */}
            <button
              onClick={() => {
                fetchAttendance();
                fetchStats();
              }}
              disabled={loading}
              className="group p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 group-hover:text-gray-800 ${loading ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
            </button>

            {/* Quick Actions Dropdown */}
            <div className="relative group">
              <button className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200 transform hover:scale-105">
                <div className="w-5 h-5 text-gray-600 group-hover:text-gray-800">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
            </div>
              </button>
              
              {/* Quick Actions Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>View Calendar</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Bulk Actions</span>
                  </button>
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <StatCard
          label="Present Today"
          value={stats.present}
          icon={<UserCheck className="w-4 h-4 text-green-600" />}
          colorClass="text-green-600"
        />
        <StatCard
          label="Absent Today"
          value={stats.absent}
          icon={<XCircle className="w-4 h-4 text-red-600" />}
          colorClass="text-red-600"
        />
        <StatCard
          label="Late Today"
          value={stats.late}
          icon={<AlertCircle className="w-4 h-4 text-yellow-600" />}
          colorClass="text-yellow-600"
        />
        <StatCard
          label="Total Hours"
          value={`${stats.totalHours}h`}
          icon={<Clock className="w-4 h-4 text-blue-600" />}
          colorClass="text-blue-600"
          />
      </div>

      {/* Currently On Duty Section */}
      {(() => {
        // Get today's date in local format (YYYY-MM-DD) - same as getEmployeesForClockOut
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;
        
        const currentlyOnDuty = attendance.filter(record => {
          // Use the same date comparison logic as the main filtering
          return record.clockIn && !record.clockOut && record.date === todayStr;
        });
        
        if (currentlyOnDuty.length > 0) {
          return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-green-800 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Currently On Duty ({currentlyOnDuty.length})
                </h3>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Active
                        </span>
                      </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentlyOnDuty.map(record => (
                  <div key={record.id} className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">ID: {record.employeeId}</div>
                        <div className="text-sm text-green-600">
                          Clocked in at {record.clockIn ? formatTime(record.clockIn) : 'N/A'}
                        </div>
                      </div>
                        <button
                          onClick={() => {
                            setSelectedRecordForClockOut(record);
                            setShowClockOutModal(true);
                          }}
                          className="group relative bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-2 rounded-lg transition-all duration-200 transform hover:scale-110 hover:shadow-md"
                          title="Clock Out Employee"
                        >
                          <XCircle className="w-4 h-4 group-hover:animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })()}
        
      {/* Filters */}
      <FilterBar
        fields={filterFields}
        onChange={handleFilterChange}
        showToggle={true}
      />

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
            <div className="flex space-x-2">
              <button className="group px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 font-medium text-sm">
                <Download className="w-4 h-4 group-hover:animate-pulse" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading attendance data...
          </div>
        ) : (
          <CompactTable
            columns={columns}
            data={filteredAttendance}
            rowKey={(record) => record.id}
            emptyText="No attendance records found."
          />
        )}
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredAttendance.length} of {attendance.length} records
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Clock In Modal */}
      <Modal
        open={showClockInModal}
        onClose={() => setShowClockInModal(false)}
        size="lg"
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Clock In Employee</h2>
              <p className="text-sm text-gray-500">Record employee attendance</p>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Employee Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>Select Employee</span>
            </label>
            
            {/* Available employees count */}
            <div className="text-xs text-gray-500 mb-2">
              {getActiveEmployees().length} employees available for clock-in today
            </div>
            
            {getActiveEmployees().length === 0 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    All employees are already clocked in today or no employees available.
                  </span>
                </div>
              </div>
            ) : (
              <select
                value={selectedEmployeeForClockIn}
                onChange={(e) => setSelectedEmployeeForClockIn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select an employee...</option>
                {getActiveEmployees().map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.department}
                  </option>
                ))}
              </select>
            )}
            {selectedEmployeeForClockIn && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">
                      {employees.find(emp => emp.id === selectedEmployeeForClockIn)?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-800">
                      {employees.find(emp => emp.id === selectedEmployeeForClockIn)?.name}
                    </div>
                    <div className="text-xs text-green-600">
                      {employees.find(emp => emp.id === selectedEmployeeForClockIn)?.department} • {employees.find(emp => emp.id === selectedEmployeeForClockIn)?.position}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Location</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Main Office', 'Branch Office', 'Field Work', 'Remote'].map((location) => (
                <button
                  key={location}
                  type="button"
                  className="p-3 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left"
                >
                  <div className="text-sm font-medium text-gray-900">{location}</div>
                  <div className="text-xs text-gray-500">Click to select</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Time Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Current Time</span>
              </div>
              <div className="text-lg font-mono font-semibold text-gray-900">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Notes (Optional)</span>
            </label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Add any additional notes about this clock-in..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowClockInModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleClockIn}
              className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              disabled={!selectedEmployeeForClockIn || actionLoading || getActiveEmployees().length === 0}
            >
              {actionLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 group-hover:animate-pulse" />
                  <span>Clock In Employee</span>
                </div>
              )}
              </button>
          </div>
        </div>
      </Modal>

      {/* Enhanced Clock Out Modal */}
      <Modal
        open={showClockOutModal}
        onClose={() => {
          setShowClockOutModal(false);
          setSelectedRecordForClockOut(null);
        }}
        size="lg"
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Clock Out Employee</h2>
              <p className="text-sm text-gray-500">End employee's shift and record time</p>
                </div>
              </div>
        }
      >
        {selectedRecordForClockOut && (
          <div className="space-y-6">
            {/* Employee Info Card */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-lg font-bold text-red-700">
                {selectedRecordForClockOut.employeeName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-base font-semibold text-red-800">{selectedRecordForClockOut.employeeName}</div>
                <div className="text-xs text-red-600">ID: {selectedRecordForClockOut.employeeId}</div>
                <div className="text-xs text-red-600">Department: {employees.find(emp => emp.id === selectedRecordForClockOut.employeeId)?.department}</div>
              </div>
            </div>

            {/* Clock In Time */}
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Clock In Time:</span>
              <span className="text-base font-mono font-semibold text-gray-900">
                {selectedRecordForClockOut.clockIn ? formatTime(selectedRecordForClockOut.clockIn) : 'Not clocked in'}
              </span>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Notes (Optional)</span>
              </label>
              <textarea 
                rows={3} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Add any notes about this clock out..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowClockOutModal(false);
                  setSelectedRecordForClockOut(null);
                }}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleClockOut}
                className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 group-hover:animate-pulse" />
                    <span>Clock Out Employee</span>
                  </div>
                )}
              </button>
          </div>
        </div>
      )}
      </Modal>
    </div>
  );
};

export default Attendance; 