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

const SalesPipeline: React.FC = () => {
  const colorScheme = getColorScheme('sales-marketing');
  const [selectedStage, setSelectedStage] = useState('all');

  const pipelineStats = [
    { title: 'Total Opportunities', value: '89', subtitle: 'Active deals', color: 'blue', icon: '🎯', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'Pipeline Value', value: 'RWF 45.2M', subtitle: 'Total value', color: 'green', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 100 },
    { title: 'Win Rate', value: '68.5%', subtitle: 'Success rate', color: 'orange', icon: '🏆', trend: { value: '+3.2%', isPositive: true }, delay: 200 },
    { title: 'Avg Deal Size', value: 'RWF 2.8M', subtitle: 'Per opportunity', color: 'purple', icon: '📊', trend: { value: '+0.3M', isPositive: true }, delay: 300 }
  ];

  const opportunities = [
    {
      id: 1,
      name: 'Kigali Business Center Expansion',
      client: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      value: 'RWF 8.5M',
      stage: 'Proposal',
      probability: 75,
      expectedClose: '2024-02-15',
      salesRep: 'Marie Claire Niyonsaba',
      lastActivity: '2024-01-15',
      nextAction: 'Present proposal'
    },
    {
      id: 2,
      name: 'Musanze Hotel Security Upgrade',
      client: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      value: 'RWF 6.2M',
      stage: 'Negotiation',
      probability: 85,
      expectedClose: '2024-01-30',
      salesRep: 'Patrick Nshimiyimana',
      lastActivity: '2024-01-14',
      nextAction: 'Contract review'
    },
    {
      id: 3,
      name: 'Huye University Campus Security',
      client: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      value: 'RWF 4.8M',
      stage: 'Qualification',
      probability: 60,
      expectedClose: '2024-03-01',
      salesRep: 'Emmanuel Ndayisaba',
      lastActivity: '2024-01-13',
      nextAction: 'Technical assessment'
    },
    {
      id: 4,
      name: 'Rubavu Manufacturing Facility',
      client: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      value: 'RWF 5.5M',
      stage: 'Discovery',
      probability: 40,
      expectedClose: '2024-02-28',
      salesRep: 'Alexis Nkurunziza',
      lastActivity: '2024-01-12',
      nextAction: 'Needs analysis'
    },
    {
      id: 5,
      name: 'Kigali Shopping Mall Security',
      client: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      value: 'RWF 3.9M',
      stage: 'Closed Won',
      probability: 100,
      expectedClose: '2024-01-20',
      salesRep: 'Dr. Sarah Uwamahoro',
      lastActivity: '2024-01-11',
      nextAction: 'Contract signing'
    }
  ];

  const pipelineStages = [
    { stage: 'Prospecting', count: 15, value: 'RWF 12.5M', color: 'bg-gray-100 text-gray-800' },
    { stage: 'Qualification', count: 22, value: 'RWF 18.2M', color: 'bg-blue-100 text-blue-800' },
    { stage: 'Discovery', count: 18, value: 'RWF 14.8M', color: 'bg-green-100 text-green-800' },
    { stage: 'Proposal', count: 12, value: 'RWF 9.6M', color: 'bg-yellow-100 text-yellow-800' },
    { stage: 'Negotiation', count: 8, value: 'RWF 6.4M', color: 'bg-orange-100 text-orange-800' },
    { stage: 'Closed Won', count: 14, value: 'RWF 11.2M', color: 'bg-green-100 text-green-800' }
  ];

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Prospecting': return 'bg-gray-100 text-gray-800';
      case 'Qualification': return 'bg-blue-100 text-blue-800';
      case 'Discovery': return 'bg-green-100 text-green-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pipelineStats.map((stat, index) => (
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

      {/* Pipeline Actions */}
      <AnimatedCard
        title="Pipeline Management"
        subtitle="Sales pipeline operations"
        color="blue"
        icon="🔄"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add opportunity')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Opportunity
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Update stage')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Stage
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Schedule activity')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Activity
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate forecast')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Forecast
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Pipeline Stages */}
      <AnimatedCard
        title="Pipeline Stages"
        subtitle="Opportunities by stage"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${stage.color}`}>
                {stage.stage}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
              <div className="text-xs text-gray-500">{stage.value}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Opportunities Table */}
      <AnimatedCard
        title="Sales Pipeline"
        subtitle="All active opportunities"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rep</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{opportunity.name}</div>
                    <div className="text-xs text-gray-500">{opportunity.contact}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{opportunity.client}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{opportunity.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageBadge(opportunity.stage)}`}>
                      {opportunity.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                      {opportunity.probability}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-600 h-1 rounded-full" 
                        style={{ width: `${opportunity.probability}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{opportunity.expectedClose}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{opportunity.salesRep}</div>
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
                        <Phone className="w-4 h-4" />
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

      {/* Pipeline Metrics */}
      <AnimatedCard
        title="Pipeline Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">68.5%</div>
            <div className="text-sm text-green-600">Win Rate</div>
            <AnimatedProgressBar progress={68.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 45.2M</div>
            <div className="text-sm text-blue-600">Pipeline Value</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-purple-600">Total Opportunities</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SalesPipeline; 