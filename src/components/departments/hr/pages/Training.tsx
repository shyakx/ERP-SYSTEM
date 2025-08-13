import React, { useState } from 'react';
import { 
  GraduationCap, 
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
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  FileText,
  Send,
  BookOpen,
  Award,
  Play,
  Pause,
  StopCircle
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { trainingAPI } from '../../../../services/api';
import Modal from '../../../shared/Modal';
import TrainingCourseForm from '../../../forms/TrainingCourseForm';

interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  department: string;
  instructor: string;
  duration: string;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
  type: string;
  objectives: string[];
  modules: string[];
  prerequisites: string[];
  materials: string[];
  cost: number;
}

interface TrainingEnrollment {
  id: string;
  employeeName: string;
  courseTitle: string;
  department: string;
  enrollmentDate: string;
  status: string;
  progress: number;
  completionDate?: string;
  certificate?: string;
  feedback?: string;
}

const Training: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showViewCourseModal, setShowViewCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);

  // Fetch training courses data
  const { 
    items: coursesData, 
    loading: coursesLoading, 
    error: coursesError, 
    refetch: refetchCourses, 
    updateFilters: updateCoursesFilters,
    total: coursesTotal,
    currentPage: coursesCurrentPage,
    totalPages: coursesTotalPages
  } = useApiList(trainingAPI.getAllCourses, {
    page: 1,
    limit: 10,
    status: "all",
    department: "all"
  });

  // Fetch enrollments data
  const { 
    items: enrollmentsData, 
    loading: enrollmentsLoading, 
    error: enrollmentsError, 
    refetch: refetchEnrollments, 
    updateFilters: updateEnrollmentsFilters,
    total: enrollmentsTotal,
    currentPage: enrollmentsCurrentPage,
    totalPages: enrollmentsTotalPages
  } = useApiList(trainingAPI.getAllEnrollments, {
    page: 1,
    limit: 10,
    status: "all",
    department: "all"
  });

  // Delete mutations
  const deleteCourseMutation = useApiMutation(trainingAPI.deleteCourse);
  const deleteEnrollmentMutation = useApiMutation(trainingAPI.deleteEnrollment);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (activeTab === 'courses') {
      updateCoursesFilters({ search: value, page: 1 });
    } else {
      updateEnrollmentsFilters({ search: value, page: 1 });
    }
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    if (activeTab === 'courses') {
      updateCoursesFilters({ department, page: 1 });
    } else {
      updateEnrollmentsFilters({ department, page: 1 });
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    if (activeTab === 'courses') {
      updateCoursesFilters({ status, page: 1 });
    } else {
      updateEnrollmentsFilters({ status, page: 1 });
    }
  };

  const handlePageChange = (page: number) => {
    if (activeTab === 'courses') {
      updateCoursesFilters({ page });
    } else {
      updateEnrollmentsFilters({ page });
    }
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setShowAddCourseModal(true);
  };

  const handleEditCourse = (course: TrainingCourse) => {
    setSelectedCourse(course);
    setShowEditCourseModal(true);
  };

  const handleViewCourse = (course: TrainingCourse) => {
    setSelectedCourse(course);
    setShowViewCourseModal(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this training course?')) {
      try {
        await deleteCourseMutation.mutate(courseId);
        refetchCourses();
      } catch (error) {
        console.error('Error deleting training course:', error);
      }
    }
  };

  const handleDeleteEnrollment = async (enrollmentId: string) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        await deleteEnrollmentMutation.mutate(enrollmentId);
        refetchEnrollments();
      } catch (error) {
        console.error('Error deleting enrollment:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowAddCourseModal(false);
    setShowEditCourseModal(false);
    refetchCourses();
  };

  const handleFormCancel = () => {
    setShowAddCourseModal(false);
    setShowEditCourseModal(false);
  };

  const trainingStats = [
    { 
      title: 'Active Courses', 
      value: (coursesData?.filter((course: TrainingCourse) => course.status === 'Scheduled' || course.status === 'In Progress').length || 0).toString(), 
      change: '+3', 
      icon: BookOpen, 
      color: 'text-blue-600',
      subtitle: 'Currently running'
    },
    { 
      title: 'Total Enrollments', 
      value: (enrollmentsTotal || 0).toString(), 
      change: '+25', 
      icon: Users, 
      color: 'text-green-600',
      subtitle: 'All time'
    },
    { 
      title: 'Completed Courses', 
      value: (coursesData?.filter((course: TrainingCourse) => course.status === 'Completed').length || 0).toString(), 
      change: '+8', 
      icon: CheckCircle, 
      color: 'text-purple-600',
      subtitle: 'This month'
    },
    { 
      title: 'Certificates Issued', 
      value: (enrollmentsData?.filter((enrollment: TrainingEnrollment) => enrollment.status === 'Completed').length || 0).toString(), 
      change: '+12', 
      icon: Award, 
      color: 'text-orange-600',
      subtitle: 'Successfully completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Enrolled': return 'bg-purple-100 text-purple-800';
      case 'Dropped': return 'bg-red-100 text-red-800';
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'In-person': return 'bg-blue-100 text-blue-800';
      case 'Virtual': return 'bg-green-100 text-green-800';
      case 'Hybrid': return 'bg-purple-100 text-purple-800';
      case 'Self-paced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (coursesLoading || enrollmentsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (coursesError || enrollmentsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading training data</h3>
            <div className="mt-2 text-sm text-red-700">{coursesError || enrollmentsError}</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
          <p className="text-gray-600">Manage training courses and employee enrollments</p>
        </div>
        {activeTab === 'courses' && (
          <button
            onClick={handleAddCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {trainingStats.map((stat, index) => {
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
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Training Courses
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enrollments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Enrollments
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
                  placeholder={`Search ${activeTab === 'courses' ? 'courses' : 'enrollments'}...`}
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
                {activeTab === 'courses' ? (
                  <>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </>
                ) : (
                  <>
                    <option value="Enrolled">Enrolled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Dropped">Dropped</option>
                  </>
                )}
            </select>
        </div>
      </div>

          {/* Content based on active tab */}
          {activeTab === 'courses' ? (
            /* Training Courses Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coursesData.map((course: TrainingCourse) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.location}</div>
          </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(course.department)}`}>
                          {course.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.instructor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(course.type)}`}>
                          {course.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.enrolled}/{course.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewCourse(course)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                      </button>
                          <button
                            onClick={() => handleEditCourse(course)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                      </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
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
            /* Enrollments Table */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollmentsData.map((enrollment: TrainingEnrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {enrollment.employeeName?.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{enrollment.employeeName}</div>
                            <div className="text-sm text-gray-500">{enrollment.department}</div>
          </div>
        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.courseTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(enrollment.department)}`}>
                          {enrollment.department}
                      </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                          {enrollment.status}
                      </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{enrollment.progress}%</span>
                    </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewCourse(enrollment as any)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditCourse(enrollment as any)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEnrollment(enrollment.id)}
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
          {((activeTab === 'courses' && coursesTotalPages > 1) || 
            (activeTab === 'enrollments' && enrollmentsTotalPages > 1)) && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing {((activeTab === 'courses' ? coursesCurrentPage : enrollmentsCurrentPage) - 1) * 10 + 1} to {Math.min((activeTab === 'courses' ? coursesCurrentPage : enrollmentsCurrentPage) * 10, activeTab === 'courses' ? coursesTotal : enrollmentsTotal)} of {activeTab === 'courses' ? coursesTotal : enrollmentsTotal} results
            </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange((activeTab === 'courses' ? coursesCurrentPage : enrollmentsCurrentPage) - 1)}
                  disabled={(activeTab === 'courses' ? coursesCurrentPage : enrollmentsCurrentPage) === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange((activeTab === 'courses' ? coursesCurrentPage : enrollmentsCurrentPage) + 1)}
                  disabled={(activeTab === 'courses' ? coursesCurrentPage : enrollmentsCurrentPage) === (activeTab === 'courses' ? coursesTotalPages : enrollmentsTotalPages)}
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
        isOpen={showAddCourseModal || showEditCourseModal || showViewCourseModal}
        onClose={() => {
          setShowAddCourseModal(false);
          setShowEditCourseModal(false);
          setShowViewCourseModal(false);
        }}
        title={selectedCourse ? (selectedCourse.id ? 'Edit Training Course' : 'Add Training Course') : 'Training Course Details'}
        size="xl"
      >
        {selectedCourse ? (
          <TrainingCourseForm
            course={selectedCourse}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <TrainingCourseForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Training;
