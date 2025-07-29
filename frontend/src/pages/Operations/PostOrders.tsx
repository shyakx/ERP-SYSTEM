import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  FileText,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  Building,
  Shield,
  Target,
  AlertCircle,
  BookOpen,
  ClipboardList
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface PostOrder {
  id: string;
  title: string;
  orderNumber: string;
  siteId: string;
  siteName: string;
  category: 'general' | 'emergency' | 'maintenance' | 'safety' | 'security' | 'operational';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'active' | 'expired' | 'archived' | 'cancelled';
  effectiveDate: string;
  expiryDate?: string;
  assignedGuards: string[];
  guardNames: string[];
  content: string;
  attachments: Attachment[];
  acknowledgments: Acknowledgment[];
  compliance: ComplianceRecord[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface Acknowledgment {
  id: string;
  guardId: string;
  guardName: string;
  acknowledgedAt: string;
  status: 'pending' | 'acknowledged' | 'declined';
  notes: string;
}

interface ComplianceRecord {
  id: string;
  type: 'read' | 'sign' | 'test' | 'training';
  guardId: string;
  guardName: string;
  completedAt?: string;
  status: 'pending' | 'completed' | 'overdue';
  score?: number;
  notes: string;
}

interface Site {
  id: string;
  name: string;
  location: string;
  type: string;
  status: string;
}

interface Guard {
  id: string;
  name: string;
  rank: string;
  status: string;
  siteId: string;
}

const PostOrders: React.FC = () => {
  const { user } = useAuth();
  const [postOrders, setPostOrders] = useState<PostOrder[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PostOrder | null>(null);

  useEffect(() => {
    fetchPostOrderData();
  }, []);

  const fetchPostOrderData = async () => {
    try {
      setLoading(true);
      const [ordersData, sitesData, guardsData] = await Promise.all([
        apiService.get('/api/post-orders'),
        apiService.get('/api/sites'),
        apiService.get('/api/guards')
      ]);
      setPostOrders(ordersData);
      setSites(sitesData);
      setGuards(guardsData);
    } catch (error) {
      console.error('Error fetching post order data:', error);
      toast.error('Failed to fetch post order data');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = postOrders.filter(order =>
    order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.siteName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(order =>
    selectedSite === 'all' || order.siteId === selectedSite
  ).filter(order =>
    selectedCategory === 'all' || order.category === selectedCategory
  ).filter(order =>
    selectedPriority === 'all' || order.priority === selectedPriority
  ).filter(order =>
    selectedStatus === 'all' || order.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'archived': 'bg-purple-100 text-purple-800',
      'cancelled': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'general': 'bg-blue-100 text-blue-800',
      'emergency': 'bg-red-100 text-red-800',
      'maintenance': 'bg-orange-100 text-orange-800',
      'safety': 'bg-yellow-100 text-yellow-800',
      'security': 'bg-purple-100 text-purple-800',
      'operational': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getAcknowledgmentStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'acknowledged': 'bg-green-100 text-green-800',
      'declined': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getComplianceStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateAcknowledgmentRate = (order: PostOrder) => {
    const totalAssigned = (order.assignedGuards || []).length;
    const acknowledged = (order.acknowledgments || []).filter(ack => ack.status === 'acknowledged').length;
    return totalAssigned > 0 ? Math.round((acknowledged / totalAssigned) * 100) : 0;
  };

  const isExpired = (order: PostOrder) => {
    if (!order.expiryDate) return false;
    return new Date(order.expiryDate) < new Date();
  };

  const isExpiringSoon = (order: PostOrder) => {
    if (!order.expiryDate) return false;
    const expiryDate = new Date(order.expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
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
                <FileText className="h-8 w-8 text-blue-600" />
                Post Orders
              </h1>
              <p className="text-gray-600 mt-2">Manage security post orders and compliance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddOrder(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Post Order
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Orders
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{postOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {postOrders.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {postOrders.filter(p => isExpiringSoon(p)).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {postOrders.filter(p => isExpired(p)).length}
                </p>
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
                  placeholder="Search orders, sites, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sites</option>
                {sites.map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="emergency">Emergency</option>
                <option value="maintenance">Maintenance</option>
                <option value="safety">Safety</option>
                <option value="security">Security</option>
                <option value="operational">Operational</option>
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
                <option value="critical">Critical</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="archived">Archived</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Post Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Effective Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Guards
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acknowledgment
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
                    isExpired(order) ? 'bg-red-50' : isExpiringSoon(order) ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.title}</div>
                        <div className="text-sm text-gray-500">#{order.orderNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.siteName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(order.category)}`}>
                          {order.category}
                        </span>
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(order.effectiveDate).toLocaleDateString()}
                        </div>
                        {order.expiryDate && (
                          <div className="text-sm text-gray-500">
                            Expires: {new Date(order.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{(order.guardNames || []).length}</div>
                      <div className="text-xs text-gray-500">
                        {(order.guardNames || []).slice(0, 2).join(', ')}
                        {(order.guardNames || []).length > 2 && ` +${(order.guardNames || []).length - 2}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {calculateAcknowledgmentRate(order)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {(order.acknowledgments || []).filter(ack => ack.status === 'acknowledged').length}/{(order.assignedGuards || []).length}
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
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Post Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Post Order Details</h3>
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
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <p className="text-sm text-gray-900">{selectedOrder.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order Number</label>
                      <p className="text-sm text-gray-900">#{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Site</label>
                      <p className="text-sm text-gray-900">{selectedOrder.siteName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
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
                      <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedOrder.effectiveDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <p className="text-sm text-gray-900">
                        {selectedOrder.expiryDate ? new Date(selectedOrder.expiryDate).toLocaleDateString() : 'No expiry'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedOrder.content}</p>
                    </div>
                  </div>

                  {(selectedOrder.attachments || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                      <div className="space-y-2">
                        {(selectedOrder.attachments || []).map(attachment => (
                          <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{attachment.name}</div>
                                <div className="text-xs text-gray-500">
                                  {formatFileSize(attachment.size)} • {attachment.type}
                                </div>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-900 text-sm">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Guards</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(selectedOrder.guardNames || []).map(guardName => (
                        <div key={guardName} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{guardName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(selectedOrder.acknowledgments || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Acknowledgment Status</label>
                      <div className="space-y-2">
                        {(selectedOrder.acknowledgments || []).map(ack => (
                          <div key={ack.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{ack.guardName}</div>
                              <div className="text-xs text-gray-500">
                                {ack.acknowledgedAt ? new Date(ack.acknowledgedAt).toLocaleString() : 'Pending'}
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAcknowledgmentStatusColor(ack.status)}`}>
                              {ack.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedOrder.compliance || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Records</label>
                      <div className="space-y-2">
                        {(selectedOrder.compliance || []).map(record => (
                          <div key={record.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{record.guardName}</div>
                              <div className="text-xs text-gray-500">{record.type}</div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceStatusColor(record.status)}`}>
                                {record.status}
                              </span>
                              {record.score && (
                                <div className="text-xs text-gray-500 mt-1">Score: {record.score}%</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created By</label>
                      <p className="text-sm text-gray-900">{selectedOrder.createdBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created At</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Order
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Activate Order
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download Order
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

export default PostOrders; 