import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IntelliPathLogo } from './IntelliPathLogo';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  onToggleDesktopSidebar?: () => void;
  isDesktopSidebarCollapsed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  onToggleDesktopSidebar,
  isDesktopSidebarCollapsed = false,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/career')) return 'Career Interests';
    if (path.startsWith('/assessment')) return 'Assessment';
    if (path.startsWith('/result')) return 'Assessment Result';
    if (path.startsWith('/roadmap')) return 'Career Roadmap';
    if (path.startsWith('/courses')) return 'Courses';
    if (path.startsWith('/resources')) return 'Resources';
    if (path.startsWith('/projects')) return 'Projects';
    if (path.startsWith('/profile-setup')) return 'Profile Setup';
    if (path.startsWith('/profile')) return 'Profile';
    if (path.startsWith('/settings')) return 'Settings';
    if (path.startsWith('/notifications')) return 'Notifications';
    if (path.startsWith('/personality')) return 'Personality Assessment';
    if (path.startsWith('/skill-gap')) return 'Skill Gap Analysis';
    if (path.startsWith('/login')) return 'Login';
    if (path.startsWith('/signup')) return 'Sign Up';
    return 'CareerPath AI';
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between select-none">
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>

        <button
          type="button"
          onClick={onToggleDesktopSidebar}
          className="hidden md:flex h-9 w-9 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white items-center justify-center"
          title={isDesktopSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isDesktopSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <span className="material-symbols-outlined text-lg">
            {isDesktopSidebarCollapsed ? 'menu_open' : 'menu'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {!isAuthenticated && location.pathname === '/' && (
            <IntelliPathLogo size="sm" variant="horizontal" showTagline={false} />
          )}
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">{getPageTitle()}</h1>
        </div>
      </div>
      <div />
    </header>
  );
};
