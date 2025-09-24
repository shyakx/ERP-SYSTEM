import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

interface SecurityAssignment {
  id: string;
  guardName: string;
  guardId: string;
  post: string;
  location: string;
  shift: string;
  status: 'active' | 'on-break' | 'off-duty';
  teamLeader: string;
  assignedDate: string;
  notes?: string;
}

const SecurityAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<SecurityAssignment[]>([
    {
      id: '1',
      guardName: 'Jean Baptiste',
      guardId: 'SG001',
      post: 'Main Gate',
      location: 'Kigali Office',
      shift: 'Day Shift (06:00-18:00)',
      status: 'active',
      teamLeader: 'Paul Mugenzi',
      assignedDate: '2024-01-15',
      notes: 'Experienced guard, good with client interaction'
    },
    {
      id: '2',
      guardName: 'Marie Claire',
      guardId: 'SG002',
      post: 'Parking Area',
      location: 'Kigali Office',
      shift: 'Night Shift (18:00-06:00)',
      status: 'active',
      teamLeader: 'Sarah Uwimana',
      assignedDate: '2024-01-15',
      notes: 'Excellent attention to detail'
    },
    {
      id: '3',
      guardName: 'Peter Nkurunziza',
      guardId: 'SG003',
      post: 'Perimeter Patrol',
      location: 'Kigali Office',
      shift: 'Day Shift (06:00-18:00)',
      status: 'on-break',
      teamLeader: 'Paul Mugenzi',
      assignedDate: '2024-01-15',
      notes: 'Patrol specialist'
    },
    {
      id: '4',
      guardName: 'Grace Mukamana',
      guardId: 'SG004',
      post: 'Reception Area',
      location: 'Kigali Office',
      shift: 'Day Shift (06:00-18:00)',
      status: 'active',
      teamLeader: 'Sarah Uwimana',
      assignedDate: '2024-01-15',
      notes: 'Friendly and professional'
    },
    {
      id: '5',
      guardName: 'David Nkurunziza',
      guardId: 'SG005',
      post: 'Back Entrance',
      location: 'Kigali Office',
      shift: 'Night Shift (18:00-06:00)',
      status: 'off-duty',
      teamLeader: 'Paul Mugenzi',
      assignedDate: '2024-01-14',
      notes: 'Reliable night guard'
    }
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<SecurityAssignment | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-break': return 'bg-yellow-100 text-yellow-800';
      case 'off-duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'on-break': return <Clock className="w-4 h-4" />;
      case 'off-duty': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAssignGuard = () => {
    setShowAssignModal(true);
  };

  const handleViewAssignment = (assignment: SecurityAssignment) => {
    setSelectedAssignment(assignment);
  };

  const handleEditAssignment = (assignment: SecurityAssignment) => {
    // Implement edit functionality
    console.log('Edit assignment:', assignment);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Assignments</h2>
          <p className="text-gray-600">Manage security guard assignments to posts and locations</p>
        </div>
        <AnimatedButton
          onClick={handleAssignGuard}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Assign Guard</span>
        </AnimatedButton>
      </div>

      {/* Assignment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Assignments"
          subtitle="Active posts"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              <p className="text-sm text-gray-500">Total assignments</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Guards"
          subtitle="Currently on duty"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500">On duty</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="On Break"
          subtitle="Temporary break"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'on-break').length}
              </p>
              <p className="text-sm text-gray-500">On break</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Off Duty"
          subtitle="Not assigned"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'off-duty').length}
              </p>
              <p className="text-sm text-gray-500">Off duty</p>
            </div>
            <AlertCircle className="w-8 h-8 text-gray-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Assignments Table */}
      <AnimatedCard
        title="Current Assignments"
        subtitle="Security guard post assignments"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Guard</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Post</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Shift</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Team Leader</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{assignment.guardName}</p>
                        <p className="text-sm text-gray-500">{assignment.guardId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{assignment.post}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{assignment.location}</td>
                  <td className="py-3 px-4 text-gray-700">{assignment.shift}</td>
                  <td className="py-3 px-4 text-gray-700">{assignment.teamLeader}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">{assignment.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <AnimatedButton
                        onClick={() => handleViewAssignment(assignment)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={() => handleEditAssignment(assignment)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Assignment Details</h3>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guard Name</label>
                  <p className="text-gray-900">{selectedAssignment.guardName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guard ID</label>
                  <p className="text-gray-900">{selectedAssignment.guardId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Post</label>
                  <p className="text-gray-900">{selectedAssignment.post}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900">{selectedAssignment.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shift</label>
                  <p className="text-gray-900">{selectedAssignment.shift}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Leader</label>
                  <p className="text-gray-900">{selectedAssignment.teamLeader}</p>
                </div>
              </div>
              
              {selectedAssignment.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <p className="text-gray-900">{selectedAssignment.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <AnimatedButton
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleEditAssignment(selectedAssignment)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Assignment
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityAssignments;
