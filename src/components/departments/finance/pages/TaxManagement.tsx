import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { taxRecordAPI, transactionAPI } from '../../../../services/api.ts';
import { Loader2, Plus, AlertCircle, CheckCircle, Clock, FileText, DollarSign, Calendar } from 'lucide-react';

interface TaxRecord {
  id: string;
  taxNumber: string;
  type: string;
  period: string;
  year: number;
  month?: number;
  quarter?: number;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  status: string;
  dueDate: string;
  filedDate?: string;
  paidDate?: string;
  referenceNumber?: string;
  notes?: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  transactionDate: string;
  status: string;
}

const TaxManagement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024');
  const [taxStats, setTaxStats] = useState<any[]>([]);

  // Fetch data from APIs
  const { items: taxRecords, loading: taxRecordsLoading } = useApiList(taxRecordAPI.getAll, { limit: 100 });
  const { items: transactions, loading: transactionsLoading } = useApiList(transactionAPI.getAll, { limit: 1000 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!taxRecordsLoading && !transactionsLoading) {
      const calculateStats = () => {
        const currentYear = parseInt(selectedPeriod);
        const yearTaxRecords = taxRecords.filter((record: TaxRecord) => record.year === currentYear);
        
        const totalTaxLiability = yearTaxRecords.reduce((sum: number, record: TaxRecord) => sum + parseFloat(record.taxAmount.toString()), 0);
        const paidTaxRecords = yearTaxRecords.filter((record: TaxRecord) => record.status === 'paid');
        const totalTaxPaid = paidTaxRecords.reduce((sum: number, record: TaxRecord) => sum + parseFloat(record.taxAmount.toString()), 0);
        const pendingFilings = yearTaxRecords.filter((record: TaxRecord) => record.status === 'draft' || record.status === 'calculated').length;
        
        // Calculate compliance score based on paid vs total
        const complianceScore = totalTaxLiability > 0 ? Math.round((totalTaxPaid / totalTaxLiability) * 100) : 100;

        return [
          { 
            title: 'Total Tax Liability', 
            value: formatCurrency(totalTaxLiability), 
            subtitle: 'This Year', 
            color: 'red', 
            icon: '💰', 
            trend: { value: '+5.2%', isPositive: false }, 
            delay: 0 
          },
          { 
            title: 'Tax Paid', 
            value: formatCurrency(totalTaxPaid), 
            subtitle: 'This Year', 
            color: 'green', 
            icon: '✅', 
            trend: { value: '+12%', isPositive: true }, 
            delay: 100 
          },
          { 
            title: 'Pending Filings', 
            value: pendingFilings.toString(), 
            subtitle: 'Due Soon', 
            color: 'orange', 
            icon: '📋', 
            trend: { value: '-1', isPositive: true }, 
            delay: 200 
          },
          { 
            title: 'Compliance Score', 
            value: `${complianceScore}%`, 
            subtitle: 'Overall', 
            color: 'blue', 
            icon: '📊', 
            trend: { value: '+2%', isPositive: true }, 
            delay: 300 
          }
        ];
      };

      setTaxStats(calculateStats());
    }
  }, [taxRecords, transactions, selectedPeriod, taxRecordsLoading, transactionsLoading]);

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
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'calculated': return 'text-blue-600 bg-blue-100';
      case 'filed': return 'text-purple-600 bg-purple-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'calculated': return <Clock className="w-4 h-4" />;
      case 'filed': return <CheckCircle className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTaxTypeLabel = (type: string) => {
    switch (type) {
      case 'vat': return 'VAT';
      case 'income_tax': return 'Income Tax';
      case 'withholding_tax': return 'Withholding Tax';
      case 'corporate_tax': return 'Corporate Tax';
      case 'property_tax': return 'Property Tax';
      default: return type.replace('_', ' ').toUpperCase();
    }
  };

  const getPeriodLabel = (record: TaxRecord) => {
    if (record.period === 'monthly' && record.month) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${monthNames[record.month - 1]} ${record.year}`;
    } else if (record.period === 'quarterly' && record.quarter) {
      return `Q${record.quarter} ${record.year}`;
    } else {
      return record.year.toString();
    }
  };

  if (taxRecordsLoading || transactionsLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Tax Management</h1>
          <p className="text-gray-600 mt-1">Manage tax calculations, filings, and compliance</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + New Filing
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tax Categories */}
      <AnimatedCard
        title="Tax Categories"
        subtitle="Manage different types of taxes and their calculations"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taxRecords.map((record: TaxRecord) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{getTaxTypeLabel(record.type)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.type.replace('_', ' ').toUpperCase()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(record.taxAmount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.taxRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Calculate
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-green-600 hover:text-green-900"
                    >
                      File
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Filings */}
      <AnimatedCard
        title="Recent Filings"
        subtitle="Latest tax filings and their status"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {taxRecords.map((record: TaxRecord) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">{getStatusIcon(record.status)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{getTaxTypeLabel(record.type)}</p>
                  <p className="text-sm text-gray-500">Period: {getPeriodLabel(record)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(record.taxAmount)}</p>
                <p className="text-sm text-gray-500">Due: {record.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Tax Compliance */}
      <AnimatedCard
        title="Tax Compliance"
        subtitle="Compliance monitoring and reporting"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Calculate Tax</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📋</span>
            <span className="text-sm font-medium text-gray-700">File Returns</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📈</span>
            <span className="text-sm font-medium text-gray-700">Compliance Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">⚙️</span>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Tax Analytics */}
      <AnimatedCard
        title="Tax Analytics"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tax Trends</h4>
            <AnimatedProgressBar
              progress={75}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={60}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Compliance Status</h4>
            <AnimatedProgressBar
              progress={94}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default TaxManagement;
