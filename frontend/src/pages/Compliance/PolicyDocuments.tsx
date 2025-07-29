import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2, Calendar, User } from 'lucide-react';

interface PolicyDocument {
  id: string;
  documentNumber: string;
  title: string;
  category: string;
  version: string;
  status: 'draft' | 'active' | 'archived' | 'under_review';
  author: string;
  createdDate: string;
  lastModified: string;
  effectiveDate: string;
  expiryDate?: string;
  department: string;
  description: string;
  fileSize: number;
  downloads: number;
}

const PolicyDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<PolicyDocument[]>([
    {
      id: '1',
      documentNumber: 'POL-2024-001',
      title: 'Security Guard Code of Conduct',
      category: 'Personnel',
      version: '2.1',
      status: 'active',
      author: 'Jean Clauc',
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      effectiveDate: '2024-02-01',
      department: 'Operations',
      description: 'Standard code of conduct for all security personnel',
      fileSize: 245,
      downloads: 45
    },
    {
      id: '2',
      documentNumber: 'POL-2024-002',
      title: 'Use of Force Policy',
      category: 'Operations',
      version: '1.3',
      status: 'active',
      author: 'Sarah Johnson',
      createdDate: '2024-01-10',
      lastModified: '2024-01-15',
      effectiveDate: '2024-01-20',
      department: 'Operations',
      description: 'Guidelines for use of force in security operations',
      fileSize: 189,
      downloads: 32
    },
    {
      id: '3',
      documentNumber: 'POL-2024-003',
      title: 'Data Protection Policy',
      category: 'IT',
      version: '1.0',
      status: 'draft',
      author: 'Mike Wilson',
      createdDate: '2024-01-25',
      lastModified: '2024-01-25',
      effectiveDate: '2024-03-01',
      department: 'IT',
      description: 'Data protection and privacy guidelines',
      fileSize: 156,
      downloads: 8
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'active': 'bg-green-100 text-green-800',
      'archived': 'bg-red-100 text-red-800',
      'under_review': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Personnel': 'bg-blue-100 text-blue-800',
      'Operations': 'bg-green-100 text-green-800',
      'IT': 'bg-purple-100 text-purple-800',
      'Finance': 'bg-orange-100 text-orange-800',
      'Safety': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(doc =>
    selectedStatus === 'all' || doc.status === selectedStatus
  ).filter(doc =>
    selectedCategory === 'all' || doc.category === selectedCategory
  );

  const getTotalDocuments = () => documents.length;
  const getActiveDocuments = () => documents.filter(d => d.status === 'active').length;
  const getDraftDocuments = () => documents.filter(d => d.status === 'draft').length;
  const getArchivedDocuments = () => documents.filter(d => d.status === 'archived').length;

  const formatFileSize = (bytes: number) => {
    return `${bytes} KB`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                Policy Documents
              </h1>
              <p className="text-gray-600 mt-2">Manage company policies and procedures</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5" />
                Add Policy
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Policies
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Policies</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalDocuments()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{getActiveDocuments()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-gray-900">{getDraftDocuments()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Archived</p>
                <p className="text-2xl font-bold text-gray-900">{getArchivedDocuments()}</p>
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
                  placeholder="Search policies by title, number, or author..."
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
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="under_review">Under Review</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Personnel">Personnel</option>
                <option value="Operations">Operations</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Safety">Safety</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage & Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{doc.documentNumber}</div>
                        <div className="text-sm text-gray-500">{doc.title}</div>
                        <div className="flex gap-1 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                            {doc.category}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            v{doc.version}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.author}</div>
                        <div className="text-sm text-gray-500">{doc.department}</div>
                        <div className="text-sm text-gray-500">{formatFileSize(doc.fileSize)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <div className="text-sm text-gray-500">
                          Created: {new Date(doc.createdDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Effective: {new Date(doc.effectiveDate).toLocaleDateString()}
                        </div>
                        {doc.expiryDate && (
                          <div className="text-sm text-gray-500">
                            Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {doc.downloads} downloads
                          </div>
                          <div className="text-sm text-gray-500">
                            Modified: {new Date(doc.lastModified).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-900">
                            <Download className="h-4 w-4" />
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

export default PolicyDocuments; 