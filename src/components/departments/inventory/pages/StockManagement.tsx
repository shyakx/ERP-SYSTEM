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
  AlertCircle
} from 'lucide-react';

const StockManagement: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const stockStats = [
    { title: 'Total Stock', value: '2,847', subtitle: 'Items in inventory', color: 'blue', icon: '📦', trend: { value: '+45', isPositive: true }, delay: 0 },
    { title: 'Low Stock', value: '23', subtitle: 'Below threshold', color: 'red', icon: '⚠️', trend: { value: '-5', isPositive: true }, delay: 100 },
    { title: 'Out of Stock', value: '8', subtitle: 'Zero quantity', color: 'orange', icon: '🚨', trend: { value: '-2', isPositive: true }, delay: 200 },
    { title: 'Stock Value', value: 'RWF 45.2M', subtitle: 'Total worth', color: 'green', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 300 }
  ];

  const stockItems = [
    {
      id: 1,
      name: 'Security Cameras (HD)',
      sku: 'CAM-HD-001',
      category: 'Electronics',
      stock: 245,
      minStock: 50,
      maxStock: 500,
      unitPrice: 'RWF 51,000',
      totalValue: 'RWF 12.5M',
      location: 'Kigali Warehouse',
      supplier: 'Tech Solutions Ltd',
      lastUpdated: '2024-01-15',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Guard Uniforms',
      sku: 'UNI-GRD-002',
      category: 'Apparel',
      stock: 180,
      minStock: 100,
      maxStock: 300,
      unitPrice: 'RWF 18,000',
      totalValue: 'RWF 3.2M',
      location: 'Musanze Branch',
      supplier: 'Uniform Pro',
      lastUpdated: '2024-01-14',
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Walkie Talkies',
      sku: 'COM-WT-003',
      category: 'Communication',
      stock: 85,
      minStock: 100,
      maxStock: 200,
      unitPrice: 'RWF 48,000',
      totalValue: 'RWF 4.1M',
      location: 'Huye Warehouse',
      supplier: 'CommTech',
      lastUpdated: '2024-01-13',
      status: 'Low Stock'
    },
    {
      id: 4,
      name: 'Safety Equipment',
      sku: 'SAF-EQ-004',
      category: 'Safety',
      stock: 320,
      minStock: 150,
      maxStock: 400,
      unitPrice: 'RWF 27,000',
      totalValue: 'RWF 8.7M',
      location: 'Kigali Warehouse',
      supplier: 'Safety First',
      lastUpdated: '2024-01-15',
      status: 'In Stock'
    },
    {
      id: 5,
      name: 'Security Barriers',
      sku: 'BAR-SEC-005',
      category: 'Infrastructure',
      stock: 45,
      minStock: 20,
      maxStock: 100,
      unitPrice: 'RWF 151,000',
      totalValue: 'RWF 6.8M',
      location: 'Rubavu Branch',
      supplier: 'Infra Solutions',
      lastUpdated: '2024-01-12',
      status: 'In Stock'
    },
    {
      id: 6,
      name: 'Flashlights',
      sku: 'LGT-FL-006',
      category: 'Equipment',
      stock: 0,
      minStock: 50,
      maxStock: 150,
      unitPrice: 'RWF 12,000',
      totalValue: 'RWF 0',
      location: 'Kigali Warehouse',
      supplier: 'Light Pro',
      lastUpdated: '2024-01-10',
      status: 'Out of Stock'
    }
  ];

  const stockMovements = [
    {
      id: 1,
      type: 'Stock In',
      item: 'Security Cameras (HD)',
      quantity: 50,
      previousStock: 195,
      newStock: 245,
      user: 'Jean Pierre Uwimana',
      timestamp: '2024-01-15 14:30',
      reference: 'PO-2024-001'
    },
    {
      id: 2,
      type: 'Stock Out',
      item: 'Guard Uniforms',
      quantity: 25,
      previousStock: 205,
      newStock: 180,
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 13:45',
      reference: 'SO-2024-002'
    },
    {
      id: 3,
      type: 'Stock In',
      item: 'Safety Equipment',
      quantity: 100,
      previousStock: 220,
      newStock: 320,
      user: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 10:30',
      reference: 'PO-2024-003'
    },
    {
      id: 4,
      type: 'Stock Out',
      item: 'Walkie Talkies',
      quantity: 15,
      previousStock: 100,
      newStock: 85,
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-14 16:20',
      reference: 'SO-2024-004'
    },
    {
      id: 5,
      type: 'Stock In',
      item: 'Security Barriers',
      quantity: 20,
      previousStock: 25,
      newStock: 45,
      user: 'Alexis Nkurunziza',
      timestamp: '2024-01-14 11:15',
      reference: 'PO-2024-005'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-orange-100 text-orange-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Overstocked': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Stock In': return 'bg-green-100 text-green-800';
      case 'Stock Out': return 'bg-red-100 text-red-800';
      case 'Adjustment': return 'bg-blue-100 text-blue-800';
      case 'Transfer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    if (current === 0) return 'Out of Stock';
    if (current <= min) return 'Low Stock';
    if (current >= max) return 'Overstocked';
    return 'In Stock';
  };

  return (
    <div className="space-y-6">
      {/* Stock Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stockStats.map((stat, index) => (
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

      {/* Stock Management Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common stock management tasks"
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
            color="green"
            size="md"
            onClick={() => console.log('Stock in')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Stock In
          </AnimatedButton>
          <AnimatedButton
            color="red"
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

      {/* Stock Items Table */}
      <AnimatedCard
        title="Stock Items"
        subtitle="Current inventory items and their status"
        color="blue"
        icon="📋"
        delay={600}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.supplier}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.sku}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.stock}</div>
                    <div className="text-xs text-gray-500">
                      Min: {item.minStock} • Max: {item.maxStock}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.unitPrice}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.totalValue}</div>
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

      {/* Stock Movements */}
      <AnimatedCard
        title="Recent Stock Movements"
        subtitle="Latest stock transactions"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="space-y-3">
          {stockMovements.map((movement) => (
            <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(movement.type)}`}>
                    {movement.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{movement.item}</span>
                  <span className="text-xs text-gray-500">Qty: {movement.quantity}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {movement.previousStock} → {movement.newStock} • {movement.user} • {movement.timestamp}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Ref: {movement.reference}
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

      {/* Stock Alerts */}
      <AnimatedCard
        title="Stock Alerts"
        subtitle="Items requiring attention"
        color="red"
        icon="🚨"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-800">Low Stock Items</span>
            </div>
            <div className="mt-2 text-sm text-red-700">
              <div>• Walkie Talkies (85 units)</div>
              <div>• Flashlights (0 units)</div>
              <div>• Security Barriers (45 units)</div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Out of Stock</span>
            </div>
            <div className="mt-2 text-sm text-orange-700">
              <div>• Flashlights (0 units)</div>
              <div>• Emergency Kits (0 units)</div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Stock Metrics */}
      <AnimatedCard
        title="Stock Management Metrics"
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

export default StockManagement;
