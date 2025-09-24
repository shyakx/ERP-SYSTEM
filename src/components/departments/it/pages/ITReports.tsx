import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  Filter,
  Server,
  Users,
  Shield,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Database,
  Wifi,
  HardDrive
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  type: 'system' | 'security' | 'performance' | 'usage';
  period: string;
  generatedAt: string;
  status: 'ready' | 'generating' | 'error';
  size: string;
}

const ITReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports: ReportData[] = [
    {
      id: '1',
      title: 'System Performance Report',
      type: 'performance',
      period: 'Last 7 days',
      generatedAt: '2024-01-15 10:30:00',
      status: 'ready',
      size: '2.3 MB'
    },
    {
      id: '2',
      title: 'Security Audit Report',
      type: 'security',
      period: 'Last 30 days',
      generatedAt: '2024-01-14 09:15:00',
      status: 'ready',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'User Activity Report',
      type: 'usage',
      period: 'Last 7 days',
      generatedAt: '2024-01-15 08:45:00',
      status: 'ready',
      size: '3.1 MB'
    },
    {
      id: '4',
      title: 'Network Traffic Analysis',
      type: 'system',
      period: 'Last 24 hours',
      generatedAt: '2024-01-15 11:00:00',
      status: 'generating',
      size: '0 MB'
    }
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: '45%', trend: 'up', change: '+2%' },
    { name: 'Memory Usage', value: '68%', trend: 'up', change: '+5%' },
    { name: 'Disk Usage', value: '78%', trend: 'up', change: '+3%' },
    { name: 'Network Latency', value: '23ms', trend: 'down', change: '-5ms' }
  ];

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'performance': return <Activity className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'usage': return <Users className="w-5 h-5" />;
      case 'system': return <Server className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IT Reports</h1>
          <p className="text-gray-600">System analytics, performance reports, and operational insights</p>
        </div>
        <div className="flex space-x-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Generate Report</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </AnimatedButton>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <AnimatedCard
            key={index}
            title={metric.name}
            subtitle={metric.change}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-500">Current status</p>
              </div>
              <div className={`flex items-center space-x-1 ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? 
                  <TrendingUp className="w-6 h-6" /> : 
                  <TrendingDown className="w-6 h-6" />
                }
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Reports</option>
              <option value="performance">Performance</option>
              <option value="security">Security</option>
              <option value="usage">Usage</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-end">
            <AnimatedButton
              onClick={() => {}}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getReportIcon(report.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{report.title}</h4>
                      <p className="text-sm text-gray-500">Period: {report.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{report.status}</span>
                    </span>
                    <span className="text-sm text-gray-500">{report.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>Generated: </span>
                    <span className="font-medium">{report.generatedAt}</span>
                  </div>
                  <div className="flex space-x-2">
                    <AnimatedButton
                      onClick={() => {}}
                      className="flex items-center space-x-1 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>View</span>
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => {}}
                      className="flex items-center space-x-1 text-green-600 hover:bg-green-50 px-3 py-1 rounded"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedCard
          title="Report Generation"
          subtitle="Automated reports"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Daily Reports</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Weekly Reports</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Monthly Reports</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </span>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Data Retention"
          subtitle="Report storage"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Reports</span>
              <span className="font-medium">127</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Storage Used</span>
              <span className="font-medium">2.3 GB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Retention Period</span>
              <span className="font-medium">2 years</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Auto Cleanup</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Enabled
              </span>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Performance Trends"
          subtitle="System health"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium text-green-600">99.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="font-medium text-green-600">45ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-medium text-green-600">0.1%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Trend</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                Improving
              </span>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default ITReports;
