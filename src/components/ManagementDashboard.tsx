import React, { useState } from 'react';
import { TabType, UserAccount, DashboardTask } from '../types';
import { GitHubContributionCalendar } from './GitHubContributionCalendar';
import { IntelliPathLogo } from './IntelliPathLogo';
import { IntelliPathLandingHero } from './IntelliPathLandingHero';
import { notificationService } from '../services/notificationService';

interface ManagementDashboardProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  user?: UserAccount;
  tasks?: DashboardTask[];
  onToggleTask?: (taskId: string) => void;
  onResetProgress?: () => void;
  onSetAllCompleted?: () => void;
  onOpenOnboarding?: () => void;
}

export const ManagementDashboard: React.FC<ManagementDashboardProps> = ({
  onNavigate,
  isDarkMode,
  user,
  tasks,
  onToggleTask,
  onResetProgress,
  onSetAllCompleted,
  onOpenOnboarding,
}) => {
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const defaultTasks: DashboardTask[] = [
    {
      id: 't1',
      title: 'Month 1: CS & Algorithmic Foundations (Python)',
      subtitle: 'Variable scopes, memory control, and algorithmic logic',
      category: 'Roadmap',
      weight: 15,
      isCompleted: false,
      dueDate: '03/09/2026',
      priority: 'Urgent',
    },
    {
      id: 't2',
      title: 'Data Structures & Algorithms Quiz',
      subtitle: 'Trees, Graphs, and Big-O Complexity Assessment',
      category: 'Quiz',
      weight: 15,
      isCompleted: false,
      dueDate: 'Tomorrow',
      priority: 'Urgent',
    },
    {
      id: 't3',
      title: 'Month 2: Full-Stack Web Architecture & APIs',
      subtitle: 'React 19, Express REST APIs, and SQL schemas',
      category: 'Roadmap',
      weight: 15,
      isCompleted: false,
      dueDate: '03/10/2026',
      priority: 'Medium',
    },
    {
      id: 't4',
      title: 'Capstone Project Phase 1: Logic Flow & Docs',
      subtitle: 'AI Career Resume Semantic Matcher (FastAPI Backend)',
      category: 'Project',
      weight: 15,
      isCompleted: false,
      dueDate: 'Oct 20',
      priority: 'Medium',
    },
    {
      id: 't5',
      title: 'AI Recommendation Engine Setup',
      subtitle: 'Collaborative filtering and Tensor pipeline',
      category: 'Project',
      weight: 15,
      isCompleted: false,
      dueDate: 'Oct 22',
      priority: 'Standard',
    },
    {
      id: 't6',
      title: 'Month 3: Gemini AI & Cloud Docker Serving',
      subtitle: 'Vector embeddings, microservices, and AWS S3',
      category: 'Roadmap',
      weight: 15,
      isCompleted: false,
      dueDate: '03/11/2026',
      priority: 'Standard',
    },
    {
      id: 't7',
      title: 'Mock Technical Interview with AI Coach Sarah',
      subtitle: 'Behavioral & Live System Design Defense',
      category: 'Career',
      weight: 10,
      isCompleted: false,
      dueDate: 'Oct 24',
      priority: 'Standard',
    },
  ];

  const currentTasks = tasks && tasks.length > 0 ? tasks : defaultTasks;
  const totalWeight = currentTasks.reduce((acc, t) => acc + t.weight, 0);
  const completedWeight = currentTasks.filter((t) => t.isCompleted).reduce((acc, t) => acc + t.weight, 0);
  const progressPercent = Math.min(100, Math.round((completedWeight / totalWeight) * 100));

  // Dynamic Color & Tier Calculation based on percentage
  const getTierInfo = (percent: number) => {
    if (percent <= 25) {
      return {
        label: 'IGNITION TIER',
        colorClass: 'text-rose-400',
        borderClass: 'border-rose-500/40 bg-rose-950/20',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        gradient: 'from-rose-500 via-rose-600 to-amber-500',
        ringStroke: '#f43f5e',
        icon: 'local_fire_department',
        message: '🌱 Initial Progress: ' + percent + '%. Complete your first tasks below to light up your path and transition into the Amber Momentum tier!',
      };
    } else if (percent <= 50) {
      return {
        label: 'MOMENTUM TIER',
        colorClass: 'text-amber-400',
        borderClass: 'border-amber-500/40 bg-amber-950/20',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        gradient: 'from-amber-500 via-amber-400 to-yellow-300',
        ringStroke: '#f59e0b',
        icon: 'bolt',
        message: '⚡ Building Momentum! ' + percent + '% unlocked. Complete more projects to ascend into Advanced Cyber Indigo!',
      };
    } else if (percent <= 75) {
      return {
        label: 'ADVANCED ARCHITECT TIER',
        colorClass: 'text-indigo-400',
        borderClass: 'border-indigo-500/40 bg-indigo-950/20',
        badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        gradient: 'from-indigo-500 via-indigo-400 to-cyan-400',
        ringStroke: '#6366f1',
        icon: 'auto_graph',
        message: '🔥 High Performance Level! ' + percent + '% complete. You are approaching top certified career mastery!',
      };
    } else {
      return {
        label: 'CERTIFIED MASTERY TIER',
        colorClass: 'text-emerald-400',
        borderClass: 'border-emerald-500/40 bg-emerald-950/20',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        gradient: 'from-emerald-400 via-teal-400 to-emerald-300',
        ringStroke: '#10b981',
        icon: 'military_tech',
        message: '🏆 Industry Certified Mastery (' + percent + '%)! Top candidate ranking ready for high-tier company placements!',
      };
    }
  };

  const tier = getTierInfo(progressPercent);
  const circumference = 502.65;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;


  const handleTaskToggle = (task: DashboardTask) => {
    onToggleTask?.(task.id);
    if (!task.isCompleted) {
      notificationService.addNotification({
        type: 'milestone',
        title: `Task completed: ${task.title}`,
        message: `Marked as done at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Your dashboard progress has been updated.`,
        actionUrl: '/dashboard',
      });
    }
  };

  const filteredTasks = currentTasks.filter((t) => {
    if (taskFilter === 'pending') return !t.isCompleted;
    if (taskFilter === 'completed') return t.isCompleted;
    return true;
  });

  const handleDownloadReport = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      const reportText = `=========================================
PATHFINDER AI - STUDENT CAREER ECOSYSTEM REPORT
Candidate: ${user?.name || 'Fatima Asif'} (${user?.fscStream || 'ICS'} Track)
Target Field: ${user?.preferredField || 'Artificial Intelligence & Software Architecture'}
Generated on: ${new Date().toLocaleDateString()}
=========================================

Overall Progress: ${progressPercent}% Complete
Current Tier: ${tier.label}
Eligibility Status: ${user?.eligibilityStatus || 'Direct Eligible'}

TASK & MILESTONE BREAKDOWN:
${currentTasks.map((t, idx) => `${idx + 1}. [${t.isCompleted ? 'COMPLETED' : 'PENDING'}] ${t.title} (${t.weight}% weight)`).join('\n')}

=========================================
Intelli Path: Personalized Career Guidance, Learning Roadmap & University Recommendation System
=========================================`;

      const blob = new Blob([reportText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Intelli_Path_Career_Report_${progressPercent}pct.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadingReport(false);
    }, 1000);
  };

  const ecosystemFeatures = [
    {
      tab: 'eligibility-test' as TabType,
      title: 'Mock Aptitude & Eligibility Test',
      desc: 'Benchmark your math, programming & logic readiness with instant score branching.',
      icon: 'verified',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Assessment',
    },
    {
      tab: 'skill-gap' as TabType,
      title: 'AI Skill Gap Analysis',
      desc: 'Ranked career matches, mastered vs missing matrix, and learning order.',
      icon: 'checklist',
      color: 'from-blue-500 to-cyan-600',
      badge: 'Gap Matrix',
    },
    {
      tab: 'roadmap' as TabType,
      title: 'Personalized Learning Roadmap',
      desc: 'Month-by-month curriculum with prerequisite bridging for non-CS students.',
      icon: 'alt_route',
      color: 'from-indigo-500 to-purple-600',
      badge: 'Curriculum',
    },
    {
      tab: 'study-planner' as TabType,
      title: 'AI Study Timetable & Alarms',
      desc: 'Adaptive 7-day study planner with automated deadline alarms & reminders.',
      icon: 'calendar_month',
      color: 'from-teal-500 to-emerald-600',
      badge: 'Planner',
    },
    {
      tab: 'courses' as TabType,
      title: 'Curated Free Courses & Docs',
      desc: 'Harvard CS50, MIT OCW, and interactive documentation sandboxes.',
      icon: 'auto_stories',
      color: 'from-amber-500 to-orange-600',
      badge: 'Resources',
    },
    {
      tab: 'projects' as TabType,
      title: 'Capstone Assignments',
      desc: 'Real-world capstones evaluated automatically with AI code rubrics.',
      icon: 'assignment',
      color: 'from-violet-500 to-purple-600',
      badge: 'Evaluator',
    },
    {
      tab: 'prep' as TabType,
      title: 'FAANG AI Mock Interview',
      desc: 'Practice voice & text interviews with AI persona interviewers & live scores.',
      icon: 'record_voice_over',
      color: 'from-rose-500 to-pink-600',
      badge: 'FAANG AI',
    },
    {
      tab: 'coach' as TabType,
      title: 'AI Career Mentor (Chat)',
      desc: '24/7 intelligent career counselor and programming tutor.',
      icon: 'robot_2',
      color: 'from-cyan-500 to-blue-600',
      badge: 'Mentor LLM',
    },
  ];

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Central Brand Motto & 6-Step Hero Landing */}
      <IntelliPathLandingHero
        onGetStarted={() => onOpenOnboarding && onOpenOnboarding()}
        onNavigate={onNavigate}
        isDarkMode={isDarkMode}
        user={user}
      />

      {/* Header section */}
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10 shadow-lg shadow-sky-500/10">
            <IntelliPathLogo size="xl" variant="icon" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 border border-sky-500/20 glass-card">
                AI CAREER ECOSYSTEM
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${tier.badgeBg}`}>
                {tier.label}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter gradient-text">
              Intelli Path Platform
            </h2>
            <p className={`mt-1.5 text-sm md:text-base max-w-2xl leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
              One comprehensive ecosystem guiding you from field discovery and skill tests to customized roadmaps, ATS resumes, capstones, and university admissions.
            </p>
          </div>
        </div>

        {/* Simulator Testing Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onResetProgress && onResetProgress()}
            className="px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 min-h-[38px]"
            title="Simulate New Registration (Progress 0%)"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Reset 0%</span>
          </button>

          <button
            onClick={() => onSetAllCompleted && onSetAllCompleted()}
            className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 min-h-[38px]"
            title="Set All Completed (100% Mastery)"
          >
            <span className="material-symbols-outlined text-sm">done_all</span>
            <span>100% Mastery</span>
          </button>
        </div>
      </section>

      {/* Dynamic Tier Banner */}
      <div className={`p-4 rounded-2xl border mb-6 transition-all duration-500 flex items-center gap-3 ${tier.borderClass}`}>
        <span className={`material-symbols-outlined text-2xl ${tier.colorClass} animate-pulse`}>
          {tier.icon}
        </span>
        <div className="flex-1">
          <p className={`text-xs font-bold font-mono ${tier.colorClass}`}>
            STUDENT MOTIVATION STATUS: {tier.label}
          </p>
          <p className="text-xs text-white/80 leading-snug">
            {tier.message}
          </p>
        </div>
      </div>

      {/* AI Career Ecosystem Interactive Hub */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-base">hub</span>
            <span>Ecosystem Navigation & Guidance Modules</span>
          </h3>
          <span className="text-xs font-mono text-white/50">8 Integrated Phases</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemFeatures.map((feat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate(feat.tab)}
              className="glass-card rounded-2xl p-4 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer space-y-2 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                  <span className="material-symbols-outlined text-lg">{feat.icon}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 font-mono text-[9px] font-bold">
                  {feat.badge}
                </span>
              </div>

              <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors">
                {feat.title}
              </h4>
              <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Activity Heatmap Calendar */}
      <div className="mb-6">
        <GitHubContributionCalendar isDarkMode={isDarkMode} />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Dynamic Circular Progress Card - 4 cols */}
        <div
          className={`md:col-span-4 rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 glass-card border ${tier.borderClass}`}
        >
          <div className="w-full flex items-center justify-between mb-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest font-mono ${tier.colorClass}`}>
              OVERALL PROGRESS
            </h3>
            <span className={`w-2.5 h-2.5 rounded-full animate-ping`} style={{ backgroundColor: tier.ringStroke }} />
          </div>

          <div className="relative inline-flex items-center justify-center my-3">
            <svg className="w-52 h-52 transform -rotate-90">
              <circle
                className={isDarkMode ? 'text-white/10' : 'text-indigo-100'}
                cx="104"
                cy="104"
                fill="transparent"
                r="80"
                stroke="currentColor"
                strokeWidth="14"
              />
              <circle
                cx="104"
                cy="104"
                fill="transparent"
                r="80"
                stroke={tier.ringStroke}
                strokeDasharray="502.65"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="14"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className={`text-4xl font-black tracking-tight font-mono ${tier.colorClass}`}>
                {progressPercent}%
              </span>
              <span className="text-[10px] text-white/60 font-mono tracking-wider uppercase mt-0.5">
                {currentTasks.filter((t) => t.isCompleted).length} / {currentTasks.length} TASKS DONE
              </span>
            </div>
          </div>

          {/* Progress Bar & Tier Badge */}
          <div className="mt-4 w-full">
            <div className="flex justify-between items-center mb-2 text-xs font-mono">
              <span className={isDarkMode ? 'text-white/70' : 'text-slate-600'}>
                {user?.preferredField || 'AI & Software Architecture'}
              </span>
              <span className={`font-bold ${tier.colorClass}`}>
                {progressPercent === 0 ? '0% Initial' : progressPercent + '% Complete'}
              </span>
            </div>
            <div className={`h-3 w-full rounded-full overflow-hidden p-0.5 ${isDarkMode ? 'bg-white/10' : 'bg-indigo-100'}`}>
              <div
                className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${tier.gradient}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Tasks Completion Board - 8 cols */}
        <div
          className={`md:col-span-8 rounded-3xl p-6 transition-all glass-card ${
            isDarkMode ? 'hover:border-indigo-500/30' : 'hover:border-indigo-300'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                TASKS & MILESTONE COMPLETION MANAGER
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Check off tasks to watch your overall progress increase & change colors live!
              </p>
            </div>

            {/* Task Filters */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                onClick={() => setTaskFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  taskFilter === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                All ({currentTasks.length})
              </button>
              <button
                onClick={() => setTaskFilter('pending')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  taskFilter === 'pending' ? 'bg-emerald-600 text-white shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                Pending ({currentTasks.filter((t) => !t.isCompleted).length})
              </button>
              <button
                onClick={() => setTaskFilter('completed')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  taskFilter === 'completed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                Done ({currentTasks.filter((t) => t.isCompleted).length})
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto scrollbar-none pr-1">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskToggle(task)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                  task.isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                    : 'bg-white/5 border-white/10 hover:border-emerald-500/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                      task.isCompleted
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-white/30 group-hover:border-emerald-400'
                    }`}
                  >
                    {task.isCompleted && (
                      <span className="material-symbols-outlined text-base">check</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold truncate ${task.isCompleted ? 'line-through text-white/50' : 'text-white'}`}>
                        {task.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] shrink-0 border border-emerald-500/30">
                        +{task.weight}% Progress
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 truncate mt-0.5 font-mono">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {task.dueDate && (
                    <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
                      📅 {task.dueDate}
                    </span>
                  )}

                  <button
                    type="button"
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      task.isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                    }`}
                  >
                    {task.isCompleted ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects - 7 cols */}
        <div
          className={`md:col-span-7 rounded-3xl p-6 md:p-8 border relative overflow-hidden transition-all glass-card ${
            isDarkMode ? 'hover:border-indigo-500/30' : 'hover:border-indigo-300'
          }`}
        >
          <div className="absolute top-0 right-0 p-8 text-indigo-500/10 pointer-events-none">
            <span className="material-symbols-outlined text-[140px]">bolt</span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono mb-6">
            ACTIVE CAPSTONE ASSIGNMENT
          </h3>

          <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-black p-6 md:p-8 rounded-2xl border border-indigo-500/30 text-white relative z-10 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs mb-3 shadow-md shadow-emerald-600/30">
                  In Progress
                </span>
                <h4 className="text-xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Intelli Path: Career Recommendation Engine
                </h4>
                <p className="text-sm text-white/70 leading-relaxed max-w-lg">
                  Building an asynchronous Python FastAPI and React architecture with vector embedding search and automated code grading rubrics.
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-emerald-400 shrink-0 ml-2">
                precision_manufacturing
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold text-emerald-300">
                <span>Project Milestone: Phase 2/4</span>
                <span>{progressPercent}% Milestone Sync</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${tier.gradient}`} style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('projects')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-600/25 active:scale-95 min-h-[44px]"
              >
                Project Evaluation Hub
              </button>
              <button
                onClick={() => setShowProjectDetailsModal(true)}
                className="glass-card hover:bg-white/10 text-white border border-white/15 px-6 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 min-h-[44px]"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Recently Completed Milestones - 5 cols */}
        <div
          className={`md:col-span-5 rounded-3xl p-6 md:p-8 transition-all glass-card ${
            isDarkMode ? 'hover:border-indigo-500/30' : 'hover:border-indigo-300'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono mb-6">
            RECENT MILESTONES
          </h3>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500/20" />
            <div className="space-y-6 relative">
              {/* Milestone 1 */}
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-slate-950 flex items-center justify-center relative z-10 shrink-0 shadow-md shadow-emerald-600/30">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-white">
                    AI Mock Aptitude & Diagnostic Test
                  </h4>
                  <p className="text-xs text-white/60">
                    Aptitude score verified with direct advanced roadmap unlocked.
                  </p>
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">Aug 2026</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-slate-950 flex items-center justify-center relative z-10 shrink-0 shadow-md shadow-emerald-600/30">
                  <span className="material-symbols-outlined text-lg">workspace_premium</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-white">
                    {user?.fscStream || 'ICS'} Academic Track Locked
                  </h4>
                  <p className="text-xs text-white/60">
                    8-Month Adaptive Roadmap activated with free YouTube & documentation tracks.
                  </p>
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">Aug 2026</span>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-slate-950 flex items-center justify-center relative z-10 shrink-0 shadow-md shadow-emerald-600/30">
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-white">
                    3x Daily Alarm Reminders Activated
                  </h4>
                  <p className="text-xs text-white/60">
                    Automated deadline alerts active for 09:00 AM, 03:00 PM, and 08:00 PM.
                  </p>
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">Aug 2026</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadReport}
            disabled={downloadingReport}
            className="w-full mt-8 py-3 border border-emerald-500/30 rounded-xl font-medium text-sm transition-all active:scale-98 flex items-center justify-center gap-2 glass-card text-emerald-300 hover:bg-emerald-600/20 hover:text-white min-h-[44px]"
          >
            <span className="material-symbols-outlined text-lg">
              {downloadingReport ? 'hourglass_empty' : 'download'}
            </span>
            <span>{downloadingReport ? 'Generating Telemetry...' : 'Download Progress Report (' + progressPercent + '%)'}</span>
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl glass-card text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 font-mono">
                <span className="material-symbols-outlined text-emerald-400">calendar_month</span>
                <span>Milestones Calendar</span>
              </h3>
              <button onClick={() => setShowCalendarModal(false)} className="p-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 my-4 text-sm">
              <div className="p-4 bg-indigo-950/60 border border-indigo-500/30 text-white rounded-2xl flex justify-between items-center">
                <div>
                  <p className="font-bold">Data Structures Quiz</p>
                  <p className="text-xs text-indigo-300 font-mono">Module 4: Advanced Algorithms</p>
                </div>
                <span className="text-xs bg-rose-600 text-white px-2.5 py-1 rounded-full font-bold h-fit shadow-xs">Tomorrow</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl flex justify-between items-center">
                <div>
                  <p className="font-bold">Capstone Phase 1 Review</p>
                  <p className="text-xs text-white/50 font-mono">System Architecture</p>
                </div>
                <span className="text-xs font-mono text-emerald-300">Oct 20, 2026</span>
              </div>
            </div>
            <button
              onClick={() => setShowCalendarModal(false)}
              className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-600/25 min-h-[44px]"
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {showProjectDetailsModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="max-w-lg w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl glass-card text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-extrabold gradient-text tracking-tight">
                Intelli Path: Career Recommendation Engine
              </h3>
              <button onClick={() => setShowProjectDetailsModal(false)} className="p-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Building a collaborative filtering and embedding-based engine for technical career roadmaps with Python, PyTorch, React 19, and Tailwind CSS.
            </p>
            <div className="space-y-3 text-xs mb-6 font-mono">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/50">Milestone Progress:</span>
                <span className="font-bold text-emerald-300">{progressPercent}% Completed</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/50">Current Tier:</span>
                <span className={`font-bold ${tier.colorClass}`}>{tier.label}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowProjectDetailsModal(false);
                  onNavigate('projects');
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-600/25 min-h-[44px]"
              >
                Open Project Rubrics
              </button>
              <button
                onClick={() => setShowProjectDetailsModal(false)}
                className="px-5 py-3 glass-card border border-white/15 rounded-xl text-sm font-medium hover:bg-white/10 transition-all min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
