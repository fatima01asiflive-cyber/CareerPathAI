import React, { useState } from 'react';
import { UserAccount, TabType } from '../types';
import { CertificateModal } from './CertificateModal';
import { OFFICIAL_DOCUMENTS_DATA, YOUTUBE_PLAYLISTS_DATA } from '../data/learningResources';

interface CoursesListProps {
  user: UserAccount;
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  providerLogo: string;
  field: string;
  rating: number;
  studentsCount: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  certificate: boolean;
  image: string;
  description: string;
  skills: string[];
  enrolled: boolean;
}

const COURSES_DATA: Course[] = [
  {
    id: 'c1',
    title: 'Meta Full-Stack Developer Professional Certificate',
    provider: 'Meta & Coursera',
    providerLogo: 'code',
    field: 'Computer Science & Software Engineering',
    rating: 4.9,
    studentsCount: '142K enrolled',
    duration: '7 Months (5 hrs/week)',
    difficulty: 'Intermediate',
    certificate: true,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Master React, Python, Django, REST APIs, Git, and Databases with real-world hands-on portfolio projects.',
    skills: ['React.js', 'Python', 'Django', 'SQL', 'REST API', 'DevOps'],
    enrolled: true,
  },
  {
    id: 'c2',
    title: 'AWS Certified Solutions Architect Professional Track',
    provider: 'Amazon Web Services (AWS)',
    providerLogo: 'cloud',
    field: 'Cloud Architecture & DevOps',
    rating: 4.8,
    studentsCount: '98K enrolled',
    duration: '4 Months (6 hrs/week)',
    difficulty: 'Advanced',
    certificate: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Design scalable, fault-tolerant, and high-availability cloud applications on AWS infrastructure.',
    skills: ['EC2 & S3', 'Kubernetes', 'Terraform', 'Lambda', 'Serverless', 'CI/CD'],
    enrolled: false,
  },
  {
    id: 'c3',
    title: 'Google Advanced Data Analytics & AI Specialization',
    provider: 'Google Career Certificates',
    providerLogo: 'analytics',
    field: 'Data Science & AI',
    rating: 4.9,
    studentsCount: '210K enrolled',
    duration: '6 Months (4 hrs/week)',
    difficulty: 'Intermediate',
    certificate: true,
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
    description: 'Build predictive machine learning models in Python, perform statistical modeling, and visualize data.',
    skills: ['Python', 'Pandas', 'TensorFlow', 'Scikit-Learn', 'Tableau', 'SQL'],
    enrolled: false,
  },
  {
    id: 'c4',
    title: 'Offensive Security Certified Professional (OSCP) Prep',
    provider: 'OffSec & TryHackMe',
    providerLogo: 'security',
    field: 'Cyber Security',
    rating: 4.9,
    studentsCount: '45K enrolled',
    duration: '5 Months (8 hrs/week)',
    difficulty: 'Advanced',
    certificate: true,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on penetration testing, network exploitation, privilege escalation, and vulnerability auditing.',
    skills: ['Penetration Testing', 'Linux Kernel', 'Metasploit', 'Network Security', 'Wireshark'],
    enrolled: false,
  },
  {
    id: 'c5',
    title: 'Google UX / UI Design & Prototyping Certification',
    provider: 'Google Design',
    providerLogo: 'palette',
    field: 'UX & Product Design',
    rating: 4.8,
    studentsCount: '180K enrolled',
    duration: '5 Months (4 hrs/week)',
    difficulty: 'Beginner',
    certificate: true,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    description: 'Complete user research, wireframing, high-fidelity Figma prototyping, and usability testing.',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    enrolled: false,
  },
];

export const CoursesList: React.FC<CoursesListProps> = ({
  user,
  onNavigate,
  isDarkMode,
}) => {
  const [activeTabSection, setActiveTabSection] = useState<'courses' | 'documents' | 'playlists'>('courses');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enrolledList, setEnrolledList] = useState<string[]>(['c1']);
  const [completedList, setCompletedList] = useState<string[]>(['c1']);
  const [certModalCourse, setCertModalCourse] = useState<{ title: string; provider: string } | null>(null);

  const categories = [
    'All',
    'Computer Science & Software Engineering',
    'Cloud Architecture & DevOps',
    'Data Science & AI',
    'Cyber Security',
    'Mobile App Development',
    'UX & Product Design',
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.field === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredDocs = OFFICIAL_DOCUMENTS_DATA.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.field === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredPlaylists = YOUTUBE_PLAYLISTS_DATA.filter((playlist) => {
    const matchesCategory = selectedCategory === 'All' || playlist.field === selectedCategory;
    const matchesSearch =
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleEnroll = (id: string) => {
    if (enrolledList.includes(id)) {
      setEnrolledList(enrolledList.filter((item) => item !== id));
    } else {
      setEnrolledList([...enrolledList, id]);
    }
  };

  return (
    <div className={`p-3 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[11px] sm:text-xs font-bold">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              <span>LEARNING HUB & RESOURCES</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Skill Courses, Field Documents & YouTube Playlists
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Curated official documentation, basic-to-pro YouTube playlist courses, and job-ready industry certifications tailored to your field.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onNavigate('universities')}
              className="px-3.5 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">school</span>
              <span>Top Universities</span>
            </button>
            <button
              onClick={() => onNavigate('prep')}
              className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">assignment</span>
              <span>Skill Quizzes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Resource Type Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 glass-card rounded-2xl border border-white/10">
        <button
          onClick={() => setActiveTabSection('courses')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTabSection === 'courses'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">auto_stories</span>
          <span>Industry Bootcamps ({COURSES_DATA.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSection('documents')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTabSection === 'documents'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>Field Reading Docs ({OFFICIAL_DOCUMENTS_DATA.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSection('playlists')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            activeTabSection === 'playlists'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-base">play_circle</span>
          <span>YT Playlists: Basic to Pro ({YOUTUBE_PLAYLISTS_DATA.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl sm:rounded-3xl border border-white/10 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
              search
            </span>
            <input
              type="text"
              placeholder={
                activeTabSection === 'courses'
                  ? 'Search courses, skills, providers...'
                  : activeTabSection === 'documents'
                  ? 'Search official docs, whitepapers...'
                  : 'Search YouTube playlists, channels, topics...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 text-sm focus:outline-hidden focus:border-indigo-500 transition-all min-h-[44px]"
            />
          </div>

          <div className="text-xs font-mono text-purple-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>
              {activeTabSection === 'courses' && `${filteredCourses.length} Bootcamps`}
              {activeTabSection === 'documents' && `${filteredDocs.length} Official Reading Guides`}
              {activeTabSection === 'playlists' && `${filteredPlaylists.length} Curated YouTube Playlists`}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] flex items-center ${
                selectedCategory === c
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 1. COURSES TAB */}
      {activeTabSection === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledList.includes(course.id);
            const isCompleted = completedList.includes(course.id);

            const toggleComplete = (id: string) => {
              if (completedList.includes(id)) {
                setCompletedList(completedList.filter((item) => item !== id));
              } else {
                setCompletedList([...completedList, id]);
                setCertModalCourse({ title: course.title, provider: course.provider });
              }
            };

            return (
              <div
                key={course.id}
                className="glass-card rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all group shadow-xl"
              >
                <div>
                  {/* Banner Image */}
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Provider Pill */}
                    <div className="absolute top-3 left-3 bg-indigo-950/80 backdrop-blur-md border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full font-mono font-bold text-xs shadow-md flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">{course.providerLogo}</span>
                      <span>{course.provider}</span>
                    </div>

                    {/* Certificate Tag */}
                    {course.certificate && (
                      <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md text-slate-950 px-2.5 py-1 rounded-full font-mono font-bold text-[10px] shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">workspace_premium</span>
                        <span>Verified Cert</span>
                      </div>
                    )}

                    {/* Rating & Students */}
                    <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white flex justify-between items-center">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        ★ {course.rating}
                      </span>
                      <span className="text-white/60">{course.studentsCount}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-extrabold text-base text-white leading-snug group-hover:text-purple-300 transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      <p className="text-xs text-white/50 font-mono mt-1 flex items-center gap-2">
                        <span>⏱ {course.duration}</span>
                        <span>•</span>
                        <span className="text-indigo-300">{course.difficulty}</span>
                      </p>
                    </div>

                    {/* Completion Status Indicator */}
                    {isCompleted && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">verified</span>
                          <span>Course Completed!</span>
                        </span>
                        <span className="text-[10px] text-amber-300">100% Score</span>
                      </div>
                    )}

                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                        Skills You Learn:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 font-mono text-[10px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleEnroll(course.id)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md min-h-[44px] ${
                        isEnrolled
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isEnrolled ? 'play_circle' : 'add_task'}
                      </span>
                      <span>{isEnrolled ? 'Enrolled' : 'Enroll'}</span>
                    </button>

                    {isEnrolled && (
                      <button
                        onClick={() => toggleComplete(course.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 border min-h-[44px] ${
                          isCompleted
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                            : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isCompleted ? 'check_circle' : 'task_alt'}
                        </span>
                        <span>{isCompleted ? 'Completed' : 'Complete'}</span>
                      </button>
                    )}
                  </div>

                  {/* Generate / View Certificate Button */}
                  {isCompleted && (
                    <button
                      onClick={() => setCertModalCourse({ title: course.title, provider: course.provider })}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs font-mono transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <span className="material-symbols-outlined text-base">workspace_premium</span>
                      <span>View & Download Official Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. FIELD DOCUMENTS TAB */}
      {activeTabSection === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-xl space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase">
                    {doc.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    {doc.publisher}
                  </span>
                  <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-purple-300 transition-colors mt-0.5">
                    {doc.title}
                  </h3>
                </div>

                <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                  {doc.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-white/50">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-indigo-300">
                    ⏱ {doc.readingTime}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-300">
                    🎯 {doc.level}
                  </span>
                </div>
              </div>

              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Read Official Document</span>
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* 3. YOUTUBE PLAYLISTS TAB */}
      {activeTabSection === 'playlists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="glass-card rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-red-500/40 transition-all group shadow-xl"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  {/* Level Tag */}
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white px-3 py-1 rounded-full font-mono font-bold text-[10px] uppercase shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                    <span>{playlist.level}</span>
                  </div>

                  {/* Videos & Duration */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white flex justify-between items-center">
                    <span className="text-amber-300 font-bold">🎬 {playlist.videosCount}</span>
                    <span className="text-white/70">⏳ {playlist.duration}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                      Channel: {playlist.channelName}
                    </span>
                    <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-red-300 transition-colors mt-0.5">
                      {playlist.title}
                    </h3>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                    {playlist.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold">
                      Topics Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {playlist.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 font-mono text-[10px]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <a
                  href={playlist.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs font-mono transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  <span>Watch YouTube Playlist (New Tab)</span>
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {certModalCourse && (
        <CertificateModal
          isOpen={!!certModalCourse}
          onClose={() => setCertModalCourse(null)}
          user={user}
          courseTitle={certModalCourse.title}
          provider={certModalCourse.provider}
        />
      )}
    </div>
  );
};
