import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Building,
  UserCheck,
  UserX,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  Send,
  BookOpen,
  Award,
  Play,
  Pause,
  StopCircle,
  CalendarDays,
  Clock3,
  UserMinus,
  CheckSquare,
  Timer,
  Activity,
  Zap,
  Coffee,
  Target,
  BarChart3,
  TrendingDown,
  Trophy,
  Medal,
  CreditCard,
  Banknote,
  Receipt,
  Calculator
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { payrollAPI } from '../../../../services/api';
import Modal from '../../../shared/Modal';
import PayrollForm from '../../../forms/PayrollForm';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  payDate: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  taxAmount: number;
  netSalary: number;
  paymentMethod: string;
  bankAccount: string;
  status: string;
  notes: string;
  allowancesBreakdown: string[];
  deductionsBreakdown: string[];
  department: string;
}

const Payroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [showAddPayrollModal, setShowAddPayrollModal] = useState(false);
  const [showEditPayrollModal, setShowEditPayrollModal] = useState(false);
  const [showViewPayrollModal, setShowViewPayrollModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);

  // Fetch payroll data
  const { 
    items: payrollData, 
    loading: payrollLoading, 
    error: payrollError, 
    refetch: refetchPayroll, 
    updateFilters: updatePayrollFilters,
    total: payrollTotal,
    currentPage: payrollCurrentPage,
    totalPages: payrollTotalPages
  } = useApiList(payrollAPI.getAll, {
    page: 1,
    limit: 10,
    status: "all",
    department: "all"
  });

  // Delete mutations
  const deletePayrollMutation = useApiMutation(payrollAPI.delete);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updatePayrollFilters({ search: value, page: 1 });
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    updatePayrollFilters({ department, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    updatePayrollFilters({ status, page: 1 });
  };

  const handlePeriodFilter = (period: string) => {
    setFilterPeriod(period);
    updatePayrollFilters({ period, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updatePayrollFilters({ page });
  };

  const handleAddPayroll = () => {
    setSelectedPayroll(null);
    setShowAddPayrollModal(true);
  };

  const handleEditPayroll = (payroll: PayrollRecord) => {
    setSelectedPayroll(payroll);
    setShowEditPayrollModal(true);
  };

  const handleViewPayroll = (payroll: PayrollRecord) => {
    setSelectedPayroll(payroll);
    setShowViewPayrollModal(true);
  };

  const handleDeletePayroll = async (payrollId: string) => {
    if (window.confirm('Are you sure you want to delete this payroll record?')) {
      try {
        await deletePayrollMutation.mutate(payrollId);
        refetchPayroll();
      } catch (error) {
        console.error('Error deleting payroll record:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowAddPayrollModal(false);
    setShowEditPayrollModal(false);
    refetchPayroll();
  };

  const handleFormCancel = () => {
    setShowAddPayrollModal(false);
    setShowEditPayrollModal(false);
  };

  const payrollStats = [
    { 
      title: 'Total Payroll', 
      value: payrollData?.length > 0 ? `RWF ${(payrollData.reduce((total: number, record: PayrollRecord) => total + (record.netSalary || 0), 0) / 1000000).toFixed(1)}M` : 'RWF 0M', 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'text-green-600',
      subtitle: 'This month'
    },
    { 
      title: 'Average Salary', 
      value: payrollData?.length > 0 ? `RWF ${Math.round(payrollData.reduce((total: number, record: PayrollRecord) => total + (record.netSalary || 0), 0) / payrollData.length).toLocaleString()}` : 'RWF 0', 
      change: '+5.2%', 
      icon: Calculator, 
      color: 'text-blue-600',
      subtitle: 'Per employee'
    },
    { 
      title: 'Paid This Month', 
      value: (payrollData?.filter((record: PayrollRecord) => record.status === 'Paid').length || 0).toString(), 
      change: '+8', 
      icon: CheckCircle, 
      color: 'text-purple-600',
      subtitle: 'Successfully paid'
    },
    { 
      title: 'Pending Payments', 
      value: (payrollData?.filter((record: PayrollRecord) => record.status === 'Pending').length || 0).toString(), 
      change: '-3', 
      icon: Clock3, 
      color: 'text-orange-600',
      subtitle: 'Awaiting processing'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'Bank Transfer': return 'bg-blue-100 text-blue-800';
      case 'Cash': return 'bg-green-100 text-green-800';
      case 'Check': return 'bg-purple-100 text-purple-800';
      case 'Mobile Money': return 'bg-orange-100 text-orange-800';
      case 'Direct Deposit': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'IT': return 'bg-blue-100 text-blue-800';
      case 'HR': return 'bg-purple-100 text-purple-800';
      case 'Finance': return 'bg-green-100 text-green-800';
      case 'Marketing': return 'bg-pink-100 text-pink-800';
      case 'Sales': return 'bg-orange-100 text-orange-800';
      case 'Operations': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return `RWF ${amount?.toLocaleString()}`;
  };

  if (payrollLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (payrollError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading payroll data</h3>
            <div className="mt-2 text-sm text-red-700">{payrollError}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">Manage employee salaries and payments</p>
        </div>
        <button
          onClick={handleAddPayroll}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Payroll Record
          </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {payrollStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="text-2xl">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
                type="text"
                placeholder="Search payroll records..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterPeriod}
              onChange={(e) => handlePeriodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Periods</option>
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
            <select
              value={filterDepartment}
              onChange={(e) => handleDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payroll Records Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollData.map((record: PayrollRecord) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {record.employeeName?.charAt(0)}
                            </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        <div className="text-sm text-gray-500">{record.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {record.payPeriod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{formatCurrency(record.basicSalary || 0)}</div>
                    {record.allowances > 0 && (
                      <div className="text-xs text-green-600">+{formatCurrency(record.allowances)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-bold text-lg">{formatCurrency(record.netSalary || 0)}</div>
                    {record.deductions > 0 && (
                      <div className="text-xs text-red-600">-{formatCurrency(record.deductions)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(record.paymentMethod)}`}>
                      {record.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.payDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewPayroll(record)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                        </button>
                      <button
                        onClick={() => handleEditPayroll(record)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                        </button>
                      <button
                        onClick={() => handleDeletePayroll(record.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>

      {/* Pagination */}
      {payrollTotalPages > 1 && (
                    <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(payrollCurrentPage - 1) * 10 + 1} to {Math.min(payrollCurrentPage * 10, payrollTotal)} of {payrollTotal} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(payrollCurrentPage - 1)}
              disabled={payrollCurrentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
          </button>
            <button
              onClick={() => handlePageChange(payrollCurrentPage + 1)}
              disabled={payrollCurrentPage === payrollTotalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
          </button>
        </div>
      </div>
      )}

      {/* Add/Edit/View Modals */}
      <Modal
        isOpen={showAddPayrollModal || showEditPayrollModal || showViewPayrollModal}
        onClose={() => {
          setShowAddPayrollModal(false);
          setShowEditPayrollModal(false);
          setShowViewPayrollModal(false);
        }}
        title={selectedPayroll ? (selectedPayroll.id ? 'Edit Payroll Record' : 'New Payroll Record') : 'Payroll Record Details'}
        size="xl"
      >
        {selectedPayroll ? (
          <PayrollForm
            payroll={selectedPayroll}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <PayrollForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Payroll;
