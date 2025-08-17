import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const BudgetManagement: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  // Empty budget data array - no mock data
  const budgetData: any[] = [];

  const budgetStats = [
    {
      title: 'Total Budget',
      value: 'RWF 0',
      change: '+0%',
      icon: 'dollar-sign',
      color: 'from-green-500 to-green-600',
      delay: 0
    },
    {
      title: 'Total Spent',
      value: 'RWF 0',
      change: '+0%',
      icon: 'trending-up',
      color: 'from-blue-500 to-blue-600',
      delay: 100
    },
    {
      title: 'Remaining',
      value: 'RWF 0',
      change: '+0%',
      icon: 'trending-down',
      color: 'from-orange-500 to-orange-600',
      delay: 200
    },
    {
      title: 'Overspent',
      value: 'RWF 0',
      change: '+0%',
      icon: 'alert-triangle',
      color: 'from-red-500 to-red-600',
      delay: 300
    }
  ];

  const budgetCategories = [
    { category: 'Personnel Costs', budget: 85000000, spent: 62000000, remaining: 23000000, color: 'blue' },
    { category: 'Operational Expenses', budget: 35000000, spent: 25000000, remaining: 10000000, color: 'green' },
    { category: 'Technology & Equipment', budget: 20000000, spent: 15000000, remaining: 5000000, color: 'purple' },
    { category: 'Marketing & Sales', budget: 8000000, spent: 5500000, remaining: 2500000, color: 'orange' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Over Budget': return 'bg-red-100 text-red-800';
      case 'Under Budget': return 'bg-blue-100 text-blue-800';
      case 'Critical': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Budget Stats */}
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
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Table */}
      <AnimatedCard
        title="Department Budgets"
        subtitle="Budget allocation and spending by department"
        color="green"
        icon="📊"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Budget</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Spent</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Progress</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetData.map((budget, index) => (
                <tr
                  key={budget.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-xs">{budget.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{budget.department}</p>
                        <p className="text-xs text-gray-500">{budget.manager}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="text-sm text-gray-900">{formatCurrency(budget.budget)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{formatCurrency(budget.spent)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="flex-1 mr-2">
                        <AnimatedProgressBar 
                          progress={budget.percentage} 
                          color={budget.percentage > 80 ? 'red' : budget.percentage > 70 ? 'yellow' : 'green'} 
                          height={4} 
                        />
                      </div>
                      <span className="text-xs text-gray-500">{budget.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(budget.status)}`}>
                      {budget.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <AnimatedButton
                        color="green"
                        size="sm"
                        onClick={() => console.log(`View budget for ${budget.department}`)}
                      >
                        View
                      </AnimatedButton>
                      <AnimatedButton
                        color="blue"
                        size="sm"
                        onClick={() => console.log(`Edit budget for ${budget.department}`)}
                      >
                        Edit
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Budget Categories and Remaining Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Budget Categories"
          subtitle="Budget allocation by expense category"
          color="blue"
          icon="📋"
          delay={600}
        >
          <div className="space-y-3">
            {budgetCategories.map((category, index) => (
              <div
                key={category.category}
                className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{category.category}</h4>
                  <span className="text-xs font-semibold text-gray-600">
                    {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Spent</span>
                    <span className="text-gray-900">{formatCurrency(category.spent)}</span>
                  </div>
                  <AnimatedProgressBar 
                    progress={(category.spent / category.budget) * 100} 
                    color="blue" 
                    height={4} 
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Remaining</span>
                    <span className="text-green-600 font-medium">{formatCurrency(category.remaining)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Budget Alerts"
          subtitle="Departments requiring attention"
          color="purple"
          icon="⚠️"
          delay={800}
        >
          <div className="space-y-3">
            {budgetData.filter(b => b.status === 'Over Budget').map((budget, index) => (
              <div
                key={budget.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-xs">{budget.avatar}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{budget.department}</p>
                    <p className="text-xs text-gray-500">{budget.percentage}% spent</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-600">Overspent</p>
                  <p className="text-xs text-red-600 font-medium">{formatCurrency(budget.spent - budget.budget)}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Budget Planning and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Budget Planning"
          subtitle="Upcoming budget planning activities"
          color="indigo"
          icon="📝"
          delay={1000}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Q2 Budget Review</h4>
              <p className="text-xs text-gray-700 mb-2">Scheduled for March 15, 2024</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Status</span>
                <span className="text-indigo-600 font-medium">Scheduled</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Annual Budget Planning</h4>
              <p className="text-xs text-gray-700 mb-2">Starting April 1, 2024</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Status</span>
                <span className="text-indigo-600 font-medium">Planning</span>
              </div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Budget Approval Meeting</h4>
              <p className="text-xs text-gray-700 mb-2">Scheduled for May 10, 2024</p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Status</span>
                <span className="text-indigo-600 font-medium">Pending</span>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common budget management tasks"
          color="orange"
          icon="⚡"
          delay={1200}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Create new budget')}
            >
              📊 Create Budget
            </AnimatedButton>
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Review budget performance')}
            >
              📈 Review Performance
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate budget report')}
            >
              📋 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Adjust budget allocations')}
            >
              ⚙️ Adjust Allocations
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Budget Analytics */}
      <AnimatedCard
        title="Budget Analytics"
        subtitle="Budget performance trends and insights"
        color="teal"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Budget Utilization</span>
              <span className="text-xs font-semibold text-gray-900">72%</span>
            </div>
            <AnimatedProgressBar progress={72} color="green" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Departments On Track</span>
              <span className="text-xs font-semibold text-gray-900">3/5</span>
            </div>
            <AnimatedProgressBar progress={60} color="blue" height={6} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Average Variance</span>
              <span className="text-xs font-semibold text-gray-900">-5.2%</span>
            </div>
            <AnimatedProgressBar progress={85} color="purple" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Forecast Accuracy</span>
              <span className="text-xs font-semibold text-gray-900">94%</span>
            </div>
            <AnimatedProgressBar progress={94} color="orange" height={6} />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default BudgetManagement; 