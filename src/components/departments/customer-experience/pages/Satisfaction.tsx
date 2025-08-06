import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  Star, 
  Smile, 
  Frown,
  MessageSquare,
  TrendingUp,
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
  Download
} from "lucide-react";

const Satisfaction: React.FC = () => {
  const colorScheme = getColorScheme("customer-experience");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const satisfactionStats = [
    { title: "Overall Satisfaction", value: "8.7/10", subtitle: "+0.3 from last month", icon: Star, color: "yellow" },
    { title: "Response Rate", value: "94.2%", subtitle: "Survey participation", icon: CheckCircle, color: "green" },
    { title: "Net Promoter Score", value: "72", subtitle: "Customer loyalty", icon: TrendingUp, color: "blue" },
    { title: "Satisfied Customers", value: "89.3%", subtitle: "4+ star ratings", icon: Smile, color: "orange" }
  ];

  const satisfactionSurveys = [
    {
      id: "SURV-2024-001",
      customerName: "Kigali Business Center",
      surveyType: "Post-Service",
      rating: 9,
      submittedDate: "2024-01-20",
      status: "Completed",
      category: "Security Installation",
      feedback: "Excellent service quality and professional team. Very satisfied with the installation process.",
      assignedTo: "Marie Claire Niyonsaba"
    },
    {
      id: "SURV-2024-002",
      customerName: "Musanze Bank",
      surveyType: "Support Experience",
      rating: 7,
      submittedDate: "2024-01-22",
      status: "In Review",
      category: "Technical Support",
      feedback: "Good support but response time could be improved. Overall satisfied with the resolution.",
      assignedTo: "Patrick Nshimiyimana"
    },
    {
      id: "SURV-2024-003",
      customerName: "Huye University",
      surveyType: "Product Quality",
      rating: 10,
      submittedDate: "2024-01-18",
      status: "Completed",
      category: "Product Review",
      feedback: "Outstanding product quality and exceeded expectations. Highly recommend to others.",
      assignedTo: "Emmanuel Ndayisaba"
    },
    {
      id: "SURV-2024-004",
      customerName: "Rubavu Trading Co.",
      surveyType: "Customer Service",
      rating: 6,
      submittedDate: "2024-01-25",
      status: "Follow-up Required",
      category: "Service Experience",
      feedback: "Service was adequate but communication could be better. Some delays in response.",
      assignedTo: "Alice Uwimana"
    }
  ];

  const satisfactionTrends = [
    { month: "January 2024", satisfaction: 8.7, responses: 156, trend: "up" },
    { month: "December 2023", satisfaction: 8.4, responses: 142, trend: "up" },
    { month: "November 2023", satisfaction: 8.2, responses: 138, trend: "down" },
    { month: "October 2023", satisfaction: 8.5, responses: 145, trend: "up" },
    { month: "September 2023", satisfaction: 8.1, responses: 132, trend: "down" }
  ];

  const ratingDistribution = [
    { rating: "5 Stars", count: 234, percentage: 45.2, color: "green" },
    { rating: "4 Stars", count: 156, percentage: 30.1, color: "blue" },
    { rating: "3 Stars", count: 78, percentage: 15.1, color: "yellow" },
    { rating: "2 Stars", count: 32, percentage: 6.2, color: "orange" },
    { rating: "1 Star", count: 18, percentage: 3.4, color: "red" }
  ];

  const satisfactionCategories = [
    { category: "Product Quality", satisfaction: 9.2, responses: 89, trend: "up" },
    { category: "Service Delivery", satisfaction: 8.8, responses: 67, trend: "up" },
    { category: "Technical Support", satisfaction: 8.1, responses: 45, trend: "down" },
    { category: "Communication", satisfaction: 7.9, responses: 34, trend: "up" },
    { category: "Value for Money", satisfaction: 8.5, responses: 56, trend: "up" }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "text-green-600";
    if (rating >= 7) return "text-blue-600";
    if (rating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 9) return "bg-green-100 text-green-800";
    if (rating >= 7) return "bg-blue-100 text-blue-800";
    if (rating >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Review": return "bg-yellow-100 text-yellow-800";
      case "Follow-up Required": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingUp;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Satisfaction Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {satisfactionStats.map((stat, index) => (
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

      {/* Satisfaction Actions */}
      <AnimatedCard
        title="Satisfaction Management"
        subtitle="Create and manage satisfaction surveys"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log("Create survey")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Survey
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log("Send survey")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Survey
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log("Analyze feedback")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Feedback
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
        title="Search Surveys"
        subtitle="Find specific satisfaction surveys"
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
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
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

      {/* Satisfaction Surveys Table */}
      <AnimatedCard
        title="Satisfaction Surveys"
        subtitle="All customer satisfaction surveys"
        color="blue"
        icon=""
        delay={800}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {satisfactionSurveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{survey.id}</div>
                    <div className="text-xs text-gray-500">{survey.surveyType}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{survey.customerName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {survey.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < survey.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${getRatingColor(survey.rating)}`}>
                        {survey.rating}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(survey.status)}`}>
                      {survey.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{survey.submittedDate}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{survey.assignedTo}</div>
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
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Satisfaction Trends */}
      <AnimatedCard
        title="Satisfaction Trends"
        subtitle="Monthly satisfaction performance"
        color="green"
        icon=""
        delay={1000}
      >
        <div className="space-y-4">
          {satisfactionTrends.map((trend, index) => {
            const TrendIcon = getTrendIcon(trend.trend);
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">{trend.month}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{trend.responses} responses</span>
                    <span className="text-sm font-medium text-green-600">{trend.satisfaction}/10</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Satisfaction Score</span>
                    <span className="text-xs text-gray-500">{trend.satisfaction}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(trend.satisfaction / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Responses: {trend.responses}</span>
                    <div className="flex items-center">
                      <TrendIcon className={`w-3 h-3 mr-1 ${getTrendColor(trend.trend)}`} />
                      <span className={getTrendColor(trend.trend)}>
                        {trend.trend === "up" ? "Improving" : "Declining"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Rating Distribution */}
      <AnimatedCard
        title="Rating Distribution"
        subtitle="Customer ratings breakdown"
        color="orange"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingDistribution.map((rating, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < parseInt(rating.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{rating.rating}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{rating.count} responses</span>
                    <span className="text-sm font-medium text-gray-900">{rating.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
            <div className="space-y-3">
              {satisfactionCategories.map((category, index) => {
                const TrendIcon = getTrendIcon(category.trend);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{category.satisfaction}/10</span>
                      <span className="text-sm text-gray-600">({category.responses} responses)</span>
                      <TrendIcon className={`w-3 h-3 ${getTrendColor(category.trend)}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common satisfaction management actions"
        color="purple"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create Survey</p>
                <p className="text-xs opacity-80">New satisfaction survey</p>
              </div>
              <Plus className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Analyze Feedback</p>
                <p className="text-xs opacity-80">Review responses</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Follow-up</p>
                <p className="text-xs opacity-80">Contact customers</p>
              </div>
              <MessageSquare className="w-8 h-8 opacity-80" />
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

export default Satisfaction;
