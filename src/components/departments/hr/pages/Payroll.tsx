import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Download,
  Eye,
  Edit,
  Plus,
  MapPin,
  Building,
  Star,
  TrendingUp,
  BarChart3,
  Target,
  CreditCard,
  Receipt,
  Calculator
} from 'lucide-react';

const Payroll: React.FC = () => {
  const [filterMonth, setFilterMonth] = useState('2024-08');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock Rwandan payroll data
  const payrollRecords = [
    {
      id: 1,
      employeeName: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Kigali, Rwanda',
      basicSalary: 'RWF 450,000',
      allowances: 'RWF 50,000',
      deductions: 'RWF 45,000',
      netSalary: 'RWF 455,000',
      status: 'Paid',
      paymentDate: '2024-08-01',
      paymentMethod: 'Bank Transfer',
      accountNumber: '1234567890',
      bank: 'Bank of Kigali'
    },
    {
      id: 2,
      employeeName: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      department: 'Human Resources',
      location: 'Kigali, Rwanda',
      basicSalary: 'RWF 850,000',
      allowances: 'RWF 100,000',
      deductions: 'RWF 85,000',
      netSalary: 'RWF 865,000',
      status: 'Paid',
      paymentDate: '2024-08-01',
      paymentMethod: 'Bank Transfer',
      accountNumber: '0987654321',
      bank: 'Ecobank Rwanda'
    },
    {
      id: 3,
      employeeName: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      department: 'Field Operations',
      location: 'Huye, Rwanda',
      basicSalary: 'RWF 600,000',
      allowances: 'RWF 75,000',
      deductions: 'RWF 60,000',
      netSalary: 'RWF 615,000',
      status: 'Paid',
      paymentDate: '2024-08-01',
      paymentMethod: 'Bank Transfer',
      accountNumber: '1122334455',
      bank: 'Bank of Kigali'
    },
    {
      id: 4,
      employeeName: 'Ange Uwineza',
      position: 'Finance Officer',
      department: 'Finance',
      location: 'Kigali, Rwanda',
      basicSalary: 'RWF 700,000',
      allowances: 'RWF 80,000',
      deductions: 'RWF 70,000',
      netSalary: 'RWF 710,000',
      status: 'Paid',
      paymentDate: '2024-08-01',
      paymentMethod: 'Bank Transfer',
      accountNumber: '5566778899',
      bank: 'Ecobank Rwanda'
    },
    {
      id: 5,
      employeeName: 'Patrick Nshimiyimana',
      position: 'Security Guard',
      department: 'Field Operations',
      location: 'Musanze, Rwanda',
      basicSalary: 'RWF 450,000',
      allowances: 'RWF 50,000',
      deductions: 'RWF 45,000',
      netSalary: 'RWF 455,000',
      status: 'Pending',
      paymentDate: '2024-08-02',
      paymentMethod: 'Bank Transfer',
      accountNumber: '9988776655',
      bank: 'Bank of Kigali'
    }
  ];

  const payrollStats = [
    { title: 'Total Payroll', value: 'RWF 3.1M', change: '+5%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Employees Paid', value: '127', change: '+2', icon: Users, color: 'text-blue-600' },
    { title: 'Pending Payments', value: '5', change: '-3', icon: Clock, color: 'text-orange-600' },
    { title: 'Average Salary', value: 'RWF 550K', change: '+8%', icon: BarChart3, color: 'text-purple-600' }
  ];

  const departments = [
    { name: 'Field Operations', totalSalary: 'RWF 1.8M', employeeCount: 89 },
    { name: 'Human Resources', totalSalary: 'RWF 450K', employeeCount: 8 },
    { name: 'Finance', totalSalary: 'RWF 350K', employeeCount: 12 },
    { name: 'Compliance', totalSalary: 'RWF 200K', employeeCount: 6 },
    { name: 'Customer Experience', totalSalary: 'RWF 300K', employeeCount: 15 }
  ];

  const upcomingPayments = [
    {
      employeeName: 'Chantal Mukamana',
      position: 'Compliance Officer',
      amount: 'RWF 650,000',
      dueDate: '2024-08-02',
      status: 'Scheduled'
    },
    {
      employeeName: 'Alexis Nkurunziza',
      position: 'Security Guard',
      amount: 'RWF 450,000',
      dueDate: '2024-08-02',
      status: 'Scheduled'
    },
    {
      employeeName: 'Grace Uwamahoro',
      position: 'Customer Service Rep',
      amount: 'RWF 500,000',
      dueDate: '2024-08-02',
      status: 'Scheduled'
    }
  ];

  const filteredRecords = payrollRecords.filter(record => {
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    return matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-2">Manage employee salaries, deductions, and payments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Process Payroll</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payrollStats.map((stat, index) => (
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
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Compliance">Compliance</option>
              <option value="Customer Experience">Customer Experience</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredRecords.length} of {payrollRecords.length} records</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Records */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Payroll Records</h2>
            <p className="text-sm text-gray-600 mt-1">Employee salary and payment information</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {record.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{record.employeeName}</h3>
                          <p className="text-sm text-gray-600">{record.position} • {record.department}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {record.location}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <Building className="w-3 h-3 mr-1" />
                              {record.bank}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Basic Salary</p>
                          <p className="text-sm font-medium text-gray-900">{record.basicSalary}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Allowances</p>
                          <p className="text-sm font-medium text-green-600">{record.allowances}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Deductions</p>
                          <p className="text-sm font-medium text-red-600">{record.deductions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Net Salary</p>
                          <p className="text-sm font-bold text-gray-900">{record.netSalary}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                        <span>Payment Date: {record.paymentDate}</span>
                        <span>Method: {record.paymentMethod}</span>
                        <span>Account: {record.accountNumber}</span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                          <Receipt className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Payments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Payments</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{payment.employeeName}</h3>
                    <p className="text-sm text-gray-600">{payment.position}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-900">{payment.amount}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Due: {payment.dueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Department Breakdown</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                      <span className="text-sm text-gray-500">{dept.employeeCount} employees</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{dept.totalSalary}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(dept.employeeCount / 127) * 100}%` }}
                        ></div>
                      </div>
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
            <Calculator className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Calculate Payroll</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <CreditCard className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Process Payments</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Receipt className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Generate Payslips</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Payroll Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
