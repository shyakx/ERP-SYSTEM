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

const CustomerSupport: React.FC = () => {
  const colorScheme = getColorScheme('customer-experience');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const supportStats = [
    { title: 'Total Tickets', value: '234', subtitle: 'Active tickets', color: 'blue', icon: '🎫', trend: { value: '+18', isPositive: true }, delay: 0 },
    { title: 'Resolved', value: '189', subtitle: 'Closed tickets', color: 'green', icon: '✅', trend: { value: '+12', isPositive: true }, delay: 100 },
    { title: 'Avg Response Time', value: '2.3h', subtitle: 'Response time', color: 'orange', icon: '⏱️', trend: { value: '-0.5h', isPositive: true }, delay: 200 },
    { title: 'Satisfaction Rate', value: '94.2%', subtitle: 'Customer satisfaction', color: 'purple', icon: '😊', trend: { value: '+2.1%', isPositive: true }, delay: 300 }
  ];

  const supportTickets = [
    {
      id: 1,
      title: 'Security System Installation Issue',
      customer: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      email: 'jean.pierre@kbc.rw',
      phone: '+250 788 123 456',
      priority: 'High',
      status: 'In Progress',
      category: 'Technical Support',
      assignedTo: 'Marie Claire Niyonsaba',
      createdAt: '2024-01-15 09:30',
      lastUpdated: '2024-01-15 14:45',
      description: 'Security cameras not connecting to main system'
    },
    {
      id: 2,
      title: 'Access Card Programming',
      customer: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      email: 'marie.claire@musanzehotel.rw',
      phone: '+250 789 234 567',
      priority: 'Medium',
      status: 'Resolved',
      category: 'Access Control',
      assignedTo: 'Patrick Nshimiyimana',
      createdAt: '2024-01-14 11:20',
      lastUpdated: '2024-01-15 10:15',
      description: 'Need to program new access cards for staff'
    },
    {
      id: 3,
      title: 'Alarm System Maintenance',
      customer: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      email: 'patrick.n@huyeuni.rw',
      phone: '+250 787 345 678',
      priority: 'Low',
      status: 'Open',
      category: 'Maintenance',
      assignedTo: 'Emmanuel Ndayisaba',
      createdAt: '2024-01-15 13:45',
      lastUpdated: '2024-01-15 13:45',
      description: 'Scheduled maintenance for alarm system'
    },
    {
      id: 4,
      title: 'CCTV Camera Replacement',
      customer: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      email: 'emmanuel@rubavumfg.rw',
      phone: '+250 786 456 789',
      priority: 'High',
      status: 'Pending',
      category: 'Hardware',
      assignedTo: 'Alexis Nkurunziza',
      createdAt: '2024-01-15 08:15',
      lastUpdated: '2024-01-15 12:30',
      description: 'Camera malfunctioning in warehouse area'
    },
    {
      id: 5,
      title: 'Security Training Request',
      customer: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      email: 'alexis@kigalimall.rw',
      phone: '+250 785 567 890',
      priority: 'Medium',
      status: 'Resolved',
      category: 'Training',
      assignedTo: 'Dr. Sarah Uwamahoro',
      createdAt: '2024-01-13 16:20',
      lastUpdated: '2024-01-15 09:45',
      description: 'Security staff training session completed'
    }
  ];

  const ticketCategories = [
    { category: 'Technical Support', count: 45, avgResolution: '3.2h', color: 'bg-blue-100 text-blue-800' },
    { category: 'Access Control', count: 32, avgResolution: '2.1h', color: 'bg-green-100 text-green-800' },
    { category: 'Hardware', count: 28, avgResolution: '4.5h', color: 'bg-purple-100 text-purple-800' },
    { category: 'Maintenance', count: 25, avgResolution: '1.8h', color: 'bg-orange-100 text-orange-800' },
    { category: 'Training', count: 18, avgResolution: '2.5h', color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Billing', count: 12, avgResolution: '1.2h', color: 'bg-red-100 text-red-800' }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryData = ticketCategories.find(c => c.category === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  const filteredTickets = supportTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        title="Support Management"
        subtitle="Customer support operations"
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

      {/* Search and Filter */}
      <AnimatedCard
        title="Search & Filter"
        subtitle="Find specific tickets"
        color="green"
        icon="🔍"
        delay={600}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tickets by title, customer, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="pending">Pending</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Ticket Categories */}
      <AnimatedCard
        title="Ticket Categories"
        subtitle="Distribution by category"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {ticketCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">Avg: {category.avgResolution}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Support Tickets Table */}
      <AnimatedCard
        title="Support Tickets"
        subtitle="All active support tickets"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                    <div className="text-xs text-gray-500">{ticket.description}</div>
                    <div className="text-xs text-gray-500">{ticket.contact} • {ticket.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.customer}</div>
                    <div className="text-xs text-gray-500">{ticket.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(ticket.category)}`}>
                      {ticket.category}
                    </span>
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
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Calendar className="w-4 h-4" />
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
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-green-600">Satisfaction Rate</div>
            <AnimatedProgressBar progress={94.2} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3h</div>
            <div className="text-sm text-blue-600">Avg Response Time</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">234</div>
            <div className="text-sm text-purple-600">Total Tickets</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CustomerSupport; 