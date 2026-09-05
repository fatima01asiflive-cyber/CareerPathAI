import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { CourseDetailItem } from '../utils/courseData';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export const Courses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const navigate = useNavigate();
  const { selectCourse, activeCourse } = useAuth();

  const [courses, setCourses] = useState<CourseDetailItem[]>(() => courseService.getAllCourses());
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const domains = ['All', 'Software Development', 'AI/ML', 'Data Science', 'Cloud Computing', 'Cyber Security', 'Web Development', 'Mobile Development', 'DevOps'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Pro'];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (selectedDomain !== 'All') { const text = `${c.title} ${c.category} ${c.domain}`.toLowerCase(); const map: Record<string, RegExp> = { 'Software Development': /software|programming/, 'AI/ML': /ai|machine learning|artificial intelligence/, 'Data Science': /data|analytics/, 'Cloud Computing': /cloud/, 'Cyber Security': /cyber|security/, 'Web Development': /web|frontend|full.?stack/, 'Mobile Development': /mobile|react native/, 'DevOps': /devops|docker|kubernetes/ }; if (!map[selectedDomain]?.test(text)) return false; }
      if (selectedLevel !== 'All' && (selectedLevel === 'Pro' ? !['Pro', 'Advanced'].includes(c.level) : c.level !== selectedLevel)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesCategory = c.category.toLowerCase().includes(q);
        const matchesSkills = c.skillsGained.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesSkills) return false;
      }
      return true;
    });
  }, [courses, selectedDomain, selectedLevel, searchQuery]);

  const handleStartCourse = (course: CourseDetailItem) => {
    selectCourse(course.id);
    setCourses(courseService.getAllCourses());
    navigate('/roadmap');
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span>Curated Course Catalog & Specializations</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Aptitude-Aligned Courses & Curriculum
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
              Explore beginner, intermediate, and pro courses with structured weekly roadmaps, curated video lectures, and capstone project deliverables.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search courses, skills, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-sans"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold shrink-0">
              Domain:
            </span>
            {domains.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDomain(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedDomain === d
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              Level:
            </span>
            {levels.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setSelectedLevel(l)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedLevel === l
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isActive = activeCourse?.id === course.id;
          const isCompleted = course.isCompleted;

          return (
            <div
              key={course.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between space-y-4 backdrop-blur-xl transition-all duration-200 hover:shadow-xl ${
                isActive
                  ? 'bg-slate-900/90 border-sky-500/50 shadow-sky-500/5'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Meta Top */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-purple-300 font-bold">
                    {course.domain}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        course.level === 'Advanced' || course.level === 'Pro'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : course.level === 'Intermediate'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {course.level === 'Advanced' ? 'Pro' : course.level}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[9px] font-mono font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Category */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">
                    {course.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug mt-0.5">
                    {course.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Skills Chips */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    Key Topics:
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

              {/* Footer Progress & CTAs */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    {course.duration} ({course.roadmap?.length || 8} Weeks)
                  </span>
                  <span className="text-sky-400 font-bold">
                    {course.progress || 0}% Progress
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant={isActive ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleStartCourse(course)}
                    className="w-full font-bold text-xs"
                  >
                    {isCompleted ? 'Review Roadmap' : isActive ? 'Resume Roadmap' : 'Start This Course'}
                    <span className="material-symbols-outlined text-xs ml-1">arrow_forward</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
