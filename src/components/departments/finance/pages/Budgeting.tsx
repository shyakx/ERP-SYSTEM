import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { budgetAPI } from '../../../../services/api.ts';
import { Loader2, Plus, TrendingUp, TrendingDown, CheckCircle, Building2, DollarSign, Calendar } from 'lucide-react';

interface Budget {
  id: string;
  budgetNumber: string;
  name: string;
  type: 'income' | 'expense' | 'capital';
  category: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  year: number;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  description: string;
  projectName: string;
  createdBy: string;
  createdAt: string;
}

const Budgeting: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [budgetStats, setBudgetStats] = useState<any[]>([]);

  // Fetch budgets data
  const { items: budgets, loading: budgetsLoading } = useApiList(budgetAPI.getAll, { limit: 50 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!budgetsLoading && budgets.length > 0) {
      const totalBudget = budgets.reduce((sum: number, b: Budget) => sum + parseFloat(b.allocatedAmount.toString()), 0);
      const totalSpent = budgets.reduce((sum: number, b: Budget) => sum + parseFloat(b.spentAmount.toString()), 0);
      const totalRemaining = budgets.reduce((sum: number, b: Budget) => sum + parseFloat(b.remainingAmount.toString()), 0);
      const activeBudgets = budgets.filter((b: Budget) => b.status === 'active');

      setBudgetStats([
        { 
          title: 'Total Budget', 
          value: formatCurrency(totalBudget), 
          subtitle: 'This Year', 
          color: 'blue', 
          icon: '💰', 
          trend: { value: '+8.5%', isPositive: true }, 
          delay: 0 
        },
        { 
          title: 'Spent', 
          value: formatCurrency(totalSpent), 
          subtitle: 'This Year', 
          color: 'red', 
          icon: '💸', 
          trend: { value: '+12%', isPositive: false }, 
          delay: 100 
        },
        { 
          title: 'Remaining', 
          value: formatCurrency(totalRemaining), 
          subtitle: 'Available', 
          color: 'green', 
          icon: '✅', 
          trend: { value: '-3.5%', isPositive: false }, 
          delay: 200 
        },
        { 
          title: 'Active Budgets', 
          value: activeBudgets.length.toString(), 
          subtitle: 'Active', 
          color: 'purple', 
          icon: '🏢', 
          trend: { value: '+1', isPositive: true }, 
          delay: 300 
        }
      ]);
    }
  }, [budgets, budgetsLoading]);

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
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Calendar className="w-4 h-4" />;
      case 'cancelled': return <TrendingDown className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income': return <TrendingUp className="w-4 h-4" />;
      case 'expense': return <TrendingDown className="w-4 h-4" />;
      case 'capital': return <Building2 className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage <= 90) return 'green';
    if (percentage <= 100) return 'orange';
    return 'red';
  };

  // Calculate budget performance status
  const getBudgetStatus = (budget: Budget) => {
    const percentage = (parseFloat(budget.spentAmount.toString()) / parseFloat(budget.allocatedAmount.toString())) * 100;
    if (percentage <= 90) return 'Under Budget';
    if (percentage <= 100) return 'On Track';
    return 'Over Budget';
  };

  const getBudgetStatusColor = (budget: Budget) => {
    const status = getBudgetStatus(budget);
    switch (status) {
      case 'Under Budget': return 'text-blue-600 bg-blue-100';
      case 'On Track': return 'text-green-600 bg-green-100';
      case 'Over Budget': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Filter budgets by selected year
  const filteredBudgets = budgets.filter((budget: Budget) => budget.year.toString() === selectedYear);

  if (budgetsLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Budgeting</h1>
          <p className="text-gray-600 mt-1">Manage budget planning, tracking, and analysis</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Budget</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {budgetStats.map((stat, index) => (
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
                  <span className="text-sm text-gray-500 ml-1">from last year</span>
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
          </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Year Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter by Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Budget Categories */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBudgets.map((budget: Budget) => {
              const percentage = (parseFloat(budget.spentAmount.toString()) / parseFloat(budget.allocatedAmount.toString())) * 100;
              const progressColor = getProgressColor(percentage);
              
              return (
                <div key={budget.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(budget.type)}
                      <div>
                        <h4 className="font-medium text-gray-900">{budget.name}</h4>
                        <p className="text-sm text-gray-500">{budget.category}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetStatusColor(budget)}`}>
                      {getBudgetStatus(budget)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Allocated:</span>
                      <span className="font-medium">{formatCurrency(parseFloat(budget.allocatedAmount.toString()))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Spent:</span>
                      <span className="font-medium">{formatCurrency(parseFloat(budget.spentAmount.toString()))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Remaining:</span>
                      <span className={`font-medium ${parseFloat(budget.remainingAmount.toString()) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(parseFloat(budget.remainingAmount.toString()))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <span className="font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="mt-3">
                      <AnimatedProgressBar
                        progress={Math.min(percentage, 100)}
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

      {/* Budget List */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Budget Details</h3>
        </div>
        <div className="card-body">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredBudgets.map((budget: Budget) => (
                  <tr key={budget.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{budget.name}</div>
                        <div className="text-sm text-gray-500">{budget.budgetNumber}</div>
                      </div>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(budget.type)}
                        <span className="text-sm text-gray-900 capitalize">{budget.type}</span>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{budget.period}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(parseFloat(budget.allocatedAmount.toString()))}
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-red-600">
                        {formatCurrency(parseFloat(budget.spentAmount.toString()))}
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${
                        parseFloat(budget.remainingAmount.toString()) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {formatCurrency(parseFloat(budget.remainingAmount.toString()))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                        {getStatusIcon(budget.status)}
                        <span className="ml-1 capitalize">{budget.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                </div>
              </div>

      {/* Budget Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Budget Status Distribution</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {['active', 'completed', 'draft', 'cancelled'].map((status) => {
                const count = budgets.filter((b: Budget) => b.status === status).length;
                const percentage = budgets.length > 0 ? Math.round((count / budgets.length) * 100) : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="capitalize">{status}</span>
                      <span className="font-medium">{count} ({percentage}%)</span>
                    </div>
                  <AnimatedProgressBar
                      progress={percentage}
                      color={status === 'active' ? 'green' : status === 'completed' ? 'blue' : status === 'draft' ? 'gray' : 'red'}
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
            <h3 className="text-lg font-semibold text-gray-900">Budget Types</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {['income', 'expense', 'capital'].map((type) => {
                const budgetsOfType = budgets.filter((b: Budget) => b.type === type);
                const totalAllocated = budgetsOfType.reduce((sum: number, b: Budget) => sum + parseFloat(b.allocatedAmount.toString()), 0);
                const totalSpent = budgetsOfType.reduce((sum: number, b: Budget) => sum + parseFloat(b.spentAmount.toString()), 0);
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(type)}
                      <span className="text-sm font-medium capitalize">{type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{budgetsOfType.length} budgets</div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(totalSpent)} / {formatCurrency(totalAllocated)}
                      </div>
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

export default Budgeting;
