import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Gift, 
  Shield, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Award,
  Heart,
  Car,
  Home,
  GraduationCap,
  Filter,
  Search
} from 'lucide-react';

interface Benefit {
  id: string;
  name: string;
  type: 'health' | 'dental' | 'vision' | 'retirement' | 'transport' | 'housing' | 'education' | 'other';
  description: string;
  coverage: string;
  cost: number;
  employeeContribution: number;
  companyContribution: number;
  status: 'active' | 'inactive' | 'pending';
  effectiveDate: string;
  renewalDate: string;
}

interface ComplianceRecord {
  id: string;
  title: string;
  type: 'policy' | 'training' | 'certification' | 'audit' | 'legal';
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'expired';
  dueDate: string;
  lastReview: string;
  nextReview: string;
  responsible: string;
  priority: 'high' | 'medium' | 'low';
}

const BenefitsCompliance: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: '1',
      name: 'Health Insurance',
      type: 'health',
      description: 'Comprehensive health insurance coverage for employees and dependents',
      coverage: 'Medical, hospitalization, prescription drugs',
      cost: 50000,
      employeeContribution: 10000,
      companyContribution: 40000,
      status: 'active',
      effectiveDate: '2024-01-01',
      renewalDate: '2024-12-31'
    },
    {
      id: '2',
      name: 'Transport Allowance',
      type: 'transport',
      description: 'Monthly transport allowance for commuting to work',
      coverage: 'Public transport, fuel allowance',
      cost: 25000,
      employeeContribution: 0,
      companyContribution: 25000,
      status: 'active',
      effectiveDate: '2024-01-01',
      renewalDate: '2024-12-31'
    },
    {
      id: '3',
      name: 'Housing Allowance',
      type: 'housing',
      description: 'Monthly housing allowance for accommodation',
      coverage: 'Rent, utilities',
      cost: 100000,
      employeeContribution: 0,
      companyContribution: 100000,
      status: 'active',
      effectiveDate: '2024-01-01',
      renewalDate: '2024-12-31'
    },
    {
      id: '4',
      name: 'Education Support',
      type: 'education',
      description: 'Support for employee education and training',
      coverage: 'Course fees, books, certification',
      cost: 200000,
      employeeContribution: 50000,
      companyContribution: 150000,
      status: 'active',
      effectiveDate: '2024-01-01',
      renewalDate: '2024-12-31'
    },
    {
      id: '5',
      name: 'Retirement Plan',
      type: 'retirement',
      description: 'Company-sponsored retirement savings plan',
      coverage: 'Pension fund, matching contributions',
      cost: 30000,
      employeeContribution: 15000,
      companyContribution: 15000,
      status: 'active',
      effectiveDate: '2024-01-01',
      renewalDate: '2024-12-31'
    }
  ]);

  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([
    {
      id: '1',
      title: 'Workplace Safety Policy',
      type: 'policy',
      description: 'Comprehensive workplace safety and health policy',
      status: 'compliant',
      dueDate: '2024-01-31',
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      responsible: 'Paul Mugenzi',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Anti-Harassment Training',
      type: 'training',
      description: 'Mandatory anti-harassment and discrimination training',
      status: 'pending',
      dueDate: '2024-02-15',
      lastReview: '2023-12-15',
      nextReview: '2024-02-15',
      responsible: 'Sarah Uwimana',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Security Guard Certification',
      type: 'certification',
      description: 'Valid security guard licenses and certifications',
      status: 'compliant',
      dueDate: '2024-06-30',
      lastReview: '2024-01-10',
      nextReview: '2024-06-30',
      responsible: 'Jean Claude',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Data Protection Compliance',
      type: 'legal',
      description: 'GDPR and data protection compliance review',
      status: 'non-compliant',
      dueDate: '2024-01-20',
      lastReview: '2023-12-20',
      nextReview: '2024-01-20',
      responsible: 'David Nkurunziza',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Financial Audit',
      type: 'audit',
      description: 'Annual financial audit and compliance review',
      status: 'pending',
      dueDate: '2024-03-31',
      lastReview: '2023-03-31',
      nextReview: '2024-03-31',
      responsible: 'Jean Claude',
      priority: 'medium'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'benefits' | 'compliance'>('benefits');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Benefit | ComplianceRecord | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getBenefitTypeIcon = (type: string) => {
    switch (type) {
      case 'health': return <Heart className="w-4 h-4" />;
      case 'dental': return <Shield className="w-4 h-4" />;
      case 'vision': return <Eye className="w-4 h-4" />;
      case 'retirement': return <Award className="w-4 h-4" />;
      case 'transport': return <Car className="w-4 h-4" />;
      case 'housing': return <Home className="w-4 h-4" />;
      case 'education': return <GraduationCap className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getBenefitTypeColor = (type: string) => {
    switch (type) {
      case 'health': return 'bg-red-100 text-red-800';
      case 'dental': return 'bg-blue-100 text-blue-800';
      case 'vision': return 'bg-green-100 text-green-800';
      case 'retirement': return 'bg-purple-100 text-purple-800';
      case 'transport': return 'bg-yellow-100 text-yellow-800';
      case 'housing': return 'bg-orange-100 text-orange-800';
      case 'education': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'compliant': return <CheckCircle className="w-4 h-4" />;
      case 'non-compliant': return <AlertCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
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

  const totalBenefitsCost = benefits.reduce((sum, benefit) => sum + benefit.cost, 0);
  const totalCompanyContribution = benefits.reduce((sum, benefit) => sum + benefit.companyContribution, 0);
  const activeBenefits = benefits.filter(benefit => benefit.status === 'active').length;
  const compliantRecords = complianceRecords.filter(record => record.status === 'compliant').length;
  const pendingCompliance = complianceRecords.filter(record => record.status === 'pending').length;
  const nonCompliantRecords = complianceRecords.filter(record => record.status === 'non-compliant').length;

  const handleAddBenefit = () => {
    setShowAddModal(true);
  };

  const handleViewRecord = (record: Benefit | ComplianceRecord) => {
    setSelectedRecord(record);
  };

  const handleEditRecord = (record: Benefit | ComplianceRecord) => {
    // Implement edit functionality
    console.log('Edit record:', record);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="relative px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Gift className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Benefits & Compliance</h2>
                    <p className="text-slate-600 text-lg">Manage employee benefits and compliance requirements</p>
                  </div>
                </div>
              </div>
              <AnimatedButton
                onClick={handleAddBenefit}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>Add Benefit</span>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Active Benefits"
          subtitle="Employee benefits"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeBenefits}</p>
              <p className="text-sm text-gray-500">Active benefits</p>
            </div>
            <Gift className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Cost"
          subtitle="Benefits cost"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBenefitsCost)}</p>
              <p className="text-sm text-gray-500">Monthly cost</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Compliant Records"
          subtitle="Compliance status"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{compliantRecords}</p>
              <p className="text-sm text-gray-500">Compliant items</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Pending Items"
          subtitle="Requiring attention"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingCompliance + nonCompliantRecords}</p>
              <p className="text-sm text-gray-500">Pending/Non-compliant</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'benefits'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>Employee Benefits</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compliance'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Compliance</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'benefits' ? (
            /* Employee Benefits */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getBenefitTypeIcon(benefit.type)}
                        <h4 className="font-semibold text-gray-900">{benefit.name}</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(benefit.status)}`}>
                        {getStatusIcon(benefit.status)}
                        <span className="ml-1 capitalize">{benefit.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{benefit.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Cost</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(benefit.cost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Company Contribution</span>
                        <span className="text-gray-900">{formatCurrency(benefit.companyContribution)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Employee Contribution</span>
                        <span className="text-gray-900">{formatCurrency(benefit.employeeContribution)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBenefitTypeColor(benefit.type)}`}>
                        {benefit.type}
                      </span>
                      <span className="text-xs text-gray-500">Renewal: {benefit.renewalDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Compliance Records */
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Responsible</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{record.title}</p>
                            <p className="text-sm text-gray-500">{record.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBenefitTypeColor(record.type)}`}>
                            {record.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                            <span className="ml-1 capitalize">{record.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{record.dueDate}</td>
                        <td className="py-3 px-4 text-gray-700">{record.responsible}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(record.priority)}`}>
                            {record.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <AnimatedButton
                              onClick={() => handleViewRecord(record)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </AnimatedButton>
                            <AnimatedButton
                              onClick={() => handleEditRecord(record)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </AnimatedButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {activeTab === 'benefits' ? 'Benefit Details' : 'Compliance Record Details'}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {activeTab === 'benefits' ? (
                /* Benefit Details */
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Benefit Name</label>
                    <p className="text-gray-900">{(selectedRecord as Benefit).name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBenefitTypeColor((selectedRecord as Benefit).type)}`}>
                      {(selectedRecord as Benefit).type}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900">{(selectedRecord as Benefit).description}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Coverage</label>
                    <p className="text-gray-900">{(selectedRecord as Benefit).coverage}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Cost</label>
                    <p className="text-gray-900 font-semibold">{formatCurrency((selectedRecord as Benefit).cost)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((selectedRecord as Benefit).status)}`}>
                      {getStatusIcon((selectedRecord as Benefit).status)}
                      <span className="ml-1 capitalize">{(selectedRecord as Benefit).status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Contribution</label>
                    <p className="text-gray-900">{formatCurrency((selectedRecord as Benefit).companyContribution)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Contribution</label>
                    <p className="text-gray-900">{formatCurrency((selectedRecord as Benefit).employeeContribution)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                    <p className="text-gray-900">{(selectedRecord as Benefit).effectiveDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
                    <p className="text-gray-900">{(selectedRecord as Benefit).renewalDate}</p>
                  </div>
                </div>
              ) : (
                /* Compliance Record Details */
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-gray-900">{(selectedRecord as ComplianceRecord).title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBenefitTypeColor((selectedRecord as ComplianceRecord).type)}`}>
                      {(selectedRecord as ComplianceRecord).type}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900">{(selectedRecord as ComplianceRecord).description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor((selectedRecord as ComplianceRecord).status)}`}>
                      {getStatusIcon((selectedRecord as ComplianceRecord).status)}
                      <span className="ml-1 capitalize">{(selectedRecord as ComplianceRecord).status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor((selectedRecord as ComplianceRecord).priority)}`}>
                      {(selectedRecord as ComplianceRecord).priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <p className="text-gray-900">{(selectedRecord as ComplianceRecord).dueDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Responsible</label>
                    <p className="text-gray-900">{(selectedRecord as ComplianceRecord).responsible}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Review</label>
                    <p className="text-gray-900">{(selectedRecord as ComplianceRecord).lastReview}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Next Review</label>
                    <p className="text-gray-900">{(selectedRecord as ComplianceRecord).nextReview}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditRecord(selectedRecord)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Record
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component
export default BenefitsCompliance;
