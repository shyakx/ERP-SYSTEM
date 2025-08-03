import React from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';

const UserSupport: React.FC = () => {
  const colorScheme = getColorScheme('it');

  const supportStats = [
    { title: 'Open Tickets', value: '23', subtitle: 'Active', color: 'orange', icon: '🎫', trend: { value: '-5', isPositive: true }, delay: 0 },
    { title: 'Resolved Today', value: '18', subtitle: 'This week', color: 'green', icon: '✅', trend: { value: '+3', isPositive: true }, delay: 100 },
    { title: 'Avg Response', value: '2.1hrs', subtitle: 'Time', color: 'blue', icon: '⏱️', trend: { value: '-0.3hrs', isPositive: true }, delay: 200 },
    { title: 'Satisfaction', value: '94%', subtitle: 'Rating', color: 'purple', icon: '😊', trend: { value: '+2%', isPositive: true }, delay: 300 }
  ];

  const supportTickets = [
    {
      id: 'TKT-2024-001',
      title: 'Email Access Issue',
      description: 'Cannot access email account from mobile device',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Jean Pierre Uwimana',
      requester: 'Marie Uwamahoro',
      department: 'HR',
      createdAt: '2 hours ago',
      category: 'Email Support'
    },
    {
      id: 'TKT-2024-002',
      title: 'Printer Connection Problem',
      description: 'Network printer not responding in Finance office',
      priority: 'Medium',
      status: 'Open',
      assignedTo: 'Emmanuel Ndayisaba',
      requester: 'Patrick Nshimiyimana',
      department: 'Finance',
      createdAt: '4 hours ago',
      category: 'Hardware Support'
    },
    {
      id: 'TKT-2024-003',
      title: 'Software Installation Request',
      description: 'Need Adobe Acrobat installed on workstation',
      priority: 'Low',
      status: 'Resolved',
      assignedTo: 'Alexis Nkurunziza',
      requester: 'Sarah Mukamana',
      department: 'Marketing',
      createdAt: '1 day ago',
      category: 'Software Support'
    },
    {
      id: 'TKT-2024-004',
      title: 'VPN Connection Issue',
      description: 'Cannot connect to company VPN from home',
      priority: 'High',
      status: 'Open',
      assignedTo: 'Patrick Nshimiyimana',
      requester: 'John Uwimana',
      department: 'Sales',
      createdAt: '6 hours ago',
      category: 'Network Support'
    }
  ];

  const knowledgeBase = [
    {
      title: 'How to Reset Password',
      category: 'Account Management',
      views: 156,
      lastUpdated: '1 week ago',
      helpful: 23,
      tags: ['password', 'account', 'login']
    },
    {
      title: 'Setting Up Email on Mobile',
      category: 'Email Support',
      views: 89,
      lastUpdated: '2 weeks ago',
      helpful: 15,
      tags: ['email', 'mobile', 'setup']
    },
    {
      title: 'Network Printer Troubleshooting',
      category: 'Hardware Support',
      views: 234,
      lastUpdated: '3 days ago',
      helpful: 42,
      tags: ['printer', 'network', 'hardware']
    },
    {
      title: 'VPN Connection Guide',
      category: 'Network Support',
      views: 67,
      lastUpdated: '1 week ago',
      helpful: 12,
      tags: ['vpn', 'remote', 'network']
    }
  ];

  const supportCategories = [
    {
      name: 'Email Support',
      tickets: 8,
      avgResolution: '1.5hrs',
      satisfaction: 96,
      icon: '📧'
    },
    {
      name: 'Hardware Support',
      tickets: 12,
      avgResolution: '3.2hrs',
      satisfaction: 89,
      icon: '🖥️'
    },
    {
      name: 'Software Support',
      tickets: 15,
      avgResolution: '2.1hrs',
      satisfaction: 92,
      icon: '📦'
    },
    {
      name: 'Network Support',
      tickets: 6,
      avgResolution: '4.5hrs',
      satisfaction: 87,
      icon: '🌐'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Support Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportStats.map((stat, index) => (
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

      {/* Support Tickets */}
      <AnimatedCard
        title="Support Tickets"
        subtitle="Active and recent support requests"
        color="orange"
        icon="🎫"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                    <div className="text-xs text-gray-500">{ticket.category}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                      <div className="text-xs text-gray-500">{ticket.description}</div>
                      <div className="text-xs text-gray-400">by {ticket.requester} ({ticket.department})</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.createdAt}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">View</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Knowledge Base and Support Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Knowledge Base"
          subtitle="Popular help articles and guides"
          color="blue"
          icon="📚"
          delay={600}
        >
          <div className="space-y-3">
            {knowledgeBase.map((article) => (
              <div key={article.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{article.title}</span>
                    <span className="text-xs text-gray-500">({article.views} views)</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {article.category} • {article.helpful} found helpful
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Updated {article.lastUpdated} • Tags: {article.tags.join(', ')}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                  <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Support Categories"
          subtitle="Performance by support category"
          color="green"
          icon="📊"
          delay={800}
        >
          <div className="space-y-3">
            {supportCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">{category.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">
                      {category.tickets} tickets • {category.avgResolution} avg resolution
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{category.satisfaction}%</div>
                  <div className="text-xs text-gray-500">Satisfaction</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common support tasks"
        color="purple"
        icon="⚡"
        delay={1000}
      >
        <div className="grid grid-cols-1 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create ticket')}
          >
            🎫 Create Support Ticket
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Knowledge base')}
          >
            📚 Manage Knowledge Base
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Support report')}
          >
            📊 Generate Support Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('User training')}
          >
            🎓 Schedule User Training
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Support Performance Metrics */}
      <AnimatedCard
        title="Support Performance"
        subtitle="Key support metrics and trends"
        color="indigo"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-green-600">Satisfaction Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.1hrs</div>
            <div className="text-sm text-blue-600">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-purple-600">First Call Resolution</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default UserSupport;
