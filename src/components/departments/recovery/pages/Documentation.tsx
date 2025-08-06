import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  FileText, 
  FolderOpen, 
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Upload,
  Plus,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  AlertTriangle,
  Archive,
  Share2
} from "lucide-react";

const Documentation: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const documentStats = [
    { title: "Total Documents", value: "1,247", subtitle: "All case documents", icon: FileText, color: "blue" },
    { title: "Active Files", value: "89", subtitle: "Currently in use", icon: FolderOpen, color: "green" },
    { title: "Evidence Files", value: "156", subtitle: "Evidence documents", icon: Tag, color: "orange" },
    { title: "Archived", value: "234", subtitle: "Completed cases", icon: Archive, color: "purple" }
  ];

  const documents = [
    {
      id: "DOC-2024-001",
      title: "Corporate Fraud Investigation Report",
      category: "Investigation Report",
      caseId: "REC-2024-001",
      status: "Active",
      createdBy: "Marie Claire Niyonsaba",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      fileSize: "2.3 MB",
      tags: ["Fraud", "Corporate", "High Priority"],
      description: "Comprehensive investigation report for corporate fraud case"
    },
    {
      id: "DOC-2024-002",
      title: "Asset Recovery Evidence Collection",
      category: "Evidence File",
      caseId: "REC-2024-002",
      status: "In Review",
      createdBy: "Patrick Nshimiyimana",
      createdDate: "2024-01-18",
      lastModified: "2024-01-22",
      fileSize: "4.1 MB",
      tags: ["Asset Recovery", "Evidence", "Bank"],
      description: "Evidence collection and documentation for asset recovery case"
    },
    {
      id: "DOC-2024-003",
      title: "Insurance Claim Documentation",
      category: "Case File",
      caseId: "REC-2024-003",
      status: "Completed",
      createdBy: "Emmanuel Ndayisaba",
      createdDate: "2024-01-10",
      lastModified: "2024-01-25",
      fileSize: "1.8 MB",
      tags: ["Insurance", "Claims", "Completed"],
      description: "Complete documentation for insurance claim recovery"
    },
    {
      id: "DOC-2024-004",
      title: "Debt Collection Records",
      category: "Financial Records",
      caseId: "REC-2024-004",
      status: "Active",
      createdBy: "Alice Uwimana",
      createdDate: "2024-01-12",
      lastModified: "2024-01-18",
      fileSize: "0.9 MB",
      tags: ["Debt Collection", "Financial", "Active"],
      description: "Financial records and debt collection documentation"
    }
  ];

  const documentCategories = [
    { name: "Investigation Reports", count: 45, color: "blue" },
    { name: "Evidence Files", count: 156, color: "green" },
    { name: "Case Files", count: 89, color: "orange" },
    { name: "Financial Records", count: 67, color: "purple" },
    { name: "Legal Documents", count: 34, color: "red" },
    { name: "Correspondence", count: 123, color: "yellow" }
  ];

  const recentActivity = [
    {
      action: "Document Updated",
      document: "Corporate Fraud Investigation Report",
      user: "Marie Claire Niyonsaba",
      timestamp: "2024-01-20 14:30",
      type: "update"
    },
    {
      action: "New Document Created",
      document: "Asset Recovery Evidence Collection",
      user: "Patrick Nshimiyimana",
      timestamp: "2024-01-22 09:15",
      type: "create"
    },
    {
      action: "Document Archived",
      document: "Insurance Claim Documentation",
      user: "Emmanuel Ndayisaba",
      timestamp: "2024-01-25 16:45",
      type: "archive"
    },
    {
      action: "Document Shared",
      document: "Debt Collection Records",
      user: "Alice Uwimana",
      timestamp: "2024-01-18 11:20",
      type: "share"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Investigation Report": return "bg-blue-100 text-blue-800";
      case "Evidence File": return "bg-green-100 text-green-800";
      case "Case File": return "bg-orange-100 text-orange-800";
      case "Financial Records": return "bg-purple-100 text-purple-800";
      case "Legal Documents": return "bg-red-100 text-red-800";
      case "Correspondence": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "update": return Edit;
      case "create": return Plus;
      case "archive": return Archive;
      case "share": return Share2;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "update": return "text-blue-600";
      case "create": return "text-green-600";
      case "archive": return "text-gray-600";
      case "share": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {documentStats.map((stat, index) => (
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

      {/* Document Actions */}
      <AnimatedCard
        title="Document Management"
        subtitle="Create and manage case documents"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create document")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Document
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Upload files")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Archive documents")}
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Share documents")}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Documents"
        subtitle="Find specific documents"
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
                placeholder="Search by title, case ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="investigation">Investigation Reports</option>
              <option value="evidence">Evidence Files</option>
              <option value="case">Case Files</option>
              <option value="financial">Financial Records</option>
              <option value="legal">Legal Documents</option>
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
              <option value="in-review">In Review</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
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

      {/* Document Categories */}
      <AnimatedCard
        title="Document Categories"
        subtitle="Document distribution by category"
        color="green"
        icon=""
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${category.color}-100 text-${category.color}-800`}>
                  {category.count}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${category.color}-600 h-2 rounded-full`}
                  style={{ width: `${(category.count / 514) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {Math.round((category.count / 514) * 100)}% of total documents
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Documents Table */}
      <AnimatedCard
        title="Case Documents"
        subtitle="All case-related documents"
        color="blue"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{document.id}</div>
                    <div className="text-xs text-gray-500">{document.fileSize}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{document.title}</div>
                    <div className="text-xs text-gray-500">{document.description}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {document.tags.map((tag, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(document.category)}`}>
                      {document.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.caseId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(document.status)}`}>
                      {document.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.createdBy}</div>
                    <div className="text-xs text-gray-500">{document.createdDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{document.lastModified}</div>
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
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Recent Activity */}
      <AnimatedCard
        title="Recent Activity"
        subtitle="Latest document activities"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type).replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <ActivityIcon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.document}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Documentation;
