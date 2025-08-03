import React from 'react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

const AuditCompliance: React.FC = () => {
  const colorScheme = getColorScheme('finance');

  const complianceStats = [
    { title: 'Compliance Score', value: '95%', subtitle: 'Overall', color: 'green', icon: '✅', trend: { value: '+2%', isPositive: true }, delay: 0 },
    { title: 'Audit Findings', value: '3', subtitle: 'Open Issues', color: 'orange', icon: '⚠️', trend: { value: '-1', isPositive: true }, delay: 100 },
    { title: 'Risk Level', value: 'Low', subtitle: 'Current', color: 'blue', icon: '🛡️', trend: { value: 'Stable', isPositive: true }, delay: 200 },
    { title: 'Last Audit', value: '2 months', subtitle: 'Ago', color: 'purple', icon: '📅', trend: { value: 'On Track', isPositive: true }, delay: 300 }
  ];

  const auditFindings = [
    {
      id: 1,
      title: 'Documentation Gap',
      severity: 'Medium',
      department: 'Finance',
      status: 'In Progress',
      dueDate: '2024-03-15',
      description: 'Missing documentation for Q4 transactions'
    },
    {
      id: 2,
      title: 'Policy Update Required',
      severity: 'Low',
      department: 'HR',
      status: 'Pending',
      dueDate: '2024-03-30',
      description: 'Update employee expense policy'
    },
    {
      id: 3,
      title: 'System Access Review',
      severity: 'High',
      department: 'IT',
      status: 'Completed',
      dueDate: '2024-02-28',
      description: 'Review user access permissions'
    }
  ];

  const complianceAreas = [
    { name: 'Financial Reporting', score: 98, status: 'Compliant', color: 'green' },
    { name: 'Tax Compliance', score: 95, status: 'Compliant', color: 'green' },
    { name: 'Internal Controls', score: 92, status: 'Compliant', color: 'green' },
    { name: 'Data Protection', score: 88, status: 'Needs Attention', color: 'yellow' },
    { name: 'Regulatory Compliance', score: 96, status: 'Compliant', color: 'green' },
    { name: 'Risk Management', score: 90, status: 'Compliant', color: 'green' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Compliance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceStats.map((stat, index) => (
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

      {/* Audit Findings */}
      <AnimatedCard
        title="Audit Findings"
        subtitle="Current audit issues and status"
        color="orange"
        icon="📋"
        delay={400}
      >
        <div className="space-y-3">
          {auditFindings.map((finding, index) => (
            <div
              key={finding.id}
              className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{finding.title}</h4>
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(finding.severity)}`}>
                    {finding.severity}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(finding.status)}`}>
                    {finding.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Department: {finding.department}</span>
                <span>Due: {finding.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Compliance Areas */}
      <AnimatedCard
        title="Compliance Areas"
        subtitle="Compliance status by area"
        color="blue"
        icon="📊"
        delay={600}
      >
        <div className="space-y-3">
          {complianceAreas.map((area, index) => (
            <div key={area.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-${area.color}-500`}></div>
                <div>
                  <span className="text-sm font-medium text-gray-700">{area.name}</span>
                  <div className="text-xs text-gray-500">{area.status}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{area.score}%</div>
                <AnimatedProgressBar progress={area.score} color={area.color} height={4} />
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Compliance and audit tasks"
        color="green"
        icon="⚡"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Schedule audit')}
          >
            📅 Schedule Audit
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            📊 Generate Report
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Review compliance')}
          >
            👁️ Review Compliance
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Risk assessment')}
          >
            🛡️ Risk Assessment
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AuditCompliance; 