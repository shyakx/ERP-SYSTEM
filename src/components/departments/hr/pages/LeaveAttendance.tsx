import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Calendar, 
  Clock, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  TrendingUp,
  TrendingDown,
  Filter,
  Search
} from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: 'annual' | 'sick' | 'personal' | 'emergency' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: 'present' | 'late' | 'absent' | 'half-day';
  location: string;
  notes?: string;
}

const LeaveAttendance: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeName: 'Jean Baptiste',
      employeeId: 'SG001',
      leaveType: 'annual',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      days: 5,
      reason: 'Family vacation',
      status: 'approved',
      submittedDate: '2024-01-10',
      approvedBy: 'Paul Mugenzi',
      approvedDate: '2024-01-12'
    },
    {
      id: '2',
      employeeName: 'Marie Claire',
      employeeId: 'SG002',
      leaveType: 'sick',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      reason: 'Medical treatment',
      status: 'pending',
      submittedDate: '2024-01-19'
    },
    {
      id: '3',
      employeeName: 'Peter Nkurunziza',
      employeeId: 'SG003',
      leaveType: 'personal',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      days: 1,
      reason: 'Personal appointment',
      status: 'approved',
      submittedDate: '2024-01-20',
      approvedBy: 'Paul Mugenzi',
      approvedDate: '2024-01-21'
    },
    {
      id: '4',
      employeeName: 'Grace Mukamana',
      employeeId: 'SG004',
      leaveType: 'emergency',
      startDate: '2024-01-18',
      endDate: '2024-01-18',
      days: 1,
      reason: 'Family emergency',
      status: 'approved',
      submittedDate: '2024-01-18',
      approvedBy: 'Sarah Uwimana',
      approvedDate: '2024-01-18'
    }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      employeeName: 'Jean Baptiste',
      employeeId: 'SG001',
      date: '2024-01-15',
      checkIn: '06:00',
      checkOut: '18:00',
      hoursWorked: 12,
      status: 'present',
      location: 'Main Gate',
      notes: 'On time'
    },
    {
      id: '2',
      employeeName: 'Marie Claire',
      employeeId: 'SG002',
      date: '2024-01-15',
      checkIn: '18:05',
      checkOut: '06:00',
      hoursWorked: 11.9,
      status: 'late',
      location: 'Parking Area',
      notes: '5 minutes late'
    },
    {
      id: '3',
      employeeName: 'Peter Nkurunziza',
      employeeId: 'SG003',
      date: '2024-01-15',
      checkIn: '06:00',
      checkOut: '12:00',
      hoursWorked: 6,
      status: 'half-day',
      location: 'Perimeter Patrol',
      notes: 'Half day leave'
    },
    {
      id: '4',
      employeeName: 'Grace Mukamana',
      employeeId: 'SG004',
      date: '2024-01-15',
      checkIn: '06:00',
      checkOut: '18:00',
      hoursWorked: 12,
      status: 'present',
      location: 'Reception',
      notes: 'On time'
    },
    {
      id: '5',
      employeeName: 'David Nkurunziza',
      employeeId: 'SG005',
      date: '2024-01-15',
      checkIn: '18:00',
      checkOut: '06:00',
      hoursWorked: 12,
      status: 'present',
      location: 'Back Entrance',
      notes: 'On time'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'leave' | 'attendance'>('leave');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<LeaveRequest | AttendanceRecord | null>(null);

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'annual': return 'bg-blue-100 text-blue-800';
      case 'sick': return 'bg-red-100 text-red-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'emergency': return 'bg-orange-100 text-orange-800';
      case 'maternity': return 'bg-pink-100 text-pink-800';
      case 'paternity': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-orange-100 text-orange-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'half-day': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      case 'absent': return <AlertCircle className="w-4 h-4" />;
      case 'half-day': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const pendingLeaves = leaveRequests.filter(leave => leave.status === 'pending').length;
  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(record => record.status === 'present').length;
  const lateCount = attendanceRecords.filter(record => record.status === 'late').length;
  const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

  const handleAddLeave = () => {
    setShowAddModal(true);
  };

  const handleViewRecord = (record: LeaveRequest | AttendanceRecord) => {
    setSelectedRecord(record);
  };

  const handleApproveLeave = (leave: LeaveRequest) => {
    // Implement approve functionality
    console.log('Approve leave:', leave);
  };

  const handleRejectLeave = (leave: LeaveRequest) => {
    // Implement reject functionality
    console.log('Reject leave:', leave);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="relative px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Leave & Attendance</h2>
                    <p className="text-slate-600 text-lg">Manage employee leave requests and attendance tracking</p>
                  </div>
                </div>
              </div>
              <AnimatedButton
                onClick={handleAddLeave}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>Add Leave Request</span>
              </AnimatedButton>
            </div>
          </div>
        </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Pending Leaves"
          subtitle="Awaiting approval"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingLeaves}</p>
              <p className="text-sm text-gray-500">Leave requests</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Attendance Rate"
          subtitle="Today's attendance"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{attendanceRate}%</p>
              <p className="text-sm text-gray-500">Present today</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Present Today"
          subtitle="Employees on duty"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{presentCount}</p>
              <p className="text-sm text-gray-500">Present employees</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Late Arrivals"
          subtitle="Today's late arrivals"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{lateCount}</p>
              <p className="text-sm text-gray-500">Late arrivals</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('leave')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leave'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Leave Requests</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>Attendance Records</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'leave' ? (
            /* Leave Requests */
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Leave Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Reason</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((leave) => (
                      <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{leave.employeeName}</p>
                              <p className="text-sm text-gray-500">{leave.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(leave.leaveType)}`}>
                            {leave.leaveType}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-gray-900">{leave.startDate} - {leave.endDate}</p>
                            <p className="text-sm text-gray-500">{leave.days} days</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{leave.reason}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                            {getStatusIcon(leave.status)}
                            <span className="ml-1 capitalize">{leave.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{leave.submittedDate}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <AnimatedButton
                              onClick={() => handleViewRecord(leave)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </AnimatedButton>
                            {leave.status === 'pending' && (
                              <>
                                <AnimatedButton
                                  onClick={() => handleApproveLeave(leave)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </AnimatedButton>
                                <AnimatedButton
                                  onClick={() => handleRejectLeave(leave)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </AnimatedButton>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Attendance Records */
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Hours</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{record.employeeName}</p>
                              <p className="text-sm text-gray-500">{record.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{record.date}</td>
                        <td className="py-3 px-4 text-gray-700">{record.checkIn}</td>
                        <td className="py-3 px-4 text-gray-700">{record.checkOut}</td>
                        <td className="py-3 px-4 text-gray-700">{record.hoursWorked}h</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                            <span className="ml-1 capitalize">{record.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{record.location}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <AnimatedButton
                            onClick={() => handleViewRecord(record)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </AnimatedButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {activeTab === 'leave' ? 'Leave Request Details' : 'Attendance Record Details'}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {activeTab === 'leave' ? (
                /* Leave Request Details */
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).employeeName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).employeeId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor((selectedRecord as LeaveRequest).leaveType)}`}>
                      {(selectedRecord as LeaveRequest).leaveType}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).days} days</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).endDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).reason}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((selectedRecord as LeaveRequest).status)}`}>
                      {getStatusIcon((selectedRecord as LeaveRequest).status)}
                      <span className="ml-1 capitalize">{(selectedRecord as LeaveRequest).status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                    <p className="text-gray-900">{(selectedRecord as LeaveRequest).submittedDate}</p>
                  </div>
                  {(selectedRecord as LeaveRequest).approvedBy && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Approved By</label>
                      <p className="text-gray-900">{(selectedRecord as LeaveRequest).approvedBy}</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Attendance Record Details */
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).employeeName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).employeeId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).date}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check In</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).checkIn}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check Out</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).checkOut}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hours Worked</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).hoursWorked} hours</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((selectedRecord as AttendanceRecord).status)}`}>
                      {getStatusIcon((selectedRecord as AttendanceRecord).status)}
                      <span className="ml-1 capitalize">{(selectedRecord as AttendanceRecord).status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-gray-900">{(selectedRecord as AttendanceRecord).location}</p>
                  </div>
                  {(selectedRecord as AttendanceRecord).notes && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <p className="text-gray-900">{(selectedRecord as AttendanceRecord).notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default LeaveAttendance;
