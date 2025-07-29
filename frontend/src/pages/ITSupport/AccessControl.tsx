import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Users, 
  Shield, 
  Eye, 
  EyeOff, 
  Key, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';

interface AccessControl {
  id: string;
  userId: string;
  userName: string;
  role: string;
  permissions: string[];
  lastAccess: string;
  status: 'active' | 'suspended' | 'expired';
  ipAddress: string;
  location: string;
  device: string;
}

const AccessControlPage: React.FC = () => {
  const [accessControls, setAccessControls] = useState<AccessControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAccessControls();
  }, []);

  const fetchAccessControls = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockData: AccessControl[] = [
        {
          id: '1',
          userId: 'DIC001',
          userName: 'Alice Uwimana',
          role: 'HR Manager',
          permissions: ['read', 'write', 'admin'],
          lastAccess: '2024-01-31T10:30:00Z',
          status: 'active',
          ipAddress: '192.168.1.100',
          location: 'Kigali, Main Office',
          device: 'Windows 10 - Chrome'
        },
        {
          id: '2',
          userId: 'DIC013',
          userName: 'Alice Umutoni',
          role: 'System Admin',
          permissions: ['read', 'write', 'admin', 'super_admin'],
          lastAccess: '2024-01-31T09:15:00Z',
          status: 'active',
          ipAddress: '192.168.1.101',
          location: 'Kigali, IT Office',
          device: 'MacOS - Safari'
        },
        {
          id: '3',
          userId: 'DIC004',
          userName: 'Eric Niyonshuti',
          role: 'Operations Supervisor',
          permissions: ['read', 'write'],
          lastAccess: '2024-01-30T16:45:00Z',
          status: 'suspended',
          ipAddress: '192.168.1.102',
          location: 'Kigali, Operations',
          device: 'Windows 10 - Firefox'
        }
      ];
      setAccessControls(mockData);
    } catch (error) {
      console.error('Error fetching access controls:', error);
      toast.error('Failed to fetch access controls');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'suspended': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'expired': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredAccessControls = accessControls.filter(control => {
    const matchesSearch = control.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || control.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSuspendUser = (userId: string) => {
    toast.info(`Suspending user ${userId}`);
  };

  const handleActivateUser = (userId: string) => {
    toast.info(`Activating user ${userId}`);
  };

  const handleRevokeAccess = (userId: string) => {
    toast.info(`Revoking access for user ${userId}`);
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
                <Lock className="h-8 w-8 text-blue-600" />
                Access Control
              </h1>
              <p className="text-gray-600 mt-2">Manage user access permissions and security settings</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Access
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Access Control Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">User Access Controls</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccessControls.map((control) => (
                  <tr key={control.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{control.userName}</div>
                        <div className="text-sm text-gray-500">{control.userId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{control.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {control.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(control.lastAccess).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{control.ipAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(control.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                          {control.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{control.location}</div>
                      <div className="text-sm text-gray-500">{control.device}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {control.status === 'active' ? (
                          <button
                            onClick={() => handleSuspendUser(control.userId)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivateUser(control.userId)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleRevokeAccess(control.userId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControlPage; 