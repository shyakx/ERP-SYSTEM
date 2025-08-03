import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const LeaveManagement: React.FC = () => {
  const colorScheme = getColorScheme('hr');

  const leaveData = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      days: 6,
      status: 'Approved',
      reason: 'Family vacation',
      avatar: 'JP'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Assistant',
      leaveType: 'Sick Leave',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      status: 'Approved',
      reason: 'Medical appointment',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Senior Guard',
      leaveType: 'Maternity Leave',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      days: 90,
      status: 'Pending',
      reason: 'Maternity leave',
      avatar: 'EN'
    },
    {
      id: 4,
      name: 'Grace Uwamahoro',
      position: 'Training Coordinator',
      leaveType: 'Study Leave',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      days: 15,
      status: 'Approved',
      reason: 'Professional development course',
      avatar: 'GU'
    },
    {
      id: 5,
      name: 'Patrick Nkurunziza',
      position: 'Security Supervisor',
      leaveType: 'Emergency Leave',
      startDate: '2024-02-08',
      endDate: '2024-02-09',
      days: 2,
      status: 'Approved',
      reason: 'Family emergency',
      avatar: 'PN'
    }
  ];

  const leaveStats = [
    { title: 'Total Requests', value: 45, subtitle: 'This Month', color: 'blue', icon: '📋', trend: { value: '+8%', isPositive: true }, delay: 0 },
    { title: 'Approved', value: 32, subtitle: 'Leave Requests', color: 'green', icon: '✅', trend: { value: '71%', isPositive: true }, delay: 100 },
    { title: 'Pending', value: 8, subtitle: 'Awaiting Approval', color: 'orange', icon: '⏳', trend: { value: '18%', isPositive: false }, delay: 200 },
    { title: 'Rejected', value: 5, subtitle: 'Leave Requests', color: 'red', icon: '❌', trend: { value: '11%', isPositive: false }, delay: 300 }
  ];

  const leaveTypes = [
    { type: 'Annual Leave', total: 25, used: 18, remaining: 7, color: 'blue' },
    { type: 'Sick Leave', total: 15, used: 8, remaining: 7, color: 'green' },
    { type: 'Maternity Leave', total: 90, used: 0, remaining: 90, color: 'purple' },
    { type: 'Study Leave', total: 20, used: 5, remaining: 15, color: 'orange' },
    { type: 'Emergency Leave', total: 10, used: 3, remaining: 7, color: 'red' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-green-100 text-green-800';
      case 'Maternity Leave': return 'bg-purple-100 text-purple-800';
      case 'Study Leave': return 'bg-orange-100 text-orange-800';
      case 'Emergency Leave': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Leave Stats */}
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

      {/* Leave Requests Table */}
      <AnimatedCard
        title="Leave Requests"
        subtitle="Employee leave applications and approvals"
        color="blue"
        icon="📅"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Leave Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Reason</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaveData.map((leave, index) => (
                <tr
                  key={leave.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-xs">{leave.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{leave.name}</p>
                        <p className="text-xs text-gray-500">{leave.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(leave.leaveType)}`}>
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{leave.startDate} - {leave.endDate}</p>
                      <p className="text-xs text-gray-500">{leave.days} days</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-900">{leave.reason}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <AnimatedButton
                        color="blue"
                        size="sm"
                        onClick={() => console.log(`View leave request for ${leave.name}`)}
                      >
                        View
                      </AnimatedButton>
                      {leave.status === 'Pending' && (
                        <>
                          <AnimatedButton
                            color="green"
                            size="sm"
                            onClick={() => console.log(`Approve leave for ${leave.name}`)}
                          >
                            Approve
                          </AnimatedButton>
                          <AnimatedButton
                            color="red"
                            size="sm"
                            onClick={() => console.log(`Reject leave for ${leave.name}`)}
                          >
                            Reject
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

      {/* Leave Balance and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Leave Balance"
          subtitle="Employee leave entitlements and usage"
          color="green"
          icon="📊"
          delay={600}
        >
          <div className="space-y-3">
            {leaveTypes.map((leaveType, index) => (
              <div
                key={leaveType.type}
                className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{leaveType.type}</h4>
                  <span className="text-xs font-semibold text-gray-600">
                    {leaveType.used}/{leaveType.total} days
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Used</span>
                    <span className="text-gray-900">{leaveType.used} days</span>
                  </div>
                  <AnimatedProgressBar 
                    progress={(leaveType.used / leaveType.total) * 100} 
                    color="green" 
                    height={4} 
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Remaining</span>
                    <span className="text-green-600 font-medium">{leaveType.remaining} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Upcoming Leave"
          subtitle="Scheduled leave for the next 30 days"
          color="purple"
          icon="📅"
          delay={800}
        >
          <div className="space-y-3">
            {leaveData.filter(l => l.status === 'Approved' && new Date(l.startDate) > new Date()).map((leave, index) => (
              <div
                key={leave.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-xs">{leave.avatar}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{leave.name}</p>
                    <p className="text-xs text-gray-500">{leave.leaveType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-600">Start Date</p>
                  <p className="text-xs text-gray-900">{leave.startDate}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Leave Policies and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Leave Policies"
          subtitle="Company leave policies and guidelines"
          color="indigo"
          icon="📋"
          delay={1000}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Annual Leave</h4>
              <p className="text-xs text-gray-700">25 days per year, must be used within the calendar year</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Sick Leave</h4>
              <p className="text-xs text-gray-700">15 days per year, medical certificate required after 3 days</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Maternity Leave</h4>
              <p className="text-xs text-gray-700">90 days for mothers, 3 days for fathers</p>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common leave management tasks"
          color="orange"
          icon="⚡"
          delay={1200}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Create new leave request')}
            >
              📝 Create Leave Request
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Bulk approve leaves')}
            >
              ✅ Bulk Approve
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate leave report')}
            >
              📊 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Update leave policies')}
            >
              ⚙️ Update Policies
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Leave Analytics */}
      <AnimatedCard
        title="Leave Analytics"
        subtitle="Department leave trends and insights"
        color="teal"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Leave Approval Rate</span>
              <span className="text-xs font-semibold text-gray-900">71%</span>
            </div>
            <AnimatedProgressBar progress={71} color="green" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Average Leave Duration</span>
              <span className="text-xs font-semibold text-gray-900">5.2 days</span>
            </div>
            <AnimatedProgressBar progress={52} color="blue" height={6} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Peak Leave Period</span>
              <span className="text-xs font-semibold text-gray-900">December</span>
            </div>
            <AnimatedProgressBar progress={85} color="purple" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Employee Satisfaction</span>
              <span className="text-xs font-semibold text-gray-900">92%</span>
            </div>
            <AnimatedProgressBar progress={92} color="orange" height={6} />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default LeaveManagement; 