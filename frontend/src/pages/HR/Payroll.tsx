import React, { useEffect, useState } from 'react';
import { BarChart3, CheckCircle, Download, Edit, Eye, FileText, Filter, Plus, Search, Upload, XCircle, RefreshCw, Calendar, Users, DollarSign, AlertCircle } from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { payrollService } from '../../services/payroll';
import { toast } from 'react-toastify';

const allowedRoles = ['hr_manager', 'finance_manager', 'finance_officer', 'system_admin'];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  submitted: 'bg-blue-100 text-blue-800 border-blue-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  paid: 'bg-purple-100 text-purple-800 border-purple-200',
};

const months = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setMonth(d.getMonth() - i);
  return d.toISOString().slice(0, 7); // YYYY-MM
});

const statusOptions = [
  { value: 'all', label: 'All Statuses', icon: '📊' },
  { value: 'pending', label: 'Pending', icon: '⏳' },
  { value: 'submitted', label: 'Submitted', icon: '📤' },
  { value: 'approved', label: 'Approved', icon: '✅' },
  { value: 'rejected', label: 'Rejected', icon: '❌' },
  { value: 'paid', label: 'Paid', icon: '💰' },
];

const PayrollPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showPayslip, setShowPayslip] = useState(false);
  const [payslipData, setPayslipData] = useState<any>(null);
  const [summary, setSummary] = useState<{
    paid: number;
    total: number;
    pending: number;
    rejected: number;
    totalAmount: number;
  }>({ 
    paid: 0, 
    total: 0, 
    pending: 0, 
    rejected: 0, 
    totalAmount: 0 
  });
  const [tab, setTab] = useState<'current' | 'history'>('current');
  const [actionLoading, setActionLoading] = useState(false);
  const [commentModal, setCommentModal] = useState<{ open: boolean; type: 'approve' | 'reject'; row: any | null }>({ open: false, type: 'approve', row: null });
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; type: 'markPaid'; row: any | null }>({ open: false, type: 'markPaid', row: null });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [employeeNameFilter, setEmployeeNameFilter] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch departments and payment methods for dropdowns
  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then((data: any[]) => {
        const uniqueDepartments = Array.from(new Set(data.map((emp: any) => emp.department).filter(Boolean))) as string[];
        setDepartments(uniqueDepartments);
      });
    fetch('/api/payroll/payment-methods')
      .then(res => res.json())
      .then((data: string[]) => setPaymentMethods(data));
  }, []);

  // Role restriction
  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // Update payroll fetching to use filters
  useEffect(() => {
    setLoading(true);
    setError('');
    payrollService.fetchPayroll({
      period: selectedMonth,
      status: statusFilter,
      department: departmentFilter,
      paymentMethod: paymentMethodFilter,
      employeeName: employeeNameFilter,
    })
      .then(data => {
        setPayroll(data);
        // Calculate summary with real data
        const totalAmount = data.reduce((sum: number, p: any) => sum + (Number(p.net_pay) || 0), 0);
        const paidCount = data.filter((p: any) => p.status === 'paid').length;
        const pendingCount = data.filter((p: any) => p.status === 'pending').length;
        const rejectedCount = data.filter((p: any) => p.status === 'rejected').length;
        
        setSummary({
          paid: paidCount,
          total: data.length,
          pending: pendingCount,
          rejected: rejectedCount,
          totalAmount: totalAmount,
        });
      })
      .catch(() => setError('Failed to load payroll data'))
      .finally(() => setLoading(false));
  }, [selectedMonth, tab, statusFilter, departmentFilter, paymentMethodFilter, employeeNameFilter]);

  const handleSelectRow = (id: number) => {
    setSelectedRows(rows => rows.includes(id) ? rows.filter(r => r !== id) : [...rows, id]);
  };
  
  const handleSelectAll = () => {
    if (selectedRows.length === payroll.length) setSelectedRows([]);
    else setSelectedRows(payroll.map(p => p.id));
  };

  const handleInlineEdit = (id: number, field: string, value: number) => {
    setPayroll(payroll => payroll.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const refreshPayroll = async () => {
    const data = await payrollService.fetchPayroll({
      period: selectedMonth,
      status: statusFilter,
      department: departmentFilter,
      paymentMethod: paymentMethodFilter,
      employeeName: employeeNameFilter,
    });
    setPayroll(data);
  };

  // Replace handleSubmitForApproval
  const handleSubmitForApproval = async () => {
    if (selectedRows.length === 0) return toast.warn('Select at least one payroll row.');
    setActionLoading(true);
    try {
      await payrollService.submitPayroll(selectedRows);
      toast.success('Payroll submitted for approval!');
      // Refresh payroll
      const data = await payrollService.fetchPayroll({
        period: selectedMonth,
        status: statusFilter,
        department: departmentFilter,
        paymentMethod: paymentMethodFilter,
        employeeName: employeeNameFilter,
      });
      setPayroll(data);
      setSelectedRows([]);
    } catch (e: any) {
      toast.error(e.message || 'Failed to submit payroll');
    } finally {
      setActionLoading(false);
    }
  };

  // Replace handleExport
  const handleExport = async () => {
    setActionLoading(true);
    try {
      const blob = await payrollService.exportPayroll(selectedMonth);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payroll_${selectedMonth}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Payroll exported!');
    } catch (e: any) {
      toast.error(e.message || 'Failed to export payroll');
    } finally {
      setActionLoading(false);
    }
  };

  // Add handleGeneratePayroll
  const handleGeneratePayroll = async () => {
    setActionLoading(true);
    try {
      await payrollService.generatePayroll(selectedMonth);
      toast.success('Payroll generated!');
      const data = await payrollService.fetchPayroll({
        period: selectedMonth,
        status: statusFilter,
        department: departmentFilter,
        paymentMethod: paymentMethodFilter,
        employeeName: employeeNameFilter,
      });
      setPayroll(data);
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate payroll');
    } finally {
      setActionLoading(false);
    }
  };

  // Add handleApprove, handleReject, handleMarkAsPaid
  const handleApprove = async (row: any, comment?: string) => {
    setActionLoading(true);
    try {
      await payrollService.approvePayroll(row.id, comment);
      toast.success('Payroll approved!');
      const data = await payrollService.fetchPayroll({
        period: selectedMonth,
        status: statusFilter,
        department: departmentFilter,
        paymentMethod: paymentMethodFilter,
        employeeName: employeeNameFilter,
      });
      setPayroll(data);
    } catch (e: any) {
      toast.error(e.message || 'Failed to approve payroll');
    } finally {
      setActionLoading(false);
      setCommentModal({ open: false, type: 'approve', row: null });
    }
  };

  const handleReject = async (row: any, comment?: string) => {
    setActionLoading(true);
    try {
      await payrollService.rejectPayroll(row.id, comment);
      toast.success('Payroll rejected!');
      const data = await payrollService.fetchPayroll({
        period: selectedMonth,
        status: statusFilter,
        department: departmentFilter,
        paymentMethod: paymentMethodFilter,
        employeeName: employeeNameFilter,
      });
      setPayroll(data);
    } catch (e: any) {
      toast.error(e.message || 'Failed to reject payroll');
    } finally {
      setActionLoading(false);
      setCommentModal({ open: false, type: 'reject', row: null });
    }
  };

  const handleMarkAsPaid = async (row: any) => {
    setActionLoading(true);
    try {
      await payrollService.markAsPaid(row.id);
      toast.success('Marked as paid!');
      const data = await payrollService.fetchPayroll({
        period: selectedMonth,
        status: statusFilter,
        department: departmentFilter,
        paymentMethod: paymentMethodFilter,
        employeeName: employeeNameFilter,
      });
      setPayroll(data);
    } catch (e: any) {
      toast.error(e.message || 'Failed to mark as paid');
    } finally {
      setActionLoading(false);
      setConfirmModal({ open: false, type: 'markPaid', row: null });
    }
  };

  // Add handleDownloadPayslip
  const handleDownloadPayslip = async (row: any) => {
    setActionLoading(true);
    try {
      const blob = await payrollService.downloadPayslip(row.employee_id, selectedMonth);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip_${row.employee_name}_${selectedMonth}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Payslip downloaded!');
    } catch (e: any) {
      toast.error(e.message || 'Failed to download payslip');
    } finally {
      setActionLoading(false);
    }
  };

  // Add handleBulkUpload
  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    setUploadError('');
    try {
      await payrollService.bulkUpload(e.target.files[0]);
      toast.success('Payroll CSV uploaded!');
      const data = await payrollService.fetchPayroll({
        period: selectedMonth,
        status: statusFilter,
        department: departmentFilter,
        paymentMethod: paymentMethodFilter,
        employeeName: employeeNameFilter,
      });
      setPayroll(data);
    } catch (e: any) {
      setUploadError(e.message || 'Failed to upload payroll CSV');
      toast.error(e.message || 'Failed to upload payroll CSV');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handlePayslip = (row: any) => {
    setPayslipData(row);
    setShowPayslip(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Dashboard</h1>
          <p className="text-gray-600">Manage and process employee payroll efficiently</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm text-gray-600">Month:</label>
          <select
              className="border-none bg-transparent text-gray-900 font-medium focus:outline-none focus:ring-0"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            {months.map(m => (
              <option key={m} value={m}>{new Date(m + '-01').toLocaleString(undefined, { month: 'long', year: 'numeric' })}</option>
            ))}
          </select>
        </div>
          <button
            onClick={refreshPayroll}
            disabled={loading}
            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={departmentFilter}
                onChange={e => setDepartmentFilter(e.target.value)}
              >
                <option value="all">🏢 All Departments</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>🏢 {dep}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={paymentMethodFilter}
                onChange={e => setPaymentMethodFilter(e.target.value)}
              >
                <option value="all">💳 All Methods</option>
                {paymentMethods.map(pm => (
                  <option key={pm} value={pm}>💳 {pm.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Search by name..."
                  value={employeeNameFilter}
                  onChange={e => setEmployeeNameFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-0.5">Total Employees Paid</p>
              <p className="text-2xl font-bold text-green-600">{summary.paid}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-0.5">Total Payroll Amount</p>
              <p className="text-2xl font-bold text-blue-600">{isNaN(summary.totalAmount) ? 'Frw 0' : formatRWF(summary.totalAmount)}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-0.5">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-600">{summary.pending}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-0.5">Rejected / Flagged</p>
              <p className="text-2xl font-bold text-red-600">{summary.rejected}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <button
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            tab === 'current' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
          onClick={() => setTab('current')}
        >
          Current Payroll
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            tab === 'history' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
          onClick={() => setTab('history')}
        >
          Payroll History
        </button>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="text-gray-600">Loading payroll...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="px-4 py-2 text-sm border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={handleSelectAll}
                  >
                    Select All
                  </button>
                  <button 
                    className="px-4 py-2 text-sm border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                    onClick={handleSubmitForApproval}
                    disabled={selectedRows.length === 0 || actionLoading}
                  >
                    Submit for Approval
                  </button>
                  <button 
                    className="px-4 py-2 text-sm border rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-1"
                    onClick={handleExport}
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <button 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                  onClick={handleGeneratePayroll}
                  disabled={actionLoading}
                >
                  <Plus className="w-4 h-4" />
                  Generate Payroll
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Days Worked</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payroll.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)} 
                          onChange={() => handleSelectRow(row.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div 
                          className="text-blue-700 hover:text-blue-900 cursor-pointer font-medium hover:underline"
                          onClick={() => handlePayslip(row)}
                        >
                          {row.employee_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{row.position || row.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">{row.days_worked || row.attendance_days || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="number"
                          className="w-24 border border-gray-300 rounded px-2 py-1 text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={row.deductions || 0}
                          onChange={e => handleInlineEdit(row.id, 'deductions', Number(e.target.value))}
                          disabled={row.status !== 'pending'}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-green-700">{formatRWF(row.net_pay)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[row.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex gap-2 justify-center">
                          <button 
                            className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors" 
                            title="View Payslip" 
                            onClick={() => handlePayslip(row)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {user.role === 'finance_manager' && row.status === 'submitted' && (
                            <button 
                              className="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded transition-colors" 
                              title="Approve" 
                              onClick={() => setCommentModal({ open: true, type: 'approve', row })}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {user.role === 'finance_manager' && row.status === 'submitted' && (
                            <button 
                              className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors" 
                              title="Reject" 
                              onClick={() => setCommentModal({ open: true, type: 'reject', row })}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {user.role === 'finance_manager' && row.status === 'approved' && (
                            <button 
                              className="p-1 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded transition-colors" 
                              title="Mark as Paid" 
                              onClick={() => setConfirmModal({ open: true, type: 'markPaid', row })}
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            className="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded transition-colors" 
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors" 
                            title="Download Payslip" 
                            onClick={() => handleDownloadPayslip(row)}
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Payslip Modal */}
      {showPayslip && payslipData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative animate-in slide-in-from-bottom-4 duration-300">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors" 
              onClick={() => setShowPayslip(false)}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Payslip for {payslipData.employee_name}</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Period:</span>
                <span className="font-medium">{new Date(selectedMonth + '-01').toLocaleString(undefined, { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Position:</span>
                <span className="font-medium">{payslipData.position || payslipData.department}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Base Salary:</span>
                <span className="font-medium">{formatRWF(payslipData.base_salary)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Attendance Days:</span>
                <span className="font-medium">{payslipData.days_worked || payslipData.attendance_days}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Bonuses:</span>
                <span className="font-medium">{formatRWF(payslipData.bonuses || 0)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Deductions:</span>
                <span className="font-medium text-red-600">{formatRWF(payslipData.deductions || 0)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium text-red-600">{formatRWF(payslipData.tax || 0)}</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-green-50 rounded-lg px-4">
                <span className="text-gray-900 font-semibold">Net Salary:</span>
                <span className="font-bold text-green-700 text-lg">{formatRWF(payslipData.net_pay)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[payslipData.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                  {payslipData.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button 
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 transition-colors" 
                onClick={() => alert('Download PDF')}
              >
                <FileText className="w-4 h-4" />
                Download PDF
              </button>
              <button 
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" 
                onClick={() => setShowPayslip(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {commentModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-in slide-in-from-bottom-4 duration-300">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors" 
              onClick={() => setCommentModal({ open: false, type: commentModal.type, row: null })}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {commentModal.type === 'approve' ? 'Approve Payroll' : 'Reject Payroll'}
            </h2>
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              rows={3} 
              placeholder="Add a comment (optional)" 
              id="comment-input"
            />
            <div className="flex gap-3">
              <button 
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" 
                onClick={() => setCommentModal({ open: false, type: commentModal.type, row: null })}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                onClick={() => {
                const comment = (document.getElementById('comment-input') as HTMLTextAreaElement)?.value;
                commentModal.type === 'approve' ? handleApprove(commentModal.row, comment) : handleReject(commentModal.row, comment);
                }}
              >
                {commentModal.type === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-in slide-in-from-bottom-4 duration-300">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors" 
              onClick={() => setConfirmModal({ open: false, type: confirmModal.type, row: null })}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Mark as Paid</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to mark this payroll as paid?</p>
            <div className="flex gap-3">
              <button 
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" 
                onClick={() => setConfirmModal({ open: false, type: confirmModal.type, row: null })}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" 
                onClick={() => handleMarkAsPaid(confirmModal.row)}
              >
                Mark as Paid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload */}
      <div className="mt-6 flex items-center gap-4">
        <label className="bg-white px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
          <Upload className="w-4 h-4 inline mr-2" />
          Bulk Upload CSV
          <input type="file" accept=".csv" className="hidden" onChange={handleBulkUpload} disabled={uploading} />
        </label>
        {uploading && (
          <div className="flex items-center gap-2 text-blue-600">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        )}
        {uploadError && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{uploadError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollPage; 