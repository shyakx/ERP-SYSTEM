import React, { useState } from 'react';
import { 
  Users, 
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
  Briefcase,
  Home,
  Gift,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useApiList, useApiMutation } from '../../../../hooks/useApi';
import { employeeAPI } from '../../../../services/api';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import Modal from '../../../shared/Modal';
import EmployeeForm from '../../../forms/EmployeeForm';

interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  status: string;
  hireDate: string;
  salary: number;
  performance: string;
}

const EmployeeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Fetch employees data with API
  const { 
    items: employeesData, 
    loading, 
    error, 
    refetch, 
    filters, 
    updateFilters,
    total,
    currentPage,
    totalPages
  } = useApiList(employeeAPI.getAll, {
    page: 1,
    limit: 10,
    search: "",
    status: "all",
    department: "all"
  });

  // Delete mutation
  const deleteMutation = useApiMutation(employeeAPI.delete);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value, page: 1 });
  };

  const handleDepartmentFilter = (department: string) => {
    setFilterDepartment(department);
    updateFilters({ department, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    updateFilters({ status, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowAddModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteMutation.mutate(employeeId);
        refetch();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    refetch();
  };

  const handleFormCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const employeeStats = [
    { 
      title: 'Total Employees', 
      value: (total || 0).toString(), 
      change: '+2', 
      icon: Users, 
      color: 'text-blue-600',
      subtitle: 'Active workforce'
    },
    { 
      title: 'Active Employees', 
      value: (employeesData?.filter((emp: Employee) => emp.status === 'Active').length || 0).toString(), 
      change: '+1', 
      icon: UserCheck, 
      color: 'text-green-600',
      subtitle: 'Currently working'
    },
    { 
      title: 'On Leave', 
      value: (employeesData?.filter((emp: Employee) => emp.status === 'On Leave').length || 0).toString(), 
      change: '-1', 
      icon: Clock, 
      color: 'text-yellow-600',
      subtitle: 'Temporary absence'
    },
    { 
      title: 'New Hires', 
      value: (employeesData?.filter((emp: Employee) => {
        const hireDate = new Date(emp.hireDate);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        return hireDate > threeMonthsAgo;
      }).length || 0).toString(), 
      change: '+3', 
      icon: GraduationCap, 
      color: 'text-purple-600',
      subtitle: 'Last 3 months'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading employees</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="relative px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">Employee Management</h1>
                    <p className="text-slate-600 text-lg">Manage your team members and their information</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddEmployee}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all duration-200 shadow-lg font-medium"
              >
                <Plus className="h-5 w-5" />
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employeeStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-100 rounded-xl">
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-slate-400 text-xs">{stat.subtitle}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              </div>
          );
        })}
      </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterDepartment}
                onChange={(e) => handleDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="all">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Field Operations">Field Operations</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Employees Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {employeesData.map((employee: Employee, index: number) => (
                  <tr key={employee.id} className={`hover:bg-slate-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-slate-500">{employee.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{employee.position}</div>
                      <div className="text-sm text-slate-500">{employee.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{employee.phone}</div>
                      <div className="text-sm text-slate-500">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleViewEmployee(employee)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
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
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-700">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, total)} of {total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit/View Modals */}
        <Modal
          isOpen={showAddModal || showEditModal || showViewModal}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setShowViewModal(false);
          }}
          title={selectedEmployee ? (selectedEmployee.id ? 'Edit Employee' : 'Add Employee') : 'Employee Details'}
        >
          {selectedEmployee ? (
            <EmployeeForm
              employee={selectedEmployee}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          ) : (
            <EmployeeForm
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeManagement;

