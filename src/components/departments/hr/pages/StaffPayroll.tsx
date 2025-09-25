import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  User, 
  DollarSign, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  GraduationCap,
  Calculator,
  Download,
  Send
} from 'lucide-react';

interface StaffEmployee {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  department: string;
  baseSalary: number;
  bonus: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'active' | 'inactive';
  lastPaid: string;
  performanceRating: number;
}

interface PayrollPeriod {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'approved' | 'paid';
  totalAmount: number;
  employeeCount: number;
}

const StaffPayroll: React.FC = () => {
  const [staffEmployees] = useState<StaffEmployee[]>([
    {
      id: '1',
      name: 'Paul Mugenzi',
      employeeId: 'ST001',
      position: 'Operations Manager',
      department: 'Operations',
      baseSalary: 500000,
      bonus: 50000,
      allowances: 75000,
      deductions: 50000,
      netSalary: 575000,
      status: 'active',
      lastPaid: '2024-01-15',
      performanceRating: 4.8
    },
    {
      id: '2',
      name: 'Sarah Uwimana',
      employeeId: 'ST002',
      position: 'HR Manager',
      department: 'Human Resources',
      baseSalary: 450000,
      bonus: 40000,
      allowances: 65000,
      deductions: 45000,
      netSalary: 510000,
      status: 'active',
      lastPaid: '2024-01-15',
      performanceRating: 4.6
    },
    {
      id: '3',
      name: 'Jean Claude',
      employeeId: 'ST003',
      position: 'Finance Manager',
      department: 'Finance',
      baseSalary: 480000,
      bonus: 45000,
      allowances: 70000,
      deductions: 48000,
      netSalary: 547000,
      status: 'active',
      lastPaid: '2024-01-15',
      performanceRating: 4.9
    },
    {
      id: '4',
      name: 'Grace Mukamana',
      employeeId: 'ST004',
      position: 'Sales Manager',
      department: 'Sales & Marketing',
      baseSalary: 420000,
      bonus: 60000,
      allowances: 60000,
      deductions: 42000,
      netSalary: 498000,
      status: 'active',
      lastPaid: '2024-01-15',
      performanceRating: 4.7
    },
    {
      id: '5',
      name: 'David Nkurunziza',
      employeeId: 'ST005',
      position: 'IT Manager',
      department: 'Information Technology',
      baseSalary: 460000,
      bonus: 35000,
      allowances: 68000,
      deductions: 46000,
      netSalary: 517000,
      status: 'active',
      lastPaid: '2024-01-15',
      performanceRating: 4.5
    },
    {
      id: '6',
      name: 'Alice Johnson',
      employeeId: 'ST006',
      position: 'Administrative Assistant',
      department: 'Administration',
      baseSalary: 200000,
      bonus: 10000,
      allowances: 30000,
      deductions: 20000,
      netSalary: 220000,
      status: 'active',
      lastPaid: '2024-01-15',
      performanceRating: 4.2
    }
  ]);

  const [payrollPeriods] = useState<PayrollPeriod[]>([
    {
      id: '1',
      period: 'January 2024',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'paid',
      totalAmount: 2867000,
      employeeCount: 6
    },
    {
      id: '2',
      period: 'December 2023',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      status: 'paid',
      totalAmount: 2800000,
      employeeCount: 6
    }
  ]);

  const [activeTab, setActiveTab] = useState<'employees' | 'periods'>('employees');
  const [showAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<StaffEmployee | null>(null);

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
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalPayroll = staffEmployees.reduce((sum, employee) => sum + employee.netSalary, 0);
  const totalBonus = staffEmployees.reduce((sum, employee) => sum + employee.bonus, 0);
  const totalAllowances = staffEmployees.reduce((sum, employee) => sum + employee.allowances, 0);
  const totalDeductions = staffEmployees.reduce((sum, employee) => sum + employee.deductions, 0);

  const handleAddEmployee = () => {
    setShowAddModal(true);
  };

  const handleViewEmployee = (employee: StaffEmployee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (employee: StaffEmployee) => {
    // Implement edit functionality
    console.log('Edit employee:', employee);
  };

  const handleProcessPayroll = () => {
    // Implement payroll processing
    console.log('Process payroll');
  };

  const handleGeneratePayslips = () => {
    // Implement payslip generation
    console.log('Generate payslips');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="relative px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Staff Payroll</h2>
                    <p className="text-slate-600 text-lg">Manage administrative and management staff payroll</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <AnimatedButton
                  onClick={handleGeneratePayslips}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Generate Payslips</span>
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleProcessPayroll}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span>Process Payroll</span>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Payroll"
          subtitle="Current month"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayroll)}</p>
              <p className="text-sm text-gray-500">{staffEmployees.length} employees</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Performance Bonus"
          subtitle="Based on ratings"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBonus)}</p>
              <p className="text-sm text-gray-500">Performance bonuses</p>
            </div>
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Allowances"
          subtitle="Additional benefits"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAllowances)}</p>
              <p className="text-sm text-gray-500">Total allowances</p>
            </div>
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Deductions"
          subtitle="Taxes and benefits"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDeductions)}</p>
              <p className="text-sm text-gray-500">Total deductions</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('employees')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'employees'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Staff Employees</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('periods')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'periods'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Payroll Periods</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'employees' ? (
            /* Staff Employees */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Staff Personnel Payroll</h3>
                <AnimatedButton
                  onClick={handleAddEmployee}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Employee</span>
                </AnimatedButton>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Base Salary</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Bonus</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Allowances</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Net Salary</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{employee.name}</p>
                              <p className="text-sm text-gray-500">{employee.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{employee.position}</td>
                        <td className="py-3 px-4 text-gray-700">{employee.department}</td>
                        <td className="py-3 px-4 text-gray-700">{formatCurrency(employee.baseSalary)}</td>
                        <td className="py-3 px-4 text-gray-700">{formatCurrency(employee.bonus)}</td>
                        <td className="py-3 px-4 text-gray-700">{formatCurrency(employee.allowances)}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(employee.netSalary)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${getPerformanceColor(employee.performanceRating)}`}>
                            {employee.performanceRating}/5.0
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <AnimatedButton
                              onClick={() => handleViewEmployee(employee)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </AnimatedButton>
                            <AnimatedButton
                              onClick={() => handleEditEmployee(employee)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </AnimatedButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Payroll Periods */
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Payroll History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {payrollPeriods.map((period) => (
                  <div key={period.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{period.period}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(period.status)}`}>
                        {getStatusIcon(period.status)}
                        <span className="ml-1 capitalize">{period.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Period</span>
                        <span className="text-gray-900">{period.startDate} - {period.endDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(period.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Employees</span>
                        <span className="text-gray-900">{period.employeeCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Employee Payroll Details</h3>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                  <p className="text-gray-900">{selectedEmployee.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="text-gray-900">{selectedEmployee.employeeId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <p className="text-gray-900">{selectedEmployee.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Base Salary</label>
                  <p className="text-gray-900 font-semibold">{formatCurrency(selectedEmployee.baseSalary)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Performance Bonus</label>
                  <p className="text-gray-900">{formatCurrency(selectedEmployee.bonus)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Allowances</label>
                  <p className="text-gray-900">{formatCurrency(selectedEmployee.allowances)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deductions</label>
                  <p className="text-gray-900">{formatCurrency(selectedEmployee.deductions)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Performance Rating</label>
                  <p className={`font-semibold ${getPerformanceColor(selectedEmployee.performanceRating)}`}>
                    {selectedEmployee.performanceRating}/5.0
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Net Salary</label>
                  <p className="text-gray-900 font-semibold text-lg">{formatCurrency(selectedEmployee.netSalary)}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditEmployee(selectedEmployee)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Employee
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default StaffPayroll;
