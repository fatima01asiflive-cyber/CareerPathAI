import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IntelliPathLogo } from '../IntelliPathLogo';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, unreadNotifsCount } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Academic Journey', path: '/academic-journey', icon: 'school' },
    { label: 'Career Interests', path: '/career', icon: 'interests' },
    { label: 'Career Roadmap', path: '/roadmap', icon: 'timeline' },
    { label: 'Resources', path: '/resources', icon: 'library_books' },
    { label: 'Assessment', path: '/assessment', icon: 'quiz' },
    { label: 'Projects', path: '/projects', icon: 'task_alt' },
  ];

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const closeMobile = () => onCloseMobile?.();

  const handleLogout = () => {
    logout();
    closeMobile();
    navigate('/');
  };

  return (
    <>
      {isMobileOpen && (
        <button className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={closeMobile} aria-label="Close navigation" />
      )}

      <aside
        className={`fixed md:sticky left-0 top-0 z-50 h-screen flex flex-col border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 shrink-0 ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="h-16 flex items-center justify-between px-3 border-b border-slate-800/80 shrink-0">
          <Link to={user ? '/dashboard' : '/'} onClick={closeMobile} className="flex items-center gap-2 min-w-0">
            {isCollapsed ? (
              <div className="mx-auto w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20 flex items-center justify-center font-black text-xs">CP</div>
            ) : (
              <IntelliPathLogo size="sm" variant="horizontal" showTagline={false} />
            )}
          </Link>
          {!isCollapsed && onToggleCollapse && (
            <button onClick={onToggleCollapse} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900" title="Collapse sidebar">
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5">
          {navItems.map((item) => (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                onClick={closeMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={`material-symbols-outlined text-lg ${isActive(item.path) ? 'text-sky-400' : ''}`}>{item.icon}</span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="relative p-3 border-t border-slate-800 bg-slate-950/90">
          <button
            onClick={() => setProfileMenuOpen((v) => !v)}
            className={`w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 ${isCollapsed ? 'justify-center' : ''}`}
            aria-expanded={profileMenuOpen}
            title="Profile"
          >
            <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-300 font-bold text-sm shrink-0">
              {(user?.name || 'S').charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="min-w-0 text-left flex-1">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Student'}</p>
                <p className="text-[10px] text-slate-500 truncate">Profile & account</p>
              </div>
            )}
            {!isCollapsed && <span className="material-symbols-outlined text-slate-500 text-sm">expand_less</span>}
          </button>

          {profileMenuOpen && (
            <div className={`absolute bottom-full mb-2 ${isCollapsed ? 'left-2' : 'left-3 right-3'} rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50`}>
              <Link to="/profile" onClick={closeMobile} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                <span className="material-symbols-outlined text-sm">person</span>{!isCollapsed && 'Profile'}
              </Link>
              <Link to="/settings" onClick={closeMobile} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                <span className="material-symbols-outlined text-sm">settings</span>{!isCollapsed && 'Settings'}
              </Link>
              <Link to="/notifications" onClick={closeMobile} className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">notifications</span>{!isCollapsed && 'Notifications'}</span>
                {unreadNotifsCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-400" />}
              </Link>
              <div className="h-px bg-slate-800 my-1" />
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10">
                <span className="material-symbols-outlined text-sm">logout</span>{!isCollapsed && 'Logout'}
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
