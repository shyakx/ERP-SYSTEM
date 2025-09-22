import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLayout } from '../../contexts/LayoutContext';
import AIChatbot from './AIChatbot';
import TimeClock from './TimeClock';
import PersonalLeave from './PersonalLeave';
import SimpleChat from '../chat/SimpleChat';

interface DepartmentLayoutProps {
  children: React.ReactNode;
  title: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    light: string;
    dark: string;
  };
  sidebarItems: {
    name: string;
    path: string;
    icon?: string;
  }[];
}

const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({
  children,
  title,
  colorScheme,
  sidebarItems
}) => {
  const { sidebarOpen: isSidebarOpen, setSidebarOpen: setIsSidebarOpen } = useLayout();
  const [activeItem, setActiveItem] = useState('/');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isTimeClockOpen, setIsTimeClockOpen] = useState(false);
  const [isPersonalLeaveOpen, setIsPersonalLeaveOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setActiveItem(path);
  };


  const getDefaultIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      // Dashboard and Overview
      'Dashboard': '🏠',
      'Overview': '📊',
      
      // HR Icons
      'Employee': '👥',
      'Recruitment': '🎯',
      'Training': '📚',
      'Payroll': '💰',
      'Performance': '📊',
      'Leave': '📅',
      'Attendance': '⏰',
      'Benefits': '🎁',
      'Compliance': '✅',
      
      // Finance Icons
      'Payable': '💸',
      'Receivable': '💵',
      'Tax': '🧾',
      'Budget': '📋',
      'Cash': '💰',
      'Expenses': '📊',
      'Planning': '📋',
      'Financial': '📊',
      
      // IT Icons
      'Systems': '💻',
      'IT Support': '🛠️',
      'Network': '🌐',
      'IT Security': '🔒',
      'Maintenance': '🔧',
      'Backup': '💾',
      'Software': '📱',
      
      // Security Icons
      'Guard': '👥',
      'Assignment': '👥',
      'Patrols': '🚶',
      'Security Incidents': '🚨',
      'Security Equipment': '🛡️',
      
      // Operations Icons
      'Stock': '📦',
      'Asset Management': '🏢',
      'Procurement': '🛒',
      'Warehouse': '🏭',
      'Quality Control': '✅',
      'Inventory': '📦',
      
      // Sales & Marketing Icons
      'Leads': '🎯',
      'Pipeline': '📈',
      'Campaigns': '📢',
      'Opportunities': '💼',
      'Quotes': '📋',
      'Sales Analytics': '📊',
      
      // Customer Experience Icons
      'Customer Support': '🛠️',
      'Feedback': '💬',
      'Surveys': '📝',
      'Tickets': '🎫',
      'Satisfaction': '😊',
      'Communication': '📞',
      'Customer': '👤',
      
      // Risk Management Icons
      'Assessment': '🔍',
      'Threats': '⚠️',
      'Mitigation': '🛡️',
      'Alerts': '🚨',
      'Monitoring': '👁️',
      'Risk Incidents': '🚨',
      'Risk': '⚠️',
      
      // Recovery Icons
      'Investigation': '🔍',
      'Case Management': '📁',
      'Documentation': '📄',
      'Legal': '⚖️',
      'Asset Recovery': '💰',
      'Forensics': '🔬',
      'Recovery': '🔄',
      
      // Common Icons
      'Reports': '📈',
      'Settings': '⚙️',
      'Management': '⚙️',
      'Analytics': '📊'
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return '📄';
  };

  // Get user display information
  const getUserDisplayInfo = () => {
    if (!user) {
      return {
        name: 'User',
        email: 'user@dicel.co.rw',
        avatar: 'U'
      };
    }

    const fullName = `${user.firstName} ${user.lastName}`;
    const avatar = user.firstName.charAt(0) + user.lastName.charAt(0);
    
    return {
      name: fullName,
      email: user.email,
      avatar: avatar
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-1000"></div>
      </div>

      <div className="flex relative">
        {/* Professional Dark Blue Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#002050] backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-in-out border-r border-blue-400/30 ${
          isSidebarOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'
        }`} style={{ zIndex: 9999 }}>
          {/* Sidebar Container with Proper Height Management */}
          <div className="flex flex-col h-full">
            {/* Enhanced Sidebar Header - Professional Dark Blue */}
            <div className="flex-shrink-0 p-4 border-b border-blue-400/30 bg-[#002050]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl animate-bounce-in">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-lg font-bold text-white">Dicel ERP</h1>
                  <p className="text-xs text-blue-200">Security Company</p>
                </div>
              </div>
              
              {/* Department Badge - Professional */}
              <div className="mt-3">
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-400/20 text-blue-200 shadow-sm backdrop-blur-sm border border-blue-400/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5 animate-pulse"></div>
                  {title} Department
                </div>
              </div>
            </div>

            {/* Navigation Items with Scroll - Professional Theme */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 240px)' }}>
              <div className="space-y-1">
                {sidebarItems.map((item, index) => {
                  const isActive = activeItem === item.path;
                  const isHovered = hoveredItem === item.path;
                  const icon = item.icon || getDefaultIcon(item.name);
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden group text-sm ${
                        isActive
                          ? 'bg-blue-400/20 text-white shadow-lg border border-blue-400/50'
                          : 'text-blue-200 hover:bg-blue-400/10 hover:shadow-md'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Animated Background */}
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-400/30 to-blue-500/30 opacity-100' 
                          : isHovered 
                            ? 'bg-blue-400/10 opacity-50' 
                            : 'opacity-0'
                      }`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-400/20 text-white' 
                            : 'bg-blue-400/10 text-blue-200 group-hover:bg-blue-400/20'
                        }`}>
                          <span className="text-sm transition-transform duration-300">
                            {icon}
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-sm">{item.name}</span>
                        </div>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                        )}
                      </div>
                      
                      {/* Hover Effect */}
                      <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isHovered && !isActive ? 'bg-gradient-to-r from-blue-400/10 to-blue-500/10 opacity-50' : ''
                      }`}></div>
                    </button>
                  );
                })}
              </div>

            </nav>

            {/* User Profile and Logout - Professional Theme */}
            <div className="flex-shrink-0 p-3 border-t border-blue-400/30 bg-[#002050] backdrop-blur-sm" style={{ minHeight: '120px' }}>
              <div className="flex items-center space-x-2 mb-3 p-2 rounded-lg bg-blue-400/10 hover:bg-blue-400/20 transition-all duration-300 backdrop-blur-sm border border-blue-400/20">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300">
                  <span className="text-white font-semibold text-sm">{userInfo.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white">{userInfo.name}</p>
                  <p className="text-xs text-blue-200">{userInfo.email}</p>
                </div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs text-blue-200 hover:bg-blue-400/20 rounded-lg transition-all duration-300 hover:shadow-md group backdrop-blur-sm"
              >
                <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Sidebar Toggle - Professional */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[#002050] backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ zIndex: 10000 }}
          title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Sidebar Toggle Indicator */}
        <div className="hidden lg:block fixed top-4 left-4 z-40">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isSidebarOpen ? 'bg-blue-500' : 'bg-gray-400'
          }`}></div>
        </div>

        {/* Main Content - Adjusted Margin */}
        <div className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'} min-w-0`}>
          <div className="p-3 sm:p-4">
            {/* Enhanced Page Header - Reduced Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${colorScheme.gradient} rounded-xl flex items-center justify-center shadow-lg animate-bounce-in`}>
                    <span className="text-white font-bold text-lg">
                      {title.split(' ')[0].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 animate-fade-in">
                      {title}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">Welcome back to your dashboard</p>
                  </div>
                </div>
                
                {/* Upper Bar with Notifications and Internal Messaging */}
                <div className="flex items-center space-x-3 relative" style={{ zIndex: 20 }}>
                  {/* Sidebar Toggle for Desktop */}
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="hidden lg:flex p-2.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 group border border-gray-200/50 hover:border-gray-300"
                    title={isSidebarOpen ? "Minimize Sidebar" : "Maximize Sidebar"}
                  >
                    <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>

                  {/* Time Clock */}
                  <button
                    onClick={() => setIsTimeClockOpen(!isTimeClockOpen)}
                    className="relative p-2.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-300 group border border-green-200/50 hover:border-green-300"
                    title="Time Clock"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border border-white"></div>
                  </button>

                  {/* Personal Leave */}
                  <button
                    onClick={() => setIsPersonalLeaveOpen(!isPersonalLeaveOpen)}
                    className="relative p-2.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300 group border border-purple-200/50 hover:border-purple-300"
                    title="My Leave"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse border border-white"></div>
                  </button>

                  {/* Internal Chat */}
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="relative p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300 group border border-blue-200/50 hover:border-blue-300"
                    title="Internal Chat"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse border border-white">
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">3</span>
                    </div>
                  </button>

                  
                  {/* Notifications */}
                  <button className="relative p-2.5 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-xl transition-all duration-300 group border border-orange-200/50 hover:border-orange-300">
                    <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4H20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4.19C3.45 20 2.8 19.55 2.61 18.85L1.39 13.15C1.2 12.45 1.85 12 2.61 12H4v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h2c1.1 0 2 .9 2 2v2h2c1.1 0 2 .9 2 2v2h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4.19z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white"></div>
                  </button>
                  
                  {/* Settings */}
                  <button className="p-2.5 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 group border border-gray-200/50 hover:border-gray-300">
                    <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={`w-16 h-0.5 ${colorScheme.primary} rounded-full animate-slide-in`}></div>
            </div>

            {/* Content with Animation */}
            <div className="animate-fade-in-up">
              {children}
            </div>
          </div>

          {/* Floating Action Button for AI Assistant */}
          <div className="fixed bottom-6 right-6 z-50">
            <AIChatbot />
          </div>

          {/* Chat Interface Modal */}
          <SimpleChat 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
          />

          {/* Floating Time Clock Panel */}
          {isTimeClockOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300" style={{
                maxWidth: isSidebarOpen ? 'calc(100vw - 20rem)' : 'calc(100vw - 2rem)',
                marginLeft: isSidebarOpen ? '1rem' : '1rem',
                marginRight: '1rem',
                transform: isSidebarOpen ? 'translateX(8rem)' : 'translateX(0)'
              }}>
                <div className="relative">
                  {/* Close button positioned absolutely */}
                  <button
                    onClick={() => setIsTimeClockOpen(false)}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-white rounded-full p-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Let TimeClock render with its own styling */}
                  <TimeClock />
                </div>
              </div>
            </div>
          )}

          {/* Floating Personal Leave Panel */}
          {isPersonalLeaveOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300" style={{
                maxWidth: isSidebarOpen ? 'calc(100vw - 20rem)' : 'calc(100vw - 2rem)',
                marginLeft: isSidebarOpen ? '1rem' : '1rem',
                marginRight: '1rem',
                transform: isSidebarOpen ? 'translateX(8rem)' : 'translateX(0)'
              }}>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">My Leave</h2>
                  <button
                    onClick={() => setIsPersonalLeaveOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <PersonalLeave />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Enhanced Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
          style={{ zIndex: 9998 }}
        ></div>
      )}
    </div>
  );
};

export default DepartmentLayout; 