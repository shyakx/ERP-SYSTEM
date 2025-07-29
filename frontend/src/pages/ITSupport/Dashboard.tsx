import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Monitor,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  Memory,
  HardDriveIcon
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface ITSupportStats {
  totalUsers: number;
  activeUsers: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResolutionTime: number;
  systemUptime: number;
  totalAssets: number;
  activeAssets: number;
  maintenanceAssets: number;
  totalLicenses: number;
  expiringLicenses: number;
  systemAlerts: number;
  criticalAlerts: number;
}

interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: 'hardware' | 'software' | 'network' | 'access' | 'email' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  assignedTo: string;
  requester: string;
  requesterEmail: string;
  createdDate: string;
  updatedDate: string;
  resolvedDate?: string;
  resolutionTime?: number;
  tags: string[];
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'critical';
  title: string;
  description: string;
  component: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

interface ITAsset {
  id: string;
  assetNumber: string;
  name: string;
  type: 'computer' | 'server' | 'network' | 'peripheral' | 'software' | 'other';
  status: 'active' | 'maintenance' | 'retired' | 'lost' | 'damaged';
  assignedTo?: string;
  location: string;
  purchaseDate: string;
  warrantyExpiry?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  value: number;
}

const ITSupportDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ITSupportStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    averageResolutionTime: 0,
    systemUptime: 0,
    totalAssets: 0,
    activeAssets: 0,
    maintenanceAssets: 0,
    totalLicenses: 0,
    expiringLicenses: 0,
    systemAlerts: 0,
    criticalAlerts: 0
  });
  const [recentTickets, setRecentTickets] = useState<SupportTicket[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [itAssets, setItAssets] = useState<ITAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, ticketsData, alertsData, assetsData] = await Promise.all([
        apiService.get('/api/it-support/stats'),
        apiService.get('/api/it-support/recent-tickets'),
        apiService.get('/api/it-support/system-alerts'),
        apiService.get('/api/it-support/assets')
      ]);
      setStats(statsData);
      setRecentTickets(ticketsData);
      setSystemAlerts(alertsData);
      setItAssets(assetsData);
    } catch (error) {
      console.error('Error fetching IT support dashboard data:', error);
      toast.error('Failed to fetch IT support dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getTicketPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getTicketStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'open': 'bg-red-100 text-red-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getAlertSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getAssetStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'maintenance': 'bg-yellow-100 text-yellow-800',
      'retired': 'bg-gray-100 text-gray-800',
      'lost': 'bg-red-100 text-red-800',
      'damaged': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const quickActions = [
    {
      id: '1',
      title: 'Create Ticket',
      description: 'Open new support ticket',
      icon: <Plus className="h-6 w-6" />,
      action: () => toast.info('Navigate to Create Ticket'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: '2',
      title: 'Manage Users',
      description: 'User administration',
      icon: <Users className="h-6 w-6" />,
      action: () => toast.info('Navigate to User Management'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: '3',
      title: 'System Logs',
      description: 'View system logs',
      icon: <Activity className="h-6 w-6" />,
      action: () => toast.info('Navigate to System Logs'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: '4',
      title: 'IT Assets',
      description: 'Manage IT assets',
      icon: <HardDrive className="h-6 w-6" />,
      action: () => toast.info('Navigate to IT Assets'),
      color: 'bg-orange-600 hover:bg-orange-700'
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
                <Monitor className="h-8 w-8 text-blue-600" />
                IT Support Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor system health and support operations</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
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
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.openTickets}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{stats.systemUptime}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <HardDrive className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Assets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeAssets}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageResolutionTime}h</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.criticalAlerts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Database className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Licenses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLicenses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Server className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">{stats.maintenanceAssets}</p>
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

        {/* Recent Tickets and System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Support Tickets */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Support Tickets</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentTickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">#{ticket.ticketNumber}</span>
                      <div className="flex gap-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTicketPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTicketStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{ticket.title}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{ticket.requester}</span>
                      <span>•</span>
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>{new Date(ticket.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Assigned: {ticket.assignedTo}</span>
                      {ticket.resolutionTime && (
                        <span>Resolved in {ticket.resolutionTime}h</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {recentTickets.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No recent tickets
                </div>
              )}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {systemAlerts.slice(0, 5).map(alert => (
                <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'critical' ? 'text-red-600' :
                    alert.severity === 'high' ? 'text-orange-600' :
                    alert.severity === 'medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                    <div className="text-sm text-gray-600">{alert.description}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {systemAlerts.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No active alerts
                </div>
              )}
            </div>
          </div>
        </div>

        {/* IT Assets Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">IT Assets Overview</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Cpu className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{itAssets.filter(a => a.type === 'computer').length}</div>
              <div className="text-sm text-gray-600">Computers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Server className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{itAssets.filter(a => a.type === 'server').length}</div>
              <div className="text-sm text-gray-600">Servers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Wifi className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{itAssets.filter(a => a.type === 'network').length}</div>
              <div className="text-sm text-gray-600">Network</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <HardDriveIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{itAssets.filter(a => a.type === 'peripheral').length}</div>
              <div className="text-sm text-gray-600">Peripherals</div>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.systemUptime}%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalTickets}</div>
              <div className="text-sm text-gray-600">Total Tickets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.resolvedTickets}</div>
              <div className="text-sm text-gray-600">Resolved Tickets</div>
            </div>
          </div>
      </div>
    </div>
  </div>
);
};

export default ITSupportDashboard; 