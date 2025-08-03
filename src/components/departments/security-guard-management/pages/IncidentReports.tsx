import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  AlertCircle,
  Shield,
  Building,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Download,
  FileText,
  Camera,
  Video
} from 'lucide-react';

const IncidentReports: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock Rwandan incident data
  const incidents = [
    {
      id: 1,
      type: 'Suspicious Activity',
      location: 'Kigali Business Center',
      guard: 'Jean Pierre Uwimana',
      date: '2024-08-01',
      time: '14:30',
      severity: 'Low',
      status: 'Resolved',
      description: 'Suspicious person loitering around the main entrance. Guard approached and person left without incident.',
      actions: 'Guard monitored the area for 30 minutes. No further suspicious activity.',
      supervisor: 'Emmanuel Ndayisaba',
      witnesses: ['Security Camera', 'Reception Staff'],
      attachments: ['photo_1.jpg', 'report.pdf']
    },
    {
      id: 2,
      type: 'Unauthorized Access',
      location: 'Huye Mall',
      guard: 'Emmanuel Ndayisaba',
      date: '2024-08-01',
      time: '22:15',
      severity: 'Medium',
      status: 'Under Investigation',
      description: 'Individual attempted to access restricted area without proper authorization.',
      actions: 'Guard detained individual and contacted local police. Investigation ongoing.',
      supervisor: 'Regional Manager',
      witnesses: ['Security Camera', 'Night Staff'],
      attachments: ['video_1.mp4', 'statement.pdf']
    },
    {
      id: 3,
      type: 'Medical Emergency',
      location: 'Musanze Office Complex',
      guard: 'Patrick Nshimiyimana',
      date: '2024-08-01',
      time: '09:45',
      severity: 'High',
      status: 'Resolved',
      description: 'Visitor collapsed in the lobby area. Immediate medical attention required.',
      actions: 'Guard called emergency services and provided first aid. Ambulance arrived within 8 minutes.',
      supervisor: 'Local Supervisor',
      witnesses: ['Office Staff', 'Other Visitors'],
      attachments: ['medical_report.pdf', 'witness_statement.pdf']
    },
    {
      id: 4,
      type: 'Property Damage',
      location: 'Rubavu Shopping Center',
      guard: 'Alexis Nkurunziza',
      date: '2024-07-31',
      time: '16:20',
      severity: 'Medium',
      status: 'Resolved',
      description: 'Vehicle damaged security barrier during parking incident.',
      actions: 'Guard documented damage and contacted vehicle owner. Insurance claim filed.',
      supervisor: 'Local Supervisor',
      witnesses: ['Security Camera', 'Parking Attendant'],
      attachments: ['damage_photos.jpg', 'insurance_form.pdf']
    },
    {
      id: 5,
      type: 'Fire Alarm',
      location: 'Kigali Mall',
      guard: 'Chantal Mukamana',
      date: '2024-07-31',
      time: '11:30',
      severity: 'High',
      status: 'Resolved',
      description: 'Fire alarm activated in the food court area. Immediate evacuation required.',
      actions: 'Guard initiated evacuation protocol and contacted fire department. False alarm confirmed.',
      supervisor: 'Emmanuel Ndayisaba',
      witnesses: ['Mall Staff', 'Shoppers'],
      attachments: ['evacuation_log.pdf', 'fire_dept_report.pdf']
    }
  ];

  const incidentStats = [
    { title: 'Total Incidents', value: '24', change: '+3', icon: AlertTriangle, color: 'text-red-600' },
    { title: 'Resolved', value: '18', change: '+2', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Under Investigation', value: '4', change: '+1', icon: Clock, color: 'text-orange-600' },
    { title: 'Response Time', value: '4.2min', change: '-0.8min', icon: TrendingUp, color: 'text-blue-600' }
  ];

  const severityBreakdown = [
    { severity: 'Low', count: 12, percentage: 50, color: 'bg-green-500' },
    { severity: 'Medium', count: 8, percentage: 33, color: 'bg-yellow-500' },
    { severity: 'High', count: 4, percentage: 17, color: 'bg-red-500' }
  ];

  const recentAlerts = [
    {
      type: 'Suspicious Activity',
      location: 'Kigali Business Center',
      time: '2 hours ago',
      status: 'Active'
    },
    {
      type: 'Unauthorized Access',
      location: 'Huye Mall',
      time: '4 hours ago',
      status: 'Resolved'
    },
    {
      type: 'Medical Emergency',
      location: 'Musanze Office Complex',
      time: '6 hours ago',
      status: 'Resolved'
    }
  ];

  const filteredIncidents = incidents.filter(incident => {
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-600 mt-2">Track and manage security incidents across all locations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Report Incident</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {incidentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Resolved">Resolved</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredIncidents.length} of {incidents.length} incidents</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Reports */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Incident Reports</h2>
            <p className="text-sm text-gray-600 mt-1">Detailed incident reports and investigations</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div key={incident.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{incident.type}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {incident.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {incident.guard}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {incident.date} at {incident.time}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-900 font-medium mb-1">Description:</p>
                        <p className="text-sm text-gray-600">{incident.description}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-900 font-medium mb-1">Actions Taken:</p>
                        <p className="text-sm text-gray-600">{incident.actions}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Supervisor</p>
                          <p className="font-medium">{incident.supervisor}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Witnesses</p>
                          <p className="font-medium">{incident.witnesses.length}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Attachments</p>
                          <p className="font-medium">{incident.attachments.length}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Report ID</p>
                          <p className="font-medium">#{incident.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{alert.type}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Severity Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Severity Breakdown</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {severityBreakdown.map((item) => (
                  <div key={item.severity} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{item.severity}</h3>
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
            <Plus className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Report Incident</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <FileText className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Generate Report</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Resolve Incident</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Camera className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Evidence</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReports;
