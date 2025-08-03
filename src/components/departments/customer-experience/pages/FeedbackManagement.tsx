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

const FeedbackManagement: React.FC = () => {
  const colorScheme = getColorScheme('customer-experience');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const feedbackStats = [
    { title: 'Total Feedback', value: '156', subtitle: 'All feedback', color: 'blue', icon: '💭', trend: { value: '+23', isPositive: true }, delay: 0 },
    { title: 'Positive', value: '134', subtitle: 'Positive feedback', color: 'green', icon: '😊', trend: { value: '+18', isPositive: true }, delay: 100 },
    { title: 'Response Rate', value: '98.5%', subtitle: 'Feedback responded', color: 'orange', icon: '📝', trend: { value: '+1.2%', isPositive: true }, delay: 200 },
    { title: 'Avg Rating', value: '4.6/5', subtitle: 'Average rating', color: 'purple', icon: '⭐', trend: { value: '+0.2', isPositive: true }, delay: 300 }
  ];

  const feedbackItems = [
    {
      id: 1,
      customer: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      email: 'jean.pierre@kbc.rw',
      type: 'Service Quality',
      rating: 5,
      status: 'Responded',
      priority: 'High',
      feedback: 'Excellent security system installation. The team was professional and completed the work on time. Very satisfied with the service quality.',
      response: 'Thank you for your positive feedback! We appreciate your business and look forward to serving you again.',
      createdAt: '2024-01-15 14:30',
      respondedAt: '2024-01-15 16:45',
      assignedTo: 'Marie Claire Niyonsaba'
    },
    {
      id: 2,
      customer: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      email: 'marie.claire@musanzehotel.rw',
      type: 'Technical Support',
      rating: 4,
      status: 'Pending',
      priority: 'Medium',
      feedback: 'Good technical support but response time could be improved. The solution provided was effective.',
      response: '',
      createdAt: '2024-01-15 11:20',
      respondedAt: '',
      assignedTo: 'Patrick Nshimiyimana'
    },
    {
      id: 3,
      customer: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      email: 'patrick.n@huyeuni.rw',
      type: 'Training',
      rating: 5,
      status: 'Responded',
      priority: 'Low',
      feedback: 'Outstanding training session for our security staff. The instructor was knowledgeable and engaging.',
      response: 'We are glad the training was helpful! Your security team showed great engagement during the session.',
      createdAt: '2024-01-14 16:15',
      respondedAt: '2024-01-15 09:30',
      assignedTo: 'Emmanuel Ndayisaba'
    },
    {
      id: 4,
      customer: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      email: 'emmanuel@rubavumfg.rw',
      type: 'Maintenance',
      rating: 3,
      status: 'Open',
      priority: 'High',
      feedback: 'Maintenance service was adequate but there were some delays in scheduling. The work quality was good.',
      response: '',
      createdAt: '2024-01-15 13:45',
      respondedAt: '',
      assignedTo: 'Alexis Nkurunziza'
    },
    {
      id: 5,
      customer: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      email: 'alexis@kigalimall.rw',
      type: 'Billing',
      rating: 4,
      status: 'Responded',
      priority: 'Medium',
      feedback: 'Clear billing process and good communication. Would appreciate more payment options.',
      response: 'Thank you for your feedback! We are working on adding more payment options for your convenience.',
      createdAt: '2024-01-14 10:30',
      respondedAt: '2024-01-15 14:20',
      assignedTo: 'Dr. Sarah Uwamahoro'
    }
  ];

  const feedbackTypes = [
    { type: 'Service Quality', count: 45, avgRating: 4.8, color: 'bg-blue-100 text-blue-800' },
    { type: 'Technical Support', count: 32, avgRating: 4.5, color: 'bg-green-100 text-green-800' },
    { type: 'Training', count: 28, avgRating: 4.9, color: 'bg-purple-100 text-purple-800' },
    { type: 'Maintenance', count: 25, avgRating: 4.2, color: 'bg-orange-100 text-orange-800' },
    { type: 'Billing', count: 18, avgRating: 4.6, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Installation', count: 8, avgRating: 4.7, color: 'bg-red-100 text-red-800' }
  ];

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Responded': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    const typeData = feedbackTypes.find(t => t.type === type);
    return typeData ? typeData.color : 'bg-gray-100 text-gray-800';
  };

  const filteredFeedback = feedbackItems.filter(item =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {feedbackStats.map((stat, index) => (
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

      {/* Feedback Actions */}
      <AnimatedCard
        title="Feedback Management"
        subtitle="Customer feedback operations"
        color="blue"
        icon="💭"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create feedback')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Feedback
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Respond to feedback')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Respond
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Assign feedback')}
          >
            <User className="w-4 h-4 mr-2" />
            Assign
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
        subtitle="Find specific feedback"
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
                placeholder="Search feedback by customer, contact, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="service-quality">Service Quality</option>
              <option value="technical-support">Technical Support</option>
              <option value="training">Training</option>
              <option value="maintenance">Maintenance</option>
              <option value="billing">Billing</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Feedback Types */}
      <AnimatedCard
        title="Feedback Types"
        subtitle="Distribution by feedback category"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {feedbackTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">Avg: {type.avgRating}/5</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Feedback Table */}
      <AnimatedCard
        title="Customer Feedback"
        subtitle="All customer feedback items"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeedback.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.customer}</div>
                    <div className="text-xs text-gray-500">{item.contact}</div>
                    <div className="text-xs text-gray-500">{item.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getRatingStars(item.rating)}</div>
                    <div className="text-xs text-gray-500">{item.rating}/5</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.createdAt}</div>
                    {item.respondedAt && (
                      <div className="text-xs text-gray-500">Responded: {item.respondedAt}</div>
                    )}
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
                        <Mail className="w-4 h-4" />
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

      {/* Feedback Metrics */}
      <AnimatedCard
        title="Feedback Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4.6/5</div>
            <div className="text-sm text-green-600">Average Rating</div>
            <AnimatedProgressBar progress={92} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">98.5%</div>
            <div className="text-sm text-blue-600">Response Rate</div>
            <AnimatedProgressBar progress={98.5} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-purple-600">Total Feedback</div>
            <AnimatedProgressBar progress={85} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default FeedbackManagement; 