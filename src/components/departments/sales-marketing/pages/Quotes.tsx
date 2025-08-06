import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  FileText, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Eye,
  Download,
  Send,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  Building
} from "lucide-react";

const Quotes: React.FC = () => {
  const colorScheme = getColorScheme("sales-marketing");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const quoteStats = [
    { title: "Total Quotes", value: "156", subtitle: "This month", icon: FileText, color: "blue" },
    { title: "Pending Approval", value: "23", subtitle: "Awaiting review", icon: Clock, color: "orange" },
    { title: "Approved", value: "89", subtitle: "Successfully approved", icon: CheckCircle, color: "green" },
    { title: "Total Value", value: "RWF 28.5M", subtitle: "Quote value", icon: DollarSign, color: "purple" }
  ];

  const quotes = [
    {
      id: "QT-2024-001",
      clientName: "Kigali Business Center",
      clientType: "Corporate",
      quoteValue: "RWF 4.2M",
      status: "Pending",
      createdDate: "2024-01-15",
      validUntil: "2024-02-15",
      salesRep: "Marie Claire Niyonsaba",
      products: ["Security Systems", "Surveillance Cameras"],
      description: "Complete security system installation for office complex"
    },
    {
      id: "QT-2024-002",
      clientName: "Musanze Hotel",
      clientType: "Hospitality",
      quoteValue: "RWF 2.8M",
      status: "Approved",
      createdDate: "2024-01-14",
      validUntil: "2024-02-14",
      salesRep: "Patrick Nshimiyimana",
      products: ["Access Control", "Alarm Systems"],
      description: "Hotel security and access control system"
    },
    {
      id: "QT-2024-003",
      clientName: "Huye University",
      clientType: "Education",
      quoteValue: "RWF 6.5M",
      status: "Rejected",
      createdDate: "2024-01-13",
      validUntil: "2024-02-13",
      salesRep: "Emmanuel Ndayisaba",
      products: ["Security Systems", "Access Control", "Surveillance"],
      description: "Campus-wide security infrastructure upgrade"
    },
    {
      id: "QT-2024-004",
      clientName: "Rubavu Bank",
      clientType: "Financial",
      quoteValue: "RWF 3.9M",
      status: "Draft",
      createdDate: "2024-01-12",
      validUntil: "2024-02-12",
      salesRep: "Alice Uwimana",
      products: ["Security Systems", "Alarm Systems"],
      description: "Bank branch security enhancement"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getClientTypeBadge = (type: string) => {
    switch (type) {
      case "Corporate": return "bg-blue-100 text-blue-800";
      case "Hospitality": return "bg-purple-100 text-purple-800";
      case "Education": return "bg-green-100 text-green-800";
      case "Financial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Quote Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quoteStats.map((stat, index) => (
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

      {/* Quote Actions */}
      <AnimatedCard
        title="Quote Management"
        subtitle="Create and manage sales quotes"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create quote")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Quote
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Approve quotes")}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve Quotes
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Send quotes")}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Quotes
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Export quotes")}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Quotes"
        subtitle="Find specific quotes"
        color="orange"
        icon=""
        delay={600}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by quote ID, client, or description..."
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
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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

      {/* Quotes Table */}
      <AnimatedCard
        title="Sales Quotes"
        subtitle="All generated sales quotes"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rep</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{quote.id}</div>
                    <div className="text-xs text-gray-500">Created: {quote.createdDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{quote.clientName}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClientTypeBadge(quote.clientType)}`}>
                      {quote.clientType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{quote.quoteValue}</div>
                    <div className="text-xs text-gray-500">{quote.products.length} products</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{quote.salesRep}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{quote.validUntil}</div>
                    <div className="text-xs text-gray-500">{quote.description}</div>
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
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Quote Templates */}
      <AnimatedCard
        title="Quote Templates"
        subtitle="Predefined quote templates for different client types"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Corporate Security</h3>
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-3">Complete security solutions for corporate offices</p>
            <div className="flex space-x-2">
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">
                Use Template
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Preview
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Hospitality Security</h3>
              <Building className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-3">Security systems for hotels and resorts</p>
            <div className="flex space-x-2">
              <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors duration-200">
                Use Template
              </button>
              <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200">
                Preview
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Educational Security</h3>
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-3">Campus security and access control systems</p>
            <div className="flex space-x-2">
              <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors duration-200">
                Use Template
              </button>
              <button className="text-sm text-green-600 hover:text-green-800 transition-colors duration-200">
                Preview
              </button>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Quotes;
