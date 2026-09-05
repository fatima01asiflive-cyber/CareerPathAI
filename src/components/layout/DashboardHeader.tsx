import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeSelector } from '../ThemeSelector';
import { IntelliPathLogo } from '../IntelliPathLogo';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  isSidebarCollapsed,
}) => {
  const { user, logout, notifications, unreadNotifsCount, markNotifsAsRead } = useAuth();
  const [showNotifsDropdown, setShowNotifsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-3">
      {/* Left: Sidebar Toggle & Brand (Mobile / Compact) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-colors"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle Sidebar"
        >
          <span className="material-symbols-outlined text-lg">
            {isSidebarCollapsed ? 'menu_open' : 'menu'}
          </span>
        </button>

        <Link to="/dashboard" className="flex items-center gap-2 md:hidden">
          <IntelliPathLogo size="xs" variant="horizontal" />
        </Link>

        {/* Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex items-center relative max-w-xs md:max-w-sm w-full"
        >
          <span className="material-symbols-outlined absolute left-3 text-slate-500 text-sm pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search courses, skills, roadmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-sans"
          />
        </form>
      </div>

      {/* Right: Theme Selector, Notifications, AI Coach quick link, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Career Coach Fast Badge */}
        <Link
          to="/chatbot"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-sm">robot_2</span>
          <span>AI Coach</span>
        </Link>

        {/* Theme Selector + Streak */}
        <ThemeSelector variant="compact" />
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] font-black" title="Current learning streak">🔥 {user?.streakCount || 0}</span>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifsDropdown(!showNotifsDropdown);
              if (!showNotifsDropdown) markNotifsAsRead();
            }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-slate-950 animate-pulse" />
            )}
          </button>

          {showNotifsDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 space-y-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                  {unreadNotifsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-mono font-bold">
                      {unreadNotifsCount} New
                    </span>
                  )}
                </div>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifsDropdown(false)}
                  className="text-[11px] text-sky-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.slice(0, 4).map((n) => (
                  <Link
                    key={n.id}
                    to={n.actionUrl || '/notifications'}
                    onClick={() => setShowNotifsDropdown(false)}
                    className="block p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-200 line-clamp-1">{n.title}</p>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{n.message}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 transition-colors"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight pr-1">
              <span className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                {user?.name || 'Student'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {user?.aptitudeScore ? `${user.aptitudeScore}% Match` : 'Explorer'}
              </span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-xs hidden lg:inline">
              expand_more
            </span>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 space-y-1 z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Student Explorer'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'student@intellipath.edu'}</p>
              </div>

              <Link
                to="/profile"
                onClick={() => setShowProfileDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-sm text-sky-400">person</span>
                <span>My Profile & Skills</span>
              </Link>

              <Link
                to="/profile-setup"
                onClick={() => setShowProfileDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-sm text-indigo-400">tune</span>
                <span>Update Academic Profile</span>
              </Link>

              <Link
                to="/settings"
                onClick={() => setShowProfileDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-sm text-slate-400">settings</span>
                <span>Account & Theme Settings</span>
              </Link>

              <div className="pt-1 border-t border-slate-800/80">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
