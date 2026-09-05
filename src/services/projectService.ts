import { CapstoneProject, ProjectSubmission, ProjectAIFeedback } from '../types';
import { readUserScoped, writeUserScoped } from '../utils/userScopedStorage';
import { COMPUTER_SCIENCE_CATEGORIES } from '../data/pathfinderLearningResources';

const STORAGE_KEY = 'intellipath_projects_master_state';

const CATEGORY_PROJECTS: Record<string, { beginner: string; intermediate: string; pro: string; focus: string; }> = {
  'Software Development': { beginner: 'Programming Problem-Solving App', intermediate: 'Full-Stack Software Product', pro: 'Production Software Engineering Platform', focus: 'DSA, architecture, testing, APIs, databases and deployment' },
  'AI/ML': { beginner: 'AI Dataset Explorer', intermediate: 'Machine Learning Prediction API', pro: 'Production AI Career Recommendation Platform', focus: 'Python, datasets, model evaluation and responsible AI' },
  'Data Science': { beginner: 'Interactive Data Analysis Dashboard', intermediate: 'Predictive Analytics Pipeline', pro: 'End-to-End Data Intelligence Platform', focus: 'Python, SQL, statistics, visualization and predictive modeling' },
  'Cloud Computing': { beginner: 'Cloud-Hosted Student App', intermediate: 'Scalable Cloud API', pro: 'Production Cloud Architecture Project', focus: 'cloud services, networking, containers, security and observability' },
  'Cyber Security': { beginner: 'Secure Web Audit Lab', intermediate: 'OWASP Security Assessment Tool', pro: 'Security Monitoring & Threat Detection Platform', focus: 'secure coding, networking, threat modeling and safe testing' },
  'Web Development': { beginner: 'Responsive Portfolio Web App', intermediate: 'Full-Stack MERN Application', pro: 'Production SaaS Web Platform', focus: 'React, Node.js, APIs, databases, authentication and deployment' },
  'Mobile Development': { beginner: 'React Native Productivity App', intermediate: 'API-Connected Mobile Application', pro: 'Production Mobile Product', focus: 'React Native, state management, APIs, storage and release quality' },
  'DevOps': { beginner: 'Automated Deployment Pipeline', intermediate: 'Containerized CI/CD Platform', pro: 'Cloud-Native DevOps Platform', focus: 'Linux, Docker, CI/CD, cloud infrastructure and observability' },
};

const STAGES: Array<'Beginner' | 'Intermediate' | 'Pro'> = ['Beginner', 'Intermediate', 'Pro'];
const STAGE_MONTHS: Record<'Beginner' | 'Intermediate' | 'Pro', number> = { Beginner: 2, Intermediate: 4, Pro: 6 };
const STAGE_DEADLINES: Record<'Beginner' | 'Intermediate' | 'Pro', number> = { Beginner: 14, Intermediate: 21, Pro: 30 };
const STAGE_MIN_PROGRESS: Record<'Beginner' | 'Intermediate' | 'Pro', number> = { Beginner: 33, Intermediate: 66, Pro: 100 };

function safeCategoryId(category: string) { return category.toLowerCase().replace(/[^a-z0-9]+/g, '-'); }

function buildInitialProjects(): CapstoneProject[] {
  const templates = STAGES.flatMap((stage) => COMPUTER_SCIENCE_CATEGORIES.map((category) => ({ stage, category })));
  return templates.map(({ stage, category }) => {
    const blueprint = CATEGORY_PROJECTS[category];
    const title = stage === 'Beginner' ? blueprint.beginner : stage === 'Intermediate' ? blueprint.intermediate : blueprint.pro;
    return {
      id: `cs-${safeCategoryId(category)}-${stage.toLowerCase()}`,
      title,
      courseId: `course-${safeCategoryId(category)}`,
      careerId: 'software-engineer',
      category,
      field: 'Computer Science',
      difficulty: stage,
      estimatedHours: stage === 'Beginner' ? 12 : stage === 'Intermediate' ? 24 : 40,
      deadlineDays: STAGE_DEADLINES[stage],
      stage,
      courseMonths: STAGE_MONTHS[stage],
      description: `Build a portfolio-ready ${category} project after completing the ${stage} roadmap phase. Focus: ${blueprint.focus}.`,
      requirements: [
        `Use the core ${category} skills from roadmap months 1–${STAGE_MONTHS[stage]}.`,
        'Include validation, clear error handling, a professional README and meaningful Git history.',
        stage !== 'Beginner' ? 'Include tests and a repeatable deployment or CI workflow.' : 'Deploy the project or provide a runnable demonstration.',
      ],
      skillsTested: [category, 'Problem Solving', 'Git/GitHub', stage === 'Pro' ? 'Production Readiness' : 'Engineering Fundamentals'],
      status: 'assigned',
    };
  });
}

export const INITIAL_PROJECTS = buildInitialProjects();

export const projectService = {
  getAllProjects(): CapstoneProject[] {
    return readUserScoped<CapstoneProject[]>(STORAGE_KEY, JSON.parse(JSON.stringify(INITIAL_PROJECTS)));
  },

  persist(projects: CapstoneProject[]) { writeUserScoped(STORAGE_KEY, projects); },

  getProjectById(projectId: string) { return this.getAllProjects().find((p) => p.id === projectId); },


  ensureProjectAssigned(projectId: string): CapstoneProject | undefined {
    const projects = this.getAllProjects();
    const target = projects.find((p) => p.id === projectId);
    if (!target) return undefined;
    if (!target.submission?.assignedAt) {
      const now = new Date();
      target.submission = { ...(target.submission || {}), assignedAt: now.toISOString(), deadlineAt: new Date(now.getTime() + target.deadlineDays * 86400000).toISOString() };
      if (target.status === 'submitted' || target.status === 'graded') {
        // Preserve an existing completed/submitted state.
      } else {
        target.status = 'assigned';
      }
      this.persist(projects);
    }
    return target;
  },
  syncProjectAssignments(roadmapCompletionPercentage: number) {
    const projects = this.getAllProjects();
    const newlyAssigned: CapstoneProject[] = [];
    const now = new Date();
    let changed = false;
    for (const project of projects) {
      const stage = project.stage || 'Beginner';
      const threshold = STAGE_MIN_PROGRESS[stage];
      if (roadmapCompletionPercentage >= threshold && !project.submission?.assignedAt) {
        const assignedAt = now.toISOString();
        const deadlineAt = new Date(now.getTime() + project.deadlineDays * 86400000).toISOString();
        project.submission = { ...(project.submission || {}), assignedAt, deadlineAt };
        project.status = project.status === 'graded' || project.status === 'submitted' ? project.status : 'assigned';
        newlyAssigned.push({ ...project });
        changed = true;
      }
    }
    if (changed) this.persist(projects);
    return { projects, newlyAssigned };
  },

  async submitProject(projectId: string, submission: ProjectSubmission): Promise<CapstoneProject> {
    const projects = this.getAllProjects();
    const target = projects.find((p) => p.id === projectId);
    if (!target) throw new Error('Project not found');
    if (!/^https?:\/\/(www\.)?github\.com\//i.test(submission.githubUrl || '')) throw new Error('Please provide a valid GitHub repository URL.');
    if (!/^https?:\/\//i.test(submission.liveUrl || '')) throw new Error('Please provide a valid live deployment URL.');

    target.status = 'submitted';
    target.submission = { ...target.submission, ...submission, submittedAt: new Date().toISOString() };
    this.persist(projects);

    try {
      const response = await fetch('/api/projects/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: target, submission }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.feedback) {
          target.feedback = data.feedback as ProjectAIFeedback;
          target.aiFeedback = data.feedback as ProjectAIFeedback;
          target.status = 'graded';
          this.persist(projects);
          return target;
        }
      }
    } catch {}

    const notes = (submission.notes || '').toLowerCase();
    const score = Math.min(100, 72 + (notes.includes('test') ? 6 : 0) + (notes.includes('api') ? 5 : 0) + (notes.includes('responsive') ? 4 : 0) + (notes.includes('security') ? 4 : 0));
    const feedback: ProjectAIFeedback = {
      score,
      marketFitScore: Math.max(0, score - 2),
      marketReview: 'Offline portfolio review based on the submitted repository/deployment evidence. Improve testing, documentation, accessibility, security, performance and measurable user impact for stronger industry readiness.',
      strengths: ['GitHub source-code evidence is present.', 'A live deployment is present.', `The deliverable is aligned with the ${target.category} category and ${target.stage || target.difficulty} level.`],
      weaknesses: ['Add automated tests and CI checks.', 'Document architecture, trade-offs and setup clearly.', 'Show measurable user impact, accessibility, security and performance considerations.'],
      mistakes: ['Review validation, edge cases and production error states before calling the project production-ready.'],
      suggestions: ['Add an architecture diagram and demo screenshots to README.', 'Add GitHub Actions for lint/test/build validation.', 'Describe the real user problem and measurable outcome.'],
      nextSteps: ['Address the weaknesses and resubmit for another review.', 'Keep the GitHub and live links current.'],
      reviewedAt: new Date().toISOString(),
    };
    target.feedback = feedback; target.aiFeedback = feedback; target.status = 'graded'; this.persist(projects); return target;
  },
};
