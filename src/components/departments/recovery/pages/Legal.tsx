import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Scale, 
  FileText, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Calendar,
  Users,
  Building,
  Target,
  TrendingUp,
  Gavel
} from "lucide-react";

const Legal: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const legalStats = [
    { title: "Active Cases", value: "23", subtitle: "Ongoing legal proceedings", icon: Scale, color: "blue" },
    { title: "Success Rate", value: "78.5%", subtitle: "Legal case success", icon: CheckCircle, color: "green" },
    { title: "Avg. Resolution Time", value: "45 days", subtitle: "Time to resolution", icon: Clock, color: "orange" },
    { title: "Total Recovered", value: "RWF 8.2M", subtitle: "Through legal action", icon: TrendingUp, color: "purple" }
  ];

  const legalCases = [
    {
      id: "LC-2024-001",
      caseTitle: "Corporate Fraud Litigation",
      clientName: "Kigali Business Center",
      caseType: "Fraud Recovery",
      status: "In Progress",
      assignedLawyer: "Marie Claire Niyonsaba",
      courtDate: "2024-02-15",
      expectedResolution: "2024-03-30",
      claimAmount: "RWF 3.2M",
      recoveredAmount: "RWF 2.1M",
      priority: "High",
      description: "Corporate fraud case involving misappropriation of funds"
    },
    {
      id: "LC-2024-002",
      caseTitle: "Asset Recovery Case",
      clientName: "Musanze Bank",
      caseType: "Asset Recovery",
      status: "Pending",
      assignedLawyer: "Patrick Nshimiyimana",
      courtDate: "2024-02-28",
      expectedResolution: "2024-04-15",
      claimAmount: "RWF 1.8M",
      recoveredAmount: "RWF 0.9M",
      priority: "Medium",
      description: "Recovery of misappropriated bank assets and properties"
    },
    {
      id: "LC-2024-003",
      caseTitle: "Insurance Claim Dispute",
      clientName: "Huye Insurance Co.",
      caseType: "Insurance Recovery",
      status: "Completed",
      assignedLawyer: "Emmanuel Ndayisaba",
      courtDate: "2024-01-20",
      expectedResolution: "2024-02-10",
      claimAmount: "RWF 2.5M",
      recoveredAmount: "RWF 2.2M",
      priority: "High",
      description: "Insurance fraud investigation and recovery proceedings"
    },
    {
      id: "LC-2024-004",
      caseTitle: "Debt Collection Case",
      clientName: "Rubavu Trading Co.",
      caseType: "Debt Recovery",
      status: "Settled",
      assignedLawyer: "Alice Uwimana",
      courtDate: "2024-01-15",
      expectedResolution: "2024-02-05",
      claimAmount: "RWF 1.2M",
      recoveredAmount: "RWF 1.0M",
      priority: "Medium",
      description: "Commercial debt collection through legal proceedings"
    }
  ];

  const legalDocuments = [
    {
      id: "DOC-2024-001",
      title: "Fraud Investigation Report",
      caseId: "LC-2024-001",
      documentType: "Investigation Report",
      status: "Completed",
      createdBy: "Marie Claire Niyonsaba",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      fileSize: "2.3 MB"
    },
    {
      id: "DOC-2024-002",
      title: "Court Filing Documents",
      caseId: "LC-2024-002",
      documentType: "Court Filing",
      status: "In Progress",
      createdBy: "Patrick Nshimiyimana",
      createdDate: "2024-01-18",
      lastModified: "2024-01-22",
      fileSize: "1.8 MB"
    },
    {
      id: "DOC-2024-003",
      title: "Settlement Agreement",
      caseId: "LC-2024-003",
      documentType: "Legal Agreement",
      status: "Completed",
      createdBy: "Emmanuel Ndayisaba",
      createdDate: "2024-01-25",
      lastModified: "2024-02-01",
      fileSize: "0.9 MB"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Settled": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCaseTypeBadge = (type: string) => {
    switch (type) {
      case "Fraud Recovery": return "bg-red-100 text-red-800";
      case "Asset Recovery": return "bg-blue-100 text-blue-800";
      case "Insurance Recovery": return "bg-green-100 text-green-800";
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

  return (
    <div className="space-y-6">
      {/* Legal Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {legalStats.map((stat, index) => (
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

      {/* Legal Actions */}
      <AnimatedCard
        title="Legal Case Management"
        subtitle="Manage legal cases and proceedings"
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
            <FileText className="w-4 h-4 mr-2" />
            Create Case
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Schedule hearing")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Hearing
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Update status")}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Status
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
        title="Search Legal Cases"
        subtitle="Find specific legal cases"
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
                placeholder="Search by case title, client, or lawyer..."
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
              <option value="settled">Settled</option>
            </select>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="fraud">Fraud Recovery</option>
              <option value="asset">Asset Recovery</option>
              <option value="insurance">Insurance Recovery</option>
              <option value="debt">Debt Recovery</option>
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

      {/* Legal Cases Table */}
      <AnimatedCard
        title="Legal Cases"
        subtitle="All active and completed legal cases"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovered</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Lawyer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {legalCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                    <div className="text-xs text-gray-500">Court Date: {case_.courtDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.caseTitle}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCaseTypeBadge(case_.caseType)}`}>
                      {case_.caseType}
                    </span>
                    <div className="text-xs text-gray-500">{case_.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.clientName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.claimAmount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{case_.recoveredAmount}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((parseFloat(case_.recoveredAmount.replace('RWF ', '').replace('M', '')) / parseFloat(case_.claimAmount.replace('RWF ', '').replace('M', ''))) * 100)}% recovered
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(case_.status)}`}>
                      {case_.status}
                    </span>
                    <div className="text-xs text-gray-500">Expected: {case_.expectedResolution}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.assignedLawyer}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(case_.priority)}`}>
                      {case_.priority}
                    </span>
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
                        <Calendar className="w-4 h-4" />
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

      {/* Legal Documents */}
      <AnimatedCard
        title="Legal Documents"
        subtitle="Case documents and filings"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {legalDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{document.id}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{document.title}</div>
                    <div className="text-xs text-gray-500">{document.fileSize}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.caseId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {document.documentType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(document.status)}`}>
                      {document.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.createdBy}</div>
                    <div className="text-xs text-gray-500">{document.createdDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.lastModified}</div>
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
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Legal Performance Metrics */}
      <AnimatedCard
        title="Legal Performance Metrics"
        subtitle="Key performance indicators for legal cases"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Case Success Rate</p>
                <p className="text-2xl font-bold">78.5%</p>
                <p className="text-xs opacity-80">+5.2% from last month</p>
              </div>
              <Gavel className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Average Recovery</p>
                <p className="text-2xl font-bold">RWF 2.1M</p>
                <p className="text-xs opacity-80">Per successful case</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Resolution Time</p>
                <p className="text-2xl font-bold">45 days</p>
                <p className="text-xs opacity-80">Average case duration</p>
              </div>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Cases</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs opacity-80">Currently in progress</p>
              </div>
              <Scale className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Legal;
