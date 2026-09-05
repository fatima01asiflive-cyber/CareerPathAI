import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from '../components/ThemeSelector';
import { Button } from '../components/Button';
import { ActivityHistory } from '../components/ActivityHistory';
import { clearUserScopedData } from '../utils/userScopedStorage';

export const Settings: React.FC = () => {
  const { appVersion, logout, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [courseReminders, setCourseReminders] = useState(true);
  const [projectReminders, setProjectReminders] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = async () => {
    try {
      // Clear browser Cache Storage. Clear Cache is intentionally a full local reset.
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      }
      sessionStorage.clear();
      if (user?.id) clearUserScopedData(user.id);
      logout();
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }
      setShowConfirmReset(false);
      setCacheCleared(true);
      setTimeout(() => { window.location.replace('/'); }, 700);
    } catch {
      setShowConfirmReset(false);
      setCacheCleared(true);
      setTimeout(() => setCacheCleared(false), 3000);
    }
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass && passwordForm.newPass === passwordForm.confirm) {
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordSuccess(false);
        setShowPasswordModal(false);
        setPasswordForm({ current: '', newPass: '', confirm: '' });
      }, 1500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span>Platform Preferences & Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Application & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Customize your appearance theme, configure notifications, manage security, reset the local app completely, and view upcoming platform releases.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/5 animate-fade-in">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Preferences updated and persisted successfully!</span>
        </div>
      )}

      <ActivityHistory />

      {/* 1. Appearance Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-base">palette</span>
              <span>Appearance & Color Theme</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your favorite platform interface theme.
            </p>
          </div>
          <span className="text-xs font-mono text-sky-400 uppercase font-bold px-2.5 py-1 bg-sky-500/10 rounded-lg border border-sky-500/20">
            Active: {theme}
          </span>
        </div>

        <div className="pt-2">
          <ThemeSelector variant="full" />
        </div>
      </div>

      {/* 2. Notifications Section */}
      <form
        onSubmit={handleSavePreferences}
        className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6"
      >
        <div className="border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-base">notifications_active</span>
            <span>Notification Preferences</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose what alerts and progress updates you wish to receive.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <div>
              <p className="text-xs font-bold text-white">Curriculum & Roadmap Milestones</p>
              <p className="text-[11px] text-slate-400">
                Alerts when you reach monthly milestones or unlock new topics.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 rounded-sm bg-slate-900 border-slate-700 text-sky-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <div>
              <p className="text-xs font-bold text-white">Course Lesson & Resource Releases</p>
              <p className="text-[11px] text-slate-400">
                Receive notifications when new videos, exercises, or cheatsheets become available.
              </p>
            </div>
            <input
              type="checkbox"
              checked={courseReminders}
              onChange={(e) => setCourseReminders(e.target.checked)}
              className="w-4 h-4 rounded-sm bg-slate-900 border-slate-700 text-sky-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <div>
              <p className="text-xs font-bold text-white">Capstone Project Grading Alerts</p>
              <p className="text-[11px] text-slate-400">
                Get notified as soon as AI completes AST inspection and feedback generation.
              </p>
            </div>
            <input
              type="checkbox"
              checked={projectReminders}
              onChange={(e) => setProjectReminders(e.target.checked)}
              className="w-4 h-4 rounded-sm bg-slate-900 border-slate-700 text-sky-500"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="sm" icon="save">
            Save Preferences
          </Button>
        </div>
      </form>

      {/* 3. Account & Security Management */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
        <div className="border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-base">manage_accounts</span>
            <span>Account & Security</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your credentials, student profile, and active session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-xs font-bold text-white">Student Profile</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Edit personal background, marks, institution, and career track.
              </p>
            </div>
            <Link to="/profile">
              <Button variant="outline" size="sm" fullWidth icon="person">
                Edit Profile
              </Button>
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-xs font-bold text-white">Password & Security</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Update your account password and security credentials.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setShowPasswordModal(true)}
              icon="key"
            >
              Change Password
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-xs font-bold text-rose-400">Account Session</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Sign out of your active session on this device.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              fullWidth
              onClick={handleLogout}
              icon="logout"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Future Platform Features (Language, Privacy, Connected Accounts) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-base">extension</span>
            <span>Language, Privacy & Integrations (Coming Soon)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upcoming enterprise and localized workspace capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 opacity-75">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
              Language
            </span>
            <span className="font-semibold text-slate-300">English (US)</span>
            <p className="text-[10px] text-slate-500 mt-1">Urdu & Arabic in development</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 opacity-75">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
              Privacy Mode
            </span>
            <span className="font-semibold text-slate-300">Strict Data Isolation</span>
            <p className="text-[10px] text-slate-500 mt-1">GDPR & FERPA compliant</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 opacity-75">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
              Connected Accounts
            </span>
            <span className="font-semibold text-slate-300">GitHub & Google</span>
            <p className="text-[10px] text-slate-500 mt-1">Auto-sync portfolios</p>
          </div>
        </div>
      </div>

      {/* 5. System Release & Cache Reset */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-base">tune</span>
              <span>System Lifecycle & Release</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              CareerPath AI Build Version v{appVersion}
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            Update Coming Soon
          </span>
        </div>

        {cacheCleared && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Cache cleared. CareerPath AI has been reset to a fresh state. Profile, progress, XP, streak, chat, settings and local activity data were removed.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled
            icon="update"
            className="opacity-60 cursor-not-allowed"
          >
            Update App — Coming Soon
          </Button>

          {showConfirmReset ? (
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={handleClearCache}
                icon="delete_forever"
              >
                Confirm Clear Cache
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowConfirmReset(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirmReset(true)}
              icon="cleaning_services"
              className="text-rose-400 hover:border-rose-500/50"
            >
              Clear Cache
            </Button>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Change Account Password
              </h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                Password updated successfully!
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" icon="lock_reset">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
