import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Map, 
  Clock, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  MapPin,
  User
} from 'lucide-react';

interface PatrolSchedule {
  id: string;
  name: string;
  route: string;
  assignedGuards: string[];
  teamLeader: string;
  startTime: string;
  endTime: string;
  frequency: string;
  status: 'active' | 'completed' | 'scheduled' | 'cancelled';
  lastCompleted: string;
  nextScheduled: string;
  duration: string;
  checkpoints: number;
}

const PatrolSchedules: React.FC = () => {
  const [patrolSchedules] = useState<PatrolSchedule[]>([
    {
      id: '1',
      name: 'Perimeter Patrol Alpha',
      route: 'Main Gate → North Side → East Side → South Side → West Side → Main Gate',
      assignedGuards: ['Jean Baptiste', 'Peter Nkurunziza'],
      teamLeader: 'Paul Mugenzi',
      startTime: '08:00',
      endTime: '08:45',
      frequency: 'Every 2 hours',
      status: 'active',
      lastCompleted: '2024-01-15 06:00',
      nextScheduled: '2024-01-15 10:00',
      duration: '45 minutes',
      checkpoints: 5
    },
    {
      id: '2',
      name: 'Building Interior Patrol',
      route: 'Ground Floor → First Floor → Second Floor → Ground Floor',
      assignedGuards: ['Marie Claire', 'Grace Mukamana'],
      teamLeader: 'Sarah Uwimana',
      startTime: '09:00',
      endTime: '09:30',
      frequency: 'Every 3 hours',
      status: 'scheduled',
      lastCompleted: '2024-01-15 06:00',
      nextScheduled: '2024-01-15 12:00',
      duration: '30 minutes',
      checkpoints: 4
    },
    {
      id: '3',
      name: 'Parking Area Patrol',
      route: 'Main Parking → Visitor Parking → Service Area → Main Parking',
      assignedGuards: ['David Nkurunziza'],
      teamLeader: 'Paul Mugenzi',
      startTime: '10:00',
      endTime: '10:20',
      frequency: 'Every hour',
      status: 'completed',
      lastCompleted: '2024-01-15 10:00',
      nextScheduled: '2024-01-15 11:00',
      duration: '20 minutes',
      checkpoints: 3
    },
    {
      id: '4',
      name: 'Night Security Round',
      route: 'Full perimeter + Interior check',
      assignedGuards: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      teamLeader: 'Jean Claude',
      startTime: '22:00',
      endTime: '23:00',
      frequency: 'Every 4 hours',
      status: 'scheduled',
      lastCompleted: '2024-01-14 22:00',
      nextScheduled: '2024-01-15 22:00',
      duration: '60 minutes',
      checkpoints: 8
    }
  ]);

  const [showAddModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<PatrolSchedule | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAddSchedule = () => {
    setShowAddModal(true);
  };

  const handleViewSchedule = (schedule: PatrolSchedule) => {
    setSelectedSchedule(schedule);
  };

  const handleEditSchedule = (schedule: PatrolSchedule) => {
    // Implement edit functionality
    console.log('Edit patrol schedule:', schedule);
  };

  const handleStartPatrol = (schedule: PatrolSchedule) => {
    // Implement start patrol functionality
    console.log('Start patrol:', schedule);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patrol Schedules</h2>
          <p className="text-gray-600">Manage security patrol routes and schedules</p>
        </div>
        <AnimatedButton
          onClick={handleAddSchedule}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Schedule</span>
        </AnimatedButton>
      </div>

      {/* Patrol Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Schedules"
          subtitle="Active patrol routes"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{patrolSchedules.length}</p>
              <p className="text-sm text-gray-500">Total schedules</p>
            </div>
            <Map className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Patrols"
          subtitle="Currently running"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {patrolSchedules.filter(p => p.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500">Active patrols</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Scheduled"
          subtitle="Upcoming patrols"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {patrolSchedules.filter(p => p.status === 'scheduled').length}
              </p>
              <p className="text-sm text-gray-500">Scheduled</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Completed Today"
          subtitle="Finished patrols"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {patrolSchedules.filter(p => p.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Patrol Schedules Table */}
      <AnimatedCard
        title="Patrol Schedules"
        subtitle="Security patrol routes and timing"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Patrol Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Route</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Assigned Guards</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Schedule</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patrolSchedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{schedule.name}</p>
                      <p className="text-sm text-gray-500">{schedule.duration} • {schedule.checkpoints} checkpoints</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 max-w-xs truncate">{schedule.route}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      {schedule.assignedGuards.map((guard, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{guard}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{schedule.startTime} - {schedule.endTime}</p>
                      <p className="text-xs text-gray-500">{schedule.frequency}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                      {getStatusIcon(schedule.status)}
                      <span className="ml-1 capitalize">{schedule.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewSchedule(schedule)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditSchedule(schedule)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                      {schedule.status === 'scheduled' && (
                        <AnimatedButton
                          onClick={() => handleStartPatrol(schedule)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </AnimatedButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Schedule Details Modal */}
      {selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Patrol Schedule Details</h3>
              <button
                onClick={() => setSelectedSchedule(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Basic Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patrol Name</label>
                    <p className="text-gray-900">{selectedSchedule.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Route</label>
                    <p className="text-gray-900">{selectedSchedule.route}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-gray-900">{selectedSchedule.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Checkpoints</label>
                    <p className="text-gray-900">{selectedSchedule.checkpoints}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Frequency</label>
                    <p className="text-gray-900">{selectedSchedule.frequency}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Schedule Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <p className="text-gray-900">{selectedSchedule.startTime}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <p className="text-gray-900">{selectedSchedule.endTime}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Team Leader</label>
                    <p className="text-gray-900">{selectedSchedule.teamLeader}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Completed</label>
                    <p className="text-gray-900">{selectedSchedule.lastCompleted}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Next Scheduled</label>
                    <p className="text-gray-900">{selectedSchedule.nextScheduled}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Guards */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Assigned Guards</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedSchedule.assignedGuards.map((guard, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{guard}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedSchedule(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditSchedule(selectedSchedule)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Schedule
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatrolSchedules;
