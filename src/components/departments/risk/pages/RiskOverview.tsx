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

const RiskOverview: React.FC = () => {
  const colorScheme = getColorScheme('risk');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const riskStats = [
    { title: 'Total Risks', value: '67', subtitle: 'Identified risks', color: 'red', icon: '⚠️', trend: { value: '+5', isPositive: false }, delay: 0 },
    { title: 'High Risk', value: '12', subtitle: 'Critical risks', color: 'orange', icon: '🚨', trend: { value: '+2', isPositive: false }, delay: 100 },
    { title: 'Risk Score', value: '6.8/10', subtitle: 'Average risk', color: 'yellow', icon: '📊', trend: { value: '-0.3', isPositive: true }, delay: 200 },
    { title: 'Mitigated', value: '45', subtitle: 'Resolved risks', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 300 }
  ];

  const topRisks = [
    {
      id: 1,
      title: 'Cybersecurity Breach',
      category: 'Cybersecurity',
      severity: 'Critical',
      probability: 'High',
      impact: 'Critical',
      status: 'Active',
      location: 'Kigali HQ',
      assignedTo: 'Marie Claire Niyonsaba',
      lastUpdated: '2024-01-15',
      riskScore: 8.5,
      mitigationProgress: 65
    },
    {
      id: 2,
      title: 'Physical Security Threat',
      category: 'Physical Security',
      severity: 'High',
      probability: 'Medium',
      impact: 'High',
      status: 'Under Review',
      location: 'Musanze Branch',
      assignedTo: 'Patrick Nshimiyimana',
      lastUpdated: '2024-01-14',
      riskScore: 7.2,
      mitigationProgress: 40
    },
    {
      id: 3,
      title: 'Financial Fraud Risk',
      category: 'Financial',
      severity: 'Critical',
      probability: 'Low',
      impact: 'Critical',
      status: 'Active',
      location: 'Huye Office',
      assignedTo: 'Emmanuel Ndayisaba',
      lastUpdated: '2024-01-13',
      riskScore: 7.8,
      mitigationProgress: 80
    },
    {
      id: 4,
      title: 'Operational Disruption',
      category: 'Operational',
      severity: 'Medium',
      probability: 'Medium',
      impact: 'High',
      status: 'Mitigated',
      location: 'Rubavu Facility',
      assignedTo: 'Alexis Nkurunziza',
      lastUpdated: '2024-01-12',
      riskScore: 6.5,
      mitigationProgress: 100
    },
    {
      id: 5,
      title: 'Regulatory Compliance Risk',
      category: 'Compliance',
      severity: 'High',
      probability: 'High',
      impact: 'High',
      status: 'Active',
      location: 'Kigali HQ',
      assignedTo: 'Dr. Sarah Uwamahoro',
      lastUpdated: '2024-01-11',
      riskScore: 7.0,
      mitigationProgress: 55
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Risk Assessment',
      description: 'Cybersecurity risk assessment completed',
      location: 'Kigali HQ',
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 16:30',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Threat Analysis',
      description: 'New threat identified in network infrastructure',
      location: 'All Locations',
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-15 14:15',
      status: 'In Progress'
    },
    {
      id: 3,
      type: 'Mitigation Plan',
      description: 'Physical security upgrade plan approved',
      location: 'Musanze Branch',
      user: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 12:45',
      status: 'Approved'
    },
    {
      id: 4,
      type: 'Risk Report',
      description: 'Monthly risk report generated',
      location: 'All Locations',
      user: 'Alexis Nkurunziza',
      timestamp: '2024-01-15 11:20',
      status: 'Completed'
    },
    {
      id: 5,
      type: 'Compliance Check',
      description: 'Regulatory compliance audit initiated',
      location: 'Kigali HQ',
      user: 'Dr. Sarah Uwamahoro',
      timestamp: '2024-01-15 10:30',
      status: 'In Progress'
    }
  ];

  const riskCategories = [
    { category: 'Cybersecurity', count: 18, avgScore: 7.5, color: 'bg-red-100 text-red-800' },
    { category: 'Physical Security', count: 12, avgScore: 6.8, color: 'bg-orange-100 text-orange-800' },
    { category: 'Financial', count: 15, avgScore: 7.2, color: 'bg-green-100 text-green-800' },
    { category: 'Operational', count: 10, avgScore: 5.9, color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Compliance', count: 8, avgScore: 6.5, color: 'bg-purple-100 text-purple-800' },
    { category: 'Environmental', count: 4, avgScore: 4.8, color: 'bg-blue-100 text-blue-800' }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Mitigated': return 'bg-green-100 text-green-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      case 'Monitoring': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryData = riskCategories.find(c => c.category === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Risk Assessment': return 'bg-blue-100 text-blue-800';
      case 'Threat Analysis': return 'bg-red-100 text-red-800';
      case 'Mitigation Plan': return 'bg-green-100 text-green-800';
      case 'Risk Report': return 'bg-purple-100 text-purple-800';
      case 'Compliance Check': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-orange-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Risk Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskStats.map((stat, index) => (
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

      {/* Risk Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common risk management tasks"
        color="red"
        icon="⚠️"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Add risk')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Risk
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Assess risk')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Assess Risk
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log('Create plan')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Create Plan
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

      {/* Risk by Category */}
      <AnimatedCard
        title="Risk by Category"
        subtitle="Distribution by risk type"
        color="orange"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {riskCategories.map((category, index) => (
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

      {/* Top Risks */}
      <AnimatedCard
        title="Top Risks"
        subtitle="Highest priority risks"
        color="red"
        icon="🚨"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topRisks.map((risk) => (
                <tr key={risk.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                    <div className="text-xs text-gray-500">{risk.location}</div>
                    <div className="text-xs text-gray-500">Updated: {risk.lastUpdated}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(risk.category)}`}>
                      {risk.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(risk.severity)}`}>
                      {risk.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(risk.status)}`}>
                      {risk.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRiskScoreColor(risk.riskScore)}`}>
                      {risk.riskScore}/10
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-red-600 h-1 rounded-full"
                        style={{ width: `${risk.riskScore * 10}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{risk.mitigationProgress}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${risk.mitigationProgress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{risk.assignedTo}</div>
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
                        <AlertTriangle className="w-4 h-4" />
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
        subtitle="Latest risk management activities"
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
                  {activity.location} • {activity.user} • {activity.timestamp} • {activity.status}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Risk Metrics */}
      <AnimatedCard
        title="Risk Metrics"
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
            <div className="text-2xl font-bold text-orange-600">67</div>
            <div className="text-sm text-orange-600">Total Risks</div>
            <AnimatedProgressBar progress={85} color="orange" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-green-600">Mitigated Risks</div>
            <AnimatedProgressBar progress={92} color="green" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default RiskOverview;
