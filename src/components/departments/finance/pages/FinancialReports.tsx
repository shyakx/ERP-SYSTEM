import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { transactionAPI, accountAPI, budgetAPI } from '../../../../services/api.ts';
import { 
  Loader2, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PieChart,
  FileText,
  Filter,
  RefreshCw
} from 'lucide-react';

interface FinancialReportsProps {}

interface ReportData {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
}

const FinancialReports: React.FC<FinancialReportsProps> = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch data
  const { items: transactions, loading: transactionsLoading } = useApiList(transactionAPI.getAll, { limit: 1000 });
  const { items: accounts, loading: accountsLoading } = useApiList(accountAPI.getAll, { limit: 100 });
  const { items: budgets, loading: budgetsLoading } = useApiList(budgetAPI.getAll, { limit: 100 });

  // Calculate report data
  useEffect(() => {
    if (!transactionsLoading) {
      console.log('Financial Reports - Transactions:', transactions);
      console.log('Financial Reports - Transactions length:', transactions.length);
      const data = generateReportData();
      console.log('Financial Reports - Generated data:', data);
      setReportData(data);
    }
  }, [transactions, selectedPeriod, selectedYear, transactionsLoading]);

  const generateReportData = (): ReportData[] => {
    const periods = selectedPeriod === 'monthly' ? 12 : selectedPeriod === 'quarterly' ? 4 : 1;
    const data: ReportData[] = [];

    for (let i = 0; i < periods; i++) {
      const periodTransactions = filterTransactionsByPeriod(i);
      const revenue = periodTransactions
        .filter((t: any) => t.type === 'income')
        .reduce((sum: number, t: any) => sum + parseFloat(t.amount?.toString() || '0'), 0);
      
      const expenses = periodTransactions
        .filter((t: any) => t.type === 'expense')
        .reduce((sum: number, t: any) => sum + parseFloat(t.amount?.toString() || '0'), 0);
      
      const profit = revenue - expenses;
      const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

      data.push({
        period: getPeriodLabel(i),
        revenue,
        expenses,
        profit,
        profitMargin
      });
    }

    return data;
  };

  const filterTransactionsByPeriod = (periodIndex: number) => {
    const now = new Date();
    const startDate = new Date(selectedYear, selectedPeriod === 'monthly' ? periodIndex : periodIndex * 3, 1);
    const endDate = new Date(selectedYear, selectedPeriod === 'monthly' ? periodIndex + 1 : (periodIndex + 1) * 3, 0);

    return transactions.filter((t: any) => {
      const transactionDate = new Date(t.transactionDate);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  const getPeriodLabel = (index: number): string => {
    if (selectedPeriod === 'monthly') {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthNames[index];
    } else if (selectedPeriod === 'quarterly') {
      return `Q${index + 1}`;
    } else {
      return selectedYear.toString();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a blob with report data
      const reportContent = `
        Financial Report - ${selectedPeriod} ${selectedYear}
        
        Summary:
        Total Revenue: ${formatCurrency(reportData.reduce((sum, d) => sum + d.revenue, 0))}
        Total Expenses: ${formatCurrency(reportData.reduce((sum, d) => sum + d.expenses, 0))}
        Net Profit: ${formatCurrency(reportData.reduce((sum, d) => sum + d.profit, 0))}
        
        Period Breakdown:
        ${reportData.map(d => `${d.period}: Revenue ${formatCurrency(d.revenue)}, Expenses ${formatCurrency(d.expenses)}, Profit ${formatCurrency(d.profit)}`).join('\n')}
      `;
      
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-report-${selectedPeriod}-${selectedYear}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getTotalRevenue = () => reportData.reduce((sum, d) => sum + d.revenue, 0);
  const getTotalExpenses = () => reportData.reduce((sum, d) => sum + d.expenses, 0);
  const getTotalProfit = () => reportData.reduce((sum, d) => sum + d.profit, 0);
  const getAverageProfitMargin = () => {
    const margins = reportData.filter(d => d.revenue > 0).map(d => d.profitMargin);
    return margins.length > 0 ? margins.reduce((sum, m) => sum + m, 0) / margins.length : 0;
  };

  if (transactionsLoading || accountsLoading || budgetsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive financial reports and analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <AnimatedButton
            onClick={() => window.location.reload()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </AnimatedButton>
        <AnimatedButton
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
        </AnimatedButton>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[2022, 2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCard delay={0} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(getTotalRevenue())}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
            </div>
            <div className="text-3xl text-green-600">
              <TrendingUp />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={100} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(getTotalExpenses())}</p>
              <p className="text-sm text-red-600 mt-1">+8.2% from last period</p>
            </div>
            <div className="text-3xl text-red-600">
              <TrendingDown />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={200} className="p-6">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(getTotalProfit())}</p>
              <p className="text-sm text-blue-600 mt-1">+15.3% from last period</p>
            </div>
            <div className="text-3xl text-blue-600">
              <DollarSign />
            </div>
              </div>
        </AnimatedCard>

        <AnimatedCard delay={300} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{getAverageProfitMargin().toFixed(1)}%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% from last period</p>
            </div>
            <div className="text-3xl text-green-600">
              <BarChart3 />
              </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'detailed', label: 'Detailed Analysis', icon: PieChart },
              { id: 'comparison', label: 'Period Comparison', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue vs Expenses Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Revenue vs Expenses</h4>
                  <div className="space-y-3">
                    {reportData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{data.period}</span>
                          <span className="text-gray-600">{formatCurrency(data.revenue)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((data.revenue / getTotalRevenue()) * 100, 100)}%` }}
                          ></div>
              </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Revenue</span>
                          <span>Expenses: {formatCurrency(data.expenses)}</span>
              </div>
            </div>
          ))}
        </div>
                </div>

                {/* Profit Margin Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Profit Margins</h4>
                  <div className="space-y-3">
                    {reportData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{data.period}</span>
                          <span className={`font-medium ${data.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.profitMargin.toFixed(1)}%
                          </span>
                        </div>
                        <AnimatedProgressBar
                          progress={Math.abs(data.profitMargin)}
                          color={data.profitMargin >= 0 ? 'green' : 'red'}
                          height={8}
                          showLabel={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detailed' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expenses
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Margin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                          {formatCurrency(data.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                          {formatCurrency(data.expenses)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                          <span className={data.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(data.profit)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            data.profitMargin >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {data.profitMargin.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Period Comparison</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {reportData.slice(0, 3).map((data, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">{data.period}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(data.revenue)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Expenses:</span>
                        <span className="font-semibold text-red-600">{formatCurrency(data.expenses)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Profit:</span>
                        <span className={`font-semibold ${data.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(data.profit)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span>Margin:</span>
                          <span className={`font-semibold ${data.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.profitMargin.toFixed(1)}%
                </span>
                        </div>
                      </div>
              </div>
            </div>
          ))}
        </div>
        </div>
          )}
          </div>
        </div>
    </div>
  );
};

export default FinancialReports;
