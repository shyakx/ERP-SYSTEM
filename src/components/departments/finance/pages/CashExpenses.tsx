import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Banknote, 
  Receipt, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  Building,
  TrendingUp,
  TrendingDown,
  Filter,
  Search
} from 'lucide-react';

interface CashAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'petty-cash';
  balance: number;
  currency: string;
  lastTransaction: string;
  status: 'active' | 'inactive';
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  submittedBy: string;
  approvedBy?: string;
  receipt?: string;
  notes?: string;
}

const CashExpenses: React.FC = () => {
  const [cashAccounts, setCashAccounts] = useState<CashAccount[]>([
    {
      id: '1',
      name: 'Main Business Account',
      type: 'checking',
      balance: 25000000,
      currency: 'RWF',
      lastTransaction: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Emergency Fund',
      type: 'savings',
      balance: 15000000,
      currency: 'RWF',
      lastTransaction: '2024-01-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'Petty Cash',
      type: 'petty-cash',
      balance: 500000,
      currency: 'RWF',
      lastTransaction: '2024-01-15',
      status: 'active'
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Office supplies and stationery',
      amount: 150000,
      category: 'Office Expenses',
      date: '2024-01-15',
      status: 'approved',
      submittedBy: 'Jean Baptiste',
      approvedBy: 'Paul Mugenzi',
      receipt: 'receipt_001.pdf',
      notes: 'Monthly office supplies order'
    },
    {
      id: '2',
      description: 'Security equipment maintenance',
      amount: 300000,
      category: 'Equipment',
      date: '2024-01-14',
      status: 'pending',
      submittedBy: 'Marie Claire',
      notes: 'Camera system maintenance and repairs'
    },
    {
      id: '3',
      description: 'Client meeting expenses',
      amount: 75000,
      category: 'Business Development',
      date: '2024-01-13',
      status: 'paid',
      submittedBy: 'Peter Nkurunziza',
      approvedBy: 'Sarah Uwimana',
      receipt: 'receipt_002.pdf',
      notes: 'Lunch meeting with potential client'
    },
    {
      id: '4',
      description: 'Transportation costs',
      amount: 50000,
      category: 'Transportation',
      date: '2024-01-12',
      status: 'rejected',
      submittedBy: 'Grace Mukamana',
      approvedBy: 'Paul Mugenzi',
      notes: 'Rejected - personal travel not business related'
    },
    {
      id: '5',
      description: 'Internet and phone bills',
      amount: 200000,
      category: 'Utilities',
      date: '2024-01-11',
      status: 'approved',
      submittedBy: 'David Nkurunziza',
      approvedBy: 'Jean Claude',
      receipt: 'receipt_003.pdf',
      notes: 'Monthly internet and phone service'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'cash' | 'expenses'>('cash');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

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
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checking': return <Banknote className="w-4 h-4" />;
      case 'savings': return <DollarSign className="w-4 h-4" />;
      case 'petty-cash': return <Receipt className="w-4 h-4" />;
      default: return <Banknote className="w-4 h-4" />;
    }
  };

  const totalCashBalance = cashAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(expense => expense.status === 'pending').length;

  const handleAddExpense = () => {
    setShowAddModal(true);
  };

  const handleViewExpense = (expense: Expense) => {
    setSelectedExpense(expense);
  };

  const handleApproveExpense = (expense: Expense) => {
    // Implement approve functionality
    console.log('Approve expense:', expense);
  };

  const handleRejectExpense = (expense: Expense) => {
    // Implement reject functionality
    console.log('Reject expense:', expense);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cash & Expenses</h2>
          <p className="text-gray-600">Manage cash accounts and expense tracking</p>
        </div>
        <AnimatedButton
          onClick={handleAddExpense}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedCard
          title="Total Cash Balance"
          subtitle="All accounts combined"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCashBalance)}</p>
              <p className="text-sm text-gray-500">{cashAccounts.length} accounts</p>
            </div>
            <Banknote className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Expenses"
          subtitle="This month"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
              <p className="text-sm text-gray-500">{expenses.length} expenses</p>
            </div>
            <Receipt className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Pending Approval"
          subtitle="Awaiting review"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingExpenses}</p>
              <p className="text-sm text-gray-500">Pending expenses</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('cash')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cash'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Banknote className="w-4 h-4" />
                <span>Cash Accounts</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'expenses'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Receipt className="w-4 h-4" />
                <span>Expenses</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'cash' ? (
            /* Cash Accounts */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cashAccounts.map((account) => (
                <div key={account.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(account.type)}
                      <h4 className="font-semibold text-gray-900">{account.name}</h4>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                      {getStatusIcon(account.status)}
                      <span className="ml-1 capitalize">{account.status}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Balance</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(account.balance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type</span>
                      <span className="text-sm text-gray-700 capitalize">{account.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Transaction</span>
                      <span className="text-sm text-gray-700">{account.lastTransaction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Expenses */
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted By</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{expense.description}</p>
                            {expense.notes && (
                              <p className="text-sm text-gray-500">{expense.notes}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(expense.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{expense.category}</td>
                        <td className="py-3 px-4 text-gray-700">{expense.date}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                            {getStatusIcon(expense.status)}
                            <span className="ml-1 capitalize">{expense.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm text-gray-900">{expense.submittedBy}</p>
                            {expense.approvedBy && (
                              <p className="text-xs text-gray-500">Approved by: {expense.approvedBy}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <AnimatedButton
                              onClick={() => handleViewExpense(expense)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </AnimatedButton>
                            {expense.status === 'pending' && (
                              <>
                                <AnimatedButton
                                  onClick={() => handleApproveExpense(expense)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </AnimatedButton>
                                <AnimatedButton
                                  onClick={() => handleRejectExpense(expense)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </AnimatedButton>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expense Details Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Expense Details</h3>
              <button
                onClick={() => setSelectedExpense(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-900">{selectedExpense.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="text-gray-900 font-semibold">{formatCurrency(selectedExpense.amount)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-gray-900">{selectedExpense.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900">{selectedExpense.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedExpense.status)}`}>
                    {getStatusIcon(selectedExpense.status)}
                    <span className="ml-1 capitalize">{selectedExpense.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted By</label>
                  <p className="text-gray-900">{selectedExpense.submittedBy}</p>
                </div>
              </div>
              
              {selectedExpense.approvedBy && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Approved By</label>
                  <p className="text-gray-900">{selectedExpense.approvedBy}</p>
                </div>
              )}
              
              {selectedExpense.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-gray-900">{selectedExpense.notes}</p>
                </div>
              )}
              
              {selectedExpense.receipt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Receipt</label>
                  <p className="text-blue-600 hover:underline cursor-pointer">{selectedExpense.receipt}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedExpense(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              {selectedExpense.status === 'pending' && (
                <>
                  <AnimatedButton
                    onClick={() => handleApproveExpense(selectedExpense)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    Approve
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => handleRejectExpense(selectedExpense)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Reject
                  </AnimatedButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashExpenses;
