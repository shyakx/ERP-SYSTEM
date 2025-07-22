import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  Download, 
  Mail, 
  Eye,
  FileText,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Printer
} from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';

interface Payslip {
  id: number;
  employee_id: number;
  employee_name: string;
  employee_number: string;
  department: string;
  position: string;
  period: string;
  basic_salary: number;
  hours_worked: number;
  overtime_hours: number;
  overtime_pay: number;
  transport_allowance: number;
  housing_allowance: number;
  performance_bonus: number;
  night_shift_allowance: number;
  total_allowances: number;
  tax_deduction: number;
  insurance_deduction: number;
  loan_deduction: number;
  other_deductions: number;
  total_deductions: number;
  gross_pay: number;
  net_pay: number;
  payment_method: string;
  bank_name: string;
  account_number: string;
  status: 'generated' | 'sent' | 'viewed' | 'downloaded';
  generated_at: string;
  sent_at?: string;
  viewed_at?: string;
  downloaded_at?: string;
  notes?: string;
}

const Payslips: React.FC = () => {
  const { user } = useAuth();
  // Static mock Rwandan payslip data
  const [payslips, setPayslips] = useState<Payslip[]>([
    {
      id: 1,
      employee_id: 1,
      employee_name: 'Eric Niyonsaba',
      employee_number: 'EMP001',
      department: 'Security',
      position: 'Security Guard',
      period: '2024-06',
      basic_salary: 270000,
      hours_worked: 176,
      overtime_hours: 10,
      overtime_pay: 30000,
      transport_allowance: 20000,
      housing_allowance: 15000,
      performance_bonus: 10000,
      night_shift_allowance: 5000,
      total_allowances: 50000,
      tax_deduction: 30000,
      insurance_deduction: 10000,
      loan_deduction: 0,
      other_deductions: 5000,
      total_deductions: 45000,
      gross_pay: 350000,
      net_pay: 305000,
      payment_method: 'Bank Transfer',
      bank_name: 'Bank of Kigali',
      account_number: '1234567890',
      status: 'sent',
      generated_at: '2024-06-25T10:00:00Z',
      sent_at: '2024-06-26T09:00:00Z'
    },
    {
      id: 2,
      employee_id: 2,
      employee_name: 'Aline Mukamana',
      employee_number: 'EMP002',
      department: 'HR',
      position: 'HR Assistant',
      period: '2024-06',
      basic_salary: 320000,
      hours_worked: 176,
      overtime_hours: 0,
      overtime_pay: 0,
      transport_allowance: 25000,
      housing_allowance: 20000,
      performance_bonus: 15000,
      night_shift_allowance: 0,
      total_allowances: 60000,
      tax_deduction: 35000,
      insurance_deduction: 12000,
      loan_deduction: 0,
      other_deductions: 8000,
      total_deductions: 55000,
      gross_pay: 380000,
      net_pay: 325000,
      payment_method: 'Bank Transfer',
      bank_name: 'Bank of Kigali',
      account_number: '0987654321',
      status: 'viewed',
      generated_at: '2024-06-25T10:00:00Z',
      sent_at: '2024-06-26T09:00:00Z',
      viewed_at: '2024-06-27T14:30:00Z'
    },
    {
      id: 3,
      employee_id: 3,
      employee_name: 'Jean Bosco Niyonzima',
      employee_number: 'EMP003',
      department: 'Operations',
      position: 'Operations Supervisor',
      period: '2024-06',
      basic_salary: 400000,
      hours_worked: 180,
      overtime_hours: 12,
      overtime_pay: 40000,
      transport_allowance: 30000,
      housing_allowance: 25000,
      performance_bonus: 20000,
      night_shift_allowance: 10000,
      total_allowances: 85000,
      tax_deduction: 40000,
      insurance_deduction: 15000,
      loan_deduction: 20000,
      other_deductions: 10000,
      total_deductions: 85000,
      gross_pay: 525000,
      net_pay: 440000,
      payment_method: 'Bank Transfer',
      bank_name: 'Bank of Kigali',
      account_number: '1122334455',
      status: 'downloaded',
      generated_at: '2024-06-25T10:00:00Z',
      sent_at: '2024-06-26T09:00:00Z',
      viewed_at: '2024-06-27T14:30:00Z',
      downloaded_at: '2024-06-28T11:00:00Z'
    },
    {
      id: 4,
      employee_id: 4,
      employee_name: 'Sandrine Uwase',
      employee_number: 'EMP004',
      department: 'Finance',
      position: 'Accountant',
      period: '2024-06',
      basic_salary: 350000,
      hours_worked: 176,
      overtime_hours: 5,
      overtime_pay: 20000,
      transport_allowance: 20000,
      housing_allowance: 18000,
      performance_bonus: 12000,
      night_shift_allowance: 0,
      total_allowances: 50000,
      tax_deduction: 32000,
      insurance_deduction: 11000,
      loan_deduction: 0,
      other_deductions: 7000,
      total_deductions: 50000,
      gross_pay: 420000,
      net_pay: 370000,
      payment_method: 'Bank Transfer',
      bank_name: 'Bank of Kigali',
      account_number: '2233445566',
      status: 'generated',
      generated_at: '2024-06-25T10:00:00Z'
    }
  ]);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showPayslipDetails, setShowPayslipDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedPayslips, setSelectedPayslips] = useState<number[]>([]);

  // Role-based permissions
  const isFinanceManager = user?.role === 'finance_manager' || user?.role === 'system_admin';
  const isAccountant = user?.role === 'accountant';
  const canViewPayslips = isFinanceManager || isAccountant;
  const canGeneratePayslips = isFinanceManager || isAccountant;
  const canSendPayslips = isFinanceManager;

  const filteredPayslips = payslips.filter(payslip => {
    const matchesSearch = payslip.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payslip.employee_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payslip.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payslip.status === statusFilter;
    const matchesPeriod = periodFilter === 'all' || payslip.period === periodFilter;
    const matchesDepartment = departmentFilter === 'all' || payslip.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesPeriod && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloaded': return 'bg-green-100 text-green-800';
      case 'viewed': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'generated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Only update mock state, no API calls
  const handleSendPayslip = (payslipId: number) => {
    setPayslips(payslips => 
      payslips.map(payslip => 
        payslip.id === payslipId 
          ? { ...payslip, status: 'sent', sent_at: new Date().toISOString() }
          : payslip
      )
    );
  };

  const handleDownloadPayslip = (payslipId: number) => {
    setPayslips(payslips => 
      payslips.map(payslip => 
        payslip.id === payslipId 
          ? { ...payslip, status: 'downloaded', downloaded_at: new Date().toISOString() }
          : payslip
      )
    );
  };

  const handleBulkSend = () => {
    // Just a mock action
    setPayslips(payslips =>
      payslips.map(payslip =>
        selectedPayslips.includes(payslip.id)
          ? { ...payslip, status: 'sent', sent_at: new Date().toISOString() }
          : payslip
      )
    );
  };

  const handleBulkDownload = () => {
    // Just a mock action
    setPayslips(payslips =>
      payslips.map(payslip =>
        selectedPayslips.includes(payslip.id)
          ? { ...payslip, status: 'downloaded', downloaded_at: new Date().toISOString() }
          : payslip
      )
    );
  };

  const getTotalStats = () => {
    const totalGross = payslips.reduce((sum, payslip) => sum + payslip.gross_pay, 0);
    const totalNet = payslips.reduce((sum, payslip) => sum + payslip.net_pay, 0);
    const totalTax = payslips.reduce((sum, payslip) => sum + payslip.tax_deduction, 0);
    const sentPayslips = payslips.filter(payslip => payslip.status === 'sent').length;
    return { totalGross, totalNet, totalTax, sentPayslips };
  };

  if (!canViewPayslips) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Access Denied</h3>
                <p className="text-sm text-red-700 mt-1">You don't have permission to view payslips.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payslips Management</h1>
              <p className="text-gray-600 mt-2">
                {isFinanceManager && 'Generate, send, and manage employee payslips'}
                {isAccountant && 'Generate and review employee payslips'}
              </p>
            </div>
            <div className="flex space-x-2">
              {canGeneratePayslips && (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate All
                </button>
              )}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Gross Pay</p>
                <p className="text-2xl font-bold text-gray-900">{formatRWF(stats.totalGross)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Net Pay</p>
                <p className="text-2xl font-bold text-gray-900">{formatRWF(stats.totalNet)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tax</p>
                <p className="text-2xl font-bold text-gray-900">{formatRWF(stats.totalTax)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sent Payslips</p>
                <p className="text-2xl font-bold text-gray-900">{stats.sentPayslips}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPayslips.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">
                  {selectedPayslips.length} payslip(s) selected
                </span>
              </div>
              <div className="flex space-x-2">
                {canSendPayslips && (
                  <button
                    onClick={handleBulkSend}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Send All
                  </button>
                )}
                <button
                  onClick={handleBulkDownload}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search employees, departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="generated">Generated</option>
                  <option value="sent">Sent</option>
                  <option value="viewed">Viewed</option>
                  <option value="downloaded">Downloaded</option>
                </select>
                <select
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Periods</option>
                  <option value="2024-01">January 2024</option>
                  <option value="2024-02">February 2024</option>
                  <option value="2024-03">March 2024</option>
                </select>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="Security">Security</option>
                  <option value="HR">HR</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payslips Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPayslips(filteredPayslips.map(p => p.id));
                        } else {
                          setSelectedPayslips([]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Pay
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Pay
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
                {filteredPayslips.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPayslips.includes(payslip.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPayslips([...selectedPayslips, payslip.id]);
                          } else {
                            setSelectedPayslips(selectedPayslips.filter(id => id !== payslip.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payslip.employee_name}</div>
                        <div className="text-sm text-gray-500">{payslip.employee_number}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payslip.department}</div>
                      <div className="text-sm text-gray-500">{payslip.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payslip.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatRWF(payslip.gross_pay)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatRWF(payslip.net_pay)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payslip.status)}`}>
                        {payslip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPayslip(payslip);
                            setShowPayslipDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canSendPayslips && payslip.status === 'generated' && (
                          <button
                            onClick={() => handleSendPayslip(payslip.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDownloadPayslip(payslip.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payslip Details Modal */}
        {showPayslipDetails && selectedPayslip && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payslip - {selectedPayslip.employee_name} ({selectedPayslip.period})
                  </h3>
                  <button
                    onClick={() => setShowPayslipDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Employee Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Name:</span> {selectedPayslip.employee_name}</div>
                      <div><span className="font-medium">Employee Number:</span> {selectedPayslip.employee_number}</div>
                      <div><span className="font-medium">Department:</span> {selectedPayslip.department}</div>
                      <div><span className="font-medium">Position:</span> {selectedPayslip.position}</div>
                      <div><span className="font-medium">Period:</span> {selectedPayslip.period}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Payment Method:</span> {selectedPayslip.payment_method}</div>
                      <div><span className="font-medium">Bank:</span> {selectedPayslip.bank_name}</div>
                      <div><span className="font-medium">Account Number:</span> {selectedPayslip.account_number}</div>
                      <div><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPayslip.status)}`}>
                          {selectedPayslip.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Salary Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Earnings</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Salary:</span>
                          <span>{formatRWF(selectedPayslip.basic_salary)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Overtime Pay:</span>
                          <span>{formatRWF(selectedPayslip.overtime_pay)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transport Allowance:</span>
                          <span>{formatRWF(selectedPayslip.transport_allowance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Housing Allowance:</span>
                          <span>{formatRWF(selectedPayslip.housing_allowance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Performance Bonus:</span>
                          <span>{formatRWF(selectedPayslip.performance_bonus)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Night Shift Allowance:</span>
                          <span>{formatRWF(selectedPayslip.night_shift_allowance)}</span>
                        </div>
                        <div className="border-t pt-1 font-medium">
                          <div className="flex justify-between">
                            <span>Total Allowances:</span>
                            <span>{formatRWF(selectedPayslip.total_allowances)}</span>
                          </div>
                        </div>
                        <div className="border-t pt-1 font-bold">
                          <div className="flex justify-between">
                            <span>Gross Pay:</span>
                            <span>{formatRWF(selectedPayslip.gross_pay)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Deductions</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Tax Deduction:</span>
                          <span>{formatRWF(selectedPayslip.tax_deduction)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance:</span>
                          <span>{formatRWF(selectedPayslip.insurance_deduction)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loan Deduction:</span>
                          <span>{formatRWF(selectedPayslip.loan_deduction)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Deductions:</span>
                          <span>{formatRWF(selectedPayslip.other_deductions)}</span>
                        </div>
                        <div className="border-t pt-1 font-medium">
                          <div className="flex justify-between">
                            <span>Total Deductions:</span>
                            <span>{formatRWF(selectedPayslip.total_deductions)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Summary</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Hours Worked:</span>
                          <span>{selectedPayslip.hours_worked}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Overtime Hours:</span>
                          <span>{selectedPayslip.overtime_hours}</span>
                        </div>
                        <div className="border-t pt-1 font-bold text-lg">
                          <div className="flex justify-between">
                            <span>Net Pay:</span>
                            <span>{formatRWF(selectedPayslip.net_pay)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowPayslipDetails(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                  {canSendPayslips && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payslips; 