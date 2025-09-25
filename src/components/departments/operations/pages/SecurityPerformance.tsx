import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Shield,
  Clock,
  Award,
  Activity
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface GuardPerformance {
  id: string;
  name: string;
  position: string;
  rating: number;
  incidentsHandled: number;
  responseTime: number;
  attendance: number;
  trainingCompleted: number;
  lastReview: string;
}

const SecurityPerformance: React.FC = () => {
  const [performanceMetrics] = useState<PerformanceMetric[]>([
    {
      id: '1',
      name: 'Response Time',
      value: 3.2,
      target: 3.0,
      unit: 'minutes',
      trend: 'up',
      change: 0.2
    },
    {
      id: '2',
      name: 'Incident Resolution',
      value: 94,
      target: 95,
      unit: '%',
      trend: 'up',
      change: 2
    },
    {
      id: '3',
      name: 'Attendance Rate',
      value: 98,
      target: 95,
      unit: '%',
      trend: 'stable',
      change: 0
    },
    {
      id: '4',
      name: 'Training Completion',
      value: 87,
      target: 90,
      unit: '%',
      trend: 'up',
      change: 5
    },
    {
      id: '5',
      name: 'Client Satisfaction',
      value: 4.6,
      target: 4.5,
      unit: '/5',
      trend: 'up',
      change: 0.1
    },
    {
      id: '6',
      name: 'Safety Incidents',
      value: 2,
      target: 0,
      unit: 'count',
      trend: 'down',
      change: -1
    }
  ]);

  const [guardPerformance] = useState<GuardPerformance[]>([
    {
      id: '1',
      name: 'Jean Baptiste',
      position: 'Main Gate Guard',
      rating: 4.8,
      incidentsHandled: 12,
      responseTime: 2.8,
      attendance: 100,
      trainingCompleted: 8,
      lastReview: '2024-01-10'
    },
    {
      id: '2',
      name: 'Marie Claire',
      position: 'Parking Area Guard',
      rating: 4.6,
      incidentsHandled: 8,
      responseTime: 3.1,
      attendance: 98,
      trainingCompleted: 6,
      lastReview: '2024-01-08'
    },
    {
      id: '3',
      name: 'Peter Nkurunziza',
      position: 'Patrol Guard',
      rating: 4.9,
      incidentsHandled: 15,
      responseTime: 2.5,
      attendance: 100,
      trainingCompleted: 10,
      lastReview: '2024-01-12'
    },
    {
      id: '4',
      name: 'Grace Mukamana',
      position: 'Reception Guard',
      rating: 4.7,
      incidentsHandled: 6,
      responseTime: 3.5,
      attendance: 96,
      trainingCompleted: 7,
      lastReview: '2024-01-09'
    },
    {
      id: '5',
      name: 'David Nkurunziza',
      position: 'Night Guard',
      rating: 4.5,
      incidentsHandled: 10,
      responseTime: 3.8,
      attendance: 94,
      trainingCompleted: 5,
      lastReview: '2024-01-07'
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 98) return 'text-green-600';
    if (attendance >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Performance</h2>
          <p className="text-gray-600">Monitor and analyze security team performance metrics</p>
        </div>
        <AnimatedButton
          onClick={() => {}}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Generate Report</span>
        </AnimatedButton>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceMetrics.map((metric) => (
          <AnimatedCard
            key={metric.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value}{metric.unit}
                  </span>
                  <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Target: {metric.target}{metric.unit}</span>
                  <span>vs target</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.value >= metric.target ? 'bg-green-600' : 'bg-yellow-600'
                    }`}
                    style={{ 
                      width: `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard
          title="Overall Performance"
          subtitle="Key performance indicators"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Response Time</span>
                <span>3.2 min</span>
              </div>
              <AnimatedProgressBar progress={85} color="blue" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Incident Resolution</span>
                <span>94%</span>
              </div>
              <AnimatedProgressBar progress={94} color="green" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Attendance Rate</span>
                <span>98%</span>
              </div>
              <AnimatedProgressBar progress={98} color="green" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Training Completion</span>
                <span>87%</span>
              </div>
              <AnimatedProgressBar progress={87} color="yellow" height={8} showLabel={false} />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Team Statistics"
          subtitle="Security team overview"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{guardPerformance.length}</p>
              <p className="text-sm text-gray-500">Total Guards</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {(guardPerformance.reduce((sum, guard) => sum + guard.rating, 0) / guardPerformance.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">Avg Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {guardPerformance.reduce((sum, guard) => sum + guard.incidentsHandled, 0)}
              </p>
              <p className="text-sm text-gray-500">Incidents Handled</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {(guardPerformance.reduce((sum, guard) => sum + guard.responseTime, 0) / guardPerformance.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">Avg Response (min)</p>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Individual Guard Performance */}
      <AnimatedCard
        title="Individual Guard Performance"
        subtitle="Performance ratings and metrics by guard"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Guard</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Position</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Incidents</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Response Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Attendance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Training</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Review</th>
              </tr>
            </thead>
            <tbody>
              {guardPerformance.map((guard) => (
                <tr key={guard.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{guard.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{guard.position}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${getRatingColor(guard.rating)}`}>
                      {guard.rating}/5.0
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{guard.incidentsHandled}</td>
                  <td className="py-3 px-4 text-gray-700">{guard.responseTime} min</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${getAttendanceColor(guard.attendance)}`}>
                      {guard.attendance}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{guard.trainingCompleted}</td>
                  <td className="py-3 px-4 text-gray-700">{guard.lastReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Performance Trends */}
      <AnimatedCard
        title="Performance Trends"
        subtitle="Monthly performance analysis"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Response Time Trend</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>January</span>
                <span>3.2 min</span>
              </div>
              <AnimatedProgressBar progress={85} color="blue" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>December</span>
                <span>3.5 min</span>
              </div>
              <AnimatedProgressBar progress={78} color="blue" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>November</span>
                <span>3.8 min</span>
              </div>
              <AnimatedProgressBar progress={72} color="blue" height={6} showLabel={false} />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Incident Resolution Trend</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>January</span>
                <span>94%</span>
              </div>
              <AnimatedProgressBar progress={94} color="green" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>December</span>
                <span>92%</span>
              </div>
              <AnimatedProgressBar progress={92} color="green" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>November</span>
                <span>89%</span>
              </div>
              <AnimatedProgressBar progress={89} color="green" height={6} showLabel={false} />
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default SecurityPerformance;
