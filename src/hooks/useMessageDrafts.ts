import { useState, useEffect, useCallback } from 'react';

interface MessageDraft {
  id: string;
  conversationId: string;
  content: string;
  attachments?: File[];
  replyToMessageId?: string;
  scheduledFor?: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseMessageDraftsReturn {
  drafts: MessageDraft[];
  saveDraft: (conversationId: string, content: string, attachments?: File[], replyTo?: string) => void;
  updateDraft: (draftId: string, content: string, attachments?: File[]) => void;
  deleteDraft: (draftId: string) => void;
  getDraftForConversation: (conversationId: string) => MessageDraft | null;
  scheduleMessage: (conversationId: string, content: string, scheduledFor: string, attachments?: File[], replyTo?: string) => void;
  getScheduledMessages: () => MessageDraft[];
  cancelScheduledMessage: (draftId: string) => void;
  clearDrafts: () => void;
}

const DRAFTS_STORAGE_KEY = 'dicel_message_drafts';
const SCHEDULED_STORAGE_KEY = 'dicel_scheduled_messages';

export const useMessageDrafts = (): UseMessageDraftsReturn => {
  const [drafts, setDrafts] = useState<MessageDraft[]>([]);
  const [scheduledMessages, setScheduledMessages] = useState<MessageDraft[]>([]);

  // Load drafts from localStorage on mount
  useEffect(() => {
    try {
      const savedDrafts = localStorage.getItem(DRAFTS_STORAGE_KEY);
      const savedScheduled = localStorage.getItem(SCHEDULED_STORAGE_KEY);
      
      if (savedDrafts) {
        const parsedDrafts = JSON.parse(savedDrafts);
        // Convert attachment data back to File objects if needed
        setDrafts(parsedDrafts);
      }
      
      if (savedScheduled) {
        setScheduledMessages(JSON.parse(savedScheduled));
      }
    } catch (error) {
      console.error('Failed to load drafts from localStorage:', error);
    }
  }, []);

  // Save drafts to localStorage whenever drafts change
  useEffect(() => {
    try {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    } catch (error) {
      console.error('Failed to save drafts to localStorage:', error);
    }
  }, [drafts]);

  // Save scheduled messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(SCHEDULED_STORAGE_KEY, JSON.stringify(scheduledMessages));
    } catch (error) {
      console.error('Failed to save scheduled messages to localStorage:', error);
    }
  }, [scheduledMessages]);

  // Check for scheduled messages that should be sent
  useEffect(() => {
    const checkScheduledMessages = () => {
      const now = new Date();
      const messagesToSend = scheduledMessages.filter(
        message => new Date(message.scheduledFor!) <= now
      );

      if (messagesToSend.length > 0) {
        // In a real app, you would send these messages via API
        console.log('Messages ready to send:', messagesToSend);
        
        // Remove sent messages from scheduled list
        setScheduledMessages(prev => 
          prev.filter(message => !messagesToSend.some(sent => sent.id === message.id))
        );
      }
    };

    // Check every minute
    const interval = setInterval(checkScheduledMessages, 60000);
    checkScheduledMessages(); // Check immediately

    return () => clearInterval(interval);
  }, [scheduledMessages]);

  const saveDraft = useCallback((
    conversationId: string, 
    content: string, 
    attachments?: File[], 
    replyTo?: string
  ) => {
    const now = new Date().toISOString();
    
    // Check if draft already exists for this conversation
    const existingDraftIndex = drafts.findIndex(draft => draft.conversationId === conversationId);
    
    const draftData: MessageDraft = {
      id: existingDraftIndex >= 0 ? drafts[existingDraftIndex].id : Date.now().toString(),
      conversationId,
      content,
      attachments: attachments || [],
      replyToMessageId: replyTo,
      isDraft: true,
      createdAt: existingDraftIndex >= 0 ? drafts[existingDraftIndex].createdAt : now,
      updatedAt: now
    };

    if (existingDraftIndex >= 0) {
      // Update existing draft
      setDrafts(prev => prev.map((draft, index) => 
        index === existingDraftIndex ? draftData : draft
      ));
    } else {
      // Create new draft
      setDrafts(prev => [draftData, ...prev]);
    }
  }, [drafts]);

  const updateDraft = useCallback((
    draftId: string, 
    content: string, 
    attachments?: File[]
  ) => {
    setDrafts(prev => prev.map(draft => 
      draft.id === draftId 
        ? { 
            ...draft, 
            content, 
            attachments: attachments || draft.attachments,
            updatedAt: new Date().toISOString()
          }
        : draft
    ));
  }, []);

  const deleteDraft = useCallback((draftId: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== draftId));
  }, []);

  const getDraftForConversation = useCallback((conversationId: string) => {
    return drafts.find(draft => draft.conversationId === conversationId) || null;
  }, [drafts]);

  const scheduleMessage = useCallback((
    conversationId: string, 
    content: string, 
    scheduledFor: string,
    attachments?: File[],
    replyTo?: string
  ) => {
    const now = new Date().toISOString();
    
    const scheduledMessage: MessageDraft = {
      id: Date.now().toString(),
      conversationId,
      content,
      attachments: attachments || [],
      replyToMessageId: replyTo,
      scheduledFor,
      isDraft: false,
      createdAt: now,
      updatedAt: now
    };

    setScheduledMessages(prev => [scheduledMessage, ...prev]);
    
    // Remove any draft for this conversation since we're scheduling it
    setDrafts(prev => prev.filter(draft => draft.conversationId !== conversationId));
  }, []);

  const getScheduledMessages = useCallback(() => {
    return scheduledMessages.sort((a, b) => 
      new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime()
    );
  }, [scheduledMessages]);

  const cancelScheduledMessage = useCallback((draftId: string) => {
    setScheduledMessages(prev => prev.filter(message => message.id !== draftId));
  }, []);

  const clearDrafts = useCallback(() => {
    setDrafts([]);
    setScheduledMessages([]);
    localStorage.removeItem(DRAFTS_STORAGE_KEY);
    localStorage.removeItem(SCHEDULED_STORAGE_KEY);
  }, []);

  return {
    drafts,
    saveDraft,
    updateDraft,
    deleteDraft,
    getDraftForConversation,
    scheduleMessage,
    getScheduledMessages,
    cancelScheduledMessage,
    clearDrafts
  };
};
