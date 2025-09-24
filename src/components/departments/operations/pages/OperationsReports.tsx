import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Printer
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'incident' | 'performance';
  description: string;
  generatedDate: string;
  generatedBy: string;
  status: 'ready' | 'generating' | 'error';
  fileSize: string;
  downloadCount: number;
}

const OperationsReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Daily Security Report',
      type: 'daily',
      description: 'Daily security operations summary including patrols, incidents, and guard assignments',
      generatedDate: '2024-01-15 08:00',
      generatedBy: 'Paul Mugenzi',
      status: 'ready',
      fileSize: '2.3 MB',
      downloadCount: 12
    },
    {
      id: '2',
      title: 'Weekly Performance Report',
      type: 'weekly',
      description: 'Weekly performance metrics for security team including response times and incident resolution',
      generatedDate: '2024-01-14 17:30',
      generatedBy: 'Sarah Uwimana',
      status: 'ready',
      fileSize: '4.1 MB',
      downloadCount: 8
    },
    {
      id: '3',
      title: 'Monthly Operations Summary',
      type: 'monthly',
      description: 'Comprehensive monthly report covering all security operations, trends, and recommendations',
      generatedDate: '2024-01-01 09:00',
      generatedBy: 'Jean Claude',
      status: 'ready',
      fileSize: '8.7 MB',
      downloadCount: 15
    },
    {
      id: '4',
      title: 'Incident Analysis Report',
      type: 'incident',
      description: 'Detailed analysis of security incidents including root causes and preventive measures',
      generatedDate: '2024-01-13 14:20',
      generatedBy: 'Paul Mugenzi',
      status: 'ready',
      fileSize: '3.2 MB',
      downloadCount: 6
    },
    {
      id: '5',
      title: 'Team Performance Report',
      type: 'performance',
      description: 'Individual and team performance metrics with recommendations for improvement',
      generatedDate: '2024-01-12 16:45',
      generatedBy: 'Sarah Uwimana',
      status: 'generating',
      fileSize: '0 MB',
      downloadCount: 0
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-green-100 text-green-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      case 'incident': return 'bg-red-100 text-red-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'generating': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleGenerateReport = () => {
    setShowGenerateModal(true);
  };

  const handleDownloadReport = (report: Report) => {
    // Implement download functionality
    console.log('Download report:', report);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handlePrintReport = (report: Report) => {
    // Implement print functionality
    console.log('Print report:', report);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Operations Reports</h2>
          <p className="text-gray-600">Generate and manage security operations reports</p>
        </div>
        <AnimatedButton
          onClick={handleGenerateReport}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </AnimatedButton>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Reports"
          subtitle="All generated reports"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              <p className="text-sm text-gray-500">Total reports</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Ready Reports"
          subtitle="Available for download"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'ready').length}
              </p>
              <p className="text-sm text-gray-500">Ready</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Generating"
          subtitle="In progress"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'generating').length}
              </p>
              <p className="text-sm text-gray-500">Generating</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Downloads"
          subtitle="Report downloads"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {reports.reduce((sum, r) => sum + r.downloadCount, 0)}
              </p>
              <p className="text-sm text-gray-500">Downloads</p>
            </div>
            <Download className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Reports Table */}
      <AnimatedCard
        title="Generated Reports"
        subtitle="Security operations reports and analytics"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Report</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Generated By</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Downloads</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-500 max-w-xs truncate">{report.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{report.generatedBy}</td>
                  <td className="py-3 px-4 text-gray-700">{report.generatedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{report.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{report.downloadCount}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewReport(report)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      {report.status === 'ready' && (
                        <>
                          <AnimatedButton
                            onClick={() => handleDownloadReport(report)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Download className="w-4 h-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handlePrintReport(report)}
                            className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                          >
                            <Printer className="w-4 h-4" />
                          </AnimatedButton>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Report Templates */}
      <AnimatedCard
        title="Report Templates"
        subtitle="Quick report generation options"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Daily Report</h4>
                <p className="text-sm text-gray-500">Daily operations summary</p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => {}}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm"
            >
              Generate Daily Report
            </AnimatedButton>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Weekly Report</h4>
                <p className="text-sm text-gray-500">Weekly performance metrics</p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => {}}
              className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm"
            >
              Generate Weekly Report
            </AnimatedButton>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Monthly Report</h4>
                <p className="text-sm text-gray-500">Monthly operations summary</p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => {}}
              className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm"
            >
              Generate Monthly Report
            </AnimatedButton>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Incident Report</h4>
                <p className="text-sm text-gray-500">Incident analysis report</p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => {}}
              className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm"
            >
              Generate Incident Report
            </AnimatedButton>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Performance Report</h4>
                <p className="text-sm text-gray-500">Team performance metrics</p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => {}}
              className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 px-3 rounded-lg text-sm"
            >
              Generate Performance Report
            </AnimatedButton>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Custom Report</h4>
                <p className="text-sm text-gray-500">Custom report with filters</p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => {}}
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm"
            >
              Generate Custom Report
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Title</label>
                <p className="text-gray-900">{selectedReport.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedReport.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedReport.type)}`}>
                    {selectedReport.type}
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
                  <label className="block text-sm font-medium text-gray-700">Generated By</label>
                  <p className="text-gray-900">{selectedReport.generatedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Generated Date</label>
                  <p className="text-gray-900">{selectedReport.generatedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">File Size</label>
                  <p className="text-gray-900">{selectedReport.fileSize}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Downloads</label>
                  <p className="text-gray-900">{selectedReport.downloadCount}</p>
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
              {selectedReport.status === 'ready' && (
                <>
                  <AnimatedButton
                    onClick={() => handleDownloadReport(selectedReport)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    Download
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => handlePrintReport(selectedReport)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Print
                  </AnimatedButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationsReports;
