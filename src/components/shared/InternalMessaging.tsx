import React, { useState, useEffect, useRef } from "react";
import AnimatedCard from "./AnimatedCard";
import { AnimatedButton } from "./AnimatedCard";
import { 
  MessageSquare, 
  Send, 
  Paperclip,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Calendar,
  User,
  Target,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Phone,
  Mail,
  Star,
  CheckCircle,
  MoreHorizontal,
  Smile,
  Image,
  FileText,
  Video,
  Mic,
  Users,
  Lock,
  Globe,
  Hash,
  AtSign,
  Bell,
  Settings,
  Sparkles,
  Zap,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Forward,
  Archive,
  Trash2,
  Volume2,
  VolumeX,
  Shield,
  Crown
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'video';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  isRead: boolean;
  isStarred: boolean;
  reactions: { emoji: string; count: number; users: string[] }[];
  isEdited?: boolean;
  isForwarded?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'channel';
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  members: string[];
  isPinned: boolean;
  isMuted?: boolean;
  isArchived?: boolean;
  role?: 'admin' | 'moderator' | 'member';
}

interface Channel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  lastActivity: string;
  topics: string[];
  isJoined?: boolean;
  isMuted?: boolean;
}

const InternalMessaging: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<'conversations' | 'channels' | 'contacts'>('conversations');
  const [isTyping, setIsTyping] = useState(false);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: "conv-1",
      name: "Marie Claire Niyonsaba",
      type: "direct",
      avatar: "MC",
      lastMessage: "Can you review the security audit report?",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      members: ["Marie Claire Niyonsaba"],
      isPinned: true,
      role: "admin"
    },
    {
      id: "conv-2",
      name: "Finance Team",
      type: "group",
      avatar: "FT",
      lastMessage: "Budget approval needed for Q2",
      lastMessageTime: "15 min ago",
      unreadCount: 0,
      isOnline: false,
      members: ["Finance Manager", "Accountant", "Analyst"],
      isPinned: false,
      isMuted: true
    },
    {
      id: "conv-3",
      name: "IT Support",
      type: "group",
      avatar: "IT",
      lastMessage: "System maintenance scheduled for tonight",
      lastMessageTime: "1 hour ago",
      unreadCount: 5,
      isOnline: true,
      members: ["IT Manager", "Tech Support", "Network Admin"],
      isPinned: true,
      role: "moderator"
    },
    {
      id: "conv-4",
      name: "Security Alert",
      type: "channel",
      avatar: "SA",
      lastMessage: "New security protocol implemented",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      isOnline: false,
      members: ["Security Team"],
      isPinned: true,
      isArchived: false
    },
    {
      id: "conv-5",
      name: "HR Updates",
      type: "channel",
      avatar: "HR",
      lastMessage: "New employee onboarding process",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      isOnline: false,
      members: ["HR Team"],
      isPinned: false,
      isMuted: true
    }
  ];

  const channels: Channel[] = [
    {
      id: "channel-1",
      name: "general",
      description: "Company-wide announcements and updates",
      memberCount: 45,
      isPrivate: false,
      lastActivity: "2 min ago",
      topics: ["announcements", "updates", "general"],
      isJoined: true,
      isMuted: false
    },
    {
      id: "channel-2",
      name: "security-alerts",
      description: "Real-time security notifications and alerts",
      memberCount: 12,
      isPrivate: true,
      lastActivity: "5 min ago",
      topics: ["security", "alerts", "incidents"],
      isJoined: true,
      isMuted: false
    },
    {
      id: "channel-3",
      name: "tech-support",
      description: "Technical support and IT assistance",
      memberCount: 8,
      isPrivate: false,
      lastActivity: "1 hour ago",
      topics: ["support", "technical", "help"],
      isJoined: true,
      isMuted: true
    },
    {
      id: "channel-4",
      name: "project-alpha",
      description: "Project Alpha development team",
      memberCount: 15,
      isPrivate: true,
      lastActivity: "2 hours ago",
      topics: ["development", "project", "alpha"],
      isJoined: false,
      isMuted: false
    }
  ];

  const messages: Message[] = [
    {
      id: "msg-1",
      sender: "Marie Claire Niyonsaba",
      senderAvatar: "MC",
      content: "Hi! Can you review the security audit report I just uploaded?",
      timestamp: "10:30 AM",
      type: "text",
      isRead: true,
      isStarred: false,
      reactions: [{ emoji: "👍", count: 2, users: ["You", "Admin"] }]
    },
    {
      id: "msg-2",
      sender: "You",
      senderAvatar: "Y",
      content: "Sure! I'll take a look at it right away. Which specific sections should I focus on?",
      timestamp: "10:32 AM",
      type: "text",
      isRead: true,
      isStarred: false,
      reactions: []
    },
    {
      id: "msg-3",
      sender: "Marie Claire Niyonsaba",
      senderAvatar: "MC",
      content: "Please check the access control section and the incident response procedures. I've highlighted the areas that need attention.",
      timestamp: "10:35 AM",
      type: "text",
      isRead: true,
      isStarred: true,
      reactions: [{ emoji: "⭐", count: 1, users: ["You"] }]
    },
    {
      id: "msg-4",
      sender: "You",
      senderAvatar: "Y",
      content: "Perfect! I can see the highlighted sections. I'll review them and get back to you with my feedback by end of day.",
      timestamp: "10:37 AM",
      type: "text",
      isRead: false,
      isStarred: false,
      reactions: [{ emoji: "👍", count: 1, users: ["Marie Claire Niyonsaba"] }]
    },
    {
      id: "msg-5",
      sender: "Marie Claire Niyonsaba",
      senderAvatar: "MC",
      content: "Great! Also, I've attached the latest compliance checklist. Can you verify if we're meeting all the requirements?",
      timestamp: "10:40 AM",
      type: "file",
      fileName: "compliance-checklist-2024.pdf",
      fileSize: "2.3 MB",
      isRead: false,
      isStarred: false,
      reactions: []
    }
  ];

  // Separate messages for each conversation
  const conversationMessages: { [key: string]: Message[] } = {
    "conv-1": [
      {
        id: "msg-1",
        sender: "Marie Claire Niyonsaba",
        senderAvatar: "MC",
        content: "Hi! Can you review the security audit report I just uploaded?",
        timestamp: "10:30 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "👍", count: 2, users: ["You", "Admin"] }]
      },
      {
        id: "msg-2",
        sender: "You",
        senderAvatar: "Y",
        content: "Sure! I'll take a look at it right away. Which specific sections should I focus on?",
        timestamp: "10:32 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: []
      },
      {
        id: "msg-3",
        sender: "Marie Claire Niyonsaba",
        senderAvatar: "MC",
        content: "Please check the access control section and the incident response procedures. I've highlighted the areas that need attention.",
        timestamp: "10:35 AM",
        type: "text",
        isRead: true,
        isStarred: true,
        reactions: [{ emoji: "⭐", count: 1, users: ["You"] }]
      },
      {
        id: "msg-4",
        sender: "You",
        senderAvatar: "Y",
        content: "Perfect! I can see the highlighted sections. I'll review them and get back to you with my feedback by end of day.",
        timestamp: "10:37 AM",
        type: "text",
        isRead: false,
        isStarred: false,
        reactions: [{ emoji: "👍", count: 1, users: ["Marie Claire Niyonsaba"] }]
      },
      {
        id: "msg-5",
        sender: "Marie Claire Niyonsaba",
        senderAvatar: "MC",
        content: "Great! Also, I've attached the latest compliance checklist. Can you verify if we're meeting all the requirements?",
        timestamp: "10:40 AM",
        type: "file",
        fileName: "compliance-checklist-2024.pdf",
        fileSize: "2.3 MB",
        isRead: false,
        isStarred: false,
        reactions: []
      }
    ],
    "conv-2": [
      {
        id: "msg-1",
        sender: "Finance Manager",
        senderAvatar: "FM",
        content: "Hi team! We need to discuss the Q2 budget approval. Can everyone review the attached budget proposal?",
        timestamp: "9:15 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "📊", count: 3, users: ["You", "Accountant", "Analyst"] }]
      },
      {
        id: "msg-2",
        sender: "You",
        senderAvatar: "Y",
        content: "I've reviewed the budget proposal. The numbers look good, but I have some questions about the IT infrastructure costs.",
        timestamp: "9:30 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: []
      },
      {
        id: "msg-3",
        sender: "Accountant",
        senderAvatar: "AC",
        content: "I can help clarify the IT costs. We've included the new security software and hardware upgrades.",
        timestamp: "9:45 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "💡", count: 1, users: ["You"] }]
      },
      {
        id: "msg-4",
        sender: "Analyst",
        senderAvatar: "AN",
        content: "I've prepared a detailed breakdown of the budget allocations. Should I share it with the team?",
        timestamp: "10:00 AM",
        type: "file",
        fileName: "budget-breakdown-q2.pdf",
        fileSize: "1.8 MB",
        isRead: false,
        isStarred: false,
        reactions: []
      }
    ],
    "conv-3": [
      {
        id: "msg-1",
        sender: "IT Manager",
        senderAvatar: "IM",
        content: "System maintenance is scheduled for tonight at 11 PM. Please save your work and log out by 10:45 PM.",
        timestamp: "2:00 PM",
        type: "text",
        isRead: true,
        isStarred: true,
        reactions: [{ emoji: "⚠️", count: 5, users: ["You", "Tech Support", "Network Admin", "Security", "Admin"] }]
      },
      {
        id: "msg-2",
        sender: "Tech Support",
        senderAvatar: "TS",
        content: "Maintenance will include security updates and performance optimizations. Expected downtime: 30 minutes.",
        timestamp: "2:15 PM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "⏰", count: 2, users: ["You", "Network Admin"] }]
      },
      {
        id: "msg-3",
        sender: "You",
        senderAvatar: "Y",
        content: "Understood. I'll make sure all critical systems are backed up before the maintenance window.",
        timestamp: "2:30 PM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: []
      },
      {
        id: "msg-4",
        sender: "Network Admin",
        senderAvatar: "NA",
        content: "I'll monitor the maintenance progress and send updates to the team.",
        timestamp: "2:45 PM",
        type: "text",
        isRead: false,
        isStarred: false,
        reactions: [{ emoji: "👌", count: 1, users: ["IT Manager"] }]
      },
      {
        id: "msg-5",
        sender: "Security",
        senderAvatar: "SE",
        content: "Security team will be available during maintenance for any emergency issues.",
        timestamp: "3:00 PM",
        type: "text",
        isRead: false,
        isStarred: false,
        reactions: []
      }
    ],
    "conv-4": [
      {
        id: "msg-1",
        sender: "Security Alert",
        senderAvatar: "SA",
        content: "🚨 NEW SECURITY PROTOCOL IMPLEMENTED 🚨\n\nAll users must change their passwords within 24 hours.",
        timestamp: "8:00 AM",
        type: "text",
        isRead: true,
        isStarred: true,
        reactions: [{ emoji: "🔒", count: 8, users: ["Security Team", "Admin", "IT Manager", "You", "Finance", "HR", "Operations", "Sales"] }]
      },
      {
        id: "msg-2",
        sender: "Security Team",
        senderAvatar: "ST",
        content: "The new protocol includes:\n• Minimum 12 characters\n• Special characters required\n• 2FA enabled for all accounts\n• Session timeout after 30 minutes",
        timestamp: "8:15 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "✅", count: 6, users: ["You", "Admin", "IT Manager", "Finance", "HR", "Operations"] }]
      },
      {
        id: "msg-3",
        sender: "You",
        senderAvatar: "Y",
        content: "I've updated my password and enabled 2FA. The new security measures look comprehensive.",
        timestamp: "8:30 AM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: []
      },
      {
        id: "msg-4",
        sender: "Admin",
        senderAvatar: "AD",
        content: "Great! Please remind your team members to complete their password updates.",
        timestamp: "8:45 AM",
        type: "text",
        isRead: false,
        isStarred: false,
        reactions: [{ emoji: "📢", count: 3, users: ["Security Team", "IT Manager", "You"] }]
      }
    ],
    "conv-5": [
      {
        id: "msg-1",
        sender: "HR Updates",
        senderAvatar: "HR",
        content: "📋 NEW EMPLOYEE ONBOARDING PROCESS 📋\n\nWe've updated our onboarding procedures to be more efficient and comprehensive.",
        timestamp: "1:00 PM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "👥", count: 4, users: ["HR Team", "Admin", "Finance", "IT"] }]
      },
      {
        id: "msg-2",
        sender: "HR Manager",
        senderAvatar: "HM",
        content: "Key improvements include:\n• Digital document signing\n• Automated background checks\n• Streamlined IT setup process\n• Enhanced training modules",
        timestamp: "1:15 PM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: [{ emoji: "📈", count: 2, users: ["Admin", "Finance"] }]
      },
      {
        id: "msg-3",
        sender: "You",
        senderAvatar: "Y",
        content: "This looks much more efficient than the old process. When will this be implemented?",
        timestamp: "1:30 PM",
        type: "text",
        isRead: true,
        isStarred: false,
        reactions: []
      },
      {
        id: "msg-4",
        sender: "HR Team",
        senderAvatar: "HT",
        content: "The new process will be effective starting next Monday. All new hires will use the updated system.",
        timestamp: "1:45 PM",
        type: "text",
        isRead: false,
        isStarred: false,
        reactions: [{ emoji: "📅", count: 1, users: ["You"] }]
      }
    ]
  };

  const contacts = [
    { name: "Marie Claire Niyonsaba", role: "Security Manager", avatar: "MC", isOnline: true },
    { name: "Finance Manager", role: "Finance Department", avatar: "FM", isOnline: false },
    { name: "IT Manager", role: "IT Department", avatar: "IM", isOnline: true },
    { name: "HR Manager", role: "Human Resources", avatar: "HM", isOnline: false },
    { name: "Operations Lead", role: "Operations", avatar: "OL", isOnline: true }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConversationById = (id: string) => {
    return conversations.find(conv => conv.id === id);
  };

  const getUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const getOnlineCount = () => {
    return conversations.filter(conv => conv.isOnline).length;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Sidebar - Increased Width */}
      <div className="w-96 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl">
        {/* Modern Header */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Messages</h1>
                <p className="text-blue-100 text-sm">Team Communication Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages, people, or channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Modern Tabs - Improved Spacing */}
        <div className="flex border-b border-gray-200/50 bg-white/50 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={() => setActiveTab('conversations')}
            className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'conversations'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Conversations</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('channels')}
            className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'channels'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Hash className="w-4 h-4" />
              <span>Channels</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'contacts'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Contacts</span>
            </div>
          </button>
        </div>

        {/* Enhanced Conversations List - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ 
          maxHeight: 'calc(100vh - 280px)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E0 #F7FAFC'
        }}>
          {activeTab === 'conversations' && (
            <div className="p-4 space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedConversation === conversation.id
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 shadow-lg'
                      : 'hover:bg-gray-50/80 border border-transparent hover:border-gray-200/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-white shadow-lg ${
                        conversation.type === 'direct' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        conversation.type === 'group' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}>
                        {conversation.avatar}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                      )}
                      {conversation.role && (
                        <div className="absolute -top-1 -left-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                          {conversation.role === 'admin' ? <Crown className="w-3 h-3 text-white" /> : <Shield className="w-3 h-3 text-white" />}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {conversation.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {conversation.isPinned && (
                            <Star className="w-3 h-3 text-yellow-500" />
                          )}
                          {conversation.isMuted && (
                            <VolumeX className="w-3 h-3 text-gray-400" />
                          )}
                          <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-2">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        {conversation.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium">
                            {conversation.unreadCount}
                          </span>
                        )}
                        <div className="flex items-center space-x-1">
                          {conversation.type === 'group' && (
                            <Users className="w-3 h-3 text-gray-400" />
                          )}
                          {conversation.type === 'channel' && (
                            <Hash className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Channels List */}
          {activeTab === 'channels' && (
            <div className="p-4 space-y-2">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedConversation(channel.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedConversation === channel.id
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 shadow-lg'
                      : 'hover:bg-gray-50/80 border border-transparent hover:border-gray-200/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <Hash className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          #{channel.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {channel.isPrivate && (
                            <Lock className="w-3 h-3 text-gray-400" />
                          )}
                          {channel.isMuted && (
                            <VolumeX className="w-3 h-3 text-gray-400" />
                          )}
                          <span className="text-xs text-gray-500">{channel.lastActivity}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-2">{channel.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{channel.memberCount} members</span>
                        <div className="flex items-center space-x-1">
                          {channel.isJoined && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                          <div className="flex space-x-1">
                            {channel.topics.slice(0, 2).map((topic, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Contacts List */}
          {activeTab === 'contacts' && (
            <div className="p-4 space-y-2">
              {contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="p-4 rounded-xl cursor-pointer hover:bg-gray-50/80 transition-all duration-300 transform hover:scale-[1.02] border border-transparent hover:border-gray-200/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center font-semibold shadow-lg">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">{contact.role}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Quick Stats */}
        <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{getOnlineCount()} online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{getUnreadCount()} unread</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
        {selectedConversation ? (
          <>
            {/* Enhanced Chat Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6 shadow-sm flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-semibold shadow-lg">
                      {getConversationById(selectedConversation)?.avatar || "C"}
                    </div>
                    {getConversationById(selectedConversation)?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {getConversationById(selectedConversation)?.name || "Channel"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {getConversationById(selectedConversation)?.isOnline ? (
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Online</span>
                        </span>
                      ) : (
                        "Last seen recently"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Messages - Improved Spacing */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" style={{ 
              maxHeight: 'calc(100vh - 240px)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E0 #F7FAFC'
            }}>
              {conversationMessages[selectedConversation]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex space-x-3 max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === "You" ? "flex-row-reverse" : ""}`}>
                    {message.sender !== "You" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 shadow-sm">
                        {message.senderAvatar}
                      </div>
                    )}
                    <div className={`flex flex-col ${message.sender === "You" ? "items-end" : "items-start"}`}>
                      <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === "You"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-white text-gray-900 border border-gray-200/50"
                      }`}>
                        {message.type === "file" ? (
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{message.fileName}</p>
                              <p className="text-xs text-gray-500">{message.fileSize}</p>
                            </div>
                            <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                      </div>
                      
                      {/* Message Actions */}
                      <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 ${
                        message.sender === "You" ? "justify-end" : "justify-start"
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.isRead && message.sender === "You" && (
                          <CheckCircle className="w-3 h-3 text-blue-500" />
                        )}
                        {message.isStarred && (
                          <Star className="w-3 h-3 text-yellow-500" />
                        )}
                        {message.reactions.length > 0 && (
                          <div className="flex items-center space-x-1">
                            {message.reactions.map((reaction, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                {reaction.emoji} {reaction.count}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-xs lg:max-w-md xl:max-w-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {getConversationById(selectedConversation)?.avatar || "MC"}
                    </div>
                    <div className="bg-white text-gray-900 border border-gray-200/50 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Message Input */}
            <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 p-6 flex-shrink-0">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/90 backdrop-blur-sm"
                      rows={1}
                    />
                    <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-all duration-300"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowFileUpload(!showFileUpload)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                    <Image className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Press Enter to send</span>
                  <span>•</span>
                  <span>Shift + Enter for new line</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Enhanced Welcome Screen */
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Messages</h2>
              <p className="text-gray-600 mb-8">Select a conversation to start messaging with your team</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Direct Messages</h3>
                  <p className="text-sm text-gray-500">Chat with team members</p>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <Hash className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Channels</h3>
                  <p className="text-sm text-gray-500">Join team discussions</p>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <Globe className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Public Channels</h3>
                  <p className="text-sm text-gray-500">Company-wide updates</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalMessaging; 