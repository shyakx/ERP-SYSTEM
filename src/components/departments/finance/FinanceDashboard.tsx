import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';
import { useApiList } from '../../../hooks/useApi';
import { financeAPI } from '../../../services/api';
import { 
  Loader2, 
  DollarSign, 
  BarChart3,
  Receipt,
  Zap,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Home,
  Eye,
  FileText,
  ArrowUpDown,
  Calculator,
  PieChart,
  PiggyBank,
  Receipt as ReceiptIcon,
  Target,
  LayoutDashboard,
  Building2,
  HandCoins,
  Scale,
  Wallet,
  Banknote,
  Coins,
  TrendingUp as TrendingUpIcon,
  BarChart
} from 'lucide-react';

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

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'dollar-sign': DollarSign,
    'trending-up': TrendingUp,
    'trending-down': TrendingDown,
    'credit-card': CreditCard,
    'receipt': ReceiptIcon,
    'bar-chart': BarChart3,
    'home': Home,
    'eye': Eye,
    'file-text': FileText,
    'arrow-up-down': ArrowUpDown,
    'calculator': Calculator,
    'pie-chart': PieChart,
    'piggy-bank': PiggyBank,
    'target': Target,
    'layout-dashboard': LayoutDashboard,
    'building2': Building2,
    'hand-coins': HandCoins,
    'scale': Scale,
    'wallet': Wallet,
    'banknote': Banknote,
    'coins': Coins,
    'trending-up-icon': TrendingUpIcon,
    'bar-chart-alt': BarChart
  };
  
  return iconMap[iconName] || DollarSign; // Default fallback
};

const FinanceDashboard: React.FC = () => {
  const colorScheme = getColorScheme('finance');
  const location = useLocation();
  const [financeStats, setFinanceStats] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [apiStats, setApiStats] = useState<any>(null);

  // Fetch data from APIs
  const { items: transactions, loading: transactionsLoading } = useApiList(financeAPI.getTransactions, { limit: 1000 });
  const { items: accounts, loading: accountsLoading } = useApiList(financeAPI.getAccounts, { limit: 100 });
  const { items: budgets, loading: budgetsLoading } = useApiList(financeAPI.getBudgets, { limit: 100 });

  // Fetch finance stats from API
  useEffect(() => {
    const fetchFinanceStats = async () => {
      try {
        const response = await financeAPI.getStats();
        if (response.data.success) {
          setApiStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching finance stats:', error);
      }
    };

    fetchFinanceStats();
  }, []);

  // Calculate statistics from real data
  useEffect(() => {
    // Use API stats if available, otherwise calculate from individual data
    if (apiStats) {
      const stats = [
        { 
          title: 'Monthly Revenue', 
          value: formatCurrency(apiStats.monthlyRevenue || 0), 
          subtitle: 'This Month', 
          color: 'blue', 
          icon: 'dollar-sign', 
          trend: { value: '+12%', isPositive: true }, 
          delay: 0 
        },
        { 
          title: 'Monthly Expenses', 
          value: formatCurrency(apiStats.monthlyExpenses || 0), 
          subtitle: 'This Month', 
          color: 'green', 
          icon: 'trending-down', 
          trend: { value: '+8%', isPositive: false }, 
          delay: 100 
        },
        { 
          title: 'Monthly Profit', 
          value: formatCurrency(apiStats.monthlyProfit || 0), 
          subtitle: 'This Month', 
          color: 'purple', 
          icon: 'trending-up', 
          trend: { value: '+15%', isPositive: true }, 
          delay: 200 
        },
        { 
          title: 'Total Receivables', 
          value: formatCurrency(apiStats.totalReceivables || 0), 
          subtitle: 'Outstanding', 
          color: 'orange', 
          icon: 'credit-card', 
          trend: { value: '-5%', isPositive: true }, 
          delay: 300 
        }
      ];
      setFinanceStats(stats);
      setRecentTransactions(apiStats.recentTransactions || []);
    } else if (!transactionsLoading && !accountsLoading && !budgetsLoading) {
      console.log('Finance Dashboard Debug - Raw Data:');
      console.log('Transactions:', transactions);
      console.log('Accounts:', accounts);
      console.log('Budgets:', budgets);
      
      const calculateStats = () => {
        const currentYear = new Date().getFullYear();
        console.log('Current Year:', currentYear);
        
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

        console.log('Year Transactions:', yearTransactions);

        const incomeTransactions = yearTransactions.filter((t: Transaction) => t.type === 'income');
        const expenseTransactions = yearTransactions.filter((t: Transaction) => t.type === 'expense');
        
        console.log('Income Transactions:', incomeTransactions);
        console.log('Expense Transactions:', expenseTransactions);

        const totalRevenue = incomeTransactions.reduce((sum: number, t: Transaction) => {
          const amount = parseFloat(t.amount?.toString() || '0');
          console.log(`Adding income: ${t.description} = ${amount}`);
          return sum + amount;
        }, 0);

        const totalExpenses = expenseTransactions.reduce((sum: number, t: Transaction) => {
          const amount = parseFloat(t.amount?.toString() || '0');
          console.log(`Adding expense: ${t.description} = ${amount}`);
          return sum + amount;
        }, 0);

        const netProfit = totalRevenue - totalExpenses;

        // Calculate cash flow from accounts
        const totalCashFlow = accounts.reduce((sum: number, a: Account) => {
          const balance = parseFloat(a.currentBalance?.toString() || '0');
          console.log(`💳 Account ${a.name}: ${balance}`);
          return sum + balance;
        }, 0);

        console.log('Final Calculations:');
        console.log('Total Revenue:', totalRevenue);
        console.log('Total Expenses:', totalExpenses);
        console.log('Net Profit:', netProfit);
        console.log('Total Cash Flow:', totalCashFlow);

        return [
          { 
            title: 'Total Revenue', 
            value: formatCurrency(totalRevenue), 
            subtitle: 'This Year', 
            color: 'blue', 
            icon: 'dollar-sign', 
            trend: { value: '+12%', isPositive: true }, 
            delay: 0 
          },
          { 
            title: 'Total Expenses', 
            value: formatCurrency(totalExpenses), 
            subtitle: 'This Year', 
            color: 'green', 
            icon: 'trending-down', 
            trend: { value: '+8%', isPositive: false }, 
            delay: 100 
          },
          { 
            title: 'Net Profit', 
            value: formatCurrency(netProfit), 
            subtitle: 'This Year', 
            color: 'purple', 
            icon: 'trending-up', 
            trend: { value: '+15%', isPositive: true }, 
            delay: 200 
          },
          { 
            title: 'Cash Flow', 
            value: formatCurrency(totalCashFlow), 
            subtitle: 'Available', 
            color: 'orange', 
            icon: 'credit-card', 
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
  }, [apiStats, transactions, accounts, budgets, transactionsLoading, accountsLoading, budgetsLoading]);

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
    { name: 'Dashboard', path: '/finance', icon: Home },
    { name: 'Overview', path: '/finance/overview', icon: Eye },
    { name: 'Payable', path: '/finance/payable', icon: HandCoins },
    { name: 'Receivable', path: '/finance/receivable', icon: Wallet },
    { name: 'Tax Management', path: '/finance/tax', icon: Calculator },
    { name: 'Budgeting', path: '/finance/budgeting', icon: PieChart },
    { name: 'Reports', path: '/finance/reports', icon: FileText },
    { name: 'Cash Management', path: '/finance/cash', icon: Banknote },
    { name: 'Expenses', path: '/finance/expenses', icon: ReceiptIcon },
    { name: 'Financial Planning', path: '/finance/planning', icon: Target }
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
              <div className="text-2xl">
                {React.createElement(getIconComponent(stat.icon), { 
                  size: 24, 
                  className: `text-${stat.color}-600` 
                })}
              </div>
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
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">New Transaction</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <BarChart3 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
              <DollarSign className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Cash Management</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
              <Receipt className="w-4 h-4 text-orange-600" />
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