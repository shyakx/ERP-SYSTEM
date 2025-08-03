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
  XCircle,
  TrendingDown,
  PieChart,
  Users,
  Phone,
  Mail,
  Star,
  Award,
  Database,
  Filter as FilterIcon,
  FileText as FileTextIcon,
  Clock as ClockIcon,
  AlertCircle as AlertCircleIcon,
  MessageSquare,
  Headphones,
  HelpCircle,
  CreditCard,
  Receipt,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from 'lucide-react';

const Analytics: React.FC = () => {
  const colorScheme = getColorScheme('client-management');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const analyticsStats = [
    { title: 'Client Growth', value: '+12.5%', subtitle: 'This month', color: 'blue', icon: '📈', trend: { value: '+2.1%', isPositive: true }, delay: 0 },
    { title: 'Revenue Growth', value: '+8.2%', subtitle: 'Monthly increase', color: 'green', icon: '💰', trend: { value: '+1.8%', isPositive: true }, delay: 100 },
    { title: 'Satisfaction Score', value: '94.2%', subtitle: 'Client satisfaction', color: 'orange', icon: '😊', trend: { value: '+1.5%', isPositive: true }, delay: 200 },
    { title: 'Retention Rate', value: '96.8%', subtitle: 'Client retention', color: 'purple', icon: '🔄', trend: { value: '+0.8%', isPositive: true }, delay: 300 }
  ];

  const topPerformers = [
    {
      id: 1,
      client: 'Kigali Business Center',
      revenue: 'RWF 4.2M',
      growth: '+15.2%',
      satisfaction: 98,
      retention: 100,
      trend: 'up'
    },
    {
      id: 2,
      client: 'Musanze Hotel & Resort',
      revenue: 'RWF 3.8M',
      growth: '+12.8%',
      satisfaction: 96,
      retention: 100,
      trend: 'up'
    },
    {
      id: 3,
      client: 'Huye University',
      revenue: 'RWF 2.5M',
      growth: '+8.5%',
      satisfaction: 92,
      retention: 95,
      trend: 'stable'
    },
    {
      id: 4,
      client: 'Rubavu Manufacturing',
      revenue: 'RWF 3.1M',
      growth: '+6.2%',
      satisfaction: 95,
      retention: 98,
      trend: 'up'
    },
    {
      id: 5,
      client: 'Kigali Shopping Mall',
      revenue: 'RWF 2.8M',
      growth: '-2.1%',
      satisfaction: 89,
      retention: 92,
      trend: 'down'
    }
  ];

  const clientSegments = [
    { segment: 'Premium', count: 45, revenue: 'RWF 18.2M', growth: '+12.5%', color: 'bg-blue-100 text-blue-800' },
    { segment: 'Standard', count: 89, revenue: 'RWF 12.8M', growth: '+8.2%', color: 'bg-green-100 text-green-800' },
    { segment: 'Basic', count: 113, revenue: 'RWF 8.5M', growth: '+5.1%', color: 'bg-purple-100 text-purple-800' }
  ];

  const monthlyTrends = [
    { month: 'Jan 2024', clients: 235, revenue: 'RWF 25.2M', satisfaction: 92.5 },
    { month: 'Feb 2024', clients: 242, revenue: 'RWF 26.8M', satisfaction: 93.1 },
    { month: 'Mar 2024', clients: 248, revenue: 'RWF 27.5M', satisfaction: 93.8 },
    { month: 'Apr 2024', clients: 251, revenue: 'RWF 28.1M', satisfaction: 94.2 },
    { month: 'May 2024', clients: 247, revenue: 'RWF 28.5M', satisfaction: 94.2 }
  ];

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'up': return 'bg-green-100 text-green-800';
      case 'down': return 'bg-red-100 text-red-800';
      case 'stable': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="w-4 h-4" />;
      case 'down': return <TrendingDownIcon className="w-4 h-4" />;
      case 'stable': return <BarChart3 className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats.map((stat, index) => (
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

      {/* Analytics Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common analytics tasks"
        color="blue"
        icon="📊"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Export data')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Create dashboard')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Create Dashboard
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Schedule report')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Client Segments */}
      <AnimatedCard
        title="Client Segments"
        subtitle="Performance by client tier"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clientSegments.map((segment, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${segment.color}`}>
                {segment.segment}
              </div>
              <div className="text-2xl font-bold text-gray-900">{segment.count}</div>
              <div className="text-xs text-gray-500">{segment.revenue}</div>
              <div className="text-xs text-green-600">{segment.growth}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Performers */}
      <AnimatedCard
        title="Top Performers"
        subtitle="Best performing clients"
        color="orange"
        icon="🏆"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformers.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.client}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.revenue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      client.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {client.growth}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.satisfaction}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-600 h-1 rounded-full" 
                        style={{ width: `${client.satisfaction}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.retention}%</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrendBadge(client.trend)}`}>
                      {getTrendIcon(client.trend)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <TrendingUpIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Monthly Trends */}
      <AnimatedCard
        title="Monthly Trends"
        subtitle="Performance over time"
        color="green"
        icon="📈"
        delay={1000}
      >
        <div className="space-y-3">
          {monthlyTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{trend.month}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {trend.clients} clients • {trend.revenue} • Satisfaction: {trend.satisfaction}%
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900">{trend.clients}</span>
                <span className="text-sm text-gray-500">→</span>
                <span className="text-sm font-medium text-gray-900">{trend.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Analytics Metrics */}
      <AnimatedCard
        title="Analytics Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📊"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-green-600">Satisfaction Score</div>
            <AnimatedProgressBar progress={94.2} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">+12.5%</div>
            <div className="text-sm text-blue-600">Client Growth</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">96.8%</div>
            <div className="text-sm text-purple-600">Retention Rate</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Analytics;
