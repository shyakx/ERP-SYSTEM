import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Briefcase, 
  Users, 
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
  MessageSquare,
  Phone
} from "lucide-react";

const CaseManagement: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const caseStats = [
    { title: "Active Cases", value: "45", subtitle: "Currently in progress", icon: Briefcase, color: "blue" },
    { title: "Team Members", value: "12", subtitle: "Recovery specialists", icon: Users, color: "green" },
    { title: "Avg. Resolution Time", value: "18 days", subtitle: "Time to completion", icon: Clock, color: "orange" },
    { title: "Success Rate", value: "78.5%", subtitle: "Case success rate", icon: CheckCircle, color: "purple" }
  ];

  const cases = [
    {
      id: "CASE-2024-001",
      title: "Corporate Fraud Investigation",
      clientName: "Kigali Business Center",
      caseType: "Fraud Recovery",
      status: "In Progress",
      priority: "High",
      assignedTo: "Marie Claire Niyonsaba",
      teamMembers: ["Patrick Nshimiyimana", "Emmanuel Ndayisaba"],
      startDate: "2024-01-10",
      expectedCompletion: "2024-02-28",
      progress: 65,
      claimAmount: "RWF 3.2M",
      recoveredAmount: "RWF 2.1M",
      description: "Internal fraud investigation and asset recovery case"
    },
    {
      id: "CASE-2024-002",
      title: "Asset Recovery Case",
      clientName: "Musanze Bank",
      caseType: "Asset Recovery",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Patrick Nshimiyimana",
      teamMembers: ["Alice Uwimana"],
      startDate: "2024-01-15",
      expectedCompletion: "2024-03-15",
      progress: 25,
      claimAmount: "RWF 1.8M",
      recoveredAmount: "RWF 0.9M",
      description: "Recovery of misappropriated bank assets and properties"
    },
    {
      id: "CASE-2024-003",
      title: "Insurance Claim Recovery",
      clientName: "Huye Insurance Co.",
      caseType: "Insurance Recovery",
      status: "Completed",
      priority: "High",
      assignedTo: "Emmanuel Ndayisaba",
      teamMembers: ["Marie Claire Niyonsaba"],
      startDate: "2024-01-05",
      expectedCompletion: "2024-01-25",
      progress: 100,
      claimAmount: "RWF 2.5M",
      recoveredAmount: "RWF 2.2M",
      description: "Insurance fraud investigation and recovery proceedings"
    },
    {
      id: "CASE-2024-004",
      title: "Debt Collection",
      clientName: "Rubavu Trading Co.",
      caseType: "Debt Recovery",
      status: "On Hold",
      priority: "Medium",
      assignedTo: "Alice Uwimana",
      teamMembers: ["Patrick Nshimiyimana"],
      startDate: "2024-01-12",
      expectedCompletion: "2024-02-12",
      progress: 40,
      claimAmount: "RWF 1.2M",
      recoveredAmount: "RWF 0.6M",
      description: "Commercial debt collection and recovery"
    }
  ];

  const teamMembers = [
    {
      id: "TM-001",
      name: "Marie Claire Niyonsaba",
      role: "Senior Recovery Specialist",
      activeCases: 8,
      completedCases: 45,
      successRate: 82.3,
      avatar: "MC"
    },
    {
      id: "TM-002",
      name: "Patrick Nshimiyimana",
      role: "Recovery Specialist",
      activeCases: 6,
      completedCases: 32,
      successRate: 78.9,
      avatar: "PN"
    },
    {
      id: "TM-003",
      name: "Emmanuel Ndayisaba",
      role: "Legal Recovery Expert",
      activeCases: 5,
      completedCases: 28,
      successRate: 85.2,
      avatar: "EN"
    },
    {
      id: "TM-004",
      name: "Alice Uwimana",
      role: "Recovery Specialist",
      activeCases: 7,
      completedCases: 38,
      successRate: 76.4,
      avatar: "AU"
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-600";
    if (progress >= 60) return "bg-blue-600";
    if (progress >= 40) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Case Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {caseStats.map((stat, index) => (
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

      {/* Case Management Actions */}
      <AnimatedCard
        title="Case Management"
        subtitle="Create and manage recovery cases"
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
            onClick={() => console.log("Assign team")}
          >
            <Users className="w-4 h-4 mr-2" />
            Assign Team
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
            <Activity className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Cases"
        subtitle="Find specific cases"
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
                placeholder="Search by case title, client, or team member..."
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

      {/* Cases Table */}
      <AnimatedCard
        title="Recovery Cases"
        subtitle="All active and completed cases"
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovered Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                    <div className="text-xs text-gray-500">Started: {case_.startDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.title}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCaseTypeBadge(case_.caseType)}`}>
                      {case_.caseType}
                    </span>
                    <div className="text-xs text-gray-500">{case_.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.clientName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(case_.progress)}`}
                          style={{ width: `${case_.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{case_.progress}%</span>
                    </div>
                    <div className="text-xs text-gray-500">Expected: {case_.expectedCompletion}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{case_.recoveredAmount}</div>
                    <div className="text-xs text-gray-500">of {case_.claimAmount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(case_.status)}`}>
                      {case_.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(case_.priority)} ml-2`}>
                      {case_.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.assignedTo}</div>
                    <div className="text-xs text-gray-500">{case_.teamMembers.length} members</div>
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

      {/* Team Members */}
      <AnimatedCard
        title="Recovery Team"
        subtitle="Team members and their performance"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Cases:</span>
                  <span className="font-medium text-gray-900">{member.activeCases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-gray-900">{member.completedCases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium text-green-600">{member.successRate}%</span>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                  View Profile
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Case Performance Metrics */}
      <AnimatedCard
        title="Case Performance Metrics"
        subtitle="Key performance indicators for case management"
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
                <p className="text-xs opacity-80">+3.2% from last month</p>
              </div>
              <Target className="w-8 h-8 opacity-80" />
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
                <p className="text-2xl font-bold">18 days</p>
                <p className="text-xs opacity-80">Average case duration</p>
              </div>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Team Productivity</p>
                <p className="text-2xl font-bold">85.2%</p>
                <p className="text-xs opacity-80">Efficiency rating</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CaseManagement;
