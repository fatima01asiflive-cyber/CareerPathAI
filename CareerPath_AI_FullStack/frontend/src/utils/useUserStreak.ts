import { useMemo, useState } from 'react';
import { getCurrentUserId, userScopedKey } from './userScopedStorage';

export interface StreakData {
  streakCount: number; lastPresenceDate: string; totalActiveDays: number; presenceHistory: string[];
  missedDates: string[]; hasVisitedToday: boolean; streakShields: number; blankSpacePending: boolean;
  missedStreakMessage: string | null; formattedDate: string; formattedTime: string; formattedMonthYear: string;
  currentYear: number; currentMonth: number; currentDay: number;
}

const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const timeInfo = () => { const d = new Date(); return { formattedDate:d.toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'}), formattedTime:d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'}), formattedMonthYear:d.toLocaleDateString(undefined,{month:'long',year:'numeric'}), currentYear:d.getFullYear(),currentMonth:d.getMonth(),currentDay:d.getDate() }; };

export function useUserStreak() {
  const [, setVersion] = useState(0);
  const data = useMemo<StreakData>(() => {
    const uid = getCurrentUserId();
    const history = JSON.parse(localStorage.getItem(userScopedKey('cp_presence_history', uid)) || '[]');
    const streak = Number(localStorage.getItem(userScopedKey('cp_user_streak', uid)) || '0');
    const last = localStorage.getItem(userScopedKey('cp_last_manual_streak_date', uid)) || '';
    const t = today();
    const cleanHistory = Array.isArray(history) ? history.filter((x): x is string => typeof x === 'string') : [];
    return { streakCount: Number.isFinite(streak) ? streak : 0, lastPresenceDate:last, totalActiveDays:cleanHistory.length, presenceHistory:cleanHistory, missedDates:[], hasVisitedToday:last===t, streakShields:0, blankSpacePending:false, missedStreakMessage:null, ...timeInfo() };
  }, []);

  const logActivity = () => setVersion(v => v + 1);
  const fillBlankSpace = () => setVersion(v => v + 1);
  return { ...data, logActivity, fillBlankSpace };
}
