import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Users, 
  TrendingUp, 
  Target,
  DollarSign,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Calendar,
  User,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Star,
  CheckCircle
} from "lucide-react";

const Leads: React.FC = () => {
  const colorScheme = getColorScheme("sales-marketing");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  const leadStats = [
    { title: "Total Leads", value: "2,847", subtitle: "All time leads", icon: Users, color: "blue" },
    { title: "Qualified Leads", value: "1,234", subtitle: "High potential", icon: Target, color: "green" },
    { title: "Conversion Rate", value: "15.8%", subtitle: "Lead to deal", icon: TrendingUp, color: "orange" },
    { title: "Avg. Deal Value", value: "RWF 2.8M", subtitle: "Per converted lead", icon: DollarSign, color: "purple" }
  ];

  const leads = [
    {
      id: "LEAD-2024-001",
      name: "Kigali Business Center",
      company: "KBC Ltd",
      email: "contact@kbc.rw",
      phone: "+250 788 123 456",
      source: "Website",
      status: "Qualified",
      value: "RWF 5.2M",
      assignedTo: "Marie Claire Niyonsaba",
      createdDate: "2024-01-20",
      lastContact: "2024-01-25",
      nextFollowUp: "2024-02-01",
      description: "Looking for comprehensive security system for new business center",
      priority: "High",
      tags: ["Security System", "Access Control", "CCTV"]
    },
    {
      id: "LEAD-2024-002",
      name: "Hotel Rwanda Security",
      company: "Hotel Rwanda Group",
      email: "security@hotelrwanda.rw",
      phone: "+250 789 234 567",
      source: "Referral",
      status: "Contacted",
      value: "RWF 3.8M",
      assignedTo: "Patrick Nshimiyimana",
      createdDate: "2024-01-18",
      lastContact: "2024-01-22",
      nextFollowUp: "2024-01-29",
      description: "Hotel security upgrade project for multiple properties",
      priority: "Medium",
      tags: ["Hotel Security", "CCTV", "Access Control"]
    },
    {
      id: "LEAD-2024-003",
      name: "University of Rwanda",
      company: "UR Security Dept",
      email: "security@ur.ac.rw",
      phone: "+250 787 345 678",
      source: "Trade Show",
      status: "Proposal Sent",
      value: "RWF 8.5M",
      assignedTo: "Emmanuel Ndayisaba",
      createdDate: "2024-01-15",
      lastContact: "2024-01-28",
      nextFollowUp: "2024-02-05",
      description: "Campus-wide security system implementation",
      priority: "High",
      tags: ["Campus Security", "CCTV", "Access Control", "Emergency Systems"]
    },
    {
      id: "LEAD-2024-004",
      name: "Manufacturing Plant",
      company: "Rwanda Industries",
      email: "operations@rwandaindustries.rw",
      phone: "+250 786 456 789",
      source: "Cold Call",
      status: "New",
      value: "RWF 4.2M",
      assignedTo: "Alice Uwimana",
      createdDate: "2024-01-22",
      lastContact: "2024-01-22",
      nextFollowUp: "2024-01-29",
      description: "Industrial security system for manufacturing facility",
      priority: "Medium",
      tags: ["Industrial Security", "CCTV", "Perimeter Security"]
    }
  ];

  const leadSources = [
    { source: "Website", count: 45, conversionRate: 18.2, avgValue: "RWF 3.2M" },
    { source: "Referral", count: 32, conversionRate: 22.1, avgValue: "RWF 4.1M" },
    { source: "Trade Show", count: 28, conversionRate: 15.8, avgValue: "RWF 2.8M" },
    { source: "Cold Call", count: 15, conversionRate: 8.5, avgValue: "RWF 1.9M" },
    { source: "Social Media", count: 23, conversionRate: 12.3, avgValue: "RWF 2.5M" },
    { source: "Email Campaign", count: 18, conversionRate: 16.7, avgValue: "RWF 3.5M" }
  ];

  const leadPipeline = [
    {
      stage: "New",
      count: 156,
      value: "RWF 450M",
      conversionRate: 25.0,
      avgDays: 3
    },
    {
      stage: "Contacted",
      count: 89,
      value: "RWF 280M",
      conversionRate: 40.0,
      avgDays: 7
    },
    {
      stage: "Qualified",
      count: 67,
      value: "RWF 210M",
      conversionRate: 60.0,
      avgDays: 14
    },
    {
      stage: "Proposal Sent",
      count: 34,
      value: "RWF 120M",
      conversionRate: 75.0,
      avgDays: 21
    },
    {
      stage: "Negotiation",
      count: 12,
      value: "RWF 45M",
      conversionRate: 85.0,
      avgDays: 30
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New": return "bg-gray-100 text-gray-800";
      case "Contacted": return "bg-blue-100 text-blue-800";
      case "Qualified": return "bg-green-100 text-green-800";
      case "Proposal Sent": return "bg-purple-100 text-purple-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Converted": return "bg-green-100 text-green-800";
      case "Lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "Website": return "bg-blue-100 text-blue-800";
      case "Referral": return "bg-green-100 text-green-800";
      case "Trade Show": return "bg-purple-100 text-purple-800";
      case "Cold Call": return "bg-orange-100 text-orange-800";
      case "Social Media": return "bg-pink-100 text-pink-800";
      case "Email Campaign": return "bg-yellow-100 text-yellow-800";
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

  const getValueColor = (value: string) => {
    const numValue = parseFloat(value.replace('RWF ', '').replace('M', ''));
    if (numValue >= 5) return "text-green-600";
    if (numValue >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Lead Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leadStats.map((stat, index) => (
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

      {/* Lead Actions */}
      <AnimatedCard
        title="Lead Management"
        subtitle="Create and manage sales leads"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create lead")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Lead
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Qualify lead")}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Qualify Lead
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
            onClick={() => console.log("Generate report")}
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Leads"
        subtitle="Find specific leads"
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
                placeholder="Search by name, company, or email..."
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal-sent">Proposal Sent</option>
              <option value="negotiation">Negotiation</option>
            </select>
          </div>
          <div>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="trade-show">Trade Show</option>
              <option value="cold-call">Cold Call</option>
              <option value="social-media">Social Media</option>
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

      {/* Leads Table */}
      <AnimatedCard
        title="Sales Leads"
        subtitle="All leads and their status"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Follow-up</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.id}</div>
                    <div className="text-xs text-gray-500">{lead.createdDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.company}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceBadge(lead.source)}`}>
                      {lead.source}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(lead.priority)} ml-2`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getValueColor(lead.value)}`}>
                      {lead.value}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.nextFollowUp}</div>
                    <div className="text-xs text-gray-500">Last: {lead.lastContact}</div>
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

      {/* Lead Sources */}
      <AnimatedCard
        title="Lead Sources"
        subtitle="Performance by lead source"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadSources.map((source, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{source.source}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {source.count} leads
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-medium text-gray-900">{source.conversionRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Value:</span>
                  <span className="font-medium text-green-600">{source.avgValue}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${source.conversionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Lead Pipeline */}
      <AnimatedCard
        title="Lead Pipeline"
        subtitle="Leads by stage in the sales process"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="space-y-4">
          {leadPipeline.map((stage, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{stage.stage}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{stage.count} leads</span>
                  <span className="text-sm font-medium text-green-600">{stage.value}</span>
                  <span className="text-sm text-blue-600">{stage.conversionRate}% conversion</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Days in Stage:</span>
                  <span className="font-medium text-gray-900">{stage.avgDays} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${stage.conversionRate}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {stage.count} leads worth {stage.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common lead management actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Lead</p>
                <p className="text-xs opacity-80">New sales lead</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Qualify Lead</p>
                <p className="text-xs opacity-80">Assess potential</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Schedule Follow-up</p>
                <p className="text-xs opacity-80">Plan next contact</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
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

export default Leads; 