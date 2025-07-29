import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Activity,
  FileText,
  Lock,
  Unlock,
  Users,
  Database,
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface ComplianceStats {
  totalPolicies: number;
  activePolicies: number;
  expiringPolicies: number;
  totalLicenses: number;
  activeLicenses: number;
  expiringLicenses: number;
  totalAudits: number;
  completedAudits: number;
  pendingAudits: number;
  totalIncidents: number;
  resolvedIncidents: number;
  openIncidents: number;
  complianceScore: number;
  lastAuditDate: string;
  nextAuditDate: string;
}

interface ComplianceAlert {
  id: string;
  type: 'policy_expiry' | 'license_expiry' | 'audit_due' | 'incident' | 'regulatory_update' | 'training_due';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo: string;
}

interface RecentAudit {
  id: string;
  auditNumber: string;
  title: string;
  type: 'internal' | 'external' | 'regulatory' | 'compliance';
  status: 'planned' | 'in_progress' | 'completed' | 'failed';
  auditor: string;
  startDate: string;
  endDate?: string;
  score?: number;
  findings: number;
  criticalFindings: number;
}

interface PolicyDocument {
  id: string;
  title: string;
  category: 'security' | 'operational' | 'regulatory' | 'hr' | 'financial' | 'environmental';
  status: 'active' | 'draft' | 'review' | 'expired';
  version: string;
  effectiveDate: string;
  expiryDate?: string;
  lastReviewed: string;
  nextReview: string;
  owner: string;
}

const ComplianceDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ComplianceStats>({
    totalPolicies: 0,
    activePolicies: 0,
    expiringPolicies: 0,
    totalLicenses: 0,
    activeLicenses: 0,
    expiringLicenses: 0,
    totalAudits: 0,
    completedAudits: 0,
    pendingAudits: 0,
    totalIncidents: 0,
    resolvedIncidents: 0,
    openIncidents: 0,
    complianceScore: 0,
    lastAuditDate: '',
    nextAuditDate: ''
  });
  const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>([]);
  const [recentAudits, setRecentAudits] = useState<RecentAudit[]>([]);
  const [policyDocuments, setPolicyDocuments] = useState<PolicyDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, alertsData, auditsData, policiesData] = await Promise.allSettled([
        apiService.get('/api/compliance/stats'),
        apiService.get('/api/compliance/alerts'),
        apiService.get('/api/compliance/recent-audits'),
        apiService.get('/api/compliance/policies')
      ]);
      
      // Handle stats data
      if (statsData.status === 'fulfilled') {
        setStats(statsData.value);
      } else {
        console.error('Failed to fetch stats:', statsData.reason);
        setStats({
          totalPolicies: 0,
          activePolicies: 0,
          expiringPolicies: 0,
          totalLicenses: 0,
          activeLicenses: 0,
          expiringLicenses: 0,
          totalAudits: 0,
          completedAudits: 0,
          pendingAudits: 0,
          totalIncidents: 0,
          resolvedIncidents: 0,
          openIncidents: 0,
          complianceScore: 0,
          lastAuditDate: '',
          nextAuditDate: ''
        });
      }
      
      // Handle alerts data
      if (alertsData.status === 'fulfilled') {
        setComplianceAlerts(Array.isArray(alertsData.value) ? alertsData.value : []);
      } else {
        console.error('Failed to fetch alerts:', alertsData.reason);
        setComplianceAlerts([]);
      }
      
      // Handle audits data
      if (auditsData.status === 'fulfilled') {
        setRecentAudits(Array.isArray(auditsData.value) ? auditsData.value : []);
      } else {
        console.error('Failed to fetch audits:', auditsData.reason);
        setRecentAudits([]);
      }
      
      // Handle policies data
      if (policiesData.status === 'fulfilled') {
        setPolicyDocuments(Array.isArray(policiesData.value) ? policiesData.value : []);
      } else {
        console.error('Failed to fetch policies:', policiesData.reason);
        setPolicyDocuments([]);
      }
    } catch (error) {
      console.error('Error fetching compliance dashboard data:', error);
      toast.error('Failed to fetch compliance dashboard data');
      // Set fallback empty arrays
      setComplianceAlerts([]);
      setRecentAudits([]);
      setPolicyDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getAuditStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'planned': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPolicyStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-gray-100 text-gray-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'expired': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getAlertTypeIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'policy_expiry': <FileText className="h-4 w-4" />,
      'license_expiry': <Lock className="h-4 w-4" />,
      'audit_due': <Activity className="h-4 w-4" />,
      'incident': <AlertTriangle className="h-4 w-4" />,
      'regulatory_update': <Shield className="h-4 w-4" />,
      'training_due': <Users className="h-4 w-4" />
    };
    return icons[type] || <AlertCircle className="h-4 w-4" />;
  };

  const quickActions = [
    {
      id: '1',
      title: 'New Policy',
      description: 'Create policy document',
      icon: <FileText className="h-6 w-6" />,
      action: () => toast.info('Navigate to Create Policy'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: '2',
      title: 'Schedule Audit',
      description: 'Plan compliance audit',
      icon: <Activity className="h-6 w-6" />,
      action: () => toast.info('Navigate to Schedule Audit'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: '3',
      title: 'Report Incident',
      description: 'Log compliance incident',
      icon: <AlertTriangle className="h-6 w-6" />,
      action: () => toast.info('Navigate to Report Incident'),
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: '4',
      title: 'Training Records',
      description: 'Manage training compliance',
      icon: <Users className="h-6 w-6" />,
      action: () => toast.info('Navigate to Training Records'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

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
                <Shield className="h-8 w-8 text-blue-600" />
                Compliance Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Monitor regulatory compliance and audit activities</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.complianceScore}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activePolicies}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Audits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedAudits}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Lock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Licenses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeLicenses}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.openIncidents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Audits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingAudits}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Policies</p>
                <p className="text-2xl font-bold text-gray-900">{stats.expiringPolicies}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Database className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Audits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAudits}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(action => (
              <button
                key={action.id}
                onClick={action.action}
                className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 flex flex-col items-center gap-2`}
              >
                {action.icon}
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Compliance Alerts and Recent Audits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Compliance Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Compliance Alerts</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {complianceAlerts.slice(0, 5).map(alert => (
                <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  {getAlertTypeIcon(alert.type)}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                    <div className="text-sm text-gray-600">{alert.description}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due: {new Date(alert.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {complianceAlerts.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No active alerts
                </div>
              )}
            </div>
          </div>

          {/* Recent Audits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Audits</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentAudits.slice(0, 5).map(audit => (
                <div key={audit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">#{audit.auditNumber}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAuditStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{audit.title}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{audit.type}</span>
                      <span>•</span>
                      <span>by {audit.auditor}</span>
                      <span>•</span>
                      <span>{new Date(audit.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Findings: {audit.findings}</span>
                      {audit.score && (
                        <span>Score: {audit.score}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {recentAudits.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No recent audits
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Policy Documents Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Policy Documents</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{policyDocuments.filter(p => p.category === 'security').length}</div>
              <div className="text-sm text-gray-600">Security</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{policyDocuments.filter(p => p.category === 'operational').length}</div>
              <div className="text-sm text-gray-600">Operational</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{policyDocuments.filter(p => p.category === 'regulatory').length}</div>
              <div className="text-sm text-gray-600">Regulatory</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{policyDocuments.filter(p => p.category === 'hr').length}</div>
              <div className="text-sm text-gray-600">HR</div>
            </div>
          </div>
        </div>

        {/* Compliance Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.lastAuditDate ? new Date(stats.lastAuditDate).toLocaleDateString() : 'N/A'}</div>
              <div className="text-sm text-gray-600">Last Audit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.nextAuditDate ? new Date(stats.nextAuditDate).toLocaleDateString() : 'N/A'}</div>
              <div className="text-sm text-gray-600">Next Audit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalLicenses}</div>
              <div className="text-sm text-gray-600">Total Licenses</div>
            </div>
          </div>
      </div>
    </div>
  </div>
);
};

export default ComplianceDashboard; 