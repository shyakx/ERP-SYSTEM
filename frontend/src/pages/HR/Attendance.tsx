import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UserCheck, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';

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
}

interface RecentActivity {
  id: string;
  type: 'clock_in' | 'clock_out' | 'leave_request' | 'overtime';
  employeeName: string;
  time: string;
  description: string;
}

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [selectedEmployeeForClockIn, setSelectedEmployeeForClockIn] = useState('');
  const [selectedEmployeeForClockOut, setSelectedEmployeeForClockOut] = useState('');
  const [selectedRecordForClockOut, setSelectedRecordForClockOut] = useState<AttendanceRecord | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/attendance');
      if (!response.ok) throw new Error('Failed to fetch attendance');
      const data = await response.json();
      
      // Transform the data to match our frontend interface
      const transformedData = data.map((record: any) => ({
        id: record.id.toString(),
        employeeId: record.employee_id,
        employeeName: record.employee_name || 'Unknown Employee',
        date: record.date,
        clockIn: record.clock_in,
        clockOut: record.clock_out,
        totalHours: record.total_hours,
        status: record.status,
        location: record.location,
        notes: record.notes,
        shiftId: record.shift_id
      }));
      
      setAttendance(transformedData);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const canManageAttendance = user?.role === 'system_admin' || user?.role === 'hr_manager' || user?.role === 'operations_supervisor' || user?.role === 'field_officer';

  const filteredAttendance = attendance
    .filter(record => 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(record => statusFilter === 'all' || record.status === statusFilter)
    .filter(record => !dateFilter || record.date === dateFilter);

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

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendance.filter(record => record.date === today);
  };

  const getPresentCount = () => {
    return getTodayAttendance().filter(record => record.status === 'present').length;
  };

  const getAbsentCount = () => {
    return getTodayAttendance().filter(record => record.status === 'absent').length;
  };

  const getLateCount = () => {
    return getTodayAttendance().filter(record => record.status === 'late').length;
  };

  const getTotalHours = () => {
    return getTodayAttendance().reduce((total, record) => total + (record.totalHours || 0), 0);
  };

  const handleClockIn = async () => {
    if (!selectedEmployeeForClockIn) return;
    
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];
    const today = now.toISOString().split('T')[0];
    
    const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeForClockIn);
    
    try {
      const response = await fetch('http://localhost:5000/api/attendance/clock-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: selectedEmployeeForClockIn,
          location: 'Main Office',
          notes: 'Clock in via system'
        }),
      });

      if (response.ok) {
        await fetchAttendance(); // Refresh the attendance data
        setShowClockInModal(false);
        setSelectedEmployeeForClockIn('');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error clocking in:', error);
      alert('Error clocking in. Please try again.');
    }
  };

  const handleClockOut = async () => {
    if (!selectedRecordForClockOut) return;
    
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];
    
    try {
      const response = await fetch('http://localhost:5000/api/attendance/clock-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: selectedRecordForClockOut.employeeId
        }),
      });

      if (response.ok) {
        await fetchAttendance(); // Refresh the attendance data
        setShowClockOutModal(false);
        setSelectedRecordForClockOut(null);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error clocking out:', error);
      alert('Error clocking out. Please try again.');
    }
  };

  const getActiveEmployees = () => {
    return employees.filter(emp => emp.id !== '');
  };

  const getEmployeesForClockOut = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendance.filter(record => 
      record.date === today && 
      record.clockIn && 
      !record.clockOut
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Track employee attendance and time records</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowClockInModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Clock In</span>
            </button>
            <button
              onClick={() => setShowClockOutModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              <span>Clock Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-gray-900">{getPresentCount()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-gray-900">{getAbsentCount()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Late Today</p>
              <p className="text-2xl font-bold text-gray-900">{getLateCount()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalHours()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search attendance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="early_departure">Early Departure</option>
            <option value="on_leave">On Leave</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">ID: {record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(record.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.clockIn ? formatTime(record.clockIn) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.clockOut ? formatTime(record.clockOut) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.totalHours ? `${record.totalHours}h` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {!record.clockOut && record.clockIn && (
                        <button
                          onClick={() => {
                            setSelectedRecordForClockOut(record);
                            setShowClockOutModal(true);
                          }}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Clock Out"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      {!record.clockIn && (
                        <button
                          onClick={() => {
                            setSelectedEmployeeForClockIn(record.employeeId);
                            setShowClockInModal(true);
                          }}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Clock In"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
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

      {/* Clock In Modal */}
      {showClockInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Clock In</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
                <select
                  value={selectedEmployeeForClockIn}
                  onChange={(e) => setSelectedEmployeeForClockIn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Employee</option>
                  {getActiveEmployees().map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowClockInModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClockIn}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={!selectedEmployeeForClockIn}
              >
                Clock In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clock Out Modal */}
      {showClockOutModal && selectedRecordForClockOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Clock Out</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-sm font-medium text-gray-900">{selectedRecordForClockOut.employeeName}</div>
                  <div className="text-xs text-gray-500">ID: {selectedRecordForClockOut.employeeId}</div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Clock In Time</label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-900">
                    {selectedRecordForClockOut.clockIn ? formatTime(selectedRecordForClockOut.clockIn) : 'Not clocked in'}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Add any notes about the clock out..."></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowClockOutModal(false);
                  setSelectedRecordForClockOut(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClockOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clock Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance; 