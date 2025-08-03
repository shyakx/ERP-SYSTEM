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

const SalesOverview: React.FC = () => {
  const colorScheme = getColorScheme('sales-marketing');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const salesStats = [
    { title: 'Total Revenue', value: 'RWF 28.5M', subtitle: 'This month', color: 'blue', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 0 },
    { title: 'Deals Closed', value: '45', subtitle: 'Successful deals', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'Conversion Rate', value: '68.5%', subtitle: 'Lead to deal', color: 'orange', icon: '📊', trend: { value: '+3.2%', isPositive: true }, delay: 200 },
    { title: 'Avg Deal Size', value: 'RWF 2.8M', subtitle: 'Per deal', color: 'purple', icon: '📈', trend: { value: '+0.3M', isPositive: true }, delay: 300 }
  ];

  const topDeals = [
    {
      id: 1,
      name: 'Kigali Business Center Expansion',
      client: 'Kigali Business Center',
      value: 'RWF 8.5M',
      stage: 'Closed Won',
      salesRep: 'Marie Claire Niyonsaba',
      expectedClose: '2024-01-20',
      probability: 100,
      lastActivity: '2024-01-15'
    },
    {
      id: 2,
      name: 'Musanze Hotel Security Upgrade',
      client: 'Musanze Hotel & Resort',
      value: 'RWF 6.2M',
      stage: 'Negotiation',
      salesRep: 'Patrick Nshimiyimana',
      expectedClose: '2024-01-30',
      probability: 85,
      lastActivity: '2024-01-14'
    },
    {
      id: 3,
      name: 'Huye University Campus Security',
      client: 'Huye University',
      value: 'RWF 4.8M',
      stage: 'Proposal',
      salesRep: 'Emmanuel Ndayisaba',
      expectedClose: '2024-02-15',
      probability: 75,
      lastActivity: '2024-01-13'
    },
    {
      id: 4,
      name: 'Rubavu Manufacturing Facility',
      client: 'Rubavu Manufacturing',
      value: 'RWF 5.5M',
      stage: 'Discovery',
      salesRep: 'Alexis Nkurunziza',
      expectedClose: '2024-02-28',
      probability: 60,
      lastActivity: '2024-01-12'
    },
    {
      id: 5,
      name: 'Kigali Shopping Mall Security',
      client: 'Kigali Shopping Mall',
      value: 'RWF 3.9M',
      stage: 'Qualification',
      salesRep: 'Dr. Sarah Uwamahoro',
      expectedClose: '2024-03-01',
      probability: 40,
      lastActivity: '2024-01-11'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Deal Closed',
      description: 'Kigali Business Center Expansion',
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 14:30',
      value: 'RWF 8.5M'
    },
    {
      id: 2,
      type: 'Proposal Sent',
      description: 'Musanze Hotel Security Upgrade',
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-15 13:45',
      value: 'RWF 6.2M'
    },
    {
      id: 3,
      type: 'Meeting Scheduled',
      description: 'Huye University Campus Security',
      user: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 12:20',
      value: 'RWF 4.8M'
    },
    {
      id: 4,
      type: 'Lead Qualified',
      description: 'Rubavu Manufacturing Facility',
      user: 'Alexis Nkurunziza',
      timestamp: '2024-01-15 11:15',
      value: 'RWF 5.5M'
    },
    {
      id: 5,
      type: 'Follow-up Call',
      description: 'Kigali Shopping Mall Security',
      user: 'Dr. Sarah Uwamahoro',
      timestamp: '2024-01-15 10:30',
      value: 'RWF 3.9M'
    }
  ];

  const salesRegions = [
    { region: 'Kigali', revenue: 'RWF 12.5M', deals: 18, conversion: 75.2, color: 'bg-blue-100 text-blue-800' },
    { region: 'Huye', revenue: 'RWF 6.8M', deals: 12, conversion: 68.5, color: 'bg-green-100 text-green-800' },
    { region: 'Rubavu', revenue: 'RWF 5.2M', deals: 8, conversion: 72.1, color: 'bg-purple-100 text-purple-800' },
    { region: 'Musanze', revenue: 'RWF 4.0M', deals: 7, conversion: 65.3, color: 'bg-orange-100 text-orange-800' }
  ];

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Discovery': return 'bg-blue-100 text-blue-800';
      case 'Qualification': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Deal Closed': return 'bg-green-100 text-green-800';
      case 'Proposal Sent': return 'bg-blue-100 text-blue-800';
      case 'Meeting Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Lead Qualified': return 'bg-orange-100 text-orange-800';
      case 'Follow-up Call': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sales Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesStats.map((stat, index) => (
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

      {/* Sales Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common sales tasks"
        color="blue"
        icon="📈"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add deal')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Schedule meeting')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Send proposal')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Send Proposal
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Sales Regions */}
      <AnimatedCard
        title="Sales by Region"
        subtitle="Performance by geographic area"
        color="green"
        icon="🌍"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {salesRegions.map((region, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${region.color}`}>
                {region.region}
              </div>
              <div className="text-2xl font-bold text-gray-900">{region.revenue}</div>
              <div className="text-xs text-gray-500">{region.deals} deals • {region.conversion}% conversion</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Deals */}
      <AnimatedCard
        title="Top Deals"
        subtitle="Highest value opportunities"
        color="orange"
        icon="🏆"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rep</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                    <div className="text-xs text-gray-500">Last activity: {deal.lastActivity}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.client}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{deal.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageBadge(deal.stage)}`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.salesRep}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.expectedClose}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.probability}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-600 h-1 rounded-full" 
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
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

      {/* Recent Activities */}
      <AnimatedCard
        title="Recent Activities"
        subtitle="Latest sales activities"
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
                  {activity.user} • {activity.timestamp} • {activity.value}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Sales Metrics */}
      <AnimatedCard
        title="Sales Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">68.5%</div>
            <div className="text-sm text-green-600">Conversion Rate</div>
            <AnimatedProgressBar progress={68.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 28.5M</div>
            <div className="text-sm text-blue-600">Total Revenue</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">45</div>
            <div className="text-sm text-purple-600">Deals Closed</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SalesOverview;
