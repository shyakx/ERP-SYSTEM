import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  LineChart,
  Download,
  Filter,
  Calendar,
  Users,
  DollarSign,
  Target,
  Activity,
  Eye,
  FileText,
  Settings,
  RefreshCw,
  Search,
  ArrowUpDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  Award,
  Zap
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';

interface Report {
  id: string;
  name: string;
  type: 'financial' | 'hr' | 'sales' | 'operations' | 'security' | 'comprehensive';
  department: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'error';
  size: string;
  format: 'pdf' | 'excel' | 'csv';
}

interface AnalyticsData {
  department: string;
  revenue: number;
  employees: number;
  performance: number;
  growth: number;
}

const ReportsAnalytics: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      name: 'Q1 2024 Financial Report',
      type: 'financial',
      department: 'Finance',
      lastGenerated: '2024-02-15 09:30',
      status: 'ready',
      size: '2.4 MB',
      format: 'pdf'
    },
    {
      id: '2',
      name: 'Employee Performance Report',
      type: 'hr',
      department: 'Human Resources',
      lastGenerated: '2024-02-14 16:45',
      status: 'ready',
      size: '1.8 MB',
      format: 'excel'
    },
    {
      id: '3',
      name: 'Sales Pipeline Analysis',
      type: 'sales',
      department: 'Sales',
      lastGenerated: '2024-02-15 08:15',
      status: 'ready',
      size: '3.2 MB',
      format: 'pdf'
    },
    {
      id: '4',
      name: 'Inventory Status Report',
      type: 'operations',
      department: 'Operations',
      lastGenerated: '2024-02-13 14:20',
      status: 'ready',
      size: '1.5 MB',
      format: 'excel'
    },
    {
      id: '5',
      name: 'Security Incident Report',
      type: 'security',
      department: 'Security',
      lastGenerated: '2024-02-15 10:00',
      status: 'ready',
      size: '0.8 MB',
      format: 'pdf'
    },
    {
      id: '6',
      name: 'Comprehensive Business Report',
      type: 'comprehensive',
      department: 'All Departments',
      lastGenerated: '2024-02-12 12:00',
      status: 'ready',
      size: '5.6 MB',
      format: 'pdf'
    }
  ];

  // Mock analytics data
  const analyticsData: AnalyticsData[] = [
    {
      department: 'Finance',
      revenue: 15420000,
      employees: 32,
      performance: 94,
      growth: 12.5
    },
    {
      department: 'Sales',
      revenue: 8900000,
      employees: 38,
      performance: 87,
      growth: 15.2
    },
    {
      department: 'HR',
      revenue: 0,
      employees: 45,
      performance: 92,
      growth: 8.3
    },
    {
      department: 'IT',
      revenue: 0,
      employees: 28,
      performance: 96,
      growth: 5.7
    },
    {
      department: 'Operations',
      revenue: 0,
      employees: 25,
      performance: 89,
      growth: 11.4
    },
    {
      department: 'Security',
      revenue: 0,
      employees: 15,
      performance: 98,
      growth: 3.2
    }
  ];

  const reportTypes = [
    { value: 'financial', label: 'Financial Reports', icon: DollarSign, color: 'emerald' },
    { value: 'hr', label: 'HR Reports', icon: Users, color: 'blue' },
    { value: 'sales', label: 'Sales Reports', icon: TrendingUp, color: 'indigo' },
    { value: 'operations', label: 'Operations Reports', icon: Activity, color: 'amber' },
    { value: 'security', label: 'Security Reports', icon: Target, color: 'red' },
    { value: 'comprehensive', label: 'Comprehensive Reports', icon: BarChart3, color: 'slate' }
  ];

  const departments = [
    'Finance',
    'Human Resources',
    'Sales',
    'Operations',
    'Security',
    'IT',
    'All Departments'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'generating': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return CheckCircle;
      case 'generating': return Clock;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    const typeData = reportTypes.find(t => t.value === type);
    return typeData ? typeData.color : 'gray';
  };

  const filteredReports = reports.filter(report => {
    const matchesType = selectedReportType === 'all' || report.type === selectedReportType;
    const matchesDepartment = selectedDepartment === 'all' || report.department === selectedDepartment;
    return matchesType && matchesDepartment;
  });

  const totalRevenue = analyticsData.reduce((sum, dept) => sum + dept.revenue, 0);
  const totalEmployees = analyticsData.reduce((sum, dept) => sum + dept.employees, 0);
  const avgPerformance = analyticsData.reduce((sum, dept) => sum + dept.performance, 0) / analyticsData.length;
  const avgGrowth = analyticsData.reduce((sum, dept) => sum + dept.growth, 0) / analyticsData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and analyze performance across all departments</p>
        </div>
        <div className="flex items-center space-x-3">
          <AnimatedButton className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </AnimatedButton>
          <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">{(totalRevenue / 1000000).toFixed(1)}M RWF</p>
              <p className="text-sm text-emerald-600">+{avgGrowth.toFixed(1)}% from last month</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-xl font-bold text-gray-900">{totalEmployees}</p>
              <p className="text-sm text-blue-600">+3 new this month</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-xl font-bold text-gray-900">{avgPerformance.toFixed(1)}%</p>
              <p className="text-sm text-slate-600">+2.3% improvement</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-xl font-bold text-gray-900">98.5%</p>
              <p className="text-sm text-emerald-600">All systems operational</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatedCard title="Report Filters">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Report Types</option>
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>

          <AnimatedButton className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Clear Filters</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Reports */}
        <AnimatedCard title={`Available Reports (${filteredReports.length})`}>
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status);
              return (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 bg-${getTypeColor(report.type)}-100 rounded-lg flex items-center justify-center`}>
                      <FileText className={`w-5 h-5 text-${getTypeColor(report.type)}-600`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.department} • {report.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {report.status}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Department Performance */}
        <AnimatedCard title="Department Performance">
          <div className="space-y-4">
            {analyticsData.map((dept, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{dept.employees} employees</span>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className={`text-sm font-medium ${dept.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dept.growth >= 0 ? '+' : ''}{dept.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Performance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${dept.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{dept.performance}%</span>
                    </div>
                  </div>
                  
                  {dept.revenue > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="text-sm font-medium text-gray-900">
                        {(dept.revenue / 1000000).toFixed(1)}M RWF
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Quick Report Generation */}
      <AnimatedCard title="Quick Report Generation">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 bg-${type.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${type.color}-600`} />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{type.label}</h3>
                <p className="text-sm text-gray-600 mb-4">Generate comprehensive {type.label.toLowerCase()}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">PDF</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Excel</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">CSV</span>
                </div>
              </button>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Performance Insights */}
      <AnimatedCard title="Performance Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="text-center">
             <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <TrendingUp className="w-6 h-6 text-emerald-600" />
             </div>
             <h3 className="font-medium text-gray-900">Revenue Growth</h3>
             <p className="text-xl font-bold text-emerald-600">+12.5%</p>
             <p className="text-sm text-gray-600">vs last month</p>
           </div>
          
                     <div className="text-center">
             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <Users className="w-6 h-6 text-blue-600" />
             </div>
             <h3 className="font-medium text-gray-900">Employee Satisfaction</h3>
             <p className="text-xl font-bold text-blue-600">4.8/5</p>
             <p className="text-sm text-gray-600">Average rating</p>
           </div>
          
                     <div className="text-center">
             <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
               <Target className="w-6 h-6 text-slate-600" />
             </div>
             <h3 className="font-medium text-gray-900">Goal Achievement</h3>
             <p className="text-xl font-bold text-slate-600">87%</p>
             <p className="text-sm text-gray-600">Target completion</p>
           </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900">Efficiency Score</h3>
            <p className="text-2xl font-bold text-orange-600">92%</p>
            <p className="text-sm text-gray-600">Process efficiency</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default ReportsAnalytics;
