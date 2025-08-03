import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Calendar, 
  Users, 
  Award,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Shield
} from 'lucide-react';

const Performance: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock Rwandan performance data
  const performanceReviews = [
    {
      id: 1,
      employeeName: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Kigali, Rwanda',
      reviewDate: '2024-07-15',
      nextReview: '2024-10-15',
      rating: 4.8,
      status: 'Completed',
      supervisor: 'Emmanuel Ndayisaba',
      strengths: ['Excellent attendance', 'Strong customer service', 'Reliable performance'],
      areas: ['Advanced training needed', 'Leadership development'],
      salary: 'RWF 450,000',
      bonus: 'RWF 25,000'
    },
    {
      id: 2,
      employeeName: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      department: 'Human Resources',
      location: 'Kigali, Rwanda',
      reviewDate: '2024-07-10',
      nextReview: '2024-10-10',
      rating: 5.0,
      status: 'Completed',
      supervisor: 'Director',
      strengths: ['Outstanding leadership', 'Excellent communication', 'Strategic thinking'],
      areas: ['Process optimization', 'Team expansion'],
      salary: 'RWF 850,000',
      bonus: 'RWF 75,000'
    },
    {
      id: 3,
      employeeName: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      department: 'Field Operations',
      location: 'Huye, Rwanda',
      reviewDate: '2024-07-20',
      nextReview: '2024-10-20',
      rating: 4.5,
      status: 'In Progress',
      supervisor: 'Regional Manager',
      strengths: ['Good team management', 'Reliable performance', 'Strong work ethic'],
      areas: ['Advanced security protocols', 'Conflict resolution'],
      salary: 'RWF 600,000',
      bonus: 'RWF 35,000'
    },
    {
      id: 4,
      employeeName: 'Ange Uwineza',
      position: 'Finance Officer',
      department: 'Finance',
      location: 'Kigali, Rwanda',
      reviewDate: '2024-07-05',
      nextReview: '2024-10-05',
      rating: 4.9,
      status: 'Completed',
      supervisor: 'Finance Manager',
      strengths: ['Excellent accuracy', 'Strong analytical skills', 'Team collaboration'],
      areas: ['Advanced reporting', 'Process automation'],
      salary: 'RWF 700,000',
      bonus: 'RWF 50,000'
    },
    {
      id: 5,
      employeeName: 'Patrick Nshimiyimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Musanze, Rwanda',
      reviewDate: '2024-06-25',
      nextReview: '2024-09-25',
      rating: 4.2,
      status: 'Completed',
      supervisor: 'Emmanuel Ndayisaba',
      strengths: ['Good attendance', 'Reliable performance', 'Positive attitude'],
      areas: ['Advanced training', 'Communication skills'],
      salary: 'RWF 450,000',
      bonus: 'RWF 20,000'
    }
  ];

  const performanceStats = [
    { title: 'Average Rating', value: '4.7', change: '+0.3', icon: Star, color: 'text-yellow-600' },
    { title: 'Reviews Completed', value: '89', change: '+12', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Pending Reviews', value: '15', change: '-3', icon: Clock, color: 'text-orange-600' },
    { title: 'Performance Bonus', value: 'RWF 2.1M', change: '+15%', icon: DollarSign, color: 'text-purple-600' }
  ];

  const upcomingReviews = [
    {
      employeeName: 'Chantal Mukamana',
      position: 'Compliance Officer',
      department: 'Compliance',
      dueDate: '2024-08-15',
      supervisor: 'Compliance Manager'
    },
    {
      employeeName: 'Alexis Nkurunziza',
      position: 'Security Guard',
      department: 'Field Operations',
      dueDate: '2024-08-20',
      supervisor: 'Local Supervisor'
    },
    {
      employeeName: 'Grace Uwamahoro',
      position: 'Customer Service Rep',
      department: 'Customer Experience',
      dueDate: '2024-08-25',
      supervisor: 'CX Manager'
    }
  ];

  const filteredReviews = performanceReviews.filter(review => {
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || review.department === filterDepartment;
    return matchesStatus && matchesDepartment;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600 mt-2">Track and manage employee performance across Dicel Security</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Schedule Review</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat, index) => (
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
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Compliance">Compliance</option>
              <option value="Customer Experience">Customer Experience</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredReviews.length} of {performanceReviews.length} reviews</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Reviews */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Performance Reviews</h2>
            <p className="text-sm text-gray-600 mt-1">Recent and upcoming performance evaluations</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {review.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{review.employeeName}</h3>
                          <p className="text-sm text-gray-600">{review.position} • {review.department}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {review.location}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {review.reviewDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {review.strengths.map((strength, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                          <ul className="space-y-1">
                            {review.areas.map((area, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <AlertCircle className="w-3 h-3 text-orange-500 mr-2" />
                                {area}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-lg font-bold ${getRatingColor(review.rating)}`}>
                          {review.rating}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Salary: {review.salary}</p>
                        <p>Bonus: {review.bonus}</p>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Reviews</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingReviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{review.employeeName}</h3>
                    <p className="text-sm text-gray-600">{review.position}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {review.dueDate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Supervisor: {review.supervisor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="text-lg font-bold text-green-600">4.7/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-lg font-bold text-blue-600">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">On-Time Reviews</span>
                  <span className="text-lg font-bold text-green-600">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bonus Distribution</span>
                  <span className="text-lg font-bold text-purple-600">RWF 2.1M</span>
                </div>
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
            <span className="text-sm font-medium text-gray-900">Schedule Review</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Generate Report</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Award className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Award Bonus</span>
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

export default Performance;
