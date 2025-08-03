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

const Campaigns: React.FC = () => {
  const colorScheme = getColorScheme('sales-marketing');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const campaignStats = [
    { title: 'Active Campaigns', value: '12', subtitle: 'Running campaigns', color: 'blue', icon: '📢', trend: { value: '+3', isPositive: true }, delay: 0 },
    { title: 'Total Leads', value: '2,847', subtitle: 'Generated leads', color: 'green', icon: '🎯', trend: { value: '+156', isPositive: true }, delay: 100 },
    { title: 'Conversion Rate', value: '15.8%', subtitle: 'Lead to deal', color: 'orange', icon: '📊', trend: { value: '+2.1%', isPositive: true }, delay: 200 },
    { title: 'ROI', value: '285%', subtitle: 'Return on investment', color: 'purple', icon: '💰', trend: { value: '+15%', isPositive: true }, delay: 300 }
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Q1 Security Solutions Campaign',
      type: 'Email Marketing',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      budget: 'RWF 2.5M',
      spent: 'RWF 1.8M',
      leads: 456,
      conversions: 68,
      manager: 'Marie Claire Niyonsaba',
      target: 'Business Centers',
      description: 'Comprehensive security solutions for business centers'
    },
    {
      id: 2,
      name: 'Hotel Security Awareness',
      type: 'Digital Advertising',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 'RWF 1.8M',
      spent: 'RWF 1.2M',
      leads: 234,
      conversions: 42,
      manager: 'Patrick Nshimiyimana',
      target: 'Hotels & Resorts',
      description: 'Security awareness campaign for hospitality sector'
    },
    {
      id: 3,
      name: 'Educational Institution Security',
      type: 'Content Marketing',
      status: 'Active',
      startDate: '2024-01-10',
      endDate: '2024-04-10',
      budget: 'RWF 1.2M',
      spent: 'RWF 0.8M',
      leads: 189,
      conversions: 28,
      manager: 'Emmanuel Ndayisaba',
      target: 'Educational Institutions',
      description: 'Security solutions for educational institutions'
    },
    {
      id: 4,
      name: 'Manufacturing Security Drive',
      type: 'Trade Show',
      status: 'Scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      budget: 'RWF 1.5M',
      spent: 'RWF 0.0M',
      leads: 0,
      conversions: 0,
      manager: 'Alexis Nkurunziza',
      target: 'Manufacturing Companies',
      description: 'Security solutions for manufacturing sector'
    },
    {
      id: 5,
      name: 'Retail Security Solutions',
      type: 'Social Media',
      status: 'Completed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      budget: 'RWF 1.0M',
      spent: 'RWF 0.9M',
      leads: 167,
      conversions: 25,
      manager: 'Dr. Sarah Uwamahoro',
      target: 'Retail & Shopping',
      description: 'Security solutions for retail sector'
    }
  ];

  const campaignTypes = [
    { type: 'Email Marketing', count: 4, avgLeads: 156, color: 'bg-blue-100 text-blue-800' },
    { type: 'Digital Advertising', count: 3, avgLeads: 234, color: 'bg-green-100 text-green-800' },
    { type: 'Content Marketing', count: 2, avgLeads: 189, color: 'bg-purple-100 text-purple-800' },
    { type: 'Trade Show', count: 2, avgLeads: 145, color: 'bg-orange-100 text-orange-800' },
    { type: 'Social Media', count: 1, avgLeads: 167, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    const typeData = campaignTypes.find(t => t.type === type);
    return typeData ? typeData.color : 'bg-gray-100 text-gray-800';
  };

  const getROI = (spent: string, conversions: number, avgDealValue: number = 2.8) => {
    const spentValue = parseFloat(spent.replace('RWF ', '').replace('M', ''));
    const revenue = conversions * avgDealValue;
    const roi = ((revenue - spentValue) / spentValue) * 100;
    return roi.toFixed(0);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignStats.map((stat, index) => (
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

      {/* Campaign Actions */}
      <AnimatedCard
        title="Campaign Management"
        subtitle="Marketing campaign operations"
        color="blue"
        icon="📢"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create campaign')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Schedule campaign')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Campaign
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Track performance')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Track Performance
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Campaign Types */}
      <AnimatedCard
        title="Campaign Types"
        subtitle="Distribution by campaign type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {campaignTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">Avg: {type.avgLeads} leads</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Campaigns Table */}
      <AnimatedCard
        title="Marketing Campaigns"
        subtitle="All active and scheduled campaigns"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-xs text-gray-500">{campaign.description}</div>
                    <div className="text-xs text-gray-500">Target: {campaign.target}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(campaign.type)}`}>
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.startDate}</div>
                    <div className="text-xs text-gray-500">to {campaign.endDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.budget}</div>
                    <div className="text-xs text-gray-500">Spent: {campaign.spent}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.leads}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.conversions}</div>
                    <div className="text-xs text-gray-500">
                      {campaign.leads > 0 ? ((campaign.conversions / campaign.leads) * 100).toFixed(1) : 0}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {campaign.conversions > 0 ? getROI(campaign.spent, campaign.conversions) : 0}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.manager}</div>
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

      {/* Campaign Metrics */}
      <AnimatedCard
        title="Campaign Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">15.8%</div>
            <div className="text-sm text-green-600">Conversion Rate</div>
            <AnimatedProgressBar progress={15.8} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-sm text-blue-600">Total Leads</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">285%</div>
            <div className="text-sm text-purple-600">ROI</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Campaigns;
