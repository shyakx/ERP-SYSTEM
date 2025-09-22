import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLayout } from '../../contexts/LayoutContext';

interface ChatToggleProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ onClick, hasUnreadMessages = false }) => {
  const { sidebarOpen, sidebarWidth } = useLayout();
  
  // Responsive positioning - on mobile, always position to avoid overlap
  const getRightPosition = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      return '88px'; // Fixed position on mobile
    }
    return sidebarOpen ? `${sidebarWidth + 24}px` : '88px';
  };
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50 group"
      style={{
        right: getRightPosition()
      }}
      title="Open Internal Chat"
    >
      <MessageCircle size={24} />
      {hasUnreadMessages && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Internal Chat
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default ChatToggle;
