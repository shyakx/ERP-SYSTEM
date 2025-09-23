import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';

interface AccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  account?: any;
  mode: 'create' | 'edit';
}

const AccountForm: React.FC<AccountFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  account,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'bank',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    currentBalance: '',
    currency: 'RWF',
    status: 'active',
    isReconciled: false,
    lastReconciledDate: '',
    description: '',
    notes: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (account && mode === 'edit') {
      setFormData({
        name: account.name || '',
        type: account.type || 'bank',
        bankName: account.bankName || '',
        accountNumber: account.accountNumber || '',
        routingNumber: account.routingNumber || '',
        currentBalance: account.currentBalance?.toString() || '',
        currency: account.currency || 'RWF',
        status: account.status || 'active',
        isReconciled: account.isReconciled || false,
        lastReconciledDate: account.lastReconciledDate ? new Date(account.lastReconciledDate).toISOString().split('T')[0] : '',
        description: account.description || '',
        notes: account.notes || ''
      });
    }
  }, [account, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev: any) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Account name is required';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (formData.type === 'bank' && !formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required for bank accounts';
    }

    if (!formData.currentBalance || parseFloat(formData.currentBalance) < 0) {
      newErrors.currentBalance = 'Current balance must be 0 or greater';
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
        currentBalance: parseFloat(formData.currentBalance),
        lastReconciledDate: formData.lastReconciledDate ? new Date(formData.lastReconciledDate).toISOString() : null
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Error submitting account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAccountTypeOptions = () => [
    { value: 'bank', label: 'Bank Account' },
    { value: 'cash', label: 'Cash Account' },
    { value: 'receivable', label: 'Accounts Receivable' },
    { value: 'payable', label: 'Accounts Payable' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'investment', label: 'Investment Account' }
  ];

  const getStatusOptions = () => [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'closed', label: 'Closed' }
  ];

  const getCurrencyOptions = () => [
    { value: 'RWF', label: 'RWF (Rwandan Franc)' },
    { value: 'USD', label: 'USD (US Dollar)' },
    { value: 'EUR', label: 'EUR (Euro)' },
    { value: 'GBP', label: 'GBP (British Pound)' },
    { value: 'KES', label: 'KES (Kenyan Shilling)' },
    { value: 'UGX', label: 'UGX (Ugandan Shilling)' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10001 }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Create New Account' : 'Edit Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Account Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter account name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getAccountTypeOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bank Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name {formData.type === 'bank' && '*'}
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.bankName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter bank name"
                disabled={formData.type !== 'bank'}
              />
              {errors.bankName && (
                <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number *
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter account number"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
              )}
            </div>
          </div>

          {/* Additional Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routing Number
              </label>
              <input
                type="text"
                name="routingNumber"
                value={formData.routingNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter routing number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Balance *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="currentBalance"
                  value={formData.currentBalance}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full border rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.currentBalance ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 text-sm">{formData.currency}</span>
                </div>
              </div>
              {errors.currentBalance && (
                <p className="text-red-500 text-sm mt-1">{errors.currentBalance}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency *
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getCurrencyOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status and Reconciliation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getStatusOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Reconciled Date
              </label>
              <input
                type="date"
                name="lastReconciledDate"
                value={formData.lastReconciledDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reconciliation Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isReconciled"
              checked={formData.isReconciled}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Account is reconciled
            </label>
          </div>

          {/* Description and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter account description"
              />
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
                  <span>{mode === 'create' ? 'Create Account' : 'Update Account'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm; 