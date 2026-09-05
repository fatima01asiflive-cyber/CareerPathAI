import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, CheckCircle2, Clock3, Flame, MapPin, Play, Sparkles, Star, Trophy, X, Lock } from 'lucide-react';
import { CAREER_ROADMAPS, CareerRoadmapLevel } from '../data/careerRoadmaps';
import { COMPUTER_SCIENCE_CATEGORIES } from '../data/pathfinderLearningResources';
import { getActiveDaysInLast7Days } from '../utils/activityTimeTracker';
import { getCurrentUserId, userScopedKey, writeUserScoped } from '../utils/userScopedStorage';

export const Roadmap: React.FC = () => {
  const { activeCourse, user, toggleCourseMilestone } = useAuth();
  const navigate = useNavigate();
  const defaultCategory = activeCourse?.category && CAREER_ROADMAPS[activeCourse.category] ? activeCourse.category : COMPUTER_SCIENCE_CATEGORIES[0];
  const [category, setCategory] = useState<string>(defaultCategory);
  const [selected, setSelected] = useState<CareerRoadmapLevel | null>(null);
  const [bonus, setBonus] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState<Record<string, boolean>>({});

  const roadmap = CAREER_ROADMAPS[category] || CAREER_ROADMAPS['Software Development'];
  const progressKey = userScopedKey('careerpath_category_roadmap_progress', getCurrentUserId());

  const loadProgress = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || '{}');
      setCategoryProgress(saved?.[category] || {});
    } catch { setCategoryProgress({}); }
  };
  useEffect(loadProgress, [category, progressKey]);

  const saveProgress = (next: Record<string, boolean>) => {
    try {
      const raw = JSON.parse(localStorage.getItem(progressKey) || '{}');
      raw[category] = next;
      localStorage.setItem(progressKey, JSON.stringify(raw));
    } catch {}
    setCategoryProgress(next);
  };

  useEffect(() => {
    const handler = () => { setBonus(true); window.setTimeout(() => setBonus(false), 6500); };
    window.addEventListener('careerpath:weekly-bonus', handler);
    return () => window.removeEventListener('careerpath:weekly-bonus', handler);
  }, []);

  useEffect(() => {
    if (activeCourse?.category && CAREER_ROADMAPS[activeCourse.category]) setCategory(activeCourse.category);
  }, [activeCourse?.category]);

  const completedCount = roadmap.levels.filter((level) => categoryProgress[level.id]).length;
  const progress = Math.round((completedCount / roadmap.levels.length) * 100);
  const activeLevelIndex = roadmap.levels.findIndex((level) => !categoryProgress[level.id]);

  const toggleLevel = (level: CareerRoadmapLevel) => {
    const next = { ...categoryProgress, [level.id]: !categoryProgress[level.id] };
    saveProgress(next);
    if (category === activeCourse?.category) {
      const milestone = activeCourse.roadmap?.[level.level - 1];
      if (milestone && Boolean(milestone.completed) !== Boolean(next[level.id])) toggleCourseMilestone(milestone.id);
    }
  };

  const isCurrentTrack = category === activeCourse?.category;
  const currentTrackProgress = isCurrentTrack ? (user?.streakCount || 0) : 0;

  const levelCards = useMemo(() => roadmap.levels.map((level, index) => ({
    level,
    completed: Boolean(categoryProgress[level.id]),
    active: index === activeLevelIndex,
  })), [roadmap.levels, categoryProgress, activeLevelIndex]);

  return (
    <div className="space-y-5 animate-fade-in pb-20">
      <section className="sticky top-16 z-30 rounded-2xl border border-slate-700/80 bg-slate-950/95 backdrop-blur-xl p-3 sm:p-4 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-300 font-black">CareerPath AI • Career Roadmap</p>
            <h1 className="text-lg sm:text-2xl font-black text-white mt-1">{roadmap.name} Roadmap</h1>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            <span className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-400/20">🔥 {user?.streakCount || 0}</span>
            <span className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/20">⭐ {user?.xpPoints || 0}</span>
            <span className="px-2.5 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/20">🎯 {progress}%</span>
          </div>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500 transition-all duration-700" style={{ width:`${progress}%` }} />
        </div>
      </section>

      {bonus && <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 flex items-center gap-3"><GiftIcon /><div><p className="font-black text-white text-sm">Weekly learning bonus unlocked</p><p className="text-xs text-amber-200">Keep your activity streak alive for another bonus.</p></div></div>}

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-4 sm:p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-200 text-[10px] font-black uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" /> Choose your career path
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3">Your learning journey, level by level</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1">New users start at Level 1. Returning users continue from their first incomplete level. Click any level to see its 4-week plan, resources and assessment.</p>
          </div>
          <div className="text-[10px] text-emerald-300">{getActiveDaysInLast7Days()}/7 active days this week</div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {COMPUTER_SCIENCE_CATEGORIES.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 px-3 py-2 rounded-xl border text-[10px] font-black transition-all ${category===item ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-sky-500/40'}`}>{item}</button>)}
        </div>

        <div className="mt-8 relative">
          {/* Desktop layout follows the supplied sketch: a central vertical timeline with
              alternating Level 01, Level 02, Level 03... cards on each side. */}
          <div className="absolute left-1/2 top-5 bottom-5 hidden w-px -translate-x-1/2 bg-slate-700 lg:block" />
          <div className="relative space-y-5 sm:space-y-7 lg:space-y-9">
            {levelCards.map(({ level, completed, active }, index) => {
              const leftSide = index % 2 === 0;
              const card = (
                <button
                  type="button"
                  onClick={() => setSelected(level)}
                  className={`group relative w-full text-left rounded-[1.5rem] border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    completed
                      ? 'border-emerald-400/60 bg-emerald-500/[0.045] shadow-emerald-500/5'
                      : active
                        ? 'border-amber-300/80 bg-amber-400/[0.045] ring-1 ring-amber-300/20 shadow-amber-400/10'
                        : 'border-slate-700/80 bg-slate-950/80'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${completed ? 'text-emerald-300' : active ? 'text-amber-300' : 'text-slate-400'}`}>Level {String(level.level)}</p>
                      <h3 className={`mt-1 text-base sm:text-xl font-black ${completed ? 'text-emerald-300' : active ? 'text-amber-300' : 'text-slate-200'}`}>{level.title.replace(/^Level \d+:\s*/, '')}</h3>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-black border ${
                      completed ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : active ? 'border-amber-300/25 bg-amber-300/10 text-amber-200' : 'border-slate-700 bg-slate-900 text-slate-400'
                    }`}>
                      {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : active ? <Play className="h-3 w-3 fill-current" /> : <Lock className="h-3.5 w-3.5" />}
                      {completed ? 'Completed' : active ? 'In Progress' : 'Locked'}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] sm:text-xs leading-5 text-slate-400">{level.summary}</p>
                  {active && !completed && <div className="mt-4"><div className="mb-1.5 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-500"><span>Your progress</span><span className="text-amber-300">In progress</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-amber-300 transition-all duration-500" style={{ width: '0%' }} /></div></div>}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3"><span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-500"><Clock3 className="h-3.5 w-3.5" /> 4-week flow</span><span className="inline-flex items-center gap-1 text-[9px] font-black text-amber-300"><Star className="h-3.5 w-3.5 fill-current" />{100 + index * 50} XP<ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" /></span></div>
                </button>
              );

              return (
                <div key={level.id} className="relative lg:grid lg:grid-cols-[1fr_88px_1fr] lg:items-center lg:gap-4">
                  <div className={leftSide ? 'lg:pr-3' : 'lg:col-start-3 lg:pl-3'}>{card}</div>
                  <div className="hidden lg:flex relative z-10 items-center justify-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-slate-950 shadow-xl ${completed ? 'border-emerald-400 text-emerald-300 shadow-emerald-500/10' : active ? 'border-amber-300 text-amber-300 shadow-amber-400/15' : 'border-slate-600 text-slate-400'}`}>
                      <span className="text-sm font-black">{index + 1}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex lg:hidden items-start gap-2 pl-1"><div className={`h-9 w-9 rounded-full border-2 flex items-start justify-center text-[10px] font-black ${completed ? 'border-emerald-400 text-emerald-300' : active ? 'border-amber-300 text-amber-300' : 'border-slate-600 text-slate-400'}`}>{index + 1}</div><span className="h-px flex-1 bg-slate-800" /></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div><p className="text-[9px] uppercase tracking-widest text-sky-300 font-black">Current category</p><p className="text-sm font-black text-white mt-1">{category}</p><p className="text-[10px] text-slate-400 mt-1">{roadmap.description}</p></div>
          <div className="text-right"><p className="text-xs font-black text-sky-300">{completedCount}/{roadmap.levels.length} levels</p><p className="text-[9px] text-slate-500 mt-1">{isCurrentTrack ? `Your streak: ${currentTrackProgress} days` : 'Preview roadmap'}</p></div>
        </div>
      </section>

      {selected && (
          <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center p-3 pt-6 sm:p-6 sm:pt-10" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-2xl max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-[2rem] bg-slate-900 border border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,.65)] p-5 sm:max-h-[calc(100vh-3rem)] sm:p-7" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4"><div><span className="text-[9px] uppercase tracking-widest text-amber-300 font-black">{category} • Level {String(selected.level)}</span><h2 className="text-xl sm:text-2xl font-black text-white mt-1">{selected.title.replace(/^Level 0+(\d+)/, 'Level $1')}</h2><p className="text-xs text-slate-400 mt-1">{selected.outcome}</p></div><button onClick={()=>setSelected(null)} className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800"><X className="w-5 h-5" /></button></div>
            <div className="mt-5 space-y-3">
              {selected.weeklyPlan.map((item) => <div key={item.week} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"><div className="flex items-start gap-3"><div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 flex items-center justify-center text-[10px] font-black shrink-0">W{item.week}</div><div className="min-w-0"><p className="text-sm font-black text-white">Week {item.week} — {item.title}</p><p className="text-[10px] text-slate-500 mt-1">Resources: {item.resources}</p><div className="mt-2 grid sm:grid-cols-3 gap-2">{item.tasks.map((task, idx)=><div key={idx} className="rounded-xl bg-slate-900 border border-slate-800 p-2 text-[10px] text-slate-300">{task}</div>)}</div></div></div></div>)}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={()=>{ writeUserScoped('careerpath_resource_focus', `${category}|${selected.title}`); navigate('/resources'); }} className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-sky-500 text-slate-950 text-xs font-black inline-flex items-center justify-center gap-2"><BookOpen className="w-4 h-4" /> Resources</button>
              <button onClick={()=>navigate('/assessment')} className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-black inline-flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Assessment</button>
              <button onClick={()=>toggleLevel(selected)} className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-black inline-flex items-center justify-center gap-2">{categoryProgress[selected.id] ? <Check className="w-4 h-4" /> : <Star className="w-4 h-4" />}{categoryProgress[selected.id] ? 'Mark Incomplete' : 'Mark Level Complete'}</button>
              <button onClick={()=>setSelected(null)} className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">Close</button>
            </div>
            <div className="mt-4 text-[9px] text-slate-500 inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" /> Roadmap uses a central timeline with alternating levels, matching the supplied sketch.</div>
          </div>
        </div>
      )}
    </div>
  );
};

const GiftIcon = () => <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-300/25 text-amber-300 flex items-center justify-center">🎁</div>;
