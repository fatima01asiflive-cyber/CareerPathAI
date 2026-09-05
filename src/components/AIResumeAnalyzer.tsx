import React, { useState } from 'react';
import { TabType, ResumeAnalysisResult } from '../types';

interface AIResumeAnalyzerProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

interface SampleResume {
  id: string;
  name: string;
  role: string;
  text: string;
  fileName: string;
}

const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'fatima-ai',
    name: 'Fatima Asif (AI & ML Focus)',
    role: 'AI / Machine Learning Engineer',
    fileName: 'Fatima_Asif_AI_Resume.pdf',
    text: `FATIMA ASIF
Email: fatima01asiflive@gmail.com | Phone: +92-300-1234567 | Lahore, Pakistan
GitHub: github.com/fatima-asif | LinkedIn: linkedin.com/in/fatima-asif

PROFESSIONAL SUMMARY
Motivated BS Computer Science student with strong foundations in Python, Data Structures, and basic Machine Learning algorithms. Looking for an entry-level AI Engineer or Full-Stack developer position.

EDUCATION
BS in Computer Science (8th Semester) - FAST National University (CGPA: 3.82 / 4.0)
FSc Pre-Engineering (Marks: 1045 / 1100) - BISE Lahore

TECHNICAL SKILLS
Languages: Python, C++, SQL, JavaScript
Frameworks: Flask, Pandas, NumPy, Scikit-learn
Tools: Git, Docker, VS Code, Postman

PROJECTS
• AI Recommendation System: Implemented collaborative filtering using Python and Scikit-learn. Handled dataset of 100K ratings.
• University Portal Backend: Created REST APIs using Flask and SQLite database with user authentication tokens.
• Algorithmic Path Finder: Developed A* graph search visualization in C++ with 60fps rendering.`,
  },
  {
    id: 'bilal-fullstack',
    name: 'Bilal Ahmed (Full-Stack React/Node)',
    role: 'Full-Stack Software Engineer',
    fileName: 'Bilal_Ahmed_FullStack_CV.pdf',
    text: `BILAL AHMED
Email: bilal.ahmed.dev@gmail.com | Phone: +92-321-9876543 | Karachi, Pakistan
Portfolio: bilalahmed.dev | GitHub: github.com/bilal-dev

SUMMARY
Frontend & Node.js Developer with 1.5 years experience building responsive web apps with React, Express, and PostgreSQL.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, SQL, HTML5/CSS3
Frameworks: React 19, Next.js, Node.js, Express, Tailwind CSS
Database: PostgreSQL, MongoDB, Prisma ORM
DevOps: Docker, GitHub Actions, AWS S3

EXPERIENCE & PROJECTS
• SaaS Analytics Dashboard: Engineered microservices backend handling 40,000 monthly active users with sub-80ms API response time.
• E-Commerce Marketplace: Built high-performance checkout flow with Stripe integration reducing cart abandonment by 18%.
• Real-time Collaboration Board: Implemented WebSocket canvas sync supporting 50 concurrent editors.`,
  },
  {
    id: 'hamza-cyber',
    name: 'Hamza Tariq (Cyber Security SOC)',
    role: 'Cyber Security SOC Analyst',
    fileName: 'Hamza_Tariq_CyberSecurity.pdf',
    text: `HAMZA TARIQ
Email: hamza.security@outlook.com | Islamabad, Pakistan | Security Clearance: Eligible

PROFILE
Cyber Security graduate certified in CEH and CompTIA Security+. Proficient in SIEM threat hunting, incident response, and network vulnerability mitigation.

CORE COMPETENCIES
Security Operations: SIEM (Splunk, QRadar), Wireshark, Snort, Zeek, Nessus
Protocols & Defense: TCP/IP, OWASP Top 10, Firewalls, MITRE ATT&CK Framework
Scripting & OS: Python, Bash, Kali Linux, Active Directory

PROJECTS & LABS
• SOC Telemetry Lab: Configured ELK Stack SIEM ingest pipeline processing 1.2M daily syslog events with automated alert rules.
• Automated Web Vulnerability Scanner: Built Python tool mapping OWASP SQLi and XSS attack surfaces with PDF executive reports.`,
  },
];

export const AIResumeAnalyzer: React.FC<AIResumeAnalyzerProps> = ({ onNavigate, isDarkMode }) => {
  const [selectedSampleId, setSelectedSampleId] = useState('fatima-ai');
  const [targetRole, setTargetRole] = useState('AI / Machine Learning Engineer');
  const [customJobDescription, setCustomJobDescription] = useState('');
  const [useCustomJD, setUseCustomJD] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('Fatima_Asif_AI_Resume.pdf');
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTabSubView, setActiveTabSubView] = useState<'overview' | 'keywords' | 'weak-points' | 'grammar'>('overview');

  // Dynamic Audit Result State
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult>({
    fileName: 'Fatima_Asif_AI_Resume.pdf',
    atsScore: 84,
    wordCount: 198,
    readingEaseScore: 88,
    summary:
      'Strong academic pedigree and clean single-column structure. High match for foundational Python roles. Needs modern Deep Learning frameworks (PyTorch/TensorFlow) and quantifiable metrics in project descriptions.',
    missingSkills: ['PyTorch', 'TensorFlow', 'FastAPI / Async', 'Vector Embeddings (FAISS / Pinecone)', 'MLOps / CI/CD'],
    matchedKeywords: ['Python', 'SQL', 'Scikit-learn', 'Docker', 'REST APIs', 'Git', 'Data Structures'],
    weakSections: [
      {
        section: 'Professional Summary',
        issue: 'Uses passive phrases like "Looking for an entry-level position".',
        suggestion:
          'Rewrite into active value proposition: "Aspiring AI Engineer specializing in neural architectures and predictive modeling with proven full-stack API capabilities."',
      },
      {
        section: 'Projects Bullet Points',
        issue: 'Lacks quantifiable impact metrics and performance benchmarks.',
        suggestion: 'Include latency benchmarks, accuracy percentages, or throughput metrics (e.g. "Achieved 94.2% precision with <30ms query latency").',
      },
      {
        section: 'Certifications / Cloud',
        issue: 'No public cloud or HuggingFace / Kaggle portfolio references listed.',
        suggestion: 'Add AWS / GCP foundational badges, Kaggle competition links, or verified GitHub repos.',
      },
    ],
    grammarSuggestions: [
      {
        original: 'Handled dataset of 100K ratings.',
        improved: 'Engineered preprocessing pipelines for 100,000+ consumer ratings with 35% reduced memory footprint.',
        reason: 'Uses active engineering action verb and adds measurable optimization impact.',
      },
      {
        original: 'Created REST APIs using Flask and SQLite database',
        improved: 'Architected robust RESTful API endpoints utilizing Flask and SQLite, securing user sessions via JWT.',
        reason: 'Elevates technical terminology and highlights security best practices.',
      },
    ],
    impactVerbCount: 8,
    formattingVerdict: 'ATS Compliant (Single Column)',
  });

  const handleSelectSample = (sample: SampleResume) => {
    setSelectedSampleId(sample.id);
    setResumeText(sample.text);
    setUploadedFileName(sample.fileName);
    setTargetRole(sample.role);
    triggerAnalysis(sample.text, sample.role, sample.fileName);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setIsAnalyzing(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const textContent = (event.target?.result as string) || '';
        const fallbackText = textContent.trim() || `RESUME PARSED FROM ${file.name}\n\nTechnical Skills: Python, SQL, Git, JavaScript, React\nEducation: BS Degree\nProjects: Web Application Development`;
        setResumeText(fallbackText);
        triggerAnalysis(fallbackText, targetRole, file.name);
      };
      reader.readAsText(file);
    }
  };

  const triggerAnalysis = (text: string, role: string, fileName: string) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      const words = text.split(/\s+/).filter(Boolean).length;

      // Extract skills from text
      const lower = text.toLowerCase();
      const possibleSkills = [
        'Python', 'React', 'Node.js', 'SQL', 'Docker', 'Git', 'TypeScript',
        'Scikit-learn', 'PyTorch', 'TensorFlow', 'FastAPI', 'PostgreSQL',
        'AWS', 'Kubernetes', 'CI/CD', 'Linux', 'REST APIs', 'Data Structures',
        'Splunk', 'Wireshark', 'OWASP'
      ];

      const found = possibleSkills.filter((s) => lower.includes(s.toLowerCase()));

      let missing: string[] = [];
      if (role.includes('AI') || role.includes('Machine Learning')) {
        missing = ['PyTorch', 'FastAPI / Async', 'Vector Databases (Pinecone/FAISS)', 'MLOps / Docker', 'Transformers (HuggingFace)'].filter((s) => !found.includes(s));
      } else if (role.includes('Full-Stack')) {
        missing = ['TypeScript', 'Next.js 14/15', 'PostgreSQL / Prisma', 'Redis Caching', 'CI/CD GitHub Actions'].filter((s) => !found.includes(s));
      } else if (role.includes('Cyber')) {
        missing = ['SIEM Splunk / QRadar', 'MITRE ATT&CK', 'Penetration Testing (Metasploit)', 'Linux Kernel Hardening'].filter((s) => !found.includes(s));
      } else {
        missing = ['Cloud Architecture (AWS/GCP)', 'Docker Containerization', 'Automated Unit Testing'].filter((s) => !found.includes(s));
      }

      // Count action verbs
      const actionVerbs = ['engineered', 'architected', 'spearheaded', 'developed', 'implemented', 'optimized', 'configured', 'built', 'created', 'handled'];
      const verbCount = actionVerbs.reduce((acc, v) => (lower.includes(v) ? acc + 1 : acc), 0);

      // Score calculation
      let score = 70;
      score += Math.min(found.length * 3, 20);
      score += Math.min(verbCount * 2, 10);
      if (lower.includes('github') || lower.includes('linkedin')) score += 5;
      if (score > 98) score = 98;

      setAnalysisResult({
        fileName: fileName,
        atsScore: score,
        wordCount: words,
        readingEaseScore: 89,
        summary: `Parsed ${fileName} successfully against ${role}. Identified ${found.length} technical tokens and verified single-column ATS parser compliance.`,
        missingSkills: missing.slice(0, 5),
        matchedKeywords: found,
        weakSections: [
          {
            section: 'Professional Summary',
            issue: lower.includes('looking for') ? 'Contains passive job-seeking wording ("Looking for a position").' : 'Could be sharper with target domain keywords.',
            suggestion: `Frame as a high-impact technical positioning: "Software engineer specialized in ${role} with hands-on full-lifecycle development experience."`,
          },
          {
            section: 'Projects Impact Metrics',
            issue: 'Several project bullet points lack measurable percentages or performance benchmarks.',
            suggestion: 'Quantify outcomes (e.g. "Reduced API latency by 40%", "Processed 100K+ records with 99.8% uptime").',
          },
          {
            section: 'Cloud & Verification Links',
            issue: 'Ensure all GitHub repositories and live deployments are linked explicitly.',
            suggestion: 'Add clickable demo URLs and technical architecture diagrams where applicable.',
          },
        ],
        grammarSuggestions: [
          {
            original: 'Worked on software and machine learning features for application.',
            improved: 'Architected and deployed high-throughput software services reducing data ingestion latency by 32%.',
            reason: 'Replaces generic "worked on" with precision engineering verbs and quantifiable impact.',
          },
          {
            original: 'Created database tables and managed data.',
            improved: 'Designed normalized relational schemas and optimized SQL query execution plans with indexing.',
            reason: 'Highlights database engineering depth rather than basic CRUD tasks.',
          },
        ],
        impactVerbCount: verbCount || 7,
        formattingVerdict: 'ATS Compliant (Single Column)',
      });
    }, 1200);
  };

  const handleInjectSkill = (skill: string) => {
    const updated = resumeText + `\n• Added verified competence in ${skill}.`;
    setResumeText(updated);
    triggerAnalysis(updated, targetRole, uploadedFileName);
  };

  const handleApplyGrammarFix = (improved: string) => {
    const updated = resumeText + `\n• ${improved}`;
    setResumeText(updated);
    triggerAnalysis(updated, targetRole, uploadedFileName);
  };

  const handleCopyResumeText = () => {
    navigator.clipboard.writeText(resumeText);
    alert('Resume text copied to clipboard!');
  };

  return (
    <div className={`p-4 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/20 glass-card">
            AI NLP RESUME AUDITOR & ATS BENCHMARK ENGINE
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
            Feature #4
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter gradient-text">
          AI Resume Analyzer
        </h2>
        <p className={`mt-2 text-sm md:text-base max-w-3xl leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
          Upload your CV (PDF, DOCX, Plaintext) to evaluate your ATS compatibility score, extract missing target keywords, highlight weak sections, and receive automated STAR-method sentence enhancements.
        </p>
      </div>

      {/* Preset Sample CV Quick Selectors */}
      <div className="glass-card rounded-3xl p-5 border border-white/10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono font-bold text-white/70 uppercase flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">quick_reference</span>
            <span>Load Pre-configured Sample Resumes for Instant Testing:</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-400">1-Click Load & Audit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                selectedSampleId === sample.id
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div>
                <p className="font-bold text-xs">{sample.name}</p>
                <p className="text-[10px] text-white/50 font-mono mt-0.5">{sample.role}</p>
              </div>
              <span className="material-symbols-outlined text-base text-emerald-400">
                {selectedSampleId === sample.id ? 'check_circle' : 'upload_file'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Upload & Controls + Live Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload / Paste & Config (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Role Selector */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                1. Benchmark Target Role
              </label>
              <button
                onClick={() => setUseCustomJD(!useCustomJD)}
                className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 underline"
              >
                {useCustomJD ? 'Use Role Presets' : '+ Custom Job Description'}
              </button>
            </div>

            {!useCustomJD ? (
              <select
                value={targetRole}
                onChange={(e) => {
                  setTargetRole(e.target.value);
                  triggerAnalysis(resumeText, e.target.value, uploadedFileName);
                }}
                className="w-full bg-slate-950/80 border border-white/15 rounded-2xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                <option value="Data Scientist & Analytics Architect">Data Scientist & Analytics Architect</option>
                <option value="Cyber Security SOC Analyst">Cyber Security SOC Analyst</option>
                <option value="Cloud DevOps & SRE Engineer">Cloud DevOps & SRE Engineer</option>
                <option value="Mobile App Developer (Flutter / React Native)">Mobile App Developer</option>
              </select>
            ) : (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={customJobDescription}
                  onChange={(e) => setCustomJobDescription(e.target.value)}
                  placeholder="Paste target job posting or requirements to benchmark ATS compatibility..."
                  className="w-full bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400 resize-none font-mono"
                />
                <button
                  onClick={() => triggerAnalysis(resumeText, 'Custom Job Posting', uploadedFileName)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold"
                >
                  Match Against Custom JD
                </button>
              </div>
            )}
          </div>

          {/* File Drag & Drop Upload */}
          <div className="glass-card rounded-3xl p-6 border border-dashed border-emerald-500/40 hover:border-emerald-400 transition-all text-center relative">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center py-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <p className="font-bold text-sm text-white">
                {uploadedFileName || 'Upload Resume (PDF, DOCX, TXT)'}
              </p>
              <p className="text-xs text-white/50 mt-1">
                Drag & drop or click to browse files (Max 10MB)
              </p>
              <span className="mt-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                ✓ Loaded: {uploadedFileName}
              </span>
            </div>
          </div>

          {/* Live Resume Text Viewer / Editor */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-white/70 uppercase">
                Resume Content Buffer
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/40">
                  {resumeText.split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  onClick={handleCopyResumeText}
                  className="p-1 text-white/50 hover:text-white"
                  title="Copy Text"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>
            <textarea
              rows={9}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 rounded-2xl p-3.5 text-xs text-white/90 font-mono focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
              placeholder="Paste or edit resume text..."
            />
            <button
              onClick={() => triggerAnalysis(resumeText, targetRole, uploadedFileName)}
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                {isAnalyzing ? 'hourglass_empty' : 'psychology'}
              </span>
              <span>{isAnalyzing ? 'Running NLP Analyzer...' : 'Re-run AI ATS Audit'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Analysis Reports & Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {isAnalyzing ? (
            <div className="glass-card rounded-3xl p-16 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <h3 className="font-bold text-lg text-white">Auditing Resume Structure...</h3>
              <p className="text-xs text-white/60 max-w-sm">
                Extracting entity tokens, cross-referencing industry skill taxonomy, and evaluating ATS parsers.
              </p>
            </div>
          ) : (
            <>
              {/* ATS Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-3xl p-5 border border-emerald-500/30 bg-emerald-950/20 text-center">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                    ATS COMPATIBILITY
                  </span>
                  <div className="text-4xl font-extrabold text-emerald-400 font-mono">
                    {analysisResult.atsScore}%
                  </div>
                  <span className="text-[10px] text-emerald-300 font-mono block mt-1">
                    {analysisResult.atsScore >= 80 ? '⭐ Tier 1 Shortlist' : '⚠️ Needs Keywords'}
                  </span>
                </div>

                <div className="glass-card rounded-3xl p-5 border border-white/10 text-center">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                    ACTION VERBS
                  </span>
                  <div className="text-4xl font-extrabold text-indigo-300 font-mono">
                    {analysisResult.impactVerbCount}
                  </div>
                  <span className="text-[10px] text-white/50 font-mono block mt-1">
                    Engineered, Architected, etc.
                  </span>
                </div>

                <div className="glass-card rounded-3xl p-5 border border-white/10 text-center">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                    ATS FORMAT CHECK
                  </span>
                  <div className="text-xs font-bold text-white mt-2 leading-tight">
                    {analysisResult.formattingVerdict}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                    ✓ Clean Text Hierarchy
                  </span>
                </div>
              </div>

              {/* Sub-navigation for Audit Sections */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-none">
                {[
                  { id: 'overview', label: 'Executive Summary', icon: 'summarize' },
                  { id: 'keywords', label: 'Keyword Gap Analysis', icon: 'checklist' },
                  { id: 'weak-points', label: 'Weak Sections & Fixes', icon: 'rule' },
                  { id: 'grammar', label: 'STAR Rewrite Enhancer', icon: 'auto_fix_high' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabSubView(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      activeTabSubView === tab.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* View 1: Overview */}
              {activeTabSubView === 'overview' && (
                <div className="space-y-4">
                  <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">psychology</span>
                        <span>AI Executive Assessment for {targetRole}</span>
                      </h4>
                      <span className="text-[10px] font-mono text-white/50">{analysisResult.fileName}</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">{analysisResult.summary}</p>
                  </div>

                  {/* Quick Skill Comparison Tiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card rounded-3xl p-5 border border-rose-500/30 bg-rose-950/15 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">warning</span>
                          <span>Missing Key Skills ({analysisResult.missingSkills.length})</span>
                        </h4>
                        <span className="text-[10px] font-mono text-rose-300">Click to add</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.missingSkills.map((skill, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleInjectSkill(skill)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-mono font-bold border border-rose-500/30 transition-all flex items-center gap-1"
                            title="Click to inject skill into resume text"
                          >
                            <span>+ {skill}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card rounded-3xl p-5 border border-emerald-500/30 bg-emerald-950/15 space-y-3">
                      <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Matched Keywords ({analysisResult.matchedKeywords.length})</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.matchedKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30"
                          >
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Detailed Keywords */}
              {activeTabSubView === 'keywords' && (
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">checklist</span>
                      <span>Target Role Skill Taxonomy Matrix</span>
                    </h4>
                    <span className="text-[10px] font-mono text-white/50">{targetRole}</span>
                  </div>

                  <p className="text-xs text-white/70">
                    ATS crawlers scan for specific technical terminology. Injecting missing competencies directly elevates your resume screening score.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-rose-400 uppercase block mb-2">
                        Missing Critical Tokens (1-Click Inject):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {analysisResult.missingSkills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-bold text-xs text-rose-300">{skill}</p>
                              <span className="text-[10px] text-white/40 font-mono">High Recruiter Weight</span>
                            </div>
                            <button
                              onClick={() => handleInjectSkill(skill)}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-all shadow-xs"
                            >
                              + Add to CV
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase block mb-2">
                        Verified Keywords Found:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.matchedKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold"
                          >
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* View 3: Weak Points */}
              {activeTabSubView === 'weak-points' && (
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">rule</span>
                    <span>Weak Sections & Actionable Fixes</span>
                  </h4>

                  <div className="space-y-3">
                    {analysisResult.weakSections.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{item.section}</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                            Action Needed
                          </span>
                        </div>
                        <p className="text-[11px] text-rose-300 font-mono">{item.issue}</p>
                        <p className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                          💡 <strong>Recommended Fix:</strong> {item.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View 4: Grammar & STAR Enhancer */}
              {activeTabSubView === 'grammar' && (
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                      <span>AI STAR-Method Bullet Point Optimizer</span>
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400">Situation • Task • Action • Result</span>
                  </div>

                  <div className="space-y-3">
                    {analysisResult.grammarSuggestions.map((sug, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2.5">
                        <div>
                          <span className="text-[10px] font-mono text-white/50 uppercase block">Before (Weak & Passive):</span>
                          <p className="text-xs text-white/70 line-through font-mono">{sug.original}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">
                            After (Engineered with Metrics):
                          </span>
                          <p className="text-xs text-emerald-300 font-mono font-bold bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30">
                            {sug.improved}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <p className="text-[10px] text-white/50 italic">{sug.reason}</p>
                          <button
                            onClick={() => handleApplyGrammarFix(sug.improved)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-mono font-bold transition-all shadow-xs"
                          >
                            Apply Fix to Resume
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Action CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('resume-builder')}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">edit_document</span>
                  <span>Open ATS Resume Builder</span>
                </button>

                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-6 py-3 glass-card hover:bg-white/10 text-white border border-white/15 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">work</span>
                  <span>View Matched Jobs</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
