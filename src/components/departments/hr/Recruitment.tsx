import React from 'react';

const Recruitment: React.FC = () => {
  // Empty job openings array - no mock data
  const jobOpenings: any[] = [];

  // Empty candidates array - no mock data
  const candidates: any[] = [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Interview Completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Recruitment</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Active Jobs</h3>
            <p className="text-2xl sm:text-3xl font-bold">4</p>
            <p className="text-xs sm:text-sm opacity-90">Open positions</p>
          </div>
          
          <div className="bg-green-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Total Applications</h3>
            <p className="text-2xl sm:text-3xl font-bold">85</p>
            <p className="text-xs sm:text-sm opacity-90">This month</p>
          </div>
          
          <div className="bg-yellow-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Interviews Scheduled</h3>
            <p className="text-2xl sm:text-3xl font-bold">12</p>
            <p className="text-xs sm:text-sm opacity-90">This week</p>
          </div>
          
          <div className="bg-purple-500 text-white p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold">Hired This Month</h3>
            <p className="text-2xl sm:text-3xl font-bold">8</p>
            <p className="text-xs sm:text-sm opacity-90">New team members</p>
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Active Job Openings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {job.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Department:</span> {job.department}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Type:</span> {job.type}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Salary:</span> {job.salary}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Applications:</span> {job.applications}</p>
                  <p className="text-xs sm:text-sm text-gray-600"><span className="font-medium">Posted:</span> {job.postedDate}</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition-colors">
                    View Applications
                  </button>
                  <button className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-600 transition-colors">
                    Edit Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recent Candidates</h2>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-xs sm:text-sm">
                              {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{candidate.email}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{candidate.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{candidate.position}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          candidate.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                          candidate.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                          candidate.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{candidate.experience}</td>
                      <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{candidate.appliedDate}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-2 sm:mr-3">View</button>
                        <button className="text-green-600 hover:text-green-900 transition-colors duration-200 mr-2 sm:mr-3">Schedule</button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">Reject</button>
                      </td>
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
              <h3 className="font-semibold text-sm sm:text-base">Post New Job</h3>
              <p className="text-xs sm:text-sm opacity-90">Create a new job opening</p>
            </button>
            
            <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Schedule Interviews</h3>
              <p className="text-xs sm:text-sm opacity-90">Book interview slots</p>
            </button>
            
            <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base">Generate Report</h3>
              <p className="text-xs sm:text-sm opacity-90">Export recruitment data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment; 