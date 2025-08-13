import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { expenseAPI } from '../../../../services/api.ts';
import { Loader2, Plus, AlertCircle, CheckCircle, Clock, DollarSign, Calendar, FileText } from 'lucide-react';

interface Expense {
  id: string;
  expenseNumber: string;
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  currency: string;
  expenseDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  vendorName: string;
  employeeName: string;
  projectName: string;
  submittedAt: string;
  approvedAt: string;
  paidAt: string;
}

const Expenses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expenseStats, setExpenseStats] = useState<any[]>([]);

  // Fetch expenses data
  const { items: expenses, loading: expensesLoading } = useApiList(expenseAPI.getAll, { limit: 50 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!expensesLoading && expenses.length > 0) {
      const totalExpenses = expenses.reduce((sum: number, e: Expense) => sum + parseFloat(e.amount.toString()), 0);
      const thisMonthExpenses = expenses
        .filter((e: Expense) => {
          const expenseDate = new Date(e.expenseDate);
          const now = new Date();
          return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
        })
        .reduce((sum: number, e: Expense) => sum + parseFloat(e.amount.toString()), 0);
      
      const pendingExpenses = expenses
        .filter((e: Expense) => e.status === 'submitted')
        .reduce((sum: number, e: Expense) => sum + parseFloat(e.amount.toString()), 0);
      
      const categories = [...new Set(expenses.map((e: Expense) => e.category))];

      setExpenseStats([
        { 
          title: 'Total Expenses', 
          value: formatCurrency(totalExpenses), 
          subtitle: 'This Year', 
          color: 'red', 
          icon: '💸', 
          trend: { value: '+8%', isPositive: false }, 
          delay: 0 
        },
        { 
          title: 'This Month', 
          value: formatCurrency(thisMonthExpenses), 
          subtitle: 'Current', 
          color: 'orange', 
          icon: '📅', 
          trend: { value: '+12%', isPositive: false }, 
          delay: 100 
        },
        { 
          title: 'Pending', 
          value: formatCurrency(pendingExpenses), 
          subtitle: 'Approval', 
          color: 'yellow', 
          icon: '⏳', 
          trend: { value: '-5%', isPositive: true }, 
          delay: 200 
        },
        { 
          title: 'Categories', 
          value: categories.length.toString(), 
          subtitle: 'Active', 
          color: 'blue', 
          icon: '📂', 
          trend: { value: '+2', isPositive: true }, 
          delay: 300 
        }
      ]);
    }
  }, [expenses, expensesLoading]);

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
      case 'approved': return 'text-green-600 bg-green-100';
      case 'submitted': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'paid': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      case 'paid': return <DollarSign className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'red';
    if (percentage >= 75) return 'orange';
    return 'green';
  };

  // Calculate category statistics
  const getCategoryStats = () => {
    const categoryMap = new Map();
    
    expenses.forEach((expense: Expense) => {
      const category = expense.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          total: 0,
          count: 0,
          approved: 0,
          pending: 0,
          rejected: 0
        });
      }
      
      const stats = categoryMap.get(category);
      stats.total += parseFloat(expense.amount.toString());
      stats.count += 1;
      
      if (expense.status === 'approved' || expense.status === 'paid') {
        stats.approved += 1;
      } else if (expense.status === 'submitted') {
        stats.pending += 1;
      } else if (expense.status === 'rejected') {
        stats.rejected += 1;
      }
    });
    
    return Array.from(categoryMap.values());
  };

  const categoryStats = getCategoryStats();
  const filteredCategories = selectedCategory === 'all' 
    ? categoryStats 
    : categoryStats.filter(category => {
        const approvalRate = category.approved / category.count;
        if (selectedCategory === 'on-track') return approvalRate >= 0.8;
        if (selectedCategory === 'over-budget') return approvalRate < 0.8;
        return true;
      });

  if (expensesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage company expenses</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Expense</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {expenseStats.map((stat, index) => (
          <AnimatedCard key={index} delay={stat.delay} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                    {stat.trend.value}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
          </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
          <option value="on-track">On Track</option>
          <option value="over-budget">Over Budget</option>
            </select>
          </div>

      {/* Expense Categories */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCategories.map((category) => {
              const approvalRate = (category.approved / category.count) * 100;
              const progressColor = getProgressColor(approvalRate);
        
            return (
                <div key={category.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(approvalRate >= 80 ? 'approved' : 'rejected')}`}>
                      {approvalRate >= 80 ? 'On Track' : 'Over Budget'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Amount:</span>
                      <span className="font-medium">{formatCurrency(category.total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expenses:</span>
                      <span className="font-medium">{category.count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Approval Rate:</span>
                      <span className="font-medium">{approvalRate.toFixed(1)}%</span>
                </div>
                    <div className="mt-3">
                  <AnimatedProgressBar
                        progress={approvalRate}
                        color={progressColor}
                        height={6}
                        showLabel={false}
                  />
                </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
                </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.slice(0, 10).map((expense: Expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                <div>
                        <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                        <div className="text-sm text-gray-500">{expense.expenseNumber}</div>
                </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{expense.category}</div>
                      {expense.subcategory && (
                        <div className="text-sm text-gray-500">{expense.subcategory}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(parseFloat(expense.amount.toString()))}
              </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(expense.expenseDate).toLocaleDateString()}
              </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                        {getStatusIcon(expense.status)}
                        <span className="ml-1 capitalize">{expense.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(expense.priority)}`}>
                        <span className="capitalize">{expense.priority}</span>
                </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
        </div>

      {/* Expense Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Expense Status Distribution</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {['submitted', 'approved', 'paid', 'rejected'].map((status) => {
                const count = expenses.filter((e: Expense) => e.status === status).length;
                const percentage = expenses.length > 0 ? Math.round((count / expenses.length) * 100) : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="capitalize">{status}</span>
                      <span className="font-medium">{count} ({percentage}%)</span>
                    </div>
            <AnimatedProgressBar
                      progress={percentage}
                      color={status === 'approved' || status === 'paid' ? 'green' : status === 'submitted' ? 'yellow' : 'red'}
              height={8}
                      showLabel={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {['urgent', 'high', 'medium', 'low'].map((priority) => {
                const count = expenses.filter((e: Expense) => e.priority === priority).length;
                const percentage = expenses.length > 0 ? Math.round((count / expenses.length) * 100) : 0;
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${
                        priority === 'urgent' ? 'bg-red-500' :
                        priority === 'high' ? 'bg-orange-500' :
                        priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      <span className="text-sm font-medium capitalize">{priority}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{count}</span>
                      <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses; 