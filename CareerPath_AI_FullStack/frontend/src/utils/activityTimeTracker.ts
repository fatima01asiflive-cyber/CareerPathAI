import { getCurrentUserId, userScopedKey } from './userScopedStorage';

export type ActivityFeature = 'resources' | 'chatbot' | 'merit-calculator' | 'time-calculator' | 'app';

const STORAGE_KEY = 'careerpath_activity_time_v1';
const HISTORY_KEY = 'careerpath_activity_history_v2';
const DAILY_GOAL_SECONDS = 30 * 60;

export interface ActivityTime { resources: number; chatbot: number; 'merit-calculator': number; 'time-calculator': number; app: number; }
export interface DailyActivity { date: string; appSeconds: number; resourcesSeconds: number; chatbotSeconds: number; timerSeconds: number; assessmentSeconds: number; roadmapSeconds: number; totalSeconds: number; streakCredited: boolean; weeklyBonusClaimed?: boolean; }

const EMPTY: ActivityTime = { resources: 0, chatbot: 0, 'merit-calculator': 0, 'time-calculator': 0, app: 0 };
const scoped = (key: string) => userScopedKey(key, getCurrentUserId());
function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

function readHistory(): Record<string, DailyActivity> {
  try { const raw = localStorage.getItem(scoped(HISTORY_KEY)); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}
function writeHistory(history: Record<string, DailyActivity>) { try { localStorage.setItem(scoped(HISTORY_KEY), JSON.stringify(history)); } catch {} }
function ensureDay(date = today()): DailyActivity {
  const history = readHistory();
  if (!history[date]) {
    history[date] = { date, appSeconds: 0, resourcesSeconds: 0, chatbotSeconds: 0, timerSeconds: 0, assessmentSeconds: 0, roadmapSeconds: 0, totalSeconds: 0, streakCredited: false, weeklyBonusClaimed: false };
    writeHistory(history);
  }
  return history[date];
}

export function getActivityTime(): ActivityTime {
  try { const raw = localStorage.getItem(scoped(STORAGE_KEY)); return raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY }; } catch { return { ...EMPTY }; }
}
export function addActivityTime(feature: ActivityFeature, seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return getActivityTime();
  const current = getActivityTime();
  current[feature] = Math.max(0, Math.round(current[feature] + seconds));
  try { localStorage.setItem(scoped(STORAGE_KEY), JSON.stringify(current)); } catch {}
  const history = readHistory(); const date = today(); const day = history[date] || ensureDay(date);
  if (feature === 'app') day.appSeconds += Math.round(seconds);
  if (feature === 'resources') day.resourcesSeconds += Math.round(seconds);
  if (feature === 'chatbot') day.chatbotSeconds += Math.round(seconds);
  if (feature === 'time-calculator') day.timerSeconds += Math.round(seconds);
  if (feature === 'app') day.totalSeconds += Math.round(seconds);
  history[date] = day; writeHistory(history); return current;
}
export function getDailyActivity(date = today()): DailyActivity { return ensureDay(date); }
export function getActivityHistory(limit = 90): DailyActivity[] { return Object.values(readHistory()).sort((a,b)=>b.date.localeCompare(a.date)).slice(0, limit); }
export function getActiveDaysInLast7Days(): number {
  const history = readHistory(); let count = 0; const now = new Date();
  for (let i=0;i<7;i++) { const d = new Date(now); d.setHours(0,0,0,0); d.setDate(now.getDate()-i); const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; if (history[key]?.streakCredited) count++; }
  return count;
}
export function getDailyGoalSeconds() { return DAILY_GOAL_SECONDS; }
export function markTodayStreakCredited() { const history=readHistory(); const date=today(); const day=history[date]||ensureDay(date); day.streakCredited=true; history[date]=day; writeHistory(history); }
export function isTodayStreakCredited() { return getDailyActivity().streakCredited; }
export function markWeeklyBonusClaimed() { const history=readHistory(); const date=today(); const day=history[date]||ensureDay(date); day.weeklyBonusClaimed=true; history[date]=day; writeHistory(history); }
export function isWeeklyBonusClaimed() { return Boolean(getDailyActivity().weeklyBonusClaimed); }
export function completeManualDailyStreak(): { streakCount:number; alreadyCompleted:boolean } {
  const history=readHistory(); const date=today(); const day=history[date]||ensureDay(date);
  if (day.streakCredited) { const raw=localStorage.getItem(scoped('cp_user_streak'))||'0'; return { streakCount:Math.max(0,Number(raw)||0), alreadyCompleted:true }; }
  const raw=localStorage.getItem(scoped('cp_user_streak'))||'0'; const previous=Math.max(0,Number(raw)||0);
  const last=localStorage.getItem(scoped('cp_last_manual_streak_date')) || ''; let next=previous;
  if (last !== date) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
    const y=`${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;
    next=previous>0 && last===y ? previous+1 : 1;
    localStorage.setItem(scoped('cp_last_manual_streak_date'), date); localStorage.setItem(scoped('cp_user_streak'), String(next));
    day.streakCredited=true; history[date]=day; writeHistory(history);
    try { window.dispatchEvent(new CustomEvent('careerpath:streak-updated')); } catch {}
  }
  return { streakCount:next, alreadyCompleted:false };
}
export function formatActivityTime(seconds:number):string { const safe=Math.max(0,Math.floor(seconds||0)); const hours=Math.floor(safe/3600); const mins=Math.floor((safe%3600)/60); const secs=safe%60; if(hours>0)return `${hours}h ${mins}m`; if(mins>0)return `${mins}m ${secs}s`; return `${secs}s`; }
export const ACTIVITY_DAILY_GOAL_SECONDS = DAILY_GOAL_SECONDS;
