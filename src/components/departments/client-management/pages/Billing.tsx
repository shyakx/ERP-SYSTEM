import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  Download,
  Upload,
  Settings,
  BarChart3,
  Target,
  Zap,
  Truck,
  Warehouse,
  Box,
  Tag,
  Minus,
  AlertCircle,
  Shield,
  Wifi,
  Battery,
  Signal,
  ShoppingCart,
  DollarSign,
  FileText,
  Wrench,
  Cog,
  Building,
  PackageCheck,
  CheckSquare,
  XCircle,
  TrendingDown,
  PieChart,
  Users,
  Phone,
  Mail,
  Star,
  Award,
  Database,
  Filter as FilterIcon,
  FileText as FileTextIcon,
  Clock as ClockIcon,
  AlertCircle as AlertCircleIcon,
  MessageSquare,
  Headphones,
  HelpCircle,
  CreditCard,
  Receipt
} from 'lucide-react';

const Billing: React.FC = () => {
  const colorScheme = getColorScheme('client-management');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const billingStats = [
    { title: 'Total Revenue', value: 'RWF 28.5M', subtitle: 'This month', color: 'blue', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 0 },
    { title: 'Outstanding', value: 'RWF 4.2M', subtitle: 'Pending payments', color: 'orange', icon: '⏳', trend: { value: '-0.5M', isPositive: true }, delay: 100 },
    { title: 'Paid Invoices', value: '156', subtitle: 'Successfully paid', color: 'green', icon: '✅', trend: { value: '+12', isPositive: true }, delay: 200 },
    { title: 'Collection Rate', value: '94.2%', subtitle: 'Payment success', color: 'purple', icon: '📊', trend: { value: '+1.8%', isPositive: true }, delay: 300 }
  ];

  const invoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      client: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      amount: 'RWF 4.2M',
      status: 'Paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      services: ['Security Guards', 'CCTV Systems', 'Access Control'],
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      client: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      amount: 'RWF 3.8M',
      status: 'Paid',
      dueDate: '2024-01-20',
      paidDate: '2024-01-18',
      services: ['Security Guards', 'Patrol Services', 'Emergency Response'],
      paymentMethod: 'Mobile Money'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      client: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      amount: 'RWF 2.5M',
      status: 'Pending',
      dueDate: '2024-01-25',
      paidDate: null,
      services: ['Campus Security', 'Access Control', 'Monitoring'],
      paymentMethod: null
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      client: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      amount: 'RWF 3.1M',
      status: 'Overdue',
      dueDate: '2024-01-10',
      paidDate: null,
      services: ['Factory Security', 'CCTV Systems', 'Guard Services'],
      paymentMethod: null
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      client: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      amount: 'RWF 2.8M',
      status: 'Paid',
      dueDate: '2024-01-12',
      paidDate: '2024-01-11',
      services: ['Mall Security', 'Crowd Control', 'Surveillance'],
      paymentMethod: 'Credit Card'
    }
  ];

  const paymentMethods = [
    { method: 'Bank Transfer', count: 45, amount: 'RWF 12.8M', color: 'bg-blue-100 text-blue-800' },
    { method: 'Mobile Money', count: 38, amount: 'RWF 8.5M', color: 'bg-green-100 text-green-800' },
    { method: 'Credit Card', count: 25, amount: 'RWF 4.2M', color: 'bg-purple-100 text-purple-800' },
    { method: 'Cash', count: 18, amount: 'RWF 2.1M', color: 'bg-orange-100 text-orange-800' },
    { method: 'Check', count: 12, amount: 'RWF 1.4M', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {billingStats.map((stat, index) => (
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

      {/* Billing Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common billing tasks"
        color="blue"
        icon="💳"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create invoice')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Send reminder')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Reminder
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Record payment')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Record Payment
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Payment Methods */}
      <AnimatedCard
        title="Payment Methods"
        subtitle="Distribution by payment type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {paymentMethods.map((method, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${method.color}`}>
                {method.method}
              </div>
              <div className="text-2xl font-bold text-gray-900">{method.count}</div>
              <div className="text-xs text-gray-500">{method.amount}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Invoices Table */}
      <AnimatedCard
        title="Invoice Management"
        subtitle="All client invoices"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.client}</div>
                    <div className="text-xs text-gray-500">{invoice.contact}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.amount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.dueDate}</div>
                    {invoice.paidDate && (
                      <div className="text-xs text-gray-500">Paid: {invoice.paidDate}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.paymentMethod || '-'}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {invoice.services.slice(0, 2).join(', ')}
                      {invoice.services.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Receipt className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Billing Metrics */}
      <AnimatedCard
        title="Billing Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-green-600">Collection Rate</div>
            <AnimatedProgressBar progress={94.2} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 28.5M</div>
            <div className="text-sm text-blue-600">Total Revenue</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-purple-600">Paid Invoices</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Billing;
