import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const Budgeting: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const budgetStats = [
    { title: 'Total Budget', value: '245.6M RWF', subtitle: 'This Year', color: 'blue', icon: '💰', trend: { value: '+8.5%', isPositive: true }, delay: 0 },
    { title: 'Spent', value: '189.3M RWF', subtitle: 'This Year', color: 'red', icon: '💸', trend: { value: '+12%', isPositive: false }, delay: 100 },
    { title: 'Remaining', value: '56.3M RWF', subtitle: 'Available', color: 'green', icon: '✅', trend: { value: '-3.5%', isPositive: false }, delay: 200 },
    { title: 'Departments', value: '9', subtitle: 'Active', color: 'purple', icon: '🏢', trend: { value: '+1', isPositive: true }, delay: 300 }
  ];

  const departments = [
    { id: 1, name: 'HR & Admin', budget: 45000000, spent: 38000000, remaining: 7000000, status: 'On Track', category: 'Operations' },
    { id: 2, name: 'IT & Technology', budget: 68000000, spent: 72000000, remaining: -4000000, status: 'Over Budget', category: 'Technology' },
    { id: 3, name: 'Security', budget: 52000000, spent: 48000000, remaining: 4000000, status: 'Under Budget', category: 'Operations' },
    { id: 4, name: 'Sales & Marketing', budget: 35000000, spent: 32000000, remaining: 3000000, status: 'On Track', category: 'Revenue' },
    { id: 5, name: 'Finance', budget: 25000000, spent: 22000000, remaining: 3000000, status: 'Under Budget', category: 'Operations' }
  ];

  const budgetCategories = [
    {
      id: 1,
      name: 'Personnel Costs',
      budget: 120000000,
      spent: 98000000,
      remaining: 22000000,
      percentage: 82
    },
    {
      id: 2,
      name: 'Equipment & Technology',
      budget: 45000000,
      spent: 52000000,
      remaining: -7000000,
      percentage: 116
    },
    {
      id: 3,
      name: 'Marketing & Sales',
      budget: 35000000,
      spent: 32000000,
      remaining: 3000000,
      percentage: 91
    },
    {
      id: 4,
      name: 'Operations & Maintenance',
      budget: 25000000,
      spent: 22000000,
      remaining: 3000000,
      percentage: 88
    },
    {
      id: 5,
      name: 'Administrative',
      budget: 20000000,
      spent: 18000000,
      remaining: 2000000,
      percentage: 90
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
      case 'On Track': return 'text-green-600 bg-green-100';
      case 'Under Budget': return 'text-blue-600 bg-blue-100';
      case 'Over Budget': return 'text-red-600 bg-red-100';
      case 'At Risk': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage <= 90) return 'green';
    if (percentage <= 100) return 'orange';
    return 'red';
  };

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Create Budget
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {budgetStats.map((stat, index) => (
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

      {/* Department Budgets */}
      <AnimatedCard
        title="Department Budgets"
        subtitle="Track budget performance by department"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{dept.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(dept.budget)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(dept.spent)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      dept.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(dept.remaining)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dept.status)}`}>
                      {dept.status}
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
                      Adjust
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Budget Categories */}
      <AnimatedCard
        title="Budget Categories"
        subtitle="Track spending by category"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-4">
          {budgetCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(category.budget)}</p>
                  <p className="text-xs text-gray-500">Budget</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 mr-4">
                  <AnimatedProgressBar
                    progress={category.percentage}
                    color={getProgressColor(category.percentage)}
                    height={8}
                    showLabel={true}
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(category.spent)}</p>
                  <p className="text-xs text-gray-500">Spent</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  category.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {category.remaining >= 0 ? 'Remaining:' : 'Over Budget:'} {formatCurrency(Math.abs(category.remaining))}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  category.percentage <= 90 ? 'bg-green-100 text-green-800' :
                  category.percentage <= 100 ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {category.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Budget Planning */}
      <AnimatedCard
        title="Budget Planning"
        subtitle="Create and manage budget plans"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Create Budget</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📈</span>
            <span className="text-sm font-medium text-gray-700">Forecast</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📋</span>
            <span className="text-sm font-medium text-gray-700">Reports</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">⚙️</span>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Budget Analytics */}
      <AnimatedCard
        title="Budget Analytics"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Budget Utilization</h4>
            <AnimatedProgressBar
              progress={77}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={65}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Department Performance</h4>
            <AnimatedProgressBar
              progress={85}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
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

export default Budgeting;
