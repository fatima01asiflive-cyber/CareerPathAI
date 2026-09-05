import React from 'react';
import { IntelliPathLogo } from './IntelliPathLogo';
import { TabType, UserAccount } from '../types';

interface IntelliPathLandingHeroProps {
  onGetStarted: () => void;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  user?: UserAccount;
}

export const IntelliPathLandingHero: React.FC<IntelliPathLandingHeroProps> = ({
  onGetStarted,
  onNavigate,
  isDarkMode,
  user,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Educational Background',
      desc: 'Enter your qualification (Matric, FSC, ICS, A/O Levels, BS), board marks & percentage.',
      icon: 'school',
      tab: 'academic' as TabType,
    },
    {
      step: '02',
      title: 'Define Future Interests',
      desc: 'Select from AI, Software Dev, Cyber Security, Robotics, UI/UX, Finance & more.',
      icon: 'target',
      tab: 'interests' as TabType,
    },
    {
      step: '03',
      title: 'Skill Self-Rating & Gap Analysis',
      desc: 'Rate technical programming, communication, English, and problem solving levels.',
      icon: 'checklist',
      tab: 'skill-gap' as TabType,
    },
    {
      step: '04',
      title: 'AI Mock Aptitude & Eligibility Test',
      desc: 'Attempt adaptive field test. Score determines direct roadmap or foundation bridge.',
      icon: 'verified',
      tab: 'eligibility-test' as TabType,
    },
    {
      step: '05',
      title: 'Roadmap & Capstones',
      desc: 'Monthly milestones, curated free resources, and real-world capstone assignments.',
      icon: 'alt_route',
      tab: 'roadmap' as TabType,
    },
    {
      step: '06',
      title: 'FAANG AI Mock Interviews',
      desc: 'Practice voice & text technical interviews with Google/Meta AI persona interviewers.',
      icon: 'record_voice_over',
      tab: 'prep' as TabType,
    },
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-10 border border-white/10 glass-card">
      {/* Immersive background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col items-center text-center">
        {/* Central Logo Display */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <IntelliPathLogo size="xl" variant="stacked" showTagline={false} />
        </div>

        {/* Brand Motto Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-sky-400 mb-4 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>INTELLIPATH AI • CAREER & EDUCATION PLATFORM</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          “Discover your strengths, explore your interests, and{' '}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            build your personalized path to the future.”
          </span>
        </h1>

        <p className="mt-3 text-sm md:text-base font-medium font-mono text-sky-300/90 tracking-wide">
          “Discover Your Future, Build Your Path”
        </p>

        <p className={`mt-3 text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
          A complete intelligent career guidance ecosystem: <span className="text-sky-300 font-semibold">Who am I?</span> → <span className="text-emerald-300 font-semibold">Which career fits me?</span> → <span className="text-indigo-300 font-semibold">What skills am I missing?</span> → <span className="text-amber-300 font-semibold">Personalized Roadmap & University Matching</span>
        </p>

        {/* 6-Step Journey Cards Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-10 text-left">
          {steps.map((s) => (
            <div
              key={s.step}
              onClick={() => onNavigate(s.tab)}
              className="p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400">{s.step}</span>
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-lg">{s.icon}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-sky-400/80 group-hover:text-sky-300 pt-2 border-t border-white/5">
                <span>Explore Step</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Row with Bottom-Right Highlighted "Get Started" Button */}
        <div className="w-full mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-white">
                {user?.isLoggedIn ? `Welcome, ${user.name}` : 'MERN Stack + Python AI Architecture'}
              </p>
              <p className="text-[11px] text-white/60">
                {user?.isLoggedIn
                  ? `Active Profile • Eligibility Score: ${user.eligibilityScore || 85}%`
                  : 'Start your personalized 6-step AI career diagnostic'}
              </p>
            </div>
          </div>

          {/* Bottom Right Corner "Get Started" Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-3 rounded-2xl border border-white/15 hover:bg-white/10 text-white text-xs font-mono font-semibold transition-all"
            >
              View Dashboard
            </button>

            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-sky-500/30 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
