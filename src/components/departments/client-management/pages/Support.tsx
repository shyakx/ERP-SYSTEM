import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  Package, 
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
  Truck,
  Warehouse,
  Box,
  Tag,
  Minus,
  AlertCircle,
  Shield,
  Wifi,
  Battery,
  Signal,
  ShoppingCart,
  DollarSign,
  FileText,
  Wrench,
  Cog,
  Building,
  PackageCheck,
  CheckSquare,
  XCircle,
  TrendingDown,
  PieChart,
  Users,
  Phone,
  Mail,
  Star,
  Award,
  Database,
  Filter as FilterIcon,
  FileText as FileTextIcon,
  Clock as ClockIcon,
  AlertCircle as AlertCircleIcon,
  MessageSquare,
  Headphones,
  HelpCircle
} from 'lucide-react';

const Support: React.FC = () => {
  const colorScheme = getColorScheme('client-management');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const supportStats = [
    { title: 'Total Tickets', value: '89', subtitle: 'This month', color: 'blue', icon: '🎫', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'Resolved', value: '76', subtitle: 'Successfully closed', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'Pending', value: '13', subtitle: 'Awaiting response', color: 'orange', icon: '⏳', trend: { value: '+4', isPositive: false }, delay: 200 },
    { title: 'Avg Response', value: '2.3h', subtitle: 'Response time', color: 'purple', icon: '⏱️', trend: { value: '-0.5h', isPositive: true }, delay: 300 }
  ];

  const supportTickets = [
    {
      id: 1,
      ticketNumber: 'TKT-2024-001',
      client: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      issue: 'CCTV System Malfunction',
      priority: 'High',
      status: 'In Progress',
      assignedTo: 'Technical Team',
      createdAt: '2024-01-15 14:30',
      lastUpdated: '2024-01-15 16:45',
      category: 'Technical'
    },
    {
      id: 2,
      ticketNumber: 'TKT-2024-002',
      client: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      issue: 'Guard Schedule Request',
      priority: 'Medium',
      status: 'Resolved',
      assignedTo: 'Operations Team',
      createdAt: '2024-01-15 13:45',
      lastUpdated: '2024-01-15 15:20',
      category: 'Operations'
    },
    {
      id: 3,
      ticketNumber: 'TKT-2024-003',
      client: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      issue: 'Access Control Setup',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'Installation Team',
      createdAt: '2024-01-15 12:20',
      lastUpdated: '2024-01-15 12:20',
      category: 'Installation'
    },
    {
      id: 4,
      ticketNumber: 'TKT-2024-004',
      client: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      issue: 'Security Equipment Maintenance',
      priority: 'Low',
      status: 'Scheduled',
      assignedTo: 'Maintenance Team',
      createdAt: '2024-01-15 11:15',
      lastUpdated: '2024-01-15 11:30',
      category: 'Maintenance'
    },
    {
      id: 5,
      ticketNumber: 'TKT-2024-005',
      client: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      issue: 'Billing Inquiry',
      priority: 'Medium',
      status: 'Resolved',
      assignedTo: 'Billing Team',
      createdAt: '2024-01-15 10:30',
      lastUpdated: '2024-01-15 11:45',
      category: 'Billing'
    }
  ];

  const supportCategories = [
    { category: 'Technical', count: 25, avgResponse: '1.8h', color: 'bg-blue-100 text-blue-800' },
    { category: 'Operations', count: 18, avgResponse: '2.1h', color: 'bg-green-100 text-green-800' },
    { category: 'Installation', count: 12, avgResponse: '3.2h', color: 'bg-purple-100 text-purple-800' },
    { category: 'Maintenance', count: 15, avgResponse: '2.5h', color: 'bg-orange-100 text-orange-800' },
    { category: 'Billing', count: 10, avgResponse: '1.5h', color: 'bg-yellow-100 text-yellow-800' },
    { category: 'General', count: 9, avgResponse: '2.8h', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Support Statistics */}
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

      {/* Support Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common support tasks"
        color="blue"
        icon="🎧"
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
            onClick={() => console.log('Assign ticket')}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Ticket
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Update status')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Status
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Support Categories */}
      <AnimatedCard
        title="Support Categories"
        subtitle="Distribution by issue type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {supportCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">Avg: {category.avgResponse}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Support Tickets */}
      <AnimatedCard
        title="Support Tickets"
        subtitle="All active support requests"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
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
                    <div className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</div>
                    <div className="text-xs text-gray-500">{ticket.category}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.client}</div>
                    <div className="text-xs text-gray-500">{ticket.contact}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.issue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(ticket.priority)}`}>
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
                    <div className="text-xs text-gray-500">Updated: {ticket.lastUpdated}</div>
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
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Support Metrics */}
      <AnimatedCard
        title="Support Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">85.4%</div>
            <div className="text-sm text-green-600">Resolution Rate</div>
            <AnimatedProgressBar progress={85.4} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3h</div>
            <div className="text-sm text-blue-600">Avg Response Time</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-purple-600">Total Tickets</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Support;
