import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  Paperclip,
  Search,
  Star,
  CheckCircle,
  MoreHorizontal,
  Smile,
  FileText,
  Video,
  Phone,
  Users,
  Lock,
  Globe,
  Hash,
  Settings,
  X
} from "lucide-react";
import { useMessaging } from "../../hooks/useMessaging";

const InternalMessaging: React.FC = () => {
  const {
    conversations,
    channels,
    contacts,
    currentMessages,
    currentConversation,
    selectedConversation,
    loading,
    error,
    isTyping,
    setSelectedConversation,
    sendMessage,
    addReaction,
    sendTypingIndicator,
    createConversation,
    joinChannel,
    searchMessages,
    totalUnreadCount
  } = useMessaging();

  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<'conversations' | 'channels' | 'contacts'>('conversations');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Handle typing indicator
  const handleTyping = () => {
    if (selectedConversation) {
      sendTypingIndicator(selectedConversation, true);
    }
  };

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      await sendMessage(selectedConversation, messageText.trim());
      setMessageText("");
      setShowSuccess(true);
      setSuccessMessage('Message sent successfully!');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedConversation) return;

    try {
      await sendMessage(selectedConversation, `Sent: ${file.name}`, 'file', file);
      setShowSuccess(true);
      setSuccessMessage('File uploaded successfully!');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to upload file:', err);
    }
  };

  // Search functionality
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const results = await searchMessages(searchTerm);
      console.log('Search results:', results);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return conv.unreadCount > 0;
    if (selectedFilter === 'pinned') return conv.isPinned;
    if (selectedFilter === 'direct') return conv.type === 'direct';
    if (selectedFilter === 'group') return conv.type === 'group';
    if (selectedFilter === 'channel') return conv.type === 'channel';
    return true;
  });

  // Filter channels
  const filteredChannels = channels.filter(channel => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'joined') return channel.isJoined;
    if (selectedFilter === 'public') return !channel.isPrivate;
    if (selectedFilter === 'private') return channel.isPrivate;
    return true;
  });

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'online') return contact.isOnline;
    return true;
  });

  // Open in new tab
  const openInNewTab = () => {
    window.open('/messages/fullscreen', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Internal Messaging</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={openInNewTab}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            title="Open in new tab"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.close()}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col">
          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
              <div className="flex items-center space-x-2">
                {totalUnreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {totalUnreadCount}
                  </span>
                )}
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
              />
            </div>

            {/* Filter */}
            <div className="mt-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="pinned">Pinned</option>
                <option value="direct">Direct Messages</option>
                <option value="group">Groups</option>
                <option value="channel">Channels</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200/50">
            <button
              onClick={() => setActiveTab('conversations')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'conversations'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Conversations
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'channels'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Channels
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'contacts'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Contacts
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'conversations' && (
              <div className="p-4 space-y-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedConversation === conversation.id
                        ? 'bg-blue-100 border-2 border-blue-300'
                        : 'bg-white/60 hover:bg-white/80 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {conversation.avatar}
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {conversation.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {conversation.isPinned && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                            {conversation.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400">{conversation.lastMessageTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'channels' && (
              <div className="p-4 space-y-2">
                {filteredChannels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedConversation(channel.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedConversation === channel.id
                        ? 'bg-blue-100 border-2 border-blue-300'
                        : 'bg-white/60 hover:bg-white/80 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        #{channel.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 truncate">
                            #{channel.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {channel.isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
                            {channel.isJoined && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{channel.description}</p>
                        <p className="text-xs text-gray-400">
                          {channel.memberCount} members • {channel.lastActivity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="p-4 space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      const existingConv = conversations.find(conv => 
                        conv.type === 'direct' && conv.members.includes(contact.name)
                      );
                      if (existingConv) {
                        setSelectedConversation(existingConv.id);
                      } else {
                        createConversation({
                          name: contact.name,
                          type: 'direct',
                          avatar: contact.avatar,
                          members: [contact.name],
                          lastMessage: '',
                          lastMessageTime: '',
                          unreadCount: 0,
                          isOnline: contact.isOnline,
                          isPinned: false
                        }).then(newConv => {
                          if (newConv) setSelectedConversation(newConv.id);
                        });
                      }
                    }}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white/60 hover:bg-white/80 border-2 border-transparent"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {contact.avatar}
                        </div>
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{contact.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{contact.role}</p>
                        <p className="text-xs text-gray-400">
                          {contact.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {currentConversation?.avatar || 'C'}
                      </div>
                      {currentConversation?.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {currentConversation?.name || 'Conversation'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {currentConversation?.type === 'direct' ? 'Direct Message' : 
                         currentConversation?.type === 'group' ? `${currentConversation.members.length} members` :
                         'Channel'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : !currentMessages || currentMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No messages yet</p>
                      <p className="text-sm">Start a conversation by sending a message!</p>
                    </div>
                  </div>
                ) : (
                  (currentMessages || []).map((message) => (
                    message && (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'You'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/50'
                          }`}
                        >
                          {message.sender && message.sender !== 'You' && (
                            <p className="text-xs font-medium mb-1 opacity-75">{message.sender}</p>
                          )}
                          
                          {message.type === 'text' && (
                            <p className="text-sm">{message.content}</p>
                          )}
                          
                          {message.type === 'file' && (
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4" />
                              <div>
                                <p className="text-sm font-medium">{message.fileName}</p>
                                <p className="text-xs opacity-75">{message.fileSize}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs opacity-75">{message.timestamp}</p>
                            {message.reactions && message.reactions.length > 0 && (
                              <div className="flex items-center space-x-1">
                                {message.reactions.map((reaction, index) => (
                                  <span
                                    key={index}
                                    className="bg-white/20 px-2 py-1 rounded-full text-xs"
                                    title={`${reaction.count} ${reaction.users.join(', ')}`}
                                  >
                                    {reaction.emoji} {reaction.count}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  ))
                )}
                
                {/* Typing indicator */}
                {isTyping[selectedConversation] && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/50 px-4 py-2 rounded-2xl">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">typing...</span>
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
                          className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-all duration-300"
                          title="Add emoji"
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
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
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                />
              </div>
            </>
          ) : (
            /* Welcome Screen */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Messages</h2>
                <p className="text-gray-600 mb-6">Select a conversation to start messaging</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-white/60 rounded-xl border border-gray-200/50">
                    <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">Direct Messages</h3>
                    <p className="text-sm text-gray-600">Chat with individual team members</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl border border-gray-200/50">
                    <Hash className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold text-gray-800">Channels</h3>
                    <p className="text-sm text-gray-600">Join topic-based discussions</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl border border-gray-200/50">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold text-gray-800">Groups</h3>
                    <p className="text-sm text-gray-600">Collaborate with teams</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default InternalMessaging; 