import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';
import { hrAPI } from '../../../services/api';

// HR Department Pages
import EmployeeManagement from './pages/EmployeeManagement';
import Recruitment from './pages/Recruitment';
import Training from './pages/Training';
import SecurityPayroll from './pages/SecurityPayroll';
import StaffPayroll from './pages/StaffPayroll';
import Performance from './pages/Performance';
import LeaveAttendance from './pages/LeaveAttendance';
import BenefitsCompliance from './pages/BenefitsCompliance'; // HR Benefits and Compliance
import Reports from './pages/Reports';
import Settings from './pages/Settings';

interface Employee {
  id: string;
  employeeId: string;
  position: string;
  department: string;
  location: string;
  status: string;
  firstName: string;
  lastName: string;
}

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  newHires: number;
  trainingSessions: number;
  leaveRequests: number;
  attendanceRate: number;
  performanceReviews: number;
  payrollProcessed: number;
}

const HRDashboard: React.FC = () => {
  const colorScheme = getColorScheme('hr');
  const location = useLocation();
  const [statsData, setStatsData] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    newHires: 0,
    trainingSessions: 0,
    leaveRequests: 0,
    attendanceRate: 0,
    performanceReviews: 0,
    payrollProcessed: 0
  });
  const [recentEmployees, setRecentEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch HR dashboard stats from the new API
      const statsResponse = await hrAPI.getStats();
      
      if (statsResponse.data.success) {
        const stats = statsResponse.data.data;
        
        setStatsData({
          totalEmployees: stats.totalEmployees || 0,
          activeEmployees: stats.activeEmployees || 0,
          newHires: stats.recentHires?.length || 0,
          trainingSessions: stats.activeTrainingPrograms || 0,
          leaveRequests: stats.pendingLeaveRequests || 0,
          attendanceRate: 95, // This would need to be calculated from attendance data
          performanceReviews: 0, // This would need to be added to the stats endpoint
          payrollProcessed: 0 // This would need to be added to the stats endpoint
        });

        // Set recent employees from the stats
        if (stats.recentHires) {
          setRecentEmployees(stats.recentHires.map((emp: Employee) => ({
            id: emp.id || Math.random().toString(),
            employeeId: emp.employee_number || 'N/A',
            position: emp.position || 'N/A',
            department: emp.department?.name || 'N/A',
            location: 'Kigali', // Default location
            status: 'active',
            firstName: emp.first_name || '',
            lastName: emp.last_name || ''
          })));
        }
      }

    } catch (error) {
      console.error('Error fetching HR dashboard data:', error);
      // Fallback to demo data if API fails
      setStatsData({
        totalEmployees: 127,
        activeEmployees: 120,
        newHires: 5,
        trainingSessions: 8,
        leaveRequests: 12,
        attendanceRate: 95,
        performanceReviews: 15,
        payrollProcessed: 120
      });
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: 'Total Employees',
      value: statsData.totalEmployees,
      subtitle: `${statsData.activeEmployees} active`,
      color: '#3b82f6',
      icon: '👥',
      trend: { value: `+${statsData.newHires}`, isPositive: true },
      delay: 0
    },
    {
      title: 'Active Employees',
      value: statsData.activeEmployees,
      subtitle: `${Math.round((statsData.activeEmployees / statsData.totalEmployees) * 100)}% of total`,
      color: '#10b981',
      icon: '🛡️',
      trend: { value: '+8%', isPositive: true },
      delay: 100
    },
    {
      title: 'Training Sessions',
      value: statsData.trainingSessions,
      subtitle: 'This month',
      color: '#8b5cf6',
      icon: '📚',
      trend: { value: '+25%', isPositive: true },
      delay: 200
    },
    {
      title: 'Leave Requests',
      value: statsData.leaveRequests,
      subtitle: 'Pending approval',
      color: '#f59e0b',
      icon: '📅',
      trend: { value: '+5%', isPositive: false },
      delay: 300
    }
  ];

  const quickActions = [
    {
      title: 'Add New Employee',
      description: 'Register a new team member',
      icon: '➕',
      color: 'blue'
    },
    {
      title: 'Schedule Training',
      description: 'Organize training sessions',
      icon: '📅',
      color: 'green'
    },
    {
      title: 'Generate Reports',
      description: 'Create HR analytics',
      icon: '📊',
      color: 'purple'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/hr', icon: '🏠' },
    { name: 'Employee Management', path: '/hr/employees', icon: '👥' },
    { name: 'Recruitment', path: '/hr/recruitment', icon: '🎯' },
    { name: 'Training & Development', path: '/hr/training', icon: '📚' },
    { name: 'Security Payroll', path: '/hr/security-payroll', icon: '🛡️' },
    { name: 'Staff Payroll', path: '/hr/staff-payroll', icon: '👔' },
    { name: 'Performance & Reviews', path: '/hr/performance', icon: '📊' },
    { name: 'Leave & Attendance', path: '/hr/leave', icon: '📅' },
    { name: 'Benefits & Compliance', path: '/hr/benefits', icon: '🎁' },
    { name: 'Reports', path: '/hr/reports', icon: '📈' },
    { name: 'Settings', path: '/hr/settings', icon: '⚙️' }
  ];

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Animated Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
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
              <div className="text-2xl">{stat.icon}</div>
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

      {/* Recent Employees */}
      <AnimatedCard
        title="Recent Employees"
        subtitle="Latest team members"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentEmployees.map((employee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{employee.firstName.charAt(0)}{employee.lastName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</p>
                  <p className="text-sm text-gray-500">{employee.position} • {employee.location}</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">{employee.status}</span>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/hr':
        return <DashboardContent />;
      case '/hr/employees':
        return <EmployeeManagement />;
      case '/hr/recruitment':
        return <Recruitment />;
      case '/hr/training':
        return <Training />;
      case '/hr/security-payroll':
        return <SecurityPayroll />;
      case '/hr/staff-payroll':
        return <StaffPayroll />;
      case '/hr/performance':
        return <Performance />;
      case '/hr/leave':
        return <LeaveAttendance />;
      case '/hr/benefits':
        return <BenefitsCompliance />;
      case '/hr/reports':
        return <Reports />;
      case '/hr/settings':
        return <Settings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="HR Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {loading ? (
        <div className="text-center py-10">
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        renderContent()
      )}
    </DepartmentLayout>
  );
};

export default HRDashboard; 