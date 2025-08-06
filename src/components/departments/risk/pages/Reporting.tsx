import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  FileText, 
  Download, 
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Mail
} from "lucide-react";

const Reporting: React.FC = () => {
  const colorScheme = getColorScheme("risk");
  const [searchTerm, setSearchTerm] = useState("");

  const reportStats = [
    { title: "Total Reports", value: "45", subtitle: "Generated reports", icon: "", color: "blue" },
    { title: "Critical Alerts", value: "12", subtitle: "High priority", icon: "", color: "red" },
    { title: "Risk Score", value: "6.8/10", subtitle: "Average risk", icon: "", color: "orange" },
    { title: "Compliance Rate", value: "94.2%", subtitle: "Regulatory compliance", icon: "", color: "green" }
  ];

  const reports = [
    {
      id: 1,
      title: "Monthly Risk Assessment Report",
      type: "Assessment",
      status: "Completed",
      priority: "High",
      generatedBy: "Marie Claire Niyonsaba",
      generatedDate: "2024-01-15",
      riskScore: 7.2,
      findings: 8,
      recommendations: 12,
      location: "Kigali HQ"
    },
    {
      id: 2,
      title: "Cybersecurity Threat Analysis",
      type: "Security",
      status: "In Progress",
      priority: "Critical",
      generatedBy: "Patrick Nshimiyimana",
      generatedDate: "2024-01-14",
      riskScore: 8.5,
      findings: 15,
      recommendations: 20,
      location: "All Locations"
    },
    {
      id: 3,
      title: "Financial Risk Evaluation",
      type: "Financial",
      status: "Completed",
      priority: "Medium",
      generatedBy: "Emmanuel Ndayisaba",
      generatedDate: "2024-01-13",
      riskScore: 5.8,
      findings: 6,
      recommendations: 8,
      location: "Huye Office"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
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
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Actions */}
      <AnimatedCard
        title="Report Management"
        subtitle="Risk report operations"
        color="red"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log("Generate report")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Export report")}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log("Schedule report")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Share report")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Share Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search */}
      <AnimatedCard
        title="Search Reports"
        subtitle="Find specific reports"
        color="orange"
        icon=""
        delay={600}
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports by title, type, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </AnimatedCard>

      {/* Reports Table */}
      <AnimatedCard
        title="Risk Reports"
        subtitle="All generated risk reports"
        color="red"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    <div className="text-xs text-gray-500">{report.location}</div>
                    <div className="text-xs text-gray-500">Generated: {report.generatedDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.riskScore}/10</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.findings} findings</div>
                    <div className="text-xs text-gray-500">{report.recommendations} recommendations</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.generatedBy}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Reporting; 