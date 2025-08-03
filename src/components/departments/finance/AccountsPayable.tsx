import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const AccountsPayable: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const payableStats = [
    { title: 'Total Payables', value: '45.2M RWF', subtitle: 'Outstanding', color: 'red', icon: '💸', trend: { value: '+8%', isPositive: false }, delay: 0 },
    { title: 'Overdue Amount', value: '12.8M RWF', subtitle: 'Past Due', color: 'orange', icon: '⚠️', trend: { value: '+15%', isPositive: false }, delay: 100 },
    { title: 'This Month', value: '18.5M RWF', subtitle: 'Due', color: 'blue', icon: '📅', trend: { value: '+5%', isPositive: true }, delay: 200 },
    { title: 'Vendor Count', value: '156', subtitle: 'Active', color: 'green', icon: '🏢', trend: { value: '+3', isPositive: true }, delay: 300 }
  ];

  const vendorPayables = [
    {
      id: 1,
      vendor: 'Tech Solutions Ltd',
      invoice: 'INV-2024-001',
      amount: 2500000,
      dueDate: '2024-02-20',
      status: 'Pending',
      category: 'Equipment',
      daysOverdue: 0
    },
    {
      id: 2,
      vendor: 'Kigali Office Supplies',
      invoice: 'INV-2024-002',
      amount: 850000,
      dueDate: '2024-02-15',
      status: 'Overdue',
      category: 'Office Supplies',
      daysOverdue: 5
    },
    {
      id: 3,
      vendor: 'Security Equipment Co',
      invoice: 'INV-2024-003',
      amount: 3200000,
      dueDate: '2024-02-25',
      status: 'Pending',
      category: 'Security Equipment',
      daysOverdue: 0
    },
    {
      id: 4,
      vendor: 'Transport Services',
      invoice: 'INV-2024-004',
      amount: 1200000,
      dueDate: '2024-02-10',
      status: 'Overdue',
      category: 'Transportation',
      daysOverdue: 10
    },
    {
      id: 5,
      vendor: 'Insurance Providers',
      invoice: 'INV-2024-005',
      amount: 1800000,
      dueDate: '2024-02-28',
      status: 'Pending',
      category: 'Insurance',
      daysOverdue: 0
    }
  ];

  const paymentCategories = [
    { name: 'Equipment & Supplies', amount: 8500000, percentage: 35, color: 'blue' },
    { name: 'Office Expenses', amount: 3200000, percentage: 15, color: 'green' },
    { name: 'Transportation', amount: 2800000, percentage: 12, color: 'orange' },
    { name: 'Insurance', amount: 4500000, percentage: 20, color: 'purple' },
    { name: 'Utilities', amount: 2800000, percentage: 12, color: 'red' },
    { name: 'Other', amount: 1800000, percentage: 6, color: 'gray' }
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
      case 'Pending': return 'text-blue-600';
      case 'Overdue': return 'text-red-600';
      case 'Paid': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Accounts Payable Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {payableStats.map((stat, index) => (
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

      {/* Vendor Payables Table */}
      <AnimatedCard
        title="Vendor Payables"
        subtitle="Outstanding invoices and payments"
        color="red"
        icon="📋"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendorPayables.map((payable, index) => (
                <tr key={payable.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payable.vendor}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payable.invoice}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(payable.amount)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payable.dueDate}</div>
                    {payable.daysOverdue > 0 && (
                      <div className="text-xs text-red-600">{payable.daysOverdue} days overdue</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payable.status)}`}>
                      {payable.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payable.category}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">View</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Pay</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Payment Categories and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Payment Categories"
          subtitle="Breakdown by expense type"
          color="blue"
          icon="📊"
          delay={600}
        >
          <div className="space-y-3">
            {paymentCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(category.amount)}</div>
                  <div className="text-xs text-gray-500">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common payable tasks"
          color="green"
          icon="⚡"
          delay={800}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Create new payable')}
            >
              📄 Create Payable
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Process payment')}
            >
              💰 Process Payment
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate report')}
            >
              📊 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Review overdue')}
            >
              ⚠️ Review Overdue
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Payment Analytics */}
      <AnimatedCard
        title="Payment Analytics"
        subtitle="Performance metrics and trends"
        color="purple"
        icon="📈"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-blue-600">On-time Payments</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">12.8M</div>
            <div className="text-sm text-green-600">Overdue Amount</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-purple-600">Active Vendors</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AccountsPayable; 