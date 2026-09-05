import React, { useState } from 'react';
import { CAREER_RECOMMENDATIONS_DATA, INITIAL_SKILLS_CATALOG } from '../data/careerEcosystemData';
import { CareerRecommendation, SkillRating, TabType } from '../types';

interface AISkillGapAnalysisProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  userSkills?: SkillRating[];
  onSelectTargetCareer?: (career: CareerRecommendation) => void;
}

export const AISkillGapAnalysis: React.FC<AISkillGapAnalysisProps> = ({
  onNavigate,
  isDarkMode,
  userSkills = INITIAL_SKILLS_CATALOG,
  onSelectTargetCareer,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation>(CAREER_RECOMMENDATIONS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'ranked-matches' | 'skill-gap' | 'learning-plan'>('ranked-matches');

  // Compute mastered vs missing skills for currently selected career
  const masteredSkills = userSkills.filter(
    (s) => s.score >= 3 && selectedCareer.requiredSkills.some((req) => req.toLowerCase().includes(s.skill.toLowerCase().split(' ')[0]))
  );

  const handleSelect = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    if (onSelectTargetCareer) {
      onSelectTargetCareer(career);
    }
  };

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span>AI RECOMMENDATION & SKILL GAP ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              AI Career Recommendation & Skill Gap Analysis
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Instead of guessing a single field, the AI ranks your optimal career matches by multidimensional synergy, breaks down your mastered vs missing skills, and prioritizes what to learn first.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">alt_route</span>
              <span>Generate Roadmap</span>
            </button>
            <button
              onClick={() => onNavigate('study-planner')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Study Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 glass-card rounded-2xl border border-white/10">
        <button
          onClick={() => setActiveTab('ranked-matches')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTab === 'ranked-matches'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">military_tech</span>
          <span>Ranked Career Matches ({CAREER_RECOMMENDATIONS_DATA.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('skill-gap')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTab === 'skill-gap'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">checklist</span>
          <span>Mastered vs Missing Gap Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('learning-plan')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTab === 'learning-plan'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">timeline</span>
          <span>Prioritized Learning Order</span>
        </button>
      </div>

      {/* 1. RANKED CAREER MATCHES */}
      {activeTab === 'ranked-matches' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Career List */}
          <div className="lg:col-span-1 space-y-3">
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider block font-bold">
              AI Ranked Matches
            </span>
            {CAREER_RECOMMENDATIONS_DATA.map((career, idx) => {
              const isSelected = selectedCareer.id === career.id;
              return (
                <div
                  key={career.id}
                  onClick={() => handleSelect(career)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3 group ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-950/80 to-slate-900 border-blue-500 shadow-xl'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold">
                      #{idx + 1} Best Match
                    </span>
                    <span className="text-lg font-extrabold font-mono text-emerald-400">
                      {career.matchScore}%
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                    {career.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span>{career.avgSalaryPKR}</span>
                    <span className="text-emerald-400">{career.growthRate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Career In-Depth Dossier */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">
                    {selectedCareer.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {selectedCareer.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center">
                    <span className="text-2xl font-extrabold font-mono block leading-none">
                      {selectedCareer.matchScore}%
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider">Fit Score</span>
                  </div>
                </div>
              </div>

              {/* Why This Fits You */}
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-mono font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">robot_2</span>
                  <span>AI Synergy Rationale</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {selectedCareer.whyFit}
                </p>
              </div>

              {/* Market Economics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase">Pakistan Tech Salary</span>
                  <p className="text-sm font-bold text-emerald-400 font-mono">{selectedCareer.avgSalaryPKR}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase">Remote International Salary</span>
                  <p className="text-sm font-bold text-blue-400 font-mono">{selectedCareer.avgSalaryUSD}</p>
                </div>
              </div>

              {/* Recommended Universities */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-white/50 uppercase font-bold">
                  Top Recommended Universities for this field in Pakistan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.topUniversities.map((uni, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90">
                      🏛 {uni}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-base">checklist</span>
                  <span>Analyze Missing Skills Gap</span>
                </button>
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="px-5 py-3 rounded-xl glass-card border border-white/20 hover:bg-white/10 text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-base">alt_route</span>
                  <span>Generate Roadmap for {selectedCareer.title.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MASTERED VS MISSING SKILLS GAP MATRIX */}
      {activeTab === 'skill-gap' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase font-bold">
                  Current Target Role
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  {selectedCareer.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/60">Switch Role:</span>
                <select
                  value={selectedCareer.id}
                  onChange={(e) => {
                    const found = CAREER_RECOMMENDATIONS_DATA.find((c) => c.id === e.target.value);
                    if (found) setSelectedCareer(found);
                  }}
                  className="px-3 py-2 bg-slate-900 border border-white/20 rounded-xl text-xs font-mono text-white focus:outline-hidden"
                >
                  {CAREER_RECOMMENDATIONS_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side by side Gap Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mastered Skills */}
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Mastered / Foundation Skills (Ready)</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-300 font-bold">
                    {masteredSkills.length} Verified
                  </span>
                </div>

                <div className="space-y-2.5">
                  {masteredSkills.map((s, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-400 text-sm">done_all</span>
                        <span className="font-bold text-white">{s.skill}</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-300 font-bold uppercase">
                        {s.level} (Lvl {s.score}/5)
                      </span>
                    </div>
                  ))}
                  {masteredSkills.length === 0 && (
                    <p className="text-xs text-white/50 italic">
                      No matching technical foundations marked at intermediate level yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Missing Skills (To Learn) */}
              <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <span className="material-symbols-outlined">pending_actions</span>
                    <span>Missing Skills Gap (To Learn)</span>
                  </div>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    {selectedCareer.missingSkills.length} Required
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedCareer.missingSkills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-mono font-bold text-[10px]">
                          {i + 1}
                        </span>
                        <span className="font-bold text-white">{skill}</span>
                      </div>
                      <span className="font-mono text-[10px] text-amber-300 font-bold uppercase">
                        High Priority
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRIORITIZED LEARNING ORDER */}
      {activeTab === 'learning-plan' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 uppercase font-bold">
              AI Sequenced Timeline
            </span>
            <h3 className="text-xl font-bold text-white">
              Prioritized Skill Progression Roadmap for {selectedCareer.title}
            </h3>
            <p className="text-xs text-white/60">
              The AI sequences learning topics in exact chronological dependency order to maximize retention and portfolio readiness.
            </p>
          </div>

          <div className="space-y-4">
            {selectedCareer.missingSkills.map((skill, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    M{index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{skill}</h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      Estimated 15-20 study hours with hands-on coding challenges & documentation review.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold flex items-center gap-1.5 min-h-[40px]"
                  >
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                    <span>Free Video Course</span>
                  </button>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 min-h-[40px]"
                  >
                    <span className="material-symbols-outlined text-sm">description</span>
                    <span>Docs & Cheatsheet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono font-bold text-xs shadow-xl shadow-blue-600/30 flex items-center gap-2 min-h-[48px]"
            >
              <span>Build Full 8-Month Interactive Roadmap</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
