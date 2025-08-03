import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
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
  BookOpen,
  Users,
  Lock,
  BarChart3,
  Target,
  Zap,
  Globe,
  Scale
} from 'lucide-react';

const RegulatoryCompliance: React.FC = () => {
  const colorScheme = getColorScheme('compliance');
  const [selectedRegulation, setSelectedRegulation] = useState('all');

  const complianceStats = [
    { title: 'Total Regulations', value: '28', subtitle: 'Active regulations', color: 'blue', icon: '📋', trend: { value: '+1', isPositive: true }, delay: 0 },
    { title: 'Compliant', value: '24', subtitle: 'Fully compliant', color: 'green', icon: '✅', trend: { value: '+2', isPositive: true }, delay: 100 },
    { title: 'At Risk', value: '3', subtitle: 'Non-compliant', color: 'red', icon: '⚠️', trend: { value: '-1', isPositive: true }, delay: 200 },
    { title: 'Compliance Rate', value: '96%', subtitle: 'Overall score', color: 'purple', icon: '📊', trend: { value: '+1%', isPositive: true }, delay: 300 }
  ];

  const regulations = [
    {
      id: 1,
      title: 'Data Protection Law (Rwanda)',
      category: 'Data Privacy',
      status: 'Compliant',
      complianceScore: 98,
      lastReview: '2024-01-10',
      nextReview: '2024-04-10',
      responsible: 'Jean Pierre Uwimana',
      description: 'Personal data protection and privacy regulations',
      requirements: 15,
      implemented: 15,
      riskLevel: 'Low'
    },
    {
      id: 2,
      title: 'Financial Services Regulations',
      category: 'Finance',
      status: 'At Risk',
      complianceScore: 75,
      lastReview: '2024-01-05',
      nextReview: '2024-02-05',
      responsible: 'Marie Claire Niyonsaba',
      description: 'Financial reporting and service standards',
      requirements: 22,
      implemented: 16,
      riskLevel: 'High'
    },
    {
      id: 3,
      title: 'Workplace Safety Standards',
      category: 'Safety',
      status: 'Compliant',
      complianceScore: 95,
      lastReview: '2024-01-08',
      nextReview: '2024-07-08',
      responsible: 'Patrick Nshimiyimana',
      description: 'Occupational health and safety regulations',
      requirements: 18,
      implemented: 17,
      riskLevel: 'Medium'
    },
    {
      id: 4,
      title: 'Anti-Money Laundering (AML)',
      category: 'Finance',
      status: 'Compliant',
      complianceScore: 92,
      lastReview: '2024-01-12',
      nextReview: '2024-04-12',
      responsible: 'Emmanuel Ndayisaba',
      description: 'Anti-money laundering and counter-terrorism financing',
      requirements: 25,
      implemented: 23,
      riskLevel: 'Medium'
    },
    {
      id: 5,
      title: 'Environmental Protection Laws',
      category: 'Environment',
      status: 'At Risk',
      complianceScore: 68,
      lastReview: '2024-01-03',
      nextReview: '2024-03-03',
      responsible: 'Alexis Nkurunziza',
      description: 'Environmental protection and sustainability regulations',
      requirements: 12,
      implemented: 8,
      riskLevel: 'High'
    }
  ];

  const regulationCategories = [
    { category: 'Data Privacy', count: 6, color: 'bg-blue-100 text-blue-800' },
    { category: 'Finance', count: 8, color: 'bg-green-100 text-green-800' },
    { category: 'Safety', count: 5, color: 'bg-orange-100 text-orange-800' },
    { category: 'Environment', count: 3, color: 'bg-purple-100 text-purple-800' },
    { category: 'Labor', count: 4, color: 'bg-pink-100 text-pink-800' },
    { category: 'Tax', count: 2, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const upcomingReviews = [
    {
      id: 1,
      regulation: 'Financial Services Regulations',
      dueDate: '2024-02-05',
      responsible: 'Marie Claire Niyonsaba',
      priority: 'High'
    },
    {
      id: 2,
      regulation: 'Environmental Protection Laws',
      dueDate: '2024-03-03',
      responsible: 'Alexis Nkurunziza',
      priority: 'High'
    },
    {
      id: 3,
      regulation: 'Data Protection Law (Rwanda)',
      dueDate: '2024-04-10',
      responsible: 'Jean Pierre Uwimana',
      priority: 'Medium'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'At Risk': return 'bg-red-100 text-red-800';
      case 'Non-Compliant': return 'bg-orange-100 text-orange-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceStats.map((stat, index) => (
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

      {/* Regulatory Compliance Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common regulatory compliance tasks"
        color="blue"
        icon="📋"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add regulation')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Regulation
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Run assessment')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Run Assessment
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <Target className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Regulation Categories */}
      <AnimatedCard
        title="Regulation Categories"
        subtitle="Distribution of regulations by category"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regulationCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">regulations</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Regulations Table */}
      <AnimatedCard
        title="Regulatory Compliance"
        subtitle="Current regulations and compliance status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirements</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regulations.map((regulation) => (
                <tr key={regulation.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{regulation.title}</div>
                      <div className="text-xs text-gray-500">{regulation.description}</div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <User className="w-3 h-3 mr-1" />
                        {regulation.responsible}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {regulation.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(regulation.status)}`}>
                      {regulation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${regulation.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{regulation.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{regulation.implemented}/{regulation.requirements}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((regulation.implemented / regulation.requirements) * 100)}% complete
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelBadge(regulation.riskLevel)}`}>
                      {regulation.riskLevel}
                    </span>
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
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Upcoming Reviews */}
      <AnimatedCard
        title="Upcoming Regulatory Reviews"
        subtitle="Scheduled compliance reviews"
        color="red"
        icon="⏰"
        delay={1000}
      >
        <div className="space-y-3">
          {upcomingReviews.map((review) => (
            <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{review.regulation}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(review.priority)}`}>
                    {review.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Due: {review.dueDate} • Responsible: {review.responsible}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Review</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Compliance Metrics */}
      <AnimatedCard
        title="Regulatory Compliance Metrics"
        subtitle="Overall compliance performance"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">96%</div>
            <div className="text-sm text-green-600">Overall Compliance</div>
            <AnimatedProgressBar progress={96} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">28</div>
            <div className="text-sm text-blue-600">Total Regulations</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-purple-600">At Risk</div>
            <AnimatedProgressBar progress={10} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default RegulatoryCompliance;
