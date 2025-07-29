import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Calendar,
  MapPin,
  BarChart3,
  Activity,
  MessageSquare,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface SalesStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalLeads: number;
  activeLeads: number;
  conversionRate: number;
  averageDealSize: number;
  totalOpportunities: number;
  wonOpportunities: number;
  totalClients: number;
  newClients: number;
  totalCampaigns: number;
  activeCampaigns: number;
}

interface RecentLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  value: number;
  assignedTo: string;
  lastContact: string;
  nextFollowUp: string;
}

interface TopOpportunity {
  id: string;
  name: string;
  client: string;
  value: number;
  probability: number;
  expectedCloseDate: string;
  stage: string;
  assignedTo: string;
}

interface SalesActivity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'proposal' | 'follow_up';
  title: string;
  description: string;
  client: string;
  assignedTo: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const SalesMarketingDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SalesStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalLeads: 0,
    activeLeads: 0,
    conversionRate: 0,
    averageDealSize: 0,
    totalOpportunities: 0,
    wonOpportunities: 0,
    totalClients: 0,
    newClients: 0,
    totalCampaigns: 0,
    activeCampaigns: 0
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [topOpportunities, setTopOpportunities] = useState<TopOpportunity[]>([]);
  const [salesActivities, setSalesActivities] = useState<SalesActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, leadsData, opportunitiesData, activitiesData] = await Promise.all([
        apiService.get('/api/sales/stats'),
        apiService.get('/api/sales/recent-leads'),
        apiService.get('/api/sales/top-opportunities'),
        apiService.get('/api/sales/activities')
      ]);
      setStats(statsData);
      setRecentLeads(leadsData);
      setTopOpportunities(opportunitiesData);
      setSalesActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching sales dashboard data:', error);
      toast.error('Failed to fetch sales dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'proposal': 'bg-purple-100 text-purple-800',
      'negotiation': 'bg-orange-100 text-orange-800',
      'won': 'bg-green-100 text-green-800',
      'lost': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getActivityTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'call': 'bg-blue-100 text-blue-800',
      'meeting': 'bg-green-100 text-green-800',
      'email': 'bg-purple-100 text-purple-800',
      'proposal': 'bg-orange-100 text-orange-800',
      'follow_up': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'call': <Phone className="h-4 w-4" />,
      'meeting': <Calendar className="h-4 w-4" />,
      'email': <Mail className="h-4 w-4" />,
      'proposal': <FileText className="h-4 w-4" />,
      'follow_up': <MessageSquare className="h-4 w-4" />
    };
    return icons[type] || <Activity className="h-4 w-4" />;
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
      title: 'Add Lead',
      description: 'Create new lead',
      icon: <Plus className="h-6 w-6" />,
      action: () => toast.info('Navigate to Add Lead'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: '2',
      title: 'Create Opportunity',
      description: 'Start new deal',
      icon: <Target className="h-6 w-6" />,
      action: () => toast.info('Navigate to Opportunities'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: '3',
      title: 'Schedule Activity',
      description: 'Plan sales activity',
      icon: <Calendar className="h-6 w-6" />,
      action: () => toast.info('Navigate to Activities'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: '4',
      title: 'View Reports',
      description: 'Generate sales reports',
      icon: <BarChart3 className="h-6 w-6" />,
      action: () => toast.info('Navigate to Reports'),
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
                <TrendingUp className="h-8 w-8 text-blue-600" />
                Sales & Marketing Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor sales performance and marketing campaigns</p>
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
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeLeads}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Won Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.wonOpportunities}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Target className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOpportunities}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageDealSize)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newClients}</p>
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

        {/* Recent Leads and Top Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentLeads.slice(0, 5).map(lead => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{lead.company}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{lead.email}</span>
                      <span>•</span>
                      <span>{lead.source}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Value: {formatCurrency(lead.value)}</span>
                      <span>Assigned: {lead.assignedTo}</span>
                    </div>
                  </div>
                </div>
              ))}
              {recentLeads.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No recent leads
                </div>
              )}
            </div>
          </div>

          {/* Top Opportunities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Opportunities</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {topOpportunities.slice(0, 5).map(opportunity => (
                <div key={opportunity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{opportunity.name}</span>
                      <span className="text-sm font-medium text-green-600">{opportunity.probability}%</span>
                    </div>
                    <div className="text-sm text-gray-600">{opportunity.client}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>Value: {formatCurrency(opportunity.value)}</span>
                      <span>•</span>
                      <span>Stage: {opportunity.stage}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Close: {new Date(opportunity.expectedCloseDate).toLocaleDateString()}</span>
                      <span>Assigned: {opportunity.assignedTo}</span>
                    </div>
                  </div>
                </div>
              ))}
              {topOpportunities.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No opportunities
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sales Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sales Activities</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {salesActivities.slice(0, 5).map(activity => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Client: {activity.client}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">by {activity.assignedTo}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {salesActivities.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No recent activities
              </div>
            )}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalClients}</div>
              <div className="text-sm text-gray-600">Total Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCampaigns}</div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.activeCampaigns}</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </div>
          </div>
      </div>
    </div>
  </div>
);
};

export default SalesMarketingDashboard; 