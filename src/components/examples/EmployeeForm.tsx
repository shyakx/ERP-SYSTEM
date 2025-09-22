import React from 'react';
import ValidatedForm, { FormField } from '../shared/ValidatedForm';
import { commonRules } from '../../utils/validation';
import { hrAPI } from '../../services/api';
import { useNotifications } from '../shared/NotificationSystem';

interface EmployeeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: any;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSuccess, onCancel, initialData }) => {
  const { success, error } = useNotifications();

  const formFields: FormField[] = [
    {
      name: 'employeeNumber',
      type: 'text',
      label: 'Employee Number',
      placeholder: 'e.g., EMP001',
      required: true,
      helpText: 'Unique identifier for the employee',
      pattern: '^[A-Z]{2,3}[0-9]{4,6}$'
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter first name',
      required: true,
      minLength: 2,
      maxLength: 50
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter last name',
      required: true,
      minLength: 2,
      maxLength: 50
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'employee@dicel.co.rw',
      required: true,
      helpText: 'Official company email address'
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '+250788123456',
      required: true,
      helpText: 'Rwanda phone number format'
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position',
      placeholder: 'e.g., Software Developer',
      required: true,
      maxLength: 100
    },
    {
      name: 'departmentId',
      type: 'select',
      label: 'Department',
      required: true,
      options: [
        { value: '1', label: 'Human Resources' },
        { value: '2', label: 'Finance' },
        { value: '3', label: 'Information Technology' },
        { value: '4', label: 'Operations' },
        { value: '5', label: 'Sales & Marketing' },
        { value: '6', label: 'Security' },
        { value: '7', label: 'Risk Management' }
      ]
    },
    {
      name: 'hireDate',
      type: 'date',
      label: 'Hire Date',
      required: true,
      helpText: 'Date when employee joined the company'
    },
    {
      name: 'salary',
      type: 'number',
      label: 'Salary (RWF)',
      placeholder: '500000',
      required: true,
      min: 0,
      step: 1000,
      helpText: 'Monthly salary in Rwandan Francs'
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      placeholder: 'Enter full address',
      rows: 3,
      maxLength: 500,
      helpText: 'Complete residential address'
    }
  ];

  const validationRules = {
    employeeNumber: { ...commonRules.required, pattern: /^[A-Z]{2,3}[0-9]{4,6}$/ },
    firstName: commonRules.name,
    lastName: commonRules.name,
    email: commonRules.email,
    phone: commonRules.rwandaPhone,
    position: { ...commonRules.required, maxLength: 100 },
    departmentId: commonRules.required,
    hireDate: commonRules.date,
    salary: { ...commonRules.required, number: true, positive: true },
    address: { maxLength: 500 }
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const employeeData = {
        employeeNumber: values.employeeNumber,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        position: values.position,
        departmentId: parseInt(values.departmentId),
        hireDate: values.hireDate,
        salary: parseFloat(values.salary),
        address: values.address
      };

      const response = await hrAPI.createEmployee(employeeData);
      
      if (response.data.success) {
        success('Employee Created', 'Employee has been successfully added to the system');
        onSuccess?.();
      } else {
        throw new Error(response.data.message || 'Failed to create employee');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create employee';
      error('Creation Failed', errorMessage);
      throw err;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
        <p className="text-gray-600 mt-1">Fill in the employee details below</p>
      </div>

      <ValidatedForm
        fields={formFields}
        initialValues={initialData || {}}
        validationRules={validationRules}
        onSubmit={handleSubmit}
        submitText="Create Employee"
        cancelText="Cancel"
        showCancel={true}
        onCancel={onCancel}
        successMessage="Employee created successfully!"
        errorMessage="Failed to create employee. Please check the form and try again."
        gridCols={2}
        spacing="md"
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      />
    </div>
  );
};

export default EmployeeForm;
