import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Building,
  Phone,
  Mail,
  Globe,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Package,
  TrendingUp,
  FileText
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface Supplier {
  id: string;
  name: string;
  code: string;
  type: 'equipment' | 'uniforms' | 'electronics' | 'vehicles' | 'weapons' | 'services' | 'other';
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  rating: number;
  totalOrders: number;
  totalSpent: number;
  averageDeliveryTime: number;
  onTimeDeliveryRate: number;
  qualityRating: number;
  contractStartDate: string;
  contractEndDate?: string;
  paymentTerms: string;
  notes: string;
  certifications: string[];
  specialties: string[];
}

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: PurchaseOrderItem[];
  notes: string;
}

interface PurchaseOrderItem {
  id: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
  status: 'pending' | 'received' | 'partial' | 'cancelled';
}

interface Contract {
  id: string;
  contractNumber: string;
  supplierId: string;
  supplierName: string;
  type: 'purchase' | 'service' | 'maintenance' | 'lease';
  startDate: string;
  endDate: string;
  totalValue: number;
  status: 'active' | 'expired' | 'terminated' | 'pending';
  terms: string;
  autoRenewal: boolean;
  renewalDate?: string;
}

const SupplierManagement: React.FC = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchSupplierData();
  }, []);

  const fetchSupplierData = async () => {
    try {
      setLoading(true);
      const [suppliersData, ordersData, contractsData] = await Promise.all([
        apiService.get('/api/suppliers'),
        apiService.get('/api/purchase-orders'),
        apiService.get('/api/contracts')
      ]);
      setSuppliers(suppliersData);
      setPurchaseOrders(ordersData);
      setContracts(contractsData);
    } catch (error) {
      console.error('Error fetching supplier data:', error);
      toast.error('Failed to fetch supplier data');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(supplier =>
    selectedType === 'all' || supplier.type === selectedType
  ).filter(supplier =>
    selectedStatus === 'all' || supplier.status === selectedStatus
  ).filter(supplier =>
    selectedRating === 'all' || supplier.rating >= parseInt(selectedRating)
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'suspended': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'equipment': 'bg-blue-100 text-blue-800',
      'uniforms': 'bg-green-100 text-green-800',
      'electronics': 'bg-purple-100 text-purple-800',
      'vehicles': 'bg-orange-100 text-orange-800',
      'weapons': 'bg-red-100 text-red-800',
      'services': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalSuppliers = () => suppliers.length;
  const getActiveSuppliers = () => suppliers.filter(s => s.status === 'active').length;
  const getTopRatedSuppliers = () => suppliers.filter(s => s.rating >= 4.5).length;
  const getTotalSpent = () => suppliers.reduce((sum, s) => sum + s.totalSpent, 0);

  const getSupplierOrders = (supplierId: string) => {
    return purchaseOrders.filter(order => order.supplierId === supplierId);
  };

  const getSupplierContracts = (supplierId: string) => {
    return contracts.filter(contract => contract.supplierId === supplierId);
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
                <Building className="h-8 w-8 text-blue-600" />
                Supplier Management
              </h1>
              <p className="text-gray-600 mt-2">Manage suppliers and monitor performance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddSupplier(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Supplier
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
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalSuppliers()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{getActiveSuppliers()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Rated</p>
                <p className="text-2xl font-bold text-gray-900">{getTopRatedSuppliers()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalSpent())}</p>
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
                  placeholder="Search suppliers, contacts, or codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="equipment">Equipment</option>
                <option value="uniforms">Uniforms</option>
                <option value="electronics">Electronics</option>
                <option value="vehicles">Vehicles</option>
                <option value="weapons">Weapons</option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders & Value
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
                {filteredSuppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">#{supplier.code}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(supplier.type)}`}>
                          {supplier.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                        <div className="text-sm text-gray-500">{supplier.email}</div>
                        <div className="text-sm text-gray-500">{supplier.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${getRatingColor(supplier.rating)}`} />
                          <span className="text-sm font-medium text-gray-900">{supplier.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {supplier.onTimeDeliveryRate}% on-time
                        </div>
                        <div className="text-xs text-gray-500">
                          {supplier.averageDeliveryTime} days avg
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{supplier.totalOrders}</div>
                        <div className="text-sm text-gray-500">Orders</div>
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(supplier.totalSpent)}</div>
                        <div className="text-sm text-gray-500">Total Spent</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSupplier(supplier)}
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

        {/* Supplier Detail Modal */}
        {selectedSupplier && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Supplier Details</h3>
                  <button
                    onClick={() => setSelectedSupplier(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Code</label>
                      <p className="text-sm text-gray-900">#{selectedSupplier.code}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedSupplier.type)}`}>
                        {selectedSupplier.type}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSupplier.status)}`}>
                        {selectedSupplier.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.contactPerson}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.website || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <p className="text-sm text-gray-900">
                      {selectedSupplier.address}, {selectedSupplier.city}, {selectedSupplier.state} {selectedSupplier.zipCode}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <div className="flex items-center gap-1">
                        <Star className={`h-5 w-5 ${getRatingColor(selectedSupplier.rating)}`} />
                        <span className="text-sm font-medium text-gray-900">{selectedSupplier.rating}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.totalOrders}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedSupplier.totalSpent)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">On-Time Delivery</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.onTimeDeliveryRate}%</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Avg Delivery Time</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.averageDeliveryTime} days</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quality Rating</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.qualityRating}/5</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contract Start</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedSupplier.contractStartDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contract End</label>
                      <p className="text-sm text-gray-900">
                        {selectedSupplier.contractEndDate ? new Date(selectedSupplier.contractEndDate).toLocaleDateString() : 'No end date'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
                      <p className="text-sm text-gray-900">{selectedSupplier.paymentTerms}</p>
                    </div>
                  </div>

                  {selectedSupplier.certifications.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplier.certifications.map(cert => (
                          <span key={cert} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSupplier.specialties.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplier.specialties.map(specialty => (
                          <span key={specialty} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedSupplier.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Supplier
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      View Orders
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      View Contracts
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

export default SupplierManagement; 