import { AppNotification } from '../types';
import { readUserScoped, userScopedKey, writeUserScoped } from '../utils/userScopedStorage';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [];
const BASE_KEY = 'intellipath_notifications_state';
const NOTIFICATION_EVENT = 'careerpath:notifications-updated';
const emit = () => { try { window.dispatchEvent(new CustomEvent(NOTIFICATION_EVENT)); } catch {} };

export const notificationService = {
  getNotifications(): AppNotification[] {
    return readUserScoped<AppNotification[]>(BASE_KEY, INITIAL_NOTIFICATIONS);
  },

  markAllAsRead(): AppNotification[] {
    const next = this.getNotifications().map((n) => ({ ...n, read: true }));
    writeUserScoped(BASE_KEY, next); emit(); return next;
  },

  markAsRead(id: string): AppNotification[] {
    const next = this.getNotifications().map((n) => n.id === id ? { ...n, read: true } : n);
    writeUserScoped(BASE_KEY, next); emit(); return next;
  },

  addNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): AppNotification[] {
    const signature = `${notification.type}|${notification.title}|${notification.message}`;
    const current = this.getNotifications();
    const duplicate = current.find((n) => `${n.type}|${n.title}|${n.message}` === signature);
    if (duplicate) return current;
    const item: AppNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    const next = [item, ...current].slice(0, 100);
    writeUserScoped(BASE_KEY, next); emit();
    try { window.dispatchEvent(new CustomEvent('careerpath:notification')); } catch {}
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(item.title, { body: item.message });
      }
    } catch {}
    return next;
  },

  ensureProjectDeadlineNotification(projectId: string, projectTitle: string, deadlineLabel: string, actionUrl = '/projects') {
    const key = `deadline-reminder-${projectId}-${new Date().toISOString().slice(0, 10)}`;
    const current = this.getNotifications();
    if (current.some((n) => n.id === key)) return current;
    const item: AppNotification = {
      id: key,
      type: 'project',
      title: `Project deadline approaching: ${projectTitle}`,
      message: `${projectTitle} is due ${deadlineLabel}. Submit your GitHub repository and live deployment for the industry review.` + '',
      timestamp: new Date().toLocaleString(),
      read: false,
      actionUrl,
    };
    const next = [item, ...current].slice(0, 100);
    writeUserScoped(BASE_KEY, next); emit();
    try { window.dispatchEvent(new CustomEvent('careerpath:notification')); } catch {}
    try {
      if ('Notification' in window && Notification.permission === 'granted') new Notification(item.title, { body: item.message });
    } catch {}
    return next;
  },

  getUnreadCount(): number { return this.getNotifications().filter((n) => !n.read).length; },
};

export const notificationStorageKey = () => userScopedKey(BASE_KEY);
