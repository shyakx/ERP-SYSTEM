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
  PieChart,
  TrendingDown
} from 'lucide-react';

const Reports: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedReport, setSelectedReport] = useState('all');

  const reportStats = [
    { title: 'Total Reports', value: '24', subtitle: 'Generated this month', color: 'blue', icon: '📊', trend: { value: '+3', isPositive: true }, delay: 0 },
    { title: 'Scheduled', value: '8', subtitle: 'Automated reports', color: 'green', icon: '📅', trend: { value: '+1', isPositive: true }, delay: 100 },
    { title: 'Custom', value: '16', subtitle: 'On-demand reports', color: 'purple', icon: '📋', trend: { value: '+2', isPositive: true }, delay: 200 },
    { title: 'Downloads', value: '156', subtitle: 'Report downloads', color: 'orange', icon: '⬇️', trend: { value: '+12', isPositive: true }, delay: 300 }
  ];

  const inventoryReports = [
    {
      id: 1,
      name: 'Monthly Inventory Report',
      type: 'Scheduled',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15',
      nextGeneration: '2024-02-15',
      status: 'Generated',
      size: '2.4 MB',
      downloads: 45,
      description: 'Comprehensive inventory status and valuation report'
    },
    {
      id: 2,
      name: 'Stock Movement Analysis',
      type: 'Custom',
      frequency: 'Weekly',
      lastGenerated: '2024-01-14',
      nextGeneration: '2024-01-21',
      status: 'Generated',
      size: '1.8 MB',
      downloads: 32,
      description: 'Detailed analysis of stock in/out movements'
    },
    {
      id: 3,
      name: 'Low Stock Alert Report',
      type: 'Scheduled',
      frequency: 'Daily',
      lastGenerated: '2024-01-15',
      nextGeneration: '2024-01-16',
      status: 'Generated',
      size: '0.5 MB',
      downloads: 28,
      description: 'Items below minimum stock levels'
    },
    {
      id: 4,
      name: 'Asset Depreciation Report',
      type: 'Custom',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-10',
      nextGeneration: '2024-04-10',
      status: 'Generated',
      size: '3.2 MB',
      downloads: 18,
      description: 'Asset value depreciation and maintenance costs'
    },
    {
      id: 5,
      name: 'Procurement Summary',
      type: 'Scheduled',
      frequency: 'Monthly',
      lastGenerated: '2024-01-12',
      nextGeneration: '2024-02-12',
      status: 'Generated',
      size: '1.6 MB',
      downloads: 25,
      description: 'Purchase orders and supplier performance'
    }
  ];

  const reportCategories = [
    { category: 'Inventory', count: 8, color: 'bg-blue-100 text-blue-800' },
    { category: 'Stock Movement', count: 5, color: 'bg-green-100 text-green-800' },
    { category: 'Asset Management', count: 6, color: 'bg-purple-100 text-purple-800' },
    { category: 'Procurement', count: 4, color: 'bg-orange-100 text-orange-800' },
    { category: 'Maintenance', count: 1, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const recentDownloads = [
    {
      id: 1,
      report: 'Monthly Inventory Report',
      user: 'Jean Pierre Uwimana',
      downloadDate: '2024-01-15 14:30',
      fileSize: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      report: 'Stock Movement Analysis',
      user: 'Marie Claire Niyonsaba',
      downloadDate: '2024-01-15 13:45',
      fileSize: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 3,
      report: 'Low Stock Alert Report',
      user: 'Patrick Nshimiyimana',
      downloadDate: '2024-01-15 12:20',
      fileSize: '0.5 MB',
      format: 'PDF'
    },
    {
      id: 4,
      report: 'Asset Depreciation Report',
      user: 'Emmanuel Ndayisaba',
      downloadDate: '2024-01-15 11:15',
      fileSize: '3.2 MB',
      format: 'Excel'
    },
    {
      id: 5,
      report: 'Procurement Summary',
      user: 'Alexis Nkurunziza',
      downloadDate: '2024-01-15 10:30',
      fileSize: '1.6 MB',
      format: 'PDF'
    }
  ];

  const reportMetrics = [
    {
      name: 'Inventory Value',
      current: 'RWF 45.2M',
      previous: 'RWF 42.8M',
      change: '+5.6%',
      trend: 'up'
    },
    {
      name: 'Stock Turnover',
      current: '2.3 days',
      previous: '2.5 days',
      change: '+8.7%',
      trend: 'up'
    },
    {
      name: 'Asset Utilization',
      current: '94.6%',
      previous: '92.1%',
      change: '+2.5%',
      trend: 'up'
    },
    {
      name: 'Maintenance Cost',
      current: 'RWF 5.5M',
      previous: 'RWF 6.2M',
      change: '-11.3%',
      trend: 'down'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Custom': return 'bg-blue-100 text-blue-800';
      case 'On-Demand': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Excel': return 'bg-green-100 text-green-800';
      case 'CSV': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        title="Quick Actions"
        subtitle="Common reporting tasks"
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
            onClick={() => console.log('Schedule report')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Export data')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Custom report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Custom Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Report Categories */}
      <AnimatedCard
        title="Report Categories"
        subtitle="Distribution by report type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {reportCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">reports</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Inventory Reports */}
      <AnimatedCard
        title="Inventory Reports"
        subtitle="Available reports and their status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                    <div className="text-xs text-gray-500">{report.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.frequency}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.lastGenerated}</div>
                    <div className="text-xs text-gray-500">Next: {report.nextGeneration}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.downloads}</div>
                    <div className="text-xs text-gray-500">{report.size}</div>
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

      {/* Recent Downloads */}
      <AnimatedCard
        title="Recent Downloads"
        subtitle="Latest report downloads"
        color="green"
        icon="📊"
        delay={1000}
      >
        <div className="space-y-3">
          {recentDownloads.map((download) => (
            <div key={download.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{download.report}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFormatBadge(download.format)}`}>
                    {download.format}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {download.user} • {download.downloadDate} • {download.fileSize}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Download</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Report Metrics */}
      <AnimatedCard
        title="Key Metrics"
        subtitle="Performance indicators from reports"
        color="purple"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.current}</p>
                  <p className="text-xs text-gray-500">vs {metric.previous}</p>
                </div>
                <div className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Report Analytics */}
      <AnimatedCard
        title="Report Analytics"
        subtitle="Usage and performance metrics"
        color="green"
        icon="📊"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-green-600">Total Downloads</div>
            <AnimatedProgressBar progress={85} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-blue-600">Reports Generated</div>
            <AnimatedProgressBar progress={78} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-sm text-purple-600">Scheduled Reports</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Reports;
