import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Clock, Volume2, Sparkles, CheckCircle2, ShieldCheck, Play } from 'lucide-react';
import { getStudyAlarms, saveStudyAlarms, StudyAlarm } from '../utils/notificationSchedules';

export const Notifications: React.FC = () => {
  const { notifications, markNotifsAsRead } = useAuth();

  const [alarms, setAlarms] = useState<StudyAlarm[]>(getStudyAlarms);

  React.useEffect(() => {
    saveStudyAlarms(alarms);
  }, [alarms]);

  const [testSoundPlaying, setTestSoundPlaying] = useState<string | null>(null);

  React.useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const toggleAlarm = (id: string) => {
    setAlarms(prev =>
      prev.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const playTestChime = (id: string) => {
    setTestSoundPlaying(id);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('AudioContext not allowed without gesture');
    }
    setTimeout(() => setTestSoundPlaying(null), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>CareerPath AI Learning Activity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
            Study Alarms & Project Deadline Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Stay consistent with Computer Science learning and never miss a course project submission deadline.
          </p>
        </div>

        <button
          onClick={markNotifsAsRead}
          className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 transition-colors shrink-0 flex items-center gap-1.5 font-bold"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* 4 Daily Study Alarms Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Daily Scheduled Study Alarms
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {alarms.filter(a => a.enabled).length}/4 Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alarms.map((alarm) => (
            <div
              key={alarm.id}
              className={`p-5 rounded-3xl border transition-all space-y-4 backdrop-blur-xl ${
                alarm.enabled
                  ? 'bg-slate-900/90 border-slate-700 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-60'
              }`}
            >
              {/* Header & Toggle */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2.5 rounded-2xl ${
                    alarm.period === 'Morning'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : alarm.period === 'Afternoon'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : alarm.period === 'Evening'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white font-mono">{alarm.time}</span>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">{alarm.period} Routine</span>
                  </div>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => toggleAlarm(alarm.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    alarm.enabled ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                  aria-label="Toggle alarm"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      alarm.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-sm font-bold text-white">{alarm.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alarm.subtitle}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => playTestChime(alarm.id)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Test alarm sound"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${testSoundPlaying === alarm.id ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
                  <span>{testSoundPlaying === alarm.id ? 'Playing...' : 'Test Sound'}</span>
                </button>

                <Link
                  to={alarm.actionUrl}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>{alarm.actionLabel}</span>
                  <Play className="w-3 h-3 fill-current" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General System & Milestone Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recent System & Diagnostic Alerts
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">{notifications.length} Total</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                n.read
                  ? 'bg-slate-950/60 border-slate-800/80'
                  : 'bg-slate-950 border-sky-500/30 shadow-md shadow-sky-500/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    n.type === 'recommendation'
                      ? 'bg-sky-500/20 text-sky-400'
                      : n.type === 'milestone'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : n.type === 'project'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {n.type === 'recommendation'
                      ? 'auto_awesome'
                      : n.type === 'milestone'
                      ? 'flag'
                      : n.type === 'project'
                      ? 'assignment'
                      : 'school'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{n.title}</h3>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    {n.timestamp}
                  </span>
                </div>
              </div>

              {n.actionUrl && (
                <Link
                  to={n.actionUrl}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-white font-bold transition-colors self-end sm:self-auto shrink-0"
                >
                  View Detail
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
