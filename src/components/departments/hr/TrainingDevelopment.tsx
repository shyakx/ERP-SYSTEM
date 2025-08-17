import React from 'react';

const TrainingDevelopment: React.FC = () => {
  // Empty training programs array - no mock data
  const trainingPrograms: any[] = [];

  // Empty enrolled employees array - no mock data
  const enrolledEmployees: any[] = [];

  const certifications = [
    {
      id: 1,
      name: 'Security Guard License',
      issuingAuthority: 'Rwanda National Police',
      validUntil: '2025-12-31',
      status: 'Valid'
    },
    {
      id: 2,
      name: 'First Aid Certification',
      issuingAuthority: 'Rwanda Red Cross',
      validUntil: '2024-12-31',
      status: 'Valid'
    },
    {
      id: 3,
      name: 'Fire Safety Training',
      issuingAuthority: 'Rwanda Fire Brigade',
      validUntil: '2025-06-30',
      status: 'Valid'
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Training & Development</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Active Programs</h3>
            <p className="text-2xl sm:text-3xl font-bold">4</p>
            <p className="text-xs sm:text-sm opacity-90">Training courses</p>
          </div>
          
          <div className="bg-green-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Enrolled Employees</h3>
            <p className="text-2xl sm:text-3xl font-bold">55</p>
            <p className="text-xs sm:text-sm opacity-90">This month</p>
          </div>
          
          <div className="bg-yellow-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Completion Rate</h3>
            <p className="text-2xl sm:text-3xl font-bold">87%</p>
            <p className="text-xs sm:text-sm opacity-90">Last quarter</p>
          </div>
          
          <div className="bg-purple-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Certifications</h3>
            <p className="text-2xl sm:text-3xl font-bold">127</p>
            <p className="text-xs sm:text-sm opacity-90">Active certifications</p>
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Active Training Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {trainingPrograms.map((program) => (
              <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{program.title}</h3>
                    <p className="text-sm text-gray-600">Instructor: {program.instructor}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {program.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Duration:</span> {program.duration}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Location:</span> {program.location}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Enrolled:</span> {program.enrolled}/{program.maxCapacity}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Start Date:</span> {program.startDate}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Cost:</span> {program.cost}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(program.enrolled / program.maxCapacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                  <button className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-600 transition-colors">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Progress */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Employee Training Progress</h2>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrolledEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs sm:text-sm">
                              {employee.name.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.program}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${employee.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-900">{employee.progress}%</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          employee.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{employee.startDate}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-2 sm:mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 transition-colors duration-200">Certificate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Available Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {cert.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Issuing Authority:</span> {cert.issuingAuthority}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Valid Until:</span> {cert.validUntil}</p>
                </div>
                <button className="w-full bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors">
                  Apply for Certification
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Create Training Program</h3>
              <p className="text-xs sm:text-sm opacity-90">Design new training course</p>
            </button>
            
            <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Enroll Employees</h3>
              <p className="text-xs sm:text-sm opacity-90">Register for training</p>
            </button>
            
            <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Generate Report</h3>
              <p className="text-xs sm:text-sm opacity-90">Training analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDevelopment; 