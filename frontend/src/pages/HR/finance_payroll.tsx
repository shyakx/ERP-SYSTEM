import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DollarSign, Users, AlertTriangle, Clock, Download, Eye, Edit, Trash2, ChevronDown, Loader2 } from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';
import { authService } from '../../services/auth';
import apiService from '../../services/api';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'processed', label: 'Processed' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'rejected', label: 'Rejected' },
];

const STATUS_STYLES: Record<string, string> = {
  disbursed: 'bg-green-100 text-green-800 border border-green-200 shadow-sm',
  approved: 'bg-blue-100 text-blue-800 border border-blue-200 shadow-sm',
  submitted: 'bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm',
  pending: 'bg-gray-100 text-gray-800 border border-gray-200 shadow-sm',
};

const Payroll: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [viewModal, setViewModal] = useState<any | null>(null);
  const [editModal, setEditModal] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = authService.getToken();
      if (!token || !isAuthenticated) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [employeeData, payrollData] = await Promise.all([
          apiService.get('/api/employees'),
          fetch('/api/payroll', {
            headers: { Authorization: `Bearer ${token}` },
          }).then(res => {
            if (!res.ok) throw new Error('Failed to fetch payroll data');
            return res.json();
          })
        ]);
        setEmployees(employeeData);
        setPayrolls(payrollData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  // Find payroll for an employee for the selected period
  const getPayrollForEmployee = (employeeId: string) => {
    if (periodFilter === 'all') {
      // Get latest payroll for employee
      const records = payrolls.filter((p: any) => p.employee_id === employeeId);
      if (records.length === 0) return null;
      // Sort by period descending
      return records.sort((a: any, b: any) => (b.period > a.period ? 1 : -1))[0];
    }
    return payrolls.find((p: any) => p.employee_id === employeeId && p.period === periodFilter);
  };

  // Filter employees by search
  const filteredEmployees = employees.filter((emp: any) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position?.toLowerCase().includes(search.toLowerCase()) ||
    emp.department?.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate summary values
  const totalEmployees = employees.length;
  const totalPayroll = payrolls.reduce((sum, p) => sum + (p.net_pay || 0), 0);
  const totalDeductions = payrolls.reduce((sum, p) => sum + (p.deductions || 0), 0);
  const pendingPayrolls = payrolls.filter((p) => p.status !== 'disbursed').length;

  // Action handlers (improved)
  const handleDownloadPayslip = async (employeeId: string, period: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/payslip/${employeeId}?month=${period}`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to download payslip');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Payslip-${employeeId}-${period}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert('Payslip downloaded!');
    } catch (err) {
      alert('Failed to download payslip');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePayroll = async (payrollId: string) => {
    if (!window.confirm('Are you sure you want to delete this payroll record?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/payroll/${payrollId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to delete payroll');
      setPayrolls((prev: any[]) => prev.filter(p => p.id !== payrollId));
      alert('Payroll record deleted!');
    } catch (err) {
      alert('Failed to delete payroll');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusChange = async (payroll: any, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/payroll/${payroll.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify({ ...payroll, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setPayrolls((prev: any[]) => prev.map(p => (p.id === payroll.id ? updated : p)));
      alert('Status updated!');
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  // Edit Payroll logic
  const openEditModal = (emp: any, payroll: any) => {
    setEditForm({
      id: payroll?.id,
      employee: emp,
      period: payroll?.period || '',
      gross_pay: payroll?.gross_pay || '',
      net_pay: payroll?.net_pay || '',
      deductions: payroll?.deductions || '',
      bonuses: payroll?.bonuses || '',
      notes: payroll?.notes || '',
      status: payroll?.status || 'pending',
      hoursWorked: 160, // default full-time
      overtimeHours: 0,
      overtimeRate: 0,
      transportAllowance: 0,
      housingAllowance: 0,
      performanceBonus: Number(payroll?.bonuses) || 0,
      nightShiftAllowance: 0,
      taxDeduction: 0,
      insuranceDeduction: 0,
      loanDeduction: 0,
      otherDeductions: 0,
    });
    setEditModal({ emp, payroll });
    setEditError(null);
    setEditSuccess(false);
  };

  const handleEditChange = (field: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }));
  };

  // Add auto-calculation logic for payroll fields
  useEffect(() => {
    if (!editForm) return;
    // Calculate hourly rate from base salary
    const baseSalary = Number(editForm.employee?.salary) || 0;
    const hoursWorked = Number(editForm.hoursWorked) || 160;
    const hourlyRate = baseSalary && hoursWorked ? baseSalary / hoursWorked : 0;
    const overtimeHours = Number(editForm.overtimeHours) || 0;
    const overtimeRate = Number(editForm.overtimeRate) || hourlyRate * 1.5;
    const transportAllowance = Number(editForm.transportAllowance) || 0;
    const housingAllowance = Number(editForm.housingAllowance) || 0;
    const performanceBonus = Number(editForm.performanceBonus) || 0;
    const nightShiftAllowance = Number(editForm.nightShiftAllowance) || 0;
    const taxDeduction = Number(editForm.taxDeduction) || 0;
    const insuranceDeduction = Number(editForm.insuranceDeduction) || 0;
    const loanDeduction = Number(editForm.loanDeduction) || 0;
    const otherDeductions = Number(editForm.otherDeductions) || 0;
    const grossPay = (hoursWorked * hourlyRate) + (overtimeHours * overtimeRate) + transportAllowance + housingAllowance + performanceBonus + nightShiftAllowance;
    const totalDeductions = taxDeduction + insuranceDeduction + loanDeduction + otherDeductions;
    const netPay = grossPay - totalDeductions;
    const bonuses = performanceBonus + nightShiftAllowance;
    setEditForm((prev: any) => ({
      ...prev,
      baseSalary,
      hoursWorked,
      hourlyRate,
      overtimeHours,
      overtimeRate,
      transportAllowance,
      housingAllowance,
      performanceBonus,
      nightShiftAllowance,
      taxDeduction,
      insuranceDeduction,
      loanDeduction,
      otherDeductions,
      gross_pay: grossPay,
      net_pay: netPay,
      deductions: totalDeductions,
      bonuses,
    }));
    // eslint-disable-next-line
  }, [editForm?.employee, editForm?.hoursWorked, editForm?.overtimeHours, editForm?.overtimeRate, editForm?.transportAllowance, editForm?.housingAllowance, editForm?.performanceBonus, editForm?.nightShiftAllowance, editForm?.taxDeduction, editForm?.insuranceDeduction, editForm?.loanDeduction, editForm?.otherDeductions]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    setEditSuccess(false);
    try {
      let res, updated;
      if (editForm.id) {
        // Update existing payroll
        res = await fetch(`/api/payroll/${editForm.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authService.getToken()}`,
          },
          body: JSON.stringify({
            gross_pay: Number(editForm.gross_pay),
            net_pay: Number(editForm.net_pay),
            deductions: Number(editForm.deductions),
            bonuses: Number(editForm.bonuses),
            notes: editForm.notes,
            status: editForm.status,
          }),
        });
        if (!res.ok) throw new Error('Failed to update payroll');
        updated = await res.json();
      } else {
        // Create new payroll
        const payload = {
          employeeId: editForm.employee.id,
          period: editForm.period || new Date().toISOString().slice(0, 7),
          baseSalary: editForm.employee.salary || 0,
          hoursWorked: 160, // default full-time
          hourlyRate: (editForm.employee.salary || 0) / 160,
          overtimeHours: 0,
          overtimeRate: 0,
          transportAllowance: 0,
          housingAllowance: 0,
          performanceBonus: Number(editForm.bonuses) || 0,
          nightShiftAllowance: 0,
          taxDeduction: 0,
          insuranceDeduction: 0,
          loanDeduction: 0,
          otherDeductions: 0,
          grossPay: Number(editForm.gross_pay),
          netPay: Number(editForm.net_pay),
          deductions: Number(editForm.deductions),
          bonuses: Number(editForm.bonuses),
          paymentMethod: 'direct_deposit',
          notes: editForm.notes,
          status: editForm.status,
        };
        console.log('Creating payroll with payload:', payload);
        res = await fetch('/api/payroll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authService.getToken()}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create payroll');
        updated = await res.json();
      }
      setPayrolls((prev: any[]) => {
        // If new, add; if update, replace
        if (editForm.id) {
          return prev.map(p => (p.id === updated.id ? updated : p));
        } else {
          return [...prev, updated];
        }
      });
      setEditSuccess(true);
      setTimeout(() => {
        setEditModal(null);
        setEditSuccess(false);
      }, 1000);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update payroll');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-1">Payroll Management</h1>
      <p className="text-lg text-gray-500 mb-8">Manage payroll records for each employee</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center p-5 rounded-xl shadow border border-blue-100 bg-blue-50 animate-fade-in">
          <Users className="w-8 h-8 text-blue-600 mr-4" />
          <div>
            <div className="text-2xl font-bold text-blue-900">{totalEmployees}</div>
            <div className="text-blue-700 text-sm">Employees</div>
          </div>
        </div>
        <div className="flex items-center p-5 rounded-xl shadow border border-green-100 bg-green-50 animate-fade-in">
          <DollarSign className="w-8 h-8 text-green-600 mr-4" />
          <div>
            <div className="text-2xl font-bold text-green-900">{formatRWF(totalPayroll)}</div>
            <div className="text-green-700 text-sm">Total Payroll</div>
          </div>
        </div>
        <div className="flex items-center p-5 rounded-xl shadow border border-yellow-100 bg-yellow-50 animate-fade-in">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4" />
          <div>
            <div className="text-2xl font-bold text-yellow-900">{formatRWF(totalDeductions)}</div>
            <div className="text-yellow-700 text-sm">Total Deductions</div>
          </div>
        </div>
        <div className="flex items-center p-5 rounded-xl shadow border border-red-100 bg-red-50 animate-fade-in">
          <Clock className="w-8 h-8 text-red-600 mr-4" />
          <div>
            <div className="text-2xl font-bold text-red-900">{pendingPayrolls}</div>
            <div className="text-red-700 text-sm">Pending Payrolls</div>
          </div>
        </div>
      </div>

      {loading && <div className="text-center py-12 text-blue-600 text-lg animate-pulse">Loading payroll data...</div>}
      {error && <div className="text-center py-12 text-red-600 text-lg">{error}</div>}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 overflow-x-auto transition-all duration-300 hover:shadow-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Salary</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Period</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Gross Pay</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Net Pay</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Deductions</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Bonuses</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Date</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp: any) => {
                const payroll = getPayrollForEmployee(emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-blue-50 transition-all duration-200">
                    <td className="px-4 py-3 font-semibold text-gray-900">{emp.name}</td>
                    <td className="px-4 py-3 text-gray-700">{emp.department}</td>
                    <td className="px-4 py-3 text-gray-700">{emp.position}</td>
                    <td className="px-4 py-3 text-right text-blue-700 font-bold">{emp.salary ? formatRWF(emp.salary) : '--'}</td>
                    <td className="px-4 py-3 text-gray-700">{payroll ? payroll.period : '--'}</td>
                    <td className="px-4 py-3 text-right text-blue-700 font-bold">{payroll ? formatRWF(payroll.gross_pay) : '--'}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-bold">{payroll ? formatRWF(payroll.net_pay) : '--'}</td>
                    <td className="px-4 py-3 text-right text-red-700">{payroll && payroll.deductions ? formatRWF(payroll.deductions) : '--'}</td>
                    <td className="px-4 py-3 text-right text-green-700">{payroll && payroll.bonuses ? formatRWF(payroll.bonuses) : '--'}</td>
                    <td className="px-4 py-3 text-center">
                      {payroll ? (
                        <select
                          className={`px-2 py-1 rounded text-xs font-bold border ${STATUS_STYLES[payroll.status] || STATUS_STYLES.pending}`}
                          value={payroll.status}
                          disabled={actionLoading}
                          onChange={e => handleStatusChange(payroll, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : '--'}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{payroll && payroll.payment_date ? new Date(payroll.payment_date).toLocaleDateString() : '--'}</td>
                    <td className="px-4 py-3 text-center flex gap-2 justify-center items-center">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details" onClick={() => setViewModal({ emp, payroll })}>
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title={payroll ? 'Edit Payroll' : 'Create Payroll'} onClick={() => openEditModal(emp, payroll)}>
                        {editLoading && editModal?.payroll?.id === payroll?.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Edit className="h-5 w-5" />}
                      </button>
                      {payroll && (
                        <>
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Download Payslip"
                            onClick={() => handleDownloadPayslip(emp.id, payroll.period)}
                          >
                            {actionLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="Delete Payroll"
                            onClick={() => handleDeletePayroll(payroll.id)}
                          >
                            {actionLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* View Details Modal */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full relative border border-blue-200 animate-modal-pop transition-transform duration-300" style={{ animation: 'modalPop 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-transform duration-200 hover:scale-125" onClick={() => setViewModal(null)}>&times;</button>
            <div className="flex items-center mb-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-2xl font-bold text-white shadow animate-avatar-pop">
                {viewModal.emp.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-blue-900 mb-1 animate-fade-in-slow">{viewModal.emp.name}</h2>
                <div className="text-gray-500 text-sm animate-fade-in-slow">{viewModal.emp.position} &middot; {viewModal.emp.department}</div>
                <div className="text-blue-700 text-sm font-semibold animate-fade-in-slow">Salary: {formatRWF(viewModal.emp.salary)}</div>
              </div>
            </div>
            {viewModal.payroll ? (
              <div className="space-y-4 animate-fade-in-slow">
                <div className="flex gap-4">
                  <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Period</div>
                    <div className="text-lg font-bold text-blue-900">{viewModal.payroll.period}</div>
                  </div>
                  <div className="flex-1 bg-green-50 rounded-lg p-4 border border-green-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <div className={`text-lg font-bold ${STATUS_STYLES[viewModal.payroll.status] || 'text-gray-700'}`}>{viewModal.payroll.status}</div>
                  </div>
                  <div className="flex-1 bg-yellow-50 rounded-lg p-4 border border-yellow-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Payment Date</div>
                    <div className="text-lg font-bold text-yellow-900">{viewModal.payroll.payment_date ? new Date(viewModal.payroll.payment_date).toLocaleDateString() : '--'}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-white rounded-lg p-4 border border-gray-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Gross Pay</div>
                    <div className="text-xl font-bold text-blue-700">{formatRWF(viewModal.payroll.gross_pay)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Net Pay</div>
                    <div className="text-xl font-bold text-green-700">{formatRWF(viewModal.payroll.net_pay)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Deductions</div>
                    <div className="text-xl font-bold text-red-700">{formatRWF(viewModal.payroll.deductions)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Bonuses</div>
                    <div className="text-xl font-bold text-green-700">{formatRWF(viewModal.payroll.bonuses)}</div>
                  </div>
                </div>
                {viewModal.payroll.notes && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-100 animate-fade-in-slow">
                    <div className="text-xs text-gray-500 mb-1">Notes</div>
                    <div className="text-gray-700 text-sm">{viewModal.payroll.notes}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-600 text-center font-semibold py-8 animate-fade-in-slow">No payroll record for this period.</div>
            )}
          </div>
        </div>
      )}
      {/* Edit Payroll Modal (functional) */}
      {editModal && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative border border-green-200 animate-modal-pop transition-transform duration-300 max-h-[90vh] overflow-y-auto">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-transform duration-200 hover:scale-125" onClick={() => setEditModal(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-green-800">Edit Payroll</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-wrap">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Employee</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.employee?.name ?? ''} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Position</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.employee?.position ?? ''} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Department</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.employee?.department ?? ''} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Base Salary</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.baseSalary ?? 0} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hourly Rate</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.hourlyRate ?? 0} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Period</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.period ?? ''} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hours Worked</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.hoursWorked ?? 0} onChange={e => handleEditChange('hoursWorked', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Overtime Hours</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.overtimeHours ?? 0} onChange={e => handleEditChange('overtimeHours', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Overtime Rate</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.overtimeRate ?? 0} onChange={e => handleEditChange('overtimeRate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Transport Allowance</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.transportAllowance ?? 0} onChange={e => handleEditChange('transportAllowance', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Housing Allowance</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.housingAllowance ?? 0} onChange={e => handleEditChange('housingAllowance', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Performance Bonus</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.performanceBonus ?? 0} onChange={e => handleEditChange('performanceBonus', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Night Shift Allowance</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.nightShiftAllowance ?? 0} onChange={e => handleEditChange('nightShiftAllowance', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Tax Deduction</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.taxDeduction ?? 0} onChange={e => handleEditChange('taxDeduction', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Insurance Deduction</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.insuranceDeduction ?? 0} onChange={e => handleEditChange('insuranceDeduction', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Loan Deduction</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.loanDeduction ?? 0} onChange={e => handleEditChange('loanDeduction', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Other Deductions</label>
                  <input type="number" className="w-full border rounded px-2 py-1" value={editForm.otherDeductions ?? 0} onChange={e => handleEditChange('otherDeductions', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Gross Pay</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.gross_pay ?? 0} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Net Pay</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.net_pay ?? 0} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Total Deductions</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.deductions ?? 0} readOnly />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Bonuses</label>
                  <input className="w-full border rounded px-2 py-1 bg-gray-100" value={editForm.bonuses ?? 0} readOnly />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Notes</label>
                <textarea className="w-full border rounded px-2 py-1" value={editForm.notes || ''} onChange={e => handleEditChange('notes', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Status</label>
                <select className="w-full border rounded px-2 py-1" value={editForm.status || ''} onChange={e => handleEditChange('status', e.target.value)}>
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              {editSuccess && <div className="text-green-600 text-sm">Payroll updated!</div>}
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => setEditModal(null)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2" disabled={editLoading}>
                  {editLoading && <Loader2 className="h-4 w-4 animate-spin" />} Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll; 