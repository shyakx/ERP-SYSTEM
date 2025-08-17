import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const ExpenseManagement: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const expenseStats = [
    { title: 'Total Expenses', value: 'RWF 0', change: '+0%', icon: 'dollar-sign', color: 'from-red-500 to-red-600', delay: 0 },
    { title: 'This Month', value: 'RWF 0', change: '+0%', icon: 'calendar', color: 'from-blue-500 to-blue-600', delay: 100 },
    { title: 'Pending', value: 'RWF 0', change: '+0%', icon: 'clock', color: 'from-yellow-500 to-yellow-600', delay: 200 },
    { title: 'Approved', value: 'RWF 0', change: '+0%', icon: 'check-circle', color: 'from-green-500 to-green-600', delay: 300 }
  ];

  // Empty recent expenses array - no mock data
  const recentExpenses: any[] = [];

  // Empty expense categories array - no mock data
  const expenseCategories: any[] = [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Expense Management Stats */}
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
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Expenses Table */}
      <AnimatedCard
        title="Recent Expenses"
        subtitle="Latest expense transactions"
        color="red"
        icon="📋"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentExpenses.map((expense, index) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                    <div className="text-xs text-gray-500">{expense.vendor}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(expense.amount)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expense.category}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expense.department}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expense.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">View</button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Expense Categories and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Expense Categories"
          subtitle="Breakdown by category with budget tracking"
          color="blue"
          icon="📊"
          delay={600}
        >
          <div className="space-y-3">
            {expenseCategories.map((category, index) => {
              const budgetUsed = (category.amount / category.budget) * 100;
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(category.amount)}</div>
                      <div className="text-xs text-gray-500">{category.percentage}% of total</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          budgetUsed > 90 ? 'bg-red-500' : 
                          budgetUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{Math.round(budgetUsed)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common expense management tasks"
          color="green"
          icon="⚡"
          delay={800}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Create expense')}
            >
              📄 Create Expense
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Approve expenses')}
            >
              ✅ Approve Expenses
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate report')}
            >
              📊 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Review budget')}
            >
              📋 Review Budget
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Expense Analytics */}
      <AnimatedCard
        title="Expense Analytics"
        subtitle="Performance metrics and trends"
        color="purple"
        icon="📈"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">85%</div>
            <div className="text-sm text-red-600">Budget Used</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">18.2M</div>
            <div className="text-sm text-blue-600">Monthly Expenses</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-green-600">Approval Rate</div>
          </div>
        </div>
      </AnimatedCard>

      {/* Budget Alerts */}
      <AnimatedCard
        title="Budget Alerts"
        subtitle="Categories approaching budget limits"
        color="orange"
        icon="⚠️"
        delay={1200}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-red-900">Equipment & Supplies</p>
                <p className="text-xs text-red-600">95% of budget used</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-red-900">45M / 50M RWF</p>
              <p className="text-xs text-red-600">5M remaining</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-yellow-900">Transportation</p>
                <p className="text-xs text-yellow-600">83% of budget used</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-yellow-900">25M / 30M RWF</p>
              <p className="text-xs text-yellow-600">5M remaining</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-blue-900">Insurance</p>
                <p className="text-xs text-blue-600">83% of budget used</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-900">15M / 18M RWF</p>
              <p className="text-xs text-blue-600">3M remaining</p>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ExpenseManagement; 