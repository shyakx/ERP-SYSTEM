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
  PieChart
} from 'lucide-react';

const InventoryAnalytics: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const analyticsStats = [
    { title: 'Turnover Rate', value: '2.3', subtitle: 'Days average', color: 'blue', icon: '🔄', trend: { value: '-0.2', isPositive: true }, delay: 0 },
    { title: 'Stock Accuracy', value: '98.5%', subtitle: 'Inventory precision', color: 'green', icon: '📊', trend: { value: '+0.5%', isPositive: true }, delay: 100 },
    { title: 'Carrying Cost', value: 'RWF 2.1M', subtitle: 'Monthly cost', color: 'orange', icon: '💰', trend: { value: '-5.2%', isPositive: true }, delay: 200 },
    { title: 'Fill Rate', value: '94.2%', subtitle: 'Order fulfillment', color: 'purple', icon: '📦', trend: { value: '+1.8%', isPositive: true }, delay: 300 }
  ];

  const topPerformers = [
    {
      id: 1,
      item: 'Security Cameras (HD)',
      category: 'Electronics',
      turnoverRate: 1.8,
      stockAccuracy: 99.2,
      value: 'RWF 12.5M',
      trend: 'up'
    },
    {
      id: 2,
      item: 'Guard Uniforms',
      category: 'Apparel',
      turnoverRate: 2.1,
      stockAccuracy: 97.8,
      value: 'RWF 3.2M',
      trend: 'up'
    },
    {
      id: 3,
      item: 'Safety Equipment',
      category: 'Safety',
      turnoverRate: 2.5,
      stockAccuracy: 98.5,
      value: 'RWF 8.7M',
      trend: 'stable'
    },
    {
      id: 4,
      item: 'Walkie Talkies',
      category: 'Communication',
      turnoverRate: 3.2,
      stockAccuracy: 95.1,
      value: 'RWF 4.1M',
      trend: 'down'
    },
    {
      id: 5,
      item: 'Security Barriers',
      category: 'Infrastructure',
      turnoverRate: 4.1,
      stockAccuracy: 96.3,
      value: 'RWF 6.8M',
      trend: 'stable'
    }
  ];

  const categoryAnalytics = [
    { category: 'Electronics', items: 450, value: 'RWF 18.2M', turnover: 1.8, accuracy: 99.2, trend: 'up' },
    { category: 'Apparel', items: 320, value: 'RWF 5.8M', turnover: 2.1, accuracy: 97.8, trend: 'up' },
    { category: 'Safety', items: 420, value: 'RWF 9.2M', turnover: 2.5, accuracy: 98.5, trend: 'stable' },
    { category: 'Communication', items: 180, value: 'RWF 7.5M', turnover: 3.2, accuracy: 95.1, trend: 'down' },
    { category: 'Infrastructure', items: 95, value: 'RWF 4.5M', turnover: 4.1, accuracy: 96.3, trend: 'stable' }
  ];

  const demandForecast = [
    { month: 'Jan 2024', forecast: 1250, actual: 1280, accuracy: 97.7 },
    { month: 'Feb 2024', forecast: 1180, actual: 1150, accuracy: 97.5 },
    { month: 'Mar 2024', forecast: 1320, actual: 1350, accuracy: 97.8 },
    { month: 'Apr 2024', forecast: 1400, actual: 1380, accuracy: 98.6 },
    { month: 'May 2024', forecast: 1280, actual: 1300, accuracy: 98.5 }
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
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
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

      {/* Category Analytics */}
      <AnimatedCard
        title="Category Analytics"
        subtitle="Performance by category"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryAnalytics.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${getTrendBadge(category.trend)}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.items}</div>
              <div className="text-xs text-gray-500">{category.value}</div>
              <div className="text-xs text-gray-500">Turnover: {category.turnover} days</div>
              <div className="text-xs text-gray-500">Accuracy: {category.accuracy}%</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Performers */}
      <AnimatedCard
        title="Top Performers"
        subtitle="Best performing inventory items"
        color="orange"
        icon="🏆"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnover Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Accuracy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.item}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.turnoverRate} days</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.stockAccuracy}%</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrendBadge(item.trend)}`}>
                      {getTrendIcon(item.trend)} {item.trend}
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
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Demand Forecast */}
      <AnimatedCard
        title="Demand Forecast"
        subtitle="Forecast vs actual demand"
        color="green"
        icon="📈"
        delay={1000}
      >
        <div className="space-y-3">
          {demandForecast.map((forecast, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{forecast.month}</span>
                  <span className="text-xs text-gray-500">Accuracy: {forecast.accuracy}%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Forecast: {forecast.forecast} • Actual: {forecast.actual}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-900">{forecast.forecast}</span>
                <span className="text-sm text-gray-500">→</span>
                <span className="text-sm font-medium text-gray-900">{forecast.actual}</span>
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
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-sm text-green-600">Stock Accuracy</div>
            <AnimatedProgressBar progress={98.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3 days</div>
            <div className="text-sm text-blue-600">Avg Turnover</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">94.2%</div>
            <div className="text-sm text-purple-600">Fill Rate</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default InventoryAnalytics; 