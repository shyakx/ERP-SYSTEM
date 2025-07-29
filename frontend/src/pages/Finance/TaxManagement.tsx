import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calculator, 
  FileText, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Clock,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface TaxRecord {
  id: string;
  taxType: 'income' | 'payroll' | 'sales' | 'property' | 'corporate';
  period: string;
  filingDate: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'pending' | 'filed' | 'paid' | 'overdue' | 'disputed';
  jurisdiction: string;
  taxYear: string;
  formNumber: string;
  notes: string;
  documents: string[];
}

interface TaxCalculation {
  id: string;
  employeeId: string;
  employeeName: string;
  taxYear: string;
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  taxAmount: number;
  status: 'calculated' | 'reviewed' | 'approved';
}

const TaxManagement = () => {
  const { user } = useAuth();
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>([]);
  const [taxCalculations, setTaxCalculations] = useState<TaxCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTaxType, setSelectedTaxType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showAddTax, setShowAddTax] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TaxRecord | null>(null);

  useEffect(() => {
    fetchTaxData();
  }, []);

  const fetchTaxData = async () => {
    try {
      setLoading(true);
      const [recordsData, calculationsData] = await Promise.all([
        apiService.get('/api/tax-records'),
        apiService.get('/api/tax-calculations')
      ]);
      setTaxRecords(recordsData);
      setTaxCalculations(calculationsData);
    } catch (error) {
      console.error('Error fetching tax data:', error);
      toast.error('Failed to fetch tax data');
    } finally {
      setLoading(false);
    }
  };

  const taxTypes = [
    'income',
    'payroll',
    'sales',
    'property',
    'corporate'
  ];

  const years = ['2024', '2023', '2022', '2021'];

  const filteredRecords = taxRecords.filter(record => 
    record.taxType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.formNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(record => 
    selectedTaxType === 'all' || record.taxType === selectedTaxType
  ).filter(record => 
    selectedStatus === 'all' || record.status === selectedStatus
  ).filter(record => 
    selectedYear === 'all' || record.taxYear === selectedYear
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'filed': 'bg-blue-100 text-blue-800',
      'paid': 'bg-green-100 text-green-800',
      'overdue': 'bg-red-100 text-red-800',
      'disputed': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTaxTypeColor = (taxType: string) => {
    const colors: { [key: string]: string } = {
      'income': 'bg-blue-100 text-blue-800',
      'payroll': 'bg-green-100 text-green-800',
      'sales': 'bg-purple-100 text-purple-800',
      'property': 'bg-orange-100 text-orange-800',
      'corporate': 'bg-indigo-100 text-indigo-800'
    };
    return colors[taxType] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateTotalTaxes = () => {
    return taxRecords.reduce((sum, record) => sum + record.amount, 0);
  };

  const calculateTotalPaid = () => {
    return taxRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  };

  const calculateOutstanding = () => {
    return calculateTotalTaxes() - calculateTotalPaid();
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
                <Calculator className="h-8 w-8 text-blue-600" />
                Tax Management
              </h1>
              <p className="text-gray-600 mt-2">Manage tax filings, payments, and compliance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddTax(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Tax Record
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
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Taxes</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(calculateTotalTaxes())}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(calculateTotalPaid())}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(calculateOutstanding())}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{taxRecords.length}</p>
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
                  placeholder="Search tax records, jurisdictions, or form numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedTaxType}
                onChange={(e) => setSelectedTaxType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tax Types</option>
                {taxTypes.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="filed">Filed</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="disputed">Disputed</option>
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tax Records Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paid
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaxTypeColor(record.taxType)}`}>
                          {record.taxType}
                        </span>
                        <div className="text-sm text-gray-500">{record.jurisdiction}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.period}</div>
                        <div className="text-sm text-gray-500">{record.taxYear}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(record.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(record.paidAmount)}</div>
                      <div className="text-xs text-gray-500">
                        {record.amount > 0 ? `${((record.paidAmount / record.amount) * 100).toFixed(1)}%` : '0%'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(record.dueDate).toLocaleDateString()}
                      </div>
                      {new Date(record.dueDate) < new Date() && record.status !== 'paid' && (
                        <div className="text-xs text-red-600">Overdue</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedRecord(record)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tax Record Detail Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Tax Record Details</h3>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tax Type</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaxTypeColor(selectedRecord.taxType)}`}>
                        {selectedRecord.taxType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Jurisdiction</label>
                      <p className="text-sm text-gray-900">{selectedRecord.jurisdiction}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Period</label>
                      <p className="text-sm text-gray-900">{selectedRecord.period}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tax Year</label>
                      <p className="text-sm text-gray-900">{selectedRecord.taxYear}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Form Number</label>
                      <p className="text-sm text-gray-900">{selectedRecord.formNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedRecord.amount)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
                      <p className="text-sm text-gray-900">{formatCurrency(selectedRecord.paidAmount)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Filing Date</label>
                      <p className="text-sm text-gray-900">{new Date(selectedRecord.filingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <p className="text-sm text-gray-900">{new Date(selectedRecord.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedRecord.notes}</p>
                  </div>

                  {selectedRecord.documents.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                      <div className="space-y-2">
                        {selectedRecord.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <span className="text-sm text-gray-900">{doc}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Make Payment
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      File Return
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download Documents
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

export default TaxManagement; 