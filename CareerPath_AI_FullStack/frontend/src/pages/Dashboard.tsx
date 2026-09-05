import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MeritCalculatorModal } from '../components/careerpath/MeritCalculatorModal';
import { StudyTimeCalculator } from '../components/careerpath/StudyTimeCalculator';
import { formatActivityTime, getActivityTime, getDailyActivity, getActivityHistory, completeManualDailyStreak, getActiveDaysInLast7Days } from '../utils/activityTimeTracker';
import { readUserScoped } from '../utils/userScopedStorage';
import { notificationService } from '../services/notificationService';
import {
  ArrowRight, BookOpen, CheckCircle2, Flame, GraduationCap, Map, Sparkles,
  Target, Trophy, Calculator, Clock3
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, updateProfile, roadmapCompletionPercentage, completedCoursesCount, completedProjectsCount } = useAuth();
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [weeklyGift, setWeeklyGift] = useState(false);
  const [streakMessage, setStreakMessage] = useState('');
  const [, setDashboardVersion] = useState(0);
  const activity = getActivityTime();

  const profileComplete = Boolean(
    user?.academicField &&
    user?.marksPercentage !== undefined &&
    user?.interests?.length &&
    user?.careerGoals?.length
  );

  const completion = useMemo(() => {
    const fields = [
      Boolean(user?.name),
      Boolean(user?.academicField),
      user?.marksPercentage !== undefined,
      Boolean(user?.favoriteSubjects),
      Boolean(user?.interests?.length),
      Boolean(user?.careerGoals?.length),
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [user]);

  const handleManualStreak = async () => {
    const result = completeManualDailyStreak();
    if (result.alreadyCompleted) {
      setStreakMessage('Today’s streak is already completed. Come back tomorrow.');
      return;
    }
    const latest = user;
    await updateProfile({
      streakCount: result.streakCount,
      xpPoints: (latest?.xpPoints || 0) + 50,
    });
    notificationService.addNotification({
      type: 'milestone',
      title: '🔥 Daily streak completed',
      message: `You manually completed today’s learning streak. +50 XP added. Current streak: ${result.streakCount} days.`,
      actionUrl: '/dashboard',
    });
    window.dispatchEvent(new CustomEvent('careerpath:notification'));
    window.dispatchEvent(new CustomEvent('careerpath:streak-updated'));
    setStreakMessage(`🔥 Day ${result.streakCount} completed! +50 XP`);
  };

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  })();

  useEffect(() => {
    const handler = () => {
      setWeeklyGift(true);
      window.setTimeout(() => setWeeklyGift(false), 7000);
    };
    window.addEventListener('careerpath:weekly-bonus', handler);
    return () => window.removeEventListener('careerpath:weekly-bonus', handler);
  }, []);

  useEffect(() => {
    const refresh = () => setDashboardVersion((v) => v + 1);
    const interval = window.setInterval(refresh, 1000);
    window.addEventListener('careerpath:streak-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('careerpath:streak-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);


  if (!profileComplete) {
    return (
      <div className="max-w-5xl mx-auto w-full py-8 animate-fade-in">
        <section className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900/90 to-violet-500/10 p-7 sm:p-10">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5">
            <Sparkles className="w-7 h-7 text-sky-400" />
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-sky-400">CareerPath AI</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">Let’s build your career profile first.</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-3 leading-relaxed">
            Your dashboard intentionally stays clean until we have enough student information. This prevents fake scores, irrelevant resources and incorrect career recommendations.
          </p>

          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ['Academic field', Boolean(user?.academicField)],
              ['Marks / GPA', user?.marksPercentage !== undefined],
              ['Interests', Boolean(user?.interests?.length)],
              ['Career goals', Boolean(user?.careerGoals?.length)],
            ].map(([label, done]) => (
              <div key={String(label)} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                <CheckCircle2 className={`w-4 h-4 ${done ? 'text-emerald-400' : 'text-slate-700'}`} />
                <p className="text-xs font-bold text-white mt-2">{String(label)}</p>
                <p className="text-[10px] text-slate-500 mt-1">{done ? 'Added' : 'Needed'}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/profile-setup" className="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 text-xs font-black inline-flex items-center gap-2">
              Complete Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/career" className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold">
              Explore Career Interests
            </Link>
          </div>

          <div className="mt-6 max-w-md">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
              <span>Profile readiness</span><span>{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  const persistedStreak = readUserScoped<number>('cp_user_streak', 0);
  const streak = Math.max(user?.streakCount || 0, Number.isFinite(persistedStreak) ? persistedStreak : 0);
  const xp = user?.xpPoints || 0;
  const aptitude = user?.aptitudeScore;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-400">{user?.academicField}</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">{greeting}, {user?.name} 👋</h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Your dashboard is now driven by your actual profile, assessment results and learning activity.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCalculatorOpen(true)} className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:border-sky-500/40 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-sky-400" /> Merit Calculator
            </button>
          </div>
        </div>
      </section>

      {weeklyGift && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-center gap-3 animate-fade-in">
          <div className="text-2xl">🎁</div>
          <div><p className="text-sm font-black text-white">Weekly Learning Gift Unlocked!</p><p className="text-xs text-amber-200">You completed a full week of activity. +10 bonus XP added.</p></div>
        </div>
      )}

      {streakMessage && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-amber-200">{streakMessage}</p>
          <button onClick={() => setStreakMessage('')} className="text-xs text-slate-400">Dismiss</button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat icon={<Target />} label="Roadmap" value={`${roadmapCompletionPercentage}%`} />
        <Stat icon={<Trophy />} label="XP" value={xp} />
        <Stat icon={<Flame />} label="Streak" value={`${streak} days`} />
        <Stat icon={<Sparkles />} label="Aptitude" value={aptitude !== undefined ? `${aptitude}%` : '—'} />
      </div>

      <section className="rounded-3xl border border-rose-500/20 bg-gradient-to-r from-rose-500/10 via-slate-900/90 to-amber-500/10 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-rose-300 font-black">🔥 Learning Streak</p>
            <h2 className="text-lg font-black text-white mt-1">{streak} day{streak === 1 ? '' : 's'} in a row</h2>
            <p className="text-xs text-slate-400 mt-1">Keep one learning action every day. Your streak is saved separately for your account.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center"><p className="text-[9px] text-slate-500 uppercase">7-day activity</p><p className="text-sm font-black text-white">{getActiveDaysInLast7Days()}/7</p></div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center"><p className="text-[9px] text-slate-500 uppercase">Today</p><p className="text-sm font-black text-rose-300">{getDailyActivity().streakCredited ? 'Done' : 'Pending'}</p></div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" /> Your 7-Day Journey
            </h3>
            <p className="text-xs text-slate-400 mt-1">Complete a real learning action each day to keep the streak alive.</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-amber-400">{streak}</span>
            <span className="text-xs text-slate-400 ml-1 block sm:inline">Day Streak</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {getLastSevenDays(getActivityHistory()).map((day) => (
            <div key={day.key} className="min-w-0">
              <div className={`h-20 sm:h-24 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${day.status === 'completed' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : day.status === 'today' ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                <span className="text-[10px] font-black uppercase tracking-wide">{day.label}</span>
                <span className="text-lg">{day.status === 'completed' ? '✓' : day.status === 'today' ? '🔥' : '•'}</span>
              </div>
              <p className="text-[9px] text-center text-slate-500 mt-1.5">{day.dateLabel}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-orange-500/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-300 font-black">Daily Streak Check-in</p>
          <h2 className="text-lg font-black text-white mt-1">Streak is completed by you — not by a timer.</h2>
          <p className="text-xs text-slate-400 mt-1">Open the app, finish your learning for the day, then press the button once. +50 XP is awarded once per day.</p>
        </div>
        <button onClick={handleManualStreak} className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-black hover:bg-amber-300 transition">Complete Today’s Streak 🔥</button>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-white">Your next steps</h2>
              <p className="text-xs text-slate-500 mt-1">Use your current profile to continue the career journey.</p>
            </div>
            <Link to="/roadmap" className="text-xs text-sky-400 font-bold flex items-center gap-1">Open roadmap <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <ActionCard to="/assessment" icon={<Target />} title="Take Assessment" text="Measure your current strengths and weak areas." />
            <ActionCard to="/resources" icon={<BookOpen />} title="Open Resources" text="See learning material matched to your academic field." />
            <ActionCard to="/roadmap" icon={<Map />} title="Continue Roadmap" text="Work on the next unlocked learning level." />
            <ActionCard to="/career" icon={<Sparkles />} title="Career Interests" text="Update interests and regenerate your direction." />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock3 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Activity summary</h2>
          </div>
          <div className="space-y-3 text-xs">
            <Row label="Resources" value={formatActivityTime(activity.resources)} />
            <Row label="AI Coach" value={formatActivityTime(activity.chatbot)} />
            <Row label="Merit Calculator" value={formatActivityTime(activity['merit-calculator'])} />
            <Row label="App active today" value={formatActivityTime(getDailyActivity().totalSeconds)} />
            <Row label="Projects completed" value={completedProjectsCount} />
          </div>
        </section>
      </div>

      <StudyTimeCalculator />
      <MeritCalculatorModal open={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
    </div>
  );
};

const getLastSevenDays = (history: ReturnType<typeof getActivityHistory>) => {
  const byDate = new Map(history.map((item) => [item.date, item]));
  const days: { key: string; label: string; dateLabel: string; status: 'completed' | 'today' | 'upcoming' }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    d.setDate(now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const item = byDate.get(key);
    const isToday = i === 0;
    days.push({
      key,
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      dateLabel: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      status: item?.streakCredited ? 'completed' : isToday ? 'today' : 'upcoming',
    });
  }
  return days;
};

const Stat = ({ icon, label, value }: { icon: React.ReactElement; label: string; value: React.ReactNode }) => (
  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
    <div className="text-sky-400 w-4 h-4">{React.cloneElement(icon, { size: 16 })}</div>
    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-3">{label}</p>
    <p className="text-lg font-black text-white mt-1">{value}</p>
  </div>
);

const ActionCard = ({ to, icon, title, text }: { to: string; icon: React.ReactNode; title: string; text: string }) => (
  <Link to={to} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all">
    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">{icon}</div>
    <h3 className="text-sm font-bold text-white mt-3">{title}</h3>
    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{text}</p>
  </Link>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
    <span className="text-slate-500">{label}</span><strong className="text-slate-200">{value}</strong>
  </div>
);
