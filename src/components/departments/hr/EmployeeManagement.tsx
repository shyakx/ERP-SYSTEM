import React from 'react';

const EmployeeManagement: React.FC = () => {
  const employees = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      location: 'Kigali, Rwanda',
      status: 'Active',
      department: 'Operations',
      hireDate: '2023-03-15',
      salary: 'RWF 450,000',
      contact: '+250 788 123 456'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      location: 'Kigali, Rwanda',
      status: 'Active',
      department: 'Human Resources',
      hireDate: '2022-08-20',
      salary: 'RWF 1,200,000',
      contact: '+250 789 234 567'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      location: 'Huye, Rwanda',
      status: 'Active',
      department: 'Operations',
      hireDate: '2022-11-10',
      salary: 'RWF 650,000',
      contact: '+250 787 345 678'
    },
    {
      id: 4,
      name: 'Alice Mukamana',
      position: 'Finance Officer',
      location: 'Kigali, Rwanda',
      status: 'Active',
      department: 'Finance',
      hireDate: '2023-01-05',
      salary: 'RWF 800,000',
      contact: '+250 786 456 789'
    },
    {
      id: 5,
      name: 'Patrick Nshimiyimana',
      position: 'Security Guard',
      location: 'Musanze, Rwanda',
      status: 'Active',
      department: 'Operations',
      hireDate: '2023-06-12',
      salary: 'RWF 450,000',
      contact: '+250 785 567 890'
    },
    {
      id: 6,
      name: 'Grace Uwamahoro',
      position: 'Customer Service Rep',
      location: 'Kigali, Rwanda',
      status: 'Active',
      department: 'Customer Experience',
      hireDate: '2023-04-18',
      salary: 'RWF 550,000',
      contact: '+250 784 678 901'
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Employee Management</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Total Employees</h3>
            <p className="text-2xl sm:text-3xl font-bold">127</p>
            <p className="text-xs sm:text-sm opacity-90">+12% from last month</p>
          </div>
          
          <div className="bg-green-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Active Employees</h3>
            <p className="text-2xl sm:text-3xl font-bold">125</p>
            <p className="text-xs sm:text-sm opacity-90">98.4% retention rate</p>
          </div>
          
          <div className="bg-yellow-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">On Leave</h3>
            <p className="text-2xl sm:text-3xl font-bold">2</p>
            <p className="text-xs sm:text-sm opacity-90">1.6% of workforce</p>
          </div>
          
          <div className="bg-purple-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">New This Month</h3>
            <p className="text-2xl sm:text-3xl font-bold">15</p>
            <p className="text-xs sm:text-sm opacity-90">Expansion hires</p>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Employee Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                  <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee, index) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{employee.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.position}</td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.location}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {employee.status}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.department}</td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.hireDate}</td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.salary}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-2 sm:mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Add New Employee</h3>
              <p className="text-xs sm:text-sm opacity-90">Register a new team member</p>
            </button>
            
            <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Generate Report</h3>
              <p className="text-xs sm:text-sm opacity-90">Export employee data</p>
            </button>
            
            <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Bulk Update</h3>
              <p className="text-xs sm:text-sm opacity-90">Update multiple records</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement; 