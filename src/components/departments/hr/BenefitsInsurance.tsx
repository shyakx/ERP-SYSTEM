import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const BenefitsInsurance: React.FC = () => {
  const colorScheme = getColorScheme('hr');

  const benefitsData = [
    {
      id: 1,
      name: 'Jean Pierre Uwimana',
      position: 'Security Guard',
      healthInsurance: 'Active',
      lifeInsurance: 'Active',
      pensionPlan: 'Active',
      dentalCoverage: 'Inactive',
      visionCoverage: 'Inactive',
      dependents: 3,
      avatar: 'JP'
    },
    {
      id: 2,
      name: 'Marie Claire Niyonsaba',
      position: 'HR Assistant',
      healthInsurance: 'Active',
      lifeInsurance: 'Active',
      pensionPlan: 'Active',
      dentalCoverage: 'Active',
      visionCoverage: 'Active',
      dependents: 2,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emmanuel Ndayisaba',
      position: 'Senior Guard',
      healthInsurance: 'Active',
      lifeInsurance: 'Active',
      pensionPlan: 'Active',
      dentalCoverage: 'Inactive',
      visionCoverage: 'Inactive',
      dependents: 4,
      avatar: 'EN'
    },
    {
      id: 4,
      name: 'Grace Uwamahoro',
      position: 'Training Coordinator',
      healthInsurance: 'Active',
      lifeInsurance: 'Active',
      pensionPlan: 'Active',
      dentalCoverage: 'Active',
      visionCoverage: 'Active',
      dependents: 1,
      avatar: 'GU'
    },
    {
      id: 5,
      name: 'Patrick Nkurunziza',
      position: 'Security Supervisor',
      healthInsurance: 'Active',
      lifeInsurance: 'Active',
      pensionPlan: 'Active',
      dentalCoverage: 'Inactive',
      visionCoverage: 'Inactive',
      dependents: 2,
      avatar: 'PN'
    }
  ];

  const benefitsStats = [
    { title: 'Total Enrolled', value: 156, subtitle: 'Employees', color: 'blue', icon: '👥', trend: { value: '+5%', isPositive: true }, delay: 0 },
    { title: 'Health Insurance', value: 145, subtitle: 'Active Plans', color: 'green', icon: '🏥', trend: { value: '93%', isPositive: true }, delay: 100 },
    { title: 'Life Insurance', value: 132, subtitle: 'Active Plans', color: 'purple', icon: '🛡️', trend: { value: '85%', isPositive: true }, delay: 200 },
    { title: 'Pension Plans', value: 128, subtitle: 'Active Plans', color: 'orange', icon: '💰', trend: { value: '82%', isPositive: true }, delay: 300 }
  ];

  const insurancePlans = [
    {
      name: 'Basic Health Plan',
      provider: 'RSSB',
      coverage: '80%',
      monthlyCost: '25,000 RWF',
      enrollment: 145,
      status: 'Active'
    },
    {
      name: 'Premium Health Plan',
      provider: 'RSSB',
      coverage: '95%',
      monthlyCost: '45,000 RWF',
      enrollment: 89,
      status: 'Active'
    },
    {
      name: 'Life Insurance',
      provider: 'Sonarwa',
      coverage: '2M RWF',
      monthlyCost: '15,000 RWF',
      enrollment: 132,
      status: 'Active'
    },
    {
      name: 'Dental Coverage',
      provider: 'RSSB',
      coverage: '70%',
      monthlyCost: '8,000 RWF',
      enrollment: 67,
      status: 'Active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Benefits Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefitsStats.map((stat, index) => (
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

      {/* Employee Benefits Table */}
      <AnimatedCard
        title="Employee Benefits"
        subtitle="Individual employee benefit coverage and status"
        color="blue"
        icon="🏥"
        delay={400}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">Health</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Life</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Pension</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Dependents</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {benefitsData.map((employee, index) => (
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
                        <p className="text-xs text-gray-500">{employee.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.healthInsurance)}`}>
                      {employee.healthInsurance}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.lifeInsurance)}`}>
                      {employee.lifeInsurance}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.pensionPlan)}`}>
                      {employee.pensionPlan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{employee.dependents}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <AnimatedButton
                        color="blue"
                        size="sm"
                        onClick={() => console.log(`View benefits for ${employee.name}`)}
                      >
                        View
                      </AnimatedButton>
                      <AnimatedButton
                        color="green"
                        size="sm"
                        onClick={() => console.log(`Edit benefits for ${employee.name}`)}
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

      {/* Insurance Plans and Coverage Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Insurance Plans"
          subtitle="Available insurance plans and coverage"
          color="green"
          icon="🛡️"
          delay={600}
        >
          <div className="space-y-3">
            {insurancePlans.map((plan, index) => (
              <div
                key={plan.name}
                className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{plan.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Provider</span>
                    <span className="text-gray-900">{plan.provider}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Coverage</span>
                    <span className="text-gray-900">{plan.coverage}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Monthly Cost</span>
                    <span className="text-gray-900">{plan.monthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Enrollment</span>
                    <span className="text-green-600 font-medium">{plan.enrollment} employees</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Coverage Summary"
          subtitle="Department-wide benefit coverage statistics"
          color="purple"
          icon="📊"
          delay={800}
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Health Insurance Coverage</span>
                <span className="text-xs font-semibold text-gray-900">93%</span>
              </div>
              <AnimatedProgressBar progress={93} color="green" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Life Insurance Coverage</span>
                <span className="text-xs font-semibold text-gray-900">85%</span>
              </div>
              <AnimatedProgressBar progress={85} color="blue" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Pension Plan Enrollment</span>
                <span className="text-xs font-semibold text-gray-900">82%</span>
              </div>
              <AnimatedProgressBar progress={82} color="purple" height={6} />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Dental Coverage</span>
                <span className="text-xs font-semibold text-gray-900">43%</span>
              </div>
              <AnimatedProgressBar progress={43} color="orange" height={6} />
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Benefits Policies and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatedCard
          title="Benefits Policies"
          subtitle="Company benefits policies and guidelines"
          color="indigo"
          icon="📋"
          delay={1000}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Health Insurance</h4>
              <p className="text-xs text-gray-700">Basic plan covers 80% of medical expenses, premium plan covers 95%</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Life Insurance</h4>
              <p className="text-xs text-gray-700">2 million RWF coverage for all full-time employees</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Pension Plan</h4>
              <p className="text-xs text-gray-700">5% employee contribution, 10% employer contribution</p>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Quick Actions"
          subtitle="Common benefits management tasks"
          color="orange"
          icon="⚡"
          delay={1200}
        >
          <div className="grid grid-cols-1 gap-3">
            <AnimatedButton
              color="blue"
              size="md"
              onClick={() => console.log('Enroll new employee in benefits')}
            >
              👤 Enroll Employee
            </AnimatedButton>
            <AnimatedButton
              color="green"
              size="md"
              onClick={() => console.log('Update benefit plans')}
            >
              📝 Update Plans
            </AnimatedButton>
            <AnimatedButton
              color="purple"
              size="md"
              onClick={() => console.log('Generate benefits report')}
            >
              📊 Generate Report
            </AnimatedButton>
            <AnimatedButton
              color="orange"
              size="md"
              onClick={() => console.log('Contact insurance providers')}
            >
              📞 Contact Providers
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>

      {/* Benefits Analytics */}
      <AnimatedCard
        title="Benefits Analytics"
        subtitle="Department benefits trends and insights"
        color="teal"
        icon="📈"
        delay={1400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Average Monthly Cost</span>
              <span className="text-xs font-semibold text-gray-900">35,000 RWF</span>
            </div>
            <AnimatedProgressBar progress={70} color="green" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Employee Satisfaction</span>
              <span className="text-xs font-semibold text-gray-900">94%</span>
            </div>
            <AnimatedProgressBar progress={94} color="blue" height={6} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Claims Processing Time</span>
              <span className="text-xs font-semibold text-gray-900">3.2 days</span>
            </div>
            <AnimatedProgressBar progress={85} color="purple" height={6} />
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Provider Satisfaction</span>
              <span className="text-xs font-semibold text-gray-900">88%</span>
            </div>
            <AnimatedProgressBar progress={88} color="orange" height={6} />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default BenefitsInsurance; 