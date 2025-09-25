import { AxiosResponse } from 'axios';

// Message interface
export interface Message {
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

// Conversation interface
export interface Conversation {
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

// Channel interface
export interface Channel {
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

// Contact interface
export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
}

// Chat Stats interface
export interface ChatStats {
  totalConversations: number;
  totalMessages: number;
  unreadMessages: number;
  activeUsers: number;
  totalChannels: number;
  totalContacts: number;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  items?: T[];
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

// Chat API interface
export interface ChatAPI {
  // Conversations
  getConversations: (params?: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<Conversation[]>>>;
  getConversationById: (id: string) => Promise<AxiosResponse<ApiResponse<Conversation>>>;
  createConversation: (data: Partial<Conversation>) => Promise<AxiosResponse<ApiResponse<Conversation>>>;
  updateConversation: (id: string, data: Partial<Conversation>) => Promise<AxiosResponse<ApiResponse<Conversation>>>;
  deleteConversation: (id: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // Messages
  getMessages: (conversationId: string, params?: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<Message[]>>>;
  sendMessage: (conversationId: string, data: Partial<Message>) => Promise<AxiosResponse<ApiResponse<Message>>>;
  updateMessage: (conversationId: string, messageId: string, data: Partial<Message>) => Promise<AxiosResponse<ApiResponse<Message>>>;
  deleteMessage: (conversationId: string, messageId: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // Channels
  getChannels: (params?: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<Channel[]>>>;
  getChannelById: (id: string) => Promise<AxiosResponse<ApiResponse<Channel>>>;
  createChannel: (data: Partial<Channel>) => Promise<AxiosResponse<ApiResponse<Channel>>>;
  updateChannel: (id: string, data: Partial<Channel>) => Promise<AxiosResponse<ApiResponse<Channel>>>;
  deleteChannel: (id: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  joinChannel: (id: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  leaveChannel: (id: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // Contacts
  getContacts: (params?: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<Contact[]>>>;
  getContactById: (id: string) => Promise<AxiosResponse<ApiResponse<Contact>>>;
  addContact: (data: Partial<Contact>) => Promise<AxiosResponse<ApiResponse<Contact>>>;
  removeContact: (id: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // File Upload
  uploadFile: (conversationId: string, file: File) => Promise<AxiosResponse<ApiResponse<{ fileUrl: string }>>>;
  
  // Message Reactions
  addReaction: (conversationId: string, messageId: string, reaction: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  removeReaction: (conversationId: string, messageId: string, reaction: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // Message Status
  markAsRead: (conversationId: string, messageId: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  markConversationAsRead: (conversationId: string) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // Typing Indicators
  sendTypingIndicator: (conversationId: string, isTyping: boolean) => Promise<AxiosResponse<ApiResponse<void>>>;
  
  // Search
  searchMessages: (query: string, params?: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<Message[]>>>;
  
  // Statistics
  getStats: () => Promise<AxiosResponse<ApiResponse<ChatStats>>>;
  
  // Legacy endpoints
  getAll: (params?: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<unknown[]>>>;
  getById: (id: string) => Promise<AxiosResponse<ApiResponse<unknown>>>;
  create: (data: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<unknown>>>;
  update: (id: string, data: Record<string, unknown>) => Promise<AxiosResponse<ApiResponse<unknown>>>;
  delete: (id: string) => Promise<AxiosResponse<ApiResponse<void>>>;
} 