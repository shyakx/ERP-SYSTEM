import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const AccountsReceivable: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const receivableStats = [
    { title: 'Total Receivables', value: '78.5M RWF', subtitle: 'Outstanding', color: 'green', icon: '💵', trend: { value: '+12%', isPositive: true }, delay: 0 },
    { title: 'Overdue Amount', value: '15.2M RWF', subtitle: 'Past Due', color: 'red', icon: '⚠️', trend: { value: '+8%', isPositive: false }, delay: 100 },
    { title: 'This Month', value: '25.8M RWF', subtitle: 'Expected', color: 'blue', icon: '📅', trend: { value: '+15%', isPositive: true }, delay: 200 },
    { title: 'Client Count', value: '89', subtitle: 'Active', color: 'purple', icon: '👥', trend: { value: '+5', isPositive: true }, delay: 300 }
  ];

  const clientReceivables = [
    {
      id: 1,
      client: 'Kigali Business Center',
      invoice: 'INV-2024-001',
      amount: 2500000,
      dueDate: '2024-02-20',
      status: 'Pending',
      service: 'Security Services',
      daysOverdue: 0
    },
    {
      id: 2,
      client: 'ABC Corporation',
      invoice: 'INV-2024-002',
      amount: 1800000,
      dueDate: '2024-02-15',
      status: 'Overdue',
      service: 'Monthly Contract',
      daysOverdue: 5
    },
    {
      id: 3,
      client: 'Rwanda Tech Solutions',
      invoice: 'INV-2024-003',
      amount: 3200000,
      dueDate: '2024-02-25',
      status: 'Pending',
      service: 'Security Equipment',
      daysOverdue: 0
    },
    {
      id: 4,
      client: 'Kigali Mall',
      invoice: 'INV-2024-004',
      amount: 4200000,
      dueDate: '2024-02-10',
      status: 'Overdue',
      service: 'Guard Services',
      daysOverdue: 10
    },
    {
      id: 5,
      client: 'Government Office',
      invoice: 'INV-2024-005',
      amount: 1500000,
      dueDate: '2024-02-28',
      status: 'Pending',
      service: 'Consultation',
      daysOverdue: 0
    }
  ];

  const paymentMethods = [
    { name: 'Bank Transfer', amount: 45000000, percentage: 45, color: 'blue' },
    { name: 'Mobile Money', amount: 25000000, percentage: 25, color: 'green' },
    { name: 'Cash', amount: 15000000, percentage: 15, color: 'orange' },
    { name: 'Credit Card', amount: 8000000, percentage: 8, color: 'purple' },
    { name: 'Check', amount: 5000000, percentage: 5, color: 'red' },
    { name: 'Other', amount: 2000000, percentage: 2, color: 'gray' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Accounts Receivable Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {receivableStats.map((stat, index) => (
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

      {/* Client Receivables Table */}
      <AnimatedCard
        title="Client Receivables"
        subtitle="Outstanding invoices and payments"
        color="green"
        icon="📋"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientReceivables.map((receivable, index) => (
                <tr key={receivable.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{receivable.client}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{receivable.invoice}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(receivable.amount)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{receivable.dueDate}</div>
                    {receivable.daysOverdue > 0 && (
                      <div className="text-xs text-red-600">{receivable.daysOverdue} days overdue</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(receivable.status)}`}>
                      {receivable.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{receivable.service}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">View</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Collect</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Payment Methods and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Payment Methods"
          subtitle="Breakdown by payment type"
          color="blue"
          icon="📊"
          delay={600}
        >
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <div key={method.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${method.color}-500`}></div>
                  <span className="text-sm font-medium text-gray-700">{method.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(method.amount)}</div>
                  <div className="text-xs text-gray-500">{method.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common receivable tasks"
          color="green"
          icon="⚡"
          delay={800}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Create new invoice')}
            >
              📄 Create Invoice
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Record payment')}
            >
              💰 Record Payment
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Send reminder')}
            >
              📧 Send Reminder
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Generate report')}
            >
              📊 Generate Report
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Collection Analytics */}
      <AnimatedCard
        title="Collection Analytics"
        subtitle="Performance metrics and trends"
        color="purple"
        icon="📈"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-green-600">Collection Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">15.2M</div>
            <div className="text-sm text-blue-600">Overdue Amount</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-purple-600">Active Clients</div>
          </div>
        </div>
      </AnimatedCard>

      {/* Aging Report */}
      <AnimatedCard
        title="Aging Report"
        subtitle="Receivables by age"
        color="orange"
        icon="📅"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">45.2M</div>
            <div className="text-sm text-green-600">Current (0-30 days)</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">18.1M</div>
            <div className="text-sm text-yellow-600">31-60 days</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">9.8M</div>
            <div className="text-sm text-orange-600">61-90 days</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">5.4M</div>
            <div className="text-sm text-red-600">Over 90 days</div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AccountsReceivable; 