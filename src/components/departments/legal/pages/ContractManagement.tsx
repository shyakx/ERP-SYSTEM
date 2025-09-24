import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  FileText, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  User,
  Building,
  DollarSign,
  Download,
  Send,
  Search,
  Filter
} from 'lucide-react';

interface Contract {
  id: string;
  title: string;
  type: 'service' | 'employment' | 'supplier' | 'client' | 'lease' | 'other';
  status: 'draft' | 'review' | 'approved' | 'signed' | 'expired' | 'terminated';
  value: number;
  startDate: string;
  endDate: string;
  counterparty: string;
  responsible: string;
  lastModified: string;
  priority: 'high' | 'medium' | 'low';
  renewalDate?: string;
  autoRenewal: boolean;
}

const ContractManagement: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      title: 'Security Services Agreement - ABC Corporation',
      type: 'service',
      status: 'signed',
      value: 5000000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      counterparty: 'ABC Corporation',
      responsible: 'Paul Mugenzi',
      lastModified: '2024-01-15',
      priority: 'high',
      renewalDate: '2024-11-01',
      autoRenewal: true
    },
    {
      id: '2',
      title: 'Office Lease Agreement',
      type: 'lease',
      status: 'signed',
      value: 2400000,
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      counterparty: 'Kigali Business Center',
      responsible: 'Jean Claude',
      lastModified: '2024-01-10',
      priority: 'medium',
      renewalDate: '2025-04-01',
      autoRenewal: false
    },
    {
      id: '3',
      title: 'IT Services Contract - Tech Solutions Ltd',
      type: 'supplier',
      status: 'review',
      value: 1800000,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      counterparty: 'Tech Solutions Ltd',
      responsible: 'David Nkurunziza',
      lastModified: '2024-01-20',
      priority: 'medium',
      autoRenewal: false
    },
    {
      id: '4',
      title: 'Employment Contract Template',
      type: 'employment',
      status: 'approved',
      value: 0,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      counterparty: 'Internal',
      responsible: 'Sarah Uwimana',
      lastModified: '2024-01-18',
      priority: 'high',
      autoRenewal: false
    },
    {
      id: '5',
      title: 'Equipment Maintenance Agreement',
      type: 'supplier',
      status: 'expired',
      value: 800000,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      counterparty: 'Maintenance Services Ltd',
      responsible: 'Paul Mugenzi',
      lastModified: '2023-12-15',
      priority: 'low',
      autoRenewal: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-800';
      case 'employment': return 'bg-green-100 text-green-800';
      case 'supplier': return 'bg-purple-100 text-purple-800';
      case 'client': return 'bg-orange-100 text-orange-800';
      case 'lease': return 'bg-yellow-100 text-yellow-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'review': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'signed': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      case 'terminated': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
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

  const filteredContracts = contracts.filter(contract => {
    const statusMatch = filterStatus === 'all' || contract.status === filterStatus;
    const typeMatch = filterType === 'all' || contract.type === filterType;
    return statusMatch && typeMatch;
  });

  const totalValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = contracts.filter(contract => contract.status === 'signed').length;
  const pendingReview = contracts.filter(contract => contract.status === 'review').length;
  const expiringSoon = contracts.filter(contract => {
    if (!contract.renewalDate) return false;
    const renewalDate = new Date(contract.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }).length;

  const handleAddContract = () => {
    setShowAddModal(true);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
  };

  const handleEditContract = (contract: Contract) => {
    // Implement edit functionality
    console.log('Edit contract:', contract);
  };

  const handleSignContract = (contract: Contract) => {
    // Implement sign functionality
    console.log('Sign contract:', contract);
  };

  const handleDownloadContract = (contract: Contract) => {
    // Implement download functionality
    console.log('Download contract:', contract);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contract Management</h2>
          <p className="text-gray-600">Manage legal contracts and agreements</p>
        </div>
        <AnimatedButton
          onClick={handleAddContract}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contract</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Value"
          subtitle="All contracts"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
              <p className="text-sm text-gray-500">Total value</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Contracts"
          subtitle="Currently signed"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeContracts}</p>
              <p className="text-sm text-gray-500">Active contracts</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Pending Review"
          subtitle="Awaiting approval"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingReview}</p>
              <p className="text-sm text-gray-500">Pending review</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Expiring Soon"
          subtitle="Next 30 days"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{expiringSoon}</p>
              <p className="text-sm text-gray-500">Expiring soon</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
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
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="approved">Approved</option>
            <option value="signed">Signed</option>
            <option value="expired">Expired</option>
            <option value="terminated">Terminated</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="service">Service</option>
            <option value="employment">Employment</option>
            <option value="supplier">Supplier</option>
            <option value="client">Client</option>
            <option value="lease">Lease</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Contracts Table */}
      <AnimatedCard
        title="Contracts"
        subtitle="Legal contracts and agreements"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contract</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Counterparty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">End Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{contract.title}</p>
                      <p className="text-sm text-gray-500">
                        {contract.responsible} • {contract.lastModified}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
                      {contract.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{contract.counterparty}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">
                      {contract.value > 0 ? formatCurrency(contract.value) : 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {getStatusIcon(contract.status)}
                        <span className="ml-1 capitalize">{contract.status}</span>
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contract.priority)}`}>
                        {contract.priority}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-700">{contract.endDate}</p>
                      {contract.renewalDate && (
                        <p className="text-xs text-gray-500">Renewal: {contract.renewalDate}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewContract(contract)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditContract(contract)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                      {contract.status === 'approved' && (
                        <AnimatedButton
                          onClick={() => handleSignContract(contract)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        >
                          <Send className="w-4 h-4" />
                        </AnimatedButton>
                      )}
                      <AnimatedButton
                        onClick={() => handleDownloadContract(contract)}
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

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Contract Details</h3>
              <button
                onClick={() => setSelectedContract(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contract Title</label>
                  <p className="text-gray-900">{selectedContract.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedContract.type)}`}>
                    {selectedContract.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContract.status)}`}>
                    {getStatusIcon(selectedContract.status)}
                    <span className="ml-1 capitalize">{selectedContract.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedContract.priority)}`}>
                    {selectedContract.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Counterparty</label>
                  <p className="text-gray-900">{selectedContract.counterparty}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Responsible</label>
                  <p className="text-gray-900">{selectedContract.responsible}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Value</label>
                  <p className="text-gray-900 font-semibold">
                    {selectedContract.value > 0 ? formatCurrency(selectedContract.value) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Auto Renewal</label>
                  <p className="text-gray-900">{selectedContract.autoRenewal ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <p className="text-gray-900">{selectedContract.startDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <p className="text-gray-900">{selectedContract.endDate}</p>
                </div>
                {selectedContract.renewalDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
                    <p className="text-gray-900">{selectedContract.renewalDate}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                  <p className="text-gray-900">{selectedContract.lastModified}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedContract(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditContract(selectedContract)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Contract
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractManagement;
