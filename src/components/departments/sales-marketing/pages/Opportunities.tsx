import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Target, 
  DollarSign, 
  TrendingUp,
  Users,
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star
} from "lucide-react";

const Opportunities: React.FC = () => {
  const colorScheme = getColorScheme("sales-marketing");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const opportunityStats = [
    { title: 'Total Opportunities', value: '0', change: '+0%', icon: Target, color: 'blue', subtitle: 'Active opportunities' },
    { title: 'Total Value', value: 'RWF 0', change: '+0%', icon: DollarSign, color: 'green', subtitle: 'Total potential value' },
    { title: 'Win Rate', value: '0%', change: '+0%', icon: TrendingUp, color: 'purple', subtitle: 'Conversion success' },
    { title: 'Avg Deal Size', value: 'RWF 0', change: '+0%', icon: Users, color: 'orange', subtitle: 'Average opportunity value' }
  ];

  // Empty opportunities array - no mock data
  const opportunities: any[] = [];

  const pipelineStages = [
    { stage: "Discovery", count: 0, value: "RWF 0", color: "gray" },
    { stage: "Qualification", count: 0, value: "RWF 0", color: "blue" },
    { stage: "Proposal", count: 0, value: "RWF 0", color: "yellow" },
    { stage: "Negotiation", count: 0, value: "RWF 0", color: "orange" },
    { stage: "Closed Won", count: 0, value: "RWF 0", color: "green" }
  ];

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "Discovery": return "bg-gray-100 text-gray-800";
      case "Qualification": return "bg-blue-100 text-blue-800";
      case "Proposal": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Closed Won": return "bg-green-100 text-green-800";
      case "Closed Lost": return "bg-red-100 text-red-800";
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

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    if (probability >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Opportunity Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {opportunityStats.map((stat, index) => (
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

      {/* Opportunity Actions */}
      <AnimatedCard
        title="Opportunity Management"
        subtitle="Create and manage sales opportunities"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create opportunity")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Opportunity
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Update pipeline")}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Update Pipeline
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Schedule follow-up")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Follow-up
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Generate forecast")}
          >
            <Target className="w-4 h-4 mr-2" />
            Generate Forecast
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Opportunities"
        subtitle="Find specific opportunities"
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
                placeholder="Search by title, company, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              <option value="discovery">Discovery</option>
              <option value="qualification">Qualification</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
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

      {/* Sales Pipeline */}
      <AnimatedCard
        title="Sales Pipeline"
        subtitle="Opportunity distribution by stage"
        color="green"
        icon=""
        delay={800}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">{stage.stage}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${stage.color}-100 text-${stage.color}-800`}>
                  {stage.count}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stage.value}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${stage.color}-600 h-2 rounded-full`}
                  style={{ width: `${(stage.count / 138) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Opportunities Table */}
      <AnimatedCard
        title="Sales Opportunities"
        subtitle="All active sales opportunities"
        color="blue"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{opportunity.title}</div>
                    <div className="text-xs text-gray-500">{opportunity.id}</div>
                    <div className="text-xs text-gray-500">{opportunity.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{opportunity.company}</div>
                    <div className="text-xs text-gray-500">{opportunity.contactPerson}</div>
                    <div className="text-xs text-gray-500">{opportunity.contactEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{opportunity.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                      {opportunity.probability}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${opportunity.probability}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageBadge(opportunity.stage)}`}>
                      {opportunity.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(opportunity.priority)}`}>
                      {opportunity.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{opportunity.expectedClose}</div>
                    <div className="text-xs text-gray-500">Assigned: {opportunity.assignedTo}</div>
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
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Top Opportunities */}
      <AnimatedCard
        title="Top Opportunities"
        subtitle="Highest value opportunities by probability"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities
            .sort((a, b) => parseFloat(b.value.replace('RWF ', '').replace('M', '')) - parseFloat(a.value.replace('RWF ', '').replace('M', '')))
            .slice(0, 3)
            .map((opportunity, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{opportunity.title}</h3>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {opportunity.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {opportunity.value}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    {opportunity.probability}% probability
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Close: {opportunity.expectedClose}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
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

export default Opportunities;
