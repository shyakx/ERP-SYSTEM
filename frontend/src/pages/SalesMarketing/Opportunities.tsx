import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Target,
  DollarSign,
  Calendar,
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  FileText,
  MessageSquare,
  Building,
  User
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface Opportunity {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  contactPerson: string;
  value: number;
  probability: number;
  expectedValue: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  status: 'active' | 'on_hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expectedCloseDate: string;
  actualCloseDate?: string;
  assignedTo: string;
  createdDate: string;
  lastModified: string;
  source: string;
  description: string;
  notes: string;
  activities: OpportunityActivity[];
  competitors: string[];
  winReason?: string;
  lossReason?: string;
}

interface OpportunityActivity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'proposal' | 'presentation' | 'follow_up';
  title: string;
  description: string;
  date: string;
  outcome: string;
  nextAction: string;
  assignedTo: string;
}

const Opportunities: React.FC = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  const [showAddOpportunity, setShowAddOpportunity] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    fetchOpportunitiesData();
  }, []);

  const fetchOpportunitiesData = async () => {
    try {
      setLoading(true);
      const opportunitiesData = await apiService.get('/api/sales/opportunities');
      setOpportunities(opportunitiesData);
    } catch (error) {
      console.error('Error fetching opportunities data:', error);
      toast.error('Failed to fetch opportunities data');
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity =>
    opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(opportunity =>
    selectedStage === 'all' || opportunity.stage === selectedStage
  ).filter(opportunity =>
    selectedStatus === 'all' || opportunity.status === selectedStatus
  ).filter(opportunity =>
    selectedPriority === 'all' || opportunity.priority === selectedPriority
  ).filter(opportunity =>
    selectedAssignee === 'all' || opportunity.assignedTo === selectedAssignee
  );

  const getStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      'prospecting': 'bg-blue-100 text-blue-800',
      'qualification': 'bg-yellow-100 text-yellow-800',
      'proposal': 'bg-purple-100 text-purple-800',
      'negotiation': 'bg-orange-100 text-orange-800',
      'closed_won': 'bg-green-100 text-green-800',
      'closed_lost': 'bg-red-100 text-red-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'on_hold': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalOpportunities = () => opportunities.length;
  const getActiveOpportunities = () => opportunities.filter(o => o.status === 'active').length;
  const getWonOpportunities = () => opportunities.filter(o => o.stage === 'closed_won').length;
  const getTotalValue = () => opportunities.reduce((sum, o) => sum + o.value, 0);
  const getExpectedValue = () => opportunities.reduce((sum, o) => sum + o.expectedValue, 0);

  const isOverdue = (opportunity: Opportunity) => {
    if (opportunity.stage === 'closed_won' || opportunity.stage === 'closed_lost') return false;
    return new Date(opportunity.expectedCloseDate) < new Date();
  };

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
                <Target className="h-8 w-8 text-blue-600" />
                Opportunities
              </h1>
              <p className="text-gray-600 mt-2">Track and manage sales opportunities</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddOpportunity(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Opportunity
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalOpportunities()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Won Deals</p>
                <p className="text-2xl font-bold text-gray-900">{getWonOpportunities()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalValue())}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expected Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(getExpectedValue())}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search opportunities by name, client, or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stages</option>
                <option value="prospecting">Prospecting</option>
                <option value="qualification">Qualification</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed_won">Closed Won</option>
                <option value="closed_lost">Closed Lost</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Assignees</option>
                {Array.from(new Set(opportunities.map(opp => opp.assignedTo))).map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Opportunities Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opportunity Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client & Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value & Probability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Close Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOpportunities.map(opportunity => (
                  <tr key={opportunity.id} className={`hover:bg-gray-50 ${
                    isOverdue(opportunity) ? 'bg-red-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{opportunity.name}</div>
                        <div className="text-sm text-gray-500">{opportunity.source}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(opportunity.priority)}`}>
                          {opportunity.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{opportunity.clientName}</div>
                        <div className="text-sm text-gray-500">{opportunity.contactPerson}</div>
                        <div className="text-sm text-gray-500">Assigned: {opportunity.assignedTo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(opportunity.value)}</div>
                        <div className="text-sm text-gray-500">{opportunity.probability}% probability</div>
                        <div className="text-sm font-medium text-green-600">
                          Expected: {formatCurrency(opportunity.expectedValue)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStageColor(opportunity.stage)}`}>
                          {opportunity.stage}
                        </span>
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                            {opportunity.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
                        </div>
                        {opportunity.actualCloseDate && (
                          <div className="text-sm text-gray-500">
                            Actual: {new Date(opportunity.actualCloseDate).toLocaleDateString()}
                          </div>
                        )}
                        {isOverdue(opportunity) && (
                          <div className="text-xs text-red-600 font-medium">Overdue</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOpportunity(opportunity)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Opportunity Detail Modal */}
        {selectedOpportunity && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Opportunity Details</h3>
                  <button
                    onClick={() => setSelectedOpportunity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedOpportunity.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client</label>
                      <p className="text-sm text-gray-900">{selectedOpportunity.clientName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                      <p className="text-sm text-gray-900">{selectedOpportunity.contactPerson}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <p className="text-sm text-gray-900">{selectedOpportunity.assignedTo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Value</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedOpportunity.value)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Probability</label>
                      <p className="text-sm text-gray-900">{selectedOpportunity.probability}%</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expected Value</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedOpportunity.expectedValue)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Source</label>
                      <p className="text-sm text-gray-900">{selectedOpportunity.source}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stage</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(selectedOpportunity.stage)}`}>
                        {selectedOpportunity.stage}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOpportunity.status)}`}>
                        {selectedOpportunity.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedOpportunity.priority)}`}>
                        {selectedOpportunity.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expected Close Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedOpportunity.expectedCloseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedOpportunity.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedOpportunity.description}</p>
                  </div>

                  {selectedOpportunity.competitors.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Competitors</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedOpportunity.competitors.map(competitor => (
                          <span key={competitor} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {competitor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedOpportunity.activities.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recent Activities</label>
                      <div className="space-y-2">
                        {selectedOpportunity.activities.slice(0, 3).map(activity => (
                          <div key={activity.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                              <span className="text-xs text-gray-500">{activity.type}</span>
                            </div>
                            <div className="text-sm text-gray-600">{activity.description}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>{new Date(activity.date).toLocaleDateString()}</span>
                              <span>Outcome: {activity.outcome}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedOpportunity.winReason && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Win Reason</label>
                      <p className="text-sm text-gray-900 bg-green-50 p-3 rounded-lg">{selectedOpportunity.winReason}</p>
                    </div>
                  )}

                  {selectedOpportunity.lossReason && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loss Reason</label>
                      <p className="text-sm text-gray-900 bg-red-50 p-3 rounded-lg">{selectedOpportunity.lossReason}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedOpportunity.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Opportunity
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Mark as Won
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Schedule Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  </div>
);
};

export default Opportunities; 