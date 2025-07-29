import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  User,
  Building,
  Wrench,
  Battery,
  Camera,
  Radio,
  Car,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface Equipment {
  id: string;
  name: string;
  type: 'camera' | 'radio' | 'vehicle' | 'weapon' | 'uniform' | 'access_control' | 'alarm' | 'other';
  model: string;
  serialNumber: string;
  location: string;
  assignedTo?: string;
  assignedGuardName?: string;
  status: 'operational' | 'maintenance_required' | 'out_of_service' | 'retired';
  lastCheckDate: string;
  nextCheckDate: string;
  maintenanceHistory: MaintenanceRecord[];
  specifications: EquipmentSpecs;
  notes: string;
}

interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'upgrade' | 'inspection';
  description: string;
  performedBy: string;
  cost: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes: string;
}

interface EquipmentSpecs {
  manufacturer: string;
  year: string;
  warranty: string;
  batteryLife?: number;
  range?: number;
  resolution?: string;
  features: string[];
}

interface Guard {
  id: string;
  name: string;
  rank: string;
  status: string;
  assignedEquipment: string[];
}

const EquipmentCheck: React.FC = () => {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = async () => {
    try {
      setLoading(true);
      const [equipmentData, guardsData] = await Promise.all([
        apiService.get('/api/equipment'),
        apiService.get('/api/guards')
      ]);
      setEquipment(equipmentData);
      setGuards(guardsData);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      toast.error('Failed to fetch equipment data');
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(item =>
    selectedType === 'all' || item.type === selectedType
  ).filter(item =>
    selectedStatus === 'all' || item.status === selectedStatus
  ).filter(item =>
    selectedLocation === 'all' || item.location === selectedLocation
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'operational': 'bg-green-100 text-green-800',
      'maintenance_required': 'bg-yellow-100 text-yellow-800',
      'out_of_service': 'bg-red-100 text-red-800',
      'retired': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'camera': 'bg-blue-100 text-blue-800',
      'radio': 'bg-purple-100 text-purple-800',
      'vehicle': 'bg-green-100 text-green-800',
      'weapon': 'bg-red-100 text-red-800',
      'uniform': 'bg-orange-100 text-orange-800',
      'access_control': 'bg-indigo-100 text-indigo-800',
      'alarm': 'bg-yellow-100 text-yellow-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'camera': <Camera className="h-5 w-5" />,
      'radio': <Radio className="h-5 w-5" />,
      'vehicle': <Car className="h-5 w-5" />,
      'weapon': <Shield className="h-5 w-5" />,
      'uniform': <User className="h-5 w-5" />,
      'access_control': <Building className="h-5 w-5" />,
      'alarm': <AlertTriangle className="h-5 w-5" />,
      'other': <Shield className="h-5 w-5" />
    };
    return icons[type] || <Shield className="h-5 w-5" />;
  };

  const isMaintenanceDue = (nextCheckDate: string) => {
    const nextCheck = new Date(nextCheckDate);
    const today = new Date();
    return nextCheck <= today;
  };

  const isMaintenanceSoon = (nextCheckDate: string) => {
    const nextCheck = new Date(nextCheckDate);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextCheck <= weekFromNow && nextCheck > today;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
                <Shield className="h-8 w-8 text-blue-600" />
                Equipment Check
              </h1>
              <p className="text-gray-600 mt-2">Monitor and manage security equipment status</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddEquipment(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Equipment
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
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Equipment</p>
                <p className="text-2xl font-bold text-gray-900">{equipment.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Operational</p>
                <p className="text-2xl font-bold text-gray-900">
                  {equipment.filter(e => e.status === 'operational').length}
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
                <p className="text-sm font-medium text-gray-600">Maintenance Due</p>
                <p className="text-2xl font-bold text-gray-900">
                  {equipment.filter(e => e.status === 'maintenance_required').length}
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
                <p className="text-sm font-medium text-gray-600">Out of Service</p>
                <p className="text-2xl font-bold text-gray-900">
                  {equipment.filter(e => e.status === 'out_of_service').length}
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
                  placeholder="Search equipment, serial numbers, or models..."
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
                <option value="camera">Camera</option>
                <option value="radio">Radio</option>
                <option value="vehicle">Vehicle</option>
                <option value="weapon">Weapon</option>
                <option value="uniform">Uniform</option>
                <option value="access_control">Access Control</option>
                <option value="alarm">Alarm</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="operational">Operational</option>
                <option value="maintenance_required">Maintenance Required</option>
                <option value="out_of_service">Out of Service</option>
                <option value="retired">Retired</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {Array.from(new Set(equipment.map(e => e.location))).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Check
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Check
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.map(item => (
                  <tr key={item.id} className={`hover:bg-gray-50 ${
                    isMaintenanceDue(item.nextCheckDate) ? 'bg-red-50' : 
                    isMaintenanceSoon(item.nextCheckDate) ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            {getTypeIcon(item.type)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.model}</div>
                          <div className="text-xs text-gray-400">{item.serialNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.assignedGuardName || 'Unassigned'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(item.lastCheckDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        isMaintenanceDue(item.nextCheckDate) ? 'text-red-600 font-medium' :
                        isMaintenanceSoon(item.nextCheckDate) ? 'text-yellow-600 font-medium' :
                        'text-gray-900'
                      }`}>
                        {new Date(item.nextCheckDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedEquipment(item)}
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

        {/* Equipment Detail Modal */}
        {selectedEquipment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Equipment Details</h3>
                  <button
                    onClick={() => setSelectedEquipment(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedEquipment.type)}`}>
                        {selectedEquipment.type}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Model</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.model}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.serialNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedEquipment.status)}`}>
                        {selectedEquipment.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.assignedGuardName || 'Unassigned'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.specifications.manufacturer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Check</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedEquipment.lastCheckDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Next Check</label>
                      <p className={`text-sm ${
                        isMaintenanceDue(selectedEquipment.nextCheckDate) ? 'text-red-600 font-medium' :
                        isMaintenanceSoon(selectedEquipment.nextCheckDate) ? 'text-yellow-600 font-medium' :
                        'text-gray-900'
                      }`}>
                        {new Date(selectedEquipment.nextCheckDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {selectedEquipment.specifications.batteryLife && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Battery Life</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.specifications.batteryLife} hours</p>
                    </div>
                  )}

                  {selectedEquipment.specifications.range && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Range</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.specifications.range} meters</p>
                    </div>
                  )}

                  {selectedEquipment.specifications.resolution && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resolution</label>
                      <p className="text-sm text-gray-900">{selectedEquipment.specifications.resolution}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedEquipment.specifications.features.map(feature => (
                        <span key={feature} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedEquipment.maintenanceHistory.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance History</label>
                      <div className="space-y-2">
                        {selectedEquipment.maintenanceHistory.slice(0, 3).map(record => (
                          <div key={record.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{record.type}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{record.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>By: {record.performedBy}</span>
                              <span>Cost: {formatCurrency(record.cost)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedEquipment.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Equipment
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Schedule Maintenance
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download Report
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

export default EquipmentCheck; 