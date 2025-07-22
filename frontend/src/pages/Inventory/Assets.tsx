import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Package, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Download,
  Calendar,
  DollarSign,
  MapPin,
  Wrench,
  Car,
  Monitor,
  Shield,
  Users,
  CheckCircle
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import FilterBar, { FilterField } from '../../components/FilterBar';
import CompactTable, { TableColumn } from '../../components/CompactTable';
import Modal from '../../components/Common/Modal';

interface Asset {
  id: string;
  assetNumber: string;
  name: string;
  category: 'vehicle' | 'equipment' | 'uniform' | 'electronics' | 'weapons' | 'other';
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  status: 'active' | 'maintenance' | 'retired' | 'lost' | 'damaged';
  location: string;
  assignedTo?: string;
  assignedDate?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  warrantyExpiry?: string;
  supplier: string;
}

interface MaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  maintenanceType: 'preventive' | 'repair' | 'inspection' | 'upgrade';
  description: string;
  date: string;
  cost: number;
  performedBy: string;
  nextMaintenance?: string;
  notes?: string;
}

// Mock data for development
const mockAssets: Asset[] = [
  {
    id: '1',
    assetNumber: 'AST-2024-001',
    name: 'Security Patrol Vehicle',
    category: 'vehicle',
    type: 'SUV',
    brand: 'Toyota',
    model: 'Highlander',
    serialNumber: 'VIN123456789',
    purchaseDate: '2023-01-15',
    purchaseCost: 45000,
    currentValue: 38000,
    status: 'active',
    location: 'Main Office Garage',
    assignedTo: 'John Smith',
    assignedDate: '2023-02-01',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    condition: 'excellent',
    notes: 'Primary patrol vehicle for downtown area',
    warrantyExpiry: '2026-01-15',
    supplier: 'Toyota Dealership'
  },
  {
    id: '2',
    assetNumber: 'AST-2024-002',
    name: 'Body Camera System',
    category: 'electronics',
    type: 'Body Camera',
    brand: 'Axon',
    model: 'Body 3',
    serialNumber: 'BC789456123',
    purchaseDate: '2023-03-20',
    purchaseCost: 1200,
    currentValue: 900,
    status: 'active',
    location: 'Equipment Room',
    assignedTo: 'Sarah Johnson',
    assignedDate: '2023-04-01',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    condition: 'good',
    notes: 'High-definition recording, night vision',
    warrantyExpiry: '2025-03-20',
    supplier: 'Axon Enterprise'
  },
  {
    id: '3',
    assetNumber: 'AST-2024-003',
    name: 'Security Uniform Set',
    category: 'uniform',
    type: 'Complete Uniform',
    brand: '5.11 Tactical',
    model: 'Classic Series',
    serialNumber: 'UNI456789123',
    purchaseDate: '2023-06-10',
    purchaseCost: 350,
    currentValue: 250,
    status: 'active',
    location: 'Uniform Storage',
    assignedTo: 'Michael Brown',
    assignedDate: '2023-06-15',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-06-05',
    condition: 'good',
    notes: 'Includes shirt, pants, vest, and accessories',
    warrantyExpiry: '2024-06-10',
    supplier: '5.11 Tactical Store'
  },
  {
    id: '4',
    assetNumber: 'AST-2024-004',
    name: 'Metal Detector',
    category: 'equipment',
    type: 'Security Scanner',
    brand: 'Garrett',
    model: 'PD 6500i',
    serialNumber: 'MD789123456',
    purchaseDate: '2023-08-05',
    purchaseCost: 2800,
    currentValue: 2200,
    status: 'maintenance',
    location: 'Mall Security Office',
    assignedTo: 'David Wilson',
    assignedDate: '2023-08-10',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20',
    condition: 'fair',
    notes: 'Requires calibration and battery replacement',
    warrantyExpiry: '2025-08-05',
    supplier: 'Garrett Security'
  },
  {
    id: '5',
    assetNumber: 'AST-2024-005',
    name: 'Two-Way Radio Set',
    category: 'electronics',
    type: 'Communication Device',
    brand: 'Motorola',
    model: 'CP200d',
    serialNumber: 'RAD123789456',
    purchaseDate: '2023-09-12',
    purchaseCost: 800,
    currentValue: 600,
    status: 'active',
    location: 'Communication Center',
    assignedTo: 'Lisa Davis',
    assignedDate: '2023-09-15',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-07-08',
    condition: 'excellent',
    notes: 'Long-range communication, weather resistant',
    warrantyExpiry: '2025-09-12',
    supplier: 'Motorola Solutions'
  },
  {
    id: '6',
    assetNumber: 'AST-2024-006',
    name: 'Security Guard Baton',
    category: 'weapons',
    type: 'Defensive Weapon',
    brand: 'ASP',
    model: 'Tactical Baton',
    serialNumber: 'BAT456123789',
    purchaseDate: '2023-10-20',
    purchaseCost: 150,
    currentValue: 120,
    status: 'active',
    location: 'Weapons Locker',
    assignedTo: 'John Smith',
    assignedDate: '2023-10-25',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-07-12',
    condition: 'excellent',
    notes: 'Expandable tactical baton, certified for use',
    warrantyExpiry: '2024-10-20',
    supplier: 'ASP Tactical'
  }
];

const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    assetId: '1',
    assetName: 'Security Patrol Vehicle',
    maintenanceType: 'preventive',
    description: 'Oil change, tire rotation, brake inspection',
    date: '2024-01-15',
    cost: 150,
    performedBy: 'AutoCare Center',
    nextMaintenance: '2024-04-15',
    notes: 'All systems functioning properly'
  },
  {
    id: '2',
    assetId: '4',
    assetName: 'Metal Detector',
    maintenanceType: 'repair',
    description: 'Calibration adjustment and battery replacement',
    date: '2024-01-20',
    cost: 300,
    performedBy: 'Garrett Service Center',
    nextMaintenance: '2024-02-20',
    notes: 'Sensitivity adjusted, new batteries installed'
  },
  {
    id: '3',
    assetId: '2',
    assetName: 'Body Camera System',
    maintenanceType: 'inspection',
    description: 'Software update and lens cleaning',
    date: '2024-01-10',
    cost: 50,
    performedBy: 'IT Department',
    nextMaintenance: '2024-07-10',
    notes: 'Firmware updated to latest version'
  }
];

const Assets: React.FC = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [activeTab, setActiveTab] = useState<'assets' | 'maintenance' | 'assignments' | 'reports'>('assets');

  const canManageAssets = user?.role === 'system_admin' || user?.role === 'operations_supervisor' || user?.role === 'asset_manager';

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesCondition = conditionFilter === 'all' || asset.condition === conditionFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesCondition;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalAssets = () => {
    return assets.length;
  };

  const getActiveAssets = () => {
    return assets.filter(asset => asset.status === 'active').length;
  };

  const getMaintenanceAssets = () => {
    return assets.filter(asset => asset.status === 'maintenance').length;
  };

  const getTotalValue = () => {
    return assets.reduce((total, asset) => total + asset.currentValue, 0);
  };

  const getUpcomingMaintenance = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return assets.filter(asset => {
      if (!asset.nextMaintenance) return false;
      const nextMaintenance = new Date(asset.nextMaintenance);
      return nextMaintenance <= thirtyDaysFromNow;
    }).length;
  };

  const getAssignedAssets = () => {
    return assets.filter(asset => asset.assignedTo).length;
  };

  const handleDeleteAsset = (assetId: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      setAssets(assets.filter(asset => asset.id !== assetId));
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vehicle': return <Car className="w-5 h-5" />;
      case 'equipment': return <Shield className="w-5 h-5" />;
      case 'electronics': return <Package className="w-5 h-5" />;
      case 'uniform': return <Users className="w-5 h-5" />;
      case 'weapons': return <Shield className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Tracking</h1>
            <p className="text-gray-600 mt-1">Manage security equipment, vehicles, and company assets</p>
          </div>
          {canManageAssets && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Asset</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalAssets()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Assets</p>
              <p className="text-2xl font-bold text-gray-900">{getActiveAssets()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">{getMaintenanceAssets()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalValue())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('assets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assets'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'maintenance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assignments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assignments
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="vehicle">Vehicles</option>
            <option value="equipment">Equipment</option>
            <option value="electronics">Electronics</option>
            <option value="uniform">Uniforms</option>
            <option value="weapons">Weapons</option>
            <option value="other">Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="retired">Retired</option>
            <option value="lost">Lost</option>
            <option value="damaged">Damaged</option>
          </select>

          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Conditions</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'assets' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.assetNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{asset.category}</div>
                      <div className="text-sm text-gray-500">{asset.brand} {asset.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{asset.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{asset.assignedTo || 'Unassigned'}</div>
                      {asset.assignedDate && (
                        <div className="text-sm text-gray-500">{formatDate(asset.assignedDate)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(asset.currentValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(asset.condition)}`}>
                        {asset.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelectedAsset(asset)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {canManageAssets && (
                          <>
                            <button
                              onClick={() => setSelectedAsset(asset)}
                              className="text-yellow-600 hover:text-yellow-900 p-1"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAsset(asset.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredAssets.length} of {assets.length} assets
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.assetName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.maintenanceType === 'preventive' ? 'bg-green-100 text-green-800' :
                        record.maintenanceType === 'repair' ? 'bg-red-100 text-red-800' :
                        record.maintenanceType === 'inspection' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.maintenanceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(record.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.performedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.nextMaintenance ? formatDate(record.nextMaintenance) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.filter(asset => asset.assignedTo).map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.assetNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{asset.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.assignedDate ? formatDate(asset.assignedDate) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Assets</span>
                <span className="font-semibold">{getTotalAssets()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Assets</span>
                <span className="font-semibold text-green-600">{getActiveAssets()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">In Maintenance</span>
                <span className="font-semibold text-yellow-600">{getMaintenanceAssets()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Assigned Assets</span>
                <span className="font-semibold">{getAssignedAssets()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Asset Value</span>
                <span className="font-semibold">{formatCurrency(getTotalValue())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Upcoming Maintenance</span>
                <span className="font-semibold text-yellow-600">{getUpcomingMaintenance()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Asset Value</span>
                <span className="font-semibold">{formatCurrency(getTotalValue() / getTotalAssets())}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        size="xl"
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Asset</h2>
              <p className="text-sm text-gray-500">Register a new asset in the system</p>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter asset name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Number *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter asset number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Select Category</option>
                <option value="vehicle">Vehicle</option>
                <option value="equipment">Equipment</option>
                <option value="electronics">Electronics</option>
                <option value="uniform">Uniform</option>
                <option value="weapons">Weapons</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter asset type"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter model name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter serial number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Cost</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter purchase cost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter current value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter asset location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Select Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter supplier name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Expiry</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter any additional notes"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl">
              Add Asset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Assets; 