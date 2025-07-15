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
  Folder
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import FilterBar, { FilterField } from '../../components/FilterBar';
import CompactTable, { TableColumn } from '../../components/CompactTable';
import Modal from '../../components/Common/Modal';

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
        <StatCard
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          label="Total Documents"
          value={getTotalDocuments()}
          colorClass="text-blue-600"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Approved Documents"
          value={getApprovedDocuments()}
          colorClass="text-green-600"
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6 text-yellow-600" />}
          label="Under Review"
          value={getReviewDocuments()}
          colorClass="text-yellow-600"
        />
        <StatCard
          icon={<Folder className="w-6 h-6 text-purple-600" />}
          label="Total File Size"
          value={formatFileSize(getTotalFileSize())}
          colorClass="text-purple-600"
        />
      </div>

      {/* Filters and Search */}
      <FilterBar
        searchPlaceholder="Search documents..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchClear={() => setSearchTerm('')}
        searchIcon={<Search className="w-4 h-4 text-gray-400" />}
        filters={[
          {
            label: 'Category',
            value: categoryFilter,
            onChange: (e) => setCategoryFilter(e.target.value),
            options: [
              { value: 'all', label: 'All Categories' },
              { value: 'policy', label: 'Policies' },
              { value: 'procedure', label: 'Procedures' },
              { value: 'contract', label: 'Contracts' },
              { value: 'training', label: 'Training' },
              { value: 'incident_report', label: 'Incident Reports' },
              { value: 'audit', label: 'Audits' },
              { value: 'compliance', label: 'Compliance' },
              { value: 'other', label: 'Other' },
            ],
            icon: <Filter className="w-4 h-4 text-gray-400" />,
          },
          {
            label: 'Status',
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            options: [
              { value: 'all', label: 'All Status' },
              { value: 'draft', label: 'Draft' },
              { value: 'review', label: 'Under Review' },
              { value: 'approved', label: 'Approved' },
              { value: 'archived', label: 'Archived' },
              { value: 'expired', label: 'Expired' },
            ],
            icon: <Filter className="w-4 h-4 text-gray-400" />,
          },
        ]}
        actions={[
          {
            label: 'Export',
            onClick: () => alert('Export functionality not implemented yet'),
            icon: <Download className="w-4 h-4" />,
          },
        ]}
      />

      {/* Documents Table */}
      <CompactTable
        columns={
          [
            {
              header: 'Document',
              accessor: 'document',
              render: (document) => (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{document.title}</div>
                    <div className="text-sm text-gray-500">{document.documentNumber} v{document.version}</div>
                  </div>
                </div>
              ),
            },
            {
              header: 'Category',
              accessor: 'category',
              render: (document) => (
                <div className="text-sm text-gray-900 capitalize">{document.category.replace('_', ' ')}</div>
              ),
            },
            {
              header: 'Status',
              accessor: 'status',
              render: (document) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                  {document.status}
                </span>
              ),
            },
            {
              header: 'Access Level',
              accessor: 'accessLevel',
              render: (document) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(document.accessLevel)}`}>
                  {document.accessLevel}
                </span>
              ),
            },
            {
              header: 'Last Modified',
              accessor: 'lastModified',
              render: (document) => (
                <div className="text-sm text-gray-900">{formatDate(document.lastModified)}</div>
              ),
            },
            {
              header: 'Size',
              accessor: 'fileSize',
              render: (document) => (
                <div className="text-sm text-gray-900">{formatFileSize(document.fileSize)}</div>
              ),
            },
            {
              header: 'Actions',
              accessor: 'actions',
              render: (document) => (
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
              ),
            },
          ]
        }
        data={filteredDocuments}
        showPagination={true}
        totalItems={documents.length}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={(page) => console.log('Page changed to:', page)}
      />

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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Title *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter document title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Select Category</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Level *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="public">Public</option>
                <option value="restricted">Restricted</option>
                <option value="confidential">Confidential</option>
                <option value="secret">Secret</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter assigned person or team"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter document description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
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

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl">
              Upload Document
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Documents; 