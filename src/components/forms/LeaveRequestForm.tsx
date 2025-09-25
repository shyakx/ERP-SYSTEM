import React, { useState, useEffect } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { leaveAPI } from '../../services/api';

interface LeaveRequest {
  id?: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  daysRequested: number;
  reason: string;
  status: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

interface LeaveRequestFormProps {
  leaveRequest?: LeaveRequest;
  onSuccess: () => void;
  onCancel: () => void;
}

const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({ leaveRequest, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<{
    employeeId: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    daysRequested: string;
    reason: string;
    status: string;
    emergencyContact: string;
    emergencyPhone: string;
    attachments: string[];
    notes: string;
  }>({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    daysRequested: '',
    reason: '',
    status: 'Pending',
    emergencyContact: '',
    emergencyPhone: '',
    attachments: [''],
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (leaveRequest) {
      setFormData({
        employeeId: leaveRequest.employeeId || '',
        leaveType: leaveRequest.leaveType || '',
        startDate: leaveRequest.startDate || '',
        endDate: leaveRequest.endDate || '',
        daysRequested: leaveRequest.daysRequested || '',
        reason: leaveRequest.reason || '',
        status: leaveRequest.status || 'Pending',
        emergencyContact: leaveRequest.emergencyContact || '',
        emergencyPhone: leaveRequest.emergencyPhone || '',
        attachments: leaveRequest.attachments || [''],
        notes: leaveRequest.notes || ''
      });
    }
  }, [leaveRequest]);

  const createMutation = useApiMutation(leaveAPI.createRequest);
  const updateMutation = useApiMutation((params: { id: string; data: LeaveRequest }) => leaveAPI.updateRequest(params.id, params.data));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee is required';
    if (!formData.leaveType.trim()) newErrors.leaveType = 'Leave type is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!formData.endDate.trim()) newErrors.endDate = 'End date is required';
    if (!formData.daysRequested.trim()) newErrors.daysRequested = 'Days requested is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';

    // Validate dates
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submitData = {
        ...formData,
        daysRequested: parseInt(formData.daysRequested),
        attachments: formData.attachments.filter(attachment => attachment.trim() !== '')
      };

      if (leaveRequest) {
        await updateMutation.mutate({ id: leaveRequest.id, data: submitData });
      } else {
        await createMutation.mutate(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving leave request:', error);
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

  // Calculate days when dates change
  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      setFormData(prev => ({ ...prev, daysRequested: diffDays.toString() }));
    }
  };

  useEffect(() => {
    calculateDays();
  }, [formData.startDate, formData.endDate]);

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
            Leave Type *
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.leaveType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Leave Type</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Bereavement Leave">Bereavement Leave</option>
            <option value="Study Leave">Study Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
            <option value="Other">Other</option>
          </select>
          {errors.leaveType && (
            <p className="text-red-500 text-xs mt-1">{errors.leaveType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Days Requested *
          </label>
          <input
            type="number"
            name="daysRequested"
            value={formData.daysRequested}
            onChange={handleChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.daysRequested ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.daysRequested && (
            <p className="text-red-500 text-xs mt-1">{errors.daysRequested}</p>
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
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Contact *
          </label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency contact name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.emergencyContact && (
            <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Phone *
          </label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            placeholder="Emergency contact phone"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.emergencyPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Leave *
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          placeholder="Please provide a detailed reason for your leave request"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.reason ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.reason && (
          <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional information or special requests"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments (Documents, Medical Certificates, etc.)
        </label>
        {formData.attachments.map((attachment, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={attachment}
              onChange={(e) => handleArrayChange('attachments', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter attachment name or URL"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('attachments', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('attachments')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Attachment
        </button>
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
          {createMutation.loading || updateMutation.loading ? 'Saving...' : leaveRequest ? 'Update Leave Request' : 'Submit Leave Request'}
        </button>
      </div>
    </form>
  );
};

export default LeaveRequestForm; 