import React, { useState } from 'react';
import { UserAccount, TabType, DashboardTask } from '../types';

interface CareerRoadmapProps {
  isDarkMode: boolean;
  user?: UserAccount;
  onNavigate?: (tab: TabType) => void;
  onTriggerAlarm?: (title: string, date: string, time: string, module: string) => void;
  tasks?: DashboardTask[];
  onToggleTask?: (taskId: string) => void;
  isAdminMasterUnlocked?: boolean;
}

interface LearningResource {
  title: string;
  type: 'video' | 'doc' | 'sandbox' | 'book';
  url: string;
  duration: string;
  provider: string;
}

interface MonthModule {
  id: string;
  monthNumber: number;
  title: string;
  subtitle: string;
  description: string;
  fscNote: string;
  deadlineDate: string;
  deadlineTime: string;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked: boolean;
  resources: LearningResource[];
  capstoneTitle: string;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  isDarkMode,
  user,
  onNavigate,
  onTriggerAlarm,
  tasks,
  onToggleTask,
  isAdminMasterUnlocked = false,
}) => {
  const fscStream = user?.fscStream || 'ICS';
  const preferredField = user?.preferredField || 'Computer Science & Software Engineering';
  const isMasterUnlocked = user?.isAdmin || isAdminMasterUnlocked;

  // Calculate overall task progress
  const totalWeight = tasks?.reduce((sum, t) => sum + t.weight, 0) || 100;
  const completedWeight = tasks?.filter((t) => t.isCompleted).reduce((sum, t) => sum + t.weight, 0) || 0;
  const progressPercent = Math.min(100, Math.round((completedWeight / totalWeight) * 100));

  const getTierGradient = (percent: number) => {
    if (percent <= 25) return 'from-rose-500 via-rose-600 to-amber-500';
    if (percent <= 50) return 'from-amber-500 via-amber-400 to-yellow-300';
    if (percent <= 75) return 'from-indigo-500 via-indigo-400 to-cyan-400';
    return 'from-emerald-400 via-teal-400 to-emerald-300';
  };

  const isTaskDone = (taskId: string) => {
    return tasks?.find((t) => t.id === taskId)?.isCompleted || false;
  };

  // Initial Monthly Curriculum Tailored to FSC Background
  const [modules, setModules] = useState<MonthModule[]>([
    {
      id: 'm1',
      monthNumber: 1,
      title: 'Month 1: Computer Science & Algorithmic Foundations',
      subtitle: 'Python, Logic Building & Mathematical Problem Solving',
      description:
        fscStream === 'Pre-Medical' || fscStream === 'Arts'
          ? 'Specialized Foundation Track: Tailored for Pre-Medical/Arts students to build computational thinking from scratch without prior coding knowledge.'
          : 'Core CS Foundations: Accelerate through variable scopes, memory control, algorithmic time complexity, and data structures.',
      fscNote: `Tailored for ${fscStream} Stream`,
      deadlineDate: '03/09/2026',
      deadlineTime: '10:00 PM',
      isCompleted: false,
      isInProgress: false,
      isLocked: false,
      capstoneTitle: 'Mini Project: Algorithmic Expense & Sorting Engine',
      resources: [
        {
          title: 'Python for Beginners Full Course (FreeCodeCamp)',
          type: 'video',
          url: 'https://youtube.com',
          duration: '4h 30m',
          provider: 'YouTube / freeCodeCamp',
        },
        {
          title: 'Python 3.12 Official Interactive Docs',
          type: 'doc',
          url: 'https://docs.python.org/3/',
          duration: '1h 15m',
          provider: 'Python.org',
        },
        {
          title: 'Interactive Python Logic Sandbox',
          type: 'sandbox',
          url: 'https://replit.com',
          duration: '2h 00m',
          provider: 'Replit IDE',
        },
      ],
    },
    {
      id: 'm2',
      monthNumber: 2,
      title: 'Month 2: Full-Stack Web Architecture & RESTful APIs',
      subtitle: 'React.js, Node.js, Express & Database Schemas',
      description:
        'Master modern component hierarchies, async state management, REST API design, and SQL database relationships.',
      fscNote: 'High Practical Weightage (80% Hands-on)',
      deadlineDate: '03/10/2026',
      deadlineTime: '10:00 PM',
      isCompleted: false,
      isInProgress: false,
      isLocked: false,
      capstoneTitle: 'Capstone: Full-Stack E-Commerce & Management Platform',
      resources: [
        {
          title: 'React 18 & Vite Masterclass by Meta Engineers',
          type: 'video',
          url: 'https://coursera.org',
          duration: '6h 45m',
          provider: 'Coursera / Meta',
        },
        {
          title: 'RESTful API & Express.js Architecture Guidelines',
          type: 'doc',
          url: 'https://expressjs.com',
          duration: '2h',
          provider: 'Express Docs',
        },
        {
          title: 'You Don\'t Know JS Yet (Book Series)',
          type: 'book',
          url: 'https://github.com/getify/You-Dont-Know-JS',
          duration: '3h 30m',
          provider: 'GitHub Open Book',
        },
      ],
    },
    {
      id: 'm3',
      monthNumber: 3,
      title: 'Month 3: AI Model Integration & Cloud Architecture',
      subtitle: 'Gemini API, PyTorch Model Serving, AWS S3 & Docker',
      description:
        'Connect large language models, build vector embeddings, package microservices into Docker containers, and deploy to AWS Cloud.',
      fscNote: 'Advanced AI/ML Module',
      deadlineDate: '03/11/2026',
      deadlineTime: '10:00 PM',
      isCompleted: false,
      isInProgress: false,
      isLocked: true,
      capstoneTitle: 'Capstone: AI-Powered Autonomous Document Summarizer',
      resources: [
        {
          title: 'Google Gemini API TypeScript SDK Documentation',
          type: 'doc',
          url: 'https://ai.google.dev',
          duration: '1h 30m',
          provider: 'Google AI Studio',
        },
        {
          title: 'AWS Certified Cloud Practitioner Video Course',
          type: 'video',
          url: 'https://aws.amazon.com',
          duration: '5h',
          provider: 'AWS Training',
        },
      ],
    },
    {
      id: 'm4',
      monthNumber: 4,
      title: 'Month 4: Production Deployment & Industry Placement',
      subtitle: 'System Design, Security Audits & Mock Technical Interviews',
      description:
        'Perform system stress testing, conduct penetration audits, build a production portfolio, and pass mock technical AI interviews.',
      fscNote: 'Career Readiness Phase',
      deadlineDate: '03/12/2026',
      deadlineTime: '10:00 PM',
      isCompleted: false,
      isInProgress: false,
      isLocked: true,
      capstoneTitle: 'Final Defense: Production Portfolio & Resume Defense',
      resources: [
        {
          title: 'System Design Interview – An Insider\'s Guide',
          type: 'book',
          url: 'https://systemdesignprimer.com',
          duration: '4h',
          provider: 'Alex Xu',
        },
        {
          title: 'Full-Stack Security & OWASP Top 10 Audit',
          type: 'video',
          url: 'https://owasp.org',
          duration: '3h',
          provider: 'OWASP Foundation',
        },
      ],
    },
  ]);

  const [activeNotesModal, setActiveNotesModal] = useState<string | null>(null);

  const completedCount = modules.filter((m) => m.isCompleted).length;

  const moduleTaskIdMap: Record<string, string> = {
    m1: 't1',
    m2: 't3',
    m3: 't6',
    m4: 't4',
  };

  const toggleMarkDone = (id: string) => {
    const taskId = moduleTaskIdMap[id];
    if (taskId && onToggleTask) {
      onToggleTask(taskId);
    }

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newCompleted = !m.isCompleted;
          return {
            ...m,
            isCompleted: newCompleted,
            isInProgress: false,
          };
        }
        return m;
      }).map((m, index, arr) => {
        if (index > 0 && arr[index - 1].isCompleted && m.isLocked) {
          return { ...m, isLocked: false, isInProgress: !m.isCompleted };
        }
        return m;
      })
    );
  };

  return (
    <div className={`p-4 md:p-8 max-w-5xl mx-auto pb-24 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      {/* Top Banner */}
      <div className="rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-bold">
              <span className="material-symbols-outlined text-sm">alt_route</span>
              <span>4-MONTH ADAPTIVE LEARNING ROADMAP</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              {preferredField}
            </h1>
            <p className="text-xs md:text-sm text-white/70 max-w-2xl">
              Customized learning path for <span className="text-indigo-300 font-bold">{fscStream} background</span>.
              Calculated with dynamic topic strength and 3x/day deadline alerts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (onTriggerAlarm) {
                  onTriggerAlarm(
                    "Python Foundations & Algorithmic Logic Deadline",
                    "03/09/2026",
                    "10:00 PM",
                    "Month 1: Computer Science Core"
                  );
                }
              }}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2 animate-pulse"
            >
              <span className="material-symbols-outlined text-base">alarm_on</span>
              <span>Test 10:00 PM Alarm</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('prep')}
                className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">quiz</span>
                <span>Mock Tests</span>
              </button>
            )}
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-white/70">CURRICULUM COMPLETION</span>
            <span className="text-indigo-400 font-bold">{progressPercent}% COMPLETED</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className={`h-full bg-gradient-to-r ${getTierGradient(progressPercent)} rounded-full transition-all duration-700 shadow-md`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Month Modules List */}
      <div className="space-y-6">
        {modules.map((m) => (
          <div
            key={m.id}
            className={`glass-card rounded-3xl p-6 border transition-all relative overflow-hidden shadow-xl ${
              m.isCompleted
                ? "border-emerald-500/40 bg-emerald-950/20"
                : m.isInProgress
                ? "border-indigo-500/60 bg-indigo-950/20 ring-1 ring-indigo-500/30"
                : "border-white/10 opacity-75"
            }`}
          >
            {/* Background Glow */}
            {m.isInProgress && (
              <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-indigo-300 font-mono text-[11px] font-bold">
                    MONTH {m.monthNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] border border-purple-500/30">
                    {m.fscNote}
                  </span>
                  {m.isCompleted && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      <span>Verified Completed</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-indigo-300">{m.subtitle}</p>
              </div>

              {/* Deadline Badge */}
              <div className="flex flex-col items-start md:items-end shrink-0">
                <div className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-base animate-pulse">alarm</span>
                  <span>
                    Deadline: {m.deadlineDate} @ {m.deadlineTime}
                  </span>
                </div>
                <span className="text-[10px] text-white/50 font-mono mt-1">
                  Notifications: 3x / Day
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-5 relative z-10">
              {m.description}
            </p>

            {/* Best Curated Resources Section */}
            <div className="space-y-2.5 mb-6 relative z-10">
              <span className="text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-wider block">
                📚 BEST CURATED LEARNING RESOURCES & SANDBOXES:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {m.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/10 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <span className="material-symbols-outlined text-lg">
                          {res.type === 'video'
                            ? 'play_circle'
                            : res.type === 'doc'
                            ? 'description'
                            : res.type === 'sandbox'
                            ? 'code'
                            : 'menu_book'}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase">
                          {res.provider}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40">⏱ {res.duration}</span>
                    </div>

                    <p className="text-xs font-semibold text-white/90 group-hover:text-indigo-300 transition-colors mt-2 line-clamp-2">
                      {res.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Capstone Project Notice & AI Verification Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
                <span className="material-symbols-outlined text-base">assignment</span>
                <span>{m.capstoneTitle}</span>
              </div>

              <button
                onClick={() => toggleMarkDone(m.id)}
                disabled={!isMasterUnlocked && m.isLocked}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                  m.isCompleted
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
                    : !isMasterUnlocked && m.isLocked
                    ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {m.isCompleted ? 'check_circle' : !isMasterUnlocked && m.isLocked ? 'lock' : 'task_alt'}
                </span>
                <span>
                  {m.isCompleted
                    ? "Completed (Click to Reopen)"
                    : !isMasterUnlocked && m.isLocked
                    ? "Locked (Finish Month " + (m.monthNumber - 1) + ")"
                    : isMasterUnlocked && m.isLocked
                    ? "Admin Override: Mark Done"
                    : "AI/ML Mark as Done"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
