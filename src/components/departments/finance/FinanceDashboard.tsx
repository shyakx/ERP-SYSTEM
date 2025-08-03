import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const FinanceDashboard: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const financeStats = [
    { title: 'Total Revenue', value: '245.6M RWF', subtitle: 'This Year', color: 'blue', icon: '💰', trend: { value: '+12%', isPositive: true }, delay: 0 },
    { title: 'Total Expenses', value: '189.3M RWF', subtitle: 'This Year', color: 'green', icon: '💸', trend: { value: '+8%', isPositive: false }, delay: 100 },
    { title: 'Net Profit', value: '56.3M RWF', subtitle: 'This Year', color: 'purple', icon: '📈', trend: { value: '+15%', isPositive: true }, delay: 200 },
    { title: 'Cash Flow', value: '42.8M RWF', subtitle: 'Available', color: 'orange', icon: '💳', trend: { value: '+5%', isPositive: true }, delay: 300 }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'Income',
      description: 'Security Service Payment',
      amount: 2500000,
      date: '2024-02-15',
      status: 'Completed',
      client: 'Kigali Business Center'
    },
    {
      id: 2,
      type: 'Expense',
      description: 'Equipment Purchase',
      amount: -850000,
      date: '2024-02-14',
      status: 'Completed',
      vendor: 'Tech Solutions Ltd'
    },
    {
      id: 3,
      type: 'Income',
      description: 'Monthly Contract',
      amount: 1800000,
      date: '2024-02-13',
      status: 'Completed',
      client: 'ABC Corporation'
    },
    {
      id: 4,
      type: 'Expense',
      description: 'Salary Payment',
      amount: -3200000,
      date: '2024-02-12',
      status: 'Completed',
      department: 'HR & Admin'
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

  const getTransactionColor = (type: string) => {
    return type === 'Income' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-4">
      {/* Finance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financeStats.map((stat, index) => (
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

      {/* Recent Transactions */}
      <AnimatedCard
        title="Recent Transactions"
        subtitle="Latest financial activities"
        color="green"
        icon="📊"
        delay={400}
      >
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  transaction.type === 'Income' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <span className="text-white font-semibold text-xs">
                    {transaction.type === 'Income' ? '↗' : '↘'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.client || transaction.vendor || transaction.department}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions and Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Quick Actions"
          subtitle="Common finance tasks"
          color="blue"
          icon="⚡"
          delay={600}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Create new invoice')}
            >
              📄 Create Invoice
            </AnimatedButton>
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Record payment')}
            >
              💰 Record Payment
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
              onClick={() => console.log('Review budget')}
            >
              📋 Review Budget
            </AnimatedButton>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Financial Overview"
          subtitle="Key performance indicators"
          color="purple"
          icon="📈"
          delay={800}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Revenue Growth</span>
              <span className="text-xs font-semibold text-gray-900">+12%</span>
            </div>
            <AnimatedProgressBar progress={75} color="green" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Expense Control</span>
              <span className="text-xs font-semibold text-gray-900">92%</span>
            </div>
            <AnimatedProgressBar progress={92} color="blue" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Profit Margin</span>
              <span className="text-xs font-semibold text-gray-900">23%</span>
            </div>
            <AnimatedProgressBar progress={23} color="purple" height={6} />
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default FinanceDashboard; 