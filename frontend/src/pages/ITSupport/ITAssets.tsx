import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  HardDrive,
  Monitor,
  Server,
  Wifi,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  User,
  MapPin,
  Wrench,
  Database,
  Cpu,
  Memory,
  HardDriveIcon
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface ITAsset {
  id: string;
  assetNumber: string;
  name: string;
  type: 'computer' | 'server' | 'network' | 'peripheral' | 'software' | 'other';
  category: 'hardware' | 'software' | 'network_device' | 'mobile_device' | 'accessory';
  brand: string;
  model: string;
  serialNumber: string;
  status: 'active' | 'maintenance' | 'retired' | 'lost' | 'damaged';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  assignedTo?: string;
  location: string;
  department: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  warrantyExpiry?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  specifications: AssetSpecification[];
  maintenanceRecords: MaintenanceRecord[];
  notes: string;
  tags: string[];
}

interface AssetSpecification {
  id: string;
  name: string;
  value: string;
  unit?: string;
}

interface MaintenanceRecord {
  id: string;
  type: 'preventive' | 'repair' | 'upgrade' | 'inspection';
  description: string;
  date: string;
  cost: number;
  performedBy: string;
  nextMaintenance?: string;
  notes?: string;
}

const ITAssets: React.FC = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<ITAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<ITAsset | null>(null);

  useEffect(() => {
    fetchAssetsData();
  }, []);

  const fetchAssetsData = async () => {
    try {
      setLoading(true);
      const assetsData = await apiService.get('/api/it-support/assets');
      setAssets(assetsData);
    } catch (error) {
      console.error('Error fetching assets data:', error);
      toast.error('Failed to fetch assets data');
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(asset =>
    selectedType === 'all' || asset.type === selectedType
  ).filter(asset =>
    selectedStatus === 'all' || asset.status === selectedStatus
  ).filter(asset =>
    selectedCategory === 'all' || asset.category === selectedCategory
  ).filter(asset =>
    selectedLocation === 'all' || asset.location === selectedLocation
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'maintenance': 'bg-yellow-100 text-yellow-800',
      'retired': 'bg-gray-100 text-gray-800',
      'lost': 'bg-red-100 text-red-800',
      'damaged': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'computer': 'bg-blue-100 text-blue-800',
      'server': 'bg-purple-100 text-purple-800',
      'network': 'bg-green-100 text-green-800',
      'peripheral': 'bg-orange-100 text-orange-800',
      'software': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getConditionColor = (condition: string) => {
    const colors: { [key: string]: string } = {
      'excellent': 'bg-green-100 text-green-800',
      'good': 'bg-blue-100 text-blue-800',
      'fair': 'bg-yellow-100 text-yellow-800',
      'poor': 'bg-red-100 text-red-800'
    };
    return colors[condition] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'computer': <Monitor className="h-4 w-4" />,
      'server': <Server className="h-4 w-4" />,
      'network': <Wifi className="h-4 w-4" />,
      'peripheral': <HardDrive className="h-4 w-4" />,
      'software': <Database className="h-4 w-4" />,
      'other': <HardDriveIcon className="h-4 w-4" />
    };
    return icons[type] || <HardDriveIcon className="h-4 w-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalAssets = () => assets.length;
  const getActiveAssets = () => assets.filter(a => a.status === 'active').length;
  const getMaintenanceAssets = () => assets.filter(a => a.status === 'maintenance').length;
  const getTotalValue = () => assets.reduce((sum, a) => sum + a.currentValue, 0);

  const isWarrantyExpired = (asset: ITAsset) => {
    if (!asset.warrantyExpiry) return false;
    return new Date(asset.warrantyExpiry) < new Date();
  };

  const isMaintenanceDue = (asset: ITAsset) => {
    if (!asset.nextMaintenance) return false;
    return new Date(asset.nextMaintenance) < new Date();
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
                <HardDrive className="h-8 w-8 text-blue-600" />
                IT Assets
              </h1>
              <p className="text-gray-600 mt-2">Manage IT assets and track maintenance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddAsset(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Asset
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
                <HardDrive className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalAssets()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Assets</p>
                <p className="text-2xl font-bold text-gray-900">{getActiveAssets()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Wrench className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">{getMaintenanceAssets()}</p>
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
                  placeholder="Search assets by name, number, or serial number..."
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
                <option value="computer">Computer</option>
                <option value="server">Server</option>
                <option value="network">Network</option>
                <option value="peripheral">Peripheral</option>
                <option value="software">Software</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
                <option value="lost">Lost</option>
                <option value="damaged">Damaged</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="network_device">Network Device</option>
                <option value="mobile_device">Mobile Device</option>
                <option value="accessory">Accessory</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {Array.from(new Set(assets.map(asset => asset.location))).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value & Maintenance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map(asset => (
                  <tr key={asset.id} className={`hover:bg-gray-50 ${
                    isWarrantyExpired(asset) || isMaintenanceDue(asset) ? 'bg-red-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            {getTypeIcon(asset.type)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">#{asset.assetNumber}</div>
                          <div className="text-sm text-gray-500">{asset.brand} {asset.model}</div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(asset.type)}`}>
                            {asset.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.location}</div>
                        <div className="text-sm text-gray-500">{asset.department}</div>
                        {asset.assignedTo && (
                          <div className="text-sm text-gray-500">Assigned: {asset.assignedTo}</div>
                        )}
                        <div className="text-sm text-gray-500">SN: {asset.serialNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                            {asset.condition}
                          </span>
                        </div>
                        {isWarrantyExpired(asset) && (
                          <div className="text-xs text-red-600 font-medium">Warranty Expired</div>
                        )}
                        {isMaintenanceDue(asset) && (
                          <div className="text-xs text-orange-600 font-medium">Maintenance Due</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(asset.currentValue)}</div>
                        <div className="text-sm text-gray-500">Purchased: {new Date(asset.purchaseDate).toLocaleDateString()}</div>
                        {asset.warrantyExpiry && (
                          <div className="text-sm text-gray-500">
                            Warranty: {new Date(asset.warrantyExpiry).toLocaleDateString()}
                          </div>
                        )}
                        {asset.nextMaintenance && (
                          <div className="text-sm text-gray-500">
                            Next Maintenance: {new Date(asset.nextMaintenance).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedAsset(asset)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Wrench className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Asset Detail Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Asset Details</h3>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Asset Number</label>
                      <p className="text-sm text-gray-900">#{selectedAsset.assetNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedAsset.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedAsset.type)}`}>
                        {selectedAsset.type}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAsset.status)}`}>
                        {selectedAsset.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Brand</label>
                      <p className="text-sm text-gray-900">{selectedAsset.brand}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Model</label>
                      <p className="text-sm text-gray-900">{selectedAsset.model}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                      <p className="text-sm text-gray-900">{selectedAsset.serialNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Condition</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(selectedAsset.condition)}`}>
                        {selectedAsset.condition}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedAsset.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <p className="text-sm text-gray-900">{selectedAsset.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <p className="text-sm text-gray-900">{selectedAsset.assignedTo || 'Unassigned'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedAsset.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Purchase Cost</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedAsset.purchaseCost)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Value</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedAsset.currentValue)}</p>
                    </div>
                  </div>

                  {selectedAsset.specifications.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedAsset.specifications.map(spec => (
                          <div key={spec.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-gray-900">{spec.name}</div>
                            <div className="text-sm text-gray-600">
                              {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAsset.maintenanceRecords.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Records</label>
                      <div className="space-y-2">
                        {selectedAsset.maintenanceRecords.slice(0, 3).map(record => (
                          <div key={record.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{record.type}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{record.description}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Cost: {formatCurrency(record.cost)}</span>
                              <span>By: {record.performedBy}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAsset.tags.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedAsset.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAsset.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Asset
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Schedule Maintenance
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

export default ITAssets; 