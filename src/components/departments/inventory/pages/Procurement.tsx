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
  FileText
} from 'lucide-react';

const Procurement: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const procurementStats = [
    { title: 'Total Orders', value: '156', subtitle: 'This month', color: 'blue', icon: '📦', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'Pending', value: '23', subtitle: 'Awaiting approval', color: 'orange', icon: '⏳', trend: { value: '-5', isPositive: true }, delay: 100 },
    { title: 'Total Value', value: 'RWF 18.5M', subtitle: 'Order value', color: 'green', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 200 },
    { title: 'Suppliers', value: '28', subtitle: 'Active vendors', color: 'purple', icon: '🏢', trend: { value: '+2', isPositive: true }, delay: 300 }
  ];

  const purchaseOrders = [
    {
      id: 1,
      poNumber: 'PO-2024-001',
      supplier: 'Tech Solutions Ltd',
      items: 'Security Cameras (HD)',
      quantity: 50,
      totalValue: 'RWF 2,550,000',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-25',
      status: 'Approved',
      assignedTo: 'Jean Pierre Uwimana',
      priority: 'High'
    },
    {
      id: 2,
      poNumber: 'PO-2024-002',
      supplier: 'Safety First',
      items: 'Safety Equipment',
      quantity: 100,
      totalValue: 'RWF 2,700,000',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-22',
      status: 'Pending',
      assignedTo: 'Marie Claire Niyonsaba',
      priority: 'Medium'
    },
    {
      id: 3,
      poNumber: 'PO-2024-003',
      supplier: 'CommTech',
      items: 'Walkie Talkies',
      quantity: 25,
      totalValue: 'RWF 1,200,000',
      orderDate: '2024-01-13',
      expectedDelivery: '2024-01-20',
      status: 'In Transit',
      assignedTo: 'Patrick Nshimiyimana',
      priority: 'High'
    },
    {
      id: 4,
      poNumber: 'PO-2024-004',
      supplier: 'Uniform Pro',
      items: 'Guard Uniforms',
      quantity: 75,
      totalValue: 'RWF 1,350,000',
      orderDate: '2024-01-12',
      expectedDelivery: '2024-01-28',
      status: 'Delivered',
      assignedTo: 'Emmanuel Ndayisaba',
      priority: 'Medium'
    },
    {
      id: 5,
      poNumber: 'PO-2024-005',
      supplier: 'Infra Solutions',
      items: 'Security Barriers',
      quantity: 15,
      totalValue: 'RWF 2,265,000',
      orderDate: '2024-01-11',
      expectedDelivery: '2024-01-30',
      status: 'Draft',
      assignedTo: 'Alexis Nkurunziza',
      priority: 'Low'
    }
  ];

  const suppliers = [
    {
      id: 1,
      name: 'Tech Solutions Ltd',
      category: 'Electronics',
      contactPerson: 'John Smith',
      email: 'john@techsolutions.rw',
      phone: '+250 788 123 456',
      rating: 4.8,
      totalOrders: 45,
      totalValue: 'RWF 12.5M',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Safety First',
      category: 'Safety Equipment',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@safetyfirst.rw',
      phone: '+250 789 234 567',
      rating: 4.6,
      totalOrders: 32,
      totalValue: 'RWF 8.2M',
      status: 'Active'
    },
    {
      id: 3,
      name: 'CommTech',
      category: 'Communication',
      contactPerson: 'Michael Brown',
      email: 'michael@commtech.rw',
      phone: '+250 787 345 678',
      rating: 4.4,
      totalOrders: 28,
      totalValue: 'RWF 6.8M',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Uniform Pro',
      category: 'Apparel',
      contactPerson: 'Lisa Davis',
      email: 'lisa@uniformpro.rw',
      phone: '+250 786 456 789',
      rating: 4.7,
      totalOrders: 38,
      totalValue: 'RWF 4.5M',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Infra Solutions',
      category: 'Infrastructure',
      contactPerson: 'David Wilson',
      email: 'david@infrasolutions.rw',
      phone: '+250 785 567 890',
      rating: 4.3,
      totalOrders: 22,
      totalValue: 'RWF 3.2M',
      status: 'Active'
    }
  ];

  const procurementRequests = [
    {
      id: 1,
      requester: 'Jean Pierre Uwimana',
      department: 'Security',
      item: 'Security Cameras (HD)',
      quantity: 50,
      estimatedCost: 'RWF 2,550,000',
      requestDate: '2024-01-15',
      urgency: 'High',
      status: 'Approved',
      justification: 'Replacement of outdated equipment'
    },
    {
      id: 2,
      requester: 'Marie Claire Niyonsaba',
      department: 'Operations',
      item: 'Safety Equipment',
      quantity: 100,
      estimatedCost: 'RWF 2,700,000',
      requestDate: '2024-01-14',
      urgency: 'Medium',
      status: 'Pending',
      justification: 'New safety protocols implementation'
    },
    {
      id: 3,
      requester: 'Patrick Nshimiyimana',
      department: 'Communication',
      item: 'Walkie Talkies',
      quantity: 25,
      estimatedCost: 'RWF 1,200,000',
      requestDate: '2024-01-13',
      urgency: 'High',
      status: 'In Progress',
      justification: 'Communication equipment upgrade'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Procurement Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {procurementStats.map((stat, index) => (
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

      {/* Procurement Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common procurement tasks"
        color="blue"
        icon="🛒"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create PO')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create PO
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Add supplier')}
          >
            <User className="w-4 h-4 mr-2" />
            Add Supplier
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Request approval')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Request Approval
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

      {/* Purchase Orders */}
      <AnimatedCard
        title="Purchase Orders"
        subtitle="Current procurement orders"
        color="orange"
        icon="📋"
        delay={600}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Delivery</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.poNumber}</div>
                    <div className="text-xs text-gray-500">{order.orderDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.supplier}</div>
                    <div className="text-xs text-gray-500">{order.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.totalValue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.expectedDelivery}</div>
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
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Procurement Requests */}
      <AnimatedCard
        title="Procurement Requests"
        subtitle="Pending approval requests"
        color="green"
        icon="📝"
        delay={800}
      >
        <div className="space-y-3">
          {procurementRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{request.item}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyBadge(request.urgency)}`}>
                    {request.urgency}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {request.requester} • {request.department} • Qty: {request.quantity} • {request.estimatedCost}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Justification: {request.justification}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Approve</button>
                <button className="text-red-600 hover:text-red-900 transition-colors duration-200 text-xs">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Suppliers */}
      <AnimatedCard
        title="Active Suppliers"
        subtitle="Vendor management"
        color="purple"
        icon="🏢"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {supplier.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                    <div className="text-xs text-gray-500">{supplier.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{supplier.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supplier.totalOrders}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{supplier.totalValue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(supplier.status)}`}>
                      {supplier.status}
                    </span>
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
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Procurement Metrics */}
      <AnimatedCard
        title="Procurement Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">RWF 18.5M</div>
            <div className="text-sm text-green-600">Total Order Value</div>
            <AnimatedProgressBar progress={85} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-blue-600">Total Orders</div>
            <AnimatedProgressBar progress={78} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">28</div>
            <div className="text-sm text-purple-600">Active Suppliers</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Procurement;
