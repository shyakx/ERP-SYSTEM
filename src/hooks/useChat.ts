import { useState, useEffect, useCallback, useRef } from 'react';
import { chatAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  reactions?: Array<{
    id: string;
    emoji: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }>;
}

interface Conversation {
  id: string;
  name?: string;
  type: 'direct' | 'group' | 'channel';
  description?: string;
  lastMessage?: Message;
  participants: Array<{
    id: string;
    user_id: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar_url?: string;
    };
  }>;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

interface UseChatReturn {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, type?: string, replyTo?: string, attachments?: any[]) => Promise<void>;
  loadMessages: (conversationId: string, before?: string) => Promise<void>;
  createConversation: (participantIds: string[], name?: string, type?: string) => Promise<Conversation>;
  selectConversation: (conversationId: string) => void;
  refreshConversations: () => Promise<void>;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

export const useChat = (): UseChatReturn => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!user || !localStorage.getItem('token')) {
      setConversations([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await chatAPI.getConversations();
      if (response.data.success) {
        setConversations(response.data.data.items);
      }
    } catch (err: any) {
      // If it's a 403 error, don't show error, just set empty conversations
      if (err.response?.status === 403) {
        setConversations([]);
        setError(null);
      } else {
        setError(err.response?.data?.message || 'Failed to load conversations');
      }
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string, before?: string) => {
    try {
      setLoading(true);
      setError(null);
      const params = before ? { before } : {};
      const response = await chatAPI.getMessages(conversationId, params);
      if (response.data.success) {
        if (before) {
          // Prepend older messages
          setMessages(prev => [...response.data.data.items, ...prev]);
        } else {
          // Replace messages
          setMessages(response.data.data.items);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (
    content: string, 
    type: string = 'text', 
    replyTo?: string, 
    attachments?: any[]
  ) => {
    if (!currentConversation || !content.trim()) return;

    try {
      setError(null);
      const messageData = {
        content: content.trim(),
        message_type: type,
        reply_to_message_id: replyTo,
        attachments: attachments || []
      };

      const response = await chatAPI.sendMessage(currentConversation.id, messageData);
      if (response.data.success) {
        // Add the new message to the current messages
        setMessages(prev => [...prev, response.data.data]);
        
        // Update the conversation's last message
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentConversation.id 
              ? { ...conv, lastMessage: response.data.data, updatedAt: new Date().toISOString() }
              : conv
          )
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message');
      console.error('Error sending message:', err);
    }
  }, [currentConversation]);

  // Create new conversation
  const createConversation = useCallback(async (
    participantIds: string[], 
    name?: string, 
    type: string = 'direct'
  ): Promise<Conversation> => {
    try {
      setError(null);
      const conversationData = {
        name,
        type,
        participantIds
      };

      const response = await chatAPI.createConversation(conversationData);
      if (response.data.success) {
        const newConversation = response.data.data;
        setConversations(prev => [newConversation, ...prev]);
        return newConversation;
      }
      throw new Error('Failed to create conversation');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create conversation');
      console.error('Error creating conversation:', err);
      throw err;
    }
  }, []);

  // Select conversation
  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      loadMessages(conversationId);
    }
  }, [conversations, loadMessages]);

  // Refresh conversations
  const refreshConversations = useCallback(async () => {
    await loadConversations();
  }, [loadConversations]);

  // Handle typing indicator
  const handleTyping = useCallback((typing: boolean) => {
    setIsTyping(typing);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (typing) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  }, []);

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    sendMessage,
    loadMessages,
    createConversation,
    selectConversation,
    refreshConversations,
    isTyping,
    setIsTyping: handleTyping
  };
};