import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { roleDisplayNames } from '../config/menu';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Users, Clock, DollarSign, AlertTriangle, Plus, Calendar, Megaphone } from 'lucide-react';
import { formatRWF } from '../utils/formatRWF';

interface DashboardStats {
  employees: number;
  onDuty: number;
  payroll: number;
  incidents: number;
}

interface AttendanceData {
  name: string;
  Present: number;
  Absent: number;
  Late: number;
}

interface ActivityItem {
  activity_type: string;
  description: string;
  timestamp: string;
  employee_name: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({ employees: 0, onDuty: 0, payroll: 0, incidents: 0 });
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard overview stats
        const statsResponse = await fetch('/api/dashboard/overview');
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch attendance trend data
        const attendanceResponse = await fetch('/api/attendance/trend');
        const attendanceData = await attendanceResponse.json();
        
        // Transform attendance data for chart
        const chartData = attendanceData.slice(-7).map((item: any) => ({
          name: item.date, // Use full date string
          Present: item.present,
          Absent: item.absent,
          Late: item.leave || 0
        }));
        setAttendanceData(chartData);

        // Fetch recent activities
        const activityResponse = await fetch('/api/activity/recent');
        const activityData = await activityResponse.json();
        setRecentActivity(activityData.slice(0, 5));

        // Fetch announcements
        const announcementsResponse = await fetch('/api/announcements');
        const announcementsData = await announcementsResponse.json();
        setAnnouncements(announcementsData.slice(0, 3));

      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsCards = [
    { title: 'Employees', value: stats.employees, icon: <Users className="w-6 h-6 text-blue-600" />, color: 'bg-blue-50' },
    { title: 'On Duty', value: stats.onDuty, icon: <Clock className="w-6 h-6 text-green-600" />, color: 'bg-green-50' },
    { title: 'Payroll (This Month)', value: formatRWF(stats.payroll), icon: <DollarSign className="w-6 h-6 text-yellow-600" />, color: 'bg-yellow-50' },
    { title: 'Incidents', value: stats.incidents, icon: <AlertTriangle className="w-6 h-6 text-red-600" />, color: 'bg-red-50' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'checkin':
        return <Clock className="w-4 h-4 text-green-600" />;
      case 'checkout':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'employee_registration':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'disciplinary_action':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'shift_assignment':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'payroll_processed':
        return <DollarSign className="w-4 h-4 text-green-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Company Logo" className="w-12 h-12 rounded-lg bg-white object-contain border-2 border-blue-600 shadow" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name || 'User'}!</h1>
            <p className="text-gray-500 text-sm">{user?.role ? roleDisplayNames[user.role] : 'DICEL Security ERP'}</p>
          </div>
        </div>
        <div className="text-gray-400 text-sm font-medium">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mt-8">
        {statsCards.map((stat, i) => (
          <div key={i} className={`flex items-center p-5 rounded-xl shadow-sm border border-gray-200 ${stat.color}`}>
            <div className="mr-4">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.title}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            {attendanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={attendanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tickFormatter={date => {
                      return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    labelFormatter={label => `Date: ${label}`}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="Present" stackId="a" fill="#2563eb" name="Present" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Absent" stackId="a" fill="#f59e42" name="Absent" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Late" stackId="a" fill="#facc15" name="Late" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-400 py-8">No attendance data available</div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(item.activity_type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.description}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(item.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">No recent activity</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
              <button className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full">
                <Plus className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Add Employee</span>
              </button>
              <button className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full">
                <Calendar className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Schedule Shift</span>
              </button>
              <button className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full">
                <DollarSign className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Create Invoice</span>
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
            <div className="space-y-3">
              {announcements.length > 0 ? (
                announcements.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Megaphone className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">No announcements</div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-4 text-center text-xs text-gray-400">
        Version 1.0.0 &nbsp;|&nbsp; © 2024 DICEL Security
      </footer>
    </div>
  );
};

export default Dashboard;