import React, { useState } from 'react';
import { UserAccount, TabType } from '../types';
import { IntelliPathLogo } from './IntelliPathLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onLogin: (updatedUser: Partial<UserAccount>, isSignup?: boolean) => void;
  onLogout: () => void;
  onNavigate?: (tab: TabType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [fscStream, setFscStream] = useState<'ICS' | 'Pre-Engineering' | 'Pre-Medical' | 'Arts'>('ICS');
  const [lastMarks, setLastMarks] = useState('980 / 1100 (89%)');
  const [preferredField, setPreferredField] = useState('Computer Science & Software Engineering');
  const [interestedInUni, setInterestedInUni] = useState<boolean>(true);
  const [signupStep, setSignupStep] = useState<number>(1); // Step 1: Info, Step 2: Diagnostic Screening Quiz
  const [diagAnswers, setDiagAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  if (!isOpen) return null;

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (authMode === 'signup' && signupStep === 1) {
      setSignupStep(2); // Advance to diagnostic screening test
      return;
    }

    setLoadingProvider('email');
    setTimeout(() => {
      // Calculate eligibility score based on stream and test answers
      let elScore = 85;
      if (fscStream === 'ICS' || fscStream === 'Pre-Engineering') elScore += 10;
      if (diagAnswers.q1 === 'b') elScore += 5;

      onLogin({
        isLoggedIn: true,
        name: fullName || email.split('@')[0] || 'Career Architect',
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        provider: 'email',
        role: `${fscStream} Candidate`,
        joinedDate: 'July 2026',
        interestedInUni: interestedInUni,
        preferredField: preferredField,
        fscStream: fscStream,
        lastMarks: lastMarks,
        eligibilityScore: elScore,
        eligibilityStatus: elScore >= 80 ? 'Direct Eligible' : 'Recommended Foundation Month',
      }, authMode === 'signup');
      setLoadingProvider(null);
      onClose();

      if (onNavigate) {
        if (!interestedInUni) {
          onNavigate('courses');
        } else {
          onNavigate('universities');
        }
      }
    }, 800);
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
    setLoadingProvider(provider);
    setTimeout(() => {
      let defaultName = fullName || 'Alex Rivera';
      let defaultEmail = 'alex.rivera@gmail.com';
      let avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgNlfeL9UOJHLhld-PE4nGnyW6Rl4iJLHvRhfHIUVp52XKmmHbrbf-VJ8ugwfp8137aYTEah5-7jGv7a12fRc3TckweGIcUrovL7q3Dhdi8BaR9cMnEySvV9EUHDUkTceEkGAnJdfKpZljhEvs7cs3RjYJjP839LAzkOCCvZ0Jys15Uy3xcWT1_UwA0KCjmY3pRzst3eS2Fsnerau_zF6VA1PIdAGElSnJMVXOBCxtw7KEYGvxInM';

      if (provider === 'google') {
        defaultName = fullName || 'Alex Rivera (Google)';
        defaultEmail = 'alex.rivera.google@gmail.com';
      } else if (provider === 'apple') {
        defaultName = fullName || 'Alex Rivera (Apple)';
        defaultEmail = 'alex.rivera.icloud.com';
      } else if (provider === 'facebook') {
        defaultName = fullName || 'Alex Rivera (Facebook)';
        defaultEmail = 'alex.rivera.fb@facebook.com';
      }

      onLogin({
        isLoggedIn: true,
        name: defaultName,
        email: defaultEmail,
        avatar: avatar,
        provider: provider,
        role: `${fscStream} Candidate`,
        joinedDate: 'July 2026',
        interestedInUni: interestedInUni,
        preferredField: preferredField,
        fscStream: fscStream,
        lastMarks: lastMarks,
        eligibilityScore: 92,
        eligibilityStatus: 'Direct Eligible',
      });
      setLoadingProvider(null);
      onClose();

      if (onNavigate) {
        if (!interestedInUni) {
          onNavigate('courses');
        } else {
          onNavigate('universities');
        }
      }
    }, 700);
  };

  const handleSaveEditedName = () => {
    if (editedName.trim()) {
      onLogin({ name: editedName.trim() });
      setIsEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-lg w-full rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2 font-mono text-indigo-400">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="text-xs font-bold tracking-widest uppercase">
              {user.isLoggedIn ? "Account Profile" : "Authentication"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {user.isLoggedIn ? (
          /* LOGGED IN VIEW - ACCOUNT DETAILS */
          <div className="space-y-6 relative z-10">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-3xl object-cover border-2 border-indigo-500/40 shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-md">
                  <span className="material-symbols-outlined text-xs font-bold">check</span>
                </div>
              </div>

              {isEditingName ? (
                <div className="flex items-center justify-center gap-2 my-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 border border-indigo-500/50 text-white text-center font-bold text-lg focus:outline-hidden"
                  />
                  <button
                    onClick={handleSaveEditedName}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-xs"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {user.name}
                  </h3>
                  <button
                    onClick={() => {
                      setEditedName(user.name);
                      setIsEditingName(true);
                    }}
                    className="text-white/40 hover:text-indigo-400 transition-colors"
                    title="Edit Name"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                </div>
              )}

              <p className="text-sm font-mono text-indigo-300 mt-0.5">{user.email}</p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs mt-3">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>{user.role || 'Verified Architect Member'}</span>
              </div>
            </div>

            {/* Provider Badge Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white/50">Login Provider:</span>
                <span className="font-bold text-white capitalize flex items-center gap-1.5">
                  {user.provider === 'google' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  )}
                  {user.provider === 'apple' && (
                    <span className="material-symbols-outlined text-sm">apple</span>
                  )}
                  {user.provider === 'facebook' && (
                    <span className="text-blue-500 font-bold">f</span>
                  )}
                  {user.provider === 'email' && (
                    <span className="material-symbols-outlined text-sm">mail</span>
                  )}
                  <span>{user.provider || 'Email'}</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white/50">Status:</span>
                <span className="font-bold text-emerald-400">● Active Session</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-white/50">Member Since:</span>
                <span className="font-bold text-white">{user.joinedDate || 'July 2026'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('admin');
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-bold font-mono text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">shield_person</span>
                <span>Launch Admin Control Center (All Access)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <span>Continue to Dashboard</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>

              <button
                onClick={onLogout}
                className="w-full py-2.5 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 text-rose-300 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                <span>Log Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOGGED OUT VIEW - LOGIN / REGISTER FORM */
          <div className="space-y-6 relative z-10">
            <div className="flex justify-center mb-2">
              <IntelliPathLogo size="lg" variant="stacked" showTagline={true} />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                {authMode === 'signin' ? "Welcome Back" : "Create Your Account"}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Access your personalized career roadmap & AI coaching
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  authMode === 'signin'
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  authMode === 'signup'
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {authMode === 'signup' ? (
                signupStep === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Username / Name</label>
                        <input
                          type="text"
                          placeholder="Alex Rivera"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Last Exam Marks</label>
                        <input
                          type="text"
                          placeholder="e.g. 980 / 1100 (89%)"
                          value={lastMarks}
                          onChange={(e) => setLastMarks(e.target.value)}
                          required
                          className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* FSC Subject Stream Selection */}
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">
                        🎓 FSC / High School Background Subject
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'ICS', label: 'ICS (Computer Science)', icon: 'terminal' },
                          { id: 'Pre-Engineering', label: 'Pre-Engineering (Math)', icon: 'functions' },
                          { id: 'Pre-Medical', label: 'Pre-Medical (Biology)', icon: 'biomedical' },
                          { id: 'Arts', label: 'Arts & Humanities', icon: 'palette' },
                        ].map((stream) => (
                          <button
                            key={stream.id}
                            type="button"
                            onClick={() => setFscStream(stream.id as any)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                              fscStream === stream.id
                                ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            <span className="material-symbols-outlined text-base">{stream.icon}</span>
                            <span className="truncate">{stream.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Target Field of Interest</label>
                      <select
                        value={preferredField}
                        onChange={(e) => setPreferredField(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-indigo-500 transition-all"
                      >
                        <option value="Computer Science & Software Engineering">Computer Science & Software Engineering</option>
                        <option value="Data Science & AI">Data Science & Artificial Intelligence</option>
                        <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                        <option value="Cyber Security">Cyber Security & Ethical Hacking</option>
                        <option value="UX & Product Design">UX/UI & Product Design</option>
                      </select>
                    </div>

                    {/* University vs Skills Option */}
                    <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                      <label className="block text-xs font-mono font-bold text-indigo-300">
                        Primary Learning Goal:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setInterestedInUni(true)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                            interestedInUni
                              ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                              : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">school</span>
                          <span>University Degree</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInterestedInUni(false)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                            !interestedInUni
                              ? "bg-purple-600 text-white border-purple-400 shadow-md"
                              : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">auto_stories</span>
                          <span>Skill Bootcamps</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="alex.rivera@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Next: Diagnostic Aptitude Screening</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </>
                ) : (
                  /* Step 2: Diagnostic Eligibility Screening Quiz */
                  <div className="space-y-4">
                    <div className="p-3 rounded-2xl bg-purple-950/50 border border-purple-500/40 text-xs text-purple-200">
                      <p className="font-bold font-mono text-purple-300">
                        ⚡ Quick Eligibility Screening for {fscStream} Candidate
                      </p>
                      <p className="text-[11px] text-white/70 mt-0.5">
                        Answer 3 quick logic questions to determine if you qualify for direct specialization or need a 1-month foundation track!
                      </p>
                    </div>

                    {/* Question 1 */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-indigo-300">
                        Q1. If A &gt; B and B &gt; C, what is the relation between A and C?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'a', label: 'A < C' },
                          { id: 'b', label: 'A > C (Correct)' },
                          { id: 'c', label: 'A = C' },
                          { id: 'd', label: 'Cannot determine' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDiagAnswers({ ...diagAnswers, q1: opt.id })}
                            className={`p-2 rounded-xl border text-xs text-left transition-all ${
                              diagAnswers.q1 === opt.id
                                ? "bg-indigo-600 border-indigo-400 text-white font-bold"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-indigo-300">
                        Q2. How do you approach learning a new technical concept?
                      </label>
                      <div className="space-y-1.5">
                        {[
                          { id: 'p1', label: 'Build hands-on code projects immediately' },
                          { id: 'p2', label: 'Read documentation & textbooks systematically' },
                          { id: 'p3', label: 'Follow video tutorials step-by-step' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDiagAnswers({ ...diagAnswers, q2: opt.id })}
                            className={`w-full p-2 rounded-xl border text-xs text-left transition-all ${
                              diagAnswers.q2 === opt.id
                                ? "bg-indigo-600 border-indigo-400 text-white font-bold"
                                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(1)}
                        className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs transition-all"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={loadingProvider !== null}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                      >
                        {loadingProvider === 'email' ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Complete Registration & Launch Path</span>
                            <span className="material-symbols-outlined text-base">rocket_launch</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* Sign In Mode */
                <>
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="alex.rivera@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-mono text-white/70">Password</label>
                      <button type="button" className="text-[11px] font-mono text-indigo-400 hover:underline">
                        Forgot?
                      </button>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loadingProvider !== null}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mt-2"
                  >
                    {loadingProvider === 'email' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In with Email</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="shrink-0 mx-3 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                Or Continue With
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Social Logins */}
            <div className="space-y-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={loadingProvider !== null}
                className="w-full py-3 px-4 glass-card border border-white/15 hover:bg-white/10 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-3 transition-all hover:border-indigo-500/40"
              >
                {loadingProvider === 'google' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={loadingProvider !== null}
                className="w-full py-3 px-4 bg-white text-black hover:bg-slate-100 rounded-xl font-medium text-sm flex items-center justify-center gap-3 transition-all shadow-md"
              >
                {loadingProvider === 'apple' ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-1 2.97 1.08.08 2.16-.57 2.81-1.37z" />
                    </svg>
                    <span>Continue with Apple</span>
                  </>
                )}
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={loadingProvider !== null}
                className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-3 transition-all shadow-md"
              >
                {loadingProvider === 'facebook' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Continue with Facebook</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
