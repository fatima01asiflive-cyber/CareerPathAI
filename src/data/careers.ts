export interface CareerTrack {
  id: string;
  name: string;
  category: string;
  matchScore?: number;
  description: string;
  icon: string;
  salaryRange: string;
  growthRate: string;
  requiredSkills: string[];
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    category: 'Computer Science',
    description: 'Design, develop, and test scalable web, cloud, and distributed software systems.',
    icon: 'terminal',
    salaryRange: '$95,000 - $160,000',
    growthRate: '+25% (High)',
    requiredSkills: ['JavaScript/TypeScript', 'React', 'Node.js', 'System Architecture', 'Git'],
  },
  {
    id: 'ai-machine-learning',
    name: 'AI & Machine Learning Specialist',
    category: 'Artificial Intelligence',
    description: 'Build predictive machine learning models, deep neural networks, and generative AI apps.',
    icon: 'psychology',
    salaryRange: '$110,000 - $185,000',
    growthRate: '+38% (Very High)',
    requiredSkills: ['Python', 'PyTorch/TensorFlow', 'Linear Algebra', 'MLOps', 'LLM Prompting'],
  },
  {
    id: 'data-science',
    name: 'Data Scientist & Analyst',
    category: 'Data Science',
    description: 'Extract actionable insights from structured/unstructured datasets with statistical modeling.',
    icon: 'insights',
    salaryRange: '$90,000 - $145,000',
    growthRate: '+28% (High)',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Statistics', 'Tableau/PowerBI'],
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security Analyst',
    category: 'Cyber Security',
    description: 'Protect organizational networks, infrastructure, and user data from cyber vulnerabilities.',
    icon: 'security',
    salaryRange: '$92,000 - $150,000',
    growthRate: '+33% (Very High)',
    requiredSkills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Linux', 'SIEM Tools'],
  },
  {
    id: 'medical-sciences',
    name: 'Medical Research & Healthcare',
    category: 'Medicine & Health',
    description: 'Investigate clinical therapies, disease pathways, and modern biotechnology solutions.',
    icon: 'medical_services',
    salaryRange: '$85,000 - $140,000',
    growthRate: '+18% (Steady)',
    requiredSkills: ['Biochemistry', 'Clinical Research', 'Pathology', 'Data Analysis', 'Diagnostics'],
  },
  {
    id: 'financial-analysis',
    name: 'Financial Analyst & Fintech',
    category: 'Business & Finance',
    description: 'Evaluate investments, financial markets, valuation models, and automated algorithmic trading.',
    icon: 'payments',
    salaryRange: '$80,000 - $135,000',
    growthRate: '+15% (Solid)',
    requiredSkills: ['Financial Modeling', 'Corporate Accounting', 'Excel & Python', 'Risk Management'],
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX & Product Designer',
    category: 'Arts & Design',
    description: 'Craft intuitive, accessible user experiences and interactive digital product designs.',
    icon: 'draw',
    salaryRange: '$78,000 - $130,000',
    growthRate: '+20% (High)',
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Design Systems', 'Prototyping'],
  },
  {
    id: 'engineering-systems',
    name: 'Mechanical / Electrical Engineer',
    category: 'Engineering',
    description: 'Design hardware, circuits, robotics, and automated manufacturing systems.',
    icon: 'precision_manufacturing',
    salaryRange: '$88,000 - $142,000',
    growthRate: '+14% (Solid)',
    requiredSkills: ['CAD Modeling', 'Circuit Analysis', 'Thermodynamics', 'Robotics', 'MATLAB'],
  },
];
