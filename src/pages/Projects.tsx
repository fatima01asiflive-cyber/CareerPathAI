import React, { useState } from 'react';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { CapstoneProject, ProjectSubmission } from '../types';
import { Button } from '../components/Button';
import { notificationService } from '../services/notificationService';
import { COMPUTER_SCIENCE_CATEGORIES } from '../data/pathfinderLearningResources';

export const Projects: React.FC = () => {
  const { roadmapCompletionPercentage, user } = useAuth();
  const [projects, setProjects] = useState<CapstoneProject[]>(() =>
    projectService.getAllProjects()
  );
  const [selectedProject, setSelectedProject] = useState<CapstoneProject | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzingStage, setAnalyzingStage] = useState(0);
  const userInterest = String(user?.interests?.[0] || user?.preferredField || 'Software Development');
  const [categoryFilter, setCategoryFilter] = useState<string>(userInterest);
  const visibleProjects = categoryFilter === 'All' ? projects : projects.filter((project) => project.category === categoryFilter);

  React.useEffect(() => {
    const synced = projectService.syncProjectAssignments(roadmapCompletionPercentage);
    setProjects(synced.projects);
  }, [roadmapCompletionPercentage, user?.id]);

  React.useEffect(() => {
    setCategoryFilter(userInterest);
  }, [user?.id, userInterest]);

  const handleOpenSubmit = (project: CapstoneProject) => {
    const assigned = projectService.ensureProjectAssigned(project.id) || project;
    setProjects(projectService.getAllProjects());
    setSelectedProject(assigned);
    setGithubUrl(assigned.submission?.githubUrl || '');
    setLiveUrl(assigned.submission?.liveUrl || '');
    setNotes(assigned.submission?.notes || '');
  };

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsSubmitting(true);
    setAnalyzingStage(1);

    // Multi-stage AI analysis simulation
    setTimeout(() => setAnalyzingStage(2), 700);
    setTimeout(() => setAnalyzingStage(3), 1400);

    const submission: ProjectSubmission = {
      githubUrl,
      liveUrl,
      notes,
    };

    const graded = await projectService.submitProject(selectedProject.id, submission);
    setProjects(projectService.getAllProjects());
    setSelectedProject(graded);
    setIsSubmitting(false);
    if (graded.feedback) {
      try {
        notificationService.addNotification({
          type: 'project',
          title: `AI project review completed: ${graded.title}`,
          message: `Your ${graded.category} project was scored ${graded.feedback.score}/100. Open Projects to review strengths, weaknesses and next steps.`,
          actionUrl: '/projects',
        });
      } catch {}
    }
  };

  const canStartStage = (_stage?: string) => true;
  const unlockLabel = (_stage?: string) => 'Available';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span>Verified Capstone Project Deliverables</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Assigned Industry Capstones
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
              Projects are assigned by your selected Computer Science category: Beginner after the first 2 months, Intermediate after the applied phase, and a Pro-level <strong className="text-white">Final Project</strong> at the end. Submit both GitHub and deployment links for AI review.
            </p>
          </div>
        </div>
      </div>

      {/* Category filter: every Computer Science domain is available, while the student's interest is selected initially. */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Computer Science Project Domains</p>
            <p className="text-xs text-slate-400 mt-1">Browse Beginner, Intermediate and Pro projects for every CS category.</p>
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full sm:w-64 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500">
            <option value="All">All CS Categories</option>
            {COMPUTER_SCIENCE_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((proj) => {
          const isGraded = proj.status === 'graded';
          const isInProgress = proj.status === 'in_progress';

          return (
            <div
              key={proj.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-5 backdrop-blur-xl hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md font-bold uppercase">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md font-bold uppercase">
                      {proj.stage || proj.difficulty} Project
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isGraded
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isGraded ? 'AI GRADED' : isInProgress ? 'IN PROGRESS' : 'ASSIGNED'}
                  </span>
                </div>

                <div>
                  {!isGraded && <p className="text-[9px] font-black uppercase tracking-widest text-emerald-300 mb-1">UNLOCKED • Open project block anytime</p>}
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-3">{proj.description}</p>
                  {proj.submission?.deadlineAt && proj.status !== 'graded' && (
                    <div className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[10px] text-amber-200">
                      Deadline: <strong>{new Date(proj.submission.deadlineAt).toLocaleString()}</strong>
                    </div>
                  )}
                  {!proj.submission?.deadlineAt && !isGraded && (
                    <div className="mt-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-[10px] text-emerald-200">Open this project to start it. A {proj.deadlineDays}-day deadline will be assigned automatically.
                    </div>
                  )}
                </div>

                {/* Score if graded */}
                {isGraded && proj.feedback && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-mono">AI Architecture Score</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {proj.feedback.score}/100
                    </span>
                  </div>
                )}

                {/* Requirements Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    Key Requirements:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {proj.requirements.slice(0, 3).map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]">
                        <span className="material-symbols-outlined text-xs text-sky-400 shrink-0 mt-0.5">
                          check_small
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 space-y-0.5">
                  <div>Est. {proj.estimatedHours} Hours</div>
                  <div className="text-amber-300">Deadline: {proj.deadlineDays} days after assignment</div>
                </div>
                <Button
                  variant={isGraded ? 'outline' : 'primary'}
                  size="sm"
                  disabled={false}
                  onClick={() => handleOpenSubmit(proj)}
                  icon={isGraded ? 'analytics' : 'cloud_upload'}
                >
                  {isGraded ? 'View AI Review' : 'Open & Submit Project'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission & AI Feedback Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-500/10 px-2.5 py-1 rounded-md font-bold">
                  {selectedProject.category} Capstone
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* If Already Graded -> Show AI Review Feedback */}
            {selectedProject.status === 'graded' && selectedProject.feedback ? (
              <div className="space-y-6">
                {/* Score Summary Box */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      IntelliPath AI Project Evaluation
                    </span>
                    <h3 className="text-base font-bold text-white">AI Industry Review Complete</h3>
                    <p className="text-xs text-slate-400">
                      Rated against industry expectations using the project evidence you submitted. This is an AI review, not a guarantee of production readiness.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center shrink-0">
                    <span className="text-2xl font-black text-emerald-400 font-mono">
                      {selectedProject.feedback.score}
                    </span>
                    <span className="block text-[9px] font-mono text-emerald-300 uppercase">
                      Out of 100
                    </span>
                  </div>
                </div>

                {selectedProject.feedback.marketFitScore !== undefined && (
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                    <div className="flex items-center justify-between"><span className="text-[10px] font-mono text-indigo-300 uppercase font-bold">Market Readiness</span><span className="text-lg font-black text-indigo-300">{selectedProject.feedback.marketFitScore}/100</span></div>
                    <p className="text-xs text-slate-300">{selectedProject.feedback.marketReview}</p>
                  </div>
                )}

                {/* Strengths */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Identified Architecture Strengths</span>
                  </h4>
                  <ul className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    {selectedProject.feedback.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.feedback.weaknesses && selectedProject.feedback.weaknesses.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase font-mono flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">warning</span>
                      <span>Weaknesses to Improve</span>
                    </h4>
                    <ul className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-amber-500/20 text-xs text-slate-300">
                      {selectedProject.feedback.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="text-amber-300 font-bold">•</span><span>{w}</span></li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mistakes / Code Optimization */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-sky-400 uppercase font-mono flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">build</span>
                    <span>Areas for Optimization</span>
                  </h4>
                  <ul className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    {selectedProject.feedback.mistakes.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Portfolio Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase font-mono flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">lightbulb</span>
                    <span>AI Portfolio Suggestions</span>
                  </h4>
                  <ul className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    {selectedProject.feedback.suggestions.map((sug, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end pt-2">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedProject({ ...selectedProject, status: 'in_progress' });
                      }}
                    >
                      Resubmit Project
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close Review
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleConfirmSubmit} className="space-y-4">
                {isSubmitting ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-400 animate-spin mx-auto" />
                    <p className="text-xs font-mono text-indigo-400">
                      {analyzingStage === 1 && 'Validating submission evidence and project requirements...'}
                      {analyzingStage === 2 && 'Comparing the project against industry readiness criteria...'}
                      {analyzingStage === 3 && 'Generating AI score and architectural feedback...'}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300">
                      Submit your repository and deployed link. Our AI Project Evaluator scores the project against industry expectations using the submitted project evidence, category, level, requirements, GitHub repository and deployed URL. It returns a market-readiness rating, strengths, weaknesses and next steps.
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        GitHub Repository URL <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="url"
                        required
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/your-username/project"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Live Deployed URL (Vercel recommended) *
                      </label>
                      <input
                        type="url"
                        required
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://your-project.vercel.app"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Architecture Notes & Key Features
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Describe the state management, database schema, or special algorithms implemented..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProject(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        icon="auto_awesome"
                      >
                        Submit for AI Review
                      </Button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
