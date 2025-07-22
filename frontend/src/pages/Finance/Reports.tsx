import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Download,
  Calendar,
  Filter,
  Search,
  AlertTriangle,
  FileText,
  Users,
  CreditCard,
  Activity,
  Eye
} from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';
import CountUp from 'react-countup';

interface FinancialReport {
  id: number;
  report_type: string;
  period: string;
  generated_at: string;
  generated_by: string;
  status: 'generated' | 'exported';
  file_url?: string;
}

interface ReportData {
  revenue: {
    total: number;
    monthly: Array<{ month: string; amount: number }>;
    by_client: Array<{ client: string; amount: number }>;
  };
  expenses: {
    total: number;
    monthly: Array<{ month: string; amount: number }>;
    by_category: Array<{ category: string; amount: number }>;
  };
  payroll: {
    total: number;
    monthly: Array<{ month: string; amount: number }>;
    by_department: Array<{ department: string; amount: number }>;
  };
  profit: {
    total: number;
    monthly: Array<{ month: string; amount: number }>;
  };
  invoices: {
    total: number;
    paid: number;
    outstanding: number;
    overdue: number;
    collection_rate: number;
  };
}

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [reportType, setReportType] = useState<string>('all');
  const [period, setPeriod] = useState<string>('2024-01');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  // Role-based permissions
  const isFinanceManager = user?.role === 'finance_manager' || user?.role === 'system_admin';
  const isAccountant = user?.role === 'accountant';
  const isBillingOfficer = user?.role === 'billing_officer';
  const canViewAllReports = isFinanceManager || isAccountant;
  const canViewBillingReports = isBillingOfficer;

  useEffect(() => {
    if (canViewAllReports || canViewBillingReports) {
      fetchReportsData();
    }
  }, [canViewAllReports, canViewBillingReports]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API calls
      const mockReports: FinancialReport[] = [
        {
          id: 1,
          report_type: 'monthly_financial',
          period: '2024-01',
          generated_at: '2024-01-31T23:59:59Z',
          generated_by: 'Finance Manager',
          status: 'generated'
        },
        {
          id: 2,
          report_type: 'payroll_summary',
          period: '2024-01',
          generated_at: '2024-01-31T23:59:59Z',
          generated_by: 'Accountant',
          status: 'exported',
          file_url: '/reports/payroll-2024-01.pdf'
        },
        {
          id: 3,
          report_type: 'invoice_collection',
          period: '2024-01',
          generated_at: '2024-01-31T23:59:59Z',
          generated_by: 'Billing Officer',
          status: 'generated'
        }
      ];

      const mockReportData: ReportData = {
        revenue: {
          total: 12500000,
          monthly: [
            { month: 'Jan', amount: 8500000 },
            { month: 'Feb', amount: 9200000 },
            { month: 'Mar', amount: 12500000 },
            { month: 'Apr', amount: 11000000 },
            { month: 'May', amount: 13500000 },
            { month: 'Jun', amount: 14000000 }
          ],
          by_client: [
            { client: 'ABC Corporation', amount: 3500000 },
            { client: 'Mall Security LLC', amount: 2800000 },
            { client: 'Industrial Security Inc', amount: 2200000 },
            { client: 'Tech Corp', amount: 1800000 },
            { client: 'Event Security Services', amount: 2200000 }
          ]
        },
        expenses: {
          total: 8500000,
          monthly: [
            { month: 'Jan', amount: 7200000 },
            { month: 'Feb', amount: 7500000 },
            { month: 'Mar', amount: 8500000 },
            { month: 'Apr', amount: 7800000 },
            { month: 'May', amount: 9200000 },
            { month: 'Jun', amount: 9500000 }
          ],
          by_category: [
            { category: 'Payroll', amount: 6000000 },
            { category: 'Office Supplies', amount: 500000 },
            { category: 'Transportation', amount: 800000 },
            { category: 'Equipment', amount: 600000 },
            { category: 'Utilities', amount: 400000 },
            { category: 'Insurance', amount: 200000 }
          ]
        },
        payroll: {
          total: 6000000,
          monthly: [
            { month: 'Jan', amount: 5800000 },
            { month: 'Feb', amount: 5900000 },
            { month: 'Mar', amount: 6000000 },
            { month: 'Apr', amount: 6100000 },
            { month: 'May', amount: 6200000 },
            { month: 'Jun', amount: 6300000 }
          ],
          by_department: [
            { department: 'Security', amount: 3500000 },
            { department: 'HR', amount: 800000 },
            { department: 'Operations', amount: 1200000 },
            { department: 'Finance', amount: 500000 }
          ]
        },
        profit: {
          total: 4000000,
          monthly: [
            { month: 'Jan', amount: 1300000 },
            { month: 'Feb', amount: 1700000 },
            { month: 'Mar', amount: 4000000 },
            { month: 'Apr', amount: 3200000 },
            { month: 'May', amount: 4300000 },
            { month: 'Jun', amount: 4500000 }
          ]
        },
        invoices: {
          total: 15000000,
          paid: 12000000,
          outstanding: 2500000,
          overdue: 500000,
          collection_rate: 80
        }
      };

      setReports(mockReports);
      setReportData(mockReportData);
    } catch (err) {
      setError('Failed to load reports data');
      console.error('Error fetching reports data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = reportType === 'all' || report.report_type === reportType;
    const matchesPeriod = report.period === period;
    
    return matchesType && matchesPeriod;
  });

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly_financial': return 'Monthly Financial Report';
      case 'payroll_summary': return 'Payroll Summary';
      case 'invoice_collection': return 'Invoice Collection Report';
      case 'expense_analysis': return 'Expense Analysis';
      case 'profit_loss': return 'Profit & Loss Statement';
      default: return type;
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

  const handleGenerateReport = async (type: string) => {
    try {
      // API call to generate report
      console.log(`Generating ${type} report for period ${period}`);
    } catch (err) {
      console.error('Error generating report:', err);
    }
  };

  const handleExportReport = async (reportId: number, format: 'pdf' | 'excel') => {
    try {
      // API call to export report
      console.log(`Exporting report ${reportId} as ${format}`);
    } catch (err) {
      console.error('Error exporting report:', err);
    }
  };

  if (!canViewAllReports && !canViewBillingReports) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Access Denied</h3>
                <p className="text-sm text-red-700 mt-1">You don't have permission to view financial reports.</p>
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
              <p className="text-gray-600 mt-2">
                {isFinanceManager && 'Generate and view comprehensive financial reports'}
                {isAccountant && 'Review financial reports and analysis'}
                {isBillingOfficer && 'View invoice collection and billing reports'}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {reportData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 rounded-lg shadow p-6 text-white">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <CountUp
                      start={0}
                      end={reportData.revenue.total}
                      duration={2}
                      separator=","
                      prefix="Rwf "
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-700 via-rose-500 to-rose-400 rounded-lg shadow p-6 text-white">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-full">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <CountUp
                      start={0}
                      end={reportData.expenses.total}
                      duration={2}
                      separator=","
                      prefix="Rwf "
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 rounded-lg shadow p-6 text-white">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Net Profit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <CountUp
                      start={0}
                      end={reportData.profit.total}
                      duration={2}
                      separator=","
                      prefix="Rwf "
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-lg shadow p-6 text-white">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <CountUp
                      start={0}
                      end={reportData.invoices.collection_rate}
                      duration={2}
                      suffix="%"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Generation Controls */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Reports</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Report Types</option>
                {canViewAllReports && (
                  <>
                    <option value="monthly_financial">Monthly Financial Report</option>
                    <option value="payroll_summary">Payroll Summary</option>
                    <option value="expense_analysis">Expense Analysis</option>
                    <option value="profit_loss">Profit & Loss Statement</option>
                  </>
                )}
                {canViewBillingReports && (
                  <option value="invoice_collection">Invoice Collection Report</option>
                )}
              </select>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2024-01">January 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-03">March 2024</option>
                <option value="2024-04">April 2024</option>
                <option value="2024-05">May 2024</option>
                <option value="2024-06">June 2024</option>
              </select>
              <button
                onClick={() => handleGenerateReport(reportType)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Report View</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    viewMode === 'overview'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    viewMode === 'detailed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated At
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
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{getReportTypeLabel(report.report_type)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.generated_by}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(report.generated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'exported' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowReportDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleExportReport(report.id, 'pdf')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Charts (Overview Mode) */}
        {viewMode === 'overview' && reportData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue vs Expenses Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue vs Expenses (6 Months)</h3>
              <div className="space-y-4">
                {reportData.revenue.monthly.map((item, index) => {
                  const expense = reportData.expenses.monthly[index];
                  const profit = item.amount - expense.amount;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{item.month}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          <CountUp
                            start={0}
                            end={item.amount}
                            duration={2}
                            separator=","
                            prefix="Rwf "
                          />
                        </div>
                        <div className="text-sm text-red-600">
                          <CountUp
                            start={0}
                            end={expense.amount}
                            duration={2}
                            separator=","
                            prefix="Rwf "
                          />
                        </div>
                        <div className="text-sm font-bold text-blue-600">
                          <CountUp
                            start={0}
                            end={profit}
                            duration={2}
                            separator=","
                            prefix="Rwf "
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Clients Revenue */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Clients by Revenue</h3>
              <div className="space-y-4">
                {reportData.revenue.by_client.map((client, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{client.client}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      <CountUp
                        start={0}
                        end={client.amount}
                        duration={2}
                        separator=","
                        prefix="Rwf "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Categories */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses by Category</h3>
              <div className="space-y-4">
                {reportData.expenses.by_category.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{category.category}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      <CountUp
                        start={0}
                        end={category.amount}
                        duration={2}
                        separator=","
                        prefix="Rwf "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payroll by Department */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payroll by Department</h3>
              <div className="space-y-4">
                {reportData.payroll.by_department.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{dept.department}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      <CountUp
                        start={0}
                        end={dept.amount}
                        duration={2}
                        separator=","
                        prefix="Rwf "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Report Details Modal */}
        {showReportDetails && selectedReport && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {getReportTypeLabel(selectedReport.report_type)} - {selectedReport.period}
                  </h3>
                  <button
                    onClick={() => setShowReportDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <AlertTriangle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Report Type</label>
                    <p className="text-sm text-gray-900">{getReportTypeLabel(selectedReport.report_type)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Period</label>
                    <p className="text-sm text-gray-900">{selectedReport.period}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated By</label>
                    <p className="text-sm text-gray-900">{selectedReport.generated_by}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedReport.generated_at)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedReport.status === 'exported' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedReport.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowReportDetails(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleExportReport(selectedReport.id, 'pdf')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </button>
                  <button
                    onClick={() => handleExportReport(selectedReport.id, 'excel')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Excel
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

export default Reports; 