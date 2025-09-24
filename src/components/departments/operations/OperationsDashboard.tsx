import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  Settings,
  BarChart3,
  UserCheck,
  Map,
  Radio,
  Camera,
  Headphones,
  Monitor,
  Zap
} from 'lucide-react';

// Operations Department Pages
import OperationsOverview from './pages/OperationsOverview';
import SecurityAssignments from './pages/SecurityAssignments';
import TeamLeaders from './pages/TeamLeaders';
import ControlRoom from './pages/ControlRoom';
import PatrolSchedules from './pages/PatrolSchedules';
import IncidentReports from './pages/IncidentReports';
import SecurityPerformance from './pages/SecurityPerformance';
import OperationsReports from './pages/OperationsReports';
import OperationsSettings from './pages/OperationsSettings';

interface SecurityGuard {
  id: string;
  name: string;
  position: string;
  status: string;
  location: string;
  shift: string;
  teamLeader: string;
}

interface SecurityAssignment {
  id: string;
  guardName: string;
  post: string;
  location: string;
  shift: string;
  status: string;
  teamLeader: string;
}

const OperationsDashboard: React.FC = () => {
  const colorScheme = getColorScheme('operations');
  const location = useLocation();
  const [securityStats, setSecurityStats] = useState({
    totalGuards: 0,
    activeGuards: 0,
    assignedPosts: 0,
    activeIncidents: 0,
    controlRoomStatus: 'operational',
    teamLeaders: 0
  });
  const [recentAssignments, setRecentAssignments] = useState<SecurityAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOperationsData();
  }, []);

  const fetchOperationsData = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSecurityStats({
        totalGuards: 45,
        activeGuards: 42,
        assignedPosts: 38,
        activeIncidents: 2,
        controlRoomStatus: 'operational',
        teamLeaders: 8
      });

      setRecentAssignments([
        {
          id: '1',
          guardName: 'Jean Baptiste',
          post: 'Main Gate',
          location: 'Kigali Office',
          shift: 'Day Shift',
          status: 'Active',
          teamLeader: 'Paul Mugenzi'
        },
        {
          id: '2',
          guardName: 'Marie Claire',
          post: 'Parking Area',
          location: 'Kigali Office',
          shift: 'Night Shift',
          status: 'Active',
          teamLeader: 'Sarah Uwimana'
        },
        {
          id: '3',
          guardName: 'Peter Nkurunziza',
          post: 'Perimeter Patrol',
          location: 'Kigali Office',
          shift: 'Day Shift',
          status: 'On Break',
          teamLeader: 'Paul Mugenzi'
        }
      ]);
    } catch (error) {
      console.error('Error fetching operations data:', error);
    } finally {
      setLoading(false);
    }
  };

  const operationsStats = [
    {
      title: 'Total Security Guards',
      value: securityStats.totalGuards,
      subtitle: `${securityStats.activeGuards} active`,
      color: 'blue',
      icon: Shield,
      trend: { value: '+3', isPositive: true },
      delay: 0
    },
    {
      title: 'Assigned Posts',
      value: securityStats.assignedPosts,
      subtitle: `${Math.round((securityStats.assignedPosts / securityStats.totalGuards) * 100)}% coverage`,
      color: 'green',
      icon: MapPin,
      trend: { value: '+5%', isPositive: true },
      delay: 100
    },
    {
      title: 'Team Leaders',
      value: securityStats.teamLeaders,
      subtitle: 'Active supervisors',
      color: 'purple',
      icon: UserCheck,
      trend: { value: '+1', isPositive: true },
      delay: 200
    },
    {
      title: 'Active Incidents',
      value: securityStats.activeIncidents,
      subtitle: 'Requiring attention',
      color: 'orange',
      icon: AlertTriangle,
      trend: { value: '-1', isPositive: true },
      delay: 300
    }
  ];

  const quickActions = [
    {
      title: 'Assign Security Guard',
      description: 'Assign guards to posts',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Control Room',
      description: 'Monitor operations',
      icon: Monitor,
      color: 'green'
    },
    {
      title: 'Incident Report',
      description: 'Log security incidents',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Team Leader Dashboard',
      description: 'Manage team leaders',
      icon: UserCheck,
      color: 'purple'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/operations', icon: Shield },
    { name: 'Overview', path: '/operations/overview', icon: Eye },
    { name: 'Security Assignments', path: '/operations/assignments', icon: Users },
    { name: 'Team Leaders', path: '/operations/team-leaders', icon: UserCheck },
    { name: 'Control Room', path: '/operations/control-room', icon: Monitor },
    { name: 'Patrol Schedules', path: '/operations/patrols', icon: Map },
    { name: 'Incident Reports', path: '/operations/incidents', icon: AlertTriangle },
    { name: 'Performance', path: '/operations/performance', icon: BarChart3 },
    { name: 'Reports', path: '/operations/reports', icon: BarChart3 },
    { name: 'Settings', path: '/operations/settings', icon: Settings }
  ];

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Operations Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {operationsStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Control Room Status */}
      <AnimatedCard
        title="Control Room Status"
        subtitle="Real-time monitoring center"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Monitor className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Control Room</p>
              <p className="text-sm text-gray-500">Kigali Office - Main Building</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Operational
            </span>
            <p className="text-xs text-gray-500 mt-1">All systems normal</p>
          </div>
        </div>
      </AnimatedCard>

      {/* Recent Security Assignments */}
      <AnimatedCard
        title="Recent Security Assignments"
        subtitle="Current guard assignments"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{assignment.guardName}</p>
                  <p className="text-sm text-gray-500">{assignment.post} • {assignment.location}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  assignment.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {assignment.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{assignment.shift}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <AnimatedCard
            key={index}
            title={action.title}
            subtitle={action.description}
            icon={action.icon}
            color={action.color}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <AnimatedButton
              onClick={() => {}}
              color={action.color}
              className="w-full"
            >
              {action.title}
            </AnimatedButton>
          </AnimatedCard>
        ))}
      </div>

      {/* Operations Overview */}
      <AnimatedCard
        title="Operations Performance"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Security Coverage</h4>
            <AnimatedProgressBar
              progress={85}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={92}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Response Times</h4>
            <AnimatedProgressBar
              progress={78}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={88}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/operations':
        return <DashboardContent />;
      case '/operations/overview':
        return <OperationsOverview />;
      case '/operations/assignments':
        return <SecurityAssignments />;
      case '/operations/team-leaders':
        return <TeamLeaders />;
      case '/operations/control-room':
        return <ControlRoom />;
      case '/operations/patrols':
        return <PatrolSchedules />;
      case '/operations/incidents':
        return <IncidentReports />;
      case '/operations/performance':
        return <SecurityPerformance />;
      case '/operations/reports':
        return <OperationsReports />;
      case '/operations/settings':
        return <OperationsSettings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Operations Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {loading ? (
        <div className="text-center py-10">
          <p>Loading operations data...</p>
        </div>
      ) : (
        renderContent()
      )}
    </DepartmentLayout>
  );
};

export default OperationsDashboard;
