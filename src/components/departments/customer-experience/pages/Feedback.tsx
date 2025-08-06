import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  AlertTriangle,
  CheckCircle,
  Clock,
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
  Heart,
  Star
} from "lucide-react";

const Feedback: React.FC = () => {
  const colorScheme = getColorScheme("customer-experience");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const feedbackStats = [
    { title: "Total Feedback", value: "1,847", subtitle: "All feedback received", icon: MessageSquare, color: "blue" },
    { title: "Positive Sentiment", value: "78.5%", subtitle: "Positive feedback", icon: ThumbsUp, color: "green" },
    { title: "Response Rate", value: "96.2%", subtitle: "Feedback responded to", icon: CheckCircle, color: "orange" },
    { title: "Avg. Resolution Time", value: "1.8 days", subtitle: "Time to resolve", icon: Clock, color: "purple" }
  ];

  const feedbackItems = [
    {
      id: "FB-2024-001",
      customerName: "Kigali Business Center",
      category: "Product Quality",
      sentiment: "Positive",
      priority: "High",
      submittedDate: "2024-01-20",
      status: "Resolved",
      assignedTo: "Marie Claire Niyonsaba",
      feedback: "Excellent security system installation. The team was professional and the quality exceeded our expectations. Highly recommend!",
      response: "Thank you for your positive feedback. We're glad to hear that our service met your expectations.",
      resolutionTime: "1 day"
    },
    {
      id: "FB-2024-002",
      customerName: "Musanze Bank",
      category: "Technical Support",
      sentiment: "Neutral",
      priority: "Medium",
      submittedDate: "2024-01-22",
      status: "In Progress",
      assignedTo: "Patrick Nshimiyimana",
      feedback: "Technical support was adequate but response time could be improved. The solution provided was effective.",
      response: "We appreciate your feedback. We're working on improving our response times.",
      resolutionTime: null
    },
    {
      id: "FB-2024-003",
      customerName: "Huye University",
      category: "Service Delivery",
      sentiment: "Positive",
      priority: "Low",
      submittedDate: "2024-01-18",
      status: "Resolved",
      assignedTo: "Emmanuel Ndayisaba",
      feedback: "Outstanding service delivery. The team was punctual, professional, and completed the project ahead of schedule.",
      response: "Thank you for your kind words. We're committed to maintaining this level of service excellence.",
      resolutionTime: "0.5 days"
    },
    {
      id: "FB-2024-004",
      customerName: "Rubavu Trading Co.",
      category: "Communication",
      sentiment: "Negative",
      priority: "High",
      submittedDate: "2024-01-25",
      status: "Under Review",
      assignedTo: "Alice Uwimana",
      feedback: "Communication was poor during the project. Updates were infrequent and unclear. This needs improvement.",
      response: "We apologize for the communication issues. We're reviewing our processes to improve this.",
      resolutionTime: null
    }
  ];

  const sentimentAnalysis = [
    { sentiment: "Positive", count: 1456, percentage: 78.5, color: "green" },
    { sentiment: "Neutral", count: 234, percentage: 12.7, color: "yellow" },
    { sentiment: "Negative", count: 157, percentage: 8.8, color: "red" }
  ];

  const feedbackCategories = [
    { category: "Product Quality", count: 456, satisfaction: 8.9, trend: "up" },
    { category: "Service Delivery", count: 389, satisfaction: 8.7, trend: "up" },
    { category: "Technical Support", count: 234, satisfaction: 7.8, trend: "down" },
    { category: "Communication", count: 198, satisfaction: 7.2, trend: "down" },
    { category: "Value for Money", count: 156, satisfaction: 8.4, trend: "up" },
    { category: "Customer Service", count: 123, satisfaction: 8.1, trend: "up" }
  ];

  const improvementAreas = [
    {
      area: "Response Time",
      currentScore: 7.2,
      targetScore: 8.5,
      priority: "High",
      actions: ["Implement automated responses", "Increase support staff", "Improve escalation process"]
    },
    {
      area: "Communication Quality",
      currentScore: 7.8,
      targetScore: 9.0,
      priority: "Medium",
      actions: ["Enhanced training programs", "Better communication tools", "Regular customer updates"]
    },
    {
      area: "Technical Expertise",
      currentScore: 8.1,
      targetScore: 8.8,
      priority: "Low",
      actions: ["Advanced training", "Certification programs", "Knowledge sharing sessions"]
    }
  ];

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "bg-green-100 text-green-800";
      case "Neutral": return "bg-yellow-100 text-yellow-800";
      case "Negative": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Product Quality": return "bg-blue-100 text-blue-800";
      case "Service Delivery": return "bg-green-100 text-green-800";
      case "Technical Support": return "bg-orange-100 text-orange-800";
      case "Communication": return "bg-purple-100 text-purple-800";
      case "Value for Money": return "bg-yellow-100 text-yellow-800";
      case "Customer Service": return "bg-red-100 text-red-800";
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Under Review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return ThumbsUp;
      case "Neutral": return MessageSquare;
      case "Negative": return ThumbsDown;
      default: return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {feedbackStats.map((stat, index) => (
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

      {/* Feedback Actions */}
      <AnimatedCard
        title="Feedback Management"
        subtitle="Create and manage customer feedback"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Collect feedback")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Collect Feedback
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Analyze sentiment")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Sentiment
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Respond to feedback")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Respond
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log("Generate insights")}
          >
            <Activity className="w-4 h-4 mr-2" />
            Generate Insights
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search Feedback"
        subtitle="Find specific feedback items"
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
                placeholder="Search by customer, category, or feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="product">Product Quality</option>
              <option value="service">Service Delivery</option>
              <option value="support">Technical Support</option>
              <option value="communication">Communication</option>
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

      {/* Feedback Table */}
      <AnimatedCard
        title="Customer Feedback"
        subtitle="All customer feedback items"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackItems.map((feedback) => {
                const SentimentIcon = getSentimentIcon(feedback.sentiment);
                return (
                  <tr key={feedback.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{feedback.id}</div>
                      <div className="text-xs text-gray-500">{feedback.submittedDate}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{feedback.customerName}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(feedback.category)}`}>
                        {feedback.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <SentimentIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSentimentBadge(feedback.sentiment)}`}>
                          {feedback.sentiment}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(feedback.status)}`}>
                        {feedback.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(feedback.priority)} ml-2`}>
                        {feedback.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {feedback.resolutionTime ? (
                        <div className="text-sm text-green-600">{feedback.resolutionTime}</div>
                      ) : (
                        <div className="text-sm text-gray-500">Pending</div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{feedback.assignedTo}</div>
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

      {/* Sentiment Analysis */}
      <AnimatedCard
        title="Sentiment Analysis"
        subtitle="Feedback sentiment distribution"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Distribution</h3>
            <div className="space-y-3">
              {sentimentAnalysis.map((sentiment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${sentiment.color}-500 mr-3`}></div>
                    <span className="text-sm font-medium text-gray-900">{sentiment.sentiment}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{sentiment.count} feedback</span>
                    <span className="text-sm font-medium text-gray-900">{sentiment.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
            <div className="space-y-3">
              {feedbackCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{category.count} feedback</span>
                    <span className="text-sm font-medium text-gray-900">{category.satisfaction}/10</span>
                    <TrendingUp className={`w-3 h-3 ${category.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Improvement Areas */}
      <AnimatedCard
        title="Improvement Areas"
        subtitle="Areas identified for improvement"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {improvementAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{area.area}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(area.priority)}`}>
                  {area.priority}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Score:</span>
                  <span className="font-medium text-gray-900">{area.currentScore}/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target Score:</span>
                  <span className="font-medium text-gray-900">{area.targetScore}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(area.currentScore / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <strong>Actions:</strong>
                  <ul className="mt-1 space-y-1">
                    {area.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-xs">• {action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common feedback management actions"
        color="orange"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Collect Feedback</p>
                <p className="text-xs opacity-80">Gather customer input</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Analyze Sentiment</p>
                <p className="text-xs opacity-80">Review feedback trends</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Respond</p>
                <p className="text-xs opacity-80">Address feedback</p>
              </div>
              <MessageSquare className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Generate Insights</p>
                <p className="text-xs opacity-80">Create reports</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Feedback;
