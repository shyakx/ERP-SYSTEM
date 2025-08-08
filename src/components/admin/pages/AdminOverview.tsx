import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, Shield, UserCheck, TrendingUp, MessageSquare, 
  ShieldCheck, AlertTriangle, Monitor, BarChart3, Activity, Plus, 
  Settings, CheckCircle, AlertCircle, Database, Lock, Zap, Crown, 
  Cpu, HardDrive, Network, Building, Globe, Bell, Star, Activity as ActivityIcon
} from 'lucide-react';

const AdminOverview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Active team members'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      description: 'Total monthly earnings'
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'from-purple-500 to-purple-600',
      description: 'Satisfied customers'
    },
    {
      title: 'Security Guards',
      value: '156',
      change: '+3%',
      changeType: 'positive',
      icon: ShieldCheck,
      color: 'from-yellow-500 to-yellow-600',
      description: 'On-duty personnel'
    }
  ];

  const quickActions = [
    {
      title: 'Add Employee',
      description: 'Register new team member',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'New Client',
      description: 'Onboard new customer',
      icon: UserCheck,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Assign Guard',
      description: 'Deploy security personnel',
      icon: ShieldCheck,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'System Backup',
      description: 'Create data backup',
      icon: Database,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Security Audit',
      description: 'Run security check',
      icon: Lock,
      color: 'from-red-500 to-red-600'
    }
  ];

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: '68%',
      status: 'normal',
      icon: Cpu,
      color: 'text-blue-600'
    },
    {
      name: 'Memory Usage',
      value: '72%',
      status: 'warning',
      icon: ActivityIcon,
      color: 'text-yellow-600'
    },
    {
      name: 'Disk Space',
      value: '45%',
      status: 'normal',
      icon: HardDrive,
      color: 'text-green-600'
    },
    {
      name: 'Network',
      value: '95%',
      status: 'excellent',
      icon: Network,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'client',
      message: 'New client registration: Kigali Business Center',
      time: '2 minutes ago',
      icon: UserCheck,
      color: 'text-blue-600',
      priority: 'high'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received: $2,500 from ABC Corporation',
      time: '15 minutes ago',
      icon: DollarSign,
      color: 'text-green-600',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'security',
      message: 'Security guard assigned to new location',
      time: '1 hour ago',
      icon: ShieldCheck,
      color: 'text-yellow-600',
      priority: 'low'
    },
    {
      id: 4,
      type: 'alert',
      message: 'System maintenance scheduled for tonight',
      time: '2 hours ago',
      icon: AlertCircle,
      color: 'text-orange-600',
      priority: 'high'
    }
  ];

  const departmentStats = [
    { name: 'HR', employees: 12, status: 'active', color: 'from-purple-500 to-purple-600', growth: '+8%' },
    { name: 'Finance', employees: 8, status: 'active', color: 'from-green-500 to-green-600', growth: '+12%' },
    { name: 'Compliance', employees: 6, status: 'active', color: 'from-red-500 to-red-600', growth: '+5%' },
    { name: 'Inventory', employees: 15, status: 'active', color: 'from-orange-500 to-orange-600', growth: '+15%' },
    { name: 'Client Management', employees: 10, status: 'active', color: 'from-indigo-500 to-indigo-600', growth: '+10%' },
    { name: 'Sales & Marketing', employees: 14, status: 'active', color: 'from-pink-500 to-pink-600', growth: '+18%' },
    { name: 'Customer Experience', employees: 9, status: 'active', color: 'from-cyan-500 to-cyan-600', growth: '+7%' },
    { name: 'Security Guard Management', employees: 25, status: 'active', color: 'from-yellow-500 to-yellow-600', growth: '+20%' },
    { name: 'Risk Department', employees: 7, status: 'active', color: 'from-red-400 to-red-500', growth: '+6%' },
    { name: 'Recovery', employees: 5, status: 'active', color: 'from-emerald-500 to-emerald-600', growth: '+4%' },
    { name: 'IT Department', employees: 11, status: 'active', color: 'from-blue-400 to-blue-500', growth: '+9%' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 animate-ping"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Admin Dashboard...</p>
          <div className="mt-4 flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

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
                <Crown className="w-10 h-10 mr-4 drop-shadow-lg" />
                Admin Dashboard
              </h1>
              <p className="text-purple-100 text-xl font-medium">Welcome back! Here's what's happening with your company today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">Add New</span>
              </button>
              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg">
                <Settings className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards with Hover Effects */}
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
                      stat.changeType === 'positive' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{stat.value}</h3>
                <p className="text-sm font-semibold text-gray-600 mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
                
                {/* Animated Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(parseInt(stat.value.replace(/[^0-9]/g, '')), 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Quick Actions Grid */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-purple-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-125 transition-transform duration-500 shadow-lg group-hover:shadow-2xl`}>
                  <Icon className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{action.title}</h4>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced System Metrics */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Monitor className="w-7 h-7 mr-3 text-purple-600" />
              System Metrics
            </h3>
            <div className="space-y-6">
              {systemMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="group flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white transition-all duration-500 transform hover:scale-105 border border-gray-200/50 hover:border-purple-300/50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color.replace('text-', 'bg-')} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                        <Icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            metric.status === 'excellent' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                            metric.status === 'normal' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                            metric.status === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                          }`}
                          style={{ width: `${parseInt(metric.value)}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Activity className="w-7 h-7 mr-3 text-purple-600" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={activity.id} 
                    className="group flex items-start space-x-4 p-5 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-500 transform hover:scale-[1.02] border border-transparent hover:border-purple-200/50"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${activity.color.replace('text-', 'bg-')} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 shadow-lg`}>
                      <Icon className={`w-6 h-6 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      activity.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                      activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      'bg-green-100 text-green-800 border border-green-200'
                    }`}>
                      {activity.priority}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Department Overview */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <Building className="w-7 h-7 mr-3 text-purple-600" />
          Department Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {departmentStats.map((dept, index) => (
            <div 
              key={index} 
              className="group text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/80 hover:from-white hover:to-white border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${dept.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-xl group-hover:shadow-2xl`}>
                <span className="text-white font-bold text-lg">{dept.name.charAt(0)}</span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{dept.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{dept.employees} employees</p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-xs text-green-600 font-bold">Active</span>
              </div>
              <p className="text-xs text-purple-600 font-bold">{dept.growth}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 