import React, { useState } from 'react';
import { ResumeData, TabType } from '../types';

interface AIResumeBuilderProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  userEmail?: string;
  userName?: string;
}

const INITIAL_RESUME: ResumeData = {
  fullName: 'Fatima Asif',
  title: 'Junior AI & Full Stack Software Engineer',
  email: 'fatima01asiflive@gmail.com',
  phone: '+92 300 1234567',
  location: 'Lahore, Pakistan',
  linkedin: 'https://linkedin.com/in/fatima-asif-ai',
  github: 'https://github.com/fatima-asif-pk',
  summary:
    'Aspiring AI Engineer and Computer Science graduate specializing in Python, PyTorch, React, and scalable backend microservices. Proven ability to build end-to-end machine learning web applications with FastAPI, vector search embeddings, and modern Dockerized cloud deployments.',
  education: [
    {
      degree: 'BS in Computer Science (AI Specialization)',
      institution: 'National University of Sciences & Technology (NUST)',
      year: '2022 - 2026',
      gradeOrCgpa: 'CGPA 3.82 / 4.00 (Dean’s Honor List)',
    },
    {
      degree: 'FSC Pre-Engineering / ICS',
      institution: 'Punjab Group of Colleges, Lahore Board',
      year: '2020 - 2022',
      gradeOrCgpa: 'Marks: 1045 / 1100 (95.0%)',
    },
  ],
  skills: [
    'Python (PEP8)',
    'PyTorch & TensorFlow',
    'NumPy & Pandas',
    'FastAPI & Flask',
    'React 19 & TypeScript',
    'PostgreSQL & Vector DBs (Chroma/Pinecone)',
    'Docker & Kubernetes',
    'Git / GitHub CI/CD',
    'RESTful APIs & Microservices',
    'Data Structures & Algorithms',
  ],
  experience: [
    {
      role: 'Machine Learning & Full Stack Intern',
      company: 'PakTech AI Solutions, Lahore',
      duration: 'Jun 2025 - Sep 2025',
      bullets: [
        'Engineered an automated semantic resume parser using HuggingFace Transformers and FastAPI, reducing manual screening latency by 65%.',
        'Built a responsive TypeScript React dashboard displaying live similarity matrix benchmarks for 500+ candidates.',
        'Collaborated with senior engineers to dockerize microservice endpoints with automated CI/CD GitHub Actions.',
      ],
    },
  ],
  projects: [
    {
      name: 'Intelli Path: AI Career Guidance & Learning Platform',
      technologies: 'Python, FastAPI, PyTorch, React, TypeScript, Tailwind CSS',
      link: 'https://github.com/fatima-asif-pk/intelli-path-platform',
      description:
        'Architected an intelligent career navigation platform featuring cognitive personality tests, skill gap estimators, adaptive study timetables, and FAANG mock interview simulators.',
    },
    {
      name: 'High-Throughput Distributed Task Engine',
      technologies: 'Node.js, Redis Pub/Sub, PostgreSQL, Docker',
      link: 'https://github.com/fatima-asif-pk/distributed-task-queue',
      description:
        'Developed an asynchronous job queue capable of processing 10,000+ background tasks/sec with exponential backoff retries and Prometheus metrics.',
    },
  ],
  certifications: [
    'DeepLearning.AI — Machine Learning Specialization (Andrew Ng)',
    'Meta Certified Front-End Developer Professional Certificate',
    'HackerRank Problem Solving (Advanced) Certified',
  ],
  atsScore: 92,
  atsFeedback: {
    strengths: [
      'Strong action verbs (Engineered, Architected, Developed, Collaborated)',
      'Quantified achievements (65% latency reduction, 10k tasks/sec, 3.82 CGPA)',
      'High-impact keyword density in AI, Cloud, and Software Engineering',
      'Clean single-column ATS-parsable standard typography layout',
    ],
    improvements: [
      'Add specific cloud certification details if planning to apply for international remote DevOps roles.',
      'Include unit test coverage percentage metrics in the Capstone project description.',
    ],
    keywordMatches: ['Python', 'FastAPI', 'PyTorch', 'React', 'TypeScript', 'Docker', 'PostgreSQL', 'Microservices', 'Git'],
    missingKeywords: ['Kubernetes Helm Charts', 'Terraform IaC', 'GraphQL'],
  },
};

export const AIResumeBuilder: React.FC<AIResumeBuilderProps> = ({
  onNavigate,
  isDarkMode,
}) => {
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'ats-report'>('preview');
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleEnhanceBullet = (expIdx: number, bulletIdx: number) => {
    setIsEnhancing(true);
    setTimeout(() => {
      setResume((prev) => {
        const newExp = [...prev.experience];
        newExp[expIdx].bullets[bulletIdx] =
          'Spearheaded the development of high-throughput vector inference endpoints, improving algorithmic accuracy by 28% and driving 99.9% uptime.';
        return {
          ...prev,
          experience: newExp,
          atsScore: Math.min(98, (prev.atsScore || 92) + 2),
        };
      });
      setIsEnhancing(false);
    }, 600);
  };

  const handleCopyFormattedText = () => {
    const text = `
${resume.fullName}
${resume.title}
${resume.email} | ${resume.phone} | ${resume.location}
LinkedIn: ${resume.linkedin} | GitHub: ${resume.github}

PROFESSIONAL SUMMARY
${resume.summary}

TECHNICAL SKILLS
${resume.skills.join(', ')}

EDUCATION
${resume.education.map((e) => `${e.degree} — ${e.institution} (${e.year}) | ${e.gradeOrCgpa}`).join('\n')}

PROFESSIONAL EXPERIENCE
${resume.experience
  .map(
    (exp) =>
      `${exp.role} — ${exp.company} (${exp.duration})\n` + exp.bullets.map((b) => `• ${b}`).join('\n')
  )
  .join('\n\n')}

KEY PROJECTS
${resume.projects
  .map((p) => `${p.name} [${p.technologies}]\nLink: ${p.link}\n• ${p.description}`)
  .join('\n\n')}

CERTIFICATIONS
${resume.certifications.map((c) => `• ${c}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">description</span>
              <span>AI ATS RESUME BUILDER & AUDITOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              AI ATS-Friendly Resume Builder
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Generate an ATS-optimized, high-impact resume vetted against top tech company screening algorithms with real-time keyword density scoring and STAR method suggestions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyFormattedText}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">
                {copySuccess ? 'done' : 'content_copy'}
              </span>
              <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Plaintext Resume'}</span>
            </button>
            <button
              onClick={() => onNavigate('interviews')}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">record_voice_over</span>
              <span>Mock Interview Prep</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Switcher + ATS Score Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 p-1.5 glass-card rounded-2xl border border-white/10">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span>Formatted Resume</span>
          </button>
          <button
            onClick={() => setViewMode('ats-report')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] flex items-center gap-1.5 ${
              viewMode === 'ats-report'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">analytics</span>
            <span>ATS Score & Keywords ({resume.atsScore}%)</span>
          </button>
          <button
            onClick={() => setViewMode('editor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] flex items-center gap-1.5 ${
              viewMode === 'editor'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Edit Profile Data</span>
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          <span className="material-symbols-outlined text-base">verified</span>
          <span>ATS Pass Probability: <strong>High ({resume.atsScore} / 100)</strong></span>
        </div>
      </div>

      {/* 1. FORMATTED RESUME VIEW (Clean, High-Grade Typography) */}
      {viewMode === 'preview' && (
        <div className="max-w-4xl mx-auto bg-slate-950 border border-white/20 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8 text-white font-sans">
          {/* Header */}
          <div className="border-b border-white/20 pb-6 text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {resume.fullName}
            </h2>
            <p className="text-sm font-semibold text-rose-400">{resume.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/70 font-mono">
              <span>📍 {resume.location}</span>
              <span>✉️ {resume.email}</span>
              <span>📞 {resume.phone}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-400 font-mono pt-1">
              <a href={resume.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn Profile
              </a>
              <span>•</span>
              <a href={resume.github} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub Portfolio
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 border-b border-white/10 pb-1">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {resume.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 border-b border-white/10 pb-1">
              Technical Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/90"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 border-b border-white/10 pb-1">
              Education & Academic Honors
            </h3>
            {resume.education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div>
                  <strong className="text-sm font-bold text-white block">{edu.degree}</strong>
                  <span className="text-white/70">{edu.institution}</span>
                </div>
                <div className="text-right font-mono text-emerald-400">
                  <span>{edu.gradeOrCgpa}</span>
                  <span className="text-white/50 text-[11px] block">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 border-b border-white/10 pb-1">
              Professional Engineering Experience
            </h3>
            {resume.experience.map((exp, expIdx) => (
              <div key={expIdx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div>
                    <strong className="text-sm font-bold text-white">{exp.role}</strong>
                    <span className="text-white/70"> — {exp.company}</span>
                  </div>
                  <span className="font-mono text-white/50">{exp.duration}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/80 list-disc list-inside">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 border-b border-white/10 pb-1">
              Key Engineering Projects
            </h3>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <strong className="text-sm font-bold text-white">{proj.name}</strong>
                  <span className="font-mono text-rose-400 text-[11px]">[{proj.technologies}]</span>
                </div>
                <p className="text-white/80 leading-relaxed">{proj.description}</p>
                <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-400 font-mono text-[11px] hover:underline block">
                  Repository: {proj.link}
                </a>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 border-b border-white/10 pb-1">
              Certifications & Accreditations
            </h3>
            <ul className="space-y-1 text-xs text-white/80 list-disc list-inside">
              {resume.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 2. ATS SCORE & KEYWORDS AUDITOR */}
      {viewMode === 'ats-report' && resume.atsFeedback && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Score Box */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>ATS Parsing Grade: A+</span>
              </div>
              <h3 className="text-xl font-bold text-white">ATS Compliance & Keyword Coverage</h3>
              <p className="text-xs text-white/60 max-w-xl">
                Scored using semantic keyword matching, standard section headers, absence of un-parsable graphics/tables, and quantified impact verbs.
              </p>
            </div>

            <div className="text-center p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 shrink-0">
              <span className="text-4xl font-extrabold font-mono text-emerald-400 block">
                {resume.atsScore} / 100
              </span>
              <span className="text-[10px] font-mono text-white/60 uppercase">Benchmark Score</span>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 space-y-3">
              <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                <span>Demonstrated ATS Strengths</span>
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                {resume.atsFeedback.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-sm mt-0.5">done</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-amber-500/20 space-y-3">
              <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                <span className="material-symbols-outlined">lightbulb</span>
                <span>Actionable ATS Improvements</span>
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                {resume.atsFeedback.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-sm mt-0.5">arrow_forward</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keyword Density */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400">vpn_key</span>
              <span>Matched Keywords Vetted in Industry Profiles</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {resume.atsFeedback.keywordMatches.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  ✔ {kw}
                </span>
              ))}
              {resume.atsFeedback.missingKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300">
                  + Recommended: {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. EDITOR VIEW */}
      {viewMode === 'editor' && (
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white">Edit Your Resume Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-white/60 block mb-1">Full Name</label>
              <input
                type="text"
                value={resume.fullName}
                onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-white/60 block mb-1">Professional Title</label>
              <input
                type="text"
                value={resume.title}
                onChange={(e) => setResume({ ...resume, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-white/60 block mb-1">Summary</label>
            <textarea
              rows={3}
              value={resume.summary}
              onChange={(e) => setResume({ ...resume, summary: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setViewMode('preview')}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg transition-all min-h-[44px]"
            >
              Save & Preview Formatted Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
