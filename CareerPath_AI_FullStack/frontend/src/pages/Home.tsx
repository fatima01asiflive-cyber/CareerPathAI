import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IntelliPathLogo } from '../components/IntelliPathLogo';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { TypewriterMotto } from '../components/TypewriterMotto';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center p-4 sm:p-6 lg:p-12 overflow-hidden select-none bg-slate-950">
      {/* Background Radial Atmosphere */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Banner Tagline */}
      <div className="w-full flex justify-center pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="font-medium text-slate-300">Intelligent Career Discovery & Learning Roadmap</span>
        </div>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6 sm:space-y-8 animate-fade-in">
        {/* Centered CareerPath AI Brand Identity */}
        <div className="flex flex-col items-center">
          <div className="transition-transform duration-300 hover:scale-105">
            <IntelliPathLogo size="2xl" variant="stacked" showTagline={true} />
          </div>
        </div>

        {/* Required User Prompt Core Quotation */}
        <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl">
          &ldquo;Discover your strengths, explore your interests, and find the right path for your future.&rdquo;
        </blockquote>

        <TypewriterMotto />
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          AI-powered career guidance focused on Computer Science. Evaluate your aptitude, unlock a tailored roadmap, learn by category, and build real portfolio projects.
        </p>

        {/* Prominent Action Control (Single Get Started Button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={handleGetStarted}
            icon="arrow_forward"
            iconPosition="right"
            className="w-full sm:w-auto px-10 py-3.5 shadow-xl shadow-sky-500/25 text-sm sm:text-base font-bold"
          >
            GET STARTED
          </Button>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
            <span className="material-symbols-outlined text-sky-400 text-2xl mb-1">person_search</span>
            <p className="text-xs font-bold text-white">1. Computer Science Profile</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Tell us your FSc background, subjects and current Computer Science interest</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
            <span className="material-symbols-outlined text-indigo-400 text-2xl mb-1">verified</span>
            <p className="text-xs font-bold text-white">2. Aptitude & 85% Logic</p>
            <p className="text-[11px] text-slate-400 mt-0.5">10-question diagnostic with supportive foundation paths</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
            <span className="material-symbols-outlined text-emerald-400 text-2xl mb-1">alt_route</span>
            <p className="text-xs font-bold text-white">3. Verified 6-Mo Roadmap</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Curated courses, milestone tracking & AI project reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};
