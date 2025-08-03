import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const CashManagement: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const cashStats = [
    { title: 'Cash Balance', value: '42.8M RWF', subtitle: 'Available', color: 'green', icon: '💰', trend: { value: '+8%', isPositive: true }, delay: 0 },
    { title: 'Cash Inflow', value: '28.5M RWF', subtitle: 'This Month', color: 'blue', icon: '↗️', trend: { value: '+12%', isPositive: true }, delay: 100 },
    { title: 'Cash Outflow', value: '18.2M RWF', subtitle: 'This Month', color: 'red', icon: '↘️', trend: { value: '+5%', isPositive: false }, delay: 200 },
    { title: 'Cash Ratio', value: '2.35', subtitle: 'Current', color: 'purple', icon: '📊', trend: { value: '+0.15', isPositive: true }, delay: 300 }
  ];

  const cashTransactions = [
    {
      id: 1,
      type: 'Inflow',
      description: 'Client Payment - Kigali Business Center',
      amount: 2500000,
      date: '2024-02-15',
      category: 'Revenue',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      type: 'Outflow',
      description: 'Equipment Purchase - Security Cameras',
      amount: -850000,
      date: '2024-02-14',
      category: 'Equipment',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      type: 'Inflow',
      description: 'Monthly Contract - ABC Corporation',
      amount: 1800000,
      date: '2024-02-13',
      category: 'Revenue',
      method: 'Mobile Money'
    },
    {
      id: 4,
      type: 'Outflow',
      description: 'Salary Payment - February',
      amount: -3200000,
      date: '2024-02-12',
      category: 'Payroll',
      method: 'Bank Transfer'
    },
    {
      id: 5,
      type: 'Inflow',
      description: 'Consultation Fee - Government Office',
      amount: 1500000,
      date: '2024-02-11',
      category: 'Revenue',
      method: 'Cash'
    }
  ];

  const bankAccounts = [
    {
      name: 'Main Operating Account',
      bank: 'Bank of Kigali',
      accountNumber: '****1234',
      balance: 28500000,
      currency: 'RWF',
      status: 'Active'
    },
    {
      name: 'Savings Account',
      bank: 'Ecobank Rwanda',
      accountNumber: '****5678',
      balance: 8500000,
      currency: 'RWF',
      status: 'Active'
    },
    {
      name: 'USD Account',
      bank: 'Bank of Kigali',
      accountNumber: '****9012',
      balance: 5800000,
      currency: 'USD',
      status: 'Active'
    }
  ];

  const cashFlowCategories = [
    { name: 'Revenue', amount: 28500000, percentage: 65, color: 'green' },
    { name: 'Equipment', amount: 8500000, percentage: 20, color: 'blue' },
    { name: 'Payroll', amount: 3200000, percentage: 7, color: 'red' },
    { name: 'Utilities', amount: 1800000, percentage: 4, color: 'orange' },
    { name: 'Other', amount: 1200000, percentage: 4, color: 'purple' }
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
    return type === 'Inflow' ? 'text-green-600' : 'text-red-600';
  };

  const getTransactionIcon = (type: string) => {
    return type === 'Inflow' ? '↗️' : '↘️';
  };

  return (
    <div className="space-y-4">
      {/* Cash Management Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cashStats.map((stat, index) => (
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

      {/* Bank Accounts */}
      <AnimatedCard
        title="Bank Accounts"
        subtitle="Account balances and information"
        color="blue"
        icon="🏦"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bankAccounts.map((account, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900">{account.name}</h3>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  {account.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Bank:</span> {account.bank}
                </div>
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Account:</span> {account.accountNumber}
                </div>
                <div className="text-lg font-bold text-blue-900">
                  {formatCurrency(account.balance)}
                </div>
                <div className="text-xs text-blue-600">{account.currency}</div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Cash Transactions */}
      <AnimatedCard
        title="Recent Cash Transactions"
        subtitle="Latest cash flow activities"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="space-y-3">
          {cashTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
              style={{ animationDelay: `${700 + index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  transaction.type === 'Inflow' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <span className="text-white font-semibold text-xs">
                    {getTransactionIcon(transaction.type)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.category} • {transaction.method}
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

      {/* Cash Flow Categories and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Cash Flow Categories"
          subtitle="Breakdown by transaction type"
          color="purple"
          icon="📊"
          delay={800}
        >
          <div className="space-y-3">
            {cashFlowCategories.map((category, index) => (
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
          subtitle="Common cash management tasks"
          color="orange"
          icon="⚡"
          delay={1000}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Transfer funds')}
            >
              💸 Transfer Funds
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Record deposit')}
            >
              💰 Record Deposit
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
              onClick={() => console.log('Reconcile accounts')}
            >
              🔍 Reconcile Accounts
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Cash Flow Analytics */}
      <AnimatedCard
        title="Cash Flow Analytics"
        subtitle="Performance metrics and trends"
        color="indigo"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">2.35</div>
            <div className="text-sm text-green-600">Cash Ratio</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">28.5M</div>
            <div className="text-sm text-blue-600">Monthly Inflow</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">18.2M</div>
            <div className="text-sm text-purple-600">Monthly Outflow</div>
          </div>
        </div>
      </AnimatedCard>

      {/* Cash Forecast */}
      <AnimatedCard
        title="Cash Forecast"
        subtitle="Projected cash flow for next 30 days"
        color="teal"
        icon="🔮"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Expected Inflows</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Client Payments</span>
                <span className="font-semibold">+15.2M RWF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Contract Renewals</span>
                <span className="font-semibold">+8.5M RWF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Income</span>
                <span className="font-semibold">+2.3M RWF</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-green-800">
                <span>Total</span>
                <span>+26.0M RWF</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Expected Outflows</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Payroll</span>
                <span className="font-semibold">-3.2M RWF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Equipment</span>
                <span className="font-semibold">-1.8M RWF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Utilities</span>
                <span className="font-semibold">-0.5M RWF</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-red-800">
                <span>Total</span>
                <span>-5.5M RWF</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CashManagement; 