import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { useApiList } from '../../../../hooks/useApi.ts';
import { inventoryItemAPI } from '../../../../services/api.ts';
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
  Tag
} from 'lucide-react';

interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitCost: number;
  totalValue: number;
  location: string;
  warehouse: string;
  shelf: string;
  supplier: string;
  supplierCode: string;
  reorderPoint: number;
  reorderQuantity: number;
  leadTime: number;
  status: string;
  condition: string;
  barcode: string;
  specifications: any;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const InventoryOverview: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch inventory data from API
  const { data: inventoryData, loading, error } = useApiList(inventoryItemAPI.getAll);

  // Calculate stats from real data
  const calculateStats = () => {
    if (!inventoryData?.items) return [];

    const items = inventoryData.items as InventoryItem[];
    const totalItems = items.length;
    const lowStock = items.filter(item => item.currentStock <= item.minimumStock).length;
    const totalValue = items.reduce((sum, item) => sum + parseFloat(item.totalValue?.toString() || '0'), 0);
    const categories = new Set(items.map(item => item.category)).size;

    return [
      { 
        title: 'Total Items', 
        value: totalItems.toString(), 
        subtitle: 'In stock', 
        color: 'blue', 
        icon: '📦', 
        trend: { value: '+0', isPositive: true }, 
        delay: 0 
      },
      { 
        title: 'Low Stock', 
        value: lowStock.toString(), 
        subtitle: 'Items below threshold', 
        color: 'red', 
        icon: '⚠️', 
        trend: { value: '-0', isPositive: true }, 
        delay: 100 
      },
      { 
        title: 'Total Value', 
        value: `RWF ${(totalValue / 1000000).toFixed(1)}M`, 
        subtitle: 'Inventory worth', 
        color: 'green', 
        icon: '💰', 
        trend: { value: '+0', isPositive: true }, 
        delay: 200 
      },
      { 
        title: 'Categories', 
        value: categories.toString(), 
        subtitle: 'Product categories', 
        color: 'purple', 
        icon: '🏷️', 
        trend: { value: '+0', isPositive: true }, 
        delay: 300 
      }
    ];
  };

  const inventoryStats = calculateStats();

  const recentActivities = [
    {
      id: 1,
      type: 'Stock In',
      item: 'Security Cameras (HD)',
      quantity: 50,
      location: 'Kigali Warehouse',
      user: 'Jean Pierre Uwimana',
      timestamp: '2024-01-15 14:30',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Stock Out',
      item: 'Guard Uniforms',
      quantity: 25,
      location: 'Musanze Branch',
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 13:45',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Low Stock Alert',
      item: 'Walkie Talkies',
      quantity: 5,
      location: 'Huye Warehouse',
      user: 'System Alert',
      timestamp: '2024-01-15 12:20',
      status: 'Pending'
    },
    {
      id: 4,
      type: 'Maintenance',
      item: 'Security Equipment',
      quantity: 1,
      location: 'Rubavu Branch',
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-15 11:15',
      status: 'In Progress'
    },
    {
      id: 5,
      type: 'Stock In',
      item: 'Safety Equipment',
      quantity: 100,
      location: 'Kigali Warehouse',
      user: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 10:30',
      status: 'Completed'
    }
  ];

  const topItems = [
    {
      name: 'Security Cameras (HD)',
      category: 'Electronics',
      stock: 245,
      value: 'RWF 12.5M',
      location: 'Kigali Warehouse',
      status: 'In Stock'
    },
    {
      name: 'Guard Uniforms',
      category: 'Apparel',
      stock: 180,
      value: 'RWF 3.2M',
      location: 'Musanze Branch',
      status: 'In Stock'
    },
    {
      name: 'Walkie Talkies',
      category: 'Communication',
      stock: 85,
      value: 'RWF 4.1M',
      location: 'Huye Warehouse',
      status: 'Low Stock'
    },
    {
      name: 'Safety Equipment',
      category: 'Safety',
      stock: 320,
      value: 'RWF 8.7M',
      location: 'Kigali Warehouse',
      status: 'In Stock'
    },
    {
      name: 'Security Barriers',
      category: 'Infrastructure',
      stock: 45,
      value: 'RWF 6.8M',
      location: 'Rubavu Branch',
      status: 'In Stock'
    }
  ];

  const categoryDistribution = [
    { category: 'Electronics', count: 450, value: 'RWF 18.2M', color: 'bg-blue-100 text-blue-800' },
    { category: 'Apparel', count: 320, value: 'RWF 5.8M', color: 'bg-green-100 text-green-800' },
    { category: 'Communication', count: 180, value: 'RWF 7.5M', color: 'bg-purple-100 text-purple-800' },
    { category: 'Safety', count: 420, value: 'RWF 9.2M', color: 'bg-orange-100 text-orange-800' },
    { category: 'Infrastructure', count: 95, value: 'RWF 4.5M', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Stock In': return 'bg-green-100 text-green-800';
      case 'Stock Out': return 'bg-red-100 text-red-800';
      case 'Low Stock Alert': return 'bg-orange-100 text-orange-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common inventory management tasks"
        color="orange"
        icon="📦"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Add new item')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </AnimatedButton>
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Stock in')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Stock In
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Stock out')}
          >
            <Download className="w-4 h-4 mr-2" />
            Stock Out
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

      {/* Category Distribution */}
      <AnimatedCard
        title="Category Distribution"
        subtitle="Inventory value by category"
        color="blue"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryDistribution.map((category, index) => (
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

      {/* Recent Activities */}
      <AnimatedCard
        title="Recent Activities"
        subtitle="Latest inventory transactions"
        color="green"
        icon="📋"
        delay={800}
      >
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(activity.type)}`}>
                    {activity.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{activity.item}</span>
                  <span className="text-xs text-gray-500">Qty: {activity.quantity}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {activity.location} • {activity.user} • {activity.timestamp}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(activity.status)}`}>
                  {activity.status}
                </span>
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Items */}
      <AnimatedCard
        title="Top Items by Value"
        subtitle="Highest value inventory items"
        color="purple"
        icon="🏆"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.stock}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status}
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

      {/* Inventory Metrics */}
      <AnimatedCard
        title="Inventory Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-sm text-green-600">Stock Accuracy</div>
            <AnimatedProgressBar progress={98.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3 days</div>
            <div className="text-sm text-blue-600">Avg Turnover</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">RWF 45.2M</div>
            <div className="text-sm text-purple-600">Total Value</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default InventoryOverview;
