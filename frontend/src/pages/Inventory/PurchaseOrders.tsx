import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  DollarSign,
  Building,
  Package,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  requesterId: string;
  requesterName: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  totalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  status: 'draft' | 'pending' | 'approved' | 'ordered' | 'shipped' | 'received' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'equipment' | 'uniforms' | 'electronics' | 'vehicles' | 'supplies' | 'services' | 'other';
  items: PurchaseOrderItem[];
  notes: string;
  approvalHistory: ApprovalRecord[];
  attachments: Attachment[];
}

interface PurchaseOrderItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
  status: 'pending' | 'ordered' | 'shipped' | 'received' | 'cancelled';
  notes: string;
}

interface ApprovalRecord {
  id: string;
  approverId: string;
  approverName: string;
  action: 'approved' | 'rejected' | 'pending';
  date: string;
  comments: string;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface Supplier {
  id: string;
  name: string;
  code: string;
  status: string;
}

const PurchaseOrders: React.FC = () => {
  const { user } = useAuth();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    fetchPurchaseOrderData();
  }, []);

  const fetchPurchaseOrderData = async () => {
    try {
      setLoading(true);
      const [ordersData, suppliersData] = await Promise.all([
        apiService.get('/api/purchase-orders'),
        apiService.get('/api/suppliers')
      ]);
      setPurchaseOrders(ordersData);
      setSuppliers(suppliersData);
    } catch (error) {
      console.error('Error fetching purchase order data:', error);
      toast.error('Failed to fetch purchase order data');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = purchaseOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.requesterName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(order =>
    selectedStatus === 'all' || order.status === selectedStatus
  ).filter(order =>
    selectedPriority === 'all' || order.priority === selectedPriority
  ).filter(order =>
    selectedCategory === 'all' || order.category === selectedCategory
  ).filter(order =>
    selectedSupplier === 'all' || order.supplierId === selectedSupplier
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'ordered': 'bg-purple-100 text-purple-800',
      'shipped': 'bg-indigo-100 text-indigo-800',
      'received': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'equipment': 'bg-blue-100 text-blue-800',
      'uniforms': 'bg-green-100 text-green-800',
      'electronics': 'bg-purple-100 text-purple-800',
      'vehicles': 'bg-orange-100 text-orange-800',
      'supplies': 'bg-yellow-100 text-yellow-800',
      'services': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalOrders = () => purchaseOrders.length;
  const getPendingOrders = () => purchaseOrders.filter(o => o.status === 'pending').length;
  const getApprovedOrders = () => purchaseOrders.filter(o => o.status === 'approved').length;
  const getTotalValue = () => purchaseOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const isOverdue = (order: PurchaseOrder) => {
    if (order.status === 'shipped' || order.status === 'received') return false;
    return new Date(order.expectedDelivery) < new Date();
  };

  if (loading) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                Purchase Orders
              </h1>
              <p className="text-gray-600 mt-2">Manage purchase orders and supplier relationships</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewOrder(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Order
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalOrders()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{getPendingOrders()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{getApprovedOrders()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalValue())}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search orders, suppliers, or requesters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="ordered">Ordered</option>
                <option value="shipped">Shipped</option>
                <option value="received">Received</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="equipment">Equipment</option>
                <option value="uniforms">Uniforms</option>
                <option value="electronics">Electronics</option>
                <option value="vehicles">Vehicles</option>
                <option value="supplies">Supplies</option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Suppliers</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Purchase Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier & Requester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount & Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery
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
                {filteredOrders.map(order => (
                  <tr key={order.id} className={`hover:bg-gray-50 ${
                    isOverdue(order) ? 'bg-red-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{order.orderNumber}</div>
                        <div className="text-sm text-gray-500">{order.category}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                          {order.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.supplierName}</div>
                        <div className="text-sm text-gray-500">by {order.requesterName}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(order.totalAmount)}</div>
                        <div className="text-sm text-gray-500">{order.items.length} items</div>
                        <div className="text-xs text-gray-400">
                          {order.items.filter(item => item.status === 'received').length} received
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(order.expectedDelivery).toLocaleDateString()}
                        </div>
                        {order.actualDelivery && (
                          <div className="text-sm text-gray-500">
                            Actual: {new Date(order.actualDelivery).toLocaleDateString()}
                          </div>
                        )}
                        {isOverdue(order) && (
                          <div className="text-xs text-red-600 font-medium">Overdue</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <FileText className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Purchase Order Details</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order Number</label>
                      <p className="text-sm text-gray-900">#{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Supplier</label>
                      <p className="text-sm text-gray-900">{selectedOrder.supplierName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Requester</label>
                      <p className="text-sm text-gray-900">{selectedOrder.requesterName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedOrder.category)}`}>
                        {selectedOrder.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedOrder.priority)}`}>
                        {selectedOrder.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedOrder.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expected Delivery</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedOrder.expectedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedOrder.totalAmount - selectedOrder.taxAmount - selectedOrder.shippingAmount)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tax</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedOrder.taxAmount)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Shipping</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedOrder.shippingAmount)}</p>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedOrder.totalAmount)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
                    <div className="space-y-2">
                      {selectedOrder.items.map(item => (
                        <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{item.itemName}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                            <span>Qty: {item.quantity} | Price: {formatCurrency(item.unitPrice)}</span>
                            <span>Total: {formatCurrency(item.totalPrice)}</span>
                          </div>
                          {item.receivedQuantity !== undefined && (
                            <div className="text-xs text-gray-500 mt-1">
                              Received: {item.receivedQuantity}/{item.quantity}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOrder.approvalHistory.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Approval History</label>
                      <div className="space-y-2">
                        {selectedOrder.approvalHistory.map(approval => (
                          <div key={approval.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{approval.approverName}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                approval.action === 'approved' ? 'bg-green-100 text-green-800' :
                                approval.action === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {approval.action}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{approval.comments}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(approval.date).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Order
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Approve Order
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download PO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  </div>
);
};

export default PurchaseOrders; 