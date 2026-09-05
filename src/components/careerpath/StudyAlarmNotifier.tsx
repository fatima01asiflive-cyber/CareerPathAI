import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import { getStudyAlarms } from '../../utils/notificationSchedules';
import { writeUserScoped } from '../../utils/userScopedStorage';

function parseTime(value: string) {
  const m = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]); const minute = Number(m[2]);
  if (h === 12) h = 0;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return { h, minute };
}

export function StudyAlarmNotifier() {
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.id) return;
    const check = () => {
      const now = new Date();
      const dayKey = now.toISOString().slice(0, 10);
      getStudyAlarms().forEach((alarm) => {
        if (!alarm.enabled) return;
        const parsed = parseTime(alarm.time);
        if (!parsed || parsed.h !== now.getHours() || parsed.minute !== now.getMinutes()) return;
        const notificationId = `schedule-${alarm.id}-${dayKey}`;
        const exists = notificationService.getNotifications().some((n) => n.id === notificationId);
        if (exists) return;
        const next = notificationService.addNotification({ type: alarm.id === 'alarm-4' ? 'project' : 'milestone', title: alarm.title, message: alarm.subtitle, actionUrl: alarm.actionUrl });
        // Replace the generated id with a deterministic daily id to prevent duplicate notifications.
        const adjusted = next.map((n) => n.title === alarm.title && n.id.startsWith('notif-') ? { ...n, id: notificationId } : n);
        try { writeUserScoped('intellipath_notifications_state', adjusted, user.id); } catch {}
      });
    };
    check();
    const id = window.setInterval(check, 15000);
    return () => window.clearInterval(id);
  }, [user?.id]);
  return null;
}
