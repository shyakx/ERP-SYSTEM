import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  AlertCircle,
  FileText,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AnimatedCard from './AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from './AnimatedCard';

interface LeaveBalance {
  id: number;
  leaveType: string;
  daysAllocated: number;
  daysUsed: number;
  daysRemaining: number;
  color: string;
  icon: string;
}

interface LeaveRequest {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approver?: string;
  comments?: string;
}

const PersonalLeave: React.FC = () => {
  useAuth();
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock leave balance data
  const leaveBalances: LeaveBalance[] = [
    {
      id: 1,
      leaveType: 'Annual Leave',
      daysAllocated: 25,
      daysUsed: 18,
      daysRemaining: 7,
      color: 'blue',
      icon: '🏖️'
    },
    {
      id: 2,
      leaveType: 'Sick Leave',
      daysAllocated: 15,
      daysUsed: 3,
      daysRemaining: 12,
      color: 'red',
      icon: '🏥'
    },
    {
      id: 3,
      leaveType: 'Maternity Leave',
      daysAllocated: 90,
      daysUsed: 0,
      daysRemaining: 90,
      color: 'pink',
      icon: '👶'
    },
    {
      id: 4,
      leaveType: 'Paternity Leave',
      daysAllocated: 7,
      daysUsed: 0,
      daysRemaining: 7,
      color: 'purple',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 5,
      leaveType: 'Bereavement Leave',
      daysAllocated: 5,
      daysUsed: 1,
      daysRemaining: 4,
      color: 'gray',
      icon: '🕊️'
    },
    {
      id: 6,
      leaveType: 'Study Leave',
      daysAllocated: 10,
      daysUsed: 2,
      daysRemaining: 8,
      color: 'green',
      icon: '📚'
    }
  ];

  // Mock leave requests
  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      leaveType: 'Annual Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      days: 6,
      reason: 'Family vacation',
      status: 'approved',
      submittedDate: '2024-02-28',
      approver: 'Marie Claire Niyonsaba'
    },
    {
      id: 2,
      leaveType: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      days: 3,
      reason: 'Medical appointment',
      status: 'approved',
      submittedDate: '2024-03-09',
      approver: 'HR Director'
    },
    {
      id: 3,
      leaveType: 'Annual Leave',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      days: 5,
      reason: 'Personal matters',
      status: 'pending',
      submittedDate: '2024-03-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
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

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmitRequest = async () => {
    if (!selectedLeaveType || !startDate || !endDate || !reason) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setSelectedLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setIsSubmitting(false);
    
    alert('Leave request submitted successfully!');
  };

  const days = calculateDays();

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Leave</h1>
        <p className="text-gray-600 mt-1">Manage your leave requests and view balances</p>
      </div>

      {/* Leave Balances */}
      <AnimatedCard
        title="Leave Balances"
        subtitle="Your available leave days by category"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaveBalances.map((balance) => {
            const percentage = (balance.daysUsed / balance.daysAllocated) * 100;
            return (
              <div key={balance.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{balance.icon}</span>
                    <h3 className="font-semibold text-gray-900 text-sm">{balance.leaveType}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(balance.leaveType)}`}>
                    {balance.daysRemaining} days left
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Used: {balance.daysUsed} days</span>
                    <span className="text-gray-600">{percentage.toFixed(1)}%</span>
                  </div>
                  <AnimatedProgressBar
                    progress={percentage}
                    color={percentage > 80 ? 'red' : percentage > 60 ? 'orange' : 'green'}
                    height={6}
                    showLabel={false}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Allocated: {balance.daysAllocated} days</span>
                    <span>Remaining: {balance.daysRemaining} days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* New Leave Request Form */}
      <AnimatedCard
        title="Request Leave"
        subtitle="Submit a new leave request"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type *
            </label>
            <select
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select leave type</option>
              {leaveBalances.map((balance) => (
                <option key={balance.id} value={balance.leaveType}>
                  {balance.leaveType} ({balance.daysRemaining} days remaining)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Days
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50">
              {days} days
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please provide a detailed reason for your leave request..."
            />
          </div>
        </div>

        <div className="mt-6">
          <AnimatedButton
            onClick={handleSubmitRequest}
            disabled={isSubmitting || !selectedLeaveType || !startDate || !endDate || !reason}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Leave History */}
      <AnimatedCard
        title="Leave History"
        subtitle="Your previous leave requests"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {leaveRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{request.leaveType}</p>
                  <p className="text-sm text-gray-500">
                    {request.startDate} to {request.endDate} ({request.days} days)
                  </p>
                  <p className="text-xs text-gray-400">Reason: {request.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                <p className="text-xs text-gray-500 mt-1">Submitted: {request.submittedDate}</p>
                {request.approver && (
                  <p className="text-xs text-gray-500">Approved by: {request.approver}</p>
                )}
              </div>
            </div>
          ))}
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
            className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">View Calendar</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <FileText className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Download Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Leave Analytics</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Help & Support</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default PersonalLeave; 