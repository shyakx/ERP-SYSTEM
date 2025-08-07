import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const TaxManagement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024');

  const taxStats = [
    { title: 'Total Tax Liability', value: '12.8M RWF', subtitle: 'This Year', color: 'red', icon: '💰', trend: { value: '+5.2%', isPositive: false }, delay: 0 },
    { title: 'Tax Paid', value: '8.5M RWF', subtitle: 'This Year', color: 'green', icon: '✅', trend: { value: '+12%', isPositive: true }, delay: 100 },
    { title: 'Pending Filings', value: '3', subtitle: 'Due Soon', color: 'orange', icon: '📋', trend: { value: '-1', isPositive: true }, delay: 200 },
    { title: 'Compliance Score', value: '94%', subtitle: 'Overall', color: 'blue', icon: '📊', trend: { value: '+2%', isPositive: true }, delay: 300 }
  ];

  const taxCategories = [
    { id: 1, name: 'Corporate Income Tax', amount: 8500000, dueDate: '2024-03-31', status: 'Pending', rate: '30%', category: 'Direct Tax' },
    { id: 2, name: 'VAT', amount: 3200000, dueDate: '2024-02-28', status: 'Paid', rate: '18%', category: 'Indirect Tax' },
    { id: 3, name: 'Withholding Tax', amount: 1200000, dueDate: '2024-03-15', status: 'Pending', rate: '15%', category: 'Direct Tax' },
    { id: 4, name: 'Payroll Tax', amount: 450000, dueDate: '2024-02-25', status: 'Paid', rate: '5%', category: 'Employment Tax' },
    { id: 5, name: 'Property Tax', amount: 850000, dueDate: '2024-04-30', status: 'Pending', rate: '1%', category: 'Property Tax' }
  ];

  const recentFilings = [
    {
      id: 1,
      type: 'VAT Return',
      period: 'Q4 2023',
      dueDate: '2024-01-31',
      status: 'Filed',
      amount: 3200000,
      filingDate: '2024-01-28'
    },
    {
      id: 2,
      type: 'Corporate Tax',
      period: '2023',
      dueDate: '2024-03-31',
      status: 'Pending',
      amount: 8500000,
      filingDate: null
    },
    {
      id: 3,
      type: 'Withholding Tax',
      period: 'Q1 2024',
      dueDate: '2024-03-15',
      status: 'Draft',
      amount: 1200000,
      filingDate: null
    },
    {
      id: 4,
      type: 'Payroll Tax',
      period: 'January 2024',
      dueDate: '2024-02-25',
      status: 'Filed',
      amount: 450000,
      filingDate: '2024-02-20'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-orange-600 bg-orange-100';
      case 'Paid': return 'text-green-600 bg-green-100';
      case 'Filed': return 'text-blue-600 bg-blue-100';
      case 'Draft': return 'text-gray-600 bg-gray-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Management</h1>
          <p className="text-gray-600 mt-1">Manage tax calculations, filings, and compliance</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + New Filing
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxStats.map((stat, index) => (
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

      {/* Tax Categories */}
      <AnimatedCard
        title="Tax Categories"
        subtitle="Manage different types of taxes and their calculations"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taxCategories.map((tax) => (
                <tr key={tax.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tax.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{tax.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(tax.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{tax.rate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{tax.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tax.status)}`}>
                      {tax.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Calculate
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-green-600 hover:text-green-900"
                    >
                      File
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Filings */}
      <AnimatedCard
        title="Recent Filings"
        subtitle="Latest tax filings and their status"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentFilings.map((filing) => (
            <div
              key={filing.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">📋</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{filing.type}</p>
                  <p className="text-sm text-gray-500">Period: {filing.period}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(filing.amount)}</p>
                <p className="text-sm text-gray-500">Due: {filing.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(filing.status)}`}>
                  {filing.status}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Tax Compliance */}
      <AnimatedCard
        title="Tax Compliance"
        subtitle="Compliance monitoring and reporting"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Calculate Tax</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📋</span>
            <span className="text-sm font-medium text-gray-700">File Returns</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📈</span>
            <span className="text-sm font-medium text-gray-700">Compliance Report</span>
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

      {/* Tax Analytics */}
      <AnimatedCard
        title="Tax Analytics"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tax Trends</h4>
            <AnimatedProgressBar
              progress={75}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={60}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Compliance Status</h4>
            <AnimatedProgressBar
              progress={94}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
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

export default TaxManagement;
