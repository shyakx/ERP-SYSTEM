import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Edit,
  RefreshCw,
  Calendar,
  DollarSign,
  FileText,
  Building
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface ReconciliationRecord {
  id: string;
  accountName: string;
  accountNumber: string;
  bankStatementBalance: number;
  bookBalance: number;
  difference: number;
  status: 'pending' | 'reconciled' | 'discrepancy' | 'overdue';
  lastReconciliationDate: string;
  nextReconciliationDate: string;
  discrepancies: Discrepancy[];
  notes: string;
}

interface Discrepancy {
  id: string;
  type: 'bank' | 'book' | 'timing';
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'resolved' | 'investigating';
  resolution: string;
}

interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  reference: string;
  status: 'cleared' | 'pending' | 'disputed';
}

const AccountReconciliation = () => {
  const { user } = useAuth();
  const [reconciliationRecords, setReconciliationRecords] = useState<ReconciliationRecord[]>([]);
  const [bankTransactions, setBankTransactions] = useState<BankTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReconciliationRecord | null>(null);

  useEffect(() => {
    fetchReconciliationData();
  }, []);

  const fetchReconciliationData = async () => {
    try {
      setLoading(true);
      const [recordsData, transactionsData] = await Promise.all([
        apiService.get('/api/account-reconciliation'),
        apiService.get('/api/bank-transactions')
      ]);
      setReconciliationRecords(recordsData);
      setBankTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching reconciliation data:', error);
      toast.error('Failed to fetch reconciliation data');
    } finally {
      setLoading(false);
    }
  };

  const accounts = [
    'Main Operating Account',
    'Payroll Account',
    'Tax Account',
    'Investment Account',
    'Petty Cash'
  ];

  const filteredRecords = reconciliationRecords.filter(record => 
    record.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(record => 
    selectedStatus === 'all' || record.status === selectedStatus
  ).filter(record => 
    selectedAccount === 'all' || record.accountName === selectedAccount
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'reconciled': 'bg-green-100 text-green-800',
      'discrepancy': 'bg-red-100 text-red-800',
      'overdue': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDiscrepancyTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'bank': 'bg-blue-100 text-blue-800',
      'book': 'bg-purple-100 text-purple-800',
      'timing': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateTotalDiscrepancies = (record: ReconciliationRecord) => {
    return record.discrepancies.reduce((sum, disc) => sum + disc.amount, 0);
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
                <Calculator className="h-8 w-8 text-blue-600" />
                Account Reconciliation
              </h1>
              <p className="text-gray-600 mt-2">Reconcile bank statements with book balances</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Upload className="h-5 w-5" />
                Import Statement
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
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
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                <p className="text-2xl font-bold text-gray-900">{reconciliationRecords.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reconciled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reconciliationRecords.filter(r => r.status === 'reconciled').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Discrepancies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reconciliationRecords.filter(r => r.status === 'discrepancy').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <XCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reconciliationRecords.filter(r => r.status === 'overdue').length}
                </p>
              </div>
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
                  placeholder="Search accounts or account numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Accounts</option>
                {accounts.map(account => (
                  <option key={account} value={account}>{account}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reconciled">Reconciled</option>
                <option value="discrepancy">Discrepancy</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reconciliation Records */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bank Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Reconciled
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.accountName}</div>
                        <div className="text-sm text-gray-500">{record.accountNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(record.bankStatementBalance)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(record.bookBalance)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        record.difference === 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(record.difference)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(record.lastReconciliationDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedRecord(record)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reconciliation Detail Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Reconciliation Details</h3>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Name</label>
                      <p className="text-sm text-gray-900">{selectedRecord.accountName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Number</label>
                      <p className="text-sm text-gray-900">{selectedRecord.accountNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bank Statement Balance</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedRecord.bankStatementBalance)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Book Balance</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedRecord.bookBalance)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Difference</label>
                      <p className={`text-sm font-medium ${
                        selectedRecord.difference === 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(selectedRecord.difference)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedRecord.notes}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discrepancies</label>
                    <div className="space-y-2">
                      {selectedRecord.discrepancies.map(discrepancy => (
                        <div key={discrepancy.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{discrepancy.description}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDiscrepancyTypeColor(discrepancy.type)}`}>
                              {discrepancy.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Amount: {formatCurrency(discrepancy.amount)}</span>
                            <span>Date: {new Date(discrepancy.date).toLocaleDateString()}</span>
                          </div>
                          {discrepancy.resolution && (
                            <p className="text-sm text-gray-600 mt-2">Resolution: {discrepancy.resolution}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Reconcile Now
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Export Report
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

export default AccountReconciliation; 