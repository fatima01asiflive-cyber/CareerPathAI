import {
  PersonalityDimension,
  SkillRating,
  CareerRecommendation,
  ScholarshipItem,
  CapstoneProject,
} from '../types';

export interface PersonalityQuestion {
  id: number;
  dimension: 'Logical Reasoning' | 'Problem Solving' | 'Creativity' | 'Mathematics' | 'Communication' | 'Leadership' | 'Teamwork' | 'Analytical Thinking';
  question: string;
  options: {
    text: string;
    score: number; // 1 to 5
  }[];
}

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    dimension: 'Logical Reasoning',
    question: 'When faced with an unexpected technical bug or complex puzzle, what is your immediate instinct?',
    options: [
      { text: 'Break it into discrete logical flowcharts and test step-by-step.', score: 5 },
      { text: 'Look for existing patterns or documentation first.', score: 4 },
      { text: 'Try trial-and-error changes to observe behavior.', score: 3 },
      { text: 'Ask peers or mentors for help immediately.', score: 2 },
    ],
  },
  {
    id: 2,
    dimension: 'Problem Solving',
    question: 'How do you approach ambiguous, open-ended system problems with no obvious instructions?',
    options: [
      { text: 'Formulate hypotheses, validate constraints, and build a proof-of-concept.', score: 5 },
      { text: 'Create a structured outline and prioritize the easiest parts first.', score: 4 },
      { text: 'Brainstorm multiple ideas on paper before committing to code.', score: 4 },
      { text: 'Wait for clearer specifications before starting.', score: 2 },
    ],
  },
  {
    id: 3,
    dimension: 'Creativity',
    question: 'When designing a digital product or application, what excites you most?',
    options: [
      { text: 'Inventing unique micro-interactions, beautiful UI, and novel UX flows.', score: 5 },
      { text: 'Architecting elegant algorithms and high-performance clean code.', score: 4 },
      { text: 'Connecting multiple APIs together in creative pipelines.', score: 4 },
      { text: 'Implementing predefined standard templates reliably.', score: 2 },
    ],
  },
  {
    id: 4,
    dimension: 'Mathematics',
    question: 'How comfortable are you with discrete mathematics, linear algebra, and statistical calculus?',
    options: [
      { text: 'I love mathematical modeling, matrix transformations, and loss functions.', score: 5 },
      { text: 'I can understand and apply formulas when needed in algorithms.', score: 4 },
      { text: 'I prefer high-level abstractions without deep math derivations.', score: 3 },
      { text: 'I find complex math exhausting and try to avoid it.', score: 1 },
    ],
  },
  {
    id: 5,
    dimension: 'Communication',
    question: 'How do you explain a complex technical architecture to non-technical stakeholders?',
    options: [
      { text: 'Use clear real-world analogies, visual diagrams, and focus on business value.', score: 5 },
      { text: 'Prepare a high-level summary slide deck with bullet points.', score: 4 },
      { text: 'Explain the technical implementation in simplified vocabulary.', score: 3 },
      { text: 'Prefer having a product manager or team lead do the talking.', score: 2 },
    ],
  },
  {
    id: 6,
    dimension: 'Leadership',
    question: 'During a university group project or sprint, how do you naturally position yourself?',
    options: [
      { text: 'Take initiative, organize milestones, set deadlines, and unblock teammates.', score: 5 },
      { text: 'Offer technical leadership and code reviews for the difficult parts.', score: 4 },
      { text: 'Collaborate equally on assigned tasks without dictating terms.', score: 3 },
      { text: 'Prefer working quietly on an individual isolated module.', score: 2 },
    ],
  },
  {
    id: 7,
    dimension: 'Teamwork',
    question: 'A teammate submits a pull request that functions but has suboptimal architecture. What do you do?',
    options: [
      { text: 'Leave constructive, kind feedback with code snippets and offer a 1-on-1 pairing session.', score: 5 },
      { text: 'Approve if tests pass and suggest improvements for the next sprint.', score: 3 },
      { text: 'Refactor their code yourself without notifying them.', score: 2 },
      { text: 'Ignore code style as long as it gets submitted on time.', score: 1 },
    ],
  },
  {
    id: 8,
    dimension: 'Analytical Thinking',
    question: 'When evaluating which database or framework to choose for a large system, what is your approach?',
    options: [
      { text: 'Conduct benchmark stress-tests, analyze latency vs throughput tradeoffs, and write an RFC.', score: 5 },
      { text: 'Read industry comparison articles and consult tech lead recommendations.', score: 4 },
      { text: 'Pick whatever is trending on GitHub or Twitter.', score: 2 },
      { text: 'Use whatever framework I already know best regardless of constraints.', score: 2 },
    ],
  },
  {
    id: 9,
    dimension: 'Logical Reasoning',
    question: 'If Statement A implies B, and B is false, what can you deduce about A?',
    options: [
      { text: 'A is definitely false (Modus Tollens).', score: 5 },
      { text: 'A is likely false depending on context.', score: 4 },
      { text: 'A could still be true.', score: 2 },
      { text: 'Not sure without a concrete example.', score: 1 },
    ],
  },
  {
    id: 10,
    dimension: 'Creativity',
    question: 'Do you enjoy brainstorming novel startup ideas, generative art, or unconventional tech hacks?',
    options: [
      { text: 'Constantly! I maintain a notebook full of speculative tech and AI product ideas.', score: 5 },
      { text: 'Frequently when working on hackathons or side projects.', score: 4 },
      { text: 'Occasionally when prompted by others.', score: 3 },
      { text: 'Rarely, I prefer strictly structured assignments.', score: 1 },
    ],
  },
  {
    id: 11,
    dimension: 'Analytical Thinking',
    question: 'How do you monitor and optimize application performance bottlenecks?',
    options: [
      { text: 'Profile memory graphs, analyze flamecharts, and inspect network watermarks.', score: 5 },
      { text: 'Add performance logs and check CPU usage metrics.', score: 4 },
      { text: 'Rely on user bug reports.', score: 2 },
      { text: 'Upgrade server RAM without diagnosing the code.', score: 1 },
    ],
  },
  {
    id: 12,
    dimension: 'Problem Solving',
    question: 'You hit a critical roadblock 2 hours before a major assignment/hackathon deadline. How do you respond?',
    options: [
      { text: 'Stay calm, triage essential vs nice-to-have features, pivot to a stable fallback.', score: 5 },
      { text: 'Quickly search StackOverflow/GitHub issues for quick hotfixes.', score: 4 },
      { text: 'Feel stressed but keep hacking frantically until the last minute.', score: 3 },
      { text: 'Give up and ask for an extension.', score: 1 },
    ],
  },
];

export const INTEREST_DOMAINS = [
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & ML',
    icon: 'psychology',
    badge: 'HIGH DEMAND',
    color: 'from-purple-500 to-indigo-600',
    description: 'Neural networks, LLMs, computer vision, deep learning, PyTorch, and NLP systems.',
    fields: ['Generative AI Engineer', 'NLP Specialist', 'Computer Vision Architect', 'MLOps Lead'],
  },
  {
    id: 'software-dev',
    title: 'Full Stack & Software Engineering',
    icon: 'code',
    badge: 'CORE FOUNDATION',
    color: 'from-blue-500 to-cyan-600',
    description: 'Scalable distributed web systems, React, Node.js, microservices, cloud APIs.',
    fields: ['Full Stack Architect', 'Backend Engineer (Go/Rust)', 'Frontend Engineer', 'API Architect'],
  },
  {
    id: 'data-science',
    title: 'Data Science & Big Data Analytics',
    icon: 'insights',
    badge: 'HIGH SALARY',
    color: 'from-emerald-500 to-teal-600',
    description: 'Data warehousing, statistical modeling, Pandas, Apache Spark, predictive analytics.',
    fields: ['Data Scientist', 'Big Data Engineer', 'BI Analyst', 'Quantitative Researcher'],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Ethical Hacking',
    icon: 'shield',
    badge: 'CRITICAL ROLE',
    color: 'from-red-500 to-rose-600',
    description: 'Penetration testing, network security, reverse engineering, cryptography, DevSecOps.',
    fields: ['Security Operations Lead', 'Penetration Tester', 'Cloud Security Architect', 'Malware Analyst'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    icon: 'cloud_done',
    badge: 'GLOBAL DEMAND',
    color: 'from-amber-500 to-orange-600',
    description: 'Kubernetes, Docker, AWS/GCP architecture, Terraform IaC, automated CI/CD pipelines.',
    fields: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Solution Architect', 'Platform Engineer'],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    icon: 'phone_iphone',
    badge: 'FAST PACED',
    color: 'from-violet-500 to-purple-700',
    description: 'Native iOS (Swift), Android (Kotlin), and cross-platform Flutter/React Native.',
    fields: ['Flutter Developer', 'iOS Native Engineer', 'Android Native Specialist', 'Mobile UX Dev'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design',
    icon: 'palette',
    badge: 'CREATIVE',
    color: 'from-pink-500 to-rose-500',
    description: 'Design systems, Figma, usability heuristics, interactive prototyping, user research.',
    fields: ['Product Designer', 'Design Systems Lead', 'UX Researcher', 'Interaction Designer'],
  },
  {
    id: 'robotics-iot',
    title: 'Robotics, Embedded Systems & IoT',
    icon: 'robot_2',
    badge: 'EMERGING',
    color: 'from-teal-500 to-emerald-700',
    description: 'ROS2, Arduino, ESP32, embedded C/C++, sensor fusion, micro-controllers.',
    fields: ['Robotics Software Engineer', 'Embedded Firmware Dev', 'IoT Systems Architect'],
  },
  {
    id: 'fintech-biz',
    title: 'FinTech & Tech Management',
    icon: 'payments',
    badge: 'STRATEGIC',
    color: 'from-yellow-500 to-amber-600',
    description: 'Algorithmic trading, payment gateways, blockchain, product management.',
    fields: ['Technical Product Manager', 'FinTech Engineer', 'Blockchain Developer'],
  },
];

export const INITIAL_SKILLS_CATALOG: SkillRating[] = [
  { skill: 'Python Programming', category: 'Technical', level: 'Intermediate', score: 3 },
  { skill: 'Data Structures & Algorithms', category: 'Technical', level: 'Intermediate', score: 3 },
  { skill: 'JavaScript / TypeScript', category: 'Technical', level: 'Beginner', score: 2 },
  { skill: 'Object Oriented Programming (OOP)', category: 'Technical', level: 'Intermediate', score: 4 },
  { skill: 'SQL & Database Design', category: 'Technical', level: 'Beginner', score: 2 },
  { skill: 'Git & GitHub Version Control', category: 'Technical', level: 'Intermediate', score: 3 },
  { skill: 'Linear Algebra & Calculus', category: 'Analytical', level: 'Intermediate', score: 3 },
  { skill: 'Problem Solving & Logic', category: 'Analytical', level: 'Advanced', score: 4 },
  { skill: 'English Verbal & Written Fluency', category: 'Soft Skills', level: 'Advanced', score: 4 },
  { skill: 'Technical Presentation & Speaking', category: 'Soft Skills', level: 'Intermediate', score: 3 },
  { skill: 'UI / UX Design in Figma', category: 'Design', level: 'Beginner', score: 2 },
  { skill: 'Linux & Terminal Commands', category: 'Technical', level: 'Beginner', score: 2 },
];

export const CAREER_RECOMMENDATIONS_DATA: CareerRecommendation[] = [
  {
    id: 'rec-ai-eng',
    title: 'Artificial Intelligence & Machine Learning Engineer',
    matchScore: 94,
    category: 'Artificial Intelligence',
    growthRate: '+38% YoY (Global & PK)',
    avgSalaryPKR: 'PKR 180,000 - 650,000/mo',
    avgSalaryUSD: '$95,000 - $175,000/yr',
    whyFit:
      'Your high analytical reasoning (91%), solid foundation in Python & OOP, and interest in intelligent algorithms make AI Engineering your #1 optimal trajectory. The Pakistani and remote international markets have unprecedented demand for generative AI & MLOps.',
    requiredSkills: ['Python', 'PyTorch/TensorFlow', 'NumPy & Pandas', 'Math (Linear Algebra/Stats)', 'Data Structures', 'Docker & FastApi', 'LLM Prompt/RAG'],
    missingSkills: ['NumPy & Pandas', 'Deep Learning Architectures', 'Vector Databases (Pinecone/Chroma)', 'MLOps Pipeline Deployment'],
    topUniversities: ['NUST (Islamabad)', 'FAST-NUCES (Islamabad/Lahore)', 'GIKI (Topi)', 'COMSATS', 'ITU (Lahore)'],
    careerLadder: [
      { level: 'AI Engineering Intern', experience: '0-6 months', salaryPKR: 'PKR 50k - 90k/mo' },
      { level: 'Junior ML Engineer', experience: '1-2 years', salaryPKR: 'PKR 120k - 200k/mo' },
      { level: 'Mid-Level AI Engineer', experience: '2-4 years', salaryPKR: 'PKR 250k - 450k/mo' },
      { level: 'Senior AI / MLOps Lead', experience: '4-7 years', salaryPKR: 'PKR 500k - 900k/mo' },
      { level: 'Principal AI Architect / CTO', experience: '8+ years', salaryPKR: 'PKR 1.2M - 2.5M+/mo (or Remote $120k+)' },
    ],
  },
  {
    id: 'rec-data-sci',
    title: 'Data Scientist & Predictive Modeler',
    matchScore: 92,
    category: 'Data & Analytics',
    growthRate: '+32% YoY',
    avgSalaryPKR: 'PKR 160,000 - 550,000/mo',
    avgSalaryUSD: '$90,000 - $160,000/yr',
    whyFit:
      'Your strong mathematical logic and analytical scoring position you well to extract strategic insights from petabyte-scale data pipelines and train predictive classifiers.',
    requiredSkills: ['Python / R', 'SQL Advanced', 'Statistical Hypothesis Testing', 'PowerBI / Tableau', 'Scikit-Learn', 'Feature Engineering'],
    missingSkills: ['Advanced SQL Joins & Window Functions', 'Time Series Forecasting', 'Apache Spark / BigQuery'],
    topUniversities: ['FAST-NUCES', 'NUST', 'LUMS', 'COMSATS', 'Punjab University (PUCIT)'],
    careerLadder: [
      { level: 'Data Analyst Intern', experience: '0-6 months', salaryPKR: 'PKR 45k - 80k/mo' },
      { level: 'Junior Data Scientist', experience: '1-2 years', salaryPKR: 'PKR 110k - 190k/mo' },
      { level: 'Senior Data Scientist', experience: '3-5 years', salaryPKR: 'PKR 280k - 500k/mo' },
      { level: 'Head of Data Science', experience: '6+ years', salaryPKR: 'PKR 700k - 1.5M/mo' },
    ],
  },
  {
    id: 'rec-soft-eng',
    title: 'Full Stack Cloud Software Architect',
    matchScore: 90,
    category: 'Software Engineering',
    growthRate: '+27% YoY',
    avgSalaryPKR: 'PKR 150,000 - 600,000/mo',
    avgSalaryUSD: '$85,000 - $165,000/yr',
    whyFit:
      'Versatile, high-impact career path building end-to-end resilient web applications, REST/GraphQL APIs, microservices, and modern frontend interfaces.',
    requiredSkills: ['TypeScript', 'React.js / Next.js', 'Node.js / Go', 'PostgreSQL / MongoDB', 'System Design', 'Docker & CI/CD'],
    missingSkills: ['Distributed System Caching (Redis)', 'Message Queues (Kafka/RabbitMQ)', 'Kubernetes Pod Deployments'],
    topUniversities: ['FAST-NUCES', 'NUST', 'GIKI', 'UET Lahore', 'NED Karachi'],
    careerLadder: [
      { level: 'Software Trainee / Intern', experience: '0-6 months', salaryPKR: 'PKR 50k - 85k/mo' },
      { level: 'Junior Software Engineer', experience: '1-2 years', salaryPKR: 'PKR 120k - 220k/mo' },
      { level: 'Senior Software Engineer', experience: '3-6 years', salaryPKR: 'PKR 300k - 600k/mo' },
      { level: 'Staff / Principal Architect', experience: '7+ years', salaryPKR: 'PKR 800k - 1.8M/mo' },
    ],
  },
  {
    id: 'rec-cyber-sec',
    title: 'Cyber Security & DevSecOps Specialist',
    matchScore: 86,
    category: 'Cyber Security',
    growthRate: '+35% YoY',
    avgSalaryPKR: 'PKR 170,000 - 580,000/mo',
    avgSalaryUSD: '$95,000 - $170,000/yr',
    whyFit:
      'Strong logical deduction and defensive mindset needed to audit enterprise firewalls, patch CVE vulnerabilities, and ensure SOC2 compliance.',
    requiredSkills: ['Networking (TCP/IP)', 'Linux Kernel & Bash', 'Wireshark & Nmap', 'OWASP Top 10', 'Python Scripting', 'Burp Suite'],
    missingSkills: ['Packet Inspection & Reverse Engineering', 'Cloud IAM Hardening', 'SIEM Tool Configuration (Splunk)'],
    topUniversities: ['Air University (Cyber Security Center of Excellence)', 'NUST (Islamabad)', 'FAST-NUCES', 'COMSATS'],
    careerLadder: [
      { level: 'SOC Analyst L1', experience: '0-1 year', salaryPKR: 'PKR 80k - 140k/mo' },
      { level: 'Penetration Tester / Security Consultant', experience: '2-4 years', salaryPKR: 'PKR 220k - 400k/mo' },
      { level: 'Lead Information Security Officer (CISO)', experience: '6+ years', salaryPKR: 'PKR 650k - 1.6M/mo' },
    ],
  },
  {
    id: 'rec-cloud-devops',
    title: 'Cloud DevOps & Site Reliability Engineer (SRE)',
    matchScore: 84,
    category: 'Cloud Engineering',
    growthRate: '+30% YoY',
    avgSalaryPKR: 'PKR 170,000 - 620,000/mo',
    avgSalaryUSD: '$95,000 - $180,000/yr',
    whyFit:
      'High demand for automating multi-cloud container orchestration, Terraform zero-downtime rollouts, and infrastructure monitoring.',
    requiredSkills: ['Linux System Administration', 'Docker & Kubernetes', 'Terraform IaC', 'AWS / GCP Solutions', 'GitHub Actions CI/CD'],
    missingSkills: ['Terraform Modular Code', 'Helm Charts', 'Prometheus & Grafana Alerting'],
    topUniversities: ['NUST', 'FAST-NUCES', 'GIKI', 'UET Taxila', 'COMSATS'],
    careerLadder: [
      { level: 'Junior DevOps Engineer', experience: '0-2 years', salaryPKR: 'PKR 120k - 200k/mo' },
      { level: 'Senior Cloud / SRE Engineer', experience: '3-6 years', salaryPKR: 'PKR 320k - 650k/mo' },
      { level: 'Principal Cloud Architect', experience: '7+ years', salaryPKR: 'PKR 900k - 2.0M/mo' },
    ],
  },
];

export const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
  {
    id: 'sch-hec-need',
    title: 'HEC Need-Based Undergraduate Scholarship',
    provider: 'Higher Education Commission of Pakistan (HEC)',
    coverage: '100% Full Tuition + Stipend',
    eligibility: 'Enrolled in any HEC recognized public university with family monthly income under PKR 45,000.',
    eligibleProvinces: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK', 'Islamabad'],
    minMarksPercentage: 60,
    deadline: 'October 30, 2026',
    applicationPeriod: 'Aug - Oct Annually',
    link: 'https://www.hec.gov.pk/english/scholarships-opportunities',
    description: 'Covers 100% of university tuition fees plus a monthly living stipend of PKR 6,000 for the complete 4-year BS degree program.',
    badge: 'GOVERNMENT FULL GRANT',
  },
  {
    id: 'sch-peef',
    title: 'PEEF Master & Graduation Merit Scholarship',
    provider: 'Punjab Educational Endowment Fund (PEEF)',
    coverage: '100% Tuition',
    eligibility: 'Punjab domicile students securing 60%+ marks in Intermediate/Graduation with income below PKR 35,000/mo.',
    eligibleProvinces: ['Punjab'],
    minMarksPercentage: 60,
    deadline: 'November 15, 2026',
    applicationPeriod: 'Sep - Nov Annually',
    link: 'https://peef.org.pk/',
    description: 'Financial aid for talented and deserving students of Punjab studying in partner public and private colleges/universities.',
    badge: 'PUNJAB STATE ENDOWMENT',
  },
  {
    id: 'sch-ehsaas',
    title: 'Benazir / Ehsaas Undergraduate Scholarship Program',
    provider: 'BISP & Higher Education Commission',
    coverage: '100% Full Tuition + Stipend',
    eligibility: 'Low-income background students admitted on open merit in 125+ public sector universities.',
    eligibleProvinces: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK'],
    minMarksPercentage: 55,
    deadline: 'December 31, 2026',
    applicationPeriod: 'Oct - Dec Annually',
    link: 'https://ehsaas.hec.gov.pk/',
    description: '50,000 undergraduate scholarships awarded annually with 50% reserved quota for female students. Full tuition fee + PKR 4,000 monthly stipend.',
    badge: 'LARGEST NATIONAL SCHOLARSHIP',
  },
  {
    id: 'sch-nust-merit',
    title: 'NUST Need & Merit Financial Assistance Grant',
    provider: 'National University of Sciences & Technology (NUST)',
    coverage: '50-75% Tuition',
    eligibility: 'Top 100 NET rankers or demonstrated financial need vetted through NUST Financial Aid office.',
    eligibleProvinces: ['All Pakistan'],
    minMarksPercentage: 70,
    deadline: 'July 15, 2026',
    applicationPeriod: 'June - July (Admission Cycle)',
    link: 'https://nust.edu.pk/admissions/scholarships/',
    description: 'NUST guarantees that no admitted student is denied education due to financial distress. Provides interest-free student loans and tuition waivers.',
    badge: 'NUST INTERNAL MERIT',
  },
  {
    id: 'sch-fast-financial',
    title: 'FAST-NUCES Study Assistance & Top Ranker Awards',
    provider: 'FAST National University',
    coverage: '100% Tuition',
    eligibility: 'Campus merit position holders per semester and need-based financial aid through industrial alumni endowment.',
    eligibleProvinces: ['All Pakistan'],
    minMarksPercentage: 75,
    deadline: 'August 20, 2026',
    applicationPeriod: 'Per Semester',
    link: 'https://www.nu.edu.pk/',
    description: 'Full tuition fee waiver for top 3 position holders in each campus cohort, plus emergency interest-free student aid funds.',
    badge: 'CAMPUS MERIT WAIVER',
  },
  {
    id: 'sch-fulbright',
    title: 'USEFP Fulbright Master & PhD Scholarship USA',
    provider: 'United States Educational Foundation in Pakistan',
    coverage: '100% Full Tuition + Stipend',
    eligibility: 'Pakistani citizens with 16 years of education (BS 4-Year) with strong academic record and GRE scores.',
    eligibleProvinces: ['All Pakistan'],
    minMarksPercentage: 70,
    deadline: 'April 25, 2026',
    applicationPeriod: 'Feb - April Annually',
    link: 'https://usefp.org/scholarships/fulbright-degree.cfm',
    description: 'The world most prestigious scholarship covers 100% tuition, airfare, textbooks, health insurance, and generous USD monthly living stipend in the US.',
    badge: 'USA PRESTIGIOUS GLOBAL',
  },
];

export const CAPSTONE_PROJECTS_DATA: CapstoneProject[] = [
  {
    id: 'proj-ai-assistant',
    title: 'AI Smart Career Navigator & Resume Semantic Matcher',
    courseId: 'course-ai-1',
    careerId: 'ai-engineer',
    category: 'Artificial Intelligence',
    field: 'Artificial Intelligence & ML',
    difficulty: 'Industry-Ready',
    estimatedHours: 40,
    deadlineDays: 21,
    status: 'assigned',
    requirements: [
      'Clean PEP8 modular Python, async FastAPI endpoints, structured error handling.',
      'Modern responsive Tailwind dashboard with drag-and-drop PDF upload and live similarity score bar.',
      'Comprehensive README with Docker compose instructions, API architecture diagram, and sample curl requests.',
    ],
    skillsTested: ['Python', 'FastAPI', 'PyTorch / Transformers', 'React + Vite', 'Tailwind CSS', 'Docker'],
    description:
      'Build a full-stack Python FastAPI + React application that ingests PDF resumes, computes cosine similarity with job descriptions using HuggingFace / OpenAI embeddings, and outputs actionable skill gap suggestions.',
  },
  {
    id: 'proj-cloud-microservices',
    title: 'Distributed High-Throughput Task Queue & Telemetry Engine',
    courseId: 'course-fullstack-1',
    careerId: 'software-engineer',
    category: 'Full Stack & Cloud Architecture',
    field: 'Full Stack & Cloud Architecture',
    difficulty: 'Advanced',
    estimatedHours: 35,
    deadlineDays: 18,
    status: 'assigned',
    requirements: [
      'Type-safe TypeScript or idiomatic Go with 85%+ unit test coverage.',
      'Live WebSocket dashboard showing throughput graphs, worker statuses, and queue latency.',
      'Complete architecture diagram, OpenAPI 3.0 specs, and Kubernetes manifests.',
    ],
    skillsTested: ['Node.js / Go', 'PostgreSQL', 'Redis', 'Docker Compose', 'React', 'Prometheus'],
    description:
      'Implement an event-driven microservices architecture with Go/Node.js, Redis Pub/Sub, PostgreSQL, and Prometheus metrics for real-time task scheduling with automatic exponential retry logic.',
  },
  {
    id: 'proj-cyber-audit',
    title: 'Automated Web Vulnerability Scanner & OWASP Compliance Tool',
    courseId: 'course-security-1',
    careerId: 'cyber-security',
    category: 'Cyber Security',
    field: 'Cyber Security',
    difficulty: 'Advanced',
    estimatedHours: 45,
    deadlineDays: 25,
    status: 'assigned',
    requirements: [
      'Safe concurrent network requests, rate limiting to avoid DoS, strict validation.',
      'Executive summary dashboard highlighting High/Medium/Low CVE severity badges.',
      'Legal disclaimer, installation guide, and ethical hacking disclosure guidelines.',
    ],
    skillsTested: ['Python', 'Asyncio / Aiohttp', 'BeautifulSoup', 'ReportLab PDF', 'Docker'],
    description:
      'Develop a security auditing command-line and web tool in Python that crawls targeted endpoints, tests for SQL injection, XSS reflections, CSRF tokens, insecure CORS headers, and outputs an executive PDF report.',
  },
];

export const CURATED_JOBS_DATA: {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Internship' | 'Hybrid' | 'Part-time';
  experienceLevel: 'Entry-Level / Graduate' | 'Junior (1-2 yrs)' | 'Mid-Level (2-4 yrs)' | 'Senior (4+ yrs)';
  salaryRangePKR: string;
  salaryRangeUSD: string;
  matchScore: number;
  tags: string[];
  description: string;
  applyLink: string;
  postedTime: string;
  logoColor: string;
}[] = [
  {
    id: 'job-1',
    title: 'Junior AI / ML Engineer',
    company: 'Afiniti Technologies',
    location: 'Lahore, Pakistan (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Entry-Level / Graduate',
    salaryRangePKR: 'PKR 140,000 - 220,000 / mo',
    salaryRangeUSD: '$600 - $950 / mo',
    matchScore: 96,
    tags: ['Python', 'PyTorch', 'FastAPI', 'Pandas', 'Docker'],
    description:
      'Afiniti is hiring entry-level AI Engineers to design predictive behavioral modeling engines. Work alongside senior research scientists developing real-time neural decision models.',
    applyLink: 'https://careers.afiniti.com/',
    postedTime: '2 hours ago',
    logoColor: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'job-2',
    title: 'Associate Full-Stack Software Engineer',
    company: '10Pearls',
    location: 'Karachi / Islamabad / Remote',
    type: 'Full-time',
    experienceLevel: 'Entry-Level / Graduate',
    salaryRangePKR: 'PKR 130,000 - 190,000 / mo',
    salaryRangeUSD: '$550 - $800 / mo',
    matchScore: 92,
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    description:
      'Join 10Pearls global software innovation team building modern cloud-native web apps. Involves writing scalable RESTful APIs, responsive React interfaces, and automated unit testing.',
    applyLink: 'https://10pearls.com/careers/',
    postedTime: '5 hours ago',
    logoColor: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'job-3',
    title: 'Remote Junior Data Scientist',
    company: 'Turing Global Devs',
    location: 'Remote (US & Global Clients)',
    type: 'Remote',
    experienceLevel: 'Junior (1-2 yrs)',
    salaryRangePKR: 'PKR 280,000 - 450,000 / mo',
    salaryRangeUSD: '$1,200 - $1,800 / mo',
    matchScore: 89,
    tags: ['Python', 'SQL', 'Scikit-learn', 'Tableau', 'NLP'],
    description:
      'High-impact remote position for talented Pakistani grads. Clean large-scale consumer data pipelines, build regression/clustering models, and deliver business insights to Silicon Valley teams.',
    applyLink: 'https://www.turing.com/',
    postedTime: '1 day ago',
    logoColor: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'job-4',
    title: 'Junior Cyber Security SOC Analyst',
    company: 'Systems Limited',
    location: 'Islamabad / Lahore, PK',
    type: 'Full-time',
    experienceLevel: 'Entry-Level / Graduate',
    salaryRangePKR: 'PKR 120,000 - 180,000 / mo',
    salaryRangeUSD: '$500 - $750 / mo',
    matchScore: 86,
    tags: ['SIEM', 'Linux', 'Network Security', 'Wireshark', 'Python'],
    description:
      'Monitor and respond to real-time threat telemetry in our 24/7 Security Operations Center. Conduct incident analysis, vulnerability scanning, and OWASP compliance reporting.',
    applyLink: 'https://www.systemsltd.com/careers',
    postedTime: '2 days ago',
    logoColor: 'from-rose-600 to-amber-600',
  },
  {
    id: 'job-5',
    title: 'Cloud DevOps & Infrastructure Intern',
    company: 'Careem / Uber Pakistan',
    location: 'Lahore, PK (Hybrid)',
    type: 'Internship',
    experienceLevel: 'Entry-Level / Graduate',
    salaryRangePKR: 'PKR 75,000 - 100,000 / mo',
    salaryRangeUSD: '$300 - $420 / mo',
    matchScore: 84,
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Bash'],
    description:
      'Fast-track paid internship with full conversion opportunity. Assist our SRE team in managing containerized microservices clusters, CI/CD GitHub Action workflows, and Grafana monitoring.',
    applyLink: 'https://www.careem.com/careers',
    postedTime: '3 days ago',
    logoColor: 'from-green-600 to-emerald-600',
  },
  {
    id: 'job-6',
    title: 'Mobile App Developer (Flutter / React Native)',
    company: 'Arbisoft',
    location: 'Lahore, PK (On-site / Flex)',
    type: 'Full-time',
    experienceLevel: 'Junior (1-2 yrs)',
    salaryRangePKR: 'PKR 150,000 - 230,000 / mo',
    salaryRangeUSD: '$650 - $1,000 / mo',
    matchScore: 88,
    tags: ['Flutter', 'Dart', 'React Native', 'Firebase', 'REST APIs'],
    description:
      'Build performant multi-platform mobile apps for ed-tech and international commerce partners. Experience with state management (Riverpod/Bloc) and smooth 60fps animations required.',
    applyLink: 'https://arbisoft.com/careers/',
    postedTime: '3 days ago',
    logoColor: 'from-amber-600 to-orange-600',
  },
];

export const MARKET_DEMAND_DATA: {
  id: string;
  role: string;
  demandTrend: 'Very High' | 'High Demand' | 'Growing' | 'Stable';
  trendIcon: string;
  trendColor: string;
  openingsPK: number;
  openingsGlobal: number;
  growthPercentage: number;
  topSkillsRequired: string[];
  remoteFriendlyScore: number;
  description: string;
}[] = [
  {
    id: 'demand-ai',
    role: 'AI / Machine Learning Engineer',
    demandTrend: 'Very High',
    trendIcon: 'trending_up',
    trendColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    openingsPK: 1420,
    openingsGlobal: 58400,
    growthPercentage: 42.5,
    topSkillsRequired: ['Python', 'PyTorch', 'LLMs / Transformers', 'MLOps', 'Vector Databases'],
    remoteFriendlyScore: 92,
    description:
      'Explosive market surge driven by Generative AI, Retrieval Augmented Generation (RAG), and enterprise automation.',
  },
  {
    id: 'demand-fullstack',
    role: 'Full-Stack Software Engineer',
    demandTrend: 'High Demand',
    trendIcon: 'trending_up',
    trendColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    openingsPK: 3850,
    openingsGlobal: 112000,
    growthPercentage: 24.8,
    topSkillsRequired: ['React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    remoteFriendlyScore: 95,
    description:
      'Consistent bedrock of the international software export sector. High demand for engineers fluent in modern TypeScript and cloud deployments.',
  },
  {
    id: 'demand-data',
    role: 'Data Scientist & Analytics Architect',
    demandTrend: 'Growing',
    trendIcon: 'north_east',
    trendColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    openingsPK: 1150,
    openingsGlobal: 44200,
    growthPercentage: 28.1,
    topSkillsRequired: ['SQL', 'Python', 'Statistical Inference', 'Scikit-learn', 'Tableau / PowerBI'],
    remoteFriendlyScore: 88,
    description:
      'Companies increasingly prioritize data-driven decision making, customer churn analytics, and automated dashboards.',
  },
  {
    id: 'demand-cyber',
    role: 'Cyber Security & SOC Analyst',
    demandTrend: 'Very High',
    trendIcon: 'security',
    trendColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    openingsPK: 980,
    openingsGlobal: 39500,
    growthPercentage: 35.6,
    topSkillsRequired: ['Network Defense', 'Penetration Testing', 'SIEM / Splunk', 'OWASP Top 10', 'Linux Hardening'],
    remoteFriendlyScore: 78,
    description:
      'Critical shortage of security professionals amid growing compliance mandates, ransomware threats, and cloud data protection laws.',
  },
  {
    id: 'demand-devops',
    role: 'Cloud & DevOps / SRE Engineer',
    demandTrend: 'High Demand',
    trendIcon: 'cloud_sync',
    trendColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    openingsPK: 1250,
    openingsGlobal: 51000,
    growthPercentage: 31.0,
    topSkillsRequired: ['Docker', 'Kubernetes', 'AWS / Azure', 'Terraform', 'CI/CD Pipelines'],
    remoteFriendlyScore: 94,
    description:
      'Organizations migrating legacy infrastructure to scalable Kubernetes clusters and automated serverless architectures.',
  },
  {
    id: 'demand-mobile',
    role: 'Mobile Application Developer (Flutter / iOS)',
    demandTrend: 'Stable',
    trendIcon: 'arrow_forward',
    trendColor: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
    openingsPK: 1680,
    openingsGlobal: 32000,
    growthPercentage: 14.2,
    topSkillsRequired: ['Flutter / Dart', 'React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    remoteFriendlyScore: 86,
    description:
      'Mature and steady demand with high focus on cross-platform mobile frameworks delivering native performance across Android and iOS.',
  },
];
