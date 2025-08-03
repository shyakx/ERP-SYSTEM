import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const EmployeeRelations: React.FC = () => {
  const colorScheme = getColorScheme('hr');

  const relationsData = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      issue: 'Work Schedule Conflict',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'Marie Claire Niyonsaba',
      createdAt: '2024-02-10',
      lastUpdated: '2024-02-12',
      avatar: 'JP'
    },
    {
      id: 2,
      name: 'Emmanuel Ndayisaba',
      position: 'Senior Guard',
      issue: 'Equipment Request',
      priority: 'Low',
      status: 'Resolved',
      assignedTo: 'Grace Uwamahoro',
      createdAt: '2024-02-05',
      lastUpdated: '2024-02-08',
      avatar: 'EN'
    },
    {
      id: 3,
      name: 'Patrick Nkurunziza',
      position: 'Security Supervisor',
      issue: 'Team Communication',
      priority: 'High',
      status: 'Open',
      assignedTo: 'Marie Claire Niyonsaba',
      createdAt: '2024-02-15',
      lastUpdated: '2024-02-15',
      avatar: 'PN'
    },
    {
      id: 4,
      name: 'Grace Uwamahoro',
      position: 'Training Coordinator',
      issue: 'Training Resources',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'HR Manager',
      createdAt: '2024-02-08',
      lastUpdated: '2024-02-11',
      avatar: 'GU'
    },
    {
      id: 5,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Assistant',
      issue: 'Policy Clarification',
      priority: 'Low',
      status: 'Resolved',
      assignedTo: 'HR Manager',
      createdAt: '2024-02-03',
      lastUpdated: '2024-02-06',
      avatar: 'MC'
    }
  ];

  const relationsStats = [
    { title: 'Total Cases', value: 23, subtitle: 'This Month', color: 'blue', icon: '📋', trend: { value: '+12%', isPositive: true }, delay: 0 },
    { title: 'Resolved', value: 18, subtitle: 'Cases Closed', color: 'green', icon: '✅', trend: { value: '78%', isPositive: true }, delay: 100 },
    { title: 'In Progress', value: 3, subtitle: 'Active Cases', color: 'orange', icon: '⏳', trend: { value: '13%', isPositive: false }, delay: 200 },
    { title: 'Open', value: 2, subtitle: 'New Cases', color: 'red', icon: '🚨', trend: { value: '9%', isPositive: false }, delay: 300 }
  ];

  const satisfactionData = [
    { category: 'Communication', score: 4.2, total: 5, color: 'blue' },
    { category: 'Problem Resolution', score: 4.5, total: 5, color: 'green' },
    { category: 'Response Time', score: 3.8, total: 5, color: 'purple' },
    { category: 'Overall Satisfaction', score: 4.1, total: 5, color: 'orange' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Relations Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relationsStats.map((stat, index) => (
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

      {/* Employee Relations Cases */}
      <AnimatedCard
        title="Employee Relations Cases"
        subtitle="Employee issues, concerns, and resolutions"
        color="blue"
        icon="🤝"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Issue</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Assigned To</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {relationsData.map((case_, index) => (
                <tr
                  key={case_.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-xs">{case_.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{case_.name}</p>
                        <p className="text-xs text-gray-500">{case_.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="text-sm text-gray-900">{case_.issue}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(case_.priority)}`}>
                      {case_.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                      {case_.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-900">{case_.assignedTo}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <AnimatedButton
                        color="blue"
                        size="sm"
                        onClick={() => console.log(`View case for ${case_.name}`)}
                      >
                        View
                      </AnimatedButton>
                      <AnimatedButton
                        color="green"
                        size="sm"
                        onClick={() => console.log(`Update case for ${case_.name}`)}
                      >
                        Update
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Employee Satisfaction and Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Employee Satisfaction"
          subtitle="Employee relations satisfaction scores"
          color="green"
          icon="😊"
          delay={600}
        >
          <div className="space-y-3">
            {satisfactionData.map((item, index) => (
              <div
                key={item.category}
                className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{item.category}</h4>
                  <span className="text-xs font-semibold text-gray-600">
                    {item.score}/{item.total}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Score</span>
                    <span className="text-gray-900">{item.score} out of {item.total}</span>
                  </div>
                  <AnimatedProgressBar 
                    progress={(item.score / item.total) * 100} 
                    color="green" 
                    height={4} 
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Percentage</span>
                    <span className="text-green-600 font-medium">{Math.round((item.score / item.total) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Communication Channels"
          subtitle="Employee communication preferences and usage"
          color="purple"
          icon="💬"
          delay={800}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">📧</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-500">Primary communication</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-600">85% usage</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">📱</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">Quick updates</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-600">72% usage</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">📞</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone Calls</p>
                  <p className="text-xs text-gray-500">Urgent matters</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-600">45% usage</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">🏢</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">In-Person</p>
                  <p className="text-xs text-gray-500">Formal meetings</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-600">38% usage</span>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Conflict Resolution and Team Building */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Conflict Resolution"
          subtitle="Recent conflict resolution cases and outcomes"
          color="orange"
          icon="⚖️"
          delay={1000}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Work Schedule Dispute</h4>
              <p className="text-xs text-gray-700 mb-2">Resolved through mediation - flexible schedule implemented</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Resolution Time</span>
                <span className="text-green-600 font-medium">3 days</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Equipment Allocation</h4>
              <p className="text-xs text-gray-700 mb-2">Resolved through fair distribution policy</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Resolution Time</span>
                <span className="text-green-600 font-medium">1 week</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Team Communication</h4>
              <p className="text-xs text-gray-700 mb-2">Ongoing - implementing communication training</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Status</span>
                <span className="text-yellow-600 font-medium">In Progress</span>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Team Building Activities"
          subtitle="Upcoming and past team building events"
          color="indigo"
          icon="🎉"
          delay={1200}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Monthly Team Lunch</h4>
              <p className="text-xs text-gray-700 mb-2">Next: March 15, 2024</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Attendance</span>
                <span className="text-indigo-600 font-medium">85%</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Quarterly Retreat</h4>
              <p className="text-xs text-gray-700 mb-2">Next: April 20-22, 2024</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Location</span>
                <span className="text-indigo-600 font-medium">Lake Kivu</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Sports Day</h4>
              <p className="text-xs text-gray-700 mb-2">Next: May 10, 2024</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Activities</span>
                <span className="text-indigo-600 font-medium">Football, Volleyball</span>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Actions and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Quick Actions"
          subtitle="Common employee relations tasks"
          color="teal"
          icon="⚡"
          delay={1400}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Create new employee relations case')}
            >
              📝 New Case
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Schedule team building event')}
            >
              🎉 Team Building
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate relations report')}
            >
              📊 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Schedule mediation session')}
            >
              ⚖️ Mediation
            </AnimatedButton>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Relations Analytics"
          subtitle="Employee relations trends and insights"
          color="pink"
          icon="📈"
          delay={1600}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Case Resolution Rate</span>
                <span className="text-xs font-semibold text-gray-900">78%</span>
              </div>
              <AnimatedProgressBar progress={78} color="green" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Average Resolution Time</span>
                <span className="text-xs font-semibold text-gray-900">4.2 days</span>
              </div>
              <AnimatedProgressBar progress={84} color="blue" height={6} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Employee Satisfaction</span>
                <span className="text-xs font-semibold text-gray-900">4.1/5.0</span>
              </div>
              <AnimatedProgressBar progress={82} color="purple" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Team Building Participation</span>
                <span className="text-xs font-semibold text-gray-900">92%</span>
              </div>
              <AnimatedProgressBar progress={92} color="orange" height={6} />
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default EmployeeRelations; 