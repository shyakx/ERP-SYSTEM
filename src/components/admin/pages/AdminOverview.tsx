import React from 'react';
import { 
  Users, 
  DollarSign, 
  Shield, 
  Package, 
  UserCheck, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw, 
  Monitor,
  BarChart3,
  Activity,
  Target,
  TrendingDown,
  Eye,
  Plus,
  Settings,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Security Guards',
      value: '156',
      change: '+3%',
      changeType: 'positive',
      icon: ShieldCheck,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'client',
      message: 'New client registration: Kigali Business Center',
      time: '2 minutes ago',
      icon: UserCheck,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received: $2,500 from ABC Corporation',
      time: '15 minutes ago',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'security',
      message: 'Security guard assigned to new location',
      time: '1 hour ago',
      icon: ShieldCheck,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'alert',
      message: 'System maintenance scheduled for tonight',
      time: '2 hours ago',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const departmentStats = [
    { name: 'HR', employees: 12, status: 'active', color: 'bg-purple-500' },
    { name: 'Finance', employees: 8, status: 'active', color: 'bg-green-500' },
    { name: 'Compliance', employees: 6, status: 'active', color: 'bg-red-500' },
    { name: 'Inventory', employees: 15, status: 'active', color: 'bg-orange-500' },
    { name: 'Client Management', employees: 10, status: 'active', color: 'bg-indigo-500' },
    { name: 'Sales & Marketing', employees: 14, status: 'active', color: 'bg-pink-500' },
    { name: 'Customer Experience', employees: 9, status: 'active', color: 'bg-cyan-500' },
    { name: 'Security Guard Management', employees: 25, status: 'active', color: 'bg-yellow-500' },
    { name: 'Risk Department', employees: 7, status: 'active', color: 'bg-red-400' },
    { name: 'Recovery', employees: 5, status: 'active', color: 'bg-emerald-500' },
    { name: 'IT Department', employees: 11, status: 'active', color: 'bg-blue-400' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your company today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover-lift">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 animate-slide-in-left">
                      <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Add Employee</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">New Client</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <ShieldCheck className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium">Assign Guard</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Generate Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Department Overview</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className={`w-12 h-12 rounded-full ${dept.color} mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-semibold">{dept.name.charAt(0)}</span>
                </div>
                <h4 className="text-sm font-medium text-gray-900">{dept.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{dept.employees} employees</p>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 ml-1">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 