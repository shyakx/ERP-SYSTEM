import React, { useState, useEffect } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Radio,
  Camera,
  Headphones,
  Monitor,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';

interface OperationsOverviewData {
  totalGuards: number;
  activeGuards: number;
  assignedPosts: number;
  teamLeaders: number;
  activeIncidents: number;
  controlRoomStatus: string;
  responseTime: number;
  coveragePercentage: number;
}

const OperationsOverview: React.FC = () => {
  const [data, setData] = useState<OperationsOverviewData>({
    totalGuards: 45,
    activeGuards: 42,
    assignedPosts: 38,
    teamLeaders: 8,
    activeIncidents: 2,
    controlRoomStatus: 'operational',
    responseTime: 3.2,
    coveragePercentage: 85
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'assignment',
      description: 'Jean Baptiste assigned to Main Gate',
      timestamp: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'incident',
      description: 'Minor incident reported at Parking Area',
      timestamp: '15 minutes ago',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'patrol',
      description: 'Perimeter patrol completed by Team Alpha',
      timestamp: '30 minutes ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'shift',
      description: 'Night shift handover completed',
      timestamp: '1 hour ago',
      status: 'completed'
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <Users className="w-4 h-4 text-blue-600" />;
      case 'incident': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'patrol': return <MapPin className="w-4 h-4 text-green-600" />;
      case 'shift': return <Clock className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-800';
      case 'incident': return 'bg-red-100 text-red-800';
      case 'patrol': return 'bg-green-100 text-green-800';
      case 'shift': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Operations Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Security Guards"
          subtitle={`${data.activeGuards} active`}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.totalGuards}</p>
              <p className="text-sm text-gray-500">Security personnel</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Assigned Posts"
          subtitle={`${data.coveragePercentage}% coverage`}
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.assignedPosts}</p>
              <p className="text-sm text-gray-500">Active posts</p>
            </div>
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Team Leaders"
          subtitle="Active supervisors"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.teamLeaders}</p>
              <p className="text-sm text-gray-500">Supervisors</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Response Time"
          subtitle="Average minutes"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.responseTime}</p>
              <p className="text-sm text-gray-500">Minutes</p>
            </div>
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Control Room Status */}
      <AnimatedCard
        title="Control Room Status"
        subtitle="Real-time monitoring center"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Main Control Room</p>
              <p className="text-sm text-gray-500">Kigali Office</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Operational
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Radio className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Communication</p>
              <p className="text-sm text-gray-500">Radio systems</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Surveillance</p>
              <p className="text-sm text-gray-500">Camera systems</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Recording
              </span>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard
          title="Security Coverage"
          subtitle="Post assignment efficiency"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Main Posts</span>
                <span>92%</span>
              </div>
              <AnimatedProgressBar progress={92} color="blue" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Perimeter Posts</span>
                <span>85%</span>
              </div>
              <AnimatedProgressBar progress={85} color="green" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Patrol Routes</span>
                <span>78%</span>
              </div>
              <AnimatedProgressBar progress={78} color="purple" height={8} showLabel={false} />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Response Performance"
          subtitle="Incident response metrics"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Average Response Time</span>
                <span>3.2 min</span>
              </div>
              <AnimatedProgressBar progress={85} color="green" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Incident Resolution</span>
                <span>94%</span>
              </div>
              <AnimatedProgressBar progress={94} color="blue" height={8} showLabel={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Team Coordination</span>
                <span>88%</span>
              </div>
              <AnimatedProgressBar progress={88} color="purple" height={8} showLabel={false} />
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Recent Activity */}
      <AnimatedCard
        title="Recent Activity"
        subtitle="Latest operations updates"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common operations tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Assign Guard</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Schedule Patrol</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Report Incident</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <Monitor className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Control Room</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default OperationsOverview;
