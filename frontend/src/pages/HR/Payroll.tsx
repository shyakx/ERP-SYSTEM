import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DollarSign, Users, Calendar, FileText, Download, Upload, Eye, Edit, CheckCircle, AlertTriangle, Clock, Search } from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  baseSalary: number;
  hoursWorked: number;
  hourlyRate: number;
  overtimeHours: number;
  overtimeRate: number;
  deductions: number;
  bonuses: number;
  netPay: number;
  status: 'pending' | 'processed' | 'paid' | 'cancelled';
  paymentDate?: string;
  paymentMethod: 'direct_deposit' | 'check' | 'cash';
  notes?: string;
}

// Mock data for development
const mockPayroll: PayrollRecord[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    period: '2024-01-01 to 2024-01-15',
    baseSalary: 45000,
    hoursWorked: 80,
    hourlyRate: 25,
    overtimeHours: 8,
    overtimeRate: 37.5,
    deductions: 1200,
    bonuses: 500,
    netPay: 3200,
    status: 'paid',
    paymentDate: '2024-01-20',
    paymentMethod: 'direct_deposit',
    notes: 'Regular bi-weekly payment'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    period: '2024-01-01 to 2024-01-15',
    baseSalary: 65000,
    hoursWorked: 80,
    hourlyRate: 30,
    overtimeHours: 12,
    overtimeRate: 45,
    deductions: 1800,
    bonuses: 800,
    netPay: 4800,
    status: 'paid',
    paymentDate: '2024-01-20',
    paymentMethod: 'direct_deposit',
    notes: 'Supervisor bonus included'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Michael Brown',
    period: '2024-01-01 to 2024-01-15',
    baseSalary: 42000,
    hoursWorked: 72,
    hourlyRate: 28,
    overtimeHours: 0,
    overtimeRate: 42,
    deductions: 1100,
    bonuses: 0,
    netPay: 2800,
    status: 'processed',
    paymentMethod: 'direct_deposit',
    notes: 'Reduced hours due to leave'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    employeeName: 'Lisa Davis',
    period: '2024-01-01 to 2024-01-15',
    baseSalary: 48000,
    hoursWorked: 80,
    hourlyRate: 32,
    overtimeHours: 4,
    overtimeRate: 48,
    deductions: 1400,
    bonuses: 300,
    netPay: 3500,
    status: 'pending',
    paymentMethod: 'direct_deposit',
    notes: 'Pending approval'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    employeeName: 'David Wilson',
    period: '2024-01-01 to 2024-01-15',
    baseSalary: 52000,
    hoursWorked: 80,
    hourlyRate: 35,
    overtimeHours: 6,
    overtimeRate: 52.5,
    deductions: 1600,
    bonuses: 600,
    netPay: 4100,
    status: 'pending',
    paymentMethod: 'check',
    notes: 'New employee first payment'
  }
];

const Payroll: React.FC = () => {
  const { user } = useAuth();
  const [payroll, setPayroll] = useState<PayrollRecord[]>(mockPayroll);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<string>('');
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);

  const canManagePayroll = user?.role === 'system_admin' || user?.role === 'hr_manager' || user?.role === 'finance_manager' || user?.role === 'accountant';

  const filteredPayroll = payroll.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesPeriod = !periodFilter || record.period.includes(periodFilter);
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateGrossPay = (record: PayrollRecord) => {
    const regularPay = record.hoursWorked * record.hourlyRate;
    const overtimePay = record.overtimeHours * record.overtimeRate;
    return regularPay + overtimePay + record.bonuses;
  };

  const handleProcessPayroll = (recordId: string) => {
    setPayroll(payroll.map(record => 
      record.id === recordId 
        ? { ...record, status: 'processed' as const }
        : record
    ));
  };

  const handlePayPayroll = (recordId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setPayroll(payroll.map(record => 
      record.id === recordId 
        ? { ...record, status: 'paid' as const, paymentDate: today }
        : record
    ));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-gray-600 mt-1">Process employee salaries and payments</p>
          </div>
          {canManagePayroll && (
            <button
              onClick={() => setShowProcessModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Process Payroll</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">{formatRWF(getTotalPayroll())}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{getPendingPayroll()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Processed</p>
              <p className="text-2xl font-bold text-gray-900">{getProcessedPayroll()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-gray-900">{getPaidPayroll()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search payroll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processed">Processed</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="text"
            placeholder="Pay period..."
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payroll List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayroll.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">ID: {record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.hoursWorked}h + {record.overtimeHours}h OT
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatRWF(calculateGrossPay(record))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatRWF(record.deductions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatRWF(record.netPay)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedPayroll(record)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canManagePayroll && record.status === 'pending' && (
                        <button
                          onClick={() => handleProcessPayroll(record.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Process"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {canManagePayroll && record.status === 'processed' && (
                        <button
                          onClick={() => handlePayPayroll(record.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Mark as Paid"
                        >
                          <DollarSign className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredPayroll.length} of {payroll.length} records
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Process Payroll Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Process Payroll</h3>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Pay Period</option>
                      <option>2024-01-01 to 2024-01-15</option>
                      <option>2024-01-16 to 2024-01-31</option>
                      <option>2024-02-01 to 2024-02-15</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Direct Deposit</option>
                      <option>Check</option>
                      <option>Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Include Overtime</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowProcessModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Process Payroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll; 