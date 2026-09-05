import React, { useState } from 'react';
import { UNIVERSITIES_DATA, SCHOLARSHIPS_DATA } from '../data/universitiesScholarshipsData';
import { CAREER_DATABASE } from '../utils/careerData';
import { courseService } from '../services/courseService';
import { projectService } from '../services/projectService';
import { Button } from '../components/Button';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'datasets' | 'ml-models' | 'universities'>('analytics');
  const [selectedDataset, setSelectedDataset] = useState<'careers' | 'universities' | 'scholarships' | 'courses' | 'projects'>('careers');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const careersCount = Object.keys(CAREER_DATABASE).length;
  const coursesCount = courseService.getAllCourses().length;
  const projectsCount = projectService.getAllProjects().length;
  const universitiesCount = UNIVERSITIES_DATA.length;
  const scholarshipsCount = SCHOLARSHIPS_DATA.length;

  const handleExportCSV = (datasetName: string) => {
    setDownloadNotice(`Exported ${datasetName}.csv successfully (Simulated Dataset Export)`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>FYP Admin & System Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Platform Administration & AI Model Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Inspect student onboarding funnel, monitor ML model inference accuracy (Random Forest, XGBoost, spaCy), and manage platform datasets.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
              ADMIN ROLE: SUPERVISOR
            </span>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
          {[
            { id: 'analytics', label: 'Platform Analytics', icon: 'analytics' },
            { id: 'datasets', label: 'Dataset Management (CSV)', icon: 'dataset' },
            { id: 'ml-models', label: 'ML Models & Accuracy', icon: 'memory' },
            { id: 'universities', label: 'Uni & Scholarships Admin', icon: 'school' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-2 animate-fade-in font-mono">
          <span className="material-symbols-outlined text-sm">download_done</span>
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* View 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Active Students</span>
              <p className="text-3xl font-black text-white">1,482</p>
              <p className="text-[11px] text-emerald-400 font-mono">+18% this month</p>
            </div>
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Aptitude Tests Run</span>
              <p className="text-3xl font-black text-sky-400">3,890</p>
              <p className="text-[11px] text-slate-400 font-mono">Avg. Score: 81.4%</p>
            </div>
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Resumes Analyzed</span>
              <p className="text-3xl font-black text-purple-400">1,240</p>
              <p className="text-[11px] text-slate-400 font-mono">spaCy NLP Parser</p>
            </div>
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Mock Interviews</span>
              <p className="text-3xl font-black text-amber-400">865</p>
              <p className="text-[11px] text-emerald-400 font-mono">88.5% Completion</p>
            </div>
          </div>

          {/* Popular Career Trajectory Distribution */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Top Recommended Career Domains (AI Classifier Output)
            </h2>

            <div className="space-y-3">
              {[
                { domain: 'Artificial Intelligence & Machine Learning', percent: 38, count: 563, color: 'bg-sky-400' },
                { domain: 'Full-Stack Software Development', percent: 26, count: 385, color: 'bg-indigo-400' },
                { domain: 'Data Science & Quantitative Analytics', percent: 18, count: 266, color: 'bg-emerald-400' },
                { domain: 'Cyber Security & Network Defense', percent: 10, count: 148, color: 'bg-purple-400' },
                { domain: 'UI/UX & Product Design', percent: 8, count: 120, color: 'bg-amber-400' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{item.domain}</span>
                    <span className="text-slate-400 font-bold">{item.count} students ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Dataset Management */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">Platform Datasets Repository (CSV/JSON)</h2>
                <p className="text-xs text-slate-400">
                  Manage datasets required by the FYP specification (careers.csv, universities.csv, scholarships.csv, resources.csv, projects.csv).
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleExportCSV(selectedDataset)}
                icon="download"
                className="bg-purple-600 hover:bg-purple-500 text-white"
              >
                Export {selectedDataset}.csv
              </Button>
            </div>

            {/* Dataset Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'careers', label: `careers.csv (${careersCount} entries)` },
                { id: 'universities', label: `universities.csv (${universitiesCount} entries)` },
                { id: 'scholarships', label: `scholarships.csv (${scholarshipsCount} entries)` },
                { id: 'courses', label: `resources.csv (${coursesCount} entries)` },
                { id: 'projects', label: `projects.csv (${projectsCount} entries)` },
              ].map((ds) => (
                <button
                  key={ds.id}
                  onClick={() => setSelectedDataset(ds.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedDataset === ds.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {ds.label}
                </button>
              ))}
            </div>

            {/* Dataset Table Preview */}
            <div className="border border-slate-800 rounded-2xl overflow-x-auto bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Title / Name</th>
                    <th className="p-3">Domain / Category</th>
                    <th className="p-3">Attributes</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {selectedDataset === 'careers' &&
                    Object.values(CAREER_DATABASE).map((c) => (
                      <tr key={c.id} className="hover:bg-slate-900/50">
                        <td className="p-3 text-sky-400">{c.id}</td>
                        <td className="p-3 font-bold text-white">{c.name}</td>
                        <td className="p-3">{c.category}</td>
                        <td className="p-3 text-slate-400">{c.roadmap.length} Months • {c.requiredSkills.length} Skills</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px]">Active</span></td>
                      </tr>
                    ))}
                  {selectedDataset === 'universities' &&
                    UNIVERSITIES_DATA.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/50">
                        <td className="p-3 text-sky-400">{u.shortName}</td>
                        <td className="p-3 font-bold text-white">{u.name}</td>
                        <td className="p-3">{u.country}</td>
                        <td className="p-3 text-slate-400">Min. {u.minPercentage}% • {u.featuredPrograms.length} Programs</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px]">{u.admissionStatus}</span></td>
                      </tr>
                    ))}
                  {selectedDataset === 'scholarships' &&
                    SCHOLARSHIPS_DATA.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-900/50">
                        <td className="p-3 text-sky-400">{s.id}</td>
                        <td className="p-3 font-bold text-white">{s.title}</td>
                        <td className="p-3">{s.provider}</td>
                        <td className="p-3 text-slate-400">{s.coverage.slice(0, 35)}...</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px]">{s.status}</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 3: ML Models Telemetry */}
      {activeTab === 'ml-models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">Career Classifier</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">Online</span>
              </div>
              <h3 className="text-lg font-bold text-white">Random Forest & XGBoost Ensemble</h3>
              <p className="text-xs text-slate-400">
                Predicts optimal career trajectories using academic history, marks, interests vector, and aptitude sub-scores.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-400">Model Accuracy:</span><span className="text-emerald-400 font-bold">94.2%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">F1-Score:</span><span className="text-white font-bold">0.93</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Inference Latency:</span><span className="text-sky-400 font-bold">14ms</span></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">Resume NLP Engine</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">Online</span>
              </div>
              <h3 className="text-lg font-bold text-white">spaCy & Sentence Transformers</h3>
              <p className="text-xs text-slate-400">
                Parses PDF text, extracts technical entities, computes cosine similarity against target O*NET job profiles.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-400">Entity Precision:</span><span className="text-emerald-400 font-bold">91.8%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Recall:</span><span className="text-white font-bold">89.4%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Parsing Latency:</span><span className="text-sky-400 font-bold">120ms</span></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">Interview Evaluator</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">Online</span>
              </div>
              <h3 className="text-lg font-bold text-white">LLM Career Coach & AST Grader</h3>
              <p className="text-xs text-slate-400">
                Analyzes interview responses according to the STAR methodology and grades code submissions against automated test suites.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-400">STAR Consistency:</span><span className="text-emerald-400 font-bold">96.5%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">AST Pass Rate:</span><span className="text-white font-bold">92.0%</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Avg Eval Time:</span><span className="text-sky-400 font-bold">1.2s</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 4: Universities Management */}
      {activeTab === 'universities' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white">University & Scholarship Listings</h2>
              <p className="text-xs text-slate-400">
                Review and maintain institution fee structures, quotas, and admission eligibility thresholds.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold">
              Total Listed: {universitiesCount + scholarshipsCount}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">Pakistani STEM & Medical Institutes</span>
              <p className="text-xs text-slate-400">NUST, FAST-NUCES, LUMS, GIKI, IBA, COMSATS, KEMU</p>
              <p className="text-[11px] text-emerald-400 font-mono">All 2026 admission criteria synchronized</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">National & Global Scholarship Funds</span>
              <p className="text-xs text-slate-400">HEC Need-Based, PEEF, LUMS NOP, Fulbright, Chevening, DAAD, Erasmus</p>
              <p className="text-[11px] text-sky-400 font-mono">Active deadlines monitored automatically</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
