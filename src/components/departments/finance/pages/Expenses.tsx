import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const Expenses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const expenseStats = [
    { title: 'Total Expenses', value: '189.3M RWF', subtitle: 'This Year', color: 'red', icon: '💸', trend: { value: '+8%', isPositive: false }, delay: 0 },
    { title: 'This Month', value: '15.8M RWF', subtitle: 'Current', color: 'orange', icon: '📅', trend: { value: '+12%', isPositive: false }, delay: 100 },
    { title: 'Pending', value: '3.2M RWF', subtitle: 'Approval', color: 'yellow', icon: '⏳', trend: { value: '-5%', isPositive: true }, delay: 200 },
    { title: 'Categories', value: '12', subtitle: 'Active', color: 'blue', icon: '📂', trend: { value: '+2', isPositive: true }, delay: 300 }
  ];

  const expenseCategories = [
    { id: 1, name: 'Personnel & Salaries', budget: 85000000, spent: 72000000, remaining: 13000000, status: 'On Track' },
    { id: 2, name: 'Operations & Maintenance', budget: 45000000, spent: 38000000, remaining: 7000000, status: 'On Track' },
    { id: 3, name: 'Equipment & Technology', budget: 25000000, spent: 28000000, remaining: -3000000, status: 'Over Budget' },
    { id: 4, name: 'Marketing & Advertising', budget: 15000000, spent: 12000000, remaining: 3000000, status: 'On Track' },
    { id: 5, name: 'Utilities & Rent', budget: 18000000, spent: 17500000, remaining: 500000, status: 'On Track' },
    { id: 6, name: 'Travel & Transportation', budget: 8000000, spent: 6500000, remaining: 1500000, status: 'On Track' }
  ];

  const recentExpenses = [
    {
      id: 1,
      description: 'Security Equipment Purchase',
      category: 'Equipment & Technology',
      amount: 850000,
      date: '2024-02-15',
      status: 'Approved',
      approver: 'John Doe',
      receipt: 'REC-2024-001'
    },
    {
      id: 2,
      description: 'Office Supplies',
      category: 'Operations & Maintenance',
      amount: 125000,
      date: '2024-02-14',
      status: 'Pending',
      approver: 'Jane Smith',
      receipt: 'REC-2024-002'
    },
    {
      id: 3,
      description: 'Monthly Internet & Phone',
      category: 'Utilities & Rent',
      amount: 45000,
      date: '2024-02-13',
      status: 'Approved',
      approver: 'Mike Johnson',
      receipt: 'REC-2024-003'
    },
    {
      id: 4,
      description: 'Client Meeting Lunch',
      category: 'Travel & Transportation',
      amount: 85000,
      date: '2024-02-12',
      status: 'Approved',
      approver: 'Sarah Wilson',
      receipt: 'REC-2024-004'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'On Track': return 'text-green-600 bg-green-100';
      case 'Over Budget': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'red';
    if (percentage >= 75) return 'orange';
    return 'green';
  };

  const filteredCategories = selectedCategory === 'all' 
    ? expenseCategories 
    : expenseCategories.filter(category => category.status === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all business expenses</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Expense
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {expenseStats.map((stat, index) => (
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

      {/* Expense Categories */}
      <AnimatedCard
        title="Expense Categories"
        subtitle="Budget tracking by category"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="On Track">On Track</option>
              <option value="Over Budget">Over Budget</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            return (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                    {category.status}
                  </span>
                </div>
                <div className="mb-2">
                  <AnimatedProgressBar
                    progress={percentage}
                    color={getProgressColor(percentage)}
                    height={8}
                    showLabel={true}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining: {formatCurrency(category.remaining)}</span>
                  <span className="text-gray-600">{percentage.toFixed(1)}% used</span>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Recent Expenses */}
      <AnimatedCard
        title="Recent Expenses"
        subtitle="Latest expense entries and approvals"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-sm font-medium">💸</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category} • {expense.receipt}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">{formatCurrency(expense.amount)}</p>
                <p className="text-sm text-gray-500">{expense.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                  {expense.status}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Expense Management Tools */}
      <AnimatedCard
        title="Expense Management Tools"
        subtitle="Quick actions for expense operations"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <span className="text-red-600">➕</span>
            <span className="text-sm font-medium text-gray-700">Add Expense</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">✅</span>
            <span className="text-sm font-medium text-gray-700">Approve Expenses</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Expense Reports</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">⚙️</span>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Expense Analytics */}
      <AnimatedCard
        title="Expense Analytics"
        subtitle="Expense trends and insights"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Monthly Expense Trends</h4>
            <AnimatedProgressBar
              progress={75}
              color="red"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={60}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Category Performance</h4>
            <AnimatedProgressBar
              progress={85}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Expenses; 