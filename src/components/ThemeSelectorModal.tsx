import React, { useState } from 'react';
import { APP_THEMES, AppTheme } from '../data/themesData';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  isDarkMode: boolean;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
  isDarkMode,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dark' | 'light' | 'high-contrast'>('all');

  if (!isOpen) return null;

  const currentTheme = APP_THEMES.find((t) => t.id === currentThemeId) || APP_THEMES[0];

  const filteredThemes = APP_THEMES.filter((theme) => {
    if (activeCategory === 'all') return true;
    return theme.category === activeCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDarkMode
            ? 'bg-slate-950/95 border-white/15 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-500 to-purple-500 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl text-emerald-400">
                  palette
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl tracking-tight">Theme Studio & Appearance</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {APP_THEMES.length} Presets
                </span>
              </div>
              <p className="text-xs text-white/60">
                Personalize your workspace palette, contrast level, and visual ambiance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            title="Close theme selector"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Themes ({APP_THEMES.length})
          </button>
          <button
            onClick={() => setActiveCategory('dark')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'dark'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">nights_stay</span>
            <span>Dark & OLED</span>
          </button>
          <button
            onClick={() => setActiveCategory('light')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'light'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">light_mode</span>
            <span>Light & Editorial</span>
          </button>
          <button
            onClick={() => setActiveCategory('high-contrast')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'high-contrast'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">contrast</span>
            <span>High Contrast</span>
          </button>
        </div>

        {/* Theme Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredThemes.map((theme: AppTheme) => {
            const isSelected = theme.id === currentThemeId;

            return (
              <div
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 group relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10'
                }`}
              >
                {/* Active checkmark */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <span className="material-symbols-outlined text-sm font-black">check</span>
                  </div>
                )}

                {/* Color Swatch Preview Box */}
                <div
                  className="w-full h-20 rounded-xl p-2.5 flex flex-col justify-between border border-white/10 relative overflow-hidden"
                  style={{ backgroundColor: theme.previewColors.bg }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                        style={{ backgroundColor: theme.previewColors.primary }}
                      />
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                        style={{ backgroundColor: theme.previewColors.accent }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: theme.previewColors.surface,
                        color: theme.previewColors.text,
                      }}
                    >
                      {theme.isDark ? 'DARK' : 'LIGHT'}
                    </span>
                  </div>

                  {/* Mock card inside swatch */}
                  <div
                    className="rounded-lg p-1.5 flex items-center justify-between border border-white/10"
                    style={{ backgroundColor: theme.previewColors.surface }}
                  >
                    <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: theme.previewColors.primary }} />
                    <div className="w-6 h-1.5 rounded-full opacity-60" style={{ backgroundColor: theme.previewColors.text }} />
                  </div>
                </div>

                {/* Theme Details */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-emerald-400">
                      {theme.icon}
                    </span>
                    <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                      {theme.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed mt-1 line-clamp-2">
                    {theme.description}
                  </p>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  <span>{isSelected ? 'Active Theme' : 'Apply Theme'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer / Active Theme summary */}
        <div className="p-4 px-6 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-white/50 font-mono">Current Ambiance:</span>
            <span className="font-bold font-mono text-emerald-400">
              {currentTheme.name} ({currentTheme.category.toUpperCase()})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold transition-all shadow-md shadow-emerald-600/25"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
