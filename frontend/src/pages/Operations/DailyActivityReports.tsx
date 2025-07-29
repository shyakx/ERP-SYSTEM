import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  FileText,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Car,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface DailyReport {
  id: string;
  date: string;
  siteId: string;
  siteName: string;
  guardId: string;
  guardName: string;
  shiftType: 'morning' | 'afternoon' | 'night' | 'overtime';
  startTime: string;
  endTime: string;
  totalHours: number;
  activities: Activity[];
  incidents: Incident[];
  equipmentChecks: EquipmentCheck[];
  vehicleLogs: VehicleLog[];
  weather: string;
  notes: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

interface Activity {
  id: string;
  type: 'patrol' | 'inspection' | 'maintenance' | 'incident_response' | 'training' | 'administrative';
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'completed' | 'in_progress' | 'cancelled';
  notes: string;
}

interface Incident {
  id: string;
  type: 'theft' | 'vandalism' | 'trespassing' | 'fire' | 'medical' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  time: string;
  location: string;
  actionTaken: string;
  reportedTo: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
}

interface EquipmentCheck {
  id: string;
  equipmentType: string;
  equipmentName: string;
  status: 'operational' | 'maintenance_required' | 'out_of_service';
  checkTime: string;
  notes: string;
}

interface VehicleLog {
  id: string;
  vehicleName: string;
  startTime: string;
  endTime: string;
  mileage: number;
  fuelLevel: number;
  issues: string[];
  status: 'operational' | 'maintenance_required' | 'out_of_service';
}

const DailyActivityReports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedGuard, setSelectedGuard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAddReport, setShowAddReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<DailyReport | null>(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/api/daily-reports');
      setReports(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast.error('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report =>
    report.guardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.siteName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(report =>
    selectedSite === 'all' || report.siteId === selectedSite
  ).filter(report =>
    selectedGuard === 'all' || report.guardId === selectedGuard
  ).filter(report =>
    selectedStatus === 'all' || report.status === selectedStatus
  ).filter(report =>
    !selectedDate || report.date === selectedDate
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'submitted': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getShiftTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'morning': 'bg-orange-100 text-orange-800',
      'afternoon': 'bg-yellow-100 text-yellow-800',
      'night': 'bg-indigo-100 text-indigo-800',
      'overtime': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getIncidentSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getEquipmentStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'operational': 'bg-green-100 text-green-800',
      'maintenance_required': 'bg-yellow-100 text-yellow-800',
      'out_of_service': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const calculateTotalActivities = (report: DailyReport) => {
    return (report.activities || []).length;
  };

  const calculateTotalIncidents = (report: DailyReport) => {
    return (report.incidents || []).length;
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
                <FileText className="h-8 w-8 text-blue-600" />
                Daily Activity Reports
              </h1>
              <p className="text-gray-600 mt-2">Generate and review daily security activity reports</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddReport(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Report
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export All
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'approved').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'submitted').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.reduce((sum, report) => sum + calculateTotalActivities(report), 0)}
                </p>
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
                  placeholder="Search guards, sites, or report content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sites</option>
                {Array.from(new Set(reports.map(r => r.siteId))).map(siteId => {
                  const report = reports.find(r => r.siteId === siteId);
                  return (
                    <option key={siteId} value={siteId}>{report?.siteName}</option>
                  );
                })}
              </select>
              <select
                value={selectedGuard}
                onChange={(e) => setSelectedGuard(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Guards</option>
                {Array.from(new Set(reports.map(r => r.guardId))).map(guardId => {
                  const report = reports.find(r => r.guardId === guardId);
                  return (
                    <option key={guardId} value={guardId}>{report?.guardName}</option>
                  );
                })}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guard
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shift
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incidents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map(report => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(report.startTime)} - {formatTime(report.endTime)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.guardName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.siteName}</div>
                        <div className="text-sm text-gray-500">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          Location
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getShiftTypeColor(report.shiftType)}`}>
                        {report.shiftType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.totalHours}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{calculateTotalActivities(report)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{calculateTotalIncidents(report)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedReport.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guard</label>
                      <p className="text-sm text-gray-900">{selectedReport.guardName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Site</label>
                      <p className="text-sm text-gray-900">{selectedReport.siteName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Shift</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getShiftTypeColor(selectedReport.shiftType)}`}>
                        {selectedReport.shiftType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <p className="text-sm text-gray-900">
                        {formatTime(selectedReport.startTime)} - {formatTime(selectedReport.endTime)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Hours</label>
                      <p className="text-sm text-gray-900">{selectedReport.totalHours}h</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weather</label>
                      <p className="text-sm text-gray-900">{selectedReport.weather}</p>
                    </div>
                  </div>

                  {(selectedReport.activities || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                      <div className="space-y-2">
                        {(selectedReport.activities || []).map(activity => (
                          <div key={activity.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{activity.type}</span>
                              <span className="text-xs text-gray-500">
                                {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Location: {activity.location}</span>
                              <span>Status: {activity.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedReport.incidents || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Incidents</label>
                      <div className="space-y-2">
                        {(selectedReport.incidents || []).map(incident => (
                          <div key={incident.id} className="bg-red-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{incident.type}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getIncidentSeverityColor(incident.severity)}`}>
                                {incident.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{incident.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Time: {formatTime(incident.time)}</span>
                              <span>Status: {incident.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedReport.equipmentChecks || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Checks</label>
                      <div className="space-y-2">
                        {(selectedReport.equipmentChecks || []).map(check => (
                          <div key={check.id} className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{check.equipmentName}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEquipmentStatusColor(check.status)}`}>
                                {check.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{check.notes}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              Checked at: {formatTime(check.checkTime)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedReport.vehicleLogs || []).length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Logs</label>
                      <div className="space-y-2">
                        {(selectedReport.vehicleLogs || []).map(log => (
                          <div key={log.id} className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{log.vehicleName}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEquipmentStatusColor(log.status)}`}>
                                {log.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                              <div>Mileage: {log.mileage} km</div>
                              <div>Fuel Level: {log.fuelLevel}%</div>
                            </div>
                            {(log.issues || []).length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Issues: {(log.issues || []).join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedReport.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Report
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Approve Report
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download PDF
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

export default DailyActivityReports; 