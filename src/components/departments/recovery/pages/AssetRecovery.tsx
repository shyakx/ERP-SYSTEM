import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  DollarSign, 
  TrendingUp, 
  Shield,
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
  Activity,
  BarChart3,
  PieChart,
  Download,
  MapPin,
  Package,
  Truck
} from "lucide-react";

const AssetRecovery: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const assetStats = [
    { title: "Total Assets", value: "RWF 45.2M", subtitle: "Under recovery", icon: DollarSign, color: "blue" },
    { title: "Recovered Assets", value: "RWF 28.7M", subtitle: "Successfully recovered", icon: TrendingUp, color: "green" },
    { title: "Recovery Rate", value: "63.5%", subtitle: "Success rate", icon: CheckCircle, color: "orange" },
    { title: "Active Cases", value: "18", subtitle: "In progress", icon: Shield, color: "purple" }
  ];

  const assetCases = [
    {
      id: "ASSET-2024-001",
      title: "Corporate Asset Recovery",
      type: "Real Estate",
      status: "In Progress",
      assignedTo: "Marie Claire Niyonsaba",
      startDate: "2024-01-20",
      estimatedCompletion: "2024-03-15",
      assetValue: "RWF 12.5M",
      recoveredAmount: "RWF 8.2M",
      priority: "High",
      description: "Recovery of corporate real estate assets from defaulted loans",
      location: "Kigali Business District",
      assets: ["Office Building", "Parking Lot", "Equipment"],
      procedures: ["Asset seizure", "Legal proceedings", "Auction preparation"]
    },
    {
      id: "ASSET-2024-002",
      title: "Vehicle Fleet Recovery",
      type: "Vehicles",
      status: "Completed",
      assignedTo: "Patrick Nshimiyimana",
      startDate: "2024-01-15",
      estimatedCompletion: "2024-02-10",
      assetValue: "RWF 8.3M",
      recoveredAmount: "RWF 6.7M",
      priority: "Medium",
      description: "Recovery of commercial vehicle fleet from transportation company",
      location: "Multiple locations",
      assets: ["Trucks", "Vans", "Cars"],
      procedures: ["Vehicle impoundment", "Documentation", "Auction sale"]
    },
    {
      id: "ASSET-2024-003",
      title: "Equipment Recovery",
      type: "Machinery",
      status: "Under Review",
      assignedTo: "Emmanuel Ndayisaba",
      startDate: "2024-01-25",
      estimatedCompletion: "2024-02-20",
      assetValue: "RWF 5.8M",
      recoveredAmount: "RWF 3.2M",
      priority: "Medium",
      description: "Recovery of industrial machinery and equipment",
      location: "Industrial Zone",
      assets: ["Manufacturing Equipment", "Tools", "Computers"],
      procedures: ["Equipment assessment", "Transportation", "Storage"]
    },
    {
      id: "ASSET-2024-004",
      title: "Financial Asset Recovery",
      type: "Financial",
      status: "In Progress",
      assignedTo: "Alice Uwimana",
      startDate: "2024-01-22",
      estimatedCompletion: "2024-04-15",
      assetValue: "RWF 18.6M",
      recoveredAmount: "RWF 10.5M",
      priority: "High",
      description: "Recovery of financial assets and investments",
      location: "Various banks",
      assets: ["Bank Accounts", "Investments", "Securities"],
      procedures: ["Account freezing", "Legal documentation", "Asset transfer"]
    }
  ];

  const assetTypes = [
    { type: "Real Estate", count: 8, avgValue: "RWF 15.2M", recoveryRate: 72.3 },
    { type: "Vehicles", count: 12, avgValue: "RWF 3.8M", recoveryRate: 85.7 },
    { type: "Machinery", count: 6, avgValue: "RWF 8.5M", recoveryRate: 68.9 },
    { type: "Financial", count: 4, avgValue: "RWF 22.1M", recoveryRate: 58.2 },
    { type: "Equipment", count: 15, avgValue: "RWF 1.2M", recoveryRate: 91.4 },
    { type: "Intellectual Property", count: 3, avgValue: "RWF 5.6M", recoveryRate: 45.8 }
  ];

  const recoveryProcedures = [
    {
      id: "PROC-001",
      title: "Asset Seizure Procedure",
      type: "Seizure",
      steps: [
        "Legal documentation verification",
        "Asset location identification",
        "Seizure order execution",
        "Asset inventory documentation",
        "Secure storage arrangement"
      ],
      estimatedTime: "2-3 days",
      successRate: 85.2
    },
    {
      id: "PROC-002",
      title: "Auction Management",
      type: "Sale",
      steps: [
        "Asset valuation assessment",
        "Auction preparation",
        "Marketing and advertising",
        "Bidder registration",
        "Auction execution"
      ],
      estimatedTime: "3-4 weeks",
      successRate: 78.9
    },
    {
      id: "PROC-003",
      title: "Legal Proceedings",
      type: "Legal",
      steps: [
        "Case documentation review",
        "Legal representation",
        "Court proceedings",
        "Judgment execution",
        "Asset transfer"
      ],
      estimatedTime: "6-12 months",
      successRate: 92.1
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      case "Seizure": return "bg-orange-100 text-orange-800";
      case "Sale": return "bg-purple-100 text-purple-800";
      case "Legal": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Real Estate": return "bg-blue-100 text-blue-800";
      case "Vehicles": return "bg-green-100 text-green-800";
      case "Machinery": return "bg-purple-100 text-purple-800";
      case "Financial": return "bg-yellow-100 text-yellow-800";
      case "Equipment": return "bg-orange-100 text-orange-800";
      case "Intellectual Property": return "bg-red-100 text-red-800";
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

  const getRecoveryColor = (recovered: string, total: string) => {
    const recoveredNum = parseFloat(recovered.replace('RWF ', '').replace('M', ''));
    const totalNum = parseFloat(total.replace('RWF ', '').replace('M', ''));
    const percentage = (recoveredNum / totalNum) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Asset Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assetStats.map((stat, index) => (
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

      {/* Asset Recovery Actions */}
      <AnimatedCard
        title="Asset Recovery Management"
        subtitle="Create and manage asset recovery cases"
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
            onClick={() => console.log("Seize assets")}
          >
            <Shield className="w-4 h-4 mr-2" />
            Seize Assets
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Schedule auction")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Auction
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
        title="Search Assets"
        subtitle="Find specific asset recovery cases"
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
                placeholder="Search by case ID, title, or description..."
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
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="under-review">Under Review</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="real-estate">Real Estate</option>
              <option value="vehicles">Vehicles</option>
              <option value="machinery">Machinery</option>
              <option value="financial">Financial</option>
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

      {/* Asset Cases Table */}
      <AnimatedCard
        title="Asset Recovery Cases"
        subtitle="All active and completed asset recovery cases"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovered</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assetCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                    <div className="text-xs text-gray-500">{case_.startDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.title}</div>
                    <div className="text-xs text-gray-500">{case_.description}</div>
                    <div className="text-xs text-gray-500">{case_.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(case_.type)}`}>
                      {case_.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(case_.priority)} ml-2`}>
                      {case_.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(case_.status)}`}>
                      {case_.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.assetValue}</div>
                    <div className="text-xs text-gray-500">{case_.assets.join(", ")}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRecoveryColor(case_.recoveredAmount, case_.assetValue)}`}>
                      {case_.recoveredAmount}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((parseFloat(case_.recoveredAmount.replace('RWF ', '').replace('M', '')) / parseFloat(case_.assetValue.replace('RWF ', '').replace('M', ''))) * 100)}% recovered
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.assignedTo}</div>
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
                        <Shield className="w-4 h-4" />
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

      {/* Asset Types */}
      <AnimatedCard
        title="Asset Types"
        subtitle="Recovery performance by asset type"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assetTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{type.type}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {type.count} cases
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Value:</span>
                  <span className="font-medium text-gray-900">{type.avgValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Recovery Rate:</span>
                  <span className="font-medium text-green-600">{type.recoveryRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${type.recoveryRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Recovery Procedures */}
      <AnimatedCard
        title="Recovery Procedures"
        subtitle="Standard asset recovery procedures"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="space-y-4">
          {recoveryProcedures.map((procedure, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{procedure.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(procedure.type)}`}>
                    {procedure.type}
                  </span>
                  <span className="text-xs text-gray-500">{procedure.estimatedTime}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium">Procedure Steps:</div>
                <ol className="list-decimal list-inside space-y-1">
                  {procedure.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-xs text-gray-600">{step}</li>
                  ))}
                </ol>
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium text-green-600">{procedure.successRate}%</span>
                </div>
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
        subtitle="Common asset recovery actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Case</p>
                <p className="text-xs opacity-80">New recovery case</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Seize Assets</p>
                <p className="text-xs opacity-80">Asset seizure</p>
              </div>
              <Shield className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Schedule Auction</p>
                <p className="text-xs opacity-80">Asset sale</p>
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

export default AssetRecovery; 