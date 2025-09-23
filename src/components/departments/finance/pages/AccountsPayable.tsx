import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { vendorAPI } from '../../../../services/api.ts';
import { Loader2, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  companyName: string;
  category: string;
  currentBalance: number;
  status: string;
  paymentTerms: number;
  contactPerson: string;
  phone: string;
  email: string;
  vendorCode: string;
}

const AccountsPayable: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [payableStats, setPayableStats] = useState<any[]>([]);

  // Fetch vendors data
  const { items: vendors, loading: vendorsLoading } = useApiList(vendorAPI.getAll, { limit: 50 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!vendorsLoading) {
      const totalPayables = vendors.reduce((sum: number, v: Vendor) => sum + parseFloat(v.currentBalance?.toString() || '0'), 0);
      const overdueVendors = vendors.filter((v: Vendor) => parseFloat(v.currentBalance?.toString() || '0') > 0);
      const activeVendors = vendors.filter((v: Vendor) => v.status === 'active');
      
      // Calculate overdue amount (vendors with balances > 0)
      const overdueAmount = overdueVendors.reduce((sum: number, v: Vendor) => sum + parseFloat(v.currentBalance?.toString() || '0'), 0);
      
      // This month's due (simplified calculation)
      const thisMonthDue = totalPayables * 0.3; // 30% of total payables

      setPayableStats([
        { 
          title: 'Total Payables', 
          value: formatCurrency(totalPayables), 
          subtitle: 'Outstanding', 
          color: 'red', 
          icon: '💸', 
          trend: { value: '+8.5%', isPositive: false }, 
          delay: 0 
        },
        { 
          title: 'Overdue Bills', 
          value: formatCurrency(overdueAmount), 
          subtitle: 'Past Due', 
          color: 'orange', 
          icon: '⚠️', 
          trend: { value: '-2.1%', isPositive: true }, 
          delay: 100 
        },
        { 
          title: 'This Month', 
          value: formatCurrency(thisMonthDue), 
          subtitle: 'Due', 
          color: 'blue', 
          icon: '📅', 
          trend: { value: '+15%', isPositive: false }, 
          delay: 200 
        },
        { 
          title: 'Vendors', 
          value: activeVendors.length.toString(), 
          subtitle: 'Active', 
          color: 'green', 
          icon: '🏢', 
          trend: { value: '+2', isPositive: true }, 
          delay: 300 
        }
      ]);
    }
  }, [vendors, vendorsLoading]);

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
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-yellow-600 bg-yellow-100';
      case 'blacklisted': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <Clock className="w-4 h-4" />;
      case 'suspended': return <AlertCircle className="w-4 h-4" />;
      case 'blacklisted': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredVendors = selectedVendor === 'all' 
    ? vendors 
    : vendors.filter((vendor: Vendor) => vendor.status === selectedVendor);

  if (vendorsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Accounts Payable</h1>
            <p className="text-red-100">Manage vendor payments and outstanding invoices</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-600 mt-1">Manage vendor payments and outstanding bills</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Bill</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payableStats.map((stat, index) => (
          <AnimatedCard key={index} delay={stat.delay} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                    {stat.trend.value}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="text-3xl">{stat.icon}</div>
          </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Vendors</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="blacklisted">Blacklisted</option>
            </select>
          </div>

      {/* Vendors Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Vendor Payables</h3>
        </div>
        <div className="card-body">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outstanding Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Terms
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor: Vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                    <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.vendorCode}</div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-red-600">
                        {formatCurrency(parseFloat(vendor.currentBalance.toString()))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.paymentTerms} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                        {getStatusIcon(vendor.status)}
                        <span className="ml-1">{vendor.status}</span>
                    </span>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{vendor.contactPerson}</div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {/* Recent Bills Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bills</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {vendors
              .filter((v: Vendor) => parseFloat(v.currentBalance.toString()) > 0)
              .slice(0, 5)
              .map((vendor: Vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {vendor.name.charAt(0).toUpperCase()}
                      </span>
                </div>
                <div>
                      <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-xs text-gray-500">{vendor.category}</p>
                </div>
              </div>
              <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">
                      {formatCurrency(parseFloat(vendor.currentBalance.toString()))}
                    </p>
                    <p className="text-xs text-gray-500">Outstanding</p>
              </div>
            </div>
          ))}
        </div>
          </div>
        </div>
    </div>
  );
};

export default AccountsPayable;
