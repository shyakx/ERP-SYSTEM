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
  Building,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Shield,
  FileBarChart
} from 'lucide-react';

interface LegalReport {
  id: string;
  title: string;
  type: 'compliance' | 'contract' | 'risk' | 'legal' | 'audit' | 'performance' | 'financial' | 'operational';
  category: 'monthly' | 'quarterly' | 'annual' | 'ad-hoc' | 'regulatory' | 'internal';
  status: 'draft' | 'in-progress' | 'completed' | 'approved' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  createdDate: string;
  lastModified: string;
  createdBy: string;
  approvedBy: string;
  description: string;
  keyFindings: string[];
  recommendations: string[];
  metrics: {
    totalContracts: number;
    activeContracts: number;
    expiringContracts: number;
    complianceRate: number;
    riskCount: number;
    criticalRisks: number;
    totalValue: number;
    costSavings: number;
  };
  stakeholders: string[];
  attachments: string[];
  isConfidential: boolean;
  accessLevel: 'public' | 'internal' | 'restricted' | 'confidential';
  department: string;
  relatedReports: string[];
}

const LegalReports: React.FC = () => {
  const [reports, setReports] = useState<LegalReport[]>([
    {
      id: '1',
      title: 'Q4 2023 Legal Compliance Report',
      type: 'compliance',
      category: 'quarterly',
      status: 'published',
      priority: 'high',
      dueDate: '2024-01-31',
      createdDate: '2024-01-15',
      lastModified: '2024-01-25',
      createdBy: 'Jean Claude',
      approvedBy: 'Legal Team',
      description: 'Quarterly compliance report covering regulatory adherence, policy updates, and audit findings',
      keyFindings: [
        '100% compliance with labor law requirements',
        'Data protection policy updated and implemented',
        'Security license renewal completed on time',
        '3 minor compliance gaps identified and addressed'
      ],
      recommendations: [
        'Implement automated compliance monitoring system',
        'Schedule quarterly compliance training sessions',
        'Establish compliance dashboard for real-time monitoring',
        'Review and update policies bi-annually'
      ],
      metrics: {
        totalContracts: 45,
        activeContracts: 42,
        expiringContracts: 3,
        complianceRate: 98,
        riskCount: 12,
        criticalRisks: 2,
        totalValue: 25000000,
        costSavings: 500000
      },
      stakeholders: ['CEO', 'COO', 'CFO', 'HR Director', 'Operations Manager'],
      attachments: ['compliance-audit.pdf', 'policy-updates.docx', 'training-records.xlsx'],
      isConfidential: false,
      accessLevel: 'internal',
      department: 'Legal',
      relatedReports: ['2', '3']
    },
    {
      id: '2',
      title: 'Contract Management Performance Report',
      type: 'contract',
      category: 'monthly',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-01-31',
      createdDate: '2024-01-20',
      lastModified: '2024-01-28',
      createdBy: 'Legal Team',
      approvedBy: 'Jean Claude',
      description: 'Monthly report on contract performance, renewals, and management efficiency',
      keyFindings: [
        'Contract renewal rate increased by 15%',
        'Average contract processing time reduced by 20%',
        '2 contracts require immediate attention',
        'New contract template implemented successfully'
      ],
      recommendations: [
        'Automate contract renewal notifications',
        'Implement contract performance tracking system',
        'Establish contract review committee',
        'Develop contract risk assessment framework'
      ],
      metrics: {
        totalContracts: 45,
        activeContracts: 42,
        expiringContracts: 3,
        complianceRate: 95,
        riskCount: 8,
        criticalRisks: 1,
        totalValue: 25000000,
        costSavings: 750000
      },
      stakeholders: ['CEO', 'CFO', 'Sales Director', 'Operations Manager'],
      attachments: ['contract-summary.pdf', 'renewal-schedule.xlsx', 'performance-metrics.docx'],
      isConfidential: false,
      accessLevel: 'internal',
      department: 'Legal',
      relatedReports: ['1', '4']
    },
    {
      id: '3',
      title: 'Risk Assessment and Mitigation Report',
      type: 'risk',
      category: 'quarterly',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-02-15',
      createdDate: '2024-01-25',
      lastModified: '2024-01-30',
      createdBy: 'Risk Management Team',
      approvedBy: 'Jean Claude',
      description: 'Comprehensive risk assessment covering operational, financial, and compliance risks',
      keyFindings: [
        '6 critical risks identified and assessed',
        'Risk mitigation strategies implemented for 4 risks',
        '2 risks require immediate attention',
        'Overall risk exposure reduced by 25%'
      ],
      recommendations: [
        'Implement enterprise risk management system',
        'Establish risk monitoring dashboard',
        'Conduct monthly risk review meetings',
        'Develop risk response playbooks'
      ],
      metrics: {
        totalContracts: 45,
        activeContracts: 42,
        expiringContracts: 3,
        complianceRate: 92,
        riskCount: 15,
        criticalRisks: 3,
        totalValue: 25000000,
        costSavings: 300000
      },
      stakeholders: ['CEO', 'COO', 'CFO', 'Operations Manager', 'IT Director'],
      attachments: ['risk-register.xlsx', 'mitigation-plans.docx', 'risk-matrix.pdf'],
      isConfidential: true,
      accessLevel: 'restricted',
      department: 'Legal',
      relatedReports: ['1', '5']
    },
    {
      id: '4',
      title: 'Legal Department Performance Dashboard',
      type: 'performance',
      category: 'monthly',
      status: 'draft',
      priority: 'medium',
      dueDate: '2024-02-05',
      createdDate: '2024-01-28',
      lastModified: '2024-01-30',
      createdBy: 'Legal Team',
      approvedBy: 'Jean Claude',
      description: 'Monthly performance metrics and KPIs for the legal department',
      keyFindings: [
        'Legal response time improved by 30%',
        'Contract processing efficiency increased by 25%',
        'Compliance training completion rate at 95%',
        'Client satisfaction score improved to 4.2/5'
      ],
      recommendations: [
        'Implement legal project management system',
        'Establish client feedback mechanism',
        'Develop legal knowledge base',
        'Create performance benchmarking system'
      ],
      metrics: {
        totalContracts: 45,
        activeContracts: 42,
        expiringContracts: 3,
        complianceRate: 96,
        riskCount: 10,
        criticalRisks: 2,
        totalValue: 25000000,
        costSavings: 400000
      },
      stakeholders: ['CEO', 'COO', 'HR Director'],
      attachments: ['performance-metrics.xlsx', 'kpi-dashboard.pdf'],
      isConfidential: false,
      accessLevel: 'internal',
      department: 'Legal',
      relatedReports: ['2', '6']
    },
    {
      id: '5',
      title: 'Regulatory Compliance Audit Report',
      type: 'audit',
      category: 'annual',
      status: 'completed',
      priority: 'urgent',
      dueDate: '2024-01-31',
      createdDate: '2024-01-10',
      lastModified: '2024-01-25',
      createdBy: 'External Auditor',
      approvedBy: 'Jean Claude',
      description: 'Annual regulatory compliance audit covering all business operations',
      keyFindings: [
        'Overall compliance score: 94%',
        '3 minor non-compliance issues identified',
        'Data protection compliance at 100%',
        'Labor law compliance at 98%'
      ],
      recommendations: [
        'Address identified non-compliance issues within 30 days',
        'Implement continuous compliance monitoring',
        'Establish compliance training program',
        'Create compliance reporting dashboard'
      ],
      metrics: {
        totalContracts: 45,
        activeContracts: 42,
        expiringContracts: 3,
        complianceRate: 94,
        riskCount: 5,
        criticalRisks: 0,
        totalValue: 25000000,
        costSavings: 200000
      },
      stakeholders: ['CEO', 'COO', 'CFO', 'Board of Directors'],
      attachments: ['audit-report.pdf', 'compliance-checklist.docx', 'corrective-actions.xlsx'],
      isConfidential: true,
      accessLevel: 'confidential',
      department: 'Legal',
      relatedReports: ['1', '3']
    },
    {
      id: '6',
      title: 'Legal Cost Analysis and Budget Report',
      type: 'financial',
      category: 'quarterly',
      status: 'approved',
      priority: 'medium',
      dueDate: '2024-01-31',
      createdDate: '2024-01-18',
      lastModified: '2024-01-28',
      createdBy: 'Finance Team',
      approvedBy: 'CFO',
      description: 'Quarterly analysis of legal costs, budget performance, and cost optimization opportunities',
      keyFindings: [
        'Legal costs reduced by 15% compared to previous quarter',
        'Budget utilization at 85%',
        'Cost savings achieved through process optimization',
        'External legal fees decreased by 20%'
      ],
      recommendations: [
        'Implement legal cost tracking system',
        'Establish legal budget monitoring dashboard',
        'Develop cost optimization strategies',
        'Create legal spend analytics'
      ],
      metrics: {
        totalContracts: 45,
        activeContracts: 42,
        expiringContracts: 3,
        complianceRate: 97,
        riskCount: 7,
        criticalRisks: 1,
        totalValue: 25000000,
        costSavings: 600000
      },
      stakeholders: ['CEO', 'CFO', 'Jean Claude'],
      attachments: ['cost-analysis.xlsx', 'budget-report.pdf', 'savings-summary.docx'],
      isConfidential: false,
      accessLevel: 'internal',
      department: 'Legal',
      relatedReports: ['4', '7']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<LegalReport | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'compliance': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-green-100 text-green-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'legal': return 'bg-purple-100 text-purple-800';
      case 'audit': return 'bg-orange-100 text-orange-800';
      case 'performance': return 'bg-yellow-100 text-yellow-800';
      case 'financial': return 'bg-indigo-100 text-indigo-800';
      case 'operational': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monthly': return 'bg-blue-100 text-blue-800';
      case 'quarterly': return 'bg-green-100 text-green-800';
      case 'annual': return 'bg-purple-100 text-purple-800';
      case 'ad-hoc': return 'bg-orange-100 text-orange-800';
      case 'regulatory': return 'bg-red-100 text-red-800';
      case 'internal': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
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

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const typeMatch = filterType === 'all' || report.type === filterType;
    const categoryMatch = filterCategory === 'all' || report.category === filterCategory;
    const priorityMatch = filterPriority === 'all' || report.priority === filterPriority;
    const searchMatch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && typeMatch && categoryMatch && priorityMatch && searchMatch;
  });

  const totalReports = reports.length;
  const completedReports = reports.filter(report => report.status === 'completed' || report.status === 'approved' || report.status === 'published').length;
  const inProgressReports = reports.filter(report => report.status === 'in-progress').length;
  const draftReports = reports.filter(report => report.status === 'draft').length;

  const handleAddReport = () => {
    setShowAddModal(true);
  };

  const handleViewReport = (report: LegalReport) => {
    setSelectedReport(report);
  };

  const handleEditReport = (report: LegalReport) => {
    // Implement edit functionality
    console.log('Edit report:', report);
  };

  const handleDownloadReport = (report: LegalReport) => {
    // Implement download functionality
    console.log('Download report:', report);
  };

  const handlePublishReport = (report: LegalReport) => {
    // Implement publish functionality
    console.log('Publish report:', report);
  };

  const handleArchiveReport = (report: LegalReport) => {
    // Implement archive functionality
    console.log('Archive report:', report);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Legal Reports</h2>
          <p className="text-gray-600">Generate and manage legal reports and analytics</p>
        </div>
        <AnimatedButton
          onClick={handleAddReport}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Create Report</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Reports"
          subtitle="All reports"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
              <p className="text-sm text-gray-500">Total reports</p>
            </div>
            <FileBarChart className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Completed Reports"
          subtitle="Finished reports"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedReports}</p>
              <p className="text-sm text-gray-500">Completed reports</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="In Progress"
          subtitle="Being worked on"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{inProgressReports}</p>
              <p className="text-sm text-gray-500">In progress</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Draft Reports"
          subtitle="Under development"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{draftReports}</p>
              <p className="text-sm text-gray-500">Draft reports</p>
            </div>
            <FileText className="w-8 h-8 text-gray-600" />
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
                placeholder="Search reports..."
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
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="compliance">Compliance</option>
            <option value="contract">Contract</option>
            <option value="risk">Risk</option>
            <option value="legal">Legal</option>
            <option value="audit">Audit</option>
            <option value="performance">Performance</option>
            <option value="financial">Financial</option>
            <option value="operational">Operational</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
            <option value="ad-hoc">Ad-hoc</option>
            <option value="regulatory">Regulatory</option>
            <option value="internal">Internal</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <AnimatedCard
        title="Legal Reports"
        subtitle="Compliance, contract, and risk management reports"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Report</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Created By</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.department}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{report.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{report.createdBy}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-700">{report.dueDate}</p>
                      <p className="text-xs text-gray-500">Created: {report.createdDate}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewReport(report)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditReport(report)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleDownloadReport(report)}
                        className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </AnimatedButton>
                      {report.status === 'completed' && (
                        <AnimatedButton
                          onClick={() => handlePublishReport(report)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        >
                          <Upload className="w-4 h-4" />
                        </AnimatedButton>
                      )}
                      {report.status === 'published' && (
                        <AnimatedButton
                          onClick={() => handleArchiveReport(report)}
                          className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        >
                          <FileText className="w-4 h-4" />
                        </AnimatedButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Report Details</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="text-gray-900">{selectedReport.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedReport.type)}`}>
                    {selectedReport.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedReport.category)}`}>
                    {selectedReport.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                    {getStatusIcon(selectedReport.status)}
                    <span className="ml-1 capitalize">{selectedReport.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedReport.priority)}`}>
                    {selectedReport.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedReport.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created By</label>
                  <p className="text-gray-900">{selectedReport.createdBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Approved By</label>
                  <p className="text-gray-900">{selectedReport.approvedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created Date</label>
                  <p className="text-gray-900">{selectedReport.createdDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                  <p className="text-gray-900">{selectedReport.lastModified}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <p className="text-gray-900">{selectedReport.dueDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Access Level</label>
                  <p className="text-gray-900">{selectedReport.accessLevel}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedReport.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Key Findings</label>
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {selectedReport.keyFindings.map((finding, index) => (
                    <li key={index}>{finding}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Recommendations</label>
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {selectedReport.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Key Metrics</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Contracts</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedReport.metrics.totalContracts}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Active Contracts</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedReport.metrics.activeContracts}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Compliance Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedReport.metrics.complianceRate}%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Cost Savings</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(selectedReport.metrics.costSavings)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Stakeholders</label>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.stakeholders.map((stakeholder, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.attachments.map((attachment, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <FileText className="w-3 h-3 mr-1" />
                      {attachment}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditReport(selectedReport)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Report
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalReports;
