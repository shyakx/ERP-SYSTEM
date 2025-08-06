import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Ticket, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  MessageSquare,
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
  Mail
} from "lucide-react";

const SupportTickets: React.FC = () => {
  const colorScheme = getColorScheme("customer-experience");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const ticketStats = [
    { title: "Total Tickets", value: "2,347", subtitle: "All support tickets", icon: Ticket, color: "blue" },
    { title: "Open Tickets", value: "156", subtitle: "Currently active", icon: AlertTriangle, color: "orange" },
    { title: "Avg. Resolution Time", value: "4.2h", subtitle: "Time to resolve", icon: Clock, color: "green" },
    { title: "Satisfaction Rate", value: "92.3%", subtitle: "Customer satisfaction", icon: CheckCircle, color: "purple" }
  ];

  const supportTickets = [
    {
      id: "TICKET-2024-001",
      customerName: "Kigali Business Center",
      subject: "Security System Malfunction",
      category: "Technical Issue",
      priority: "High",
      status: "In Progress",
      assignedTo: "Marie Claire Niyonsaba",
      createdDate: "2024-01-20",
      lastUpdated: "2024-01-20",
      resolutionTime: "2.5h",
      description: "Security system showing error codes and not functioning properly. Urgent attention required.",
      customerEmail: "contact@kigali-business.rw",
      customerPhone: "+250 788 123 456"
    },
    {
      id: "TICKET-2024-002",
      customerName: "Musanze Bank",
      subject: "Software Update Request",
      category: "Feature Request",
      priority: "Medium",
      status: "Open",
      assignedTo: "Patrick Nshimiyimana",
      createdDate: "2024-01-22",
      lastUpdated: "2024-01-22",
      resolutionTime: null,
      description: "Request for software update to latest version with new security features.",
      customerEmail: "support@musanze-bank.rw",
      customerPhone: "+250 789 234 567"
    },
    {
      id: "TICKET-2024-003",
      customerName: "Huye University",
      subject: "Access Control Issue",
      category: "Access Control",
      priority: "High",
      status: "Resolved",
      assignedTo: "Emmanuel Ndayisaba",
      createdDate: "2024-01-18",
      lastUpdated: "2024-01-19",
      resolutionTime: "6.8h",
      description: "Access control system not recognizing authorized users. System needs recalibration.",
      customerEmail: "it@huye-university.rw",
      customerPhone: "+250 787 345 678"
    },
    {
      id: "TICKET-2024-004",
      customerName: "Rubavu Trading Co.",
      subject: "Billing Inquiry",
      category: "Billing",
      priority: "Low",
      status: "Closed",
      assignedTo: "Alice Uwimana",
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-16",
      resolutionTime: "1.2h",
      description: "Question about monthly billing charges and service package details.",
      customerEmail: "accounts@rubavu-trading.rw",
      customerPhone: "+250 786 456 789"
    }
  ];

  const ticketCategories = [
    { category: "Technical Issues", count: 456, avgResolution: "3.2h", satisfaction: 8.7 },
    { category: "Access Control", count: 234, avgResolution: "2.8h", satisfaction: 9.1 },
    { category: "Billing", count: 189, avgResolution: "1.5h", satisfaction: 8.9 },
    { category: "Feature Requests", count: 156, avgResolution: "24.0h", satisfaction: 7.8 },
    { category: "Installation", count: 123, avgResolution: "4.5h", satisfaction: 9.3 },
    { category: "Training", count: 98, avgResolution: "6.2h", satisfaction: 8.5 }
  ];

  const escalationLevels = [
    { level: "Level 1", tickets: 1456, avgResolution: "2.1h", agents: 8 },
    { level: "Level 2", tickets: 567, avgResolution: "4.8h", agents: 4 },
    { level: "Level 3", tickets: 234, avgResolution: "8.5h", agents: 2 },
    { level: "Management", tickets: 90, avgResolution: "12.0h", agents: 1 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Open": return "bg-yellow-100 text-yellow-800";
      case "Escalated": return "bg-red-100 text-red-800";
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Technical Issue": return "bg-red-100 text-red-800";
      case "Feature Request": return "bg-blue-100 text-blue-800";
      case "Access Control": return "bg-green-100 text-green-800";
      case "Billing": return "bg-purple-100 text-purple-800";
      case "Installation": return "bg-orange-100 text-orange-800";
      case "Training": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getResolutionColor = (time: string | null) => {
    if (!time) return "text-gray-500";
    const hours = parseFloat(time.replace('h', ''));
    if (hours <= 2) return "text-green-600";
    if (hours <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Ticket Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ticketStats.map((stat, index) => (
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

      {/* Ticket Actions */}
      <AnimatedCard
        title="Support Ticket Management"
        subtitle="Create and manage support tickets"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create ticket")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Assign ticket")}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Ticket
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Escalate ticket")}
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
        title="Search Tickets"
        subtitle="Find specific support tickets"
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
                placeholder="Search by ticket ID, customer, or subject..."
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
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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

      {/* Support Tickets Table */}
      <AnimatedCard
        title="Support Tickets"
        subtitle="All customer support tickets"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                    <div className="text-xs text-gray-500">{ticket.createdDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.customerName}</div>
                    <div className="text-xs text-gray-500">{ticket.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                    <div className="text-xs text-gray-500">{ticket.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(ticket.category)}`}>
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <div className="text-xs text-gray-500">Assigned: {ticket.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {ticket.resolutionTime ? (
                      <div className={`text-sm font-medium ${getResolutionColor(ticket.resolutionTime)}`}>
                        {ticket.resolutionTime}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Pending</div>
                    )}
                    <div className="text-xs text-gray-500">Updated: {ticket.lastUpdated}</div>
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

      {/* Ticket Categories */}
      <AnimatedCard
        title="Ticket Categories"
        subtitle="Support tickets by category"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ticketCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{category.category}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {category.count} tickets
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Resolution:</span>
                  <span className="font-medium text-gray-900">{category.avgResolution}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Satisfaction:</span>
                  <span className="font-medium text-green-600">{category.satisfaction}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(category.satisfaction / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Escalation Levels */}
      <AnimatedCard
        title="Escalation Levels"
        subtitle="Support ticket escalation tracking"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Escalation Overview</h3>
            <div className="space-y-3">
              {escalationLevels.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${index === 0 ? 'green' : index === 1 ? 'blue' : index === 2 ? 'orange' : 'red'}-500 mr-3`}></div>
                    <span className="text-sm font-medium text-gray-900">{level.level}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{level.tickets} tickets</span>
                    <span className="text-sm font-medium text-gray-900">{level.avgResolution}</span>
                    <span className="text-sm text-gray-600">{level.agents} agents</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total Tickets</span>
                <span className="text-sm text-gray-600">2,347</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Open Tickets</span>
                <span className="text-sm text-orange-600">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Avg. Resolution Time</span>
                <span className="text-sm text-blue-600">4.2h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Satisfaction Rate</span>
                <span className="text-sm text-green-600">92.3%</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common support ticket actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Ticket</p>
                <p className="text-xs opacity-80">New support request</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Assign Ticket</p>
                <p className="text-xs opacity-80">Assign to agent</p>
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

export default SupportTickets;
