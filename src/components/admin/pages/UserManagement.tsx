import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Crown,
  Star,
  Eye,
  Lock,
  Unlock,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  Building,
  Award,
  Target,
  BarChart3
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: 'Marie Claire Niyonsaba',
      email: 'marie.claire@dicel.com',
      role: 'admin',
      department: 'HR',
      status: 'active',
      lastLogin: '2 hours ago',
      avatar: 'MC',
      phone: '+250 788 123 456',
      location: 'Kigali, Rwanda',
      permissions: ['read', 'write', 'admin'],
      joinDate: '2023-01-15',
      performance: 95
    },
    {
      id: 2,
      name: 'Jean Pierre Uwimana',
      email: 'jean.pierre@dicel.com',
      role: 'manager',
      department: 'Security',
      status: 'active',
      lastLogin: '1 hour ago',
      avatar: 'JU',
      phone: '+250 789 123 456',
      location: 'Huye, Rwanda',
      permissions: ['read', 'write'],
      joinDate: '2023-03-20',
      performance: 92
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      email: 'emmanuel@dicel.com',
      role: 'employee',
      department: 'Finance',
      status: 'inactive',
      lastLogin: '2 days ago',
      avatar: 'EN',
      phone: '+250 787 123 456',
      location: 'Butare, Rwanda',
      permissions: ['read'],
      joinDate: '2023-06-10',
      performance: 78
    },
    {
      id: 4,
      name: 'Alice Mukamana',
      email: 'alice@dicel.com',
      role: 'manager',
      department: 'IT',
      status: 'active',
      lastLogin: '30 minutes ago',
      avatar: 'AM',
      phone: '+250 786 123 456',
      location: 'Kigali, Rwanda',
      permissions: ['read', 'write', 'admin'],
      joinDate: '2023-02-28',
      performance: 88
    },
    {
      id: 5,
      name: 'Patrick Niyongabo',
      email: 'patrick@dicel.com',
      role: 'manager',
      department: 'Sales',
      status: 'active',
      lastLogin: '45 minutes ago',
      avatar: 'PN',
      phone: '+250 785 123 456',
      location: 'Kigali, Rwanda',
      permissions: ['read', 'write'],
      joinDate: '2023-04-15',
      performance: 90
    },
    {
      id: 6,
      name: 'Sarah Uwamahoro',
      email: 'sarah@dicel.com',
      role: 'employee',
      department: 'Operations',
      status: 'active',
      lastLogin: '3 hours ago',
      avatar: 'SU',
      phone: '+250 784 123 456',
      location: 'Butare, Rwanda',
      permissions: ['read'],
      joinDate: '2023-07-22',
      performance: 85
    }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '247',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: '234',
      change: '+8%',
      icon: UserCheck,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'New This Month',
      value: '15',
      change: '+25%',
      icon: UserPlus,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Inactive Users',
      value: '13',
      change: '-5%',
      icon: UserX,
      color: 'from-red-500 to-red-600'
    }
  ];

  const quickActions = [
    {
      title: 'Add User',
      description: 'Create new user account',
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Bulk Import',
      description: 'Import users from file',
      icon: Upload,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Manage Permissions',
      description: 'Configure user access',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'User Reports',
      description: 'Generate user analytics',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const getRoleBadge = (role: string) => {
    const badges: { [key: string]: string } = {
      admin: 'bg-purple-100 text-purple-800 border-purple-200',
      manager: 'bg-blue-100 text-blue-800 border-blue-200',
      employee: 'bg-green-100 text-green-800 border-green-200',
      guest: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return badges[role] || badges.employee;
  };

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
    <div className="space-y-8 animate-fade-in bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative bg-gradient-to-r from-purple-600/90 to-purple-800/90 backdrop-blur-xl rounded-3xl p-8 text-white shadow-2xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3 flex items-center bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                <Users className="w-10 h-10 mr-4 drop-shadow-lg" />
                User Management
              </h1>
              <p className="text-purple-100 text-xl font-medium">Manage all system users and their permissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddUser(true)}
                className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg"
              >
                <UserPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">Add User</span>
              </button>
              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 border border-white/50 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${stat.color}"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full shadow-lg ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{stat.value}</h3>
                <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="group p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white border border-gray-200/50 hover:border-purple-300/50 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-125 transition-transform duration-500 shadow-lg group-hover:shadow-2xl`}>
                <Icon className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{action.title}</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="admin">Admins</option>
              <option value="manager">Managers</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 hover:scale-110">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 hover:scale-110">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div 
            key={user.id} 
            className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-700 transform hover:scale-105 overflow-hidden"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border shadow-lg ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Department</span>
                  <span className="text-sm font-semibold text-gray-900">{user.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <span className={`text-sm font-bold ${getPerformanceColor(user.performance)}`}>
                    {user.performance}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm text-gray-500">{user.lastLogin}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {user.joinDate}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">View</span>
                </button>
                <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-300 hover:scale-110">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-300 hover:scale-110">
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

export default UserManagement; 