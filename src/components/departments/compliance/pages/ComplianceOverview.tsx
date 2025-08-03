import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Eye,
  TrendingUp,
  AlertCircle,
  Calendar,
  BarChart3,
  Settings
} from 'lucide-react';

const ComplianceOverview: React.FC = () => {
  const stats = [
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+2%',
      changeType: 'positive',
      icon: Shield,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Audits',
      value: '3',
      change: '0',
      changeType: 'neutral',
      icon: Eye,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Reviews',
      value: '12',
      change: '-3',
      changeType: 'positive',
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Risk Level',
      value: 'Low',
      change: 'Stable',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      type: 'Security Breach',
      severity: 'Medium',
      status: 'Investigating',
      date: '2024-01-15',
      description: 'Unauthorized access attempt detected'
    },
    {
      id: 2,
      type: 'Policy Violation',
      severity: 'Low',
      status: 'Resolved',
      date: '2024-01-12',
      description: 'Employee accessed restricted area'
    },
    {
      id: 3,
      type: 'Data Protection',
      severity: 'High',
      status: 'Under Review',
      date: '2024-01-10',
      description: 'Potential data exposure incident'
    }
  ];

  const upcomingAudits = [
    {
      id: 1,
      type: 'Security Audit',
      date: '2024-01-25',
      auditor: 'External Security Firm',
      status: 'Scheduled'
    },
    {
      id: 2,
      type: 'Compliance Review',
      date: '2024-01-30',
      auditor: 'Internal Team',
      status: 'Preparing'
    },
    {
      id: 3,
      type: 'Policy Assessment',
      date: '2024-02-05',
      auditor: 'Regulatory Body',
      status: 'Scheduled'
    }
  ];

  const complianceAreas = [
    { name: 'Security Standards', score: 95, status: 'Compliant' },
    { name: 'Data Protection', score: 88, status: 'Compliant' },
    { name: 'Employee Training', score: 92, status: 'Compliant' },
    { name: 'Incident Response', score: 85, status: 'Needs Attention' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor compliance status and manage regulatory requirements.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover-lift">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Incidents */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Recent Incidents</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-slide-in-left">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        incident.severity === 'High' ? 'bg-red-100' :
                        incident.severity === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <AlertCircle className={`w-5 h-5 ${
                          incident.severity === 'High' ? 'text-red-600' :
                          incident.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{incident.type}</p>
                        <p className="text-xs text-gray-500">{incident.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{incident.date}</p>
                      <span className={`text-xs ${
                        incident.status === 'Resolved' ? 'text-green-600' :
                        incident.status === 'Investigating' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Audits */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Audits</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {upcomingAudits.map((audit) => (
                  <div key={audit.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{audit.type}</p>
                      <p className="text-xs text-gray-500">{audit.auditor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{audit.date}</p>
                      <span className="badge-info">{audit.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Create Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Schedule Audit</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Report Incident</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Update Policies</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Areas */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Areas</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceAreas.map((area, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <h4 className="text-sm font-medium text-gray-900">{area.name}</h4>
                <p className="text-2xl font-bold text-gray-900 mt-2">{area.score}%</p>
                <p className="text-xs text-gray-500 mt-1">{area.status}</p>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        area.score >= 90 ? 'bg-green-600' :
                        area.score >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${area.score}%` }}
                    ></div>
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

export default ComplianceOverview; 