import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  MessageSquare, 
  Mail, 
  Phone,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
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
  Shield,
  Database,
  Voicemail,
  Video
} from "lucide-react";

const Communication: React.FC = () => {
  const colorScheme = getColorScheme("customer-experience");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const communicationStats = [
    { title: "Total Messages", value: "2,847", subtitle: "All communications", icon: MessageSquare, color: "blue" },
    { title: "Response Rate", value: "94.2%", subtitle: "Messages responded to", icon: CheckCircle, color: "green" },
    { title: "Avg. Response Time", value: "2.3h", subtitle: "Time to respond", icon: Clock, color: "orange" },
    { title: "Customer Satisfaction", value: "8.7/10", subtitle: "Communication rating", icon: Target, color: "purple" }
  ];

  const communications = [
    {
      id: "COM-2024-001",
      type: "Email",
      subject: "Security System Installation Query",
      customerName: "Kigali Business Center",
      customerEmail: "contact@kigali-business.rw",
      status: "Responded",
      priority: "High",
      assignedTo: "Marie Claire Niyonsaba",
      sentDate: "2024-01-20",
      responseDate: "2024-01-20",
      responseTime: "1.5h",
      description: "Inquiry about security system installation services and pricing"
    },
    {
      id: "COM-2024-002",
      type: "Phone Call",
      subject: "Technical Support Request",
      customerName: "Musanze Bank",
      customerEmail: "support@musanze-bank.rw",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Patrick Nshimiyimana",
      sentDate: "2024-01-22",
      responseDate: null,
      responseTime: null,
      description: "Technical support request for existing security system"
    },
    {
      id: "COM-2024-003",
      type: "Live Chat",
      subject: "Product Information",
      customerName: "Huye University",
      customerEmail: "procurement@huye-university.rw",
      status: "Completed",
      priority: "Low",
      assignedTo: "Emmanuel Ndayisaba",
      sentDate: "2024-01-18",
      responseDate: "2024-01-18",
      responseTime: "0.5h",
      description: "Request for product catalog and specifications"
    },
    {
      id: "COM-2024-004",
      type: "Video Call",
      subject: "Project Consultation",
      customerName: "Rubavu Trading Co.",
      customerEmail: "manager@rubavu-trading.rw",
      status: "Scheduled",
      priority: "High",
      assignedTo: "Alice Uwimana",
      sentDate: "2024-01-25",
      responseDate: null,
      responseTime: null,
      description: "Scheduled video consultation for large security project"
    }
  ];

  const communicationTemplates = [
    {
      id: "TEMP-001",
      name: "Welcome Email Template",
      type: "Email",
      category: "Onboarding",
      usage: 45,
      lastUsed: "2024-01-20",
      description: "Standard welcome email for new customers"
    },
    {
      id: "TEMP-002",
      name: "Technical Support Response",
      type: "Email",
      category: "Support",
      usage: 23,
      lastUsed: "2024-01-22",
      description: "Template for technical support inquiries"
    },
    {
      id: "TEMP-003",
      name: "Follow-up Call Script",
      type: "Phone",
      category: "Sales",
      usage: 18,
      lastUsed: "2024-01-19",
      description: "Script for follow-up sales calls"
    },
    {
      id: "TEMP-004",
      name: "Live Chat Greeting",
      type: "Chat",
      category: "Support",
      usage: 67,
      lastUsed: "2024-01-21",
      description: "Standard greeting for live chat sessions"
    }
  ];

  const communicationChannels = [
    { channel: "Email", count: 1247, percentage: 43.8, color: "blue" },
    { channel: "Phone Calls", count: 892, percentage: 31.3, color: "green" },
    { channel: "Live Chat", count: 456, percentage: 16.0, color: "orange" },
    { channel: "Video Calls", count: 156, percentage: 5.5, color: "purple" },
    { channel: "Social Media", count: 96, percentage: 3.4, color: "red" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Responded": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Scheduled": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Email": return "bg-blue-100 text-blue-800";
      case "Phone Call": return "bg-green-100 text-green-800";
      case "Live Chat": return "bg-orange-100 text-orange-800";
      case "Video Call": return "bg-purple-100 text-purple-800";
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Email": return Mail;
      case "Phone Call": return Phone;
      case "Live Chat": return MessageSquare;
      case "Video Call": return Video;
      default: return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      {/* Communication Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {communicationStats.map((stat, index) => (
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

      {/* Communication Actions */}
      <AnimatedCard
        title="Communication Management"
        subtitle="Create and manage customer communications"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Send email")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Make call")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Make Call
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Start chat")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start Chat
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Schedule meeting")}
          >
            <Video className="w-4 h-4 mr-2" />
            Schedule Meeting
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Communications"
        subtitle="Find specific communications"
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
                placeholder="Search by subject, customer, or description..."
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
              <option value="completed">Completed</option>
              <option value="responded">Responded</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="chat">Live Chat</option>
              <option value="video">Video Call</option>
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

      {/* Communications Table */}
      <AnimatedCard
        title="Customer Communications"
        subtitle="All customer communication records"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Communication ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communications.map((communication) => {
                const TypeIcon = getTypeIcon(communication.type);
                return (
                  <tr key={communication.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{communication.id}</div>
                      <div className="text-xs text-gray-500">{communication.sentDate}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <TypeIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(communication.type)}`}>
                          {communication.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{communication.subject}</div>
                      <div className="text-xs text-gray-500">{communication.description}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{communication.customerName}</div>
                      <div className="text-xs text-gray-500">{communication.customerEmail}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(communication.status)}`}>
                        {communication.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(communication.priority)} ml-2`}>
                        {communication.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {communication.responseTime ? (
                        <div className="text-sm text-green-600">{communication.responseTime}</div>
                      ) : (
                        <div className="text-sm text-gray-500">Pending</div>
                      )}
                      {communication.responseDate && (
                        <div className="text-xs text-gray-500">{communication.responseDate}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{communication.assignedTo}</div>
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
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Communication Templates */}
      <AnimatedCard
        title="Communication Templates"
        subtitle="Predefined communication templates"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {communicationTemplates.map((template, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(template.type)}`}>
                  {template.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{template.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium text-gray-900">{template.usage} times</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Used:</span>
                  <span className="font-medium text-gray-900">{template.lastUsed}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {template.description}
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                  Use Template
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Communication Channels */}
      <AnimatedCard
        title="Communication Channels"
        subtitle="Distribution of communications by channel"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Channel Distribution</h3>
            <div className="space-y-3">
              {communicationChannels.map((channel, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${channel.color}-500 mr-3`}></div>
                    <span className="text-sm font-medium text-gray-900">{channel.channel}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{channel.count} messages</span>
                    <span className="text-sm font-medium text-gray-900">{channel.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total Communications</span>
                <span className="text-sm text-gray-600">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Response Rate</span>
                <span className="text-sm text-green-600">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Avg. Response Time</span>
                <span className="text-sm text-blue-600">2.3h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Customer Satisfaction</span>
                <span className="text-sm text-green-600">8.7/10</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common communication actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Send Email</p>
                <p className="text-xs opacity-80">Quick email response</p>
              </div>
              <Mail className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Make Call</p>
                <p className="text-xs opacity-80">Phone communication</p>
              </div>
              <Phone className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Live Chat</p>
                <p className="text-xs opacity-80">Real-time support</p>
              </div>
              <MessageSquare className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Video Meeting</p>
                <p className="text-xs opacity-80">Virtual consultation</p>
              </div>
              <Video className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Communication;
