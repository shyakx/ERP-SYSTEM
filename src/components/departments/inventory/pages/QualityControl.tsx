import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  Package, 
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
  Truck,
  Warehouse,
  Box,
  Tag,
  Minus,
  AlertCircle,
  Shield,
  Wifi,
  Battery,
  Signal,
  ShoppingCart,
  DollarSign,
  FileText,
  Wrench,
  Cog,
  Building,
  PackageCheck,
  CheckSquare,
  XCircle
} from 'lucide-react';

const QualityControl: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const qualityStats = [
    { title: 'Total Inspections', value: '156', subtitle: 'This month', color: 'blue', icon: '🔍', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'Passed', value: '142', subtitle: 'Quality approved', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'Failed', value: '14', subtitle: 'Quality rejected', color: 'red', icon: '❌', trend: { value: '-4', isPositive: true }, delay: 200 },
    { title: 'Quality Score', value: '91.0%', subtitle: 'Average rating', color: 'purple', icon: '⭐', trend: { value: '+2.1%', isPositive: true }, delay: 300 }
  ];

  const qualityInspections = [
    {
      id: 1,
      item: 'Security Cameras (HD)',
      batch: 'CAM-HD-2024-001',
      inspector: 'Jean Pierre Uwimana',
      inspectionDate: '2024-01-15',
      status: 'Passed',
      score: 95,
      issues: 'None',
      location: 'Kigali Warehouse'
    },
    {
      id: 2,
      item: 'Guard Uniforms',
      batch: 'UNI-GRD-2024-002',
      inspector: 'Marie Claire Niyonsaba',
      inspectionDate: '2024-01-14',
      status: 'Failed',
      score: 72,
      issues: 'Stitching quality',
      location: 'Musanze Branch'
    },
    {
      id: 3,
      item: 'Walkie Talkies',
      batch: 'COM-WT-2024-003',
      inspector: 'Patrick Nshimiyimana',
      inspectionDate: '2024-01-13',
      status: 'Passed',
      score: 88,
      issues: 'Minor packaging',
      location: 'Huye Warehouse'
    },
    {
      id: 4,
      item: 'Safety Equipment',
      batch: 'SAF-EQ-2024-004',
      inspector: 'Emmanuel Ndayisaba',
      inspectionDate: '2024-01-12',
      status: 'Passed',
      score: 92,
      issues: 'None',
      location: 'Kigali Warehouse'
    },
    {
      id: 5,
      item: 'Security Barriers',
      batch: 'BAR-SEC-2024-005',
      inspector: 'Alexis Nkurunziza',
      inspectionDate: '2024-01-11',
      status: 'Passed',
      score: 96,
      issues: 'None',
      location: 'Rubavu Branch'
    }
  ];

  const qualityStandards = [
    { standard: 'Electronics', totalInspections: 45, passed: 42, failed: 3, score: '93.3%' },
    { standard: 'Apparel', totalInspections: 38, passed: 35, failed: 3, score: '92.1%' },
    { standard: 'Safety Equipment', totalInspections: 32, passed: 30, failed: 2, score: '93.8%' },
    { standard: 'Communication', totalInspections: 28, passed: 25, failed: 3, score: '89.3%' },
    { standard: 'Infrastructure', totalInspections: 13, passed: 10, failed: 3, score: '76.9%' }
  ];

  const qualityIssues = [
    {
      id: 1,
      item: 'Guard Uniforms',
      issue: 'Stitching Quality',
      severity: 'Medium',
      reportedBy: 'Marie Claire Niyonsaba',
      reportedDate: '2024-01-14',
      status: 'Under Review',
      affectedQuantity: 25
    },
    {
      id: 2,
      item: 'Walkie Talkies',
      issue: 'Packaging Damage',
      severity: 'Low',
      reportedBy: 'Patrick Nshimiyimana',
      reportedDate: '2024-01-13',
      status: 'Resolved',
      affectedQuantity: 5
    },
    {
      id: 3,
      item: 'Security Barriers',
      issue: 'Paint Finish',
      severity: 'High',
      reportedBy: 'Alexis Nkurunziza',
      reportedDate: '2024-01-12',
      status: 'In Progress',
      affectedQuantity: 15
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Passed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

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

      {/* Quality Control Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common quality control tasks"
        color="blue"
        icon="🔍"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Schedule inspection')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Inspection
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Quality report')}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Quality Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Issue tracking')}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Issue Tracking
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Quality Standards */}
      <AnimatedCard
        title="Quality Standards"
        subtitle="Performance by category"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {qualityStandards.map((standard, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 bg-blue-100 text-blue-800`}>
                {standard.standard}
              </div>
              <div className="text-2xl font-bold text-gray-900">{standard.score}</div>
              <div className="text-xs text-gray-500">{standard.passed}/{standard.totalInspections} passed</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quality Inspections */}
      <AnimatedCard
        title="Quality Inspections"
        subtitle="Recent quality control inspections"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {qualityInspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{inspection.item}</div>
                    <div className="text-xs text-gray-500">{inspection.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.batch}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.inspector}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(inspection.score)}`}>
                      {inspection.score}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(inspection.status)}`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.issues}</div>
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

      {/* Quality Issues */}
      <AnimatedCard
        title="Quality Issues"
        subtitle="Current quality issues and their status"
        color="red"
        icon="🚨"
        delay={1000}
      >
        <div className="space-y-3">
          {qualityIssues.map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{issue.item}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(issue.severity)}`}>
                    {issue.severity}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {issue.issue} • {issue.reportedBy} • {issue.reportedDate}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Affected Quantity: {issue.affectedQuantity}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Resolve</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quality Metrics */}
      <AnimatedCard
        title="Quality Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">91.0%</div>
            <div className="text-sm text-green-600">Quality Score</div>
            <AnimatedProgressBar progress={91.0} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-blue-600">Total Inspections</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">142</div>
            <div className="text-sm text-purple-600">Passed Inspections</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default QualityControl; 