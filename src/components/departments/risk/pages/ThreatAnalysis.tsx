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

const ThreatAnalysis: React.FC = () => {
  const colorScheme = getColorScheme('risk');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const threatStats = [
    { title: 'Active Threats', value: '23', subtitle: 'Current threats', color: 'red', icon: '🚨', trend: { value: '+3', isPositive: false }, delay: 0 },
    { title: 'High Risk', value: '8', subtitle: 'Critical threats', color: 'orange', icon: '⚠️', trend: { value: '+1', isPositive: false }, delay: 100 },
    { title: 'Threat Score', value: '7.2/10', subtitle: 'Average risk', color: 'yellow', icon: '📊', trend: { value: '-0.3', isPositive: true }, delay: 200 },
    { title: 'Mitigated', value: '156', subtitle: 'Resolved threats', color: 'green', icon: '✅', trend: { value: '+12', isPositive: true }, delay: 300 }
  ];

  const threats = [
    {
      id: 1,
      title: 'Cybersecurity Breach Risk',
      category: 'Cybersecurity',
      severity: 'High',
      probability: 'Medium',
      impact: 'Critical',
      status: 'Active',
      location: 'Kigali HQ',
      assignedTo: 'Marie Claire Niyonsaba',
      reportedDate: '2024-01-15',
      lastUpdated: '2024-01-15 14:30',
      description: 'Potential vulnerability in network infrastructure',
      mitigation: 'Implement enhanced firewall and monitoring'
    },
    {
      id: 2,
      title: 'Physical Security Threat',
      category: 'Physical Security',
      severity: 'Medium',
      probability: 'High',
      impact: 'Medium',
      status: 'Under Review',
      location: 'Musanze Branch',
      assignedTo: 'Patrick Nshimiyimana',
      reportedDate: '2024-01-14',
      lastUpdated: '2024-01-15 12:15',
      description: 'Unauthorized access attempts detected',
      mitigation: 'Strengthen access controls and surveillance'
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
      reportedDate: '2024-01-13',
      lastUpdated: '2024-01-15 10:45',
      description: 'Suspicious transaction patterns identified',
      mitigation: 'Implement fraud detection systems'
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
      reportedDate: '2024-01-12',
      lastUpdated: '2024-01-15 09:20',
      description: 'Equipment failure risk assessment',
      mitigation: 'Preventive maintenance schedule implemented'
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
      reportedDate: '2024-01-11',
      lastUpdated: '2024-01-15 08:30',
      description: 'New regulatory requirements compliance',
      mitigation: 'Update policies and procedures'
    }
  ];

  const threatCategories = [
    { category: 'Cybersecurity', count: 8, avgSeverity: 'High', color: 'bg-red-100 text-red-800' },
    { category: 'Physical Security', count: 6, avgSeverity: 'Medium', color: 'bg-orange-100 text-orange-800' },
    { category: 'Financial', count: 4, avgSeverity: 'Critical', color: 'bg-purple-100 text-purple-800' },
    { category: 'Operational', count: 3, avgSeverity: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { category: 'Compliance', count: 2, avgSeverity: 'High', color: 'bg-blue-100 text-blue-800' }
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
    const categoryData = threatCategories.find(c => c.category === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  const getProbabilityBadge = (probability: string) => {
    switch (probability) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredThreats = threats.filter(threat =>
    threat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Threat Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {threatStats.map((stat, index) => (
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

      {/* Threat Actions */}
      <AnimatedCard
        title="Threat Management"
        subtitle="Threat analysis operations"
        color="red"
        icon="🚨"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Add threat')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Threat
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Analyze threat')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Threat
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log('Update status')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Status
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
        subtitle="Find specific threats"
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
                placeholder="Search threats by title, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Threat Categories */}
      <AnimatedCard
        title="Threat Categories"
        subtitle="Distribution by threat type"
        color="orange"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {threatCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">Avg: {category.avgSeverity}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Threats Table */}
      <AnimatedCard
        title="Active Threats"
        subtitle="All current threat analysis"
        color="red"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threat</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{threat.title}</div>
                    <div className="text-xs text-gray-500">{threat.description}</div>
                    <div className="text-xs text-gray-500">Mitigation: {threat.mitigation}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(threat.category)}`}>
                      {threat.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProbabilityBadge(threat.probability)}`}>
                      {threat.probability}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactBadge(threat.impact)}`}>
                      {threat.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(threat.status)}`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{threat.location}</div>
                    <div className="text-xs text-gray-500">Assigned: {threat.assignedTo}</div>
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

      {/* Threat Metrics */}
      <AnimatedCard
        title="Threat Analysis Metrics"
        subtitle="Key performance indicators"
        color="red"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">7.2/10</div>
            <div className="text-sm text-red-600">Threat Score</div>
            <AnimatedProgressBar progress={72} color="red" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">23</div>
            <div className="text-sm text-orange-600">Active Threats</div>
            <AnimatedProgressBar progress={85} color="orange" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-green-600">Mitigated Threats</div>
            <AnimatedProgressBar progress={92} color="green" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ThreatAnalysis;