import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  CheckCircle, 
  X, 
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Building,
  Award,
  Users,
  TrendingUp,
  AlertCircle,
  Download,
  Edit,
  Trash2,
  Star
} from 'lucide-react';

const Recruitment: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock Rwandan recruitment data
  const jobPostings = [
    {
      id: 1,
      title: 'Security Guard',
      department: 'Field Operations',
      location: 'Kigali, Rwanda',
      type: 'Full-time',
      salary: 'RWF 450,000 - 550,000',
      status: 'Active',
      applications: 12,
      postedDate: '2024-07-20',
      deadline: '2024-08-20',
      requirements: ['High school diploma', 'Security training', 'Physical fitness', 'Clean background'],
      description: 'We are seeking reliable security guards to protect our clients\' assets and ensure safety.'
    },
    {
      id: 2,
      title: 'Finance Officer',
      department: 'Finance',
      location: 'Kigali, Rwanda',
      type: 'Full-time',
      salary: 'RWF 700,000 - 850,000',
      status: 'Active',
      applications: 8,
      postedDate: '2024-07-18',
      deadline: '2024-08-18',
      requirements: ['Bachelor\'s degree in Finance', '3+ years experience', 'CPA certification', 'Excel proficiency'],
      description: 'Join our finance team to manage financial operations and reporting.'
    },
    {
      id: 3,
      title: 'Customer Service Representative',
      department: 'Customer Experience',
      location: 'Kigali, Rwanda',
      type: 'Full-time',
      salary: 'RWF 500,000 - 600,000',
      status: 'Active',
      applications: 15,
      postedDate: '2024-07-15',
      deadline: '2024-08-15',
      requirements: ['Diploma in Business', 'Customer service experience', 'Bilingual (Kinyarwanda/English)', 'Communication skills'],
      description: 'Provide excellent customer service and support to our clients.'
    },
    {
      id: 4,
      title: 'IT Support Specialist',
      department: 'IT Department',
      location: 'Kigali, Rwanda',
      type: 'Full-time',
      salary: 'RWF 600,000 - 750,000',
      status: 'Closed',
      applications: 6,
      postedDate: '2024-07-10',
      deadline: '2024-08-10',
      requirements: ['IT degree', '2+ years experience', 'Network administration', 'Problem-solving skills'],
      description: 'Support our IT infrastructure and provide technical assistance.'
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Eric Niyomugabo',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Kigali, Rwanda',
      phone: '+250 788 123 789',
      email: 'eric.niyomugabo@gmail.com',
      status: 'Shortlisted',
      experience: '2 years',
      education: 'High School Diploma',
      appliedDate: '2024-07-25',
      rating: 4.5,
      skills: ['Security training', 'First aid', 'Customer service', 'Physical fitness']
    },
    {
      id: 2,
      name: 'Sarah Uwamahoro',
      position: 'Finance Officer',
      department: 'Finance',
      location: 'Kigali, Rwanda',
      phone: '+250 789 234 890',
      email: 'sarah.uwamahoro@gmail.com',
      status: 'Interviewed',
      experience: '4 years',
      education: 'Bachelor\'s in Accounting',
      appliedDate: '2024-07-22',
      rating: 4.8,
      skills: ['Financial analysis', 'QuickBooks', 'Excel', 'Tax preparation']
    },
    {
      id: 3,
      name: 'David Nkurunziza',
      position: 'Customer Service Representative',
      department: 'Customer Experience',
      location: 'Kigali, Rwanda',
      phone: '+250 787 345 901',
      email: 'david.nkurunziza@gmail.com',
      status: 'Applied',
      experience: '1 year',
      education: 'Diploma in Business',
      appliedDate: '2024-07-26',
      rating: 4.2,
      skills: ['Customer service', 'Communication', 'Problem solving', 'Bilingual']
    },
    {
      id: 4,
      name: 'Grace Mukamana',
      position: 'IT Support Specialist',
      department: 'IT Department',
      location: 'Kigali, Rwanda',
      phone: '+250 786 456 012',
      email: 'grace.mukamana@gmail.com',
      status: 'Hired',
      experience: '3 years',
      education: 'Bachelor\'s in IT',
      appliedDate: '2024-07-20',
      rating: 4.9,
      skills: ['Network administration', 'Hardware repair', 'Software installation', 'Troubleshooting']
    }
  ];

  const recruitmentStats = [
    { title: 'Active Jobs', value: '8', change: '+2', icon: Building, color: 'text-blue-600' },
    { title: 'Total Applications', value: '45', change: '+12', icon: Users, color: 'text-green-600' },
    { title: 'Shortlisted', value: '15', change: '+5', icon: CheckCircle, color: 'text-purple-600' },
    { title: 'Hired This Month', value: '6', change: '+2', icon: UserPlus, color: 'text-orange-600' }
  ];

  const upcomingInterviews = [
    {
      candidateName: 'Eric Niyomugabo',
      position: 'Security Guard',
      date: '2024-08-05',
      time: '10:00 AM',
      interviewer: 'Emmanuel Ndayisaba',
      location: 'Kigali Office'
    },
    {
      candidateName: 'Sarah Uwamahoro',
      position: 'Finance Officer',
      date: '2024-08-06',
      time: '02:00 PM',
      interviewer: 'Finance Manager',
      location: 'Kigali Office'
    },
    {
      candidateName: 'David Nkurunziza',
      position: 'Customer Service Representative',
      date: '2024-08-07',
      time: '11:00 AM',
      interviewer: 'CX Manager',
      location: 'Kigali Office'
    }
  ];

  const filteredJobs = jobPostings.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    return matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Shortlisted': return 'bg-blue-100 text-blue-800';
      case 'Interviewed': return 'bg-purple-100 text-purple-800';
      case 'Applied': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruitment</h1>
          <p className="text-gray-600 mt-2">Manage job postings, candidates, and hiring processes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Post Job</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recruitmentStats.map((stat, index) => (
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
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Finance">Finance</option>
              <option value="Customer Experience">Customer Experience</option>
              <option value="IT Department">IT Department</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredJobs.length} of {jobPostings.length} jobs</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Postings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Job Postings</h2>
            <p className="text-sm text-gray-600 mt-1">Current open positions</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Posted: {job.postedDate}</span>
                        <span>Deadline: {job.deadline}</span>
                        <span>{job.applications} applications</span>
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
          {/* Upcoming Interviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Interviews</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {interview.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {interview.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Interviewer: {interview.interviewer}</p>
                    <p className="text-xs text-gray-500">{interview.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Candidates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Top Candidates</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {candidates.slice(0, 3).map((candidate) => (
                  <div key={candidate.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCandidateStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                      <span className="text-sm text-gray-500">{candidate.experience} exp</span>
                    </div>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(candidate.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{candidate.rating}</span>
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
            <span className="text-sm font-medium text-gray-900">Post Job</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <UserPlus className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Candidate</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Calendar className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Schedule Interview</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <Award className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Make Offer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
 