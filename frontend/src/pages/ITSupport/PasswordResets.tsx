import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'react-toastify';

interface PasswordReset {
  id: string;
  userId: string;
  userName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedBy: string;
  approvedBy?: string;
  approvalDate?: string;
  reason?: string;
}

const PasswordResetsPage: React.FC = () => {
  const [passwordResets, setPasswordResets] = useState<PasswordReset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchPasswordResets();
  }, []);

  const fetchPasswordResets = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockData: PasswordReset[] = [
        {
          id: '1',
          userId: 'DIC001',
          userName: 'Alice Uwimana',
          requestDate: '2024-01-31T10:30:00Z',
          status: 'pending',
          requestedBy: 'Alice Uwimana',
          reason: 'Forgot password'
        },
        {
          id: '2',
          userId: 'DIC004',
          userName: 'Eric Niyonshuti',
          requestDate: '2024-01-30T14:20:00Z',
          status: 'approved',
          requestedBy: 'Eric Niyonshuti',
          approvedBy: 'Alice Umutoni',
          approvalDate: '2024-01-30T15:00:00Z',
          reason: 'Account locked due to multiple failed attempts'
        },
        {
          id: '3',
          userId: 'DIC007',
          userName: 'Diane Uwase',
          requestDate: '2024-01-29T09:15:00Z',
          status: 'completed',
          requestedBy: 'Diane Uwase',
          approvedBy: 'Alice Umutoni',
          approvalDate: '2024-01-29T10:00:00Z',
          reason: 'Password expired'
        }
      ];
      setPasswordResets(mockData);
    } catch (error) {
      console.error('Error fetching password resets:', error);
      toast.error('Failed to fetch password resets');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleApproveReset = (id: string) => {
    toast.info(`Approving password reset for request ${id}`);
  };

  const handleRejectReset = (id: string) => {
    toast.info(`Rejecting password reset for request ${id}`);
  };

  const handleCompleteReset = (id: string) => {
    toast.info(`Marking password reset as completed for request ${id}`);
  };

  const filteredPasswordResets = passwordResets.filter(reset => {
    const matchesSearch = reset.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reset.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <Key className="h-8 w-8 text-blue-600" />
                Password Resets
              </h1>
              <p className="text-gray-600 mt-2">Manage password reset requests and approvals</p>
            </div>
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Password Resets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Password Reset Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPasswordResets.map((reset) => (
                  <tr key={reset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{reset.userName}</div>
                        <div className="text-sm text-gray-500">{reset.userId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reset.requestDate).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reset.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(reset.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reset.status)}`}>
                          {reset.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {reset.approvedBy || '-'}
                      </div>
                      {reset.approvalDate && (
                        <div className="text-sm text-gray-500">
                          {new Date(reset.approvalDate).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {reset.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveReset(reset.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectReset(reset.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {reset.status === 'approved' && (
                          <button
                            onClick={() => handleCompleteReset(reset.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Complete
                          </button>
                        )}
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

export default PasswordResetsPage; 