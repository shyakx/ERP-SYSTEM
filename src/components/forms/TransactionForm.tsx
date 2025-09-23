import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useApiList } from '../../hooks/useApi';
import { accountAPI, vendorAPI, customerAPI } from '../../services/api.ts';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  transaction?: any;
  mode: 'create' | 'edit';
}

interface Account {
  id: string;
  name: string;
  accountNumber: string;
  type: string;
}

interface Vendor {
  id: string;
  name: string;
  vendorCode: string;
}

interface Customer {
  id: string;
  name: string;
  customerCode: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  mode
}) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    subcategory: '',
    description: '',
    amount: '',
    currency: 'RWF',
    accountId: '',
    relatedAccountId: '',
    vendorId: '',
    customerId: '',
    transactionDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentMethod: 'bank_transfer',
    referenceNumber: '',
    notes: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch related data
  const { items: accounts, loading: accountsLoading } = useApiList(accountAPI.getAll, { limit: 100 });
  const { items: vendors, loading: vendorsLoading } = useApiList(vendorAPI.getAll, { limit: 100 });
  const { items: customers, loading: customersLoading } = useApiList(customerAPI.getAll, { limit: 100 });

  useEffect(() => {
    if (transaction && mode === 'edit') {
      setFormData({
        type: transaction.type || 'expense',
        category: transaction.category || '',
        subcategory: transaction.subcategory || '',
        description: transaction.description || '',
        amount: transaction.amount?.toString() || '',
        currency: transaction.currency || 'RWF',
        accountId: transaction.accountId || '',
        relatedAccountId: transaction.relatedAccountId || '',
        vendorId: transaction.vendorId || '',
        customerId: transaction.customerId || '',
        transactionDate: transaction.transactionDate ? new Date(transaction.transactionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        dueDate: transaction.dueDate ? new Date(transaction.dueDate).toISOString().split('T')[0] : '',
        paymentMethod: transaction.paymentMethod || 'bank_transfer',
        referenceNumber: transaction.referenceNumber || '',
        notes: transaction.notes || ''
      });
    }
  }, [transaction, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.accountId) {
      newErrors.accountId = 'Account is required';
    }

    if (!formData.transactionDate) {
      newErrors.transactionDate = 'Transaction date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount),
        transactionDate: new Date(formData.transactionDate).toISOString(),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryOptions = () => {
    const baseCategories = [
      'Office Supplies', 'Equipment', 'Travel', 'Marketing', 'Utilities',
      'Rent', 'Insurance', 'Legal', 'Consulting', 'Training', 'Software',
      'Hardware', 'Maintenance', 'Transportation', 'Meals', 'Other'
    ];

    if (formData.type === 'income') {
      return ['Service Revenue', 'Product Sales', 'Investment Income', 'Other Income'];
    }

    return baseCategories;
  };

  const getSubcategoryOptions = () => {
    const subcategories: { [key: string]: string[] } = {
      'Office Supplies': ['Paper', 'Pens', 'Printers', 'Computers'],
      'Equipment': ['Security Equipment', 'Office Equipment', 'IT Equipment'],
      'Travel': ['Airfare', 'Hotel', 'Transportation', 'Meals'],
      'Marketing': ['Advertising', 'Promotional Materials', 'Events'],
      'Utilities': ['Electricity', 'Water', 'Internet', 'Phone'],
      'Rent': ['Office Rent', 'Equipment Rent', 'Vehicle Rent'],
      'Insurance': ['General Liability', 'Property', 'Vehicle', 'Health'],
      'Legal': ['Legal Fees', 'Compliance', 'Contracts'],
      'Consulting': ['IT Consulting', 'Business Consulting', 'Financial Consulting'],
      'Training': ['Employee Training', 'Certification', 'Workshops'],
      'Software': ['Licenses', 'Subscriptions', 'Development'],
      'Hardware': ['Servers', 'Networking', 'Security Systems'],
      'Maintenance': ['Equipment Maintenance', 'Building Maintenance', 'Vehicle Maintenance'],
      'Transportation': ['Fuel', 'Vehicle Maintenance', 'Public Transport'],
      'Meals': ['Business Meals', 'Catering', 'Restaurant'],
      'Other': ['Miscellaneous', 'Emergency', 'Uncategorized']
    };

    return subcategories[formData.category] || [];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10001 }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Create New Transaction' : 'Edit Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Transaction Type and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                <option value="transfer">Transfer</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {getCategoryOptions().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subcategory</option>
                {getSubcategoryOptions().map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description and Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter transaction description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full border rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 text-sm">{formData.currency}</span>
                </div>
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
          </div>

          {/* Account Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account *
              </label>
              <select
                name="accountId"
                value={formData.accountId}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.accountId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Account</option>
                {accountsLoading ? (
                  <option value="" disabled>Loading accounts...</option>
                ) : (
                  accounts.map((account: Account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.accountNumber})
                    </option>
                  ))
                )}
              </select>
              {errors.accountId && (
                <p className="text-red-500 text-sm mt-1">{errors.accountId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Related Account
              </label>
              <select
                name="relatedAccountId"
                value={formData.relatedAccountId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Related Account (Optional)</option>
                {accountsLoading ? (
                  <option value="" disabled>Loading accounts...</option>
                ) : (
                  accounts.map((account: Account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.accountNumber})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Vendor/Customer Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor
              </label>
              <select
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Vendor (Optional)</option>
                {vendorsLoading ? (
                  <option value="" disabled>Loading vendors...</option>
                ) : (
                  vendors.map((vendor: Vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name} ({vendor.vendorCode})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer
              </label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Customer (Optional)</option>
                {customersLoading ? (
                  <option value="" disabled>Loading customers...</option>
                ) : (
                  customers.map((customer: Customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} ({customer.customerCode})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Dates and Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Date *
              </label>
              <input
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.transactionDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.transactionDate && (
                <p className="text-red-500 text-sm mt-1">{errors.transactionDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="credit_card">Credit Card</option>
                <option value="mobile_money">Mobile Money</option>
              </select>
            </div>
          </div>

          {/* Reference and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Number
              </label>
              <input
                type="text"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reference number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="RWF">RWF (Rwandan Franc)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (British Pound)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional notes..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{mode === 'create' ? 'Create Transaction' : 'Update Transaction'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm; 