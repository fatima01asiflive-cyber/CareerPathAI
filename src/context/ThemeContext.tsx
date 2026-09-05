import React, { createContext, useContext, useEffect, useState } from 'react';
import { APP_THEMES, AppTheme } from '../data/themesData';
import { getCurrentUserId, userScopedKey } from '../utils/userScopedStorage';

export type ThemeType = AppTheme['id'];

export interface ThemeConfig extends AppTheme {
  bgClass: string;
  surfaceClass: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = Object.fromEntries(
  APP_THEMES.map((t) => [t.id, {
    ...t,
    bgClass: 'theme-app-bg',
    surfaceClass: 'theme-surface',
  }])
) as Record<ThemeType, ThemeConfig>;

const DEFAULT_THEME: ThemeType = 'midnight-indigo';

interface ThemeContextValue {
  theme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function savedThemeForUser(): ThemeType {
  try {
    const saved = localStorage.getItem(userScopedKey('intellipath_theme', getCurrentUserId())) as ThemeType;
    if (saved && THEMES[saved]) return saved;
  } catch {}
  return DEFAULT_THEME;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(savedThemeForUser);

  const setTheme = (newTheme: ThemeType) => {
    if (!THEMES[newTheme]) return;
    setThemeState(newTheme);
    try { localStorage.setItem(userScopedKey('intellipath_theme', getCurrentUserId()), newTheme); } catch {}
  };

  useEffect(() => {
    const config = THEMES[theme] || THEMES[DEFAULT_THEME];
    const root = document.documentElement;
    const allThemeClasses = APP_THEMES.flatMap((t) => [t.className, `theme-${t.id}`]);
    allThemeClasses.forEach((c) => root.classList.remove(c));
    root.classList.add(config.className, `theme-${config.id}`);
    root.style.setProperty('--bg-base', config.previewColors.bg);
    root.style.setProperty('--card-bg', config.previewColors.surface);
    root.style.setProperty('--border-color', config.primaryColor + '33');
    root.style.setProperty('--primary-accent', config.primaryColor);
    root.style.setProperty('--secondary-accent', config.secondaryColor);
    root.style.setProperty('--text-color', config.previewColors.text);
    root.style.setProperty('--muted-text', config.isDark ? '#94a3b8' : '#64748b');
    root.style.colorScheme = config.isDark ? 'dark' : 'light';
    root.classList.toggle('dark', config.isDark);
  }, [theme]);

  useEffect(() => {
    const onAuthStorage = () => setThemeState(savedThemeForUser());
    window.addEventListener('storage', onAuthStorage);
    window.addEventListener('careerpath:auth-changed', onAuthStorage);
    return () => {
      window.removeEventListener('storage', onAuthStorage);
      window.removeEventListener('careerpath:auth-changed', onAuthStorage);
    };
  }, []);

  const themeConfig = THEMES[theme] || THEMES[DEFAULT_THEME];
  return <ThemeContext.Provider value={{ theme, themeConfig, setTheme, isDark: themeConfig.isDark }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
