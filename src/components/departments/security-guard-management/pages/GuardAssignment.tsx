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
  Phone,
  Mail,
  Star,
  TrendingUp,
  Download
} from 'lucide-react';

const GuardAssignment: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock Rwandan guard assignment data
  const guardAssignments = [
    {
      id: 1,
      guardName: 'Jean Pierre Uwimana',
      location: 'Kigali Business Center',
      shift: 'Day Shift (06:00-18:00)',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Emmanuel Ndayisaba',
      performance: 95,
      contact: '+250 788 123 456',
      email: 'jean.uwimana@dicel.co.rw',
      experience: '3 years',
      certifications: ['Security License', 'First Aid', 'Fire Safety']
    },
    {
      id: 2,
      guardName: 'Emmanuel Ndayisaba',
      location: 'Huye Mall',
      shift: 'Night Shift (18:00-06:00)',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Regional Manager',
      performance: 92,
      contact: '+250 787 234 567',
      email: 'emmanuel.ndayisaba@dicel.co.rw',
      experience: '5 years',
      certifications: ['Security License', 'First Aid', 'Advanced Security']
    },
    {
      id: 3,
      guardName: 'Patrick Nshimiyimana',
      location: 'Musanze Office Complex',
      shift: 'Day Shift (06:00-18:00)',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Local Supervisor',
      performance: 88,
      contact: '+250 785 345 678',
      email: 'patrick.nshimiyimana@dicel.co.rw',
      experience: '2 years',
      certifications: ['Security License', 'First Aid']
    },
    {
      id: 4,
      guardName: 'Alexis Nkurunziza',
      location: 'Rubavu Shopping Center',
      shift: 'Night Shift (18:00-06:00)',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Local Supervisor',
      performance: 96,
      contact: '+250 783 456 789',
      email: 'alexis.nkurunziza@dicel.co.rw',
      experience: '4 years',
      certifications: ['Security License', 'First Aid', 'Fire Safety', 'Advanced Security']
    },
    {
      id: 5,
      guardName: 'Chantal Mukamana',
      location: 'Kigali Mall',
      shift: 'Day Shift (06:00-18:00)',
      status: 'Pending',
      startDate: '2024-08-15',
      endDate: '2024-08-31',
      supervisor: 'Emmanuel Ndayisaba',
      performance: 90,
      contact: '+250 784 567 890',
      email: 'chantal.mukamana@dicel.co.rw',
      experience: '1 year',
      certifications: ['Security License', 'First Aid']
    }
  ];

  const assignmentStats = [
    { title: 'Active Assignments', value: '89', change: '+5', icon: Users, color: 'text-green-600' },
    { title: 'Available Guards', value: '12', change: '+2', icon: Shield, color: 'text-blue-600' },
    { title: 'Pending Assignments', value: '3', change: '-1', icon: Clock, color: 'text-orange-600' },
    { title: 'Coverage Rate', value: '94%', change: '+2%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const locations = [
    { name: 'Kigali Business Center', guards: 8, status: 'Fully Staffed' },
    { name: 'Huye Mall', guards: 6, status: 'Fully Staffed' },
    { name: 'Musanze Office Complex', guards: 4, status: 'Fully Staffed' },
    { name: 'Rubavu Shopping Center', guards: 3, status: 'Fully Staffed' },
    { name: 'Kigali Mall', guards: 5, status: 'Understaffed' },
    { name: 'Gisenyi Hotel', guards: 2, status: 'Understaffed' }
  ];

  const availableGuards = [
    {
      id: 1,
      name: 'Grace Uwamahoro',
      experience: '2 years',
      certifications: ['Security License', 'First Aid'],
      availability: 'Day Shift',
      rating: 4.5
    },
    {
      id: 2,
      name: 'David Ndayisaba',
      experience: '3 years',
      certifications: ['Security License', 'First Aid', 'Fire Safety'],
      availability: 'Night Shift',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Sarah Mukamana',
      experience: '1 year',
      certifications: ['Security License'],
      availability: 'Both Shifts',
      rating: 4.2
    }
  ];

  const filteredAssignments = guardAssignments.filter(assignment => {
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || assignment.location === filterLocation;
    return matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Guard Assignment</h1>
          <p className="text-gray-600 mt-2">Manage guard assignments and coverage across all locations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>New Assignment</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assignmentStats.map((stat, index) => (
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
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
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
            <span className="text-sm text-gray-600">Showing {filteredAssignments.length} of {guardAssignments.length} assignments</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guard Assignments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Guard Assignments</h2>
            <p className="text-sm text-gray-600 mt-1">Current guard assignments and their status</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <div key={assignment.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{assignment.guardName}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {assignment.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {assignment.shift}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {assignment.startDate} - {assignment.endDate}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Supervisor</p>
                          <p className="font-medium">{assignment.supervisor}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Performance</p>
                          <p className={`font-medium ${getPerformanceColor(assignment.performance)}`}>{assignment.performance}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Experience</p>
                          <p className="font-medium">{assignment.experience}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Contact</p>
                          <p className="font-medium">{assignment.contact}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Certifications:</p>
                        <div className="flex flex-wrap gap-1">
                          {assignment.certifications.map((cert, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {cert}
                            </span>
                          ))}
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
          {/* Available Guards */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Available Guards</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {availableGuards.map((guard) => (
                  <div key={guard.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{guard.name}</h3>
                    <p className="text-sm text-gray-600">{guard.experience} experience</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{guard.availability}</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500 ml-1">{guard.rating}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {guard.certifications.map((cert, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Coverage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Location Coverage</h2>
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
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(location.guards / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
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
            <span className="text-sm font-medium text-gray-900">New Assignment</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Assign Guard</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Shield className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Coverage Report</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <Calendar className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Schedule Shift</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuardAssignment;
