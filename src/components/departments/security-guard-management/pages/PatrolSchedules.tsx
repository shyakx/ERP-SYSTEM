import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
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
  Route,
  Navigation,
  Timer
} from 'lucide-react';

const PatrolSchedules: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock Rwandan patrol schedule data
  const patrolSchedules = [
    {
      id: 1,
      name: 'Kigali Central Route',
      location: 'Kigali Business Center',
      guards: ['Jean Pierre Uwimana', 'Patrick Nshimiyimana', 'Chantal Mukamana'],
      shift: 'Day Shift (06:00-18:00)',
      status: 'Active',
      frequency: 'Every 2 hours',
      duration: '8 hours',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Emmanuel Ndayisaba',
      checkpoints: 12,
      coverage: 95,
      description: 'Comprehensive patrol route covering main business district and surrounding areas.'
    },
    {
      id: 2,
      name: 'Huye Business District',
      location: 'Huye Mall',
      guards: ['Emmanuel Ndayisaba', 'Alexis Nkurunziza'],
      shift: 'Night Shift (18:00-06:00)',
      status: 'Active',
      frequency: 'Every 3 hours',
      duration: '12 hours',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Regional Manager',
      checkpoints: 8,
      coverage: 92,
      description: 'Night patrol route covering shopping district and residential areas.'
    },
    {
      id: 3,
      name: 'Musanze Industrial Zone',
      location: 'Musanze Office Complex',
      guards: ['Patrick Nshimiyimana'],
      shift: 'Day Shift (06:00-18:00)',
      status: 'Active',
      frequency: 'Every 4 hours',
      duration: '8 hours',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      supervisor: 'Local Supervisor',
      checkpoints: 6,
      coverage: 88,
      description: 'Industrial area patrol with focus on equipment and facility security.'
    },
    {
      id: 4,
      name: 'Rubavu Shopping Center',
      location: 'Rubavu Shopping Center',
      guards: ['Alexis Nkurunziza'],
      shift: 'Night Shift (18:00-06:00)',
      status: 'Scheduled',
      frequency: 'Every 2 hours',
      duration: '12 hours',
      startDate: '2024-08-15',
      endDate: '2024-08-31',
      supervisor: 'Local Supervisor',
      checkpoints: 10,
      coverage: 85,
      description: 'Shopping center patrol with emphasis on customer safety and property protection.'
    }
  ];

  const patrolStats = [
    { title: 'Active Routes', value: '8', change: '+2', icon: Route, color: 'text-blue-600' },
    { title: 'On Patrol', value: '45', change: '+5', icon: Users, color: 'text-green-600' },
    { title: 'Coverage Rate', value: '94%', change: '+3%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Avg Response Time', value: '3.2min', change: '-0.5min', icon: Timer, color: 'text-orange-600' }
  ];

  const checkpoints = [
    {
      name: 'Main Entrance',
      location: 'Kigali Business Center',
      status: 'Active',
      lastCheck: '2 hours ago',
      guard: 'Jean Pierre Uwimana'
    },
    {
      name: 'Parking Lot A',
      location: 'Kigali Business Center',
      status: 'Active',
      lastCheck: '1 hour ago',
      guard: 'Patrick Nshimiyimana'
    },
    {
      name: 'Loading Dock',
      location: 'Huye Mall',
      status: 'Active',
      lastCheck: '30 minutes ago',
      guard: 'Emmanuel Ndayisaba'
    },
    {
      name: 'Employee Entrance',
      location: 'Musanze Office Complex',
      status: 'Active',
      lastCheck: '45 minutes ago',
      guard: 'Patrick Nshimiyimana'
    }
  ];

  const upcomingPatrols = [
    {
      route: 'Kigali Central Route',
      time: '14:00',
      guard: 'Jean Pierre Uwimana',
      status: 'Scheduled'
    },
    {
      route: 'Huye Business District',
      time: '15:00',
      guard: 'Emmanuel Ndayisaba',
      status: 'Scheduled'
    },
    {
      route: 'Musanze Industrial Zone',
      time: '16:00',
      guard: 'Patrick Nshimiyimana',
      status: 'Scheduled'
    }
  ];

  const filteredSchedules = patrolSchedules.filter(schedule => {
    const matchesStatus = filterStatus === 'all' || schedule.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || schedule.location === filterLocation;
    return matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return 'text-green-600';
    if (coverage >= 80) return 'text-blue-600';
    if (coverage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patrol Schedules</h1>
          <p className="text-gray-600 mt-2">Manage patrol routes and schedules across all locations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Schedule</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {patrolStats.map((stat, index) => (
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
              <option value="Scheduled">Scheduled</option>
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
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredSchedules.length} of {patrolSchedules.length} schedules</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patrol Schedules */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Patrol Schedules</h2>
            <p className="text-sm text-gray-600 mt-1">Active and scheduled patrol routes</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{schedule.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {schedule.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {schedule.shift}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {schedule.guards.length} guards
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{schedule.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Frequency</p>
                          <p className="font-medium">{schedule.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">{schedule.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Checkpoints</p>
                          <p className="font-medium">{schedule.checkpoints}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Coverage</p>
                          <p className={`font-medium ${getCoverageColor(schedule.coverage)}`}>{schedule.coverage}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span>Supervisor: {schedule.supervisor}</span>
                        <span>Start: {schedule.startDate}</span>
                        <span>End: {schedule.endDate}</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Assigned Guards:</p>
                        <div className="flex flex-wrap gap-1">
                          {schedule.guards.map((guard, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {guard}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${schedule.coverage}%` }}
                        ></div>
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
          {/* Upcoming Patrols */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Patrols</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingPatrols.map((patrol, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{patrol.route}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">{patrol.time}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        patrol.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {patrol.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Guard: {patrol.guard}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Checkpoints */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Active Checkpoints</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {checkpoints.map((checkpoint) => (
                  <div key={checkpoint.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{checkpoint.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        checkpoint.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {checkpoint.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{checkpoint.location}</p>
                    <p className="text-xs text-gray-500 mt-1">Guard: {checkpoint.guard}</p>
                    <p className="text-xs text-gray-500">Last check: {checkpoint.lastCheck}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coverage Map */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Coverage Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Kigali Business Center</h3>
                    <span className="text-sm font-medium text-green-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Huye Mall</h3>
                    <span className="text-sm font-medium text-blue-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Musanze Office Complex</h3>
                    <span className="text-sm font-medium text-yellow-600">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
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
            <span className="text-sm font-medium text-gray-900">Create Schedule</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Route className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Assign Route</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Navigation className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Map</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <Timer className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Set Timer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatrolSchedules;
