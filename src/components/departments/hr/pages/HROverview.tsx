import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  DollarSign,
  Building,
  Shield,
  UserPlus
} from 'lucide-react';
import { useApiList } from '../../../../hooks/useApi';
import { employeeAPI } from '../../../../services/api';

interface Employee {
  id: string;
  employeeId: string;
  position: string;
  department: string;
  location: string;
  phone: string;
  email: string;
  status: string;
  hireDate: string;
  salary: string;
  performance: string;
  userAccount?: {
    firstName: string;
    lastName: string;
  };
}

const HROverview: React.FC = () => {
  // Fetch employees with API
  const { 
    items: employees, 
    loading, 
    error, 
    total
  } = useApiList(employeeAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    department: "all"
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading HR data</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  const hrStats = [
    { title: 'Total Employees', value: total?.toString() || '0', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Employees', value: employees?.filter((emp: Employee) => emp.status === 'Active').length?.toString() || '0', change: '+8%', icon: CheckCircle, color: 'text-green-600' },
    { title: 'New Hires', value: '15', change: '+5', icon: UserPlus, color: 'text-purple-600' },
    { title: 'Departments', value: '8', change: '+1', icon: Building, color: 'text-orange-600' }
  ];

  const recentEmployees = employees?.slice(0, 5).map((employee: Employee) => ({
    name: `${employee.userAccount?.firstName || ''} ${employee.userAccount?.lastName || ''}`,
    position: employee.position,
    location: employee.location,
    status: employee.status,
    avatar: `${employee.userAccount?.firstName?.charAt(0) || ''}${employee.userAccount?.lastName?.charAt(0) || ''}`
  })) || [];

  const recentActivities = [
    {
      id: 1,
      type: 'hire',
      message: 'New security guard hired: Jean Pierre Uwimana',
      time: '2 hours ago',
      icon: UserPlus
    },
    {
      id: 2,
      type: 'training',
      message: 'Completed safety training for 15 guards',
      time: '1 day ago',
      icon: Award
    },
    {
      id: 3,
      type: 'performance',
      message: 'Performance review completed for Marie Claire Niyonsaba',
      time: '2 days ago',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'leave',
      message: 'Patrick Nshimiyimana requested leave',
      time: '3 days ago',
      icon: Calendar
    }
  ];

  const upcomingEvents = [
    {
      title: 'Monthly HR Meeting',
      date: '2024-08-05',
      time: '09:00 AM',
      location: 'Kigali Office'
    },
    {
      title: 'Security Training Session',
      date: '2024-08-08',
      time: '02:00 PM',
      location: 'Training Center'
    },
    {
      title: 'Performance Reviews',
      date: '2024-08-12',
      time: '10:00 AM',
      location: 'All Locations'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your workforce and human resources</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString('en-RW')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Employees</h2>
            <p className="text-sm text-gray-600 mt-1">Latest additions to the team</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentEmployees.map((employee: Employee, index: number) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {employee.userAccount?.firstName?.charAt(0)}{employee.userAccount?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {employee.userAccount?.firstName} {employee.userAccount?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                View All Employees
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <UserPlus className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Employee</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Award className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Schedule Training</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Performance Review</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Payroll</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HROverview; 