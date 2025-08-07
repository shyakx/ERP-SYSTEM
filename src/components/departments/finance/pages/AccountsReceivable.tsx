import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';

const AccountsReceivable: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');

  const receivableStats = [
    { title: 'Total Receivables', value: '89.5M RWF', subtitle: 'Outstanding', color: 'blue', icon: '💰', trend: { value: '+12.3%', isPositive: true }, delay: 0 },
    { title: 'Overdue Invoices', value: '15.2M RWF', subtitle: 'Past Due', color: 'red', icon: '⚠️', trend: { value: '-5.8%', isPositive: true }, delay: 100 },
    { title: 'This Month', value: '23.8M RWF', subtitle: 'Expected', color: 'green', icon: '📅', trend: { value: '+18%', isPositive: true }, delay: 200 },
    { title: 'Customers', value: '156', subtitle: 'Active', color: 'purple', icon: '👥', trend: { value: '+8', isPositive: true }, delay: 300 }
  ];

  const customers = [
    { id: 1, name: 'Kigali Business Center', total: 25000000, overdue: 0, status: 'Active', category: 'Corporate', lastPayment: '2024-02-15' },
    { id: 2, name: 'ABC Corporation', total: 18000000, overdue: 3200000, status: 'Active', category: 'Corporate', lastPayment: '2024-02-10' },
    { id: 3, name: 'Tech Solutions Ltd', total: 32000000, overdue: 0, status: 'Active', category: 'Technology', lastPayment: '2024-02-18' },
    { id: 4, name: 'Security Plus Ltd', total: 15600000, overdue: 850000, status: 'Active', category: 'Security', lastPayment: '2024-02-12' },
    { id: 5, name: 'Office Management Co', total: 8900000, overdue: 0, status: 'Active', category: 'Services', lastPayment: '2024-02-20' }
  ];

  const recentInvoices = [
    {
      id: 1,
      customer: 'Kigali Business Center',
      amount: 8500000,
      dueDate: '2024-03-15',
      status: 'Pending',
      category: 'Security Services',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      customer: 'ABC Corporation',
      amount: 12000000,
      dueDate: '2024-02-28',
      status: 'Overdue',
      category: 'Consulting Services',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      customer: 'Tech Solutions Ltd',
      amount: 15600000,
      dueDate: '2024-03-10',
      status: 'Pending',
      category: 'IT Services',
      invoice: 'INV-2024-003'
    },
    {
      id: 4,
      customer: 'Security Plus Ltd',
      amount: 6800000,
      dueDate: '2024-02-25',
      status: 'Overdue',
      category: 'Equipment Rental',
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
      case 'Partial': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredCustomers = selectedCustomer === 'all' 
    ? customers 
    : customers.filter(customer => customer.status === selectedCustomer);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounts Receivable</h1>
          <p className="text-gray-600 mt-1">Manage customer invoices and collections</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Create Invoice
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {receivableStats.map((stat, index) => (
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

      {/* Customer Management */}
      <AnimatedCard
        title="Customer Overview"
        subtitle="Manage customer relationships and outstanding amounts"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Customers</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Outstanding</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(customer.total)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      customer.overdue > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatCurrency(customer.overdue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.lastPayment}</div>
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
                      Collect
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Invoices */}
      <AnimatedCard
        title="Recent Invoices"
        subtitle="Latest customer invoices and payments"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">📄</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{invoice.customer}</p>
                  <p className="text-sm text-gray-500">{invoice.category} • {invoice.invoice}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
                <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
                <AnimatedButton
                  onClick={() => {}}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Send
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Collection Management */}
      <AnimatedCard
        title="Collection Management"
        subtitle="Quick collection actions and reminders"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📧</span>
            <span className="text-sm font-medium text-gray-700">Send Reminders</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">💳</span>
            <span className="text-sm font-medium text-gray-700">Process Payments</span>
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

      {/* Collection Analytics */}
      <AnimatedCard
        title="Collection Analytics"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Collection Trends</h4>
            <AnimatedProgressBar
              progress={78}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={65}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Customer Performance</h4>
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

export default AccountsReceivable;
