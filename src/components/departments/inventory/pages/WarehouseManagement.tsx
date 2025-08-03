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
  Location,
  PackageCheck
} from 'lucide-react';

const WarehouseManagement: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');

  const warehouseStats = [
    { title: 'Total Warehouses', value: '8', subtitle: 'Active locations', color: 'blue', icon: '🏢', trend: { value: '+1', isPositive: true }, delay: 0 },
    { title: 'Total Capacity', value: '15,420', subtitle: 'Square meters', color: 'green', icon: '📏', trend: { value: '+500', isPositive: true }, delay: 100 },
    { title: 'Utilization Rate', value: '78.5%', subtitle: 'Average occupancy', color: 'orange', icon: '📊', trend: { value: '+2.1%', isPositive: true }, delay: 200 },
    { title: 'Total Value', value: 'RWF 45.2M', subtitle: 'Stored inventory', color: 'purple', icon: '💰', trend: { value: '+1.8M', isPositive: true }, delay: 300 }
  ];

  const warehouses = [
    {
      id: 1,
      name: 'Kigali Main Warehouse',
      location: 'Kigali, Rwanda',
      manager: 'Jean Pierre Uwimana',
      capacity: '5,000 sqm',
      utilization: '85%',
      totalItems: 1,247,
      totalValue: 'RWF 18.5M',
      status: 'Active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Musanze Branch Warehouse',
      location: 'Musanze, Rwanda',
      manager: 'Marie Claire Niyonsaba',
      capacity: '2,500 sqm',
      utilization: '72%',
      totalItems: 685,
      totalValue: 'RWF 8.2M',
      status: 'Active',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Huye Regional Warehouse',
      location: 'Huye, Rwanda',
      manager: 'Patrick Nshimiyimana',
      capacity: '3,200 sqm',
      utilization: '91%',
      totalItems: 892,
      totalValue: 'RWF 12.8M',
      status: 'Active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 4,
      name: 'Rubavu Security Warehouse',
      location: 'Rubavu, Rwanda',
      manager: 'Emmanuel Ndayisaba',
      capacity: '1,800 sqm',
      utilization: '68%',
      totalItems: 456,
      totalValue: 'RWF 5.7M',
      status: 'Active',
      lastUpdated: '2024-01-13'
    },
    {
      id: 5,
      name: 'Kigali Equipment Center',
      location: 'Kigali, Rwanda',
      manager: 'Alexis Nkurunziza',
      capacity: '2,000 sqm',
      utilization: '79%',
      totalItems: 523,
      totalValue: 'RWF 7.1M',
      status: 'Active',
      lastUpdated: '2024-01-12'
    }
  ];

  const warehouseOperations = [
    {
      id: 1,
      warehouse: 'Kigali Main Warehouse',
      operation: 'Stock In',
      items: 'Security Cameras (HD)',
      quantity: 50,
      operator: 'Jean Pierre Uwimana',
      timestamp: '2024-01-15 14:30',
      status: 'Completed'
    },
    {
      id: 2,
      warehouse: 'Musanze Branch Warehouse',
      operation: 'Stock Out',
      items: 'Guard Uniforms',
      quantity: 25,
      operator: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 13:45',
      status: 'Completed'
    },
    {
      id: 3,
      warehouse: 'Huye Regional Warehouse',
      operation: 'Transfer',
      items: 'Safety Equipment',
      quantity: 100,
      operator: 'Patrick Nshimiyimana',
      timestamp: '2024-01-15 12:20',
      status: 'In Progress'
    },
    {
      id: 4,
      warehouse: 'Rubavu Security Warehouse',
      operation: 'Inventory Count',
      items: 'All Items',
      quantity: 456,
      operator: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 11:15',
      status: 'Scheduled'
    },
    {
      id: 5,
      warehouse: 'Kigali Equipment Center',
      operation: 'Maintenance',
      items: 'Security Barriers',
      quantity: 15,
      operator: 'Alexis Nkurunziza',
      timestamp: '2024-01-15 10:30',
      status: 'Completed'
    }
  ];

  const warehouseZones = [
    { zone: 'Electronics', capacity: '1,200 sqm', utilization: '92%', items: 320, value: 'RWF 8.5M' },
    { zone: 'Apparel', capacity: '800 sqm', utilization: '78%', items: 180, value: 'RWF 3.2M' },
    { zone: 'Safety Equipment', capacity: '1,500 sqm', utilization: '85%', items: 420, value: 'RWF 9.2M' },
    { zone: 'Communication', capacity: '600 sqm', utilization: '91%', items: 150, value: 'RWF 4.8M' },
    { zone: 'Infrastructure', capacity: '1,000 sqm', utilization: '65%', items: 95, value: 'RWF 2.5M' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOperationBadge = (operation: string) => {
    switch (operation) {
      case 'Stock In': return 'bg-green-100 text-green-800';
      case 'Stock Out': return 'bg-red-100 text-red-800';
      case 'Transfer': return 'bg-blue-100 text-blue-800';
      case 'Inventory Count': return 'bg-purple-100 text-purple-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Warehouse Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {warehouseStats.map((stat, index) => (
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

      {/* Warehouse Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common warehouse management tasks"
        color="blue"
        icon="🏢"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add warehouse')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Warehouse
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Schedule operation')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Operation
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Inventory count')}
          >
            <PackageCheck className="w-4 h-4 mr-2" />
            Inventory Count
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

      {/* Warehouse Zones */}
      <AnimatedCard
        title="Warehouse Zones"
        subtitle="Storage zones and utilization"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {warehouseZones.map((zone, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 bg-blue-100 text-blue-800`}>
                {zone.zone}
              </div>
              <div className="text-2xl font-bold text-gray-900">{zone.capacity}</div>
              <div className="text-xs text-gray-500">Utilization: {zone.utilization}</div>
              <div className="text-xs text-gray-500">{zone.items} items • {zone.value}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Warehouses Table */}
      <AnimatedCard
        title="Warehouse Management"
        subtitle="All warehouse locations and their status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{warehouse.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{warehouse.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{warehouse.manager}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{warehouse.capacity}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{warehouse.utilization}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{warehouse.totalItems}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{warehouse.totalValue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(warehouse.status)}`}>
                      {warehouse.status}
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

      {/* Warehouse Operations */}
      <AnimatedCard
        title="Recent Warehouse Operations"
        subtitle="Latest warehouse activities"
        color="green"
        icon="📊"
        delay={1000}
      >
        <div className="space-y-3">
          {warehouseOperations.map((operation) => (
            <div key={operation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOperationBadge(operation.operation)}`}>
                    {operation.operation}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{operation.warehouse}</span>
                  <span className="text-xs text-gray-500">Qty: {operation.quantity}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {operation.items} • {operation.operator} • {operation.timestamp}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(operation.status)}`}>
                  {operation.status}
                </span>
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Warehouse Metrics */}
      <AnimatedCard
        title="Warehouse Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">78.5%</div>
            <div className="text-sm text-green-600">Average Utilization</div>
            <AnimatedProgressBar progress={78.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">15,420 sqm</div>
            <div className="text-sm text-blue-600">Total Capacity</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">RWF 45.2M</div>
            <div className="text-sm text-purple-600">Total Stored Value</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default WarehouseManagement; 