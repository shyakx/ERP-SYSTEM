import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  AlertTriangle, 
  Bell, 
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

const Alerts: React.FC = () => {
  const colorScheme = getColorScheme("risk");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const alertStats = [
    { title: "Active Alerts", value: "8", subtitle: "Currently active", icon: AlertTriangle, color: "orange" },
    { title: "Critical Alerts", value: "3", subtitle: "High priority", icon: XCircle, color: "red" },
    { title: "Resolved Today", value: "12", subtitle: "Successfully resolved", icon: CheckCircle, color: "green" },
    { title: "Avg. Response Time", value: "2.1h", subtitle: "Time to respond", icon: Bell, color: "blue" }
  ];

  const alerts = [
    {
      id: "ALT-2024-001",
      title: "Security System Breach Attempt",
      type: "Security",
      severity: "Critical",
      status: "Active",
      assignedTo: "Marie Claire Niyonsaba",
      createdDate: "2024-01-20",
      description: "Multiple failed login attempts detected on main security system",
      location: "Main Office",
      source: "Security System",
      actions: ["Investigate source", "Block IP addresses", "Notify security team"]
    },
    {
      id: "ALT-2024-002",
      title: "Network Connectivity Issue",
      type: "Infrastructure",
      severity: "High",
      status: "In Progress",
      assignedTo: "Patrick Nshimiyimana",
      createdDate: "2024-01-20",
      description: "Network connectivity problems affecting multiple departments",
      location: "IT Department",
      source: "Network Monitor",
      actions: ["Diagnose network", "Check routers", "Update status"]
    },
    {
      id: "ALT-2024-003",
      title: "Data Backup Failure",
      type: "Data",
      severity: "Medium",
      status: "Resolved",
      assignedTo: "Emmanuel Ndayisaba",
      createdDate: "2024-01-19",
      description: "Automated backup system failed to complete scheduled backup",
      location: "Server Room",
      source: "Backup System",
      actions: ["Check backup logs", "Verify storage space", "Manual backup"]
    },
    {
      id: "ALT-2024-004",
      title: "Software License Expiry",
      type: "Compliance",
      severity: "Medium",
      status: "Active",
      assignedTo: "Alice Uwimana",
      createdDate: "2024-01-20",
      description: "Critical software licenses expired, affecting system functionality",
      location: "All Systems",
      source: "License Manager",
      actions: ["Renew licenses", "Verify systems", "Update documentation"]
    }
  ];

  const alertTypes = [
    { type: "Security", count: 15, avgResponse: "1.2h", severity: "High" },
    { type: "Infrastructure", count: 8, avgResponse: "2.8h", severity: "Medium" },
    { type: "Data", count: 12, avgResponse: "3.1h", severity: "Medium" },
    { type: "Compliance", count: 6, avgResponse: "4.5h", severity: "Low" },
    { type: "Application", count: 9, avgResponse: "2.3h", severity: "Medium" }
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
      case "Active": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Escalated": return "bg-purple-100 text-purple-800";
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

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {alertStats.map((stat, index) => (
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

      {/* Alert Actions */}
      <AnimatedCard
        title="Alert Management"
        subtitle="Create and manage security alerts"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create alert")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Alert
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Assign alert")}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Alert
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Escalate alert")}
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
        title="Search Alerts"
        subtitle="Find specific alerts"
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
                placeholder="Search by alert ID, title, or description..."
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
              <option value="active">Active</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
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

      {/* Alerts Table */}
      <AnimatedCard
        title="Security Alerts"
        subtitle="All active and resolved alerts"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{alert.id}</div>
                    <div className="text-xs text-gray-500">{alert.createdDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                    <div className="text-xs text-gray-500">{alert.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(alert.type)}`}>
                      {alert.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{alert.assignedTo}</div>
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

      {/* Alert Types */}
      <AnimatedCard
        title="Alert Types"
        subtitle="Alerts by category and severity"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alertTypes.map((type, index) => (
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
                  <span className="font-medium text-gray-900">{type.count} alerts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Response:</span>
                  <span className="font-medium text-gray-900">{type.avgResponse}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(type.count / 50) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((type.count / 50) * 100)}% of total alerts
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common alert management actions"
        color="orange"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Alert</p>
                <p className="text-xs opacity-80">New security alert</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Assign Alert</p>
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

export default Alerts;