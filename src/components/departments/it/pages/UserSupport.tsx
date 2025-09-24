import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter,
  BarChart3,
  Settings,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  User,
  Tag,
  Star
} from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  user: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'hardware' | 'software' | 'network' | 'account' | 'other';
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
}

const UserSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'users' | 'analytics'>('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'T001',
      title: 'Cannot access email system',
      description: 'User reports being unable to log into the email system since yesterday morning.',
      user: 'john.doe@dicel.co.rw',
      department: 'HR',
      priority: 'high',
      status: 'in_progress',
      category: 'account',
      createdAt: '2024-01-15 09:30:00',
      updatedAt: '2024-01-15 10:15:00',
      assignedTo: 'IT Support Team'
    },
    {
      id: 'T002',
      title: 'Printer not working',
      description: 'Office printer in Finance department is not responding to print jobs.',
      user: 'jane.smith@dicel.co.rw',
      department: 'Finance',
      priority: 'medium',
      status: 'open',
      category: 'hardware',
      createdAt: '2024-01-15 10:45:00',
      updatedAt: '2024-01-15 10:45:00',
      assignedTo: 'Unassigned'
    },
    {
      id: 'T003',
      title: 'Slow internet connection',
      description: 'Internet speed is very slow in the Operations department.',
      user: 'paul.mugenzi@dicel.co.rw',
      department: 'Operations',
      priority: 'medium',
      status: 'resolved',
      category: 'network',
      createdAt: '2024-01-14 14:20:00',
      updatedAt: '2024-01-15 08:30:00',
      assignedTo: 'Network Team'
    },
    {
      id: 'T004',
      title: 'Software installation request',
      description: 'Need to install new accounting software on Finance department computers.',
      user: 'david.habyarimana@dicel.co.rw',
      department: 'Finance',
      priority: 'low',
      status: 'open',
      category: 'software',
      createdAt: '2024-01-15 11:00:00',
      updatedAt: '2024-01-15 11:00:00',
      assignedTo: 'Unassigned'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hardware': return '🖥️';
      case 'software': return '💻';
      case 'network': return '🌐';
      case 'account': return '👤';
      default: return '❓';
    }
  };

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const ticketStats = {
    total: supportTickets.length,
    open: supportTickets.filter(t => t.status === 'open').length,
    inProgress: supportTickets.filter(t => t.status === 'in_progress').length,
    resolved: supportTickets.filter(t => t.status === 'resolved').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Support</h1>
          <p className="text-gray-600">Manage support tickets and provide user assistance</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Ticket</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Support Report</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Support Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Tickets"
          subtitle="All support requests"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{ticketStats.total}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Open Tickets"
          subtitle="Awaiting response"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{ticketStats.open}</p>
              <p className="text-sm text-gray-500">Need attention</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="In Progress"
          subtitle="Being worked on"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{ticketStats.inProgress}</p>
              <p className="text-sm text-gray-500">Active tickets</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Resolved"
          subtitle="Completed tickets"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{ticketStats.resolved}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <AnimatedButton
              onClick={() => {}}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Tickets</h3>
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getCategoryIcon(ticket.category)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{ticket.user}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{ticket.department}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{ticket.createdAt}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>Assigned to: </span>
                    <span className="font-medium">{ticket.assignedTo}</span>
                  </div>
                  <div className="flex space-x-2">
                    <AnimatedButton
                      onClick={() => {}}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => {}}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </AnimatedButton>
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

export default UserSupport;
