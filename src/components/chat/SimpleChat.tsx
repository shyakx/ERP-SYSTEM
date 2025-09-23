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
  Paperclip,
  Image,
  FileText,
  Download,
  ThumbsUp,
  Reply,
  Edit,
  Trash2,
  Clock,
  Check,
  CheckCheck,
  Pin,
  Archive
} from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../contexts/AuthContext';
import { useMessageDrafts } from '../../hooks/useMessageDrafts';

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
    sendMessage,
    selectConversation,
    createConversation
  } = useChat();

  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatParticipants, setNewChatParticipants] = useState<string[]>([]);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState<'direct' | 'group'>('direct');
  
  // Enhanced features
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [replyToMessage, setReplyToMessage] = useState<any>(null);
  const [editingMessage, setEditingMessage] = useState<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState<string | null>(null);
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  
  const { 
    saveDraft, 
    getDraftForConversation, 
    deleteDraft,
    scheduleMessage
  } = useMessageDrafts();

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

  // Load draft when conversation changes
  useEffect(() => {
    if (currentConversation) {
      const draft = getDraftForConversation(currentConversation.id);
      if (draft) {
        setMessageInput(draft.content);
        setSelectedFiles(draft.attachments || []);
        if (draft.replyToMessageId) {
          // You'd need to find the actual message object here
          setReplyToMessage({ id: draft.replyToMessageId });
        }
      } else {
        setMessageInput('');
        setSelectedFiles([]);
        setReplyToMessage(null);
      }
    }
  }, [currentConversation, getDraftForConversation]);

  // Auto-save draft when typing
  useEffect(() => {
    if (currentConversation && (messageInput.trim() || selectedFiles.length > 0)) {
      const timeoutId = setTimeout(() => {
        saveDraft(currentConversation.id, messageInput, selectedFiles, replyToMessage?.id);
      }, 1000); // Save after 1 second of no typing

      return () => clearTimeout(timeoutId);
    }
  }, [messageInput, selectedFiles, replyToMessage, currentConversation, saveDraft]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!messageInput.trim() && selectedFiles.length === 0) || !currentConversation) return;

    try {
      // Handle file uploads
      const attachments = await Promise.all(
        selectedFiles.map(async (file) => {
          // In a real app, you'd upload to a file service
          return {
            id: Date.now().toString(),
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
            size: file.size
          };
        })
      );

      await sendMessage(
        messageInput.trim(),
        'text',
        replyToMessage?.id,
        attachments
      );
      
      setMessageInput('');
      setSelectedFiles([]);
      setReplyToMessage(null);
      setEditingMessage(null);
      
      // Clear draft after successful send
      if (currentConversation) {
        deleteDraft(currentConversation.id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleScheduleMessage = () => {
    if (currentConversation && scheduledTime) {
      scheduleMessage(
        currentConversation.id,
        messageInput,
        scheduledTime,
        selectedFiles,
        replyToMessage?.id
      );
      
      setMessageInput('');
      setSelectedFiles([]);
      setReplyToMessage(null);
      setShowScheduleModal(false);
      setScheduledTime('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleReply = (message: any) => {
    setReplyToMessage(message);
    inputRef.current?.focus();
  };

  const handleEditMessage = (message: any) => {
    setEditingMessage(message);
    setMessageInput(message.content);
    inputRef.current?.focus();
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    // In a real app, you'd call the API to add reaction
    console.log(`Adding ${emoji} reaction to message ${messageId}`);
  };

  const getMessageStatus = (message: any) => {
    if (message.sender_id === user?.id) {
      if (message.read_at) return <CheckCheck className="w-3 h-3 text-blue-500" />;
      if (message.delivered_at) return <Check className="w-3 h-3 text-gray-400" />;
      return <Clock className="w-3 h-3 text-gray-300" />;
    }
    return null;
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



  const filteredConversations = (conversations || []).filter(conv =>
    conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participants?.some(p => 
      `${p.user?.firstName || ''} ${p.user?.lastName || ''}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10001 }}>
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

                {/* Message Search */}
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={messageSearchQuery}
                      onChange={(e) => setMessageSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loading ? (
                    <div className="text-center text-gray-500">Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500">No messages yet. Start the conversation!</div>
                  ) : (
                    messages
                      .filter(message => 
                        !messageSearchQuery || 
                        message.content.toLowerCase().includes(messageSearchQuery.toLowerCase())
                      )
                      .map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'} group`}
                      >
                        <div className={`max-w-xs lg:max-w-md relative ${
                          message.sender_id === user?.id ? 'flex flex-col items-end' : 'flex flex-col items-start'
                        }`}>
                          {/* Reply Context */}
                          {message.replyTo && (
                            <div className={`mb-2 p-2 bg-gray-100 rounded-lg border-l-4 border-blue-500 max-w-full ${
                              message.sender_id === user?.id ? 'ml-auto' : 'mr-auto'
                            }`}>
                              <div className="text-xs text-gray-600 font-medium">
                                Replying to {message.replyTo.sender.firstName}
                              </div>
                              <div className="text-xs text-gray-700 truncate">
                                {message.replyTo.content}
                              </div>
                            </div>
                          )}

                          {/* Message Content */}
                          <div className={`px-4 py-2 rounded-lg relative group-hover:shadow-md transition-shadow ${
                          message.sender_id === user?.id 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          {message.sender_id !== user?.id && (
                            <div className="text-xs font-medium mb-1 opacity-75">
                              {message.sender.firstName} {message.sender.lastName}
                            </div>
                          )}
                            
                            {/* Message Text */}
                          <p className="text-sm">{message.content}</p>
                            
                            {/* Attachments */}
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment: any, index: number) => (
                                  <div key={index} className="flex items-center space-x-2 p-2 bg-white/20 rounded">
                                    {attachment.type.startsWith('image/') ? (
                                      <Image className="w-4 h-4" />
                                    ) : (
                                      <FileText className="w-4 h-4" />
                                    )}
                                    <span className="text-xs truncate">{attachment.name}</span>
                                    <button className="hover:bg-white/20 p-1 rounded">
                                      <Download className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Message Actions */}
                            <div className={`absolute top-1 ${message.sender_id === user?.id ? 'left-0' : 'right-0'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                              <div className={`flex space-x-1 ${message.sender_id === user?.id ? '-translate-x-full' : 'translate-x-full'}`}>
                                <button
                                  onClick={() => handleReply(message)}
                                  className="p-1 hover:bg-white/20 rounded"
                                  title="Reply"
                                >
                                  <Reply className="w-3 h-3" />
                                </button>
                                {message.sender_id === user?.id && (
                                  <button
                                    onClick={() => handleEditMessage(message)}
                                    className="p-1 hover:bg-white/20 rounded"
                                    title="Edit"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleReaction(message.id, '👍')}
                                  className="p-1 hover:bg-white/20 rounded"
                                  title="React"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => setShowMessageMenu(showMessageMenu === message.id ? null : message.id)}
                                  className="p-1 hover:bg-white/20 rounded"
                                  title="More"
                                >
                                  <MoreVertical className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Message Footer */}
                            <div className={`flex items-center justify-between mt-1 text-xs ${
                            message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                              <span>{formatTime(message.created_at)}</span>
                              <div className="flex items-center space-x-1">
                                {getMessageStatus(message)}
                          </div>
                            </div>
                          </div>

                          {/* Reactions */}
                          {message.reactions && message.reactions.length > 0 && (
                            <div className={`mt-1 flex flex-wrap gap-1 ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                              {message.reactions.map((reaction: any, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-white/20 rounded-full text-xs cursor-pointer hover:bg-white/30"
                                  onClick={() => handleReaction(message.id, reaction.emoji)}
                                >
                                  {reaction.emoji} {reaction.count || 1}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Context */}
                {replyToMessage && (
                  <div className="p-3 border-t bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Reply className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Replying to {replyToMessage.sender.firstName}
                        </span>
                      </div>
                      <button
                        onClick={() => setReplyToMessage(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 truncate mt-1">
                      {replyToMessage.content}
                    </div>
                  </div>
                )}

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div className="p-3 border-t bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Attachments ({selectedFiles.length})</span>
                      <button
                        onClick={() => setSelectedFiles([])}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-white p-2 rounded border">
                          {file.type.startsWith('image/') ? (
                            <Image className="w-4 h-4 text-blue-500" />
                          ) : (
                            <FileText className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-sm truncate max-w-32">{file.name}</span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          title="Attach files"
                    >
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                      </label>
                      
                      <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                          placeholder={
                            editingMessage 
                              ? "Edit message..." 
                              : replyToMessage 
                                ? "Reply to message..." 
                                : "Type a message..."
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {editingMessage && (
                          <button
                            onClick={() => {
                              setEditingMessage(null);
                              setMessageInput('');
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                    <button
                      type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Add emoji"
                    >
                      <Smile className="w-5 h-5 text-gray-500" />
                    </button>

                      <button
                        type="button"
                        onClick={() => setShowScheduleModal(true)}
                        disabled={!messageInput.trim() && selectedFiles.length === 0}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Schedule message"
                      >
                        <Clock className="w-5 h-5 text-gray-500" />
                      </button>
                      
                    <button
                      type="submit"
                        disabled={!messageInput.trim() && selectedFiles.length === 0}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title={editingMessage ? "Update message" : "Send message"}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Press Enter to send</span>
                      <span>•</span>
                      <span>Shift + Enter for new line</span>
                      {editingMessage && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600">Editing message</span>
                        </>
                      )}
                    </div>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10002 }}>
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

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="fixed bottom-20 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <div className="grid grid-cols-6 gap-2">
              {['😀', '😂', '😍', '🥰', '😎', '🤔', '👍', '👎', '❤️', '🔥', '🎉', '👏', '💯', '✨', '🚀', '💪'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => {
                    setMessageInput(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Menu */}
        {showMessageMenu && (
          <div className="fixed bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
            <button
              onClick={() => {
                setShowMessageMenu(null);
                // Pin message functionality
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center space-x-2"
            >
              <Pin className="w-4 h-4" />
              <span>Pin Message</span>
            </button>
            <button
              onClick={() => {
                setShowMessageMenu(null);
                // Copy message functionality
                navigator.clipboard.writeText(messages.find(m => m.id === showMessageMenu)?.content || '');
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Copy Text</span>
            </button>
            <button
              onClick={() => {
                setShowMessageMenu(null);
                // Archive message functionality
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm flex items-center space-x-2"
            >
              <Archive className="w-4 h-4" />
              <span>Archive</span>
            </button>
            {messages.find(m => m.id === showMessageMenu)?.sender_id === user?.id && (
              <button
                onClick={() => {
                  setShowMessageMenu(null);
                  // Delete message functionality
                }}
                className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded text-sm flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}

        {/* Schedule Message Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 10003 }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">Schedule Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule for
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Message Preview:</div>
                  <div className="text-sm">
                    {messageInput || <span className="text-gray-400 italic">No message content</span>}
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      + {selectedFiles.length} attachment{selectedFiles.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleScheduleMessage}
                    disabled={!scheduledTime}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Schedule Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleChat;
