import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Shield, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Download,
  Upload,
  Filter,
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  category: 'regulatory' | 'internal' | 'industry' | 'safety' | 'data' | 'financial';
  status: 'compliant' | 'non-compliant' | 'pending' | 'review' | 'expired';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  lastReview: string;
  nextReview: string;
  responsible: string;
  department: string;
  description: string;
  requirements: string[];
  evidence: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  penalty: number;
  autoRenewal: boolean;
}

const ComplianceManagement: React.FC = () => {
  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'Rwanda Labor Law Compliance',
      category: 'regulatory',
      status: 'compliant',
      priority: 'high',
      dueDate: '2024-12-31',
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      responsible: 'Sarah Uwimana',
      department: 'HR',
      description: 'Compliance with Rwanda labor laws including working hours, leave policies, and employee rights',
      requirements: [
        'Maximum 40 hours per week',
        'Minimum wage compliance',
        'Annual leave entitlement',
        'Maternity leave provisions',
        'Termination procedures'
      ],
      evidence: [
        'Employee handbook',
        'Payroll records',
        'Leave tracking system',
        'HR policies documentation'
      ],
      riskLevel: 'medium',
      penalty: 5000000,
      autoRenewal: true
    },
    {
      id: '2',
      title: 'Data Protection Law (GDPR Equivalent)',
      category: 'data',
      status: 'compliant',
      priority: 'high',
      dueDate: '2024-12-31',
      lastReview: '2024-01-10',
      nextReview: '2024-04-10',
      responsible: 'David Nkurunziza',
      department: 'IT',
      description: 'Compliance with data protection regulations and privacy laws',
      requirements: [
        'Data processing consent',
        'Data breach notification',
        'Right to be forgotten',
        'Data portability',
        'Privacy by design'
      ],
      evidence: [
        'Privacy policy',
        'Data processing agreements',
        'Consent forms',
        'Security audit reports'
      ],
      riskLevel: 'high',
      penalty: 10000000,
      autoRenewal: true
    },
    {
      id: '3',
      title: 'Security Services License',
      category: 'regulatory',
      status: 'pending',
      priority: 'critical',
      dueDate: '2024-03-15',
      lastReview: '2023-12-01',
      nextReview: '2024-03-01',
      responsible: 'Paul Mugenzi',
      department: 'Operations',
      description: 'Annual renewal of security services operating license',
      requirements: [
        'Valid business registration',
        'Security personnel certifications',
        'Insurance coverage',
        'Equipment compliance',
        'Background checks'
      ],
      evidence: [
        'Business registration certificate',
        'Training certificates',
        'Insurance policies',
        'Equipment inspection reports'
      ],
      riskLevel: 'critical',
      penalty: 0,
      autoRenewal: false
    },
    {
      id: '4',
      title: 'Workplace Safety Standards',
      category: 'safety',
      status: 'non-compliant',
      priority: 'high',
      dueDate: '2024-02-28',
      lastReview: '2023-11-15',
      nextReview: '2024-02-15',
      responsible: 'Jean Claude',
      department: 'Operations',
      description: 'Compliance with workplace safety and health regulations',
      requirements: [
        'Safety equipment provision',
        'Emergency procedures',
        'First aid training',
        'Incident reporting',
        'Regular safety inspections'
      ],
      evidence: [
        'Safety equipment inventory',
        'Training records',
        'Incident reports',
        'Inspection checklists'
      ],
      riskLevel: 'high',
      penalty: 2000000,
      autoRenewal: true
    },
    {
      id: '5',
      title: 'Financial Reporting Standards',
      category: 'financial',
      status: 'compliant',
      priority: 'medium',
      dueDate: '2024-12-31',
      lastReview: '2024-01-05',
      nextReview: '2024-07-05',
      responsible: 'Finance Team',
      department: 'Finance',
      description: 'Compliance with international financial reporting standards',
      requirements: [
        'Accurate financial records',
        'Timely reporting',
        'Audit trail maintenance',
        'Internal controls',
        'External audit compliance'
      ],
      evidence: [
        'Financial statements',
        'Audit reports',
        'Internal control documentation',
        'Accounting policies'
      ],
      riskLevel: 'medium',
      penalty: 3000000,
      autoRenewal: true
    }
  ]);

  const [showAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'regulatory': return 'bg-blue-100 text-blue-800';
      case 'internal': return 'bg-green-100 text-green-800';
      case 'industry': return 'bg-purple-100 text-purple-800';
      case 'safety': return 'bg-orange-100 text-orange-800';
      case 'data': return 'bg-pink-100 text-pink-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'non-compliant': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'review': return <Eye className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredItems = complianceItems.filter(item => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
    const riskMatch = filterRisk === 'all' || item.riskLevel === filterRisk;
    return statusMatch && categoryMatch && riskMatch;
  });

  const totalCompliant = complianceItems.filter(item => item.status === 'compliant').length;
  const totalNonCompliant = complianceItems.filter(item => item.status === 'non-compliant').length;
  // const totalPending = complianceItems.filter(item => item.status === 'pending').length;
  const totalRisk = complianceItems.reduce((sum, item) => sum + item.penalty, 0);

  const complianceRate = Math.round((totalCompliant / complianceItems.length) * 100);

  const handleAddCompliance = () => {
    setShowAddModal(true);
  };

  const handleViewItem = (item: ComplianceItem) => {
    setSelectedItem(item);
  };

  const handleEditItem = (item: ComplianceItem) => {
    // Implement edit functionality
    console.log('Edit compliance item:', item);
  };

  const handleUploadEvidence = (item: ComplianceItem) => {
    // Implement upload functionality
    console.log('Upload evidence for:', item);
  };

  const handleDownloadReport = (item: ComplianceItem) => {
    // Implement download functionality
    console.log('Download report for:', item);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance Management</h2>
          <p className="text-gray-600">Monitor and manage regulatory compliance</p>
        </div>
        <AnimatedButton
          onClick={handleAddCompliance}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Compliance Item</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Compliance Rate"
          subtitle="Overall compliance"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{complianceRate}%</p>
              <p className="text-sm text-gray-500">Compliance rate</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Compliant Items"
          subtitle="Fully compliant"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCompliant}</p>
              <p className="text-sm text-gray-500">Compliant items</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Non-Compliant"
          subtitle="Requires attention"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalNonCompliant}</p>
              <p className="text-sm text-gray-500">Non-compliant</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Risk Exposure"
          subtitle="Potential penalties"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRisk)}</p>
              <p className="text-sm text-gray-500">Risk exposure</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center space-x-4">
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
            <option value="compliant">Compliant</option>
            <option value="non-compliant">Non-Compliant</option>
            <option value="pending">Pending</option>
            <option value="review">Review</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="regulatory">Regulatory</option>
            <option value="internal">Internal</option>
            <option value="industry">Industry</option>
            <option value="safety">Safety</option>
            <option value="data">Data</option>
            <option value="financial">Financial</option>
          </select>
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Compliance Items Table */}
      <AnimatedCard
        title="Compliance Items"
        subtitle="Regulatory and internal compliance requirements"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Compliance Item</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Responsible</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.department}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status}</span>
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(item.riskLevel)}`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-700">{item.dueDate}</p>
                      <p className="text-xs text-gray-500">Next: {item.nextReview}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{item.responsible}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewItem(item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditItem(item)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleUploadEvidence(item)}
                        className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                      >
                        <Upload className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleDownloadReport(item)}
                        className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Compliance Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Compliance Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="text-gray-900">{selectedItem.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedItem.category)}`}>
                    {selectedItem.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                    {getStatusIcon(selectedItem.status)}
                    <span className="ml-1 capitalize">{selectedItem.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedItem.riskLevel)}`}>
                    {selectedItem.riskLevel}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedItem.priority)}`}>
                    {selectedItem.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedItem.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Responsible</label>
                  <p className="text-gray-900">{selectedItem.responsible}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Penalty</label>
                  <p className="text-gray-900 font-semibold">
                    {selectedItem.penalty > 0 ? formatCurrency(selectedItem.penalty) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <p className="text-gray-900">{selectedItem.dueDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Review</label>
                  <p className="text-gray-900">{selectedItem.lastReview}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Review</label>
                  <p className="text-gray-900">{selectedItem.nextReview}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Auto Renewal</label>
                  <p className="text-gray-900">{selectedItem.autoRenewal ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedItem.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {selectedItem.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Evidence</label>
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {selectedItem.evidence.map((ev, index) => (
                    <li key={index}>{ev}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditItem(selectedItem)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Item
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceManagement;
