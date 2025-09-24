import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  UserCheck, 
  Users, 
  MapPin, 
  Clock, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Shield
} from 'lucide-react';

interface TeamLeader {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  location: string;
  shift: string;
  status: 'active' | 'on-duty' | 'off-duty';
  teamSize: number;
  phone: string;
  email: string;
  experience: string;
  assignedGuards: string[];
  performance: {
    rating: number;
    incidentsHandled: number;
    teamSatisfaction: number;
  };
}

const TeamLeaders: React.FC = () => {
  const [teamLeaders, setTeamLeaders] = useState<TeamLeader[]>([
    {
      id: '1',
      name: 'Paul Mugenzi',
      employeeId: 'TL001',
      department: 'Security Operations',
      location: 'Kigali Office',
      shift: 'Day Shift (06:00-18:00)',
      status: 'on-duty',
      teamSize: 6,
      phone: '+250 788 123 456',
      email: 'paul.mugenzi@dicel.rw',
      experience: '5 years',
      assignedGuards: ['Jean Baptiste', 'Peter Nkurunziza', 'David Nkurunziza', 'Grace Mukamana', 'John Doe', 'Jane Smith'],
      performance: {
        rating: 4.8,
        incidentsHandled: 12,
        teamSatisfaction: 95
      }
    },
    {
      id: '2',
      name: 'Sarah Uwimana',
      employeeId: 'TL002',
      department: 'Security Operations',
      location: 'Kigali Office',
      shift: 'Night Shift (18:00-06:00)',
      status: 'active',
      teamSize: 5,
      phone: '+250 788 234 567',
      email: 'sarah.uwimana@dicel.rw',
      experience: '4 years',
      assignedGuards: ['Marie Claire', 'Grace Mukamana', 'Alice Johnson', 'Bob Wilson', 'Carol Brown'],
      performance: {
        rating: 4.6,
        incidentsHandled: 8,
        teamSatisfaction: 92
      }
    },
    {
      id: '3',
      name: 'Jean Claude',
      employeeId: 'TL003',
      department: 'Security Operations',
      location: 'Kigali Office',
      shift: 'Day Shift (06:00-18:00)',
      status: 'off-duty',
      teamSize: 4,
      phone: '+250 788 345 678',
      email: 'jean.claude@dicel.rw',
      experience: '6 years',
      assignedGuards: ['Mike Johnson', 'Lisa Davis', 'Tom Wilson', 'Anna Brown'],
      performance: {
        rating: 4.9,
        incidentsHandled: 15,
        teamSatisfaction: 98
      }
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<TeamLeader | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'off-duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-duty': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'off-duty': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAddTeamLeader = () => {
    setShowAddModal(true);
  };

  const handleViewLeader = (leader: TeamLeader) => {
    setSelectedLeader(leader);
  };

  const handleEditLeader = (leader: TeamLeader) => {
    // Implement edit functionality
    console.log('Edit team leader:', leader);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Leaders</h2>
          <p className="text-gray-600">Manage security team leaders and their responsibilities</p>
        </div>
        <AnimatedButton
          onClick={handleAddTeamLeader}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Leader</span>
        </AnimatedButton>
      </div>

      {/* Team Leader Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Team Leaders"
          subtitle="Active supervisors"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{teamLeaders.length}</p>
              <p className="text-sm text-gray-500">Team leaders</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="On Duty"
          subtitle="Currently supervising"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {teamLeaders.filter(tl => tl.status === 'on-duty').length}
              </p>
              <p className="text-sm text-gray-500">On duty</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Total Guards"
          subtitle="Under supervision"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {teamLeaders.reduce((sum, tl) => sum + tl.teamSize, 0)}
              </p>
              <p className="text-sm text-gray-500">Guards supervised</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Avg Performance"
          subtitle="Team leader rating"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {(teamLeaders.reduce((sum, tl) => sum + tl.performance.rating, 0) / teamLeaders.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">Average rating</p>
            </div>
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Team Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamLeaders.map((leader) => (
          <AnimatedCard
            key={leader.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{leader.name}</h3>
                    <p className="text-sm text-gray-500">{leader.employeeId}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leader.status)}`}>
                  {getStatusIcon(leader.status)}
                  <span className="ml-1 capitalize">{leader.status.replace('-', ' ')}</span>
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Team Size</span>
                  <span className="font-medium text-gray-900">{leader.teamSize} guards</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Shift</span>
                  <span className="font-medium text-gray-900">{leader.shift}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">{leader.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <span className="font-medium text-gray-900">{leader.performance.rating}/5.0</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{leader.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{leader.email}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <AnimatedButton
                  onClick={() => handleViewLeader(leader)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => handleEditLeader(leader)}
                  className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Team Leader Details Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Team Leader Details</h3>
              <button
                onClick={() => setSelectedLeader(null)}
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
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{selectedLeader.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <p className="text-gray-900">{selectedLeader.employeeId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <p className="text-gray-900">{selectedLeader.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-gray-900">{selectedLeader.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shift</label>
                    <p className="text-gray-900">{selectedLeader.shift}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <p className="text-gray-900">{selectedLeader.experience}</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
                    <p className="text-gray-900">{selectedLeader.performance.rating}/5.0</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Incidents Handled</label>
                    <p className="text-gray-900">{selectedLeader.performance.incidentsHandled}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Team Satisfaction</label>
                    <p className="text-gray-900">{selectedLeader.performance.teamSatisfaction}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Team Size</label>
                    <p className="text-gray-900">{selectedLeader.teamSize} guards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Guards */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Assigned Guards</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedLeader.assignedGuards.map((guard, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{guard}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedLeader(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditLeader(selectedLeader)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Team Leader
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeaders;
