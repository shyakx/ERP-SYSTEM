import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Users, Clock, DollarSign, AlertTriangle, Plus, Calendar, Megaphone } from 'lucide-react';
import { formatRWF } from '../../utils/formatRWF';
import { useNavigate } from 'react-router-dom';

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: string;
  created_at: string;
}

const HRDashboard: React.FC = () => {
  // State for stats
  const [stats, setStats] = useState({
    total: 0,
    onDuty: 0,
    payroll: 0,
    incidents: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');
  const [incidentsLoading, setIncidentsLoading] = useState(true);
  const [incidentsError, setIncidentsError] = useState('');
  const [onDutyLoading, setOnDutyLoading] = useState(true);
  const [onDutyError, setOnDutyError] = useState('');
  const [payrollLoading, setPayrollLoading] = useState(true);
  const [payrollError, setPayrollError] = useState('');

  // State for attendance chart
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState('');

  // State for recent activity
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState('');

  // State for announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcementsError, setAnnouncementsError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setStatsLoading(true);
    fetch('/api/employees/stats')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          total: data.total,
        }));
        setStatsLoading(false);
      })
      .catch(() => {
        setStatsError('Failed to load stats');
        setStatsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIncidentsLoading(true);
    fetch('/api/disciplinary-cases/stats')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, incidents: data.open }));
        setIncidentsLoading(false);
      })
      .catch(() => {
        setIncidentsError('Failed to load incidents');
        setIncidentsLoading(false);
      });
  }, []);

  useEffect(() => {
    setOnDutyLoading(true);
    fetch('/api/attendance/stats')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, onDuty: data.present }));
        setOnDutyLoading(false);
      })
      .catch(() => {
        setOnDutyError('Failed to load on duty');
        setOnDutyLoading(false);
      });
  }, []);

  useEffect(() => {
    setPayrollLoading(true);
    fetch('/api/payroll/stats')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, payroll: data.totalAmount }));
        setPayrollLoading(false);
      })
      .catch(() => {
        setPayrollError('Failed to load payroll');
        setPayrollLoading(false);
      });
  }, []);

  useEffect(() => {
    setAttendanceLoading(true);
    fetch('/api/attendance/trend')
      .then(res => res.json())
      .then(data => {
        // Map backend data to chart format
        const chartData = data.map((d: any) => ({
          name: d.date, // Use full date string
          Present: d.present,
          Absent: d.absent,
          Late: d.leave,
        }));
        setAttendanceData(chartData);
        setAttendanceLoading(false);
      })
      .catch(() => {
        setAttendanceError('Failed to load attendance data');
        setAttendanceLoading(false);
      });
  }, []);

  useEffect(() => {
    setActivityLoading(true);
    fetch('/api/activity/recent')
      .then(res => res.json())
      .then(data => {
        setRecentActivity(data.map((item: any) => ({
          icon: <Users className="w-4 h-4 text-blue-600" />,
          text: item.description,
          time: new Date(item.timestamp).toLocaleDateString(),
        })));
        setActivityLoading(false);
      })
      .catch(() => {
        setActivityError('Failed to load recent activity');
        setActivityLoading(false);
      });
  }, []);

  useEffect(() => {
    setAnnouncementsLoading(true);
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data.slice(0, 3)); // Get first 3 announcements
        setAnnouncementsLoading(false);
      })
      .catch(() => {
        setAnnouncementsError('Failed to load announcements');
        setAnnouncementsLoading(false);
      });
  }, []);

  const statsCards = [
    { title: 'Employees', value: statsLoading ? '...' : stats.total, icon: <Users className="w-6 h-6 text-blue-600" />, color: 'bg-blue-50' },
    { title: 'On Duty', value: onDutyLoading ? '...' : stats.onDuty, icon: <Clock className="w-6 h-6 text-green-600" />, color: 'bg-green-50' },
    { title: 'Payroll (This Month)', value: payrollLoading ? '...' : (typeof stats.payroll === 'number' ? formatRWF(stats.payroll) : stats.payroll), icon: <DollarSign className="w-6 h-6 text-yellow-600" />, color: 'bg-yellow-50' },
    { title: 'Incidents', value: incidentsLoading ? '...' : stats.incidents, icon: <AlertTriangle className="w-6 h-6 text-red-600" />, color: 'bg-red-50' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Company Logo" className="w-12 h-12 rounded-lg bg-white object-contain border-2 border-blue-600 shadow" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Welcome, HR Manager!</h1>
            <p className="text-gray-500 text-sm">HR Dashboard</p>
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
      {statsError && <div className="text-center text-red-500 mt-2">{statsError}</div>}
      {incidentsError && <div className="text-center text-red-500 mt-2">{incidentsError}</div>}
      {onDutyError && <div className="text-center text-red-500 mt-2">{onDutyError}</div>}
      {payrollError && <div className="text-center text-red-500 mt-2">{payrollError}</div>}

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            {attendanceLoading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : attendanceError ? (
              <div className="text-center text-red-500">{attendanceError}</div>
            ) : (
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
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            {activityLoading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : activityError ? (
              <div className="text-center text-red-500">{activityError}</div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((item: any, i: number) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.text}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
              <button
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                onClick={() => navigate('/add-employee')}
              >
                <Plus className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Add Employee</span>
              </button>
              <button
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                onClick={() => navigate('/hr/shifts')}
              >
                <Calendar className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Assign Work Schedules</span>
              </button>
              <button
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                onClick={() => navigate('/reports')}
              >
                <DollarSign className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Generate HR Report</span>
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
            {announcementsLoading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : announcementsError ? (
              <div className="text-center text-red-500">{announcementsError}</div>
            ) : (
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
            )}
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

export default HRDashboard; 