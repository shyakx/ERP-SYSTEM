import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Shield, 
  Activity,
  Calendar,
  Download,
  Filter,
  Search,
  Eye,
  RefreshCw,
  Zap,
  Target,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Building,
  MapPin,
  PieChart,
  LineChart,
  BarChart,
  AreaChart
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const chartData = {
    revenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    users: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    security: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    system: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  const departmentStats = [
    { name: 'HR', revenue: 0, growth: '+0%', employees: 0, color: 'from-purple-500 to-purple-600' },
    { name: 'Finance', revenue: 0, growth: '+0%', employees: 0, color: 'from-green-500 to-green-600' },
    { name: 'Security', revenue: 0, growth: '+0%', employees: 0, color: 'from-yellow-500 to-yellow-600' },
    { name: 'IT', revenue: 0, growth: '+0%', employees: 0, color: 'from-blue-500 to-blue-600' },
    { name: 'Sales', revenue: 0, growth: '+0%', employees: 0, color: 'from-pink-500 to-pink-600' },
    { name: 'Operations', revenue: 0, growth: '+0%', employees: 0, color: 'from-orange-500 to-orange-600' }
  ];

  // Empty top performers array - no mock data
  const topPerformers: any[] = [];

  // Empty recent activities array - no mock data
  const recentActivities: any[] = [];

  const renderChart = (data: number[], color: string) => (
    <div className="flex items-end space-x-1 h-20">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 bg-gradient-to-t from-gray-200 to-gray-300 rounded-sm hover:from-purple-200 hover:to-purple-300 transition-all duration-300"
          style={{ height: `${(value / Math.max(...data)) * 100}%` }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Analytics Dashboard
            </h1>
            <p className="text-purple-100 text-lg">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl flex items-center space-x-2 border border-white/30">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div 
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
        >
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +0%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">$0</h3>
            <p className="text-sm font-medium text-gray-600 mb-4">Total Revenue</p>
            {renderChart(chartData.revenue, 'from-green-500 to-green-600')}
          </div>
        </div>

        {/* Active Users */}
        <div 
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
        >
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  +0%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm font-medium text-gray-600 mb-4">Active Users</p>
            {renderChart(chartData.users, 'from-blue-500 to-blue-600')}
          </div>
        </div>

        {/* Security Guards */}
        <div 
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
        >
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  +0%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm font-medium text-gray-600 mb-4">Security Guards</p>
            {renderChart(chartData.security, 'from-yellow-500 to-yellow-600')}
          </div>
        </div>

        {/* System Uptime */}
        <div 
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
        >
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  +0%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0%</h3>
            <p className="text-sm font-medium text-gray-600 mb-4">System Uptime</p>
            {renderChart(chartData.system, 'from-purple-500 to-purple-600')}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Department Performance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="w-6 h-6 mr-2 text-purple-600" />
              Department Performance
            </h3>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                      {dept.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{dept.name}</h4>
                      <p className="text-xs text-gray-500">{dept.employees} employees</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${dept.revenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600 font-medium">{dept.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-purple-600" />
              Top Performers
            </h3>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {performer.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{performer.name}</h4>
                    <p className="text-xs text-gray-500">{performer.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                          style={{ width: `${performer.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{performer.performance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-purple-600" />
          Recent Activities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentActivities.map((activity, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-white border border-gray-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800`}>
                  {activity.type}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-2">{activity.message}</p>
              <p className="text-lg font-bold text-green-600">{activity.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="group p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <BarChart3 className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
          <p className="text-blue-100 text-sm">Create detailed analytics report</p>
        </button>
        
        <button className="group p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Download className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Export Data</h3>
          <p className="text-green-100 text-sm">Download analytics data</p>
        </button>
        
        <button className="group p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Target className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Set Goals</h3>
          <p className="text-purple-100 text-sm">Configure performance targets</p>
        </button>
        
        <button className="group p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <RefreshCw className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Refresh Data</h3>
          <p className="text-orange-100 text-sm">Update analytics in real-time</p>
        </button>
      </div>
    </div>
  );
};

export default Analytics; 