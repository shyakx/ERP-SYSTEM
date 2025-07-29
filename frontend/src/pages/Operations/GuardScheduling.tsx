import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Clock,
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  User,
  Building,
  Shield,
  Car,
  BarChart3,
  Target,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

interface GuardSchedule {
  id: string;
  guardId: string;
  guardName: string;
  rank: string;
  weekStarting: string;
  schedules: DaySchedule[];
  totalHours: number;
  maxHours: number;
  status: 'draft' | 'published' | 'active' | 'completed';
  notes: string;
}

interface DaySchedule {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  date: string;
  shifts: ShiftAssignment[];
  totalHours: number;
  status: 'available' | 'scheduled' | 'off_duty' | 'on_leave';
}

interface ShiftAssignment {
  id: string;
  shiftType: 'morning' | 'afternoon' | 'night' | 'overtime';
  startTime: string;
  endTime: string;
  hours: number;
  siteId: string;
  siteName: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes: string;
}

interface Guard {
  id: string;
  name: string;
  rank: string;
  status: 'available' | 'on_duty' | 'off_duty' | 'on_leave' | 'sick';
  skills: string[];
  certifications: string[];
  maxHoursPerWeek: number;
  currentHours: number;
  preferredShifts: string[];
  availability: Availability[];
}

interface Availability {
  day: string;
  available: boolean;
  preferredShifts: string[];
  notes: string;
}

interface Site {
  id: string;
  name: string;
  location: string;
  type: string;
  requiredGuards: number;
  status: string;
}

const GuardScheduling: React.FC = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<GuardSchedule[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuard, setSelectedGuard] = useState('all');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<GuardSchedule | null>(null);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const [schedulesData, guardsData, sitesData] = await Promise.all([
        apiService.get('/api/guard-schedules'),
        apiService.get('/api/guards'),
        apiService.get('/api/sites')
      ]);
      setSchedules(schedulesData);
      setGuards(guardsData);
      setSites(sitesData);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      toast.error('Failed to fetch schedule data');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchedules = schedules.filter(schedule =>
    schedule.guardName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(schedule =>
    selectedGuard === 'all' || schedule.guardId === selectedGuard
  ).filter(schedule =>
    selectedStatus === 'all' || schedule.status === selectedStatus
  ).filter(schedule =>
    !selectedWeek || schedule.weekStarting === selectedWeek
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'published': 'bg-blue-100 text-blue-800',
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getShiftTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'morning': 'bg-orange-100 text-orange-800',
      'afternoon': 'bg-yellow-100 text-yellow-800',
      'night': 'bg-indigo-100 text-indigo-800',
      'overtime': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getGuardStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'available': 'bg-green-100 text-green-800',
      'on_duty': 'bg-blue-100 text-blue-800',
      'off_duty': 'bg-gray-100 text-gray-800',
      'on_leave': 'bg-yellow-100 text-yellow-800',
      'sick': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDayStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'available': 'bg-green-100 text-green-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'off_duty': 'bg-gray-100 text-gray-800',
      'on_leave': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = {
      'monday': 'Mon',
      'tuesday': 'Tue',
      'wednesday': 'Wed',
      'thursday': 'Thu',
      'friday': 'Fri',
      'saturday': 'Sat',
      'sunday': 'Sun'
    };
    return days[day] || day;
  };

  const calculateTotalShifts = (schedule: GuardSchedule) => {
    return (schedule.schedules || []).reduce((sum, day) => 
      sum + (day.shifts || []).length, 0
    );
  };

  const isOverScheduled = (schedule: GuardSchedule) => {
    return schedule.totalHours > schedule.maxHours;
  };

  if (loading) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                Guard Scheduling
              </h1>
              <p className="text-gray-600 mt-2">Manage guard schedules and optimize assignments</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddSchedule(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                New Schedule
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Schedules</p>
                <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.reduce((sum, s) => sum + s.totalHours, 0)}h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search guards or schedule content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedGuard}
                onChange={(e) => setSelectedGuard(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Guards</option>
                {guards.map(guard => (
                  <option key={guard.id} value={guard.id}>{guard.name}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <input
                type="week"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Schedules Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guard
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week Starting
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Shifts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedules.map(schedule => (
                  <tr key={schedule.id} className={`hover:bg-gray-50 ${
                    isOverScheduled(schedule) ? 'bg-red-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{schedule.guardName}</div>
                          <div className="text-sm text-gray-500">{schedule.rank}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(schedule.weekStarting).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{calculateTotalShifts(schedule)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        isOverScheduled(schedule) ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {schedule.totalHours}h
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{schedule.maxHours}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSchedule(schedule)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guard Availability Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Guard Availability Overview</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guard
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {guards.map(guard => (
                  <tr key={guard.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{guard.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{guard.rank}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGuardStatusColor(guard.status)}`}>
                        {guard.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{guard.currentHours}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{guard.maxHoursPerWeek}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {(guard.skills || []).slice(0, 3).map(skill => (
                          <span key={skill} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                        {(guard.skills || []).length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{(guard.skills || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule Detail Modal */}
        {selectedSchedule && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Schedule Details</h3>
                  <button
                    onClick={() => setSelectedSchedule(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guard</label>
                      <p className="text-sm text-gray-900">{selectedSchedule.guardName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rank</label>
                      <p className="text-sm text-gray-900">{selectedSchedule.rank}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Week Starting</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedSchedule.weekStarting).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSchedule.status)}`}>
                        {selectedSchedule.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Hours</label>
                      <p className={`text-sm font-medium ${
                        isOverScheduled(selectedSchedule) ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {selectedSchedule.totalHours}h
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max Hours</label>
                      <p className="text-sm text-gray-900">{selectedSchedule.maxHours}h</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Schedule</label>
                    <div className="space-y-3">
                      {(selectedSchedule.schedules || []).map(day => (
                        <div key={day.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900">{getDayName(day.day)}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDayStatusColor(day.status)}`}>
                              {day.status}
                            </span>
                          </div>
                          
                          {(day.shifts || []).length > 0 ? (
                            <div className="space-y-2">
                              {(day.shifts || []).map(shift => (
                                <div key={shift.id} className="bg-white p-3 rounded border">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getShiftTypeColor(shift.shiftType)}`}>
                                      {shift.shiftType}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600">{shift.siteName}</div>
                                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                    <span>{shift.hours}h</span>
                                    <span>{shift.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">No shifts scheduled</div>
                          )}
                          
                          <div className="mt-2 text-xs text-gray-500">
                            Total Hours: {day.totalHours}h
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedSchedule.notes}</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Edit Schedule
                    </button>
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Publish Schedule
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Download Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  </div>
);
};

export default GuardScheduling; 