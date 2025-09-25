import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Target, 
  TrendingUp, 
  Users,
  DollarSign,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Calendar,
  Activity,
  BarChart3,
  Download
} from "lucide-react";

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const campaignStats = [
    { title: "Active Campaigns", value: "8", subtitle: "Currently running", icon: Target, color: "blue" },
    { title: "Total Reach", value: "45.2K", subtitle: "Audience reached", icon: Users, color: "green" },
    { title: "Conversion Rate", value: "12.8%", subtitle: "Average conversion", icon: TrendingUp, color: "orange" },
    { title: "Revenue Generated", value: "RWF 2.8M", subtitle: "Campaign revenue", icon: DollarSign, color: "purple" }
  ];

  const campaigns = [
    {
      id: "CAMP-2024-001",
      title: "Q1 Security Solutions",
      type: "Digital Marketing",
      status: "Active",
      budget: "RWF 500K",
      spent: "RWF 320K",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      reach: 12500,
      conversions: 156,
      revenue: "RWF 450K",
      description: "Comprehensive security solutions campaign targeting corporate clients"
    },
    {
      id: "CAMP-2024-002",
      title: "Summer Access Control",
      type: "Social Media",
      status: "Scheduled",
      budget: "RWF 300K",
      spent: "RWF 0",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      reach: 0,
      conversions: 0,
      revenue: "RWF 0",
      description: "Access control systems promotion for summer season"
    },
    {
      id: "CAMP-2024-003",
      title: "Bank Security Special",
      type: "Email Marketing",
      status: "Completed",
      budget: "RWF 200K",
      spent: "RWF 180K",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      reach: 8500,
      conversions: 89,
      revenue: "RWF 320K",
      description: "Targeted email campaign for banking sector security solutions"
    },
    {
      id: "CAMP-2024-004",
      title: "University Security",
      type: "Content Marketing",
      status: "Active",
      budget: "RWF 400K",
      spent: "RWF 250K",
      startDate: "2024-01-10",
      endDate: "2024-04-10",
      reach: 18200,
      conversions: 234,
      revenue: "RWF 680K",
      description: "Educational institution security systems marketing campaign"
    }
  ];

  const campaignTypes = [
    { type: "Digital Marketing", count: 12, avgConversion: 15.2, avgROI: 280 },
    { type: "Social Media", count: 8, avgConversion: 8.7, avgROI: 190 },
    { type: "Email Marketing", count: 15, avgConversion: 12.3, avgROI: 320 },
    { type: "Content Marketing", count: 6, avgConversion: 18.9, avgROI: 450 },
    { type: "Direct Mail", count: 4, avgConversion: 6.2, avgROI: 150 },
    { type: "Events", count: 3, avgConversion: 22.1, avgROI: 380 }
  ];

  const performanceMetrics = [
    {
      metric: "Email Open Rate",
      current: 24.8,
      target: 25.0,
      trend: "up",
      change: "+2.3%"
    },
    {
      metric: "Click-Through Rate",
      current: 3.2,
      target: 3.5,
      trend: "down",
      change: "-1.8%"
    },
    {
      metric: "Conversion Rate",
      current: 12.8,
      target: 12.0,
      trend: "up",
      change: "+6.7%"
    },
    {
      metric: "Cost per Lead",
      current: 45.2,
      target: 50.0,
      trend: "up",
      change: "-9.6%"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      case "Paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Digital Marketing": return "bg-blue-100 text-blue-800";
      case "Social Media": return "bg-purple-100 text-purple-800";
      case "Email Marketing": return "bg-green-100 text-green-800";
      case "Content Marketing": return "bg-orange-100 text-orange-800";
      case "Direct Mail": return "bg-red-100 text-red-800";
      case "Events": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getBudgetUtilization = (spent: string, budget: string) => {
    const spentNum = parseFloat(spent.replace('RWF ', '').replace('K', ''));
    const budgetNum = parseFloat(budget.replace('RWF ', '').replace('K', ''));
    return (spentNum / budgetNum) * 100;
  };

  const getBudgetColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-600";
    if (utilization >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const getROIColor = (roi: number) => {
    if (roi >= 300) return "text-green-600";
    if (roi >= 200) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignStats.map((stat, index) => (
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

      {/* Campaign Actions */}
      <AnimatedCard
        title="Campaign Management"
        subtitle="Create and manage marketing campaigns"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create campaign")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Schedule campaign")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Campaign
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Analyze performance")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Performance
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
        title="Search Campaigns"
        subtitle="Find specific campaigns"
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
                placeholder="Search by campaign title or description..."
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
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="digital">Digital Marketing</option>
              <option value="social">Social Media</option>
              <option value="email">Email Marketing</option>
              <option value="content">Content Marketing</option>
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

      {/* Campaigns Table */}
      <AnimatedCard
        title="Marketing Campaigns"
        subtitle="All active and completed campaigns"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => {
                const budgetUtilization = getBudgetUtilization(campaign.spent, campaign.budget);
                const roi = campaign.revenue !== "RWF 0" ? 
                  (parseFloat(campaign.revenue.replace('RWF ', '').replace('K', '')) / parseFloat(campaign.spent.replace('RWF ', '').replace('K', ''))) * 100 : 0;
                return (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.id}</div>
                      <div className="text-xs text-gray-500">{campaign.startDate} - {campaign.endDate}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                    <div className="text-xs text-gray-500">{campaign.description}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(campaign.type)}`}>
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{campaign.budget}</div>
                      <div className={`text-sm ${getBudgetColor(budgetUtilization)}`}>
                        {campaign.spent} ({budgetUtilization.toFixed(1)}%)
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{campaign.reach.toLocaleString()} reach</div>
                      <div className="text-sm text-green-600">{campaign.conversions} conversions</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{campaign.revenue}</div>
                      <div className={`text-xs ${getROIColor(roi)}`}>
                        ROI: {roi.toFixed(1)}%
                      </div>
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
                          <Download className="w-4 h-4" />
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

      {/* Campaign Types */}
      <AnimatedCard
        title="Campaign Types"
        subtitle="Performance by campaign type"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaignTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{type.type}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {type.count} campaigns
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Conversion:</span>
                  <span className="font-medium text-gray-900">{type.avgConversion}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. ROI:</span>
                  <span className="font-medium text-green-600">{type.avgROI}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(type.avgROI / 450) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Performance Metrics */}
      <AnimatedCard
        title="Performance Metrics"
        subtitle="Key marketing performance indicators"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{metric.metric}</h3>
                <TrendingUp className={`w-4 h-4 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{metric.current}</span>
                  <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(metric.current / metric.target) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  Target: {metric.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common campaign management actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Campaign</p>
                <p className="text-xs opacity-80">New marketing campaign</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Schedule Campaign</p>
                <p className="text-xs opacity-80">Plan future campaign</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Analyze Performance</p>
                <p className="text-xs opacity-80">Review metrics</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
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

export default Campaigns;
