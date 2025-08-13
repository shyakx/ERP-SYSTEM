import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { useApiList } from '../../../../hooks/useApi';
import { customerAPI } from '../../../../services/api.ts';
import { Loader2, Plus, AlertCircle, CheckCircle, Clock, Users, DollarSign } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  companyName: string;
  type: string;
  category: string;
  currentBalance: number;
  status: string;
  paymentTerms: number;
  contactPerson: string;
  phone: string;
  email: string;
  customerCode: string;
  createdAt: string;
}

const AccountsReceivable: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [receivableStats, setReceivableStats] = useState<any[]>([]);

  // Fetch customers data
  const { items: customers, loading: customersLoading } = useApiList(customerAPI.getAll, { limit: 50 });

  // Calculate statistics from real data
  useEffect(() => {
    if (!customersLoading) {
      const totalReceivables = customers.reduce((sum: number, c: Customer) => sum + parseFloat(c.currentBalance?.toString() || '0'), 0);
      const overdueCustomers = customers.filter((c: Customer) => parseFloat(c.currentBalance?.toString() || '0') > 0);
      const activeCustomers = customers.filter((c: Customer) => c.status === 'active');
      
      // Calculate overdue amount (customers with balances > 0)
      const overdueAmount = overdueCustomers.reduce((sum: number, c: Customer) => sum + parseFloat(c.currentBalance?.toString() || '0'), 0);
      
      // This month's expected (simplified calculation)
      const thisMonthExpected = totalReceivables * 0.4; // 40% of total receivables

      setReceivableStats([
        { 
          title: 'Total Receivables', 
          value: formatCurrency(totalReceivables), 
          subtitle: 'Outstanding', 
          color: 'blue', 
          icon: '💰', 
          trend: { value: '+12.3%', isPositive: true }, 
          delay: 0 
        },
        { 
          title: 'Overdue Invoices', 
          value: formatCurrency(overdueAmount), 
          subtitle: 'Past Due', 
          color: 'red', 
          icon: '⚠️', 
          trend: { value: '-5.8%', isPositive: true }, 
          delay: 100 
        },
        { 
          title: 'This Month', 
          value: formatCurrency(thisMonthExpected), 
          subtitle: 'Expected', 
          color: 'green', 
          icon: '📅', 
          trend: { value: '+18%', isPositive: true }, 
          delay: 200 
        },
        { 
          title: 'Customers', 
          value: activeCustomers.length.toString(), 
          subtitle: 'Active', 
          color: 'purple', 
          icon: '👥', 
          trend: { value: '+8', isPositive: true }, 
          delay: 300 
        }
      ]);
    }
  }, [customers, customersLoading]);

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

  const getCustomerTypeIcon = (type: string) => {
    switch (type) {
      case 'business': return <DollarSign className="w-4 h-4" />;
      case 'individual': return <Users className="w-4 h-4" />;
      case 'government': return <CheckCircle className="w-4 h-4" />;
      case 'non_profit': return <AlertCircle className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredCustomers = selectedCustomer === 'all' 
    ? customers 
    : customers.filter((customer: Customer) => customer.status === selectedCustomer);

  if (customersLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Accounts Receivable</h1>
          <p className="text-gray-600 mt-1">Manage customer invoices and collections</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Invoice</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {receivableStats.map((stat, index) => (
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
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Customers</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="blacklisted">Blacklisted</option>
            </select>
          </div>

      {/* Customers Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Customer Receivables</h3>
        </div>
        <div className="card-body">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
                {filteredCustomers.map((customer: Customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.customerCode}</div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getCustomerTypeIcon(customer.type)}
                        <span className="text-sm text-gray-900 capitalize">{customer.type.replace('_', ' ')}</span>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-orange-600">
                        {formatCurrency(parseFloat(customer.currentBalance.toString()))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.paymentTerms} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {getStatusIcon(customer.status)}
                        <span className="ml-1">{customer.status}</span>
                      </span>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{customer.contactPerson}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {/* Recent Invoices Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {customers
              .filter((c: Customer) => parseFloat(c.currentBalance.toString()) > 0)
              .slice(0, 5)
              .map((customer: Customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">
                        {customer.name.charAt(0).toUpperCase()}
                      </span>
                </div>
                <div>
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.category}</p>
                </div>
              </div>
              <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600">
                      {formatCurrency(parseFloat(customer.currentBalance.toString()))}
                    </p>
                    <p className="text-xs text-gray-500">Outstanding</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Collection Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Collection Performance</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
          <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>On-time Payments</span>
                  <span className="font-medium">75%</span>
                </div>
            <AnimatedProgressBar
                  progress={75}
              color="green"
              height={8}
                  showLabel={false}
            />
          </div>
          <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overdue Payments</span>
                  <span className="font-medium">15%</span>
                </div>
            <AnimatedProgressBar
                  progress={15}
                  color="red"
              height={8}
                  showLabel={false}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Partial Payments</span>
                  <span className="font-medium">10%</span>
                </div>
            <AnimatedProgressBar
                  progress={10}
              color="orange"
              height={8}
                  showLabel={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Customer Distribution</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {['business', 'individual', 'government', 'non_profit'].map((type) => {
                const count = customers.filter((c: Customer) => c.type === type).length;
                const percentage = customers.length > 0 ? Math.round((count / customers.length) * 100) : 0;
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCustomerTypeIcon(type)}
                      <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{count}</span>
                      <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsReceivable;
