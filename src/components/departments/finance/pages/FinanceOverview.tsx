import React from 'react';
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
  Clock
} from 'lucide-react';

const FinanceOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$2,456,789',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Monthly Expenses',
      value: '$1,234,567',
      change: '+8.2%',
      changeType: 'negative',
      icon: TrendingDown,
      color: 'bg-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Net Profit',
      value: '$1,222,222',
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Outstanding Invoices',
      value: '$345,678',
      change: '-5.1%',
      changeType: 'positive',
      icon: Receipt,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      description: 'Security Service Payment - ABC Corp',
      amount: '$25,000',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Equipment Purchase - Security Cameras',
      amount: '-$12,500',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income',
      description: 'Monthly Contract - XYZ Business',
      amount: '$18,750',
      date: '2024-01-13',
      status: 'pending'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Employee Payroll',
      amount: '-$125,000',
      date: '2024-01-12',
      status: 'completed'
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      client: 'Kigali Business Center',
      amount: '$32,500',
      dueDate: '2024-01-25',
      status: 'pending'
    },
    {
      id: 2,
      client: 'Rwanda Tech Hub',
      amount: '$28,750',
      dueDate: '2024-01-28',
      status: 'pending'
    },
    {
      id: 3,
      client: 'Central Bank Branch',
      amount: '$45,000',
      dueDate: '2024-01-30',
      status: 'pending'
    }
  ];

  const budgetBreakdown = [
    { category: 'Personnel', amount: 1250000, percentage: 65 },
    { category: 'Equipment', amount: 300000, percentage: 15 },
    { category: 'Operations', amount: 250000, percentage: 13 },
    { category: 'Marketing', amount: 120000, percentage: 7 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
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
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
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
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount}
                      </p>
                      <span className={`text-xs ${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Payments</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{payment.client}</p>
                      <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{payment.amount}</p>
                      <span className="badge-warning">Pending</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Record Payment</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Create Invoice</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Generate Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Calculator className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Budget Planning</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Budget Breakdown</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {budgetBreakdown.map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <h4 className="text-sm font-medium text-gray-900">{item.category}</h4>
                <p className="text-2xl font-bold text-gray-900 mt-2">${(item.amount / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total</p>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview; 