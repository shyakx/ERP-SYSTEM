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

const RiskReports: React.FC = () => {
  const colorScheme = getColorScheme('risk');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reportStats = [
    { title: 'Total Reports', value: '45', subtitle: 'Generated reports', color: 'blue', icon: '📊', trend: { value: '+8', isPositive: true }, delay: 0 },
    { title: 'Critical Alerts', value: '12', subtitle: 'High priority', color: 'red', icon: '🚨', trend: { value: '+3', isPositive: false }, delay: 100 },
    { title: 'Risk Score', value: '6.8/10', subtitle: 'Average risk', color: 'orange', icon: '⚠️', trend: { value: '-0.4', isPositive: true }, delay: 200 },
    { title: 'Compliance Rate', value: '94.2%', subtitle: 'Regulatory compliance', color: 'green', icon: '✅', trend: { value: '+1.2%', isPositive: true }, delay: 300 }
  ];

  const riskReports = [
    {
      id: 1,
      title: 'Monthly Risk Assessment Report',
      type: 'Assessment',
      status: 'Completed',
      priority: 'High',
      generatedBy: 'Marie Claire Niyonsaba',
      generatedDate: '2024-01-15',
      lastUpdated: '2024-01-15 16:30',
      riskScore: 7.2,
      findings: 8,
      recommendations: 12,
      location: 'Kigali HQ'
    },
    {
      id: 2,
      title: 'Cybersecurity Threat Analysis',
      type: 'Security',
      status: 'In Progress',
      priority: 'Critical',
      generatedBy: 'Patrick Nshimiyimana',
      generatedDate: '2024-01-14',
      lastUpdated: '2024-01-15 14:15',
      riskScore: 8.5,
      findings: 15,
      recommendations: 20,
      location: 'All Locations'
    },
    {
      id: 3,
      title: 'Financial Risk Evaluation',
      type: 'Financial',
      status: 'Completed',
      priority: 'Medium',
      generatedBy: 'Emmanuel Ndayisaba',
      generatedDate: '2024-01-13',
      lastUpdated: '2024-01-15 12:45',
      riskScore: 5.8,
      findings: 6,
      recommendations: 8,
      location: 'Huye Office'
    },
    {
      id: 4,
      title: 'Operational Risk Assessment',
      type: 'Operational',
      status: 'Draft',
      priority: 'Low',
      generatedBy: 'Alexis Nkurunziza',
      generatedDate: '2024-01-12',
      lastUpdated: '2024-01-15 11:20',
      riskScore: 4.2,
      findings: 4,
      recommendations: 6,
      location: 'Rubavu Facility'
    },
    {
      id: 5,
      title: 'Compliance Risk Report',
      type: 'Compliance',
      status: 'Completed',
      priority: 'High',
      generatedBy: 'Dr. Sarah Uwamahoro',
      generatedDate: '2024-01-11',
      lastUpdated: '2024-01-15 10:30',
      riskScore: 6.9,
      findings: 10,
      recommendations: 14,
      location: 'Kigali HQ'
    }
  ];

  const reportTypes = [
    { type: 'Assessment', count: 15, avgScore: 6.8, color: 'bg-blue-100 text-blue-800' },
    { type: 'Security', count: 12, avgScore: 7.5, color: 'bg-red-100 text-red-800' },
    { type: 'Financial', count: 8, avgScore: 5.9, color: 'bg-green-100 text-green-800' },
    { type: 'Operational', count: 6, avgScore: 4.8, color: 'bg-orange-100 text-orange-800' },
    { type: 'Compliance', count: 4, avgScore: 6.2, color: 'bg-purple-100 text-purple-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Archived': return 'bg-purple-100 text-purple-800';
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
    const typeData = reportTypes.find(t => t.type === type);
    return typeData ? typeData.color : 'bg-gray-100 text-gray-800';
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-orange-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredReports = riskReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Report Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
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

      {/* Report Actions */}
      <AnimatedCard
        title="Report Management"
        subtitle="Risk report operations"
        color="red"
        icon="📊"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Export report')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log('Schedule report')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Share report')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Share Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search & Filter"
        subtitle="Find specific reports"
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
                placeholder="Search reports by title, type, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="assessment">Assessment</option>
              <option value="security">Security</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="compliance">Compliance</option>
            </select>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Report Types */}
      <AnimatedCard
        title="Report Types"
        subtitle="Distribution by report category"
        color="orange"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {reportTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">Avg Score: {type.avgScore}/10</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Reports Table */}
      <AnimatedCard
        title="Risk Reports"
        subtitle="All generated risk reports"
        color="red"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    <div className="text-xs text-gray-500">{report.location}</div>
                    <div className="text-xs text-gray-500">Generated: {report.generatedDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRiskScoreColor(report.riskScore)}`}>
                      {report.riskScore}/10
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-red-600 h-1 rounded-full"
                        style={{ width: `${report.riskScore * 10}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.findings} findings</div>
                    <div className="text-xs text-gray-500">{report.recommendations} recommendations</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.generatedBy}</div>
                    <div className="text-xs text-gray-500">Updated: {report.lastUpdated}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Report Metrics */}
      <AnimatedCard
        title="Report Metrics"
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
            <div className="text-2xl font-bold text-orange-600">45</div>
            <div className="text-sm text-orange-600">Total Reports</div>
            <AnimatedProgressBar progress={85} color="orange" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-green-600">Compliance Rate</div>
            <AnimatedProgressBar progress={94.2} color="green" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default RiskReports; 