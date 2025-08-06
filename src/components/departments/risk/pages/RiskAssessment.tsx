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

const RiskAssessment: React.FC = () => {
  const colorScheme = getColorScheme('risk');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assessmentStats = [
    { title: 'Total Assessments', value: '34', subtitle: 'Completed assessments', color: 'blue', icon: '📋', trend: { value: '+6', isPositive: true }, delay: 0 },
    { title: 'In Progress', value: '8', subtitle: 'Active assessments', color: 'orange', icon: '⏳', trend: { value: '+2', isPositive: true }, delay: 100 },
    { title: 'High Risk Found', value: '12', subtitle: 'Critical findings', color: 'red', icon: '🚨', trend: { value: '+3', isPositive: false }, delay: 200 },
    { title: 'Avg Score', value: '6.8/10', subtitle: 'Average risk score', color: 'yellow', icon: '📊', trend: { value: '-0.2', isPositive: true }, delay: 300 }
  ];

  const assessments = [
    {
      id: 1,
      title: 'Cybersecurity Risk Assessment',
      category: 'Cybersecurity',
      status: 'Completed',
      priority: 'Critical',
      assessor: 'Marie Claire Niyonsaba',
      startDate: '2024-01-15',
      completionDate: '2024-01-15',
      riskScore: 8.5,
      findings: 15,
      recommendations: 12,
      location: 'Kigali HQ',
      description: 'Comprehensive cybersecurity risk assessment covering network infrastructure, access controls, and data protection'
    },
    {
      id: 2,
      title: 'Physical Security Assessment',
      category: 'Physical Security',
      status: 'In Progress',
      priority: 'High',
      assessor: 'Patrick Nshimiyimana',
      startDate: '2024-01-14',
      completionDate: '2024-01-18',
      riskScore: 7.2,
      findings: 8,
      recommendations: 6,
      location: 'Musanze Branch',
      description: 'Physical security assessment including access controls, surveillance systems, and perimeter security'
    },
    {
      id: 3,
      title: 'Financial Risk Assessment',
      category: 'Financial',
      status: 'Completed',
      priority: 'Medium',
      assessor: 'Emmanuel Ndayisaba',
      startDate: '2024-01-13',
      completionDate: '2024-01-15',
      riskScore: 6.8,
      findings: 10,
      recommendations: 8,
      location: 'Huye Office',
      description: 'Financial risk assessment covering fraud prevention, transaction monitoring, and financial controls'
    },
    {
      id: 4,
      title: 'Operational Risk Assessment',
      category: 'Operational',
      status: 'Scheduled',
      priority: 'Medium',
      assessor: 'Alexis Nkurunziza',
      startDate: '2024-01-20',
      completionDate: '2024-01-25',
      riskScore: 0,
      findings: 0,
      recommendations: 0,
      location: 'Rubavu Facility',
      description: 'Operational risk assessment covering business continuity, process efficiency, and resource management'
    },
    {
      id: 5,
      title: 'Compliance Risk Assessment',
      category: 'Compliance',
      status: 'Completed',
      priority: 'High',
      assessor: 'Dr. Sarah Uwamahoro',
      startDate: '2024-01-12',
      completionDate: '2024-01-14',
      riskScore: 7.0,
      findings: 12,
      recommendations: 10,
      location: 'Kigali HQ',
      description: 'Compliance risk assessment covering regulatory requirements, policy adherence, and audit readiness'
    }
  ];

  const assessmentCategories = [
    { category: 'Cybersecurity', count: 8, avgScore: 7.8, color: 'bg-red-100 text-red-800' },
    { category: 'Physical Security', count: 6, avgScore: 6.5, color: 'bg-orange-100 text-orange-800' },
    { category: 'Financial', count: 5, avgScore: 6.2, color: 'bg-green-100 text-green-800' },
    { category: 'Operational', count: 4, avgScore: 5.8, color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Compliance', count: 3, avgScore: 7.0, color: 'bg-purple-100 text-purple-800' },
    { category: 'Environmental', count: 2, avgScore: 4.5, color: 'bg-blue-100 text-blue-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryData = assessmentCategories.find(c => c.category === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  const getRiskScoreColor = (score: number) => {
    if (score === 0) return 'text-gray-600';
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-orange-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredAssessments = assessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Assessment Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assessmentStats.map((stat, index) => (
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

      {/* Assessment Actions */}
      <AnimatedCard
        title="Assessment Management"
        subtitle="Risk assessment operations"
        color="red"
        icon="📋"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Create assessment')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Assessment
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Schedule assessment')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Assessment
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log('Assign assessor')}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Assessor
          </AnimatedButton>
          <AnimatedButton
            color="green"
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
        subtitle="Find specific assessments"
        color="orange"
        icon="🔍"
        delay={600}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assessments by title, category, or assessor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="on-hold">On Hold</option>
            </select>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Assessment Categories */}
      <AnimatedCard
        title="Assessment Categories"
        subtitle="Distribution by assessment type"
        color="orange"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {assessmentCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">Avg Score: {category.avgScore}/10</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Assessments Table */}
      <AnimatedCard
        title="Risk Assessments"
        subtitle="All risk assessment activities"
        color="red"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssessments.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                    <div className="text-xs text-gray-500">{assessment.description}</div>
                    <div className="text-xs text-gray-500">{assessment.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(assessment.category)}`}>
                      {assessment.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(assessment.status)}`}>
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(assessment.priority)}`}>
                      {assessment.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRiskScoreColor(assessment.riskScore)}`}>
                      {assessment.riskScore === 0 ? 'Pending' : `${assessment.riskScore}/10`}
                    </div>
                    {assessment.riskScore > 0 && (
                      <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-red-600 h-1 rounded-full"
                          style={{ width: `${assessment.riskScore * 10}%` }}
                        ></div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{assessment.findings} findings</div>
                    <div className="text-xs text-gray-500">{assessment.recommendations} recommendations</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{assessment.assessor}</div>
                    <div className="text-xs text-gray-500">{assessment.startDate} - {assessment.completionDate}</div>
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
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Assessment Metrics */}
      <AnimatedCard
        title="Assessment Metrics"
        subtitle="Key performance indicators"
        color="red"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">6.8/10</div>
            <div className="text-sm text-red-600">Average Risk Score</div>
            <AnimatedProgressBar progress={68} color="red" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">34</div>
            <div className="text-sm text-orange-600">Total Assessments</div>
            <AnimatedProgressBar progress={85} color="orange" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-green-600">High Risk Found</div>
            <AnimatedProgressBar progress={92} color="green" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default RiskAssessment;
