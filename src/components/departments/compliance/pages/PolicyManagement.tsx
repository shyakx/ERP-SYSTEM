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
  Download,
  Upload,
  Settings,
  BookOpen,
  Users,
  Lock
} from 'lucide-react';

const PolicyManagement: React.FC = () => {
  const colorScheme = getColorScheme('compliance');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const policyStats = [
    { title: 'Total Policies', value: '24', subtitle: 'Active policies', color: 'blue', icon: '📋', trend: { value: '+2', isPositive: true }, delay: 0 },
    { title: 'Under Review', value: '5', subtitle: 'Pending updates', color: 'orange', icon: '⏳', trend: { value: '-1', isPositive: true }, delay: 100 },
    { title: 'Compliance Rate', value: '96%', subtitle: 'Policy adherence', color: 'green', icon: '✅', trend: { value: '+1%', isPositive: true }, delay: 200 },
    { title: 'Last Updated', value: '2 days', subtitle: 'Most recent', color: 'purple', icon: '📅', trend: { value: 'Ago', isPositive: false }, delay: 300 }
  ];

  const policies = [
    {
      id: 1,
      title: 'Data Protection Policy',
      category: 'Data Security',
      status: 'Active',
      lastUpdated: '2024-01-10',
      nextReview: '2024-04-10',
      complianceRate: 98,
      createdBy: 'Jean Pierre Uwimana',
      description: 'Comprehensive data protection and privacy policy for client information',
      version: '2.1',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Workplace Safety Guidelines',
      category: 'Safety',
      status: 'Under Review',
      lastUpdated: '2024-01-05',
      nextReview: '2024-02-05',
      complianceRate: 92,
      createdBy: 'Marie Claire Niyonsaba',
      description: 'Safety protocols and guidelines for workplace operations',
      version: '1.8',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Financial Reporting Standards',
      category: 'Finance',
      status: 'Active',
      lastUpdated: '2024-01-12',
      nextReview: '2024-07-12',
      complianceRate: 95,
      createdBy: 'Patrick Nshimiyimana',
      description: 'Standards for financial reporting and documentation',
      version: '3.0',
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'IT Security Protocol',
      category: 'Technology',
      status: 'Active',
      lastUpdated: '2024-01-08',
      nextReview: '2024-04-08',
      complianceRate: 97,
      createdBy: 'Emmanuel Ndayisaba',
      description: 'Information technology security and access control policies',
      version: '2.5',
      priority: 'Critical'
    },
    {
      id: 5,
      title: 'Employee Code of Conduct',
      category: 'HR',
      status: 'Under Review',
      lastUpdated: '2024-01-03',
      nextReview: '2024-02-03',
      complianceRate: 94,
      createdBy: 'Alexis Nkurunziza',
      description: 'Employee behavior and professional conduct guidelines',
      version: '1.9',
      priority: 'High'
    }
  ];

  const policyCategories = [
    { category: 'Data Security', count: 6, color: 'bg-blue-100 text-blue-800' },
    { category: 'Safety', count: 4, color: 'bg-green-100 text-green-800' },
    { category: 'Finance', count: 5, color: 'bg-purple-100 text-purple-800' },
    { category: 'Technology', count: 3, color: 'bg-orange-100 text-orange-800' },
    { category: 'HR', count: 4, color: 'bg-pink-100 text-pink-800' },
    { category: 'Operations', count: 2, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const upcomingReviews = [
    {
      id: 1,
      policy: 'Workplace Safety Guidelines',
      dueDate: '2024-02-05',
      assignedTo: 'Safety Team',
      priority: 'High'
    },
    {
      id: 2,
      policy: 'Employee Code of Conduct',
      dueDate: '2024-02-03',
      assignedTo: 'HR Department',
      priority: 'High'
    },
    {
      id: 3,
      policy: 'Financial Reporting Standards',
      dueDate: '2024-07-12',
      assignedTo: 'Finance Team',
      priority: 'Medium'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-orange-100 text-orange-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Policy Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {policyStats.map((stat, index) => (
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

      {/* Policy Management Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common policy management tasks"
        color="blue"
        icon="📋"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create new policy')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Policy
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Import policies')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Export policies')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
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

      {/* Policy Categories */}
      <AnimatedCard
        title="Policy Categories"
        subtitle="Distribution of policies by category"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policyCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">policies</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Policies Table */}
      <AnimatedCard
        title="Active Policies"
        subtitle="Current policies and their compliance status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {policies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{policy.title}</div>
                      <div className="text-xs text-gray-500">{policy.description}</div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <User className="w-3 h-3 mr-1" />
                        {policy.createdBy}
                        <span className="mx-1">•</span>
                        v{policy.version}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {policy.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${policy.complianceRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{policy.complianceRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(policy.priority)}`}>
                      {policy.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{policy.nextReview}</div>
                    <div className="text-xs text-gray-500">Last: {policy.lastUpdated}</div>
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
        title="Upcoming Policy Reviews"
        subtitle="Policies scheduled for review"
        color="red"
        icon="⏰"
        delay={1000}
      >
        <div className="space-y-3">
          {upcomingReviews.map((review) => (
            <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{review.policy}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(review.priority)}`}>
                    {review.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Due: {review.dueDate} • Assigned to: {review.assignedTo}
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

      {/* Policy Compliance Metrics */}
      <AnimatedCard
        title="Policy Compliance Metrics"
        subtitle="Overall policy management performance"
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
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-blue-600">Active Policies</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-600">Under Review</div>
            <AnimatedProgressBar progress={20} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default PolicyManagement;
