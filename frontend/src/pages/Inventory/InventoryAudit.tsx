import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Calendar,
  MapPin,
  Users,
  Package,
  FileText,
  BarChart3,
  TrendingUp,
  Clock
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface AuditRecord {
  id: string;
  auditNumber: string;
  auditType: 'full' | 'partial' | 'cycle' | 'spot';
  auditorId: string;
  auditorName: string;
  startDate: string;
  endDate?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  location: string;
  category: string;
  totalItems: number;
  auditedItems: number;
  discrepancies: number;
  accuracyRate: number;
  notes: string;
  findings: AuditFinding[];
}

interface AuditFinding {
  id: string;
  itemId: string;
  itemName: string;
  itemCode: string;
  expectedQuantity: number;
  actualQuantity: number;
  variance: number;
  variancePercentage: number;
  type: 'shortage' | 'overage' | 'missing' | 'damaged' | 'expired' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  actionRequired: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignedTo?: string;
  resolutionDate?: string;
  resolutionNotes?: string;
}

interface AuditSchedule {
  id: string;
  auditType: string;
  location: string;
  category: string;
  scheduledDate: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  assignedAuditor: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  lastAuditDate?: string;
  nextAuditDate: string;
}

interface AuditReport {
  id: string;
  auditId: string;
  auditNumber: string;
  reportDate: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  accuracyRate: number;
  totalValue: number;
  discrepanciesValue: number;
  attachments: string[];
  status: 'draft' | 'review' | 'approved' | 'published';
}

const InventoryAudit: React.FC = () => {
  const { user } = useAuth();
  const [auditRecords, setAuditRecords] = useState<AuditRecord[]>([]);
  const [schedules, setSchedules] = useState<AuditSchedule[]>([]);
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showNewAudit, setShowNewAudit] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<AuditRecord | null>(null);

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      setLoading(true);
      const [recordsData, schedulesData, reportsData] = await Promise.all([
        apiService.get('/api/audit-records'),
        apiService.get('/api/audit-schedules'),
        apiService.get('/api/audit-reports')
      ]);
      setAuditRecords(recordsData);
      setSchedules(schedulesData);
      setReports(reportsData);
    } catch (error) {
      console.error('Error fetching audit data:', error);
      toast.error('Failed to fetch audit data');
    } finally {
      setLoading(false);
    }
  };

  const filteredAudits = auditRecords.filter(audit =>
    audit.auditNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.auditorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(audit =>
    selectedType === 'all' || audit.auditType === selectedType
  ).filter(audit =>
    selectedStatus === 'all' || audit.status === selectedStatus
  ).filter(audit =>
    selectedLocation === 'all' || audit.location === selectedLocation
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'planned': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'full': 'bg-purple-100 text-purple-800',
      'partial': 'bg-blue-100 text-blue-800',
      'cycle': 'bg-green-100 text-green-800',
      'spot': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getFindingTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'shortage': 'bg-red-100 text-red-800',
      'overage': 'bg-blue-100 text-blue-800',
      'missing': 'bg-orange-100 text-orange-800',
      'damaged': 'bg-yellow-100 text-yellow-800',
      'expired': 'bg-purple-100 text-purple-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalAudits = () => auditRecords.length;
  const getCompletedAudits = () => auditRecords.filter(a => a.status === 'completed').length;
  const getInProgressAudits = () => auditRecords.filter(a => a.status === 'in_progress').length;
  const getAverageAccuracy = () => {
    const completed = auditRecords.filter(a => a.status === 'completed');
    if (completed.length === 0) return 0;
    return Math.round(completed.reduce((sum, a) => sum + a.accuracyRate, 0) / completed.length);
  };

  const getTotalDiscrepancies = () => {
    return auditRecords.reduce((sum, audit) => sum + audit.discrepancies, 0);
  };

  if (loading) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ClipboardCheck className="h-8 w-8 text-blue-600" />
                Inventory Audit
              </h1>
              <p className="text-gray-600 mt-2">Track inventory audits and compliance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewAudit(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Audit
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Audits</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalAudits()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{getCompletedAudits()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{getInProgressAudits()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{getAverageAccuracy()}%</p>
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
                  placeholder="Search audits, auditors, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="full">Full Audit</option>
                <option value="partial">Partial Audit</option>
                <option value="cycle">Cycle Count</option>
                <option value="spot">Spot Check</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {Array.from(new Set(auditRecords.map(audit => audit.location))).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Audit Records Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Audit Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Auditor & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy & Discrepancies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAudits.map(audit => (
                  <tr key={audit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{audit.auditNumber}</div>
                        <div className="text-sm text-gray-500">{audit.category}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(audit.auditType)}`}>
                          {audit.auditType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{audit.auditorName}</div>
                        <div className="text-sm text-gray-500">{audit.location}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(audit.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {audit.auditedItems}/{audit.totalItems}
                        </div>
                        <div className="text-sm text-gray-500">Items Audited</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${Math.round((audit.auditedItems / audit.totalItems) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{audit.accuracyRate}%</div>
                        <div className="text-sm text-gray-500">Accuracy</div>
                        <div className="text-sm text-gray-900">{audit.discrepancies}</div>
                        <div className="text-sm text-gray-500">Discrepancies</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedAudit(audit)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <FileText className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Detail Modal */}
        {selectedAudit && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Audit Details</h3>
                  <button
                    onClick={() => setSelectedAudit(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Audit Number</label>
                      <p className="text-sm text-gray-900">#{selectedAudit.auditNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedAudit.auditType)}`}>
                        {selectedAudit.auditType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Auditor</label>
                      <p className="text-sm text-gray-900">{selectedAudit.auditorName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAudit.status)}`}>
                        {selectedAudit.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedAudit.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900">{selectedAudit.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedAudit.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <p className="text-sm text-gray-900">
                        {selectedAudit.endDate ? new Date(selectedAudit.endDate).toLocaleDateString() : 'In Progress'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Items</label>
                      <p className="text-sm text-gray-900">{selectedAudit.totalItems}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Audited Items</label>
                      <p className="text-sm text-gray-900">{selectedAudit.auditedItems}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Accuracy Rate</label>
                      <p className="text-sm text-gray-900">{selectedAudit.accuracyRate}%</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Discrepancies</label>
                      <p className="text-sm text-gray-900">{selectedAudit.discrepancies}</p>
                    </div>
                  </div>

                  {selectedAudit.findings.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Findings</label>
                      <div className="space-y-2">
                        {selectedAudit.findings.map(finding => (
                          <div key={finding.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{finding.itemName}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFindingTypeColor(finding.type)}`}>
                                {finding.type}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{finding.description}</div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>Expected: {finding.expectedQuantity} | Actual: {finding.actualQuantity}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                                {finding.severity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAudit.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Audit
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Complete Audit
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  </div>
);
};

export default InventoryAudit; 