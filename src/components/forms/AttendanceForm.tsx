import React, { useState, useEffect } from 'react';
import { useApiMutation } from '../../hooks/useApi';
import { attendanceAPI } from '../../services/api';

interface AttendanceFormProps {
  attendance?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ attendance, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<{
    employeeId: string;
    date: string;
    checkInTime: string;
    checkOutTime: string;
    status: string;
    totalHours: string;
    overtime: string;
    notes: string;
    location: string;
    workMode: string;
    breaks: string[];
  }>({
    employeeId: '',
    date: '',
    checkInTime: '',
    checkOutTime: '',
    status: 'Present',
    totalHours: '',
    overtime: '',
    notes: '',
    location: '',
    workMode: 'Office',
    breaks: ['']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (attendance) {
      // Convert time values to proper format if they're in "9h 0m" format
      const formatTime = (timeValue: any) => {
        if (typeof timeValue === 'string') {
          // If it's already in HH:MM format, use it as is
          if (timeValue.match(/^\d{2}:\d{2}$/)) {
            return timeValue;
          }
          // If it's in "9h 0m" format, convert it
          const match = timeValue.match(/(\d+)h\s*(\d+)m/);
          if (match) {
            const hours = parseInt(match[1]).toString().padStart(2, '0');
            const minutes = parseInt(match[2]).toString().padStart(2, '0');
            return `${hours}:${minutes}`;
          }
        }
        return '';
      };

      setFormData({
        employeeId: attendance.employeeId || '',
        date: attendance.date || new Date().toISOString().split('T')[0],
        checkInTime: formatTime(attendance.checkInTime),
        checkOutTime: formatTime(attendance.checkOutTime),
        status: attendance.status || 'Present',
        totalHours: attendance.totalHours ? attendance.totalHours.toString() : '0',
        overtime: attendance.overtime ? attendance.overtime.toString() : '0',
        notes: attendance.notes || '',
        location: attendance.location || '',
        workMode: attendance.workMode || 'Office',
        breaks: attendance.breaks && Array.isArray(attendance.breaks) ? attendance.breaks : ['']
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [attendance]);

  const createMutation = useApiMutation(attendanceAPI.create);
  const updateMutation = useApiMutation((params: any) => attendanceAPI.update(params.id, params.data));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.checkInTime.trim()) newErrors.checkInTime = 'Check-in time is required';
    if (!formData.status.trim()) newErrors.status = 'Status is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    // Validate times
    if (formData.checkInTime && formData.checkOutTime) {
      const checkIn = new Date(`2000-01-01T${formData.checkInTime}`);
      const checkOut = new Date(`2000-01-01T${formData.checkOutTime}`);
      if (checkOut <= checkIn) {
        newErrors.checkOutTime = 'Check-out time must be after check-in time';
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
        totalHours: formData.totalHours ? parseFloat(formData.totalHours) : 0,
        overtime: formData.overtime ? parseFloat(formData.overtime) : 0,
        breaks: formData.breaks.filter(break_ => break_.trim() !== '')
      };

      if (attendance) {
        await updateMutation.mutate({ id: attendance.id, data: submitData });
      } else {
        await createMutation.mutate(submitData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving attendance record:', error);
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

  // Calculate total hours when check-in/out times change
  const calculateHours = () => {
    if (formData.checkInTime && formData.checkOutTime) {
      const checkIn = new Date(`2000-01-01T${formData.checkInTime}`);
      const checkOut = new Date(`2000-01-01T${formData.checkOutTime}`);
      const diffMs = checkOut.getTime() - checkIn.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      const totalHours = Math.max(0, diffHours);
      const overtime = Math.max(0, totalHours - 8); // Assuming 8-hour workday
      
      setFormData(prev => ({ 
        ...prev, 
        totalHours: totalHours.toFixed(2),
        overtime: overtime.toFixed(2)
      }));
    }
  };

  useEffect(() => {
    calculateHours();
  }, [formData.checkInTime, formData.checkOutTime]);

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
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in Time *
          </label>
          <input
            type="time"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.checkInTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.checkInTime && (
            <p className="text-red-500 text-xs mt-1">{errors.checkInTime}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out Time
          </label>
          <input
            type="time"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.checkOutTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.checkOutTime && (
            <p className="text-red-500 text-xs mt-1">{errors.checkOutTime}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.status ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Leave">Leave</option>
            <option value="Holiday">Holiday</option>
            <option value="Weekend">Weekend</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Mode
          </label>
          <select
            name="workMode"
            value={formData.workMode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Office">Office</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Field">Field</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Main Office, Home, Client Site"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Hours
          </label>
          <input
            type="number"
            name="totalHours"
            value={formData.totalHours}
            onChange={handleChange}
            min="0"
            step="0.25"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overtime Hours
          </label>
          <input
            type="number"
            name="overtime"
            value={formData.overtime}
            onChange={handleChange}
            min="0"
            step="0.25"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional notes about the attendance record"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Breaks */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Breaks Taken
        </label>
        {formData.breaks.map((break_, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={break_}
              onChange={(e) => handleArrayChange('breaks', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Lunch break 12:00-13:00"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('breaks', index)}
              className="px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('breaks')}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Break
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
          {createMutation.loading || updateMutation.loading ? 'Saving...' : attendance ? 'Update Attendance' : 'Save Attendance'}
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm; 