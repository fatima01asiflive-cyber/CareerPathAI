import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ALL_CAREERPATH_RESOURCES, COMPUTER_SCIENCE_CATEGORIES, CareerPathResource, CareerPathCategory, CareerPathLevel } from '../../data/pathfinderLearningResources';
import { addActivityTime, completeManualDailyStreak, formatActivityTime, getActivityTime } from '../../utils/activityTimeTracker';
import { getCurrentUserId, readUserScoped, removeUserScoped, writeUserScoped } from '../../utils/userScopedStorage';
import { CAREER_ROADMAPS } from '../../data/careerRoadmaps';
import { Play, Clock, Sparkles, BookOpen, Search, Filter, ChevronDown, ChevronUp, ExternalLink, FileText } from 'lucide-react';

const LEVELS: CareerPathLevel[] = ['Beginner', 'Intermediate', 'Pro'];
const RESOURCE_TYPES = ['Docs'] as const;
const COMING_SOON_CATEGORIES = new Set<CareerPathCategory>(['Mobile Development', 'Web Development', 'DevOps']);
const getVideoWatchUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) return `https://www.youtube.com/watch?v=${parsed.pathname.replace('/', '')}`;
    if (parsed.pathname.startsWith('/embed/')) return `https://www.youtube.com/watch?v=${parsed.pathname.split('/embed/')[1]?.split('/')[0] || ''}`;
    if (parsed.pathname.startsWith('/shorts/')) return `https://www.youtube.com/watch?v=${parsed.pathname.split('/shorts/')[1]?.split('/')[0] || ''}`;
    return url;
  } catch {
    return url;
  }
};

const levelStyle: Record<CareerPathLevel, string> = {
  Beginner: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  Intermediate: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  Pro: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
};

export const PathfinderResourceHub: React.FC = () => {
  const { user, activeCourse } = useAuth();
  const currentCategory = (activeCourse?.category && COMPUTER_SCIENCE_CATEGORIES.includes(activeCourse.category as CareerPathCategory))
    ? activeCourse.category as CareerPathCategory
    : COMPUTER_SCIENCE_CATEGORIES[0];
  const [resources, setResources] = useState<CareerPathResource[]>(ALL_CAREERPATH_RESOURCES);
  const [selected, setSelected] = useState<CareerPathResource | null>(null);
  const [globalLevel, setGlobalLevel] = useState<CareerPathLevel | 'All'>('Beginner');
  const [resourceType, setResourceType] = useState<'All' | (typeof RESOURCE_TYPES)[number]>('All');
  const [categoryFilter, setCategoryFilter] = useState<CareerPathCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => Object.fromEntries(COMPUTER_SCIENCE_CATEGORIES.map((c) => [c, true])));
  const [categoryLevels, setCategoryLevels] = useState<Record<string, CareerPathLevel | 'All'>>({});
  const [completedResources, setCompletedResources] = useState<string[]>(() => readUserScoped<string[]>('careerpath_completed_resources', []));

  // New users start at Beginner; returning users resume from their first incomplete roadmap level.
  useEffect(() => {
    const roadmap = CAREER_ROADMAPS[currentCategory];
    if (!roadmap) return;
    const progress = readUserScoped<Record<string, boolean>>('careerpath_category_roadmap_progress', {}, getCurrentUserId());
    const categoryProgress = progress?.[currentCategory] || {};
    const firstIncomplete = roadmap.levels.find((level) => !categoryProgress[level.id]);
    const roadmapLevel = firstIncomplete?.level || roadmap.levels.length;
    const resumeLevel: CareerPathLevel = roadmapLevel <= 2 ? 'Beginner' : roadmapLevel <= 4 ? 'Intermediate' : 'Pro';
    setGlobalLevel(resumeLevel);
    setCategoryFilter(currentCategory);
  }, [user?.id, currentCategory]);

  useEffect(() => {
    fetch('/api/resources/pathfinder?domain=Computer%20Science')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => Array.isArray(data?.resources) && data.resources.length ? setResources(data.resources) : null)
      .catch(() => setResources(ALL_CAREERPATH_RESOURCES));

    const focus = readUserScoped<string | null>('careerpath_resource_focus', null);
    if (focus) {
      const [category, title] = focus.split('|');
      if (category && COMPUTER_SCIENCE_CATEGORIES.includes(category as CareerPathCategory)) {
        setCategoryFilter(category as CareerPathCategory);
        setSearch(title || '');
      } else {
        setSearch(focus);
      }
      removeUserScoped('careerpath_resource_focus');
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    const id = window.setInterval(() => { if (!document.hidden) addActivityTime('resources', 1); }, 1000);
    return () => window.clearInterval(id);
  }, [selected]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return resources.filter((r) => {
      if (COMING_SOON_CATEGORIES.has(r.category)) return false;
      const categoryOk = categoryFilter === 'All' || r.category === categoryFilter;
      const levelOk = globalLevel === 'All' || r.level === globalLevel;
      const typeOk = resourceType === 'All' || r.provider === resourceType;
      const queryOk = !q || [r.title, r.category, r.level, r.description, r.roadmapLevel, r.dataset || '', ...r.tags].join(' ').toLowerCase().includes(q);
      return categoryOk && levelOk && typeOk && queryOk;
    });
  }, [resources, globalLevel, categoryFilter, resourceType, search]);

  const byCategory = (category: CareerPathCategory) => {
    const categoryLevel = categoryLevels[category] || 'All';
    return filtered.filter((r) => r.category === category && (categoryLevel === 'All' || r.level === categoryLevel));
  };

  const activity = getActivityTime();
  const markLectureComplete = (resource: CareerPathResource) => {
    const alreadyDone = completedResources.includes(resource.id);
    const next = Array.from(new Set([...completedResources, resource.id]));
    setCompletedResources(next);
    writeUserScoped('careerpath_completed_resources', next);
    if (!alreadyDone) {
      completeManualDailyStreak();
      window.dispatchEvent(new CustomEvent('careerpath:streak-updated'));
    }
  };
  const openNextLecture = (resource: CareerPathResource) => {
    const next = filtered.find((r) => r.id !== resource.id && !completedResources.includes(r.id)) || filtered.find((r) => r.id !== resource.id);
    if (next) setSelected(next);
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-5 pb-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">COMPUTER SCIENCE RESOURCE HUB</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">Learn by category, level and roadmap</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">New students begin with Beginner resources. Returning students automatically resume from the level currently in progress on their roadmap. You can still change the level or category anytime.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800"><span className="block text-[9px] text-slate-500">Resource time</span><strong className="text-xs text-sky-400">{formatActivityTime(activity.resources)}</strong></div>
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800"><span className="block text-[9px] text-slate-500">Student</span><strong className="text-xs text-white">{user?.name || 'Student'}</strong></div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="md:col-span-2 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search AI/ML, Data Science, React, Cloud..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500" /></div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as CareerPathCategory | 'All')} className="px-3 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"><option value="All">All CS Categories</option>{COMPUTER_SCIENCE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          {(['All', ...LEVELS] as const).map((level) => <button key={level} onClick={() => setGlobalLevel(level)} className={`px-3 py-1.5 rounded-full text-[10px] font-black border ${globalLevel === level ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>{level}</button>)}<span className="ml-auto text-[9px] font-black uppercase tracking-wider text-emerald-300">Resume: {currentCategory} • {globalLevel}</span>
          <div className="flex flex-wrap gap-1.5 ml-1">{RESOURCE_TYPES.map((type) => <button key={type} onClick={() => setResourceType((current) => current === type ? 'All' : type)} className={`px-3 py-1.5 rounded-full text-[10px] font-black border ${resourceType === type ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>{type}</button>)}</div><span className="text-[10px] text-slate-600">{filtered.length} resources</span>
        </div>
      </section>

      <div className="space-y-3">
        {COMPUTER_SCIENCE_CATEGORIES.map((category) => {
          const items = byCategory(category);
          const open = openCategories[category] ?? true;
          return (
            <section key={category} className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-950/50">
                <button onClick={() => setOpenCategories((p) => ({ ...p, [category]: !open }))} className="flex items-center gap-3 min-w-0 text-left">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300"><BookOpen className="w-4 h-4" /></div>
                  <div><h2 className="text-sm font-black text-white">{category}</h2><p className="text-[9px] text-slate-500">{items.length} resource{items.length === 1 ? '' : 's'} available</p></div>
                </button>
                <div className="flex items-center gap-2">
                  <select value={categoryLevels[category] || 'All'} onChange={(e) => setCategoryLevels((p) => ({ ...p, [category]: e.target.value as CareerPathLevel | 'All' }))} onClick={(e) => e.stopPropagation()} className="px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[9px] text-white"><option>All</option>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select>
                  {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </div>
              {open && (COMING_SOON_CATEGORIES.has(category) ? (
                <div className="p-4 sm:p-5">
                  <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 px-5 py-8 sm:py-10 text-center">
                    <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-sky-300" />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white">{category} — Coming Soon</h3>
                    <p className="mx-auto mt-2 max-w-xl text-[10px] sm:text-xs text-slate-400">
                      Curated videos and documentation for this track are being prepared. The category will appear here as soon as its resources are ready.
                    </p>
                    <span className="inline-flex mt-4 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[9px] font-black text-sky-200">COMING SOON</span>
                  </div>
                </div>
              ) : (
              <div className="p-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map((resource) => (
                  <button key={resource.id} onClick={() => setSelected(resource)} className="text-left rounded-2xl border border-slate-800 bg-slate-950/70 hover:border-sky-500/40 overflow-hidden transition-all group">
                    <div className="aspect-video bg-slate-900 relative"><img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-90" /><div className="absolute inset-0 flex items-center justify-center"><span className="w-11 h-11 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg">{resource.provider === 'Docs' ? <FileText className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}</span></div></div>
                    <div className="p-3 space-y-2"><div className="flex items-center justify-between gap-2"><div className="flex items-center gap-1.5"><span className={`px-2 py-0.5 rounded-full border text-[9px] font-black ${levelStyle[resource.level]}`}>{resource.level}</span>{completedResources.includes(resource.id) && <span className="text-[9px] text-emerald-300 font-black">✓ DONE</span>}</div><span className="text-[9px] text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />{resource.duration}</span></div><h3 className="text-xs font-bold text-white line-clamp-2">{resource.title}</h3><p className="text-[10px] text-slate-500 line-clamp-2">{resource.description}</p>{resource.dataset && <span className="inline-flex text-[9px] px-2 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-sky-300">Dataset: {resource.dataset}</span>}</div>
                  </button>
                ))}
                {!items.length && <div className="md:col-span-3 p-6 text-center text-xs text-slate-500">No resources match this category/level/search filter.</div>}
              </div>
              ))} 
            </section>
          );
        })}
      </div>

      {selected && <div className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4" onClick={() => setSelected(null)}>
        <div className="w-full max-w-5xl max-h-[94vh] rounded-3xl border border-slate-700 bg-slate-950 overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {selected.provider === 'Docs' ? (
            <div className="min-h-[330px] bg-slate-900 p-6 sm:p-8 flex flex-col justify-center"><div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-sky-300"><FileText className="w-7 h-7" /></div><p className="text-[10px] uppercase tracking-widest text-sky-300 font-black mt-5">Documentation Resource</p><h3 className="text-2xl font-black text-white mt-2">{selected.title}</h3><p className="text-sm text-slate-400 mt-2 max-w-2xl">{selected.description}</p><div className="mt-6 flex flex-wrap gap-2"><a href={selected.videoUrl} target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-black inline-flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Open documentation</a><span className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">Reference opens outside the app when the provider blocks iframe embedding.</span></div></div>
          ) : (
            <div className="bg-black">
              <div className="relative w-full aspect-video max-h-[68vh] min-h-[220px] sm:min-h-[300px]">
                <iframe src={selected.videoUrl} title={selected.title} className="absolute inset-0 w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <div className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-[9px] font-black text-white/80">WATCH INSIDE APP</div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-slate-950/90 px-4 py-3 sm:px-5">
                <span className="text-[9px] text-slate-500">Video source: YouTube</span>
                <div className="flex flex-wrap gap-2">
                  {/* <a href={getVideoWatchUrl(selected.videoUrl)} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-200 text-[10px] font-bold inline-flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Open Source
                  </a> */}
                  <a href={getVideoWatchUrl(selected.videoUrl)} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-red-500/15 border border-red-500/25 text-red-200 text-[10px] font-black inline-flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Open Source in New Tab
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="p-5 sm:p-6 space-y-3"><div className="flex flex-wrap gap-2"><span className="px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[9px] font-black">{selected.category}</span><span className={`px-2 py-1 rounded-full border text-[9px] font-black ${levelStyle[selected.level]}`}>{selected.level}</span>{selected.isAiPick && <span className="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-sky-300 text-[9px] font-black"><Sparkles className="inline w-3 h-3" /> AI Pick</span>}</div><h2 className="text-xl font-black text-white">{selected.title}</h2><p className="text-xs text-slate-400">{selected.description}</p><div className="flex flex-wrap gap-2 text-[9px] text-slate-400"><span>Roadmap: {selected.roadmapLevel}</span><span>•</span><span>{selected.provider}</span>{selected.dataset && <><span>•</span><span>Dataset: {selected.dataset}</span></>}</div><div className="flex flex-wrap justify-end gap-2">
          <a href={selected.provider === 'Docs' ? selected.videoUrl : getVideoWatchUrl(selected.videoUrl)} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 text-[10px] font-bold inline-flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" /> {selected.provider === 'Docs' ? 'Open Documentation' : 'Open in New Tab'}</a>
          <button onClick={() => markLectureComplete(selected)} className="px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-[10px] font-black">{completedResources.includes(selected.id) ? 'Lecture Completed' : 'Mark Lecture Complete'}</button>
          <button onClick={() => openNextLecture(selected)} className="px-3 py-2 rounded-xl bg-violet-500/15 border border-violet-500/25 text-sky-300 text-[10px] font-black">Next Lecture →</button>
          <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 text-[10px] font-black">Close</button>
        </div></div>
        </div>
      </div>}
    </div>
  );
};
