export interface AppTheme {
  id: string;
  name: string;
  category: 'dark' | 'light' | 'high-contrast';
  description: string;
  isDark: boolean;
  previewColors: {
    bg: string;
    surface: string;
    primary: string;
    accent: string;
    text: string;
  };
  className: string;
  icon: string;
  accentGradient: string;
  primaryColor: string;
  secondaryColor: string;
  glowRgba: string;
}

export const APP_THEMES: AppTheme[] = [
  {
    id: 'emerald-cyber',
    name: 'Emerald Matrix',
    category: 'dark',
    description: 'Cyberpunk emerald & neon teal on deep obsidian slate. High focus and clarity.',
    isDark: true,
    previewColors: {
      bg: '#060a0f',
      surface: '#0d1520',
      primary: '#10b981',
      accent: '#06b6d4',
      text: '#f8fafc',
    },
    className: 'theme-emerald',
    icon: 'terminal',
    accentGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    glowRgba: 'rgba(16, 185, 129, 0.2)',
  },
  {
    id: 'midnight-indigo',
    name: 'Midnight Nebula',
    category: 'dark',
    description: 'Deep royal navy blue with electric indigo & violet accents. Refined and aesthetic.',
    isDark: true,
    previewColors: {
      bg: '#080c1e',
      surface: '#0f1738',
      primary: '#6366f1',
      accent: '#8b5cf6',
      text: '#f8fafc',
    },
    className: 'theme-midnight',
    icon: 'nights_stay',
    accentGradient: 'from-indigo-500 via-purple-400 to-pink-400',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    glowRgba: 'rgba(99, 102, 241, 0.2)',
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    category: 'dark',
    description: 'Vibrant hot fuchsia, violet, and electric cyan over pitch violet. High-energy coding vibe.',
    isDark: true,
    previewColors: {
      bg: '#0e0618',
      surface: '#1a0d2d',
      primary: '#d946ef',
      accent: '#06b6d4',
      text: '#f8fafc',
    },
    className: 'theme-cyberpunk',
    icon: 'bolt',
    accentGradient: 'from-fuchsia-500 via-purple-400 to-cyan-400',
    primaryColor: '#d946ef',
    secondaryColor: '#06b6d4',
    glowRgba: 'rgba(217, 70, 239, 0.2)',
  },
  {
    id: 'crimson-ruby',
    name: 'Crimson Titan',
    category: 'dark',
    description: 'Aggressive ruby red & neon rose over charcoal obsidian. Bold and commanding.',
    isDark: true,
    previewColors: {
      bg: '#0f0607',
      surface: '#1c0c0e',
      primary: '#f43f5e',
      accent: '#fb7185',
      text: '#fff1f2',
    },
    className: 'theme-crimson',
    icon: 'local_fire_department',
    accentGradient: 'from-rose-500 via-red-400 to-amber-400',
    primaryColor: '#f43f5e',
    secondaryColor: '#fb7185',
    glowRgba: 'rgba(244, 63, 94, 0.2)',
  },
  {
    id: 'solar-amber',
    name: 'Solar Amber',
    category: 'dark',
    description: 'Warm gold, deep amber, and sunset orange. Calibrated for late-night study sessions.',
    isDark: true,
    previewColors: {
      bg: '#0d0904',
      surface: '#1c1308',
      primary: '#f59e0b',
      accent: '#fbbf24',
      text: '#fffbeb',
    },
    className: 'theme-amber',
    icon: 'wb_sunny',
    accentGradient: 'from-amber-400 via-orange-400 to-yellow-300',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    glowRgba: 'rgba(245, 158, 11, 0.2)',
  },
  {
    id: 'nordic-glacier',
    name: 'Nordic Glacier',
    category: 'dark',
    description: 'Cool glacial cyan, frosty arctic blue, and steel slate. Crisp and calming.',
    isDark: true,
    previewColors: {
      bg: '#080f14',
      surface: '#0f1f2a',
      primary: '#0ea5e9',
      accent: '#38bdf8',
      text: '#f0f9ff',
    },
    className: 'theme-glacier',
    icon: 'ac_unit',
    accentGradient: 'from-sky-400 via-cyan-300 to-teal-300',
    primaryColor: '#0ea5e9',
    secondaryColor: '#38bdf8',
    glowRgba: 'rgba(14, 165, 233, 0.2)',
  },
  {
    id: 'clean-porcelain',
    name: 'Clean Porcelain',
    category: 'light',
    description: 'Ultra-clean modern light mode with royal sapphire and indigo accents.',
    isDark: false,
    previewColors: {
      bg: '#f8fafc',
      surface: '#ffffff',
      primary: '#4f46e5',
      accent: '#0ea5e9',
      text: '#0f172a',
    },
    className: 'theme-porcelain',
    icon: 'light_mode',
    accentGradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    primaryColor: '#4f46e5',
    secondaryColor: '#0ea5e9',
    glowRgba: 'rgba(79, 70, 229, 0.12)',
  },
  {
    id: 'warm-sandstone',
    name: 'Warm Sandstone',
    category: 'light',
    description: 'Editorial ivory parchment with warm terracotta and espresso typography.',
    isDark: false,
    previewColors: {
      bg: '#faf8f5',
      surface: '#ffffff',
      primary: '#c2410c',
      accent: '#d97706',
      text: '#292524',
    },
    className: 'theme-sandstone',
    icon: 'menu_book',
    accentGradient: 'from-orange-600 via-amber-600 to-yellow-600',
    primaryColor: '#c2410c',
    secondaryColor: '#d97706',
    glowRgba: 'rgba(194, 65, 12, 0.12)',
  },
  {
    id: 'high-contrast',
    name: 'OLED High Contrast',
    category: 'high-contrast',
    description: 'Pure pitch black #000000 with razor-sharp neon green borders and maximum readability.',
    isDark: true,
    previewColors: {
      bg: '#000000',
      surface: '#050505',
      primary: '#22c55e',
      accent: '#ffffff',
      text: '#ffffff',
    },
    className: 'theme-contrast',
    icon: 'contrast',
    accentGradient: 'from-green-400 to-emerald-300',
    primaryColor: '#22c55e',
    secondaryColor: '#ffffff',
    glowRgba: 'rgba(34, 197, 94, 0.25)',
  },
];
