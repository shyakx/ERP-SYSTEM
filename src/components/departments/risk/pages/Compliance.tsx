import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Search,
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
  FileText,
  Gavel,
  Award
} from "lucide-react";

const Compliance: React.FC = () => {
  const colorScheme = getColorScheme("risk");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const complianceStats = [
    { title: "Compliance Rate", value: "94.2%", subtitle: "Overall compliance", icon: CheckCircle, color: "green" },
    { title: "Active Audits", value: "8", subtitle: "Ongoing audits", icon: Shield, color: "blue" },
    { title: "Regulatory Updates", value: "12", subtitle: "This month", icon: AlertTriangle, color: "orange" },
    { title: "Certifications", value: "15", subtitle: "Active certifications", icon: Award, color: "purple" }
  ];

  const complianceItems = [
    {
      id: "COMP-2024-001",
      title: "Data Protection Compliance",
      category: "GDPR",
      status: "Compliant",
      priority: "High",
      assignedTo: "Marie Claire Niyonsaba",
      lastAudit: "2024-01-15",
      nextAudit: "2024-04-15",
      complianceScore: 95,
      description: "General Data Protection Regulation compliance monitoring and implementation"
    },
    {
      id: "COMP-2024-002",
      title: "Financial Security Standards",
      category: "PCI DSS",
      status: "Under Review",
      priority: "High",
      assignedTo: "Patrick Nshimiyimana",
      lastAudit: "2024-01-10",
      nextAudit: "2024-03-10",
      complianceScore: 87,
      description: "Payment Card Industry Data Security Standard compliance"
    },
    {
      id: "COMP-2024-003",
      title: "Cybersecurity Framework",
      category: "ISO 27001",
      status: "Compliant",
      priority: "Medium",
      assignedTo: "Emmanuel Ndayisaba",
      lastAudit: "2024-01-20",
      nextAudit: "2024-07-20",
      complianceScore: 92,
      description: "Information Security Management System certification"
    },
    {
      id: "COMP-2024-004",
      title: "Quality Management",
      category: "ISO 9001",
      status: "Non-Compliant",
      priority: "Medium",
      assignedTo: "Alice Uwimana",
      lastAudit: "2024-01-05",
      nextAudit: "2024-02-05",
      complianceScore: 65,
      description: "Quality Management System standards compliance"
    }
  ];

  const regulatoryUpdates = [
    {
      id: "REG-2024-001",
      title: "Updated Data Protection Guidelines",
      category: "GDPR",
      impact: "High",
      effectiveDate: "2024-02-01",
      status: "Implemented",
      description: "New requirements for data processing and consent management"
    },
    {
      id: "REG-2024-002",
      title: "Enhanced Cybersecurity Standards",
      category: "NIST",
      impact: "Medium",
      effectiveDate: "2024-03-15",
      status: "In Progress",
      description: "Updated cybersecurity framework requirements"
    },
    {
      id: "REG-2024-003",
      title: "Financial Reporting Changes",
      category: "SOX",
      impact: "High",
      effectiveDate: "2024-01-30",
      status: "Pending",
      description: "New financial reporting and disclosure requirements"
    }
  ];

  const auditSchedule = [
    {
      id: "AUDIT-2024-001",
      title: "Annual Security Audit",
      type: "Internal",
      scheduledDate: "2024-02-15",
      auditor: "Marie Claire Niyonsaba",
      scope: "Full security assessment",
      status: "Scheduled"
    },
    {
      id: "AUDIT-2024-002",
      title: "PCI DSS Compliance Audit",
      type: "External",
      scheduledDate: "2024-03-10",
      auditor: "External PCI Auditor",
      scope: "Payment security compliance",
      status: "Confirmed"
    },
    {
      id: "AUDIT-2024-003",
      title: "ISO 27001 Surveillance",
      type: "External",
      scheduledDate: "2024-04-20",
      auditor: "Certification Body",
      scope: "Information security management",
      status: "Scheduled"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Non-Compliant": return "bg-red-100 text-red-800";
      case "Implemented": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "GDPR": return "bg-blue-100 text-blue-800";
      case "PCI DSS": return "bg-purple-100 text-purple-800";
      case "ISO 27001": return "bg-green-100 text-green-800";
      case "ISO 9001": return "bg-orange-100 text-orange-800";
      case "NIST": return "bg-red-100 text-red-800";
      case "SOX": return "bg-yellow-100 text-yellow-800";
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

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Compliance Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceStats.map((stat, index) => (
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

      {/* Compliance Actions */}
      <AnimatedCard
        title="Compliance Management"
        subtitle="Manage compliance requirements and audits"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create compliance item")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Compliance
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Schedule audit")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Audit
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Update regulations")}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Update Regulations
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
        title="Search Compliance"
        subtitle="Find specific compliance items"
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
                placeholder="Search by title, category, or description..."
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
              <option value="compliant">Compliant</option>
              <option value="under-review">Under Review</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="gdpr">GDPR</option>
              <option value="pci">PCI DSS</option>
              <option value="iso">ISO Standards</option>
              <option value="sox">SOX</option>
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

      {/* Compliance Items Table */}
      <AnimatedCard
        title="Compliance Items"
        subtitle="All compliance requirements and status"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Audit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.id}</div>
                    <div className="text-xs text-gray-500">Last: {item.lastAudit}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(item.priority)} ml-2`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getComplianceColor(item.complianceScore)}`}>
                      {item.complianceScore}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className={`h-1 rounded-full ${getComplianceColor(item.complianceScore).replace('text-', 'bg-').replace('-600', '-600')}`}
                        style={{ width: `${item.complianceScore}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.nextAudit}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.assignedTo}</div>
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

      {/* Regulatory Updates */}
      <AnimatedCard
        title="Regulatory Updates"
        subtitle="Latest regulatory changes and requirements"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="space-y-4">
          {regulatoryUpdates.map((update, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{update.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(update.status)}`}>
                  {update.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(update.category)}`}>
                    {update.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Impact:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(update.impact)}`}>
                    {update.impact}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Effective Date:</span>
                  <span className="text-sm font-medium text-gray-900">{update.effectiveDate}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {update.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Audit Schedule */}
      <AnimatedCard
        title="Audit Schedule"
        subtitle="Upcoming compliance audits"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auditSchedule.map((audit, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{audit.title}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(audit.status)}`}>
                  {audit.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{audit.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{audit.scheduledDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Auditor:</span>
                  <span className="font-medium text-gray-900">{audit.auditor}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <strong>Scope:</strong> {audit.scope}
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common compliance management actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Add Compliance</p>
                <p className="text-xs opacity-80">New requirement</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Schedule Audit</p>
                <p className="text-xs opacity-80">Plan assessment</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Update Regulations</p>
                <p className="text-xs opacity-80">Track changes</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Generate Report</p>
                <p className="text-xs opacity-80">Export data</p>
              </div>
              <Download className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Compliance; 