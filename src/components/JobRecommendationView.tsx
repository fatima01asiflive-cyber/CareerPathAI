import React, { useState } from 'react';
import { TabType, UserAccount } from '../types';
import { CURATED_JOBS_DATA } from '../data/careerEcosystemData';

interface JobRecommendationViewProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  user?: UserAccount;
}

export const JobRecommendationView: React.FC<JobRecommendationViewProps> = ({
  onNavigate,
  isDarkMode,
  user,
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = (jobId: string, applyLink: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds((prev) => [...prev, jobId]);
    }
    window.open(applyLink, '_blank', 'noopener,noreferrer');
  };

  const filteredJobs = CURATED_JOBS_DATA.filter((job) => {
    if (selectedType !== 'All' && job.type !== selectedType) return false;
    if (selectedExperience !== 'All' && job.experienceLevel !== selectedExperience) return false;
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/20 glass-card">
              AI JOB MATCHING & PLACEMENT ENGINE
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
              Feature #5
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter gradient-text">
            Job & Internship Recommendations
          </h2>
          <p className={`mt-2 text-sm md:text-base max-w-2xl leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
            Discover curated job listings matching your academic stream, resume keywords, and skill milestones across top tech companies in Pakistan and remote global employers.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('resume-analyzer')}
            className="px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">document_scanner</span>
            <span>Audit Resume Match</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Search Query Input */}
          <div className="sm:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or tech stack (e.g. PyTorch, React, Remote)..."
              className="w-full bg-slate-950/80 border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          {/* Work Type Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 rounded-2xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
            >
              <option value="All">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote Global</option>
              <option value="Internship">Internship</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 rounded-2xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry-Level / Graduate">Entry-Level / Graduate</option>
              <option value="Junior (1-2 yrs)">Junior (1-2 yrs)</option>
              <option value="Mid-Level (2-4 yrs)">Mid-Level (2-4 yrs)</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono text-white/50">Quick Filters:</span>
          {['Python', 'React', 'Remote', 'Internship', 'Cyber Security'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(searchQuery === tag ? '' : tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                searchQuery === tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="glass-card rounded-3xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              {/* Card Top: Logo, Title, Match Pill */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${job.logoColor} text-white flex items-center justify-center font-black text-base shadow-md shrink-0`}
                    >
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-emerald-300 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs text-white/60 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-white/90">{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                      {job.matchScore}% Match
                    </span>
                    <span className="text-[10px] text-white/40 font-mono mt-1">{job.postedTime}</span>
                  </div>
                </div>

                {/* Badges: Type & Experience */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[11px] font-mono">
                    💼 {job.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-[11px] font-mono">
                    🎓 {job.experienceLevel}
                  </span>
                </div>

                {/* Job Description */}
                <p className="text-xs text-white/70 leading-relaxed line-clamp-3 mb-4">
                  {job.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-indigo-950/40 text-indigo-300 font-mono text-[10px] border border-indigo-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Salary & Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-white/50 block">ESTIMATED COMPENSATION</span>
                  <p className="text-xs font-bold text-emerald-400 font-mono">
                    {job.salaryRangePKR}
                  </p>
                  <span className="text-[10px] text-white/60 font-mono block">
                    ({job.salaryRangeUSD})
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleSave(job.id)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isSaved
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'glass-card border-white/15 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    title={isSaved ? 'Saved to Bookmarks' : 'Save Job'}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isSaved ? 'bookmark_added' : 'bookmark_border'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleApply(job.id, job.applyLink)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isApplied ? 'done_all' : 'open_in_new'}
                    </span>
                    <span>{isApplied ? 'Applied' : 'Apply Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/10 space-y-3 my-8">
          <span className="material-symbols-outlined text-4xl text-white/40">search_off</span>
          <h4 className="font-bold text-base text-white">No job openings found matching your criteria</h4>
          <p className="text-xs text-white/60 max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or browsing other tech streams.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('All');
              setSelectedExperience('All');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
