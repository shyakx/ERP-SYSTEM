import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const FinancialReports: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const reportData = [
    {
      id: 1,
      name: 'Monthly Financial Summary',
      type: 'Monthly',
      status: 'Generated',
      generatedBy: 'Jean Pierre Uwimana',
      generatedDate: '2024-02-01',
      lastUpdated: '2024-02-01',
      size: '3.2 MB',
      downloads: 18,
      avatar: 'JP'
    },
    {
      id: 2,
      name: 'Quarterly P&L Statement',
      type: 'Quarterly',
      status: 'Pending',
      generatedBy: 'Finance Manager',
      generatedDate: '2024-01-15',
      lastUpdated: '2024-01-30',
      size: '4.8 MB',
      downloads: 12,
      avatar: 'FM'
    },
    {
      id: 3,
      name: 'Annual Balance Sheet',
      type: 'Annual',
      status: 'Generated',
      generatedBy: 'Marie Claire Niyonsaba',
      generatedDate: '2024-01-31',
      lastUpdated: '2024-01-31',
      size: '6.1 MB',
      downloads: 25,
      avatar: 'MC'
    },
    {
      id: 4,
      name: 'Cash Flow Statement',
      type: 'Monthly',
      status: 'Generated',
      generatedBy: 'Jean Pierre Uwimana',
      generatedDate: '2024-02-01',
      lastUpdated: '2024-02-01',
      size: '2.5 MB',
      downloads: 15,
      avatar: 'JP'
    },
    {
      id: 5,
      name: 'Budget vs Actual Report',
      type: 'Monthly',
      status: 'In Progress',
      generatedBy: 'Finance Manager',
      generatedDate: '2024-01-20',
      lastUpdated: '2024-02-10',
      size: '5.3 MB',
      downloads: 8,
      avatar: 'FM'
    }
  ];

  const reportStats = [
    { title: 'Total Reports', value: 67, subtitle: 'This Quarter', color: 'blue', icon: '📊', trend: { value: '+15%', isPositive: true }, delay: 0 },
    { title: 'Generated', value: 52, subtitle: 'Reports Ready', color: 'green', icon: '✅', trend: { value: '78%', isPositive: true }, delay: 100 },
    { title: 'Pending', value: 8, subtitle: 'Awaiting Generation', color: 'orange', icon: '⏳', trend: { value: '12%', isPositive: false }, delay: 200 },
    { title: 'Downloads', value: 234, subtitle: 'This Month', color: 'purple', icon: '📥', trend: { value: '+22%', isPositive: true }, delay: 300 }
  ];

  const reportTypes = [
    { type: 'Monthly Reports', count: 35, color: 'blue', icon: '📅' },
    { type: 'Quarterly Reports', count: 18, color: 'green', icon: '📊' },
    { type: 'Annual Reports', count: 4, color: 'purple', icon: '📈' },
    { type: 'Ad-hoc Reports', count: 10, color: 'orange', icon: '📋' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Monthly': return 'bg-blue-100 text-blue-800';
      case 'Quarterly': return 'bg-green-100 text-green-800';
      case 'Annual': return 'bg-purple-100 text-purple-800';
      case 'Ad-hoc': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Report Stats */}
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

      {/* Financial Reports Table */}
      <AnimatedCard
        title="Financial Reports"
        subtitle="Generated and pending financial reports"
        color="green"
        icon="📊"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Report</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Generated By</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Downloads</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.map((report, index) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-xs">{report.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-900">{report.generatedBy}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{report.downloads}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <AnimatedButton
                        color="green"
                        size="sm"
                        onClick={() => console.log(`View report: ${report.name}`)}
                      >
                        View
                      </AnimatedButton>
                      <AnimatedButton
                        color="blue"
                        size="sm"
                        onClick={() => console.log(`Download report: ${report.name}`)}
                      >
                        Download
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Report Categories and Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Report Categories"
          subtitle="Types of financial reports and their counts"
          color="blue"
          icon="📋"
          delay={600}
        >
          <div className="space-y-3">
            {reportTypes.map((category, index) => (
              <div
                key={category.type}
                className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{category.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{category.type}</h4>
                      <p className="text-xs text-gray-500">{category.count} reports</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Recent Reports"
          subtitle="Latest generated financial reports"
          color="purple"
          icon="📄"
          delay={800}
        >
          <div className="space-y-3">
            {reportData.slice(0, 3).map((report, index) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-xs">{report.avatar}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.generatedDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-600">Downloads</p>
                  <p className="text-xs text-gray-900">{report.downloads}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Report Templates and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Report Templates"
          subtitle="Predefined financial report templates"
          color="indigo"
          icon="📝"
          delay={1000}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">P&L Statement Template</h4>
              <p className="text-xs text-gray-700 mb-2">Monthly and quarterly profit & loss analysis</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Last Used</span>
                <span className="text-indigo-600 font-medium">2024-01-15</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Balance Sheet Template</h4>
              <p className="text-xs text-gray-700 mb-2">Annual balance sheet with asset and liability details</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Last Used</span>
                <span className="text-indigo-600 font-medium">2024-01-31</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Cash Flow Template</h4>
              <p className="text-xs text-gray-700 mb-2">Monthly cash flow statement and analysis</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Last Used</span>
                <span className="text-indigo-600 font-medium">2024-02-01</span>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common financial reporting tasks"
          color="orange"
          icon="⚡"
          delay={1200}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Generate monthly financial summary')}
            >
              📊 Monthly Summary
            </AnimatedButton>
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Generate P&L statement')}
            >
              📈 P&L Statement
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate balance sheet')}
            >
              📋 Balance Sheet
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Schedule automated reports')}
            >
              ⏰ Schedule Reports
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Report Analytics */}
      <AnimatedCard
        title="Report Analytics"
        subtitle="Financial reporting trends and insights"
        color="teal"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Report Generation Rate</span>
              <span className="text-xs font-semibold text-gray-900">78%</span>
            </div>
            <AnimatedProgressBar progress={78} color="green" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Average Generation Time</span>
              <span className="text-xs font-semibold text-gray-900">3.1 minutes</span>
            </div>
            <AnimatedProgressBar progress={77} color="blue" height={6} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Download Rate</span>
              <span className="text-xs font-semibold text-gray-900">89%</span>
            </div>
            <AnimatedProgressBar progress={89} color="purple" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">User Satisfaction</span>
              <span className="text-xs font-semibold text-gray-900">4.2/5.0</span>
            </div>
            <AnimatedProgressBar progress={84} color="orange" height={6} />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default FinancialReports; 