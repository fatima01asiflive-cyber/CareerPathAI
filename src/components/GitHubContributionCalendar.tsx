import React, { useState, useEffect } from 'react';
import { useUserStreak } from '../utils/useUserStreak';

interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number; // 0 to 10+
  month: number; // 0 to 11
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  isMissed?: boolean;
}

interface GitHubContributionCalendarProps {
  isDarkMode: boolean;
}

export const GitHubContributionCalendar: React.FC<GitHubContributionCalendarProps> = ({ isDarkMode }) => {
  const {
    streakData,
    logActivity,
    fillBlankSpace,
    simulateMissedDay,
    dismissMissedStreakAlert,
  } = useUserStreak();

  // Generate 7-day rolling window dates
  const generateSevenDayWindow = () => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const dayNum = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${monthNum}-${dayNum}`;
      const dayName = d.toLocaleDateString(undefined, { weekday: 'short' });
      const isToday = i === 0;
      const isMissed = streakData.missedDates?.includes(dateStr);
      const isCompleted = streakData.presenceHistory?.includes(dateStr);

      days.push({
        date: dateStr,
        dayName,
        isToday,
        isMissed,
        isCompleted,
        dayNumber: d.getDate(),
      });
    }
    return days;
  };

  // Generate a realistic 365-day grid ending today
  const generateInitialData = (): ContributionDay[] => {
    const days: ContributionDay[] = [];
    const today = new Date();

    // 52 weeks * 7 days = 364 days
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const dayNum = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${monthNum}-${dayNum}`;
      const month = d.getMonth();
      const dayOfWeek = d.getDay();

      // Check presence or missed status
      const isPresenceRecorded = streakData?.presenceHistory?.includes(dateStr);
      const isMissed = streakData?.missedDates?.includes(dateStr);

      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      let count = isPresenceRecorded ? 5 : 0;
      const seed = (i * 17 + month * 31) % 100;
      if (seed > 35 && !isMissed) {
        count = isWeekend ? (seed % 3) : Math.floor((seed % 8));
      }

      days.push({
        date: dateStr,
        count: isMissed ? 0 : count,
        month: month,
        dayOfWeek: dayOfWeek,
        isMissed: isMissed,
      });
    }
    return days;
  };

  const [contributionData, setContributionData] = useState<ContributionDay[]>(generateInitialData());
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<number | 'all'>('all');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  useEffect(() => {
    setContributionData(generateInitialData());
  }, [streakData.presenceHistory, streakData.missedDates]);

  const monthsList = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const getColorClass = (day: ContributionDay) => {
    if (day.isMissed) {
      return 'bg-amber-500/20 border-2 border-dashed border-amber-400 animate-pulse';
    }
    const count = day.count;
    if (count === 0) return isDarkMode ? 'bg-[#161b22] border-white/5' : 'bg-slate-200 border-slate-300';
    if (count <= 2) return 'bg-[#0e4429] border-[#0e4429]';
    if (count <= 4) return 'bg-[#006d32] border-[#006d32]';
    if (count <= 7) return 'bg-[#26a641] border-[#26a641]';
    return 'bg-[#39d353] border-[#39d353] shadow-xs shadow-[#39d353]/50';
  };

  const handleCellClick = (day: ContributionDay) => {
    if (day.isMissed) {
      fillBlankSpace(day.date);
      setActiveNotification(`✓ Blank Space on ${day.date} filled! Streak maintained & verified.`);
      setTimeout(() => setActiveNotification(null), 3500);
      return;
    }

    logActivity();
    setContributionData((prev) =>
      prev.map((d) => {
        if (d.date === day.date) {
          const newCount = d.count >= 8 ? 0 : d.count + 2;
          return { ...d, count: newCount };
        }
        return d;
      })
    );

    setActiveNotification(`Logged active study presence for ${day.date}! Total commits today: ${day.count + 2}`);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  const handleFillAllBlanks = () => {
    fillBlankSpace();
    setActiveNotification('✨ All Blank Spaces filled! Streak successfully protected and locked in.');
    setTimeout(() => setActiveNotification(null), 3500);
  };

  const totalContributions = contributionData.reduce((acc, d) => acc + d.count, 0);
  const sevenDayList = generateSevenDayWindow();

  // Group into columns of 7 days for the 52-week heatmap
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributionData.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const filteredDays = selectedMonthFilter === 'all'
    ? contributionData
    : contributionData.filter((d) => d.month === selectedMonthFilter);

  return (
    <div className={`p-6 md:p-7 rounded-3xl border transition-all glass-card ${isDarkMode ? 'border-white/10' : 'border-slate-200 shadow-sm'}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-xl">grid_view</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 font-mono">
              STUDY & CODE ACTIVITY MATRIX
            </h3>
          </div>
          <p className="text-xs text-white/60 mt-1">
            {totalContributions} total verified study sessions and coding commits recorded this academic year
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-sky-400">verified</span>
            <span>{totalContributions} Study Commits</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
            <span>Active Learner</span>
          </div>
        </div>
      </div>

      {/* 7-DAY ROLLING STUDY TRACKER */}
      <div className="mb-6 p-4.5 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-white/80 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-sky-400">calendar_view_week</span>
            <span>7-Day Activity Matrix</span>
          </span>
          <span className="text-[11px] font-mono text-sky-400">
            Current Week
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {sevenDayList.map((item) => {
            if (item.isCompleted) {
              return (
                <div
                  key={item.date}
                  className="p-2 sm:p-3 rounded-xl border border-sky-500/40 bg-sky-500/15 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[10px] font-mono text-sky-400 font-bold">{item.dayName}</span>
                  <span className="text-xs font-mono font-extrabold text-white my-0.5">{item.dayNumber}</span>
                  <div className="flex items-center gap-0.5 text-sky-300 text-[9px] font-mono font-bold">
                    <span className="material-symbols-outlined text-[11px] text-sky-400">done</span>
                    <span>Done</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.date}
                className="p-2 sm:p-3 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center opacity-60"
              >
                <span className="text-[10px] font-mono text-white/50">{item.dayName}</span>
                <span className="text-xs font-mono font-bold text-white/70 my-0.5">{item.dayNumber}</span>
                <span className="text-[9px] font-mono text-white/40">Rest</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Month Filter Selector */}
      <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-4 scrollbar-none text-xs font-mono">
        <button
          onClick={() => setSelectedMonthFilter('all')}
          className={`px-3 py-1 rounded-lg shrink-0 font-bold transition-all ${
            selectedMonthFilter === 'all'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          All (365 Days)
        </button>
        {monthsList.map((m, idx) => (
          <button
            key={m}
            onClick={() => setSelectedMonthFilter(idx)}
            className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-all ${
              selectedMonthFilter === idx
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid Canvas */}
      {selectedMonthFilter === 'all' ? (
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex flex-col gap-1 min-w-[700px]">
            {/* Months Row Label */}
            <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1 px-1">
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>

            {/* 7 Rows for Day of Week */}
            <div className="flex gap-1.5">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => handleCellClick(day)}
                      className={`w-3 h-3 rounded-xs border transition-all hover:scale-125 hover:z-10 ${getColorClass(day)}`}
                      title={`${day.date}: ${day.count} verified contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Monthly Focused Grid View */
        <div className="grid grid-cols-7 gap-2 p-4 bg-white/5 rounded-2xl border border-white/10">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="text-center text-[10px] font-mono text-white/40 uppercase font-bold">
              {d}
            </span>
          ))}
          {filteredDays.map((day) => (
            <button
              key={day.date}
              onClick={() => handleCellClick(day)}
              className={`h-11 rounded-xl border flex flex-col items-center justify-center p-1 transition-all hover:scale-105 ${getColorClass(day)}`}
            >
              <span className="text-[10px] font-mono font-bold text-white">
                {day.date.split('-')[2]}
              </span>
              <span className="text-[8px] font-mono text-white/70">
                {`${day.count} commits`}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {activeNotification && (
        <div className="mt-4 p-3 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{activeNotification}</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">Live Synchronized</span>
        </div>
      )}

      {/* Legend with Blank Space Indicator */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-white/50 pt-3 border-t border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <span>Click any cell to log commits or fill blank spaces</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-xs bg-amber-500/20 border border-dashed border-amber-400" />
            <span className="text-amber-300 text-[11px]">Blank Space</span>
          </div>
          <span className="text-white/20">•</span>
          <span>Less</span>
          <div className="w-3 h-3 rounded-xs bg-[#161b22] border border-white/10" />
          <div className="w-3 h-3 rounded-xs bg-[#0e4429]" />
          <div className="w-3 h-3 rounded-xs bg-[#006d32]" />
          <div className="w-3 h-3 rounded-xs bg-[#26a641]" />
          <div className="w-3 h-3 rounded-xs bg-[#39d353]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
