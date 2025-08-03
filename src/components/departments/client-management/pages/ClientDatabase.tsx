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
  Award,
  Database,
  Filter as FilterIcon
} from 'lucide-react';

const ClientDatabase: React.FC = () => {
  const colorScheme = getColorScheme('client-management');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const clientStats = [
    { title: 'Total Records', value: '1,247', subtitle: 'Client database', color: 'blue', icon: '📊', trend: { value: '+23', isPositive: true }, delay: 0 },
    { title: 'Active Clients', value: '892', subtitle: 'Currently active', color: 'green', icon: '✅', trend: { value: '+8', isPositive: true }, delay: 100 },
    { title: 'New This Month', value: '45', subtitle: 'New registrations', color: 'orange', icon: '🆕', trend: { value: '+5', isPositive: true }, delay: 200 },
    { title: 'Data Accuracy', value: '98.5%', subtitle: 'Information quality', color: 'purple', icon: '🎯', trend: { value: '+0.5%', isPositive: true }, delay: 300 }
  ];

  const clients = [
    {
      id: 1,
      name: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      email: 'jean.pierre@kbc.rw',
      phone: '+250 788 123 456',
      address: 'Kigali, Rwanda',
      status: 'Active',
      category: 'Office Buildings',
      revenue: 'RWF 4.2M',
      lastContact: '2024-01-15',
      nextContact: '2024-01-22',
      satisfaction: 98
    },
    {
      id: 2,
      name: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      email: 'marie.claire@musanzehotel.rw',
      phone: '+250 789 234 567',
      address: 'Musanze, Rwanda',
      status: 'Active',
      category: 'Hotels & Resorts',
      revenue: 'RWF 3.8M',
      lastContact: '2024-01-14',
      nextContact: '2024-01-21',
      satisfaction: 96
    },
    {
      id: 3,
      name: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      email: 'patrick.n@huyeuni.rw',
      phone: '+250 787 345 678',
      address: 'Huye, Rwanda',
      status: 'Active',
      category: 'Educational',
      revenue: 'RWF 2.5M',
      lastContact: '2024-01-13',
      nextContact: '2024-01-20',
      satisfaction: 92
    },
    {
      id: 4,
      name: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      email: 'emmanuel@rubavumfg.rw',
      phone: '+250 786 456 789',
      address: 'Rubavu, Rwanda',
      status: 'Active',
      category: 'Manufacturing',
      revenue: 'RWF 3.1M',
      lastContact: '2024-01-12',
      nextContact: '2024-01-19',
      satisfaction: 95
    },
    {
      id: 5,
      name: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      email: 'alexis@kigalimall.rw',
      phone: '+250 785 567 890',
      address: 'Kigali, Rwanda',
      status: 'Inactive',
      category: 'Retail & Shopping',
      revenue: 'RWF 2.8M',
      lastContact: '2024-01-10',
      nextContact: '2024-01-17',
      satisfaction: 89
    },
    {
      id: 6,
      name: 'Butare Medical Center',
      contact: 'Dr. Sarah Uwamahoro',
      email: 'sarah.uwamahoro@butaremed.rw',
      phone: '+250 784 678 901',
      address: 'Butare, Rwanda',
      status: 'Active',
      category: 'Healthcare',
      revenue: 'RWF 1.9M',
      lastContact: '2024-01-11',
      nextContact: '2024-01-18',
      satisfaction: 94
    }
  ];

  const categories = [
    { name: 'Hotels & Resorts', count: 45, color: 'bg-blue-100 text-blue-800' },
    { name: 'Educational', count: 32, color: 'bg-green-100 text-green-800' },
    { name: 'Manufacturing', count: 28, color: 'bg-purple-100 text-purple-800' },
    { name: 'Retail & Shopping', count: 35, color: 'bg-orange-100 text-orange-800' },
    { name: 'Office Buildings', count: 42, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Healthcare', count: 18, color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData ? categoryData.color : 'bg-gray-100 text-gray-800';
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Database Statistics */}
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

      {/* Database Actions */}
      <AnimatedCard
        title="Database Management"
        subtitle="Client database operations"
        color="blue"
        icon="📊"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add new record')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Import data')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Data
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Export data')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Backup database')}
          >
            <Database className="w-4 h-4 mr-2" />
            Backup
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search & Filter"
        subtitle="Find specific client records"
        color="green"
        icon="🔍"
        delay={600}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Client Categories */}
      <AnimatedCard
        title="Client Categories"
        subtitle="Distribution by industry"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${category.color}`}>
                {category.name}
              </div>
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-xs text-gray-500">clients</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Client Database Table */}
      <AnimatedCard
        title="Client Database"
        subtitle="Complete client records"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                    <div className="text-xs text-gray-500">{client.address}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.contact}</div>
                    <div className="text-xs text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(client.category)}`}>
                      {client.category}
                    </span>
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
                    <div className="text-sm text-gray-900">{client.lastContact}</div>
                    <div className="text-xs text-gray-500">Next: {client.nextContact}</div>
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
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Database Metrics */}
      <AnimatedCard
        title="Database Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-sm text-green-600">Data Accuracy</div>
            <AnimatedProgressBar progress={98.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-blue-600">Total Records</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">892</div>
            <div className="text-sm text-purple-600">Active Clients</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ClientDatabase;
