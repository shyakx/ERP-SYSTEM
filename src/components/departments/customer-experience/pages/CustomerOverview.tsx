import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  Download,
  Upload,
  Settings,
  BarChart3,
  Target,
  Zap,
  DollarSign,
  FileText,
  Users,
  Phone,
  Mail,
  Star,
  Award,
  Filter as FilterIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from 'lucide-react';

const CustomerOverview: React.FC = () => {
  const colorScheme = getColorScheme('customer-experience');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const cxStats = [
    { title: 'Customer Satisfaction', value: '94.2%', subtitle: 'Overall satisfaction', color: 'blue', icon: '😊', trend: { value: '+2.1%', isPositive: true }, delay: 0 },
    { title: 'Response Time', value: '2.3h', subtitle: 'Average response', color: 'green', icon: '⏱️', trend: { value: '-0.5h', isPositive: true }, delay: 100 },
    { title: 'Support Tickets', value: '234', subtitle: 'Active tickets', color: 'orange', icon: '🎫', trend: { value: '+18', isPositive: true }, delay: 200 },
    { title: 'Feedback Received', value: '156', subtitle: 'This month', color: 'purple', icon: '💭', trend: { value: '+23', isPositive: true }, delay: 300 }
  ];

  const topCustomers = [
    {
      id: 1,
      name: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      satisfaction: 4.8,
      tickets: 12,
      lastContact: '2024-01-15',
      status: 'Active',
      value: 'RWF 8.5M',
      region: 'Kigali'
    },
    {
      id: 2,
      name: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      satisfaction: 4.6,
      tickets: 8,
      lastContact: '2024-01-14',
      status: 'Active',
      value: 'RWF 6.2M',
      region: 'Musanze'
    },
    {
      id: 3,
      name: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      satisfaction: 4.9,
      tickets: 15,
      lastContact: '2024-01-13',
      status: 'Active',
      value: 'RWF 4.8M',
      region: 'Huye'
    },
    {
      id: 4,
      name: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      satisfaction: 4.4,
      tickets: 6,
      lastContact: '2024-01-12',
      status: 'Active',
      value: 'RWF 5.5M',
      region: 'Rubavu'
    },
    {
      id: 5,
      name: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      satisfaction: 4.7,
      tickets: 10,
      lastContact: '2024-01-11',
      status: 'Active',
      value: 'RWF 3.9M',
      region: 'Kigali'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Support Ticket',
      description: 'Security System Installation Issue',
      customer: 'Kigali Business Center',
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 14:30',
      status: 'In Progress'
    },
    {
      id: 2,
      type: 'Feedback',
      description: 'Excellent training session feedback',
      customer: 'Huye University',
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-15 13:45',
      status: 'Responded'
    },
    {
      id: 3,
      type: 'Survey',
      description: 'Post-service satisfaction survey sent',
      customer: 'Musanze Hotel & Resort',
      user: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 12:20',
      status: 'Active'
    },
    {
      id: 4,
      type: 'Quality Issue',
      description: 'Maintenance scheduling conflicts resolved',
      customer: 'Rubavu Manufacturing',
      user: 'Alexis Nkurunziza',
      timestamp: '2024-01-15 11:15',
      status: 'Resolved'
    },
    {
      id: 5,
      type: 'Customer Call',
      description: 'Follow-up call completed',
      customer: 'Kigali Shopping Mall',
      user: 'Dr. Sarah Uwamahoro',
      timestamp: '2024-01-15 10:30',
      status: 'Completed'
    }
  ];

  const cxRegions = [
    { region: 'Kigali', customers: 45, satisfaction: 4.6, tickets: 89, color: 'bg-blue-100 text-blue-800' },
    { region: 'Huye', customers: 28, satisfaction: 4.8, tickets: 52, color: 'bg-green-100 text-green-800' },
    { region: 'Musanze', customers: 32, satisfaction: 4.5, tickets: 67, color: 'bg-purple-100 text-purple-800' },
    { region: 'Rubavu', customers: 25, satisfaction: 4.4, tickets: 43, color: 'bg-orange-100 text-orange-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Responded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Support Ticket': return 'bg-blue-100 text-blue-800';
      case 'Feedback': return 'bg-green-100 text-green-800';
      case 'Survey': return 'bg-purple-100 text-purple-800';
      case 'Quality Issue': return 'bg-orange-100 text-orange-800';
      case 'Customer Call': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* CX Statistics */}
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

      {/* CX Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common customer experience tasks"
        color="blue"
        icon="😊"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create ticket')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Send survey')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Survey
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Quality audit')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Quality Audit
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* CX by Region */}
      <AnimatedCard
        title="Customer Experience by Region"
        subtitle="Performance by geographic area"
        color="green"
        icon="🌍"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cxRegions.map((region, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${region.color}`}>
                {region.region}
              </div>
              <div className="text-2xl font-bold text-gray-900">{region.customers}</div>
              <div className="text-xs text-gray-500">{region.satisfaction}/5 satisfaction • {region.tickets} tickets</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Customers */}
      <AnimatedCard
        title="Top Customers"
        subtitle="Highest satisfaction customers"
        color="orange"
        icon="🏆"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.region}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.contact}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getRatingStars(customer.satisfaction)}</div>
                    <div className="text-xs text-gray-500">{customer.satisfaction}/5</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.tickets}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.lastContact}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Activities */}
      <AnimatedCard
        title="Recent Activities"
        subtitle="Latest customer experience activities"
        color="green"
        icon="📋"
        delay={1000}
      >
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(activity.type)}`}>
                    {activity.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{activity.description}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {activity.customer} • {activity.user} • {activity.timestamp} • {activity.status}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* CX Metrics */}
      <AnimatedCard
        title="Customer Experience Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-green-600">Customer Satisfaction</div>
            <AnimatedProgressBar progress={94.2} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3h</div>
            <div className="text-sm text-blue-600">Avg Response Time</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">234</div>
            <div className="text-sm text-purple-600">Support Tickets</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CustomerOverview;
