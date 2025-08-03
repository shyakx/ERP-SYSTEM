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
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Shield,
  Building,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const EmployeeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock Rwandan employee data
  const employees = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'jean.uwimana@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-01-15',
      salary: 'RWF 450,000',
      performance: 'Excellent',
      supervisor: 'Emmanuel Ndayisaba'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      department: 'Human Resources',
      location: 'Kigali, Rwanda',
      phone: '+250 789 234 567',
      email: 'marie.niyonsaba@dicel.co.rw',
      status: 'Active',
      hireDate: '2022-08-20',
      salary: 'RWF 850,000',
      performance: 'Outstanding',
      supervisor: 'Director'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      department: 'Field Operations',
      location: 'Huye, Rwanda',
      phone: '+250 787 345 678',
      email: 'emmanuel.ndayisaba@dicel.co.rw',
      status: 'Active',
      hireDate: '2022-11-10',
      salary: 'RWF 600,000',
      performance: 'Good',
      supervisor: 'Regional Manager'
    },
    {
      id: 4,
      name: 'Ange Uwineza',
      position: 'Finance Officer',
      department: 'Finance',
      location: 'Kigali, Rwanda',
      phone: '+250 786 456 789',
      email: 'ange.uwineza@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-03-05',
      salary: 'RWF 700,000',
      performance: 'Excellent',
      supervisor: 'Finance Manager'
    },
    {
      id: 5,
      name: 'Patrick Nshimiyimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Musanze, Rwanda',
      phone: '+250 785 567 890',
      email: 'patrick.nshimiyimana@dicel.co.rw',
      status: 'On Leave',
      hireDate: '2023-06-12',
      salary: 'RWF 450,000',
      performance: 'Good',
      supervisor: 'Emmanuel Ndayisaba'
    },
    {
      id: 6,
      name: 'Chantal Mukamana',
      position: 'Compliance Officer',
      department: 'Compliance',
      location: 'Kigali, Rwanda',
      phone: '+250 784 678 901',
      email: 'chantal.mukamana@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-04-18',
      salary: 'RWF 650,000',
      performance: 'Excellent',
      supervisor: 'Compliance Manager'
    },
    {
      id: 7,
      name: 'Alexis Nkurunziza',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Rubavu, Rwanda',
      phone: '+250 783 789 012',
      email: 'alexis.nkurunziza@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-07-22',
      salary: 'RWF 450,000',
      performance: 'Good',
      supervisor: 'Local Supervisor'
    },
    {
      id: 8,
      name: 'Grace Uwamahoro',
      position: 'Customer Service Rep',
      department: 'Customer Experience',
      location: 'Kigali, Rwanda',
      phone: '+250 782 890 123',
      email: 'grace.uwamahoro@dicel.co.rw',
      status: 'Active',
      hireDate: '2023-05-30',
      salary: 'RWF 500,000',
      performance: 'Excellent',
      supervisor: 'CX Manager'
    }
  ];

  const departments = [
    { name: 'Field Operations', count: 45, color: 'bg-blue-100 text-blue-800' },
    { name: 'Human Resources', count: 8, color: 'bg-purple-100 text-purple-800' },
    { name: 'Finance', count: 12, color: 'bg-green-100 text-green-800' },
    { name: 'Compliance', count: 6, color: 'bg-red-100 text-red-800' },
    { name: 'Customer Experience', count: 15, color: 'bg-cyan-100 text-cyan-800' },
    { name: 'IT Department', count: 10, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-2">Manage all employees across Dicel Security Company</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">127</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Guards</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
              <p className="text-sm text-orange-600 mt-1">-2 from last week</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
              <p className="text-sm text-blue-600 mt-1">All operational</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.name} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredEmployees.length} of {employees.length} employees</span>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                        <div className="text-xs text-gray-400">Hired: {employee.hireDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {employee.department}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{employee.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.email}</div>
                    <div className="text-sm text-gray-500">{employee.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        employee.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                        employee.performance === 'Outstanding' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {employee.performance}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{employee.salary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Department Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <div key={dept.name} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{dept.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dept.color}`}>
                  {dept.count} employees
                </span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(dept.count / 127) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
