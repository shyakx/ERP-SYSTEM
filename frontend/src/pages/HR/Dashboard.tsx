import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  UserPlus,
  FileText,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  newHires: number;
  departments: number;
  totalPayroll: number;
  pendingPayroll: number;
  attendanceRate: number;
  averageHours: number;
}

interface RecentActivity {
  id: string;
  type: 'hire' | 'termination' | 'promotion' | 'attendance' | 'payroll';
  employeeName: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

const HRDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    newHires: 0,
    departments: 0,
    totalPayroll: 0,
    pendingPayroll: 0,
    attendanceRate: 0,
    averageHours: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch employee stats
      const employeesResponse = await fetch('http://localhost:5000/api/employees/stats');
      const employeeStats = await employeesResponse.json();
      
      // Fetch payroll stats
      const payrollResponse = await fetch('http://localhost:5000/api/payroll/stats');
      const payrollStats = await payrollResponse.json();
      
      // Fetch attendance stats
      const attendanceResponse = await fetch('http://localhost:5000/api/attendance/stats');
      const attendanceStats = await attendanceResponse.json();
      
      setStats({
        totalEmployees: employeeStats.total,
        activeEmployees: employeeStats.total, // Assuming all are active for now
        newHires: 0, // Would need hire date tracking
        departments: employeeStats.byDepartment?.length || 0,
        totalPayroll: payrollStats.totalAmount,
        pendingPayroll: payrollStats.pending,
        attendanceRate: attendanceStats.present > 0 ? 
          ((attendanceStats.present / (attendanceStats.present + attendanceStats.absent)) * 100) : 0,
        averageHours: attendanceStats.totalHours / Math.max(attendanceStats.present, 1)
      });
      
      // Mock recent activities for now
      setRecentActivities([
        {
          id: '1',
          type: 'hire',
          employeeName: 'Sarah Johnson',
          description: 'New employee hired',
          timestamp: new Date().toISOString(),
          status: 'success'
        },
        {
          id: '2',
          type: 'payroll',
          employeeName: 'John Smith',
          description: 'Payroll processed',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          status: 'success'
        },
        {
          id: '3',
          type: 'attendance',
          employeeName: 'Michael Brown',
          description: 'Late arrival recorded',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          status: 'warning'
        }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hire': return <UserPlus className="h-4 w-4" />;
      case 'payroll': return <DollarSign className="h-4 w-4" />;
      case 'attendance': return <Clock className="h-4 w-4" />;
      case 'promotion': return <TrendingUp className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your organization's human resources</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                <dd className="text-lg font-medium text-gray-900">{stats.totalEmployees}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+2.5% from last month</span>
            </div>
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Employees</dt>
                <dd className="text-lg font-medium text-gray-900">{stats.activeEmployees}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>100% active rate</span>
            </div>
          </div>
        </div>

        {/* Total Payroll */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Payroll</dt>
                <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.totalPayroll)}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
                <dd className="text-lg font-medium text-gray-900">{formatPercentage(stats.attendanceRate)}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+1.2% from last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departments */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.departments}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Payroll */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Payroll</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingPayroll}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Average Hours */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Hours/Day</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageHours.toFixed(1)}h</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.status)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.employeeName}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/add-employee')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add Employee
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
              <DollarSign className="h-5 w-5 mr-2" />
              Process Payroll
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
              <Clock className="h-5 w-5 mr-2" />
              View Attendance
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
              <FileText className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
    </div>
  </div>
);
};

export default HRDashboard; 