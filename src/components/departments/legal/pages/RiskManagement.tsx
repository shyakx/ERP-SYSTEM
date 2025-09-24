import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  AlertTriangle, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Building,
  DollarSign,
  Download,
  Upload,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Zap,
  Activity
} from 'lucide-react';

interface Risk {
  id: string;
  title: string;
  category: 'operational' | 'financial' | 'legal' | 'reputational' | 'strategic' | 'compliance' | 'security' | 'technology';
  type: 'threat' | 'opportunity' | 'uncertainty';
  status: 'identified' | 'assessed' | 'mitigated' | 'monitored' | 'closed' | 'escalated';
  probability: 'low' | 'medium' | 'high' | 'very-high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  rootCause: string;
  potentialImpact: string;
  mitigationStrategy: string;
  owner: string;
  department: string;
  identifiedDate: string;
  lastReview: string;
  nextReview: string;
  cost: number;
  residualRisk: 'low' | 'medium' | 'high' | 'critical';
  controls: string[];
  indicators: string[];
  escalationThreshold: string;
  relatedRisks: string[];
}

const RiskManagement: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([
    {
      id: '1',
      title: 'Security Personnel Shortage',
      category: 'operational',
      type: 'threat',
      status: 'mitigated',
      probability: 'high',
      impact: 'high',
      riskLevel: 'high',
      description: 'Risk of insufficient security personnel to meet client demands and maintain service quality',
      rootCause: 'High turnover rate, competitive job market, limited training resources',
      potentialImpact: 'Service delivery delays, client dissatisfaction, revenue loss, reputation damage',
      mitigationStrategy: 'Implement retention programs, improve training, competitive compensation, recruitment partnerships',
      owner: 'Paul Mugenzi',
      department: 'Operations',
      identifiedDate: '2024-01-01',
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      cost: 2000000,
      residualRisk: 'medium',
      controls: [
        'Employee retention programs',
        'Competitive compensation packages',
        'Training and development programs',
        'Recruitment partnerships'
      ],
      indicators: [
        'Employee turnover rate',
        'Time to fill positions',
        'Client satisfaction scores',
        'Service delivery metrics'
      ],
      escalationThreshold: 'Turnover rate > 25%',
      relatedRisks: ['2', '3']
    },
    {
      id: '2',
      title: 'Regulatory Compliance Violation',
      category: 'compliance',
      type: 'threat',
      status: 'monitored',
      probability: 'medium',
      impact: 'critical',
      riskLevel: 'high',
      description: 'Risk of non-compliance with security services regulations and labor laws',
      rootCause: 'Complex regulatory environment, changing requirements, limited legal expertise',
      potentialImpact: 'Fines, penalties, license suspension, legal action, reputation damage',
      mitigationStrategy: 'Regular compliance audits, legal consultation, staff training, policy updates',
      owner: 'Jean Claude',
      department: 'Legal',
      identifiedDate: '2024-01-05',
      lastReview: '2024-01-20',
      nextReview: '2024-02-20',
      cost: 5000000,
      residualRisk: 'low',
      controls: [
        'Compliance monitoring system',
        'Legal consultation services',
        'Staff training programs',
        'Policy review processes'
      ],
      indicators: [
        'Compliance audit results',
        'Regulatory change notifications',
        'Training completion rates',
        'Policy update frequency'
      ],
      escalationThreshold: 'Any regulatory violation',
      relatedRisks: ['1', '4']
    },
    {
      id: '3',
      title: 'Client Contract Termination',
      category: 'financial',
      type: 'threat',
      status: 'assessed',
      probability: 'medium',
      impact: 'high',
      riskLevel: 'medium',
      description: 'Risk of major client contract termination affecting revenue and operations',
      rootCause: 'Service quality issues, pricing concerns, competitive pressure, client dissatisfaction',
      potentialImpact: 'Revenue loss, operational disruption, reputation damage, financial instability',
      mitigationStrategy: 'Client relationship management, service quality improvement, competitive pricing, contract diversification',
      owner: 'Sales Team',
      department: 'Sales & Marketing',
      identifiedDate: '2024-01-10',
      lastReview: '2024-01-25',
      nextReview: '2024-03-25',
      cost: 10000000,
      residualRisk: 'medium',
      controls: [
        'Client satisfaction surveys',
        'Service quality monitoring',
        'Contract diversification',
        'Relationship management programs'
      ],
      indicators: [
        'Client satisfaction scores',
        'Contract renewal rates',
        'Service delivery metrics',
        'Client feedback trends'
      ],
      escalationThreshold: 'Client satisfaction < 80%',
      relatedRisks: ['1', '5']
    },
    {
      id: '4',
      title: 'Data Security Breach',
      category: 'security',
      type: 'threat',
      status: 'monitored',
      probability: 'low',
      impact: 'critical',
      riskLevel: 'high',
      description: 'Risk of unauthorized access to sensitive client and employee data',
      rootCause: 'Cybersecurity vulnerabilities, human error, inadequate security measures',
      potentialImpact: 'Data loss, privacy violations, legal liability, reputation damage, financial penalties',
      mitigationStrategy: 'Cybersecurity measures, staff training, access controls, incident response plan',
      owner: 'David Nkurunziza',
      department: 'IT',
      identifiedDate: '2024-01-08',
      lastReview: '2024-01-22',
      nextReview: '2024-02-22',
      cost: 3000000,
      residualRisk: 'low',
      controls: [
        'Firewall and antivirus software',
        'Access control systems',
        'Staff security training',
        'Incident response procedures'
      ],
      indicators: [
        'Security audit results',
        'Access attempt logs',
        'Training completion rates',
        'Incident response times'
      ],
      escalationThreshold: 'Any security incident',
      relatedRisks: ['2', '6']
    },
    {
      id: '5',
      title: 'Economic Downturn Impact',
      category: 'strategic',
      type: 'threat',
      status: 'identified',
      probability: 'medium',
      impact: 'high',
      riskLevel: 'medium',
      description: 'Risk of economic downturn affecting client demand and payment capabilities',
      rootCause: 'Economic instability, market volatility, client budget constraints',
      potentialImpact: 'Reduced demand, payment delays, revenue decline, operational challenges',
      mitigationStrategy: 'Diversified client base, flexible pricing, cost optimization, market expansion',
      owner: 'Finance Team',
      department: 'Finance',
      identifiedDate: '2024-01-12',
      lastReview: '2024-01-28',
      nextReview: '2024-04-28',
      cost: 0,
      residualRisk: 'medium',
      controls: [
        'Client diversification strategy',
        'Flexible pricing models',
        'Cost optimization programs',
        'Market expansion plans'
      ],
      indicators: [
        'Economic indicators',
        'Client payment trends',
        'Market demand metrics',
        'Revenue projections'
      ],
      escalationThreshold: 'Revenue decline > 20%',
      relatedRisks: ['3', '7']
    },
    {
      id: '6',
      title: 'Technology System Failure',
      category: 'technology',
      type: 'threat',
      status: 'mitigated',
      probability: 'low',
      impact: 'high',
      riskLevel: 'medium',
      description: 'Risk of critical technology system failures affecting operations',
      rootCause: 'System aging, inadequate maintenance, power outages, cyber attacks',
      potentialImpact: 'Operational disruption, service delays, data loss, client dissatisfaction',
      mitigationStrategy: 'System upgrades, backup systems, maintenance schedules, disaster recovery plan',
      owner: 'David Nkurunziza',
      department: 'IT',
      identifiedDate: '2024-01-15',
      lastReview: '2024-01-30',
      nextReview: '2024-04-30',
      cost: 1500000,
      residualRisk: 'low',
      controls: [
        'System backup procedures',
        'Maintenance schedules',
        'Disaster recovery plan',
        'System monitoring tools'
      ],
      indicators: [
        'System uptime metrics',
        'Maintenance completion rates',
        'Backup success rates',
        'Incident response times'
      ],
      escalationThreshold: 'System downtime > 4 hours',
      relatedRisks: ['4', '8']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'legal': return 'bg-purple-100 text-purple-800';
      case 'reputational': return 'bg-pink-100 text-pink-800';
      case 'strategic': return 'bg-orange-100 text-orange-800';
      case 'compliance': return 'bg-yellow-100 text-yellow-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'technology': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified': return 'bg-gray-100 text-gray-800';
      case 'assessed': return 'bg-yellow-100 text-yellow-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      case 'monitored': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'identified': return <AlertTriangle className="w-4 h-4" />;
      case 'assessed': return <Eye className="w-4 h-4" />;
      case 'mitigated': return <CheckCircle className="w-4 h-4" />;
      case 'monitored': return <Activity className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      case 'escalated': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'threat': return 'bg-red-100 text-red-800';
      case 'opportunity': return 'bg-green-100 text-green-800';
      case 'uncertainty': return 'bg-yellow-100 text-yellow-800';
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

  const filteredRisks = risks.filter(risk => {
    const statusMatch = filterStatus === 'all' || risk.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || risk.category === filterCategory;
    const riskLevelMatch = filterRiskLevel === 'all' || risk.riskLevel === filterRiskLevel;
    const typeMatch = filterType === 'all' || risk.type === filterType;
    return statusMatch && categoryMatch && riskLevelMatch && typeMatch;
  });

  const totalRisks = risks.length;
  const criticalRisks = risks.filter(risk => risk.riskLevel === 'critical').length;
  const highRisks = risks.filter(risk => risk.riskLevel === 'high').length;
  const mitigatedRisks = risks.filter(risk => risk.status === 'mitigated').length;
  const totalCost = risks.reduce((sum, risk) => sum + risk.cost, 0);

  const handleAddRisk = () => {
    setShowAddModal(true);
  };

  const handleViewRisk = (risk: Risk) => {
    setSelectedRisk(risk);
  };

  const handleEditRisk = (risk: Risk) => {
    // Implement edit functionality
    console.log('Edit risk:', risk);
  };

  const handleMitigateRisk = (risk: Risk) => {
    // Implement mitigate functionality
    console.log('Mitigate risk:', risk);
  };

  const handleEscalateRisk = (risk: Risk) => {
    // Implement escalate functionality
    console.log('Escalate risk:', risk);
  };

  const handleDownloadReport = (risk: Risk) => {
    // Implement download functionality
    console.log('Download report for:', risk);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Risk Management</h2>
          <p className="text-gray-600">Identify, assess, and mitigate business risks</p>
        </div>
        <AnimatedButton
          onClick={handleAddRisk}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Risk</span>
        </AnimatedButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Risks"
          subtitle="All identified risks"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalRisks}</p>
              <p className="text-sm text-gray-500">Total risks</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Critical Risks"
          subtitle="High priority risks"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{criticalRisks}</p>
              <p className="text-sm text-gray-500">Critical risks</p>
            </div>
            <Zap className="w-8 h-8 text-red-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="High Risks"
          subtitle="Requires attention"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{highRisks}</p>
              <p className="text-sm text-gray-500">High risks</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Mitigated Risks"
          subtitle="Successfully managed"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{mitigatedRisks}</p>
              <p className="text-sm text-gray-500">Mitigated risks</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
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
            <option value="identified">Identified</option>
            <option value="assessed">Assessed</option>
            <option value="mitigated">Mitigated</option>
            <option value="monitored">Monitored</option>
            <option value="closed">Closed</option>
            <option value="escalated">Escalated</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="operational">Operational</option>
            <option value="financial">Financial</option>
            <option value="legal">Legal</option>
            <option value="reputational">Reputational</option>
            <option value="strategic">Strategic</option>
            <option value="compliance">Compliance</option>
            <option value="security">Security</option>
            <option value="technology">Technology</option>
          </select>
          <select
            value={filterRiskLevel}
            onChange={(e) => setFilterRiskLevel(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="threat">Threat</option>
            <option value="opportunity">Opportunity</option>
            <option value="uncertainty">Uncertainty</option>
          </select>
        </div>
      </div>

      {/* Risks Table */}
      <AnimatedCard
        title="Risk Register"
        subtitle="Identified and assessed business risks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Owner</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Next Review</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRisks.map((risk) => (
                <tr key={risk.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{risk.title}</p>
                      <p className="text-sm text-gray-500">{risk.department}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(risk.category)}`}>
                      {risk.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(risk.type)}`}>
                      {risk.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                      {getStatusIcon(risk.status)}
                      <span className="ml-1 capitalize">{risk.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(risk.riskLevel)}`}>
                      {risk.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{risk.owner}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-700">{risk.nextReview}</p>
                      <p className="text-xs text-gray-500">Last: {risk.lastReview}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewRisk(risk)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditRisk(risk)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                      {risk.status !== 'mitigated' && (
                        <AnimatedButton
                          onClick={() => handleMitigateRisk(risk)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        >
                          <Shield className="w-4 h-4" />
                        </AnimatedButton>
                      )}
                      {risk.riskLevel === 'critical' && risk.status !== 'escalated' && (
                        <AnimatedButton
                          onClick={() => handleEscalateRisk(risk)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </AnimatedButton>
                      )}
                      <AnimatedButton
                        onClick={() => handleDownloadReport(risk)}
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

      {/* Risk Details Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Risk Details</h3>
              <button
                onClick={() => setSelectedRisk(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="text-gray-900">{selectedRisk.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedRisk.category)}`}>
                    {selectedRisk.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedRisk.type)}`}>
                    {selectedRisk.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRisk.status)}`}>
                    {getStatusIcon(selectedRisk.status)}
                    <span className="ml-1 capitalize">{selectedRisk.status}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(selectedRisk.riskLevel)}`}>
                    {selectedRisk.riskLevel}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Residual Risk</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(selectedRisk.residualRisk)}`}>
                    {selectedRisk.residualRisk}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner</label>
                  <p className="text-gray-900">{selectedRisk.owner}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedRisk.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cost</label>
                  <p className="text-gray-900 font-semibold">
                    {selectedRisk.cost > 0 ? formatCurrency(selectedRisk.cost) : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Probability</label>
                  <p className="text-gray-900">{selectedRisk.probability}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Impact</label>
                  <p className="text-gray-900">{selectedRisk.impact}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Identified Date</label>
                  <p className="text-gray-900">{selectedRisk.identifiedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Review</label>
                  <p className="text-gray-900">{selectedRisk.lastReview}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Review</label>
                  <p className="text-gray-900">{selectedRisk.nextReview}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Escalation Threshold</label>
                  <p className="text-gray-900">{selectedRisk.escalationThreshold}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedRisk.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Root Cause</label>
                <p className="text-gray-900">{selectedRisk.rootCause}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Potential Impact</label>
                <p className="text-gray-900">{selectedRisk.potentialImpact}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Mitigation Strategy</label>
                <p className="text-gray-900">{selectedRisk.mitigationStrategy}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Controls</label>
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {selectedRisk.controls.map((control, index) => (
                    <li key={index}>{control}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Key Indicators</label>
                <ul className="list-disc list-inside text-gray-900 space-y-1">
                  {selectedRisk.indicators.map((indicator, index) => (
                    <li key={index}>{indicator}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedRisk(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditRisk(selectedRisk)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Risk
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskManagement;
