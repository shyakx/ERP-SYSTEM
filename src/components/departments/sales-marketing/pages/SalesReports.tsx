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

const SalesReports: React.FC = () => {
  const colorScheme = getColorScheme('sales-marketing');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reportStats = [
    { title: 'Total Revenue', value: 'RWF 28.5M', subtitle: 'This month', color: 'blue', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 0 },
    { title: 'Deals Closed', value: '45', subtitle: 'Successful deals', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'Conversion Rate', value: '68.5%', subtitle: 'Lead to deal', color: 'orange', icon: '📊', trend: { value: '+3.2%', isPositive: true }, delay: 200 },
    { title: 'Avg Deal Size', value: 'RWF 2.8M', subtitle: 'Per deal', color: 'purple', icon: '📈', trend: { value: '+0.3M', isPositive: true }, delay: 300 }
  ];

  const salesReports = [
    {
      id: 1,
      name: 'Monthly Sales Performance',
      type: 'Performance Report',
      period: 'January 2024',
      generatedBy: 'Marie Claire Niyonsaba',
      status: 'Completed',
      size: '2.4 MB',
      lastUpdated: '2024-01-15',
      description: 'Comprehensive monthly sales performance analysis'
    },
    {
      id: 2,
      name: 'Q4 2023 Sales Summary',
      type: 'Quarterly Report',
      period: 'Q4 2023',
      generatedBy: 'Patrick Nshimiyimana',
      status: 'Completed',
      size: '3.1 MB',
      lastUpdated: '2024-01-10',
      description: 'Quarterly sales summary and analysis'
    },
    {
      id: 3,
      name: 'Lead Conversion Analysis',
      type: 'Analytics Report',
      period: 'December 2023',
      generatedBy: 'Emmanuel Ndayisaba',
      status: 'In Progress',
      size: '1.8 MB',
      lastUpdated: '2024-01-12',
      description: 'Lead conversion rates and funnel analysis'
    },
    {
      id: 4,
      name: 'Sales Pipeline Forecast',
      type: 'Forecast Report',
      period: 'Q1 2024',
      generatedBy: 'Alexis Nkurunziza',
      status: 'Scheduled',
      size: '2.7 MB',
      lastUpdated: '2024-01-08',
      description: 'Sales pipeline forecast and projections'
    },
    {
      id: 5,
      name: 'Customer Acquisition Cost',
      type: 'Cost Analysis',
      period: 'January 2024',
      generatedBy: 'Dr. Sarah Uwamahoro',
      status: 'Completed',
      size: '1.5 MB',
      lastUpdated: '2024-01-14',
      description: 'Customer acquisition cost analysis'
    }
  ];

  const reportTypes = [
    { type: 'Performance Report', count: 12, avgSize: '2.4 MB', color: 'bg-blue-100 text-blue-800' },
    { type: 'Quarterly Report', count: 4, avgSize: '3.1 MB', color: 'bg-green-100 text-green-800' },
    { type: 'Analytics Report', count: 8, avgSize: '1.8 MB', color: 'bg-purple-100 text-purple-800' },
    { type: 'Forecast Report', count: 6, avgSize: '2.7 MB', color: 'bg-orange-100 text-orange-800' },
    { type: 'Cost Analysis', count: 5, avgSize: '1.5 MB', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const topPerformers = [
    {
      id: 1,
      name: 'Marie Claire Niyonsaba',
      role: 'Senior Sales Manager',
      revenue: 'RWF 8.5M',
      deals: 12,
      conversionRate: 75.2,
      region: 'Kigali',
      performance: 95
    },
    {
      id: 2,
      name: 'Patrick Nshimiyimana',
      role: 'Sales Representative',
      revenue: 'RWF 6.2M',
      deals: 9,
      conversionRate: 68.5,
      region: 'Huye',
      performance: 88
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      role: 'Account Manager',
      revenue: 'RWF 5.8M',
      deals: 8,
      conversionRate: 72.1,
      region: 'Rubavu',
      performance: 85
    },
    {
      id: 4,
      name: 'Alexis Nkurunziza',
      role: 'Sales Representative',
      revenue: 'RWF 4.9M',
      deals: 7,
      conversionRate: 65.3,
      region: 'Musanze',
      performance: 82
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    const typeData = reportTypes.find(t => t.type === type);
    return typeData ? typeData.color : 'bg-gray-100 text-gray-800';
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
        title="Report Management"
        subtitle="Sales report operations"
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

      {/* Report Types */}
      <AnimatedCard
        title="Report Types"
        subtitle="Distribution by report category"
        color="green"
        icon="📋"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {reportTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">Avg: {type.avgSize}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Performers */}
      <AnimatedCard
        title="Top Sales Performers"
        subtitle="Best performing sales representatives"
        color="orange"
        icon="🏆"
        delay={800}
      >
        <div className="space-y-4">
          {topPerformers.map((performer) => (
            <div key={performer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  {performer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{performer.name}</div>
                  <div className="text-xs text-gray-500">{performer.role} • {performer.region}</div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{performer.revenue}</div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{performer.deals}</div>
                  <div className="text-xs text-gray-500">Deals</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{performer.conversionRate}%</div>
                  <div className="text-xs text-gray-500">Conversion</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{performer.performance}%</div>
                  <div className="text-xs text-gray-500">Performance</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Reports Table */}
      <AnimatedCard
        title="Sales Reports"
        subtitle="All generated reports"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesReports.map((report) => (
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
                    <div className="text-sm text-gray-900">{report.period}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.generatedBy}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.size}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.lastUpdated}</div>
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
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
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

      {/* Report Metrics */}
      <AnimatedCard
        title="Report Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">35</div>
            <div className="text-sm text-green-600">Total Reports</div>
            <AnimatedProgressBar progress={85} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 28.5M</div>
            <div className="text-sm text-blue-600">Total Revenue</div>
            <AnimatedProgressBar progress={92} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">68.5%</div>
            <div className="text-sm text-purple-600">Conversion Rate</div>
            <AnimatedProgressBar progress={68.5} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SalesReports; 