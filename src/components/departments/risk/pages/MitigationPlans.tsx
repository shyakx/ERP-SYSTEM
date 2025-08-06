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

const MitigationPlans: React.FC = () => {
  const colorScheme = getColorScheme('risk');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mitigationStats = [
    { title: 'Active Plans', value: '18', subtitle: 'Current plans', color: 'blue', icon: '🛠️', trend: { value: '+3', isPositive: true }, delay: 0 },
    { title: 'Completed', value: '45', subtitle: 'Successfully implemented', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'Success Rate', value: '92.3%', subtitle: 'Plan effectiveness', color: 'orange', icon: '📈', trend: { value: '+2.1%', isPositive: true }, delay: 200 },
    { title: 'Risk Reduction', value: '67.8%', subtitle: 'Average reduction', color: 'purple', icon: '📉', trend: { value: '+5.2%', isPositive: true }, delay: 300 }
  ];

  const mitigationPlans = [
    {
      id: 1,
      title: 'Cybersecurity Enhancement Plan',
      riskType: 'Cybersecurity',
      status: 'In Progress',
      priority: 'Critical',
      assignedTo: 'Marie Claire Niyonsaba',
      startDate: '2024-01-15',
      targetDate: '2024-02-15',
      progress: 65,
      budget: 'RWF 2.5M',
      riskReduction: 75,
      description: 'Implement advanced firewall and monitoring systems',
      actions: [
        'Install next-generation firewall',
        'Deploy intrusion detection system',
        'Implement security awareness training',
        'Conduct vulnerability assessments'
      ]
    },
    {
      id: 2,
      title: 'Physical Security Upgrade',
      riskType: 'Physical Security',
      status: 'Completed',
      priority: 'High',
      assignedTo: 'Patrick Nshimiyimana',
      startDate: '2024-01-10',
      targetDate: '2024-01-25',
      progress: 100,
      budget: 'RWF 1.8M',
      riskReduction: 85,
      description: 'Enhance access controls and surveillance systems',
      actions: [
        'Install biometric access systems',
        'Upgrade CCTV cameras',
        'Implement visitor management',
        'Conduct security audits'
      ]
    },
    {
      id: 3,
      title: 'Financial Risk Controls',
      riskType: 'Financial',
      status: 'In Progress',
      priority: 'Medium',
      assignedTo: 'Emmanuel Ndayisaba',
      startDate: '2024-01-12',
      targetDate: '2024-02-28',
      progress: 40,
      budget: 'RWF 1.2M',
      riskReduction: 60,
      description: 'Implement fraud detection and prevention measures',
      actions: [
        'Deploy fraud detection software',
        'Establish transaction monitoring',
        'Implement dual authorization',
        'Conduct financial audits'
      ]
    },
    {
      id: 4,
      title: 'Operational Continuity Plan',
      riskType: 'Operational',
      status: 'Planning',
      priority: 'Medium',
      assignedTo: 'Alexis Nkurunziza',
      startDate: '2024-01-20',
      targetDate: '2024-03-15',
      progress: 15,
      budget: 'RWF 3.1M',
      riskReduction: 70,
      description: 'Develop business continuity and disaster recovery',
      actions: [
        'Create backup systems',
        'Establish recovery procedures',
        'Train staff on procedures',
        'Test recovery processes'
      ]
    },
    {
      id: 5,
      title: 'Compliance Framework Update',
      riskType: 'Compliance',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'Dr. Sarah Uwamahoro',
      startDate: '2024-01-08',
      targetDate: '2024-02-08',
      progress: 80,
      budget: 'RWF 0.9M',
      riskReduction: 90,
      description: 'Update policies to meet new regulatory requirements',
      actions: [
        'Review current policies',
        'Update compliance procedures',
        'Train staff on new requirements',
        'Conduct compliance audits'
      ]
    }
  ];

  const planTypes = [
    { type: 'Cybersecurity', count: 6, avgReduction: 75, color: 'bg-red-100 text-red-800' },
    { type: 'Physical Security', count: 4, avgReduction: 85, color: 'bg-orange-100 text-orange-800' },
    { type: 'Financial', count: 3, avgReduction: 60, color: 'bg-green-100 text-green-800' },
    { type: 'Operational', count: 3, avgReduction: 70, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Compliance', count: 2, avgReduction: 90, color: 'bg-purple-100 text-purple-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
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

  const getTypeBadge = (type: string) => {
    const typeData = planTypes.find(t => t.type === type);
    return typeData ? typeData.color : 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredPlans = mitigationPlans.filter(plan =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.riskType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Mitigation Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mitigationStats.map((stat, index) => (
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

      {/* Mitigation Actions */}
      <AnimatedCard
        title="Mitigation Management"
        subtitle="Risk mitigation operations"
        color="red"
        icon="🛠️"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Create plan')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Update progress')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Progress
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log('Assign resources')}
          >
            <Users className="w-4 h-4 mr-2" />
            Assign Resources
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
        subtitle="Find specific mitigation plans"
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
                placeholder="Search plans by title, risk type, or assignee..."
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
              <option value="planning">Planning</option>
              <option value="on-hold">On Hold</option>
            </select>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Plan Types */}
      <AnimatedCard
        title="Plan Types"
        subtitle="Distribution by risk category"
        color="orange"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {planTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">Avg Reduction: {type.avgReduction}%</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Mitigation Plans Table */}
      <AnimatedCard
        title="Mitigation Plans"
        subtitle="All active risk mitigation plans"
        color="red"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Reduction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{plan.title}</div>
                    <div className="text-xs text-gray-500">{plan.description}</div>
                    <div className="text-xs text-gray-500">Budget: {plan.budget}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(plan.riskType)}`}>
                      {plan.riskType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(plan.priority)}`}>
                      {plan.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getProgressColor(plan.progress)}`}>
                      {plan.progress}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{plan.riskReduction}%</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{plan.assignedTo}</div>
                    <div className="text-xs text-gray-500">{plan.startDate} - {plan.targetDate}</div>
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
                        <Users className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Mitigation Metrics */}
      <AnimatedCard
        title="Mitigation Metrics"
        subtitle="Key performance indicators"
        color="red"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">92.3%</div>
            <div className="text-sm text-red-600">Success Rate</div>
            <AnimatedProgressBar progress={92.3} color="red" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">67.8%</div>
            <div className="text-sm text-orange-600">Risk Reduction</div>
            <AnimatedProgressBar progress={67.8} color="orange" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-green-600">Active Plans</div>
            <AnimatedProgressBar progress={85} color="green" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default MitigationPlans; 