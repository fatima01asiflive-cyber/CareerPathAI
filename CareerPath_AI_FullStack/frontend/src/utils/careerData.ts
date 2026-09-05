export interface CareerDetail {
  id: string;
  name: string;
  category: string;
  domain: string;
  matchScore: number;
  demand: 'Very High' | 'High' | 'Moderate' | 'Growing';
  description: string;
  salaryRange: string;
  growthRate: string;
  requiredSkills: string[];
  recommendedCourses: {
    title: string;
    platform: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    isFree: boolean;
  }[];
  roadmap: {
    month: number;
    title: string;
    description: string;
    topics: string[];
    resourcesCount?: number;
  }[];
  isComingSoon?: boolean;
}

// Updated domains array to match only active fields
export const CAREER_DOMAINS = [
  'All Fields',
  'Software Development',
  'Artificial Intelligence',
  'Data Science',
  'Cyber Security',
  'Arts & Design',
];

export const CAREER_DATABASE: Record<string, CareerDetail> = {
  'software-engineer': {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'Software Development',
    domain: 'Computer Science',
    matchScore: 88,
    demand: 'Very High',
    salaryRange: '$85,000 - $155,000 / yr',
    growthRate: '+25% (Next 5 Years)',
    description:
      'Design, construct, test, and maintain resilient software systems, microservices, and web platforms. Architect full-stack scalable software that powers modern businesses.',
    requiredSkills: [
      'Programming (TypeScript / Python / Java)',
      'Data Structures & Algorithms',
      'Object-Oriented & Functional Design',
      'Git & Version Control',
      'REST & GraphQL APIs',
      'CI/CD & Cloud Deployment',
    ],
    recommendedCourses: [
      { title: 'CS50: Introduction to Computer Science', platform: 'Harvard (edX)', level: 'Beginner', isFree: true },
      { title: 'JavaScript & Modern Web Foundations', platform: 'freeCodeCamp', level: 'Beginner', isFree: true },
      { title: 'Data Structures & Algorithms in Python', platform: 'MIT OpenCourseWare', level: 'Intermediate', isFree: true },
      { title: 'Building Scalable Full-Stack Apps with React & Node', platform: 'FullStackOpen', level: 'Intermediate', isFree: true },
    ],
    roadmap: [
      {
        month: 1,
        title: 'Programming Fundamentals & Logic',
        description: 'Master control flow, memory allocation, functions, recursion, and core algorithmic problem-solving.',
        topics: ['Control Structures', 'Data Types & Variables', 'Functions & Scope', 'Algorithmic Tracing'],
        resourcesCount: 14,
      },
      {
        month: 2,
        title: 'Core Language Deep Dive (JavaScript / Python)',
        description: 'Asynchronous event loops, OOP architecture, module systems, and error handling patterns.',
        topics: ['OOP & Class Inheritance', 'Async / Await & Promises', 'NPM / Package Management', 'Unit Testing'],
        resourcesCount: 18,
      },
      {
        month: 3,
        title: 'Data Structures & Algorithmic Complexity',
        description: 'Linear & non-linear structures, Big-O notation, recursion trees, and search/sort optimization.',
        topics: ['Arrays, Stacks, Queues', 'Hash Tables & BSTs', 'Big-O Time & Space Complexity', 'Dynamic Programming'],
        resourcesCount: 22,
      },
      {
        month: 4,
        title: 'Modern Frontend Architecture (React / TypeScript)',
        description: 'Component lifecycles, hooks, global state management, responsive Tailwind layouts, and API consuming.',
        topics: ['React Hooks (useState, useEffect, useMemo)', 'Tailwind CSS', 'State Management', 'REST API Integration'],
        resourcesCount: 19,
      },
      {
        month: 5,
        title: 'Backend Services, Databases & Security',
        description: 'Design RESTful microservices with Node.js/Express, relational/document database schemas, and JWT auth.',
        topics: ['Express.js Routing', 'PostgreSQL & MongoDB', 'JWT & OAuth Authentication', 'API Security Best Practices'],
        resourcesCount: 20,
      },
      {
        month: 6,
        title: 'Full-Stack Capstone & Cloud Production',
        description: 'Deploy containerized web applications to cloud infrastructures with automated CI/CD pipelines.',
        topics: ['Docker Containerization', 'Cloud Deployment (Vercel/Render)', 'Automated CI/CD', 'Production Monitoring'],
        resourcesCount: 16,
      },
    ],
  },
  'ai-engineer': {
    id: 'ai-engineer',
    name: 'AI & Machine Learning Engineer',
    category: 'Artificial Intelligence',
    domain: 'Artificial Intelligence',
    matchScore: 92,
    demand: 'Very High',
    salaryRange: '$95,000 - $175,000 / yr',
    growthRate: '+38% (Next 5 Years)',
    description:
      'Architect, train, evaluate, and operationalize machine learning models, deep neural networks, and generative AI systems to automate complex cognitive workflows.',
    requiredSkills: [
      'Python & Scientific Computing (NumPy / Pandas)',
      'Linear Algebra, Calculus & Statistics',
      'Machine Learning Algorithms (Scikit-Learn)',
      'Deep Learning (PyTorch / TensorFlow)',
      'LLM Prompting, RAG & Fine-Tuning',
      'FastAPI & AI Model Serving',
    ],
    recommendedCourses: [
      { title: 'Machine Learning Specialization', platform: 'DeepLearning.AI', level: 'Beginner', isFree: true },
      { title: 'Practical Deep Learning for Coders', platform: 'fast.ai', level: 'Intermediate', isFree: true },
      { title: 'Linear Algebra for Machine Learning', platform: 'MIT OCW', level: 'Beginner', isFree: true },
      { title: 'Building LLM Applications & AI Agents', platform: 'Hugging Face', level: 'Advanced', isFree: true },
    ],
    roadmap: [
      {
        month: 1,
        title: 'Python for Scientific Computing & Math Primer',
        description: 'Vectorized operations, multidimensional matrix algebra, derivatives, gradients, and numerical foundations.',
        topics: ['NumPy Arrays & Vectorization', 'Matrix Calculus', 'Statistical Distributions', 'Data Visualization (Matplotlib)'],
        resourcesCount: 16,
      },
      {
        month: 2,
        title: 'Classical Machine Learning Foundations',
        description: 'Supervised/unsupervised algorithms, decision trees, cross-validation, and bias-variance tradeoff.',
        topics: ['Linear & Logistic Regression', 'Random Forests & XGBoost', 'K-Means Clustering', 'Evaluation Metrics (F1, ROC-AUC)'],
        resourcesCount: 20,
      },
      {
        month: 3,
        title: 'Deep Learning & Neural Networks with PyTorch',
        description: 'Feedforward networks, backpropagation, loss functions, CNNs for computer vision, and RNNs.',
        topics: ['PyTorch Tensor Operations', 'Loss Functions & Optimizers', 'Convolutional Networks (CNN)', 'Recurrent Networks (LSTM)'],
        resourcesCount: 24,
      },
      {
        month: 4,
        title: 'Transformers, NLP & Generative AI',
        description: 'Self-attention mechanisms, encoder-decoder architectures, BERT, GPT, and tokenization pipelines.',
        topics: ['Self-Attention & Transformers', 'Hugging Face Pipelines', 'Vector Databases (Chroma/Pinecone)', 'Embedding Spaces'],
        resourcesCount: 21,
      },
      {
        month: 5,
        title: 'Retrieval-Augmented Generation (RAG) & Agents',
        description: 'Orchestrating agentic workflows, chunking strategies, prompt engineering, and LLM evaluation.',
        topics: ['LangChain / LlamaIndex', 'RAG Retrieval Systems', 'Function Calling & Tools', 'Quantization & LoRA'],
        resourcesCount: 19,
      },
      {
        month: 6,
        title: 'Model Deployment, MLOps & Capstone',
        description: 'Package deep learning models into low-latency FastAPI endpoints, containerize, and monitor inference.',
        topics: ['FastAPI Inference API', 'Docker Packaging', 'Latency & Throughput Benchmarking', 'End-to-End AI Capstone'],
        resourcesCount: 17,
      },
    ],
  },
  'data-scientist': {
    id: 'data-scientist',
    name: 'Data Scientist & Analytics Lead',
    category: 'Data Science',
    domain: 'Data Science',
    matchScore: 84,
    demand: 'High',
    salaryRange: '$80,000 - $145,000 / yr',
    growthRate: '+31% (Next 5 Years)',
    description:
      'Extract predictive insights, uncover hidden trends, and build automated decision systems from massive structured and unstructured datasets.',
    requiredSkills: [
      'SQL & Relational Querying',
      'Python / R for Exploratory Data Analysis',
      'Statistical Hypothesis Testing & A/B Testing',
      'Data Visualization (Tableau / Seaborn)',
      'Predictive Modeling & Feature Engineering',
    ],
    recommendedCourses: [
      { title: 'Google Data Analytics Certificate', platform: 'Coursera', level: 'Beginner', isFree: true },
      { title: 'Advanced SQL for Data Engineering', platform: 'Khan Academy', level: 'Beginner', isFree: true },
      { title: 'Applied Statistics & Probability', platform: 'Stanford Online', level: 'Intermediate', isFree: true },
    ],
    roadmap: [
      {
        month: 1,
        title: 'Advanced SQL & Data Modeling',
        description: 'Complex joins, window functions, CTEs, schema indexing, and database normalization.',
        topics: ['Window Functions (Rank, DenseRank)', 'Subqueries & CTEs', 'Aggregations & Grouping', 'Query Optimization'],
        resourcesCount: 15,
      },
      {
        month: 2,
        title: 'Data Wrangling & Statistical EDA with Pandas',
        description: 'Cleaning dirty data, handling null values, outlier detection, and statistical summaries.',
        topics: ['Pandas DataFrames', 'Data Cleaning & Imputation', 'Distribution Plots (Seaborn)', 'Correlation Matrices'],
        resourcesCount: 18,
      },
      {
        month: 3,
        title: 'Applied Inferential Statistics & A/B Testing',
        description: 'Hypothesis testing, p-values, confidence intervals, sample size estimation, and variance analysis.',
        topics: ['Null Hypothesis Testing', 'T-Tests & ANOVA', 'A/B Test Experimentation', 'Regression Diagnostics'],
        resourcesCount: 20,
      },
      {
        month: 4,
        title: 'Interactive Dashboards & Business Storytelling',
        description: 'Creating executive visual reporting tools with Power BI, Tableau, and Streamlit.',
        topics: ['Tableau / Power BI Visualizations', 'Streamlit Web Dashboards', 'Executive Metric Framing', 'Data Storytelling'],
        resourcesCount: 17,
      },
      {
        month: 5,
        title: 'Predictive Modeling & Time Series Forecasting',
        description: 'Building classification, regression, ARIMA time series, and decision forest models.',
        topics: ['Feature Engineering', 'Time Series Forecasting (ARIMA/Prophet)', 'SHAP Values for Explainability', 'Model Validation'],
        resourcesCount: 19,
      },
      {
        month: 6,
        title: 'Comprehensive Analytics Capstone Presentation',
        description: 'Perform an exhaustive exploratory and predictive project on an enterprise dataset.',
        topics: ['Data Ingestion Pipeline', 'Statistical Analysis', 'Interactive Dashboard', 'Strategic Business Recommendations'],
        resourcesCount: 14,
      },
    ],
  },
  'cyber-security': {
    id: 'cyber-security',
    name: 'Cyber Security Analyst',
    category: 'Cyber Security',
    domain: 'Cyber Security',
    matchScore: 82,
    demand: 'Very High',
    salaryRange: '$82,000 - $150,000 / yr',
    growthRate: '+33% (Next 5 Years)',
    description:
      'Defend corporate digital perimeters, networks, and cloud infrastructures against unauthorized intrusion, cyber attacks, and zero-day vulnerabilities.',
    requiredSkills: [
      'Networking Protocols (TCP/IP, DNS, OSI, BGP)',
      'Linux Administration & Bash Scripting',
      'Vulnerability Assessment & OWASP Top 10',
      'SIEM Tools & Log Forensics (Splunk / ELK)',
      'Cryptography & IAM Security',
    ],
    recommendedCourses: [
      { title: 'Google Cybersecurity Certificate', platform: 'Coursera', level: 'Beginner', isFree: true },
      { title: 'Introduction to Information Security', platform: 'OpenLearn', level: 'Beginner', isFree: true },
      { title: 'Hands-on Ethical Hacking & Defense', platform: 'TryHackMe', level: 'Intermediate', isFree: true },
    ],
    roadmap: [
      {
        month: 1,
        title: 'Networking & Packet Inspection Architecture',
        description: 'TCP/IP 4-layer model, OSI 7-layer stack, packet capture with Wireshark, and subnet routing.',
        topics: ['TCP Handshake & UDP', 'Subnetting & CIDR', 'Wireshark Packet Analysis', 'Port Scanning & Nmap'],
        resourcesCount: 16,
      },
      {
        month: 2,
        title: 'Linux Hardening & Security Scripting',
        description: 'POSIX permissions, sudoers policy, automated auditing with Bash, and iptables configuration.',
        topics: ['Linux File Permissions', 'Bash Automation Scripts', 'Firewalls (UFW / Iptables)', 'SSH Key Hardening'],
        resourcesCount: 18,
      },
      {
        month: 3,
        title: 'SIEM Operations & Incident Response',
        description: 'Centralized log aggregation, threat hunting, Snort IDS rules, and security runbooks.',
        topics: ['SIEM Alert Triage (Splunk)', 'Snort Rule Creation', 'Threat Hunting Frameworks', 'Incident Response Lifecycle'],
        resourcesCount: 21,
      },
      {
        month: 4,
        title: 'Web Application Security & OWASP Top 10',
        description: 'Detecting SQLi, XSS, CSRF, broken access control, and sanitizing user inputs with Burp Suite.',
        topics: ['OWASP Top 10 Vulnerabilities', 'Burp Suite Proxying', 'SQL Injection Defense', 'Content Security Policy (CSP)'],
        resourcesCount: 22,
      },
      {
        month: 5,
        title: 'Cryptography, Public Key Infrastructure & IAM',
        description: 'Symmetric/asymmetric algorithms, digital signatures, TLS certificates, and OAuth 2.0 / SAML.',
        topics: ['AES & RSA Encryption', 'PKI & TLS Handshake', 'Identity & Access Management (IAM)', 'Zero Trust Architecture'],
        resourcesCount: 18,
      },
      {
        month: 6,
        title: 'Security Defense Simulation & Capstone Audit',
        description: 'Conduct a simulated penetration test, audit a networked lab, and write a professional remediation report.',
        topics: ['Vulnerability Assessment Report', 'Remediation Roadmap', 'Executive Debrief', 'Blue Team Defense Lab'],
        resourcesCount: 15,
      },
    ],
  },
  'ui-ux-designer': {
    id: 'ui-ux-designer',
    name: 'UI/UX & Digital Product Designer',
    category: 'Design',
    domain: 'Arts & Design',
    matchScore: 86,
    demand: 'High',
    salaryRange: '$75,000 - $135,000 / yr',
    growthRate: '+22% (Next 5 Years)',
    description:
      'Create human-centered user interfaces, high-fidelity prototypes, and cohesive design systems for high-impact web and mobile products.',
    requiredSkills: [
      'Figma & Auto-Layout Prototyping',
      'User Research, Interviews & Journey Mapping',
      'Design Systems, Typography & Color Tokens',
      'Usability Testing & Accessibility (WCAG AA/AAA)',
      'Responsive Interaction Design',
    ],
    recommendedCourses: [
      { title: 'Google UX Design Professional Certificate', platform: 'Coursera', level: 'Beginner', isFree: true },
      { title: 'Figma Mastery: Auto Layout & Component Systems', platform: 'Figma Learn', level: 'Beginner', isFree: true },
      { title: 'Design Systems & Modern Micro-Interactions', platform: 'Refactoring UI', level: 'Intermediate', isFree: true },
    ],
    roadmap: [
      {
        month: 1,
        title: 'Visual Foundations & Figma Prototyping',
        description: 'Grid math, typography pairings, color theory, contrast ratios, and Figma auto-layout mechanics.',
        topics: ['Visual Hierarchy & Spacing Math', 'Typography Scales', 'Figma Auto-Layout & Variants', 'Vector Icons & Assets'],
        resourcesCount: 16,
      },
      {
        month: 2,
        title: 'User Research & Information Architecture',
        description: 'User personas, empathy maps, journey mapping, card sorting, and navigation tree structures.',
        topics: ['Qualitative User Interviews', 'Persona Development', 'Card Sorting & Site Maps', 'Information Architecture'],
        resourcesCount: 17,
      },
      {
        month: 3,
        title: 'Wireframing & Interactive Micro-Prototypes',
        description: 'Progressing from low-fidelity paper sketches to clickable high-fidelity prototypes with state transitions.',
        topics: ['Lo-Fi Wireframe Sketches', 'Hi-Fi Component Prototyping', 'Interactive Transitions', 'Micro-Interactions'],
        resourcesCount: 19,
      },
      {
        month: 4,
        title: 'Design Systems & WCAG Accessibility',
        description: 'Construct scalable design systems with tokenized colors, semantic variables, and accessible components.',
        topics: ['Design Tokens & Variables', 'Accessible Focus & Form States', 'Component Library Architecture', 'Dark Mode Systems'],
        resourcesCount: 20,
      },
      {
        month: 5,
        title: 'Usability Testing & Quantitative UX Metrics',
        description: 'Plan usability tests, measure System Usability Scale (SUS), task completion time, and iterate designs.',
        topics: ['Usability Test Protocols', 'SUS & UX Benchmarking', 'Heatmap & Eye-Tracking Analysis', 'Design Iteration Synthesis'],
        resourcesCount: 18,
      },
      {
        month: 6,
        title: 'Full Product Design Case Study & Portfolio',
        description: 'Publish an end-to-end UX case study documenting problem discovery, user research, wireframes, and final UI.',
        topics: ['Case Study Narrative Structure', 'Prototype Presentation Deck', 'Portfolio Web Showcase', 'Design Review'],
        resourcesCount: 15,
      },
    ],
  },
};

export const COMING_SOON_CAREERS = [
  {
    id: 'web-development',
    name: 'Web Development',
    domain: 'Computer Science',
    category: 'Web Development',
    expectedDate: 'Coming Soon',
    description: 'Modern frontend, backend and full-stack web application development pathways.',
  },
  {
    id: 'mobile-development',
    name: 'Mobile Development',
    domain: 'Computer Science',
    category: 'Mobile Development',
    expectedDate: 'Coming Soon',
    description: 'Android, iOS and cross-platform mobile application development pathways.',
  },
  {
    id: 'devops',
    name: 'DevOps',
    domain: 'Computer Science',
    category: 'DevOps',
    expectedDate: 'Coming Soon',
    description: 'CI/CD, containers, cloud automation, monitoring and infrastructure practices.',
  },
];

export const DEFAULT_CAREER_ID = 'software-engineer';