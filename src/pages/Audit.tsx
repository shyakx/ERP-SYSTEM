import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Shield, Users, FileText, AlertTriangle, Eye, Download, Filter, Search, Clock, User, Database, Lock, Unlock, Settings, Trash2, Edit, Plus } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  module: 'authentication' | 'employees' | 'shifts' | 'attendance' | 'payroll' | 'clients' | 'invoicing' | 'assets' | 'incidents' | 'documents' | 'reports' | 'settings' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  affectedRecord?: string;
  oldValue?: string;
  newValue?: string;
  status: 'success' | 'failure' | 'warning';
}

interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: 'login_attempt' | 'logout' | 'password_change' | 'permission_change' | 'data_access' | 'system_config' | 'data_export' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: string;
  userName?: string;
  ipAddress: string;
  location?: string;
  status: 'resolved' | 'investigating' | 'open' | 'false_positive';
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-01-31T14:30:00',
    userId: 'user1',
    userName: 'John Smith',
    userRole: 'system_admin',
    action: 'login',
    module: 'authentication',
    severity: 'low',
    description: 'User logged in successfully',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_123456789',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2024-01-31T14:35:00',
    userId: 'user1',
    userName: 'John Smith',
    userRole: 'system_admin',
    action: 'create',
    module: 'employees',
    severity: 'medium',
    description: 'Created new employee record: Sarah Johnson',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_123456789',
    affectedRecord: 'EMP-2024-001',
    newValue: '{"name":"Sarah Johnson","email":"sarah.johnson@company.com"}',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2024-01-31T14:40:00',
    userId: 'user2',
    userName: 'Sarah Johnson',
    userRole: 'operations_supervisor',
    action: 'update',
    module: 'shifts',
    severity: 'medium',
    description: 'Updated shift schedule for week of Jan 29',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    sessionId: 'sess_987654321',
    affectedRecord: 'SHIFT-2024-005',
    oldValue: '{"startTime":"08:00","endTime":"16:00"}',
    newValue: '{"startTime":"09:00","endTime":"17:00"}',
    status: 'success'
  },
  {
    id: '4',
    timestamp: '2024-01-31T14:45:00',
    userId: 'user3',
    userName: 'Michael Brown',
    userRole: 'security_guard',
    action: 'view',
    module: 'incidents',
    severity: 'low',
    description: 'Viewed incident report INC-2024-002',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_456789123',
    affectedRecord: 'INC-2024-002',
    status: 'success'
  },
  {
    id: '5',
    timestamp: '2024-01-31T14:50:00',
    userId: 'user4',
    userName: 'Lisa Davis',
    userRole: 'finance_manager',
    action: 'export',
    module: 'reports',
    severity: 'high',
    description: 'Exported financial report for January 2024',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_789123456',
    affectedRecord: 'REP-2024-001',
    status: 'success'
  },
  {
    id: '6',
    timestamp: '2024-01-31T14:55:00',
    userId: 'user5',
    userName: 'David Wilson',
    userRole: 'it_support_officer',
    action: 'delete',
    module: 'documents',
    severity: 'high',
    description: 'Deleted document: Old Policy Document',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    sessionId: 'sess_321654987',
    affectedRecord: 'DOC-2023-015',
    oldValue: '{"title":"Old Policy Document","status":"archived"}',
    status: 'success'
  },
  {
    id: '7',
    timestamp: '2024-01-31T15:00:00',
    userId: 'unknown',
    userName: 'Unknown User',
    userRole: 'unknown',
    action: 'login_attempt',
    module: 'authentication',
    severity: 'medium',
    description: 'Failed login attempt for user: admin',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_failed_001',
    status: 'failure'
  },
  {
    id: '8',
    timestamp: '2024-01-31T15:05:00',
    userId: 'user1',
    userName: 'John Smith',
    userRole: 'system_admin',
    action: 'permission_change',
    module: 'system',
    severity: 'critical',
    description: 'Changed user permissions for Sarah Johnson',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    sessionId: 'sess_123456789',
    affectedRecord: 'USER-002',
    oldValue: '{"role":"security_guard","permissions":["view_incidents"]}',
    newValue: '{"role":"operations_supervisor","permissions":["view_incidents","manage_employees","view_reports"]}',
    status: 'success'
  }
];

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-31T15:00:00',
    eventType: 'login_attempt',
    severity: 'medium',
    description: 'Multiple failed login attempts from IP 203.0.113.45',
    ipAddress: '203.0.113.45',
    location: 'Unknown',
    status: 'investigating'
  },
  {
    id: '2',
    timestamp: '2024-01-31T14:55:00',
    eventType: 'data_export',
    severity: 'high',
    description: 'Large data export by finance manager',
    userId: 'user4',
    userName: 'Lisa Davis',
    ipAddress: '192.168.1.103',
    location: 'Office Network',
    status: 'resolved'
  },
  {
    id: '3',
    timestamp: '2024-01-31T14:50:00',
    eventType: 'permission_change',
    severity: 'critical',
    description: 'User role changed from security_guard to operations_supervisor',
    userId: 'user2',
    userName: 'Sarah Johnson',
    ipAddress: '192.168.1.100',
    location: 'Office Network',
    status: 'resolved'
  },
  {
    id: '4',
    timestamp: '2024-01-31T14:45:00',
    eventType: 'suspicious_activity',
    severity: 'high',
    description: 'Unusual access pattern detected for user account',
    userId: 'user3',
    userName: 'Michael Brown',
    ipAddress: '192.168.1.102',
    location: 'Office Network',
    status: 'investigating'
  }
];

const Audit: React.FC = () => {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [activeTab, setActiveTab] = useState<'audit_logs' | 'security_events' | 'compliance'>('audit_logs');

  const canViewAuditTrail = user?.role === 'system_admin' || user?.role === 'it_support_officer';

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesModule && matchesSeverity && matchesStatus;
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
      case 'success': return 'bg-green-100 text-green-800';
      case 'failure': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'authentication': return <Shield className="w-5 h-5" />;
      case 'employees': return <Users className="w-5 h-5" />;
      case 'shifts': return <Clock className="w-5 h-5" />;
      case 'attendance': return <Clock className="w-5 h-5" />;
      case 'payroll': return <FileText className="w-5 h-5" />;
      case 'clients': return <Users className="w-5 h-5" />;
      case 'invoicing': return <FileText className="w-5 h-5" />;
      case 'assets': return <FileText className="w-5 h-5" />;
      case 'incidents': return <AlertTriangle className="w-5 h-5" />;
      case 'documents': return <FileText className="w-5 h-5" />;
      case 'reports': return <FileText className="w-5 h-5" />;
      case 'settings': return <Settings className="w-5 h-5" />;
      case 'system': return <Database className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
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

  const getTotalLogs = () => auditLogs.length;
  const getCriticalLogs = () => auditLogs.filter(log => log.severity === 'critical').length;
  const getFailedLogs = () => auditLogs.filter(log => log.status === 'failure').length;
  const getSecurityEvents = () => securityEvents.length;

  const getRecentActivity = () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    return auditLogs.filter(log => new Date(log.timestamp) > oneHourAgo).length;
  };

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
            <p className="text-gray-600 mt-1">Monitor system activities, security events, and compliance logs</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalLogs()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Events</p>
              <p className="text-2xl font-bold text-gray-900">{getCriticalLogs()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Security Events</p>
              <p className="text-2xl font-bold text-gray-900">{getSecurityEvents()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Activity</p>
              <p className="text-2xl font-bold text-gray-900">{getRecentActivity()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('audit_logs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'audit_logs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Audit Logs
            </button>
            <button
              onClick={() => setActiveTab('security_events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security_events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security Events
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compliance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Compliance
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Modules</option>
            <option value="authentication">Authentication</option>
            <option value="employees">Employees</option>
            <option value="shifts">Shifts</option>
            <option value="attendance">Attendance</option>
            <option value="payroll">Payroll</option>
            <option value="clients">Clients</option>
            <option value="invoicing">Invoicing</option>
            <option value="assets">Assets</option>
            <option value="incidents">Incidents</option>
            <option value="documents">Documents</option>
            <option value="reports">Reports</option>
            <option value="settings">Settings</option>
            <option value="system">System</option>
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
            <option value="success">Success</option>
            <option value="failure">Failure</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'audit_logs' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                      <div className="text-sm text-gray-500">{log.userRole}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{log.action}</div>
                      <div className="text-sm text-gray-500">{log.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getModuleIcon(log.module)}
                        </div>
                        <div className="ml-2 text-sm text-gray-900 capitalize">{log.module}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(log)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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
                Showing {filteredAuditLogs.length} of {auditLogs.length} logs
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

      {activeTab === 'security_events' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securityEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(event.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{event.eventType.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event.userName || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        event.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        event.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                        event.status === 'open' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-green-800">Data Access Logging</div>
                  <div className="text-sm text-green-600">All data access is properly logged</div>
                </div>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-green-800">User Authentication</div>
                  <div className="text-sm text-green-600">Multi-factor authentication enabled</div>
                </div>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-semibold text-yellow-800">Data Retention</div>
                  <div className="text-sm text-yellow-600">Review retention policies</div>
                </div>
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-green-800">Audit Trail</div>
                  <div className="text-sm text-green-600">Complete audit trail maintained</div>
                </div>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Failed Login Attempts</span>
                <span className="font-semibold text-red-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Suspicious Activities</span>
                <span className="font-semibold text-yellow-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Exports</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Permission Changes</span>
                <span className="font-semibold text-blue-600">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">System Config Changes</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Details Modal */}
      {showDetailsModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Audit Log Details</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Timestamp</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedLog.timestamp)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">User</label>
                      <p className="text-sm text-gray-900">{selectedLog.userName} ({selectedLog.userRole})</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Action</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedLog.action}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Module</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedLog.module}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-sm text-gray-900">{selectedLog.description}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Technical Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">IP Address</label>
                      <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">User Agent</label>
                      <p className="text-sm text-gray-900">{selectedLog.userAgent}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Session ID</label>
                      <p className="text-sm text-gray-900">{selectedLog.sessionId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Severity</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(selectedLog.severity)}`}>
                        {selectedLog.severity}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLog.status)}`}>
                        {selectedLog.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedLog.affectedRecord && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-4">Record Changes</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Affected Record</label>
                        <p className="text-sm text-gray-900">{selectedLog.affectedRecord}</p>
                      </div>
                      {selectedLog.oldValue && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Previous Value</label>
                          <pre className="text-sm text-gray-900 bg-gray-50 p-2 rounded mt-1 overflow-x-auto">{selectedLog.oldValue}</pre>
                        </div>
                      )}
                      {selectedLog.newValue && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">New Value</label>
                          <pre className="text-sm text-gray-900 bg-gray-50 p-2 rounded mt-1 overflow-x-auto">{selectedLog.newValue}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audit; 