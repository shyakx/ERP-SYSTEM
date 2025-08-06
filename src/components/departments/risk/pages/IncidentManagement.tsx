import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  XCircle,
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
  Phone,
  MessageSquare,
  Shield,
  Zap
} from "lucide-react";

const IncidentManagement: React.FC = () => {
  const colorScheme = getColorScheme("risk");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const incidentStats = [
    { title: "Active Incidents", value: "12", subtitle: "Currently open", icon: AlertTriangle, color: "orange" },
    { title: "Avg. Response Time", value: "2.3h", subtitle: "Time to respond", icon: Clock, color: "blue" },
    { title: "Resolution Rate", value: "96.8%", subtitle: "Successfully resolved", icon: CheckCircle, color: "green" },
    { title: "Critical Incidents", value: "3", subtitle: "High priority", icon: XCircle, color: "red" }
  ];

  const incidents = [
    {
      id: "INC-2024-001",
      title: "Security System Breach",
      type: "Security",
      severity: "Critical",
      status: "In Progress",
      assignedTo: "Marie Claire Niyonsaba",
      reportedDate: "2024-01-20",
      responseTime: "0.5h",
      resolutionTime: null,
      description: "Unauthorized access attempt detected in main security system",
      impact: "High",
      affectedSystems: ["Security System", "Access Control"],
      actions: ["Isolate affected systems", "Investigate source", "Implement additional security"]
    },
    {
      id: "INC-2024-002",
      title: "Network Connectivity Issue",
      type: "Infrastructure",
      severity: "High",
      status: "Resolved",
      assignedTo: "Patrick Nshimiyimana",
      reportedDate: "2024-01-18",
      responseTime: "1.2h",
      resolutionTime: "4.5h",
      description: "Network connectivity problems affecting multiple departments",
      impact: "Medium",
      affectedSystems: ["Network Infrastructure", "Email System"],
      actions: ["Network diagnostics", "Router configuration", "Service restoration"]
    },
    {
      id: "INC-2024-003",
      title: "Data Backup Failure",
      type: "Data",
      severity: "Medium",
      status: "Under Investigation",
      assignedTo: "Emmanuel Ndayisaba",
      reportedDate: "2024-01-22",
      responseTime: "2.1h",
      resolutionTime: null,
      description: "Automated backup system failed to complete scheduled backup",
      impact: "Low",
      affectedSystems: ["Backup System", "Storage"],
      actions: ["Check backup logs", "Verify storage space", "Manual backup initiation"]
    },
    {
      id: "INC-2024-004",
      title: "Software License Expiry",
      type: "Compliance",
      severity: "Medium",
      status: "Resolved",
      assignedTo: "Alice Uwimana",
      reportedDate: "2024-01-15",
      responseTime: "3.0h",
      resolutionTime: "6.2h",
      description: "Critical software licenses expired, affecting system functionality",
      impact: "Medium",
      affectedSystems: ["License Management", "Software Applications"],
      actions: ["License renewal", "System verification", "Documentation update"]
    }
  ];

  const incidentTypes = [
    { type: "Security", count: 45, avgResolution: "3.2h", severity: "High" },
    { type: "Infrastructure", count: 32, avgResolution: "2.8h", severity: "Medium" },
    { type: "Data", count: 28, avgResolution: "4.1h", severity: "Medium" },
    { type: "Compliance", count: 15, avgResolution: "5.5h", severity: "Low" },
    { type: "Application", count: 23, avgResolution: "2.3h", severity: "Medium" }
  ];

  const responseProcedures = [
    {
      id: "PROC-001",
      title: "Critical Incident Response",
      severity: "Critical",
      steps: [
        "Immediate notification to incident response team",
        "System isolation and containment",
        "Assessment of impact and scope",
        "Communication to stakeholders",
        "Implementation of emergency procedures"
      ],
      estimatedTime: "1-2 hours"
    },
    {
      id: "PROC-002",
      title: "High Priority Incident Response",
      severity: "High",
      steps: [
        "Notification within 30 minutes",
        "Initial assessment and classification",
        "Resource allocation and team assignment",
        "Regular status updates",
        "Resolution and documentation"
      ],
      estimatedTime: "2-4 hours"
    },
    {
      id: "PROC-003",
      title: "Standard Incident Response",
      severity: "Medium",
      steps: [
        "Notification within 2 hours",
        "Assessment and categorization",
        "Standard resolution procedures",
        "Progress tracking",
        "Final resolution and review"
      ],
      estimatedTime: "4-8 hours"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Under Investigation": return "bg-yellow-100 text-yellow-800";
      case "Escalated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Security": return "bg-red-100 text-red-800";
      case "Infrastructure": return "bg-blue-100 text-blue-800";
      case "Data": return "bg-purple-100 text-purple-800";
      case "Compliance": return "bg-orange-100 text-orange-800";
      case "Application": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getResponseTimeColor = (time: string) => {
    const hours = parseFloat(time.replace('h', ''));
    if (hours <= 1) return "text-green-600";
    if (hours <= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Incident Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {incidentStats.map((stat, index) => (
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

      {/* Incident Actions */}
      <AnimatedCard
        title="Incident Management"
        subtitle="Create and manage security incidents"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create incident")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Incident
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Assign incident")}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Incident
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Escalate incident")}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Escalate
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
        title="Search Incidents"
        subtitle="Find specific incidents"
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
                placeholder="Search by incident ID, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="resolved">Resolved</option>
              <option value="in-progress">In Progress</option>
              <option value="under-investigation">Under Investigation</option>
              <option value="escalated">Escalated</option>
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

      {/* Incidents Table */}
      <AnimatedCard
        title="Security Incidents"
        subtitle="All active and resolved incidents"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{incident.id}</div>
                    <div className="text-xs text-gray-500">{incident.reportedDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                    <div className="text-xs text-gray-500">{incident.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(incident.type)}`}>
                      {incident.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactBadge(incident.impact)} ml-2`}>
                      {incident.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getResponseTimeColor(incident.responseTime)}`}>
                      {incident.responseTime}
                    </div>
                    {incident.resolutionTime && (
                      <div className="text-xs text-gray-500">Resolved: {incident.resolutionTime}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{incident.assignedTo}</div>
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
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Incident Types */}
      <AnimatedCard
        title="Incident Types"
        subtitle="Incidents by category and severity"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incidentTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{type.type}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(type.severity)}`}>
                  {type.severity}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Count:</span>
                  <span className="font-medium text-gray-900">{type.count} incidents</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Resolution:</span>
                  <span className="font-medium text-gray-900">{type.avgResolution}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(type.count / 143) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((type.count / 143) * 100)}% of total incidents
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Response Procedures */}
      <AnimatedCard
        title="Response Procedures"
        subtitle="Standard incident response procedures"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="space-y-4">
          {responseProcedures.map((procedure, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{procedure.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(procedure.severity)}`}>
                    {procedure.severity}
                  </span>
                  <span className="text-xs text-gray-500">{procedure.estimatedTime}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium">Response Steps:</div>
                <ol className="list-decimal list-inside space-y-1">
                  {procedure.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-xs text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Edit Procedure
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common incident management actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Incident</p>
                <p className="text-xs opacity-80">New security incident</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Assign Incident</p>
                <p className="text-xs opacity-80">Assign to team member</p>
              </div>
              <User className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Escalate</p>
                <p className="text-xs opacity-80">Raise priority</p>
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

export default IncidentManagement; 