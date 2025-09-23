import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Receipt,
  Calculator,
  BarChart3,
  PieChart,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  X
} from 'lucide-react';
import { useApiList } from '../../../../hooks/useApi';
import { transactionAPI, accountAPI, vendorAPI, customerAPI } from '../../../../services/api.ts';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer' | 'adjustment';
  description: string;
  amount: number;
  transactionDate: string;
  status: 'pending' | 'completed' | 'cancelled' | 'overdue';
  category: string;
  account?: {
    name: string;
    accountNumber: string;
  };
  vendor?: {
    name: string;
    vendorCode: string;
  };
  customer?: {
    name: string;
    customerCode: string;
  };
}

interface Account {
  id: string;
  name: string;
  type: string;
  currentBalance: number;
  currency: string;
}

interface Vendor {
  id: string;
  name: string;
  currentBalance: number;
  status: string;
}

interface Customer {
  id: string;
  name: string;
  currentBalance: number;
  status: string;
}

const FinanceOverview: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from APIs
  const { items: transactions, loading: transactionsLoading } = useApiList(transactionAPI.getAll, { limit: 10 });
  const { items: accounts, loading: accountsLoading } = useApiList(accountAPI.getAll, { limit: 10 });
  const { items: vendors, loading: vendorsLoading } = useApiList(vendorAPI.getAll, { limit: 10 });
  const { items: customers, loading: customersLoading } = useApiList(customerAPI.getAll, { limit: 10 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!transactionsLoading && !accountsLoading && !vendorsLoading && !customersLoading) {
      const calculateStats = () => {
        const totalRevenue = transactions
          .filter((t: Transaction) => t.type === 'income' && t.status === 'completed')
          .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()), 0);

        const totalExpenses = transactions
          .filter((t: Transaction) => t.type === 'expense' && t.status === 'completed')
          .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()), 0);

        const netProfit = totalRevenue - totalExpenses;

        const outstandingInvoices = customers
          .reduce((sum: number, c: Customer) => sum + parseFloat(c.currentBalance.toString()), 0);

        const totalPayables = vendors
          .reduce((sum: number, v: Vendor) => sum + parseFloat(v.currentBalance.toString()), 0);

        const bankAccounts = accounts.filter((a: Account) => a.type === 'bank');
        const totalBankBalance = bankAccounts
          .reduce((sum: number, a: Account) => sum + parseFloat(a.currentBalance.toString()), 0);

        return [
    {
      title: 'Total Revenue',
            value: new Intl.NumberFormat('en-RW', {
              style: 'currency',
              currency: 'RWF',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(totalRevenue),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
            title: 'Total Expenses',
            value: new Intl.NumberFormat('en-RW', {
              style: 'currency',
              currency: 'RWF',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(totalExpenses),
      change: '+8.2%',
      changeType: 'negative',
      icon: TrendingDown,
      color: 'bg-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Net Profit',
            value: new Intl.NumberFormat('en-RW', {
              style: 'currency',
              currency: 'RWF',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(netProfit),
            change: netProfit > 0 ? '+15.3%' : '-5.2%',
            changeType: netProfit > 0 ? 'positive' : 'negative',
      icon: TrendingUp,
            color: netProfit > 0 ? 'bg-blue-500' : 'bg-red-500',
            bgColor: netProfit > 0 ? 'bg-blue-50' : 'bg-red-50'
          },
          {
            title: 'Bank Balance',
            value: new Intl.NumberFormat('en-RW', {
              style: 'currency',
              currency: 'RWF',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(totalBankBalance),
            change: '+2.1%',
      changeType: 'positive',
            icon: CreditCard,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
          }
        ];
      };

      setStats(calculateStats());
      setLoading(false);
    }
  }, [transactions, accounts, vendors, customers, transactionsLoading, accountsLoading, vendorsLoading, customersLoading]);

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
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Finance Overview</h1>
            <p className="text-blue-100">Comprehensive financial dashboard and analytics</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600 mt-1">Monitor financial performance and manage company finances.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover-lift">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <div className="card-body">
              {transactionsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : (
              <div className="space-y-4">
                  {transactions.map((transaction: Transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-slide-in-left">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.transactionDate).toLocaleDateString()}
                          </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(parseFloat(transaction.amount.toString()))}
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1">{transaction.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Account Balances */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Account Balances</h3>
            </div>
            <div className="card-body">
              {accountsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : (
              <div className="space-y-3">
                  {accounts.slice(0, 5).map((account: Account) => (
                    <div key={account.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.type}</p>
                    </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(parseFloat(account.currentBalance.toString()))}
                      </p>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>

          {/* Outstanding Invoices */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Outstanding Invoices</h3>
            </div>
            <div className="card-body">
              {customersLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : (
              <div className="space-y-3">
                  {customers
                    .filter((c: Customer) => parseFloat(c.currentBalance.toString()) > 0)
                    .slice(0, 5)
                    .map((customer: Customer) => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.status}</p>
                        </div>
                        <p className="text-sm font-semibold text-orange-600">
                          {formatCurrency(parseFloat(customer.currentBalance.toString()))}
                        </p>
                      </div>
                    ))}
              </div>
              )}
        </div>
      </div>

          {/* Vendor Payables */}
      <div className="card">
        <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Vendor Payables</h3>
        </div>
        <div className="card-body">
              {vendorsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="space-y-3">
                  {vendors
                    .filter((v: Vendor) => parseFloat(v.currentBalance.toString()) > 0)
                    .slice(0, 5)
                    .map((vendor: Vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                          <p className="text-xs text-gray-500">{vendor.status}</p>
                        </div>
                        <p className="text-sm font-semibold text-red-600">
                          {formatCurrency(parseFloat(vendor.currentBalance.toString()))}
                        </p>
              </div>
            ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview; 