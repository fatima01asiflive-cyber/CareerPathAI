import React, { useState } from 'react';
import { AcademicData, TabType, UserAccount } from '../types';
import { GitHubContributionCalendar } from './GitHubContributionCalendar';

interface UserProfileViewProps {
  academicData: AcademicData;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  user: UserAccount;
  onOpenAuth: () => void;
  onUpdateAvatar?: (newAvatarUrl: string) => void;
  onOpenThemeModal?: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  academicData,
  onNavigate,
  isDarkMode,
  user,
  onOpenAuth,
  onUpdateAvatar,
  onOpenThemeModal,
}) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(user.avatar);

  // Preset Default Profile Avatars for All Users
  const defaultAvatars = [
    {
      id: 'google-dev',
      label: 'Google AI Engineer',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'meta-lead',
      label: 'Meta Tech Lead',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'amazon-aws',
      label: 'AWS Cloud Architect',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'cyberpunk-dev',
      label: 'Cyberpunk Coder',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'female-dev',
      label: 'Minimalist Female Dev',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'male-dev',
      label: 'Minimalist Male Dev',
      url: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'gradient-avatar',
      label: 'Quantum Developer',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 'hacker-cat',
      label: 'Cyber AI Hacker',
      url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300',
    },
  ];

  const handleSelectPreset = (url: string) => {
    setSelectedPreset(url);
    if (onUpdateAvatar) {
      onUpdateAvatar(url);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedPreset(reader.result);
          if (onUpdateAvatar) {
            onUpdateAvatar(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customAvatarUrl.trim()) {
      setSelectedPreset(customAvatarUrl.trim());
      if (onUpdateAvatar) {
        onUpdateAvatar(customAvatarUrl.trim());
      }
      setCustomAvatarUrl('');
      setShowAvatarModal(false);
    }
  };

  return (
    <div className={`p-4 md:p-8 max-w-4xl mx-auto pb-24 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      {/* Profile Header */}
      <div className={`p-6 md:p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6 shadow-xl glass-card border border-white/10 ${
        isDarkMode ? "bg-black/50" : "bg-white/90"
      }`}>
        <div className="relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-500/40 shadow-xl group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono font-bold">
            <span className="material-symbols-outlined text-xl">photo_camera</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-xs">edit</span>
          </div>
        </div>

        <div className="text-center md:text-left flex-1 space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {user.name}
            </h2>
            {user.isAdmin ? (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-mono font-extrabold w-fit mx-auto md:mx-0 shadow-lg shadow-amber-500/25 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">shield_person</span>
                <span>Super Administrator</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-mono font-bold w-fit mx-auto md:mx-0 shadow-md">
                Level 18 Candidate
              </span>
            )}
          </div>
          <p className="text-sm font-mono text-indigo-300">
            {user.email}
          </p>
          <p className="text-xs text-white/60">
            {user.isAdmin
              ? 'Root Superuser • Omniscient Access to All 25 Modules & System Controls'
              : `${academicData.degree || 'B.Tech Computer Science'} • Target: Senior Cloud Architect`}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          {user.isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold rounded-2xl text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>Open Admin Center</span>
            </button>
          )}

          <button
            onClick={() => setShowAvatarModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            <span>Change Profile DP</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="px-5 py-2.5 glass-card border border-white/15 hover:bg-white/10 rounded-2xl text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">manage_accounts</span>
            <span>Account Settings</span>
          </button>
        </div>
      </div>

      {/* GitHub-Style Contribution Calendar Section */}
      <div className="mb-8">
        <GitHubContributionCalendar isDarkMode={isDarkMode} />
      </div>

      {/* Connected Authentication Provider Banner */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 mb-8 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-bold text-lg text-white">Security & Login Provider</h3>
            <p className="text-xs text-white/60">Manage your connected social accounts and email logins</p>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-300 text-xs font-mono font-bold transition-all"
          >
            {user.isLoggedIn ? "Manage Account" : "Sign In"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Email Status */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            user.provider === 'email' ? "bg-indigo-600/20 border-indigo-500 text-white" : "bg-white/5 border-white/10 opacity-60 text-white/60"
          }`}>
            <span className="material-symbols-outlined text-indigo-400">mail</span>
            <div className="overflow-hidden">
              <p className="text-xs font-bold font-mono">Email Account</p>
              <p className="text-[10px] text-white/50">{user.provider === 'email' ? 'Active Login' : 'Supported'}</p>
            </div>
          </div>

          {/* Google Status */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            user.provider === 'google' ? "bg-indigo-600/20 border-indigo-500 text-white" : "bg-white/5 border-white/10 opacity-60 text-white/60"
          }`}>
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <div className="overflow-hidden">
              <p className="text-xs font-bold font-mono">Google</p>
              <p className="text-[10px] text-white/50">{user.provider === 'google' ? 'Active Login' : 'Supported'}</p>
            </div>
          </div>

          {/* Apple Status */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            user.provider === 'apple' ? "bg-indigo-600/20 border-indigo-500 text-white" : "bg-white/5 border-white/10 opacity-60 text-white/60"
          }`}>
            <span className="material-symbols-outlined text-white">apple</span>
            <div className="overflow-hidden">
              <p className="text-xs font-bold font-mono">Apple ID</p>
              <p className="text-[10px] text-white/50">{user.provider === 'apple' ? 'Active Login' : 'Supported'}</p>
            </div>
          </div>

          {/* Facebook Status */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            user.provider === 'facebook' ? "bg-indigo-600/20 border-indigo-500 text-white" : "bg-white/5 border-white/10 opacity-60 text-white/60"
          }`}>
            <span className="text-blue-500 font-bold text-lg">f</span>
            <div className="overflow-hidden">
              <p className="text-xs font-bold font-mono">Facebook</p>
              <p className="text-[10px] text-white/50">{user.provider === 'facebook' ? 'Active Login' : 'Supported'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Superuser Omniscient Privileges Matrix */}
      {user.isAdmin && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-amber-950/15 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Administrator Superuser Permissions</h3>
                <p className="text-xs text-amber-300/80 font-mono">Admin is a verified user with omniscient access to all things</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-mono font-bold shadow-md shadow-amber-500/25 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Launch Admin Hub</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-amber-400 font-bold block">✓ All 25 Modules</span>
              <p className="text-[11px] text-white/60">Unrestricted access without prerequisites</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-amber-400 font-bold block">✓ Student Roster</span>
              <p className="text-[11px] text-white/60">Inspect, edit, and impersonate any account</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-amber-400 font-bold block">✓ Push Broadcasts</span>
              <p className="text-[11px] text-white/60">Dispatch real-time banners & audible alarms</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
              <span className="text-amber-400 font-bold block">✓ God-Mode Overrides</span>
              <p className="text-[11px] text-white/60">1-click unlock all roadmaps & capstones</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-3xl glass-card border border-white/10 text-center">
          <span className="material-symbols-filled text-3xl text-indigo-400 mb-2 block">
            school
          </span>
          <p className="text-xs text-white/50 uppercase font-bold font-mono">CURRENT CGPA</p>
          <p className="text-2xl font-bold text-white mt-1 font-mono">
            {academicData.cgpa || "8.5"} / 10.0
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10 text-center">
          <span className="material-symbols-filled text-3xl text-indigo-400 mb-2 block">
            workspace_premium
          </span>
          <p className="text-xs text-white/50 uppercase font-bold font-mono">VERIFIED BADGES</p>
          <p className="text-2xl font-bold text-white mt-1 font-mono">
            3 Certifications
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10 text-center">
          <span className="material-symbols-filled text-3xl text-emerald-400 mb-2 block">
            analytics
          </span>
          <p className="text-xs text-white/50 uppercase font-bold font-mono">AGGREGATE MARKS</p>
          <p className="text-2xl font-bold text-white mt-1 font-mono">
            {academicData.aggregateMarks || "85"}%
          </p>
        </div>
      </div>

      {/* Active Enrolled Path */}
      <div className="p-6 rounded-3xl glass-card border border-white/10">
        <h3 className="font-bold text-lg text-white mb-4">
          Enrolled Career Specialization
        </h3>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
              <span className="material-symbols-outlined text-2xl">alt_route</span>
            </div>
            <div>
              <p className="font-bold text-sm text-white">Senior Cloud Architect & Full Stack Path</p>
              <p className="text-xs text-white/60">Includes 4 Core Modules & 1 Capstone Project</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all shrink-0"
          >
            View Path
          </button>
        </div>
      </div>

      {/* Theme & Visual Appearance Setting */}
      {onOpenThemeModal && (
        <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 bg-emerald-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">palette</span>
            </div>
            <div>
              <p className="font-bold text-sm text-white">Visual Workspace Theme Studio</p>
              <p className="text-xs text-white/60">
                Choose from 9 curated dark, light, and high-contrast color palettes
              </p>
            </div>
          </div>
          <button
            onClick={onOpenThemeModal}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold shadow-md shadow-emerald-600/25 transition-all shrink-0 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Customize Theme</span>
          </button>
        </div>
      )}

      {/* Change Avatar / Profile Photo Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="max-w-lg w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl glass-card text-white space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-extrabold gradient-text">
                  Change Profile Photo (DP)
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Select a default tech avatar or upload your custom image
                </p>
              </div>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-1 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Default DP Presets Grid */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider block">
                Default Tech Avatars for All Users:
              </label>
              <div className="grid grid-cols-4 gap-3">
                {defaultAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => handleSelectPreset(avatar.url)}
                    className={`relative p-1 rounded-2xl border transition-all hover:scale-105 group overflow-hidden ${
                      selectedPreset === avatar.url
                        ? 'border-indigo-500 bg-indigo-600/30 ring-2 ring-indigo-500'
                        : 'border-white/10 hover:border-white/30 bg-white/5'
                    }`}
                  >
                    <img
                      src={avatar.url}
                      alt={avatar.label}
                      className="w-full h-16 rounded-xl object-cover"
                    />
                    <span className="text-[9px] font-mono block text-center truncate mt-1 text-white/70 group-hover:text-white">
                      {avatar.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Image Upload & URL */}
            <div className="space-y-4 border-t border-white/10 pt-4">
              <div>
                <label className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider block mb-2">
                  Upload Custom Photo from File:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-white/60 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                  Or Direct Image URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-indigo-500"
                  />
                  <button
                    onClick={handleApplyCustomUrl}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    Apply URL
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAvatarModal(false)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              Done & Save DP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
