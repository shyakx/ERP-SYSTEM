import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
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
  TrendingDown
} from 'lucide-react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const LeaveManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const leaveStats = [
    { title: 'Total Leave Requests', value: '45', subtitle: 'This Month', color: 'blue', icon: '📅', trend: { value: '+12%', isPositive: true }, delay: 0 },
    { title: 'Approved', value: '32', subtitle: 'This Month', color: 'green', icon: '✅', trend: { value: '+8%', isPositive: true }, delay: 100 },
    { title: 'Pending', value: '8', subtitle: 'Awaiting Approval', color: 'orange', icon: '⏳', trend: { value: '-5%', isPositive: true }, delay: 200 },
    { title: 'Rejected', value: '5', subtitle: 'This Month', color: 'red', icon: '❌', trend: { value: '-2%', isPositive: true }, delay: 300 }
  ];

  const leaveTypes = [
    { id: 1, name: 'Annual Leave', daysAllocated: 25, daysUsed: 18, daysRemaining: 7, color: 'blue' },
    { id: 2, name: 'Sick Leave', daysAllocated: 15, daysUsed: 3, daysRemaining: 12, color: 'red' },
    { id: 3, name: 'Maternity Leave', daysAllocated: 90, daysUsed: 0, daysRemaining: 90, color: 'pink' },
    { id: 4, name: 'Paternity Leave', daysAllocated: 7, daysUsed: 0, daysRemaining: 7, color: 'purple' },
    { id: 5, name: 'Bereavement Leave', daysAllocated: 5, daysUsed: 1, daysRemaining: 4, color: 'gray' },
    { id: 6, name: 'Study Leave', daysAllocated: 10, daysUsed: 2, daysRemaining: 8, color: 'green' }
  ];

  const leaveRequests = [
    {
      id: 1,
      employeeName: 'Jean Pierre Uwimana',
      employeeId: 'EMP-001',
      leaveType: 'Annual Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      days: 6,
      reason: 'Family vacation',
      status: 'Approved',
      approver: 'Marie Claire Niyonsaba',
      submittedDate: '2024-02-28',
      department: 'Field Operations'
    },
    {
      id: 2,
      employeeName: 'Marie Claire Niyonsaba',
      employeeId: 'EMP-002',
      leaveType: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      days: 3,
      reason: 'Medical appointment',
      status: 'Approved',
      approver: 'HR Director',
      submittedDate: '2024-03-09',
      department: 'Human Resources'
    },
    {
      id: 3,
      employeeName: 'Emmanuel Ndayisaba',
      employeeId: 'EMP-003',
      leaveType: 'Annual Leave',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      days: 5,
      reason: 'Personal matters',
      status: 'Pending',
      approver: 'Regional Manager',
      submittedDate: '2024-03-01',
      department: 'Field Operations'
    },
    {
      id: 4,
      employeeName: 'Ange Uwineza',
      employeeId: 'EMP-004',
      leaveType: 'Study Leave',
      startDate: '2024-03-25',
      endDate: '2024-03-27',
      days: 3,
      reason: 'Professional certification exam',
      status: 'Approved',
      approver: 'Finance Manager',
      submittedDate: '2024-02-25',
      department: 'Finance'
    },
    {
      id: 5,
      employeeName: 'Patrick Nshimiyimana',
      employeeId: 'EMP-005',
      leaveType: 'Maternity Leave',
      startDate: '2024-05-01',
      endDate: '2024-07-30',
      days: 90,
      reason: 'Maternity leave',
      status: 'Approved',
      approver: 'HR Manager',
      submittedDate: '2024-02-15',
      department: 'Field Operations'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'text-blue-600 bg-blue-100';
      case 'Sick Leave': return 'text-red-600 bg-red-100';
      case 'Maternity Leave': return 'text-pink-600 bg-pink-100';
      case 'Paternity Leave': return 'text-purple-600 bg-purple-100';
      case 'Bereavement Leave': return 'text-gray-600 bg-gray-100';
      case 'Study Leave': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.leaveType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage employee leave requests and approvals</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Leave Request</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveStats.map((stat, index) => (
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

      {/* Leave Types Overview */}
      <AnimatedCard
        title="Leave Types Overview"
        subtitle="Employee leave allocation and usage"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaveTypes.map((type) => {
            const percentage = (type.daysUsed / type.daysAllocated) * 100;
            return (
              <div key={type.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(type.name)}`}>
                    {type.daysRemaining} days left
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Used: {type.daysUsed} days</span>
                    <span className="text-gray-600">{percentage.toFixed(1)}%</span>
                  </div>
                  <AnimatedProgressBar
                    progress={percentage}
                    color={percentage > 80 ? 'red' : percentage > 60 ? 'orange' : 'green'}
                    height={6}
                    showLabel={false}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Allocated: {type.daysAllocated} days</span>
                    <span>Remaining: {type.daysRemaining} days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Leave Requests */}
      <AnimatedCard
        title="Leave Requests"
        subtitle="Manage and approve employee leave requests"
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
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Bereavement Leave">Bereavement Leave</option>
              <option value="Study Leave">Study Leave</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">
                          {request.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                        <div className="text-sm text-gray-500">{request.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.startDate} to {request.endDate}</div>
                    <div className="text-xs text-gray-500">Submitted: {request.submittedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.days} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
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
                      {request.status === 'Pending' && (
                        <>
                          <AnimatedButton
                            onClick={() => {}}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => {}}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
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
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common leave management tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">New Request</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Approve All</span>
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

      {/* Leave Analytics */}
      <AnimatedCard
        title="Leave Analytics"
        subtitle="Leave trends and patterns"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Leave Approval Rate</h4>
            <AnimatedProgressBar
              progress={85}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={72}
              color="blue"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Leave Type Distribution</h4>
            <AnimatedProgressBar
              progress={65}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={90}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default LeaveManagement; 