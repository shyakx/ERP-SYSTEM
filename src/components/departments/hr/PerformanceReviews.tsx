import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const PerformanceReviews: React.FC = () => {
  const colorScheme = getColorScheme('hr');

  const performanceData = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      location: 'Kigali',
      rating: 4.5,
      status: 'Completed',
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      strengths: ['Reliability', 'Teamwork', 'Communication'],
      areas: ['Technical Skills', 'Leadership'],
      avatar: 'JP'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Assistant',
      location: 'Kigali',
      rating: 4.8,
      status: 'In Progress',
      lastReview: '2024-01-20',
      nextReview: '2024-04-20',
      strengths: ['Organization', 'Communication', 'Problem Solving'],
      areas: ['Strategic Thinking'],
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Senior Guard',
      location: 'Huye',
      rating: 4.2,
      status: 'Pending',
      lastReview: '2023-12-10',
      nextReview: '2024-03-10',
      strengths: ['Leadership', 'Experience', 'Mentoring'],
      areas: ['Technology Adoption', 'Documentation'],
      avatar: 'EN'
    },
    {
      id: 4,
      name: 'Grace Uwamahoro',
      position: 'Training Coordinator',
      location: 'Kigali',
      rating: 4.7,
      status: 'Completed',
      lastReview: '2024-01-25',
      nextReview: '2024-04-25',
      strengths: ['Training Skills', 'Innovation', 'Results'],
      areas: ['Budget Management'],
      avatar: 'GU'
    },
    {
      id: 5,
      name: 'Patrick Nkurunziza',
      position: 'Security Supervisor',
      location: 'Musanze',
      rating: 4.0,
      status: 'Scheduled',
      lastReview: '2023-11-15',
      nextReview: '2024-02-15',
      strengths: ['Supervision', 'Safety Protocols'],
      areas: ['Conflict Resolution', 'Technology'],
      avatar: 'PN'
    }
  ];

  const reviewStats = [
    { title: 'Total Reviews', value: 156, subtitle: 'This Quarter', color: 'blue', icon: '📊', trend: { value: '+12%', isPositive: true }, delay: 0 },
    { title: 'Average Rating', value: 4.3, subtitle: 'Out of 5.0', color: 'green', icon: '⭐', trend: { value: '+0.2', isPositive: true }, delay: 100 },
    { title: 'Completed', value: 89, subtitle: 'Reviews Done', color: 'purple', icon: '✅', trend: { value: '57%', isPositive: true }, delay: 200 },
    { title: 'Pending', value: 67, subtitle: 'Awaiting Review', color: 'orange', icon: '⏳', trend: { value: '43%', isPositive: false }, delay: 300 }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviewStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Reviews Table */}
      <AnimatedCard
        title="Performance Reviews"
        subtitle="Employee performance evaluation and feedback"
        color="blue"
        icon="📊"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Position</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Next Review</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {performanceData.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-xs">{employee.avatar}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="text-sm text-gray-900">{employee.position}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className={`text-sm font-semibold ${getRatingColor(employee.rating)}`}>
                        {employee.rating}
                      </span>
                      <div className="ml-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${i < Math.floor(employee.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-900">{employee.nextReview}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <AnimatedButton
                        color="blue"
                        size="sm"
                        onClick={() => console.log(`View review for ${employee.name}`)}
                      >
                        View
                      </AnimatedButton>
                      <AnimatedButton
                        color="green"
                        size="sm"
                        onClick={() => console.log(`Edit review for ${employee.name}`)}
                      >
                        Edit
                      </AnimatedButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Review Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Recent Reviews"
          subtitle="Latest performance evaluations"
          color="green"
          icon="📝"
          delay={600}
        >
          <div className="space-y-3">
            {performanceData.slice(0, 3).map((employee, index) => (
              <div
                key={employee.id}
                className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{employee.name}</h4>
                  <span className={`text-xs font-semibold ${getRatingColor(employee.rating)}`}>
                    {employee.rating}/5.0
                  </span>
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="text-xs font-medium text-gray-600">Strengths:</span>
                    <p className="text-xs text-gray-700">{employee.strengths.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-600">Areas for Improvement:</span>
                    <p className="text-xs text-gray-700">{employee.areas.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Review Schedule"
          subtitle="Upcoming performance reviews"
          color="purple"
          icon="📅"
          delay={800}
        >
          <div className="space-y-3">
            {performanceData.filter(e => e.status === 'Scheduled' || e.status === 'Pending').map((employee, index) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-xs">{employee.avatar}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-600">Next Review</p>
                  <p className="text-xs text-gray-900">{employee.nextReview}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Performance Metrics */}
      <AnimatedCard
        title="Performance Metrics"
        subtitle="Department performance overview"
        color="indigo"
        icon="📈"
        delay={1000}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Average Rating</span>
              <span className="text-xs font-semibold text-gray-900">4.3/5.0</span>
            </div>
            <AnimatedProgressBar progress={86} color="green" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Review Completion</span>
              <span className="text-xs font-semibold text-gray-900">57%</span>
            </div>
            <AnimatedProgressBar progress={57} color="blue" height={6} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">On-Time Reviews</span>
              <span className="text-xs font-semibold text-gray-900">92%</span>
            </div>
            <AnimatedProgressBar progress={92} color="purple" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Employee Satisfaction</span>
              <span className="text-xs font-semibold text-gray-900">88%</span>
            </div>
            <AnimatedProgressBar progress={88} color="orange" height={6} />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default PerformanceReviews; 