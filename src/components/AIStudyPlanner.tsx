import React, { useState } from 'react';
import { TabType, StudyPlanDay } from '../types';

interface AIStudyPlannerProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  onTriggerAlarm?: (topic: string) => void;
}

const INITIAL_SCHEDULE: StudyPlanDay[] = [
  {
    day: 'Monday',
    date: 'Aug 18, 2026',
    slots: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'Artificial Intelligence & ML',
        topic: 'Python NumPy Vectorization & Matrix Math',
        type: 'Theory',
        durationMin: 90,
        status: 'completed',
      },
      {
        time: '03:00 PM - 04:30 PM',
        subject: 'Coding Challenges',
        topic: 'LeetCode 50: Array & Hash Map Two Pointers',
        type: 'Coding Practice',
        durationMin: 90,
        status: 'pending',
      },
      {
        time: '08:00 PM - 09:00 PM',
        subject: 'Official Docs Review',
        topic: 'PyTorch Tensor Autograd Documentation',
        type: 'Doc Reading',
        durationMin: 60,
        status: 'pending',
      },
    ],
  },
  {
    day: 'Tuesday',
    date: 'Aug 19, 2026',
    slots: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'Deep Learning Architectures',
        topic: 'Feedforward Multi-Layer Perceptrons & Backprop',
        type: 'Theory',
        durationMin: 90,
        status: 'pending',
      },
      {
        time: '03:00 PM - 04:30 PM',
        subject: 'Hands-on Lab',
        topic: 'Building a Neural Network from scratch in Python',
        type: 'Project',
        durationMin: 90,
        status: 'pending',
      },
      {
        time: '08:00 PM - 09:00 PM',
        subject: 'Quiz Assessment',
        topic: 'Linear Algebra & Loss Functions Speed Quiz',
        type: 'Quiz Review',
        durationMin: 60,
        status: 'pending',
      },
    ],
  },
  {
    day: 'Wednesday',
    date: 'Aug 20, 2026',
    slots: [
      {
        time: '09:00 AM - 11:00 AM',
        subject: 'Computer Vision & CNNs',
        topic: 'Convolutional Kernels, Stride, Padding & Pooling',
        type: 'Theory',
        durationMin: 120,
        status: 'pending',
      },
      {
        time: '03:00 PM - 05:00 PM',
        subject: 'Capstone Project Sprint',
        topic: 'AI Career Resume Semantic Matcher (FastAPI Backend)',
        type: 'Project',
        durationMin: 120,
        status: 'pending',
      },
    ],
  },
  {
    day: 'Thursday',
    date: 'Aug 21, 2026',
    slots: [
      {
        time: '09:00 AM - 10:30 AM',
        subject: 'NLP & Transformers',
        topic: 'Self-Attention Mechanism & Tokenization',
        type: 'Theory',
        durationMin: 90,
        status: 'pending',
      },
      {
        time: '03:00 PM - 04:30 PM',
        subject: 'Vector DBs',
        topic: 'ChromaDB & FAISS Vector Indexing Practice',
        type: 'Coding Practice',
        durationMin: 90,
        status: 'pending',
      },
      {
        time: '08:00 PM - 09:00 PM',
        subject: 'Daily Recap',
        topic: 'Flashcards & Cheat Sheet Review',
        type: 'Doc Reading',
        durationMin: 60,
        status: 'pending',
      },
    ],
  },
  {
    day: 'Friday',
    date: 'Aug 22, 2026',
    slots: [
      {
        time: '09:00 AM - 11:00 AM',
        subject: 'MLOps & Deployment',
        topic: 'Dockerizing PyTorch Inference Containers',
        type: 'Project',
        durationMin: 120,
        status: 'pending',
      },
      {
        time: '03:00 PM - 04:30 PM',
        subject: 'Mock Interview Prep',
        topic: 'FAANG Technical Architecture Voice Simulator',
        type: 'Quiz Review',
        durationMin: 90,
        status: 'pending',
      },
    ],
  },
  {
    day: 'Saturday',
    date: 'Aug 23, 2026',
    slots: [
      {
        time: '10:00 AM - 01:00 PM',
        subject: 'Hackathon & Capstone',
        topic: 'Finalizing Milestone 1 Project Submission & GitHub PR',
        type: 'Project',
        durationMin: 180,
        status: 'pending',
      },
    ],
  },
  {
    day: 'Sunday',
    date: 'Aug 24, 2026',
    slots: [
      {
        time: '11:00 AM - 12:30 PM',
        subject: 'Weekly Review & University Admission Tracking',
        topic: 'NUST / FAST Merit Calculator & Next Week Goal Setting',
        type: 'Quiz Review',
        durationMin: 90,
        status: 'pending',
      },
    ],
  },
];

export const AIStudyPlanner: React.FC<AIStudyPlannerProps> = ({
  onNavigate,
  isDarkMode,
  onTriggerAlarm,
}) => {
  const [dailyHours, setDailyHours] = useState<number>(3);
  const [schedule, setSchedule] = useState<StudyPlanDay[]>(INITIAL_SCHEDULE);
  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [showDeadlineBanner, setShowDeadlineBanner] = useState<boolean>(true);

  const toggleSlotStatus = (dayName: string, slotIdx: number) => {
    setSchedule((prev) =>
      prev.map((d) => {
        if (d.day !== dayName) return d;
        const newSlots = [...d.slots];
        newSlots[slotIdx] = {
          ...newSlots[slotIdx],
          status: newSlots[slotIdx].status === 'completed' ? 'pending' : 'completed',
        };
        return { ...d, slots: newSlots };
      })
    );
  };

  const handleRegenerateTimetable = (hours: number) => {
    setDailyHours(hours);
    setIsRegenerating(true);

    setTimeout(() => {
      setIsRegenerating(false);
    }, 800);
  };

  const selectedDayData = schedule.find((d) => d.day === activeDay) || schedule[0];

  const totalSlots = schedule.reduce((acc, d) => acc + d.slots.length, 0);
  const completedSlots = schedule.reduce(
    (acc, d) => acc + d.slots.filter((s) => s.status === 'completed').length,
    0
  );
  const weeklyProgress = Math.round((completedSlots / totalSlots) * 100);

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>ADAPTIVE AI STUDY TIMETABLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              AI Study Planner & Smart Deadlines
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Dynamically generates your weekly study schedule based on your available hours, weak skill areas, university classes, and upcoming capstone deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('notifications')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">notifications_active</span>
              <span>3x Daily Reminders</span>
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-teal-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">assignment</span>
              <span>Project Assignments</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Deadline Alert Banner */}
      {showDeadlineBanner && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/70 border border-amber-500/50 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <span className="material-symbols-outlined text-xl">alarm</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Smart Milestone Deadline Alert</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/30 text-amber-200 font-mono text-[10px] font-bold">
                  3 DAYS REMAINING
                </span>
              </div>
              <p className="text-xs text-white/80">
                Deadline: <strong>September 3, 2026, 10:00 PM</strong> — Machine Learning Capstone Module & LeetCode array review.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => onTriggerAlarm && onTriggerAlarm('Machine Learning Milestone')}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs shadow-md transition-all flex items-center gap-1.5 min-h-[38px]"
            >
              <span className="material-symbols-outlined text-sm">alarm_on</span>
              <span>Set Alarm</span>
            </button>
            <button
              onClick={() => setShowDeadlineBanner(false)}
              className="p-2 text-white/60 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Daily Study Hours & Adaptive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Study Hours Selector */}
        <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-mono text-teal-400 uppercase font-bold">Daily Study Budget</span>
            <h3 className="text-base font-bold text-white">Target Daily Study Hours</h3>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 5].map((hr) => (
              <button
                key={hr}
                onClick={() => handleRegenerateTimetable(hr)}
                className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all min-h-[40px] ${
                  dailyHours === hr
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {hr}h / day
              </button>
            ))}
          </div>

          <p className="text-[11px] text-white/60">
            {dailyHours <= 2 ? 'Light pace suitable for students balancing university semesters.' : 'Accelerated intensive bootcamp pace for rapid career placement.'}
          </p>
        </div>

        {/* Weekly Completion Progress */}
        <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-teal-400 uppercase font-bold">Weekly Progress</span>
            <span className="text-lg font-extrabold font-mono text-emerald-400">{weeklyProgress}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${weeklyProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/70 font-mono">
            <span>{completedSlots} of {totalSlots} Sessions Done</span>
            <span className="text-amber-400 font-bold">🔥 6-Day Streak</span>
          </div>
        </div>

        {/* 3x Daily Automated Notifications Snapshot */}
        <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-teal-400 uppercase font-bold">Daily Routine Triggers</span>
            <span className="material-symbols-outlined text-teal-400 text-base">notifications</span>
          </div>
          <div className="space-y-1.5 text-xs text-white/80 font-mono">
            <p className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">09:00 AM</span>
              <span>🌅 Morning Concept Dive</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-400 font-bold">03:00 PM</span>
              <span>💻 Coding Challenge Sprint</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">08:00 PM</span>
              <span>🌙 Evening Doc & Quiz Review</span>
            </p>
          </div>
        </div>
      </div>

      {/* Interactive 7-Day Timetable */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-400">calendar_view_week</span>
              <span>Weekly Adaptive Timetable</span>
            </h3>
            <span className="text-xs font-mono text-white/50">
              Click any session checkbox to toggle completion and track streak
            </span>
          </div>

          {/* Day Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {schedule.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                  activeDay === d.day
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {d.day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {isRegenerating ? (
          <div className="p-12 text-center text-teal-400 space-y-3">
            <span className="material-symbols-outlined text-4xl animate-spin">refresh</span>
            <p className="text-sm font-mono font-bold text-white">Adjusting session distribution...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-white">
                {selectedDayData.day} <span className="text-white/50 text-xs font-mono font-normal">({selectedDayData.date})</span>
              </span>
              <span className="text-xs font-mono text-teal-400">
                {selectedDayData.slots.length} Scheduled Blocks
              </span>
            </div>

            <div className="space-y-3">
              {selectedDayData.slots.map((slot, idx) => {
                const isDone = slot.status === 'completed';
                return (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 opacity-75'
                        : 'bg-white/5 border-white/10 hover:border-teal-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => toggleSlotStatus(selectedDayData.day, idx)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-white/30 hover:border-teal-400 text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">check</span>
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-teal-400 font-bold">
                            {slot.time}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                              slot.type === 'Theory'
                                ? 'bg-blue-500/20 text-blue-300'
                                : slot.type === 'Coding Practice'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : slot.type === 'Project'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {slot.type}
                          </span>
                          <span className="text-[10px] font-mono text-white/40">
                            {slot.durationMin} mins
                          </span>
                        </div>

                        <h4
                          className={`font-bold text-sm text-white ${
                            isDone ? 'line-through text-white/50' : ''
                          }`}
                        >
                          {slot.topic}
                        </h4>
                        <p className="text-xs text-white/60">{slot.subject}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => onNavigate('courses')}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold flex items-center gap-1 min-h-[36px]"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        <span>Open Resource</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
