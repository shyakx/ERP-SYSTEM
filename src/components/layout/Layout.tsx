import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  DollarSign, 
  Shield, 
  Package, 
  UserCheck, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw, 
  Monitor,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Bell,
  Search,
  BarChart3,
  FileText,
  Calendar,
  UserPlus,
  Briefcase,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  PieChart,
  CreditCard,
  TrendingDown,
  Eye,
  Plus,
  Activity,
  Target,
  Building,
  MapPin
} from 'lucide-react';

// Import logo image
import dicelLogo from '../../assets/images/dicel-logo.png';

interface SidebarItem {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
}

// Logo component with fallback
const LogoComponent = ({ className = "w-6 h-6" }: { className?: string }) => {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {!logoError ? (
        <img
          src={dicelLogo}
          alt="Dicel Security Company Logo"
          className="w-full h-full object-contain"
          onError={() => setLogoError(true)}
        />
      ) : (
        <Shield className="w-full h-full text-white" />
      )}
    </div>
  );
};

// Department-specific sidebar items
const getSidebarItems = (userRole: string): SidebarItem[] => {
  switch (userRole) {
    case 'admin':
      return [
        { name: 'Admin Dashboard', icon: Home, path: '/admin', color: 'text-blue-600' },
        { name: 'Department Management', icon: Building, path: '/admin/departments', color: 'text-purple-600' },
        { name: 'User Management', icon: Users, path: '/admin/users', color: 'text-green-600' },
        { name: 'System Reports', icon: BarChart3, path: '/admin/reports', color: 'text-orange-600' },
        { name: 'Analytics', icon: Activity, path: '/admin/analytics', color: 'text-indigo-600' },
        { name: 'System Settings', icon: Settings, path: '/admin/settings', color: 'text-red-600' },
      ];
    
    case 'hr':
      return [
        { name: 'HR Dashboard', icon: Home, path: '/hr', color: 'text-purple-600' },
        { name: 'Employee Management', icon: Users, path: '/hr/employees', color: 'text-blue-600' },
        { name: 'Recruitment', icon: UserPlus, path: '/hr/recruitment', color: 'text-green-600' },
        { name: 'Training & Development', icon: Award, path: '/hr/training', color: 'text-orange-600' },
        { name: 'Payroll', icon: DollarSign, path: '/hr/payroll', color: 'text-indigo-600' },
        { name: 'Performance Reviews', icon: Target, path: '/hr/performance', color: 'text-red-600' },
      ];
    
    case 'finance':
      return [
        { name: 'Finance Dashboard', icon: Home, path: '/finance', color: 'text-green-600' },
        { name: 'Financial Reports', icon: BarChart3, path: '/finance/reports', color: 'text-blue-600' },
        { name: 'Budget Management', icon: PieChart, path: '/finance/budget', color: 'text-purple-600' },
        { name: 'Accounts Payable', icon: CreditCard, path: '/finance/payable', color: 'text-orange-600' },
        { name: 'Accounts Receivable', icon: TrendingUp, path: '/finance/receivable', color: 'text-indigo-600' },
        { name: 'Tax Management', icon: FileText, path: '/finance/tax', color: 'text-red-600' },
      ];
    
    case 'compliance':
      return [
        { name: 'Compliance Dashboard', icon: Home, path: '/compliance', color: 'text-red-600' },
        { name: 'Regulatory Reports', icon: FileText, path: '/compliance/reports', color: 'text-blue-600' },
        { name: 'Audit Trails', icon: Eye, path: '/compliance/audit', color: 'text-green-600' },
        { name: 'Policy Management', icon: Shield, path: '/compliance/policies', color: 'text-purple-600' },
        { name: 'Risk Assessment', icon: AlertTriangle, path: '/compliance/risk', color: 'text-orange-600' },
        { name: 'Compliance Calendar', icon: Calendar, path: '/compliance/calendar', color: 'text-indigo-600' },
      ];
    
    case 'inventory':
      return [
        { name: 'Inventory Dashboard', icon: Home, path: '/inventory', color: 'text-orange-600' },
        { name: 'Stock Management', icon: Package, path: '/inventory/stock', color: 'text-blue-600' },
        { name: 'Asset Tracking', icon: Eye, path: '/inventory/assets', color: 'text-green-600' },
        { name: 'Procurement', icon: Plus, path: '/inventory/procurement', color: 'text-purple-600' },
        { name: 'Maintenance', icon: Settings, path: '/inventory/maintenance', color: 'text-indigo-600' },
        { name: 'Reports', icon: BarChart3, path: '/inventory/reports', color: 'text-red-600' },
      ];
    
    case 'client-management':
      return [
        { name: 'Client Dashboard', icon: Home, path: '/client-management', color: 'text-indigo-600' },
        { name: 'Client Directory', icon: UserCheck, path: '/client-management/directory', color: 'text-blue-600' },
        { name: 'Client Relations', icon: MessageSquare, path: '/client-management/relations', color: 'text-green-600' },
        { name: 'Contract Management', icon: FileText, path: '/client-management/contracts', color: 'text-purple-600' },
        { name: 'Client Analytics', icon: BarChart3, path: '/client-management/analytics', color: 'text-orange-600' },
        { name: 'Client Support', icon: ShieldCheck, path: '/client-management/support', color: 'text-red-600' },
      ];
    
    case 'sales-marketing':
      return [
        { name: 'Sales Dashboard', icon: Home, path: '/sales-marketing', color: 'text-pink-600' },
        { name: 'Lead Management', icon: Target, path: '/sales-marketing/leads', color: 'text-blue-600' },
        { name: 'Sales Pipeline', icon: TrendingUp, path: '/sales-marketing/pipeline', color: 'text-green-600' },
        { name: 'Marketing Campaigns', icon: Activity, path: '/sales-marketing/campaigns', color: 'text-purple-600' },
        { name: 'Sales Reports', icon: BarChart3, path: '/sales-marketing/reports', color: 'text-orange-600' },
        { name: 'Customer Analytics', icon: PieChart, path: '/sales-marketing/analytics', color: 'text-indigo-600' },
      ];
    
    case 'customer-experience':
      return [
        { name: 'CX Dashboard', icon: Home, path: '/customer-experience', color: 'text-cyan-600' },
        { name: 'Customer Support', icon: MessageSquare, path: '/customer-experience/support', color: 'text-blue-600' },
        { name: 'Feedback Management', icon: CheckCircle, path: '/customer-experience/feedback', color: 'text-green-600' },
        { name: 'Service Requests', icon: AlertCircle, path: '/customer-experience/requests', color: 'text-purple-600' },
        { name: 'Customer Analytics', icon: BarChart3, path: '/customer-experience/analytics', color: 'text-orange-600' },
        { name: 'Quality Assurance', icon: Award, path: '/customer-experience/quality', color: 'text-indigo-600' },
      ];
    
    case 'security-guard-management':
      return [
        { name: 'Security Dashboard', icon: Home, path: '/security-guard-management', color: 'text-yellow-600' },
        { name: 'Guard Management', icon: ShieldCheck, path: '/security-guard-management/guards', color: 'text-blue-600' },
        { name: 'Patrol Routes', icon: MapPin, path: '/security-guard-management/patrols', color: 'text-green-600' },
        { name: 'Incident Reports', icon: AlertTriangle, path: '/security-guard-management/incidents', color: 'text-purple-600' },
        { name: 'Equipment Tracking', icon: Package, path: '/security-guard-management/equipment', color: 'text-orange-600' },
        { name: 'Security Analytics', icon: BarChart3, path: '/security-guard-management/analytics', color: 'text-indigo-600' },
      ];
    
    case 'risk':
      return [
        { name: 'Risk Dashboard', icon: Home, path: '/risk', color: 'text-red-600' },
        { name: 'Risk Assessment', icon: AlertTriangle, path: '/risk/assessment', color: 'text-blue-600' },
        { name: 'Risk Monitoring', icon: Monitor, path: '/risk/monitoring', color: 'text-green-600' },
        { name: 'Risk Reports', icon: FileText, path: '/risk/reports', color: 'text-purple-600' },
        { name: 'Risk Analytics', icon: BarChart3, path: '/risk/analytics', color: 'text-orange-600' },
        { name: 'Risk Calendar', icon: Calendar, path: '/risk/calendar', color: 'text-indigo-600' },
      ];
    
    case 'recovery':
      return [
        { name: 'Recovery Dashboard', icon: Home, path: '/recovery', color: 'text-emerald-600' },
        { name: 'Asset Recovery', icon: RotateCcw, path: '/recovery/assets', color: 'text-blue-600' },
        { name: 'Recovery Tracking', icon: Eye, path: '/recovery/tracking', color: 'text-green-600' },
        { name: 'Recovery Reports', icon: FileText, path: '/recovery/reports', color: 'text-purple-600' },
        { name: 'Recovery Analytics', icon: BarChart3, path: '/recovery/analytics', color: 'text-orange-600' },
        { name: 'Recovery Calendar', icon: Calendar, path: '/recovery/calendar', color: 'text-indigo-600' },
      ];
    
    case 'it':
      return [
        { name: 'IT Dashboard', icon: Home, path: '/it', color: 'text-blue-600' },
        { name: 'System Monitoring', icon: Monitor, path: '/it/monitoring', color: 'text-green-600' },
        { name: 'Technical Support', icon: Settings, path: '/it/support', color: 'text-purple-600' },
        { name: 'System Reports', icon: FileText, path: '/it/reports', color: 'text-orange-600' },
        { name: 'IT Analytics', icon: BarChart3, path: '/it/analytics', color: 'text-indigo-600' },
        { name: 'System Settings', icon: Settings, path: '/it/settings', color: 'text-red-600' },
      ];
    
    default:
      return [
        { name: 'Dashboard', icon: Home, path: '/', color: 'text-blue-600' },
      ];
  }
};

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getUserDisplayName = () => {
    if (!user) return 'U';
    return user.firstName ? user.firstName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
  };

  const getFullName = () => {
    if (!user) return 'User';
    return user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.email;
  };

  const sidebarItems = getSidebarItems(user?.role || 'admin');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <LogoComponent className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dicel ERP</h1>
                <p className="text-sm text-gray-500">Security Company</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive(item.path) ? item.color : 'text-gray-400'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {getUserDisplayName()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{getFullName()}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@dicel.co.rw'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {getUserDisplayName()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 