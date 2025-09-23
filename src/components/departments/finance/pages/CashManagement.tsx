import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { accountAPI, transactionAPI } from '../../../../services/api.ts';
import { Loader2, Plus, TrendingUp, TrendingDown, ArrowRightLeft, Building2, CreditCard, DollarSign, Edit, Trash2, Eye, X } from 'lucide-react';
import TransactionForm from '../../../forms/TransactionForm';
import AccountForm from '../../../forms/AccountForm';
import Modal from '../../../shared/Modal';
import AdvancedSearch from '../../../shared/AdvancedSearch';
import BulkOperations from '../../../shared/BulkOperations';
import AuditTrail from '../../../shared/AuditTrail';

interface Account {
  id: string;
  name: string;
  type: string;
  bankName: string;
  accountNumber: string;
  currentBalance: number;
  currency: string;
  status: string;
  isReconciled: boolean;
  lastReconciledDate: string;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer' | 'adjustment';
  description: string;
  amount: number;
  transactionDate: string;
  status: string;
  account?: {
    name: string;
    accountNumber: string;
  };
  relatedAccount?: {
    name: string;
    accountNumber: string;
  };
}

const CashManagement: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [cashStats, setCashStats] = useState<any[]>([]);
  
  // Form states
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [selectedAccountForEdit, setSelectedAccountForEdit] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Advanced features states
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<any>({});
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [auditEntries, setAuditEntries] = useState<any[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      user: 'John Doe',
      action: 'create',
      entity: 'Transaction',
      entityId: 'TXN-001',
      details: 'Created new income transaction for client payment',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      user: 'Jane Smith',
      action: 'update',
      entity: 'Account',
      entityId: 'ACC-001',
      details: 'Updated account balance for main checking account',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      user: 'Admin User',
      action: 'delete',
      entity: 'Transaction',
      entityId: 'TXN-002',
      details: 'Deleted duplicate transaction entry',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      user: 'Finance Manager',
      action: 'view',
      entity: 'Report',
      entityId: 'RPT-001',
      details: 'Generated monthly financial report',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  ]);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'accounts' | 'audit'>('overview');

  // Fetch data from APIs
  const { items: accounts, loading: accountsLoading, refetch: refetchAccounts } = useApiList(accountAPI.getAll, { limit: 50 });
  const { items: transactions, loading: transactionsLoading, refetch: refetchTransactions } = useApiList(transactionAPI.getAll, { limit: 20 });

  // API mutations
  const createTransactionMutation = useApiMutation(transactionAPI.create);
  const deleteTransactionMutation = useApiMutation(transactionAPI.delete);
  const createAccountMutation = useApiMutation(accountAPI.create);
  const deleteAccountMutation = useApiMutation(accountAPI.delete);

  // Calculate statistics from real data
  useEffect(() => {
    if (!accountsLoading && !transactionsLoading && accounts.length > 0) {
      const totalCash = accounts.reduce((sum: number, a: Account) => sum + parseFloat(a.currentBalance.toString()), 0);
      const bankAccounts = accounts.filter((a: Account) => a.type === 'bank');
      const bankBalance = bankAccounts.reduce((sum: number, a: Account) => sum + parseFloat(a.currentBalance.toString()), 0);
      const cashAccounts = accounts.filter((a: Account) => a.type === 'cash');
      const pettyCash = cashAccounts.reduce((sum: number, a: Account) => sum + parseFloat(a.currentBalance.toString()), 0);
      
      // Calculate cash flow (this month's net transactions)
      const thisMonthTransactions = transactions.filter((t: Transaction) => {
        const transactionDate = new Date(t.transactionDate);
        const now = new Date();
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      });
      
      const cashFlow = thisMonthTransactions.reduce((sum: number, t: Transaction) => {
        if (t.type === 'income') return sum + parseFloat(t.amount.toString());
        if (t.type === 'expense') return sum - parseFloat(t.amount.toString());
        return sum;
      }, 0);

      setCashStats([
        { 
          title: 'Total Cash', 
          value: formatCurrency(totalCash), 
          subtitle: 'Available', 
          color: 'green', 
          icon: '💰', 
          trend: { value: '+5%', isPositive: true }, 
          delay: 0 
        },
        { 
          title: 'Bank Accounts', 
          value: formatCurrency(bankBalance), 
          subtitle: 'Combined', 
          color: 'blue', 
          icon: '🏦', 
          trend: { value: '+3%', isPositive: true }, 
          delay: 100 
        },
        { 
          title: 'Petty Cash', 
          value: formatCurrency(pettyCash), 
          subtitle: 'On Hand', 
          color: 'orange', 
          icon: '💵', 
          trend: { value: '+12%', isPositive: true }, 
          delay: 200 
        },
        { 
          title: 'Cash Flow', 
          value: formatCurrency(cashFlow), 
          subtitle: 'This Month', 
          color: cashFlow >= 0 ? 'purple' : 'red', 
          icon: cashFlow >= 0 ? '📈' : '📉', 
          trend: { value: cashFlow >= 0 ? '+15%' : '-8%', isPositive: cashFlow >= 0 }, 
          delay: 300 
        }
      ]);
    }
  }, [accounts, transactions, accountsLoading, transactionsLoading]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income': return 'text-green-600 bg-green-100';
      case 'expense': return 'text-red-600 bg-red-100';
      case 'transfer': return 'text-blue-600 bg-blue-100';
      case 'adjustment': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income': return <TrendingUp className="w-4 h-4" />;
      case 'expense': return <TrendingDown className="w-4 h-4" />;
      case 'transfer': return <ArrowRightLeft className="w-4 h-4" />;
      case 'adjustment': return <DollarSign className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Building2 className="w-4 h-4" />;
      case 'cash': return <DollarSign className="w-4 h-4" />;
      case 'receivable': return <TrendingUp className="w-4 h-4" />;
      case 'payable': return <TrendingDown className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAccounts = selectedAccount === 'all' 
    ? accounts 
    : accounts.filter((account: Account) => account.status === selectedAccount);

  // CRUD Functions for Transactions
  const handleCreateTransaction = async (data: any) => {
    try {
      await createTransactionMutation.mutate(data);
      refetchTransactions();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleUpdateTransaction = async (data: any) => {
    try {
      await transactionAPI.update(selectedTransaction.id, data);
      refetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransactionMutation.mutate(id);
        refetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  // CRUD Functions for Accounts
  const handleCreateAccount = async (data: any) => {
    try {
      await createAccountMutation.mutate(data);
      refetchAccounts();
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleUpdateAccount = async (data: any) => {
    try {
      await accountAPI.update(selectedAccountForEdit.id, data);
      refetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccountMutation.mutate(id);
        refetchAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  // Form handlers
  const handleAddTransaction = () => {
    setFormMode('create');
    setSelectedTransaction(null);
    setShowTransactionForm(true);
  };

  const handleEditTransaction = (transaction: any) => {
    setFormMode('edit');
    setSelectedTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleAddAccount = () => {
    setFormMode('create');
    setSelectedAccountForEdit(null);
    setShowAccountForm(true);
  };

  const handleEditAccount = (account: any) => {
    setFormMode('edit');
    setSelectedAccountForEdit(account);
    setShowAccountForm(true);
  };

  const handleViewAccount = (account: any) => {
    setSelectedAccountForEdit(account);
    setShowAccountModal(true);
  };

  // Advanced features handlers
  const handleTransactionSelection = (transactionId: string, selected: boolean) => {
    if (selected) {
      setSelectedTransactions(prev => [...prev, transactionId]);
    } else {
      setSelectedTransactions(prev => prev.filter(id => id !== transactionId));
    }
  };

  const handleAccountSelection = (accountId: string, selected: boolean) => {
    if (selected) {
      setSelectedAccounts(prev => [...prev, accountId]);
    } else {
      setSelectedAccounts(prev => prev.filter(id => id !== accountId));
    }
  };

  const handleSelectAllTransactions = (selected: boolean) => {
    if (selected) {
      setSelectedTransactions(transactions.map((t: any) => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectAllAccounts = (selected: boolean) => {
    if (selected) {
      setSelectedAccounts(accounts.map((a: any) => a.id));
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleBulkDeleteTransactions = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTransactions.length} transactions?`)) {
      try {
        await Promise.all(selectedTransactions.map(id => deleteTransactionMutation.mutate(id)));
        setSelectedTransactions([]);
        refetchTransactions();
      } catch (error) {
        console.error('Error deleting transactions:', error);
      }
    }
  };

  const handleBulkDeleteAccounts = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedAccounts.length} accounts?`)) {
      try {
        await Promise.all(selectedAccounts.map(id => deleteAccountMutation.mutate(id)));
        setSelectedAccounts([]);
        refetchAccounts();
      } catch (error) {
        console.error('Error deleting accounts:', error);
      }
    }
  };

  const handleExportTransactions = (format: 'csv' | 'excel' | 'pdf') => {
    const data = transactions.map((t: any) => ({
      ID: t.id,
      Type: t.type,
      Description: t.description,
      Amount: t.amount,
      Date: new Date(t.transactionDate).toLocaleDateString(),
      Status: t.status,
      Account: t.account?.name || 'N/A'
    }));

    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map((row: any) => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAccounts = (format: 'csv' | 'excel' | 'pdf') => {
    const data = accounts.map((a: any) => ({
      ID: a.id,
      Name: a.name,
      Type: a.type,
      Bank: a.bankName,
      AccountNumber: a.accountNumber,
      Balance: a.currentBalance,
      Currency: a.currency,
      Status: a.status
    }));

    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map((row: any) => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTransactions = (file: File) => {
    // Simulate import functionality
    console.log('Importing transactions from:', file.name);
    alert(`Importing ${file.name} - This would parse the file and create transactions`);
  };

  const handleImportAccounts = (file: File) => {
    // Simulate import functionality
    console.log('Importing accounts from:', file.name);
    alert(`Importing ${file.name} - This would parse the file and create accounts`);
  };

  const handleSearchTransactions = (filters: any) => {
    setSearchFilters(filters);
    console.log('Searching transactions with filters:', filters);
  };

  const handleSearchAccounts = (filters: any) => {
    setSearchFilters(filters);
    console.log('Searching accounts with filters:', filters);
  };

  const handleClearSearch = () => {
    setSearchFilters({});
  };

  const handleAuditTrailFilter = (filters: any) => {
    console.log('Filtering audit trail with:', filters);
  };

  const handleAuditTrailClear = () => {
    console.log('Clearing audit trail filters');
  };

  if (accountsLoading || transactionsLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Cash Management</h1>
          <p className="text-gray-600 mt-1">Monitor cash flow and bank accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <AnimatedButton
            onClick={() => setShowAuditTrail(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Audit Trail</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={handleAddAccount}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Account</span>
          </AnimatedButton>
        <AnimatedButton
            onClick={handleAddTransaction}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
            <Plus className="w-4 h-4" />
            <span>+ New Transaction</span>
        </AnimatedButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'transactions', label: 'Transactions', icon: '💰' },
              { id: 'accounts', label: 'Accounts', icon: '🏦' },
              { id: 'audit', label: 'Audit Trail', icon: '📋' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <>
      {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cashStats.map((stat, index) => (
                  <AnimatedCard key={index} delay={stat.delay} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.subtitle}</p>
                        <div className="flex items-center mt-2">
                          <span className={`text-sm font-medium ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                            {stat.trend.value}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
              </div>
                      <div className="text-3xl">{stat.icon}</div>
          </div>
                  </AnimatedCard>
        ))}
      </div>

              {/* Cash Flow Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-gray-900">Account Distribution</h3>
                  </div>
                  <div className="card-body">
                    <div className="space-y-3">
                      {['bank', 'cash', 'receivable', 'payable'].map((type) => {
                        const accountsOfType = accounts.filter((a: Account) => a.type === type);
                        const totalBalance = accountsOfType.reduce((sum: number, a: Account) => sum + parseFloat(a.currentBalance.toString()), 0);
                        const percentage = accounts.length > 0 ? Math.round((accountsOfType.length / accounts.length) * 100) : 0;
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getAccountTypeIcon(type)}
                              <span className="text-sm font-medium capitalize">{type}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{accountsOfType.length} accounts</div>
                              <div className="text-xs text-gray-500">{formatCurrency(totalBalance)}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
          </div>
        </div>
        
                <div className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold text-gray-900">Transaction Types</h3>
                  </div>
                  <div className="card-body">
                    <div className="space-y-4">
                      {['income', 'expense', 'transfer', 'adjustment'].map((type) => {
                        const count = transactions.filter((t: Transaction) => t.type === type).length;
                        const percentage = transactions.length > 0 ? Math.round((count / transactions.length) * 100) : 0;
                        return (
                          <div key={type}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="capitalize">{type}</span>
                              <span className="font-medium">{count} ({percentage}%)</span>
                            </div>
                            <AnimatedProgressBar
                              progress={percentage}
                              color={type === 'income' ? 'green' : type === 'expense' ? 'red' : type === 'transfer' ? 'blue' : 'purple'}
                              height={8}
                              showLabel={false}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Advanced Search */}
              <AdvancedSearch
                onSearch={handleSearchTransactions}
                onClear={handleClearSearch}
                searchFields={[
                  { name: 'type', label: 'Transaction Type', type: 'select', options: [
                    { value: 'income', label: 'Income' },
                    { value: 'expense', label: 'Expense' },
                    { value: 'transfer', label: 'Transfer' },
                    { value: 'adjustment', label: 'Adjustment' }
                  ]},
                  { name: 'amount', label: 'Amount', type: 'range' },
                  { name: 'date', label: 'Transaction Date', type: 'date' },
                  { name: 'status', label: 'Status', type: 'select', options: [
                    { value: 'completed', label: 'Completed' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'cancelled', label: 'Cancelled' }
                  ]}
                ]}
                placeholder="Search transactions..."
              />

              {/* Bulk Operations */}
              <BulkOperations
                selectedItems={selectedTransactions}
                onSelectAll={handleSelectAllTransactions}
                onBulkDelete={handleBulkDeleteTransactions}
                onBulkEdit={() => alert('Bulk edit functionality would be implemented here')}
                onExport={handleExportTransactions}
                onImport={handleImportTransactions}
                totalItems={transactions.length}
                itemName="transactions"
              />

              {/* Transactions Table */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Cash Transactions</h3>
                </div>
                <div className="card-body">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              checked={selectedTransactions.length === transactions.length && transactions.length > 0}
                              onChange={(e) => handleSelectAllTransactions(e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Account
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.slice(0, 10).map((transaction: Transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedTransactions.includes(transaction.id)}
                                onChange={(e) => handleTransactionSelection(transaction.id, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTransactionColor(transaction.type)}`}>
                                {getTransactionIcon(transaction.type)}
                                <span className="ml-1 capitalize">{transaction.type}</span>
                              </span>
                            </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-semibold ${
                                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(parseFloat(transaction.amount.toString()))}
                              </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{transaction.account?.name || 'N/A'}</div>
                              <div className="text-sm text-gray-500">{transaction.account?.accountNumber || ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(transaction.transactionDate).toLocaleDateString()}
                              </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                transaction.status === 'completed' ? 'text-green-600 bg-green-100' :
                                transaction.status === 'pending' ? 'text-yellow-600 bg-yellow-100' :
                                'text-gray-600 bg-gray-100'
                              }`}>
                                <span className="capitalize">{transaction.status}</span>
                    </span>
                  </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleViewTransaction(transaction)}
                                  className="p-1 text-blue-600 hover:text-blue-800"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleEditTransaction(transaction)}
                                  className="p-1 text-green-600 hover:text-green-800"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTransaction(transaction.id)}
                                  className="p-1 text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              {/* Advanced Search */}
              <AdvancedSearch
                onSearch={handleSearchAccounts}
                onClear={handleClearSearch}
                searchFields={[
                  { name: 'type', label: 'Account Type', type: 'select', options: [
                    { value: 'bank', label: 'Bank Account' },
                    { value: 'cash', label: 'Cash Account' },
                    { value: 'receivable', label: 'Accounts Receivable' },
                    { value: 'payable', label: 'Accounts Payable' }
                  ]},
                  { name: 'balance', label: 'Balance', type: 'range' },
                  { name: 'status', label: 'Status', type: 'select', options: [
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                    { value: 'suspended', label: 'Suspended' }
                  ]}
                ]}
                placeholder="Search accounts..."
              />

              {/* Bulk Operations */}
              <BulkOperations
                selectedItems={selectedAccounts}
                onSelectAll={handleSelectAllAccounts}
                onBulkDelete={handleBulkDeleteAccounts}
                onBulkEdit={() => alert('Bulk edit functionality would be implemented here')}
                onExport={handleExportAccounts}
                onImport={handleImportAccounts}
                totalItems={accounts.length}
                itemName="accounts"
              />

              {/* Accounts Grid */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Bank Accounts</h3>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredAccounts.map((account: Account) => (
                      <div key={account.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedAccounts.includes(account.id)}
                              onChange={(e) => handleAccountSelection(account.id, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            {getAccountTypeIcon(account.type)}
                <div>
                              <h4 className="font-medium text-gray-900">{account.name}</h4>
                              <p className="text-sm text-gray-500">{account.bankName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                              {account.status}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => handleViewAccount(account)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditAccount(account)}
                                className="p-1 text-green-600 hover:text-green-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAccount(account.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Account Number:</span>
                            <span className="font-medium">{account.accountNumber}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Balance:</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(parseFloat(account.currentBalance.toString()))}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Type:</span>
                            <span className="font-medium capitalize">{account.type}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Reconciled:</span>
                            <span className={`font-medium ${account.isReconciled ? 'text-green-600' : 'text-red-600'}`}>
                              {account.isReconciled ? 'Yes' : 'No'}
                            </span>
                          </div>
                          {account.isReconciled && account.lastReconciledDate && (
                            <div className="flex justify-between text-sm">
                              <span>Last Reconciled:</span>
                              <span className="font-medium">{new Date(account.lastReconciledDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <AuditTrail
              entries={auditEntries}
              onFilter={handleAuditTrailFilter}
              onClear={handleAuditTrailClear}
            />
          )}
        </div>
      </div>

      {/* Forms and Modals */}
      {showTransactionForm && (
        <TransactionForm
          isOpen={showTransactionForm}
          onClose={() => setShowTransactionForm(false)}
          onSubmit={formMode === 'create' ? handleCreateTransaction : handleUpdateTransaction}
          transaction={selectedTransaction}
          mode={formMode}
        />
      )}

      {showAccountForm && (
        <AccountForm
          isOpen={showAccountForm}
          onClose={() => setShowAccountForm(false)}
          onSubmit={formMode === 'create' ? handleCreateAccount : handleUpdateAccount}
          account={selectedAccountForEdit}
          mode={formMode}
        />
      )}

      {showTransactionModal && selectedTransaction && (
        <Modal
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          title="Transaction Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="text-sm text-gray-900 capitalize">{selectedTransaction.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <p className="text-sm text-gray-900">{formatCurrency(parseFloat(selectedTransaction.amount.toString()))}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-900">{selectedTransaction.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <p className="text-sm text-gray-900">{new Date(selectedTransaction.transactionDate).toLocaleDateString()}</p>
              </div>
            </div>
        </div>
        </Modal>
      )}

      {showAccountModal && selectedAccountForEdit && (
        <Modal
          isOpen={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          title="Account Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-sm text-gray-900">{selectedAccountForEdit.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Balance</label>
                <p className="text-sm text-gray-900">{formatCurrency(parseFloat(selectedAccountForEdit.currentBalance.toString()))}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Account Number</label>
                <p className="text-sm text-gray-900">{selectedAccountForEdit.accountNumber}</p>
        </div>
          <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <p className="text-sm text-gray-900 capitalize">{selectedAccountForEdit.status}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Audit Trail Modal */}
      {showAuditTrail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10001 }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Audit Trail</h2>
              <button
                onClick={() => setShowAuditTrail(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <AuditTrail
                entries={auditEntries}
                onFilter={handleAuditTrailFilter}
                onClear={handleAuditTrailClear}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashManagement; 