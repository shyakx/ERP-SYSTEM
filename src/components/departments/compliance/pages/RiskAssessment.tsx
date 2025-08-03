import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

const RiskAssessment: React.FC = () => {
  const colorScheme = getColorScheme('compliance');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const riskStats = [
    { title: 'Total Risks', value: '18', subtitle: 'Identified risks', color: 'red', icon: '⚠️', trend: { value: '+2', isPositive: false }, delay: 0 },
    { title: 'High Risk', value: '3', subtitle: 'Critical issues', color: 'red', icon: '🚨', trend: { value: '-1', isPositive: true }, delay: 100 },
    { title: 'Mitigated', value: '12', subtitle: 'Resolved risks', color: 'green', icon: '✅', trend: { value: '+3', isPositive: true }, delay: 200 },
    { title: 'Risk Score', value: '7.2', subtitle: 'Overall rating', color: 'orange', icon: '📊', trend: { value: '-0.5', isPositive: true }, delay: 300 }
  ];

  const risks = [
    {
      id: 1,
      title: 'Data Breach Risk',
      category: 'Cybersecurity',
      riskLevel: 'High',
      probability: 75,
      impact: 90,
      status: 'Under Mitigation',
      assignedTo: 'IT Security Team',
      dueDate: '2024-02-15',
      description: 'Potential vulnerability in data protection systems',
      mitigationPlan: 'Implement enhanced encryption and access controls',
      lastAssessment: '2024-01-10'
    },
    {
      id: 2,
      title: 'Regulatory Non-Compliance',
      category: 'Legal',
      riskLevel: 'Medium',
      probability: 60,
      impact: 80,
      status: 'Monitoring',
      assignedTo: 'Legal Department',
      dueDate: '2024-03-20',
      description: 'Risk of failing to meet regulatory requirements',
      mitigationPlan: 'Regular compliance audits and training',
      lastAssessment: '2024-01-08'
    },
    {
      id: 3,
      title: 'Workplace Safety Hazard',
      category: 'Safety',
      riskLevel: 'High',
      probability: 40,
      impact: 95,
      status: 'Under Mitigation',
      assignedTo: 'Safety Team',
      dueDate: '2024-01-25',
      description: 'Safety equipment maintenance issues',
      mitigationPlan: 'Immediate equipment replacement and safety training',
      lastAssessment: '2024-01-05'
    },
    {
      id: 4,
      title: 'Financial Reporting Error',
      category: 'Finance',
      riskLevel: 'Medium',
      probability: 30,
      impact: 70,
      status: 'Resolved',
      assignedTo: 'Finance Team',
      dueDate: '2024-01-15',
      description: 'Risk of financial misreporting',
      mitigationPlan: 'Enhanced review processes and controls',
      lastAssessment: '2024-01-12'
    },
    {
      id: 5,
      title: 'Employee Turnover Risk',
      category: 'HR',
      riskLevel: 'Low',
      probability: 50,
      impact: 60,
      status: 'Monitoring',
      assignedTo: 'HR Department',
      dueDate: '2024-04-10',
      description: 'Risk of losing key personnel',
      mitigationPlan: 'Employee retention programs and career development',
      lastAssessment: '2024-01-03'
    }
  ];

  const riskCategories = [
    { category: 'Cybersecurity', count: 5, color: 'bg-red-100 text-red-800' },
    { category: 'Legal', count: 3, color: 'bg-blue-100 text-blue-800' },
    { category: 'Safety', count: 4, color: 'bg-orange-100 text-orange-800' },
    { category: 'Finance', count: 3, color: 'bg-green-100 text-green-800' },
    { category: 'HR', count: 2, color: 'bg-purple-100 text-purple-800' },
    { category: 'Operations', count: 1, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const upcomingAssessments = [
    {
      id: 1,
      risk: 'Data Breach Risk',
      dueDate: '2024-02-15',
      assignedTo: 'IT Security Team',
      priority: 'High'
    },
    {
      id: 2,
      risk: 'Regulatory Non-Compliance',
      dueDate: '2024-03-20',
      assignedTo: 'Legal Department',
      priority: 'Medium'
    },
    {
      id: 3,
      risk: 'Workplace Safety Hazard',
      dueDate: '2024-01-25',
      assignedTo: 'Safety Team',
      priority: 'High'
    }
  ];

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Mitigation': return 'bg-blue-100 text-blue-800';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'New': return 'bg-purple-100 text-purple-800';
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

  const calculateRiskScore = (probability: number, impact: number) => {
    return Math.round((probability * impact) / 100);
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

      {/* Risk Assessment Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common risk assessment tasks"
        color="red"
        icon="⚠️"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Add new risk')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Risk
          </AnimatedButton>
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Run assessment')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Run Assessment
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <Target className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Settings')}
          >
            <Zap className="w-4 h-4 mr-2" />
            Settings
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Risk Categories */}
      <AnimatedCard
        title="Risk Categories"
        subtitle="Distribution of risks by category"
        color="blue"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">risks</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Risks Table */}
      <AnimatedCard
        title="Risk Assessment"
        subtitle="Current risks and their assessment status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {risks.map((risk) => (
                <tr key={risk.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                      <div className="text-xs text-gray-500">{risk.description}</div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <User className="w-3 h-3 mr-1" />
                        Last assessed: {risk.lastAssessment}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {risk.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelBadge(risk.riskLevel)}`}>
                      {risk.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${calculateRiskScore(risk.probability, risk.impact)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{calculateRiskScore(risk.probability, risk.impact)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      P: {risk.probability}% • I: {risk.impact}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(risk.status)}`}>
                      {risk.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{risk.assignedTo}</div>
                    <div className="text-xs text-gray-500">Due: {risk.dueDate}</div>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Upcoming Assessments */}
      <AnimatedCard
        title="Upcoming Risk Assessments"
        subtitle="Scheduled risk assessments"
        color="red"
        icon="⏰"
        delay={1000}
      >
        <div className="space-y-3">
          {upcomingAssessments.map((assessment) => (
            <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{assessment.risk}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(assessment.priority)}`}>
                    {assessment.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Due: {assessment.dueDate} • Assigned to: {assessment.assignedTo}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Assess</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Risk Metrics */}
      <AnimatedCard
        title="Risk Assessment Metrics"
        subtitle="Overall risk management performance"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">67%</div>
            <div className="text-sm text-green-600">Risks Mitigated</div>
            <AnimatedProgressBar progress={67} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">7.2</div>
            <div className="text-sm text-blue-600">Avg Risk Score</div>
            <AnimatedProgressBar progress={72} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">18</div>
            <div className="text-sm text-purple-600">Total Risks</div>
            <AnimatedProgressBar progress={60} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default RiskAssessment;
