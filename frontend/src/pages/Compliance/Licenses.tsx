import React, { useState } from 'react';
import { Lock, Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2 } from 'lucide-react';

interface License {
  id: string;
  licenseNumber: string;
  type: string;
  holder: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending' | 'suspended';
  department: string;
  cost: number;
  description: string;
}

const Licenses: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>([
    {
      id: '1',
      licenseNumber: 'LIC-2024-001',
      type: 'Security Guard License',
      holder: 'John Smith',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
      department: 'Operations',
      cost: 500,
      description: 'Standard security guard license for armed protection services'
    },
    {
      id: '2',
      licenseNumber: 'LIC-2024-002',
      type: 'Firearm License',
      holder: 'Jane Doe',
      issueDate: '2024-01-10',
      expiryDate: '2024-07-10',
      status: 'active',
      department: 'Operations',
      cost: 750,
      description: 'Firearm license for specialized security operations'
    },
    {
      id: '3',
      licenseNumber: 'LIC-2024-003',
      type: 'Vehicle License',
      holder: 'Mike Johnson',
      issueDate: '2023-12-01',
      expiryDate: '2024-06-01',
      status: 'expired',
      department: 'Operations',
      cost: 300,
      description: 'Commercial vehicle license for patrol operations'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredLicenses = licenses.filter(license =>
    license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.holder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.type.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(license =>
    selectedStatus === 'all' || license.status === selectedStatus
  ).filter(license =>
    selectedType === 'all' || license.type === selectedType
  );

  const getTotalLicenses = () => licenses.length;
  const getActiveLicenses = () => licenses.filter(l => l.status === 'active').length;
  const getExpiredLicenses = () => licenses.filter(l => l.status === 'expired').length;
  const getPendingLicenses = () => licenses.filter(l => l.status === 'pending').length;

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysDiff = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 30 && daysDiff > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Lock className="h-8 w-8 text-blue-600" />
                License Management
              </h1>
              <p className="text-gray-600 mt-2">Manage security licenses and certifications</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5" />
                Add License
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Licenses
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Licenses</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalLicenses()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{getActiveLicenses()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">{getExpiredLicenses()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Lock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{getPendingLicenses()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search licenses by number, holder, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Security Guard License">Security Guard License</option>
                <option value="Firearm License">Firearm License</option>
                <option value="Vehicle License">Vehicle License</option>
              </select>
            </div>
          </div>
        </div>

        {/* Licenses Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holder & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost & Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLicenses.map(license => (
                  <tr key={license.id} className={`hover:bg-gray-50 ${
                    isExpiringSoon(license.expiryDate) ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{license.licenseNumber}</div>
                        <div className="text-sm text-gray-500">{license.type}</div>
                        <div className="text-sm text-gray-500">{license.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{license.holder}</div>
                        <div className="text-sm text-gray-500">{license.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(license.status)}`}>
                          {license.status}
                        </span>
                        <div className="text-sm text-gray-500">
                          Issue: {new Date(license.issueDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Expiry: {new Date(license.expiryDate).toLocaleDateString()}
                        </div>
                        {isExpiringSoon(license.expiryDate) && (
                          <div className="text-xs text-yellow-600 font-medium">Expiring Soon</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            ${license.cost}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
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

export default Licenses; 