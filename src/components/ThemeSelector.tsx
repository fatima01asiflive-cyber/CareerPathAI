import React, { useEffect, useRef, useState } from 'react';
import { APP_THEMES } from '../data/themesData';
import { useTheme } from '../context/ThemeContext';

interface ThemeSelectorProps { variant?: 'compact' | 'full'; className?: string; }

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ variant = 'compact', className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const active = APP_THEMES.find((t) => t.id === theme) || APP_THEMES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (variant === 'full') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
        {APP_THEMES.map((t) => (
          <button key={t.id} type="button" onClick={() => setTheme(t.id)} className={`p-3.5 rounded-2xl border text-left transition-all ${theme === t.id ? 'border-[var(--primary-accent)] ring-2 ring-[var(--primary-accent)]/20' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'}`}>
            <div className="flex items-center justify-between gap-2">
              <span className="w-5 h-5 rounded-full border border-white/20" style={{ background: `linear-gradient(135deg, ${t.previewColors.primary}, ${t.previewColors.accent})` }} />
              <span className="text-[9px] uppercase font-black text-slate-500">{t.category}</span>
            </div>
            <p className="mt-3 text-xs font-black text-white">{t.name}</p>
            <p className="mt-1 text-[10px] text-slate-400 line-clamp-2">{t.description}</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen((v) => !v)} className="h-9 w-9 sm:w-auto sm:px-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 flex items-center justify-center gap-1.5 text-xs transition-all" title="Select Theme" aria-expanded={isOpen}>
        <span className="w-2.5 h-2.5 rounded-full border border-white/30" style={{ background: active.primaryColor }} />
        <span className="hidden sm:inline">{active.name}</span>
        <span className="material-symbols-outlined text-sm">palette</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
          <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-slate-500 font-black">Theme Studio</div>
          <div className="grid grid-cols-2 gap-1.5 mt-1 max-h-[60vh] overflow-y-auto">
            {APP_THEMES.map((t) => (
              <button key={t.id} type="button" onClick={() => { setTheme(t.id); setIsOpen(false); }} className={`p-2 rounded-xl text-left border ${theme === t.id ? 'border-[var(--primary-accent)] bg-white/5' : 'border-transparent hover:border-slate-700 hover:bg-slate-800/60'}`}>
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: t.primaryColor }} />
                <span className="block mt-1 text-[10px] text-slate-200 font-bold">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
