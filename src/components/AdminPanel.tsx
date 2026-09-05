import React, { useState } from 'react';
import { TabType, UserAccount, JobItem, ScholarshipItem } from '../types';

interface AdminPanelProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  onTriggerSimulatedNotification?: (msg: string) => void;
  onTriggerAlarm?: (title: string, date?: string, time?: string, module?: string) => void;
  currentUser?: UserAccount;
  onUpdateUser?: (updated: Partial<UserAccount>) => void;
  onSetAllTasksCompleted?: () => void;
  onResetProgressToZero?: () => void;
  isAdminMasterUnlocked?: boolean;
  onToggleAdminMasterUnlock?: (enabled: boolean) => void;
}

interface ManagedStudent {
  id: string;
  name: string;
  email: string;
  role: string;
  systemRole: 'admin' | 'superadmin' | 'student' | 'mentor';
  stream: string;
  cgpaOrMarks: string;
  progressPercent: number;
  eligibilityStatus: 'Direct Eligible' | 'Recommended Foundation Month' | 'Advanced Standing';
  targetCareer: string;
  joinedDate: string;
  avatar: string;
}

const INITIAL_STUDENTS: ManagedStudent[] = [
  {
    id: 'u-fatima',
    name: 'Fatima Asif (You)',
    email: 'fatima01asiflive@gmail.com',
    role: 'Super Administrator',
    systemRole: 'superadmin',
    stream: 'BS Computer Science / AI',
    cgpaOrMarks: '3.82 CGPA (95%)',
    progressPercent: 92,
    eligibilityStatus: 'Direct Eligible',
    targetCareer: 'AI & Machine Learning Architect',
    joinedDate: 'July 2026',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgNlfeL9UOJHLhld-PE4nGnyW6Rl4iJLHvRhfHIUVp52XKmmHbrbf-VJ8ugwfp8137aYTEah5-7jGv7a12fRc3TckweGIcUrovL7q3Dhdi8BaR9cMnEySvV9EUHDUkTceEkGAnJdfKpZljhEvs7cs3RjYJjP839LAzkOCCvZ0Jys15Uy3xcWT1_UwA0KCjmY3pRzst3eS2Fsnerau_zF6VA1PIdAGElSnJMVXOBCxtw7KEYGvxInM',
  },
  {
    id: 'u-bilal',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed.dev@gmail.com',
    role: 'Student Candidate',
    systemRole: 'student',
    stream: 'ICS (Math, Stats, CS)',
    cgpaOrMarks: '980 / 1100 (89%)',
    progressPercent: 65,
    eligibilityStatus: 'Direct Eligible',
    targetCareer: 'Full-Stack Software Engineer',
    joinedDate: 'August 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BilalAhmed',
  },
  {
    id: 'u-hamza',
    name: 'Hamza Tariq',
    email: 'hamza.security@outlook.com',
    role: 'Student Candidate',
    systemRole: 'student',
    stream: 'Pre-Engineering',
    cgpaOrMarks: '910 / 1100 (82%)',
    progressPercent: 48,
    eligibilityStatus: 'Direct Eligible',
    targetCareer: 'Cyber Security SOC Specialist',
    joinedDate: 'August 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HamzaTariq',
  },
  {
    id: 'u-zainab',
    name: 'Zainab Malik',
    email: 'zainab.analytics@gmail.com',
    role: 'Student Candidate',
    systemRole: 'student',
    stream: 'Pre-Medical (Transitioning)',
    cgpaOrMarks: '1015 / 1100 (92%)',
    progressPercent: 30,
    eligibilityStatus: 'Recommended Foundation Month',
    targetCareer: 'Data Scientist & Bio-Informatics',
    joinedDate: 'August 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZainabMalik',
  },
  {
    id: 'u-mentor-sarah',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@ai-ecosystem.edu',
    role: 'Faculty Mentor / Coach',
    systemRole: 'mentor',
    stream: 'PhD Computer Science (Stanford)',
    cgpaOrMarks: '4.00 CGPA',
    progressPercent: 100,
    eligibilityStatus: 'Advanced Standing',
    targetCareer: 'Principal AI Researcher',
    joinedDate: 'June 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrSarahJenkins',
  },
];

const ALL_SYSTEM_MODULES: {
  id: TabType;
  title: string;
  category: 'Discovery & Assessments' | 'Roadmap & Learning' | 'Career & Placement' | 'Intelligence & Core';
  icon: string;
  description: string;
  adminControls: string;
}[] = [
  // Discovery
  {
    id: 'academic',
    title: 'Academic Background',
    category: 'Discovery & Assessments',
    icon: 'school',
    description: 'Student qualification records, matric/FSc/BS marks, board affiliations, and provincial quotas.',
    adminControls: 'Modify aggregate, bypass degree restrictions, grant universal credit transfer.',
  },
  {
    id: 'interests',
    title: 'Define Interests & Ambitions',
    category: 'Discovery & Assessments',
    icon: 'target',
    description: 'Career goal setting, work-environment preference, and target salary ranges.',
    adminControls: 'Override candidate career weights, reset interest matrix.',
  },
  {
    id: 'personality-assessment',
    title: 'AI Personality Assessment',
    category: 'Discovery & Assessments',
    icon: 'psychology',
    description: 'Big Five & Myers-Briggs psychometric evaluation tailored for tech archetypes.',
    adminControls: 'Audit raw psychometric dimensions, force-assign archetypes.',
  },
  {
    id: 'eligibility-test',
    title: 'Mock Eligibility & Diagnostic Test',
    category: 'Discovery & Assessments',
    icon: 'verified',
    description: 'Live 10-question prerequisite screening across logic, math, CS, and analytical thinking.',
    adminControls: 'Instant 100% test score, bypass screening requirement.',
  },
  {
    id: 'skill-gap',
    title: 'Skill Gap & Matching Matrix',
    category: 'Discovery & Assessments',
    icon: 'checklist',
    description: 'Real-time delta comparison between user competencies and industry requisites.',
    adminControls: 'Inject verified skills, override missing competencies.',
  },

  // Roadmap & Learning
  {
    id: 'roadmap',
    title: '6-Month Career Roadmap',
    category: 'Roadmap & Learning',
    icon: 'alt_route',
    description: 'Month-by-month progressive technical curriculum with milestones and verification tests.',
    adminControls: 'Unlock all 6 months, mark all stages completed, edit monthly topics.',
  },
  {
    id: 'study-planner',
    title: 'AI Study Timetable & Planner',
    category: 'Roadmap & Learning',
    icon: 'calendar_month',
    description: 'Dynamic hourly study schedule with calendar sync and study-session timers.',
    adminControls: 'Generate accelerated 7-day schedules, edit daily study load.',
  },
  {
    id: 'courses',
    title: 'Curated Courses & Free Docs',
    category: 'Roadmap & Learning',
    icon: 'auto_stories',
    description: '120+ free video playlists, official documentation links, and sandbox links.',
    adminControls: 'Add/remove course resources, update YouTube playlist URLs.',
  },
  {
    id: 'projects',
    title: 'Capstone Projects Module',
    category: 'Roadmap & Learning',
    icon: 'assignment',
    description: 'Industry-grade project specs with automated AI code and architecture feedback rubrics.',
    adminControls: 'Auto-grade submissions with 100/100, generate custom rubrics.',
  },

  // Career & Placement
  {
    id: 'resume-analyzer',
    title: 'AI Resume ATS Analyzer',
    category: 'Career & Placement',
    icon: 'document_scanner',
    description: 'NLP resume parser, ATS benchmark score, keyword extractor, and STAR rewrite generator.',
    adminControls: 'Test any custom JD, inspect raw entity tokens, 1-click inject skills.',
  },
  {
    id: 'resume-builder',
    title: 'ATS-Friendly Resume Builder',
    category: 'Career & Placement',
    icon: 'description',
    description: 'Real-time resume designer with PDF export, single-column ATS templates, and live score.',
    adminControls: 'Populate sample profiles, export unrestricted master resumes.',
  },
  {
    id: 'jobs',
    title: 'Job Recommendations Engine',
    category: 'Career & Placement',
    icon: 'work',
    description: 'Live curated software, AI, and cybersecurity openings across Pakistan & Remote USA/EU.',
    adminControls: 'Add new job postings, edit salary ranges, toggle featured tags.',
  },
  {
    id: 'salary-market',
    title: 'Salary & Market Trends',
    category: 'Career & Placement',
    icon: 'trending_up',
    description: 'Comprehensive compensation charts, regional PKR vs USD data, and 2026 demand indexes.',
    adminControls: 'Update salary benchmarks, calibrate industry growth rates.',
  },
  {
    id: 'prep',
    title: 'FAANG Interview Preparation',
    category: 'Career & Placement',
    icon: 'record_voice_over',
    description: 'Interactive coding challenges, system design blueprints, and audio STAR practice.',
    adminControls: 'Unlock all 500+ questions, view official FAANG answer keys.',
  },
  {
    id: 'career-ladder',
    title: 'Post-Grad Career Ladder',
    category: 'Career & Placement',
    icon: 'stairs',
    description: '5-year progression pathways from Junior Engineer to Principal Architect & VP.',
    adminControls: 'Customize salary growth multipliers, modify experience milestones.',
  },
  {
    id: 'universities',
    title: 'Top Universities Directory',
    category: 'Career & Placement',
    icon: 'account_balance',
    description: 'Ranked list of Pakistani & Global institutions with fee structures and admission cutoffs.',
    adminControls: 'Edit admission dates, modify merit formula, add campuses.',
  },
  {
    id: 'scholarships',
    title: 'Scholarships & Grants Database',
    category: 'Career & Placement',
    icon: 'card_giftcard',
    description: 'Need-based and merit-based grants (HEC, Ehsaas, PEEF, Fulbright, Endowments).',
    adminControls: 'Add scholarship grants, edit application deadlines, override eligibility rules.',
  },

  // Intelligence & Core
  {
    id: 'dashboard',
    title: 'Student Career Dashboard',
    category: 'Intelligence & Core',
    icon: 'space_dashboard',
    description: 'Master progress overview, urgency deadline ticker, quick actions, and task manager.',
    adminControls: 'Force sync progress, complete/reset student tasks, trigger deadline alerts.',
  },
  {
    id: 'coach',
    title: 'AI Career Mentor (Dr. Sarah)',
    category: 'Intelligence & Core',
    icon: 'robot_2',
    description: 'Gemini-powered 24/7 technical and emotional career mentor chat.',
    adminControls: 'Inspect system instructions, tune temperature, audit LLM response latency.',
  },
  {
    id: 'notifications',
    title: 'Smart Notifications & Alarms',
    category: 'Intelligence & Core',
    icon: 'notifications_active',
    description: 'Push reminder configurations, daily study alarms, and frequency settings.',
    adminControls: 'Trigger live broadcast push, simulate urgent deadline alarms.',
  },
  {
    id: 'profile',
    title: 'User Profile & Roles',
    category: 'Intelligence & Core',
    icon: 'account_circle',
    description: 'Account credentials, avatar customizer, daily presence streak, and theme studio.',
    adminControls: 'Switch roles between Admin, Student, and Mentor; edit personal records.',
  },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onNavigate,
  isDarkMode,
  onTriggerSimulatedNotification,
  onTriggerAlarm,
  currentUser,
  onUpdateUser,
  onSetAllTasksCompleted,
  onResetProgressToZero,
  isAdminMasterUnlocked = true,
  onToggleAdminMasterUnlock,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'all-modules' | 'users' | 'master-overrides' | 'broadcast' | 'dataset' | 'ai-health'
  >('overview');

  const [students, setStudents] = useState<ManagedStudent[]>(INITIAL_STUDENTS);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<ManagedStudent | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [moduleFilterCategory, setModuleFilterCategory] = useState<string>('all');

  // Master Override Statuses
  const [masterUnlocked, setMasterUnlocked] = useState<boolean>(isAdminMasterUnlocked);
  const [overrideFeedback, setOverrideFeedback] = useState<string | null>(null);

  // Broadcast Notification Form
  const [broadcastTitle, setBroadcastTitle] = useState('🚨 URGENT: Capstone Project Phase 1 Submission Reminder');
  const [broadcastMessage, setBroadcastMessage] = useState(
    'All AI & Full-Stack track candidates must submit their GitHub architecture blueprints before tonight 10:00 PM PKT.'
  );
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'ai-track' | 'ics-stream' | 'pre-engineering'>('all');
  const [broadcastType, setBroadcastType] = useState<'banner' | 'alarm' | 'both'>('both');
  const [broadcastSuccessMessage, setBroadcastSuccessMessage] = useState<string | null>(null);

  // AI Sandbox Playground Prompt
  const [aiTestPrompt, setAiTestPrompt] = useState(
    'Evaluate the candidate career profile for Fatima Asif (BSCS, 3.82 CGPA) and generate a 3-point recommendation for AI Engineer placement at FAANG.'
  );
  const [aiTestResponse, setAiTestResponse] = useState<string | null>(null);
  const [isTestingAi, setIsTestingAi] = useState(false);

  // Quick Action: Toggle Master Unlock
  const handleToggleUnlock = (enabled: boolean) => {
    setMasterUnlocked(enabled);
    if (onToggleAdminMasterUnlock) {
      onToggleAdminMasterUnlock(enabled);
    }
    setOverrideFeedback(enabled ? '🔓 Master God-Mode Enabled: All 25 modules & roadmaps fully unlocked.' : '🔒 Standard Role Restrictions Restored.');
    setTimeout(() => setOverrideFeedback(null), 3000);
  };

  // Quick Action: Instant 100% Progress
  const handleInstant100 = () => {
    if (onSetAllTasksCompleted) {
      onSetAllTasksCompleted();
    }
    if (onUpdateUser) {
      onUpdateUser({
        eligibilityScore: 100,
        eligibilityStatus: 'Direct Eligible',
      });
    }
    setOverrideFeedback('⚡ Instant 100% Progress Applied: All roadmap milestones, tasks, and capstones verified.');
    setTimeout(() => setOverrideFeedback(null), 3500);
  };

  // Quick Action: Reset Progress
  const handleResetProgress = () => {
    if (onResetProgressToZero) {
      onResetProgressToZero();
    }
    setOverrideFeedback('🔄 Student Progress Reset to Clean 0% State.');
    setTimeout(() => setOverrideFeedback(null), 3000);
  };

  // Impersonate / Switch User
  const handleImpersonateUser = (student: ManagedStudent) => {
    if (onUpdateUser) {
      onUpdateUser({
        name: student.name.replace(' (You)', ''),
        email: student.email,
        role: student.role,
        systemRole: student.systemRole,
        isAdmin: student.systemRole === 'admin' || student.systemRole === 'superadmin',
        avatar: student.avatar,
        fscStream: (student.stream.includes('ICS') ? 'ICS' : student.stream.includes('Pre-Eng') ? 'Pre-Engineering' : 'BS Student') as any,
        lastMarks: student.cgpaOrMarks,
        eligibilityStatus: student.eligibilityStatus,
      });
    }
    setOverrideFeedback(`👤 Switched active session to ${student.name} (${student.systemRole.toUpperCase()})`);
    setTimeout(() => setOverrideFeedback(null), 3500);
  };

  // Broadcast Submission
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const alertFullText = `📢 [${broadcastTarget.toUpperCase()} BROADCAST] ${broadcastTitle}: ${broadcastMessage}`;

    if (broadcastType === 'banner' || broadcastType === 'both') {
      if (onTriggerSimulatedNotification) {
        onTriggerSimulatedNotification(alertFullText);
      }
    }

    if (broadcastType === 'alarm' || broadcastType === 'both') {
      if (onTriggerAlarm) {
        onTriggerAlarm(
          broadcastTitle,
          'Today',
          '10:00 PM',
          `Target: ${broadcastTarget.toUpperCase()}`
        );
      }
    }

    setBroadcastSuccessMessage(`✓ Broadcast dispatched to ${broadcastTarget === 'all' ? '14,820 learners' : 'target segment'}!`);
    setTimeout(() => setBroadcastSuccessMessage(null), 3500);
  };

  // Run AI Test Prompt
  const handleRunAiTest = () => {
    setIsTestingAi(true);
    setAiTestResponse(null);

    setTimeout(() => {
      setIsTestingAi(false);
      setAiTestResponse(
        `[Google Gemini 3.7 Flash Thinking - 238ms Latency]\n\n` +
        `Candidate Analysis for Fatima Asif (fast-track placement recommendation):\n` +
        `1. Neural Model Specialization: With a 3.82 CGPA and core Python strength, priority focus should be given to Transformer architectures (LLMs / Vision) and PyTorch distributed training.\n` +
        `2. Production MLOps Capstone: Deploy the FastAPI recommendation engine via Docker container on AWS/GCP with latency <40ms.\n` +
        `3. Tier-1 Placement Target: Highly eligible for AI Research Associate at NUST/FAST and Junior Machine Learning Engineer at top global remote firms ($35,000 - $65,000 USD/yr).`
      );
    }, 900);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      s.targetCareer.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const filteredModules = ALL_SYSTEM_MODULES.filter((m) => {
    if (moduleFilterCategory === 'all') return true;
    return m.category === moduleFilterCategory;
  });

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1360px] mx-auto pb-28 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner with Superuser Badge */}
      <div className="rounded-3xl p-6 sm:p-8 mb-8 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-sm text-amber-400 animate-pulse">shield_person</span>
                <span>ADMIN SUPERUSER • ALL THINGS ACCESS ACTIVE</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                Full Root Privileges
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Omniscient Admin & Ecosystem Control Hub
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
              As an Administrator, you have unrestricted access to all 25+ modules, student records, knowledge bases, roadmap unlock keys, push broadcasts, and Gemini AI telemetry.
            </p>
          </div>

          {/* Quick Superuser Action Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleToggleUnlock(!masterUnlocked)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border shadow-lg ${
                masterUnlocked
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="Toggle Master God-Mode to unlock all modules for any student"
            >
              <span className="material-symbols-outlined text-base">
                {masterUnlocked ? 'lock_open' : 'lock'}
              </span>
              <span>{masterUnlocked ? 'God-Mode: ALL UNLOCKED' : 'Standard Mode'}</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">space_dashboard</span>
              <span>Student Dashboard</span>
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {overrideFeedback && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>{overrideFeedback}</span>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 mb-8 p-2 glass-card rounded-2xl border border-white/10 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Ecosystem Pulse', icon: 'insights' },
          { id: 'all-modules', label: 'All 25 Modules Launchpad', icon: 'apps' },
          { id: 'users', label: 'Student & User Roster', icon: 'group' },
          { id: 'master-overrides', label: 'God-Mode Overrides', icon: 'key' },
          { id: 'broadcast', label: 'Smart Broadcasts & Alarms', icon: 'campaign' },
          { id: 'dataset', label: 'Knowledge Base & Datasets', icon: 'database' },
          { id: 'ai-health', label: 'Gemini AI Telemetry', icon: 'neurology' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeSubTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md shadow-amber-500/20 font-extrabold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW / ECOSYSTEM PULSE */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 bg-emerald-950/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Total Active Learners
                </span>
                <span className="material-symbols-outlined text-emerald-400 text-lg">groups</span>
              </div>
              <p className="text-3xl font-extrabold font-mono text-white">14,820</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-mono">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+18.4% this month across PK</span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-indigo-500/30 bg-indigo-950/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Roadmap Milestone Velocity
                </span>
                <span className="material-symbols-outlined text-indigo-400 text-lg">alt_route</span>
              </div>
              <p className="text-3xl font-extrabold font-mono text-indigo-300">84.2%</p>
              <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                <span>Average 4.2 weeks / module</span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-amber-500/30 bg-amber-950/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Verified Capstone Blueprints
                </span>
                <span className="material-symbols-outlined text-amber-400 text-lg">code_blocks</span>
              </div>
              <p className="text-3xl font-extrabold font-mono text-amber-300">3,490</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span>99.2% Automated AI Feedback</span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-purple-500/30 bg-purple-950/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                  Top Student Career Preference
                </span>
                <span className="material-symbols-outlined text-purple-400 text-lg">psychology</span>
              </div>
              <p className="text-2xl font-extrabold font-mono text-purple-300">AI Engineering</p>
              <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                <span>42% of total enrolled cohort</span>
              </div>
            </div>
          </div>

          {/* Student Career Pipeline Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-400">bar_chart</span>
                  <span>Candidate Career Pipeline Distribution</span>
                </h3>
                <span className="text-xs font-mono text-white/50">14,820 Candidates Total</span>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Artificial Intelligence & Machine Learning', percent: 42, count: '6,224 Students', color: 'bg-purple-500' },
                  { name: 'Full-Stack Software Architecture (React/Node)', percent: 28, count: '4,150 Students', color: 'bg-indigo-500' },
                  { name: 'Data Science & Predictive Analytics', percent: 16, count: '2,371 Students', color: 'bg-emerald-500' },
                  { name: 'Cyber Security & DevSecOps Engineering', percent: 14, count: '2,075 Students', color: 'bg-rose-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/80 font-bold">{item.name}</span>
                      <span className="text-white/60 font-semibold">{item.count} ({item.percent}%)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Master Superuser Access Tiles */}
            <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-amber-500/30 bg-amber-950/10 space-y-4">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">key</span>
                <span>Admin Quick Actions</span>
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={() => setActiveSubTab('all-modules')}
                  className="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-bold text-xs text-white group-hover:text-amber-300">Launch Any Module (25 Total)</p>
                    <p className="text-[10px] text-white/50 font-mono">Direct deep link with superuser tokens</p>
                  </div>
                  <span className="material-symbols-outlined text-base text-amber-400">arrow_forward</span>
                </button>

                <button
                  onClick={handleInstant100}
                  className="w-full p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-bold text-xs text-emerald-300">Grant 100% Milestone Progress</p>
                    <p className="text-[10px] text-white/50 font-mono">Completes all quizzes & capstones</p>
                  </div>
                  <span className="material-symbols-outlined text-base text-emerald-400">flash_on</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('broadcast')}
                  className="w-full p-3 rounded-2xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/40 text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-bold text-xs text-indigo-300">Dispatch Push Broadcast</p>
                    <p className="text-[10px] text-white/50 font-mono">Real-time alert banner to all devices</p>
                  </div>
                  <span className="material-symbols-outlined text-base text-indigo-400">campaign</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ALL 25 MODULES LAUNCHPAD */}
      {activeSubTab === 'all-modules' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">apps</span>
                <span>Omniscient 25-Module Master Grid</span>
              </h3>
              <p className="text-xs text-white/60">
                As an Admin, click any module below to immediately navigate with full superuser permissions and unlocked prerequisites.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {['all', 'Discovery & Assessments', 'Roadmap & Learning', 'Career & Placement', 'Intelligence & Core'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setModuleFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 ${
                    moduleFilterCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Modules (25)' : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((mod) => (
              <div
                key={mod.id}
                className="glass-card rounded-3xl p-5 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group relative overflow-hidden"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-xl">{mod.icon}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] font-mono">
                      {mod.category.split(' ')[0]}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-2">
                  <p className="text-[10px] text-amber-300 font-mono line-clamp-1">
                    👑 <strong>Admin Override:</strong> {mod.adminControls}
                  </p>

                  <button
                    onClick={() => onNavigate(mod.id)}
                    className="w-full py-2 bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Launch as Admin</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STUDENT & USER ROSTER */}
      {activeSubTab === 'users' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">manage_accounts</span>
                <span>User & Student Management Directory</span>
              </h3>
              <p className="text-xs text-white/60">
                Inspect candidate scores, switch active sessions, change roles, and modify academic records.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search candidates by name or email..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase">
                  <th className="pb-3">Candidate / User</th>
                  <th className="pb-3">System Role</th>
                  <th className="pb-3">Academic Stream</th>
                  <th className="pb-3">Progress</th>
                  <th className="pb-3">Eligibility Status</th>
                  <th className="pb-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 object-cover"
                        />
                        <div>
                          <p className="font-bold text-white text-xs">{student.name}</p>
                          <p className="text-[10px] text-white/50">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 pr-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          student.systemRole === 'superadmin' || student.systemRole === 'admin'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : student.systemRole === 'mentor'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        }`}
                      >
                        {student.systemRole.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3.5 pr-3">
                      <span className="text-white/80">{student.stream}</span>
                      <span className="block text-[10px] text-white/40">{student.cgpaOrMarks}</span>
                    </td>

                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${student.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-emerald-400 font-bold text-[10px]">{student.progressPercent}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 pr-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.eligibilityStatus === 'Direct Eligible' || student.eligibilityStatus === 'Advanced Standing'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {student.eligibilityStatus}
                      </span>
                    </td>

                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleImpersonateUser(student)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] shadow-xs transition-all"
                        title="Impersonate / Log in as this user"
                      >
                        Switch To User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. MASTER OVERRIDES & GOD-MODE */}
      {activeSubTab === 'master-overrides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="material-symbols-outlined">key</span>
              <span>Universal Lock Bypass & Progression Override</span>
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Activate global God-Mode to unlock every month of the learning roadmap, skip quiz barriers, and enable unrestricted capstone submission.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleToggleUnlock(true)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">lock_open</span>
                <span>Force Unlock All 6 Roadmap Months & Modules</span>
              </button>

              <button
                onClick={handleInstant100}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">task_alt</span>
                <span>Auto-Complete All Tasks & Quizzes (100% Score)</span>
              </button>

              <button
                onClick={handleResetProgress}
                className="w-full py-3 bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-white font-mono font-bold rounded-xl text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                <span>Reset Learner Progress to 0% (Clean Test Run)</span>
              </button>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">admin_panel_settings</span>
              <span>Role & Permission Security Matrix</span>
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Your current account (<strong>{currentUser?.email || 'fatima01asiflive@gmail.com'}</strong>) possesses root master privileges.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-emerald-400">
                <span>✓ All 25 Modules Navigation:</span>
                <span className="font-bold">UNRESTRICTED</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400">
                <span>✓ AI Resume ATS Entity Inspection:</span>
                <span className="font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400">
                <span>✓ Push Broadcast & Alarm Trigger:</span>
                <span className="font-bold">ROOT AUTHORIZED</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400">
                <span>✓ Gemini 3.7 Flash Thinking Backend:</span>
                <span className="font-bold">SERVER LIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SMART BROADCASTS & ALARMS */}
      {activeSubTab === 'broadcast' && (
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">campaign</span>
              <span>Real-Time Broadcast & Push Alert Console</span>
            </h3>
            <p className="text-xs text-white/60">
              Trigger system-wide notification banners and audible countdown alarms across all active devices.
            </p>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-white/70 block mb-1">Broadcast Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-white/70 block mb-1">Message Body</label>
              <textarea
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-white/70 block mb-1">Audience Target</label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none font-mono"
                >
                  <option value="all">All 14,820 Learners (Pakistan & Global)</option>
                  <option value="ai-track">AI & Machine Learning Cohort (6,224)</option>
                  <option value="ics-stream">ICS Stream Intermediate Students (4,150)</option>
                  <option value="pre-engineering">Pre-Engineering Transition Candidates (2,075)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-white/70 block mb-1">Alert Medium</label>
                <select
                  value={broadcastType}
                  onChange={(e) => setBroadcastType(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none font-mono"
                >
                  <option value="both">Visual Banner + Audible Deadline Alarm</option>
                  <option value="banner">Visual Header Toast Only</option>
                  <option value="alarm">Audible Modal Alarm Only</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {broadcastSuccessMessage ? (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>{broadcastSuccessMessage}</span>
                </span>
              ) : (
                <span className="text-xs font-mono text-white/50">Triggers real-time alerts across all sessions</span>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 min-h-[44px]"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>Send Broadcast Alert</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. KNOWLEDGE BASE & DATASETS */}
      {activeSubTab === 'dataset' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">database</span>
                <span>Ecosystem Knowledge Datasets & Content Records</span>
              </h3>
              <p className="text-xs text-white/60">
                Verified database items indexed in memory across Pakistan and international standards.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
              ✓ All Synced (v3.0)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white block text-sm">Pakistan Universities Index</strong>
                <span className="text-emerald-400 font-bold">35+ Campuses</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                NUST (Islamabad), FAST (Lahore/Karachi/Isb), GIKI (Topi), COMSATS, ITU, UET, LUMS, IBA, PIEAS.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white block text-sm">Curated Free Courses & Docs</strong>
                <span className="text-indigo-400 font-bold">120+ Playlists</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                CS50 Harvard, Andrew Ng DeepLearning.AI, freeCodeCamp, fast.ai, MDN Web Docs, Scikit-learn.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white block text-sm">Scholarships & Grants Matrix</strong>
                <span className="text-amber-400 font-bold">100% Coverage</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                HEC Need-Based, PEEF, Ehsaas Undergraduate, Fulbright USA, Erasmus Mundus, FAST Endowment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-white block text-sm">FAANG & LeetCode Question Bank</strong>
                <span className="text-purple-400 font-bold">500+ Challenges</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                Algorithmic Big-O logic, System Design microservices, and Behavioral STAR Rubrics.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7. GEMINI AI TELEMETRY & SANDBOX */}
      {activeSubTab === 'ai-health' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-400">neurology</span>
                  <span>Google Gemini 3.6 & 3.7 AI Architecture</span>
                </h3>
                <p className="text-xs text-white/60">Server-side proxy routes via @google/genai TypeScript SDK</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-white/50 text-[10px] uppercase">Primary Fast Model</span>
                <p className="text-white font-bold text-sm">gemini-3.6-flash</p>
                <span className="text-emerald-400 text-[10px]">Optimal for AI Coach Sarah Live Chat</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-white/50 text-[10px] uppercase">Reasoning Engine</span>
                <p className="text-white font-bold text-sm">gemini-3.7-flash-thinking</p>
                <span className="text-purple-400 text-[10px]">Deep candidate psychometrics & code audits</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-white/50 text-[10px] uppercase">Stream Response Latency</span>
                <p className="text-emerald-400 font-bold text-lg">238 ms</p>
                <span className="text-white/50 text-[10px]">Zero dropped packets</span>
              </div>
            </div>
          </div>

          {/* Live AI Test Sandbox Playground */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">terminal</span>
              <span>Admin AI Prompt Sandbox Playground</span>
            </h3>

            <textarea
              rows={3}
              value={aiTestPrompt}
              onChange={(e) => setAiTestPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-white/15 rounded-2xl p-3.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 resize-none"
            />

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/50">
                Tests server-side reasoning output against candidate profile
              </span>

              <button
                onClick={handleRunAiTest}
                disabled={isTestingAi}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs font-mono font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  {isTestingAi ? 'hourglass_empty' : 'play_arrow'}
                </span>
                <span>{isTestingAi ? 'Querying Gemini...' : 'Execute Test Query'}</span>
              </button>
            </div>

            {aiTestResponse && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed animate-in fade-in duration-200">
                {aiTestResponse}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
