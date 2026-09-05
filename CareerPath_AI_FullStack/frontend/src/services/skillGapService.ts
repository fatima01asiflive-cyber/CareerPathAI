export interface SkillGapItem {
  skillName: string;
  category: 'Core Language' | 'Framework & Libs' | 'System Architecture' | 'Data & ML' | 'DevOps & Cloud' | 'Domain Practice';
  currentLevel: number; // 0 to 100
  requiredLevel: number; // 0 to 100
  gap: number; // required - current
  priority: 'Critical' | 'Recommended' | 'Advanced';
  estimatedHoursToMaster: number;
  recommendedResource: {
    title: string;
    type: 'Course' | 'Project' | 'Documentation' | 'Practice';
    link: string;
    isFree: boolean;
  };
}

export interface SkillGapReport {
  targetCareerId: string;
  targetCareerName: string;
  overallReadinessScore: number;
  totalSkillsAssessed: number;
  readySkillsCount: number;
  missingCriticalCount: number;
  skills: SkillGapItem[];
  actionPlan: Array<{
    phase: string;
    duration: string;
    focus: string;
    milestone: string;
  }>;
}

const CAREER_SKILLS_MAP: Record<string, SkillGapItem[]> = {
  'ai-engineer': [
    {
      skillName: 'Python Core & OOP',
      category: 'Core Language',
      currentLevel: 85,
      requiredLevel: 90,
      gap: 5,
      priority: 'Recommended',
      estimatedHoursToMaster: 12,
      recommendedResource: {
        title: 'Advanced Python Design Patterns & Memory Optimization',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'PyTorch & Neural Networks',
      category: 'Data & ML',
      currentLevel: 45,
      requiredLevel: 88,
      gap: 43,
      priority: 'Critical',
      estimatedHoursToMaster: 35,
      recommendedResource: {
        title: 'PyTorch for Deep Learning Bootcamp & CNN/RNN Labs',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'Transformers & Large Language Models (LLMs)',
      category: 'Data & ML',
      currentLevel: 30,
      requiredLevel: 85,
      gap: 55,
      priority: 'Critical',
      estimatedHoursToMaster: 40,
      recommendedResource: {
        title: 'Hugging Face NLP & RAG Architecture Pipeline Project',
        type: 'Project',
        link: '/projects',
        isFree: true,
      },
    },
    {
      skillName: 'FastAPI & REST Model Serving',
      category: 'Framework & Libs',
      currentLevel: 60,
      requiredLevel: 85,
      gap: 25,
      priority: 'Critical',
      estimatedHoursToMaster: 18,
      recommendedResource: {
        title: 'High-Throughput ML Microservice Deployment with FastAPI',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'Docker & Containerization',
      category: 'DevOps & Cloud',
      currentLevel: 40,
      requiredLevel: 80,
      gap: 40,
      priority: 'Recommended',
      estimatedHoursToMaster: 20,
      recommendedResource: {
        title: 'Docker for Machine Learning Engineers: Zero to Compose',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'Vector Databases (Pinecone / ChromaDB / Qdrant)',
      category: 'Data & ML',
      currentLevel: 25,
      requiredLevel: 80,
      gap: 55,
      priority: 'Critical',
      estimatedHoursToMaster: 15,
      recommendedResource: {
        title: 'Vector Embeddings & Semantic Search Capstone Project',
        type: 'Project',
        link: '/projects',
        isFree: true,
      },
    },
    {
      skillName: 'MLOps & Experiment Tracking (MLflow / Weights & Biases)',
      category: 'DevOps & Cloud',
      currentLevel: 20,
      requiredLevel: 75,
      gap: 55,
      priority: 'Advanced',
      estimatedHoursToMaster: 25,
      recommendedResource: {
        title: 'Production MLOps Pipelines & Continuous Model Training',
        type: 'Course',
        link: '/courses',
        isFree: false,
      },
    },
  ],
  'data-scientist': [
    {
      skillName: 'Pandas & NumPy Data Wrangling',
      category: 'Data & ML',
      currentLevel: 80,
      requiredLevel: 90,
      gap: 10,
      priority: 'Recommended',
      estimatedHoursToMaster: 15,
      recommendedResource: {
        title: 'Pandas Masterclass: Vectorized Operations & Indexing',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'Statistical Modeling & Hypothesis Testing',
      category: 'Data & ML',
      currentLevel: 55,
      requiredLevel: 85,
      gap: 30,
      priority: 'Critical',
      estimatedHoursToMaster: 30,
      recommendedResource: {
        title: 'Applied Inferential Statistics & A/B Testing Experiments',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'Advanced SQL & Data Warehousing (BigQuery / Snowflake)',
      category: 'Data & ML',
      currentLevel: 50,
      requiredLevel: 85,
      gap: 35,
      priority: 'Critical',
      estimatedHoursToMaster: 25,
      recommendedResource: {
        title: 'Advanced SQL Window Functions & Analytics Queries',
        type: 'Course',
        link: '/courses',
        isFree: true,
      },
    },
    {
      skillName: 'Tableau & Power BI Executive Dashboards',
      category: 'Domain Practice',
      currentLevel: 40,
      requiredLevel: 80,
      gap: 40,
      priority: 'Recommended',
      estimatedHoursToMaster: 18,
      recommendedResource: {
        title: 'Business Intelligence & Executive Storytelling Project',
        type: 'Project',
        link: '/projects',
        isFree: true,
      },
    },
  ],
};

export const skillGapService = {
  getSkillGapReport(targetCareerId: string = 'ai-engineer', userScore: number = 85): SkillGapReport {
    const skills = CAREER_SKILLS_MAP[targetCareerId] || CAREER_SKILLS_MAP['ai-engineer'];

    // Dynamically adjust current skills based on user score
    const adjustedSkills = skills.map((s) => {
      const adjustmentFactor = (userScore - 50) / 50; // -1 to +1
      const current = Math.min(95, Math.max(15, Math.round(s.currentLevel + adjustmentFactor * 15)));
      const gap = Math.max(0, s.requiredLevel - current);
      return {
        ...s,
        currentLevel: current,
        gap,
        priority: gap > 35 ? ('Critical' as const) : gap > 15 ? ('Recommended' as const) : ('Advanced' as const),
      };
    });

    const totalAssessed = adjustedSkills.length;
    const readySkills = adjustedSkills.filter((s) => s.gap <= 10).length;
    const criticalMissing = adjustedSkills.filter((s) => s.priority === 'Critical').length;

    const avgProficiency = Math.round(
      adjustedSkills.reduce((sum, s) => sum + s.currentLevel, 0) / totalAssessed
    );

    const targetNames: Record<string, string> = {
      'ai-engineer': 'Artificial Intelligence & Machine Learning Engineer',
      'data-scientist': 'Data Scientist & Analytics Specialist',
      'software-engineer': 'Full-Stack Software Engineer',
      'cyber-security': 'Cyber Security Specialist',
      'ui-ux-designer': 'UI/UX Product Designer',
      'financial-analyst': 'Financial Analyst & Quant Specialist',
      'biomedical-specialist': 'Biomedical Informatics Specialist',
    };

    return {
      targetCareerId,
      targetCareerName: targetNames[targetCareerId] || 'AI Engineer',
      overallReadinessScore: avgProficiency,
      totalSkillsAssessed: totalAssessed,
      readySkillsCount: readySkills,
      missingCriticalCount: criticalMissing,
      skills: adjustedSkills,
      actionPlan: [
        {
          phase: 'Month 1 - Foundation Mastery',
          duration: '4 Weeks (10 hrs/week)',
          focus: 'Close critical gaps in Core Language & Mathematical Foundations.',
          milestone: 'Complete 3 foundational courses & pass syntax benchmarks.',
        },
        {
          phase: 'Month 2-3 - Framework Deep Dive',
          duration: '8 Weeks (12 hrs/week)',
          focus: 'Build deep proficiency with PyTorch, FastAPI, and Vector Databases.',
          milestone: 'Deploy end-to-end RAG AI API on cloud infrastructure.',
        },
        {
          phase: 'Month 4-5 - Production Capstone',
          duration: '8 Weeks (15 hrs/week)',
          focus: 'Full-stack enterprise application with automated CI/CD and MLOps tracking.',
          milestone: 'Portfolio repository with 90%+ AST code quality audit.',
        },
        {
          phase: 'Month 6 - Industry Interview Readiness',
          duration: '4 Weeks',
          focus: 'Mock interviews, algorithmic problem solving, and ATS resume polish.',
          milestone: 'Pass 5 AI mock interviews with >=85% STAR communication score.',
        },
      ],
    };
  },
};
