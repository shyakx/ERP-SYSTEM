import { useState, useEffect, useCallback, useRef } from 'react';
import { chatAPI } from '../services/api';
import { Message, Conversation, Channel, Contact, ChatStats } from '../types/api';

// Type assertion to bypass TypeScript errors
const typedChatAPI = chatAPI as any;

export const useMessaging = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({});
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [isTyping, setIsTyping] = useState<{ [conversationId: string]: boolean }>({});
  
  const typingTimeoutRef = useRef<{ [conversationId: string]: NodeJS.Timeout }>({});

  // Load conversations
  const loadConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await typedChatAPI.getConversations();
      if (response.data.success) {
        setConversations(response.data.items || []);
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load channels
  const loadChannels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await typedChatAPI.getChannels();
      if (response.data.success) {
        setChannels(response.data.items || []);
      }
    } catch (err) {
      console.error('Error loading channels:', err);
      setError('Failed to load channels');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load contacts
  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await typedChatAPI.getContacts();
      if (response.data.success) {
        setContacts(response.data.items || []);
      }
    } catch (err) {
      console.error('Error loading contacts:', err);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading messages for conversation:', conversationId);
      const response = await typedChatAPI.getMessages(conversationId);
      if (response.data.success) {
        const messagesData = response.data.items || [];
        console.log('📨 Loaded messages:', messagesData);
        setMessages(prev => ({
          ...prev,
          [conversationId]: messagesData
        }));
      }
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (conversationId: string, content: string, type: 'text' | 'file' = 'text', file?: File) => {
    try {
      setError(null);
      
      let messageData: any = {
        content,
        type
      };

      if (file) {
        const uploadResponse = await typedChatAPI.uploadFile(conversationId, file);
        if (uploadResponse.data.success) {
          messageData = {
            ...messageData,
            fileUrl: uploadResponse.data.fileUrl,
            fileName: file.name,
            fileSize: file.size
          };
        }
      }

      const response = await typedChatAPI.sendMessage(conversationId, messageData);
      console.log('📤 SendMessage response:', response);
      if (response.data.success) {
        const newMessage = response.data.message;
        console.log('📨 New message created:', newMessage);
        setMessages(prev => {
          const updatedMessages = {
            ...prev,
            [conversationId]: [...(prev[conversationId] || []), newMessage]
          };
          console.log('📋 Updated messages for conversation:', conversationId, updatedMessages[conversationId]);
          return updatedMessages;
        });

        // Update conversation's last message
        setConversations(prev => 
          prev.map(conv => 
            conv.id === conversationId 
              ? { 
                  ...conv, 
                  lastMessage: content,
                  lastMessageTime: 'Just now',
                  unreadCount: 0
                }
              : conv
          )
        );

        return newMessage;
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      throw err;
    }
  }, []);

  // Add reaction to message
  const addReaction = useCallback(async (conversationId: string, messageId: string, reaction: string) => {
    try {
      const response = await typedChatAPI.addReaction(conversationId, messageId, reaction);
      if (response.data.success) {
        setMessages(prev => ({
          ...prev,
          [conversationId]: prev[conversationId]?.map(msg =>
            msg.id === messageId
              ? {
                  ...msg,
                  reactions: [...msg.reactions, { emoji: reaction, count: 1, users: ['You'] }]
                }
              : msg
          ) || []
        }));
      }
    } catch (err) {
      console.error('Error adding reaction:', err);
      setError('Failed to add reaction');
    }
  }, []);

  // Mark conversation as read
  const markAsRead = useCallback(async (conversationId: string) => {
    try {
      await typedChatAPI.markConversationAsRead(conversationId);
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, []);

  // Send typing indicator
  const sendTypingIndicator = useCallback(async (conversationId: string, isTyping: boolean) => {
    try {
      // Clear existing timeout
      if (typingTimeoutRef.current[conversationId]) {
        clearTimeout(typingTimeoutRef.current[conversationId]);
      }

      // Set typing indicator
      setIsTyping(prev => ({ ...prev, [conversationId]: isTyping }));

      // Send to server
      await typedChatAPI.sendTypingIndicator(conversationId, isTyping);

      // Auto-clear typing indicator after 3 seconds
      if (isTyping) {
        typingTimeoutRef.current[conversationId] = setTimeout(() => {
          setIsTyping(prev => ({ ...prev, [conversationId]: false }));
        }, 3000);
      }
    } catch (err) {
      console.error('Error sending typing indicator:', err);
    }
  }, []);

  // Create new conversation
  const createConversation = useCallback(async (data: Partial<Conversation>) => {
    try {
      setError(null);
      const response = await typedChatAPI.createConversation(data);
      if (response.data.success) {
        const newConversation = response.data.conversation;
        setConversations(prev => [...prev, newConversation]);
        return newConversation;
      }
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Failed to create conversation');
      throw err;
    }
  }, []);

  // Join channel
  const joinChannel = useCallback(async (channelId: string) => {
    try {
      const response = await typedChatAPI.joinChannel(channelId);
      if (response.data.success) {
        setChannels(prev => 
          prev.map(channel => 
            channel.id === channelId 
              ? { ...channel, isJoined: true }
              : channel
          )
        );
      }
    } catch (err) {
      console.error('Error joining channel:', err);
      setError('Failed to join channel');
    }
  }, []);

  // Load chat statistics
  const loadStats = useCallback(async () => {
    try {
      const response = await typedChatAPI.getStats();
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error('Error loading chat stats:', err);
    }
  }, []);

  // Search messages
  const searchMessages = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const response = await typedChatAPI.searchMessages(query);
      if (response.data.success) {
        return response.data.items || [];
      }
      return [];
    } catch (err) {
      console.error('Error searching messages:', err);
      setError('Failed to search messages');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize messaging
  useEffect(() => {
    loadConversations();
    loadChannels();
    loadContacts();
    loadStats();
  }, [loadConversations, loadChannels, loadContacts, loadStats]);

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
      markAsRead(selectedConversation);
    }
  }, [selectedConversation, loadMessages, markAsRead]);

  // Cleanup typing timeouts
  useEffect(() => {
    return () => {
      Object.values(typingTimeoutRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return {
    // State
    conversations,
    channels,
    contacts,
    messages,
    selectedConversation,
    loading,
    error,
    stats,
    isTyping,
    
    // Actions
    setSelectedConversation,
    sendMessage,
    addReaction,
    markAsRead,
    sendTypingIndicator,
    createConversation,
    joinChannel,
    searchMessages,
    loadConversations,
    loadChannels,
    loadContacts,
    loadMessages,
    loadStats,
    
    // Computed values
    currentMessages: (() => {
      const currentMsgs = selectedConversation ? messages[selectedConversation] || [] : [];
      console.log('📋 Current messages for conversation:', selectedConversation, currentMsgs);
      return currentMsgs;
    })(),
    currentConversation: conversations.find(conv => conv.id === selectedConversation),
    totalUnreadCount: conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  };
}; 