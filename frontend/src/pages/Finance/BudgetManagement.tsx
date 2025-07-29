import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  BarChart3,
  PieChart,
  Target,
  XCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface Budget {
  id: string;
  department: string;
  category: string;
  fiscalYear: string;
  period: string;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'active';
  submittedBy: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  notes: string;
}

interface BudgetSummary {
  totalBudgeted: number;
  totalActual: number;
  totalVariance: number;
  averageVariancePercentage: number;
  approvedBudgets: number;
  pendingBudgets: number;
  rejectedBudgets: number;
}

const BudgetManagement = () => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [summary, setSummary] = useState<BudgetSummary>({
    totalBudgeted: 0,
    totalActual: 0,
    totalVariance: 0,
    averageVariancePercentage: 0,
    approvedBudgets: 0,
    pendingBudgets: 0,
    rejectedBudgets: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('all');
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/api/budgets');
      setBudgets(data);
      
      // Calculate summary
      const summaryData: BudgetSummary = {
        totalBudgeted: data.reduce((sum: number, budget: Budget) => sum + budget.budgetedAmount, 0),
        totalActual: data.reduce((sum: number, budget: Budget) => sum + budget.actualAmount, 0),
        totalVariance: data.reduce((sum: number, budget: Budget) => sum + budget.variance, 0),
        averageVariancePercentage: data.length > 0 ? data.reduce((sum: number, budget: Budget) => sum + budget.variancePercentage, 0) / data.length : 0,
        approvedBudgets: data.filter((budget: Budget) => budget.status === 'approved').length,
        pendingBudgets: data.filter((budget: Budget) => budget.status === 'pending').length,
        rejectedBudgets: data.filter((budget: Budget) => budget.status === 'rejected').length
      };
      setSummary(summaryData);
    } catch (error) {
      console.error('Error fetching budget data:', error);
      toast.error('Failed to fetch budget data');
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Operations',
    'Security',
    'IT',
    'Finance',
    'HR',
    'Sales',
    'Marketing',
    'Logistics'
  ];

  const categories = [
    'Personnel',
    'Equipment',
    'Software',
    'Utilities',
    'Maintenance',
    'Marketing',
    'Travel',
    'Training',
    'Insurance',
    'Other'
  ];

  const fiscalYears = ['2024', '2023', '2022'];

  const filteredBudgets = budgets.filter(budget => 
    budget.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    budget.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(budget => 
    selectedDepartment === 'all' || budget.department === selectedDepartment
  ).filter(budget => 
    selectedStatus === 'all' || budget.status === selectedStatus
  ).filter(budget => 
    selectedFiscalYear === 'all' || budget.fiscalYear === selectedFiscalYear
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'active': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                Budget Management
              </h1>
              <p className="text-gray-600 mt-2">Plan, track, and manage organizational budgets</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddBudget(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Budget
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Budgeted</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalBudgeted)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Actual</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalActual)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Variance</p>
                <p className={`text-2xl font-bold ${getVarianceColor(summary.totalVariance)}`}>
                  {formatCurrency(summary.totalVariance)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Variance</p>
                <p className={`text-2xl font-bold ${getVarianceColor(summary.averageVariancePercentage)}`}>
                  {formatPercentage(summary.averageVariancePercentage)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Approved</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{summary.approvedBudgets}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{summary.pendingBudgets}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Rejected</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{summary.rejectedBudgets}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budgeted</span>
                <span className="text-sm font-medium text-blue-600">{formatCurrency(summary.totalBudgeted)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="text-sm font-medium text-green-600">{formatCurrency(summary.totalActual)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium text-gray-900">Variance</span>
                <span className={`text-sm font-bold ${getVarianceColor(summary.totalVariance)}`}>
                  {formatCurrency(summary.totalVariance)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
            <div className="space-y-3">
              {categories.slice(0, 5).map(category => {
                const categoryBudgets = budgets.filter(b => b.category === category);
                const totalBudgeted = categoryBudgets.reduce((sum, b) => sum + b.budgetedAmount, 0);
                const totalActual = categoryBudgets.reduce((sum, b) => sum + b.actualAmount, 0);
                const variance = totalActual - totalBudgeted;
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(totalBudgeted)}</div>
                      <div className={`text-xs ${getVarianceColor(variance)}`}>
                        {formatCurrency(variance)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search departments or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="active">Active</option>
              </select>
              <select
                value={selectedFiscalYear}
                onChange={(e) => setSelectedFiscalYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                {fiscalYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Budgets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budgeted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBudgets.map(budget => (
                  <tr key={budget.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{budget.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{budget.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(budget.budgetedAmount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(budget.actualAmount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${getVarianceColor(budget.variance)}`}>
                        {formatCurrency(budget.variance)}
                      </div>
                      <div className={`text-xs ${getVarianceColor(budget.variancePercentage)}`}>
                        {formatPercentage(budget.variancePercentage)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                        {budget.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{budget.period}</div>
                        <div className="text-sm text-gray-500">{budget.fiscalYear}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedBudget(budget)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Detail Modal */}
        {selectedBudget && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Budget Details</h3>
                  <button
                    onClick={() => setSelectedBudget(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <p className="text-sm text-gray-900">{selectedBudget.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900">{selectedBudget.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fiscal Year</label>
                      <p className="text-sm text-gray-900">{selectedBudget.fiscalYear}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Period</label>
                      <p className="text-sm text-gray-900">{selectedBudget.period}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedBudget.status)}`}>
                        {selectedBudget.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted By</label>
                      <p className="text-sm text-gray-900">{selectedBudget.submittedBy}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Budget Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Budgeted Amount</span>
                        <span className="text-sm font-medium text-blue-600">{formatCurrency(selectedBudget.budgetedAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Actual Amount</span>
                        <span className="text-sm font-medium text-green-600">{formatCurrency(selectedBudget.actualAmount)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium text-gray-900">Variance</span>
                        <span className={`text-sm font-bold ${getVarianceColor(selectedBudget.variance)}`}>
                          {formatCurrency(selectedBudget.variance)} ({formatPercentage(selectedBudget.variancePercentage)})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBudget.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Approve Budget
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Generate Report
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManagement; 