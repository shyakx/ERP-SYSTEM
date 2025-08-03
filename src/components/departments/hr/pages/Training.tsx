import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Building,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  DollarSign
} from 'lucide-react';

const Training: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock Rwandan training data
  const trainingCourses = [
    {
      id: 1,
      title: 'Security Guard Basic Training',
      department: 'Field Operations',
      instructor: 'Emmanuel Ndayisaba',
      location: 'Kigali Training Center',
      duration: '2 weeks',
      capacity: 20,
      enrolled: 18,
      status: 'Active',
      startDate: '2024-08-05',
      endDate: '2024-08-19',
      cost: 'RWF 150,000',
      description: 'Comprehensive training for new security guards covering safety protocols, customer service, and emergency procedures.',
      modules: ['Safety Protocols', 'Customer Service', 'Emergency Response', 'Legal Compliance']
    },
    {
      id: 2,
      title: 'Advanced Security Management',
      department: 'Field Operations',
      instructor: 'Regional Manager',
      location: 'Huye Training Center',
      duration: '1 week',
      capacity: 15,
      enrolled: 12,
      status: 'Active',
      startDate: '2024-08-12',
      endDate: '2024-08-18',
      cost: 'RWF 250,000',
      description: 'Advanced training for security supervisors and managers.',
      modules: ['Leadership Skills', 'Team Management', 'Advanced Security', 'Risk Assessment']
    },
    {
      id: 3,
      title: 'Customer Service Excellence',
      department: 'Customer Experience',
      instructor: 'Grace Uwamahoro',
      location: 'Kigali Office',
      duration: '3 days',
      capacity: 25,
      enrolled: 22,
      status: 'Active',
      startDate: '2024-08-08',
      endDate: '2024-08-10',
      cost: 'RWF 100,000',
      description: 'Training focused on delivering exceptional customer service.',
      modules: ['Communication Skills', 'Problem Solving', 'Customer Psychology', 'Service Standards']
    },
    {
      id: 4,
      title: 'Financial Management for Non-Finance Staff',
      department: 'Finance',
      instructor: 'Ange Uwineza',
      location: 'Kigali Office',
      duration: '1 week',
      capacity: 20,
      enrolled: 15,
      status: 'Completed',
      startDate: '2024-07-15',
      endDate: '2024-07-21',
      cost: 'RWF 200,000',
      description: 'Basic financial management training for department heads.',
      modules: ['Budget Management', 'Financial Reporting', 'Cost Control', 'Financial Analysis']
    }
  ];

  const enrolledEmployees = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      course: 'Security Guard Basic Training',
      progress: 85,
      status: 'In Progress',
      startDate: '2024-08-05',
      completionDate: '2024-08-19',
      grade: 'A-',
      feedback: 'Excellent performance, shows strong leadership potential'
    },
    {
      id: 2,
      name: 'Patrick Nshimiyimana',
      course: 'Security Guard Basic Training',
      progress: 60,
      status: 'In Progress',
      startDate: '2024-08-05',
      completionDate: '2024-08-19',
      grade: 'B+',
      feedback: 'Good progress, needs improvement in emergency procedures'
    },
    {
      id: 3,
      name: 'Chantal Mukamana',
      course: 'Customer Service Excellence',
      progress: 100,
      status: 'Completed',
      startDate: '2024-08-08',
      completionDate: '2024-08-10',
      grade: 'A+',
      feedback: 'Outstanding performance, excellent communication skills'
    },
    {
      id: 4,
      name: 'Alexis Nkurunziza',
      course: 'Advanced Security Management',
      progress: 30,
      status: 'In Progress',
      startDate: '2024-08-12',
      completionDate: '2024-08-18',
      grade: 'B',
      feedback: 'Making good progress, needs more practice with leadership scenarios'
    }
  ];

  const trainingStats = [
    { title: 'Active Courses', value: '6', change: '+2', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Enrolled Employees', value: '67', change: '+15', icon: Users, color: 'text-green-600' },
    { title: 'Completion Rate', value: '92%', change: '+5%', icon: CheckCircle, color: 'text-purple-600' },
    { title: 'Training Budget', value: 'RWF 1.2M', change: '+10%', icon: DollarSign, color: 'text-orange-600' }
  ];

  const upcomingSessions = [
    {
      title: 'Security Guard Basic Training',
      date: '2024-08-05',
      time: '09:00 AM',
      location: 'Kigali Training Center',
      instructor: 'Emmanuel Ndayisaba',
      enrolled: 18
    },
    {
      title: 'Customer Service Excellence',
      date: '2024-08-08',
      time: '02:00 PM',
      location: 'Kigali Office',
      instructor: 'Grace Uwamahoro',
      enrolled: 22
    },
    {
      title: 'Advanced Security Management',
      date: '2024-08-12',
      time: '10:00 AM',
      location: 'Huye Training Center',
      instructor: 'Regional Manager',
      enrolled: 12
    }
  ];

  const filteredCourses = trainingCourses.filter(course => {
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    return matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training & Development</h1>
          <p className="text-gray-600 mt-2">Manage employee training programs and development initiatives</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Customer Experience">Customer Experience</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredCourses.length} of {trainingCourses.length} courses</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Courses */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Training Courses</h2>
            <p className="text-sm text-gray-600 mt-1">Available and ongoing training programs</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {course.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {course.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span>Instructor: {course.instructor}</span>
                        <span>Cost: {course.cost}</span>
                        <span>{course.enrolled}/{course.capacity} enrolled</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Start: {course.startDate}</span>
                        <span>End: {course.endDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{session.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {session.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Instructor: {session.instructor}</p>
                    <p className="text-xs text-gray-500">{session.location}</p>
                    <p className="text-xs text-gray-500">{session.enrolled} enrolled</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employee Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Employee Progress</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {enrolledEmployees.map((employee) => (
                  <div key={employee.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.course}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-sm font-medium ${getProgressColor(employee.progress)}`}>
                        {employee.progress}% Complete
                      </span>
                      <span className="text-sm text-gray-500">Grade: {employee.grade}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${employee.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{employee.status}</p>
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
            <Plus className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Create Course</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Enroll Employee</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Award className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Issue Certificate</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <Target className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Set Goals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Training;
