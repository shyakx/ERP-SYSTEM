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
  Filter as FilterIcon,
  FileText as FileTextIcon,
  Clock as ClockIcon,
  AlertCircle as AlertCircleIcon
} from 'lucide-react';

const ContractManagement: React.FC = () => {
  const colorScheme = getColorScheme('client-management');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const contractStats = [
    { title: 'Total Contracts', value: '156', subtitle: 'Active contracts', color: 'blue', icon: '📄', trend: { value: '+8', isPositive: true }, delay: 0 },
    { title: 'Active Contracts', value: '142', subtitle: 'Currently active', color: 'green', icon: '✅', trend: { value: '+5', isPositive: true }, delay: 100 },
    { title: 'Expiring Soon', value: '12', subtitle: 'Next 30 days', color: 'orange', icon: '⚠️', trend: { value: '+2', isPositive: false }, delay: 200 },
    { title: 'Total Value', value: 'RWF 45.2M', subtitle: 'Contract value', color: 'purple', icon: '💰', trend: { value: '+2.1M', isPositive: true }, delay: 300 }
  ];

  const contracts = [
    {
      id: 1,
      contractNumber: 'CON-2024-001',
      client: 'Kigali Business Center',
      type: 'Security Services',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: 'RWF 4.2M',
      status: 'Active',
      manager: 'Jean Pierre Uwimana',
      services: ['Security Guards', 'CCTV Systems', 'Access Control'],
      renewalDate: '2024-11-01',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      contractNumber: 'CON-2024-002',
      client: 'Musanze Hotel & Resort',
      type: 'Comprehensive Security',
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      value: 'RWF 3.8M',
      status: 'Active',
      manager: 'Marie Claire Niyonsaba',
      services: ['Security Guards', 'Patrol Services', 'Emergency Response'],
      renewalDate: '2024-12-15',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      contractNumber: 'CON-2024-003',
      client: 'Huye University',
      type: 'Campus Security',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      value: 'RWF 2.5M',
      status: 'Active',
      manager: 'Patrick Nshimiyimana',
      services: ['Campus Security', 'Access Control', 'Monitoring'],
      renewalDate: '2024-12-01',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      contractNumber: 'CON-2024-004',
      client: 'Rubavu Manufacturing',
      type: 'Factory Security',
      startDate: '2024-01-20',
      endDate: '2024-12-19',
      value: 'RWF 3.1M',
      status: 'Pending',
      manager: 'Emmanuel Ndayisaba',
      services: ['Factory Security', 'CCTV Systems', 'Guard Services'],
      renewalDate: '2024-11-20',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      contractNumber: 'CON-2024-005',
      client: 'Kigali Shopping Mall',
      type: 'Retail Security',
      startDate: '2024-01-10',
      endDate: '2024-12-09',
      value: 'RWF 2.8M',
      status: 'Expiring',
      manager: 'Alexis Nkurunziza',
      services: ['Mall Security', 'Crowd Control', 'Surveillance'],
      renewalDate: '2024-11-10',
      lastUpdated: '2024-01-11'
    },
    {
      id: 6,
      contractNumber: 'CON-2024-006',
      client: 'Butare Medical Center',
      type: 'Healthcare Security',
      startDate: '2024-02-15',
      endDate: '2025-02-14',
      value: 'RWF 1.9M',
      status: 'Active',
      manager: 'Dr. Sarah Uwamahoro',
      services: ['Medical Facility Security', 'Access Control', 'Emergency Response'],
      renewalDate: '2025-01-15',
      lastUpdated: '2024-01-10'
    }
  ];

  const contractTypes = [
    { type: 'Security Services', count: 45, value: 'RWF 18.2M', color: 'bg-blue-100 text-blue-800' },
    { type: 'Comprehensive Security', count: 32, value: 'RWF 12.8M', color: 'bg-green-100 text-green-800' },
    { type: 'Campus Security', count: 28, value: 'RWF 8.5M', color: 'bg-purple-100 text-purple-800' },
    { type: 'Factory Security', count: 25, value: 'RWF 7.2M', color: 'bg-orange-100 text-orange-800' },
    { type: 'Retail Security', count: 18, value: 'RWF 4.8M', color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Healthcare Security', count: 8, value: 'RWF 2.5M', color: 'bg-red-100 text-red-800' }
  ];

  const upcomingRenewals = [
    {
      id: 1,
      contract: 'CON-2024-005',
      client: 'Kigali Shopping Mall',
      renewalDate: '2024-11-10',
      daysLeft: 45,
      value: 'RWF 2.8M',
      status: 'High Priority'
    },
    {
      id: 2,
      contract: 'CON-2024-001',
      client: 'Kigali Business Center',
      renewalDate: '2024-11-01',
      daysLeft: 36,
      value: 'RWF 4.2M',
      status: 'High Priority'
    },
    {
      id: 3,
      contract: 'CON-2024-003',
      client: 'Huye University',
      renewalDate: '2024-12-01',
      daysLeft: 66,
      value: 'RWF 2.5M',
      status: 'Medium Priority'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expiring': return 'bg-orange-100 text-orange-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'High Priority': return 'bg-red-100 text-red-800';
      case 'Medium Priority': return 'bg-orange-100 text-orange-800';
      case 'Low Priority': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysLeftColor = (days: number) => {
    if (days <= 30) return 'text-red-600';
    if (days <= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Contract Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contractStats.map((stat, index) => (
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

      {/* Contract Management Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common contract management tasks"
        color="blue"
        icon="📄"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Create contract')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Contract
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Renew contract')}
          >
            <FileTextIcon className="w-4 h-4 mr-2" />
            Renew Contract
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Review contracts')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Review Contracts
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

      {/* Contract Types */}
      <AnimatedCard
        title="Contract Types"
        subtitle="Distribution by service type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {contractTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">{type.value}</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Upcoming Renewals */}
      <AnimatedCard
        title="Upcoming Renewals"
        subtitle="Contracts expiring soon"
        color="orange"
        icon="⚠️"
        delay={800}
      >
        <div className="space-y-3">
          {upcomingRenewals.map((renewal) => (
            <div key={renewal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{renewal.contract}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(renewal.status)}`}>
                    {renewal.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {renewal.client} • {renewal.renewalDate} • {renewal.value}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getDaysLeftColor(renewal.daysLeft)}`}>
                  {renewal.daysLeft} days
                </span>
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">Renew</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Contracts Table */}
      <AnimatedCard
        title="Contract Management"
        subtitle="All active contracts"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contract.contractNumber}</div>
                    <div className="text-xs text-gray-500">Last updated: {contract.lastUpdated}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.client}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.type}</div>
                    <div className="text-xs text-gray-500">
                      {contract.services.slice(0, 2).join(', ')}
                      {contract.services.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.startDate}</div>
                    <div className="text-xs text-gray-500">to {contract.endDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contract.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.manager}</div>
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
                        <FileTextIcon className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <ClockIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Contract Metrics */}
      <AnimatedCard
        title="Contract Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">142</div>
            <div className="text-sm text-green-600">Active Contracts</div>
            <AnimatedProgressBar progress={91} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">RWF 45.2M</div>
            <div className="text-sm text-blue-600">Total Contract Value</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-purple-600">Expiring Soon</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ContractManagement;
