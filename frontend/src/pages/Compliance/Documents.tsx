import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  FileText,
  Download,
  Edit,
  Trash2,
  Eye,
  Upload,
  Search,
  Filter,
  Plus,
  CheckCircle,
  AlertCircle,
  Folder,
  Clock,
  Loader
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import FilterBar, { FilterField } from '../../components/FilterBar';
import CompactTable, { TableColumn } from '../../components/CompactTable';
import Modal from '../../components/Common/Modal';
import apiService from '../../services/api';

interface Document {
  id: number;
  employee_id: string;
  type: string;
  file_url?: string;
  expiry_date?: string;
  status: string;
  created_at: string;
  employee_name?: string;
}

interface DocumentStats {
  total: number;
  approved: number;
  underReview: number;
  expiringSoon: number;
  totalFileSize: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Remove mock data - we'll fetch from API
const Documents: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const canManageDocuments = user?.role === 'system_admin' || user?.role === 'operations_supervisor' || user?.role === 'it_support_officer';

  // Fetch documents from API
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await apiService.get('/api/documents', {
        search: searchTerm,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      
      if (data && data.documents) {
        setDocuments(data.documents);
        setPagination(data.pagination);
      } else {
        setDocuments(data || []);
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  // Fetch document statistics
  const fetchStats = async () => {
    try {
      const data = await apiService.get('/api/documents/stats');
      return data;
    } catch (err) {
      console.error('Error fetching document stats:', err);
      return {
        total: 0,
        approved: 0,
        underReview: 0,
        expiringSoon: 0,
        totalFileSize: 0
      };
    }
  };

  // Upload new document
  const uploadDocument = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload document');
      }
      
      const newDocument = await response.json();
      setDocuments(prev => [newDocument, ...prev]);
      setShowAddModal(false);
      return { success: true };
    } catch (err) {
      console.error('Error uploading document:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to upload document' 
      };
    }
  };

  // Delete document
  const deleteDocument = async (documentId: number) => {
    try {
      await apiService.delete(`/api/documents/${documentId}`, {
        deleted_by: user?.id || 'DIC001'
      });
      
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting document:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to delete document' 
      };
    }
  };

  // Get document details
  const fetchDocumentDetails = async (documentId: number) => {
    try {
      const document = await apiService.get(`/api/documents/${documentId}`);
      setSelectedDocument(document);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Error fetching document details:', err);
      alert('Failed to fetch document details');
    }
  };

  // Download document
  const downloadDocument = async (documentId: number, fileName: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download document');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading document:', err);
      alert('Failed to download document');
    }
  };

  // Handle form submission for upload
  const handleUploadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const result = await uploadDocument(formData);
    if (result.success) {
      alert('Document uploaded successfully!');
      fetchDocuments(); // Refresh documents after upload
    } else {
      alert(`Upload failed: ${result.error}`);
    }
  };

  // Handle document deletion
  const handleDeleteDocument = async (documentId: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const result = await deleteDocument(documentId);
      if (result.success) {
        alert('Document deleted successfully!');
        fetchDocuments(); // Refresh documents after deletion
      } else {
        alert(`Delete failed: ${result.error}`);
      }
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    if (key === 'search') setSearchTerm(value);
    if (key === 'status') setStatusFilter(value);
    
    // Reset to first page when filters change - removed pagination
  };

  // Handle page change - removed pagination
  // const handlePageChange = (newPage: number) => {
  //   // setPagination(prev => ({ ...prev, page: newPage })); // Pagination state removed
  // };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchDocuments();
    // fetchStats(); // Stats are now fetched separately
  }, [searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // FilterBar fields
  const filterFields: FilterField[] = [
    {
      key: 'search',
      label: 'Search',
      type: 'text',
      value: searchTerm,
      placeholder: 'Search by type or employee...'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      value: statusFilter,
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' }
      ]
    }
  ];

  // Table columns
  const columns: TableColumn<Document>[] = [
    {
      key: 'document',
      label: 'Document',
      render: (doc) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{doc.type}</div>
            <div className="text-xs text-gray-500">ID: {doc.id}</div>
          </div>
        </div>
      )
    },
    {
      key: 'employee',
      label: 'Employee',
      render: (doc) => (
        <div className="text-sm text-gray-900">{doc.employee_name || 'Unknown'}</div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (doc) => (
        <div className="text-sm text-gray-900 capitalize">{doc.type.replace('_', ' ')}</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (doc) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>{doc.status}</span>
      )
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (doc) => (
        <div className="text-sm text-gray-900">{formatDate(doc.created_at)}</div>
      )
    },
    {
      key: 'expiry_date',
      label: 'Expiry',
      render: (doc) => (
        <div className="text-sm text-gray-900">{doc.expiry_date ? formatDate(doc.expiry_date) : 'N/A'}</div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (doc) => (
        <div className="flex justify-end space-x-2">
          <button
            className="text-blue-600 hover:text-blue-900 p-1"
            title="View Details"
            onClick={() => fetchDocumentDetails(doc.id)}
          >
            <Eye className="w-4 h-4" />
          </button>
          {doc.file_url && (
            <button
              className="text-green-600 hover:text-green-900 p-1"
              title="Download"
              onClick={() => downloadDocument(doc.id, doc.type)}
            >
              <Download className="w-4 h-4" />
            </button>
          )}
          {canManageDocuments && (
            <>
              <button className="text-yellow-600 hover:text-yellow-900 p-1" title="Edit">
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteDocument(doc.id)}
                className="text-red-600 hover:text-red-900 p-1"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  if (loading && documents.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading documents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">Error: {error}</span>
          </div>
          <button
            onClick={() => {
              setError(null);
              fetchDocuments();
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 md:p-6">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600 mt-1 text-sm">Centralized management of all company documents, policies, contracts, and compliance files.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center space-x-2 font-semibold shadow transition-all duration-150"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <StatCard
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          label="Total Documents"
          value={documents.length}
          colorClass="text-blue-600"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Approved"
          value={documents.filter(doc => doc.status === 'approved').length}
          colorClass="text-green-600"
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6 text-yellow-600" />}
          label="Pending"
          value={documents.filter(doc => doc.status === 'pending').length}
          colorClass="text-yellow-600"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-red-600" />}
          label="Expiring Soon"
          value={documents.filter(doc => doc.expiry_date && new Date(doc.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
          colorClass="text-red-600"
        />
      </div>

      {/* Filters and Search */}
      <FilterBar
        fields={filterFields}
        onChange={handleFilterChange}
      />

      {/* Documents Table */}
      <CompactTable
        columns={columns}
        data={documents}
        rowKey={doc => doc.id}
        emptyText={loading ? "Loading documents..." : "No documents found."}
      />

      {/* Pagination */}
      {/* Pagination state removed, so this block is removed */}

      {/* Document Details Modal */}
      <Modal
        open={showDetailsModal && !!selectedDocument}
        onClose={() => { setShowDetailsModal(false); setSelectedDocument(null); }}
        size="xl"
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedDocument?.type}</h2>
              <p className="text-sm text-gray-500">Document ID: {selectedDocument?.id}</p>
            </div>
          </div>
        }
      >
        {selectedDocument && (
          <div className="space-y-6">
            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-2 text-xs text-gray-500">Type</div>
                <div className="text-sm font-medium text-gray-900 capitalize">{selectedDocument.type.replace('_', ' ')}</div>
              </div>
              <div>
                <div className="mb-2 text-xs text-gray-500">Status</div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDocument.status)}`}>
                  {selectedDocument.status}
                </span>
              </div>
              <div>
                <div className="mb-2 text-xs text-gray-500">Employee</div>
                <div className="text-sm font-medium text-gray-900">{selectedDocument.employee_name || 'Unknown'}</div>
              </div>
              <div>
                <div className="mb-2 text-xs text-gray-500">Created</div>
                <div className="text-sm font-medium text-gray-900">{formatDate(selectedDocument.created_at)}</div>
              </div>
              {selectedDocument.expiry_date && (
                <div>
                  <div className="mb-2 text-xs text-gray-500">Expiry Date</div>
                  <div className="text-sm font-medium text-gray-900">{formatDate(selectedDocument.expiry_date)}</div>
                </div>
              )}
              {selectedDocument.file_url && (
                <div>
                  <div className="mb-2 text-xs text-gray-500">File URL</div>
                  <div className="text-sm font-medium text-gray-900 break-all">{selectedDocument.file_url}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        size="xl"
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload New Document</h2>
              <p className="text-sm text-gray-500">Add a new document to the system</p>
            </div>
          </div>
        }
      >
        <form onSubmit={handleUploadSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type *</label>
              <select name="type" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Select Type</option>
                <option value="ID Card">ID Card</option>
                <option value="Contract">Contract</option>
                <option value="Policy">Policy</option>
                <option value="Procedure">Procedure</option>
                <option value="Training">Training</option>
                <option value="Incident Report">Incident Report</option>
                <option value="Audit">Audit</option>
                <option value="Compliance">Compliance</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
              <select name="employee_id" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Select Employee</option>
                <option value="DIC001">DIC001 - Alice Uwimana</option>
                <option value="DIC002">DIC002 - Bob Johnson</option>
                <option value="DIC003">DIC003 - Carol Smith</option>
                <option value="DIC004">DIC004 - David Brown</option>
                <option value="DIC005">DIC005 - Eve Wilson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select name="status" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
              <input
                type="url"
                name="file_url"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter file URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                name="expiry_date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <input
                  type="file"
                  name="file"
                  required
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                  Choose a file
                </label>
                <p className="text-gray-500">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, and images up to 10MB</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Documents; 