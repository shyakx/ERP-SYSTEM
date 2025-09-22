import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Database,
  RefreshCw,
  AlertCircle,
  Info,
  Loader2
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';
import { auditAPI } from '../../../services/api';

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
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  // Fetch audit logs from API
  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        action: filterStatus !== 'all' ? filterStatus : undefined,
        start_date: dateRange === 'today' ? new Date().toISOString().split('T')[0] : undefined,
        end_date: dateRange === 'today' ? new Date().toISOString().split('T')[0] : undefined
      };

      const response = await auditAPI.getLogs(params);
      if (response.data.success && response.data.data) {
        setAuditLogs(response.data.data.items || []);
        if (response.data.data.pagination) {
          setPagination(prev => ({
            ...prev,
            total: response.data.data.pagination.total || 0,
            totalPages: response.data.data.pagination.totalPages || 0
          }));
        }
      }
    } catch (err: any) {
      console.error('Error fetching audit logs:', err);
      setError(err.response?.data?.message || 'Failed to fetch audit logs');
      // Fallback to mock data if API fails
      setAuditLogs([
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
          timestamp: '2024-02-15 11:15:30',
          user: 'Claudine Uwimana',
          department: 'Human Resources',
          action: 'Employee Created',
          resource: 'HR Database',
          details: 'New employee record created for John Doe',
          ipAddress: '192.168.1.101',
          userAgent: 'Firefox/121.0.0.0',
          status: 'success',
          severity: 'medium'
        },
        {
          id: '3',
          timestamp: '2024-02-15 14:22:45',
          user: 'System',
          department: 'System',
          action: 'Failed Login Attempt',
          resource: 'Authentication',
          details: 'Multiple failed login attempts detected',
          ipAddress: '192.168.1.200',
          userAgent: 'Unknown',
          status: 'error',
          severity: 'high'
        }
      ]);
      setPagination(prev => ({
        ...prev,
        total: 3,
        totalPages: 1
      }));
    } finally {
      setLoading(false);
    }
  };

  // Fetch audit stats
  const fetchAuditStats = async () => {
    try {
      const response = await auditAPI.getStats();
      if (response.data.success && response.data.data) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      console.error('Error fetching audit stats:', err);
      // Fallback to mock stats
      setStats({
        total: 10,
        actionStats: [
          { action: 'User Login', count: 5 },
          { action: 'Employee Created', count: 2 },
          { action: 'Budget Approval', count: 1 }
        ],
        topUsers: [
          { user: 'Jean Ndayisaba', count: 3 },
          { user: 'Claudine Uwimana', count: 2 }
        ]
      });
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchAuditLogs();
    fetchAuditStats();
  }, [pagination.page, searchTerm, filterStatus, dateRange]);

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
      default: return Clock;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-orange-700 bg-orange-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesDepartment = filterDepartment === 'all' || log.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesSeverity && matchesDepartment;
  });

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Department', 'Action', 'Resource', 'Details', 'IP Address', 'Status', 'Severity'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.department,
        log.action,
        log.resource,
        log.details,
        log.ipAddress,
        log.status,
        log.severity
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Monitor system activities and security events</p>
        </div>
        <div className="flex items-center space-x-3">
          <AnimatedButton
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => { fetchAuditLogs(); fetchAuditStats(); }}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <AnimatedCard className="p-4">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Success</p>
                <p className="text-2xl font-bold text-gray-900">{stats.success || 0}</p>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.warning || 0}</p>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="p-4">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.error || 0}</p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {/* Filters */}
      <AnimatedCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </AnimatedCard>

      {/* Error Message */}
      {error && (
        <AnimatedCard className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </AnimatedCard>
      )}

      {/* Audit Logs Table */}
      <AnimatedCard className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Audit Logs</h3>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading audit logs...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const StatusIcon = getStatusIcon(log.status);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.resource}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No audit logs found</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-700">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                {pagination.page}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </AnimatedCard>
    </div>
  );
};

export default AuditLogs;