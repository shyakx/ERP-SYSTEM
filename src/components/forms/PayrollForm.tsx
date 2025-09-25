import React, { useState, useEffect } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { payrollAPI } from '../../services/api';

interface Payroll {
  id?: string;
  employeeId: string;
  payPeriod: string;
  payDate: string;
  basicSalary: number;
  overtime: number;
  bonuses: number;
  allowances: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
  status: string;
  processedBy: string;
  processedDate: string;
}

interface PayrollFormProps {
  payroll?: Payroll;
  onSuccess: () => void;
  onCancel: () => void;
}

const PayrollForm: React.FC<PayrollFormProps> = ({ payroll, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<{
    employeeId: string;
    payPeriod: string;
    payDate: string;
    basicSalary: string;
    allowances: string;
    overtime: string;
    bonuses: string;
    deductions: string;
    taxAmount: string;
    netSalary: string;
    paymentMethod: string;
    bankAccount: string;
    status: string;
    notes: string;
    allowancesBreakdown: string[];
    deductionsBreakdown: string[];
  }>({
    employeeId: '',
    payPeriod: '',
    payDate: '',
    basicSalary: '',
    allowances: '',
    overtime: '',
    bonuses: '',
    deductions: '',
    taxAmount: '',
    netSalary: '',
    paymentMethod: 'Bank Transfer',
    bankAccount: '',
    status: 'Pending',
    notes: '',
    allowancesBreakdown: [''],
    deductionsBreakdown: ['']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (payroll) {
      setFormData({
        employeeId: payroll.employeeId || '',
        payPeriod: payroll.payPeriod || '',
        payDate: payroll.payDate || '',
        basicSalary: payroll.basicSalary || '',
        allowances: payroll.allowances || '',
        overtime: payroll.overtime || '',
        bonuses: payroll.bonuses || '',
        deductions: payroll.deductions || '',
        taxAmount: payroll.taxAmount || '',
        netSalary: payroll.netSalary || '',
        paymentMethod: payroll.paymentMethod || 'Bank Transfer',
        bankAccount: payroll.bankAccount || '',
        status: payroll.status || 'Pending',
        notes: payroll.notes || '',
        allowancesBreakdown: payroll.allowancesBreakdown || [''],
        deductionsBreakdown: payroll.deductionsBreakdown || ['']
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, payDate: today }));
    }
  }, [payroll]);

  const createMutation = useApiMutation(payrollAPI.create);
  const updateMutation = useApiMutation((params: { id: string; data: Payroll }) => payrollAPI.update(params.id, params.data));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee is required';
    if (!formData.payPeriod.trim()) newErrors.payPeriod = 'Pay period is required';
    if (!formData.payDate.trim()) newErrors.payDate = 'Pay date is required';
    if (!formData.basicSalary.trim()) newErrors.basicSalary = 'Basic salary is required';
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = 'Payment method is required';
    if (!formData.bankAccount.trim()) newErrors.bankAccount = 'Bank account is required';

    // Validate numeric fields
    const basicSalary = parseFloat(formData.basicSalary);
    if (isNaN(basicSalary) || basicSalary < 0) {
      newErrors.basicSalary = 'Basic salary must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateNetSalary = () => {
    const basicSalary = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const overtime = parseFloat(formData.overtime) || 0;
    const bonuses = parseFloat(formData.bonuses) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const taxAmount = parseFloat(formData.taxAmount) || 0;

    const grossSalary = basicSalary + allowances + overtime + bonuses;
    const totalDeductions = deductions + taxAmount;
    const netSalary = grossSalary - totalDeductions;

    setFormData(prev => ({ 
      ...prev, 
      netSalary: Math.max(0, netSalary).toFixed(2)
    }));
  };

  useEffect(() => {
    calculateNetSalary();
  }, [formData.basicSalary, formData.allowances, formData.overtime, formData.bonuses, formData.deductions, formData.taxAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData = {
        ...formData,
        basicSalary: parseFloat(formData.basicSalary),
        allowances: parseFloat(formData.allowances) || 0,
        overtime: parseFloat(formData.overtime) || 0,
        bonuses: parseFloat(formData.bonuses) || 0,
        deductions: parseFloat(formData.deductions) || 0,
        taxAmount: parseFloat(formData.taxAmount) || 0,
        netSalary: parseFloat(formData.netSalary),
        allowancesBreakdown: formData.allowancesBreakdown.filter(allowance => allowance.trim() !== ''),
        deductionsBreakdown: formData.deductionsBreakdown.filter(deduction => deduction.trim() !== '')
      };

      if (payroll) {
        await updateMutation.mutate({ id: payroll.id, data: submitData });
      } else {
        await createMutation.mutate(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving payroll record:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: string, i: number) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID *
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter employee ID"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.employeeId ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pay Period *
          </label>
          <select
            name="payPeriod"
            value={formData.payPeriod}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.payPeriod ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Pay Period</option>
            <option value="January 2024">January 2024</option>
            <option value="February 2024">February 2024</option>
            <option value="March 2024">March 2024</option>
            <option value="April 2024">April 2024</option>
            <option value="May 2024">May 2024</option>
            <option value="June 2024">June 2024</option>
            <option value="July 2024">July 2024</option>
            <option value="August 2024">August 2024</option>
            <option value="September 2024">September 2024</option>
            <option value="October 2024">October 2024</option>
            <option value="November 2024">November 2024</option>
            <option value="December 2024">December 2024</option>
          </select>
          {errors.payPeriod && (
            <p className="text-red-500 text-xs mt-1">{errors.payPeriod}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pay Date *
          </label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.payDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.payDate && (
            <p className="text-red-500 text-xs mt-1">{errors.payDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Salary Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Basic Salary (RWF) *
            </label>
            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.basicSalary ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.basicSalary && (
              <p className="text-red-500 text-xs mt-1">{errors.basicSalary}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allowances (RWF)
            </label>
            <input
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overtime (RWF)
            </label>
            <input
              type="number"
              name="overtime"
              value={formData.overtime}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bonuses (RWF)
            </label>
            <input
              type="number"
              name="bonuses"
              value={formData.bonuses}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deductions (RWF)
            </label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Amount (RWF)
            </label>
            <input
              type="number"
              name="taxAmount"
              value={formData.taxAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Net Salary (RWF)
            </label>
            <input
              type="number"
              name="netSalary"
              value={formData.netSalary}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method *
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="Check">Check</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Direct Deposit">Direct Deposit</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Account *
          </label>
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="Enter bank account number"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.bankAccount ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.bankAccount && (
            <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>
          )}
        </div>
      </div>

      {/* Allowances Breakdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Allowances Breakdown
        </label>
        {formData.allowancesBreakdown.map((allowance, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={allowance}
              onChange={(e) => handleArrayChange('allowancesBreakdown', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Housing Allowance: 50,000 RWF"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('allowancesBreakdown', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('allowancesBreakdown')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Allowance
        </button>
      </div>

      {/* Deductions Breakdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deductions Breakdown
        </label>
        {formData.deductionsBreakdown.map((deduction, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={deduction}
              onChange={(e) => handleArrayChange('deductionsBreakdown', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Health Insurance: 15,000 RWF"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('deductionsBreakdown', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('deductionsBreakdown')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Deduction
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional notes about this payroll record"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createMutation.loading || updateMutation.loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          {createMutation.loading || updateMutation.loading ? 'Saving...' : payroll ? 'Update Payroll' : 'Save Payroll'}
        </button>
      </div>
    </form>
  );
};

export default PayrollForm; 