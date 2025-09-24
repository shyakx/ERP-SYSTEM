import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  HandCoins, 
  Wallet, 
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
  Filter,
  Search
} from 'lucide-react';

interface Account {
  id: string;
  type: 'payable' | 'receivable';
  name: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid' | 'partial';
  description: string;
  contact: string;
  phone: string;
  email: string;
}

const AccountsManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      type: 'payable',
      name: 'Office Supplies Ltd',
      amount: 250000,
      dueDate: '2024-01-20',
      status: 'pending',
      description: 'Office supplies and stationery',
      contact: 'John Smith',
      phone: '+250 788 123 456',
      email: 'john@officesupplies.rw'
    },
    {
      id: '2',
      type: 'receivable',
      name: 'ABC Corporation',
      amount: 1500000,
      dueDate: '2024-01-18',
      status: 'overdue',
      description: 'Security services - January 2024',
      contact: 'Marie Uwimana',
      phone: '+250 788 234 567',
      email: 'marie@abc.rw'
    },
    {
      id: '3',
      type: 'payable',
      name: 'Utilities Company',
      amount: 180000,
      dueDate: '2024-01-25',
      status: 'pending',
      description: 'Electricity and water bills',
      contact: 'Peter Nkurunziza',
      phone: '+250 788 345 678',
      email: 'peter@utilities.rw'
    },
    {
      id: '4',
      type: 'receivable',
      name: 'Tech Solutions Ltd',
      amount: 3200000,
      dueDate: '2024-01-30',
      status: 'pending',
      description: 'Security services - Q1 2024',
      contact: 'Grace Mukamana',
      phone: '+250 788 456 789',
      email: 'grace@techsolutions.rw'
    },
    {
      id: '5',
      type: 'payable',
      name: 'Maintenance Services',
      amount: 450000,
      dueDate: '2024-01-15',
      status: 'paid',
      description: 'Building maintenance and repairs',
      contact: 'David Nkurunziza',
      phone: '+250 788 567 890',
      email: 'david@maintenance.rw'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'payable' | 'receivable'>('payable');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

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
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredAccounts = accounts.filter(account => account.type === activeTab);

  const totalPayable = accounts
    .filter(account => account.type === 'payable')
    .reduce((sum, account) => sum + account.amount, 0);

  const totalReceivable = accounts
    .filter(account => account.type === 'receivable')
    .reduce((sum, account) => sum + account.amount, 0);

  const handleAddAccount = () => {
    setShowAddModal(true);
  };

  const handleViewAccount = (account: Account) => {
    setSelectedAccount(account);
  };

  const handleEditAccount = (account: Account) => {
    // Implement edit functionality
    console.log('Edit account:', account);
  };

  const handleMarkAsPaid = (account: Account) => {
    // Implement mark as paid functionality
    console.log('Mark as paid:', account);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Accounts Management</h2>
          <p className="text-gray-600">Manage accounts payable and receivable</p>
        </div>
        <AnimatedButton
          onClick={handleAddAccount}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatedCard
          title="Accounts Payable"
          subtitle="Money owed to suppliers"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayable)}</p>
              <p className="text-sm text-gray-500">
                {accounts.filter(a => a.type === 'payable').length} accounts
              </p>
            </div>
            <HandCoins className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Accounts Receivable"
          subtitle="Money owed by clients"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReceivable)}</p>
              <p className="text-sm text-gray-500">
                {accounts.filter(a => a.type === 'receivable').length} accounts
              </p>
            </div>
            <Wallet className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('payable')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payable'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <HandCoins className="w-4 h-4" />
                <span>Accounts Payable</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('receivable')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'receivable'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>Accounts Receivable</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Accounts Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Account</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{account.name}</p>
                        <p className="text-sm text-gray-500">{account.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(account.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{account.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                        {getStatusIcon(account.status)}
                        <span className="ml-1 capitalize">{account.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{account.contact}</p>
                        <p className="text-xs text-gray-500">{account.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <AnimatedButton
                          onClick={() => handleViewAccount(account)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </AnimatedButton>
                        <AnimatedButton
                          onClick={() => handleEditAccount(account)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </AnimatedButton>
                        {account.status !== 'paid' && (
                          <AnimatedButton
                            onClick={() => handleMarkAsPaid(account)}
                            className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </AnimatedButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Account Details</h3>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Name</label>
                  <p className="text-gray-900">{selectedAccount.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    selectedAccount.type === 'payable' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedAccount.type === 'payable' ? 'Payable' : 'Receivable'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <p className="text-gray-900 font-semibold">{formatCurrency(selectedAccount.amount)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <p className="text-gray-900">{selectedAccount.dueDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAccount.status)}`}>
                    {getStatusIcon(selectedAccount.status)}
                    <span className="ml-1 capitalize">{selectedAccount.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                  <p className="text-gray-900">{selectedAccount.contact}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedAccount.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedAccount.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedAccount.email}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedAccount(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditAccount(selectedAccount)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Account
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsManagement;
