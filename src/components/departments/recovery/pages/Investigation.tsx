import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Search, 
  FileText, 
  Camera,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Eye,
  Edit,
  Plus,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  Shield,
  Database
} from "lucide-react";

const Investigation: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const investigationStats = [
    { title: "Active Investigations", value: "23", subtitle: "Ongoing cases", icon: Search, color: "blue" },
    { title: "Evidence Collected", value: "156", subtitle: "Total pieces", icon: FileText, color: "green" },
    { title: "Forensic Analysis", value: "12", subtitle: "In progress", icon: Fingerprint, color: "orange" },
    { title: "Success Rate", value: "82.3%", subtitle: "Investigation success", icon: CheckCircle, color: "purple" }
  ];

  const investigations = [
    {
      id: "INV-2024-001",
      title: "Corporate Fraud Investigation",
      caseType: "Financial Fraud",
      status: "In Progress",
      priority: "High",
      assignedTo: "Marie Claire Niyonsaba",
      teamMembers: ["Patrick Nshimiyimana", "Emmanuel Ndayisaba"],
      startDate: "2024-01-10",
      expectedCompletion: "2024-02-28",
      progress: 65,
      evidenceCount: 23,
      leadsCount: 8,
      description: "Internal fraud investigation involving misappropriation of funds"
    },
    {
      id: "INV-2024-002",
      title: "Asset Recovery Investigation",
      caseType: "Asset Recovery",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Patrick Nshimiyimana",
      teamMembers: ["Alice Uwimana"],
      startDate: "2024-01-15",
      expectedCompletion: "2024-03-15",
      progress: 25,
      evidenceCount: 15,
      leadsCount: 5,
      description: "Investigation into misappropriated bank assets and properties"
    },
    {
      id: "INV-2024-003",
      title: "Insurance Fraud Investigation",
      caseType: "Insurance Fraud",
      status: "Completed",
      priority: "High",
      assignedTo: "Emmanuel Ndayisaba",
      teamMembers: ["Marie Claire Niyonsaba"],
      startDate: "2024-01-05",
      expectedCompletion: "2024-01-25",
      progress: 100,
      evidenceCount: 31,
      leadsCount: 12,
      description: "Insurance fraud investigation and evidence collection"
    },
    {
      id: "INV-2024-004",
      title: "Debt Collection Investigation",
      caseType: "Debt Recovery",
      status: "On Hold",
      priority: "Medium",
      assignedTo: "Alice Uwimana",
      teamMembers: ["Patrick Nshimiyimana"],
      startDate: "2024-01-12",
      expectedCompletion: "2024-02-12",
      progress: 40,
      evidenceCount: 18,
      leadsCount: 6,
      description: "Investigation for commercial debt collection case"
    }
  ];

  const evidenceItems = [
    {
      id: "EVD-2024-001",
      title: "Financial Transaction Records",
      investigationId: "INV-2024-001",
      type: "Documentary Evidence",
      status: "Analyzed",
      collectedBy: "Marie Claire Niyonsaba",
      collectedDate: "2024-01-15",
      fileSize: "2.3 MB",
      description: "Bank statements and transaction records"
    },
    {
      id: "EVD-2024-002",
      title: "Surveillance Footage",
      investigationId: "INV-2024-002",
      type: "Digital Evidence",
      status: "In Review",
      collectedBy: "Patrick Nshimiyimana",
      collectedDate: "2024-01-18",
      fileSize: "45.2 MB",
      description: "CCTV footage from bank premises"
    },
    {
      id: "EVD-2024-003",
      title: "Witness Statements",
      investigationId: "INV-2024-003",
      type: "Testimonial Evidence",
      status: "Collected",
      collectedBy: "Emmanuel Ndayisaba",
      collectedDate: "2024-01-12",
      fileSize: "1.8 MB",
      description: "Interview transcripts and witness statements"
    }
  ];

  const forensicAnalysis = [
    {
      id: "FOR-2024-001",
      title: "Digital Forensics Analysis",
      investigationId: "INV-2024-001",
      type: "Computer Forensics",
      status: "In Progress",
      analyst: "Marie Claire Niyonsaba",
      startDate: "2024-01-16",
      expectedCompletion: "2024-01-30",
      progress: 75,
      findings: "Suspicious email communications detected"
    },
    {
      id: "FOR-2024-002",
      title: "Financial Records Analysis",
      investigationId: "INV-2024-002",
      type: "Financial Forensics",
      status: "Completed",
      analyst: "Patrick Nshimiyimana",
      startDate: "2024-01-18",
      expectedCompletion: "2024-01-25",
      progress: 100,
      findings: "Irregular transaction patterns identified"
    },
    {
      id: "FOR-2024-003",
      title: "Document Authentication",
      investigationId: "INV-2024-003",
      type: "Document Forensics",
      status: "Pending",
      analyst: "Emmanuel Ndayisaba",
      startDate: "2024-01-20",
      expectedCompletion: "2024-02-05",
      progress: 0,
      findings: "Awaiting analysis"
    }
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
      case "Financial Fraud": return "bg-red-100 text-red-800";
      case "Asset Recovery": return "bg-blue-100 text-blue-800";
      case "Insurance Fraud": return "bg-green-100 text-green-800";
      case "Debt Recovery": return "bg-orange-100 text-orange-800";
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
    if (progress >= 80) return "bg-green-600";
    if (progress >= 60) return "bg-blue-600";
    if (progress >= 40) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Investigation Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {investigationStats.map((stat, index) => (
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

      {/* Investigation Actions */}
      <AnimatedCard
        title="Investigation Management"
        subtitle="Create and manage investigations"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create investigation")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Investigation
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Collect evidence")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Collect Evidence
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Forensic analysis")}
          >
            <Fingerprint className="w-4 h-4 mr-2" />
            Forensic Analysis
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Generate report")}
          >
            <Activity className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Investigations"
        subtitle="Find specific investigations"
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
                placeholder="Search by title, case type, or investigator..."
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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="financial">Financial Fraud</option>
              <option value="asset">Asset Recovery</option>
              <option value="insurance">Insurance Fraud</option>
              <option value="debt">Debt Recovery</option>
            </select>
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Search className="w-4 h-4 inline mr-2" />
              Search
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Investigations Table */}
      <AnimatedCard
        title="Active Investigations"
        subtitle="All ongoing and completed investigations"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigation ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investigations.map((investigation) => (
                <tr key={investigation.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{investigation.id}</div>
                    <div className="text-xs text-gray-500">Started: {investigation.startDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{investigation.title}</div>
                    <div className="text-xs text-gray-500">{investigation.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCaseTypeBadge(investigation.caseType)}`}>
                      {investigation.caseType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(investigation.progress)}`}
                          style={{ width: `${investigation.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{investigation.progress}%</span>
                    </div>
                    <div className="text-xs text-gray-500">Expected: {investigation.expectedCompletion}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{investigation.evidenceCount} pieces</div>
                    <div className="text-xs text-gray-500">{investigation.leadsCount} leads</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(investigation.status)}`}>
                      {investigation.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(investigation.priority)} ml-2`}>
                      {investigation.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{investigation.assignedTo}</div>
                    <div className="text-xs text-gray-500">{investigation.teamMembers.length} team members</div>
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
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Fingerprint className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Evidence Management */}
      <AnimatedCard
        title="Evidence Management"
        subtitle="Collected evidence and analysis"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {evidenceItems.map((evidence) => (
                <tr key={evidence.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{evidence.id}</div>
                    <div className="text-xs text-gray-500">{evidence.fileSize}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{evidence.title}</div>
                    <div className="text-xs text-gray-500">{evidence.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {evidence.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evidence.investigationId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(evidence.status)}`}>
                      {evidence.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evidence.collectedBy}</div>
                    <div className="text-xs text-gray-500">{evidence.collectedDate}</div>
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
                        <Fingerprint className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Database className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Forensic Analysis */}
      <AnimatedCard
        title="Forensic Analysis"
        subtitle="Ongoing forensic analysis and findings"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forensicAnalysis.map((analysis, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{analysis.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(analysis.status)}`}>
                  {analysis.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{analysis.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Analyst:</span>
                  <span className="font-medium text-gray-900">{analysis.analyst}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-medium text-gray-900">{analysis.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(analysis.progress)}`}
                    style={{ width: `${analysis.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <strong>Findings:</strong> {analysis.findings}
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Investigation;
