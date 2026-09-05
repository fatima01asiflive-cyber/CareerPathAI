import React from 'react';
import { TabType } from '../types';

interface PageContainerProps {
  pageId: TabType;
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
  children: React.ReactNode;
  onNavigate?: (tab: TabType) => void;
  isDarkMode?: boolean;
  breadcrumbs?: { label: string; tab?: TabType }[];
  actions?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  pageId,
  title,
  subtitle,
  icon,
  badge,
  children,
  onNavigate,
  isDarkMode = true,
  breadcrumbs,
  actions,
}) => {
  return (
    <div className="w-full flex-1 flex flex-col animate-fade-in pb-16 md:pb-8">
      {/* Page Header Bar (Dedicated Page Identification) */}
      <div
        className={`w-full border-b backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 transition-colors ${
          isDarkMode
            ? 'bg-slate-950/60 border-white/10'
            : 'bg-white/70 border-slate-200 shadow-xs'
        }`}
      >
        <div className="app-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Breadcrumbs & Title */}
          <div className="space-y-1">
            <nav className="flex items-center gap-1.5 text-[11px] font-mono text-white/50" aria-label="Breadcrumb">
              <button
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">home</span>
                <span>Home</span>
              </button>
              <span className="text-white/30">/</span>
              <span className="text-white/40">Pages</span>
              {breadcrumbs &&
                breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    <span className="text-white/30">/</span>
                    {b.tab && onNavigate ? (
                      <button
                        onClick={() => onNavigate(b.tab!)}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {b.label}
                      </button>
                    ) : (
                      <span className="text-white/70">{b.label}</span>
                    )}
                  </React.Fragment>
                ))}
              <span className="text-white/30">/</span>
              <span className="text-emerald-400 font-semibold">{title}</span>
            </nav>

            <div className="flex items-center gap-2.5 flex-wrap">
              {icon && (
                <span className="material-symbols-outlined text-xl text-emerald-400 shrink-0">
                  {icon}
                </span>
              )}
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{title}</span>
              </h1>
              {badge && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
                  {badge}
                </span>
              )}
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/10">
                PAGE: #{pageId}
              </span>
            </div>

            {subtitle && (
              <p className="text-xs text-white/60 max-w-2xl">{subtitle}</p>
            )}
          </div>

          {/* Quick Page Actions */}
          <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
            {actions}
            {pageId !== 'dashboard' && onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                  isDarkMode
                    ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
                    : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
                title="Back to Main Dashboard Page"
              >
                <span className="material-symbols-outlined text-sm">dashboard</span>
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};
