import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const CashManagement: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('all');

  const cashStats = [
    { title: 'Total Cash', value: '42.8M RWF', subtitle: 'Available', color: 'green', icon: '💰', trend: { value: '+5%', isPositive: true }, delay: 0 },
    { title: 'Bank Accounts', value: '38.5M RWF', subtitle: 'Combined', color: 'blue', icon: '🏦', trend: { value: '+3%', isPositive: true }, delay: 100 },
    { title: 'Petty Cash', value: '4.3M RWF', subtitle: 'On Hand', color: 'orange', icon: '💵', trend: { value: '+12%', isPositive: true }, delay: 200 },
    { title: 'Cash Flow', value: '+8.2M RWF', subtitle: 'This Month', color: 'purple', icon: '📈', trend: { value: '+15%', isPositive: true }, delay: 300 }
  ];

  const bankAccounts = [
    { id: 1, name: 'Main Operating Account', bank: 'Bank of Kigali', balance: 28500000, accountNumber: 'BK-001-2345678', status: 'Active' },
    { id: 2, name: 'Savings Account', bank: 'Ecobank Rwanda', balance: 8500000, accountNumber: 'ECO-002-8765432', status: 'Active' },
    { id: 3, name: 'Payroll Account', bank: 'Bank of Kigali', balance: 1800000, accountNumber: 'BK-003-1122334', status: 'Active' },
    { id: 4, name: 'Investment Account', bank: 'Ecobank Rwanda', balance: 0, accountNumber: 'ECO-004-5566778', status: 'Inactive' }
  ];

  const cashTransactions = [
    {
      id: 1,
      type: 'Deposit',
      description: 'Client Payment - Security Services',
      amount: 2500000,
      date: '2024-02-15',
      account: 'Main Operating Account',
      reference: 'DEP-2024-001'
    },
    {
      id: 2,
      type: 'Withdrawal',
      description: 'Equipment Purchase',
      amount: -850000,
      date: '2024-02-14',
      account: 'Main Operating Account',
      reference: 'WTH-2024-002'
    },
    {
      id: 3,
      type: 'Transfer',
      description: 'Salary Transfer to Payroll',
      amount: -3200000,
      date: '2024-02-13',
      account: 'Main Operating Account',
      reference: 'TRF-2024-003'
    },
    {
      id: 4,
      type: 'Deposit',
      description: 'Monthly Contract Payment',
      amount: 1800000,
      date: '2024-02-12',
      account: 'Main Operating Account',
      reference: 'DEP-2024-004'
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
    switch (type) {
      case 'Deposit': return 'text-green-600 bg-green-100';
      case 'Withdrawal': return 'text-red-600 bg-red-100';
      case 'Transfer': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAccounts = selectedAccount === 'all' 
    ? bankAccounts 
    : bankAccounts.filter(account => account.status === selectedAccount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cash Management</h1>
          <p className="text-gray-600 mt-1">Monitor cash flow and bank accounts</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + New Transaction
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
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
        subtitle="Manage multiple bank accounts and balances"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Accounts</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{account.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{account.bank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{account.accountNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(account.balance)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-green-600 hover:text-green-900"
                    >
                      Transfer
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Transactions */}
      <AnimatedCard
        title="Recent Cash Transactions"
        subtitle="Latest deposits, withdrawals, and transfers"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {cashTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">💳</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.account} • {transaction.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionColor(transaction.type)}`}>
                  {transaction.type}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Details
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Cash Management Tools */}
      <AnimatedCard
        title="Cash Management Tools"
        subtitle="Quick actions for cash operations"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">💰</span>
            <span className="text-sm font-medium text-gray-700">Record Deposit</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <span className="text-red-600">💸</span>
            <span className="text-sm font-medium text-gray-700">Record Withdrawal</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">🔄</span>
            <span className="text-sm font-medium text-gray-700">Transfer Funds</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Cash Reports</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Cash Flow Analytics */}
      <AnimatedCard
        title="Cash Flow Analytics"
        subtitle="Cash flow trends and projections"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Monthly Cash Flow</h4>
            <AnimatedProgressBar
              progress={85}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={72}
              color="blue"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Account Utilization</h4>
            <AnimatedProgressBar
              progress={65}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={90}
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

export default CashManagement; 