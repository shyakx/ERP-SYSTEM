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
  Signal
} from 'lucide-react';

const AssetTracking: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const assetStats = [
    { title: 'Total Assets', value: '1,247', subtitle: 'Tracked assets', color: 'blue', icon: '📦', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'In Use', value: '1,180', subtitle: 'Active assets', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'Under Maintenance', value: '45', subtitle: 'Being serviced', color: 'orange', icon: '🔧', trend: { value: '-3', isPositive: true }, delay: 200 },
    { title: 'Asset Value', value: 'RWF 28.5M', subtitle: 'Total worth', color: 'purple', icon: '💰', trend: { value: '+1.2M', isPositive: true }, delay: 300 }
  ];

  const assets = [
    {
      id: 1,
      name: 'Security Camera System',
      assetTag: 'CAM-001',
      category: 'Electronics',
      location: 'Kigali Office',
      assignedTo: 'Jean Pierre Uwimana',
      status: 'In Use',
      purchaseDate: '2023-06-15',
      warrantyExpiry: '2025-06-15',
      value: 'RWF 850,000',
      condition: 'Excellent',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10'
    },
    {
      id: 2,
      name: 'Guard Vehicle',
      assetTag: 'VEH-002',
      category: 'Transportation',
      location: 'Musanze Branch',
      assignedTo: 'Marie Claire Niyonsaba',
      status: 'In Use',
      purchaseDate: '2022-12-20',
      warrantyExpiry: '2024-12-20',
      value: 'RWF 12,500,000',
      condition: 'Good',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-03-05'
    },
    {
      id: 3,
      name: 'Walkie Talkie Set',
      assetTag: 'COM-003',
      category: 'Communication',
      location: 'Huye Branch',
      assignedTo: 'Patrick Nshimiyimana',
      status: 'Under Maintenance',
      purchaseDate: '2023-08-10',
      warrantyExpiry: '2025-08-10',
      value: 'RWF 480,000',
      condition: 'Fair',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-01-25'
    },
    {
      id: 4,
      name: 'Security Barrier',
      assetTag: 'BAR-004',
      category: 'Infrastructure',
      location: 'Rubavu Branch',
      assignedTo: 'Emmanuel Ndayisaba',
      status: 'In Use',
      purchaseDate: '2023-03-15',
      warrantyExpiry: '2025-03-15',
      value: 'RWF 1,200,000',
      condition: 'Excellent',
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-04-08'
    },
    {
      id: 5,
      name: 'Safety Equipment Kit',
      assetTag: 'SAF-005',
      category: 'Safety',
      location: 'Kigali Warehouse',
      assignedTo: 'Alexis Nkurunziza',
      status: 'In Use',
      purchaseDate: '2023-09-20',
      warrantyExpiry: '2025-09-20',
      value: 'RWF 320,000',
      condition: 'Good',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: 6,
      name: 'Computer Workstation',
      assetTag: 'IT-006',
      category: 'IT Equipment',
      location: 'Kigali Office',
      assignedTo: 'IT Department',
      status: 'Retired',
      purchaseDate: '2020-05-10',
      warrantyExpiry: '2022-05-10',
      value: 'RWF 450,000',
      condition: 'Poor',
      lastMaintenance: '2023-12-20',
      nextMaintenance: 'N/A'
    }
  ];

  const assetMovements = [
    {
      id: 1,
      type: 'Assignment',
      asset: 'Security Camera System',
      from: 'Warehouse',
      to: 'Kigali Office',
      user: 'Jean Pierre Uwimana',
      timestamp: '2024-01-15 14:30',
      reason: 'New installation'
    },
    {
      id: 2,
      type: 'Maintenance',
      asset: 'Walkie Talkie Set',
      from: 'Huye Branch',
      to: 'Service Center',
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-12 09:15',
      reason: 'Regular maintenance'
    },
    {
      id: 3,
      type: 'Transfer',
      asset: 'Guard Vehicle',
      from: 'Musanze Branch',
      to: 'Rubavu Branch',
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-10 11:45',
      reason: 'Operational needs'
    },
    {
      id: 4,
      type: 'Retirement',
      asset: 'Computer Workstation',
      from: 'Kigali Office',
      to: 'Disposal',
      user: 'IT Department',
      timestamp: '2024-01-08 16:20',
      reason: 'End of life'
    },
    {
      id: 5,
      type: 'Assignment',
      asset: 'Safety Equipment Kit',
      from: 'Warehouse',
      to: 'Kigali Warehouse',
      user: 'Alexis Nkurunziza',
      timestamp: '2024-01-05 13:30',
      reason: 'New assignment'
    }
  ];

  const assetCategories = [
    { category: 'Electronics', count: 320, value: 'RWF 8.5M', color: 'bg-blue-100 text-blue-800' },
    { category: 'Transportation', count: 45, value: 'RWF 12.2M', color: 'bg-green-100 text-green-800' },
    { category: 'Communication', count: 180, value: 'RWF 4.8M', color: 'bg-purple-100 text-purple-800' },
    { category: 'Infrastructure', count: 95, value: 'RWF 2.5M', color: 'bg-orange-100 text-orange-800' },
    { category: 'Safety', count: 420, value: 'RWF 0.5M', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Use': return 'bg-green-100 text-green-800';
      case 'Under Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Retired': return 'bg-red-100 text-red-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Assignment': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      case 'Transfer': return 'bg-purple-100 text-purple-800';
      case 'Retirement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Asset Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assetStats.map((stat, index) => (
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

      {/* Asset Tracking Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common asset tracking tasks"
        color="blue"
        icon="📦"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add new asset')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Assign asset')}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Asset
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Schedule maintenance')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Schedule Maintenance
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

      {/* Asset Categories */}
      <AnimatedCard
        title="Asset Categories"
        subtitle="Distribution of assets by category"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {assetCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">{category.value}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Assets Table */}
      <AnimatedCard
        title="Asset Tracking"
        subtitle="Current assets and their status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Tag</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                    <div className="text-xs text-gray-500">Value: {asset.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.assetTag}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionBadge(asset.condition)}`}>
                      {asset.condition}
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

      {/* Asset Movements */}
      <AnimatedCard
        title="Recent Asset Movements"
        subtitle="Latest asset transactions"
        color="green"
        icon="📊"
        delay={1000}
      >
        <div className="space-y-3">
          {assetMovements.map((movement) => (
            <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(movement.type)}`}>
                    {movement.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{movement.asset}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {movement.from} → {movement.to} • {movement.user} • {movement.timestamp}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Reason: {movement.reason}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Details</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Asset Metrics */}
      <AnimatedCard
        title="Asset Tracking Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.6%</div>
            <div className="text-sm text-green-600">Asset Utilization</div>
            <AnimatedProgressBar progress={94.6} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 28.5M</div>
            <div className="text-sm text-blue-600">Total Asset Value</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-purple-600">Total Assets</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AssetTracking;
