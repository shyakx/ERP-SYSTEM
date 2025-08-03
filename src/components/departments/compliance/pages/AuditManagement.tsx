import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  Download,
  Upload,
  Settings,
  BookOpen,
  Users,
  Lock,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

const AuditManagement: React.FC = () => {
  const colorScheme = getColorScheme('compliance');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const auditStats = [
    { title: 'Total Audits', value: '15', subtitle: 'This year', color: 'blue', icon: '📋', trend: { value: '+2', isPositive: true }, delay: 0 },
    { title: 'In Progress', value: '3', subtitle: 'Active audits', color: 'orange', icon: '⏳', trend: { value: '-1', isPositive: true }, delay: 100 },
    { title: 'Completed', value: '12', subtitle: 'Finished audits', color: 'green', icon: '✅', trend: { value: '+3', isPositive: true }, delay: 200 },
    { title: 'Compliance Rate', value: '94%', subtitle: 'Overall score', color: 'purple', icon: '📊', trend: { value: '+2%', isPositive: true }, delay: 300 }
  ];

  const audits = [
    {
      id: 1,
      title: 'Data Protection Compliance Audit',
      type: 'Internal',
      status: 'In Progress',
      auditor: 'Jean Pierre Uwimana',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 65,
      complianceScore: 92,
      findings: 8,
      criticalIssues: 1,
      location: 'Kigali Office',
      scope: 'Data protection and privacy compliance'
    },
    {
      id: 2,
      title: 'Financial Reporting Audit',
      type: 'External',
      status: 'Completed',
      auditor: 'External Audit Firm',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      progress: 100,
      complianceScore: 96,
      findings: 3,
      criticalIssues: 0,
      location: 'All Locations',
      scope: 'Financial reporting and controls'
    },
    {
      id: 3,
      title: 'Workplace Safety Audit',
      type: 'Internal',
      status: 'Scheduled',
      auditor: 'Marie Claire Niyonsaba',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      progress: 0,
      complianceScore: 0,
      findings: 0,
      criticalIssues: 0,
      location: 'All Facilities',
      scope: 'Safety protocols and equipment'
    },
    {
      id: 4,
      title: 'IT Security Audit',
      type: 'External',
      status: 'Completed',
      auditor: 'Cybersecurity Consultants',
      startDate: '2024-01-05',
      endDate: '2024-01-20',
      progress: 100,
      complianceScore: 88,
      findings: 12,
      criticalIssues: 2,
      location: 'IT Infrastructure',
      scope: 'Information security and access controls'
    },
    {
      id: 5,
      title: 'Regulatory Compliance Review',
      type: 'Internal',
      status: 'In Progress',
      auditor: 'Patrick Nshimiyimana',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      progress: 35,
      complianceScore: 78,
      findings: 15,
      criticalIssues: 3,
      location: 'All Departments',
      scope: 'Regulatory compliance across all areas'
    }
  ];

  const auditTypes = [
    { type: 'Internal', count: 8, color: 'bg-blue-100 text-blue-800' },
    { type: 'External', count: 5, color: 'bg-green-100 text-green-800' },
    { type: 'Regulatory', count: 2, color: 'bg-purple-100 text-purple-800' }
  ];

  const upcomingAudits = [
    {
      id: 1,
      title: 'Workplace Safety Audit',
      startDate: '2024-02-01',
      auditor: 'Marie Claire Niyonsaba',
      type: 'Internal',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Regulatory Compliance Review',
      startDate: '2024-01-20',
      auditor: 'Patrick Nshimiyimana',
      type: 'Internal',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Annual Financial Audit',
      startDate: '2024-03-01',
      auditor: 'External Audit Firm',
      type: 'External',
      priority: 'Medium'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Internal': return 'bg-blue-100 text-blue-800';
      case 'External': return 'bg-green-100 text-green-800';
      case 'Regulatory': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Audit Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {auditStats.map((stat, index) => (
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

      {/* Audit Management Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common audit management tasks"
        color="blue"
        icon="📋"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Schedule audit')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Audit
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Export data')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Audit Types */}
      <AnimatedCard
        title="Audit Types"
        subtitle="Distribution of audits by type"
        color="green"
        icon="📊"
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {auditTypes.map((type, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${type.color}`}>
                {type.type}
              </div>
              <div className="text-2xl font-bold text-gray-900">{type.count}</div>
              <div className="text-xs text-gray-500">audits</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Audits Table */}
      <AnimatedCard
        title="Audit Management"
        subtitle="Current audits and their status"
        color="orange"
        icon="📋"
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {audits.map((audit) => (
                <tr key={audit.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{audit.title}</div>
                      <div className="text-xs text-gray-500">{audit.scope}</div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <User className="w-3 h-3 mr-1" />
                        {audit.auditor}
                        <MapPin className="w-3 h-3 ml-2 mr-1" />
                        {audit.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(audit.type)}`}>
                      {audit.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(audit.status)}`}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${audit.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{audit.progress}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {audit.startDate} - {audit.endDate}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${audit.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{audit.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{audit.findings} findings</div>
                    {audit.criticalIssues > 0 && (
                      <div className="text-xs text-red-600">{audit.criticalIssues} critical</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Upcoming Audits */}
      <AnimatedCard
        title="Upcoming Audits"
        subtitle="Scheduled audits"
        color="red"
        icon="⏰"
        delay={1000}
      >
        <div className="space-y-3">
          {upcomingAudits.map((audit) => (
            <div key={audit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{audit.title}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(audit.type)}`}>
                    {audit.type}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(audit.priority)}`}>
                    {audit.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Start: {audit.startDate} • Auditor: {audit.auditor}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 text-xs">View</button>
                <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-xs">Schedule</button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Audit Metrics */}
      <AnimatedCard
        title="Audit Management Metrics"
        subtitle="Overall audit performance"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-green-600">Compliance Rate</div>
            <AnimatedProgressBar progress={94} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-blue-600">Total Audits</div>
            <AnimatedProgressBar progress={75} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-purple-600">In Progress</div>
            <AnimatedProgressBar progress={20} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AuditManagement;
