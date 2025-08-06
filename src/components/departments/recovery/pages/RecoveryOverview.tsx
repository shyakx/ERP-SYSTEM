import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  TrendingUp, 
  DollarSign, 
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Eye,
  Download,
  Filter,
  Search
} from "lucide-react";

const RecoveryOverview: React.FC = () => {
  const colorScheme = getColorScheme("recovery");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const overviewStats = [
    { title: "Total Recovered", value: "RWF 28.5M", subtitle: "+15.3% from last month", icon: DollarSign, color: "green" },
    { title: "Active Cases", value: "67", subtitle: "Currently in progress", icon: Users, color: "blue" },
    { title: "Success Rate", value: "78.5%", subtitle: "Recovery success", icon: CheckCircle, color: "orange" },
    { title: "Avg. Recovery Time", value: "18 days", subtitle: "Time to resolution", icon: Clock, color: "purple" }
  ];

  const recoveryTrends = [
    { month: "January 2024", recovered: 12.8, target: 15.0, cases: 23 },
    { month: "December 2023", recovered: 11.1, target: 12.0, cases: 19 },
    { month: "November 2023", recovered: 10.5, target: 11.0, cases: 17 },
    { month: "October 2023", recovered: 9.8, target: 10.0, cases: 15 },
    { month: "September 2023", recovered: 8.9, target: 9.0, cases: 14 }
  ];

  const caseTypeDistribution = [
    { type: "Fraud Recovery", count: 23, percentage: 34.3, color: "red" },
    { type: "Asset Recovery", count: 18, percentage: 26.9, color: "blue" },
    { type: "Insurance Recovery", count: 12, percentage: 17.9, color: "green" },
    { type: "Debt Collection", count: 8, percentage: 11.9, color: "orange" },
    { type: "Other", count: 6, percentage: 9.0, color: "purple" }
  ];

  const topPerformingCases = [
    {
      id: "REC-2024-001",
      title: "Corporate Fraud Investigation",
      clientName: "Kigali Business Center",
      recoveredAmount: "RWF 2.5M",
      originalAmount: "RWF 3.2M",
      recoveryRate: 78.1,
      duration: "18 days",
      assignedTo: "Marie Claire Niyonsaba"
    },
    {
      id: "REC-2024-003",
      title: "Insurance Claim Recovery",
      clientName: "Huye Insurance Co.",
      recoveredAmount: "RWF 2.2M",
      originalAmount: "RWF 2.5M",
      recoveryRate: 88.0,
      duration: "15 days",
      assignedTo: "Emmanuel Ndayisaba"
    },
    {
      id: "REC-2024-002",
      title: "Asset Recovery Case",
      clientName: "Musanze Bank",
      recoveredAmount: "RWF 1.8M",
      originalAmount: "RWF 2.1M",
      recoveryRate: 85.7,
      duration: "22 days",
      assignedTo: "Patrick Nshimiyimana"
    }
  ];

  const performanceMetrics = [
    { metric: "Monthly Recovery Target", value: "RWF 15.0M", achieved: "RWF 12.8M", percentage: 85.3 },
    { metric: "Case Success Rate", value: "78.5%", target: "80%", percentage: 98.1 },
    { metric: "Average Recovery Time", value: "18 days", target: "15 days", percentage: 120.0 },
    { metric: "Client Satisfaction", value: "92.3%", target: "90%", percentage: 102.6 }
  ];

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getRecoveryRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
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

      {/* Recovery Controls */}
      <AnimatedCard
        title="Recovery Dashboard"
        subtitle="Overview and analytics controls"
        color="blue"
        icon=""
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Metric</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="revenue">Recovery Revenue</option>
              <option value="cases">Active Cases</option>
              <option value="success">Success Rate</option>
              <option value="time">Recovery Time</option>
            </select>
          </div>
          <div className="flex items-end">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log("Export data")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Recovery Trends */}
      <AnimatedCard
        title="Recovery Trends"
        subtitle="Monthly recovery performance and trends"
        color="green"
        icon=""
        delay={600}
      >
        <div className="space-y-4">
          {recoveryTrends.map((trend, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{trend.month}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{trend.cases} cases</span>
                  <span className="text-sm font-medium text-green-600">RWF {trend.recovered}M</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Recovery vs Target</span>
                  <span className="text-xs text-gray-500">{Math.round((trend.recovered / trend.target) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${Math.min((trend.recovered / trend.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Target: RWF {trend.target}M</span>
                  <span>Achieved: RWF {trend.recovered}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Case Type Distribution */}
      <AnimatedCard
        title="Case Type Distribution"
        subtitle="Recovery cases by type"
        color="orange"
        icon=""
        delay={800}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Case Distribution</h3>
            <div className="space-y-3">
              {caseTypeDistribution.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${type.color}-500 mr-3`}></div>
                    <span className="text-sm font-medium text-gray-900">{type.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{type.count} cases</span>
                    <span className="text-sm font-medium text-gray-900">{type.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total Cases</span>
                <span className="text-sm text-gray-600">67</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Active Cases</span>
                <span className="text-sm text-blue-600">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Completed Cases</span>
                <span className="text-sm text-green-600">22</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Success Rate</span>
                <span className="text-sm text-green-600">78.5%</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Top Performing Cases */}
      <AnimatedCard
        title="Top Performing Cases"
        subtitle="Highest recovery rate cases"
        color="blue"
        icon=""
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovered Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformingCases.map((case_) => (
                <tr key={case_.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.id}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{case_.title}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.clientName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{case_.recoveredAmount}</div>
                    <div className="text-xs text-gray-500">of {case_.originalAmount}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRecoveryRateColor(case_.recoveryRate)}`}>
                      {case_.recoveryRate}%
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: `${case_.recoveryRate}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{case_.duration}</div>
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

      {/* Performance Metrics */}
      <AnimatedCard
        title="Performance Metrics"
        subtitle="Key performance indicators and targets"
        color="purple"
        icon=""
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">{metric.metric}</h3>
                <Target className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className={`text-sm font-medium ${getPercentageColor(metric.percentage)}`}>
                    {metric.percentage}% of target
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getPercentageColor(metric.percentage).replace('text-', 'bg-').replace('-600', '-600')}`}
                    style={{ width: `${Math.min(metric.percentage, 100)}%` }}
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
        subtitle="Common recovery department actions"
        color="green"
        icon=""
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Create New Case</p>
                <p className="text-xs opacity-80">Start recovery process</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">View Reports</p>
                <p className="text-xs opacity-80">Analytics & insights</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Team Management</p>
                <p className="text-xs opacity-80">Assign & track cases</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Legal Support</p>
                <p className="text-xs opacity-80">Legal proceedings</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default RecoveryOverview;
