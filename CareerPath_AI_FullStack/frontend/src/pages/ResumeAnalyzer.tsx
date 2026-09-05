import React, { useState } from 'react';
import { resumeService, ResumeAnalysisOutput } from '../services/resumeService';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export const ResumeAnalyzer: React.FC = () => {
  const { user, selectedCareer } = useAuth();
  const defaultRole = selectedCareer?.id || 'ai-engineer';

  const [targetRole, setTargetRole] = useState<string>(defaultRole);
  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUME);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisOutput | null>(() =>
    resumeService.analyzeResume(SAMPLE_RESUME, defaultRole)
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setResumeText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = resumeService.analyzeResume(resumeText, targetRole);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1200);
  };

  const roleOptions = [
    { id: 'ai-engineer', label: 'AI & Machine Learning Engineer' },
    { id: 'data-scientist', label: 'Data Scientist & Analytics' },
    { id: 'software-engineer', label: 'Full-Stack Software Engineer' },
    { id: 'cyber-security', label: 'Cyber Security Specialist' },
    { id: 'ui-ux-designer', label: 'UI/UX Product Designer' },
    { id: 'financial-analyst', label: 'Financial Analyst & Quant' },
    { id: 'biomedical-specialist', label: 'Biomedical Specialist' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>FYP NLP Module • spaCy & LLM ATS Parser</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Resume & ATS Optimization Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Inspect your CV against real ATS hiring benchmarks. Scan keyword density, extract section weights, quantify measurable impact, and receive instantaneous AI rewrite suggestions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
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

      {/* Workspace Grid: Input vs Live Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload / Paste Resume */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Resume Document Input
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                {resumeText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            {/* File Dropzone */}
            <label className="border-2 border-dashed border-slate-800 hover:border-sky-500/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/50 group">
              <span className="material-symbols-outlined text-3xl text-slate-500 group-hover:text-sky-400 mb-1 transition-colors">
                upload_file
              </span>
              <p className="text-xs font-bold text-white group-hover:text-sky-400">
                {fileName ? fileName : 'Upload PDF / DOCX / TXT Resume'}
              </p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                spaCy NLP extractor parses text automatically
              </p>
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Resume Text Editor */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-400">
                Or Paste Resume Content Directly:
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={12}
                placeholder="Paste your full resume text here (Summary, Experience, Skills, Education, Projects)..."
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !resumeText.trim()}
              icon="robot_2"
            >
              {isAnalyzing ? 'Analyzing via NLP Engine...' : 'Scan & Analyze Resume ATS'}
            </Button>
          </div>
        </div>

        {/* Right Column: ATS Report & Deep Analytics */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              {/* ATS Score Overview Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        analysisResult.overallScore >= 80
                          ? 'bg-emerald-400'
                          : analysisResult.overallScore >= 65
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                    />
                    <span className="text-slate-300">
                      ATS Verdict: {analysisResult.atsCompatibility}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    Resume Match Score for{' '}
                    <span className="text-sky-400">
                      {roleOptions.find((r) => r.id === targetRole)?.label}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Calculated from keyword overlap, structural formatting, and quantifiable metric density.
                  </p>
                </div>

                {/* Score Dial */}
                <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 shrink-0 text-center w-36 h-36 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">
                    {analysisResult.overallScore}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold mt-0.5">
                    ATS / 100
                  </span>
                  <span className="text-[9px] text-slate-500 mt-1">Industry Passing: 75+</span>
                </div>
              </div>

              {/* Keyword Analysis: Matched vs Missing */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  ATS Keyword Matching Matrix
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matched Keywords */}
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Matched Keywords ({analysisResult.matchedKeywords.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.matchedKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Critical Keywords */}
                  <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold font-mono">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      <span>Missing Critical Keywords ({analysisResult.missingCriticalKeywords.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.missingCriticalKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-rose-500/30 text-[10px] text-rose-300 font-mono"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Breakdown Radar / Bars */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Section-by-Section Quality Breakdown
                </h3>

                <div className="space-y-3">
                  {Object.entries(analysisResult.sectionScores).map(([key, rawVal]) => {
                    const val = Number(rawVal);
                    const formatLabel: Record<string, string> = {
                      contactInfo: 'Contact & Online Profiles',
                      professionalSummary: 'Professional Summary',
                      workExperience: 'Work Experience / Internships',
                      technicalSkills: 'Technical Skills & Keyword Coverage',
                      education: 'Academic Degrees & Grades',
                      projectsAndPortfolio: 'Capstone Projects & Repositories',
                      actionVerbsAndMetrics: 'Quantifiable Metrics & Action Verbs',
                    };
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-300">{formatLabel[key] || key}</span>
                          <span className={val >= 80 ? 'text-emerald-400' : val >= 60 ? 'text-amber-400' : 'text-rose-400'}>
                            {val}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              val >= 80 ? 'bg-emerald-400' : val >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                            }`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Bullet Point Enhancements (STAR Formula) */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-lg">auto_fix_high</span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    AI Bullet Point Optimizer (STAR Formula)
                  </h3>
                </div>

                <div className="space-y-3">
                  {analysisResult.bulletPointFeedback.map((bf, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                          Before (Weak / Passive):
                        </span>
                        <p className="text-xs text-slate-400 italic font-mono">&ldquo;{bf.original}&rdquo;</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                          AI Rewrite (Action Verb + Tech Stack + Metric):
                        </span>
                        <p className="text-xs text-emerald-200 font-medium font-mono leading-relaxed">
                          &ldquo;{bf.suggestion}&rdquo;
                        </p>
                      </div>

                      <p className="text-[11px] text-slate-500 font-mono pt-1">
                        Reason: {bf.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              Upload or paste your resume text on the left to begin ATS analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SAMPLE_RESUME = `Muhammad Ali Khan
Email: ali.khan.dev@gmail.com | Phone: +92 300 1234567 | GitHub: github.com/alikhan | LinkedIn: linkedin.com/in/alikhan
Islamabad, Pakistan

PROFESSIONAL SUMMARY
Motivated Computer Science graduate with hands-on experience developing machine learning applications, deep learning neural networks, and scalable REST API backends. Passionate about applying PyTorch and Transformers to solve high-impact automated document intelligence problems.

EDUCATION
BS in Computer Science | FAST-NUCES Islamabad (2022 - 2026)
CGPA: 3.65 / 4.0 (88% Aggregate)
Relevant Coursework: Data Structures & Algorithms, Deep Learning, Natural Language Processing, Database Systems.

TECHNICAL SKILLS
- Programming Languages: Python, JavaScript, TypeScript, C++, SQL
- Machine Learning & AI: PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, Hugging Face Transformers
- Backend & DevOps: FastAPI, Node.js, Express, Docker, Git, REST API, MongoDB
- Tools: VS Code, Linux, Jupyter Notebook, Postman

EXPERIENCE & PROJECTS
Machine Learning Engineering Intern | TechScale Solutions (Jun 2025 - Aug 2025)
- Engineered automated data preprocessing pipelines in Python, handling over 250,000 tabular and text records.
- Deployed lightweight FastAPI inference endpoints on Docker containers, maintaining sub-150ms response latency.
- Collaborated with senior engineers to benchmark neural model quantization on edge environments.

Automated ATS Resume Analyzer & Recommendation System (Capstone Project)
- Architected an end-to-end NLP document classification pipeline utilizing spaCy entity extraction and Sentence Transformers.
- Generated semantic similarity vector embeddings to match candidate resumes against target job descriptions with 91% precision.
- Built clean responsive React frontend interface with real-time feedback dashboards.
`;
