import React, { useState } from 'react';
import { SCHOLARSHIPS_DATA } from '../data/careerEcosystemData';
import { ScholarshipItem, TabType } from '../types';

interface ScholarshipRecommendationViewProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  userMarksPercentage?: number;
  userProvince?: string;
}

export const ScholarshipRecommendationView: React.FC<ScholarshipRecommendationViewProps> = ({
  onNavigate,
  isDarkMode,
  userMarksPercentage = 85,
  userProvince = 'Punjab',
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>(userProvince);
  const [marksPercentage, setMarksPercentage] = useState<number>(userMarksPercentage);
  const [coverageFilter, setCoverageFilter] = useState<string>('all');

  const provinces = ['All Provinces', 'Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK', 'Islamabad'];

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((sch) => {
    // Province check
    const matchesProvince =
      selectedProvince === 'All Provinces' ||
      sch.eligibleProvinces.includes('All Pakistan') ||
      sch.eligibleProvinces.includes(selectedProvince);

    // Marks check
    const matchesMarks = marksPercentage >= sch.minMarksPercentage;

    // Coverage check
    const matchesCoverage =
      coverageFilter === 'all' || sch.coverage.toLowerCase().includes(coverageFilter.toLowerCase());

    return matchesProvince && matchesMarks && matchesCoverage;
  });

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">card_giftcard</span>
              <span>SCHOLARSHIP & FINANCIAL AID ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Scholarship & Financial Aid Grants
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Match with full and partial tuition scholarships across Pakistan (HEC Need-Based, PEEF, Ehsaas, University Merit Funds) and prestigious global programs (Fulbright).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('universities')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">account_balance</span>
              <span>Top Universities</span>
            </button>
            <button
              onClick={() => onNavigate('academic')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">school</span>
              <span>Academic Marks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="glass-card rounded-3xl p-6 border border-white/15 shadow-xl space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Province Filter */}
          <div>
            <label className="text-xs font-mono text-white/70 block mb-1">
              Domicile / Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs font-mono text-white focus:outline-hidden"
            >
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Marks Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-white/70">
                Your Academic Percentage
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {marksPercentage}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={marksPercentage}
              onChange={(e) => setMarksPercentage(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Coverage Type */}
          <div>
            <label className="text-xs font-mono text-white/70 block mb-1">
              Coverage Type
            </label>
            <select
              value={coverageFilter}
              onChange={(e) => setCoverageFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs font-mono text-white focus:outline-hidden"
            >
              <option value="all">All Coverage Grants</option>
              <option value="100% Full Tuition + Stipend">Full Tuition + Monthly Stipend</option>
              <option value="100% Tuition">100% Tuition Waiver</option>
              <option value="50-75%">Partial Fee Grant (50-75%)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/60 font-mono pt-2 border-t border-white/10">
          <span>Found {filteredScholarships.length} Eligible Scholarship Programs</span>
          <span className="text-emerald-400">✨ Automatic Eligibility Matching</span>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((sch) => (
          <div
            key={sch.id}
            className="glass-card rounded-3xl p-6 border border-white/15 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-5 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">
                  {sch.badge}
                </span>
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span>{sch.deadline}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">
                  {sch.provider}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                  {sch.title}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold">
                Coverage: {sch.coverage}
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                {sch.description}
              </p>

              <div className="space-y-1.5 text-xs text-white/80 border-t border-white/10 pt-3">
                <p>• <strong>Eligibility:</strong> {sch.eligibility}</p>
                <p>• <strong>Min Marks:</strong> {sch.minMarksPercentage}% in Intermediate/Graduation</p>
                <p>• <strong>Cycle:</strong> {sch.applicationPeriod}</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={sch.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>Official Application Portal</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
