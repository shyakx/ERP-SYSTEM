import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  CalendarDays,
  Users,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Mail,
  Building,
  UserCheck,
  UserX,
  Clock4,
  Clock8
} from 'lucide-react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const Attendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2024-03-15');

  const attendanceStats = [
    { title: 'Present Today', value: '89', subtitle: 'Out of 127 employees', color: 'green', icon: '✅', trend: { value: '+5%', isPositive: true }, delay: 0 },
    { title: 'Absent Today', value: '12', subtitle: 'Sick/Leave', color: 'red', icon: '❌', trend: { value: '-2%', isPositive: true }, delay: 100 },
    { title: 'Late Today', value: '8', subtitle: 'Arrived after 8:00 AM', color: 'orange', icon: '⏰', trend: { value: '+1%', isPositive: false }, delay: 200 },
    { title: 'On Leave', value: '18', subtitle: 'Approved leave', color: 'blue', icon: '📅', trend: { value: '+3%', isPositive: true }, delay: 300 }
  ];

  const attendanceRecords = [
    {
      id: 1,
      employeeName: 'Jean Pierre Uwimana',
      employeeId: 'EMP-001',
      department: 'Field Operations',
      date: '2024-03-15',
      checkIn: '07:45 AM',
      checkOut: '05:30 PM',
      totalHours: '9h 45m',
      status: 'Present',
      location: 'Kigali Office',
      overtime: '1h 45m',
      lateMinutes: 0
    },
    {
      id: 2,
      employeeName: 'Marie Claire Niyonsaba',
      employeeId: 'EMP-002',
      department: 'Human Resources',
      date: '2024-03-15',
      checkIn: '08:15 AM',
      checkOut: '05:00 PM',
      totalHours: '8h 45m',
      status: 'Present',
      location: 'Kigali Office',
      overtime: '0h 45m',
      lateMinutes: 15
    },
    {
      id: 3,
      employeeName: 'Emmanuel Ndayisaba',
      employeeId: 'EMP-003',
      department: 'Field Operations',
      date: '2024-03-15',
      checkIn: '07:30 AM',
      checkOut: '06:00 PM',
      totalHours: '10h 30m',
      status: 'Present',
      location: 'Huye Branch',
      overtime: '2h 30m',
      lateMinutes: 0
    },
    {
      id: 4,
      employeeName: 'Ange Uwineza',
      employeeId: 'EMP-004',
      department: 'Finance',
      date: '2024-03-15',
      checkIn: '08:30 AM',
      checkOut: '05:15 PM',
      totalHours: '8h 45m',
      status: 'Present',
      location: 'Kigali Office',
      overtime: '0h 45m',
      lateMinutes: 30
    },
    {
      id: 5,
      employeeName: 'Patrick Nshimiyimana',
      employeeId: 'EMP-005',
      department: 'Field Operations',
      date: '2024-03-15',
      checkIn: null,
      checkOut: null,
      totalHours: '0h 0m',
      status: 'Absent',
      location: 'Musanze Branch',
      overtime: '0h 0m',
      lateMinutes: 0
    },
    {
      id: 6,
      employeeName: 'Sarah Uwamahoro',
      employeeId: 'EMP-006',
      department: 'Field Operations',
      date: '2024-03-15',
      checkIn: '09:15 AM',
      checkOut: '05:30 PM',
      totalHours: '8h 15m',
      status: 'Present',
      location: 'Kigali Office',
      overtime: '0h 15m',
      lateMinutes: 75
    }
  ];

  const attendanceSummary = [
    { department: 'Field Operations', present: 45, absent: 3, late: 4, onLeave: 8 },
    { department: 'Human Resources', present: 8, absent: 1, late: 1, onLeave: 2 },
    { department: 'Finance', present: 12, absent: 0, late: 1, onLeave: 1 },
    { department: 'IT', present: 6, absent: 0, late: 0, onLeave: 1 },
    { department: 'Management', present: 5, absent: 0, late: 0, onLeave: 1 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'text-green-600 bg-green-100';
      case 'Absent': return 'text-red-600 bg-red-100';
      case 'Late': return 'text-orange-600 bg-orange-100';
      case 'On Leave': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLateStatusColor = (minutes: number) => {
    if (minutes === 0) return 'text-green-600';
    if (minutes <= 15) return 'text-yellow-600';
    if (minutes <= 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Track employee attendance and working hours</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AnimatedButton
            onClick={() => {}}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Manual Entry</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {attendanceStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Department Summary */}
      <AnimatedCard
        title="Department Attendance Summary"
        subtitle="Attendance breakdown by department"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On Leave</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceSummary.map((summary, index) => {
                const total = summary.present + summary.absent + summary.late + summary.onLeave;
                const attendanceRate = ((summary.present + summary.onLeave) / total) * 100;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{summary.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 font-medium">{summary.present}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-600 font-medium">{summary.absent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-orange-600 font-medium">{summary.late}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-blue-600 font-medium">{summary.onLeave}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <AnimatedProgressBar
                          progress={attendanceRate}
                          color={attendanceRate >= 90 ? 'green' : attendanceRate >= 80 ? 'orange' : 'red'}
                          height={6}
                          showLabel={false}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900">{attendanceRate.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Attendance Records */}
      <AnimatedCard
        title="Daily Attendance Records"
        subtitle="Detailed attendance for selected date"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">{record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.department}</div>
                    <div className="text-xs text-gray-500">{record.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getLateStatusColor(record.lateMinutes)}`}>
                      {record.checkIn || 'Not checked in'}
                    </div>
                    {record.lateMinutes > 0 && (
                      <div className="text-xs text-orange-600">+{record.lateMinutes} min late</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.checkOut || 'Not checked out'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.totalHours}</div>
                    {record.overtime !== '0h 0m' && (
                      <div className="text-xs text-blue-600">+{record.overtime} OT</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => {}}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => {}}
                        className="text-green-600 hover:text-green-900"
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
        subtitle="Common attendance management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Manual Entry</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <UserCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Bulk Approve</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <Download className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Export Data</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Attendance Analytics */}
      <AnimatedCard
        title="Attendance Analytics"
        subtitle="Attendance trends and patterns"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Attendance Rate by Department</h4>
            <AnimatedProgressBar
              progress={92}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
              color="blue"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Punctuality Trends</h4>
            <AnimatedProgressBar
              progress={85}
              color="orange"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={78}
              color="purple"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Attendance; 