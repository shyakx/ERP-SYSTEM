import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  AlertTriangle, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  Shield,
  Settings
} from 'lucide-react';

const IncidentReporting: React.FC = () => {
  const colorScheme = getColorScheme('compliance');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const incidentStats = [
    { title: 'Total Incidents', value: '47', subtitle: 'This month', color: 'red', icon: '🚨', trend: { value: '+3', isPositive: false }, delay: 0 },
    { title: 'Resolved', value: '32', subtitle: 'Successfully', color: 'green', icon: '✅', trend: { value: '+5', isPositive: true }, delay: 100 },
    { title: 'Under Investigation', value: '8', subtitle: 'Active cases', color: 'orange', icon: '🔍', trend: { value: '-2', isPositive: true }, delay: 200 },
    { title: 'High Priority', value: '7', subtitle: 'Critical cases', color: 'red', icon: '⚠️', trend: { value: '+1', isPositive: false }, delay: 300 }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Unauthorized Access Attempt',
      type: 'Security Breach',
      severity: 'High',
      status: 'Under Investigation',
      reportedBy: 'Jean Pierre Uwimana',
      location: 'Kigali Office',
      date: '2024-01-15',
      description: 'Multiple failed login attempts detected from unknown IP address',
      assignedTo: 'Security Team',
      priority: 'Critical',
      estimatedResolution: '2024-01-20'
    },
    {
      id: 2,
      title: 'Data Protection Violation',
      type: 'Policy Violation',
      severity: 'Medium',
      status: 'Resolved',
      reportedBy: 'Marie Claire Niyonsaba',
      location: 'Huye Branch',
      date: '2024-01-12',
      description: 'Employee accessed client data without proper authorization',
      assignedTo: 'HR Department',
      priority: 'High',
      estimatedResolution: '2024-01-14'
    },
    {
      id: 3,
      title: 'Equipment Misuse',
      type: 'Asset Misuse',
      severity: 'Low',
      status: 'Resolved',
      reportedBy: 'Patrick Nshimiyimana',
      location: 'Musanze Office',
      date: '2024-01-10',
      description: 'Company equipment used for personal purposes',
      assignedTo: 'IT Department',
      priority: 'Medium',
      estimatedResolution: '2024-01-11'
    },
    {
      id: 4,
      title: 'Regulatory Non-Compliance',
      type: 'Regulatory Issue',
      severity: 'High',
      status: 'Under Investigation',
      reportedBy: 'Emmanuel Ndayisaba',
      location: 'Rubavu Branch',
      date: '2024-01-08',
      description: 'Failure to meet regulatory reporting deadlines',
      assignedTo: 'Compliance Team',
      priority: 'Critical',
      estimatedResolution: '2024-01-18'
    },
    {
      id: 5,
      title: 'Workplace Safety Concern',
      type: 'Safety Issue',
      severity: 'Medium',
      status: 'In Progress',
      reportedBy: 'Alexis Nkurunziza',
      location: 'Kigali Warehouse',
      date: '2024-01-05',
      description: 'Safety equipment not properly maintained',
      assignedTo: 'Facilities Team',
      priority: 'High',
      estimatedResolution: '2024-01-12'
    }
  ];

  const incidentTypes = [
    { type: 'Security Breach', count: 12, color: 'bg-red-100 text-red-800' },
    { type: 'Policy Violation', count: 18, color: 'bg-orange-100 text-orange-800' },
    { type: 'Regulatory Issue', count: 8, color: 'bg-blue-100 text-blue-800' },
    { type: 'Asset Misuse', count: 6, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Safety Issue', count: 3, color: 'bg-purple-100 text-purple-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Incident Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {incidentStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Incident Management Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common incident management tasks"
        color="red"
        icon="🚨"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log('Report new incident')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Report Incident
          </AnimatedButton>
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('View all incidents')}
          >
            <Eye className="w-4 h-4 mr-2" />
            View All
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Export reports')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export Reports
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Incident Types Overview */}
      <AnimatedCard
        title="Incident Types"
        subtitle="Distribution of incidents by type"
        color="blue"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {incidentTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">incidents</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Recent Incidents Table */}
      <AnimatedCard
        title="Recent Incidents"
        subtitle="Latest compliance incidents and their status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                      <div className="text-xs text-gray-500">{incident.description}</div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <User className="w-3 h-3 mr-1" />
                        {incident.reportedBy}
                        <MapPin className="w-3 h-3 ml-2 mr-1" />
                        {incident.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {incident.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(incident.priority)}`}>
                      {incident.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{incident.assignedTo}</div>
                    <div className="text-xs text-gray-500">Due: {incident.estimatedResolution}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Compliance Metrics */}
      <AnimatedCard
        title="Compliance Metrics"
        subtitle="Key performance indicators for incident management"
        color="green"
        icon="📈"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">68%</div>
            <div className="text-sm text-green-600">Resolution Rate</div>
            <AnimatedProgressBar progress={68} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3 days</div>
            <div className="text-sm text-blue-600">Avg Resolution Time</div>
            <AnimatedProgressBar progress={75} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <div className="text-sm text-purple-600">Compliance Score</div>
            <AnimatedProgressBar progress={94} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default IncidentReporting;
