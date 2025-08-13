import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { transactionAPI, budgetAPI, accountAPI } from '../../../../services/api.ts';
import { Loader2, Plus, TrendingUp, TrendingDown, CheckCircle, Building2, DollarSign, Calendar, Target, BarChart3 } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  transactionDate: string;
  status: string;
  category: string;
}

interface Budget {
  id: string;
  name: string;
  type: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  status: string;
  startDate: string;
  endDate: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  currentBalance: number;
  currency: string;
}

const FinancialPlanning: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024');
  const [planningStats, setPlanningStats] = useState<any[]>([]);
  const [financialGoals, setFinancialGoals] = useState<any[]>([]);

  // Fetch data from APIs
  const { items: transactions, loading: transactionsLoading } = useApiList(transactionAPI.getAll, { limit: 1000 });
  const { items: budgets, loading: budgetsLoading } = useApiList(budgetAPI.getAll, { limit: 100 });
  const { items: accounts, loading: accountsLoading } = useApiList(accountAPI.getAll, { limit: 100 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!transactionsLoading && !budgetsLoading && !accountsLoading) {
      const calculateStats = () => {
        const currentYear = parseInt(selectedPeriod);
        const yearTransactions = transactions.filter((t: Transaction) => {
          const transactionDate = new Date(t.transactionDate);
          return transactionDate.getFullYear() === currentYear;
        });

        const totalRevenue = yearTransactions
          .filter((t: Transaction) => t.type === 'income' && t.status === 'completed')
          .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()), 0);

        const totalExpenses = yearTransactions
          .filter((t: Transaction) => t.type === 'expense' && t.status === 'completed')
          .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()), 0);

        const netProfit = totalRevenue - totalExpenses;
        const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

        // Calculate growth rate (simplified - could be more sophisticated)
        const growthRate = totalRevenue > 0 ? 12.5 : 0;

        return [
          { 
            title: 'Total Revenue', 
            value: formatCurrency(totalRevenue), 
            subtitle: 'Projected', 
            color: 'blue', 
            icon: '💰', 
            trend: { value: '+15%', isPositive: true }, 
            delay: 0 
          },
          { 
            title: 'Total Expenses', 
            value: formatCurrency(totalExpenses), 
            subtitle: 'Projected', 
            color: 'red', 
            icon: '💸', 
            trend: { value: '+8%', isPositive: false }, 
            delay: 100 
          },
          { 
            title: 'Net Profit', 
            value: formatCurrency(netProfit), 
            subtitle: 'Projected', 
            color: 'green', 
            icon: '📈', 
            trend: { value: '+22%', isPositive: true }, 
            delay: 200 
          },
          { 
            title: 'Growth Rate', 
            value: `${growthRate}%`, 
            subtitle: 'Annual', 
            color: 'purple', 
            icon: '📊', 
            trend: { value: '+3%', isPositive: true }, 
            delay: 300 
          }
        ];
      };

      const calculateGoals = () => {
        const currentYear = parseInt(selectedPeriod);
        const yearTransactions = transactions.filter((t: Transaction) => {
          const transactionDate = new Date(t.transactionDate);
          return transactionDate.getFullYear() === currentYear;
        });

        const totalRevenue = yearTransactions
          .filter((t: Transaction) => t.type === 'income' && t.status === 'completed')
          .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()), 0);

        const totalExpenses = yearTransactions
          .filter((t: Transaction) => t.type === 'expense' && t.status === 'completed')
          .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount.toString()), 0);

        const netProfit = totalRevenue - totalExpenses;
        const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

        // Calculate cash flow from accounts
        const totalCashFlow = accounts.reduce((sum: number, a: Account) => sum + parseFloat(a.currentBalance.toString()), 0);

        return [
    {
      id: 1,
            name: 'Revenue Growth', 
            target: 300000000, 
            current: totalRevenue, 
            period: selectedPeriod, 
            status: totalRevenue >= 300000000 ? 'On Track' : 'Behind' 
    },
    {
      id: 2,
            name: 'Cost Reduction', 
            target: 180000000, 
            current: totalExpenses, 
            period: selectedPeriod, 
            status: totalExpenses <= 180000000 ? 'On Track' : 'Behind' 
    },
    {
      id: 3,
            name: 'Profit Margin', 
            target: 25, 
            current: profitMargin, 
            period: selectedPeriod, 
            status: profitMargin >= 25 ? 'On Track' : 'Behind' 
    },
    {
      id: 4,
            name: 'Cash Flow', 
            target: 50000000, 
            current: totalCashFlow, 
            period: selectedPeriod, 
            status: totalCashFlow >= 50000000 ? 'On Track' : 'Behind' 
          }
        ];
      };

      setPlanningStats(calculateStats());
      setFinancialGoals(calculateGoals());
    }
  }, [transactions, budgets, accounts, selectedPeriod, transactionsLoading, budgetsLoading, accountsLoading]);

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
      case 'Behind': return 'text-red-600 bg-red-100';
      case 'At Risk': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'yellow';
    return 'red';
  };

  const getBudgetForecasts = () => {
    // Group budgets by category and calculate forecasts
    const budgetByCategory = budgets.reduce((acc: any, budget: Budget) => {
      if (!acc[budget.category]) {
        acc[budget.category] = {
          currentYear: 0,
          nextYear: 0,
          count: 0
        };
      }
      acc[budget.category].currentYear += parseFloat(budget.allocatedAmount.toString());
      acc[budget.category].nextYear += parseFloat(budget.allocatedAmount.toString()) * 1.1; // 10% growth assumption
      acc[budget.category].count += 1;
      return acc;
    }, {});

    return Object.entries(budgetByCategory).map(([category, data]: [string, any]) => {
      const change = ((data.nextYear - data.currentYear) / data.currentYear) * 100;
      return {
        id: category,
        category,
        currentYear: data.currentYear,
        nextYear: data.nextYear,
        change: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
        status: 'Planned'
      };
    });
  };

  const getStrategicInitiatives = () => {
    // Create strategic initiatives based on budget data
    const totalBudget = budgets.reduce((sum: number, b: Budget) => sum + parseFloat(b.allocatedAmount.toString()), 0);
    const spentBudget = budgets.reduce((sum: number, b: Budget) => sum + parseFloat(b.spentAmount.toString()), 0);
    const progress = totalBudget > 0 ? (spentBudget / totalBudget) * 100 : 0;

    return [
      {
        id: 1,
        name: 'Digital Transformation',
        description: 'Implement new ERP system and automation tools',
        budget: totalBudget * 0.15,
        timeline: 'Q3-Q4 2024',
        status: progress > 50 ? 'In Progress' : 'Planning',
        progress: Math.min(progress, 100)
      },
      {
        id: 2,
        name: 'Market Expansion',
        description: 'Expand services to new regions in Rwanda',
        budget: totalBudget * 0.25,
        timeline: 'Q2-Q4 2024',
        status: progress > 25 ? 'In Progress' : 'Planning',
        progress: Math.min(progress * 0.5, 100)
      },
      {
        id: 3,
        name: 'Staff Development',
        description: 'Training and certification programs for employees',
        budget: totalBudget * 0.10,
        timeline: 'Q1-Q4 2024',
        status: progress > 30 ? 'In Progress' : 'Planning',
        progress: Math.min(progress * 0.7, 100)
      },
      {
        id: 4,
        name: 'Infrastructure Upgrade',
        description: 'Office renovation and equipment upgrades',
        budget: totalBudget * 0.20,
        timeline: 'Q3 2024',
        status: progress > 10 ? 'In Progress' : 'Planned',
        progress: Math.min(progress * 0.2, 100)
      }
    ];
  };

  if (transactionsLoading || budgetsLoading || accountsLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Financial Planning</h1>
          <p className="text-gray-600 mt-1">Strategic financial planning and forecasting</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          + New Plan
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {planningStats.map((stat, index) => (
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

      {/* Financial Goals */}
      <AnimatedCard
        title="Financial Goals & KPIs"
        subtitle="Track progress against strategic objectives"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-4">
          {financialGoals.map((goal) => {
            const percentage = goal.current / goal.target * 100;
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-500">
                      {goal.name === 'Profit Margin' 
                        ? `${goal.current}% / ${goal.target}%`
                        : `${formatCurrency(goal.current)} / ${formatCurrency(goal.target)}`
                      }
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status}
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
                  <span className="text-gray-600">Period: {goal.period}</span>
                  <span className="text-gray-600">{percentage.toFixed(1)}% achieved</span>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Budget Forecasts */}
      <AnimatedCard
        title="Budget Forecasts"
        subtitle="Next year budget projections by category"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Planning Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getBudgetForecasts().map((forecast) => (
                <tr key={forecast.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{forecast.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(forecast.currentYear)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(forecast.nextYear)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      forecast.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {forecast.change}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(forecast.status)}`}>
                      {forecast.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Strategic Initiatives */}
      <AnimatedCard
        title="Strategic Initiatives"
        subtitle="Key projects and their financial impact"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-4">
          {getStrategicInitiatives().map((initiative) => (
            <div key={initiative.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{initiative.name}</h3>
                  <p className="text-sm text-gray-500">{initiative.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                  {initiative.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(initiative.budget)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Timeline</p>
                  <p className="text-sm font-medium text-gray-900">{initiative.timeline}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Progress</p>
                  <p className="text-sm font-medium text-gray-900">{initiative.progress}%</p>
                </div>
              </div>
              <AnimatedProgressBar
                progress={initiative.progress}
                color={getProgressColor(initiative.progress)}
                height={6}
                showLabel={false}
              />
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Planning Tools */}
      <AnimatedCard
        title="Financial Planning Tools"
        subtitle="Quick actions for planning activities"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Create Forecast</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">🎯</span>
            <span className="text-sm font-medium text-gray-700">Set Goals</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📈</span>
            <span className="text-sm font-medium text-gray-700">Scenario Analysis</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">📋</span>
            <span className="text-sm font-medium text-gray-700">Reports</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Planning Analytics */}
      <AnimatedCard
        title="Planning Analytics"
        subtitle="Financial planning insights and trends"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Revenue Projections</h4>
            <AnimatedProgressBar
              progress={85}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={72}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Cost Projections</h4>
            <AnimatedProgressBar
              progress={65}
              color="red"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
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

export default FinancialPlanning; 