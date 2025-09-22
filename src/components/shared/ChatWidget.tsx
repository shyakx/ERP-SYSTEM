import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Search,
  Settings,
  Users,
  Hash
} from 'lucide-react';
import { chatAPI } from '../../services/api';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    avatar_url?: string;
  };
  created_at: string;
  message_type: string;
  reply_to_message_id?: string;
}

interface Conversation {
  id: string;
  name?: string;
  type: 'direct' | 'group' | 'channel';
  last_message_at?: string;
  members?: Array<{
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatar_url?: string;
    };
  }>;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation.id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const response = await chatAPI.getConversations();
      setConversations(response.data.data || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await chatAPI.getMessages(conversationId);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const messageData = {
        content: newMessage,
        message_type: 'text'
      };

      const response = await chatAPI.sendMessage(activeConversation.id, messageData);
      setMessages(prev => [...prev, response.data.data]);
      setNewMessage('');
      
      // Stop typing indicator
      setIsTyping(false);
      await chatAPI.updateTypingIndicator(activeConversation.id, false);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (activeConversation) {
      if (!isTyping && value.trim()) {
        setIsTyping(true);
        chatAPI.updateTypingIndicator(activeConversation.id, true);
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(async () => {
        setIsTyping(false);
        if (activeConversation) {
          await chatAPI.updateTypingIndicator(activeConversation.id, false);
        }
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.name) return conversation.name;
    if (conversation.type === 'direct' && conversation.members) {
      const otherMember = conversation.members.find(m => m.user.id !== 'current-user-id');
      return otherMember ? `${otherMember.user.firstName} ${otherMember.user.lastName}` : 'Direct Message';
    }
    return 'Group Chat';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Internal Chat</h3>
            <p className="text-xs text-gray-500">Team Communication</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
          <button onClick={onToggle} className="p-1 hover:bg-gray-200 rounded">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r border-gray-200 bg-gray-50">
          <div className="p-3 border-b border-gray-200">
            <button className="w-full text-left p-2 hover:bg-gray-200 rounded text-sm font-medium">
              + New Chat
            </button>
          </div>
          <div className="overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`w-full text-left p-3 hover:bg-gray-200 border-b border-gray-100 ${
                    activeConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      {conversation.type === 'direct' ? (
                        <Users className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Hash className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {getConversationName(conversation)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {conversation.type === 'direct' ? 'Direct message' : 'Group chat'}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {getConversationName(activeConversation)}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {activeConversation.type === 'direct' ? 'Direct message' : 'Group chat'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Video className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === 'current-user-id' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === 'current-user-id'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender_id === 'current-user-id'
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {typingUsers.length > 0 && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm">
                      {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Paperclip className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => handleTyping(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Smile className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
