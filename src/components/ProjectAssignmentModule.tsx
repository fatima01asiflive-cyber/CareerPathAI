import React, { useState } from 'react';
import { CAPSTONE_PROJECTS_DATA } from '../data/careerEcosystemData';
import { CapstoneProject, TabType } from '../types';

interface ProjectAssignmentModuleProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
}

export const ProjectAssignmentModule: React.FC<ProjectAssignmentModuleProps> = ({
  onNavigate,
  isDarkMode,
}) => {
  const [projects, setProjects] = useState<CapstoneProject[]>(CAPSTONE_PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState<CapstoneProject>(projects[0]);
  const [submissionRepo, setSubmissionRepo] = useState<string>('');
  const [submissionNotes, setSubmissionNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const handleOpenSubmit = (project: CapstoneProject) => {
    setSelectedProject(project);
    setSubmissionRepo(project.submission?.githubUrl || project.submissionRepo || 'https://github.com/my-username/' + project.id);
    setSubmissionNotes(project.submission?.notes || project.submissionNotes || 'Implemented async FastAPI endpoints, added Docker Compose, and included pytest test suite with 92% coverage.');
    setShowSubmitModal(true);
  };

  const handleEvaluateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const feedback = {
        codeQualityScore: 94,
        architectureScore: 91,
        documentationScore: 96,
        strengths: [
          'Clean async function signatures with strict Pydantic type validation',
          'Production-ready multi-stage Dockerfile optimizing image footprint to <180MB',
          'Comprehensive README with architecture diagram, endpoint curl samples, and clear setup steps',
        ],
        improvements: [
          'Add rate-limiting middleware to protect public inference endpoints from burst traffic',
          'Introduce automated integration test runs inside GitHub Actions CI pipeline',
        ],
        verdict: 'Approved • High Distinction (Grade A+)',
      };

      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== selectedProject.id) return p;
          return {
            ...p,
            submitted: true,
            submissionRepo,
            submissionNotes,
            score: 93,
            aiFeedback: feedback,
          };
        })
      );

      setSelectedProject((prev) => ({
        ...prev,
        submitted: true,
        submissionRepo,
        submissionNotes,
        score: 93,
        aiFeedback: feedback,
      }));

      setIsSubmitting(false);
      setShowSubmitModal(false);
    }, 1200);
  };

  return (
    <div className={`p-4 sm:p-6 md:p-8 max-w-[1280px] mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Top Banner */}
      <div className="rounded-2xl sm:rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border border-violet-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">assignment</span>
              <span>AI CAPSTONE & RUBRIC EVALUATOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Project Assignment & Evaluation Module
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Real-world portfolio capstones with strict industry evaluation rubrics: Code Quality, UI/UX, Documentation, GitHub Best Practices, and Automated AI Feedback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('resume-builder')}
              className="px-4 py-2.5 glass-card border border-white/15 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">description</span>
              <span>Resume Builder</span>
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-base">alt_route</span>
              <span>Career Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="glass-card rounded-3xl p-6 border border-white/15 hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-5 group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-[10px] font-bold">
                    {proj.difficulty}
                  </span>
                  {proj.submitted ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-mono font-bold text-xs">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Graded: {proj.score}%</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 font-mono text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">timer</span>
                      <span>{proj.durationDays} Days Duration</span>
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">
                    {proj.field}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors mt-0.5">
                    {proj.title}
                  </h3>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Evaluation Rubric Breakdown */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-[11px]">
                  <span className="font-mono text-violet-300 font-bold block uppercase text-[10px]">
                    Evaluation Criteria
                  </span>
                  <p className="text-white/80">• <strong>Code Quality:</strong> {proj.rubric.codeQuality}</p>
                  <p className="text-white/80">• <strong>UI / UX:</strong> {proj.rubric.uiUx}</p>
                  <p className="text-white/80">• <strong>Documentation:</strong> {proj.rubric.documentation}</p>
                  <p className="text-white/80">• <strong>GitHub:</strong> {proj.rubric.githubRepo}</p>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {proj.submitted && proj.aiFeedback ? (
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                      <strong className="block">{proj.aiFeedback.verdict}</strong>
                      <p className="text-[11px] text-white/80">
                        Code Quality: {proj.aiFeedback.codeQualityScore}% • Architecture: {proj.aiFeedback.architectureScore}%
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenSubmit(proj)}
                      className="w-full py-2.5 rounded-xl glass-card border border-white/20 hover:bg-white/10 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[40px]"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>Review Submission & Feedback</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenSubmit(proj)}
                    className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    <span>Submit Project for AI Evaluation</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-violet-500/40 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">
                  AI Rubric Evaluation
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Submit: {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEvaluateSubmission} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-white/70 block mb-1">
                  GitHub Repository URL *
                </label>
                <input
                  type="url"
                  required
                  value={submissionRepo}
                  onChange={(e) => setSubmissionRepo(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-white/70 block mb-1">
                  Project Notes, Architecture Highlights & Test Coverage
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Describe your implementation, tests written, performance benchmarks, and any trade-offs..."
                  className="w-full px-4 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-white/70">
                <span className="font-mono text-violet-300 font-bold block">
                  Automated Evaluation Parameters:
                </span>
                <p>• PEP8 / ESLint Code Structure & Async Patterns</p>
                <p>• Architecture Decoupling & Error Resilience</p>
                <p>• Documentation Readability & GitHub Actions Workflow</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 text-xs font-mono text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-violet-600/30 transition-all flex items-center gap-2 min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                      <span>AI Reviewing Submission...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">verified</span>
                      <span>Run AI Rubric Evaluation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
