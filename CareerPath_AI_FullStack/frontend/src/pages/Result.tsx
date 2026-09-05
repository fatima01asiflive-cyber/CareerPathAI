import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { CourseDetailItem } from '../utils/courseData';

export const Result: React.FC = () => {
  const { user, recommendation, selectCourse, recommendedCoursesBundle, setSelectedCareer } = useAuth();
  const navigate = useNavigate();
  const [selectedForStart, setSelectedForStart] = useState<string | null>(null);

  const score = user?.aptitudeScore ?? 0;
  const userInterests = user?.interests && user.interests.length > 0 ? user.interests.join(', ') : 'Software Development';

  const { tierTitle, tierSubtitle, tierCode, adviceMessage, courses } = recommendedCoursesBundle;

  const categoryScores: Record<string, number> = user?.categoryScores || {
    'Programming & Computational Logic': score >= 80 ? 92 : score >= 50 ? 76 : 52,
    'Algorithmic Problem Solving': score >= 80 ? 88 : score >= 50 ? 70 : 48,
    'Analytical & Abstract Reasoning': score >= 80 ? 94 : score >= 50 ? 80 : 58,
    'Applied Mathematics & Systems': score >= 80 ? 86 : score >= 50 ? 68 : 45,
  };

  const handleStartCourse = (course: CourseDetailItem) => {
    setSelectedForStart(course.id);
    selectCourse(course.id);

    // If there is an associated career match, set it too
    if (recommendation?.recommendedCareer) {
      setSelectedCareer(recommendation.recommendedCareer);
    }

    setTimeout(() => {
      navigate('/roadmap');
    }, 300);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 space-y-8 animate-fade-in pb-16 font-sans">
      {/* Top Banner / Diagnostic Verdict Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono">
              <span
                className={`w-2 h-2 rounded-full ${
                  score >= 80
                    ? 'bg-emerald-400'
                    : score >= 50
                    ? 'bg-sky-400'
                    : score >= 30
                    ? 'bg-amber-400'
                    : 'bg-rose-400'
                }`}
              />
              <span className="text-slate-300 font-semibold">{tierTitle}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">{tierSubtitle}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Diagnostic Assessment Results
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                Declared Interest: <strong className="text-white">{userInterests}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                Aptitude Score: <strong className="text-sky-400">{score}%</strong>
              </span>
            </div>
          </div>

          {/* Large Circular/Square Score Metric */}
          <div className="flex flex-row md:flex-col items-center justify-center p-5 rounded-3xl bg-slate-950/90 border border-slate-800 shrink-0 w-full md:w-36 md:h-36 text-center gap-3 md:gap-0">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">{score}%</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold md:mt-1">
              Overall Score
            </div>
            <div className="text-[9px] text-slate-500 hidden md:block mt-0.5">80% benchmark</div>
          </div>
        </div>

        {/* Supportive Logic Feedback Banner */}
        <div
          className={`mt-6 p-4.5 rounded-2xl border flex items-start gap-3.5 ${
            tierCode === 'tier1_advanced'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : tierCode === 'tier2_intermediate'
              ? 'bg-sky-500/10 border-sky-500/30 text-sky-200'
              : tierCode === 'tier3_foundation'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
          }`}
        >
          <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">
            {tierCode === 'tier1_advanced'
              ? 'verified'
              : tierCode === 'tier2_intermediate'
              ? 'trending_up'
              : tierCode === 'tier3_foundation'
              ? 'support'
              : 'psychology'}
          </span>
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm text-white">
              {tierCode === 'tier1_advanced'
                ? 'Strong CS Match: Specialized Track Unlocked'
                : tierCode === 'tier2_intermediate'
                ? 'Good CS Foundation: Intermediate Track'
                : tierCode === 'tier3_foundation'
                ? 'Foundation First: Strengthen CS Basics Before Advanced Skills'
                : 'Core CS Foundation Required'}
            </p>
            <p className="leading-relaxed opacity-95 text-slate-300">{adviceMessage}</p>
          </div>
        </div>
        {score < 80 && (
          <div className="mt-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
            <strong>Foundation-first recommendation:</strong> your selected CS interest is kept, but advanced/high-demand specialization is not recommended yet. Start with the strongest foundational CS category shown below, then move toward your selected interest as your aptitude improves.
          </div>
        )}
      </div>

      {/* Course Selection Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400">school</span>
              <span>Recommended Courses For Your Level ({courses.length} Options)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select <strong>one course</strong> below to generate your personalized step-by-step roadmap and unlock its curated resources.
            </p>
          </div>
        </div>

        {/* 5 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, idx) => {
            const isStarting = selectedForStart === course.id;

            return (
              <div
                key={course.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-5 sm:p-6 backdrop-blur-xl transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-sky-500/5 group"
              >
                <div className="space-y-3">
                  {/* Top Meta Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Option #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          course.level === 'Advanced'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : course.level === 'Intermediate'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {course.level === 'Advanced' ? 'Pro' : course.level}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-amber-400 font-bold">
                        {course.matchScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <div>
                    <span className="text-[11px] font-mono text-sky-400 uppercase">{course.category}</span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug mt-0.5">
                      {course.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Why Recommended */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                      Why Recommended:
                    </span>
                    <p className="leading-snug text-slate-300">{course.whyRecommended}</p>
                  </div>

                  {/* Skills Gained Tags */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Skills Gained:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {course.skillsGained.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skillsGained.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono">
                          +{course.skillsGained.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    <span>{course.duration}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isStarting}
                    onClick={() => handleStartCourse(course)}
                    className="whitespace-nowrap font-bold text-xs"
                  >
                    {isStarting ? 'Generating Roadmap...' : 'Start This Course'}
                    <span className="material-symbols-outlined text-xs ml-1">arrow_forward</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roadmap Project Assignment */}
      <div className="bg-slate-900/80 border border-violet-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">Next portfolio milestone</span>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1">{score < 80 ? 'Foundation Project' : 'Category Project'}</h2>
            <p className="text-xs text-slate-400 mt-1">Your project stage follows the roadmap. Complete the required course phase, then submit a GitHub repository and live deployment for AI market-readiness review.</p>
          </div>
          <button onClick={() => navigate('/projects')} className="px-4 py-2.5 rounded-xl bg-violet-500 text-white text-xs font-black inline-flex items-center gap-2">Open Projects <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
        </div>
      </div>

      {/* Performance by Subject Area */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400 text-base">analytics</span>
            <span>Diagnostic Breakdown by Competency</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-400">CS Skill Threshold: 80%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryScores).map(([name, catScore]) => (
            <div key={name} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-200">{name}</span>
                <span className="font-mono font-bold text-sky-400">{catScore}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-700 ${
                    catScore >= 80
                      ? 'bg-emerald-400'
                      : catScore >= 60
                      ? 'bg-sky-400'
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${catScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
