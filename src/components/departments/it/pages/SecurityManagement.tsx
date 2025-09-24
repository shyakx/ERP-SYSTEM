import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Key, 
  Activity, 
  BarChart3,
  Settings,
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  Database,
  Server,
  Globe,
  FileText
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'access' | 'threat' | 'policy';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user: string;
  ipAddress: string;
  timestamp: string;
  status: 'resolved' | 'investigating' | 'open';
}

interface AccessControl {
  id: string;
  resource: string;
  user: string;
  permission: 'read' | 'write' | 'admin';
  grantedBy: string;
  grantedAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'revoked';
}

const SecurityManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'access' | 'policies'>('events');
  
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'threat',
      severity: 'high',
      description: 'Multiple failed login attempts detected',
      user: 'unknown',
      ipAddress: '192.168.1.100',
      timestamp: '2024-01-15 10:30:00',
      status: 'investigating'
    },
    {
      id: '2',
      type: 'access',
      severity: 'medium',
      description: 'Unauthorized access attempt to admin panel',
      user: 'john.doe',
      ipAddress: '192.168.1.101',
      timestamp: '2024-01-15 09:45:00',
      status: 'resolved'
    },
    {
      id: '3',
      type: 'login',
      severity: 'low',
      description: 'Successful login from new device',
      user: 'jane.smith',
      ipAddress: '192.168.1.102',
      timestamp: '2024-01-15 08:20:00',
      status: 'resolved'
    }
  ]);

  const [accessControls, setAccessControls] = useState<AccessControl[]>([
    {
      id: '1',
      resource: 'ERP Database',
      user: 'admin@dicel.co.rw',
      permission: 'admin',
      grantedBy: 'system',
      grantedAt: '2024-01-01 00:00:00',
      expiresAt: '2024-12-31 23:59:59',
      status: 'active'
    },
    {
      id: '2',
      resource: 'HR Module',
      user: 'hr.manager@dicel.co.rw',
      permission: 'write',
      grantedBy: 'admin@dicel.co.rw',
      grantedAt: '2024-01-10 10:00:00',
      expiresAt: '2024-06-30 23:59:59',
      status: 'active'
    },
    {
      id: '3',
      resource: 'Finance Reports',
      user: 'finance.manager@dicel.co.rw',
      permission: 'read',
      grantedBy: 'admin@dicel.co.rw',
      grantedAt: '2024-01-05 14:30:00',
      expiresAt: '2024-03-31 23:59:59',
      status: 'active'
    }
  ]);

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
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'write': return 'bg-yellow-100 text-yellow-800';
      case 'read': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Management</h1>
          <p className="text-gray-600">Monitor security events, manage access controls, and enforce policies</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <Shield className="w-4 h-4" />
            <span>Run Security Scan</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Security Report</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Security Score"
          subtitle="Overall security health"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-500">Good security posture</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Threats"
          subtitle="Current security issues"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-500">1 high, 2 medium</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Access Controls"
          subtitle="Active permissions"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-500">Active access grants</p>
            </div>
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Last Scan"
          subtitle="Security assessment"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">2h ago</p>
              <p className="text-sm text-gray-500">No issues found</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Security Events</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('access')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'access'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>Access Control</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'policies'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Security Policies</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Events</h3>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          event.severity === 'critical' ? 'bg-red-500' :
                          event.severity === 'high' ? 'bg-orange-500' :
                          event.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{event.description}</h4>
                          <p className="text-sm text-gray-500">User: {event.user} | IP: {event.ipAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Type: {event.type}</span>
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'access' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Access Control</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Resource</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Permission</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Granted By</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Expires</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessControls.map((access) => (
                      <tr key={access.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{access.resource}</td>
                        <td className="py-3 px-4 text-gray-900">{access.user}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPermissionColor(access.permission)}`}>
                            {access.permission}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{access.grantedBy}</td>
                        <td className="py-3 px-4 text-gray-900">{access.expiresAt}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(access.status)}`}>
                            {access.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard
                  title="Password Policy"
                  subtitle="Authentication requirements"
                  className="bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Minimum Length</span>
                      <span className="font-medium">8 characters</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Complexity</span>
                      <span className="font-medium">Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Expiration</span>
                      <span className="font-medium">90 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard
                  title="Access Control Policy"
                  subtitle="Resource permissions"
                  className="bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Default Access</span>
                      <span className="font-medium">Read Only</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Admin Access</span>
                      <span className="font-medium">2FA Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Session Timeout</span>
                      <span className="font-medium">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </span>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityManagement;
