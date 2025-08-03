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

const SatisfactionSurveys: React.FC = () => {
  const colorScheme = getColorScheme('customer-experience');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const surveyStats = [
    { title: 'Total Surveys', value: '89', subtitle: 'Active surveys', color: 'blue', icon: '📝', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'Response Rate', value: '78.5%', subtitle: 'Survey responses', color: 'green', icon: '📊', trend: { value: '+5.2%', isPositive: true }, delay: 100 },
    { title: 'Avg Satisfaction', value: '4.4/5', subtitle: 'Average score', color: 'orange', icon: '😊', trend: { value: '+0.3', isPositive: true }, delay: 200 },
    { title: 'Completion Rate', value: '92.3%', subtitle: 'Completed surveys', color: 'purple', icon: '✅', trend: { value: '+2.1%', isPositive: true }, delay: 300 }
  ];

  const surveys = [
    {
      id: 1,
      title: 'Security Service Satisfaction Survey',
      customer: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      email: 'jean.pierre@kbc.rw',
      type: 'Post-Service',
      status: 'Completed',
      responses: 45,
      avgRating: 4.6,
      completionRate: 95.2,
      createdAt: '2024-01-15',
      endDate: '2024-01-22',
      questions: 12,
      createdBy: 'Marie Claire Niyonsaba'
    },
    {
      id: 2,
      title: 'Training Session Feedback',
      customer: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      email: 'marie.claire@musanzehotel.rw',
      type: 'Training',
      status: 'Active',
      responses: 28,
      avgRating: 4.8,
      completionRate: 88.9,
      createdAt: '2024-01-14',
      endDate: '2024-01-21',
      questions: 8,
      createdBy: 'Patrick Nshimiyimana'
    },
    {
      id: 3,
      title: 'Maintenance Service Evaluation',
      customer: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      email: 'patrick.n@huyeuni.rw',
      type: 'Maintenance',
      status: 'Completed',
      responses: 32,
      avgRating: 4.2,
      completionRate: 91.4,
      createdAt: '2024-01-13',
      endDate: '2024-01-20',
      questions: 10,
      createdBy: 'Emmanuel Ndayisaba'
    },
    {
      id: 4,
      title: 'Installation Quality Assessment',
      customer: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      email: 'emmanuel@rubavumfg.rw',
      type: 'Installation',
      status: 'Active',
      responses: 18,
      avgRating: 4.5,
      completionRate: 85.7,
      createdAt: '2024-01-15',
      endDate: '2024-01-22',
      questions: 15,
      createdBy: 'Alexis Nkurunziza'
    },
    {
      id: 5,
      title: 'Customer Support Experience',
      customer: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      email: 'alexis@kigalimall.rw',
      type: 'Support',
      status: 'Scheduled',
      responses: 0,
      avgRating: 0,
      completionRate: 0,
      createdAt: '2024-01-16',
      endDate: '2024-01-23',
      questions: 6,
      createdBy: 'Dr. Sarah Uwamahoro'
    }
  ];

  const surveyTypes = [
    { type: 'Post-Service', count: 25, avgRating: 4.6, color: 'bg-blue-100 text-blue-800' },
    { type: 'Training', count: 18, avgRating: 4.8, color: 'bg-green-100 text-green-800' },
    { type: 'Maintenance', count: 15, avgRating: 4.2, color: 'bg-purple-100 text-purple-800' },
    { type: 'Installation', count: 12, avgRating: 4.5, color: 'bg-orange-100 text-orange-800' },
    { type: 'Support', count: 10, avgRating: 4.3, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'General', count: 9, avgRating: 4.4, color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    const typeData = surveyTypes.find(t => t.type === type);
    return typeData ? typeData.color : 'bg-gray-100 text-gray-800';
  };

  const getRatingStars = (rating: number) => {
    if (rating === 0) return 'No ratings yet';
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Survey Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {surveyStats.map((stat, index) => (
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

      {/* Survey Actions */}
      <AnimatedCard
        title="Survey Management"
        subtitle="Customer satisfaction survey operations"
        color="blue"
        icon="📝"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create survey')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Survey
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
            onClick={() => console.log('View results')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Results
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

      {/* Search and Filter */}
      <AnimatedCard
        title="Search & Filter"
        subtitle="Find specific surveys"
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
                placeholder="Search surveys by title, customer, or contact..."
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Survey Types */}
      <AnimatedCard
        title="Survey Types"
        subtitle="Distribution by survey category"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {surveyTypes.map((type, index) => (
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

      {/* Surveys Table */}
      <AnimatedCard
        title="Satisfaction Surveys"
        subtitle="All customer satisfaction surveys"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSurveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{survey.title}</div>
                    <div className="text-xs text-gray-500">{survey.questions} questions</div>
                    <div className="text-xs text-gray-500">Created by: {survey.createdBy}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{survey.customer}</div>
                    <div className="text-xs text-gray-500">{survey.contact}</div>
                    <div className="text-xs text-gray-500">{survey.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(survey.type)}`}>
                      {survey.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(survey.status)}`}>
                      {survey.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{survey.responses}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getRatingStars(survey.avgRating)}</div>
                    <div className="text-xs text-gray-500">{survey.avgRating}/5</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{survey.completionRate}%</div>
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
                        <BarChart3 className="w-4 h-4" />
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

      {/* Survey Metrics */}
      <AnimatedCard
        title="Survey Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4.4/5</div>
            <div className="text-sm text-green-600">Avg Satisfaction</div>
            <AnimatedProgressBar progress={88} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">78.5%</div>
            <div className="text-sm text-blue-600">Response Rate</div>
            <AnimatedProgressBar progress={78.5} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-purple-600">Total Surveys</div>
            <AnimatedProgressBar progress={85} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SatisfactionSurveys; 