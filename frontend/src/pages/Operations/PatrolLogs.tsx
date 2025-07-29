import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  Building,
  Shield,
  Car,
  Route,
  Activity,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface PatrolLog {
  id: string;
  guardId: string;
  guardName: string;
  siteId: string;
  siteName: string;
  routeId: string;
  routeName: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'in_progress' | 'completed' | 'cancelled' | 'interrupted';
  checkpoints: Checkpoint[];
  incidents: Incident[];
  observations: Observation[];
  weather: string;
  notes: string;
  equipment: string[];
  vehicleId?: string;
  vehicleName?: string;
}

interface Checkpoint {
  id: string;
  name: string;
  location: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'pending' | 'completed' | 'missed' | 'delayed';
  notes: string;
  photos?: string[];
}

interface Incident {
  id: string;
  type: 'suspicious_activity' | 'security_breach' | 'equipment_failure' | 'medical_emergency' | 'fire' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  time: string;
  actionTaken: string;
  reportedTo: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  photos?: string[];
}

interface Observation {
  id: string;
  type: 'general' | 'maintenance' | 'safety' | 'security';
  description: string;
  location: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'addressed' | 'closed';
}

interface Route {
  id: string;
  name: string;
  siteId: string;
  siteName: string;
  checkpoints: RouteCheckpoint[];
  estimatedDuration: number;
  frequency: 'hourly' | 'every_2_hours' | 'every_4_hours' | 'daily';
  status: 'active' | 'inactive' | 'maintenance';
}

interface RouteCheckpoint {
  id: string;
  name: string;
  location: string;
  order: number;
  estimatedTime: number;
  instructions: string;
}

const PatrolLogs: React.FC = () => {
  const { user } = useAuth();
  const [patrolLogs, setPatrolLogs] = useState<PatrolLog[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuard, setSelectedGuard] = useState('all');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAddLog, setShowAddLog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<PatrolLog | null>(null);

  useEffect(() => {
    fetchPatrolData();
  }, []);

  const fetchPatrolData = async () => {
    try {
      setLoading(true);
      const [logsData, routesData] = await Promise.all([
        apiService.get('/api/patrol-logs'),
        apiService.get('/api/patrol-routes')
      ]);
      setPatrolLogs(logsData);
      setRoutes(routesData);
    } catch (error) {
      console.error('Error fetching patrol data:', error);
      toast.error('Failed to fetch patrol data');
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = patrolLogs.filter(log =>
    log.guardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(log =>
    selectedGuard === 'all' || log.guardId === selectedGuard
  ).filter(log =>
    selectedSite === 'all' || log.siteId === selectedSite
  ).filter(log =>
    selectedStatus === 'all' || log.status === selectedStatus
  ).filter(log =>
    !selectedDate || log.startTime.startsWith(selectedDate)
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'interrupted': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCheckpointStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-gray-100 text-gray-800',
      'completed': 'bg-green-100 text-green-800',
      'missed': 'bg-red-100 text-red-800',
      'delayed': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  const getObservationPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const calculateCompletionRate = (log: PatrolLog) => {
    const totalCheckpoints = (log.checkpoints || []).length;
    const completedCheckpoints = (log.checkpoints || []).filter(cp => cp.status === 'completed').length;
    return totalCheckpoints > 0 ? Math.round((completedCheckpoints / totalCheckpoints) * 100) : 0;
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
                <MapPin className="h-8 w-8 text-blue-600" />
                Patrol Logs
              </h1>
              <p className="text-gray-600 mt-2">Track patrol activities and security routes</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddLog(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Patrol Log
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
                <Route className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patrols</p>
                <p className="text-2xl font-bold text-gray-900">{patrolLogs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patrolLogs.filter(p => p.status === 'completed').length}
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
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patrolLogs.filter(p => p.status === 'in_progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Incidents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patrolLogs.reduce((sum, log) => sum + (log.incidents || []).length, 0)}
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
                  placeholder="Search guards, sites, or routes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedGuard}
                onChange={(e) => setSelectedGuard(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Guards</option>
                {Array.from(new Set(patrolLogs.map(p => p.guardId))).map(guardId => {
                  const log = patrolLogs.find(p => p.guardId === guardId);
                  return (
                    <option key={guardId} value={guardId}>{log?.guardName}</option>
                  );
                })}
              </select>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sites</option>
                {Array.from(new Set(patrolLogs.map(p => p.siteId))).map(siteId => {
                  const log = patrolLogs.find(p => p.siteId === siteId);
                  return (
                    <option key={siteId} value={siteId}>{log?.siteName}</option>
                  );
                })}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="interrupted">Interrupted</option>
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

        {/* Patrol Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guard
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site & Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Checkpoints
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
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{log.guardName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.siteName}</div>
                        <div className="text-sm text-gray-500">{log.routeName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(log.startTime).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(log.startTime)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {log.duration ? `${log.duration} min` : 'In Progress'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {(log.checkpoints || []).filter(cp => cp.status === 'completed').length}/{(log.checkpoints || []).length}
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculateCompletionRate(log)}% complete
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{(log.incidents || []).length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedLog(log)}
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

        {/* Patrol Log Detail Modal */}
        {selectedLog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Patrol Log Details</h3>
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guard</label>
                      <p className="text-sm text-gray-900">{selectedLog.guardName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Site</label>
                      <p className="text-sm text-gray-900">{selectedLog.siteName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Route</label>
                      <p className="text-sm text-gray-900">{selectedLog.routeName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLog.status)}`}>
                        {selectedLog.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Time</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedLog.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <p className="text-sm text-gray-900">
                        {selectedLog.duration ? `${selectedLog.duration} minutes` : 'In Progress'}
                      </p>
                    </div>
                  </div>

                  {(selectedLog.checkpoints?.length || 0) > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Checkpoints</label>
                      <div className="space-y-2">
                        {(selectedLog.checkpoints || []).map(checkpoint => (
                          <div key={checkpoint.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{checkpoint.name}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCheckpointStatusColor(checkpoint.status)}`}>
                                {checkpoint.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{checkpoint.location}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Scheduled: {formatTime(checkpoint.scheduledTime)}</span>
                              {checkpoint.actualTime && (
                                <span>Actual: {formatTime(checkpoint.actualTime)}</span>
                              )}
                            </div>
                            {checkpoint.notes && (
                              <p className="text-xs text-gray-600 mt-1">{checkpoint.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedLog.incidents?.length || 0) > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Incidents</label>
                      <div className="space-y-2">
                        {(selectedLog.incidents || []).map(incident => (
                          <div key={incident.id} className="bg-red-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{incident.type}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getIncidentSeverityColor(incident.severity)}`}>
                                {incident.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{incident.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Location: {incident.location}</span>
                              <span>Time: {formatTime(incident.time)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Action: {incident.actionTaken}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedLog.observations?.length || 0) > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Observations</label>
                      <div className="space-y-2">
                        {(selectedLog.observations || []).map(observation => (
                          <div key={observation.id} className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{observation.type}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getObservationPriorityColor(observation.priority)}`}>
                                {observation.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{observation.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Location: {observation.location}</span>
                              <span>Time: {formatTime(observation.time)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weather</label>
                      <p className="text-sm text-gray-900">{selectedLog.weather || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                      <p className="text-sm text-gray-900">{selectedLog.vehicleName || 'N/A'}</p>
                    </div>
                  </div>

                  {(selectedLog.equipment?.length || 0) > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Used</label>
                      <div className="flex flex-wrap gap-1">
                        {(selectedLog.equipment || []).map(item => (
                          <span key={item} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <Shield className="h-3 w-3 mr-1" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLog.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Log
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Complete Patrol
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download Report
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

export default PatrolLogs; 