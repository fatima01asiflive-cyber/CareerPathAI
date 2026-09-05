import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock3, RefreshCw } from 'lucide-react';
import { formatActivityTime, getActivityHistory, DailyActivity } from '../utils/activityTimeTracker';

export const ActivityHistory: React.FC = () => {
  const [history, setHistory] = useState<DailyActivity[]>(getActivityHistory());

  const refresh = () => setHistory(getActivityHistory());

  useEffect(() => {
    const id = window.setInterval(refresh, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-sky-400" /> Activity History
          </h2>
          <p className="text-xs text-slate-500 mt-1">Your learning activity is stored date-by-date on this device.</p>
        </div>
        <button onClick={refresh} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800" title="Refresh history">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {history.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">No activity recorded yet. Start learning to create your first history entry.</div>
      ) : (
        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {history.map((day) => (
            <div key={day.date} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">{new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Clock3 className="w-3 h-3" /> Active app time: {formatActivityTime(day.totalSeconds)}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${day.totalSeconds >= 1800 ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-300 bg-amber-500/10 border-amber-500/20'}`}>
                  {day.totalSeconds >= 1800 ? '30-min goal reached' : 'Goal in progress'}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <HistoryItem label="Resources" value={day.resourcesSeconds} />
                <HistoryItem label="AI Chatbot" value={day.chatbotSeconds} />
                <HistoryItem label="Focus Timer" value={day.timerSeconds} />
                <HistoryItem label="App Active" value={day.appSeconds} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const HistoryItem = ({ label, value }: { label: string; value: number }) => (
  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
    <span className="text-[9px] text-slate-500 uppercase font-bold">{label}</span>
    <strong className="block text-xs text-slate-200 mt-1">{formatActivityTime(value)}</strong>
  </div>
);
