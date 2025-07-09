import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { roleDisplayNames } from '../config/menu';
import StatsCard from '../components/Dashboard/StatsCard';
import { Calendar, Clock, Users, AlertTriangle, DollarSign, Package } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    const baseStats = [
      { title: 'Total Employees', value: '248', icon: 'Users', color: 'blue' as const },
      { title: 'Active Shifts', value: '42', icon: 'Clock', color: 'green' as const },
      { title: 'Pending Invoices', value: '15', icon: 'FileText', color: 'yellow' as const },
      { title: 'Open Incidents', value: '7', icon: 'AlertTriangle', color: 'red' as const }
    ];

    switch (user?.role) {
      case 'system_admin':
        return [
          ...baseStats,
          { title: 'System Uptime', value: '99.9%', icon: 'Server', color: 'green' as const },
          { title: 'User Sessions', value: '134', icon: 'Activity', color: 'purple' as const }
        ];
      case 'hr_manager':
        return [
          { title: 'Total Employees', value: '248', icon: 'Users', color: 'blue' as const },
          { title: 'On Leave', value: '12', icon: 'Calendar', color: 'yellow' as const },
          { title: 'New Hires', value: '8', icon: 'UserPlus', color: 'green' as const },
          { title: 'Pending Reviews', value: '23', icon: 'FileText', color: 'orange' as const }
        ];
      case 'finance_manager':
        return [
          { title: 'Monthly Revenue', value: '$125,400', icon: 'DollarSign', color: 'green' as const },
          { title: 'Pending Invoices', value: '15', icon: 'FileText', color: 'yellow' as const },
          { title: 'Overdue Payments', value: '3', icon: 'AlertTriangle', color: 'red' as const },
          { title: 'Payroll Status', value: 'Completed', icon: 'CreditCard', color: 'green' as const }
        ];
      case 'operations_supervisor':
        return [
          { title: 'Active Shifts', value: '42', icon: 'Clock', color: 'green' as const },
          { title: 'Incident Reports', value: '7', icon: 'AlertTriangle', color: 'red' as const },
          { title: 'Guards on Duty', value: '89', icon: 'Users', color: 'blue' as const },
          { title: 'Locations Covered', value: '24', icon: 'MapPin', color: 'purple' as const }
        ];
      case 'security_guard':
        return [
          { title: 'My Shifts', value: '6', icon: 'Clock', color: 'blue' as const },
          { title: 'Hours This Week', value: '32', icon: 'Timer', color: 'green' as const },
          { title: 'Incident Reports', value: '2', icon: 'AlertTriangle', color: 'yellow' as const },
          { title: 'Performance', value: '95%', icon: 'Award', color: 'purple' as const }
        ];
      default:
        return baseStats;
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {user?.role ? roleDisplayNames[user.role] : 'Welcome to DICEL Security ERP'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New employee onboarded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Shift schedule updated</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Incident report filed</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Add Employee</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Clock className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Schedule Shift</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="w-6 h-6 text-yellow-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Create Invoice</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Track Assets</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;