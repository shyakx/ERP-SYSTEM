import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Plus,
  Users,
  Search,
  MoreVertical,
  Smile,
  Paperclip
} from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../contexts/AuthContext';

interface SimpleChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimpleChat: React.FC<SimpleChatProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    sendMessage,
    selectConversation,
    createConversation,
    refreshConversations
  } = useChat();

  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatParticipants, setNewChatParticipants] = useState<string[]>([]);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState<'direct' | 'group'>('direct');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, currentConversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentConversation) return;

    try {
      await sendMessage(messageInput.trim());
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newChatParticipants.length === 0) return;

    try {
      const conversation = await createConversation(
        newChatParticipants,
        newChatName || undefined,
        newChatType
      );
      selectConversation(conversation.id);
      setShowNewChat(false);
      setNewChatParticipants([]);
      setNewChatName('');
      setNewChatType('direct');
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };


  const filteredConversations = (conversations || []).filter(conv =>
    conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participants?.some(p => 
      `${p.user?.firstName || ''} ${p.user?.lastName || ''}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Internal Messaging</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r flex flex-col">
            {/* Search and New Chat */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowNewChat(true)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading conversations...</div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No conversations found</div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => selectConversation(conversation.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      currentConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {conversation.type === 'direct' 
                          ? conversation.participants.find(p => p.user_id !== user?.id)?.user.firstName?.[0] || '?'
                          : <Users className="w-5 h-5" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {conversation.name || 
                              (conversation.type === 'direct' 
                                ? `${conversation.participants.find(p => p.user_id !== user?.id)?.user.firstName || ''} ${conversation.participants.find(p => p.user_id !== user?.id)?.user.lastName || ''}`
                                : 'Group Chat'
                              )
                            }
                          </h3>
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessage.created_at)}
                            </span>
                          )}
                        </div>
                        {conversation.lastMessage && (
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage.sender_id === user?.id ? 'You: ' : ''}
                            {conversation.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {currentConversation.type === 'direct' 
                        ? currentConversation.participants.find(p => p.user_id !== user?.id)?.user.firstName?.[0] || '?'
                        : <Users className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {currentConversation.name || 
                          (currentConversation.type === 'direct' 
                            ? `${currentConversation.participants.find(p => p.user_id !== user?.id)?.user.firstName || ''} ${currentConversation.participants.find(p => p.user_id !== user?.id)?.user.lastName || ''}`
                            : 'Group Chat'
                          )
                        }
                      </h3>
                      <p className="text-sm text-gray-500">
                        {currentConversation.participants.length} participant{currentConversation.participants.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loading ? (
                    <div className="text-center text-gray-500">Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500">No messages yet. Start the conversation!</div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user?.id 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          {message.sender_id !== user?.id && (
                            <div className="text-xs font-medium mb-1 opacity-75">
                              {message.sender.firstName} {message.sender.lastName}
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className={`text-xs mt-1 ${
                            message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.created_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Smile className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Modal */}
        {showNewChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">Start New Conversation</h3>
              <form onSubmit={handleCreateConversation} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conversation Type
                  </label>
                  <select
                    value={newChatType}
                    onChange={(e) => setNewChatType(e.target.value as 'direct' | 'group')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="direct">Direct Message</option>
                    <option value="group">Group Chat</option>
                  </select>
                </div>
                
                {newChatType === 'group' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Group Name
                    </label>
                    <input
                      type="text"
                      value={newChatName}
                      onChange={(e) => setNewChatName(e.target.value)}
                      placeholder="Enter group name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Participants (User IDs)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter user IDs separated by commas..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setNewChatParticipants(e.target.value.split(',').map(id => id.trim()).filter(id => id))}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewChat(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={newChatParticipants.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleChat;
