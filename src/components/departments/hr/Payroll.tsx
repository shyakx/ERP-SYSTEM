import React from 'react';

const Payroll: React.FC = () => {
  const payrollData = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      basicSalary: 450000,
      allowances: 50000,
      deductions: 45000,
      netSalary: 455000,
      status: 'Paid',
      paymentDate: '2024-01-31',
      bankAccount: 'BK 1234567890'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Manager',
      basicSalary: 1200000,
      allowances: 150000,
      deductions: 120000,
      netSalary: 1230000,
      status: 'Paid',
      paymentDate: '2024-01-31',
      bankAccount: 'BK 2345678901'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Security Supervisor',
      basicSalary: 650000,
      allowances: 75000,
      deductions: 65000,
      netSalary: 660000,
      status: 'Paid',
      paymentDate: '2024-01-31',
      bankAccount: 'BK 3456789012'
    },
    {
      id: 4,
      name: 'Alice Mukamana',
      position: 'Finance Officer',
      basicSalary: 800000,
      allowances: 100000,
      deductions: 80000,
      netSalary: 820000,
      status: 'Paid',
      paymentDate: '2024-01-31',
      bankAccount: 'BK 4567890123'
    },
    {
      id: 5,
      name: 'Patrick Nshimiyimana',
      position: 'Security Guard',
      basicSalary: 450000,
      allowances: 50000,
      deductions: 45000,
      netSalary: 455000,
      status: 'Pending',
      paymentDate: '2024-02-01',
      bankAccount: 'BK 5678901234'
    },
    {
      id: 6,
      name: 'Grace Uwamahoro',
      position: 'Customer Service Rep',
      basicSalary: 550000,
      allowances: 60000,
      deductions: 55000,
      netSalary: 555000,
      status: 'Pending',
      paymentDate: '2024-02-01',
      bankAccount: 'BK 6789012345'
    }
  ];

  const payrollSummary = {
    totalEmployees: 127,
    totalBasicSalary: 85000000,
    totalAllowances: 8500000,
    totalDeductions: 8500000,
    totalNetSalary: 85000000,
    paidEmployees: 125,
    pendingEmployees: 2
  };

  const taxRates = [
    { bracket: '0 - 360,000', rate: '0%', description: 'Tax free' },
    { bracket: '360,001 - 1,200,000', rate: '20%', description: 'Basic rate' },
    { bracket: '1,200,001+', rate: '30%', description: 'Higher rate' }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Payroll Management</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Total Payroll</h3>
            <p className="text-2xl sm:text-3xl font-bold">RWF 85M</p>
            <p className="text-xs sm:text-sm opacity-90">This month</p>
          </div>
          
          <div className="bg-green-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Paid Employees</h3>
            <p className="text-2xl sm:text-3xl font-bold">125</p>
            <p className="text-xs sm:text-sm opacity-90">98.4% processed</p>
          </div>
          
          <div className="bg-yellow-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Pending Payments</h3>
            <p className="text-2xl sm:text-3xl font-bold">2</p>
            <p className="text-xs sm:text-sm opacity-90">Awaiting approval</p>
          </div>
          
          <div className="bg-purple-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Average Salary</h3>
            <p className="text-2xl sm:text-3xl font-bold">RWF 669K</p>
            <p className="text-xs sm:text-sm opacity-90">Per employee</p>
          </div>
        </div>

        {/* Payroll Summary */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Payroll Summary - January 2024</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Basic Salary</h3>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">RWF 85M</p>
              <p className="text-xs sm:text-sm text-gray-600">Total basic salaries</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Allowances</h3>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">RWF 8.5M</p>
              <p className="text-xs sm:text-sm text-gray-600">Housing, transport, etc.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Deductions</h3>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">RWF 8.5M</p>
              <p className="text-xs sm:text-sm text-gray-600">Tax, insurance, etc.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Net Pay</h3>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">RWF 85M</p>
              <p className="text-xs sm:text-sm text-gray-600">Total net salaries</p>
            </div>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Employee Payroll Details</h2>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                    <th className="hidden xl:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                    <th className="hidden xl:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollData.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs sm:text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.basicSalary}</td>
                      <td className="hidden xl:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-green-600">+RWF {employee.allowances.toLocaleString()}</td>
                      <td className="hidden xl:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-red-600">-RWF {employee.deductions.toLocaleString()}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-gray-900">RWF {employee.netSalary.toLocaleString()}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          employee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-2 sm:mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Process</button>
                        <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">Payslip</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Rwanda Tax Rates</h2>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income Bracket</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {taxRates.map((tax, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{tax.bracket}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{tax.rate}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{tax.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Process Payroll</h3>
              <p className="text-xs sm:text-sm opacity-90">Generate monthly payroll</p>
            </button>
            
            <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Generate Payslips</h3>
              <p className="text-xs sm:text-sm opacity-90">Create employee payslips</p>
            </button>
            
            <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Payroll Report</h3>
              <p className="text-xs sm:text-sm opacity-90">Export payroll data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll; 