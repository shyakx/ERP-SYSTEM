import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  AlertTriangle,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface ComplianceIncident {
  id: string;
  incidentNumber: string;
  title: string;
  description: string;
  type: 'security_breach' | 'data_loss' | 'regulatory_violation' | 'policy_violation' | 'safety_incident' | 'environmental' | 'financial' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reportedBy: string;
  reportedDate: string;
  assignedTo: string;
  department: string;
  location: string;
  affectedParties: string[];
  regulatoryImpact: string[];
  complianceViolations: string[];
  rootCause?: string;
  resolution?: string;
  resolutionDate?: string;
  correctiveActions: CorrectiveAction[];
  attachments: IncidentAttachment[];
  witnesses: string[];
  estimatedCost: number;
  actualCost?: number;
  regulatoryReportingRequired: boolean;
  reportedToRegulator?: boolean;
  regulatorReportDate?: string;
  followUpRequired: boolean;
  followUpDate?: string;
  notes: string;
}

interface CorrectiveAction {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completionDate?: string;
  cost: number;
}

interface IncidentAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

const IncidentCompliance: React.FC = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState<ComplianceIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showNewIncident, setShowNewIncident] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<ComplianceIncident | null>(null);

  useEffect(() => {
    fetchIncidentsData();
  }, []);

  const fetchIncidentsData = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/api/compliance/incidents');
      setIncidents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching incidents data:', error);
      toast.error('Failed to fetch incidents data');
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredIncidents = incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(incident =>
    selectedType === 'all' || incident.type === selectedType
  ).filter(incident =>
    selectedStatus === 'all' || incident.status === selectedStatus
  ).filter(incident =>
    selectedSeverity === 'all' || incident.severity === selectedSeverity
  ).filter(incident =>
    selectedDepartment === 'all' || incident.department === selectedDepartment
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'open': 'bg-red-100 text-red-800',
      'investigating': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800',
      'escalated': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'security_breach': 'bg-red-100 text-red-800',
      'data_loss': 'bg-orange-100 text-orange-800',
      'regulatory_violation': 'bg-purple-100 text-purple-800',
      'policy_violation': 'bg-blue-100 text-blue-800',
      'safety_incident': 'bg-yellow-100 text-yellow-800',
      'environmental': 'bg-green-100 text-green-800',
      'financial': 'bg-indigo-100 text-indigo-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
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

  const getTotalIncidents = () => incidents.length;
  const getOpenIncidents = () => incidents.filter(i => i.status === 'open').length;
  const getResolvedIncidents = () => incidents.filter(i => i.status === 'resolved').length;
  const getCriticalIncidents = () => incidents.filter(i => i.severity === 'critical').length;

  const isOverdue = (incident: ComplianceIncident) => {
    if (incident.status === 'resolved' || incident.status === 'closed') return false;
    const reported = new Date(incident.reportedDate);
    const now = new Date();
    const daysDiff = (now.getTime() - reported.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff > 7; // Overdue after 7 days
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
                <AlertTriangle className="h-8 w-8 text-blue-600" />
                Incident Compliance
              </h1>
              <p className="text-gray-600 mt-2">Track and manage compliance incidents</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewIncident(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Report Incident
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
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalIncidents()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{getOpenIncidents()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{getResolvedIncidents()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-gray-900">{getCriticalIncidents()}</p>
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
                  placeholder="Search incidents by title, number, or reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option key="all" value="all">All Types</option>
                <option key="security_breach" value="security_breach">Security Breach</option>
                <option key="data_loss" value="data_loss">Data Loss</option>
                <option key="regulatory_violation" value="regulatory_violation">Regulatory Violation</option>
                <option key="policy_violation" value="policy_violation">Policy Violation</option>
                <option key="safety_incident" value="safety_incident">Safety Incident</option>
                <option key="environmental" value="environmental">Environmental</option>
                <option key="financial" value="financial">Financial</option>
                <option key="other" value="other">Other</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option key="all" value="all">All Status</option>
                <option key="open" value="open">Open</option>
                <option key="investigating" value="investigating">Investigating</option>
                <option key="resolved" value="resolved">Resolved</option>
                <option key="closed" value="closed">Closed</option>
                <option key="escalated" value="escalated">Escalated</option>
              </select>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option key="all" value="all">All Severity</option>
                <option key="low" value="low">Low</option>
                <option key="medium" value="medium">Medium</option>
                <option key="high" value="high">High</option>
                <option key="critical" value="critical">Critical</option>
              </select>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option key="all" value="all">All Departments</option>
                {Array.from(new Set(incidents.map(incident => incident.department))).map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporter & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates & Impact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncidents.map(incident => (
                  <tr key={incident.id} className={`hover:bg-gray-50 ${
                    isOverdue(incident) ? 'bg-red-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{incident.incidentNumber}</div>
                        <div className="text-sm text-gray-500">{incident.title}</div>
                        <div className="flex gap-1 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(incident.type)}`}>
                            {incident.type}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                            {incident.priority}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{incident.reportedBy}</div>
                        <div className="text-sm text-gray-500">{incident.department}</div>
                        <div className="text-sm text-gray-500">{incident.location}</div>
                        <div className="text-sm text-gray-500">Assigned: {incident.assignedTo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                        <div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                        </div>
                        {isOverdue(incident) && (
                          <div className="text-xs text-red-600 font-medium">Overdue</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          Reported: {new Date(incident.reportedDate).toLocaleDateString()}
                        </div>
                        {incident.resolutionDate && (
                          <div className="text-sm text-gray-500">
                            Resolved: {new Date(incident.resolutionDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Cost: {formatCurrency(incident.estimatedCost)}
                        </div>
                        {incident.regulatoryReportingRequired && (
                          <div className="text-xs text-red-600 font-medium">Regulatory Report Required</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedIncident(incident)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <FileText className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incident Detail Modal */}
        {selectedIncident && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Incident Details</h3>
                  <button
                    onClick={() => setSelectedIncident(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Incident Number</label>
                      <p className="text-sm text-gray-900">#{selectedIncident.incidentNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <p className="text-sm text-gray-900">{selectedIncident.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedIncident.type)}`}>
                        {selectedIncident.type}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                        {selectedIncident.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Severity</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(selectedIncident.severity)}`}>
                        {selectedIncident.severity}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedIncident.priority)}`}>
                        {selectedIncident.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reported By</label>
                      <p className="text-sm text-gray-900">{selectedIncident.reportedBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <p className="text-sm text-gray-900">{selectedIncident.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedIncident.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                      <p className="text-sm text-gray-900">{selectedIncident.assignedTo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reported Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedIncident.reportedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estimated Cost</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedIncident.estimatedCost)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedIncident.description}</p>
                  </div>

                  {selectedIncident.affectedParties.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Affected Parties</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedIncident.affectedParties.map(party => (
                          <span key={party} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {party}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedIncident.regulatoryImpact.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Regulatory Impact</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedIncident.regulatoryImpact.map(impact => (
                          <span key={impact} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {impact}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedIncident.correctiveActions.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Corrective Actions</label>
                      <div className="space-y-2">
                        {selectedIncident.correctiveActions.map(action => (
                          <div key={action.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{action.title}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                                {action.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{action.description}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Assigned: {action.assignedTo}</span>
                              <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                              <span>Cost: {formatCurrency(action.cost)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedIncident.rootCause && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Root Cause</label>
                      <p className="text-sm text-gray-900 bg-orange-50 p-3 rounded-lg">{selectedIncident.rootCause}</p>
                    </div>
                  )}

                  {selectedIncident.resolution && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                      <p className="text-sm text-gray-900 bg-green-50 p-3 rounded-lg">{selectedIncident.resolution}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Regulatory Reporting</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedIncident.regulatoryReportingRequired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedIncident.regulatoryReportingRequired ? 'Required' : 'Not Required'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Follow Up Required</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedIncident.followUpRequired ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedIncident.followUpRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedIncident.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Incident
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Resolve Incident
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Generate Report
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

export default IncidentCompliance; 