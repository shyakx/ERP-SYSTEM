import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Clock,
  MapPin,
  Car,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  Eye,
  Plus,
  FileText,
  Bell,
  CheckSquare
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface OperationsStats {
  totalGuards: number;
  activeShifts: number;
  totalSites: number;
  activeVehicles: number;
  pendingIncidents: number;
  completedPatrols: number;
  totalEquipment: number;
  maintenanceDue: number;
}

interface RecentActivity {
  id: string;
  type: 'shift_start' | 'shift_end' | 'patrol_completed' | 'incident_reported' | 'equipment_check' | 'task_assigned';
  title: string;
  description: string;
  timestamp: string;
  employee: string;
  location?: string;
  status: 'completed' | 'pending' | 'investigating';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

const OperationsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<OperationsStats>({
    totalGuards: 0,
    activeShifts: 0,
    totalSites: 0,
    activeVehicles: 0,
    pendingIncidents: 0,
    completedPatrols: 0,
    totalEquipment: 0,
    maintenanceDue: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, activitiesData] = await Promise.allSettled([
        apiService.get('/api/operations/stats'),
        apiService.get('/api/operations/recent-activities')
      ]);

      // Handle stats data
      if (statsData.status === 'fulfilled') {
        setStats(statsData.value);
      } else {
        console.error('Failed to fetch stats:', statsData.reason);
        setStats({
          totalGuards: 0,
          activeShifts: 0,
          totalSites: 0,
          activeVehicles: 0,
          pendingIncidents: 0,
          completedPatrols: 0,
          totalEquipment: 0,
          maintenanceDue: 0
        });
      }

      // Handle activities data
      if (activitiesData.status === 'fulfilled') {
        setRecentActivities(Array.isArray(activitiesData.value) ? activitiesData.value : []);
      } else {
        console.error('Failed to fetch activities:', activitiesData.reason);
        setRecentActivities([]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to fetch dashboard data');
      setRecentActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'shift_start': <Clock className="h-5 w-5 text-green-600" />,
      'shift_end': <Clock className="h-5 w-5 text-red-600" />,
      'patrol_completed': <MapPin className="h-5 w-5 text-blue-600" />,
      'incident_reported': <AlertTriangle className="h-5 w-5 text-orange-600" />,
      'equipment_check': <Shield className="h-5 w-5 text-purple-600" />,
      'task_assigned': <CheckSquare className="h-5 w-5 text-indigo-600" />
    };
    return icons[type] || <Activity className="h-5 w-5 text-gray-600" />;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'investigating': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Assign Shift',
      description: 'Create new shift assignments',
      icon: <Clock className="h-6 w-6" />,
      action: () => toast.info('Navigate to shift assignment'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: '2',
      title: 'Log Incident',
      description: 'Report security incidents',
      icon: <AlertTriangle className="h-6 w-6" />,
      action: () => toast.info('Navigate to incident reporting'),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: '3',
      title: 'Vehicle Check',
      description: 'Perform vehicle inspection',
      icon: <Car className="h-6 w-6" />,
      action: () => toast.info('Navigate to vehicle management'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: '4',
      title: 'Equipment Audit',
      description: 'Check equipment status',
      icon: <Shield className="h-6 w-6" />,
      action: () => toast.info('Navigate to equipment management'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  if (loading) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="h-8 w-8 text-blue-600" />
                Operations Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor security operations and manage resources</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Bell className="h-5 w-5" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Guards</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalGuards}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Shifts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeShifts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sites</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSites}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Car className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeVehicles}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingIncidents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Patrols</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedPatrols}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Equipment</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Maintenance Due</p>
                <p className="text-2xl font-bold text-gray-900">{stats.maintenanceDue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(action => (
              <button
                key={action.id}
                onClick={action.action}
                className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2`}
              >
                {action.icon}
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.slice(0, 5).map(activity => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">by {activity.employee}</span>
                        {activity.location && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{activity.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  </div>
);
};

export default OperationsDashboard; 