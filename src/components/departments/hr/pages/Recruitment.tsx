import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  DollarSign,
  Building,
  UserCheck,
  UserX,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  Send
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { jobPostingAPI, candidateAPI } from '../../../../services/api';
import Modal from '../../../shared/Modal';
import JobPostingForm from '../../../forms/JobPostingForm';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: string;
  applications: number;
  postedDate: string;
  deadline: string;
  requirements: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
  experience: string;
  education: string;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  department: string;
  location: string;
  phone: string;
  email: string;
  status: string;
  experience: number;
  education: string;
  skills: string[];
  appliedDate: string;
  interviewDate?: string;
  interviewNotes?: string;
  salary?: string;
}

const Recruitment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('job-postings');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [showViewJobModal, setShowViewJobModal] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPosting | null>(null);

  // Fetch job postings data
  const { 
    items: jobPostingsData, 
    loading: jobPostingsLoading, 
    error: jobPostingsError, 
    refetch: refetchJobPostings, 
    updateFilters: updateJobPostingsFilters,
    total: jobPostingsTotal,
    currentPage: jobPostingsCurrentPage,
    totalPages: jobPostingsTotalPages
  } = useApiList(jobPostingAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    department: "all"
  });

  // Fetch candidates data
  const { 
    items: candidatesData, 
    loading: candidatesLoading, 
    error: candidatesError, 
    refetch: refetchCandidates, 
    updateFilters: updateCandidatesFilters,
    total: candidatesTotal,
    currentPage: candidatesCurrentPage,
    totalPages: candidatesTotalPages
  } = useApiList(candidateAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    department: "all"
  });

  // Delete mutations
  const deleteJobMutation = useApiMutation(jobPostingAPI.delete);
  const deleteCandidateMutation = useApiMutation(candidateAPI.delete);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (activeTab === 'job-postings') {
      updateJobPostingsFilters({ search: value, page: 1 });
    } else {
      updateCandidatesFilters({ search: value, page: 1 });
    }
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    if (activeTab === 'job-postings') {
      updateJobPostingsFilters({ department, page: 1 });
    } else {
      updateCandidatesFilters({ department, page: 1 });
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    if (activeTab === 'job-postings') {
      updateJobPostingsFilters({ status, page: 1 });
    } else {
      updateCandidatesFilters({ status, page: 1 });
    }
  };

  const handlePageChange = (page: number) => {
    if (activeTab === 'job-postings') {
      updateJobPostingsFilters({ page });
    } else {
      updateCandidatesFilters({ page });
    }
  };

  const handleAddJobPosting = () => {
    setSelectedJobPosting(null);
    setShowAddJobModal(true);
  };

  const handleEditJobPosting = (jobPosting: JobPosting) => {
    setSelectedJobPosting(jobPosting);
    setShowEditJobModal(true);
  };

  const handleViewJobPosting = (jobPosting: JobPosting) => {
    setSelectedJobPosting(jobPosting);
    setShowViewJobModal(true);
  };

  const handleDeleteJobPosting = async (jobPostingId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteJobMutation.mutate(jobPostingId);
        refetchJobPostings();
      } catch (error) {
        console.error('Error deleting job posting:', error);
      }
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await deleteCandidateMutation.mutate(candidateId);
        refetchCandidates();
      } catch (error) {
        console.error('Error deleting candidate:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowAddJobModal(false);
    setShowEditJobModal(false);
    refetchJobPostings();
  };

  const handleFormCancel = () => {
    setShowAddJobModal(false);
    setShowEditJobModal(false);
  };

  const recruitmentStats = [
    { 
      title: 'Active Job Postings', 
      value: (jobPostingsData?.filter((job: JobPosting) => job.status === 'Active').length || 0).toString(), 
      change: '+2', 
      icon: Briefcase, 
      color: 'text-blue-600',
      subtitle: 'Currently open'
    },
    { 
      title: 'Total Applications', 
      value: (candidatesTotal || 0).toString(), 
      change: '+15', 
      icon: Users, 
      color: 'text-green-600',
      subtitle: 'All time'
    },
    { 
      title: 'Shortlisted', 
      value: (candidatesData?.filter((candidate: Candidate) => candidate.status === 'Shortlisted').length || 0).toString(), 
      change: '+3', 
      icon: UserCheck, 
      color: 'text-purple-600',
      subtitle: 'In pipeline'
    },
    { 
      title: 'Hired This Month', 
      value: '5', 
      change: '+2', 
      icon: CheckCircle, 
      color: 'text-orange-600',
      subtitle: 'Successful placements'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Shortlisted': return 'bg-purple-100 text-purple-800';
      case 'Interviewed': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'IT': return 'bg-blue-100 text-blue-800';
      case 'HR': return 'bg-purple-100 text-purple-800';
      case 'Finance': return 'bg-green-100 text-green-800';
      case 'Marketing': return 'bg-pink-100 text-pink-800';
      case 'Sales': return 'bg-orange-100 text-orange-800';
      case 'Operations': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (jobPostingsLoading || candidatesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (jobPostingsError || candidatesError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading recruitment data</h3>
            <div className="mt-2 text-sm text-red-700">{jobPostingsError || candidatesError}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment Management</h1>
          <p className="text-gray-600">Manage job postings and candidate applications</p>
        </div>
        {activeTab === 'job-postings' && (
          <button
            onClick={handleAddJobPosting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Job Posting
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {recruitmentStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="text-2xl">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('job-postings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'job-postings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'candidates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Candidates
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'job-postings' ? 'job postings' : 'candidates'}...`}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
            <select
              value={filterDepartment}
                onChange={(e) => handleDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
              <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {activeTab === 'job-postings' ? (
                  <>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Closed">Closed</option>
                  </>
                ) : (
                  <>
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interviewed">Interviewed</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </>
                )}
            </select>
        </div>
      </div>

          {/* Content based on active tab */}
          {activeTab === 'job-postings' ? (
            /* Job Postings Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobPostingsData.map((jobPosting: JobPosting) => (
                    <tr key={jobPosting.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{jobPosting.title}</div>
                          <div className="text-sm text-gray-500">{jobPosting.type}</div>
          </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(jobPosting.department)}`}>
                          {jobPosting.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jobPosting.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(jobPosting.status)}`}>
                          {jobPosting.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jobPosting.applications}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(jobPosting.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewJobPosting(jobPosting)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                      </button>
                          <button
                            onClick={() => handleEditJobPosting(jobPosting)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                      </button>
                          <button
                            onClick={() => handleDeleteJobPosting(jobPosting.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                      </td>
                    </tr>
              ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Candidates Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidatesData.map((candidate: Candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {candidate.name?.charAt(0)}
                      </span>
                    </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">{candidate.email}</div>
              </div>
            </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(candidate.department)}`}>
                          {candidate.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {candidate.experience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(candidate.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewJobPosting(candidate as any)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditJobPosting(candidate as any)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCandidate(candidate.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                    </div>
                      </td>
                    </tr>
                      ))}
                </tbody>
              </table>
                    </div>
          )}

          {/* Pagination */}
          {((activeTab === 'job-postings' && jobPostingsTotalPages > 1) || 
            (activeTab === 'candidates' && candidatesTotalPages > 1)) && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing {((activeTab === 'job-postings' ? jobPostingsCurrentPage : candidatesCurrentPage) - 1) * 10 + 1} to {Math.min((activeTab === 'job-postings' ? jobPostingsCurrentPage : candidatesCurrentPage) * 10, activeTab === 'job-postings' ? jobPostingsTotal : candidatesTotal)} of {activeTab === 'job-postings' ? jobPostingsTotal : candidatesTotal} results
                  </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange((activeTab === 'job-postings' ? jobPostingsCurrentPage : candidatesCurrentPage) - 1)}
                  disabled={(activeTab === 'job-postings' ? jobPostingsCurrentPage : candidatesCurrentPage) === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange((activeTab === 'job-postings' ? jobPostingsCurrentPage : candidatesCurrentPage) + 1)}
                  disabled={(activeTab === 'job-postings' ? jobPostingsCurrentPage : candidatesCurrentPage) === (activeTab === 'job-postings' ? jobPostingsTotalPages : candidatesTotalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit/View Modals */}
      <Modal
        isOpen={showAddJobModal || showEditJobModal || showViewJobModal}
        onClose={() => {
          setShowAddJobModal(false);
          setShowEditJobModal(false);
          setShowViewJobModal(false);
        }}
        title={selectedJobPosting ? (selectedJobPosting.id ? 'Edit Job Posting' : 'Add Job Posting') : 'Job Posting Details'}
        size="xl"
      >
        {selectedJobPosting ? (
          <JobPostingForm
            jobPosting={selectedJobPosting}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <JobPostingForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Recruitment;
 