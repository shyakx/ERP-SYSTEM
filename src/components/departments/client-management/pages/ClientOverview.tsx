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
  PackageCheck,
  CheckSquare,
  XCircle,
  TrendingDown,
  PieChart,
  Users,
  Phone,
  Mail,
  Star,
  Award
} from 'lucide-react';

const ClientOverview: React.FC = () => {
  const colorScheme = getColorScheme('client-management');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const clientStats = [
    { title: 'Total Clients', value: '247', subtitle: 'Active clients', color: 'blue', icon: '👥', trend: { value: '+12', isPositive: true }, delay: 0 },
    { title: 'Premium Clients', value: '89', subtitle: 'High-value clients', color: 'green', icon: '⭐', trend: { value: '+5', isPositive: true }, delay: 100 },
    { title: 'Monthly Revenue', value: 'RWF 28.5M', subtitle: 'From clients', color: 'orange', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 200 },
    { title: 'Satisfaction Rate', value: '94.2%', subtitle: 'Client satisfaction', color: 'purple', icon: '😊', trend: { value: '+1.8%', isPositive: true }, delay: 300 }
  ];

  const topClients = [
    {
      id: 1,
      name: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      email: 'jean.pierre@kbc.rw',
      phone: '+250 788 123 456',
      status: 'Premium',
      revenue: 'RWF 4.2M',
      services: ['Security Guards', 'CCTV Systems', 'Access Control'],
      lastContact: '2024-01-15',
      satisfaction: 98
    },
    {
      id: 2,
      name: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      email: 'marie.claire@musanzehotel.rw',
      phone: '+250 789 234 567',
      status: 'Premium',
      revenue: 'RWF 3.8M',
      services: ['Security Guards', 'Patrol Services', 'Emergency Response'],
      lastContact: '2024-01-14',
      satisfaction: 96
    },
    {
      id: 3,
      name: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      email: 'patrick.n@huyeuni.rw',
      phone: '+250 787 345 678',
      status: 'Standard',
      revenue: 'RWF 2.5M',
      services: ['Campus Security', 'Access Control', 'Monitoring'],
      lastContact: '2024-01-13',
      satisfaction: 92
    },
    {
      id: 4,
      name: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      email: 'emmanuel@rubavumfg.rw',
      phone: '+250 786 456 789',
      status: 'Premium',
      revenue: 'RWF 3.1M',
      services: ['Factory Security', 'CCTV Systems', 'Guard Services'],
      lastContact: '2024-01-12',
      satisfaction: 95
    },
    {
      id: 5,
      name: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      email: 'alexis@kigalimall.rw',
      phone: '+250 785 567 890',
      status: 'Standard',
      revenue: 'RWF 2.8M',
      services: ['Mall Security', 'Crowd Control', 'Surveillance'],
      lastContact: '2024-01-11',
      satisfaction: 89
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Contract Renewal',
      client: 'Kigali Business Center',
      user: 'Jean Pierre Uwimana',
      timestamp: '2024-01-15 14:30',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Service Request',
      client: 'Musanze Hotel & Resort',
      user: 'Marie Claire Niyonsaba',
      timestamp: '2024-01-15 13:45',
      status: 'In Progress'
    },
    {
      id: 3,
      type: 'Payment Received',
      client: 'Huye University',
      user: 'Patrick Nshimiyimana',
      timestamp: '2024-01-15 12:20',
      status: 'Completed'
    },
    {
      id: 4,
      type: 'New Contract',
      client: 'Rubavu Manufacturing',
      user: 'Emmanuel Ndayisaba',
      timestamp: '2024-01-15 11:15',
      status: 'Pending'
    },
    {
      id: 5,
      type: 'Client Meeting',
      client: 'Kigali Shopping Mall',
      user: 'Alexis Nkurunziza',
      timestamp: '2024-01-15 10:30',
      status: 'Scheduled'
    }
  ];

  const clientCategories = [
    { category: 'Hotels & Resorts', count: 45, revenue: 'RWF 8.2M', color: 'bg-blue-100 text-blue-800' },
    { category: 'Educational', count: 32, revenue: 'RWF 5.8M', color: 'bg-green-100 text-green-800' },
    { category: 'Manufacturing', count: 28, revenue: 'RWF 6.5M', color: 'bg-purple-100 text-purple-800' },
    { category: 'Retail & Shopping', count: 35, revenue: 'RWF 4.8M', color: 'bg-orange-100 text-orange-800' },
    { category: 'Office Buildings', count: 42, revenue: 'RWF 3.2M', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Premium': return 'bg-green-100 text-green-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Contract Renewal': return 'bg-green-100 text-green-800';
      case 'Service Request': return 'bg-blue-100 text-blue-800';
      case 'Payment Received': return 'bg-purple-100 text-purple-800';
      case 'New Contract': return 'bg-orange-100 text-orange-800';
      case 'Client Meeting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {clientStats.map((stat, index) => (
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

      {/* Client Management Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common client management tasks"
        color="blue"
        icon="👥"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add new client')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Schedule meeting')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Client survey')}
          >
            <Star className="w-4 h-4 mr-2" />
            Client Survey
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Client Categories */}
      <AnimatedCard
        title="Client Categories"
        subtitle="Distribution by industry"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {clientCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.category}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">{category.revenue}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Top Clients */}
      <AnimatedCard
        title="Top Clients"
        subtitle="Highest value clients"
        color="orange"
        icon="🏆"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.contact}</div>
                    <div className="text-xs text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.revenue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {client.services.slice(0, 2).join(', ')}
                      {client.services.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.satisfaction}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-600 h-1 rounded-full" 
                        style={{ width: `${client.satisfaction}%` }}
                      ></div>
                    </div>
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
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Activities */}
      <AnimatedCard
        title="Recent Activities"
        subtitle="Latest client interactions"
        color="green"
        icon="📋"
        delay={1000}
      >
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(activity.type)}`}>
                    {activity.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{activity.client}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {activity.user} • {activity.timestamp}
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

      {/* Client Metrics */}
      <AnimatedCard
        title="Client Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-green-600">Satisfaction Rate</div>
            <AnimatedProgressBar progress={94.2} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 28.5M</div>
            <div className="text-sm text-blue-600">Monthly Revenue</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">247</div>
            <div className="text-sm text-purple-600">Total Clients</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ClientOverview;
