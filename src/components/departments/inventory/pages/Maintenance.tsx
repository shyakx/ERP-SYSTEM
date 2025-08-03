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
  Tool,
  Cog
} from 'lucide-react';

const Maintenance: React.FC = () => {
  const colorScheme = getColorScheme('inventory');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const maintenanceStats = [
    { title: 'Total Assets', value: '1,247', subtitle: 'Under maintenance', color: 'blue', icon: '🔧', trend: { value: '+8', isPositive: true }, delay: 0 },
    { title: 'Scheduled', value: '45', subtitle: 'Planned maintenance', color: 'green', icon: '📅', trend: { value: '+3', isPositive: true }, delay: 100 },
    { title: 'In Progress', value: '12', subtitle: 'Currently being serviced', color: 'orange', icon: '⏳', trend: { value: '-2', isPositive: true }, delay: 200 },
    { title: 'Completed', value: '1,190', subtitle: 'This month', color: 'purple', icon: '✅', trend: { value: '+15', isPositive: true }, delay: 300 }
  ];

  const maintenanceTasks = [
    {
      id: 1,
      assetName: 'Security Camera System',
      assetTag: 'CAM-001',
      type: 'Preventive',
      priority: 'High',
      assignedTo: 'Jean Pierre Uwimana',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      status: 'In Progress',
      description: 'Regular cleaning and software update',
      cost: 'RWF 85,000',
      location: 'Kigali Office'
    },
    {
      id: 2,
      assetName: 'Guard Vehicle',
      assetTag: 'VEH-002',
      type: 'Preventive',
      priority: 'Medium',
      assignedTo: 'Marie Claire Niyonsaba',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'Scheduled',
      description: 'Oil change and brake inspection',
      cost: 'RWF 120,000',
      location: 'Musanze Branch'
    },
    {
      id: 3,
      assetName: 'Walkie Talkie Set',
      assetTag: 'COM-003',
      type: 'Corrective',
      priority: 'High',
      assignedTo: 'Patrick Nshimiyimana',
      startDate: '2024-01-12',
      endDate: '2024-01-25',
      status: 'In Progress',
      description: 'Battery replacement and signal calibration',
      cost: 'RWF 45,000',
      location: 'Huye Branch'
    },
    {
      id: 4,
      assetName: 'Security Barrier',
      assetTag: 'BAR-004',
      type: 'Preventive',
      priority: 'Low',
      assignedTo: 'Emmanuel Ndayisaba',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      status: 'Scheduled',
      description: 'Lubrication and sensor testing',
      cost: 'RWF 35,000',
      location: 'Rubavu Branch'
    },
    {
      id: 5,
      assetName: 'Safety Equipment Kit',
      assetTag: 'SAF-005',
      type: 'Preventive',
      priority: 'Medium',
      assignedTo: 'Alexis Nkurunziza',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      status: 'Completed',
      description: 'Inspection and minor repairs',
      cost: 'RWF 25,000',
      location: 'Kigali Warehouse'
    }
  ];

  const maintenanceHistory = [
    {
      id: 1,
      assetName: 'Security Camera System',
      type: 'Preventive',
      completedBy: 'Jean Pierre Uwimana',
      completionDate: '2024-01-10',
      duration: '2 days',
      cost: 'RWF 85,000',
      status: 'Completed',
      notes: 'All cameras functioning properly'
    },
    {
      id: 2,
      assetName: 'Guard Vehicle',
      type: 'Corrective',
      completedBy: 'Marie Claire Niyonsaba',
      completionDate: '2024-01-08',
      duration: '1 day',
      cost: 'RWF 150,000',
      status: 'Completed',
      notes: 'Engine issue resolved'
    },
    {
      id: 3,
      assetName: 'Walkie Talkie Set',
      type: 'Preventive',
      completedBy: 'Patrick Nshimiyimana',
      completionDate: '2024-01-05',
      duration: '3 days',
      cost: 'RWF 45,000',
      status: 'Completed',
      notes: 'All units tested and calibrated'
    },
    {
      id: 4,
      assetName: 'Security Barrier',
      type: 'Preventive',
      completedBy: 'Emmanuel Ndayisaba',
      completionDate: '2024-01-03',
      duration: '1 day',
      cost: 'RWF 35,000',
      status: 'Completed',
      notes: 'Barrier operating smoothly'
    },
    {
      id: 5,
      assetName: 'Safety Equipment Kit',
      type: 'Preventive',
      completedBy: 'Alexis Nkurunziza',
      completionDate: '2024-01-01',
      duration: '1 day',
      cost: 'RWF 25,000',
      status: 'Completed',
      notes: 'All equipment inspected and certified'
    }
  ];

  const maintenanceCategories = [
    { category: 'Preventive', count: 85, value: 'RWF 2.1M', color: 'bg-green-100 text-green-800' },
    { category: 'Corrective', count: 32, value: 'RWF 1.8M', color: 'bg-red-100 text-red-800' },
    { category: 'Emergency', count: 8, value: 'RWF 450K', color: 'bg-orange-100 text-orange-800' },
    { category: 'Upgrade', count: 15, value: 'RWF 1.2M', color: 'bg-blue-100 text-blue-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Preventive': return 'bg-green-100 text-green-800';
      case 'Corrective': return 'bg-red-100 text-red-800';
      case 'Emergency': return 'bg-orange-100 text-orange-800';
      case 'Upgrade': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Maintenance Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {maintenanceStats.map((stat, index) => (
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

      {/* Maintenance Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common maintenance tasks"
        color="blue"
        icon="🔧"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Schedule maintenance')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Assign technician')}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Technician
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Create work order')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Create Work Order
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

      {/* Maintenance Categories */}
      <AnimatedCard
        title="Maintenance Categories"
        subtitle="Distribution by maintenance type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {maintenanceCategories.map((category, index) => (
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

      {/* Current Maintenance Tasks */}
      <AnimatedCard
        title="Current Maintenance Tasks"
        subtitle="Active and scheduled maintenance"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.assetName}</div>
                    <div className="text-xs text-gray-500">{task.assetTag}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(task.type)}`}>
                      {task.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.startDate} - {task.endDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.cost}</div>
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
                        <Wrench className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Maintenance History */}
      <AnimatedCard
        title="Maintenance History"
        subtitle="Recently completed maintenance tasks"
        color="green"
        icon="📊"
        delay={1000}
      >
        <div className="space-y-3">
          {maintenanceHistory.map((history) => (
            <div key={history.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{history.assetName}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(history.type)}`}>
                    {history.type}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(history.status)}`}>
                    {history.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {history.completedBy} • {history.completionDate} • Duration: {history.duration} • Cost: {history.cost}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Notes: {history.notes}
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

      {/* Maintenance Metrics */}
      <AnimatedCard
        title="Maintenance Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">95.4%</div>
            <div className="text-sm text-green-600">Uptime Rate</div>
            <AnimatedProgressBar progress={95.4} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 5.5M</div>
            <div className="text-sm text-blue-600">Total Maintenance Cost</div>
            <AnimatedProgressBar progress={78} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-purple-600">Assets Maintained</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Maintenance;
