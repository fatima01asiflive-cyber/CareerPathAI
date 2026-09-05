import React from 'react';
import { TabType, UserAccount } from '../types';
import { IntelliPathLogo } from './IntelliPathLogo';

interface NavigationProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
  isSidebarCollapsed?: boolean;
  onToggleCollapseSidebar?: () => void;
  user?: UserAccount;
}

interface NavSection {
  title: string;
  items: { id: TabType; label: string; icon: string; badge?: string }[];
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onNavigate,
  isDarkMode,
  isSidebarOpen,
  onCloseSidebar,
  isSidebarCollapsed = false,
  onToggleCollapseSidebar,
  user,
}) => {
  const navSections: NavSection[] = [
    {
      title: 'CORE PAGES',
      items: [
        { id: 'dashboard', label: 'Career Dashboard', icon: 'space_dashboard', badge: 'OVERVIEW' },
        { id: 'roadmap', label: 'Learning Roadmap', icon: 'alt_route', badge: 'STEP-BY-STEP' },
        { id: 'prep', label: 'FAANG AI Mock Interview', icon: 'record_voice_over', badge: 'VOICE & CODE' },
      ],
    },
    {
      title: 'ASSESSMENT & SKILLS',
      items: [
        { id: 'academic', label: 'Academic Background', icon: 'school' },
        { id: 'interests', label: 'Define Interests', icon: 'target' },
        { id: 'eligibility-test', label: 'Mock Aptitude & Diagnostic Test', icon: 'verified', badge: 'AI' },
        { id: 'skill-gap', label: 'Skill Gap & Match Matrix', icon: 'checklist' },
      ],
    },
    {
      title: 'EXECUTION & LEARNING',
      items: [
        { id: 'study-planner', label: 'AI Study Timetable & Alarms', icon: 'calendar_month', badge: 'AI' },
        { id: 'courses', label: 'Curated Courses & Docs', icon: 'auto_stories' },
        { id: 'projects', label: 'Capstone Projects & Rubrics', icon: 'assignment' },
      ],
    },
    {
      title: 'MENTORSHIP & SETTINGS',
      items: [
        { id: 'coach', label: 'AI Career Mentor (Chat)', icon: 'robot_2', badge: 'LLM' },
        { id: 'notifications', label: 'Smart Notifications & Alarms', icon: 'notifications_active' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={onCloseSidebar}
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col py-5 transition-all duration-300 border-r backdrop-blur-xl ${
          isSidebarCollapsed ? 'md:w-[72px]' : 'md:w-[280px]'
        } w-[280px] ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          isDarkMode
            ? 'bg-slate-950/95 border-white/10 text-white'
            : 'bg-white/95 border-indigo-100 text-slate-800 shadow-xl'
        }`}
      >
        {/* Sidebar Header */}
        <div className={`mb-3 flex items-center justify-between ${isSidebarCollapsed ? 'md:px-2 px-5' : 'px-5'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            {isSidebarCollapsed ? (
              <div className="hidden md:block">
                <IntelliPathLogo size="sm" variant="icon" />
              </div>
            ) : (
              <div className="hidden md:block">
                <IntelliPathLogo size="sm" variant="horizontal" />
              </div>
            )}
            <div className="md:hidden">
              <IntelliPathLogo size="sm" variant="horizontal" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onToggleCollapseSidebar && (
              <button
                onClick={onToggleCollapseSidebar}
                className="hidden md:flex p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                <span className="material-symbols-outlined text-lg">
                  {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
                </span>
              </button>
            )}

            <button
              onClick={onCloseSidebar}
              className="md:hidden p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-3.5 px-3 overflow-y-auto scrollbar-none">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold hidden md:block">
                  {section.title}
                </div>
              )}
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold md:hidden">
                {section.title}
              </div>

              {section.items.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onCloseSidebar();
                    }}
                    className={`w-full flex items-center justify-between py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isSidebarCollapsed ? 'md:justify-center md:px-0 px-3.5' : 'px-3.5'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-indigo-600 text-white shadow-lg shadow-emerald-600/25'
                        : isDarkMode
                        ? 'text-white/70 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-indigo-50'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="material-symbols-outlined text-lg shrink-0">{item.icon}</span>
                      {!isSidebarCollapsed && (
                        <span className="truncate hidden md:inline">{item.label}</span>
                      )}
                      <span className="truncate md:hidden">{item.label}</span>
                    </div>

                    {item.badge && !isSidebarCollapsed && (
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold hidden md:inline">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer Profile Avatar */}
        <div className={`mt-auto pt-3 border-t border-white/10 ${isSidebarCollapsed ? 'md:px-2 px-4' : 'px-4'}`}>
          <div
            onClick={() => {
              onNavigate('profile');
              onCloseSidebar();
            }}
            className={`p-2.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all glass-card hover:border-indigo-500/40 group ${
              isSidebarCollapsed ? 'md:justify-center md:p-2' : ''
            }`}
            title="View Profile & Roles"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 border border-emerald-500/30 text-white font-bold flex items-center justify-center text-xs group-hover:scale-105 transition-transform shrink-0">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'FA'}
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden hidden md:block">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-xs truncate">{user?.name || 'Fatima Asif'}</p>
                  {user?.isAdmin && (
                    <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono font-bold">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-400 font-mono truncate">
                  {user?.isAdmin ? 'Superuser (All Access)' : user?.role || 'BSCS Candidate'}
                </p>
              </div>
            )}
            <div className="overflow-hidden md:hidden">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-xs truncate">{user?.name || 'Fatima Asif'}</p>
                {user?.isAdmin && (
                  <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono font-bold">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-400 font-mono truncate">
                {user?.isAdmin ? 'Superuser (All Access)' : user?.role || 'BSCS Candidate'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Fixed Bottom Navigation Bar (Mobile Pages) */}
      <nav
        className={`fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-16 border-t md:hidden backdrop-blur-xl transition-all ${
          isDarkMode
            ? 'bg-slate-950/95 border-white/10 text-white'
            : 'bg-white/95 border-indigo-100 text-slate-800'
        }`}
      >
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-2 transition-transform active:scale-95 ${
            activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-white/50'
          }`}
        >
          <span className="material-symbols-outlined text-xl">space_dashboard</span>
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => onNavigate('roadmap')}
          className={`flex flex-col items-center justify-center py-1 px-2 transition-transform active:scale-95 ${
            activeTab === 'roadmap' ? 'text-emerald-400 font-bold' : 'text-white/50'
          }`}
        >
          <span className="material-symbols-outlined text-xl">alt_route</span>
          <span className="text-[10px] font-medium">Roadmap</span>
        </button>

        <button
          onClick={() => onNavigate('prep')}
          className={`flex flex-col items-center justify-center py-1 px-2 transition-transform active:scale-95 ${
            activeTab === 'prep' ? 'text-emerald-400 font-bold' : 'text-white/50'
          }`}
        >
          <span className="material-symbols-outlined text-xl">record_voice_over</span>
          <span className="text-[10px] font-medium">Interview</span>
        </button>

        <button
          onClick={() => onNavigate('courses')}
          className={`flex flex-col items-center justify-center py-1 px-2 transition-transform active:scale-95 ${
            activeTab === 'courses' ? 'text-emerald-400 font-bold' : 'text-white/50'
          }`}
        >
          <span className="material-symbols-outlined text-xl">auto_stories</span>
          <span className="text-[10px] font-medium">Courses</span>
        </button>

        <button
          onClick={() => onNavigate('coach')}
          className={`flex flex-col items-center justify-center py-1 px-2 transition-transform active:scale-95 ${
            activeTab === 'coach' ? 'text-emerald-400 font-bold' : 'text-white/50'
          }`}
        >
          <span className="material-symbols-outlined text-xl">robot_2</span>
          <span className="text-[10px] font-medium">AI Mentor</span>
        </button>
      </nav>
    </>
  );
};
