import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Activity,
  Star,
  Award,
  Target,
  Globe,
  MapPin,
  Phone,
  Mail,
  Calendar,
  UserPlus,
  UserMinus,
  BarChart3
} from 'lucide-react';

const DepartmentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddDepartment, setShowAddDepartment] = useState(false);

  const departments = [
    {
      id: 1,
      name: 'Human Resources',
      code: 'HR',
      manager: 'Marie Claire Niyonsaba',
      employees: 12,
      budget: 450000,
      status: 'active',
      location: 'Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'hr@dicel.com',
      color: 'from-purple-500 to-purple-600',
      growth: '+15%',
      performance: 92
    },
    {
      id: 2,
      name: 'Finance',
      code: 'FIN',
      manager: 'Emmanuel Ndayisaba',
      employees: 8,
      budget: 680000,
      status: 'active',
      location: 'Kigali, Rwanda',
      phone: '+250 789 123 456',
      email: 'finance@dicel.com',
      color: 'from-green-500 to-green-600',
      growth: '+12%',
      performance: 88
    },
    {
      id: 3,
      name: 'Security Guard Management',
      code: 'SGM',
      manager: 'Jean Pierre Uwimana',
      employees: 25,
      budget: 1200000,
      status: 'active',
      location: 'Huye, Rwanda',
      phone: '+250 787 123 456',
      email: 'security@dicel.com',
      color: 'from-yellow-500 to-yellow-600',
      growth: '+20%',
      performance: 95
    },
    {
      id: 4,
      name: 'Information Technology',
      code: 'IT',
      manager: 'Alice Mukamana',
      employees: 11,
      budget: 320000,
      status: 'active',
      location: 'Kigali, Rwanda',
      phone: '+250 786 123 456',
      email: 'it@dicel.com',
      color: 'from-blue-500 to-blue-600',
      growth: '+8%',
      performance: 85
    },
    {
      id: 5,
      name: 'Sales & Marketing',
      code: 'S&M',
      manager: 'Patrick Niyongabo',
      employees: 14,
      budget: 890000,
      status: 'active',
      location: 'Kigali, Rwanda',
      phone: '+250 785 123 456',
      email: 'sales@dicel.com',
      color: 'from-pink-500 to-pink-600',
      growth: '+18%',
      performance: 90
    },
    {
      id: 6,
      name: 'Operations',
      code: 'OPS',
      manager: 'Sarah Uwamahoro',
      employees: 15,
      budget: 560000,
      status: 'active',
      location: 'Butare, Rwanda',
      phone: '+250 784 123 456',
      email: 'operations@dicel.com',
      color: 'from-orange-500 to-orange-600',
      growth: '+10%',
      performance: 87
    }
  ];

  const stats = [
    {
      title: 'Total Departments',
      value: '6',
      change: '+1',
      icon: Building,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Employees',
      value: '85',
      change: '+12',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Budget',
      value: '$4.1M',
      change: '+15%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Avg Performance',
      value: '89%',
      change: '+5%',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const quickActions = [
    {
      title: 'Add Department',
      description: 'Create a new department',
      icon: Plus,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Assign Manager',
      description: 'Assign department managers',
      icon: UserPlus,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Budget Allocation',
      description: 'Manage department budgets',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Performance Review',
      description: 'Review department performance',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <Building className="w-8 h-8 mr-3" />
              Department Management
            </h1>
            <p className="text-purple-100 text-lg">Manage organizational departments and their resources</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowAddDepartment(true)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl flex items-center space-x-2 border border-white/30"
            >
              <Plus className="w-5 h-5" />
              <span>Add Department</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl flex items-center space-x-2 border border-white/30">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="group p-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-white border border-gray-200 hover:border-purple-300 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Departments</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div 
            key={dept.id} 
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {dept.code}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(dept.status)}`}>
                    {dept.status}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Managed by {dept.manager}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Employees</span>
                  <span className="text-sm font-semibold text-gray-900">{dept.employees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="text-sm font-semibold text-gray-900">${dept.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Growth</span>
                  <span className="text-sm font-semibold text-green-600">{dept.growth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <span className={`text-sm font-semibold ${getPerformanceColor(dept.performance)}`}>
                    {dept.performance}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{dept.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Phone className="w-3 h-3" />
                  <span>{dept.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Mail className="w-3 h-3" />
                  <span>{dept.email}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement; 