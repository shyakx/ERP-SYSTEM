import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { 
  PieChart, 
  Target, 
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Eye,
  DollarSign,
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Budget {
  id: string;
  name: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: 'on-track' | 'over-budget' | 'under-budget';
  lastUpdated: string;
}

interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'high' | 'medium' | 'low';
}

const BudgetPlanning: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Security Operations',
      category: 'Operations',
      allocated: 5000000,
      spent: 3200000,
      remaining: 1800000,
      period: 'Q1 2024',
      status: 'on-track',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Employee Salaries',
      category: 'HR',
      allocated: 8000000,
      spent: 8000000,
      remaining: 0,
      period: 'January 2024',
      status: 'on-track',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      name: 'Equipment & Maintenance',
      category: 'Operations',
      allocated: 2000000,
      spent: 2200000,
      remaining: -200000,
      period: 'Q1 2024',
      status: 'over-budget',
      lastUpdated: '2024-01-14'
    },
    {
      id: '4',
      name: 'Marketing & Sales',
      category: 'Marketing',
      allocated: 1500000,
      spent: 800000,
      remaining: 700000,
      period: 'Q1 2024',
      status: 'under-budget',
      lastUpdated: '2024-01-13'
    },
    {
      id: '5',
      name: 'Office Expenses',
      category: 'Administration',
      allocated: 1000000,
      spent: 750000,
      remaining: 250000,
      period: 'Q1 2024',
      status: 'on-track',
      lastUpdated: '2024-01-12'
    }
  ]);

  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build emergency fund for 6 months of operations',
      targetAmount: 50000000,
      currentAmount: 35000000,
      deadline: '2024-06-30',
      status: 'active',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Equipment Upgrade',
      description: 'Upgrade security equipment and technology',
      targetAmount: 15000000,
      currentAmount: 8000000,
      deadline: '2024-03-31',
      status: 'active',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Expansion Fund',
      description: 'Fund for business expansion to new locations',
      targetAmount: 100000000,
      currentAmount: 25000000,
      deadline: '2024-12-31',
      status: 'active',
      priority: 'low'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'budget' | 'goals'>('budget');
  const [showAddModal, setShowAddModal] = useState(false);

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
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'under-budget': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4" />;
      case 'over-budget': return <AlertTriangle className="w-4 h-4" />;
      case 'under-budget': return <TrendingDown className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  const handleAddBudget = () => {
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget & Planning</h2>
          <p className="text-gray-600">Manage budgets and financial goals</p>
        </div>
        <AnimatedButton
          onClick={handleAddBudget}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Budget</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard
          title="Total Allocated"
          subtitle="Budget allocation"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAllocated)}</p>
              <p className="text-sm text-gray-500">Total budget</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Spent"
          subtitle="Amount spent"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
              <p className="text-sm text-gray-500">
                {Math.round((totalSpent / totalAllocated) * 100)}% of budget
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Remaining"
          subtitle="Available funds"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalRemaining)}
              </p>
              <p className="text-sm text-gray-500">Remaining budget</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('budget')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'budget'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <PieChart className="w-4 h-4" />
                <span>Budget Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('goals')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'goals'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Financial Goals</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'budget' ? (
            /* Budget Management */
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Allocated</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Spent</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Remaining</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets.map((budget) => (
                      <tr key={budget.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{budget.name}</p>
                            <p className="text-sm text-gray-500">{budget.period}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{budget.category}</td>
                        <td className="py-3 px-4 text-gray-700">{formatCurrency(budget.allocated)}</td>
                        <td className="py-3 px-4 text-gray-700">{formatCurrency(budget.spent)}</td>
                        <td className={`py-3 px-4 font-semibold ${
                          budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(budget.remaining)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                            {getStatusIcon(budget.status)}
                            <span className="ml-1 capitalize">{budget.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                budget.spent > budget.allocated ? 'bg-red-600' : 'bg-blue-600'
                              }`}
                              style={{ 
                                width: `${Math.min((budget.spent / budget.allocated) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round((budget.spent / budget.allocated) * 100)}%
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Financial Goals */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {financialGoals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                        {getStatusIcon(goal.status)}
                        <span className="ml-1 capitalize">{goal.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-600"
                          style={{ 
                            width: `${(goal.currentAmount / goal.targetAmount) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatCurrency(goal.currentAmount)}</span>
                        <span>{formatCurrency(goal.targetAmount)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">Due: {goal.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Budget Overview */}
      <AnimatedCard
        title="Budget Overview"
        subtitle="Visual representation of budget allocation"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Budget by Category</h4>
            <div className="space-y-3">
              {budgets.map((budget) => (
                <div key={budget.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{budget.category}</span>
                    <span>{formatCurrency(budget.allocated)}</span>
                  </div>
                  <AnimatedProgressBar
                    progress={(budget.allocated / totalAllocated) * 100}
                    color="blue"
                    height={6}
                    showLabel={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Spending vs Allocation</h4>
            <div className="space-y-3">
              {budgets.map((budget) => (
                <div key={budget.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{budget.name}</span>
                    <span>{Math.round((budget.spent / budget.allocated) * 100)}%</span>
                  </div>
                  <AnimatedProgressBar
                    progress={(budget.spent / budget.allocated) * 100}
                    color={budget.spent > budget.allocated ? 'red' : 'green'}
                    height={6}
                    showLabel={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default BudgetPlanning;
