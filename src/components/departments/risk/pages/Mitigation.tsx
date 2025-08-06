import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Shield, 
  CheckCircle, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Users,
  Target,
  BarChart3
} from "lucide-react";

const Mitigation: React.FC = () => {
  const colorScheme = getColorScheme("risk");
  const [searchTerm, setSearchTerm] = useState("");

  const mitigationStats = [
    { title: "Active Plans", value: "18", subtitle: "Current plans", icon: "", color: "blue" },
    { title: "Completed", value: "45", subtitle: "Successfully implemented", icon: "", color: "green" },
    { title: "Success Rate", value: "92.3%", subtitle: "Plan effectiveness", icon: "", color: "orange" },
    { title: "Risk Reduction", value: "67.8%", subtitle: "Average reduction", icon: "", color: "purple" }
  ];

  const mitigationPlans = [
    {
      id: 1,
      title: "Cybersecurity Enhancement Plan",
      riskType: "Cybersecurity",
      status: "In Progress",
      priority: "Critical",
      assignedTo: "Marie Claire Niyonsaba",
      startDate: "2024-01-15",
      targetDate: "2024-02-15",
      progress: 65,
      budget: "RWF 2.5M",
      riskReduction: 75,
      description: "Implement advanced firewall and monitoring systems"
    },
    {
      id: 2,
      title: "Physical Security Upgrade",
      riskType: "Physical Security",
      status: "Completed",
      priority: "High",
      assignedTo: "Patrick Nshimiyimana",
      startDate: "2024-01-10",
      targetDate: "2024-01-25",
      progress: 100,
      budget: "RWF 1.8M",
      riskReduction: 85,
      description: "Enhance access controls and surveillance systems"
    },
    {
      id: 3,
      title: "Financial Risk Controls",
      riskType: "Financial",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Emmanuel Ndayisaba",
      startDate: "2024-01-12",
      targetDate: "2024-02-28",
      progress: 40,
      budget: "RWF 1.2M",
      riskReduction: 60,
      description: "Implement fraud detection and prevention measures"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-blue-600";
    if (progress >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Mitigation Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mitigationStats.map((stat, index) => (
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
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mitigation Actions */}
      <AnimatedCard
        title="Mitigation Management"
        subtitle="Risk mitigation operations"
        color="red"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="red"
            size="md"
            onClick={() => console.log("Create plan")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Update progress")}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Progress
          </AnimatedButton>
          <AnimatedButton
            color="yellow"
            size="md"
            onClick={() => console.log("Assign resources")}
          >
            <Users className="w-4 h-4 mr-2" />
            Assign Resources
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Generate report")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search */}
      <AnimatedCard
        title="Search Plans"
        subtitle="Find specific mitigation plans"
        color="orange"
        icon=""
        delay={600}
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search plans by title, risk type, or assignee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </AnimatedCard>

      {/* Mitigation Plans Table */}
      <AnimatedCard
        title="Mitigation Plans"
        subtitle="All active risk mitigation plans"
        color="red"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Reduction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mitigationPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{plan.title}</div>
                    <div className="text-xs text-gray-500">{plan.description}</div>
                    <div className="text-xs text-gray-500">Budget: {plan.budget}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {plan.riskType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(plan.status)}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(plan.priority)}`}>
                      {plan.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getProgressColor(plan.progress)}`}>
                      {plan.progress}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{plan.riskReduction}%</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{plan.assignedTo}</div>
                    <div className="text-xs text-gray-500">{plan.startDate} - {plan.targetDate}</div>
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
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Users className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Mitigation; 