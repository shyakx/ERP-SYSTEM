import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Building,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  Star,
  MessageSquare,
  FileText
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface ClientStats {
  totalClients: number;
  activeClients: number;
  pendingClients: number;
  expiredClients: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageContractValue: number;
  totalLocations: number;
  totalServices: number;
  satisfactionScore: number;
  contractRenewals: number;
  expiringContracts: number;
  newClientsThisMonth: number;
  churnRate: number;
}

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  monthlyValue: number;
  contractEnd: string;
  satisfactionScore?: number;
  lastContact?: string;
  services: string[];
  locations: string[];
}

interface ServiceRequest {
  id: string;
  clientName: string;
  title: string;
  type: 'security' | 'maintenance' | 'emergency' | 'consultation' | 'training';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdDate: string;
  dueDate: string;
  assignedTo: string;
}

interface ClientMeeting {
  id: string;
  clientName: string;
  title: string;
  type: 'review' | 'presentation' | 'consultation' | 'contract' | 'follow_up';
  date: string;
  duration: number;
  attendees: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

const ClientManagementDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ClientStats>({
    totalClients: 0,
    activeClients: 0,
    pendingClients: 0,
    expiredClients: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageContractValue: 0,
    totalLocations: 0,
    totalServices: 0,
    satisfactionScore: 0,
    contractRenewals: 0,
    expiringContracts: 0,
    newClientsThisMonth: 0,
    churnRate: 0
  });
  const [topClients, setTopClients] = useState<Client[]>([]);
  const [recentServiceRequests, setRecentServiceRequests] = useState<ServiceRequest[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<ClientMeeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, clientsData, requestsData, meetingsData] = await Promise.all([
        apiService.get('/api/client-management/stats'),
        apiService.get('/api/client-management/top-clients'),
        apiService.get('/api/client-management/recent-requests'),
        apiService.get('/api/client-management/upcoming-meetings')
      ]);
      setStats(statsData);
      setTopClients(clientsData);
      setRecentServiceRequests(requestsData);
      setUpcomingMeetings(meetingsData);
    } catch (error) {
      console.error('Error fetching client management dashboard data:', error);
      toast.error('Failed to fetch client management dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getRequestStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'open': 'bg-red-100 text-red-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getMeetingStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'rescheduled': 'bg-yellow-100 text-yellow-800'
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
      title: 'Add Client',
      description: 'Register new client',
      icon: <Plus className="h-6 w-6" />,
      action: () => toast.info('Navigate to Add Client'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: '2',
      title: 'Service Request',
      description: 'Create service request',
      icon: <FileText className="h-6 w-6" />,
      action: () => toast.info('Navigate to Service Requests'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: '3',
      title: 'Schedule Meeting',
      description: 'Book client meeting',
      icon: <Calendar className="h-6 w-6" />,
      action: () => toast.info('Navigate to Client Meetings'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: '4',
      title: 'Contract Renewals',
      description: 'Manage renewals',
      icon: <Building className="h-6 w-6" />,
      action: () => toast.info('Navigate to Contract Renewals'),
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
                <Users className="h-8 w-8 text-blue-600" />
                Client Management Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor client relationships and service delivery</p>
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
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeClients}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Satisfaction Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.satisfactionScore}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLocations}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Building className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Activity className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Contracts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.expiringContracts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.churnRate}%</p>
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

        {/* Top Clients and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Clients */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Clients</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {topClients.slice(0, 5).map(client => (
                <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{client.name}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{client.contactPerson}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{client.email}</span>
                      <span>•</span>
                      <span>{formatCurrency(client.monthlyValue)}/month</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>{client.services.length} services</span>
                      <span>{client.locations.length} locations</span>
                      {client.satisfactionScore && (
                        <span className="text-green-600">★ {client.satisfactionScore}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {topClients.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No clients found
                </div>
              )}
            </div>
          </div>

          {/* Recent Service Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Service Requests</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentServiceRequests.slice(0, 5).map(request => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{request.title}</span>
                      <div className="flex gap-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRequestStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{request.clientName}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{request.type}</span>
                      <span>•</span>
                      <span>Assigned: {request.assignedTo}</span>
                      <span>•</span>
                      <span>{new Date(request.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Due: {new Date(request.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {recentServiceRequests.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No recent requests
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Meetings and Revenue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Meetings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {upcomingMeetings.slice(0, 5).map(meeting => (
                <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{meeting.title}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMeetingStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{meeting.clientName}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{meeting.type}</span>
                      <span>•</span>
                      <span>{meeting.duration}min</span>
                      <span>•</span>
                      <span>{new Date(meeting.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Attendees: {meeting.attendees.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
              {upcomingMeetings.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No upcoming meetings
                </div>
              )}
            </div>
          </div>

          {/* Revenue Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.averageContractValue)}</div>
                  <div className="text-sm text-gray-600">Avg Contract Value</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.contractRenewals}</div>
                  <div className="text-sm text-gray-600">Contract Renewals</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{stats.newClientsThisMonth}</div>
                  <div className="text-sm text-gray-600">New Clients (Month)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.satisfactionScore}%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.activeClients}</div>
              <div className="text-sm text-gray-600">Active Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalServices}</div>
              <div className="text-sm text-gray-600">Active Services</div>
            </div>
          </div>
      </div>
    </div>
  </div>
);
};

export default ClientManagementDashboard; 