import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  FileText, 
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  AlertTriangle,
  File,
  Folder,
  Archive,
  Trash2,
  Share,
  Lock,
  Unlock
} from 'lucide-react';

interface LegalDocument {
  id: string;
  title: string;
  type: 'contract' | 'policy' | 'procedure' | 'template' | 'agreement' | 'certificate' | 'license' | 'other';
  category: 'corporate' | 'employment' | 'compliance' | 'operational' | 'financial' | 'legal';
  status: 'draft' | 'review' | 'approved' | 'active' | 'archived' | 'expired';
  version: string;
  lastModified: string;
  modifiedBy: string;
  createdBy: string;
  createdDate: string;
  expiryDate?: string;
  description: string;
  tags: string[];
  fileSize: string;
  fileType: string;
  isConfidential: boolean;
  accessLevel: 'public' | 'internal' | 'restricted' | 'confidential';
  department: string;
  relatedDocuments: string[];
}

const LegalDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([
    {
      id: '1',
      title: 'Employee Handbook 2024',
      type: 'policy',
      category: 'employment',
      status: 'active',
      version: '2.1',
      lastModified: '2024-01-15',
      modifiedBy: 'Sarah Uwimana',
      createdBy: 'HR Team',
      createdDate: '2023-12-01',
      description: 'Comprehensive employee handbook covering all company policies and procedures',
      tags: ['employment', 'policies', 'handbook', 'hr'],
      fileSize: '2.4 MB',
      fileType: 'PDF',
      isConfidential: false,
      accessLevel: 'internal',
      department: 'HR',
      relatedDocuments: ['2', '3']
    },
    {
      id: '2',
      title: 'Code of Conduct Policy',
      type: 'policy',
      category: 'corporate',
      status: 'active',
      version: '1.3',
      lastModified: '2024-01-10',
      modifiedBy: 'Jean Claude',
      createdBy: 'Legal Team',
      createdDate: '2023-11-15',
      description: 'Company code of conduct and ethical guidelines for all employees',
      tags: ['conduct', 'ethics', 'corporate', 'policy'],
      fileSize: '1.8 MB',
      fileType: 'PDF',
      isConfidential: false,
      accessLevel: 'internal',
      department: 'Legal',
      relatedDocuments: ['1', '4']
    },
    {
      id: '3',
      title: 'Security Services Agreement Template',
      type: 'template',
      category: 'operational',
      status: 'active',
      version: '3.0',
      lastModified: '2024-01-20',
      modifiedBy: 'Paul Mugenzi',
      createdBy: 'Legal Team',
      createdDate: '2023-10-01',
      description: 'Standard template for security services agreements with clients',
      tags: ['template', 'security', 'agreement', 'contract'],
      fileSize: '1.2 MB',
      fileType: 'DOCX',
      isConfidential: true,
      accessLevel: 'restricted',
      department: 'Operations',
      relatedDocuments: ['1', '5']
    },
    {
      id: '4',
      title: 'Data Protection Policy',
      type: 'policy',
      category: 'compliance',
      status: 'review',
      version: '1.0',
      lastModified: '2024-01-18',
      modifiedBy: 'David Nkurunziza',
      createdBy: 'IT Team',
      createdDate: '2024-01-15',
      description: 'Data protection and privacy policy in compliance with local regulations',
      tags: ['data', 'privacy', 'compliance', 'gdpr'],
      fileSize: '3.1 MB',
      fileType: 'PDF',
      isConfidential: false,
      accessLevel: 'internal',
      department: 'IT',
      relatedDocuments: ['2', '6']
    },
    {
      id: '5',
      title: 'Non-Disclosure Agreement Template',
      type: 'template',
      category: 'legal',
      status: 'active',
      version: '2.2',
      lastModified: '2024-01-12',
      modifiedBy: 'Legal Team',
      createdBy: 'Legal Team',
      createdDate: '2023-09-01',
      description: 'Standard NDA template for protecting confidential information',
      tags: ['nda', 'confidentiality', 'template', 'legal'],
      fileSize: '0.8 MB',
      fileType: 'DOCX',
      isConfidential: true,
      accessLevel: 'restricted',
      department: 'Legal',
      relatedDocuments: ['3', '7']
    },
    {
      id: '6',
      title: 'Incident Reporting Procedure',
      type: 'procedure',
      category: 'operational',
      status: 'active',
      version: '1.5',
      lastModified: '2024-01-08',
      modifiedBy: 'Paul Mugenzi',
      createdBy: 'Operations Team',
      createdDate: '2023-08-15',
      description: 'Standard procedure for reporting and handling security incidents',
      tags: ['incident', 'reporting', 'procedure', 'security'],
      fileSize: '1.5 MB',
      fileType: 'PDF',
      isConfidential: false,
      accessLevel: 'internal',
      department: 'Operations',
      relatedDocuments: ['4', '8']
    },
    {
      id: '7',
      title: 'Business License Certificate',
      type: 'certificate',
      category: 'compliance',
      status: 'active',
      version: '1.0',
      lastModified: '2023-12-01',
      modifiedBy: 'Jean Claude',
      createdBy: 'Government',
      createdDate: '2023-12-01',
      expiryDate: '2024-12-01',
      description: 'Official business license certificate for security services',
      tags: ['license', 'certificate', 'business', 'compliance'],
      fileSize: '0.5 MB',
      fileType: 'PDF',
      isConfidential: false,
      accessLevel: 'public',
      department: 'Legal',
      relatedDocuments: ['5']
    },
    {
      id: '8',
      title: 'Employee Termination Policy',
      type: 'policy',
      category: 'employment',
      status: 'draft',
      version: '1.0',
      lastModified: '2024-01-22',
      modifiedBy: 'Sarah Uwimana',
      createdBy: 'HR Team',
      createdDate: '2024-01-20',
      description: 'Policy and procedure for employee termination and exit process',
      tags: ['termination', 'employment', 'policy', 'hr'],
      fileSize: '1.1 MB',
      fileType: 'DOCX',
      isConfidential: false,
      accessLevel: 'internal',
      department: 'HR',
      relatedDocuments: ['1', '6']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterAccess, setFilterAccess] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'policy': return 'bg-green-100 text-green-800';
      case 'procedure': return 'bg-purple-100 text-purple-800';
      case 'template': return 'bg-orange-100 text-orange-800';
      case 'agreement': return 'bg-pink-100 text-pink-800';
      case 'certificate': return 'bg-yellow-100 text-yellow-800';
      case 'license': return 'bg-indigo-100 text-indigo-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'review': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'corporate': return 'bg-blue-100 text-blue-800';
      case 'employment': return 'bg-green-100 text-green-800';
      case 'compliance': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-orange-100 text-orange-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      case 'legal': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'restricted': return 'bg-orange-100 text-orange-800';
      case 'confidential': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const statusMatch = filterStatus === 'all' || doc.status === filterStatus;
    const typeMatch = filterType === 'all' || doc.type === filterType;
    const categoryMatch = filterCategory === 'all' || doc.category === filterCategory;
    const accessMatch = filterAccess === 'all' || doc.accessLevel === filterAccess;
    const searchMatch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && typeMatch && categoryMatch && accessMatch && searchMatch;
  });

  const totalDocuments = documents.length;
  const activeDocuments = documents.filter(doc => doc.status === 'active').length;
  const draftDocuments = documents.filter(doc => doc.status === 'draft').length;
  const reviewDocuments = documents.filter(doc => doc.status === 'review').length;

  const handleAddDocument = () => {
    setShowAddModal(true);
  };

  const handleViewDocument = (document: LegalDocument) => {
    setSelectedDocument(document);
  };

  const handleEditDocument = (document: LegalDocument) => {
    // Implement edit functionality
    console.log('Edit document:', document);
  };

  const handleDownloadDocument = (document: LegalDocument) => {
    // Implement download functionality
    console.log('Download document:', document);
  };

  const handleUploadDocument = (document: LegalDocument) => {
    // Implement upload functionality
    console.log('Upload document:', document);
  };

  const handleArchiveDocument = (document: LegalDocument) => {
    // Implement archive functionality
    console.log('Archive document:', document);
  };

  const handleDeleteDocument = (document: LegalDocument) => {
    // Implement delete functionality
    console.log('Delete document:', document);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Legal Documents</h2>
          <p className="text-gray-600">Manage legal documents, policies, and templates</p>
        </div>
        <AnimatedButton
          onClick={handleAddDocument}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Documents"
          subtitle="All documents"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
              <p className="text-sm text-gray-500">Total documents</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Documents"
          subtitle="Currently active"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeDocuments}</p>
              <p className="text-sm text-gray-500">Active documents</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Draft Documents"
          subtitle="Under development"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{draftDocuments}</p>
              <p className="text-sm text-gray-500">Draft documents</p>
            </div>
            <FileText className="w-8 h-8 text-gray-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Under Review"
          subtitle="Awaiting approval"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{reviewDocuments}</p>
              <p className="text-sm text-gray-500">Under review</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
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
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="contract">Contract</option>
            <option value="policy">Policy</option>
            <option value="procedure">Procedure</option>
            <option value="template">Template</option>
            <option value="agreement">Agreement</option>
            <option value="certificate">Certificate</option>
            <option value="license">License</option>
            <option value="other">Other</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="corporate">Corporate</option>
            <option value="employment">Employment</option>
            <option value="compliance">Compliance</option>
            <option value="operational">Operational</option>
            <option value="financial">Financial</option>
            <option value="legal">Legal</option>
          </select>
          <select
            value={filterAccess}
            onChange={(e) => setFilterAccess(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Access</option>
            <option value="public">Public</option>
            <option value="internal">Internal</option>
            <option value="restricted">Restricted</option>
            <option value="confidential">Confidential</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <AnimatedCard
        title="Legal Documents"
        subtitle="Company policies, procedures, and legal documents"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Document</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Version</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Access</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Modified</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{doc.title}</p>
                      <p className="text-sm text-gray-500">{doc.department} • {doc.fileSize}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-700 font-medium">{doc.version}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(doc.accessLevel)}`}>
                        {doc.isConfidential ? <Lock className="w-3 h-3 mr-1" /> : <Unlock className="w-3 h-3 mr-1" />}
                        {doc.accessLevel}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-700">{doc.lastModified}</p>
                      <p className="text-xs text-gray-500">by {doc.modifiedBy}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewDocument(doc)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditDocument(doc)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleDownloadDocument(doc)}
                        className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleUploadDocument(doc)}
                        className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                      >
                        <Upload className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleArchiveDocument(doc)}
                        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <Archive className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleDeleteDocument(doc)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Document Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Document Details</h3>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="text-gray-900">{selectedDocument.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedDocument.type)}`}>
                    {selectedDocument.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedDocument.category)}`}>
                    {selectedDocument.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDocument.status)}`}>
                    {getStatusIcon(selectedDocument.status)}
                    <span className="ml-1 capitalize">{selectedDocument.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Version</label>
                  <p className="text-gray-900">{selectedDocument.version}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Access Level</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(selectedDocument.accessLevel)}`}>
                    {selectedDocument.isConfidential ? <Lock className="w-3 h-3 mr-1" /> : <Unlock className="w-3 h-3 mr-1" />}
                    {selectedDocument.accessLevel}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedDocument.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">File Size</label>
                  <p className="text-gray-900">{selectedDocument.fileSize}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created By</label>
                  <p className="text-gray-900">{selectedDocument.createdBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Modified By</label>
                  <p className="text-gray-900">{selectedDocument.modifiedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created Date</label>
                  <p className="text-gray-900">{selectedDocument.createdDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                  <p className="text-gray-900">{selectedDocument.lastModified}</p>
                </div>
                {selectedDocument.expiryDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="text-gray-900">{selectedDocument.expiryDate}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedDocument.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedDocument.relatedDocuments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Related Documents</label>
                  <p className="text-gray-900">{selectedDocument.relatedDocuments.length} related documents</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedDocument(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditDocument(selectedDocument)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Document
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocuments;
