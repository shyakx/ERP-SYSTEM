import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building,
  Shield,
  Database,
  Settings,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  Trash2,
  Edit,
  Lock,
  Unlock,
  Plus,
  Minus,
  AlertCircle,
  Info
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  department: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'warning' | 'error' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  // Mock audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-02-15 10:30:15',
      user: 'Jean Ndayisaba',
      department: 'Administration',
      action: 'User Login',
      resource: 'System Access',
      details: 'Successful login from 192.168.1.100',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      status: 'success',
      severity: 'low'
    },
    {
      id: '2',
      timestamp: '2024-02-15 10:25:42',
      user: 'Claudine Uwimana',
      department: 'Human Resources',
      action: 'Employee Created',
      resource: 'Employee Management',
      details: 'Created new employee: John Doe (ID: EMP001)',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/121.0.0.0',
      status: 'success',
      severity: 'medium'
    },
    {
      id: '3',
      timestamp: '2024-02-15 10:20:18',
      user: 'Emmanuel Rugamba',
      department: 'Finance',
      action: 'Budget Approval',
      resource: 'Financial Management',
      details: 'Approved budget request: Q1 2024 Marketing Budget',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/17.2.0.0',
      status: 'success',
      severity: 'high'
    },
    {
      id: '4',
      timestamp: '2024-02-15 10:15:33',
      user: 'Eric Niyonsenga',
      department: 'Information Technology',
      action: 'System Configuration',
      resource: 'System Settings',
      details: 'Updated database connection settings',
      ipAddress: '192.168.1.103',
      userAgent: 'Chrome/120.0.0.0',
      status: 'success',
      severity: 'high'
    },
    {
      id: '5',
      timestamp: '2024-02-15 10:10:55',
      user: 'Patrick Mugisha',
      department: 'Security',
      action: 'Security Alert',
      resource: 'Security Monitoring',
      details: 'Multiple failed login attempts detected',
      ipAddress: '192.168.1.104',
      userAgent: 'Unknown',
      status: 'warning',
      severity: 'critical'
    },
    {
      id: '6',
      timestamp: '2024-02-15 10:05:27',
      user: 'Marie Mukamana',
      department: 'Operations',
      action: 'Inventory Update',
      resource: 'Inventory Management',
      details: 'Updated stock levels for 15 items',
      ipAddress: '192.168.1.105',
      userAgent: 'Edge/120.0.0.0',
      status: 'success',
      severity: 'medium'
    },
    {
      id: '7',
      timestamp: '2024-02-15 10:00:12',
      user: 'David Habyarimana',
      department: 'Sales',
      action: 'Sales Report Generated',
      resource: 'Sales Analytics',
      details: 'Generated monthly sales report for January 2024',
      ipAddress: '192.168.1.106',
      userAgent: 'Chrome/120.0.0.0',
      status: 'success',
      severity: 'low'
    },
    {
      id: '8',
      timestamp: '2024-02-15 09:55:38',
      user: 'Ange Uwase',
      department: 'Risk Management',
      action: 'Risk Assessment',
      resource: 'Risk Management',
      details: 'Completed quarterly risk assessment report',
      ipAddress: '192.168.1.107',
      userAgent: 'Firefox/121.0.0.0',
      status: 'success',
      severity: 'high'
    },
    {
      id: '9',
      timestamp: '2024-02-15 09:50:21',
      user: 'Unknown',
      department: 'System',
      action: 'Failed Login Attempt',
      resource: 'Authentication',
      details: 'Failed login attempt for user: admin@dicel.co.rw',
      ipAddress: '203.0.113.45',
      userAgent: 'Unknown',
      status: 'error',
      severity: 'medium'
    },
    {
      id: '10',
      timestamp: '2024-02-15 09:45:14',
      user: 'System',
      department: 'System',
      action: 'Backup Completed',
      resource: 'System Maintenance',
      details: 'Daily backup completed successfully',
      ipAddress: '192.168.1.1',
      userAgent: 'System',
      status: 'success',
      severity: 'low'
    }
  ];

  const departments = [
    'Administration',
    'Human Resources',
    'Finance',
    'Information Technology',
    'Security',
    'Operations',
    'Sales',
    'Risk Management',
    'System'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-600 bg-emerald-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-100 text-emerald-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesDepartment = filterDepartment === 'all' || log.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesSeverity && matchesDepartment;
  });

  const stats = {
    total: auditLogs.length,
    success: auditLogs.filter(log => log.status === 'success').length,
    warning: auditLogs.filter(log => log.status === 'warning').length,
    error: auditLogs.filter(log => log.status === 'error').length,
    critical: auditLogs.filter(log => log.severity === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit & Logs</h1>
          <p className="text-gray-600">Track all system activities, user actions, and security events</p>
        </div>
        <div className="flex items-center space-x-3">
          <AnimatedButton className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </AnimatedButton>
          <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success</p>
              <p className="text-2xl font-bold text-green-600">{stats.success}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.warning}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-red-600">{stats.error}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatedCard title="Filters & Search">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="info">Info</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </AnimatedCard>

      {/* Audit Logs Table */}
      <AnimatedCard title={`Audit Logs (${filteredLogs.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Resource</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Severity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const StatusIcon = getStatusIcon(log.status);
                return (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{log.user}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.department}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">{log.action}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900">{log.resource}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {log.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadge(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded" title="View Details">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Export">
                          <Download className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="More">
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Security Alerts */}
      <AnimatedCard title="Recent Security Alerts">
        <div className="space-y-4">
          {auditLogs.filter(log => log.severity === 'critical' || log.status === 'error').slice(0, 5).map((log) => {
            const StatusIcon = getStatusIcon(log.status);
            return (
              <div key={log.id} className="flex items-center space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <StatusIcon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{log.action}</h3>
                  <p className="text-sm text-gray-600">{log.details}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {log.timestamp} • {log.user} • IP: {log.ipAddress}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(log.severity)}`}>
                    {log.severity}
                  </span>
                  <button className="p-1 hover:bg-red-100 rounded">
                    <Eye className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AuditLogs;
