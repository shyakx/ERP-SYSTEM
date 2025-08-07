import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Customer experience Department Pages
import CustomerOverview from './pages/CustomerOverview';
import CustomerSupport from './pages/CustomerSupport';
import FeedbackManagement from './pages/FeedbackManagement';
import SatisfactionSurveys from './pages/SatisfactionSurveys';
import ServiceQuality from './pages/ServiceQuality';
import SupportTickets from './pages/SupportTickets';
import Satisfaction from './pages/Satisfaction';
import Feedback from './pages/Feedback';
import Communication from './pages/Communication';
import Reports from './pages/Reports';

const CustomerexperienceDashboard: React.FC = () => {
  const colorScheme = getColorScheme('cx');
  const location = useLocation();

  const cxStats = [
    { title: 'Customer Satisfaction', value: '94.2%', subtitle: 'This Month', color: 'blue', icon: '😊', trend: { value: '+2.1%', isPositive: true }, delay: 0 },
    { title: 'Support Tickets', value: '156', subtitle: 'Open', color: 'green', icon: '🎫', trend: { value: '-12', isPositive: true }, delay: 100 },
    { title: 'Response Time', value: '2.3h', subtitle: 'Average', color: 'purple', icon: '⏱️', trend: { value: '-0.5h', isPositive: true }, delay: 200 },
    { title: 'Feedback Score', value: '4.8/5', subtitle: 'Overall', color: 'orange', icon: '⭐', trend: { value: '+0.2', isPositive: true }, delay: 300 }
  ];

  const recentTickets = [
    {
      id: 1,
      title: 'Service Quality Issue',
      customer: 'Kigali Business Center',
      priority: 'High',
      status: 'In Progress',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Billing Inquiry',
      customer: 'ABC Corporation',
      priority: 'Medium',
      status: 'Resolved',
      date: '2024-02-14'
    },
    {
      id: 3,
      title: 'Technical Support',
      customer: 'Tech Solutions Ltd',
      priority: 'Low',
      status: 'Pending',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/cx', icon: '🏠' },
    { name: 'Overview', path: '/cx/overview', icon: '📊' },
    { name: 'Support', path: '/cx/support', icon: '🛠️' },
    { name: 'Feedback', path: '/cx/feedback', icon: '💬' },
    { name: 'Surveys', path: '/cx/surveys', icon: '📝' },
    { name: 'Quality', path: '/cx/quality', icon: '✅' },
    { name: 'Tickets', path: '/cx/tickets', icon: '🎫' },
    { name: 'Satisfaction', path: '/cx/satisfaction', icon: '😊' },
    { name: 'Communication', path: '/cx/communication', icon: '📞' },
    { name: 'Reports', path: '/cx/reports', icon: '📈' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'Pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* CX Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cxStats.map((stat, index) => (
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

      {/* Recent Support Tickets */}
      <AnimatedCard
        title="Recent Support Tickets"
        subtitle="Latest customer inquiries"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🎫</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{ticket.title}</p>
                  <p className="text-sm text-gray-500">{ticket.customer}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <p className={`text-xs mt-1 ${getStatusColor(ticket.status)}`}>{ticket.status}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common customer experience tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">🎫</span>
            <span className="text-sm font-medium text-gray-700">New Ticket</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📊</span>
            <span className="text-sm font-medium text-gray-700">View Surveys</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">💬</span>
            <span className="text-sm font-medium text-gray-700">Send Communication</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">⭐</span>
            <span className="text-sm font-medium text-gray-700">Check Satisfaction</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Customer Experience Overview */}
      <AnimatedCard
        title="Customer Experience Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Customer Satisfaction</h4>
            <AnimatedProgressBar
              progress={94}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Response Metrics</h4>
            <AnimatedProgressBar
              progress={92}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={85}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/cx':
        return <DashboardContent />;
      case '/cx/overview':
        return <CustomerOverview />;
      case '/cx/support':
        return <CustomerSupport />;
      case '/cx/feedback':
        return <FeedbackManagement />;
      case '/cx/surveys':
        return <SatisfactionSurveys />;
      case '/cx/quality':
        return <ServiceQuality />;
      case '/cx/tickets':
        return <SupportTickets />;
      case '/cx/satisfaction':
        return <Satisfaction />;
      case '/cx/communication':
        return <Communication />;
      case '/cx/reports':
        return <Reports />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Customer Experience Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default CustomerexperienceDashboard;
