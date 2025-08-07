import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const FinancialReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('all');

  const reportStats = [
    { title: 'Total Reports', value: '24', subtitle: 'Generated', color: 'blue', icon: '📊', trend: { value: '+3', isPositive: true }, delay: 0 },
    { title: 'This Month', value: '8', subtitle: 'Reports', color: 'green', icon: '📅', trend: { value: '+2', isPositive: true }, delay: 100 },
    { title: 'Scheduled', value: '5', subtitle: 'Auto Reports', color: 'purple', icon: '⏰', trend: { value: '+1', isPositive: true }, delay: 200 },
    { title: 'Exported', value: '156', subtitle: 'Files', color: 'orange', icon: '📁', trend: { value: '+12', isPositive: true }, delay: 300 }
  ];

  const reportTypes = [
    { id: 1, name: 'Income Statement', category: 'Profitability', frequency: 'Monthly', lastGenerated: '2024-02-15', status: 'Available', icon: '📈' },
    { id: 2, name: 'Balance Sheet', category: 'Financial Position', frequency: 'Monthly', lastGenerated: '2024-02-15', status: 'Available', icon: '⚖️' },
    { id: 3, name: 'Cash Flow Statement', category: 'Liquidity', frequency: 'Monthly', lastGenerated: '2024-02-15', status: 'Available', icon: '💧' },
    { id: 4, name: 'Budget vs Actual', category: 'Performance', frequency: 'Monthly', lastGenerated: '2024-02-15', status: 'Available', icon: '📊' },
    { id: 5, name: 'Accounts Receivable', category: 'Collections', frequency: 'Weekly', lastGenerated: '2024-02-18', status: 'Available', icon: '💰' },
    { id: 6, name: 'Accounts Payable', category: 'Payments', frequency: 'Weekly', lastGenerated: '2024-02-18', status: 'Available', icon: '💸' },
    { id: 7, name: 'Tax Summary', category: 'Compliance', frequency: 'Quarterly', lastGenerated: '2024-01-31', status: 'Available', icon: '📋' },
    { id: 8, name: 'Department Analysis', category: 'Performance', frequency: 'Monthly', lastGenerated: '2024-02-15', status: 'Available', icon: '🏢' }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Income Statement - January 2024',
      type: 'Income Statement',
      generatedBy: 'Finance Team',
      date: '2024-02-15',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Balance Sheet - January 2024',
      type: 'Balance Sheet',
      generatedBy: 'Finance Team',
      date: '2024-02-15',
      size: '1.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      name: 'Cash Flow - January 2024',
      type: 'Cash Flow Statement',
      generatedBy: 'Finance Team',
      date: '2024-02-15',
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      id: 4,
      name: 'Budget vs Actual - January 2024',
      type: 'Budget vs Actual',
      generatedBy: 'Finance Team',
      date: '2024-02-15',
      size: '3.1 MB',
      format: 'PDF'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Processing': return 'text-blue-600 bg-blue-100';
      case 'Scheduled': return 'text-purple-600 bg-purple-100';
      case 'Error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return 'text-red-600 bg-red-100';
      case 'Excel': return 'text-green-600 bg-green-100';
      case 'CSV': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Generate and manage financial reports and analytics</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Generate Report
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
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

      {/* Report Types */}
      <AnimatedCard
        title="Report Types"
        subtitle="Available financial reports and their status"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{report.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{report.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{report.category}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>Frequency: {report.frequency}</p>
                <p>Last: {report.lastGenerated}</p>
              </div>
              <div className="mt-3 flex space-x-2">
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-xs"
                >
                  Generate
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-green-600 hover:text-green-900 text-xs"
                >
                  Schedule
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Recent Reports */}
      <AnimatedCard
        title="Recent Reports"
        subtitle="Recently generated financial reports"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">📊</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-500">{report.type} • {report.generatedBy}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{report.date}</p>
                <p className="text-xs text-gray-500">{report.size}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(report.format)}`}>
                  {report.format}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Download
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Report Generation */}
      <AnimatedCard
        title="Report Generation"
        subtitle="Quick report generation and scheduling"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">⏰</span>
            <span className="text-sm font-medium text-gray-700">Schedule Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📁</span>
            <span className="text-sm font-medium text-gray-700">Export Data</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">⚙️</span>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Report Analytics */}
      <AnimatedCard
        title="Report Analytics"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Report Generation</h4>
            <AnimatedProgressBar
              progress={85}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={72}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Report Usage</h4>
            <AnimatedProgressBar
              progress={78}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={65}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default FinancialReports;
