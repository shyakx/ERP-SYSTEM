import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Calendar,
  Receipt,
  Building,
  CreditCard
} from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';

const Expenses: React.FC = () => {
  const { user } = useAuth();
  // Static mock Rwandan data for expenses
  const [expenses, setExpenses] = useState<any[]>([
    {
      id: 1,
      expense_number: 'EXP-001',
      description: 'Office supplies for Kigali HQ',
      category: 'Office Supplies',
      subcategory: 'Stationery',
      amount: 120000,
      vendor_name: 'Rwanda Office Mart',
      vendor_contact: '+250 788 123 456',
      payment_method: 'bank_transfer',
      status: 'approved',
      expense_date: '2024-06-01',
      notes: 'Bulk purchase for Q2'
    },
    {
      id: 2,
      expense_number: 'EXP-002',
      description: 'Fuel for company vehicles',
      category: 'Transportation',
      subcategory: 'Fuel',
      amount: 80000,
      vendor_name: 'Kobil Rwanda',
      vendor_contact: '+250 788 234 567',
      payment_method: 'cash',
      status: 'pending',
      expense_date: '2024-06-03'
    },
    {
      id: 3,
      expense_number: 'EXP-003',
      description: 'Printer maintenance',
      category: 'Equipment',
      subcategory: 'Maintenance',
      amount: 50000,
      vendor_name: 'Tech Solutions Rwanda',
      vendor_contact: '+250 788 345 678',
      payment_method: 'bank_transfer',
      status: 'approved',
      expense_date: '2024-06-05'
    },
    {
      id: 4,
      expense_number: 'EXP-004',
      description: 'Electricity bill for May',
      category: 'Utilities',
      subcategory: 'Electricity',
      amount: 150000,
      vendor_name: 'REG Rwanda',
      vendor_contact: '+250 788 456 789',
      payment_method: 'bank_transfer',
      status: 'paid',
      expense_date: '2024-06-07'
    },
    {
      id: 5,
      expense_number: 'EXP-005',
      description: 'Internet subscription',
      category: 'Utilities',
      subcategory: 'Internet',
      amount: 90000,
      vendor_name: 'MTN Rwanda',
      vendor_contact: '+250 788 567 890',
      payment_method: 'bank_transfer',
      status: 'approved',
      expense_date: '2024-06-10'
    },
    {
      id: 6,
      expense_number: 'EXP-006',
      description: 'Insurance premium',
      category: 'Insurance',
      subcategory: 'Health',
      amount: 200000,
      vendor_name: 'Radiant Insurance',
      vendor_contact: '+250 788 678 901',
      payment_method: 'bank_transfer',
      status: 'pending',
      expense_date: '2024-06-12'
    },
    {
      id: 7,
      expense_number: 'EXP-007',
      description: 'Taxi for client meeting',
      category: 'Transportation',
      subcategory: 'Taxi',
      amount: 25000,
      vendor_name: 'Yego Cabs',
      vendor_contact: '+250 788 789 012',
      payment_method: 'cash',
      status: 'rejected',
      expense_date: '2024-06-14'
    },
    {
      id: 8,
      expense_number: 'EXP-008',
      description: 'Water bill for May',
      category: 'Utilities',
      subcategory: 'Water',
      amount: 40000,
      vendor_name: 'WASAC Rwanda',
      vendor_contact: '+250 788 890 123',
      payment_method: 'bank_transfer',
      status: 'approved',
      expense_date: '2024-06-16'
    },
    {
      id: 9,
      expense_number: 'EXP-009',
      description: 'Office cleaning services',
      category: 'Office Supplies',
      subcategory: 'Cleaning',
      amount: 60000,
      vendor_name: 'CleanPro Rwanda',
      vendor_contact: '+250 788 901 234',
      payment_method: 'cash',
      status: 'pending',
      expense_date: '2024-06-18'
    },
    {
      id: 10,
      expense_number: 'EXP-010',
      description: 'Laptop purchase for new staff',
      category: 'Equipment',
      subcategory: 'Electronics',
      amount: 800000,
      vendor_name: 'Rwanda Tech Store',
      vendor_contact: '+250 788 012 345',
      payment_method: 'bank_transfer',
      status: 'approved',
      expense_date: '2024-06-20'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const canManageExpenses = user?.role === 'system_admin' || user?.role === 'finance_manager';
  const canApproveExpenses = user?.role === 'system_admin' || user?.role === 'finance_manager';

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.expense_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'office supplies': return <Receipt className="h-4 w-4" />;
      case 'transportation': return <Building className="h-4 w-4" />;
      case 'equipment': return <Receipt className="h-4 w-4" />;
      case 'utilities': return <Building className="h-4 w-4" />;
      case 'insurance': return <Receipt className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalExpenses = () => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getPendingExpenses = () => {
    return filteredExpenses.filter(expense => expense.status === 'pending').length;
  };

  const getApprovedExpenses = () => {
    return filteredExpenses.filter(expense => expense.status === 'approved').length;
  };

  const getRejectedExpenses = () => {
    return filteredExpenses.filter(expense => expense.status === 'rejected').length;
  };

  // Only update mock state, no API calls
  const handleApproveExpense = (expenseId: number) => {
      setExpenses(expenses.map(expense => 
        expense.id === expenseId ? { ...expense, status: 'approved' } : expense
      ));
  };

  const handleRejectExpense = (expenseId: number) => {
      setExpenses(expenses.map(expense => 
        expense.id === expenseId ? { ...expense, status: 'rejected' } : expense
      ));
  };

  const handleDeleteExpense = (expenseId: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
        setExpenses(expenses.filter(expense => expense.id !== expenseId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
              <p className="text-gray-600 mt-2">Track and manage company expenses</p>
            </div>
            {canManageExpenses && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Expense
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)', opacity: 1, filter: 'none' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">{formatRWF(getTotalExpenses())}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)', opacity: 1, filter: 'none' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{getPendingExpenses()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', opacity: 1, filter: 'none' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{getApprovedExpenses()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f472b6 100%)', opacity: 1, filter: 'none' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{getRejectedExpenses()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search expenses, vendors, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="paid">Paid</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Insurance">Insurance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{expense.expense_number}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{expense.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-1 bg-gray-100 rounded mr-2">
                          {getCategoryIcon(expense.category)}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{expense.category}</div>
                          {expense.subcategory && (
                            <div className="text-xs text-gray-500">{expense.subcategory}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{expense.vendor_name}</div>
                      <div className="text-sm text-gray-500">{expense.vendor_contact}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatRWF(expense.amount)}</div>
                      <div className="text-sm text-gray-500">{expense.payment_method.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(expense.status)}`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(expense.expense_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canApproveExpenses && expense.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveExpense(expense.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRejectExpense(expense.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {canManageExpenses && (
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expense Details Modal */}
        {showDetailsModal && selectedExpense && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expense Number</label>
                    <p className="text-sm text-gray-900">{selectedExpense.expense_number}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-sm text-gray-900">{selectedExpense.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedExpense.category} - {selectedExpense.subcategory}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="text-sm text-gray-900">{formatRWF(selectedExpense.amount)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vendor</label>
                    <p className="text-sm text-gray-900">{selectedExpense.vendor_name}</p>
                    <p className="text-sm text-gray-500">{selectedExpense.vendor_contact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <p className="text-sm text-gray-900">{selectedExpense.payment_method.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedExpense.status)}`}>
                      {selectedExpense.status}
                    </span>
                  </div>
                  {selectedExpense.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <p className="text-sm text-gray-900">{selectedExpense.notes}</p>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses; 