import React, { useState } from "react";
import AnimatedCard from "../../../shared/AnimatedCard";
import { AnimatedButton } from "../../../shared/AnimatedCard";
import { getColorScheme } from "../../../../utils/colorSchemes";
import { 
  TrendingUp, 
  Users,
  DollarSign,
  Target,
  Calendar,
  Download,
  Eye,
  Activity
} from "lucide-react";

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const analyticsStats = [
    { title: "Total Revenue", value: "RWF 45.2M", subtitle: "+12.5% from last month", icon: DollarSign, color: "green" },
    { title: "New Customers", value: "1,247", subtitle: "+8.3% growth", icon: Users, color: "blue" },
    { title: "Conversion Rate", value: "23.4%", subtitle: "+2.1% improvement", icon: Target, color: "orange" },
    { title: "Avg. Deal Size", value: "RWF 2.8M", subtitle: "+5.7% increase", icon: TrendingUp, color: "purple" }
  ];

  const topPerformingProducts = [
    { name: "Security Systems", revenue: "RWF 12.5M", growth: "+15.2%", sales: 89 },
    { name: "Surveillance Cameras", revenue: "RWF 8.9M", growth: "+12.8%", sales: 156 },
    { name: "Access Control", revenue: "RWF 7.2M", growth: "+9.4%", sales: 67 },
    { name: "Alarm Systems", revenue: "RWF 6.1M", growth: "+7.9%", sales: 94 }
  ];

  const salesByRegion = [
    { region: "Kigali", revenue: "RWF 18.2M", percentage: 40.3 },
    { region: "Musanze", revenue: "RWF 8.9M", percentage: 19.7 },
    { region: "Huye", revenue: "RWF 7.5M", percentage: 16.6 },
    { region: "Rubavu", revenue: "RWF 6.1M", percentage: 13.5 },
    { region: "Others", revenue: "RWF 4.5M", percentage: 10.0 }
  ];

  const conversionFunnel = [
    { stage: "Leads Generated", count: 2450, percentage: 100 },
    { stage: "Qualified Leads", count: 1837, percentage: 75 },
    { stage: "Proposals Sent", count: 1102, percentage: 45 },
    { stage: "Negotiations", count: 661, percentage: 27 },
    { stage: "Closed Deals", count: 573, percentage: 23.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats.map((stat, index) => (
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

      {/* Analytics Controls */}
      <AnimatedCard
        title="Analytics Dashboard"
        subtitle="Sales and marketing performance metrics"
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
              <option value="revenue">Revenue</option>
              <option value="leads">Leads</option>
              <option value="conversion">Conversion Rate</option>
              <option value="deals">Deal Size</option>
            </select>
          </div>
          <div className="flex items-end">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log("Export analytics")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </AnimatedButton>
          </div>
        </div>
      </AnimatedCard>

      {/* Top Performing Products */}
      <AnimatedCard
        title="Top Performing Products"
        subtitle="Revenue and growth by product category"
        color="green"
        icon=""
        delay={600}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformingProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.revenue}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {product.growth}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.sales}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Sales by Region */}
      <AnimatedCard
        title="Sales by Region"
        subtitle="Revenue distribution across regions"
        color="orange"
        icon=""
        delay={800}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Distribution</h3>
            <div className="space-y-3">
              {salesByRegion.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">{region.region}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{region.revenue}</span>
                    <span className="text-sm font-medium text-gray-900">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{stage.count}</span>
                    <span className="text-sm font-medium text-gray-900">{stage.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Performance Metrics */}
      <AnimatedCard
        title="Performance Metrics"
        subtitle="Key performance indicators and trends"
        color="purple"
        icon=""
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Monthly Growth</p>
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Customer Satisfaction</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Lead Response Time</p>
                <p className="text-2xl font-bold">2.3h</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Sales Cycle</p>
                <p className="text-2xl font-bold">18 days</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Analytics;
