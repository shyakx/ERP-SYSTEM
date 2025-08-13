import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Inventory Department Pages
import InventoryOverview from './pages/InventoryOverview';
import StockManagement from './pages/StockManagement';
import AssetTracking from './pages/AssetTracking';
import Procurement from './pages/Procurement';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import WarehouseManagement from './pages/WarehouseManagement';
import QualityControl from './pages/QualityControl';
import InventoryAnalytics from './pages/InventoryAnalytics';

const InventoryDashboard: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const location = useLocation();

  const inventoryStats = [
    { title: 'Total Items', value: '1,247', subtitle: 'In Stock', color: 'blue', icon: '📦', trend: { value: '+23', isPositive: true }, delay: 0 },
    { title: 'Low Stock', value: '12', subtitle: 'Items', color: 'orange', icon: '⚠️', trend: { value: '-3', isPositive: true }, delay: 100 },
    { title: 'Out of Stock', value: '3', subtitle: 'Items', color: 'red', icon: '❌', trend: { value: '-1', isPositive: true }, delay: 200 },
    { title: 'Total Value', value: '2.4M RWF', subtitle: 'Inventory', color: 'green', icon: '💰', trend: { value: '+8%', isPositive: true }, delay: 300 }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Security Equipment Received',
      type: 'Inbound',
      quantity: 50,
      location: 'Warehouse A',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Uniforms Shipped',
      type: 'Outbound',
      quantity: 25,
      location: 'Distribution Center',
      date: '2024-02-14'
    },
    {
      id: 3,
      title: 'Equipment Maintenance',
      type: 'Internal',
      quantity: 10,
      location: 'Maintenance Bay',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/inventory', icon: '🏠' },
    { name: 'Overview', path: '/inventory/overview', icon: '📊' },
    { name: 'Stock Management', path: '/inventory/stock', icon: '📦' },
    { name: 'Asset Management', path: '/inventory/assets', icon: '🏢' },
    { name: 'Procurement', path: '/inventory/procurement', icon: '🛒' },
    { name: 'Maintenance', path: '/inventory/maintenance', icon: '🔧' },
    { name: 'Warehouse', path: '/inventory/warehouse', icon: '🏭' },
    { name: 'Quality Control', path: '/inventory/quality', icon: '✅' },
    { name: 'Reports', path: '/inventory/reports', icon: '📈' },
    { name: 'Analytics', path: '/inventory/analytics', icon: '📊' }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Inbound': return 'text-green-600 bg-green-100';
      case 'Outbound': return 'text-blue-600 bg-blue-100';
      case 'Internal': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Inventory Stats */}
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

      {/* Recent Activities */}
      <AnimatedCard
        title="Recent Activities"
        subtitle="Latest inventory movements"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📦</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.location} • Qty: {activity.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                  {activity.type}
                </span>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common inventory tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">📦</span>
            <span className="text-sm font-medium text-gray-700">Add Item</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📋</span>
            <span className="text-sm font-medium text-gray-700">Stock Count</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">🔧</span>
            <span className="text-sm font-medium text-gray-700">Maintenance</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Inventory Overview */}
      <AnimatedCard
        title="Inventory Overview"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Stock Levels</h4>
            <AnimatedProgressBar
              progress={85}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Inventory Value</h4>
            <AnimatedProgressBar
              progress={78}
              color="green"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={65}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/inventory':
        return <DashboardContent />;
      case '/inventory/overview':
        return <InventoryOverview />;
      case '/inventory/stock':
        return <StockManagement />;
      case '/inventory/assets':
        return <AssetTracking />;
      case '/inventory/procurement':
        return <Procurement />;
      case '/inventory/maintenance':
        return <Maintenance />;
      case '/inventory/warehouse':
        return <WarehouseManagement />;
      case '/inventory/quality':
        return <QualityControl />;
      case '/inventory/reports':
        return <Reports />;
      case '/inventory/analytics':
        return <InventoryAnalytics />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Inventory Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default InventoryDashboard;
