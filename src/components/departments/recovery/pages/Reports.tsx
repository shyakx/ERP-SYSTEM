import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Activity,
  Target
} from "lucide-react";

const Reports: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedType, setSelectedType] = useState("all");

  const recoveryStats = [
    { title: "Total Recovered", value: "RWF 12.8M", subtitle: "+15.3% from last month", icon: DollarSign, color: "green" },
    { title: "Active Cases", value: "45", subtitle: "Under investigation", icon: Clock, color: "orange" },
    { title: "Success Rate", value: "78.5%", subtitle: "Recovery success", icon: CheckCircle, color: "blue" },
    { title: "Avg. Recovery Time", value: "18 days", subtitle: "Time to resolution", icon: TrendingUp, color: "purple" }
  ];

  const recoveryReports = [
    {
      id: "REC-2024-001",
      caseTitle: "Corporate Fraud Investigation",
      clientName: "Kigali Business Center",
      recoveredAmount: "RWF 2.5M",
      originalAmount: "RWF 3.2M",
      status: "Completed",
      assignedTo: "Marie Claire Niyonsaba",
      startDate: "2024-01-10",
      completionDate: "2024-01-28",
      recoveryRate: 78.1,
      caseType: "Fraud",
      description: "Internal fraud investigation and asset recovery"
    },
    {
      id: "REC-2024-002",
      caseTitle: "Asset Recovery Case",
      clientName: "Musanze Bank",
      recoveredAmount: "RWF 1.8M",
      originalAmount: "RWF 2.1M",
      status: "In Progress",
      assignedTo: "Patrick Nshimiyimana",
      startDate: "2024-01-15",
      completionDate: null,
      recoveryRate: 85.7,
      caseType: "Asset Recovery",
      description: "Recovery of misappropriated bank assets"
    },
    {
      id: "REC-2024-003",
      caseTitle: "Insurance Claim Recovery",
      clientName: "Huye Insurance Co.",
      recoveredAmount: "RWF 3.2M",
      originalAmount: "RWF 4.0M",
      status: "Completed",
      assignedTo: "Emmanuel Ndayisaba",
      startDate: "2024-01-05",
      completionDate: "2024-01-22",
      recoveryRate: 80.0,
      caseType: "Insurance",
      description: "Insurance fraud investigation and recovery"
    },
    {
      id: "REC-2024-004",
      caseTitle: "Debt Collection",
      clientName: "Rubavu Trading Co.",
      recoveredAmount: "RWF 0.9M",
      originalAmount: "RWF 1.5M",
      status: "Pending",
      assignedTo: "Alice Uwimana",
      startDate: "2024-01-12",
      completionDate: null,
      recoveryRate: 60.0,
      caseType: "Debt Collection",
      description: "Commercial debt collection and recovery"
    }
  ];

  const performanceMetrics = [
    { metric: "Monthly Recovery Rate", value: "78.5%", target: "80%", status: "on-track" },
    { metric: "Average Case Duration", value: "18 days", target: "15 days", status: "behind" },
    { metric: "Client Satisfaction", value: "92.3%", target: "90%", status: "exceeding" },
    { metric: "Cost Recovery Ratio", value: "3.2:1", target: "3:1", status: "exceeding" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "On Hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCaseTypeBadge = (type: string) => {
    switch (type) {
      case "Fraud": return "bg-red-100 text-red-800";
      case "Asset Recovery": return "bg-blue-100 text-blue-800";
      case "Insurance": return "bg-green-100 text-green-800";
      case "Debt Collection": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRecoveryRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Recovery Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recoveryStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className={`text-2xl text-${stat.color}-600`}>
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Controls */}
      <AnimatedCard
        title="Recovery Reports"
        subtitle="Generate and manage recovery reports"
        color="green"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Case Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="fraud">Fraud</option>
              <option value="asset">Asset Recovery</option>
              <option value="insurance">Insurance</option>
              <option value="debt">Debt Collection</option>
            </select>
          </div>
          <div className="flex items-end">
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log("Generate report")}
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Recovery Reports Table */}
      <AnimatedCard
        title="Recovery Cases"
        subtitle="All active and completed recovery cases"
        color="green"
        icon=""
        delay={600}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovered Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recoveryReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.id}</div>
                    <div className="text-xs text-gray-500">Started: {report.startDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.caseTitle}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCaseTypeBadge(report.caseType)}`}>
                      {report.caseType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.clientName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.recoveredAmount}</div>
                    <div className="text-xs text-gray-500">of {report.originalAmount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRecoveryRateColor(report.recoveryRate)}`}>
                      {report.recoveryRate}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${report.recoveryRate}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.assignedTo}</div>
                    {report.completionDate && (
                      <div className="text-xs text-gray-500">Completed: {report.completionDate}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Performance Metrics */}
      <AnimatedCard
        title="Performance Metrics"
        subtitle="Key performance indicators and targets"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">{metric.metric}</h3>
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500">Target: {metric.target}</span>
              </div>
              <div className="mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  metric.status === "exceeding" ? "bg-green-100 text-green-800" :
                  metric.status === "on-track" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {metric.status === "exceeding" ? "Exceeding" :
                   metric.status === "on-track" ? "On Track" : "Behind"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Recovery Trends */}
      <AnimatedCard
        title="Recovery Trends"
        subtitle="Monthly recovery performance and trends"
        color="purple"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Recovery Amount</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">January 2024</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">RWF 12.8M</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">December 2023</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">RWF 11.1M</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">November 2023</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">RWF 10.5M</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Case Type Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Fraud Cases</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">40%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Asset Recovery</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Insurance Claims</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Debt Collection</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Reports;
