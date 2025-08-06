import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  FileText, 
  TrendingUp, 
  Users,
  Star,
  MessageSquare,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Activity,
  Target,
  Smile,
  Frown,
  Clock,
  CheckCircle
} from "lucide-react";

const Reports: React.FC = () => {
  const colorScheme = getColorScheme("customer-experience");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("satisfaction");

  const customerStats = [
    { title: "Customer Satisfaction", value: "94.2%", subtitle: "+2.1% from last month", icon: Star, color: "green" },
    { title: "Response Time", value: "2.3h", subtitle: "Average response", icon: Clock, color: "blue" },
    { title: "Resolution Rate", value: "96.8%", subtitle: "Issues resolved", icon: CheckCircle, color: "orange" },
    { title: "Net Promoter Score", value: "8.7/10", subtitle: "Customer loyalty", icon: TrendingUp, color: "purple" }
  ];

  const satisfactionReports = [
    {
      id: "CSR-2024-001",
      reportTitle: "Monthly Customer Satisfaction Report",
      period: "January 2024",
      overallScore: 94.2,
      totalResponses: 1247,
      positiveFeedback: 89.3,
      negativeFeedback: 5.2,
      neutralFeedback: 5.5,
      status: "Completed",
      generatedBy: "Marie Claire Niyonsaba",
      generatedDate: "2024-01-31",
      keyInsights: ["Improved response times", "Better service quality", "Enhanced communication"]
    },
    {
      id: "CSR-2024-002",
      reportTitle: "Service Quality Analysis",
      period: "Q4 2023",
      overallScore: 92.1,
      totalResponses: 3456,
      positiveFeedback: 87.5,
      negativeFeedback: 6.8,
      neutralFeedback: 5.7,
      status: "In Progress",
      generatedBy: "Patrick Nshimiyimana",
      generatedDate: "2024-01-15",
      keyInsights: ["Technical support improvements", "Training program success", "Process optimization"]
    },
    {
      id: "CSR-2024-003",
      reportTitle: "Customer Feedback Summary",
      period: "December 2023",
      overallScore: 91.8,
      totalResponses: 2891,
      positiveFeedback: 86.2,
      negativeFeedback: 7.1,
      neutralFeedback: 6.7,
      status: "Completed",
      generatedBy: "Emmanuel Ndayisaba",
      generatedDate: "2024-01-01",
      keyInsights: ["Communication improvements", "Response time optimization", "Service delivery enhancement"]
    }
  ];

  const feedbackCategories = [
    { category: "Service Quality", positive: 92.5, negative: 4.2, neutral: 3.3 },
    { category: "Response Time", positive: 88.7, negative: 8.1, neutral: 3.2 },
    { category: "Communication", positive: 94.1, negative: 3.8, neutral: 2.1 },
    { category: "Technical Support", positive: 89.3, negative: 6.5, neutral: 4.2 },
    { category: "Overall Experience", positive: 91.2, negative: 5.3, neutral: 3.5 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Customer Experience Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerStats.map((stat, index) => (
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
        title="Customer Experience Reports"
        subtitle="Generate and manage customer satisfaction reports"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Metric</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="satisfaction">Customer Satisfaction</option>
              <option value="response">Response Time</option>
              <option value="resolution">Resolution Rate</option>
              <option value="nps">Net Promoter Score</option>
            </select>
          </div>
          <div className="flex items-end">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log("Generate report")}
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Satisfaction Reports Table */}
      <AnimatedCard
        title="Customer Satisfaction Reports"
        subtitle="All generated customer experience reports"
        color="blue"
        icon=""
        delay={600}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {satisfactionReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.id}</div>
                    <div className="text-xs text-gray-500">Generated: {report.generatedDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.reportTitle}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.period}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(report.overallScore)}`}>
                      {report.overallScore}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${report.overallScore}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.totalResponses.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      +{report.positiveFeedback}% positive
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
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

      {/* Feedback Analysis */}
      <AnimatedCard
        title="Feedback Category Analysis"
        subtitle="Customer feedback breakdown by category"
        color="green"
        icon=""
        delay={800}
      >
        <div className="space-y-4">
          {feedbackCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{category.category}</h3>
                <div className="flex items-center space-x-2">
                  <Smile className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">{category.positive}%</span>
                  <Frown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">{category.negative}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-2" 
                    style={{ width: `${category.positive}%` }}
                  ></div>
                  <div 
                    className="bg-yellow-500 h-2" 
                    style={{ width: `${category.neutral}%` }}
                  ></div>
                  <div 
                    className="bg-red-500 h-2" 
                    style={{ width: `${category.negative}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Positive: {category.positive}%</span>
                <span>Neutral: {category.neutral}%</span>
                <span>Negative: {category.negative}%</span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Performance Metrics */}
      <AnimatedCard
        title="Customer Experience Metrics"
        subtitle="Key performance indicators and trends"
        color="purple"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Customer Satisfaction</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-xs opacity-80">+2.1% from last month</p>
              </div>
              <Star className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Response Time</p>
                <p className="text-2xl font-bold">2.3h</p>
                <p className="text-xs opacity-80">-0.5h improvement</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Resolution Rate</p>
                <p className="text-2xl font-bold">96.8%</p>
                <p className="text-xs opacity-80">+1.2% improvement</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Net Promoter Score</p>
                <p className="text-2xl font-bold">8.7/10</p>
                <p className="text-xs opacity-80">+0.3 improvement</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Reports;
