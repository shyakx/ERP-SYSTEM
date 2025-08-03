import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  AlertCircle,
  Shield,
  Building,
  Star,
  TrendingUp,
  Download,
  Award,
  Target,
  Phone,
  Mail
} from 'lucide-react';

const GuardOverview: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock Rwandan guard overview data
  const guards = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      location: 'Kigali Business Center',
      shift: 'Day Shift (06:00-18:00)',
      status: 'Active',
      performance: 95,
      experience: '3 years',
      contact: '+250 788 123 456',
      email: 'jean.uwimana@dicel.co.rw',
      hireDate: '2021-03-15',
      certifications: ['Security License', 'First Aid', 'Fire Safety'],
      supervisor: 'Emmanuel Ndayisaba',
      lastCheckIn: '2 hours ago',
      incidents: 2,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Emmanuel Ndayisaba',
      location: 'Huye Mall',
      shift: 'Night Shift (18:00-06:00)',
      status: 'Active',
      performance: 92,
      experience: '5 years',
      contact: '+250 787 234 567',
      email: 'emmanuel.ndayisaba@dicel.co.rw',
      hireDate: '2019-08-20',
      certifications: ['Security License', 'First Aid', 'Advanced Security', 'Supervisor Training'],
      supervisor: 'Regional Manager',
      lastCheckIn: '1 hour ago',
      incidents: 1,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Patrick Nshimiyimana',
      location: 'Musanze Office Complex',
      shift: 'Day Shift (06:00-18:00)',
      status: 'On Break',
      performance: 88,
      experience: '2 years',
      contact: '+250 785 345 678',
      email: 'patrick.nshimiyimana@dicel.co.rw',
      hireDate: '2022-06-12',
      certifications: ['Security License', 'First Aid'],
      supervisor: 'Local Supervisor',
      lastCheckIn: '30 minutes ago',
      incidents: 3,
      rating: 4.5
    },
    {
      id: 4,
      name: 'Alexis Nkurunziza',
      location: 'Rubavu Shopping Center',
      shift: 'Night Shift (18:00-06:00)',
      status: 'Active',
      performance: 96,
      experience: '4 years',
      contact: '+250 783 456 789',
      email: 'alexis.nkurunziza@dicel.co.rw',
      hireDate: '2020-11-10',
      certifications: ['Security License', 'First Aid', 'Fire Safety', 'Advanced Security'],
      supervisor: 'Local Supervisor',
      lastCheckIn: '45 minutes ago',
      incidents: 0,
      rating: 4.9
    },
    {
      id: 5,
      name: 'Chantal Mukamana',
      location: 'Kigali Mall',
      shift: 'Day Shift (06:00-18:00)',
      status: 'Active',
      performance: 90,
      experience: '1 year',
      contact: '+250 784 567 890',
      email: 'chantal.mukamana@dicel.co.rw',
      hireDate: '2023-05-30',
      certifications: ['Security License', 'First Aid'],
      supervisor: 'Emmanuel Ndayisaba',
      lastCheckIn: '1 hour ago',
      incidents: 1,
      rating: 4.6
    }
  ];

  const guardStats = [
    { title: 'Total Guards', value: '89', change: '+5', icon: Users, color: 'text-blue-600' },
    { title: 'Active Guards', value: '85', change: '+3', icon: Shield, color: 'text-green-600' },
    { title: 'On Duty', value: '45', change: '+2', icon: Clock, color: 'text-purple-600' },
    { title: 'Avg Performance', value: '92%', change: '+2%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const locations = [
    { name: 'Kigali Business Center', guards: 8, status: 'Fully Staffed' },
    { name: 'Huye Mall', guards: 6, status: 'Fully Staffed' },
    { name: 'Musanze Office Complex', guards: 4, status: 'Fully Staffed' },
    { name: 'Rubavu Shopping Center', guards: 3, status: 'Fully Staffed' },
    { name: 'Kigali Mall', guards: 5, status: 'Understaffed' },
    { name: 'Gisenyi Hotel', guards: 2, status: 'Understaffed' }
  ];

  const topPerformers = [
    {
      name: 'Emmanuel Ndayisaba',
      performance: 96,
      location: 'Huye Mall',
      rating: 4.9
    },
    {
      name: 'Alexis Nkurunziza',
      performance: 95,
      location: 'Rubavu Shopping Center',
      rating: 4.9
    },
    {
      name: 'Jean Pierre Uwimana',
      performance: 94,
      location: 'Kigali Business Center',
      rating: 4.8
    }
  ];

  const recentIncidents = [
    {
      guard: 'Patrick Nshimiyimana',
      type: 'Suspicious Activity',
      location: 'Musanze Office Complex',
      time: '2 hours ago',
      status: 'Resolved'
    },
    {
      guard: 'Jean Pierre Uwimana',
      type: 'Unauthorized Access',
      location: 'Kigali Business Center',
      time: '4 hours ago',
      status: 'Under Investigation'
    },
    {
      guard: 'Chantal Mukamana',
      type: 'Medical Emergency',
      location: 'Kigali Mall',
      time: '6 hours ago',
      status: 'Resolved'
    }
  ];

  const filteredGuards = guards.filter(guard => {
    const matchesStatus = filterStatus === 'all' || guard.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || guard.location === filterLocation;
    return matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Break': return 'bg-yellow-100 text-yellow-800';
      case 'Off Duty': return 'bg-gray-100 text-gray-800';
      case 'On Leave': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guard Overview</h1>
          <p className="text-gray-600 mt-2">Comprehensive overview of all security guards and their performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add Guard</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guardStats.map((stat, index) => (
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
              <option value="On Break">On Break</option>
              <option value="Off Duty">Off Duty</option>
              <option value="On Leave">On Leave</option>
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
            <span className="text-sm text-gray-600">Showing {filteredGuards.length} of {guards.length} guards</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guard List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Guard Directory</h2>
            <p className="text-sm text-gray-600 mt-1">Complete list of security guards and their details</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredGuards.map((guard) => (
                <div key={guard.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{guard.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(guard.status)}`}>
                          {guard.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {guard.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {guard.shift}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {guard.contact}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Performance</p>
                          <p className={`font-medium ${getPerformanceColor(guard.performance)}`}>{guard.performance}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Experience</p>
                          <p className="font-medium">{guard.experience}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Rating</p>
                          <p className={`font-medium ${getRatingColor(guard.rating)}`}>{guard.rating}/5.0</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Incidents</p>
                          <p className="font-medium">{guard.incidents}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span>Supervisor: {guard.supervisor}</span>
                        <span>Hired: {guard.hireDate}</span>
                        <span>Last Check-in: {guard.lastCheckIn}</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Certifications:</p>
                        <div className="flex flex-wrap gap-1">
                          {guard.certifications.map((cert, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${guard.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">Performance</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(guard.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">Rating</span>
                        </div>
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
          {/* Top Performers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topPerformers.map((guard, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{guard.name}</h3>
                      <span className="text-sm font-medium text-green-600">{guard.performance}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{guard.location}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(guard.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{guard.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Location Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {locations.map((location) => (
                  <div key={location.name} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{location.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        location.status === 'Fully Staffed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {location.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{location.guards} guards assigned</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(location.guards / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Incidents</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentIncidents.map((incident, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{incident.guard}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{incident.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{incident.location} • {incident.time}</p>
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
            <span className="text-sm font-medium text-gray-900">Add Guard</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Assign Guard</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Award className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Performance Review</span>
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

export default GuardOverview;
