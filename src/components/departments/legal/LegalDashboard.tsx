import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentLayout from '../../shared/DepartmentLayout';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';
import { getColorScheme } from '../../../utils/colorSchemes';
import { 
  Scale, 
  FileText, 
  Gavel, 
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  Building,
  DollarSign,
  TrendingUp,
  Eye,
  Plus
} from 'lucide-react';

// Legal Department Pages
import LegalOverview from './pages/LegalOverview';
import ContractManagement from './pages/ContractManagement';
import ComplianceManagement from './pages/ComplianceManagement';
import LegalDocuments from './pages/LegalDocuments';
import RiskManagement from './pages/RiskManagement';
import LegalReports from './pages/LegalReports';
import LegalSettings from './pages/LegalSettings';

interface LegalCase {
  id: string;
  title: string;
  type: 'contract' | 'litigation' | 'compliance' | 'regulatory';
  status: 'active' | 'pending' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  dueDate: string;
  value?: number;
}

interface LegalDocument {
  id: string;
  name: string;
  type: 'contract' | 'policy' | 'agreement' | 'certificate';
  status: 'draft' | 'review' | 'approved' | 'expired';
  lastUpdated: string;
  expiryDate?: string;
}

const LegalDashboard: React.FC = () => {
  const colorScheme = getColorScheme('legal');
  const location = useLocation();
  const [legalStats, setLegalStats] = useState({
    activeCases: 0,
    pendingContracts: 0,
    complianceItems: 0,
    upcomingDeadlines: 0
  });
  const [recentCases, setRecentCases] = useState<LegalCase[]>([]);
  const [recentDocuments, setRecentDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLegalData();
  }, []);

  const fetchLegalData = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLegalStats({
        activeCases: 8,
        pendingContracts: 12,
        complianceItems: 15,
        upcomingDeadlines: 5
      });

      setRecentCases([
        {
          id: '1',
          title: 'Client Service Agreement Review',
          type: 'contract',
          status: 'active',
          priority: 'high',
          assignedTo: 'Legal Team',
          dueDate: '2024-01-25',
          value: 5000000
        },
        {
          id: '2',
          title: 'Employment Contract Updates',
          type: 'contract',
          status: 'pending',
          priority: 'medium',
          assignedTo: 'HR Legal',
          dueDate: '2024-02-01'
        },
        {
          id: '3',
          title: 'Data Protection Compliance',
          type: 'compliance',
          status: 'active',
          priority: 'high',
          assignedTo: 'Compliance Officer',
          dueDate: '2024-01-30'
        }
      ]);

      setRecentDocuments([
        {
          id: '1',
          name: 'Standard Service Agreement',
          type: 'contract',
          status: 'approved',
          lastUpdated: '2024-01-15',
          expiryDate: '2025-01-15'
        },
        {
          id: '2',
          name: 'Privacy Policy',
          type: 'policy',
          status: 'review',
          lastUpdated: '2024-01-10'
        },
        {
          id: '3',
          name: 'Employment Handbook',
          type: 'policy',
          status: 'approved',
          lastUpdated: '2024-01-05'
        }
      ]);
    } catch (error) {
      console.error('Error fetching legal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const legalStatsCards = [
    {
      title: 'Active Cases',
      value: legalStats.activeCases,
      subtitle: 'Legal matters',
      color: 'blue',
      icon: Gavel,
      trend: { value: '+2', isPositive: true },
      delay: 0
    },
    {
      title: 'Pending Contracts',
      value: legalStats.pendingContracts,
      subtitle: 'Awaiting review',
      color: 'orange',
      icon: FileText,
      trend: { value: '+3', isPositive: false },
      delay: 100
    },
    {
      title: 'Compliance Items',
      value: legalStats.complianceItems,
      subtitle: 'Active monitoring',
      color: 'green',
      icon: Shield,
      trend: { value: '+1', isPositive: true },
      delay: 200
    },
    {
      title: 'Upcoming Deadlines',
      value: legalStats.upcomingDeadlines,
      subtitle: 'Next 30 days',
      color: 'red',
      icon: Clock,
      trend: { value: '+2', isPositive: false },
      delay: 300
    }
  ];

  const quickActions = [
    {
      title: 'New Contract',
      description: 'Create new legal contract',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Compliance Check',
      description: 'Review compliance status',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Risk Assessment',
      description: 'Conduct risk evaluation',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Legal Report',
      description: 'Generate legal reports',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/legal', icon: Scale },
    { name: 'Overview', path: '/legal/overview', icon: Eye },
    { name: 'Contract Management', path: '/legal/contracts', icon: FileText },
    { name: 'Compliance Management', path: '/legal/compliance', icon: Shield },
    { name: 'Risk Management', path: '/legal/risk', icon: AlertTriangle },
    { name: 'Legal Documents', path: '/legal/documents', icon: FileText },
    { name: 'Legal Reports', path: '/legal/reports', icon: TrendingUp },
    { name: 'Settings', path: '/legal/settings', icon: Building }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'review': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-4">
      {/* Legal Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {legalStatsCards.map((stat, index) => (
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
              <div className="text-2xl">
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
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

      {/* Recent Legal Cases */}
      <AnimatedCard
        title="Recent Legal Cases"
        subtitle="Latest legal matters and activities"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentCases.map((legalCase) => (
            <div
              key={legalCase.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{legalCase.title}</p>
                  <p className="text-sm text-gray-500">
                    {legalCase.assignedTo} • Due: {legalCase.dueDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(legalCase.status)}`}>
                  {getStatusIcon(legalCase.status)}
                  <span className="ml-1 capitalize">{legalCase.status}</span>
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(legalCase.priority)}`}>
                    {legalCase.priority}
                  </span>
                  {legalCase.value && (
                    <span className="text-xs text-gray-500">
                      {formatCurrency(legalCase.value)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Recent Legal Documents */}
      <AnimatedCard
        title="Recent Legal Documents"
        subtitle="Latest legal documents and policies"
        className="bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="space-y-3">
          {recentDocuments.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{document.name}</p>
                  <p className="text-sm text-gray-500">
                    {document.type} • Updated: {document.lastUpdated}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                  {getStatusIcon(document.status)}
                  <span className="ml-1 capitalize">{document.status}</span>
                </span>
                {document.expiryDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Expires: {document.expiryDate}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <AnimatedCard
            key={index}
            title={action.title}
            subtitle={action.description}
            icon={action.icon}
            color={action.color}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <AnimatedButton
              onClick={() => {}}
              color={action.color}
              className="w-full"
            >
              {action.title}
            </AnimatedButton>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );

  // Function to render content based on current path
  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/legal':
        return <DashboardContent />;
      case '/legal/overview':
        return <LegalOverview />;
      case '/legal/contracts':
        return <ContractManagement />;
      case '/legal/compliance':
        return <ComplianceManagement />;
      case '/legal/documents':
        return <LegalDocuments />;
      case '/legal/risk':
        return <RiskManagement />;
      case '/legal/reports':
        return <LegalReports />;
      case '/legal/settings':
        return <LegalSettings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <DepartmentLayout
      title="Legal Dashboard"
      colorScheme={colorScheme}
      sidebarItems={sidebarItems}
    >
      {loading ? (
        <div className="text-center py-10">
          <p>Loading legal data...</p>
        </div>
      ) : (
        renderContent()
      )}
    </DepartmentLayout>
  );
};

export default LegalDashboard;
