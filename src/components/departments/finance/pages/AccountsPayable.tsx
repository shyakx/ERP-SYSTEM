import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const AccountsPayable: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<string>('all');

  const payableStats = [
    { title: 'Total Payables', value: '45.2M RWF', subtitle: 'Outstanding', color: 'red', icon: '💸', trend: { value: '+8.5%', isPositive: false }, delay: 0 },
    { title: 'Overdue Bills', value: '12.8M RWF', subtitle: 'Past Due', color: 'orange', icon: '⚠️', trend: { value: '-2.1%', isPositive: true }, delay: 100 },
    { title: 'This Month', value: '8.3M RWF', subtitle: 'Due', color: 'blue', icon: '📅', trend: { value: '+15%', isPositive: false }, delay: 200 },
    { title: 'Vendors', value: '24', subtitle: 'Active', color: 'green', icon: '🏢', trend: { value: '+2', isPositive: true }, delay: 300 }
  ];

  const vendors = [
    { id: 1, name: 'Tech Solutions Ltd', total: 8500000, overdue: 1200000, status: 'Active', category: 'IT Services' },
    { id: 2, name: 'Office Supplies Co', total: 3200000, overdue: 450000, status: 'Active', category: 'Supplies' },
    { id: 3, name: 'Security Equipment', total: 15600000, overdue: 0, status: 'Active', category: 'Equipment' },
    { id: 4, name: 'Maintenance Services', total: 4200000, overdue: 800000, status: 'Active', category: 'Services' },
    { id: 5, name: 'Marketing Agency', total: 6800000, overdue: 0, status: 'Active', category: 'Marketing' }
  ];

  const recentBills = [
    {
      id: 1,
      vendor: 'Tech Solutions Ltd',
      amount: 2500000,
      dueDate: '2024-02-28',
      status: 'Pending',
      category: 'Software License',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      vendor: 'Office Supplies Co',
      amount: 850000,
      dueDate: '2024-02-25',
      status: 'Overdue',
      category: 'Office Supplies',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      vendor: 'Security Equipment',
      amount: 4200000,
      dueDate: '2024-03-05',
      status: 'Pending',
      category: 'Security Cameras',
      invoice: 'INV-2024-003'
    },
    {
      id: 4,
      vendor: 'Maintenance Services',
      amount: 1200000,
      dueDate: '2024-02-20',
      status: 'Overdue',
      category: 'Building Maintenance',
      invoice: 'INV-2024-004'
    }
  ];

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
      case 'Pending': return 'text-blue-600 bg-blue-100';
      case 'Overdue': return 'text-red-600 bg-red-100';
      case 'Paid': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredVendors = selectedVendor === 'all' 
    ? vendors 
    : vendors.filter(vendor => vendor.status === selectedVendor);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Payable</h1>
          <p className="text-gray-600 mt-1">Manage vendor payments and outstanding bills</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add New Bill
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {payableStats.map((stat, index) => (
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

      {/* Vendor Management */}
      <AnimatedCard
        title="Vendor Overview"
        subtitle="Manage vendor relationships and outstanding amounts"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Vendors</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Outstanding</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{vendor.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(vendor.total)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      vendor.overdue > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatCurrency(vendor.overdue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => {}}
                      className="text-green-600 hover:text-green-900"
                    >
                      Pay
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Bills */}
      <AnimatedCard
        title="Recent Bills"
        subtitle="Latest outstanding invoices and payments"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">💰</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{bill.vendor}</p>
                  <p className="text-sm text-gray-500">{bill.category} • {bill.invoice}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(bill.amount)}</p>
                <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                  {bill.status}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Process
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Payment Processing */}
      <AnimatedCard
        title="Payment Processing"
        subtitle="Quick payment actions and approvals"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">💳</span>
            <span className="text-sm font-medium text-gray-700">Process Payments</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">✅</span>
            <span className="text-sm font-medium text-gray-700">Approve Bills</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Generate Reports</span>
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

      {/* Payment Analytics */}
      <AnimatedCard
        title="Payment Analytics"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Payment Trends</h4>
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
            <h4 className="font-semibold text-gray-900 mb-3">Vendor Performance</h4>
            <AnimatedProgressBar
              progress={85}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
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

export default AccountsPayable;
