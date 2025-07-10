import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertTriangle, Shield, Users, Clock, CheckCircle, XCircle, Plus, Search, Filter, Download, Eye, Edit, Trash2, FileText, MapPin, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface Incident {
  id: string;
  incidentNumber: string;
  title: string;
  description: string;
  type: 'theft' | 'vandalism' | 'trespassing' | 'assault' | 'fire' | 'medical' | 'suspicious_activity' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed' | 'escalated';
  location: string;
  reportedBy: string;
  reportedDate: string;
  assignedTo?: string;
  assignedDate?: string;
  resolvedDate?: string;
  witnesses?: string[];
  evidence?: string[];
  actionsTaken: string[];
  clientId?: string;
  clientName?: string;
  estimatedLoss?: number;
  insuranceClaim?: boolean;
  policeReport?: boolean;
  notes?: string;
}

interface Investigation {
  id: string;
  incidentId: string;
  incidentNumber: string;
  investigator: string;
  startDate: string;
  status: 'active' | 'pending' | 'completed' | 'suspended';
  findings: string;
  recommendations: string;
  evidenceCollected: string[];
  interviews: string[];
  completedDate?: string;
  notes?: string;
}

// Mock data for development
const mockIncidents: Incident[] = [
  {
    id: '1',
    incidentNumber: 'INC-2024-001',
    title: 'Suspicious Person at Mall Entrance',
    description: 'Individual loitering near main entrance, refusing to leave when approached by security. Person was eventually escorted off premises by police.',
    type: 'suspicious_activity',
    severity: 'medium',
    status: 'resolved',
    location: 'Downtown Mall - Main Entrance',
    reportedBy: 'Sarah Johnson',
    reportedDate: '2024-01-15T14:30:00',
    assignedTo: 'Michael Brown',
    assignedDate: '2024-01-15T15:00:00',
    resolvedDate: '2024-01-15T16:45:00',
    witnesses: ['John Smith', 'Lisa Davis'],
    evidence: ['CCTV footage', 'Witness statements'],
    actionsTaken: ['Approached individual', 'Called police', 'Escorted off premises'],
    clientId: '2',
    clientName: 'Mall Security LLC',
    notes: 'Individual was intoxicated and became belligerent when asked to leave.'
  },
  {
    id: '2',
    incidentNumber: 'INC-2024-002',
    title: 'Vehicle Break-in at Industrial Site',
    description: 'Employee vehicle broken into during night shift. Window smashed, personal items stolen from vehicle.',
    type: 'theft',
    severity: 'high',
    status: 'investigating',
    location: 'Industrial Security Inc - Parking Lot B',
    reportedBy: 'David Wilson',
    reportedDate: '2024-01-18T23:15:00',
    assignedTo: 'John Smith',
    assignedDate: '2024-01-19T08:00:00',
    witnesses: ['Robert Supervisor'],
    evidence: ['CCTV footage', 'Vehicle damage photos', 'Police report'],
    actionsTaken: ['Secured area', 'Contacted police', 'Documented damage'],
    clientId: '3',
    clientName: 'Industrial Security Inc',
    estimatedLoss: 2500,
    insuranceClaim: true,
    policeReport: true,
    notes: 'Police investigation ongoing. CCTV shows two suspects.'
  },
  {
    id: '3',
    incidentNumber: 'INC-2024-003',
    title: 'Medical Emergency - Heart Attack',
    description: 'Visitor collapsed in lobby area, showing signs of heart attack. Immediate medical response provided.',
    type: 'medical',
    severity: 'critical',
    status: 'resolved',
    location: 'Tech Corp - Main Lobby',
    reportedBy: 'Lisa Davis',
    reportedDate: '2024-01-20T10:45:00',
    assignedTo: 'Sarah Johnson',
    assignedDate: '2024-01-20T10:50:00',
    resolvedDate: '2024-01-20T11:30:00',
    witnesses: ['Reception staff', 'Building occupants'],
    evidence: ['Medical report', 'Witness statements'],
    actionsTaken: ['Called 911', 'Administered first aid', 'Cleared area', 'Directed ambulance'],
    clientId: '4',
    clientName: 'Tech Corp',
    notes: 'Patient stabilized and transported to hospital. Family notified.'
  },
  {
    id: '4',
    incidentNumber: 'INC-2024-004',
    title: 'Graffiti on Building Exterior',
    description: 'Vandalism discovered on east wall of building. Spray paint graffiti covering approximately 20 square feet.',
    type: 'vandalism',
    severity: 'low',
    status: 'open',
    location: 'ABC Corporation - East Wall',
    reportedBy: 'John Smith',
    reportedDate: '2024-01-22T07:30:00',
    witnesses: ['Maintenance staff'],
    evidence: ['Photos of damage', 'Area inspection'],
    actionsTaken: ['Documented damage', 'Notified client', 'Increased patrols'],
    clientId: '1',
    clientName: 'ABC Corporation',
    estimatedLoss: 800,
    notes: 'Client requested immediate cleanup. Graffiti removal scheduled.'
  },
  {
    id: '5',
    incidentNumber: 'INC-2024-005',
    title: 'Unauthorized Access Attempt',
    description: 'Individual attempted to access restricted area using fake credentials. Access denied and individual detained.',
    type: 'trespassing',
    severity: 'medium',
    status: 'investigating',
    location: 'Tech Corp - Server Room Access',
    reportedBy: 'Michael Brown',
    reportedDate: '2024-01-25T16:20:00',
    assignedTo: 'David Wilson',
    assignedDate: '2024-01-25T16:30:00',
    witnesses: ['IT staff', 'Security team'],
    evidence: ['CCTV footage', 'Fake credentials', 'Access logs'],
    actionsTaken: ['Detained individual', 'Contacted police', 'Enhanced security measures'],
    clientId: '4',
    clientName: 'Tech Corp',
    policeReport: true,
    notes: 'Individual claimed to be IT contractor. Investigation revealed fake credentials.'
  }
];

const mockInvestigations: Investigation[] = [
  {
    id: '1',
    incidentId: '2',
    incidentNumber: 'INC-2024-002',
    investigator: 'John Smith',
    startDate: '2024-01-19',
    status: 'active',
    findings: 'CCTV footage shows two suspects approaching vehicle at 11:30 PM. Vehicle was parked in poorly lit area.',
    recommendations: 'Install additional lighting in parking area. Increase patrol frequency during night shifts.',
    evidenceCollected: ['CCTV footage', 'Vehicle damage photos', 'Witness statements'],
    interviews: ['Vehicle owner', 'Night shift workers', 'Maintenance staff'],
    notes: 'Police have identified potential suspects from CCTV footage.'
  },
  {
    id: '2',
    incidentId: '5',
    incidentNumber: 'INC-2024-005',
    investigator: 'David Wilson',
    startDate: '2024-01-25',
    status: 'active',
    findings: 'Individual had sophisticated fake credentials. Attempted access during business hours.',
    recommendations: 'Implement additional verification for IT contractors. Review access control procedures.',
    evidenceCollected: ['Fake credentials', 'CCTV footage', 'Access logs'],
    interviews: ['IT staff', 'Security team', 'Building management'],
    notes: 'Credentials appeared authentic but failed verification checks.'
  }
];

const Incidents: React.FC = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [investigations, setInvestigations] = useState<Investigation[]>(mockInvestigations);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [activeTab, setActiveTab] = useState<'incidents' | 'investigations' | 'reports'>('incidents');

  const canManageIncidents = user?.role === 'system_admin' || user?.role === 'operations_supervisor' || user?.role === 'asset_manager';

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalIncidents = () => {
    return incidents.length;
  };

  const getOpenIncidents = () => {
    return incidents.filter(incident => incident.status === 'open').length;
  };

  const getInvestigatingIncidents = () => {
    return incidents.filter(incident => incident.status === 'investigating').length;
  };

  const getResolvedIncidents = () => {
    return incidents.filter(incident => incident.status === 'resolved').length;
  };

  const getCriticalIncidents = () => {
    return incidents.filter(incident => incident.severity === 'critical').length;
  };

  const getTotalLoss = () => {
    return incidents.reduce((total, incident) => total + (incident.estimatedLoss || 0), 0);
  };

  const getAverageResolutionTime = () => {
    const resolvedIncidents = incidents.filter(incident => incident.resolvedDate);
    if (resolvedIncidents.length === 0) return 0;
    
    const totalHours = resolvedIncidents.reduce((total, incident) => {
      const reported = new Date(incident.reportedDate);
      const resolved = new Date(incident.resolvedDate!);
      return total + (resolved.getTime() - reported.getTime()) / (1000 * 60 * 60);
    }, 0);
    
    return Math.round(totalHours / resolvedIncidents.length);
  };

  const handleDeleteIncident = (incidentId: string) => {
    if (confirm('Are you sure you want to delete this incident?')) {
      setIncidents(incidents.filter(incident => incident.id !== incidentId));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theft': return <Shield className="w-5 h-5" />;
      case 'vandalism': return <AlertTriangle className="w-5 h-5" />;
      case 'trespassing': return <Users className="w-5 h-5" />;
      case 'assault': return <AlertCircle className="w-5 h-5" />;
      case 'fire': return <AlertTriangle className="w-5 h-5" />;
      case 'medical': return <AlertCircle className="w-5 h-5" />;
      case 'suspicious_activity': return <Shield className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Incident Reporting</h1>
            <p className="text-gray-600 mt-1">Track security incidents, investigations, and response protocols</p>
          </div>
          {canManageIncidents && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Report Incident</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalIncidents()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Cases</p>
              <p className="text-2xl font-bold text-gray-900">{getOpenIncidents()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Investigation</p>
              <p className="text-2xl font-bold text-gray-900">{getInvestigatingIncidents()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{getResolvedIncidents()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('incidents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'incidents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Incidents
            </button>
            <button
              onClick={() => setActiveTab('investigations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'investigations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Investigations
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="trespassing">Trespassing</option>
            <option value="assault">Assault</option>
            <option value="fire">Fire</option>
            <option value="medical">Medical</option>
            <option value="suspicious_activity">Suspicious Activity</option>
            <option value="other">Other</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            <option value="escalated">Escalated</option>
          </select>

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'incidents' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getTypeIcon(incident.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                          <div className="text-sm text-gray-500">{incident.incidentNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{incident.type.replace('_', ' ')}</div>
                      {incident.clientName && (
                        <div className="text-sm text-gray-500">{incident.clientName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{incident.reportedBy}</div>
                      <div className="text-sm text-gray-500">{formatDate(incident.reportedDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelectedIncident(incident)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {canManageIncidents && (
                          <>
                            <button
                              onClick={() => setSelectedIncident(incident)}
                              className="text-yellow-600 hover:text-yellow-900 p-1"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteIncident(incident.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredIncidents.length} of {incidents.length} incidents
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'investigations' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigator</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investigations.map((investigation) => (
                  <tr key={investigation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">INV-{investigation.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{investigation.incidentNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{investigation.investigator}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(investigation.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        investigation.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        investigation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        investigation.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {investigation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {investigation.evidenceCollected.length} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Incidents</span>
                <span className="font-semibold">{getTotalIncidents()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Open Cases</span>
                <span className="font-semibold text-red-600">{getOpenIncidents()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Under Investigation</span>
                <span className="font-semibold text-yellow-600">{getInvestigatingIncidents()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolved</span>
                <span className="font-semibold text-green-600">{getResolvedIncidents()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Critical Incidents</span>
                <span className="font-semibold text-red-600">{getCriticalIncidents()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Losses</span>
                <span className="font-semibold">{formatCurrency(getTotalLoss())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Resolution Time</span>
                <span className="font-semibold">{getAverageResolutionTime()} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolution Rate</span>
                <span className="font-semibold">{((getResolvedIncidents() / getTotalIncidents()) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Report New Incident</h3>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Type</option>
                      <option value="theft">Theft</option>
                      <option value="vandalism">Vandalism</option>
                      <option value="trespassing">Trespassing</option>
                      <option value="assault">Assault</option>
                      <option value="fire">Fire</option>
                      <option value="medical">Medical</option>
                      <option value="suspicious_activity">Suspicious Activity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client (if applicable)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Client</option>
                      <option>ABC Corporation</option>
                      <option>Mall Security LLC</option>
                      <option>Industrial Security Inc</option>
                      <option>Tech Corp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Loss</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actions Taken</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Witnesses</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Separate with commas" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Evidence</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="CCTV, photos, etc." />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Police Report Filed</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Insurance Claim</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Report Incident
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Incidents; 