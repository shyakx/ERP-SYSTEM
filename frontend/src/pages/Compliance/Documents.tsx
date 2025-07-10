import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Folder, Download, Upload, Eye, Edit, Trash2, Plus, Search, CheckCircle, AlertCircle } from 'lucide-react';

interface Document {
  id: string;
  documentNumber: string;
  title: string;
  description: string;
  category: 'policy' | 'procedure' | 'contract' | 'training' | 'incident_report' | 'audit' | 'compliance' | 'other';
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'image';
  fileSize: number;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'archived' | 'expired';
  createdBy: string;
  createdDate: string;
  lastModified: string;
  lastModifiedBy: string;
  expiryDate?: string;
  tags: string[];
  accessLevel: 'public' | 'restricted' | 'confidential' | 'secret';
  assignedTo?: string;
  reviewDate?: string;
  notes?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    documentNumber: 'DOC-2024-001',
    title: 'Security Guard Standard Operating Procedures',
    description: 'Comprehensive guide for security guard duties, protocols, and emergency procedures',
    category: 'procedure',
    type: 'pdf',
    fileSize: 2048576,
    version: '2.1',
    status: 'approved',
    createdBy: 'John Smith',
    createdDate: '2023-06-15',
    lastModified: '2024-01-10',
    lastModifiedBy: 'Sarah Johnson',
    expiryDate: '2025-01-10',
    tags: ['security', 'procedures', 'training', 'emergency'],
    accessLevel: 'restricted',
    assignedTo: 'All Security Guards',
    reviewDate: '2024-07-10',
    notes: 'Updated with new emergency contact procedures'
  },
  {
    id: '2',
    documentNumber: 'DOC-2024-002',
    title: 'Client Service Agreement Template',
    description: 'Standard service agreement template for new client contracts',
    category: 'contract',
    type: 'docx',
    fileSize: 512000,
    version: '1.0',
    status: 'approved',
    createdBy: 'Lisa Davis',
    createdDate: '2023-08-20',
    lastModified: '2023-12-15',
    lastModifiedBy: 'Lisa Davis',
    tags: ['contract', 'legal', 'template', 'client'],
    accessLevel: 'confidential',
    assignedTo: 'Client Relationship Team',
    notes: 'Legal department approved template'
  },
  {
    id: '3',
    documentNumber: 'DOC-2024-003',
    title: 'Incident Report Form',
    description: 'Standardized form for reporting security incidents',
    category: 'incident_report',
    type: 'pdf',
    fileSize: 256000,
    version: '3.0',
    status: 'approved',
    createdBy: 'Michael Brown',
    createdDate: '2023-09-05',
    lastModified: '2024-01-05',
    lastModifiedBy: 'Michael Brown',
    tags: ['incident', 'report', 'form', 'security'],
    accessLevel: 'restricted',
    assignedTo: 'All Security Personnel',
    notes: 'Updated with new incident categories'
  }
];

const Documents: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const canManageDocuments = user?.role === 'system_admin' || user?.role === 'operations_supervisor' || user?.role === 'it_support_officer';

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || document.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (accessLevel: string) => {
    switch (accessLevel) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'restricted': return 'bg-yellow-100 text-yellow-800';
      case 'confidential': return 'bg-orange-100 text-orange-800';
      case 'secret': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalDocuments = () => documents.length;
  const getApprovedDocuments = () => documents.filter(doc => doc.status === 'approved').length;
  const getReviewDocuments = () => documents.filter(doc => doc.status === 'review').length;
  const getTotalFileSize = () => documents.reduce((total, doc) => total + doc.fileSize, 0);

  const handleDeleteDocument = (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== documentId));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
            <p className="text-gray-600 mt-1">Manage security policies, procedures, and company documents</p>
          </div>
          {canManageDocuments && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalDocuments()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{getApprovedDocuments()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">{getReviewDocuments()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Folder className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900">{formatFileSize(getTotalFileSize())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="policy">Policies</option>
            <option value="procedure">Procedures</option>
            <option value="contract">Contracts</option>
            <option value="training">Training</option>
            <option value="incident_report">Incident Reports</option>
            <option value="audit">Audits</option>
            <option value="compliance">Compliance</option>
            <option value="other">Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="archived">Archived</option>
            <option value="expired">Expired</option>
          </select>

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{document.title}</div>
                        <div className="text-sm text-gray-500">{document.documentNumber} v{document.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{document.category.replace('_', ' ')}</div>
                    <div className="text-sm text-gray-500">{document.assignedTo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(document.accessLevel)}`}>
                      {document.accessLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(document.lastModified)}</div>
                    <div className="text-sm text-gray-500">by {document.lastModifiedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatFileSize(document.fileSize)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      {canManageDocuments && (
                        <>
                          <button className="text-yellow-600 hover:text-yellow-900 p-1" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(document.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
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
              Showing {filteredDocuments.length} of {documents.length} documents
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upload New Document</h3>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Category</option>
                      <option value="policy">Policy</option>
                      <option value="procedure">Procedure</option>
                      <option value="contract">Contract</option>
                      <option value="training">Training</option>
                      <option value="incident_report">Incident Report</option>
                      <option value="audit">Audit</option>
                      <option value="compliance">Compliance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="public">Public</option>
                      <option value="restricted">Restricted</option>
                      <option value="confidential">Confidential</option>
                      <option value="secret">Secret</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                        Choose a file
                      </button>
                      <p className="text-gray-500">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents; 