import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
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
  GraduationCap
} from 'lucide-react';

const Training: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock Rwandan security training data
  const trainingPrograms = [
    {
      id: 1,
      title: 'Basic Security Training',
      type: 'Mandatory',
      instructor: 'Emmanuel Ndayisaba',
      location: 'Kigali Training Center',
      duration: '2 weeks',
      capacity: 20,
      enrolled: 18,
      status: 'Active',
      startDate: '2024-08-05',
      endDate: '2024-08-19',
      cost: 'RWF 150,000',
      description: 'Comprehensive training covering security protocols, customer service, and emergency procedures.',
      modules: ['Security Protocols', 'Customer Service', 'Emergency Response', 'Legal Compliance', 'First Aid']
    },
    {
      id: 2,
      title: 'Advanced Security Management',
      type: 'Specialized',
      instructor: 'Regional Manager',
      location: 'Huye Training Center',
      duration: '1 week',
      capacity: 15,
      enrolled: 12,
      status: 'Active',
      startDate: '2024-08-12',
      endDate: '2024-08-18',
      cost: 'RWF 250,000',
      description: 'Advanced training for security supervisors and team leaders.',
      modules: ['Leadership Skills', 'Team Management', 'Advanced Security', 'Risk Assessment', 'Conflict Resolution']
    },
    {
      id: 3,
      title: 'Fire Safety & Emergency Response',
      type: 'Certification',
      instructor: 'Fire Safety Officer',
      location: 'Kigali Fire Station',
      duration: '3 days',
      capacity: 25,
      enrolled: 22,
      status: 'Active',
      startDate: '2024-08-08',
      endDate: '2024-08-10',
      cost: 'RWF 100,000',
      description: 'Specialized training in fire safety and emergency response procedures.',
      modules: ['Fire Prevention', 'Emergency Evacuation', 'Fire Extinguisher Use', 'Emergency Communication']
    },
    {
      id: 4,
      title: 'First Aid & Medical Response',
      type: 'Certification',
      instructor: 'Medical Trainer',
      location: 'Kigali Medical Center',
      duration: '2 days',
      capacity: 20,
      enrolled: 15,
      status: 'Completed',
      startDate: '2024-07-15',
      endDate: '2024-07-16',
      cost: 'RWF 120,000',
      description: 'Essential first aid training for security personnel.',
      modules: ['Basic First Aid', 'CPR Training', 'Medical Emergency Response', 'Health & Safety']
    }
  ];

  const enrolledGuards = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      program: 'Basic Security Training',
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
      program: 'Basic Security Training',
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
      program: 'Fire Safety & Emergency Response',
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
      program: 'Advanced Security Management',
      progress: 30,
      status: 'In Progress',
      startDate: '2024-08-12',
      completionDate: '2024-08-18',
      grade: 'B',
      feedback: 'Making good progress, needs more practice with leadership scenarios'
    }
  ];

  const trainingStats = [
    { title: 'Active Programs', value: '6', change: '+2', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Enrolled Guards', value: '67', change: '+15', icon: Users, color: 'text-green-600' },
    { title: 'Completion Rate', value: '92%', change: '+5%', icon: CheckCircle, color: 'text-purple-600' },
    { title: 'Training Budget', value: 'RWF 1.2M', change: '+10%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const certifications = [
    {
      name: 'Security Guard License',
      issuingAuthority: 'Rwanda National Police',
      validUntil: '2025-12-31',
      status: 'Valid',
      holders: 89
    },
    {
      name: 'First Aid Certification',
      issuingAuthority: 'Rwanda Red Cross',
      validUntil: '2024-12-31',
      status: 'Valid',
      holders: 67
    },
    {
      name: 'Fire Safety Training',
      issuingAuthority: 'Rwanda Fire Brigade',
      validUntil: '2025-06-30',
      status: 'Valid',
      holders: 45
    }
  ];

  const upcomingSessions = [
    {
      title: 'Basic Security Training',
      date: '2024-08-05',
      time: '09:00 AM',
      location: 'Kigali Training Center',
      instructor: 'Emmanuel Ndayisaba',
      enrolled: 18
    },
    {
      title: 'Fire Safety & Emergency Response',
      date: '2024-08-08',
      time: '02:00 PM',
      location: 'Kigali Fire Station',
      instructor: 'Fire Safety Officer',
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

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus;
    const matchesType = filterType === 'all' || program.type === filterType;
    return matchesStatus && matchesType;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mandatory': return 'bg-red-100 text-red-800';
      case 'Specialized': return 'bg-blue-100 text-blue-800';
      case 'Certification': return 'bg-purple-100 text-purple-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Security Training</h1>
          <p className="text-gray-600 mt-2">Manage training programs and certifications for security personnel</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Program</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Mandatory">Mandatory</option>
              <option value="Specialized">Specialized</option>
              <option value="Certification">Certification</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredPrograms.length} of {trainingPrograms.length} programs</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Programs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Training Programs</h2>
            <p className="text-sm text-gray-600 mt-1">Available and ongoing training programs</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{program.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(program.type)}`}>
                          {program.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {program.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {program.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {program.enrolled}/{program.capacity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <span>Instructor: {program.instructor}</span>
                        <span>Cost: {program.cost}</span>
                        <span>Start: {program.startDate}</span>
                        <span>End: {program.endDate}</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Modules:</p>
                        <div className="flex flex-wrap gap-1">
                          {program.modules.map((module, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {module}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
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

          {/* Guard Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Guard Progress</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {enrolledGuards.map((guard) => (
                  <div key={guard.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{guard.name}</h3>
                    <p className="text-sm text-gray-600">{guard.program}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-sm font-medium ${getProgressColor(guard.progress)}`}>
                        {guard.progress}% Complete
                      </span>
                      <span className="text-sm text-gray-500">Grade: {guard.grade}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${guard.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{guard.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{cert.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{cert.issuingAuthority}</p>
                    <p className="text-xs text-gray-500 mt-1">Valid until: {cert.validUntil}</p>
                    <p className="text-xs text-gray-500">{cert.holders} holders</p>
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
            <span className="text-sm font-medium text-gray-900">Create Program</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Enroll Guard</span>
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
