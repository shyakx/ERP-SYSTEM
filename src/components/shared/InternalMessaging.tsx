import React, { useState, useEffect, useRef } from "react";
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
  Crown,
  Monitor,
  MapPin
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
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showMessageMenu, setShowMessageMenu] = useState<string | null>(null);
  const [messageReactions, setMessageReactions] = useState<{[key: string]: { emoji: string; count: number; users: string[] }[]}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

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
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setSuccessMessage('Message sent successfully! ✨');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setMessageText("");
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => setIsTyping(false), 3000);
    setTypingTimeout(timeout);
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: [
        ...(prev[messageId] || []),
        { emoji, count: 1, users: ['You'] }
      ]
    }));
  };

  const handleMessageMenu = (messageId: string) => {
    setShowMessageMenu(showMessageMenu === messageId ? null : messageId);
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
    <>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 border border-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <div className="flex h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Enhanced Sidebar */}
        <div className="w-96 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages, people, or channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Tabs */}
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
                <span>Chats</span>
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

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
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
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-white shadow-lg transition-all duration-300 ${
                          conversation.type === 'direct' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          conversation.type === 'group' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}>
                          {conversation.avatar}
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-2">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium animate-pulse">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
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

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
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
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300" title="Voice call">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300" title="Video call">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300" title="Screen share">
                      <Monitor className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300" title="More options">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
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
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 ${
                          message.sender === "You" ? "justify-end" : "justify-start"
                        }`}>
                          <span>{message.timestamp}</span>
                          {message.isRead && message.sender === "You" && (
                            <CheckCircle className="w-3 h-3 text-blue-500" />
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
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-gray-500">typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 p-6 flex-shrink-0">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={messageText}
                        onChange={(e) => {
                          setMessageText(e.target.value);
                          handleTyping();
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/90 backdrop-blur-sm transition-all duration-200"
                        rows={1}
                      />
                      <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-all duration-300"
                          title="Add emoji"
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowFileUpload(!showFileUpload)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300"
                          title="Attach file"
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
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300" title="Send image">
                      <Image className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300" title="Voice message">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300" title="Video call">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300" title="Send location">
                      <MapPin className="w-4 h-4" />
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
            /* Welcome Screen */
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center max-w-md mx-auto p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Team Chat</h2>
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
    </>
  );
};

export default InternalMessaging; 