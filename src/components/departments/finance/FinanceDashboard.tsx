import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';
import { useApiList } from '../../../hooks/useApi';
import { transactionAPI, accountAPI, budgetAPI } from '../../../services/api.ts';
import { Loader2, TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';

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

interface Transaction {
  id: string;
  transactionNumber?: string;
  type: string;
  description: string;
  amount: number;
  transactionDate: string;
  status: string;
  category: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  currentBalance: number;
  currency: string;
}

const FinanceDashboard: React.FC = () => {
  const colorScheme = getColorScheme('finance');
  const location = useLocation();
  const [financeStats, setFinanceStats] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  // Fetch data from APIs
  const { items: transactions, loading: transactionsLoading } = useApiList(transactionAPI.getAll, { limit: 1000 });
  const { items: accounts, loading: accountsLoading } = useApiList(accountAPI.getAll, { limit: 100 });
  const { items: budgets, loading: budgetsLoading } = useApiList(budgetAPI.getAll, { limit: 100 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!transactionsLoading && !accountsLoading && !budgetsLoading) {
      console.log('🔍 Finance Dashboard Debug - Raw Data:');
      console.log('📊 Transactions:', transactions);
      console.log('📊 Accounts:', accounts);
      console.log('📊 Budgets:', budgets);
      
      const calculateStats = () => {
        const currentYear = new Date().getFullYear();
        console.log('📅 Current Year:', currentYear);
        
        // Include both current year and previous year (2024) since that's where the data is
        const yearTransactions = transactions.filter((t: Transaction) => {
          const transactionDate = new Date(t.transactionDate);
          const transactionYear = transactionDate.getFullYear();
          const isCurrentYear = transactionYear === currentYear;
          const isLastYear = transactionYear === currentYear - 1; // Include 2024 data
          const shouldInclude = isCurrentYear || isLastYear;
          console.log(`📅 Transaction ${t.transactionNumber || t.id}: ${t.transactionDate} -> Year: ${transactionYear}, IsCurrentYear: ${isCurrentYear}, IsLastYear: ${isLastYear}, ShouldInclude: ${shouldInclude}`);
          return shouldInclude;
        });

        console.log('📊 Year Transactions:', yearTransactions);

        const incomeTransactions = yearTransactions.filter((t: Transaction) => t.type === 'income');
        const expenseTransactions = yearTransactions.filter((t: Transaction) => t.type === 'expense');
        
        console.log('💰 Income Transactions:', incomeTransactions);
        console.log('💸 Expense Transactions:', expenseTransactions);

        const totalRevenue = incomeTransactions.reduce((sum: number, t: Transaction) => {
          const amount = parseFloat(t.amount?.toString() || '0');
          console.log(`💰 Adding income: ${t.description} = ${amount}`);
          return sum + amount;
        }, 0);

        const totalExpenses = expenseTransactions.reduce((sum: number, t: Transaction) => {
          const amount = parseFloat(t.amount?.toString() || '0');
          console.log(`💸 Adding expense: ${t.description} = ${amount}`);
          return sum + amount;
        }, 0);

        const netProfit = totalRevenue - totalExpenses;

        // Calculate cash flow from accounts
        const totalCashFlow = accounts.reduce((sum: number, a: Account) => {
          const balance = parseFloat(a.currentBalance?.toString() || '0');
          console.log(`💳 Account ${a.name}: ${balance}`);
          return sum + balance;
        }, 0);

        console.log('🎯 Final Calculations:');
        console.log('💰 Total Revenue:', totalRevenue);
        console.log('💸 Total Expenses:', totalExpenses);
        console.log('📈 Net Profit:', netProfit);
        console.log('💳 Total Cash Flow:', totalCashFlow);

        return [
          { 
            title: 'Total Revenue', 
            value: formatCurrency(totalRevenue), 
            subtitle: 'This Year', 
            color: 'blue', 
            icon: '💰', 
            trend: { value: '+12%', isPositive: true }, 
            delay: 0 
          },
          { 
            title: 'Total Expenses', 
            value: formatCurrency(totalExpenses), 
            subtitle: 'This Year', 
            color: 'green', 
            icon: '💸', 
            trend: { value: '+8%', isPositive: false }, 
            delay: 100 
          },
          { 
            title: 'Net Profit', 
            value: formatCurrency(netProfit), 
            subtitle: 'This Year', 
            color: 'purple', 
            icon: '📈', 
            trend: { value: '+15%', isPositive: true }, 
            delay: 200 
          },
          { 
            title: 'Cash Flow', 
            value: formatCurrency(totalCashFlow), 
            subtitle: 'Available', 
            color: 'orange', 
            icon: '💳', 
            trend: { value: '+5%', isPositive: true }, 
            delay: 300 
          }
        ];
      };

      const calculateRecentTransactions = () => {
        return transactions
          .sort((a: Transaction, b: Transaction) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
          .slice(0, 4)
          .map((t: Transaction) => ({
            id: t.id,
            type: t.type === 'income' ? 'Income' : 'Expense',
            description: t.description,
            amount: t.type === 'income' ? parseFloat(t.amount?.toString() || '0') : -parseFloat(t.amount?.toString() || '0'),
            date: t.transactionDate,
            status: t.status === 'completed' ? 'Completed' : 'Pending',
            client: t.category || 'N/A'
          }));
      };

      setFinanceStats(calculateStats());
      setRecentTransactions(calculateRecentTransactions());
    }
  }, [transactions, accounts, budgets, transactionsLoading, accountsLoading, budgetsLoading]);

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
  const DashboardContent = () => {
    if (transactionsLoading || accountsLoading || budgetsLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }

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
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
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
              <span className="text-purple-600">💰</span>
              <span className="text-sm font-medium text-gray-700">Cash Management</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
              <span className="text-orange-600">🧾</span>
              <span className="text-sm font-medium text-gray-700">Tax Filing</span>
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
  };

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