import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  FileText,
  Shield
} from 'lucide-react';

interface IncidentReport {
  id: string;
  title: string;
  description: string;
  type: 'security' | 'safety' | 'theft' | 'vandalism' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  reportedBy: string;
  reportedDate: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo: string;
  resolution?: string;
  witnesses?: string[];
  evidence?: string[];
}

const IncidentReports: React.FC = () => {
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([
    {
      id: '1',
      title: 'Unauthorized Access Attempt',
      description: 'Individual attempted to enter restricted area without proper authorization. Security guard intervened and individual left premises.',
      type: 'security',
      severity: 'medium',
      location: 'Main Gate - Kigali Office',
      reportedBy: 'Jean Baptiste',
      reportedDate: '2024-01-15 14:30',
      status: 'investigating',
      assignedTo: 'Paul Mugenzi',
      witnesses: ['Marie Claire', 'Peter Nkurunziza'],
      evidence: ['CCTV footage', 'Security log']
    },
    {
      id: '2',
      title: 'Vehicle Break-in',
      description: 'Suspicious activity around employee parking area. One vehicle showed signs of tampering.',
      type: 'theft',
      severity: 'high',
      location: 'Employee Parking - Kigali Office',
      reportedBy: 'Grace Mukamana',
      reportedDate: '2024-01-15 12:15',
      status: 'open',
      assignedTo: 'Sarah Uwimana',
      witnesses: ['David Nkurunziza'],
      evidence: ['CCTV footage', 'Vehicle inspection report']
    },
    {
      id: '3',
      title: 'Minor Vandalism',
      description: 'Graffiti found on exterior wall. No damage to property structure.',
      type: 'vandalism',
      severity: 'low',
      location: 'North Perimeter Wall - Kigali Office',
      reportedBy: 'Peter Nkurunziza',
      reportedDate: '2024-01-14 18:45',
      status: 'resolved',
      assignedTo: 'Paul Mugenzi',
      resolution: 'Graffiti removed, area cleaned. No further action required.',
      witnesses: ['Jean Baptiste'],
      evidence: ['Photos', 'Cleaning report']
    },
    {
      id: '4',
      title: 'Fire Alarm Activation',
      description: 'False alarm triggered in building. All personnel evacuated safely. System reset after inspection.',
      type: 'safety',
      severity: 'medium',
      location: 'Main Building - Kigali Office',
      reportedBy: 'Marie Claire',
      reportedDate: '2024-01-14 10:20',
      status: 'closed',
      assignedTo: 'Jean Claude',
      resolution: 'False alarm confirmed. Fire system inspected and reset. No fire hazard found.',
      witnesses: ['All building occupants'],
      evidence: ['Fire system log', 'Inspection report']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-red-100 text-red-800';
      case 'safety': return 'bg-orange-100 text-orange-800';
      case 'theft': return 'bg-purple-100 text-purple-800';
      case 'vandalism': return 'bg-yellow-100 text-yellow-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
      case 'closed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'investigating': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAddIncident = () => {
    setShowAddModal(true);
  };

  const handleViewIncident = (incident: IncidentReport) => {
    setSelectedIncident(incident);
  };

  const handleEditIncident = (incident: IncidentReport) => {
    // Implement edit functionality
    console.log('Edit incident:', incident);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incident Reports</h2>
          <p className="text-gray-600">Manage and track security incidents and reports</p>
        </div>
        <AnimatedButton
          onClick={handleAddIncident}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Report Incident</span>
        </AnimatedButton>
      </div>

      {/* Incident Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Incidents"
          subtitle="All reported incidents"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{incidentReports.length}</p>
              <p className="text-sm text-gray-500">Total incidents</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Open Cases"
          subtitle="Requiring attention"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {incidentReports.filter(i => i.status === 'open').length}
              </p>
              <p className="text-sm text-gray-500">Open cases</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Under Investigation"
          subtitle="Being investigated"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {incidentReports.filter(i => i.status === 'investigating').length}
              </p>
              <p className="text-sm text-gray-500">Investigating</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Resolved"
          subtitle="Completed cases"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {incidentReports.filter(i => i.status === 'resolved' || i.status === 'closed').length}
              </p>
              <p className="text-sm text-gray-500">Resolved</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Incident Reports Table */}
      <AnimatedCard
        title="Incident Reports"
        subtitle="Security incident tracking and management"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Incident</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Severity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Reported By</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidentReports.map((incident) => (
                <tr key={incident.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{incident.title}</p>
                      <p className="text-sm text-gray-500">{incident.reportedDate}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(incident.type)}`}>
                      {incident.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{incident.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{incident.reportedBy}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {getStatusIcon(incident.status)}
                      <span className="ml-1 capitalize">{incident.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewIncident(incident)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditIncident(incident)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Incident Report Details</h3>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Incident Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-gray-900">{selectedIncident.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900">{selectedIncident.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedIncident.type)}`}>
                      {selectedIncident.type}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Severity</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(selectedIncident.severity)}`}>
                      {selectedIncident.severity}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-gray-900">{selectedIncident.location}</p>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Status Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                      {getStatusIcon(selectedIncident.status)}
                      <span className="ml-1 capitalize">{selectedIncident.status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reported By</label>
                    <p className="text-gray-900">{selectedIncident.reportedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reported Date</label>
                    <p className="text-gray-900">{selectedIncident.reportedDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <p className="text-gray-900">{selectedIncident.assignedTo}</p>
                  </div>
                  {selectedIncident.resolution && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resolution</label>
                      <p className="text-gray-900">{selectedIncident.resolution}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Witnesses */}
            {selectedIncident.witnesses && selectedIncident.witnesses.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Witnesses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedIncident.witnesses.map((witness, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{witness}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evidence */}
            {selectedIncident.evidence && selectedIncident.evidence.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Evidence</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedIncident.evidence.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditIncident(selectedIncident)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Incident
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReports;
