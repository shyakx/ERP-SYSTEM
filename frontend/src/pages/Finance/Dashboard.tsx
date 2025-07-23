import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  AlertTriangle,
  CreditCard,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  UserPlus,
  Banknote
} from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';
import { getFinanceDashboard, FinanceDashboard } from '../../services/finance';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart as RePieChart,
  Cell,
  Legend
} from 'recharts';
import CountUp from 'react-countup';

const COLORS = ['#6366f1', '#10b981', '#f59e42', '#ef4444', '#3b82f6', '#a21caf', '#fbbf24', '#14b8a6', '#eab308', '#f472b6'];

const cardGradients = [
  'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
  'linear-gradient(135deg, #f59e42 0%, #fbbf24 100%)',
  'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  'linear-gradient(135deg, #ef4444 0%, #f472b6 100%)',
  'linear-gradient(135deg, #a21caf 0%, #6366f1 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)',
  'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
];

const FinanceDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<FinanceDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFinanceDashboard();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Use backend data only

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}. Here's your financial overview.</p>
        </div>
        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <span className="text-blue-600 text-lg animate-pulse">Loading dashboard...</span>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center py-12">
            <span className="text-red-600 text-lg">{error}</span>
          </div>
        )}
        {!loading && !error && dashboardData && (
        <>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: cardGradients[0] }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={dashboardData.revenue?.total_revenue || 0} duration={2} separator="," />
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </div>

          {/* Outstanding Amount */}
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: cardGradients[1] }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={dashboardData.revenue?.outstanding_amount || 0} duration={2} separator="," />
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">{dashboardData.revenue?.overdue_invoices || 0} overdue invoices</span>
              </div>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: cardGradients[2] }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={dashboardData.expenses?.total_expenses || 0} duration={2} separator="," />
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">{dashboardData.expenses?.expense_count || 0} expenses this month</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div className="bg-white rounded-lg shadow p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-300" style={{ background: cardGradients[3] }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-gray-900">
                  <CountUp start={0} end={((dashboardData.revenue?.total_paid || 0) - (dashboardData.expenses?.total_expenses || 0))} duration={2} separator="," />
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8.2%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Detailed Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              {Array.isArray(dashboardData.trend) && dashboardData.trend.length > 0 ? (
                <BarChart data={dashboardData.trend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#6366f1" animationDuration={1500} />
                  <Bar dataKey="paid" fill="#10b981" animationDuration={1500} />
                </BarChart>
              ) : (
                <div className="text-center py-8 text-gray-500">No trend data available.</div>
              )}
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-lg shadow p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              {Array.isArray(dashboardData.expense_breakdown_by_category) && dashboardData.expense_breakdown_by_category.length > 0 ? (
                <RePieChart>
                  <Pie
                    data={dashboardData.expense_breakdown_by_category}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#6366f1"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    animationDuration={1500}
                  >
                    {dashboardData.expense_breakdown_by_category.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </RePieChart>
              ) : (
                <div className="text-center py-8 text-gray-500">No expense breakdown data available.</div>
              )}
            </ResponsiveContainer>
          </div>

          {/* Top Clients */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clients</h3>
            <div className="space-y-4">
              {Array.isArray(dashboardData.topClients) && dashboardData.topClients.length > 0 ? (
                dashboardData.topClients.map((client: any, index: number) => (
                  <div key={index} className="flex items-center justify-between hover:bg-blue-50 rounded transition-all duration-200 p-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{client.company_name}</p>
                        <p className="text-xs text-gray-500">{client.invoice_count} invoices</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      <CountUp start={0} end={client.total_amount} duration={2} separator="," />
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No top clients data available.</div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Invoices Table */}
        {Array.isArray(dashboardData.recent_invoices) && dashboardData.recent_invoices.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recent_invoices.map((inv: any, idx: number) => (
                    <tr key={inv.invoice_number} className="hover:bg-blue-50 transition-all">
                      <td className="px-4 py-2 whitespace-nowrap">{inv.invoice_number}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{inv.company_name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{inv.total_amount.toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : inv.status === 'overdue' ? 'bg-red-100 text-red-800 animate-pulse' : inv.status === 'sent' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{inv.status}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{inv.due_date}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Recent Expenses Table */}
        {Array.isArray(dashboardData.recent_expenses) && dashboardData.recent_expenses.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expense #</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recent_expenses.map((exp: any, idx: number) => (
                    <tr key={exp.expense_number} className="hover:bg-green-50 transition-all">
                      <td className="px-4 py-2 whitespace-nowrap">{exp.expense_number}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{exp.category}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{exp.vendor_name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{exp.amount.toLocaleString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${exp.status === 'approved' ? 'bg-green-100 text-green-800' : exp.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : exp.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{exp.status}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{exp.expense_date}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Recent Bank Transactions Table */}
        {Array.isArray(dashboardData.recent_bank_transactions) && dashboardData.recent_bank_transactions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bank Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Txn #</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recent_bank_transactions.map((tx: any, idx: number) => (
                    <tr key={tx.transaction_number || tx.id || idx} className="hover:bg-yellow-50 transition-all">
                      <td className="px-4 py-2 whitespace-nowrap">{tx.transaction_number || tx.id || ''}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{tx.account_name || ''}</td>
                      <td className={`px-4 py-2 whitespace-nowrap ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{tx.amount != null ? tx.amount.toLocaleString() : ''}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tx.transaction_type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{tx.transaction_type || ''}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{tx.transaction_date ? new Date(tx.transaction_date).toLocaleDateString() : ''}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{tx.description || ''}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Top Vendors List */}
        {Array.isArray(dashboardData.top_vendors) && dashboardData.top_vendors.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Vendors</h3>
          <ul className="divide-y divide-gray-200">
            {dashboardData.top_vendors.map((vendor: any, idx: number) => (
                <li key={vendor.vendor_name || idx} className="flex items-center justify-between py-2 hover:bg-purple-50 transition-all">
                  <span className="font-medium text-gray-900">{vendor.vendor_name}</span>
                  <span className="text-sm font-semibold text-purple-700">{vendor.total_spent != null ? vendor.total_spent.toLocaleString() : ''}</span>
                </li>
            ))}
          </ul>
        </div>
        )}

        {/* Bank Accounts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Balances</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(dashboardData.bankAccounts) && dashboardData.bankAccounts.length > 0 ? (
              dashboardData.bankAccounts.map((account: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{account.account_name}</h4>
                    <CreditCard className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    <CountUp start={0} end={account.current_balance} duration={2} separator="," />
                  </p>
                  <p className="text-xs text-gray-500">{account.currency}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No bank account balances available.</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <FileText className="h-5 w-5 text-blue-600 mr-2 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Create Invoice</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <Activity className="h-5 w-5 text-green-600 mr-2 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Record Payment</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
              <PieChart className="h-5 w-5 text-purple-600 mr-2 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
              <span className="text-sm font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>
        </>
        )}
        {!loading && !error && !dashboardData && (
          <div className="flex justify-center items-center py-12">
            <span className="text-gray-500 text-lg">No data available.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceDashboardPage; 