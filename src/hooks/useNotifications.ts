import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  type: 'message' | 'mention' | 'reaction' | 'system';
  title: string;
  message: string;
  senderId?: string;
  senderName?: string;
  conversationId?: string;
  messageId?: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  requestPermission: () => Promise<boolean>;
  showNotification: (title: string, body: string, icon?: string) => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      setPermission('granted');
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);
    return permission === 'granted';
  }, []);

  // Show browser notification
  const showNotification = useCallback((title: string, body: string, icon?: string) => {
    if (permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '/dicel-logo.png',
        badge: '/dicel-logo.png',
        tag: 'dicel-chat',
        requireInteraction: false,
        silent: false
      });

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Handle click to focus window
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }, [permission]);

  // Add new notification
  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const notification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep last 50 notifications

    // Show browser notification if not from current user
    if (notification.senderId !== user?.id && permission === 'granted') {
      showNotification(notification.title, notification.message);
    }
  }, [user?.id, permission, showNotification]);

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  // Clear specific notification
  const clearNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Auto-mark notifications as read when user is active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        // Mark message notifications as read when user becomes active
        setNotifications(prev => 
          prev.map(notification => 
            notification.type === 'message' && !notification.isRead
              ? { ...notification, isRead: true }
              : notification
          )
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    requestPermission,
    showNotification
  };
};
