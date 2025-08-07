import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Finance Department Pages
import FinanceOverview from './pages/FinanceOverview';
import AccountsPayable from './pages/AccountsPayable';
import AccountsReceivable from './pages/AccountsReceivable';
import TaxManagement from './pages/TaxManagement';
import Budgeting from './pages/Budgeting';
import FinancialReports from './pages/FinancialReports';
import CashManagement from './pages/CashManagement';
import Expenses from './pages/Expenses';
import FinancialPlanning from './pages/FinancialPlanning';

const FinanceDashboard: React.FC = () => {
  const colorScheme = getColorScheme('finance');
  const location = useLocation();

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

  const sidebarItems = [
    { name: 'Dashboard', path: '/finance', icon: '🏠' },
    { name: 'Overview', path: '/finance/overview', icon: '📊' },
    { name: 'Payable', path: '/finance/payable', icon: '💸' },
    { name: 'Receivable', path: '/finance/receivable', icon: '💵' },
    { name: 'Tax Management', path: '/finance/tax', icon: '🧾' },
    { name: 'Budgeting', path: '/finance/budgeting', icon: '📋' },
    { name: 'Reports', path: '/finance/reports', icon: '📈' },
    { name: 'Cash Management', path: '/finance/cash', icon: '💰' },
    { name: 'Expenses', path: '/finance/expenses', icon: '📊' },
    { name: 'Financial Planning', path: '/finance/planning', icon: '📋' }
  ];

  // Main Dashboard Content
  const DashboardContent = () => (
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
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <span className={`text-sm ${
                    transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'Income' ? '↗' : '↘'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.client || transaction.vendor || transaction.department}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common finance tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">⚡</span>
            <span className="text-sm font-medium text-gray-700">New Transaction</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📋</span>
            <span className="text-sm font-medium text-gray-700">Budget Review</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">🔍</span>
            <span className="text-sm font-medium text-gray-700">Audit Trail</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Financial Overview */}
      <AnimatedCard
        title="Financial Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Revenue Trends</h4>
            <AnimatedProgressBar
              progress={75}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={68}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Expense Breakdown</h4>
            <AnimatedProgressBar
              progress={45}
              color="red"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={30}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/finance':
        return <DashboardContent />;
      case '/finance/overview':
        return <FinanceOverview />;
      case '/finance/payable':
        return <AccountsPayable />;
      case '/finance/receivable':
        return <AccountsReceivable />;
      case '/finance/tax':
        return <TaxManagement />;
      case '/finance/budgeting':
        return <Budgeting />;
      case '/finance/reports':
        return <FinancialReports />;
      case '/finance/cash':
        return <CashManagement />;
      case '/finance/expenses':
        return <Expenses />;
      case '/finance/planning':
        return <FinancialPlanning />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Finance Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default FinanceDashboard; 