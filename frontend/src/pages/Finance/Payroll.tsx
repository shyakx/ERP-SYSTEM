import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Eye,
  Edit,
  Send,
  Clock,
  TrendingUp,
  FileText,
  Filter,
  Search
} from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';

// Types for backend data
interface PayrollBatch {
  id: number;
  period: string;
  total_employees: number;
  total_gross_pay: number;
  total_net_pay: number;
  total_tax: number;
  total_deductions: number;
  status: string;
  submitted_by: string;
  submitted_at: string;
  approved_by?: string;
  approved_at?: string;
  disbursed_by?: string;
  disbursed_at?: string;
  notes?: string;
}

interface PayrollDetail {
  id: number;
  employee_id: number;
  employee_name: string;
  department: string;
  position: string;
  period: string;
  basic_salary: number;
  hours_worked: number;
  overtime_hours: number;
  overtime_pay: number;
  allowances: number;
  deductions: number;
  gross_pay: number;
  net_pay: number;
  tax_deduction: number;
  status: string;
  payment_method: string;
  notes?: string;
}

const Payroll: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<PayrollBatch | null>(null);
  const [showBatchDetails, setShowBatchDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<string>('all');
  const [payrollBatches, setPayrollBatches] = useState<PayrollBatch[]>([]);
  const [payrollDetails, setPayrollDetails] = useState<PayrollDetail[]>([]);

  // Role-based permissions
  const isFinanceManager = user?.role === 'finance_manager' || user?.role === 'system_admin';
  const isAccountant = user?.role === 'accountant';
  const isBillingOfficer = user?.role === 'billing_officer';
  const canApprovePayroll = isFinanceManager;
  const canViewPayroll = isFinanceManager || isAccountant || isBillingOfficer;
  const canReviewPayroll = isFinanceManager || isAccountant;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch payroll batches and details from backend
      const [batchesRes, detailsRes] = await Promise.all([
        fetch('/api/payroll', { headers: { Authorization: `Bearer demo-token` } }),
        fetch('/api/payroll/advanced-stats', { headers: { Authorization: `Bearer demo-token` } })
      ]);
      if (!batchesRes.ok) throw new Error('Failed to fetch payroll batches');
      const batchesData = await batchesRes.json();
      setPayrollBatches(batchesData);
      // For details, you may need to fetch per batch or use a different endpoint
      // Here, we just set an empty array or you can fetch details for the selected batch when needed
      setPayrollDetails([]);
    } catch (err) {
      setError('Failed to load payroll data');
    } finally {
      setLoading(false);
    }
  };

  const filteredBatches = payrollBatches.filter(batch => {
    const matchesSearch = batch.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.submitted_by.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    const matchesPeriod = periodFilter === 'all' || batch.period === periodFilter;
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disbursed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  const getTotalStats = () => {
    const totalGross = payrollBatches.reduce((sum, batch) => sum + Number(batch.total_gross_pay || 0), 0);
    const totalNet = payrollBatches.reduce((sum, batch) => sum + Number(batch.total_net_pay || 0), 0);
    const totalTax = payrollBatches.reduce((sum, batch) => sum + Number(batch.total_tax || 0), 0);
    const pendingBatches = payrollBatches.filter(batch => batch.status === 'submitted').length;
    return { totalGross, totalNet, totalTax, pendingBatches };
  };

  if (!canViewPayroll) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Access Denied</h3>
                <p className="text-sm text-red-700 mt-1">You don't have permission to view payroll information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
              <p className="text-gray-600 mt-2">
                {isFinanceManager && 'Manage payroll batches, approvals, and disbursements'}
                {isAccountant && 'Review payroll calculations and flag anomalies'}
                {isBillingOfficer && 'View payroll information for billing purposes'}
              </p>
            </div>
            <div className="flex space-x-2">
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
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingBatches}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search payroll batches..."
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
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="disbursed">Disbursed</option>
                </select>
                <select
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Periods</option>
                  {/* You may want to dynamically generate period options from payrollBatches */}
                </select>
              </div>
            </div>
          </div>

          {/* Payroll Batches Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employees
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
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{batch.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{batch.total_employees}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatRWF(batch.total_gross_pay)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatRWF(batch.total_net_pay)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(batch.submitted_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBatch(batch);
                            setShowBatchDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Batch Details Modal */}
        {showBatchDetails && selectedBatch && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Payroll Batch Details - {selectedBatch.period}</h3>
                  <button
                    onClick={() => setShowBatchDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                {/* You may want to fetch and display details for the selected batch here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Batch Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Period:</span> {selectedBatch.period}</div>
                      <div><span className="font-medium">Employees:</span> {selectedBatch.total_employees}</div>
                      <div><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBatch.status)}`}>
                          {selectedBatch.status}
                        </span>
                      </div>
                      <div><span className="font-medium">Submitted by:</span> {selectedBatch.submitted_by}</div>
                      <div><span className="font-medium">Submitted at:</span> {formatDate(selectedBatch.submitted_at)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Financial Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Gross Pay:</span> {formatRWF(selectedBatch.total_gross_pay)}</div>
                      <div><span className="font-medium">Net Pay:</span> {formatRWF(selectedBatch.total_net_pay)}</div>
                      <div><span className="font-medium">Tax Deductions:</span> {formatRWF(selectedBatch.total_tax)}</div>
                      <div><span className="font-medium">Other Deductions:</span> {formatRWF(selectedBatch.total_deductions)}</div>
                    </div>
                  </div>
                </div>

                {/* You may want to fetch and display employee details for the selected batch here */}
                {/* ... */}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBatchDetails(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll; 