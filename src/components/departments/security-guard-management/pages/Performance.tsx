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
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock Rwandan performance data
  const performanceReviews = [
    {
      id: 1,
      guardName: 'Jean Pierre Uwimana',
      location: 'Kigali Business Center',
      reviewDate: '2024-07-15',
      nextReview: '2024-10-15',
      rating: 4.8,
      status: 'Completed',
      supervisor: 'Emmanuel Ndayisaba',
      strengths: ['Excellent attendance', 'Strong customer service', 'Reliable performance'],
      areas: ['Advanced training needed', 'Leadership development'],
      performance: 95,
      incidents: 2,
      responseTime: '2.5min'
    },
    {
      id: 2,
      guardName: 'Emmanuel Ndayisaba',
      location: 'Huye Mall',
      reviewDate: '2024-07-10',
      nextReview: '2024-10-10',
      rating: 5.0,
      status: 'Completed',
      supervisor: 'Regional Manager',
      strengths: ['Outstanding leadership', 'Excellent communication', 'Strategic thinking'],
      areas: ['Process optimization', 'Team expansion'],
      performance: 96,
      incidents: 1,
      responseTime: '2.1min'
    },
    {
      id: 3,
      guardName: 'Patrick Nshimiyimana',
      location: 'Musanze Office Complex',
      reviewDate: '2024-07-20',
      nextReview: '2024-10-20',
      rating: 4.5,
      status: 'In Progress',
      supervisor: 'Local Supervisor',
      strengths: ['Good team management', 'Reliable performance', 'Strong work ethic'],
      areas: ['Advanced security protocols', 'Conflict resolution'],
      performance: 88,
      incidents: 3,
      responseTime: '3.2min'
    },
    {
      id: 4,
      guardName: 'Alexis Nkurunziza',
      location: 'Rubavu Shopping Center',
      reviewDate: '2024-07-05',
      nextReview: '2024-10-05',
      rating: 4.9,
      status: 'Completed',
      supervisor: 'Local Supervisor',
      strengths: ['Excellent accuracy', 'Strong analytical skills', 'Team collaboration'],
      areas: ['Advanced reporting', 'Process automation'],
      performance: 96,
      incidents: 0,
      responseTime: '1.8min'
    },
    {
      id: 5,
      guardName: 'Chantal Mukamana',
      location: 'Kigali Mall',
      reviewDate: '2024-06-25',
      nextReview: '2024-09-25',
      rating: 4.2,
      status: 'Completed',
      supervisor: 'Emmanuel Ndayisaba',
      strengths: ['Good attendance', 'Reliable performance', 'Positive attitude'],
      areas: ['Advanced training', 'Communication skills'],
      performance: 90,
      incidents: 1,
      responseTime: '2.8min'
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
      guardName: 'Grace Uwamahoro',
      location: 'Kigali Business Center',
      dueDate: '2024-08-15',
      supervisor: 'Emmanuel Ndayisaba'
    },
    {
      guardName: 'David Ndayisaba',
      location: 'Huye Mall',
      dueDate: '2024-08-20',
      supervisor: 'Regional Manager'
    },
    {
      guardName: 'Sarah Mukamana',
      location: 'Musanze Office Complex',
      dueDate: '2024-08-25',
      supervisor: 'Local Supervisor'
    }
  ];

  const performanceMetrics = [
    {
      metric: 'Response Time',
      average: '2.8min',
      target: '3.0min',
      status: 'Above Target',
      color: 'text-green-600'
    },
    {
      metric: 'Incident Resolution',
      average: '94%',
      target: '90%',
      status: 'Above Target',
      color: 'text-green-600'
    },
    {
      metric: 'Customer Satisfaction',
      average: '4.6/5.0',
      target: '4.5/5.0',
      status: 'Above Target',
      color: 'text-green-600'
    },
    {
      metric: 'Attendance Rate',
      average: '96%',
      target: '95%',
      status: 'Above Target',
      color: 'text-green-600'
    }
  ];

  const filteredReviews = performanceReviews.filter(review => {
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || review.location === filterLocation;
    return matchesStatus && matchesLocation;
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

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guard Performance</h1>
          <p className="text-gray-600 mt-2">Track and manage security guard performance across all locations</p>
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
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="Kigali Business Center">Kigali Business Center</option>
              <option value="Huye Mall">Huye Mall</option>
              <option value="Musanze Office Complex">Musanze Office Complex</option>
              <option value="Rubavu Shopping Center">Rubavu Shopping Center</option>
              <option value="Kigali Mall">Kigali Mall</option>
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
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{review.guardName}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {review.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {review.reviewDate}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {review.supervisor}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Performance</p>
                          <p className={`text-sm font-medium ${getPerformanceColor(review.performance)}`}>{review.performance}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Rating</p>
                          <p className={`text-sm font-medium ${getRatingColor(review.rating)}`}>{review.rating}/5.0</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Incidents</p>
                          <p className="text-sm font-medium">{review.incidents}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Response Time</p>
                          <p className="text-sm font-medium">{review.responseTime}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <p className="text-xs text-gray-500">Next Review: {review.nextReview}</p>
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
                    <h3 className="font-medium text-gray-900">{review.guardName}</h3>
                    <p className="text-sm text-gray-600">{review.location}</p>
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
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{metric.metric}</h3>
                      <span className={`text-sm font-medium ${metric.color}`}>{metric.status}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-gray-900">{metric.average}</span>
                      <span className="text-sm text-gray-500">Target: {metric.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Performance Trends</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Response Time</h3>
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Improved by 12% this month</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Customer Satisfaction</h3>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Increased by 8% this month</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Incident Resolution</h3>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Improved by 5% this month</p>
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
