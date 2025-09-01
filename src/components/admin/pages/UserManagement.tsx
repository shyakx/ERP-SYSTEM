import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Shield, 
  Settings,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Crown,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status: 'active' | 'inactive' | 'locked';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  // Mock user data
  const users: User[] = [
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Ndayisaba',
      email: 'admin@dicel.co.rw',
      role: 'admin',
      department: 'Administration',
      phone: '+250 788 123 456',
      status: 'active',
      lastLogin: '2024-02-15 10:30',
      createdAt: '2024-01-15',
      permissions: ['all']
    },
    {
      id: '2',
      firstName: 'Claudine',
      lastName: 'Uwimana',
      email: 'hr.manager@dicel.co.rw',
      role: 'hr',
      department: 'Human Resources',
      phone: '+250 788 234 567',
      status: 'active',
      lastLogin: '2024-02-15 09:15',
      createdAt: '2024-01-20',
      permissions: ['hr_management', 'employee_management', 'payroll']
    },
    {
      id: '3',
      firstName: 'Emmanuel',
      lastName: 'Rugamba',
      email: 'finance.manager@dicel.co.rw',
      role: 'finance',
      department: 'Finance',
      phone: '+250 788 345 678',
      status: 'active',
      lastLogin: '2024-02-15 08:45',
      createdAt: '2024-01-25',
      permissions: ['finance_management', 'budget_approval', 'reports']
    },
    {
      id: '4',
      firstName: 'Eric',
      lastName: 'Niyonsenga',
      email: 'it.manager@dicel.co.rw',
      role: 'it',
      department: 'Information Technology',
      phone: '+250 788 456 789',
      status: 'active',
      lastLogin: '2024-02-14 17:30',
      createdAt: '2024-02-01',
      permissions: ['system_admin', 'user_management', 'security']
    },
    {
      id: '5',
      firstName: 'Patrick',
      lastName: 'Mugisha',
      email: 'security.manager@dicel.co.rw',
      role: 'security',
      department: 'Security',
      phone: '+250 788 567 890',
      status: 'active',
      lastLogin: '2024-02-15 07:00',
      createdAt: '2024-02-05',
      permissions: ['security_management', 'access_control', 'monitoring']
    },
    {
      id: '6',
      firstName: 'Marie',
      lastName: 'Mukamana',
      email: 'operations.manager@dicel.co.rw',
      role: 'inventory',
      department: 'Operations',
      phone: '+250 788 678 901',
      status: 'active',
      lastLogin: '2024-02-14 16:20',
      createdAt: '2024-02-10',
      permissions: ['inventory_management', 'procurement', 'logistics']
    }
  ];

  const roles = [
    { value: 'admin', label: 'Administrator', color: 'slate' },
    { value: 'hr', label: 'HR Manager', color: 'blue' },
    { value: 'finance', label: 'Finance Manager', color: 'emerald' },
    { value: 'it', label: 'IT Manager', color: 'indigo' },
    { value: 'security', label: 'Security Manager', color: 'red' },
    { value: 'inventory', label: 'Operations Manager', color: 'amber' },
    { value: 'sales', label: 'Sales Manager', color: 'indigo' },
    { value: 'risk', label: 'Risk Manager', color: 'amber' }
  ];

  const departments = [
    'Administration',
    'Human Resources',
    'Finance',
    'Information Technology',
    'Security',
    'Operations',
    'Sales & Marketing',
    'Risk Management'
  ];

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.value === role);
    return roleData ? roleData.color : 'gray';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'locked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return Clock;
      case 'locked': return Lock;
      default: return Clock;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    locked: users.filter(u => u.status === 'locked').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Role Management</h1>
          <p className="text-gray-600">Manage users, roles, and permissions across the organization</p>
        </div>
        <AnimatedButton
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </AnimatedButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Locked Accounts</p>
              <p className="text-2xl font-bold text-red-600">{stats.locked}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatedCard title="Filters & Search">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="locked">Locked</option>
          </select>

          <AnimatedButton className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Clear Filters</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Users Table */}
      <AnimatedCard title={`Users (${filteredUsers.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const StatusIcon = getStatusIcon(user.status);
                return (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-800`}>
                        {roles.find(r => r.value === user.role)?.label || user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user.department}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user.lastLogin}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Settings className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Role Management */}
      <AnimatedCard title="Role & Permission Management">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <div key={role.value} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 bg-${role.color}-100 rounded-lg flex items-center justify-center`}>
                  <Shield className={`w-4 h-4 text-${role.color}-600`} />
                </div>
                <span className="text-sm text-gray-500">
                  {users.filter(u => u.role === role.value).length} users
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{role.label}</h3>
              <p className="text-sm text-gray-600 mb-3">Role description and permissions</p>
              <div className="flex space-x-2">
                <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
                  Edit
                </button>
                <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                  Permissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default UserManagement; 