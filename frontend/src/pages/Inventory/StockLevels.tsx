import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Package,
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
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface StockItem {
  id: string;
  itemCode: string;
  name: string;
  category: 'uniforms' | 'equipment' | 'electronics' | 'weapons' | 'vehicles' | 'supplies' | 'other';
  description: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  unitCost: number;
  totalValue: number;
  supplier: string;
  lastRestocked: string;
  nextRestockDate?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstocked';
  location: string;
  assignedTo?: string;
  notes: string;
}

interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: 'received' | 'issued' | 'returned' | 'damaged' | 'lost';
  quantity: number;
  previousStock: number;
  newStock: number;
  date: string;
  reason: string;
  performedBy: string;
  reference: string;
}

interface StockAlert {
  id: string;
  itemId: string;
  itemName: string;
  alertType: 'low_stock' | 'out_of_stock' | 'expiring' | 'overstocked';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  date: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

const StockLevels: React.FC = () => {
  const { user } = useAuth();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const [itemsData, movementsData, alertsData] = await Promise.all([
        apiService.get('/api/stock-items'),
        apiService.get('/api/stock-movements'),
        apiService.get('/api/stock-alerts')
      ]);
      setStockItems(itemsData);
      setMovements(movementsData);
      setAlerts(alertsData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      toast.error('Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  ).filter(item =>
    selectedStatus === 'all' || item.status === selectedStatus
  ).filter(item =>
    selectedLocation === 'all' || item.location === selectedLocation
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'in_stock': 'bg-green-100 text-green-800',
      'low_stock': 'bg-yellow-100 text-yellow-800',
      'out_of_stock': 'bg-red-100 text-red-800',
      'overstocked': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'uniforms': 'bg-blue-100 text-blue-800',
      'equipment': 'bg-green-100 text-green-800',
      'electronics': 'bg-purple-100 text-purple-800',
      'weapons': 'bg-red-100 text-red-800',
      'vehicles': 'bg-orange-100 text-orange-800',
      'supplies': 'bg-yellow-100 text-yellow-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getAlertSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateStockPercentage = (item: StockItem) => {
    if (item.maximumStock === 0) return 0;
    return Math.round((item.currentStock / item.maximumStock) * 100);
  };

  const isLowStock = (item: StockItem) => {
    return item.currentStock <= item.reorderPoint;
  };

  const isOutOfStock = (item: StockItem) => {
    return item.currentStock === 0;
  };

  const isOverstocked = (item: StockItem) => {
    return item.currentStock > item.maximumStock;
  };

  const getTotalStockValue = () => {
    return stockItems.reduce((sum, item) => sum + item.totalValue, 0);
  };

  const getLowStockItems = () => {
    return stockItems.filter(item => isLowStock(item));
  };

  const getOutOfStockItems = () => {
    return stockItems.filter(item => isOutOfStock(item));
  };

  const getActiveAlerts = () => {
    return alerts.filter(alert => alert.status === 'active');
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
                <Package className="h-8 w-8 text-blue-600" />
                Stock Levels
              </h1>
              <p className="text-gray-600 mt-2">Monitor inventory levels and manage stock</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddItem(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Stock Item
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
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stockItems.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalStockValue())}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{getLowStockItems().length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{getOutOfStockItems().length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {getActiveAlerts().length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
            <div className="space-y-3">
              {getActiveAlerts().slice(0, 5).map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert.itemName}</div>
                      <div className="text-sm text-gray-600">{alert.message}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAlertSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <button className="text-blue-600 hover:text-blue-900 text-sm">
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search items, codes, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="uniforms">Uniforms</option>
                <option value="equipment">Equipment</option>
                <option value="electronics">Electronics</option>
                <option value="weapons">Weapons</option>
                <option value="vehicles">Vehicles</option>
                <option value="supplies">Supplies</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="overstocked">Overstocked</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {Array.from(new Set(stockItems.map(item => item.location))).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stock Items Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Levels
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
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
                {filteredItems.map(item => (
                  <tr key={item.id} className={`hover:bg-gray-50 ${
                    isOutOfStock(item) ? 'bg-red-50' : isLowStock(item) ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">#{item.itemCode}</div>
                        <div className="text-xs text-gray-400">{item.description}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.currentStock}</div>
                        <div className="text-xs text-gray-500">
                          Min: {item.minimumStock} | Max: {item.maximumStock}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              isOutOfStock(item) ? 'bg-red-500' : 
                              isLowStock(item) ? 'bg-yellow-500' : 
                              isOverstocked(item) ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(calculateStockPercentage(item), 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(item.totalValue)}</div>
                        <div className="text-xs text-gray-500">Unit: {formatCurrency(item.unitCost)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.location}</div>
                      {item.assignedTo && (
                        <div className="text-xs text-gray-500">Assigned: {item.assignedTo}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <BarChart3 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Stock Item Details</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Item Name</label>
                      <p className="text-sm text-gray-900">{selectedItem.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Item Code</label>
                      <p className="text-sm text-gray-900">#{selectedItem.itemCode}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedItem.category)}`}>
                        {selectedItem.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Stock</label>
                      <p className="text-sm text-gray-900">{selectedItem.currentStock}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reorder Point</label>
                      <p className="text-sm text-gray-900">{selectedItem.reorderPoint}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit Cost</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedItem.unitCost)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Value</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedItem.totalValue)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedItem.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Supplier</label>
                      <p className="text-sm text-gray-900">{selectedItem.supplier}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Restocked</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedItem.lastRestocked).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Next Restock</label>
                      <p className="text-sm text-gray-900">
                        {selectedItem.nextRestockDate ? new Date(selectedItem.nextRestockDate).toLocaleDateString() : 'Not scheduled'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedItem.description}</p>
                  </div>

                  {selectedItem.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedItem.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Item
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Restock Item
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      View History
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

export default StockLevels; 