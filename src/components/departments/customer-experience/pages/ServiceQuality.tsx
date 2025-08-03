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

const ServiceQuality: React.FC = () => {
  const colorScheme = getColorScheme('customer-experience');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const qualityStats = [
    { title: 'Overall Quality Score', value: '4.6/5', subtitle: 'Average rating', color: 'blue', icon: '⭐', trend: { value: '+0.2', isPositive: true }, delay: 0 },
    { title: 'Response Time', value: '2.3h', subtitle: 'Average response', color: 'green', icon: '⏱️', trend: { value: '-0.5h', isPositive: true }, delay: 100 },
    { title: 'Resolution Rate', value: '96.8%', subtitle: 'Issues resolved', color: 'orange', icon: '✅', trend: { value: '+1.2%', isPositive: true }, delay: 200 },
    { title: 'Customer Satisfaction', value: '94.2%', subtitle: 'Satisfied customers', color: 'purple', icon: '😊', trend: { value: '+2.1%', isPositive: true }, delay: 300 }
  ];

  const qualityMetrics = [
    {
      id: 1,
      category: 'Technical Support',
      metric: 'Response Time',
      currentValue: '2.1h',
      targetValue: '2.0h',
      status: 'On Track',
      score: 95,
      trend: '+0.2h',
      description: 'Average time to respond to technical support requests'
    },
    {
      id: 2,
      category: 'Installation',
      metric: 'Completion Rate',
      currentValue: '98.5%',
      targetValue: '95.0%',
      status: 'Exceeding',
      score: 98,
      trend: '+1.2%',
      description: 'Percentage of installations completed successfully'
    },
    {
      id: 3,
      category: 'Training',
      metric: 'Participant Satisfaction',
      currentValue: '4.8/5',
      targetValue: '4.5/5',
      status: 'Exceeding',
      score: 96,
      trend: '+0.3',
      description: 'Average satisfaction rating from training participants'
    },
    {
      id: 4,
      category: 'Maintenance',
      metric: 'Preventive Maintenance',
      currentValue: '92.3%',
      targetValue: '90.0%',
      status: 'On Track',
      score: 93,
      trend: '+2.1%',
      description: 'Percentage of scheduled maintenance completed on time'
    },
    {
      id: 5,
      category: 'Customer Service',
      metric: 'First Call Resolution',
      currentValue: '88.7%',
      targetValue: '85.0%',
      status: 'On Track',
      score: 89,
      trend: '+1.8%',
      description: 'Percentage of issues resolved on first contact'
    }
  ];

  const qualityCategories = [
    { category: 'Technical Support', count: 45, avgScore: 95, color: 'bg-blue-100 text-blue-800' },
    { category: 'Installation', count: 32, avgScore: 98, color: 'bg-green-100 text-green-800' },
    { category: 'Training', count: 28, avgScore: 96, color: 'bg-purple-100 text-purple-800' },
    { category: 'Maintenance', count: 25, avgScore: 93, color: 'bg-orange-100 text-orange-800' },
    { category: 'Customer Service', count: 18, avgScore: 89, color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Billing', count: 12, avgScore: 91, color: 'bg-red-100 text-red-800' }
  ];

  const qualityIssues = [
    {
      id: 1,
      issue: 'Slow response time for non-critical requests',
      category: 'Technical Support',
      severity: 'Medium',
      status: 'In Progress',
      assignedTo: 'Marie Claire Niyonsaba',
      reportedDate: '2024-01-15',
      targetResolution: '2024-01-22',
      description: 'Customers experiencing delays in response for non-critical technical issues'
    },
    {
      id: 2,
      issue: 'Training materials need updating',
      category: 'Training',
      severity: 'Low',
      status: 'Planned',
      assignedTo: 'Patrick Nshimiyimana',
      reportedDate: '2024-01-14',
      targetResolution: '2024-02-01',
      description: 'Training materials are outdated and need revision'
    },
    {
      id: 3,
      issue: 'Maintenance scheduling conflicts',
      category: 'Maintenance',
      severity: 'High',
      status: 'Resolved',
      assignedTo: 'Emmanuel Ndayisaba',
      reportedDate: '2024-01-13',
      targetResolution: '2024-01-20',
      description: 'Multiple maintenance requests conflicting with customer schedules'
    },
    {
      id: 4,
      issue: 'Billing system integration delays',
      category: 'Billing',
      severity: 'Medium',
      status: 'In Progress',
      assignedTo: 'Alexis Nkurunziza',
      reportedDate: '2024-01-12',
      targetResolution: '2024-01-25',
      description: 'Integration issues causing delays in billing processing'
    },
    {
      id: 5,
      issue: 'Installation quality standards review',
      category: 'Installation',
      severity: 'Low',
      status: 'Planned',
      assignedTo: 'Dr. Sarah Uwamahoro',
      reportedDate: '2024-01-11',
      targetResolution: '2024-01-30',
      description: 'Review and update installation quality standards'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Exceeding': return 'bg-blue-100 text-blue-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Below Target': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Planned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryData = qualityCategories.find(c => c.category === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    if (score >= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredMetrics = qualityMetrics.filter(metric =>
    metric.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    metric.metric.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Quality Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {qualityStats.map((stat, index) => (
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

      {/* Quality Actions */}
      <AnimatedCard
        title="Quality Management"
        subtitle="Service quality operations"
        color="blue"
        icon="⭐"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add metric')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Metric
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Update standards')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Standards
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

      {/* Search and Filter */}
      <AnimatedCard
        title="Search & Filter"
        subtitle="Find specific quality metrics"
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
                placeholder="Search metrics by category or metric name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="technical-support">Technical Support</option>
              <option value="installation">Installation</option>
              <option value="training">Training</option>
              <option value="maintenance">Maintenance</option>
              <option value="customer-service">Customer Service</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Quality Categories */}
      <AnimatedCard
        title="Quality Categories"
        subtitle="Distribution by service category"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {qualityCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">Avg Score: {category.avgScore}%</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quality Metrics Table */}
      <AnimatedCard
        title="Quality Metrics"
        subtitle="All service quality metrics"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMetrics.map((metric) => (
                <tr key={metric.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(metric.category)}`}>
                      {metric.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{metric.metric}</div>
                    <div className="text-xs text-gray-500">{metric.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{metric.currentValue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{metric.targetValue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(metric.status)}`}>
                      {metric.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(metric.score)}`}>
                      {metric.score}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{metric.trend}</div>
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
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Quality Issues */}
      <AnimatedCard
        title="Quality Issues"
        subtitle="Current quality improvement initiatives"
        color="green"
        icon="🚨"
        delay={1200}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Resolution</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {qualityIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{issue.issue}</div>
                    <div className="text-xs text-gray-500">{issue.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(issue.category)}`}>
                      {issue.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{issue.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{issue.targetResolution}</div>
                    <div className="text-xs text-gray-500">Reported: {issue.reportedDate}</div>
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
                        <User className="w-4 h-4" />
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

      {/* Quality Metrics Summary */}
      <AnimatedCard
        title="Quality Metrics Summary"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">4.6/5</div>
            <div className="text-sm text-green-600">Overall Quality Score</div>
            <AnimatedProgressBar progress={92} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">96.8%</div>
            <div className="text-sm text-blue-600">Resolution Rate</div>
            <AnimatedProgressBar progress={96.8} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">94.2%</div>
            <div className="text-sm text-purple-600">Customer Satisfaction</div>
            <AnimatedProgressBar progress={94.2} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ServiceQuality; 