import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';

// Sales marketing Department Pages
import SalesOverview from './pages/SalesOverview';
import LeadManagement from './pages/LeadManagement';
import SalesPipeline from './pages/SalesPipeline';
import Campaigns from './pages/Campaigns';
import Opportunities from './pages/Opportunities';
import Quotes from './pages/Quotes';
import Analytics from './pages/Analytics';

const SalesmarketingDashboard: React.FC = () => {
  const colorScheme = getColorScheme('sales');
  const location = useLocation();

  const salesStats = [
    { title: 'Total Revenue', value: '156.8M RWF', subtitle: 'This Quarter', color: 'blue', icon: '💰', trend: { value: '+18%', isPositive: true }, delay: 0 },
    { title: 'Active Leads', value: '234', subtitle: 'In Pipeline', color: 'green', icon: '🎯', trend: { value: '+12', isPositive: true }, delay: 100 },
    { title: 'Conversion Rate', value: '23.5%', subtitle: 'This Month', color: 'purple', icon: '📈', trend: { value: '+2.1%', isPositive: true }, delay: 200 },
    { title: 'Campaigns', value: '8', subtitle: 'Active', color: 'orange', icon: '📢', trend: { value: '+3', isPositive: true }, delay: 300 }
  ];

  const recentLeads = [
    {
      id: 1,
      name: 'Kigali Business Center',
      value: '25M RWF',
      status: 'Qualified',
      source: 'Website',
      date: '2024-02-15'
    },
    {
      id: 2,
      name: 'ABC Corporation',
      value: '18M RWF',
      status: 'Prospecting',
      source: 'Referral',
      date: '2024-02-14'
    },
    {
      id: 3,
      name: 'Tech Solutions Ltd',
      value: '32M RWF',
      status: 'Negotiation',
      source: 'Cold Call',
      date: '2024-02-13'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/sales', icon: '🏠' },
    { name: 'Overview', path: '/sales/overview', icon: '📊' },
    { name: 'Lead Management', path: '/sales/leads', icon: '🎯' },
    { name: 'Sales Pipeline', path: '/sales/pipeline', icon: '📈' },
    { name: 'Opportunities', path: '/sales/opportunities', icon: '💼' },
    { name: 'Quotes & Proposals', path: '/sales/quotes', icon: '📋' },
    { name: 'Marketing Campaigns', path: '/sales/campaigns', icon: '📢' },
    { name: 'Analytics & Reports', path: '/sales/analytics', icon: '📊' },
    { name: 'Settings', path: '/sales/settings', icon: '⚙️' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Qualified': return 'text-green-600 bg-green-100';
      case 'Prospecting': return 'text-blue-600 bg-blue-100';
      case 'Negotiation': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Sales Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesStats.map((stat, index) => (
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

      {/* Recent Leads */}
      <AnimatedCard
        title="Recent Leads"
        subtitle="Latest sales opportunities"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🎯</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.source} • {lead.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{lead.date}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard
        title="Quick Actions"
        subtitle="Common sales tasks"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <span className="text-blue-600">➕</span>
            <span className="text-sm font-medium text-gray-700">Add Lead</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200"
          >
            <span className="text-green-600">📊</span>
            <span className="text-sm font-medium text-gray-700">Create Quote</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
          >
            <span className="text-purple-600">📢</span>
            <span className="text-sm font-medium text-gray-700">Launch Campaign</span>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {}}
            className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
          >
            <span className="text-orange-600">📈</span>
            <span className="text-sm font-medium text-gray-700">View Analytics</span>
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Sales Overview */}
      <AnimatedCard
        title="Sales Performance"
        subtitle="Key performance indicators"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Revenue Growth</h4>
            <AnimatedProgressBar
              progress={78}
              color="blue"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={85}
              color="green"
              height={8}
              showLabel={true}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Lead Conversion</h4>
            <AnimatedProgressBar
              progress={65}
              color="purple"
              height={8}
              showLabel={true}
            />
            <AnimatedProgressBar
              progress={72}
              color="orange"
              height={8}
              showLabel={true}
            />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/sales':
        return <DashboardContent />;
      case '/sales/overview':
        return <SalesOverview />;
      case '/sales/leads':
        return <LeadManagement />;
      case '/sales/pipeline':
        return <SalesPipeline />;
      case '/sales/opportunities':
        return <Opportunities />;
      case '/sales/quotes':
        return <Quotes />;
      case '/sales/campaigns':
        return <Campaigns />;
      case '/sales/analytics':
        return <Analytics />;
      case '/sales/settings':
        return <SalesOverview />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Sales & Marketing Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DepartmentLayout>
  );
};

export default SalesmarketingDashboard;
