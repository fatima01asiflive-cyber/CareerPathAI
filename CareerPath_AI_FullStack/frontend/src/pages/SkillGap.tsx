import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skillGapService, SkillGapReport } from '../services/skillGapService';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export const SkillGap: React.FC = () => {
  const { user, selectedCareer } = useAuth();
  const targetId = selectedCareer?.id || 'ai-engineer';
  const score = user?.aptitudeScore ?? 85;

  const [selectedTarget, setSelectedTarget] = useState<string>(targetId);
  const [filterPriority, setFilterPriority] = useState<'All' | 'Critical' | 'Recommended' | 'Advanced'>('All');

  const report: SkillGapReport = skillGapService.getSkillGapReport(selectedTarget, score);

  const filteredSkills = report.skills.filter((s) => {
    if (filterPriority === 'All') return true;
    return s.priority === filterPriority;
  });

  const roleOptions = [
    { id: 'ai-engineer', label: 'AI & Machine Learning Engineer' },
    { id: 'data-scientist', label: 'Data Scientist & Analytics' },
    { id: 'software-engineer', label: 'Full-Stack Software Engineer' },
    { id: 'cyber-security', label: 'Cyber Security Specialist' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>FYP Core Module • Industry Skill Gap Recommendation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Skill Gap & Readiness Analysis
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Compare your current verified diagnostic proficiencies against target market job requirements. Isolate missing critical competencies and bridge them directly through guided roadmaps.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-sky-400 focus:outline-none focus:border-sky-500"
            >
              {roleOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  Target: {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Overall Readiness</span>
          <p className="text-2xl sm:text-3xl font-black text-white">{report.overallReadinessScore}%</p>
          <p className="text-[11px] text-sky-400">Based on {report.totalSkillsAssessed} industry skills</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Ready Skills</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{report.readySkillsCount}</p>
          <p className="text-[11px] text-slate-400">Proficiency meets &ge; 80% threshold</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Critical Gaps</span>
          <p className="text-2xl sm:text-3xl font-black text-rose-400">{report.missingCriticalCount}</p>
          <p className="text-[11px] text-slate-400">High-priority blocker competencies</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Est. Bridge Time</span>
          <p className="text-2xl sm:text-3xl font-black text-indigo-400">120 hrs</p>
          <p className="text-[11px] text-slate-400">Across 6-month curated roadmap</p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2">Filter Priority:</span>
        {(['All', 'Critical', 'Recommended', 'Advanced'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
              filterPriority === p
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Skills Matrix Table / Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Detailed Competency Differential Matrix
        </h2>

        <div className="space-y-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{skill.skillName}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        skill.priority === 'Critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : skill.priority === 'Recommended'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {skill.priority} Gap
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500">{skill.category} • Est. {skill.estimatedHoursToMaster} hrs practice</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">CURRENT</span>
                    <span className="text-white font-bold">{skill.currentLevel}%</span>
                  </div>
                  <span className="text-slate-600">→</span>
                  <div>
                    <span className="text-slate-500 block text-[10px]">REQUIRED</span>
                    <span className="text-sky-400 font-bold">{skill.requiredLevel}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center min-w-[60px]">
                    <span className="text-slate-500 block text-[9px]">GAP</span>
                    <span className={`font-bold ${skill.gap > 30 ? 'text-rose-400' : 'text-amber-400'}`}>
                      -{skill.gap}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Differential Visual Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                  {/* Current Level */}
                  <div
                    className="h-full bg-sky-500 rounded-l-full absolute top-0 left-0 z-10"
                    style={{ width: `${skill.currentLevel}%` }}
                  />
                  {/* Required Target Marker */}
                  <div
                    className="h-full bg-rose-500/40 absolute top-0"
                    style={{ left: `${skill.currentLevel}%`, width: `${skill.gap}%` }}
                  />
                </div>
              </div>

              {/* Action Bridge Resource */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-900 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-sky-400">auto_stories</span>
                  <span className="text-slate-400">Bridge Resource:</span>
                  <span className="text-slate-200 font-medium">{skill.recommendedResource.title}</span>
                </div>
                <Link to={skill.recommendedResource.link}>
                  <Button variant="outline" size="sm" icon="play_arrow">
                    Start {skill.recommendedResource.type}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan Milestones */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Structured 4-Phase Skill Closure Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {report.actionPlan.map((ap, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400 text-[10px] font-mono font-bold">
                Phase {idx + 1}
              </span>
              <h3 className="text-xs font-bold text-white">{ap.phase}</h3>
              <p className="text-[10px] font-mono text-slate-500">{ap.duration}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{ap.focus}</p>
              <p className="text-[11px] text-emerald-400 font-medium pt-1 border-t border-slate-900">
                Milestone: {ap.milestone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
