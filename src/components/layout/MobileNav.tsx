import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { label: 'Home', path: '/dashboard', icon: 'dashboard' },
    { label: 'Test', path: '/assessment', icon: 'quiz' },
    { label: 'Roadmap', path: '/roadmap', icon: 'timeline' },
    { label: 'Courses', path: '/courses', icon: 'school' },
    { label: 'AI Coach', path: '/chatbot', icon: 'robot_2' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
              active ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                active ? 'text-sky-400 scale-110' : 'text-slate-400'
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
