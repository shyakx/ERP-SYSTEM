import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Search, 
  FileText, 
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Eye,
  Edit,
  Plus,
  Calendar,
  User,
  Target,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Database,
  Fingerprint,
  Zap,
  Lock
} from "lucide-react";

const Forensics: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const forensicsStats = [
    { title: "Active Cases", value: "12", subtitle: "Under investigation", icon: Search, color: "blue" },
    { title: "Evidence Processed", value: "156", subtitle: "Items analyzed", icon: FileText, color: "green" },
    { title: "Success Rate", value: "94.2%", subtitle: "Case resolution", icon: CheckCircle, color: "orange" },
    { title: "Avg. Processing Time", value: "3.2 days", subtitle: "Per case", icon: Clock, color: "purple" }
  ];

  const forensicsCases = [
    {
      id: "FOR-2024-001",
      title: "Digital Fraud Investigation",
      type: "Digital Forensics",
      status: "In Progress",
      assignedTo: "Marie Claire Niyonsaba",
      startDate: "2024-01-20",
      estimatedCompletion: "2024-02-15",
      evidenceCount: 23,
      priority: "High",
      description: "Investigation of digital fraud involving financial transactions",
      tools: ["EnCase", "FTK", "Autopsy"],
      findings: ["Suspicious transactions", "Data tampering evidence", "IP address tracking"]
    },
    {
      id: "FOR-2024-002",
      title: "Corporate Espionage Case",
      type: "Network Forensics",
      status: "Completed",
      assignedTo: "Patrick Nshimiyimana",
      startDate: "2024-01-15",
      estimatedCompletion: "2024-01-30",
      evidenceCount: 45,
      priority: "High",
      description: "Investigation of corporate data breach and intellectual property theft",
      tools: ["Wireshark", "NetworkMiner", "Volatility"],
      findings: ["Unauthorized access", "Data exfiltration", "Malware traces"]
    },
    {
      id: "FOR-2024-003",
      title: "Mobile Device Analysis",
      type: "Mobile Forensics",
      status: "Under Review",
      assignedTo: "Emmanuel Ndayisaba",
      startDate: "2024-01-25",
      estimatedCompletion: "2024-02-10",
      evidenceCount: 12,
      priority: "Medium",
      description: "Analysis of mobile devices for evidence in criminal case",
      tools: ["Cellebrite", "Oxygen Forensics", "XRY"],
      findings: ["Deleted messages", "Location data", "App usage patterns"]
    },
    {
      id: "FOR-2024-004",
      title: "Malware Analysis",
      type: "Malware Forensics",
      status: "In Progress",
      assignedTo: "Alice Uwimana",
      startDate: "2024-01-22",
      estimatedCompletion: "2024-02-20",
      evidenceCount: 8,
      priority: "High",
      description: "Analysis of sophisticated malware affecting multiple systems",
      tools: ["IDA Pro", "OllyDbg", "Process Monitor"],
      findings: ["Ransomware variant", "Command & control servers", "Data encryption methods"]
    }
  ];

  const evidenceTypes = [
    { type: "Digital Evidence", count: 89, processingTime: "2.1 days", successRate: 96.5 },
    { type: "Network Logs", count: 45, processingTime: "1.8 days", successRate: 92.3 },
    { type: "Mobile Data", count: 32, processingTime: "3.5 days", successRate: 88.7 },
    { type: "Malware Samples", count: 18, processingTime: "4.2 days", successRate: 94.1 },
    { type: "Memory Dumps", count: 24, processingTime: "2.8 days", successRate: 91.2 },
    { type: "File System", count: 67, processingTime: "1.5 days", successRate: 95.8 }
  ];

  const forensicsTools = [
    {
      name: "EnCase",
      category: "Digital Forensics",
      version: "8.0",
      status: "Active",
      lastUsed: "2024-01-28",
      cases: 15,
      description: "Comprehensive digital forensics platform"
    },
    {
      name: "FTK Imager",
      category: "Imaging",
      version: "4.7",
      status: "Active",
      lastUsed: "2024-01-25",
      cases: 23,
      description: "Forensic imaging and analysis tool"
    },
    {
      name: "Autopsy",
      category: "Open Source",
      version: "4.19",
      status: "Active",
      lastUsed: "2024-01-26",
      cases: 8,
      description: "Open source digital forensics platform"
    },
    {
      name: "Cellebrite",
      category: "Mobile Forensics",
      version: "7.5",
      status: "Active",
      lastUsed: "2024-01-27",
      cases: 12,
      description: "Mobile device forensics solution"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      case "Active": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Digital Forensics": return "bg-blue-100 text-blue-800";
      case "Network Forensics": return "bg-purple-100 text-purple-800";
      case "Mobile Forensics": return "bg-green-100 text-green-800";
      case "Malware Forensics": return "bg-red-100 text-red-800";
      case "Imaging": return "bg-orange-100 text-orange-800";
      case "Open Source": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Forensics Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forensicsStats.map((stat, index) => (
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

      {/* Forensics Actions */}
      <AnimatedCard
        title="Forensics Management"
        subtitle="Create and manage forensic investigations"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create case")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Case
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Process evidence")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Process Evidence
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Analyze data")}
          >
            <Search className="w-4 h-4 mr-2" />
            Analyze Data
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Generate report")}
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Cases"
        subtitle="Find specific forensic cases"
        color="orange"
        icon=""
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by case ID, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="under-review">Under Review</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="digital">Digital Forensics</option>
              <option value="network">Network Forensics</option>
              <option value="mobile">Mobile Forensics</option>
              <option value="malware">Malware Forensics</option>
            </select>
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Filter className="w-4 h-4 inline mr-2" />
              Filter
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Forensics Cases Table */}
      <AnimatedCard
        title="Forensic Cases"
        subtitle="All active and completed forensic investigations"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forensicsCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                    <div className="text-xs text-gray-500">{case_.startDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.title}</div>
                    <div className="text-xs text-gray-500">{case_.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(case_.type)}`}>
                      {case_.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(case_.priority)} ml-2`}>
                      {case_.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(case_.status)}`}>
                      {case_.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.evidenceCount} items</div>
                    <div className="text-xs text-gray-500">{case_.tools.join(", ")}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Due: {case_.estimatedCompletion}</div>
                    <div className="text-xs text-gray-500">Started: {case_.startDate}</div>
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
                        <Search className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Evidence Types */}
      <AnimatedCard
        title="Evidence Types"
        subtitle="Processing statistics by evidence type"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidenceTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{type.type}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {type.count} items
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-medium text-gray-900">{type.processingTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium text-green-600">{type.successRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${type.successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Forensics Tools */}
      <AnimatedCard
        title="Forensics Tools"
        subtitle="Available forensic analysis tools"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {forensicsTools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{tool.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(tool.status)}`}>
                  {tool.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(tool.category)}`}>
                    {tool.category}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium text-gray-900">{tool.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cases Used:</span>
                  <span className="font-medium text-gray-900">{tool.cases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Used:</span>
                  <span className="font-medium text-gray-900">{tool.lastUsed}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {tool.description}
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                  Launch Tool
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common forensics management actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Case</p>
                <p className="text-xs opacity-80">New investigation</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Process Evidence</p>
                <p className="text-xs opacity-80">Analyze data</p>
              </div>
              <FileText className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Analyze Data</p>
                <p className="text-xs opacity-80">Forensic analysis</p>
              </div>
              <Search className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Generate Report</p>
                <p className="text-xs opacity-80">Export findings</p>
              </div>
              <Download className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Forensics; 