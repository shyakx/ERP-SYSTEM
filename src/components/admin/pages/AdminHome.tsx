import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  BarChart3,
  Calendar,
  Bell,
  Zap,
  Globe,
  Database,
  Server,
  Cpu,
  HardDrive
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';

const AdminHome: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState(98.5);
  const [activeUsers, setActiveUsers] = useState(24);
  const [totalRevenue, setTotalRevenue] = useState(15420000);
  const [pendingApprovals, setPendingApprovals] = useState(12);

  // System KPIs
  const systemKPIs = [
    {
      title: 'Total Revenue',
      value: `${(totalRevenue / 1000000).toFixed(1)}M RWF`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-emerald-600',
      delay: 0
    },
    {
      title: 'Active Users',
      value: activeUsers.toString(),
      change: '+3 today',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-600',
      delay: 100
    },
    {
      title: 'System Health',
      value: `${systemHealth}%`,
      change: '-0.5%',
      isPositive: false,
      icon: Activity,
      color: 'bg-slate-600',
      delay: 200
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovals.toString(),
      change: '+2 new',
      isPositive: false,
      icon: AlertTriangle,
      color: 'bg-amber-600',
      delay: 300
    }
  ];

  // Department Overview
  const departmentStats = [
    { name: 'HR', employees: 45, status: 'active', color: 'blue', icon: Users },
    { name: 'Finance', employees: 32, status: 'active', color: 'emerald', icon: DollarSign },
    { name: 'IT', employees: 28, status: 'active', color: 'slate', icon: Cpu },
    { name: 'Security', employees: 15, status: 'active', color: 'red', icon: Shield },
    { name: 'Sales', employees: 38, status: 'active', color: 'indigo', icon: TrendingUp },
    { name: 'Operations', employees: 25, status: 'active', color: 'amber', icon: Settings }
  ];

  // Recent System Activities
  const recentActivities = [
    {
      id: 1,
      type: 'user_login',
      user: 'Claudine Uwimana',
      department: 'HR',
      action: 'Logged in',
      time: '2 minutes ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'approval_required',
      user: 'Emmanuel Rugamba',
      department: 'Finance',
      action: 'Requested budget approval',
      time: '5 minutes ago',
      status: 'pending',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'system_alert',
      user: 'System',
      department: 'IT',
      action: 'Server maintenance scheduled',
      time: '10 minutes ago',
      status: 'info',
      icon: Bell
    },
    {
      id: 4,
      type: 'data_export',
      user: 'David Habyarimana',
      department: 'Sales',
      action: 'Exported sales report',
      time: '15 minutes ago',
      status: 'success',
      icon: BarChart3
    },
    {
      id: 5,
      type: 'security_alert',
      user: 'Patrick Mugisha',
      department: 'Security',
      action: 'Unauthorized access attempt',
      time: '20 minutes ago',
      status: 'warning',
      icon: Shield
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create user account',
      icon: Users,
      color: 'blue',
      action: () => console.log('Add user')
    },
    {
      title: 'System Backup',
      description: 'Create backup',
      icon: Database,
      color: 'emerald',
      action: () => console.log('Backup system')
    },
    {
      title: 'View Reports',
      description: 'Generate reports',
      icon: BarChart3,
      color: 'slate',
      action: () => console.log('View reports')
    },
    {
      title: 'Security Scan',
      description: 'Run security check',
      icon: Shield,
      color: 'red',
      action: () => console.log('Security scan')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'pending': return Clock;
      case 'warning': return AlertTriangle;
      case 'info': return Bell;
      default: return Eye;
    }
  };

  return (
    <div className="space-y-6">
             {/* Welcome Header */}
       <div className="bg-slate-800 rounded-lg p-6 text-white">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold mb-2">Welcome back, Admin</h1>
             <p className="text-slate-300">Here's what's happening across your organization today</p>
           </div>
           <div className="text-right">
             <p className="text-sm text-slate-400">Last updated</p>
             <p className="text-lg font-semibold">{new Date().toLocaleTimeString()}</p>
           </div>
         </div>
       </div>

      {/* System KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
                         <div
               key={index}
               className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
             >
               <div className="flex items-center justify-between mb-4">
                 <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center`}>
                   <Icon className="w-5 h-5 text-white" />
                 </div>
                 <div className={`text-sm font-medium ${kpi.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                   {kpi.change}
                 </div>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
               <p className="text-sm text-gray-600">{kpi.title}</p>
             </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Overview */}
        <AnimatedCard
          title="Department Overview"
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            {departmentStats.map((dept, index) => {
              const Icon = dept.icon;
              return (
                                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                   <div className="flex items-center space-x-3">
                     <div className={`w-6 h-6 rounded bg-${dept.color}-100 flex items-center justify-center`}>
                       <Icon className={`w-3 h-3 text-${dept.color}-600`} />
                     </div>
                     <div>
                       <p className="font-medium text-gray-900">{dept.name}</p>
                       <p className="text-sm text-gray-600">{dept.employees} employees</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <div className={`w-2 h-2 rounded-full bg-${dept.color}-500`}></div>
                     <span className="text-sm text-gray-600 capitalize">{dept.status}</span>
                   </div>
                 </div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Recent Activities */}
        <AnimatedCard
          title="Recent System Activities"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getStatusIcon(activity.status);
              return (
                                 <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
                   <div className={`w-6 h-6 rounded ${getStatusColor(activity.status)} flex items-center justify-center`}>
                     <Icon className="w-3 h-3" />
                   </div>
                   <div className="flex-1">
                     <p className="font-medium text-gray-900">{activity.action}</p>
                     <p className="text-sm text-gray-600">
                       {activity.user} • {activity.department}
                     </p>
                   </div>
                   <span className="text-sm text-gray-500">{activity.time}</span>
                 </div>
              );
            })}
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Actions */}
      <AnimatedCard title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
                             <button
                 key={index}
                 onClick={action.action}
                 className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-shadow duration-200 text-left"
               >
                 <div className={`w-8 h-8 rounded bg-${action.color}-100 flex items-center justify-center mb-3`}>
                   <Icon className={`w-4 h-4 text-${action.color}-600`} />
                 </div>
                 <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                 <p className="text-sm text-gray-600">{action.description}</p>
               </button>
            );
          })}
        </div>
      </AnimatedCard>

             {/* System Health Monitor */}
       <AnimatedCard title="System Health Monitor">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="text-center">
             <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <Server className="w-6 h-6 text-emerald-600" />
             </div>
             <h3 className="font-medium text-gray-900">Server Status</h3>
             <p className="text-xl font-bold text-emerald-600">99.9%</p>
             <p className="text-sm text-gray-600">Uptime</p>
           </div>
           
           <div className="text-center">
             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <Database className="w-6 h-6 text-blue-600" />
             </div>
             <h3 className="font-medium text-gray-900">Database</h3>
             <p className="text-xl font-bold text-blue-600">98.5%</p>
             <p className="text-sm text-gray-600">Performance</p>
           </div>
           
           <div className="text-center">
             <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <Globe className="w-6 h-6 text-slate-600" />
             </div>
             <h3 className="font-medium text-gray-900">Network</h3>
             <p className="text-xl font-bold text-slate-600">97.2%</p>
             <p className="text-sm text-gray-600">Connectivity</p>
           </div>
           
           <div className="text-center">
             <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <HardDrive className="w-6 h-6 text-amber-600" />
             </div>
             <h3 className="font-medium text-gray-900">Storage</h3>
             <p className="text-xl font-bold text-amber-600">85.3%</p>
             <p className="text-sm text-gray-600">Used</p>
           </div>
         </div>
       </AnimatedCard>
    </div>
  );
};

export default AdminHome;
