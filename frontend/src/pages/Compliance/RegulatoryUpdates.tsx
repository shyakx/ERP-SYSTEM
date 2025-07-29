import React, { useState } from 'react';
import { Shield, Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

interface RegulatoryUpdate {
  id: string;
  updateNumber: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'implemented' | 'overdue';
  source: string;
  publishedDate: string;
  effectiveDate: string;
  complianceDeadline: string;
  assignedTo: string;
  department: string;
  description: string;
  impact: string;
  actionsRequired: string[];
}

const RegulatoryUpdates: React.FC = () => {
  const [updates, setUpdates] = useState<RegulatoryUpdate[]>([
    {
      id: '1',
      updateNumber: 'REG-2024-001',
      title: 'New Data Protection Regulations',
      category: 'Data Protection',
      priority: 'high',
      status: 'in_progress',
      source: 'National Data Protection Authority',
      publishedDate: '2024-01-15',
      effectiveDate: '2024-03-01',
      complianceDeadline: '2024-02-15',
      assignedTo: 'Jean Clauc',
      department: 'Compliance',
      description: 'Updated data protection requirements for security companies',
      impact: 'High impact on data handling procedures',
      actionsRequired: ['Update privacy policy', 'Train staff', 'Implement new procedures']
    },
    {
      id: '2',
      updateNumber: 'REG-2024-002',
      title: 'Firearm License Renewal Requirements',
      category: 'Security Licensing',
      priority: 'critical',
      status: 'pending',
      source: 'Security Services Commission',
      publishedDate: '2024-01-20',
      effectiveDate: '2024-04-01',
      complianceDeadline: '2024-03-20',
      assignedTo: 'Sarah Johnson',
      department: 'Operations',
      description: 'New requirements for firearm license renewals',
      impact: 'Critical impact on armed security operations',
      actionsRequired: ['Review current licenses', 'Schedule renewals', 'Update training']
    },
    {
      id: '3',
      updateNumber: 'REG-2024-003',
      title: 'Workplace Safety Standards Update',
      category: 'Safety',
      priority: 'medium',
      status: 'implemented',
      source: 'Occupational Safety Authority',
      publishedDate: '2024-01-10',
      effectiveDate: '2024-02-01',
      complianceDeadline: '2024-01-31',
      assignedTo: 'Mike Wilson',
      department: 'Operations',
      description: 'Updated workplace safety standards for security personnel',
      impact: 'Medium impact on safety procedures',
      actionsRequired: ['Update safety protocols', 'Conduct safety training']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'implemented': 'bg-green-100 text-green-800',
      'overdue': 'bg-red-100 text-red-800'
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
      'Data Protection': 'bg-blue-100 text-blue-800',
      'Security Licensing': 'bg-purple-100 text-purple-800',
      'Safety': 'bg-green-100 text-green-800',
      'Financial': 'bg-orange-100 text-orange-800',
      'Environmental': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredUpdates = updates.filter(update =>
    update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.updateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(update =>
    selectedStatus === 'all' || update.status === selectedStatus
  ).filter(update =>
    selectedPriority === 'all' || update.priority === selectedPriority
  ).filter(update =>
    selectedCategory === 'all' || update.category === selectedCategory
  );

  const getTotalUpdates = () => updates.length;
  const getPendingUpdates = () => updates.filter(u => u.status === 'pending').length;
  const getInProgressUpdates = () => updates.filter(u => u.status === 'in_progress').length;
  const getImplementedUpdates = () => updates.filter(u => u.status === 'implemented').length;

  const isOverdue = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return deadlineDate < now;
  };

  const isUrgent = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const daysDiff = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7 && daysDiff > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                Regulatory Updates
              </h1>
              <p className="text-gray-600 mt-2">Track and manage regulatory compliance updates</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5" />
                Add Update
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
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Updates</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalUpdates()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{getPendingUpdates()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{getInProgressUpdates()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Implemented</p>
                <p className="text-2xl font-bold text-gray-900">{getImplementedUpdates()}</p>
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
                  placeholder="Search updates by title, number, or assignee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="implemented">Implemented</option>
                <option value="overdue">Overdue</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Data Protection">Data Protection</option>
                <option value="Security Licensing">Security Licensing</option>
                <option value="Safety">Safety</option>
                <option value="Financial">Financial</option>
                <option value="Environmental">Environmental</option>
              </select>
            </div>
          </div>
        </div>

        {/* Updates Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source & Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadlines & Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUpdates.map(update => (
                  <tr key={update.id} className={`hover:bg-gray-50 ${
                    isOverdue(update.complianceDeadline) ? 'bg-red-50' : 
                    isUrgent(update.complianceDeadline) ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{update.updateNumber}</div>
                        <div className="text-sm text-gray-500">{update.title}</div>
                        <div className="flex gap-1 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(update.category)}`}>
                            {update.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{update.source}</div>
                        <div className="text-sm text-gray-500">{update.assignedTo}</div>
                        <div className="text-sm text-gray-500">{update.department}</div>
                        <div className="text-sm text-gray-500">
                          Published: {new Date(update.publishedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}>
                          {update.status}
                        </span>
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(update.priority)}`}>
                            {update.priority}
                          </span>
                        </div>
                        {isOverdue(update.complianceDeadline) && (
                          <div className="text-xs text-red-600 font-medium">Overdue</div>
                        )}
                        {isUrgent(update.complianceDeadline) && (
                          <div className="text-xs text-yellow-600 font-medium">Urgent</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          Deadline: {new Date(update.complianceDeadline).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Effective: {new Date(update.effectiveDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {update.actionsRequired.length} actions required
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-900">
                            <Shield className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
);
};

export default RegulatoryUpdates; 