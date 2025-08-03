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

const HROverview: React.FC = () => {
  // Mock Rwandan employee data
  const employees = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'jean.uwimana@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-01-15',
      salary: 'RWF 450,000',
      performance: 'Excellent'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      department: 'Human Resources',
      location: 'Kigali, Rwanda',
      phone: '+250 789 234 567',
      email: 'marie.niyonsaba@dicel.co.rw',
      status: 'Active',
      hireDate: '2022-08-20',
      salary: 'RWF 850,000',
      performance: 'Outstanding'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      department: 'Field Operations',
      location: 'Huye, Rwanda',
      phone: '+250 787 345 678',
      email: 'emmanuel.ndayisaba@dicel.co.rw',
      status: 'Active',
      hireDate: '2022-11-10',
      salary: 'RWF 600,000',
      performance: 'Good'
    },
    {
      id: 4,
      name: 'Ange Uwineza',
      position: 'Finance Officer',
      department: 'Finance',
      location: 'Kigali, Rwanda',
      phone: '+250 786 456 789',
      email: 'ange.uwineza@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-03-05',
      salary: 'RWF 700,000',
      performance: 'Excellent'
    },
    {
      id: 5,
      name: 'Patrick Nshimiyimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Musanze, Rwanda',
      phone: '+250 785 567 890',
      email: 'patrick.nshimiyimana@dicel.co.rw',
      status: 'On Leave',
      hireDate: '2023-06-12',
      salary: 'RWF 450,000',
      performance: 'Good'
    }
  ];

  const stats = [
    { title: 'Total Employees', value: '127', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Guards', value: '89', change: '+8%', icon: Shield, color: 'text-green-600' },
    { title: 'New Hires', value: '15', change: '+25%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Training Sessions', value: '8', change: '+3', icon: Award, color: 'text-orange-600' }
  ];

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
        {stats.map((stat, index) => (
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
              {employees.slice(0, 4).map((employee) => (
                <div key={employee.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {employee.location}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Phone className="w-3 h-3 mr-1" />
                        {employee.phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{employee.salary}</p>
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