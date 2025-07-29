import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  MessageSquare,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Building,
  Activity,
  Phone,
  Mail,
  DollarSign,
  Shield,
  Key,
  Wrench,
  Users
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  clientName: string;
  clientId: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  category: 'technical' | 'billing' | 'service' | 'security' | 'access' | 'equipment' | 'training' | 'other';
  subcategory: 'login_issue' | 'payment_problem' | 'service_request' | 'security_breach' | 'access_denied' | 'equipment_failure' | 'training_request' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'assigned' | 'in_progress' | 'waiting_client' | 'waiting_third_party' | 'resolved' | 'closed' | 'cancelled';
  assignedTo: string;
  assignedToId: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  dueDate: string;
  resolvedDate?: string;
  resolution?: string;
  estimatedResolutionTime?: number;
  actualResolutionTime?: number;
  satisfactionRating?: number;
  clientFeedback?: string;
  internalNotes: string;
  attachments: TicketAttachment[];
  comments: TicketComment[];
  escalationLevel: number;
  isEscalated: boolean;
  escalationReason?: string;
}

interface TicketAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface TicketComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
  isClientVisible: boolean;
}

const SupportTickets: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const fetchTicketsData = async () => {
    try {
      setLoading(true);
      const ticketsData = await apiService.get('/api/client-management/support-tickets');
      setTickets(ticketsData);
    } catch (error) {
      console.error('Error fetching support tickets data:', error);
      toast.error('Failed to fetch support tickets data');
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter((ticket: SupportTicket) =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((ticket: SupportTicket) =>
    selectedCategory === 'all' || ticket.category === selectedCategory
  ).filter((ticket: SupportTicket) =>
    selectedStatus === 'all' || ticket.status === selectedStatus
  ).filter((ticket: SupportTicket) =>
    selectedPriority === 'all' || ticket.priority === selectedPriority
  ).filter((ticket: SupportTicket) =>
    selectedClient === 'all' || ticket.clientId === selectedClient
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'open': 'bg-red-100 text-red-800',
      'assigned': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'waiting_client': 'bg-orange-100 text-orange-800',
      'waiting_third_party': 'bg-purple-100 text-purple-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'technical': 'bg-blue-100 text-blue-800',
      'billing': 'bg-green-100 text-green-800',
      'service': 'bg-purple-100 text-purple-800',
      'security': 'bg-red-100 text-red-800',
      'access': 'bg-indigo-100 text-indigo-800',
      'equipment': 'bg-orange-100 text-orange-800',
      'training': 'bg-teal-100 text-teal-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'technical': <Activity className="h-4 w-4" />,
      'billing': <DollarSign className="h-4 w-4" />,
      'service': <Building className="h-4 w-4" />,
      'security': <Shield className="h-4 w-4" />,
      'access': <Key className="h-4 w-4" />,
      'equipment': <Wrench className="h-4 w-4" />,
      'training': <Users className="h-4 w-4" />,
      'other': <MessageSquare className="h-4 w-4" />
    };
    return icons[category] || <MessageSquare className="h-4 w-4" />;
  };

  const getTotalTickets = () => tickets.length;
  const getOpenTickets = () => tickets.filter((t: SupportTicket) => t.status === 'open').length;
  const getInProgressTickets = () => tickets.filter((t: SupportTicket) => t.status === 'in_progress').length;
  const getResolvedTickets = () => tickets.filter((t: SupportTicket) => t.status === 'resolved').length;

  const isOverdue = (ticket: SupportTicket) => {
    if (ticket.status === 'resolved' || ticket.status === 'closed') return false;
    return new Date(ticket.dueDate) < new Date();
  };

  const isEscalated = (ticket: SupportTicket) => {
    return ticket.isEscalated || ticket.escalationLevel > 1;
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
                <MessageSquare className="h-8 w-8 text-blue-600" />
                Support Tickets
              </h1>
              <p className="text-gray-600 mt-2">Manage client support tickets and resolutions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewTicket(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Ticket
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
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalTickets()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{getOpenTickets()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{getInProgressTickets()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{getResolvedTickets()}</p>
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
                  placeholder="Search tickets by title, number, client, or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="service">Service</option>
                <option value="security">Security</option>
                <option value="access">Access</option>
                <option value="equipment">Equipment</option>
                <option value="training">Training</option>
                <option value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_client">Waiting Client</option>
                <option value="waiting_third_party">Waiting Third Party</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
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
                <option value="critical">Critical</option>
              </select>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Clients</option>
                {Array.from(new Set(tickets.map(ticket => ticket.clientId))).map(clientId => {
                  const ticket = tickets.find(t => t.clientId === clientId);
                  return (
                    <option key={clientId} value={clientId}>{ticket?.clientName}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client & Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment & Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} className={`hover:bg-gray-50 ${
                    isOverdue(ticket) ? 'bg-red-50' : ''
                  } ${isEscalated(ticket) ? 'bg-orange-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{ticket.ticketNumber}</div>
                        <div className="text-sm text-gray-500">{ticket.title}</div>
                        <div className="flex gap-1 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(ticket.category)}`}>
                            {getCategoryIcon(ticket.category)}
                            {ticket.category}
                          </span>
                          {isEscalated(ticket) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Escalated
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ticket.clientName}</div>
                        <div className="text-sm text-gray-500">{ticket.contactPerson}</div>
                        <div className="text-sm text-gray-500">{ticket.contactEmail}</div>
                        <div className="text-sm text-gray-500">{ticket.contactPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        {isOverdue(ticket) && (
                          <div className="text-xs text-red-600 font-medium">Overdue</div>
                        )}
                        {ticket.satisfactionRating && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < ticket.satisfactionRating! ? 'text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">Assigned: {ticket.assignedTo}</div>
                        <div className="text-sm text-gray-500">
                          Created: {new Date(ticket.createdDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Due: {new Date(ticket.dueDate).toLocaleDateString()}
                        </div>
                        {ticket.estimatedResolutionTime && (
                          <div className="text-sm text-gray-500">
                            Est. Time: {ticket.estimatedResolutionTime}h
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
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

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Ticket Details</h3>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ticket Number</label>
                      <p className="text-sm text-gray-900">#{selectedTicket.ticketNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <p className="text-sm text-gray-900">{selectedTicket.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedTicket.category)}`}>
                        {getCategoryIcon(selectedTicket.category)}
                        {selectedTicket.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {selectedTicket.subcategory}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client</label>
                      <p className="text-sm text-gray-900">{selectedTicket.clientName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                      <p className="text-sm text-gray-900">{selectedTicket.contactPerson}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                      <p className="text-sm text-gray-900">{selectedTicket.contactEmail}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                      <p className="text-sm text-gray-900">{selectedTicket.contactPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <p className="text-sm text-gray-900">{selectedTicket.assignedTo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created By</label>
                      <p className="text-sm text-gray-900">{selectedTicket.createdBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedTicket.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedTicket.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estimated Resolution Time</label>
                      <p className="text-sm text-gray-900">{selectedTicket.estimatedResolutionTime || 'N/A'}h</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Actual Resolution Time</label>
                      <p className="text-sm text-gray-900">{selectedTicket.actualResolutionTime || 'N/A'}h</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedTicket.description}</p>
                  </div>

                  {selectedTicket.resolution && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                      <p className="text-sm text-gray-900 bg-green-50 p-3 rounded-lg">{selectedTicket.resolution}</p>
                    </div>
                  )}

                  {selectedTicket.clientFeedback && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Feedback</label>
                      <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-lg">{selectedTicket.clientFeedback}</p>
                    </div>
                  )}

                  {selectedTicket.satisfactionRating && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Satisfaction Rating</label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{selectedTicket.satisfactionRating}/5</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < selectedTicket.satisfactionRating! ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {isEscalated(selectedTicket) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Escalation Details</label>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-900">Level: {selectedTicket.escalationLevel}</div>
                        {selectedTicket.escalationReason && (
                          <div className="text-sm text-gray-600 mt-1">Reason: {selectedTicket.escalationReason}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedTicket.internalNotes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Ticket
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Update Status
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Add Comment
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

export default SupportTickets; 