export interface CareerRoadmapLevel {
  id: string;
  level: number;
  title: string;
  summary: string;
  outcome: string;
  weeklyPlan: Array<{ week: number; title: string; tasks: string[]; resources: string; }>;
}

const makeLevels = (category: string, levelTitles: string[], outcomes: string[]): CareerRoadmapLevel[] =>
  levelTitles.map((title, idx) => {
    const level = idx + 1;
    const outcome = outcomes[idx];
    const phase = level === 1 ? 'foundation' : level <= 3 ? 'skill-building' : level <= 5 ? 'applied' : 'industry-ready';
    return {
      id: `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-level-${level}`,
      level,
      title: `Level ${String(level).padStart(2, '0')}: ${title}`,
      summary: `Build ${category} skills through a ${phase} learning phase, then prove the skill with practical work.`,
      outcome,
      weeklyPlan: [
        { week: 1, title: 'Learn the concepts', tasks: [`Study ${title} fundamentals`, 'Write concise notes and a glossary', 'Complete a short knowledge check'], resources: 'Beginner videos + official documentation' },
        { week: 2, title: 'Practice deliberately', tasks: ['Follow 2 guided examples', 'Solve 3–5 practice tasks', 'Record weak topics in your activity log'], resources: 'Practice labs + examples' },
        { week: 3, title: 'Build something', tasks: [`Create a small ${category} deliverable for ${title}`, 'Commit the work to GitHub', 'Add README setup and screenshots'], resources: 'Project references + templates' },
        { week: 4, title: 'Assess and advance', tasks: ['Review mistakes', 'Take the related assessment', `Prepare for ${level < 6 ? 'the next level' : 'your portfolio / capstone'}`], resources: 'Assessment + revision docs' },
      ],
    };
  });

export const CAREER_ROADMAPS: Record<string, { name: string; description: string; levels: CareerRoadmapLevel[] }> = {
  'Software Development': {
    name: 'Software Development', description: 'From programming basics to production engineering.',
    levels: makeLevels('Software Development', ['Programming Foundations', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'Backend APIs & Databases', 'System Design & Testing', 'Production Engineering & Capstone'], ['Write clean programs independently.', 'Design reusable classes and modules.', 'Solve interview-grade problems with complexity analysis.', 'Build secure, persistent APIs.', 'Design tested, scalable systems.', 'Ship a production-ready portfolio project.'])
  },
  'AI/ML': {
    name: 'AI/ML', description: 'From Python and data foundations to deep learning and applied AI.',
    levels: makeLevels('AI/ML', ['Python, Math & AI Foundations', 'Data Preparation & Classical ML', 'Model Evaluation & Feature Engineering', 'Deep Learning', 'Transformers & Generative AI', 'MLOps & AI Capstone'], ['Understand the AI/ML workflow.', 'Train baseline supervised models.', 'Evaluate models and improve feature pipelines.', 'Build neural-network solutions.', 'Use transformers and LLM workflows responsibly.', 'Deploy and monitor an AI product.'])
  },
  'Data Science': {
    name: 'Data Science', description: 'From data literacy and SQL to analytics, statistics and predictive modeling.',
    levels: makeLevels('Data Science', ['Data & SQL Foundations', 'Python, Pandas & EDA', 'Statistics & Experimentation', 'Visualization & Storytelling', 'Predictive Modeling', 'Analytics Capstone'], ['Query and understand structured data.', 'Clean and explore real datasets.', 'Run statistically sound analysis.', 'Build decision-ready dashboards.', 'Train and validate predictive models.', 'Deliver an end-to-end analytics case study.'])
  },
  'Cloud Computing': {
    name: 'Cloud Computing', description: 'From cloud fundamentals to scalable, secure architectures.',
    levels: makeLevels('Cloud Computing', ['Cloud Concepts & Linux', 'Networking & IAM', 'Containers & Docker', 'Cloud Services & Infrastructure', 'Scalability, Security & Observability', 'Production Cloud Architecture'], ['Explain cloud service models and operate Linux.', 'Configure networks, users and permissions safely.', 'Containerize applications reliably.', 'Deploy workloads using cloud-native services.', 'Design resilient and observable systems.', 'Deliver a production-ready cloud architecture.'])
  },
  'Cyber Security': {
    name: 'Cyber Security', description: 'From networking and Linux to secure application and defense workflows.',
    levels: makeLevels('Cyber Security', ['Networking & Security Foundations', 'Linux & Secure Administration', 'Web Security & OWASP', 'SIEM & Incident Response', 'Identity, Crypto & Cloud Security', 'Security Assessment Capstone'], ['Understand common network attack surfaces.', 'Harden a Linux environment.', 'Identify and fix web vulnerabilities safely.', 'Triage logs and security alerts.', 'Apply IAM, cryptography and secure cloud patterns.', 'Produce a professional security assessment.'])
  },
  'Web Development': {
    name: 'Web Development', description: 'From HTML/CSS/JS to full-stack production applications.',
    levels: makeLevels('Web Development', ['HTML, CSS & Web Foundations', 'JavaScript & Browser APIs', 'React & Modern Frontend', 'Node.js, APIs & MongoDB', 'Authentication, Testing & Deployment', 'Full-Stack Production Capstone'], ['Build responsive static pages.', 'Create interactive browser applications.', 'Build reusable React interfaces.', 'Ship full-stack CRUD APIs.', 'Secure, test and deploy applications.', 'Launch an industry-style SaaS or product.'])
  },
  'Mobile Development': {
    name: 'Mobile Development', description: 'From mobile UI basics to production React Native apps.',
    levels: makeLevels('Mobile Development', ['Mobile UI & JavaScript Foundations', 'React Native Components', 'Navigation & State Management', 'APIs, Storage & Authentication', 'Performance, Testing & Release', 'Production Mobile Capstone'], ['Build a clean mobile interface.', 'Create multi-screen apps.', 'Manage navigation and app state.', 'Connect mobile apps to backend services.', 'Improve quality and release readiness.', 'Ship a portfolio-ready mobile product.'])
  },
  'DevOps': {
    name: 'DevOps', description: 'From Linux and Git to CI/CD, containers and cloud operations.',
    levels: makeLevels('DevOps', ['Linux, Git & Shell', 'CI/CD Fundamentals', 'Docker & Container Workflows', 'Infrastructure as Code', 'Monitoring & Reliability', 'Cloud-Native DevOps Capstone'], ['Operate a development environment confidently.', 'Automate builds and tests.', 'Package applications into containers.', 'Provision repeatable infrastructure.', 'Observe and improve system reliability.', 'Deliver an automated production pipeline.'])
  },
};
