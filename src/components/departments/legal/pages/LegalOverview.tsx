import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { 
  Scale, 
  FileText, 
  Gavel, 
  Shield,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Activity
} from 'lucide-react';

interface LegalOverviewData {
  totalCases: number;
  activeCases: number;
  pendingContracts: number;
  complianceItems: number;
  upcomingDeadlines: number;
  totalLegalValue: number;
  riskLevel: 'low' | 'medium' | 'high';
  complianceScore: number;
}

const LegalOverview: React.FC = () => {
  const [data] = useState<LegalOverviewData>({
    totalCases: 25,
    activeCases: 8,
    pendingContracts: 12,
    complianceItems: 15,
    upcomingDeadlines: 5,
    totalLegalValue: 50000000,
    riskLevel: 'medium',
    complianceScore: 85
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'contract',
      description: 'New service agreement signed with ABC Corporation',
      timestamp: '2 hours ago',
      status: 'completed',
      value: 5000000
    },
    {
      id: 2,
      type: 'compliance',
      description: 'Data protection compliance review completed',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'litigation',
      description: 'Employment dispute case filed',
      timestamp: '2 days ago',
      status: 'active'
    },
    {
      id: 4,
      type: 'policy',
      description: 'Updated privacy policy published',
      timestamp: '3 days ago',
      status: 'completed'
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'compliance': return <Shield className="w-4 h-4 text-green-600" />;
      case 'litigation': return <Gavel className="w-4 h-4 text-red-600" />;
      case 'policy': return <Scale className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'compliance': return 'bg-green-100 text-green-800';
      case 'litigation': return 'bg-red-100 text-red-800';
      case 'policy': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Legal Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedCard
          title="Total Legal Cases"
          subtitle="All legal matters"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.totalCases}</p>
              <p className="text-sm text-gray-500">Total cases</p>
            </div>
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Active Cases"
          subtitle="Currently active"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.activeCases}</p>
              <p className="text-sm text-gray-500">Active cases</p>
            </div>
            <Gavel className="w-8 h-8 text-green-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Pending Contracts"
          subtitle="Awaiting review"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.pendingContracts}</p>
              <p className="text-sm text-gray-500">Pending contracts</p>
            </div>
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Compliance Score"
          subtitle="Overall compliance"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{data.complianceScore}%</p>
              <p className="text-sm text-gray-500">Compliance rate</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </AnimatedCard>
      </div>

      {/* Legal Value and Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard
          title="Legal Portfolio Value"
          subtitle="Total value of legal matters"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(data.totalLegalValue)}
              </span>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Cases</span>
                <span>{formatCurrency(data.totalLegalValue * 0.6)}</span>
              </div>
              <AnimatedProgressBar progress={60} color="blue" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>Pending Contracts</span>
                <span>{formatCurrency(data.totalLegalValue * 0.4)}</span>
              </div>
              <AnimatedProgressBar progress={40} color="green" height={6} showLabel={false} />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard
          title="Risk Assessment"
          subtitle="Current legal risk level"
          className="bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getRiskColor(data.riskLevel)}`}>
                {data.riskLevel.toUpperCase()}
              </span>
              <AlertTriangle className={`w-8 h-8 ${getRiskColor(data.riskLevel)}`} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Compliance Risk</span>
                <span>Low</span>
              </div>
              <AnimatedProgressBar progress={20} color="green" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>Contract Risk</span>
                <span>Medium</span>
              </div>
              <AnimatedProgressBar progress={60} color="yellow" height={6} showLabel={false} />
              <div className="flex justify-between text-sm">
                <span>Litigation Risk</span>
                <span>Low</span>
              </div>
              <AnimatedProgressBar progress={30} color="green" height={6} showLabel={false} />
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Upcoming Deadlines */}
      <AnimatedCard
        title="Upcoming Deadlines"
        subtitle="Critical legal deadlines"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Data Protection Compliance Review</p>
                <p className="text-sm text-gray-500">Due: January 30, 2024</p>
              </div>
            </div>
            <span className="text-red-600 font-semibold">3 days</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Employment Contract Renewal</p>
                <p className="text-sm text-gray-500">Due: February 5, 2024</p>
              </div>
            </div>
            <span className="text-yellow-600 font-semibold">9 days</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Service Agreement Review</p>
                <p className="text-sm text-gray-500">Due: February 10, 2024</p>
              </div>
            </div>
            <span className="text-blue-600 font-semibold">14 days</span>
          </div>
        </div>
      </AnimatedCard>

      {/* Recent Activity */}
      <AnimatedCard
        title="Recent Legal Activity"
        subtitle="Latest legal updates and activities"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                  {activity.status}
                </span>
                {activity.value && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatCurrency(activity.value)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common legal tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">New Contract</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Compliance Check</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Risk Assessment</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Legal Report</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default LegalOverview;
